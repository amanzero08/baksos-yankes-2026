'use server'

import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getPanitiaList() {
  const { data, error } = await supabase.from('kartu_sahabat').select('id, committee_name').order('committee_name');
  if (error) {
    console.error('Error fetching panitia:', error);
    return [];
  }
  return data || [];
}

export async function getPendingProposals() {
  // Fetch proposals and their donations
  const { data, error } = await supabaseAdmin.from('proposals').select('id, proposal_number, donor_name, institution, donations(id, verified)').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching proposals:', error);
    return [];
  }
  // Return proposals that DO NOT have a verified donation
  return (data || []).filter(prop => !prop.donations || prop.donations.length === 0 || !prop.donations.some((d: any) => d.verified));
}

export async function createProposal(data: {
  donorName: string
  institution?: string
  committeeName?: string
  message?: string
}) {
  try {
    // proposal_number di-generate otomatis oleh database sequence (Anti Race Condition)
    const { data: inserted, error: insertError } = await supabase
      .from('proposals')
      .insert({
        donor_name: data.donorName,
        institution: data.institution || null,
        committee_name: data.committeeName || null,
        message: data.message || null,
      })
      .select()
      .single()

    if (insertError) throw new Error(insertError.message)

    return { success: true, data: inserted }
  } catch (error: any) {
    console.error('Error creating proposal:', error)
    return { success: false, error: error.message }
  }
}

export async function submitDonation(formData: FormData) {
  try {
    const proposalId = formData.get('proposalId') as string
    const notes = formData.get('notes') as string
    const amountStr = formData.get('amount') as string
    const file = formData.get('receipt') as File

    if (!proposalId || !file || file.size === 0) {
      throw new Error('Proposal dan bukti transfer wajib diisi')
    }

    // Get donor_name from proposal
    const { data: prop } = await supabaseAdmin.from('proposals').select('donor_name').eq('id', proposalId).single()
    if (!prop) throw new Error('Proposal tidak ditemukan')
    const donorName = prop.donor_name;

    const amount = amountStr ? parseFloat(amountStr.replace(/\D/g,"")) : 0;
    
    // Poka-Yoke: Cegah nominal negatif
    if (amount < 0) {
      throw new Error('Nominal donasi tidak boleh negatif')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(fileName, buffer, {
        contentType: file.type,
      })

    if (uploadError) throw new Error(uploadError.message)

    const receiptPath = uploadData.path

    const { data: donation, error: insertError } = await supabase
      .from('donations')
      .insert({
        donor_name: donorName,
        proposal_id: proposalId,
        notes: notes || null,
        amount: amount,
        receipt_url: receiptPath,
        verified: false
      })
      .select()
      .single()

    if (insertError) throw new Error(insertError.message)

    revalidatePath('/dashboard')
    revalidatePath('/admin')
    
    return { success: true, data: donation }
  } catch (error: any) {
    console.error('Error submitting donation:', error)
    return { success: false, error: error.message }
  }
}

export async function updateProposal(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const proposalNumber = formData.get('proposalNumber') as string
    const donorName = formData.get('donorName') as string
    const institution = formData.get('institution') as string
    const committeeName = formData.get('committeeName') as string
    const message = formData.get('message') as string
    const passcode = formData.get('passcode') as string
    const file = formData.get('receipt') as File | null

    if (passcode !== '2906') throw new Error('Passcode salah. Anda tidak memiliki izin untuk mengubah data.')
    if (!id) throw new Error('ID Proposal tidak ditemukan.')

    const updatePayload: any = {
      donor_name: donorName,
      institution: institution || null,
      committee_name: committeeName || null,
      message: message || null,
    };
    if (proposalNumber) {
      updatePayload.proposal_number = proposalNumber;
    }

    const { data: updated, error } = await supabaseAdmin
      .from('proposals')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    if (file && file.size > 0) {
      const { data: existingDonations } = await supabaseAdmin
        .from('donations')
        .select('id')
        .eq('proposal_id', id);

      if (existingDonations && existingDonations.length > 0) {
        const donationId = existingDonations[0].id;
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('receipts')
          .upload(fileName, buffer, {
            contentType: file.type,
          })

        if (uploadError) throw new Error(uploadError.message)

        const { error: donationUpdateError } = await supabaseAdmin
          .from('donations')
          .update({ receipt_url: uploadData.path })
          .eq('id', donationId);

        if (donationUpdateError) throw new Error(donationUpdateError.message)
      } else {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('receipts')
          .upload(fileName, buffer, {
            contentType: file.type,
          })

        if (uploadError) throw new Error(uploadError.message)

        const { error: insertError } = await supabaseAdmin
          .from('donations')
          .insert({
            donor_name: donorName,
            proposal_id: id,
            amount: 0,
            receipt_url: uploadData.path,
            verified: false
          });

        if (insertError) throw new Error(insertError.message)
      }
    }

    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true, data: updated }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteProposal(id: string, passcode: string) {
  try {
    if (passcode !== '7777') throw new Error('Passcode salah. Anda tidak memiliki izin untuk menghapus data.')

    // Deleting the associated donations first to bypass verification/foreign key locks
    const { error: donationError } = await supabaseAdmin.from('donations').delete().eq('proposal_id', id)
    if (donationError) throw new Error(donationError.message)

    const { error } = await supabaseAdmin.from('proposals').delete().eq('id', id)
    if (error) throw new Error(error.message)
    
    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// === KARTU SAHABAT ACTIONS ===

export async function createKartuSahabat(data: { committeeName: string, cardNumber?: string }) {
  try {
    if (!data.committeeName) throw new Error('Nama panitia wajib diisi.')
    if (!data.cardNumber) throw new Error('Nomor kartu wajib diisi.')

    let formattedCardNumber = '';
    const clean = data.cardNumber.trim();
    if (/^\d+$/.test(clean)) {
      formattedCardNumber = `${clean}-KS-2026`;
    } else if (/^\d+-KS-2026$/.test(clean)) {
      formattedCardNumber = clean;
    } else {
      throw new Error('Format nomor kartu harus XXX-KS-2026 (contoh: 045-KS-2026 atau cukup ketik 045).');
    }

    // Check uniqueness
    const { data: existing } = await supabaseAdmin
      .from('kartu_sahabat')
      .select('id')
      .eq('card_number', formattedCardNumber)
      .maybeSingle();

    if (existing) {
      throw new Error(`Nomor kartu ${formattedCardNumber} sudah digunakan oleh panitia lain.`);
    }

    const { data: inserted, error } = await supabaseAdmin
      .from('kartu_sahabat')
      .insert({
        committee_name: data.committeeName,
        card_number: formattedCardNumber,
        collected_amount: 0
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true, data: inserted }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateKartuSahabat(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const collectedAmountStr = formData.get('collectedAmount') as string
    const receivedAtStr = formData.get('receivedAt') as string // YYYY-MM-DD
    const passcode = formData.get('passcode') as string
    const file = formData.get('photo') as File | null
    const cardNumber = formData.get('cardNumber') as string | null

    if (passcode !== '2906') throw new Error('Passcode salah.')
    if (!id) throw new Error('ID Kartu Sahabat tidak ditemukan.')

    // 1. Update Card Number (if changed/provided)
    let formattedCardNumber: string | null = null;
    if (cardNumber) {
      const clean = cardNumber.trim();
      if (/^\d+$/.test(clean)) {
        formattedCardNumber = `${clean}-KS-2026`;
      } else if (/^\d+-KS-2026$/.test(clean)) {
        formattedCardNumber = clean;
      } else {
        throw new Error('Format nomor kartu harus XXX-KS-2026 (contoh: 045-KS-2026 atau cukup ketik 045).');
      }

      // Check uniqueness
      const { data: existing } = await supabaseAdmin
        .from('kartu_sahabat')
        .select('id')
        .eq('card_number', formattedCardNumber)
        .neq('id', id)
        .maybeSingle();

      if (existing) {
        throw new Error(`Nomor kartu ${formattedCardNumber} sudah digunakan oleh panitia lain.`);
      }
    }

    const { error: parentError } = await supabaseAdmin
      .from('kartu_sahabat')
      .update({ card_number: formattedCardNumber })
      .eq('id', id);

    if (parentError) throw new Error(parentError.message)

    // 2. Add new collection report (payment) if amount > 0
    const collectedAmount = collectedAmountStr ? parseFloat(collectedAmountStr.replace(/\D/g,"")) : 0
    if (collectedAmount > 0) {
      let photoUrl: string | null = null;

      if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('receipts')
          .upload(`kartu-sahabat/${fileName}`, buffer, {
            contentType: file.type,
          })

        if (uploadError) throw new Error(uploadError.message)
        photoUrl = uploadData.path
      }

      const { error: paymentError } = await supabaseAdmin
        .from('kartu_sahabat_payments')
        .insert({
          kartu_sahabat_id: id,
          amount: collectedAmount,
          received_at: receivedAtStr || new Date().toISOString().substring(0, 10),
          photo_url: photoUrl
        });

      if (paymentError) throw new Error(paymentError.message)
    }

    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteKartuSahabatPayment(paymentId: string, passcode: string) {
  try {
    if (passcode !== '2906') throw new Error('Passcode salah.')
    if (!paymentId) throw new Error('ID Pembayaran tidak ditemukan.')

    const { error } = await supabaseAdmin
      .from('kartu_sahabat_payments')
      .delete()
      .eq('id', paymentId);

    if (error) throw new Error(error.message)

    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteKartuSahabat(id: string, passcode: string) {
  try {
    if (passcode !== '7777') throw new Error('Passcode salah.')

    const { error } = await supabaseAdmin.from('kartu_sahabat').delete().eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function verifyDonation(id: string, amount: number, passcode: string) {
  try {
    if (passcode !== '2906') throw new Error('Passcode salah.')
    
    // Poka-Yoke: Cegah nominal negatif
    if (amount < 0) throw new Error('Nominal tidak boleh negatif')

    const { data: updated, error } = await supabaseAdmin
      .from('donations')
      .update({ verified: true, amount: amount })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true, data: updated }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function recordInternalPayment(formData: FormData) {
  try {
    const proposalId = formData.get('proposalId') as string
    const amountStr = formData.get('amount') as string
    const paymentDateStr = formData.get('paymentDate') as string
    const passcode = formData.get('passcode') as string
    const file = formData.get('receipt') as File | null

    if (passcode !== '2906') throw new Error('Passcode salah.')
    if (!proposalId) throw new Error('Proposal wajib dipilih')

    const amount = amountStr ? parseFloat(amountStr.replace(/\D/g,"")) : 0;
    if (amount <= 0) throw new Error('Nominal donasi harus lebih dari 0')

    // Get donor_name from proposal
    const { data: prop } = await supabaseAdmin.from('proposals').select('donor_name').eq('id', proposalId).single()
    if (!prop) throw new Error('Proposal tidak ditemukan')
    const donorName = prop.donor_name;

    // Handle receipt file
    let receiptPath = 'internal-by-admin'
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('receipts')
        .upload(fileName, buffer, {
          contentType: file.type,
        })

      if (uploadError) throw new Error(uploadError.message)
      receiptPath = uploadData.path
    }

    // Set custom payment date
    // paymentDateStr is formatted as YYYY-MM-DD
    const paymentTimestamp = paymentDateStr 
      ? new Date(`${paymentDateStr}T12:00:00`).toISOString()
      : new Date().toISOString();

    const { data: donation, error: insertError } = await supabaseAdmin
      .from('donations')
      .insert({
        donor_name: donorName,
        proposal_id: proposalId,
        notes: 'Direkam secara internal oleh Admin',
        amount: amount,
        receipt_url: receiptPath,
        verified: true,
        created_at: paymentTimestamp
      })
      .select()
      .single()

    if (insertError) throw new Error(insertError.message)

    revalidatePath('/dashboard')
    revalidatePath('/admin')
    
    return { success: true, data: donation }
  } catch (error: any) {
    console.error('Error recording internal payment:', error)
    return { success: false, error: error.message }
  }
}

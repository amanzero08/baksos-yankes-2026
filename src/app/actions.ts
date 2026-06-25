'use server'

import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function createProposal(data: {
  donorName: string
  institution?: string
  committeeName?: string
  message?: string
}) {
  try {
    const { count, error: countError } = await supabase
      .from('proposals')
      .select('*', { count: 'exact', head: true })

    if (countError) throw new Error(countError.message)

    const nextNum = (count || 0) + 1
    const proposalNumber = `BAKSOS-GPIB-2026-${String(nextNum).padStart(4, '0')}`

    const { data: inserted, error: insertError } = await supabase
      .from('proposals')
      .insert({
        proposal_number: proposalNumber,
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
    const donorName = formData.get('donorName') as string
    const proposalNumber = formData.get('proposalNumber') as string
    const notes = formData.get('notes') as string
    const amountStr = formData.get('amount') as string
    const file = formData.get('receipt') as File

    if (!donorName || !file || file.size === 0) {
      throw new Error('Nama donatur dan bukti transfer wajib diisi')
    }

    const amount = amountStr ? parseFloat(amountStr.replace(/[^0-9.-]+/g,"")) : 0;

    let proposalId = null
    if (proposalNumber) {
      const { data: prop } = await supabase
        .from('proposals')
        .select('id')
        .eq('proposal_number', proposalNumber)
        .single()
      if (prop) proposalId = prop.id
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

export async function updateProposal(id: string, data: {
  donorName: string
  institution?: string
  committeeName?: string
  message?: string
}, passcode: string) {
  try {
    if (passcode !== '2906') throw new Error('Passcode salah. Anda tidak memiliki izin untuk mengubah data.')

    const { data: updated, error } = await supabaseAdmin
      .from('proposals')
      .update({
        donor_name: data.donorName,
        institution: data.institution || null,
        committee_name: data.committeeName || null,
        message: data.message || null,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    revalidatePath('/admin')
    return { success: true, data: updated }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteProposal(id: string, passcode: string) {
  try {
    if (passcode !== '2906') throw new Error('Passcode salah. Anda tidak memiliki izin untuk menghapus data.')

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

export async function createKartuSahabat(data: { committeeName: string, targetAmount: number }, passcode: string) {
  try {
    if (passcode !== '2906') throw new Error('Passcode salah.')

    const { data: inserted, error } = await supabaseAdmin
      .from('kartu_sahabat')
      .insert({
        committee_name: data.committeeName,
        target_amount: data.targetAmount,
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

export async function updateKartuSahabatAmount(id: string, collectedAmount: number, passcode: string) {
  try {
    if (passcode !== '2906') throw new Error('Passcode salah.')

    const { data: updated, error } = await supabaseAdmin
      .from('kartu_sahabat')
      .update({ collected_amount: collectedAmount })
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

export async function deleteKartuSahabat(id: string, passcode: string) {
  try {
    if (passcode !== '2906') throw new Error('Passcode salah.')

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

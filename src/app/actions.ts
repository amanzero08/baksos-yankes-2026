'use server'

import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// For server actions that bypass RLS for counting/inserting, ideally use service role.
// Here we use anon key, but ensure RLS allows it.
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function createProposal(data: {
  donorName: string
  institution?: string
  committeeName?: string
  message?: string
}) {
  try {
    // 1. Get current count to generate sequential number
    const { count, error: countError } = await supabase
      .from('proposals')
      .select('*', { count: 'exact', head: true })

    if (countError) throw new Error(countError.message)

    const nextNum = (count || 0) + 1
    const proposalNumber = `BAKSOS-GPIB-2026-${String(nextNum).padStart(4, '0')}`

    // 2. Insert new proposal
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
    const file = formData.get('receipt') as File

    if (!donorName || !file || file.size === 0) {
      throw new Error('Nama donatur dan bukti transfer wajib diisi')
    }

    // Optional: lookup proposal ID by proposal number
    let proposalId = null
    if (proposalNumber) {
      const { data: prop } = await supabase
        .from('proposals')
        .select('id')
        .eq('proposal_number', proposalNumber)
        .single()
      if (prop) proposalId = prop.id
    }

    // Upload file to storage
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

    // Using the path as URL reference. Since bucket is private, admin will need signed URLs to view
    const receiptPath = uploadData.path

    // Insert donation record
    const { data: donation, error: insertError } = await supabase
      .from('donations')
      .insert({
        donor_name: donorName,
        proposal_id: proposalId,
        notes: notes || null,
        receipt_url: receiptPath,
        verified: false
      })
      .select()
      .single()

    if (insertError) throw new Error(insertError.message)

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
    if (passcode !== '2906') {
      throw new Error('Passcode salah. Anda tidak memiliki izin untuk mengubah data.')
    }

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

    return { success: true, data: updated }
  } catch (error: any) {
    console.error('Error updating proposal:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteProposal(id: string, passcode: string) {
  try {
    if (passcode !== '2906') {
      throw new Error('Passcode salah. Anda tidak memiliki izin untuk menghapus data.')
    }

    const { error } = await supabaseAdmin
      .from('proposals')
      .delete()
      .eq('id', id)

    if (error) throw new Error(error.message)

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting proposal:', error)
    return { success: false, error: error.message }
  }
}

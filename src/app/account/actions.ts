'use server'

import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Unauthorized')
    }

    // Verify ownership of the order using user's client (obeys RLS)
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .eq('user_email', user.email!)
      .single()

    if (fetchError || !order) {
      throw new Error('Order not found or unauthorized')
    }

    // Use admin client to perform the DML update securely on the server
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (updateError) {
      throw new Error(updateError.message)
    }

    revalidatePath('/account')
    return { success: true }
  } catch (error: any) {
    console.error('Error updating order status:', error)
    return { success: false, error: error.message }
  }
}

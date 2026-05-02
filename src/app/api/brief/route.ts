import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const STRIPE_LINKS: Record<string, string> = {
  founding: 'https://buy.stripe.com/5kQ3co9RVeeS6iSd6R4c80l',
  core:     'https://buy.stripe.com/4gMdR26FJc6K8r02sd4c80j',
  full:     'https://buy.stripe.com/9B64gs7JN6MqcHg0k54c80k',
}

const MRR: Record<string, number> = {
  founding: 75,
  core:     90,
  full:     175,
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, brief, plan } = await req.json()

    if (!name?.trim() || !email?.trim() || !plan) {
      return NextResponse.json({ error: 'name, email and plan are required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { error } = await supabase.from('foundy_clients').insert({
      client_name:       name.trim(),
      email:             email.trim().toLowerCase(),
      subscription_plan: plan,
      brief_raw:         brief?.trim() ?? '',
      site_status:       'brief_pending',
      founding_slot:     plan === 'founding',
      mrr_gbp:           MRR[plan] ?? 90,
    })

    if (error) {
      console.error('[brief] Supabase insert error:', error)
      // Duplicate email — still redirect to Stripe
      if (error.code !== '23505') {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }
    }

    const stripeUrl = STRIPE_LINKS[plan] ?? STRIPE_LINKS.core
    return NextResponse.json({ stripeUrl })
  } catch (err) {
    console.error('[brief] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

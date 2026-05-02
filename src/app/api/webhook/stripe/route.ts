import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const PRICE_META: Record<string, { plan: string; mrr: number; founding: boolean }> = {
  'price_1TSXvg3gWehifiJ9VOLlCuth': { plan: 'founding', mrr: 75, founding: true },
  'price_1TSXvZ3gWehifiJ94oez5Vvv': { plan: 'core', mrr: 90, founding: false },
  'price_1TSXvd3gWehifiJ9eCp3J2EG': { plan: 'full', mrr: 175, founding: false },
}

function stripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
  })
}

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

export async function POST(req: NextRequest) {
  const stripe = stripeClient()
  const sig = req.headers.get('stripe-signature')
  const body = await req.text()
  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  const db = supabaseAdmin()
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email?.toLowerCase()
    const customerId = session.customer as string
    const subId = session.subscription as string
    if (!email || !subId) return NextResponse.json({ received: true })
    const sub = await stripe.subscriptions.retrieve(subId)
    const priceId = sub.items.data[0]?.price.id ?? ''
    const meta = PRICE_META[priceId] ?? { plan: 'core', mrr: 90, founding: false }
    const { error } = await db.from('foundy_clients').upsert(
      {
        email,
        client_name: clientName,
        stripe_customer_id: customerId,
        stripe_sub_id: subId,
        subscription_plan: meta.plan,
        mrr_gbp: meta.mrr,
        founding_slot: meta.founding,
        site_status: 'genome_selection',
        next_health_check: new Date(Date.now() + 7 * 864e5).toISOString(),
        next_report_card: new Date(Date.now() + 30 * 864e5).toISOString(),
      },
      { onConflict: 'email' },
    )
    if (error) console.error('[webhook] Supabase upsert error:', error)
    else console.log(`[webhook] Client onboarded: ${email} → ${meta.plan}`)
  }
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    await db.from('foundy_clients')
      .update({ site_status: 'cancelled', mrr_gbp: 0 })
      .eq('stripe_sub_id', sub.id)
    console.log(`[webhook] Subscription cancelled: ${sub.id}`)
  }
  return NextResponse.json({ received: true })
}

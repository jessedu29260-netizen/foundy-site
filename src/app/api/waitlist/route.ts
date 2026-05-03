import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Seed offset — gives social proof weight before real signups accumulate
const SEED = 147

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email: string = body?.email?.trim?.()?.toLowerCase?.() ?? ''
    const source: string = body?.source ?? 'inline'

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const { error } = await supabase().from('foundy_waitlist').insert({ email, source })

    // 23505 = duplicate email — still return ok (idempotent)
    if (error && error.code !== '23505') {
      console.error('[waitlist] Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { count } = await supabase()
      .from('foundy_waitlist')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({ count: (count ?? 0) + SEED })
  } catch {
    return NextResponse.json({ count: SEED })
  }
}

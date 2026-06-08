import { NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/supabase/admin'

type Params = {
  params: Promise<{ dropNumber: string }>
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { dropNumber } = await params
    

    const { data: drop, error } = await adminSupabase
      .from('drops')
      .select('id, name, description, price_inr, total_units, is_active')
      .eq('drop_number', parseInt(dropNumber, 10))
      .single()

    if (error || !drop) {
      return NextResponse.json({ drop: null })
    }

    const { count } = await adminSupabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('product_id', drop.id)
      .eq('status', 'paid')

    return NextResponse.json({
      drop: {
        ...drop,
        units_sold: count || 0,
        close_date: null,
        product_details: null,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { get } from '@vercel/edge-config'
import { createClient } from '@vercel/edge-config'
import { NextResponse } from 'next/server'

const client = createClient(process.env.EDGE_CONFIG)

export async function POST(request: Request) {
  try {
    const { id, idea } = await request.json()
    const ideas = await get('ideas') || {}
    const updatedIdeas = { ...ideas, [id]: idea }
    await client.set('ideas', updatedIdeas)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to add idea:', error)
    return NextResponse.json({ error: 'Failed to add idea' }, { status: 500 })
  }
}
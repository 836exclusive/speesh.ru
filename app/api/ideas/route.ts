import { get, set } from '@vercel/edge-config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { id, idea } = await request.json()
    const ideas = await get('ideas') || {}
    const updatedIdeas = { ...ideas, [id]: idea }
    await set('ideas', updatedIdeas)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add idea' }, { status: 500 })
  }
}
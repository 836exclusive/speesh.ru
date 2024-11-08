import { createClient } from '@vercel/edge-config'
import { NextResponse } from 'next/server'

const client = createClient(process.env.EDGE_CONFIG)

type Idea = {
  id: string
  title: string
  description: string
  votes: number
  tags: string[]
  author: string
  imageUrl?: string
}

type IdeasMap = Record<string, Idea>

export async function POST(request: Request) {
  try {
    const { id, idea } = await request.json() as { id: string, idea: Idea }
    const ideas = await client.get<IdeasMap>('ideas') || {}
    const updatedIdeas: IdeasMap = { ...ideas, [id]: idea }

    await client.set('ideas', updatedIdeas)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to add idea:', error)
    return NextResponse.json({ error: 'Failed to add idea' }, { status: 500 })
  }
}
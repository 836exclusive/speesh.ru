import { NextResponse } from 'next/server';
import { addIdea, getIdeas } from '@/lib/db';

export async function GET() {
  try {
    const ideas = await getIdeas();
    return NextResponse.json(ideas);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newIdea = await addIdea(body);
    return NextResponse.json(newIdea);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add idea' },
      { status: 500 }
    );
  }
}
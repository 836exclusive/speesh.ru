import { NextResponse } from 'next/server';
import { addIdea, getIdeas, updateVotes } from '@/lib/db';

export async function GET() {
  try {
    const ideas = await getIdeas();
    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
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
    console.error('Error adding idea:', error);
    return NextResponse.json(
      { error: 'Failed to add idea' },
      { status: 500 }
    );
  }
}

// Example PATCH endpoint to handle voting
export async function PATCH(request: Request) {
  const { id } = await request.json();
  try {
    const votes = await updateVotes(id);
    return NextResponse.json({ votes });
  } catch (error) {
    console.error('Error updating votes:', error);
    return NextResponse.json(
      { error: 'Failed to update votes' },
      { status: 500 }
    );
  }
}

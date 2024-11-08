import { NextResponse } from 'next/server';
import { updateVotes } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedIdea = await updateVotes(parseInt(params.id));
    return NextResponse.json(updatedIdea);
  } catch (error) {
    console.error('Error updating votes:', error);
    return NextResponse.json(
      { error: 'Failed to update votes' },
      { status: 500 }
    );
  }
}
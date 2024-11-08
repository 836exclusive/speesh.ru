import { NextResponse } from 'next/server';
import { addIdea, getIdeas } from '@/lib/db';

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

    // Convert the `tags` array to a database-compatible format
    const formattedTags = `{${body.tags.join(',')}}`; // Format for PostgreSQL
    const newIdea = await addIdea({
      ...body,
      tags: formattedTags,
    });

    return NextResponse.json(newIdea);
  } catch (error) {
    console.error('Error adding idea:', error);
    return NextResponse.json(
      { error: 'Failed to add idea' },
      { status: 500 }
    );
  }
}

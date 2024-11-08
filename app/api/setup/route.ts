import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS ideas (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        votes INTEGER DEFAULT 0,
        tags TEXT[],
        author VARCHAR(255),
        image_url TEXT
      );
    `;

    return NextResponse.json({ message: 'Database initialized' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
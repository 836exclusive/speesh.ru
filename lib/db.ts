import { sql } from '@vercel/postgres';

export type Idea = {
  id: number;
  title: string;
  description: string;
  votes: number;
  tags: string[];
  author: string;
  image_url?: string;
}

export async function getIdeas() {
  try {
    const { rows } = await sql<Idea>`
      SELECT * FROM ideas
      ORDER BY votes DESC
    `;
    // Parse tags from JSON string to array if necessary
    return rows.map(row => ({
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags),
    }));
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
}

export async function addIdea(idea: Omit<Idea, 'id' | 'votes'>) {
  try {
    const { rows } = await sql`
      INSERT INTO ideas (title, description, votes, tags, author, image_url)
      VALUES (
        ${idea.title},
        ${idea.description},
        0,
        ${JSON.stringify(idea.tags)}, -- Convert tags to JSON string
        ${idea.author},
        ${idea.image_url}
      )
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error adding idea:', error);
    throw error;
  }
}

export async function updateVotes(id: number) {
  try {
    const { rows } = await sql`
      UPDATE ideas
      SET votes = votes + 1
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error updating votes:', error);
    throw error;
  }
}

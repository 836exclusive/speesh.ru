import { db } from './dbConnection';
import type { Idea } from './types';

export async function addIdea(idea: Omit<Idea, 'id'>): Promise<Idea> {
  const query = `
    INSERT INTO ideas (title, description, tags, author, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [
    idea.title,
    idea.description,
    idea.tags, // Assuming the API route is already formatting this as a PostgreSQL-compatible array
    idea.author,
    idea.image_url,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

export async function getIdeas(): Promise<Idea[]> {
  const query = 'SELECT * FROM ideas';
  const result = await db.query(query);
  return result.rows;
}

// New updateVotes function
export async function updateVotes(id: number): Promise<number> {
  const query = `
    UPDATE ideas SET votes = votes + 1 WHERE id = $1 RETURNING votes;
  `;
  const values = [id];

  const result = await db.query(query, values);
  return result.rows[0].votes;
}

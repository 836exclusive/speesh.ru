import { db } from './dbConnection'; // Adjust path as needed
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
    idea.tags,
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

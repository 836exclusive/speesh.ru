export interface Idea {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: string;
  image_url: string;
  votes: number; // Adjust fields according to your database schema
}

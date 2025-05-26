import { json } from '@sveltejs/kit';
import { getAllRecipes, insertRecipe } from '$lib/index';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const recipes = await getAllRecipes();
    return json(recipes);
  } catch (error) {
    console.error('Fehler bei GET /api/recipes:', error);
    return new Response('Fehler beim Laden der Rezepte', { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    await insertRecipe(data);
    return new Response('Rezept gespeichert', { status: 201 });
  } catch (error) {
    console.error('Fehler bei POST /api/recipes:', error);
    return new Response('Fehler beim Speichern des Rezepts', { status: 500 });
  }
};

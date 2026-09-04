const API_URL =
  "http://localhost:8000/cc0-artworks";

export async function getArtworks() {
  const response = await fetch(API_URL);

  return response.json();
}
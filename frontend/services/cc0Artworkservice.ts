const API_URL =
  "http://localhost:8000/cc0-artworks";

export async function getArtworks(
  page: number = 1
) {
  const response = await fetch(
    `${API_URL}?page=${page}`
  );

  return response.json();
}
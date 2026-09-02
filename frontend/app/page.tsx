async function getArtworks() {
  const response = await fetch(
    "http://127.0.0.1:8000/artworks?page=1&limit=20",
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export default async function Home() {
  const data = await getArtworks();

  return (
    <main className="min-h-screen bg-white p-8 text-black">
      <h1 className="mb-8 text-4xl font-bold">
        🏛️ Museu Digital
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.items.map((artwork: any) => (
          <div
            key={artwork.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow"
          >
            {artwork.image_url ? (
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-500">
                Sem imagem
              </div>
            )}

            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">
                {artwork.title}
              </h2>

              <p className="text-gray-700">
                {artwork.museum || "Museu não informado"}
              </p>

              {artwork.author && (
                <p className="mt-2 text-gray-600">
                  Autor: {artwork.author}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
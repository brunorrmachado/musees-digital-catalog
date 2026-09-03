import Link from "next/link";

async function getArtworks() {
  const response = await fetch(
    "http://127.0.0.1:8000/artworks?page=1&limit=20",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar obras");
  }

  return response.json();
}

export default async function Home() {
  const data = await getArtworks();

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-slate-900">
            🏛️ Museu Digital
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Catálogo digital enriquecido automaticamente com dados do Paris Musées
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((artwork: any) => (
            <Link
              key={artwork.id}
              href={`/artworks/${artwork.id}`}
              className="block overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <div className="h-64 w-full bg-slate-200">
                {artwork.image_url ? (
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="h-64 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-slate-500">
                      Sem imagem
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h2 className="mb-3 line-clamp-2 min-h-[3.5rem] text-xl font-bold text-slate-900">
                  {artwork.title}
                </h2>

                <div className="space-y-2 text-sm">
                  <p className="text-slate-700">
                    <span className="font-semibold">
                      Museu:
                    </span>{" "}
                    {artwork.museum || "Não informado"}
                  </p>

                  {artwork.author && (
                    <p className="text-slate-700">
                      <span className="font-semibold">
                        Autor:
                      </span>{" "}
                      {artwork.author}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
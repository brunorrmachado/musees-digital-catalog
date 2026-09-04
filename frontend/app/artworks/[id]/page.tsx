import Link from "next/link";

async function getArtwork(id: string) {
  const response = await fetch(
    `http://127.0.0.1:8000/artworks/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Obra não encontrada");
  }

  return response.json();
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const artwork = await getArtwork(id);

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/artworks">
        </Link>
        <Link
          href="/"
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          Voltar para o catálogo
        </Link>
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {artwork.image_url ? (
            <img
              src={artwork.image_url}
              alt={artwork.title}
              className="w-full max-h-[700px] object-contain bg-slate-100"
            />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center bg-slate-200">
              <span className="text-slate-500">
                Sem imagem disponível
              </span>
            </div>
          )}

          <div className="p-8">
            <h1 className="mb-6 text-4xl font-bold text-slate-900">
              {artwork.title}
            </h1>

            <div className="space-y-4 text-lg">
              <p>
                <strong>Autor:</strong>{" "}
                {artwork.author || "Não informado"}
              </p>

              <p>
                <strong>Museu:</strong>{" "}
                {artwork.museum || "Não informado"}
              </p>

              <p>
                <strong>ID:</strong>{" "}
                {artwork.id}
              </p>
            </div>

            {artwork.description && (
              <div className="mt-8">
                <h2 className="mb-2 text-2xl font-semibold">
                  Descrição
                </h2>

                <p className="leading-relaxed text-slate-700">
                  {artwork.description}
                </p>
              </div>
            )}

            {artwork.source_url && (
              <div className="mt-8">
                <a
                  href={artwork.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Ver obra original no museu →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
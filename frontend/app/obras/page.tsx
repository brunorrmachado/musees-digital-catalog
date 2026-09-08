import { getArtworks } from "../../services/cc0Artworkservice";
import ArtworkGrid from "../../components/ArtworkGrid";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";


type Artwork = {
  id: number;
  title: string;
  author: string;
  museum: string;
  image_url: string;
  license: string;
  download_url: string;
};

type Props = {
searchParams: Promise<{
page?: string;
}>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const result = await getArtworks(page);

  const artworks: Artwork[] = result?.items ?? [];

  const totalPages = result?.total_pages ?? 1;

  return (
    <PageContainer>
      <PageHeader activePage="obras" />

      <ArtworkGrid artworks={artworks} />

      <div className="flex items-center justify-center gap-6 mt-10">
        {page > 1 && (
          <Link
            href={`/obras?page=${page - 1}`}
            className="border-b border-transparent text-sm text-gray-500 hover:text-gray-700"
          >
            Anterior
          </Link>
        )}

        <span className="text-sm text-gray-500">
          {page} / {totalPages}
        </span>

        {page < totalPages && (
          <Link
            href={`/obras?page=${page + 1}`}
            className="border-b border-transparent text-sm text-gray-500 hover:text-gray-700"
          >
            Seguinte
          </Link>
        )}
      </div>
    </PageContainer>
  );
}
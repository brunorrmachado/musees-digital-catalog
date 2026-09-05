import Image from "next/image";
import { getArtworks } from "../../services/cc0Artworkservice";
import ArtworkGrid from "../../components/ArtworkGrid";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";


type Artwork = {
  id: number;
  title: string;
  author: string;
  museum: string;
  image_url: string;
  license: string;
  download_url: string;
};

export default async function Home() {
  const artworks: Artwork[] = await getArtworks();

  return (
    <PageContainer>
      <PageHeader
        activePage="obras"
        badgeText={`${artworks.length} obras`}
      />

      <ArtworkGrid artworks={artworks} />
    </PageContainer>
  );
}
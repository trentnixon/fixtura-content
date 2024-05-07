"use client";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { ImageGalleryForAssets } from "@/components/AssetLayout/Image/createImages";
import { DisplayVideoAsset } from "@/components/AssetLayout/Video/createVideo";
import { SupportingArticleClientWithScroll } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { FixturaPaper } from "@/components/containers/paper";
import { H } from "@/components/Type/Headers";
import { NoDataFound } from "@/components/errors/NoDataFound";

import { GetActiveAssetType } from "@/utils/getActiveAssetOBJ";
import { useActiveAssetType } from "@/Hooks/useActiveAssetType";

export default function AssetLayout() { 

  const activeAssetType = useActiveAssetType();

  //console.log("activeAssetType ", activeAssetType);
  if (
    !activeAssetType || 
    activeAssetType?.useAssetData?.length === 0 ||
    activeAssetType?.useAssetData === undefined
  ) {
    return <NoDataFound />;
  }

  return (
    <FixturaComponent>
      <DefaultHeader />
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={5}>
          <DisplayVideoAsset />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={7}>
          <SupportingArticleClientWithScroll />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={12}>
          <ImageGalleryForAssets />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </FixturaComponent>
  );
}

export const DefaultHeader = async () => {
  const useAssetType = await GetActiveAssetType();
  return (
    <FixturaPaper c={1} shadow={"none"} mb={20}>
      <H>{useAssetType?.AssetMetaData?.AssetName}</H>
      <P>{useAssetType?.decodeURIComponent}</P>
    </FixturaPaper>
  );
};

export function AssetLayoutImagesOnly({ OBJ }) {
  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={12}>
          <ImageGalleryForAssets OBJ={OBJ} />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </FixturaComponent>
  );
}

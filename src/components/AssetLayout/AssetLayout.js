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


 
export default function AssetLayout({ OBJ }) {

  if (OBJ.ASSETDATA?.length === 0 || OBJ?.ASSETDATA===undefined) return <NoDataFound />;
  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={5}>
          <DisplayVideoAsset OBJ={OBJ.ASSETDATA.videos} /> 
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={7}>
          <SupportingArticleClientWithScroll ITEMS={OBJ.ASSETDATA?.articles} />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={12}>
          <ImageGalleryForAssets OBJ={OBJ.ASSETDATA.graphics} />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </FixturaComponent>
  );
}

export const DefaultHeader = ({ OBJ }) => {
  
  return (
    <FixturaPaper c={1} shadow={"none"} mb={20}>
      <H>{OBJ?.AssetMetaData?.AssetName}</H>
      <P>{OBJ?.decodeURIComponent}</P>
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

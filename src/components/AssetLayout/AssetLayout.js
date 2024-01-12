"use client";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { ImageGalleryForAssets } from "@/components/AssetLayout/Image/createImages";
import { DisplayVideoAsset } from "@/components/AssetLayout/Video/createVideo";
import { SupportingArticleClientWithScroll } from "@/components/AssetLayout/Article/supportingArticles";
import { P } from "@/components/Type/Paragraph";
import { FixturaPaper } from "@/components/containers/paper";
import { H } from "@/components/Type/Headers";

export const DefaultHeader = ({ OBJ }) => {
  console.log("OBJ", OBJ)
  return (
    <FixturaPaper c={1} shadow={"none"} mb={20}>
      <H>{OBJ?.AssetMetaData?.AssetName}</H>
      <P>{OBJ?.decodeURIComponent}</P>
    </FixturaPaper>
  );
};

export default function AssetLayout({ OBJ }) {
  return (
    <FixturaComponent>
      <DefaultHeader OBJ={OBJ} />
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={5}>
          <DisplayVideoAsset OBJ={OBJ} />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={7}>
          <SupportingArticleClientWithScroll ITEMS={OBJ.ASSETDATA.Articles} />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={12}>
          <ImageGalleryForAssets OBJ={OBJ} />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </FixturaComponent>
  );
}

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

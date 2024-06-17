"use client";
import {
  FixturaComponent,
  RoundedSectionContainer,
} from "@/components/containers/containers";
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
import { Space } from "@mantine/core";
import { FixturaGroup } from "@/components/containers/Group";
import {
  IconArticle,
  IconDownload,
  IconMapPin,
  IconPhotoAi,
  IconVideo,
} from "@tabler/icons-react";

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
      <RoundedSectionContainer
        title={<DefaultHeader />}
        topContent={
          <FixturaGroup>
            <P fw={600} tt={"uppercase"}>
              Video and Write up
            </P>
            <FixturaGroup>
              <IconVideo />
              <IconArticle />
            </FixturaGroup>
          </FixturaGroup>
        }
        bottomContent={
          <FixturaGRIDOUTER>
            <FixturaGRIDCOL span={5}>
              <DisplayVideoAsset />
            </FixturaGRIDCOL>
            <FixturaGRIDCOL span={7}>
              <SupportingArticleClientWithScroll />
            </FixturaGRIDCOL>
          </FixturaGRIDOUTER>
        }
      />
      <Space h={50} />
      <RoundedSectionContainer
        title={""}
        topContent={
          <FixturaGroup>
            <P fw={600} tt={"uppercase"}>
              Images
            </P>
            <FixturaGroup>
              <IconPhotoAi />
            </FixturaGroup>
          </FixturaGroup>
        }
        bottomContent={
          <FixturaGRIDOUTER>
            <FixturaGRIDCOL span={12}>
              <ImageGalleryForAssets />
            </FixturaGRIDCOL>
          </FixturaGRIDOUTER>
        }
      />
    </FixturaComponent>
  );
}

export const DefaultHeader = async () => {
  const useAssetType = await GetActiveAssetType();
  return (
    <FixturaPaper p="0" c={0} shadow={"none"} my={20}>
      <FixturaGroup>
        <FixturaGroup>
          <IconDownload />
          <H lh={"1.2em"}>{useAssetType?.AssetMetaData?.AssetName}</H>
        </FixturaGroup>
        <FixturaGroup>
          <P lh={1.1}> {useAssetType?.decodeURIComponent}</P>
          <IconMapPin />
        </FixturaGroup>
      </FixturaGroup>
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

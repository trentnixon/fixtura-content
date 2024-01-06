"use client";
import { P } from "@/components/Type/Paragraph";
import { HTML5VideoPlayer } from "@/components/AssetLayout/Video/HTML5VideoPlayer";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaGroup } from "@/components/containers/Group";
import { IconVideo } from "@tabler/icons-react";

export function DisplayVideoAsset(props) {
  const { OBJ } = props;

  return (
    <>
      <FixturaPaper c={1} shadow={"none"} p={5} my={10}>
        <FixturaGroup position="right">
          <P fz="lg" c={"gray.7"} fw={900} ta={"right"} my={7}>
            Video
          </P>
          <IconVideo />
        </FixturaGroup>
      </FixturaPaper>
      {OBJ.ASSETDATA.Video === null ? (
        <VideoError />
      ) : (
        OBJ.ASSETDATA.Video.map((Video, i) => {
          return <HTML5VideoPlayer key={i} Video={Video} />;
        })
      )}
    </>
  );
}

const VideoError = () => {
  return (
    <FixturaPaper c={0}>
      <P ta={"center"} c="red.9" fw={600}>
        There was an Error when creating your video.
      </P>
      <P ta={"center"} c="red.9">
        Please contact us to re-render this asset
      </P>
    </FixturaPaper>
  );
};

//import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";

/* export function CreateVideoClient(props) {
  const { ITEM } = props;

  return (
    <>
      <P fz="lg" c={"gray.8"} fw={900} ta={"right"} my={7}>
        {ITEM.Name}
      </P>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={5} md={6} lg={3}>
          {ITEM.URL === null ? (
            <VideoError />
          ) : (
            <HTML5VideoPlayer url={ITEM.URL} Name={ITEM.Name} />
          )}
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </>
  );
} */

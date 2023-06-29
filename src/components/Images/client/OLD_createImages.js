"use client";

import { H } from "@/components/Type/Headers";
import { N, P } from "@/components/Type/Paragraph";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { HTML5VideoPlayer } from "@/components/Video/client/HTML5VideoPlayer";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";

export async function CreateVideoClient(props) {
  const { ITEMS } = props;
 
  return (
    <>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={7} md={6} lg={8}>
          <N>NOTE</N>
          <H size="h6">Title needed</H>
          <P>description</P>
          <CTAGroup />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={5} md={6} lg={4}>
          {ITEMS.map((vid, i) => {
            return (
              <div key={i}>
                <FixturaBox>
                  <HTML5VideoPlayer url={vid.attributes.URL} />
                </FixturaBox>
              </div>
            );
          })}
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </>
  );
}

const CTAGroup = () => {
  return (
    <FixturaGroup>
      <BUTTON_FUNC Label="Download" />
      <BUTTON_FUNC Label="Share" />
    </FixturaGroup>
  );
};

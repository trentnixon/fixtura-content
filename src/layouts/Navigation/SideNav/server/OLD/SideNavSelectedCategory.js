// APIS

// Utils
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaStack } from "@/components/containers/stack";
import { SideNavSelectedCategory } from "@/layouts/Navigation/SideNav/client/OLD/SideNavSelectedCategory";

export default async function SideNav_SelectedCategory(props) {
  const { params, Path } = props;

  const LINKPREPATH = `/${params.id}/${params.render}/${Path}`;

  console.log("Page.js - SideNav_SelectedRender");
  return (
    <>
      <FixturaStack>
        <FixturaBox>
          <H size="h5" align="right">
            OPTIONS
          </H>
        </FixturaBox>
        <SideNavSelectedCategory LINKPREPATH={LINKPREPATH} {...props} />
      </FixturaStack>
    </>
  );
}

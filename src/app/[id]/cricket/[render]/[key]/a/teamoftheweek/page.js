import {
  FixturaComponent,
  FixturaContainer,
} from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
//import { getRenders } from "@/api/renders";
import { P } from "@/components/Type/Paragraph";
//import { getAccount } from "@/api/accounts";

export default async function Upage({ params }) {
  const { id, render, key } = params;
  console.log("Page.js - Upage");

  return (
    <>
      <FixturaContainer>
        {/* <PageTitleAndCreated OBJ={OBJ} />  */}
      </FixturaContainer>

      <FixturaComponent>
        <P>Coming Soon!!!</P>
      </FixturaComponent>
    </>
  );
}

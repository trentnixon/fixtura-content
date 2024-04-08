import { FixturaComponent } from "@/components/containers/containers";
import { P } from "@/components/Type/Paragraph";

export default async function Upage({ params }) {
  const { id, render, key } = params;
  console.log("Page.js - Upage");

  return (
    <FixturaComponent>
      <P>Coming Soon!!!</P>
    </FixturaComponent>
  );
}

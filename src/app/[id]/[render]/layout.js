//import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { HeroText } from "@/layouts/Headings/server/Heros";

export default async function RootLayout({ children, params }) {
  return (
    <>
      <HeroText params={params} />
      {children}
    </>
  );
}
import { FixturaHeaderLogo } from "@/components/Images/Fixturaimages";
import { P } from "@/components/Type/Paragraph";

// Define page-specific metadata
export const metadata = {
  title: "Fixtura Content Hub",
  description: "Explore High-Quality Match Reports, Videos, and Images Across Various Sports",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-grow flex flex-col items-center justify-center">
        <FixturaHeaderLogo Logo="/images/LogoF.png" height={300} width={'auto'} />
        <P fw={900} fz={"xl"}>
          Fixtura
        </P>
        <P>Your Premier Destination for Sports Assets</P>
        <P>
          Explore High-Quality Match Reports, Videos, and Images Across Various
          Sports
        </P>
      </div>
    </main>
  );
}

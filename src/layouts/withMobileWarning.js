"use client";
import { P } from "@/components/Type/Paragraph";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import { Center } from "@mantine/core";

export default function withMobileWarning(Component) {
  return function WithMobileWarning(props) {
    const isMobile = useMediaQuery("(max-width: 768px)"); // Change this to suit your needs

    if (process.env.NODE_ENV !== 'production' || !isMobile) {
      return <Component {...props} />;
    }

    return (
      <FixturaBox>
        <FixturaPaper>
          <Center my={20}>
            <Image
              src="/images/LogoF.png"
              alt="Fixtura"
              width={35*2}
              height={12*2}
              priority
            />
          </Center>
          <P>
            Fixtura is working hard to provide an optimized mobile experience. For the best user experience, please switch to a larger screen. 
          </P>
          <P>
            Thank you for your patience.
          </P>
        </FixturaPaper>
      </FixturaBox>
    );
  };
}

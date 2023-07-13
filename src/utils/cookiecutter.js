"use client";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { withTokenValidation } from "@/api/validateToken";
import { FixturaSection } from "@/components/containers/Section";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { ProcessingLoader } from "@/components/UI/Loader";
import { Center, Space } from "@mantine/core";

export const CookieCutter = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const searchParams = useSearchParams();
  let token = searchParams.get("token") || Cookies.get("token");

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        const valid = await withTokenValidation(token);
        setIsValid(valid);

        if (valid) {
          Cookies.set("token", token);
        } else {
          Cookies.remove("token");
        }
      } else {
        setIsValid(false);
      }
    };

    if (isValid === null) validateToken();
  }, [isValid, token]);

  if (isValid === null) return <CheckingAuth />;
  if (!isValid) return <InvalidToken />;
  return <>{children}</>;
};

const CheckingAuth = () => {
  return (
    <FixturaSection>
      <H size="h4" weight={900}>Checking Authentication...</H>

      <P>
        Please wait while we verify your authentication status. We are checking
        if you have authorized access to our platform. Thank you for your
        patience.
      </P>
      <Space h={30} />
      <Center>
        <ProcessingLoader />
      </Center>
    </FixturaSection>
  );
};

const InvalidToken = () => {
  return (
    <FixturaSection>
      <H size="h4" weight={900}>Invalid Auth Access</H>
      <P>
        Oops! It seems like your token is either missing, invalid, or expired.
        To resolve this issue, you can obtain a new token by visiting your admin
        panel. If you don't have access to the admin panel or need further
        assistance, please reach out to the admin holder who can provide you
        with a new access link.
      </P>
    </FixturaSection>
  );
};

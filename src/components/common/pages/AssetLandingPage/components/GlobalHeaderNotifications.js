import { P } from "@/components/Type/Paragraph";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { FixturaGRIDCOL } from "@/layouts/Grids/grid";
import { useContext } from "react";

export const GlobalHeaderNotifications = () => {
  const settings = useContext(FixturaSettings);

  const { GlobalHeaderNotifications } = settings.Announcement;
  if (!GlobalHeaderNotifications.show) return null;
  return (
    <FixturaGRIDCOL span={12}>
      <FixturaPaper c={8}>
        <P mx={10} my={15} c={"white"}>
          🔔 Network Outage Update [Date: 2024-01-16]
        </P>
        <P mx={10} my={15} c={"white"}>
          We sincerely apologize for the delays and errors experienced with
          today&apos;s renders. Our team has been diligently working throughout
          the morning to resolve the network issues that occurred during the
          overnight rendering of your assets.
        </P>
        <P mx={10} my={15} c={"white"}>
          As of now, we have implemented a temporary solution and are actively
          developing a more robust fix in the coming days. If you find any of
          your assets to be incorrect or missing, please don&apos;t hesitate to
          contact us via our Facebook page. We are here to assist and ensure
          everything is sorted out promptly
        </P>
        <P mx={10} my={15} c={"white"}>
          We are here to assist and ensure everything is sorted out promptly
        </P>
      </FixturaPaper>
    </FixturaGRIDCOL>
  );
};

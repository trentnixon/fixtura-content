"use client";
import { useRouter } from "next/navigation";
import { BackButtonAsNavLink } from "@/components/Navigation/BackBtn";
/*  */ import {
  ICO_CALENDARDUE,
  ICO_PIE,
  ICO_SCOREBOARD,
} from "@/components/UI/Icons";
import { NavLinkWithIcon } from "@/components/UI/buttons";
import { FixturaPaper } from "@/components/containers/paper";

export const SideNavSelectedRender = ({ DATAOBJ, LINKPREPATH }) => {
  const router = useRouter();
  console.log("Page.js - SideNavSelectedRender");
  return (
    <FixturaPaper>
      <NavLinkWithIcon
        label="UPCOMING EVENTS"
        description={`${
          DATAOBJ.INT.Upcoming.w + DATAOBJ.INT.Upcoming.dl
        } Items about this weeks events `}
        Icon={<ICO_CALENDARDUE />}
        onClick={() => {
          router.push(`${LINKPREPATH}/u`);
        }}
      />
      <NavLinkWithIcon
        label="RESULTS"
        description={`${
          DATAOBJ.INT.Results.w + DATAOBJ.INT.Results.dl
        } Items relating to the previoud 7 days `}
        Icon={<ICO_SCOREBOARD />}
        onClick={() => {
          router.push(`${LINKPREPATH}/r`);
        }}
      />
      <NavLinkWithIcon
        label="STATISTICS"
        description={`${
          DATAOBJ.INT.Statitics.w + DATAOBJ.INT.Statitics.dl
        } statistic related assets `}
        Icon={<ICO_PIE />}
        onClick={() => {
          router.push(`${LINKPREPATH}/o`);
        }}
      />
      <BackButtonAsNavLink />
    </FixturaPaper>
  );
};

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { BackButtonAsNavLink } from "@/components/Navigation/BackBtn";

import {
  ICO_PHOTO,
  ICO_BOOK,
  ICO_GAME,
  ICO_VIDEO,
} from "@/components/UI/Icons";
import { NavLinkWithIcon } from "@/components/UI/buttons";
import { FixturaPaper } from "@/components/containers/paper";

export const SideNavSelectedCategory = ({ LINKPREPATH, Category='overview' }) => {
  const router = useRouter();

  console.log("Page.js - SideNavSelectedCategory");
  return (
    <FixturaPaper>
      <NavLinkWithIcon
        active={Category === "overview"}
        label="Overview"
        description="A round up of the weeks events"
        Icon={<ICO_BOOK />}
        onClick={() => {
          router.push(`${LINKPREPATH}`);
        }}
      />
      <NavLinkWithIcon
        label="Articles"
        active={Category === "Articles"}
        description="List of the Weeks fixtures"
        Icon={<ICO_GAME />}
        onClick={() => {
          router.push(`${LINKPREPATH}/m`);
        }}
      />
      <NavLinkWithIcon
        label="Videos"
        active={Category === "Videos"}
        description="List of the Weeks fixtures"
        Icon={<ICO_VIDEO />}
        onClick={() => {
          router.push(`${LINKPREPATH}/v`);
        }}
      />
      <NavLinkWithIcon
        label="Images"
        active={Category === "Images"}
        description="List of the Weeks fixtures"
        Icon={<ICO_PHOTO />}
        onClick={() => {
          router.push(`${LINKPREPATH}/i`);
        }}
      />

      <BackButtonAsNavLink />
    </FixturaPaper>
  );
};

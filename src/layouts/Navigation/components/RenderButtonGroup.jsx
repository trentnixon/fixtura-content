import React from "react";
// Import the sports navigation configuration
import { SideNavigationByAccount } from "@/layouts/Navigation/components/SideNavigationByAccount";
import { ReturnHomeBTN } from "@/layouts/Navigation/components/ReturnHomeBTN";
import { FindAccountSport, FindAccountType } from "@/utils/actions";

export const RenderButtonGroup = ({ accountBasic, onButtonClick }) => {
  if (!accountBasic) {
    return null;
  }
  const { sport, account_type } = accountBasic;
  const accountType = account_type;
  const accountSport = sport;

  if (!accountType || !accountSport) {
    return null;
  }

  return (
    <>
      <SideNavigationByAccount
        onButtonClick={onButtonClick}
        AccountType={accountType}
        AccountSport={accountSport}
      />
      <ReturnHomeBTN />
    </>
  );
};

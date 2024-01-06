"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { QuickSelectNavigationOptionsForAccountType } from "@/components/PageOverview/QuickSeelctNavigationOptionsForAccountType";

export function NavigationSelect(props) {
/*   const { OBJ } = props;
  const params = useParams(); */


  return (
    <QuickSelectNavigationOptionsForAccountType
     /*  params={params} */
      {...props}
    />
  );
}

// Usage:
// Include <NavigationSelect /> in your page component where you want the navigation select to appear.

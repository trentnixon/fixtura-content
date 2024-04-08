"use client"
import { createContext, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

export const FixturaSettings = createContext();

export const FixturaSettingsProvider = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [compositionID, setCompositionID] = useState(null);
  // Define settings within the component to include dynamic isMobile state
  const settings = {
    Announcement: {
      NewTemplate: {
        show: false,
        Template: "CNSW",
      },
      GlobalHeaderNotifications:{
        show: false,
      }
    },
    UI: {
      isMobile,
    },
    setCompositionID,
    compositionID
  };

  return (
    <FixturaSettings.Provider value={settings}>
      {children}
    </FixturaSettings.Provider>
  );
};

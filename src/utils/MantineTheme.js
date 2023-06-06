import { MantineProvider } from "@mantine/core";

export const MantineProviderWrapper = (props) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        fontFamily: "Roboto,Roboto,sans-serif",
        colors: {
          members: [
            "#FFFFFF",
            "#F8F8F8",
            "#333333",
            "#4C72A0",
            "#6699CC",
            "#80B3FF",
            "#66CC66",
            "#FF9966",
            "#CC6666",
            "#993366",
          ],
          gradients: [
            "linear-gradient(0deg, #4C72A0 0%, #6699CC 100%)",
            "linear-gradient(180deg, #6699CC 0%, #4C72A0 100%)",
            "linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)",
            "linear-gradient(0deg, #F8F8F8 0%, #FFFFFF 100%)",
          ],
        },
        primaryColor: "members",
      }}
    >
      {props.children}
    </MantineProvider>
  );
};

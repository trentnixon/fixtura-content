"use client";
import { useEffect } from "react";
import { Gradient } from "@/utils/Gradient";
import { createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  gradientCanvas: {
    width: "100%",
    minHeight: "250px",
    maxHeight: "300px",
    position: "absolute",
    "--gradient-color-4": "#A5D8FF",
    "--gradient-color-1": "#338C81",
    "--gradient-color-2": "#EDFBFF",
    "--gradient-color-3": "#D7F0EC",
  },
  gradientCanvasMobile: {
    width: "100%",
    minHeight: "250px",
    maxHeight: "200px",
    position: "absolute",
    "--gradient-color-4": "#A5D8FF",
    "--gradient-color-1": "#338C81",
    "--gradient-color-2": "#EDFBFF",
    "--gradient-color-3": "#D7F0EC",
  },
}));
export const MainCSSBanner = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      className={
        isMobile ? classes.gradientCanvasMobile : classes.gradientCanvas
      }
      data-transition-in
    />
  );
};

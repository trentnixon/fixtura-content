"use client";
import { useEffect } from "react";
import { Gradient } from "@/utils/Gradient";
import { createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  gradientCanvas: {
    width: "100%",
    minHeight: "200px",
    maxHeight: "225px",
    position: "absolute",
    "--gradient-color-1": "#A5D8FF",
    "--gradient-color-2": "#E7F5FF",
    "--gradient-color-3": "#E3FAFC",
    "--gradient-color-4": "#F8F9FA",
   
   
  },
  gradientCanvasMobile: {
    width: "100%",
    minHeight: "200px",
    maxHeight: "225px",
    position: "absolute",
    "--gradient-color-1": "#A5D8FF",
    "--gradient-color-2": "#E7F5FF",
    "--gradient-color-3": "#E3FAFC",
    "--gradient-color-4": "#F8F9FA",
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

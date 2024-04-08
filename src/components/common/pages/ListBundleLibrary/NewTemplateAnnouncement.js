"use client";
import { CNSWTemplateNewLayout } from "@/components/Promotions/CNSWTemplateNewLayout";
import { FixturaGRIDCOL } from "@/layouts/Grids/grid";
import { FixturaSettings } from "@/context/ContextFixturaSettings";
import { useContext } from "react";

export const NewTemplateAnnouncement = () => {
  const settings = useContext(FixturaSettings);

  const { NewTemplate } = settings.Announcement;
  const Templates = {
    CNSW: <CNSWTemplateNewLayout />,
  };

  if (!NewTemplate.show) return null;
  return (
    <FixturaGRIDCOL span={12}>{Templates[NewTemplate.Template]}</FixturaGRIDCOL>
  );
};

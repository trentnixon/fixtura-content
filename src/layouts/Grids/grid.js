"use client";
import { Grid } from "@mantine/core";

export const FixturaGRIDOUTER = (props) => <Grid>{props.children}</Grid>;
export const FixturaGRIDCOL = (props) => (
  <Grid.Col xs={12} sm={props.span}>{props.children}</Grid.Col>
);

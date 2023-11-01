"use client";
import { Table } from "@mantine/core";

export const FixturaTable = (props) => (
  <Table
    striped
    highlightOnHover
    horizontalSpacing="md"
    verticalSpacing="md"
    fontSize="md"
  >
    {props.children}
  </Table>
);
/* export const FixturaGRIDCOL = (props) => (
  <Grid.Col xs={12} sm={props.span}>{props.children}</Grid.Col>
); */

"use client";
import { Grid } from "@mantine/core"

export const FixturaGRIDOUTER = (props)=><Grid>{props.children}</Grid>
export const FixturaGRIDCOL = (props)=> <Grid.Col span={props.span}>{props.children}</Grid.Col>
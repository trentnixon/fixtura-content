"use client";
// RechartComponents.js

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Pie,
  Legend,
  Sector,
  Cell,
  BarChart,
} from "recharts";
import { Retheme } from "./theme"; // import the theme



export const FixturaBarChart = (props) => <BarChart {...props} />;
export const FixturaBar = (props) =>{return(<Bar {...props} />)} ;

export const FixturaPie = (props) => <Pie {...props} />;
export const FixturaCell = (props) => <Cell {...props} />;

export const FixturaXAxis = (props) => <XAxis {...props} />;
export const FixturaYAxis = (props) => <YAxis {...props} />;
export const FixturaCartesianGrid = (props) => (
  <CartesianGrid {...props} stroke={Retheme.colors[1]} />
);

export const FixturaTooltip = (props) => (
  <Tooltip {...props} cursor={{ fill: Retheme.colors[1] }} />
);


export const FixturaLegend = (props) => <Legend {...props} />;
export const FixturaSector = (props) => <Sector {...props} />;


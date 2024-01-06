"use client";
import { NavigationSelect } from "@/components/PageKey/client/RenderCategorySelect";
import { FixturaGroup } from "@/components/containers/Group";
import {
  FixturaContainer,
  FixturaVideoContainer,
} from "@/components/containers/containers";
import { formatStrapiCreatedOnDate } from "@/utils/actions";
import { Title } from "@mantine/core";

export const H = (props) => {
  const {
    weight = "700",
    align = "left",
    underline = false,
    color = "gray.7",
    italic = false,
    size = "h1",
    mx = 0,
    my = 0,
    lh = `1.5em`,
  } = props;

  return (
    <Title
      size={size}
      weight={weight}
      align={align}
      underline={underline}
      color={color}
      italic={italic}
      mx={mx}
      my={my}
      lh={lh}
    >
      {props.children}
    </Title>
  );
};

export const PageTitleAndCreated = (props) => {
  return (
    <FixturaGroup position="right">
      <NavigationSelect {...props} />
    </FixturaGroup>
  );
};

/*  <FixturaVideoContainer>
        <H size={"h6"} lh={`1.1em`} italic={true}>
          {formatStrapiCreatedOnDate(createdAt)}
        </H>
      </FixturaVideoContainer> */

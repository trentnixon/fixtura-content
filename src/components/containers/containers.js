"use client"
import { Container } from "@mantine/core";

export const FixturaContainer = ({ children }) => {
  return (
    <Container my="md" size={`xl`}>
      {children}
    </Container>
  );
};

export const FixturaVideoContainer = ({ children }) => {
  return (
    <Container my={0} size={`xs`}>
      {children}
    </Container>
  );
};

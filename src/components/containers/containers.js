"use client"
import { Container } from "@mantine/core";

export const FixturaContainer = ({ children }) => {
  return (
    <Container my="md" size={`xl`}>
      {children}
    </Container>
  );
};

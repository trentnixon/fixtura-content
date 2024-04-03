"use client";
// Dev Note: Refactored to improve readability, reusability, and ensure consistency across components.
// Future Improvements: Consider implementing a context or a provider for theme-related properties to avoid repetitive code.

import { Image } from '@mantine/core';
import { DefaultLogo } from '@/components/UI/svg';

// Generalized Image component with default values and extended customization through props.
// This component now serves as a base for any specific logo or image requirement within the application.
const GenericImage = ({ src, alt, width = 'auto', height = 'auto', radius = 0, sx }) => {
  // Dev Note: Added error handling to ensure the component gracefully handles missing src prop.
  if (!src) {
    console.error('GenericImage component requires a "src" prop.');
    // Consider rendering a fallback image or a placeholder here.
    return null;
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fit="cover"
      radius={radius}
      sx={sx}
    />
  );
};

// Specific instance of GenericImage tailored for the Fixtura header logo.
export const FixturaHeaderLogo = ({ Logo, AccountLabel, width = 40, height = 40 }) => (
  <GenericImage
    src={Logo}
    alt={AccountLabel}
    width={width}
    height={height}
    radius={100}
  />
);

// Specific instance of GenericImage tailored for the Fixtura account logo, including a fallback to a default logo.
export const FixturaAccountLogo = ({ Logo, AccountLabel }) => (
  Logo ? (
    <GenericImage
      src={Logo}
      alt={AccountLabel}
      width={120}
      height={120}
      radius={100}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        textAlign: 'center',
        borderRadius: '100%',
      })}
    />
  ) : (
    <div style={{ width: '120px', height: '120px' }}>
      <DefaultLogo />
    </div>
  )
);

// Simplified AssetImage component, directly utilizing GenericImage for consistency.
export const AssetImage = ({ URL }) => (
  <GenericImage
    src={URL}
    alt="Asset"
    width="100%"
    height="auto"
    sx={(theme) => ({
      backgroundColor: theme.colors.gray[2],
      textAlign: 'center',
    })}
    fit="contain"
  />
);

// Notes for an LLM:
// - This file defines React components for displaying various types of images within the Fixtura application.
// - The components include a generic image component, a header logo, an account logo, and a component for asset images.
// - They make use of the @mantine/core library for styling and theming.
// - These components are likely used throughout the application wherever images or logos are required.
// - The components are located in the components/UI/ or components/Images directory, based on their usage and the application's folder structure.

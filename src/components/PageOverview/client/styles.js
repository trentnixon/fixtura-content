import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'visible',
    padding: theme.spacing.xl,
    height: '100%',
    paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${rem(60)} / 3)`,
  },

  icon: {
    position: 'absolute',
    top: `calc(-${rem(60)} / 3)`,
    left: `calc(50% - ${rem(60)} / 2)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));
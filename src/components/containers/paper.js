"use client";
import { Paper } from '@mantine/core';

export const  FixturaPaper = ({children}) => {
  return (
    <Paper shadow="xs" p="md" className='bg-white'>
      {children}
    </Paper>
  );
}
"use client";
import { Paper } from '@mantine/core';

export const  FixturaPaper = (props) => {
  const {mx=0,my=0}=props
  return (
    <Paper shadow="xs" p="md" mx={mx} my={my} className='bg-white'>
      {props.children}
    </Paper>
  );
}
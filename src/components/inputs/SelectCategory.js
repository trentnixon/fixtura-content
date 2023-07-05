"use client";
import { Button, Select, rem } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import { useState,useEffect  } from "react";
import {
  IconCalendarDue,
  IconScoreboard,
  IconChartPie4,
  IconHome2,
} from "@tabler/icons-react";


const CATEGORIES = [
  { value: "", title: "RENDER", icon: <IconHome2 /> },
  { value: "r", title: "RESULTS", icon: <IconScoreboard /> },
  { value: "o", title: "STATISTICS", icon: <IconChartPie4 /> },
  { value: "u", title: "UPCOMING", icon: <IconCalendarDue /> },
];

export const SelectACategory = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    console.log(pathname)
    const lastPathSegment = pathname.split("/").pop();
    setSearchValue(lastPathSegment);
  }, [pathname]);

  const DirectToRender = (value) => {
    setSearchValue(value);
    router.push(`${params.id}/${params.render}/${value}`);
  };

  return (
    <Select
      label=""
      placeholder="categories"
      onChange={DirectToRender}
      value={searchValue}
      data={CATEGORIES}
    />
  );
};


export const SelectACategoryBtnGroup = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    const lastPathSegment = pathname.split("/").pop();
    setSearchValue(lastPathSegment);
  }, [pathname]);

  const DirectToRender = (value) => {
    setSearchValue(value);
    router.push(`${params.id}/${params.render}/${value}`);
  };

  return (
    <Button.Group>
      {CATEGORIES.map((c, i) => {
        return (
          <Button
            styles={(theme) => ({
              root: {
                backgroundColor: searchValue === c.value ? `${theme.colors.blue[5]} !important` : `transparent`,
                color: searchValue === c.value ? `${theme.colors.gray[2]} ` : `${theme.colors.gray[6]}`,
                height: rem(42),
                paddingLeft: rem(20),
                paddingRight: rem(20),
                "&:hover": {
                  backgroundColor: theme.colors.blue[5],
                  color: theme.colors.gray[3],
                }, 
                leftIcon: {
                  marginRight: theme.spacing.md,
                },
                
              },
            })}
            key={i}
            variant="filled"
          
            leftIcon={c.icon}
            onClick={() => {
              DirectToRender(c.value);
            }}
          >
            {c.title}
          </Button>
        );
      })}
    </Button.Group>
  );
};
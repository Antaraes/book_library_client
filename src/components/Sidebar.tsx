"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  BookOpenIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "@/redux/hook";
import { getBookmarks } from "@/redux/book/bookSlice";

export function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const bookmarksByUser = useAppSelector(getBookmarks);
  console.log(bookmarksByUser);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className=" w-full max-w-[20rem] static p-4 rounded-none   shadow-[rgba(0,0,0,0.1)_5px_5px_10px_0px]">
      <div className="mb-2 flex items-center gap-4 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 14 14">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <rect width="3.5" height="13" x=".55" y=".5" rx=".5" />
            <rect width="3.5" height="11" x="4.05" y="2.5" rx=".5" />
            <rect
              width="3"
              height="11"
              x="9.26"
              y="2.3"
              rx=".5"
              transform="rotate(-14.05 10.779 7.795)"
            />
            <path d="M.55 10h3.5m0-1h3.5m2.5 2l2.88-.72" />
          </g>
        </svg>
        <Link href={"/"}>
          <Typography className=" cursor-pointer" variant="h5" color="blue-gray">
            AJM
          </Typography>
        </Link>
      </div>
      <div className="p-2">
        <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Search"
          crossOrigin={undefined}
        />
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <BookOpenIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Book
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                New Release
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Popular
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Best Seller
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <BookmarkIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Bookmark
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {bookmarksByUser.map((bookmark, index) => (
                <>
                  <ListItem key={index} selected={open === index}>
                    <AccordionHeader onClick={() => handleOpen(index)} className="border-b-0 p-3">
                      <ListItemPrefix>
                        <BookmarkSquareIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="mr-auto font-normal">
                        {bookmark.bookTitle}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {bookmark.bookmarkPages.map((page, index) => (
                        <ListItem key={index}>Page No - {page.page_no}</ListItem>
                      ))}
                    </List>
                  </AccordionBody>
                </>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
      </List>
      <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
          and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert>
    </Card>
  );
}

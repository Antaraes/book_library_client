"use client";
import { FC, FormEvent, useState } from "react";
import Cookies from "universal-cookie";
import { isAuthenticated, logout, setAuth } from "@/redux/auth/authSlice";
import api from "@/api/book.api";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
];
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleLogout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api.post("/auth/logout");
    dispatch(logout());
    console.log("Logout");

    window.location.reload();
  };
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 w-10 h-10"
            src="user.jpg"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
        <MenuItem
          onClick={(e) => handleLogout(e)}
          className={`flex items-center gap-2 rounded "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" `}
        >
          {React.createElement(PowerIcon, {
            className: `h-4 w-4 text-red-500 `,
            strokeWidth: 2,
          })}
          <Typography as="span" variant="small" className="font-normal" color="red">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
const navListItems = [
  {
    label: "Book Store",
  },
  {
    label: "WishList",
  },
  {
    label: "Podcasts",
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-5 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {label}
        </Typography>
      ))}
    </ul>
  );
}
interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const router = useRouter();
  const isAuth: boolean = useAppSelector(isAuthenticated);
  const cookies = new Cookies();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setIsNavOpen(false));
  }, []);
  return (
    <Navbar className="mx-auto w-full sticky rounded-none bg-white  p-2  lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900 ">
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="white"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden block"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        {isAuth ? (
          <ProfileMenu />
        ) : (
          <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
        )}
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default Header;

import { faker } from "@faker-js/faker";
import {
  AddressBook,
  ChatCircleDots,
  FilmScript,
  Gear,
  GearSix,
  House,
  SignOut,
  User,
} from "phosphor-react";
import NK from "../assets/Images/team-member1.jpg";
import AL from "../assets/Images/team-member2.jpg";
import VB from "../assets/Images/team-member4.jpeg";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Settings",
    icon: <Gear />,
  },
  {
    title: "Logout",
    icon: <SignOut />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    title: "Home",
    icon: <House />,
  },
  {
    index: 1,
    title: "Enrollment Form",
    icon: <FilmScript />,
  },
  {
    index: 2,
    title: "Contact",
    icon: <AddressBook />,
  },
  {
    index: 3,
    title: "FAQs",
    icon: <ChatCircleDots />,
  },
];

const Nav_Setting = [
  {
    index: 4,
    title: "Settings",
    icon: <GearSix />,
  },
];

const TeamMember = [
  {
    id: 0,
    name: "Navdeep Khede",
    image: NK,
  },
  {
    id: 1,
    name: "Vivek Barnwal",
    image: VB,
  },
  {
    id: 2,
    name: "Mohit",
    image: faker.image.avatar(),
  },
  {
    id: 3,
    name: "Alok Ranjan",
    image: AL,
  },
];

export { Profile_Menu, Nav_Setting, Nav_Buttons, TeamMember };

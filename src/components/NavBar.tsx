import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <text>Dashboard</text>
      <text>|</text>
      <text>Overview</text>
      <text>|</text>
      <text>Trucks</text>
      <text>|</text>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;

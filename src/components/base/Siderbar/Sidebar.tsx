import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavItem } from "~/components/ui/Navigation/Navigation";
import { SidebarProps } from "./SidebarType";
import { LinkItems } from "./SidebarItems";
import { OngoingBattleComponents } from "~/components/OngoingBattleComponent";

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Task Monster
        </Text>
        <CloseButton  display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Box mt={10}>
        <OngoingBattleComponents/>
      </Box >
     
    </Box>
  );
};

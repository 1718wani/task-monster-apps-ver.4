

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  
} from '@chakra-ui/react'
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
 
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import HomeList from '~/pages/HomeList'
import { tasksForHome } from '~/types/AllTypes'
import { GiBattleAxe } from 'react-icons/gi';
import { BsPeopleFill} from 'react-icons/bs';
import { VscGraph} from "react-icons/vsc";
import { SidebarContent } from './base/Siderbar/Sidebar'
import { MobileNav } from './ui/Navigation/Navigation'




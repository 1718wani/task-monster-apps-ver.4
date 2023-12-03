import { BoxProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href:string;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

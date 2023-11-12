import { FlexProps } from "@chakra-ui/react"
import { IconType } from "react-icons"

export interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
  }
  
export  interface MobileProps extends FlexProps {
    onOpen: () => void
  }
import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { SidebarContent } from "../Siderbar/Sidebar"
import { MobileNav } from "~/components/ui/Navigation/Navigation"
import { useRouter } from "next/router"

export default function Layout({ children }){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
  
    return (
      <Box minH="100vh" bg={router.pathname.startsWith("/battletask/") ? "linear-gradient(45deg, #1A202C, #3182CE)": "gray.200"}>
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
        <main>{children}</main>
        </Box>
      </Box>
    )
  }
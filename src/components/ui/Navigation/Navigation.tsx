import {
  Avatar,
  Box,
  Flex,
  HStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Select,
  Progress,
  Skeleton,
  Image,
} from "@chakra-ui/react";
import { type MobileProps, type NavItemProps } from "./NavigationType";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";




import { signOut, useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { type User } from "@prisma/client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { fetcher } from "~/lib/swr-fetcher";
import { baseUrl } from "~/consts/url-paths";

// アイコン画像をログインユーザーによって切り替えたい

export const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "teal.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface customUserDataInput {
  customName: string;
  sex: "男性" | "女性";
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { data: session } = useSession();
  //Googleでログインすると以下のような値が入っている
  //   {
  //     "id": "cln0dunqp0005fw2lh3yq7nkl",
  //     "name": "三谷育也",
  //     "email": "ikuya1293@gmail.com",
  //     "emailVerified": null,
  //     "image": "https://lh3.googleusercontent.com/a/ACg8ocLJPLFvev1da4GBlV3tTcmrFmsQIiLPqjt7D5hX1hBYOR8=s96-c",
  //     "completedMinutes": 0
  // }

  const {
    isOpen: isCustomUserFormOpen,
    onOpen: onCustomUserFormOpen,
    onClose: onCustomUserFormClose,
  } = useDisclosure({ defaultIsOpen: true });

  const [apiResponse, setApiResponse] = useState<User>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<customUserDataInput>();

  const handleLoguoutBtn = async () => {
    await signOut({ callbackUrl: `${baseUrl}` });
  };

  const urlWithUserId = (userId: string | undefined) => {
    return `${baseUrl}/api/users/${userId}`;
  };

  const { data, isLoading } = useSWR<User, Error>(
    () => urlWithUserId(session?.user.userId),
    fetcher
  );

  const onSubmit = async (data: customUserDataInput) => {
    console.log(data, "送信されたユーザーデータ");
    try {
      const response = await axios.put(
        `${baseUrl}/api/users/${session?.user.userId}`,
        {
          // APIエンドポイントに注意
          customName: data.customName,
          sex: data.sex,
        }
      );
      setApiResponse(response.data as User);
    } catch (error) {
      console.error("ユーザー情報のアップデートに失敗しました", error);
    }
  };

  const updateUserDataByMutate = async () => {
    onCustomUserFormClose();
    await mutate(urlWithUserId(session?.user.userId));
  };

  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Monster Task
        </Text>
        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            {isLoading && <Spinner />}
            {!isLoading && data?.customName == null && session && (
              <>
                <Modal
                  isOpen={isCustomUserFormOpen}
                  onClose={onCustomUserFormClose}
                  closeOnOverlayClick={false}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      {!isSubmitting && !isSubmitSuccessful && (
                        <Box>あなたのアバターを作成しましょう</Box>
                      )}
                      {isSubmitting && <Box>アバターを作成しています...</Box>}
                      {isSubmitSuccessful && (
                        <Box>アバターが生成されました！</Box>
                      )}
                    </ModalHeader>
                    {isSubmitting && (
                      <ModalBody>
                        <>
                          <Progress rounded="lg" size="md" isIndeterminate />
                          <Skeleton rounded={20} boxSize="300px" />
                        </>
                      </ModalBody>
                    )}

                    {isSubmitSuccessful && (
                      <>
                        <ModalBody>
                          <>
                            <Text>{apiResponse?.customName}</Text>
                            <Image
                              rounded={20}
                              boxSize="300px"
                              src={
                                apiResponse?.customImage
                                  ? apiResponse?.customImage
                                  : ""
                              }
                              alt="customUser"
                              shadow={"xl"}
                            />
                          </>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={async () => {
                              await updateUserDataByMutate();
                            }}
                          >
                            冒険を始める
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                    {!isSubmitting && !isSubmitSuccessful && (
                      <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <FormControl isInvalid={!!errors.customName}>
                            <FormLabel htmlFor="customUserName">
                              ユーザー名
                            </FormLabel>
                            <Input
                              id="customUserName"
                              placeholder="ユーザーネーム"
                              {...register("customName", {
                                required: "必須項目です",
                              })}
                            />
                            {errors.customName && (
                              <FormErrorMessage>
                                {errors.customName.message}
                              </FormErrorMessage>
                            )}

                            <FormLabel pt={2} htmlFor="sex">
                              性別
                            </FormLabel>

                            <Select id="sex" {...register("sex", {})}>
                              <option value="男性">男性</option>
                              <option value="女性">女性</option>
                            </Select>
                            {errors.sex && (
                              <FormErrorMessage>
                                {errors.sex.message}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <Button
                            mt={4}
                            colorScheme="teal"
                            loadingText="送信中です"
                            isLoading={isSubmitting}
                            type="submit"
                          >
                            送信する
                          </Button>
                        </form>
                      </ModalBody>
                    )}
                  </ModalContent>
                </Modal>
              </>
            )}
            {data && (
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      size={"sm"}
                      src={
                        data.customImage
                          ? data.customImage
                          : "https://bit.ly/broken-link"
                      }
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text suppressHydrationWarning fontSize="sm">
                        {data.customName ? data.customName : "No Name"}
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList bg={"white"} borderColor={"gray.200"}>
                  <MenuItem onClick={handleLoguoutBtn}>ログアウト</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import { getToken } from "next-auth/jwt";
import {
  Button,
  Center,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
          >
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
            <ModalContent>
              <ModalHeader>ログインしてね</ModalHeader>

              <ModalBody>
                <Button
                  onClick={() => signIn(provider.id)}
                  w={"full"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                >
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = await getToken({ req: context.req });

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (token) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

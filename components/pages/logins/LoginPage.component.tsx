import {
  Box,
  Image,
  Center,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Logo } from "@/components/logo/Logo.component";
import { useReactFormHook } from "@/hooks/useReactFormHook.hook";
import * as yup from "yup";
import { useState } from "react";

interface IProps {}

type LoginValues = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export const LoginPage = ({}: IProps) => {
  const { handleSubmit, register, formState } = useReactFormHook<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    schema,
  });

  const { errors } = formState;

  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => {
    setShow(!show);
  };

  const onSubmit = async (data: LoginValues): Promise<void> => {
    console.log("data", data);
  };

  return (
    <>
      <Box className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Box className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Center>
            <Logo h={60} />
          </Center>
        </Box>

        <Box className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email?.message}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email..." {...register("email")} />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password?.message}>
              <FormLabel>Password</FormLabel>

              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Password..."
                  {...register("password")}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>

            <Box>
              <Button
                colorScheme="teal"
                type="submit"
                className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

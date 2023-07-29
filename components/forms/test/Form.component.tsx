import React, { useRef } from "react";
import { useReactFormHook } from "@/hooks/useReactFormHook.hook";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";

import * as yup from "yup";

type CustomFormValues = {
  name: string;
  email: string;
  age: number;
};

const schema = yup
  .object({
    name: yup.string().required().min(6).max(20),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

export const MyForm = ({ onSuccess }: { onSuccess?: Function }) => {
  const { handleSubmit, register, formState } =
    useReactFormHook<CustomFormValues>({
      defaultValues: {
        name: "phanu",
        email: "ll@mail.cc",
        age: 78,
      },
      schema,
    });

  const { errors } = formState;

  const onSubmit = async (data: CustomFormValues): Promise<void> => {
    console.log("data", data);

    if (onSuccess) {
      onSuccess(data);
    }
  };

  return (
    <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
      <Box className=" grid grid-cols-1 gap-4">
        <FormControl isInvalid={!!errors.name?.message}>
          <FormLabel>First Name</FormLabel>
          <Input placeholder="First name..." {...register("name")} />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email?.message}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email..." {...register("email")} />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.age?.message}>
          <FormLabel>Age</FormLabel>
          <Input type="number" placeholder="Age..." {...register("age")} />
          <FormErrorMessage>{errors?.age?.message}</FormErrorMessage>
        </FormControl>
      </Box>
    </form>
  );
};

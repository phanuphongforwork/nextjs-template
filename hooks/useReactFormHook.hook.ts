import { useState } from "react";
import { useForm, UseFormReturn, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

type CustomFetchFunction<T extends FieldValues> = (data: T) => Promise<any>;

type SubmitHandler<T extends FieldValues> = CustomFetchFunction<T>;

type UseFormWithNextReturn<T extends FieldValues> = {
  handleSubmit: (
    onValid: SubmitHandler<T>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormReturn<T>["register"];
  formState: UseFormReturn<T>["formState"];
  setValue: UseFormReturn<T>["setValue"];
};

type FormType = {
  defaultValues: any; // {}
  schema: ObjectSchema<any>;
};
export const useReactFormHook = <T extends FieldValues>({
  defaultValues,
  schema,
}: FormType): UseFormWithNextReturn<T> => {
  const { register, handleSubmit, formState, setValue } = useForm<T>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit: (onValid) => handleSubmit(onValid),
    formState: formState,
    setValue,
  };
};

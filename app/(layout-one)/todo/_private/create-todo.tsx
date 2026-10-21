"use client";

import {
  FieldErrorUtil,
  FormSubmittingUtil,
} from "@/components/general/client-util";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { FormAction } from "@/lib/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { CreateTodoAction } from "./actions";
import { CreateTodoSchema } from "./schemas";

export const CreateTodo = () => {
  const form = useForm<z.infer<typeof CreateTodoSchema>>({
    resolver: zodResolver(CreateTodoSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateTodoSchema>) => {
    const formData = new FormData();
    // formData.append("title", data.title);
    // const action = await CreateTodoAction(formData);
    const res = await FormAction(form, CreateTodoAction(formData));
    console.log(res);
  };

  return (
    <form
      onSubmit={form?.handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <Controller
        control={form?.control}
        name="title"
        render={({ field, fieldState }) => (
          <Field>
            <Textarea
              {...field}
              placeholder="My todo..."
              className="h-40"
            />
            <FieldErrorUtil fieldState={fieldState} />
          </Field>
        )}
      />
      <Button type="submit">
        <FormSubmittingUtil form={form} />
        Create Todo
      </Button>
    </form>
  );
};

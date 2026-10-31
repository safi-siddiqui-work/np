"use client";

import { FormAction } from "@/lib/form";
import {
  FieldErrorUtil,
  FormSubmittingUtil,
  ToastUtil,
} from "@/lib/shadcn/components/general/client-util";
import { Button } from "@/lib/shadcn/components/ui/button";
import { Field } from "@/lib/shadcn/components/ui/field";
import { Textarea } from "@/lib/shadcn/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { CreateTodoAction } from "./actions";
import { CreateTodoSchema } from "./schemas";

export const CreateTodo = () => {
  const form = useForm<z.infer<typeof CreateTodoSchema>>({
    resolver: zodResolver(CreateTodoSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateTodoSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    const res = await FormAction(form, CreateTodoAction(formData));
    return res?.success ? ToastUtil({ title: "Todo added" }) : undefined;
  };

  return (
    <form
      onSubmit={form?.handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <Controller
        control={form?.control}
        name="name"
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

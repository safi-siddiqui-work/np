import {
  ControllerFieldState,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { FieldError } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export const FieldErrorUtil = ({
  fieldState,
}: {
  fieldState: ControllerFieldState;
}) => fieldState.invalid && <FieldError errors={[fieldState.error]} />;

export const FormSubmittingUtil = <T extends FieldValues>({
  form,
}: {
  form: UseFormReturn<T>;
}) => form?.formState?.isSubmitting && <Spinner />;

export const WaitUtil = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export const ToastUtil = ({
  title,
  description,
  type = "success",
}: {
  title?: string;
  description?: string;
  type?: "default" | "success" | "info" | "warning" | "error";
}) =>
  toast?.add({
    title,
    description,
    type,
  });

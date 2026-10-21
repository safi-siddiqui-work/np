import { GeneralHeader } from "../_private/general-header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <GeneralHeader />
      {children}
    </>
  );
}

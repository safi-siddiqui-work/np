import { HomeHeader } from "../_private/home-header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <HomeHeader />
      {children}
    </>
  );
}

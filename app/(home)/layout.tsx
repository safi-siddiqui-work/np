import { HomeHeader } from "./_header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <HomeHeader />
      {children}
    </>
  );
}

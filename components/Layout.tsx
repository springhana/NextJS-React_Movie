import NavBar from "./NavBar";

type Layout = {
  children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}

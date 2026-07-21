import { Aside, Navbar, Menu } from "@/modules/private/components";
import { isAuthenticated } from "@/modules/auth/session";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await isAuthenticated();

  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-auto">
      <Navbar />
      <Aside child={<Menu />} />
      <main className="bg-background col-span-2 col-start-2 row-start-2 size-full overflow-y-auto">{children}</main>
    </div>
  );
}

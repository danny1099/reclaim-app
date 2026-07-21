import { Navbar } from "@/shared/components";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <Navbar options={{ logo: false }} />
      <main className="bg-background size-full overflow-y-auto">{children}</main>
    </div>
  );
}

import { LegalFooter, LegalNav } from "@/modules/legal/components";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <LegalNav />
      {children}
      <LegalFooter />
    </div>
  );
}

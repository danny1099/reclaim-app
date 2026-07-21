import { Metadata } from "next";
import { Title, P } from "@/shared/components";

export default async function Overview() {
  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-14">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-3xl">Overview</Title>
        <P className="text-2xs">Here you can see an overview of your account and its leaders.</P>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Overview",
  description: "Overview of your Reclaim account for recovering failed payments.",
};

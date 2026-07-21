interface AsideProps {
  child: React.ReactNode;
}

export const Aside = ({ child }: AsideProps) => {
  return (
    <aside className="bg-background col-start-1 row-span-2 row-start-1 flex flex-col max-sm:hidden sm:w-60 md:w-92">
      {child}
    </aside>
  );
};

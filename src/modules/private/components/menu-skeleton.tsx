"use client";

export const MenuSkeleton = () => {
  return (
    <div className="border-muted relative flex size-full flex-col border-r">
      <div className="bg-background flex h-20 w-full items-center px-4 md:px-12">
        <div className="ml-1.5 flex items-center gap-2.5">
          <div className="bg-muted size-7 animate-pulse rounded-md" />
          <div className="bg-muted h-4 w-24 animate-pulse rounded-md" />
        </div>
      </div>

      <div className="flex size-full flex-col gap-4 px-4 py-4 md:px-12">
        <div className="flex h-fit w-full flex-col">
          <ul className="relative w-full space-y-2">
            <li>
              <div className="bg-muted h-9 w-[95%] animate-pulse rounded-lg" />
            </li>
            <MenuLinkSkeleton />
            <MenuLinkSkeleton wide />
            <MenuLinkSkeleton />
          </ul>
        </div>

        <div className="bg-border-muted h-px w-full animate-pulse" />

        <div className="flex h-fit w-full flex-col">
          <div className="bg-muted mb-1 ml-3 h-3 w-16 animate-pulse rounded" />
          <ul className="relative w-full space-y-2">
            <MenuLinkSkeleton wide />
            <MenuLinkSkeleton />
          </ul>
        </div>

        <div className="flex h-fit w-full flex-col">
          <div className="bg-muted mb-1 ml-3 h-3 w-20 animate-pulse rounded" />
          <ul className="relative w-full space-y-2">
            <MenuLinkSkeleton />
            <MenuLinkSkeleton wide />
            <MenuLinkSkeleton />
          </ul>
        </div>
      </div>
    </div>
  );
};

/* Sub-skeleton para cada MenuLink */
const MenuLinkSkeleton = ({ wide = false }: { wide?: boolean }) => (
  <li className="flex w-[95%] items-center gap-3 rounded-lg px-3 py-2">
    {/* Icon placeholder */}
    <div className="bg-muted size-4 shrink-0 animate-pulse rounded" />
    {/* Label placeholder — varía el ancho para que se vea natural */}
    <div className={`bg-muted h-3.5 animate-pulse rounded ${wide ? "w-32" : "w-24"}`} />
  </li>
);

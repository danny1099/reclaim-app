"use client";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { type IconName, AnimatedContent, Divider } from "@/shared/components";
import { MenuGroup, MenuHeader, MenuLink } from "@/modules/private/components";
import { menuItems, menuSegments } from "@/modules/private/helpers";

export const Menu = () => {
  const t = useTranslations("menu");

  return (
    <div className="border-border/50 flex size-full flex-col border-r transition-all duration-300">
      <MenuHeader />
      <AnimatedContent className="relative flex size-full flex-col px-4 py-4 md:px-12">
        {menuSegments.map(({ group, title, styles, child }) =>
          group !== "component" ? (
            <MenuGroup key={group} title={title} className={styles}>
              <ul className="relative w-full space-y-2">
                {menuItems
                  .filter((i) => i.place === group)
                  .map(({ name, path, icon, render }) => {
                    const redirectTo = getPrivateRoute(path);
                    if (render === "divider")
                      return <Divider key={name} type="horizontal" className="bg-border-muted w-full" />;

                    return (
                      <li key={name}>
                        <MenuLink route={redirectTo} icon={icon as IconName}>
                          {/* @ts-ignore */}
                          {t(`items.${name}`)}
                        </MenuLink>
                      </li>
                    );
                  })}
              </ul>
            </MenuGroup>
          ) : (
            <MenuGroup key={group} className={styles}>
              {child}
            </MenuGroup>
          )
        )}
      </AnimatedContent>
    </div>
  );
};

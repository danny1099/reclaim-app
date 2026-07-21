# tRPC Router Example

- Example of implementation router for entity "organization"

```ts
import { param, procedure, router } from "@/trpc/init";
import { tryCatch, toSlug } from "@/shared/utils";
import { organizationSchema, organizationWithIdSchema } from "@/modules/organization/schema";
import type { OrganizationWithMembers, Organization } from "@/modules/organization/types";

export const organizationRouter = router({
  create: procedure.input(organizationSchema).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { name, style } = input;

    /* validate if organization slug already exists */
    const slug = toSlug(name);
    const organizationExisting = await ctx.db.organization.findFirst({ where: { slug } });
    if (organizationExisting) {
      return {
        data: null,
        status: "error",
        message: "organization_already_exists",
        code: 409,
      };
    }

    /* create organization and add user as member */
    const { data, error } = await tryCatch(
      auth.api.createOrganization({
        headers: ctx.headers,
        body: {
          name,
          slug,
          logo: style,
        },
      })
    );

    /* handle error if any occurs */
    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
        error,
      };
    }

    return {
      data: data as Organization,
      status: "success",
      message: "organization_created",
      code: 200,
    };
  }),
}),
getAll: procedure.query<APIResult<OrganizationWithMembers[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.organization.findMany({
        where: {
          OR: [{ members: { some: { userId: ctx.userId } } }],
        },
        include: { members: true },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    /* add isActive property to each organization */
    const result = data.map((org) => ({
      ...org,
      isActive: org.id === ctx.organizationId,
      members: org.members.length,
      role: org.members.find((m) => m.userId === ctx.userId)?.role,
    }));

    return {
      data: result as OrganizationWithMembers[],
      status: "success",
      message: null,
      code: 200,
    };
  })
```

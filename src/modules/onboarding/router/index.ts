import type { Brand } from "@prisma/client";
import { procedure, router } from "@/trpc/init";
import { isBase64Image, slugSanitize, base64ToFile, tryCatch } from "@/shared/utils";
import { onboardingSchema } from "@/modules/onboarding/schema";
import { uploadImage } from "@/shared/upload/cloudinary";

export const onboardingRouter = router({
  register: procedure.input(onboardingSchema).mutation<APIResult<Brand>>(async ({ ctx, input }) => {
    const { name, avatar, brand, logo, style_tone } = input;

    if (!ctx.userId)
      return {
        data: null,
        status: "error",
        message: "unauthorized",
        code: 401,
      };

    /* search if user exists with current signed in user */
    const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
    if (!user) {
      return {
        data: null,
        status: "error",
        message: "user_not_found",
        code: 409,
      };
    }

    /* convert brand name to slug and validate brand does not exist */
    const slug = slugSanitize(brand);
    const { data: brandData } = await tryCatch(
      ctx.db.brand.findUnique({
        where: { slug },
      })
    );

    if (brandData) {
      return {
        data: null,
        status: "error",
        message: "onboarding_brand_already_exists",
        code: 409,
      };
    }

    /* upload image logo to cloudinary and get secure url */
    const logoIsBase64 = isBase64Image(logo as string);
    const logoToFile = logoIsBase64 ? await base64ToFile(logo as string) : null;
    const logoUrl = logoToFile ? await uploadImage(logoToFile) : logo;

    const { data, error } = await tryCatch(
      ctx.db.brand.create({
        data: {
          name: brand,
          slug,
          style_tone,
          logo: logoUrl,
          userId: ctx.userId,
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        code: 500,
        message: "unknown_error",
        errorMessage: error?.message,
        error,
      };
    }

    /* upload image avatar to cloudinary and get secure url as avatar */
    const avatarIsBase64 = isBase64Image(avatar as string);
    const avatarToFile = avatarIsBase64 ? await base64ToFile(avatar as string) : null;
    const avatarUrl = avatarToFile ? await uploadImage(avatarToFile) : avatar;

    /* update user with workspace id and avatar url */
    const { data: userUpdate, error: userError } = await tryCatch(
      ctx.db.user.update({
        where: { id: ctx.userId },
        data: {
          name,
          image: avatarUrl,
          withOnboarding: true,
          role: "owner",
        },
      })
    );

    if (userError || !userUpdate) {
      return {
        data: null,
        status: "error",
        code: 500,
        message: "onboarding_not_completed",
        errorMessage: userError?.message,
        error: userError,
      };
    }

    return {
      data,
      status: "success",
      message: "onboarding_completed",
      code: 200,
    };
  }),
});

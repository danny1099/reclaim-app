export const routes = {
  public: {
    prefix: "/",
    routes: {
      home: "",
      auth: {
        prefix: "auth",
        routes: {
          sign_in: "/sign-in",
          get_started: "/get-started",
          forgot_password: "/forgot-password",
        },
      },
    },
  },

  private: {
    prefix: "/",
    routes: {
      onboarding: "onboarding",
      main: {
        prefix: "main",
        routes: {
          overview: "/overview",
        },
      },
    },
  },
} as const;

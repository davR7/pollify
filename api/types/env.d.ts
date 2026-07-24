declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: "development" | "production";
      PORT: string;
      SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

export {};

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const EnvServer = createEnv({
  server: {
    REACT_EDITOR: z.optional(z.string()),
    API_URL: z.string(),
    // OPEN_AI_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    API_URL: process.env.API_URL,
    REACT_EDITOR: process.env.REACT_EDITOR,
    // OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  },
});

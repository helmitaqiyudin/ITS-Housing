import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  protectedProcedureAdmin,
  protectedProcedureUser,
  publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedureUser.query(() => {
    return "you can now see this secret message!";
  }),
});

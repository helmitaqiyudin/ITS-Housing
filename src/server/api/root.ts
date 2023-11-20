import { houseRouter } from "~/server/api/routers/house";
import { catatanPenghunianRouter } from "~/server/api/routers/catatan_penghunian";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { ajuanRouter } from "./routers/ajuan";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  house: houseRouter,
  catatan_penghunian: catatanPenghunianRouter,
  user: userRouter,
  ajuan: ajuanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

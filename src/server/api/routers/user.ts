import { z } from "zod";
import { createTRPCRouter, protectedProcedure, protectedProcedureAdmin } from "~/server/api/trpc";
import { db } from "~/server/db";

enum Role {
    Admin = "admin",
    User = "user",
}

export const userRouter = createTRPCRouter({
    getAllUsers: protectedProcedureAdmin.query(async () => {
        return await db.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
    }),

    // Get User by User ID
    getUserById: protectedProcedureAdmin
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input }) => {
            if (!input) {
                throw new Error("Input is undefined");
            }
            return await db.user.findUnique({
                where: { id: input.id }
            });
        }),

    // for development only
    switchRole: protectedProcedure
        .input(z.object({
            id: z.string(),
            role: z.string(),
        }))
        .mutation(async ({ input }) => {
            if (!input) {
                throw new Error("Input is undefined");
            }
            return await db.user.update({
                where: { id: input.id },
                data: {
                    role: input.role as Role,
                }
            });
        }),

});

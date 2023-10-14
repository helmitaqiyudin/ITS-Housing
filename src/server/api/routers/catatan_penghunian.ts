import { z } from "zod";
import { createTRPCRouter, protectedProcedure, protectedProcedureAdmin } from "~/server/api/trpc";
import { db } from "~/server/db";

export const catatanPenghunianRouter = createTRPCRouter({
    // CREATE a new Catatan Penghunian
    createCatatanPenghunian: protectedProcedureAdmin
        .input(z.object({
            blok: z.string(),
            judul: z.string(),
            catatan: z.string(),
        }))
        .query(async ({ input }) => {
            return await db.catatanPenghunian.create({
                data: input
            });
        }),

    getAllCatatanPenghunian: protectedProcedureAdmin.query(async () => {
        return await db.catatanPenghunian.findMany();
    }),

    // READ a Specific catatan by ID
    getCatatanPenghunianByBlok: protectedProcedureAdmin
        .input(z.object({
            blok: z.string(),
        }))
        .query(async ({ input }) => {
            return await db.catatanPenghunian.findMany({
                where: { blok: input.blok }
            });
        }),

    // UPDATE catatan
    updateCatatanPenghunian: protectedProcedureAdmin
        .input(z.object({
            id: z.string(),
            blok: z.string(),
            judul: z.string(),
            catatan: z.string(),
        }))
        .query(async ({ input }) => {
            const { id, ...updateData } = input;
            return await db.catatanPenghunian.update({
                where: { id: id },
                data: updateData
            });
        }),

    // DELETE CatatanPenghunian
    deleteCatatanPenghunian: protectedProcedureAdmin
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input }) => {
            return await db.catatanPenghunian.delete({
                where: { id: input.id },
            });
        }),
});

import { z } from "zod";
import { createTRPCRouter, protectedProcedure, protectedProcedureAdmin } from "~/server/api/trpc";
import { db } from "~/server/db";

export const catatanPenghunianRouter = createTRPCRouter({
    // CREATE a new Catatan Penghunian
    createCatatanPenghunian: protectedProcedureAdmin
        .input(z.object({
            blok: z.string(),
            judul: z.string().min(3),
            catatan: z.string().min(3),
        }))
        .mutation(async ({ input }) => {
            return await db.catatanPenghunian.create({
                data: {
                    blok: input.blok,
                    judul: input.judul,
                    catatan: input.catatan,
                }
            });
        }),

    // READ a Specific catatan by ID
    getCatatanPenghunianByBlok: protectedProcedure
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
        .mutation(async ({ input }) => {
            return await db.catatanPenghunian.delete({
                where: { id: input.id }
            });
        }),
});

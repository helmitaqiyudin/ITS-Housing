import { z } from "zod";
import { createTRPCRouter, protectedProcedure, protectedProcedureAdmin } from "~/server/api/trpc";
import { db } from "~/server/db";

export const houseRouter = createTRPCRouter({
    // CREATE a new House
    createHouse: protectedProcedureAdmin
        .input(z.object({
            blok: z.string(),
            id_tenaga: z.string(),
            luas_tanah: z.number(),
            luas_bangunan: z.number(),
            dokumen_kepemilikan: z.string(),
            tanggal_sk_rektor: z.date(),
            sumber_dana_pembangunan: z.string(),
            golongan: z.string(),
            sk_golongan: z.string(),
            nomor_hum: z.string(),
            kode_hum: z.string(),
            tarif_sewa: z.number(),
            alamat: z.string(),
        }))
        .query(async ({ input }) => {
            return await db.house.create({
                data: input
            });
        }),

    getAllHouses: protectedProcedure.query(async () => {
        return await db.house.findMany();
    }),

    // // READ a Specific House by ID
    getHouseById: protectedProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input }) => {
            return await db.house.findUnique({
                where: { id: input.id }
            });
        }),

    // // UPDATE a House
    updateHouse: protectedProcedureAdmin
        .input(z.object({
            id: z.string(),
            blok: z.string(),
            id_tenaga: z.string(),
            luas_tanah: z.number(),
            luas_bangunan: z.number(),
            dokumen_kepemilikan: z.string(),
            tanggal_sk_rektor: z.date(),
            sumber_dana_pembangunan: z.string(),
            golongan: z.string(),
            sk_golongan: z.string(),
            nomor_hum: z.string(),
            kode_hum: z.string(),
            tarif_sewa: z.number(),
            alamat: z.string(),
        }))
        .query(async ({ input }) => {
            const { id, ...updateData } = input;
            return await db.house.update({
                where: { id: id },
                data: updateData
            });
        }),

    // // DELETE a House
    deleteHouse: protectedProcedureAdmin
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input }) => {
            return await db.house.delete({
                where: { id: input.id },
            });
        }),
});

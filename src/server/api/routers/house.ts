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
        .mutation(async ({ input }) => {
            const createData = input;
            return await db.house.create({
                data: createData
            });
        }),

    getAllHouses: protectedProcedureAdmin.query(async () => {
        return await db.house.findMany({
            select: {
                id: true,
                blok: true,
                user: {
                    select: {
                        name: true,
                    }
                },
                alamat: true,
            }
        });
    }),

    // Get House by User ID
    getHouseByUserId: protectedProcedure.query(async ({ ctx }) => {
        return await db.house.findMany({
            where: { id_tenaga: ctx.session?.user?.id }
        });
    }),

    // Get House by House ID
    getHouseById: protectedProcedureAdmin
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input }) => {
            if (!input) {
                throw new Error("Input is undefined");
            }
            return await db.house.findUnique({
                where: { id: input.id },
                select: {
                    id: true,
                    alamat: true,
                    blok: true,
                    id_tenaga: true,
                    luas_tanah: true,
                    luas_bangunan: true,
                    dokumen_kepemilikan: true,
                    tanggal_sk_rektor: true,
                    sumber_dana_pembangunan: true,
                    golongan: true,
                    sk_golongan: true,
                    nomor_hum: true,
                    kode_hum: true,
                    tarif_sewa: true,
                    user: {
                        select: {
                            name: true,
                        }
                    },
                }
            });
        }),

    // UPDATE a House
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
        .mutation(async ({ input }) => {
            const { id, ...updateData } = input;
            return await db.house.update({
                where: { id: id },
                data: updateData
            });
        }),

    // DELETE a House
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

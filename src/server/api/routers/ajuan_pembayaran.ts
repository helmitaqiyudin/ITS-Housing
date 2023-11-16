import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  protectedProcedureAdmin,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const ajuanPembayaranRouter = createTRPCRouter({
  // CREATE a new Ajuan Pembayaran
  createAjuanPembayaran: protectedProcedure
    .input(
      z.object({
        blok: z.string(),
        id_tenaga: z.string(),
        bulan_bayar: z.string(),
        jumlah_bayar: z.number(),
        keterangan: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const createData = input;
      return await db.ajuanPembayaran.create({
        data: createData,
      });
    }),

  getAjuanPembayaranbyUserId: protectedProcedure.query(async ({ ctx }) => {
    const userHouse = await db.house.findUnique({
      where: { id_tenaga: ctx.session?.user?.id },
      select: {
        blok: true,
      },
    });

    if (!userHouse) {
      return [];
    }

    const ajuanPembayarans = await db.ajuanPembayaran.findMany({
      where: {
        id_tenaga: ctx.session.user.id,
        house: {
          blok: userHouse.blok,
        },
      },
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        house: {
          select: {
            id: true,
            blok: true,
            alamat: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        status: true,
        created_at: true,
      },
    });

    return ajuanPembayarans.map((ajuan) => ({
      ...ajuan,
      created_at: ajuan.created_at.toISOString(),
    }));
  }),

  getAllAjuanPembayaran: protectedProcedureAdmin.query(async () => {
    const ajuanPembayarans = await db.ajuanPembayaran.findMany({
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        house: {
          select: {
            id: true,
            blok: true,
            alamat: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        status: true,
        created_at: true,
      },
    });

    return ajuanPembayarans.map((ajuan) => ({
      ...ajuan,
      created_at: ajuan.created_at.toISOString(),
    }));
  }),
});

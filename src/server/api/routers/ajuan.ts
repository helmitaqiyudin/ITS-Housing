import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  protectedProcedureAdmin,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const ajuanRouter = createTRPCRouter({
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

  createAjuanRenovasi: protectedProcedure
    .input(
      z.object({
        blok: z.string(),
        id_tenaga: z.string(),
        keterangan: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const createData = input;
      return await db.ajuanRenovasi.create({
        data: createData,
      });
    }),

  getAjuanbyId: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      // search by id on db ajuan pembayaran or ajuan renovasi which one is match with the id
      const ajuanPembayaran = await db.ajuanPembayaran.findUnique({
        where: { id: input },
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
          bulan_bayar: true,
          jumlah_bayar: true,
          AjuanPembayaranDocument: true,
          keterangan: true,
          status: true,
          created_at: true,
        },
      });

      const ajuanRenovasi = await db.ajuanRenovasi.findUnique({
        where: { id: input },
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

      if (ajuanPembayaran) {
        return {
          ...ajuanPembayaran,
          created_at: ajuanPembayaran.created_at.toISOString(),
          type: "Pembayaran",
        };
      } else if (ajuanRenovasi) {
        return {
          ...ajuanRenovasi,
          created_at: ajuanRenovasi.created_at.toISOString(),
          type: "Renovasi",
        };
      } else {
        return null;
      }
    }),

  getAjuanbyUserId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
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

      const ajuanrenovasis = await db.ajuanRenovasi.findMany({
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

      if (input === "pembayaran") {
        return ajuanPembayarans.map((ajuan) => ({
          ...ajuan,
          created_at: ajuan.created_at.toISOString(),
        }));
      } else if (input === "renovasi") {
        return ajuanrenovasis.map((ajuan) => ({
          ...ajuan,
          created_at: ajuan.created_at.toISOString(),
        }));
      } else {
        return [];
      }
    }),

  getAllAjuan: protectedProcedureAdmin
    .input(z.string())
    .query(async ({ input }) => {
      const ajuanPembayarans = await db.ajuanPembayaran.findMany({
        where: {
          status: {
            not: "BelumDiajukan",
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

      const ajuanrenovasis = await db.ajuanRenovasi.findMany({
        where: {
          status: {
            not: "BelumDiajukan",
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

      if (input === "pembayaran") {
        return ajuanPembayarans.map((ajuan) => ({
          ...ajuan,
          created_at: ajuan.created_at.toISOString(),
        }));
      } else if (input === "renovasi") {
        return ajuanrenovasis.map((ajuan) => ({
          ...ajuan,
          created_at: ajuan.created_at.toISOString(),
        }));
      } else {
        return [];
      }
    }),
});

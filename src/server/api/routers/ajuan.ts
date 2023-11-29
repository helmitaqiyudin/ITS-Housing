import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  protectedProcedureAdmin,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { StatusUpdateUser } from "~/pages/user/my-requests/[id]";
import { StatusUpdateAdmin } from "~/pages/admin/manage-requests/[id]";

interface AjuanPembayaran {
  id: string;
  user: {
    name: string;
  };
  house: {
    id: string;
    blok: string;
    alamat: string;
    user: {
      name: string;
    };
  };
  bulan_bayar: string;
  jumlah_bayar: number;
  AjuanPembayaranDocument: unknown;
  keterangan: string;
  status: string;
  created_at: Date;
  type: "Pembayaran";
}

interface AjuanRenovasi {
  id: string;
  user: {
    name: string;
  };
  house: {
    id: string;
    blok: string;
    alamat: string;
    user: {
      name: string;
    };
  };
  AjuanRenovasiDocument: unknown;
  keterangan: string;
  status: string;
  created_at: Date;
  type: "Renovasi";
}

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

  // UPDATE status ajuan user
  updateAjuanPembayaran: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(StatusUpdateUser),
      }),
    )
    .mutation(async ({ input }) => {
      const updateData = input;
      return await db.ajuanPembayaran.update({
        where: { id: updateData.id },
        data: { status: updateData.status },
      });
    }),

  updateAjuanRenovasi: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(StatusUpdateUser),
      }),
    )
    .mutation(async ({ input }) => {
      const updateData = input;
      return await db.ajuanRenovasi.update({
        where: { id: updateData.id },
        data: { status: updateData.status },
      });
    }),

  // UPDATE status ajuan admin
  updateAjuanPembayaranAdmin: protectedProcedureAdmin
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(StatusUpdateAdmin),
      }),
    )
    .mutation(async ({ input }) => {
      const updateData = input;
      return await db.ajuanPembayaran.update({
        where: { id: updateData.id },
        data: { status: updateData.status },
      });
    }),

  updateAjuanRenovasiAdmin: protectedProcedureAdmin
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(StatusUpdateAdmin),
      }),
    )
    .mutation(async ({ input }) => {
      const updateData = input;
      return await db.ajuanRenovasi.update({
        where: { id: updateData.id },
        data: { status: updateData.status },
      });
    }),

  // DELETE ajuan
  deleteAjuanPembayaran: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await db.ajuanPembayaran.delete({
        where: { id: input },
      });
    }),

  deleteAjuanRenovasi: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await db.ajuanRenovasi.delete({
        where: { id: input },
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

      if (ajuanPembayaran) {
        return {
          ...ajuanPembayaran,
          type: "Pembayaran", // Ensure the type property is set correctly
        } as AjuanPembayaran; // Explicit type assertion
      }

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
          AjuanRenovasiDocument: true,
          keterangan: true,
          status: true,
          created_at: true,
        },
      });

      if (ajuanRenovasi) {
        return {
          ...ajuanRenovasi,
          type: "Renovasi", // Ensure the type property is set correctly
        } as AjuanRenovasi; // Explicit type assertion
      }

      return null;
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
        }));
      } else if (input === "renovasi") {
        return ajuanrenovasis.map((ajuan) => ({
          ...ajuan,
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
        }));
      } else if (input === "renovasi") {
        return ajuanrenovasis.map((ajuan) => ({
          ...ajuan,
        }));
      } else {
        return [];
      }
    }),
});

import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  protectedProcedureAdmin,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import moment from "moment";

export const ajuanPembayaranRouter = createTRPCRouter({
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
      created_at: moment(ajuan.created_at).format("DD MMM YYYY"),
    }));
  }),
});

import { type ColumnDef } from "@tanstack/react-table"
import { type User, type House } from "./housecolumns";
import { MoreHorizontal, ChevronsUpDown as ArrowUpDown, ChevronDown as ArrowDown, ChevronUp as ArrowUp } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { useRouter } from "next/router";
import { Badge } from '@mantine/core';
import moment from "moment";

export type AjuanPembayaran = {
    id: string;
    user: User;
    house: House;
    status: string;
    created_at: string;
};

type Row = {
    original: AjuanPembayaran;
};

type ActionsCellProps = {
    row: Row;
};

function ActionsCell({ row }: ActionsCellProps) {
    const router = useRouter();

    const handleViewDetail = () => {
        void router.push(`/user/my-request/${row.original.id}`);
    };

    return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleViewDetail}>View Detail</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export const columns: ColumnDef<AjuanPembayaran>[] = [
    {
        accessorKey: "No.",
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "user",
        accessorFn: (row) => row.user.name,
        header: () => {
            return (
                <div className="flex items-center justify-end">
                    <Button variant="ghost" className="text-right">
                        Nama Penghuni
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.original.user.name}</div>;
        }
    },
    {
        accessorKey: "blok",
        accessorFn: (row) => row.house.blok,
        header: () => {
            return (
                <div className="flex items-center justify-end">
                    <Button variant="ghost" className="text-right">
                        Blok Rumah
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.original.house.blok}</div>;
        },
    },
    {
        accessorKey: "created_at",
        accessorFn: (row) => row.created_at,
        header: ({ column }) => {
            const handleSort = () => {
                column.toggleSorting(column.getIsSorted() === "asc");
            };

            const getSortIcon = () => {
                switch (column.getIsSorted()) {
                    case "asc":
                        return <ArrowUp className="ml-2 h-4 w-4" />;
                    case "desc":
                        return <ArrowDown className="ml-2 h-4 w-4" />;
                    default:
                        return <ArrowUpDown className="ml-2 h-4 w-4" />;
                }
            };

            return (
                <div className="flex items-center justify-end">
                    <Button variant="ghost" onClick={handleSort} className="text-right">
                        Tanggal Pengajuan
                        {getSortIcon()}
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            // convert string to date
            const date = new Date(row.original.created_at);

            return (
                <div className="text-right font-medium">
                    {moment(date).format("DD MMMM YYYY HH:mm A")}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        accessorFn: (row) => row.status,
        header: ({ column }) => {
            const handleSort = () => {
                column.toggleSorting(column.getIsSorted() === "asc");
            };

            const getSortIcon = () => {
                switch (column.getIsSorted()) {
                    case "asc":
                        return <ArrowUp className="ml-2 h-4 w-4" />;
                    case "desc":
                        return <ArrowDown className="ml-2 h-4 w-4" />;
                    default:
                        return <ArrowUpDown className="ml-2 h-4 w-4" />;
                }
            };

            return (
                <div className="flex items-center justify-end">
                    <Button variant="ghost" onClick={handleSort} className="text-right">
                        Status
                        {getSortIcon()}
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const statusBadge = (status: string) => {
                switch (status) {
                    case "Belum Diajukan":
                        return <Badge color="gray">Belum Diajukan</Badge>;
                    case "Menunggu":
                        return <Badge color="yellow">Menunggu</Badge>;
                    case "Diterima":
                        return <Badge color="green">Diterima</Badge>;
                    case "Ditolak":
                        return <Badge color="red">Ditolak</Badge>;
                    default:
                        return <Badge color="gray">Belum Diajukan</Badge>;
                }
            };

            return (
                <div className="text-right font-medium">{statusBadge(row.original.status)}</div>
            );
        },
    },
    {
        header: "Actions",
        cell: ActionsCell,
    },
];
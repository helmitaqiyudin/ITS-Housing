import { type ColumnDef } from "@tanstack/react-table"
import { type House } from "./housecolumns";
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

export type AjuanPembayaran = {
    id: string;
    house: House;
    status: string;
    created_at: string | null;
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
        accessorFn: (row) => row.house?.user?.name,
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
                        Nama Penghuni
                        {getSortIcon()}
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row?.original?.house?.user?.name}</div>;
        }
    },
    {
        accessorKey: "blok",
        accessorFn: (row) => row.house.blok,
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
                        Blok Rumah
                        {getSortIcon()}
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row?.original?.house?.blok}</div>;
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
            return <div className="text-right font-medium">{row.original.created_at}</div>;
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
            return <div className="text-right font-medium">{row.original.status}</div>;
        },
    },
    {
        header: "Actions",
        cell: ActionsCell,
    },
];
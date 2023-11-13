import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ChevronsUpDown as ArrowUpDown, ChevronDown as ArrowDown, ChevronUp as ArrowUp } from "lucide-react";
import { useRouter } from "next/router";


import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

export type User = {
    name: string | null;
};

export type House = {
    id: string;
    blok: string;
    alamat: string;
    user: User | null;
};

type Row = {
    original: House;
};

type ActionsCellProps = {
    row: Row;
};

function ActionsCell({ row }: ActionsCellProps) {
    const router = useRouter();

    const handleViewDetail = () => {
        void router.push(`/admin/manage-houses/${row.original.id}`);
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

export const columns: ColumnDef<House>[] = [
    {
        accessorKey: "blok",
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
            return <div className="text-right font-medium">{row.original.blok}</div>;
        },
    },
    {
        accessorKey: "user",
        accessorFn: (row) => row.user ? row.user.name : null,
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
            return <div className="text-right font-medium">{row.original.user?.name}</div>;
        },
    },
    {
        accessorKey: "alamat",
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
                        Alamat
                        {getSortIcon()}
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.original.alamat}</div>;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ActionsCell,
    },
]

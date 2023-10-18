import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
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
    
    const handleEdit = () => {
    void router.push(`/admin/manage-houses/${row.original.id}/edit`);
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
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

export const columns: ColumnDef<House>[] = [
    {
        accessorKey: "blok",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="text-right"
                    >
                        Blok Rumah
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.original.blok}</div>;
        },
    },
    {
        accessorKey: "user",
        accessorFn: (row) => row.user ? row.user.name : null,
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="text-right"
                    >
                        Nama Penghuni
                        <ArrowUpDown className="ml-2 h-4 w-4" />
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
            return (
                <div className="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="text-right"
                    >
                        Alamat
                        <ArrowUpDown className="ml-2 h-4 w-4" />
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

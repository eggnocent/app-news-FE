"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Category } from "@/model/Category"
import DeleteCategory from "./delete_category";


export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "action",
    cell: ({ row }) => {
      const category = row.original;

      console.log("Category Row Data:", category);

      // Validasi ID sebelum membuat URL
      const editUrl = category.id
        ? `/dashboard/category/edit/${category.id}`
        : "#"; // Tautan fallback jika ID undefined

      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant={"secondary"} size="sm" asChild>
            <Link href={editUrl}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteCategory id={category.id}/>
        </div>
      );
    },
  },
];


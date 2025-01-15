"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, AlertCircle } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import axiosInstance, { setUpInterception } from "../../../../../lib/axios";
import { useEffect, useState } from "react";
import { Category } from "@/model/Category";
import { ApiResponse } from "@/model/ApiResponse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { columns } from "./components/columns-table";



export default function CategoryPage() {
    setUpInterception();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get<ApiResponse<Category[]>>("/admin/categories");
                setCategories(response.data.data);
                setLoading(false);
            } catch (err) {
                const errorMessage =
                    (err as { message?: string }).message || "Error fetching categories";
                setError(errorMessage);
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    


    if (loading) {
        return <div>Loading...</div>
    }

    if (error) return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </AlertCircle>
        </Alert>
    )


    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Kategori</div>
                <Button asChild>
                    <Link href={"/dashboard/category/create"}>
                        <Plus className="mr-2 h-4 w-4">
                            Tambah Data
                        </Plus>
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={categories}/>
        </>
        
    );
}
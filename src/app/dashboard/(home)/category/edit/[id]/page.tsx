"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Gunakan useParams
import { Category } from "@/model/Category";
import { ApiResponse } from "@/model/ApiResponse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axiosInstance, { setUpInterception } from "@/lib/axios";
import FormCategoryPage from "../../components/form-category";
import { AlertCircle } from "lucide-react";

const EditCategoryPage = () => {
    setUpInterception();

    // Mengambil params dari URL
    const params = useParams();
    const id = params?.id; // Pastikan id adalah string dari URL

    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Validasi id
                if (!id) {
                    throw new Error("ID tidak ditemukan di params");
                }

                // Fetch data kategori berdasarkan ID
                const response = await axiosInstance.get<ApiResponse<Category>>(
                    `/admin/categories/get-one-category/${id}` // Sesuaikan endpoint dengan backend
                );
                setCategory(response.data.data);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Error fetching category";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Edit Kategori</div>
            </div>

            <FormCategoryPage type="EDIT" defaultValues={category} />
        </div>
    );
};

export default EditCategoryPage;

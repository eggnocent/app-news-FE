"use client";

import { FC } from "react";
import Swal from "sweetalert2";
import { deleteCategory } from "../lib/action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteCategoryPageProps {
    id: number;
    onSuccess?: () => void; // Tambahkan callback opsional untuk memperbarui data setelah penghapusan
}

const DeleteCategory: FC<DeleteCategoryPageProps> = ({ id, onSuccess }) => {
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Kategori ini akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, Silahkan dihapus.",
        });

        if (result.isConfirmed) {
            try {
                await deleteCategory(id); // Panggil fungsi penghapusan kategori
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Kategori berhasil dihapus",
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Jika callback onSuccess ada, panggil untuk memperbarui data
                if (onSuccess) {
                    onSuccess();
                } else {
                    // Jika tidak ada callback, reload halaman
                    window.location.reload();
                }
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Terjadi kesalahan saat menghapus kategori.";
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: errorMessage,
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <Button size={"sm"} variant={"destructive"} onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Hapus
        </Button>
    );
};

export default DeleteCategory;

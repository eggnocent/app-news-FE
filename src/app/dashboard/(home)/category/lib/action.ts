import axiosInstance from "../../../../../../lib/axios";
import { Category } from "@/model/Category";

export interface CreateCategoryRequest {
    title: string;
}

// Fungsi untuk membuat kategori
export const createCategory = async (
    categoryData: CreateCategoryRequest
): Promise<Category> => {
    try {
        const response = await axiosInstance.post<Category>("/admin/categories/create-category", categoryData);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
};

export const editCategory = async (
    categoryData: CreateCategoryRequest,
    categoryId: number // Tambahkan parameter categoryId
): Promise<Category> => {
    try {
        const response = await axiosInstance.put<Category>(
            `/admin/categories/update-category/${categoryId}`,
            categoryData
        );
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
};

export const deleteCategory = async (categoryID: number) => {
    try {
        const response = await axiosInstance.delete(`/admin/categories/delete-category/${categoryID}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

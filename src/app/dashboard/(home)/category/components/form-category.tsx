"use client";

import { Category } from "@/model/Category";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { categoryFormSchema } from "@/app/dashboard/(home)/category/lib/validation";
import { createCategory, editCategory } from "../lib/action";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButtonForm from "../../components/submit-button";
import { FC } from "react";
import { setUpInterception } from "../../../../../../lib/axios";

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Category | null;
}

const FormCategoryPage: FC<FormCategoryProps> = ({ type, defaultValues }) => {
  setUpInterception();

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setTitle(defaultValues.title)
    }
  }, [type, defaultValues])

  const handleCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    try {
      const validation = categoryFormSchema.safeParse({
        title,
      });

      if (!validation.success) {
        const errorMessage = validation.error.issues.map((issue) => issue.message);
        setError(errorMessage);
        return;
      }

      if (type == "ADD") {
        await createCategory({title: title})
        Swal.fire({
        icon: "success",
        title: "Success",
        text: "Kategori berhasil disimpan",
        toast: true,
        showConfirmButton: false,
        timer: 1500,
        });
        router.push("/dashboard/category")
      } else {
        if (defaultValues?.id) {
          await editCategory({title: title}, defaultValues.id);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Kategori berhasil diedit",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
            });
            router.push("/dashboard/category")
        }
      }

      await createCategory({ title: title });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Kategori berhasil disimpan",
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard/category"); // Redirect jika berhasil
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      Swal.fire({
        icon: "error",
        title: "Whoops",
        text: errorMessage,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });

      setError([errorMessage]);
    }
  };

  return (
    <form onSubmit={handleCategory} className="space-y-4">
      {error.length > 0 && (
        <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 rounded-lg text-white">
          <div className="font-bold mb-4">
            <ul className="list-disc list-inside">
              {error.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Judul</Label>
        <Input
          placeholder="Judul..."
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <SubmitButtonForm />
      </div>
    </form>
  );
};


export default FormCategoryPage;


import { z } from "zod";

export const categoryFormSchema = z.object({
    title: z.string({required_error: `title wajib diisi`})
})
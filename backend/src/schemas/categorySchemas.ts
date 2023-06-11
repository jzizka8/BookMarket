import { Genre } from "@prisma/client";
import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.nativeEnum(Genre)
})
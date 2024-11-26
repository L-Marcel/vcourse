import { z } from 'zod'

export interface Video {
  id: number
  title: string
  description: string
  duration: number
  createdAt: string
  youtube: string
}

export const videoSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Título deve ter no mínimo 3 caracteres.',
    })
    .max(120, {
      message: 'Título deve ter no máximo 120 caracteres.',
    }),
  description: z.string().min(0).max(360, {
    message: 'Descrição deve ter no máximo 360 caracteres.',
  }),
  duration: z
    .number()
    .min(1, {
      message: 'Vídeo deve durar pelo menos 1 minutos.',
    })
    .max(480, {
      message: 'Vídeo deve durar no máximo 8 horas.',
    }),
  youtube: z.string().regex(/^[a-zA-Z0-9_-]{11}$/g, {
    message: 'Formato inválido.',
  }),
})

export type CreateVideoData = z.infer<typeof videoSchema>

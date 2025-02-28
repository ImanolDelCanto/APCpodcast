"use client"

import { useState, useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  feedback: z.string().min(10, {
    message: "El feedback debe tener al menos 10 caracteres.",
  }),
})

export default function ListenerFeedback() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  })

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      setIsSubmitting(true)
      // Here you would typically send the form data to your backend
      console.log(values)

      // Simular envío con un timeout
      const timer = setTimeout(() => {
        setIsSubmitting(false)
        toast({
          title: "Feedback enviado",
          description: "Gracias por compartir tus ideas con nosotros.",
        })
        form.reset()
      }, 1000)

      return () => clearTimeout(timer)
    },
    [form],
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tu feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Comparte tus ideas, sugerencias o preguntas aquí..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#FF7B7B] hover:bg-[#ff6262]" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar feedback"}
        </Button>
      </form>
    </Form>
  )
}


"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
  occupation: z.string().min(2, {
    message: "Por favor ingresa tu ocupación.",
  }),
  reason: z.string().min(50, {
    message: "Por favor explica en al menos 50 caracteres por qué quieres aparecer en el podcast.",
  }),
})

export default function SerInvitado() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      occupation: "",
      reason: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Here you would typically send the form data to your backend
    console.log(values)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Solicitud enviada",
        description: "Gracias por tu interés. Revisaremos tu solicitud y te contactaremos pronto.",
      })
      form.reset()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Sé nuestro próximo invitado</h1>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
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
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ocupación</FormLabel>
                    <FormControl>
                      <Input placeholder="¿A qué te dedicas?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Por qué quieres aparecer en el podcast?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cuéntanos tu historia y qué te gustaría compartir en el podcast..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explica brevemente tu experiencia, tu historia o el tema que te gustaría abordar en el podcast.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#FF7B7B] hover:bg-[#ff6262]" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar solicitud"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}


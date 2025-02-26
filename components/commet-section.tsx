"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { toast } from "@/hooks/use-toast"

interface Comment {
  id: string
  name: string
  content: string
  createdAt: string
  parentId: string | null
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch("/api/comments")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error("Error fetching comments:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los comentarios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          content: content.trim(),
          parentId,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      toast({
        title: "¡Comentario enviado!",
        description: "Tu comentario ha sido publicado exitosamente.",
      })

      setName("")
      setContent("")
      setReplyingTo(null)
      fetchComments()
    } catch (error) {
      console.error("Error submitting comment:", error)
      toast({
        title: "Error",
        description: "No se pudo enviar el comentario. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const CommentItem = ({ comment, level = 0 }: { comment: Comment; level?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${level > 0 ? "ml-8" : ""} mb-4`}
    >
      <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
        <Avatar className="w-10 h-10">
          <AvatarFallback>{comment.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{comment.name}</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { locale: es, addSuffix: true })}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
        </div>
      </div>

      <AnimatePresence>
        {replyingTo === comment.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 ml-12"
          >
            <form onSubmit={(e) => handleSubmit(e, comment.id)} className="space-y-4">
              <Input
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-md"
                disabled={isSubmitting}
              />
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px]"
                disabled={isSubmitting}
              />
              <Button type="submit" className="bg-[#FF7B7B] hover:bg-[#ff6262]" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Responder"}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <Input
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-md"
              disabled={isSubmitting}
            />
            <Textarea
              placeholder="¿Qué te gustaría compartir?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
              disabled={isSubmitting}
            />
            <Button type="submit" className="bg-[#FF7B7B] hover:bg-[#ff6262]" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Publicar comentario"}
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Cargando comentarios...</div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">¡Sé el primero en dejar un comentario!</div>
          ) : (
            comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
          )}
        </div>
      </div>
    </div>
  )
}


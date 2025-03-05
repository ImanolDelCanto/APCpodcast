"use client"

import type React from "react"

import { useEffect, useState, useCallback, memo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { toast } from "@/hooks/use-toast"
import { MessageSquare, ChevronDown, ChevronUp, Send } from "lucide-react"

interface Comment {
  id: string
  name: string
  content: string
  createdAt: string
  parentId: string | null
}

const CommentItem = memo(({ comment, index }: { comment: Comment; index: number }) => {
  const commentRef = useRef<HTMLDivElement>(null)


  return (
    <motion.div
      ref={commentRef}
      key={comment.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-start gap-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Avatar className="w-10 h-10 border">
            <AvatarFallback className="bg-[#FF7B7B]/10 text-[#FF7B7B]">{comment.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{comment.name}</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { locale: es, addSuffix: true })}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      </div>
    </motion.div>
  )
})

CommentItem.displayName = "CommentItem"

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [visibleCount, setVisibleCount] = useState(5)
  const sectionRef = useRef<HTMLDivElement>(null)

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true)
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const newComment = await response.json()
        setComments((prev) => [newComment, ...prev])

        toast({
          title: "¡Comentario enviado!",
          description: "Tu comentario ha sido publicado exitosamente.",
        })

        setName("")
        setContent("")
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
    },
    [name, content],
  )

  const loadMoreComments = useCallback(() => {
    setVisibleCount((prev) => prev + 5)
  }, [])

  const hideComments = useCallback(() => {
    setVisibleCount(5)
    // Scroll back to the top of the comments section
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="max-w-4xl mx-auto" ref={sectionRef}>
      <div className="space-y-8">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#FF7B7B]" />
            Comentarios ({comments.length})
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 focus:ring-[#FF7B7B] focus:border-[#FF7B7B] transition-all duration-300"
                disabled={isSubmitting}
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="bg-[#FF7B7B] hover:bg-[#ff6262] gap-2 w-full sm:w-auto transition-all duration-300 shadow hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Enviando...
                    </motion.span>
                  ) : (
                    <span>Publicar</span>
                  )}
                </Button>
              </motion.div>
            </div>
            <Textarea
              placeholder="¿Qué te gustaría compartir?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] focus:ring-[#FF7B7B] focus:border-[#FF7B7B] transition-all duration-300"
              disabled={isSubmitting}
            />
          </form>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence>
            {loading ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-8 h-8 border-4 border-[#FF7B7B] border-t-transparent rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <p>Cargando comentarios...</p>
              </motion.div>
            ) : comments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground bg-white rounded-lg shadow-sm"
              >
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">¡Sé el primero en dejar un comentario!</p>
              </motion.div>
            ) : (
              <>
                {comments.slice(0, visibleCount).map((comment, index) => (
                  <CommentItem key={comment.id} comment={comment} index={index} />
                ))}

                {comments.length > visibleCount && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={loadMoreComments}
                        variant="outline"
                        className="gap-2 group hover:bg-[#FF7B7B]/10 transition-all duration-300"
                      >
                        <ChevronDown className="w-4 h-4 group-hover:text-[#FF7B7B]" />
                        <span className="group-hover:text-[#FF7B7B]">Cargar más comentarios</span>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {visibleCount > 5 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={hideComments}
                        variant="outline"
                        className="gap-2 group hover:bg-[#FF7B7B]/10 transition-all duration-300"
                      >
                        <ChevronUp className="w-4 h-4 group-hover:text-[#FF7B7B]" />
                        <span className="group-hover:text-[#FF7B7B]">Ocultar comentarios</span>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default memo(CommentSection)


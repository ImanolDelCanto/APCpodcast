import { NextResponse } from "next/server"
import { getXataClient } from "@/src/xata"
import type { CommentRecord } from "@/src/xata"
import type { NextRequest } from "next/server"

const xata = getXataClient()

interface SerializedComment {
  id: string
  name: string
  content: string
  createdAt: string
  parentId: string | null

}

export async function GET() {
  try {
    const comments = await xata.db.comment.sort("createdAt", "desc").getMany()

    const commentMap = new Map<string, SerializedComment>()
    const rootComments: SerializedComment[] = []

    comments.forEach((comment: CommentRecord) => {
      const serializedComment: SerializedComment = {
        id: comment.xata_id,
        name: comment.name ?? "Anónimo",
        content: comment.content ?? "",
        createdAt: comment.createdAt ?? new Date().toISOString(),
        parentId: comment.parentId ?? null,
        
      }
      commentMap.set(comment.xata_id, serializedComment)
    })

    comments.forEach((comment: CommentRecord) => {
      if (comment.parentId) {

      } else {
        const rootComment = commentMap.get(comment.xata_id)
        if (rootComment) {
          rootComments.push(rootComment)
        }
      }
    })

    return NextResponse.json(rootComments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Error fetching comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log("POST request received")
  try {
    const { name, content, parentId } = await request.json()
    console.log("Received data:", { name, content, parentId })

    if (!name || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const comment = await xata.db.comment.create({
      name,
      content,
      parentId: parentId ?? null,
      createdAt: new Date().toISOString(),
    })

    const serializedComment: SerializedComment = {
      id: comment.xata_id,
      name: comment.name ?? "Anónimo",
      content: comment.content ?? "",
      createdAt: comment.createdAt ?? new Date().toISOString(),
      parentId: comment.parentId ?? null,
      
    }

    return NextResponse.json(serializedComment)
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Error creating comment" }, { status: 500 })
  }
}


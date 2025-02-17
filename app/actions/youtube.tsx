"use server"

import { XMLParser } from "fast-xml-parser"

export interface Video {
  id: string
  title: string
  link: string
  duration: number;
  published: string
  thumbnail: string
  description: string
}

interface YouTubeEntry {
    ["yt:videoId"]: string
    title: string
    link: { "@_href": string }
    published: string
    ["media:group"]: {
      ["media:description"]?: string
    }
  }

export async function fetchYouTubeVideos() {
  const CHANNEL_ID = "UCiz7KCGQNHCEjtoUpuMfF9g"
  const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

  try {
    const response = await fetch(FEED_URL)
    const xmlData = await response.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    })

    const result = parser.parse(xmlData)
    const entries = result.feed.entry || []

    return entries.map((entry: YouTubeEntry) => ({
      id: entry["yt:videoId"],
      title: entry.title,
      link: entry.link["@_href"],
      published: entry.published,
      thumbnail: `https://i.ytimg.com/vi/${entry["yt:videoId"]}/maxresdefault.jpg`,
      description: entry["media:group"]["media:description"] || "",
    })) as Video[]
  } catch (error) {
    console.error("Error fetching YouTube videos:", error)
    return []
  }
}


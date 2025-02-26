"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Share2, Heart } from 'lucide-react';
import type { Video } from '@/app/actions/youtube';
import Image from 'next/image';

interface EpisodeCardProps {
  episode: Video;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode.title,
        text: episode.description,
        url: episode.link,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Comparte este episodio: " + episode.link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={episode.thumbnail}
          alt={episode.title}
          className="w-full h-full object-cover"
          height={1000}
          width={1000}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-4 left-4 bg-[#FF7B7B] hover:bg-[#ff6262] p-4 rounded-full transform hover:scale-110 transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>
        
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm"
            >
              {new Date(episode.duration * 1000).toISOString().substr(14, 5)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{episode.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{episode.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(episode.published).toLocaleDateString()}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 ${
                isLiked ? 'text-[#FF7B7B]' : 'text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
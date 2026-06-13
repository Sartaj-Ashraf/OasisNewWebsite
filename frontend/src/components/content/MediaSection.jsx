import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MediaSection({ content, meta, isGrid = false }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. DATA NORMALIZATION
  // Safely converts single image objects OR media arrays into a unified format
  let media = [];
  let description = content?.description || "";

  if (content?.media && Array.isArray(content.media)) {
    media = content.media;
  } else if (Array.isArray(content)) {
    media = content;
  } else if (content?.url || content?.filePath) {
    media = [{
      content: content,
      meta: meta || content?.meta || {},
      type: content?.type || 'image'
    }];
  }

  const openLightbox = (mediaItem, index) => {
    setSelectedMedia(mediaItem);
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedMedia(null);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction) => {
    if (media.length === 0) return;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % media.length 
      : (currentIndex - 1 + media.length) % media.length;
    
    setCurrentIndex(newIndex);
    setSelectedMedia(media[newIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') navigateLightbox('prev');
      else if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, currentIndex, media.length]);

  // 2. GRID RENDERING LOGIC
  const renderMediaGrid = () => {
    const mediaCount = media.length;

    if (mediaCount === 0) return null;

    if (mediaCount === 1) {
      return (
        <div className="w-full">
          {renderMediaItem(media[0], true, 0)}
        </div>
      );
    }

    if (mediaCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {media.map((item, index) => (
            <div key={index}>
              {renderMediaItem(item, false, index)}
            </div>
          ))}
        </div>
      );
    }

    // FIXED: Now correctly rendering all 3 items in a 3-column split
    if (mediaCount === 3) {
      return (
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {media.map((item, index) => (
            <div key={index}>
              {renderMediaItem(item, false, index)}
            </div>
          ))}
        </div>
      );
    }

    if (mediaCount >= 4) {
      return (
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {media.slice(0, 3).map((item, index) => (
            <div key={index}>
              {renderMediaItem(item, false, index)}
            </div>
          ))}
          <div className="relative">
            {renderMediaItem(media[3], false, 3, mediaCount > 4, mediaCount - 4)}
          </div>
        </div>
      );
    }
  };

  // 3. INDIVIDUAL ITEM RENDERING
  const renderMediaItem = (mediaItem, isFullWidth, index, showOverlay = false, remainingCount = 0) => {
    const type = mediaItem?.type || 'image';
    const url = mediaItem?.content?.url || mediaItem?.url || mediaItem?.filePath;
    const altText = mediaItem?.meta?.alt || mediaItem?.altText || '';
    const itemCaption = mediaItem?.meta?.caption;
    
    // FIXED: Enforcing explicit heights/aspect-ratios so Next.js 'fill' images don't collapse to 0px
    let aspectClass = "w-full h-96"; 
    if (isGrid) {
      aspectClass = "w-full h-80";
    } else if (isFullWidth) {
      aspectClass = "aspect-video w-full";
    } else {
      aspectClass = "aspect-square md:aspect-video w-full";
    }

    return (
      <div className="flex flex-col items-center w-full">
        <figure 
          className={`relative ${aspectClass} rounded-2xl overflow-hidden cursor-pointer group m-0`}
          onClick={() => openLightbox(mediaItem, index)}
        >
          <Image
            src={url}
            alt={altText}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={true}
          />

          {type === 'video' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
              </div>
            </div>
          )}

          {showOverlay && remainingCount > 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-all duration-300 hover:bg-black/70">
              <div className="px-4 py-2">
                <span className="text-white font-semibold text-2xl md:text-3xl tracking-wider drop-shadow-lg">
                  +{remainingCount}
                </span>
              </div>
            </div>
          )}
        </figure>
        
        {itemCaption && (
          <figcaption className="text-center text-xs text-gray-400 mt-2 tracking-wide">
            {itemCaption}
          </figcaption>
        )}
      </div>
    );
  };

  // 4. LIGHTBOX PORTAL MODAL
  const LightboxModal = () => {
    const type = selectedMedia?.type || 'image';
    const url = selectedMedia?.content?.url || selectedMedia?.url || selectedMedia?.filePath;
    const altText = selectedMedia?.meta?.alt || selectedMedia?.altText || 'Media content';
    const caption = selectedMedia?.meta?.caption;

    return (
      <div 
        className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
        onClick={closeLightbox}
      >
        <button
          onClick={closeLightbox}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 z-50"
        >
          <X className="w-6 h-6" />
        </button>

        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        <div 
          className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {type === 'image' ? (
            <img
              src={url}
              alt={altText}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <video
              src={url}
              controls
              autoPlay
              className="max-w-full max-h-full rounded-lg outline-none"
            >
              Your browser does not support the video tag.
            </video>
          )}

          {caption && (
            <p className="absolute -bottom-8 w-full text-center text-gray-300 text-sm tracking-wide">
              {caption}
            </p>
          )}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
            <span className="text-white/90 text-sm font-medium tracking-wide">
              {currentIndex + 1} / {media.length}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={isGrid ? "m-0" : "my-10"}>
      {description && (
        <p className="text-gray-600 text-center text-base md:text-lg mb-6 font-medium">
          {description}
        </p>
      )}

      <div className="mb-6">
        {renderMediaGrid()}
      </div>

      {mounted && lightboxOpen && selectedMedia && 
        createPortal(<LightboxModal />, document.body)
      }
    </div>
  );
}
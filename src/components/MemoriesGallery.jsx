import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Plus, 
  Trash2, 
  Edit2, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Check, 
  Image as ImageIcon 
} from 'lucide-react';
import { compressImageFile } from '../utils/storage';

export default function MemoriesGallery({
  photos = [],
  onUpdatePhotos,
  isEditMode = false
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [editingPhotoId, setEditingPhotoId] = useState(null);
  const [editCaption, setEditCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const [replacingId, setReplacingId] = useState(null);

  // Open Lightbox
  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  // Start caption edit
  const handleStartCaptionEdit = (p) => {
    setEditingPhotoId(p.id);
    setEditCaption(p.caption || '');
  };

  // Save caption
  const handleSaveCaption = (id) => {
    const updated = photos.map((p) => {
      if (p.id === id) {
        return { ...p, caption: editCaption };
      }
      return p;
    });
    onUpdatePhotos(updated);
    setEditingPhotoId(null);
  };

  // Remove photo
  const handleDeletePhoto = (id) => {
    if (window.confirm('Do you want to remove this photo?')) {
      const updated = photos.filter((p) => p.id !== id);
      onUpdatePhotos(updated);
    }
  };

  // Upload new photo
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedDataUrl = await compressImageFile(file);

      const newPhoto = {
        id: 'photo_' + Date.now(),
        url: compressedDataUrl,
        caption: 'A moment captured in time with you ❤️',
        date: 'Our First Month'
      };

      onUpdatePhotos([...photos, newPhoto]);
    } catch (err) {
      alert('Could not process this image. Please try another image file.');
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Replace existing photo
  const handleReplaceClick = (id) => {
    setReplacingId(id);
    if (replaceInputRef.current) {
      replaceInputRef.current.click();
    }
  };

  const handleFileReplace = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !replacingId) return;

    try {
      setIsUploading(true);
      const compressedDataUrl = await compressImageFile(file);

      const updated = photos.map((p) => {
        if (p.id === replacingId) {
          return { ...p, url: compressedDataUrl };
        }
        return p;
      });

      onUpdatePhotos(updated);
    } catch (err) {
      alert('Could not replace image. Please try again.');
    } finally {
      setIsUploading(false);
      setReplacingId(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  return (
    <section className="section gallery-section" id="memories">
      {/* Background Ambience */}
      <div className="ambient-glow-wine" style={{ top: '30%', right: '15%' }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Camera size={13} />
            <span>Memories in Frames</span>
          </div>

          <h2 className="section-title copper-gradient-text">
            Our Memories Gallery
          </h2>

          <p className="section-subtitle text-romance">
            The little moments, the deep conversations, and the warmth that makes this first month unforgettable.
          </p>
        </div>

        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <input
          type="file"
          ref={replaceInputRef}
          onChange={handleFileReplace}
          accept="image/*"
          style={{ display: 'none' }}
        />

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {photos.map((photo, index) => {
            const isEditingCaption = editingPhotoId === photo.id;

            return (
              <div key={photo.id} className="gallery-card copper-card">
                {/* Image Container */}
                <div 
                  className="image-wrapper"
                  onClick={() => openLightbox(index)}
                  title="Click to view full image"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || `Anniversary memory ${index + 1}`}
                    loading="lazy"
                    className="gallery-img"
                  />
                  <div className="image-overlay">
                    <span className="expand-hint">
                      <Maximize2 size={18} />
                      <span>View</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  {isEditingCaption ? (
                    <div className="caption-edit-wrap">
                      <textarea
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        placeholder="Write a sweet memory caption..."
                        rows={2}
                        className="caption-input"
                      />
                      <div className="caption-actions">
                        <button
                          type="button"
                          className="btn-action save"
                          onClick={() => handleSaveCaption(photo.id)}
                        >
                          <Check size={13} /> Done
                        </button>
                        <button
                          type="button"
                          className="btn-action cancel"
                          onClick={() => setEditingPhotoId(null)}
                        >
                          <X size={13} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="caption-display">
                      <p className="photo-caption text-romance">
                        “{photo.caption || 'Special memory with you.'}”
                      </p>
                      {photo.date && <span className="photo-date">{photo.date}</span>}
                    </div>
                  )}

                  {/* Edit Controls */}
                  {isEditMode && (
                    <div className="gallery-card-controls">
                      <button
                        type="button"
                        onClick={() => handleReplaceClick(photo.id)}
                        className="control-btn"
                        title="Replace this photo"
                      >
                        <Upload size={13} /> Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartCaptionEdit(photo)}
                        className="control-btn"
                        title="Edit caption"
                      >
                        <Edit2 size={13} /> Caption
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="control-btn delete"
                        title="Delete photo"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add New Photo Card */}
          {isEditMode && (
            <div 
              className="add-photo-card copper-card"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <div className="add-inner">
                <div className="add-icon-circle">
                  {isUploading ? (
                    <div className="upload-spinner" />
                  ) : (
                    <Plus size={26} />
                  )}
                </div>
                <h4 className="add-title">Add Your Picture</h4>
                <p className="add-sub">Click to upload from device</p>
              </div>
            </div>
          )}
        </div>

        {/* User photo upload callout */}
        <div className="gallery-action-bar">
          <button
            type="button"
            className="btn-copper-primary"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <Upload size={16} />
            <span>Upload New Photo</span>
          </button>
          <span className="upload-note">
            Photos are saved locally in your browser. You can add as many as you like!
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="lightbox-close" 
              onClick={closeLightbox}
              aria-label="Close full view"
            >
              <X size={24} />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav prev"
                  onClick={showPrev}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  className="lightbox-nav next"
                  onClick={showNext}
                  aria-label="Next photo"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="lightbox-image-wrap">
              <img
                src={photos[lightboxIndex].url}
                alt={photos[lightboxIndex].caption || 'Anniversary full size memory'}
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-caption-bar">
              <p className="lightbox-caption text-romance">
                “{photos[lightboxIndex].caption}”
              </p>
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
          margin-bottom: 40px;
        }

        .gallery-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
          cursor: pointer;
          background: #0d0c12;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10, 9, 14, 0.8) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-card:hover .image-overlay {
          opacity: 1;
        }

        .expand-hint {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 15, 22, 0.8);
          color: var(--copper-200);
          border: 1px solid rgba(216, 150, 105, 0.3);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          backdrop-filter: blur(8px);
        }

        .card-body {
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(18, 17, 24, 0.85);
          flex: 1;
        }

        .caption-display {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .photo-caption {
          font-size: 1.15rem;
          color: var(--cream-200);
          line-height: 1.5;
          font-style: italic;
        }

        .photo-date {
          font-size: 0.74rem;
          color: var(--copper-400);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .gallery-card-controls {
          display: flex;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px solid rgba(216, 150, 105, 0.12);
        }

        .control-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(216, 150, 105, 0.2);
          color: var(--cream-300);
          padding: 5px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .control-btn:hover {
          background: rgba(216, 150, 105, 0.15);
          color: var(--copper-200);
        }

        .control-btn.delete:hover {
          background: rgba(179, 57, 75, 0.25);
          color: #ff9fb0;
          border-color: var(--wine-500);
        }

        .caption-edit-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .caption-input {
          width: 100%;
          background: rgba(10, 9, 14, 0.95);
          border: 1px solid rgba(216, 150, 105, 0.35);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          color: var(--cream-100);
          font-family: inherit;
          font-size: 0.9rem;
        }

        .caption-actions {
          display: flex;
          gap: 8px;
        }

        /* Add Photo Card */
        .add-photo-card {
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px dashed rgba(216, 150, 105, 0.3);
          background: rgba(18, 17, 24, 0.4);
          transition: var(--transition-smooth);
        }

        .add-photo-card:hover {
          border-color: var(--copper-400);
          background: rgba(216, 150, 105, 0.08);
          transform: translateY(-3px);
        }

        .add-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          text-align: center;
        }

        .add-icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(216, 150, 105, 0.12);
          border: 1px solid rgba(216, 150, 105, 0.3);
          color: var(--copper-300);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(200, 129, 81, 0.2);
        }

        .add-title {
          font-size: 1.15rem;
          color: var(--cream-100);
        }

        .add-sub {
          font-size: 0.85rem;
          color: var(--cream-muted);
        }

        .gallery-action-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
          padding-top: 10px;
        }

        .upload-note {
          font-size: 0.82rem;
          color: var(--cream-muted);
        }

        /* Lightbox Modal */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 5, 8, 0.94);
          backdrop-filter: blur(20px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lightbox-close {
          position: absolute;
          top: -46px;
          right: 0;
          background: transparent;
          border: none;
          color: var(--cream-200);
          cursor: pointer;
          transition: color 0.2s;
        }

        .lightbox-close:hover {
          color: var(--copper-400);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(18, 17, 24, 0.85);
          border: 1px solid rgba(216, 150, 105, 0.3);
          color: var(--cream-100);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
          z-index: 10;
        }

        .lightbox-nav:hover {
          background: var(--copper-500);
          border-color: var(--copper-400);
        }

        .lightbox-nav.prev {
          left: -65px;
        }

        .lightbox-nav.next {
          right: -65px;
        }

        .lightbox-image-wrap {
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(200, 129, 81, 0.2);
          border: 1px solid rgba(216, 150, 105, 0.3);
        }

        .lightbox-img {
          max-width: 82vw;
          max-height: 72vh;
          object-fit: contain;
          display: block;
        }

        .lightbox-caption-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px 8px;
          gap: 16px;
        }

        .lightbox-caption {
          font-size: 1.25rem;
          color: var(--cream-100);
          font-style: italic;
        }

        .lightbox-counter {
          font-size: 0.85rem;
          color: var(--copper-300);
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        @media (max-width: 768px) {
          .lightbox-nav.prev {
            left: 10px;
          }
          .lightbox-nav.next {
            right: 10px;
          }
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

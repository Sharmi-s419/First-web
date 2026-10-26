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
  Image as ImageIcon,
  Heart
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
                  {photo.isLetter ? (
                    <div className="letter-card-preview">
                      <div className="letter-preview-paper">
                        {/* Refined Copper Wax Stamp in Top-Right Corner */}
                        <div className="letter-preview-seal" aria-label="KD &amp; ROWDY Wax Stamp">
                          <Heart size={14} fill="#faebd7" color="#faebd7" className="stamp-heart-icon" />
                          <span className="stamp-seal-name">KD &amp; ROWDY</span>
                        </div>

                        {/* Letter Header Content with clearance for top-right stamp */}
                        <div className="letter-preview-header">
                          <span className="preview-first-letter-badge">The First Letter I Wrote for You 💌</span>
                          <p className="preview-first-letter-sub">My first letter to you, filled with feelings I wanted you to know.</p>
                          <p className="preview-heading">En Anbe ❤️</p>
                        </div>

                        {/* Letter Excerpt */}
                        <div className="letter-preview-body">
                          <p className="preview-line">“Naan idha ungakitte proper-ah sonnena nu therila… aana, en life-la neenga irukkuradhu enakku romba pidicha oru vishayam aayiduchu. ❤️”</p>
                          <p className="preview-line">“Namma pesina conversations, namma panra silly moments...”</p>
                        </div>

                        <div className="letter-preview-fade">
                          <span className="letter-open-pill">Read Love Letter 💌</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={photo.url}
                      alt={photo.caption || `Anniversary memory ${index + 1}`}
                      loading="lazy"
                      className={`gallery-img ${index === 0 ? 'couple-photo' : ''}`}
                    />
                  )}
                  <div className="image-overlay">
                    <span className="expand-hint">
                      <Maximize2 size={18} />
                      <span>{photo.isLetter ? 'Read Letter' : 'View'}</span>
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
              {photos[lightboxIndex].isLetter ? (
                <div className="lightbox-letter-document">
                  <div className="lightbox-parchment">
                    {/* Refined Copper Wax Stamp in Top-Right Corner */}
                    <div className="lightbox-seal-badge" aria-label="KD &amp; ROWDY Wax Stamp">
                      <div className="seal-circle">
                        <Heart size={18} fill="#faebd7" color="#faebd7" className="stamp-heart-icon" />
                        <span className="seal-text">KD &amp; ROWDY</span>
                      </div>
                    </div>

                    {/* Elegant First-Letter Header above content with dedicated clearance for the stamp */}
                    <div className="lightbox-letter-header">
                      <span className="lightbox-first-letter-badge">The First Letter I Wrote for You 💌</span>
                      <p className="lightbox-first-letter-sub">My first letter to you, filled with feelings I wanted you to know.</p>
                      <h3 className="lightbox-letter-title">En Anbe ❤️</h3>
                    </div>

                    <div className="lightbox-letter-body">
                      {photos[lightboxIndex].letterBody ? (
                        photos[lightboxIndex].letterBody.map((paragraph, pIdx) => (
                          <p key={pIdx} className="lightbox-letter-para">
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p className="lightbox-letter-para">
                          Naan idha ungakitte proper-ah sonnena nu therila… aana, en life-la neenga irukkuradhu enakku romba pidicha oru vishayam aayiduchu. ❤️
                        </p>
                      )}
                    </div>
                    <div className="lightbox-letter-signoff">
                      Forever cheering for you,<br />
                      KD ❤️
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={photos[lightboxIndex].url}
                  alt={photos[lightboxIndex].caption || 'Anniversary full size memory'}
                  className="lightbox-img"
                />
              )}
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

        .gallery-img.couple-photo {
          object-fit: cover;
          object-position: center 20%;
        }

        /* Handwritten Letter Card Preview */
        .letter-card-preview {
          width: 100%;
          height: 100%;
          padding: 8px;
          background: #0d0c12;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .letter-preview-paper {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #fdfbf7 0%, #faf4e8 60%, #f4eada 100%);
          border-radius: 10px;
          padding: 16px 14px;
          position: relative;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45), inset 0 0 20px rgba(200, 140, 90, 0.08);
          border: 1.5px solid #e2d4be;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Top-Right Stamp in Preview */
        .letter-preview-seal {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: radial-gradient(circle at 34% 32%, #f8b48c 0%, #d87d4a 32%, #b3562d 68%, #6e201c 100%);
          border: 2px solid rgba(250, 235, 215, 0.85);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 2px 3px rgba(255, 235, 220, 0.55), inset 0 -2px 4px rgba(60, 15, 10, 0.65);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          z-index: 5;
          box-sizing: border-box;
          pointer-events: none;
        }

        .letter-preview-seal::before {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          border: 1px dashed rgba(250, 235, 215, 0.4);
          pointer-events: none;
        }

        .letter-preview-seal .stamp-heart-icon {
          filter: drop-shadow(0 1px 2px rgba(40, 10, 8, 0.8));
        }

        .letter-preview-seal .stamp-seal-name {
          font-family: var(--font-serif);
          font-size: 0.38rem;
          letter-spacing: 0.06em;
          color: #faebd7;
          font-weight: 700;
          text-align: center;
          line-height: 1;
          text-shadow: 0 1px 2px rgba(40, 10, 8, 0.95);
        }

        /* Preview Header with clearance for top-right stamp */
        .letter-preview-header {
          padding-right: 58px;
          margin-bottom: 6px;
          display: flex;
          flex-direction: column;
        }

        .preview-first-letter-badge {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.78rem;
          font-weight: 700;
          color: #983d22;
          letter-spacing: 0.02em;
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .preview-first-letter-sub {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: 0.7rem;
          color: #724c38;
          line-height: 1.25;
          margin-bottom: 4px;
        }

        .preview-heading {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.15rem;
          font-weight: 700;
          color: #8c3218;
          margin: 0;
          line-height: 1.2;
        }

        .letter-preview-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow: hidden;
        }

        .preview-line {
          font-family: 'Caveat', 'Cormorant Garamond', cursive, serif;
          font-size: 0.92rem;
          color: #2b221d;
          line-height: 1.38;
          font-weight: 600;
        }

        .letter-preview-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: linear-gradient(180deg, transparent 0%, rgba(244, 234, 218, 0.95) 65%, #f4eada 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 10px;
          z-index: 4;
        }

        .letter-open-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #201a24;
          color: #faebd7;
          border: 1px solid rgba(216, 150, 105, 0.45);
          padding: 5px 14px;
          border-radius: var(--radius-full);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .gallery-card:hover .letter-open-pill {
          transform: translateY(-2px);
          background: #2e2433;
          border-color: rgba(216, 150, 105, 0.8);
        }

        /* Lightbox Full Letter View */
        .lightbox-letter-document {
          max-width: 680px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          background: linear-gradient(135deg, #fdfbf7 0%, #faf3e6 60%, #f5ecdb 100%);
          border-radius: var(--radius-lg);
          padding: 44px 40px;
          position: relative;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(216, 150, 105, 0.25);
          border: 2px solid #e2d3be;
          color: #2c221c;
          box-sizing: border-box;
        }

        .lightbox-parchment {
          position: relative;
          width: 100%;
        }

        .lightbox-seal-badge {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 5;
        }

        .seal-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: radial-gradient(circle at 34% 32%, #f8b48c 0%, #d87d4a 32%, #b3562d 68%, #6e201c 100%);
          border: 2.5px solid rgba(250, 235, 215, 0.85);
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.45),
            inset 0 3px 5px rgba(255, 235, 220, 0.55),
            inset 0 -3px 6px rgba(60, 15, 10, 0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          text-align: center;
          position: relative;
          box-sizing: border-box;
        }

        .seal-circle::before {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          border: 1px dashed rgba(250, 235, 215, 0.45);
          pointer-events: none;
        }

        .seal-circle .stamp-heart-icon {
          filter: drop-shadow(0 1px 2px rgba(40, 10, 8, 0.8));
        }

        .seal-circle .seal-text {
          font-family: var(--font-serif);
          font-size: 0.56rem;
          color: #faebd7;
          letter-spacing: 0.12em;
          font-weight: 700;
          text-align: center;
          line-height: 1;
          text-shadow: 0 1px 2px rgba(40, 10, 8, 0.95);
        }

        /* Lightbox Header with clearance for top-right stamp */
        .lightbox-letter-header {
          padding-right: 88px;
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px dashed rgba(140, 50, 24, 0.25);
          display: flex;
          flex-direction: column;
        }

        .lightbox-first-letter-badge {
          display: inline-block;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.18rem;
          font-weight: 700;
          color: #9a4023;
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }

        .lightbox-first-letter-sub {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: 1.02rem;
          color: #724c38;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .lightbox-letter-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: 2.3rem;
          font-weight: 700;
          color: #8c3218;
          margin: 0;
          line-height: 1.2;
        }

        .lightbox-letter-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
          font-family: 'Caveat', 'Cormorant Garamond', cursive, serif;
          font-size: 1.35rem;
          line-height: 1.6;
          color: #2c221c;
          font-weight: 600;
        }

        .lightbox-letter-para {
          white-space: pre-line;
        }

        .lightbox-letter-signoff {
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px dashed rgba(140, 50, 24, 0.25);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.35rem;
          color: #8c3218;
          font-weight: 600;
          text-align: right;
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

        @media (max-width: 640px) {
          .lightbox-letter-document {
            padding: 32px 18px;
            max-height: 82vh;
          }
          .seal-circle {
            width: 52px;
            height: 52px;
          }
          .seal-circle .seal-text {
            font-size: 0.44rem;
            letter-spacing: 0.08em;
          }
          .lightbox-letter-header {
            padding-right: 66px;
            margin-bottom: 18px;
            padding-bottom: 12px;
          }
          .lightbox-first-letter-badge {
            font-size: 1rem;
          }
          .lightbox-first-letter-sub {
            font-size: 0.88rem;
            margin-bottom: 8px;
          }
          .lightbox-letter-title {
            font-size: 1.8rem;
          }
          .lightbox-letter-body {
            font-size: 1.18rem;
            gap: 14px;
            line-height: 1.55;
          }
          .lightbox-letter-signoff {
            font-size: 1.2rem;
            margin-top: 20px;
            padding-top: 14px;
          }
        }
      `}</style>
    </section>
  );
}

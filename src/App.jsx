import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import WelcomeScreen from './components/WelcomeScreen';
import RelationshipCounter from './components/RelationshipCounter';
import OurStoryTimeline from './components/OurStoryTimeline';
import MemoriesGallery from './components/MemoriesGallery';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import SpecialLetter from './components/SpecialLetter';
import MusicPlayer from './components/MusicPlayer';
import LongDistanceLove from './components/LongDistanceLove';
import FinalSurprise from './components/FinalSurprise';
import CustomizerModal from './components/CustomizerModal';
import Navbar from './components/Navbar';
import { defaultAnniversaryData } from './data/defaultData';
import { loadAnniversaryData, saveAnniversaryData, clearSavedData } from './utils/storage';
import { Settings, Edit3 } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(() => loadAnniversaryData(defaultAnniversaryData));
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Save changes to localStorage whenever data changes
  const updateData = (newData) => {
    setData(newData);
    saveAnniversaryData(newData);
  };

  const handleUpdateMilestones = (newMilestones) => {
    updateData({ ...data, milestones: newMilestones });
  };

  const handleUpdatePhotos = (newPhotos) => {
    updateData({ ...data, photos: newPhotos });
  };

  const handleUpdateReasons = (newReasons) => {
    updateData({ ...data, reasons: newReasons });
  };

  const handleUpdateLetter = (newLetter) => {
    updateData({ ...data, letter: newLetter });
  };

  const handleUpdateSong = (newSong) => {
    updateData({ ...data, song: newSong });
  };

  const handleUpdateDistance = (newDistance) => {
    updateData({ ...data, longDistance: newDistance });
  };

  const handleResetData = () => {
    clearSavedData();
    setData(defaultAnniversaryData);
    alert('Restored all sections to original anniversary settings!');
  };

  // Replay Story returns user back to Welcome Screen with smooth scroll
  const handleReplayStory = () => {
    setHasOpenedSurprise(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSurprise = () => {
    setHasOpenedSurprise(true);
    setTimeout(() => {
      const counterEl = document.getElementById('counter');
      if (counterEl) {
        counterEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className={`app-root ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* Dynamic Star & Floating Heart Particle Background */}
      <ParticleBackground reducedMotion={reducedMotion} />

      {/* Floating Navigation Header */}
      {hasOpenedSurprise && (
        <Navbar
          myName={data.myName}
          partnerName={data.partnerName}
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode(!isEditMode)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        />
      )}

      {/* 1. Welcome Screen */}
      <WelcomeScreen
        data={data}
        onOpenSurprise={handleOpenSurprise}
      />

      {/* Main Experience (Visible after opening surprise) */}
      <main className={`main-experience ${hasOpenedSurprise ? 'visible' : 'hidden'}`}>
        {/* 2. Live Relationship Counter */}
        <RelationshipCounter
          startDateStr={data.relationshipStartDate}
          anniversaryDateStr={data.anniversaryDate}
          myName={data.myName}
          partnerName={data.partnerName}
        />

        {/* 3. Our Story Section & Milestone Timeline */}
        <OurStoryTimeline
          data={data}
          onUpdateMilestones={handleUpdateMilestones}
          isEditMode={isEditMode}
        />

        {/* 4. Memories Photo Gallery */}
        <MemoriesGallery
          photos={data.photos}
          onUpdatePhotos={handleUpdatePhotos}
          isEditMode={isEditMode}
        />

        {/* 5. Reasons I Love You */}
        <ReasonsILoveYou
          reasons={data.reasons}
          onUpdateReasons={handleUpdateReasons}
          isEditMode={isEditMode}
        />

        {/* 6. A Special Letter from My Heart */}
        <SpecialLetter
          letterData={data.letter}
          myName={data.myName}
          partnerName={data.partnerName}
          onUpdateLetter={handleUpdateLetter}
          isEditMode={isEditMode}
        />

        {/* 7. Our Song */}
        <MusicPlayer
          songData={data.song}
          onUpdateSong={handleUpdateSong}
          isEditMode={isEditMode}
        />

        {/* 8. Long Distance Love (Miles Apart, Close at Heart) */}
        <LongDistanceLove
          data={data.longDistance}
          myName={data.myName}
          partnerName={data.partnerName}
          onUpdateSection={handleUpdateDistance}
          isEditMode={isEditMode}
        />

        {/* 9. Final Surprise & Celebration */}
        <FinalSurprise
          data={data.finalSurprise}
          myName={data.myName}
          partnerName={data.partnerName}
          onReplayStory={handleReplayStory}
        />
      </main>

      {/* Floating Quick Customizer Button */}
      <div className="floating-tools">
        <button
          type="button"
          className="float-tool-btn"
          onClick={() => setIsCustomizerOpen(true)}
          title="Open Customizer & Vercel Export"
        >
          <Settings size={18} />
          <span className="float-label">Customize</span>
        </button>

        <button
          type="button"
          className={`float-tool-btn ${isEditMode ? 'active' : ''}`}
          onClick={() => setIsEditMode(!isEditMode)}
          title={isEditMode ? "Exit edit mode" : "Enable inline edit mode"}
        >
          <Edit3 size={18} />
          <span className="float-label">{isEditMode ? 'Done' : 'Edit Mode'}</span>
        </button>
      </div>

      {/* Customizer Modal */}
      {isCustomizerOpen && (
        <CustomizerModal
          data={data}
          onSaveData={updateData}
          onResetData={handleResetData}
          onClose={() => setIsCustomizerOpen(false)}
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode(!isEditMode)}
        />
      )}

      <style>{`
        .app-root {
          min-height: 100vh;
          position: relative;
          background-color: var(--bg-pure);
          color: var(--cream-200);
        }

        .main-experience {
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .main-experience.hidden {
          display: none;
          opacity: 0;
        }

        .main-experience.visible {
          display: block;
          opacity: 1;
        }

        /* Floating quick tools in bottom corner */
        .floating-tools {
          position: fixed;
          bottom: 24px;
          left: 24px;
          display: flex;
          gap: 10px;
          z-index: 99;
        }

        .float-tool-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(18, 17, 24, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(216, 150, 105, 0.3);
          color: var(--copper-200);
          padding: 10px 18px;
          border-radius: var(--radius-full);
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
          transition: var(--transition-bounce);
        }

        .float-tool-btn:hover {
          background: rgba(216, 150, 105, 0.18);
          border-color: var(--copper-400);
          transform: translateY(-2px);
          color: var(--cream-100);
        }

        .float-tool-btn.active {
          background: var(--copper-500);
          color: #fff;
          border-color: var(--copper-400);
        }

        @media (max-width: 640px) {
          .floating-tools {
            bottom: 16px;
            left: 16px;
          }
          .float-label {
            display: none;
          }
          .float-tool-btn {
            padding: 12px;
            border-radius: 50%;
          }
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import WelcomeScreen from './components/WelcomeScreen';
import RelationshipCounter from './components/RelationshipCounter';
import OurStoryTimeline from './components/OurStoryTimeline';
import MemoriesGallery from './components/MemoriesGallery';
import SpecialLetter from './components/SpecialLetter';
import MusicPlayer from './components/MusicPlayer';
import LongDistanceLove from './components/LongDistanceLove';
import FinalSurprise from './components/FinalSurprise';
import Navbar from './components/Navbar';
import { defaultAnniversaryData } from './data/defaultData';
import { loadAnniversaryData } from './utils/storage';

export default function App() {
  const [data] = useState(() => loadAnniversaryData(defaultAnniversaryData));

  // Replay Story returns user back to Welcome Screen with smooth scroll
  const handleReplayStory = () => {
    const welcomeEl = document.getElementById('welcome-screen');
    if (welcomeEl) {
      welcomeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenSurprise = () => {
    const counterEl = document.getElementById('counter');
    if (counterEl) {
      counterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-root">
      {/* Dynamic Star & Floating Heart Particle Background (Permanently Active) */}
      <ParticleBackground />

      {/* Fixed Navigation Header */}
      <Navbar
        myName={data.myName}
        partnerName={data.partnerName}
      />

      {/* 1. Welcome Screen (Immediately Visible, Smooth Scroll to Counter) */}
      <WelcomeScreen
        data={data}
        onOpenSurprise={handleOpenSurprise}
      />

      {/* Main Experience: Always rendered in DOM to eliminate blank screen issues */}
      <main className="main-experience">
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
        />

        {/* 4. Memories Photo Gallery */}
        <MemoriesGallery
          photos={data.photos}
        />

        {/* 5. A Special Letter from My Heart */}
        <SpecialLetter
          letterData={data.letter}
          myName={data.myName}
          partnerName={data.partnerName}
        />

        {/* 7. Our Song (Apka Baakka) */}
        <MusicPlayer
          songData={data.song}
        />

        {/* 8. Long Distance Love (Miles Apart, Close at Heart) */}
        <LongDistanceLove
          data={data.longDistance}
          myName={data.myName}
          partnerName={data.partnerName}
        />

        {/* 9. Final Surprise & Celebration */}
        <FinalSurprise
          data={data.finalSurprise}
          myName={data.myName}
          partnerName={data.partnerName}
          onReplayStory={handleReplayStory}
        />
      </main>

      <style>{`
        .app-root {
          min-height: 100vh;
          position: relative;
          background-color: var(--bg-pure);
          color: var(--cream-200);
        }

        .main-experience {
          display: block;
          position: relative;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}

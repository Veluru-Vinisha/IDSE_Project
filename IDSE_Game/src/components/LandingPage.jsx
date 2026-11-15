import React, { useState } from 'react';
import { Search, Compass, Shield, Award, Database, TrendingUp, Cpu, Layers, Sparkles, Settings, Play, BookOpen, Volume2, Flame, Zap } from 'lucide-react';
import { sound } from '../utils/sound.js';
import { SettingsModal } from './SettingsModal.jsx';

export function LandingPage({
  onStartInvestigation,
  onOpenHowToPlay,
  onOpenGlossary,
  onResetProgress,
  completedBadges = [],
  casesSolved = 0,
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 75px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a051b 0%, #150938 100%)',
      }}
    >
      {/* Dynamic Glowing Cyber Orbs in Background */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, transparent 65%)',
          pointerEvents: 'none',
          filter: 'blur(30px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 0, 127, 0.2) 0%, transparent 65%)',
          pointerEvents: 'none',
          filter: 'blur(35px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '35%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(199, 125, 255, 0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
          filter: 'blur(25px)',
        }}
      />

      <div
        style={{
          maxWidth: '920px',
          width: '100%',
          textAlign: 'center',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.4rem',
        }}
      >
        {/* Neon Detective Badge Crest */}
        <div
          style={{
            width: '92px',
            height: '92px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #2d1266 0%, #0d0624 100%)',
            border: '3px solid #00f0ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 45px rgba(0, 240, 255, 0.6), inset 0 0 20px rgba(0, 240, 255, 0.3)',
            marginBottom: '0.25rem',
            animation: 'modalEnter 0.5s ease',
          }}
        >
          <Search size={48} color="#00f0ff" />
        </div>

        {/* Agency Title & Glowing Heading */}
        <div>
          <div
            style={{
              fontSize: '0.9rem',
              fontWeight: 900,
              letterSpacing: '0.3em',
              color: '#00f0ff',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              textShadow: '0 0 15px rgba(0, 240, 255, 0.6)',
            }}
          >
            ⚡ DATA DETECTIVE: CYBER MYSTERY LAB
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 20%, #70f7ff 60%, #c77dff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.75rem',
              filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.35))',
            }}
          >
            BECOME A DATA DETECTIVE
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)',
              color: '#e0aaff',
              fontWeight: 600,
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.5,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Crack fake statistics, expose hidden conspiracies, and master core Data Science through 5 thrilling interactive mysteries!
          </p>
        </div>

        {/* Visual Pill Cards with Neon Borders */}
        <div
          style={{
            background: 'rgba(26, 15, 64, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '2px solid #5b37cc',
            borderRadius: '20px',
            padding: '1.3rem 2.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.8rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(91, 55, 204, 0.3)',
            marginTop: '0.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Database size={22} color="#00f0ff" />
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>Real Live Datasets</span>
          </div>
          <div style={{ width: '2px', height: '26px', background: '#3f278d' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Cpu size={22} color="#ffb703" />
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>5 Mystery Cases</span>
          </div>
          <div style={{ width: '2px', height: '26px', background: '#3f278d' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Award size={22} color="#06d6a0" />
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>Unlock Detective Badges</span>
          </div>
        </div>

        {/* Vibrant Call to Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => {
              sound.playClick();
              onStartInvestigation();
            }}
            className="btn btn-primary"
            style={{
              fontSize: '1.15rem',
              padding: '1rem 2.6rem',
              borderRadius: '16px',
              fontWeight: 900,
              boxShadow: '0 0 35px rgba(0, 240, 255, 0.6)',
            }}
          >
            <Play size={22} />
            <span>PLAY GAME / CHOOSE CASE ➔</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenGlossary();
            }}
            className="btn btn-secondary"
            style={{
              fontSize: '1rem',
              padding: '0.95rem 1.6rem',
              borderRadius: '16px',
              borderColor: '#00f0ff',
              color: '#00f0ff',
              fontWeight: 800,
            }}
          >
            <BookOpen size={20} />
            <span>📖 Plain English Words</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenHowToPlay();
            }}
            className="btn btn-secondary"
            style={{ fontSize: '1rem', padding: '0.95rem 1.6rem', borderRadius: '16px', fontWeight: 800 }}
          >
            <Compass size={20} />
            <span>How to Play</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsSettingsOpen(true);
            }}
            className="btn btn-ghost"
            style={{
              fontSize: '1rem',
              padding: '0.95rem 1.25rem',
              borderRadius: '16px',
              color: '#c77dff',
              border: '1.5px solid #3f278d',
            }}
            title="Settings & Audio"
          >
            <Settings size={22} />
          </button>
        </div>

        {/* Badges Preview Bar */}
        <div style={{ marginTop: '2.2rem', width: '100%' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em', color: '#b8b2d8', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            5 Unlockable Official Detective Badges
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            {[
              { name: 'Sampling Specialist', icon: Search, color: '#00f0ff' },
              { name: 'Correlation Detective', icon: TrendingUp, color: '#ffb703' },
              { name: 'Model Inspector', icon: Cpu, color: '#ff007f' },
              { name: 'Variance Auditor', icon: Shield, color: '#c77dff' },
              { name: 'Pattern Finder', icon: Layers, color: '#06d6a0' },
            ].map((b, idx) => {
              const isEarned = completedBadges.includes(b.name);
              const IconComp = b.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: isEarned ? `${b.color}22` : '#160c38',
                    border: `2px solid ${isEarned ? b.color : '#2d1b69'}`,
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: isEarned ? '#ffffff' : '#7d75a8',
                    boxShadow: isEarned ? `0 0 15px ${b.color}44` : 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <IconComp size={16} color={isEarned ? b.color : '#7d75a8'} />
                  <span>{b.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetProgress={onResetProgress}
      />
    </div>
  );
}

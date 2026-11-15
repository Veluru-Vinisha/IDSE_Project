import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, RotateCcw, Check, Sparkles, X } from 'lucide-react';
import { sound } from '../utils/sound.js';

export function SettingsModal({ isOpen, onClose, onResetProgress }) {
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [difficulty, setDifficulty] = useState('beginner');

  if (!isOpen) return null;

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all game progress and start from Case 1?')) {
      onResetProgress();
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px', padding: '1.75rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚙️</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Game Settings & Sound
            </h2>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Sound Effect Setting */}
          <div style={{ background: '#0e172a', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9rem' }}>Sound Effects & Audio</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Play clicks, clue sounds and victory cheers</div>
            </div>
            <button
              onClick={handleToggleSound}
              className={`btn ${isMuted ? 'btn-secondary' : 'btn-primary'} btn-sm`}
              style={{ gap: '0.4rem' }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'Muted' : 'Enabled'}</span>
            </button>
          </div>

          {/* Difficulty Setting */}
          <div style={{ background: '#0e172a', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Learning Mode</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>Choose how much help you want during cases</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setDifficulty('beginner')}
                className={`btn btn-sm ${difficulty === 'beginner' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', justifyContent: 'center' }}
              >
                🌱 Beginner (With Clues)
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('detective')}
                className={`btn btn-sm ${difficulty === 'detective' ? 'btn-accent' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', justifyContent: 'center' }}
              >
                🕵️ Pro Detective
              </button>
            </div>
          </div>

          {/* Reset Game Data */}
          <div style={{ background: '#1c1315', padding: '1rem', borderRadius: '12px', border: '1px solid #4a191f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, color: '#f87171', fontSize: '0.875rem' }}>Reset Progress</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Clear points, unlocked cases, and badges</div>
            </div>
            <button
              onClick={handleReset}
              className="btn btn-sm"
              style={{ background: '#ef4444', color: '#fff', fontSize: '0.775rem' }}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '0.5rem 1.25rem' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

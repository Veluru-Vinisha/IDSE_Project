import React, { useState, useEffect } from 'react';
import {
  POPULATION,
  POPULATION_STATS,
  SAMPLING_METHODS,
  drawSample,
} from '../../data/case1_sampling.js';
import { DatasetTable } from '../DatasetTable.jsx';
import { Sliders, RefreshCw, AlertTriangle, CheckCircle, Bookmark, BarChart2, MapPin, Users, Sparkles, Building2, Dice5, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/sound.js';

export function Case1SamplingView({ onCollectClue }) {
  const [method, setMethod] = useState('convenience_engineering');
  const [sampleSize, setSampleSize] = useState(60);
  const [seed, setSeed] = useState(101);
  const [analysis, setAnalysis] = useState(() => drawSample('convenience_engineering', 60, 101));
  const [showTruePop, setShowTruePop] = useState(false);
  const [activeTab, setActiveTab] = useState('map'); // 'map' or 'table'

  useEffect(() => {
    const res = drawSample(method, sampleSize, seed);
    setAnalysis(res);
  }, [method, sampleSize, seed]);

  const handleSelectLocation = (methodId) => {
    sound.playClick();
    setMethod(methodId);
    if (methodId === 'simple_random' || methodId === 'stratified_random') {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  const handleResample = () => {
    sound.playAnalysis();
    setSeed((s) => s + 1);
  };

  const handleCollectClue = () => {
    sound.playClue();
    const currMethod = SAMPLING_METHODS.find((m) => m.id === method)?.name;
    const text = `Campus Survey Report (${currMethod}, n=${analysis.sampleSize}): Estimated satisfaction is ${analysis.estimatedSatisfactionRate}%. Engineering makes up ${analysis.departmentComposition.Engineering?.samplePct}% of this sample (vs only ${analysis.departmentComposition.Engineering?.popPct}% in campus population).`;
    onCollectClue(text);
  };

  const tableColumns = [
    { key: 'id', label: 'Student ID' },
    { key: 'name', label: 'Name' },
    { key: 'department', label: 'Department' },
    { key: 'year', label: 'Year', format: (v) => `Year ${v}` },
    { key: 'residence', label: 'Residence' },
    {
      key: 'satisfied',
      label: 'Satisfaction',
      format: (v) => (
        <span className={`badge ${v === 1 ? 'badge-emerald' : 'badge-rose'}`}>
          {v === 1 ? '😊 Happy' : '😡 Unhappy'}
        </span>
      ),
    },
    { key: 'rating', label: 'Rating (1-10)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 🗺️ INTERACTIVE CAMPUS MAP ZONE SELECTOR */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #101c36 0%, #0d1627 100%)',
          border: '2px solid #06b6d4',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              🎮 INTERACTIVE INVESTIGATION
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc', margin: '0.2rem 0' }}>
              Where on Campus Will You Send Your Survey Team?
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
              Click on different campus locations to see how who you ask changes the satisfaction numbers!
            </p>
          </div>

          <button onClick={handleResample} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            <RefreshCw size={14} />
            <span>🎲 Re-roll Random Students</span>
          </button>
        </div>

        {/* 4 Interactive Location Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {/* Option 1: Engineering Lobby */}
          <div
            onClick={() => handleSelectLocation('convenience_engineering')}
            style={{
              background: method === 'convenience_engineering' ? 'linear-gradient(135deg, #162a4d 0%, #0e1c33 100%)' : '#0c1424',
              border: `2px solid ${method === 'convenience_engineering' ? '#f43f5e' : '#1e2d4d'}`,
              borderRadius: '16px',
              padding: '1.2rem',
              cursor: 'pointer',
              transform: method === 'convenience_engineering' ? 'scale(1.03)' : 'none',
              boxShadow: method === 'convenience_engineering' ? '0 0 25px rgba(244, 63, 94, 0.35)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.6rem' }}>🏢</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: method === 'convenience_engineering' ? '#fb7185' : '#f1f5f9' }}>
                  Engineering Innovation Center
                </div>
                <span className="badge badge-rose" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  ⚠️ Luxury Wing Bias
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Brand new $50M building with massage chairs & espresso bars. Students here love campus, but it ignores everyone else!
            </p>
          </div>

          {/* Option 2: True Campus Lottery */}
          <div
            onClick={() => handleSelectLocation('simple_random')}
            style={{
              background: method === 'simple_random' ? 'linear-gradient(135deg, #0e2f38 0%, #091e24 100%)' : '#0c1424',
              border: `2px solid ${method === 'simple_random' ? '#10b981' : '#1e2d4d'}`,
              borderRadius: '16px',
              padding: '1.2rem',
              cursor: 'pointer',
              transform: method === 'simple_random' ? 'scale(1.03)' : 'none',
              boxShadow: method === 'simple_random' ? '0 0 25px rgba(16, 185, 129, 0.35)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.6rem' }}>🎲</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: method === 'simple_random' ? '#34d399' : '#f1f5f9' }}>
                  Campus-Wide Random Lottery
                </div>
                <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  ✅ Fair & Unbiased
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Picks students completely at random across all 5 departments (Arts, Nursing, Business, Science, Engineering).
            </p>
          </div>

          {/* Option 3: Online Poll */}
          <div
            onClick={() => handleSelectLocation('voluntary_poll')}
            style={{
              background: method === 'voluntary_poll' ? 'linear-gradient(135deg, #2c2014 0%, #1a1309 100%)' : '#0c1424',
              border: `2px solid ${method === 'voluntary_poll' ? '#f59e0b' : '#1e2d4d'}`,
              borderRadius: '16px',
              padding: '1.2rem',
              cursor: 'pointer',
              transform: method === 'voluntary_poll' ? 'scale(1.03)' : 'none',
              boxShadow: method === 'voluntary_poll' ? '0 0 25px rgba(245, 158, 11, 0.35)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.6rem' }}>📢</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: method === 'voluntary_poll' ? '#fbbf24' : '#f1f5f9' }}>
                  Online Voluntary Web Link
                </div>
                <span className="badge badge-amber" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  ⚠️ Voluntary Bias
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Posting a link online where only students with strong opinions or extra free time bother to click and vote.
            </p>
          </div>

          {/* Option 4: Proportional Quota */}
          <div
            onClick={() => handleSelectLocation('stratified_random')}
            style={{
              background: method === 'stratified_random' ? 'linear-gradient(135deg, #1d1b38 0%, #100f21 100%)' : '#0c1424',
              border: `2px solid ${method === 'stratified_random' ? '#8b5cf6' : '#1e2d4d'}`,
              borderRadius: '16px',
              padding: '1.2rem',
              cursor: 'pointer',
              transform: method === 'stratified_random' ? 'scale(1.03)' : 'none',
              boxShadow: method === 'stratified_random' ? '0 0 25px rgba(139, 92, 246, 0.35)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.6rem' }}>⚖️</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: method === 'stratified_random' ? '#a78bfa' : '#f1f5f9' }}>
                  Balanced Department Quota
                </div>
                <span className="badge" style={{ background: '#8b5cf622', color: '#a78bfa', borderColor: '#8b5cf6', fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  ✅ Gold Standard
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Ensures every major gets an exact proportional seat at the table so no single building dominates.
            </p>
          </div>
        </div>

        {/* Survey Size Slider */}
        <div style={{ marginTop: '1.5rem', background: '#09101d', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #1c2b42' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>
              How many students will you interview?
            </span>
            <span className="mono badge badge-cyan" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem', fontWeight: 800 }}>
              {sampleSize} Students Interviewed
            </span>
          </div>
          <input
            type="range"
            min={30}
            max={250}
            step={10}
            value={sampleSize}
            onChange={(e) => setSampleSize(Number(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: '0.3rem' }}>
            <span>30 (Small Sample)</span>
            <span>140 (Medium Sample)</span>
            <span>250 (Huge Sample)</span>
          </div>
        </div>
      </div>

      {/* 📊 LIVE RESULTS SCOREBOARD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {/* Card 1: What this survey claims */}
        <div className="card" style={{ background: '#0e172a', borderLeft: '5px solid #06b6d4', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
            WHAT YOUR SURVEY TEAM FOUND
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#22d3ee', margin: '0.3rem 0' }} className="mono">
            {analysis.estimatedSatisfactionRate}%
          </div>
          <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
            {analysis.estimatedSatisfactionRate > 85 ? (
              <span style={{ color: '#f87171' }}>
                🚨 Artificially high! Over 85% of respondents came from the luxury wing!
              </span>
            ) : (
              <span style={{ color: '#34d399' }}>
                ✅ Realistic estimate matching real campus truth.
              </span>
            )}
          </div>
        </div>

        {/* Card 2: Ground Truth Reveal */}
        <div className="card" style={{ background: '#0e172a', borderLeft: '5px solid #f59e0b', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              REAL TRUTH (ALL 600 STUDENTS)
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setShowTruePop(!showTruePop);
              }}
              className="btn btn-sm"
              style={{
                padding: '0.25rem 0.6rem',
                fontSize: '0.75rem',
                color: '#fbbf24',
                background: '#231a08',
                border: '1px solid #784d09',
                borderRadius: '8px',
                fontWeight: 700,
              }}
            >
              {showTruePop ? 'Hide' : '🔓 Reveal Reality'}
            </button>
          </div>
          {showTruePop ? (
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24', margin: '0.3rem 0' }} className="mono">
                {POPULATION_STATS.trueSatisfactionRate}%
              </div>
              <div style={{ fontSize: '0.775rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Counted across all 600 students from Arts, Nursing, Science, Business & Engineering. The administration's "95%" claim was totally fabricated!
              </div>
            </div>
          ) : (
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', padding: '1rem 0' }}>
              🔒 Click "Reveal Reality" to see what all 600 students across the college actually think!
            </div>
          )}
        </div>
      </div>

      {/* 👥 VISUAL STUDENT CROWD INSPECTION */}
      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="#06b6d4" />
              Who Actually Answered Your Survey? (Department Breakdown)
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Blue bar = % in your survey. Yellow bar = % in real college population.
            </div>
          </div>

          <button onClick={handleCollectClue} className="btn btn-accent btn-sm glow-amber" style={{ fontWeight: 800 }}>
            <Bookmark size={14} />
            <span>Save Detective Evidence</span>
          </button>
        </div>

        {/* Visual Bar Comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(analysis.departmentComposition).map(([dept, stats]) => {
            const isDominating = stats.samplePct > 50 && stats.popPct < 30;
            return (
              <div key={dept} style={{ background: isDominating ? 'rgba(244, 63, 94, 0.08)' : 'transparent', padding: isDominating ? '0.5rem' : '0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 800, color: isDominating ? '#fb7185' : '#f8fafc' }}>
                    {dept} {isDominating && '🚨 (TAKING OVER THE SURVEY!)'}
                  </span>
                  <span className="mono" style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Your Survey: <strong style={{ color: '#22d3ee' }}>{stats.samplePct}%</strong> | Real Campus: <strong style={{ color: '#fbbf24' }}>{stats.popPct}%</strong>
                  </span>
                </div>

                {/* Double Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ height: '10px', background: '#0a101d', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${stats.samplePct}%`, background: isDominating ? 'linear-gradient(90deg, #f43f5e, #fb7185)' : 'linear-gradient(90deg, #06b6d4, #38bdf8)', borderRadius: '5px', transition: 'width 0.4s ease' }} />
                  </div>
                  <div style={{ height: '6px', background: '#0a101d', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${stats.popPct}%`, background: '#f59e0b', borderRadius: '3px', opacity: 0.8 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dataset Table */}
      <DatasetTable
        title="Individual Student Survey Responses"
        data={analysis.sample}
        columns={tableColumns}
      />
    </div>
  );
}

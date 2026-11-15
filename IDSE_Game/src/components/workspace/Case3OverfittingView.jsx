import React, { useState, useMemo } from 'react';
import { DATASET, MODEL_COMPLEXITIES, evaluateModel } from '../../data/case3_overfitting.js';
import { DatasetTable } from '../DatasetTable.jsx';
import { Sliders, Bookmark, Cpu, Eye, AlertTriangle, CheckCircle, BarChart2, Zap, Play, Trophy, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/sound.js';

export function Case3OverfittingView({ onCollectClue }) {
  const [selectedDegree, setSelectedDegree] = useState(1);
  const [showTestPoints, setShowTestPoints] = useState(false);
  const [examPassed, setExamPassed] = useState(null);

  const evaluation = useMemo(() => {
    return evaluateModel(selectedDegree);
  }, [selectedDegree]);

  const handleSelectComplexity = (deg) => {
    sound.playAnalysis();
    setSelectedDegree(deg);
    setExamPassed(null);
  };

  const handleLaunchExam = () => {
    sound.playAnalysis();
    setShowTestPoints(true);
    const passed = selectedDegree === 3; // Degree 3 (Sweet spot) passes the test exam
    setExamPassed(passed);

    if (passed) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    } else {
      sound.playWarning();
    }
  };

  const handleCollectClue = () => {
    sound.playClue();
    const curr = MODEL_COMPLEXITIES.find((c) => c.degree === selectedDegree)?.name;
    const text = `Model Fit (${curr}): Practice Error = ${evaluation.trainMSE}, Real Exam Error = ${evaluation.testMSE}. Notice: The Wild Rollercoaster model memorized the practice test, but crashed miserably on unseen customer exams!`;
    onCollectClue(text);
  };

  // SVG coordinate conversions
  const svgWidth = 550;
  const svgHeight = 280;
  const padding = 45;

  const minX = 0;
  const maxX = 100;
  const minY = 0;
  const maxY = 100;

  const getSvgX = (x) => padding + (x / maxX) * (svgWidth - 2 * padding);
  const getSvgY = (y) => svgHeight - padding - (y / maxY) * (svgHeight - 2 * padding);

  // SVG path for fitted polynomial curve
  const curvePath = evaluation.curvePoints
    .map((pt, i) => {
      const sx = getSvgX(pt.x);
      const sy = Math.max(10, Math.min(svgHeight - 10, getSvgY(pt.y)));
      return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
    })
    .join(' ');

  const tableData = [...DATASET.train, ...(showTestPoints ? DATASET.test : [])];
  const tableColumns = [
    { key: 'id', label: 'Customer ID' },
    {
      key: 'type',
      label: 'Question Type',
      format: (v) => (
        <span className={`badge ${v === 'train' ? 'badge-cyan' : 'badge-amber'}`}>
          {v === 'train' ? 'Practice Question' : 'Surprise Real Exam'}
        </span>
      ),
    },
    { key: 'engagementScore', label: 'Customer Usage (0-100)' },
    { key: 'renewalRate', label: 'Renewal Chance (%)', format: (v) => `${v}%` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Interactive Student Brain Selector */}
      <div className="card" style={{ background: '#0e172a', border: '1px solid #1e3a5f' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🧠</span> Pick Your Student's Learning Brain:
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              How does this AI model study for its customer renewal test?
            </p>
          </div>
          <button onClick={handleCollectClue} className="btn btn-accent btn-sm">
            <Bookmark size={14} />
            <span>Save Detective Clue</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {MODEL_COMPLEXITIES.map((m) => {
            const isSelected = selectedDegree === m.degree;
            return (
              <div
                key={m.id}
                onClick={() => handleSelectComplexity(m.degree)}
                style={{
                  background: isSelected ? 'rgba(6, 182, 212, 0.15)' : '#131e33',
                  border: `2px solid ${isSelected ? '#06b6d4' : '#1e2b40'}`,
                  borderRadius: '12px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.02)' : 'none',
                  boxShadow: isSelected ? '0 0 20px rgba(6, 182, 212, 0.3)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? '#38bdf8' : '#e2e8f0' }}>
                    {m.name}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Big Action Arena: Take the Real Exam! */}
      <div
        style={{
          background: 'linear-gradient(135deg, #102340 0%, #0d1728 100%)',
          border: '2px solid #2563eb',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            🎮 THE TEST ARENA
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
            Test This Model on 24 Brand New Unseen Customers!
          </h4>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
            Will the model predict their renewals correctly, or did it just memorize past answers?
          </p>
        </div>

        <button
          onClick={handleLaunchExam}
          className="btn btn-primary glow-cyan"
          style={{ fontSize: '1rem', padding: '0.75rem 1.8rem', fontWeight: 900, borderRadius: '12px' }}
        >
          <Play size={18} />
          <span>Launch Surprise Real Exam 🚀</span>
        </button>
      </div>

      {/* Exam Result Banner (Visible after hitting Launch) */}
      {examPassed !== null && (
        <div
          style={{
            background: examPassed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `2px solid ${examPassed ? '#10b981' : '#ef4444'}`,
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            animation: 'modalEnter 0.3s ease',
          }}
        >
          <div style={{ fontSize: '2rem' }}>{examPassed ? '🏆' : '💥'}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: examPassed ? '#34d399' : '#f87171' }}>
              {examPassed ? 'EXAM PASSED WITH FLYING COLORS!' : 'EXAM FAILED DISASTROUSLY!'}
            </div>
            <p style={{ fontSize: '0.825rem', color: '#e2e8f0', margin: '0.2rem 0 0 0', lineHeight: 1.45 }}>
              {examPassed
                ? 'Level 2 achieved the lowest real error (26). It understood the smooth curve without getting confused by random dots!'
                : selectedDegree === 9
                ? 'Level 3 got 100% on practice by drawing crazy rollercoaster loops, but when real customers arrived, its error exploded to 480+!'
                : 'Level 1 is too stiff! It drew a flat ruler and missed the real curve entirely!'}
            </p>
          </div>
        </div>
      )}

      {/* Scorecards Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {/* Practice Score */}
        <div className="card" style={{ background: '#0d1527', borderLeft: '4px solid #06b6d4' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>
            ERRORS ON PRACTICE QUESTIONS (Blue Dots)
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#22d3ee', margin: '0.2rem 0' }} className="mono">
            {evaluation.trainMSE} mistakes
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            {selectedDegree === 9 ? '⭐ Looks like a genius on practice (only 4 mistakes)!' : 'A few practice mistakes'}
          </div>
        </div>

        {/* Real Exam Score */}
        <div
          className="card"
          style={{
            background: '#0d1527',
            borderLeft: `4px solid ${evaluation.testMSE > 100 ? '#ef4444' : evaluation.testMSE < 35 ? '#10b981' : '#f59e0b'}`,
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>
            ERRORS ON SURPRISE REAL EXAM (Orange Squares)
          </div>
          <div
            style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              color: evaluation.testMSE > 100 ? '#f43f5e' : evaluation.testMSE < 35 ? '#10b981' : '#fbbf24',
              margin: '0.2rem 0',
            }}
            className="mono"
          >
            {evaluation.testMSE} mistakes
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700 }}>
            {evaluation.testMSE > 100
              ? '💥 Failed real test! (Memorizing noise failed)'
              : evaluation.testMSE < 35
              ? '🏆 Winner! Lowest mistakes on new questions!'
              : '⚠️ Sub-optimal'}
          </div>
        </div>
      </div>

      {/* Interactive Visual Graph with Clear Legend */}
      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BarChart2 size={16} color="#06b6d4" />
              Customer Renewal Prediction Line:
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Watch how the blue curve bends as you change learning brains!
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', fontSize: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} /> Practice Dots
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fbbf24' }}>
              <span style={{ width: '10px', height: '10px', background: '#fbbf24', display: 'inline-block' }} /> Real Exam Squares
            </span>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', background: '#09101d', borderRadius: '8px' }}>
            {/* Grid Lines */}
            <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#1f2d47" strokeWidth="1" />
            <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#1f2d47" strokeWidth="1" />

            {/* Fitted Model Curve */}
            <path d={curvePath} fill="none" stroke={selectedDegree === 9 ? '#f43f5e' : selectedDegree === 3 ? '#10b981' : '#38bdf8'} strokeWidth="3.5" />

            {/* Training Points (Solid Blue Circles) */}
            {DATASET.train.map((pt, i) => (
              <circle
                key={`tr-${i}`}
                cx={getSvgX(pt.engagementScore)}
                cy={getSvgY(pt.renewalRate)}
                r="4.5"
                fill="#0284c7"
                stroke="#38bdf8"
                strokeWidth="1"
              >
                <title>Practice Question: Score {pt.engagementScore}, Renewal {pt.renewalRate}%</title>
              </circle>
            ))}

            {/* Test Points (Hollow Amber Squares) */}
            {showTestPoints &&
              DATASET.test.map((pt, i) => (
                <rect
                  key={`te-${i}`}
                  x={getSvgX(pt.engagementScore) - 4.5}
                  y={getSvgY(pt.renewalRate) - 4.5}
                  width="9"
                  height="9"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                >
                  <title>Surprise Real Exam Question: Score {pt.engagementScore}, Renewal {pt.renewalRate}%</title>
                </rect>
              ))}

            {/* Labels */}
            <text x={svgWidth / 2} y={svgHeight - 12} fill="#94a3b8" fontSize="11" textAnchor="middle">
              Customer Engagement Score (0 - 100)
            </text>
            <text x={14} y={svgHeight / 2} fill="#94a3b8" fontSize="11" transform={`rotate(-90 14,${svgHeight / 2})`} textAnchor="middle">
              Renewal Probability (%)
            </text>
          </svg>
        </div>
      </div>

      {/* Dataset Table */}
      <DatasetTable
        title="Customer Observations (Practice vs Real Exam)"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
}

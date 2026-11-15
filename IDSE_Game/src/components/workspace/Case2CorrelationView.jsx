import React, { useState, useMemo } from 'react';
import { TOWN_DATA, VARIABLE_META, analyzeVariables } from '../../data/case2_correlation.js';
import { DatasetTable } from '../DatasetTable.jsx';
import { Sliders, Bookmark, AlertCircle, Sun, CheckCircle2, TrendingUp, Info, CloudSun, Snowflake, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/sound.js';

export function Case2CorrelationView({ onCollectClue }) {
  const [xVar, setXVar] = useState('iceCreamSales');
  const [yVar, setYVar] = useState('swimmingIncidents');
  const [tempFilter, setTempFilter] = useState('all');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const analysis = useMemo(() => {
    return analyzeVariables(xVar, yVar, tempFilter);
  }, [xVar, yVar, tempFilter]);

  const handleSelectFilter = (filterKey) => {
    sound.playAnalysis();
    setTempFilter(filterKey);
    if (filterKey === 'hot') {
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleCollectClue = () => {
    sound.playClue();
    const xName = VARIABLE_META[xVar]?.shortLabel;
    const yName = VARIABLE_META[yVar]?.shortLabel;
    let filterText = tempFilter === 'all' ? 'All Weeks' : `${tempFilter.toUpperCase()} weather only`;
    const text = `Correlation Audit (${xName} vs ${yName}, ${filterText}): Connection score r = ${analysis.r}. Notice: When you filter to hot summer days, the line flattens completely! Ice cream sales have ZERO relationship with rescues.`;
    onCollectClue(text);
  };

  // Compute SVG plot bounds
  const xValues = analysis.data.map((d) => d[xVar]);
  const yValues = analysis.data.map((d) => d[yVar]);
  const minX = Math.min(...xValues, 0);
  const maxX = Math.max(...xValues, 10);
  const minY = Math.min(...yValues, 0);
  const maxY = Math.max(...yValues, 10);

  const svgWidth = 550;
  const svgHeight = 280;
  const padding = 45;

  const getSvgX = (val) => padding + ((val - minX) / (maxX - minX || 1)) * (svgWidth - 2 * padding);
  const getSvgY = (val) => svgHeight - padding - ((val - minY) / (maxY - minY || 1)) * (svgHeight - 2 * padding);

  // Regression line endpoints
  const regX1 = minX;
  const regY1 = analysis.slope * regX1 + analysis.intercept;
  const regX2 = maxX;
  const regY2 = analysis.slope * regX2 + analysis.intercept;

  const tableColumns = [
    { key: 'week', label: 'Week', format: (v) => `Wk ${v}` },
    { key: 'month', label: 'Month' },
    { key: 'temperature', label: 'Temp (°F)', format: (v) => `${v}°F` },
    { key: 'iceCreamSales', label: 'Ice Cream ($k)', format: (v) => `$${v}k` },
    { key: 'swimmingIncidents', label: 'Swimming Calls', format: (v) => `${v} calls` },
    { key: 'parkVisitors', label: 'Beach Visitors', format: (v) => `${v * 100}` },
    { key: 'hotCocoaSales', label: 'Hot Cocoa ($k)', format: (v) => `$${v}k` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* ☀️ INTERACTIVE WEATHER CONTROL MACHINE */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #18223d 0%, #0d1627 100%)',
          border: '2px solid #f59e0b',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 0 30px rgba(245, 158, 11, 0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              🔬 THE LURKING VARIABLE MACHINE
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc', margin: '0.2rem 0' }}>
              Does Ice Cream Cause Drownings? Change the Weather Season to Test!
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
              Click each weather season button below to see if the connection between ice cream and rescues disappears!
            </p>
          </div>

          <button onClick={handleCollectClue} className="btn btn-accent btn-sm glow-amber" style={{ fontWeight: 800 }}>
            <Bookmark size={14} />
            <span>Save Detective Evidence</span>
          </button>
        </div>

        {/* 4 Interactive Weather Season Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {/* Weather 1: All Weather */}
          <div
            onClick={() => handleSelectFilter('all')}
            style={{
              background: tempFilter === 'all' ? 'linear-gradient(135deg, #182d4f 0%, #0d1b33 100%)' : '#0c1424',
              border: `2px solid ${tempFilter === 'all' ? '#06b6d4' : '#1e2d4d'}`,
              borderRadius: '16px',
              padding: '1.1rem',
              cursor: 'pointer',
              transform: tempFilter === 'all' ? 'scale(1.03)' : 'none',
              boxShadow: tempFilter === 'all' ? '0 0 25px rgba(6, 182, 212, 0.35)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.6rem' }}>🌀</span>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: tempFilter === 'all' ? '#38bdf8' : '#f1f5f9' }}>
                All 52 Weeks Mixed
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Mixing cold winter & hot summer together creates an illusion that ice cream causes water rescues (r = +0.90)!
            </p>
          </div>

          {/* Weather 2: Cold Days Only */}
          <div
            onClick={() => handleSelectFilter('cold')}
            style={{
              background: tempFilter === 'cold' ? 'linear-gradient(135deg, #0e2738 0%, #0a1b26 100%)' : '#0c1424',
              border: `2px solid ${tempFilter === 'cold' ? '#38bdf8' : '#1e2d4d'}`,
              borderRadius: '16px',
              padding: '1.1rem',
              cursor: 'pointer',
              transform: tempFilter === 'cold' ? 'scale(1.03)' : 'none',
              boxShadow: tempFilter === 'cold' ? '0 0 25px rgba(56, 189, 248, 0.35)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.6rem' }}>❄️</span>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: tempFilter === 'cold' ? '#38bdf8' : '#f1f5f9' }}>
                Cold Winter Days (&lt;55°F)
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Almost nobody swims in freezing water, and almost nobody buys beach ice cream. Both are tiny!
            </p>
          </div>

          {/* Weather 3: Mild Days */}
          <div
            onClick={() => handleSelectFilter('mild')}
            style={{
              background: tempFilter === 'mild' ? 'linear-gradient(135deg, #1e2e1a 0%, #121c10 100%)' : '#0c1424',
              border: `2px solid ${tempFilter === 'mild' ? '#10b981' : '#1e2d4d'}`,
              borderRadius: '16px',
              padding: '1.1rem',
              cursor: 'pointer',
              transform: tempFilter === 'mild' ? 'scale(1.03)' : 'none',
              boxShadow: tempFilter === 'mild' ? '0 0 25px rgba(16, 185, 129, 0.35)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.6rem' }}>🌤️</span>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: tempFilter === 'mild' ? '#34d399' : '#f1f5f9' }}>
                Mild Spring / Autumn
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Moderate outdoor temperatures (55°F to 72°F). Beach activity starts warming up.
            </p>
          </div>

          {/* Weather 4: HOT SUMMER (THE DETECTIVE SMOKING GUN) */}
          <div
            onClick={() => handleSelectFilter('hot')}
            style={{
              background: tempFilter === 'hot' ? 'linear-gradient(135deg, #3d1c14 0%, #26110b 100%)' : '#0c1424',
              border: `2px solid ${tempFilter === 'hot' ? '#f43f5e' : '#f59e0b'}`,
              borderRadius: '16px',
              padding: '1.1rem',
              cursor: 'pointer',
              transform: tempFilter === 'hot' ? 'scale(1.04)' : 'none',
              boxShadow: tempFilter === 'hot' ? '0 0 30px rgba(244, 63, 94, 0.45)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.6rem' }}>🔥</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#fb7185' }}>
                  Hot Summer Days (&gt;72°F)
                </div>
                <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>
                  ⭐ CLICK ME!
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Heat is constant! Watch the line flatten out to zero: ice cream sales have NO connection to rescues!
            </p>
          </div>
        </div>
      </div>

      {/* 📈 DYNAMIC STATUS & VERDICT BOARD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {/* Score Meter */}
        <div className="card" style={{ background: '#0e172a', borderLeft: '5px solid #06b6d4', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800 }}>
            CONNECTION STRENGTH ("r" SCORE)
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#22d3ee', margin: '0.2rem 0' }} className="mono">
            {analysis.r > 0 ? `+${analysis.r}` : analysis.r}
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc' }}>
            {Math.abs(analysis.r) > 0.7 ? (
              <span style={{ color: '#fb7185' }}>📈 Steep line: Numbers climbing together!</span>
            ) : (
              <span style={{ color: '#34d399' }}>➖ Flat line: Zero connection!</span>
            )}
          </div>
        </div>

        {/* Flat Line Verdict Explanation */}
        <div className="card" style={{ background: '#0e172a', borderLeft: '5px solid #10b981', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800 }}>
            WHAT DOES THE LINE REVEAL?
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: tempFilter === 'hot' ? '#34d399' : '#fbbf24', margin: '0.35rem 0' }}>
            {tempFilter === 'hot' ? '🎉 THE LINE IS FLAT (Ice Cream is Innocent!)' : '⚠️ FAKE CONNECTION (Confounded by Sun)'}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45, margin: 0 }}>
            {tempFilter === 'hot' ? (
              <span>
                On hot days, ice cream sales can be \$20k or \$60k, yet rescues stay the same. The hot summer sun caused both! Banning ice cream would save zero lives.
              </span>
            ) : (
              <span>
                Select <strong>"🔥 Hot Summer Days Only"</strong> above to isolate the weather factor and expose the coincidence!
              </span>
            )}
          </p>
        </div>
      </div>

      {/* 📊 SCATTER PLOT VISUALIZATION */}
      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="#06b6d4" />
              Scatter Plot: Weekly Ice Cream Sales vs Lifeguard Rescues
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Each blue dot is one week. The line shows the trend. Watch it tilt or flatten!
            </div>
          </div>
          <span className="mono badge badge-cyan">{analysis.totalPoints} Weeks Tracked</span>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', background: '#09101d', borderRadius: '12px' }}>
            {/* Grid */}
            <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#1f2d47" strokeWidth="1" />
            <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#1f2d47" strokeWidth="1" />

            {/* Regression Line */}
            <line
              x1={getSvgX(regX1)}
              y1={getSvgY(regY1)}
              x2={getSvgX(regX2)}
              y2={getSvgY(regY2)}
              stroke={tempFilter === 'hot' ? '#10b981' : '#f59e0b'}
              strokeWidth="4"
            />

            {/* Scatter dots */}
            {analysis.data.map((d, i) => {
              const cx = getSvgX(d[xVar]);
              const cy = getSvgY(d[yVar]);
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="#0284c7"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                >
                  <title>Wk {d.week} ({d.month}): {d.temperature}°F, Ice Cream ${d.iceCreamSales}k, Rescues {d.swimmingIncidents}</title>
                </circle>
              );
            })}

            {/* Labels */}
            <text x={svgWidth / 2} y={svgHeight - 12} fill="#94a3b8" fontSize="11" textAnchor="middle">
              Weekly Ice Cream Sales ($1,000s)
            </text>
            <text x={18} y={svgHeight / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" transform={`rotate(-90, 18, ${svgHeight / 2})`}>
              Weekly Swimming Distress Calls
            </text>
          </svg>
        </div>
      </div>

      {/* Dataset Table */}
      <DatasetTable title="Weekly Municipal Beach & Concession Records" data={analysis.data} columns={tableColumns} />
    </div>
  );
}

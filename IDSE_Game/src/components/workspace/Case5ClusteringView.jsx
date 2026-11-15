import React, { useState, useMemo, useCallback } from 'react';
import {
  RETAIL_CUSTOMERS,
  CLUSTERING_FEATURES,
  CLUSTER_COLORS,
  executeClustering,
} from '../../data/case5_clustering.js';
import { DatasetTable } from '../DatasetTable.jsx';
import {
  Bookmark,
  Sparkles,
  Users,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Zap,
  ShoppingBag,
  RefreshCw,
  Sliders,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/sound.js';

// Pre-defined friendly tribe names per cluster index
const DEFAULT_TRIBE_NAMES = [
  '💎 VIP High-Rollers',
  '☕ Daily Budget Regulars',
  '🏃 Casual Weekend Shoppers',
  '🎯 Online Deal Hunters',
  '🌟 Rising Power Shoppers',
];

export function Case5ClusteringView({ onCollectClue }) {
  // Game presets for instant smooth play
  const [activePreset, setActivePreset] = useState('balanced'); // 'unfair', 'balanced', 'custom'
  const [featureX, setFeatureX] = useState('annualSpending');
  const [featureY, setFeatureY] = useState('monthlyVisits');
  const [k, setK] = useState(4);
  const [useScaling, setUseScaling] = useState(true);
  const [seed, setSeed] = useState(42);
  const [customNames, setCustomNames] = useState({
    0: '💎 VIP High-Rollers',
    1: '☕ Daily Budget Regulars',
    2: '🏃 Casual Weekend Shoppers',
    3: '🎯 Online Deal Hunters',
    4: '🌟 Rising Power Shoppers',
  });

  // Handle Preset Switching (Smooth 1-click game modes)
  const handleSelectPreset = (mode) => {
    setActivePreset(mode);
    if (mode === 'unfair') {
      sound.playWarning();
      setFeatureX('annualSpending');
      setFeatureY('monthlyVisits');
      setK(3);
      setUseScaling(false);
    } else if (mode === 'balanced') {
      sound.playSuccess();
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
      setFeatureX('annualSpending');
      setFeatureY('monthlyVisits');
      setK(4);
      setUseScaling(true);
    } else {
      sound.playClick();
    }
  };

  // Re-run K-Means with memoization to keep 60fps performance
  const clusteringResult = useMemo(() => {
    return executeClustering(featureX, featureY, k, useScaling, seed);
  }, [featureX, featureY, k, useScaling, seed]);

  const handleShuffle = () => {
    sound.playAnalysis();
    setSeed((s) => s + 1);
  };

  const handleKChange = (newK) => {
    sound.playClick();
    setK(newK);
    setActivePreset('custom');
  };

  const handleTraitPreset = (fx, fy) => {
    sound.playClick();
    setFeatureX(fx);
    setFeatureY(fy);
    setActivePreset('custom');
  };

  const handleToggleScaling = (val) => {
    if (val) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      } catch {}
    } else {
      sound.playWarning();
    }
    setUseScaling(val);
    setActivePreset(val ? 'balanced' : 'unfair');
  };

  const handleCollectClue = () => {
    sound.playClue();
    const modeDesc = useScaling
      ? 'Equal-Ground Scaling: Both Spending ($) and Visits are weighted fairly. Discovered 4 authentic shopper archetypes!'
      : 'Raw Unscaled Danger: Annual Spending ($150-$10,000) completely dominates Monthly Visits (1-30). Shoppers were grouped purely by money!';
    const text = `Customer Tribe Discovery (${k} Tribes, ${useScaling ? 'Fair Scaled' : 'Raw Unscaled'}): ${modeDesc}`;
    onCollectClue(text);
  };

  // SVG coordinate calculations (Memoized)
  const svgWidth = 600;
  const svgHeight = 280;
  const padding = 45;

  const { minX, maxX, minY, maxY } = useMemo(() => {
    const xVals = RETAIL_CUSTOMERS.map((d) => d[featureX]);
    const yVals = RETAIL_CUSTOMERS.map((d) => d[featureY]);
    return {
      minX: Math.min(...xVals),
      maxX: Math.max(...xVals),
      minY: Math.min(...yVals),
      maxY: Math.max(...yVals),
    };
  }, [featureX, featureY]);

  const getSvgX = useCallback(
    (val) => padding + ((val - minX) / (maxX - minX || 1)) * (svgWidth - 2 * padding),
    [minX, maxX, svgWidth, padding]
  );

  const getSvgY = useCallback(
    (val) => svgHeight - padding - ((val - minY) / (maxY - minY || 1)) * (svgHeight - 2 * padding),
    [minY, maxY, svgHeight, padding]
  );

  // Memoized Table Columns for smooth rendering
  const tableColumns = useMemo(
    () => [
      { key: 'id', label: 'Customer ID' },
      { key: 'name', label: 'Customer Name' },
      {
        key: 'cluster',
        label: 'Discovered Tribe',
        format: (v) => {
          const color = CLUSTER_COLORS[v % CLUSTER_COLORS.length];
          const name = customNames[v] || DEFAULT_TRIBE_NAMES[v] || `Tribe ${v + 1}`;
          return (
            <span
              className="badge"
              style={{
                background: `${color}25`,
                color: color,
                border: `1px solid ${color}`,
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              {name}
            </span>
          );
        },
      },
      {
        key: 'annualSpending',
        label: 'Annual Spend ($)',
        format: (v) => `$${v.toLocaleString()}`,
      },
      {
        key: 'monthlyVisits',
        label: 'Store Visits/Mo',
        format: (v) => `${v} visits`,
      },
      {
        key: 'onlineRatio',
        label: 'Online Shopping %',
        format: (v) => `${v}%`,
      },
      {
        key: 'avgCartSize',
        label: 'Avg Basket Size',
        format: (v) => `$${v}`,
      },
    ],
    [customNames]
  );

  // Big number trap ratio calculation
  const spendRange = 10000 - 150; // $9850
  const visitRange = 30 - 1; // 29
  // In unscaled Euclidean distance: (spend_diff)^2 vs (visit_diff)^2
  // ratio is roughly (9850/29)^2 = 115,000x stronger!
  const isUnscaledTrap = !useScaling && featureX === 'annualSpending';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 1. PLAYABLE GAME MODES: 2 BIG INTERACTIVE HERO CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        {/* Trap Card: Raw Unscaled */}
        <div
          onClick={() => handleSelectPreset('unfair')}
          style={{
            background: activePreset === 'unfair' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, #170912 100%)' : '#0e1628',
            border: activePreset === 'unfair' ? '2px solid #ef4444' : '1px solid #1e293b',
            boxShadow: activePreset === 'unfair' ? '0 0 25px rgba(239, 68, 68, 0.35)' : 'none',
            borderRadius: '16px',
            padding: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.8rem' }}>💥</span>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase' }}>
                  The Trap Mode
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  Raw Numbers (The Big Dollar Trap)
                </h3>
              </div>
            </div>
            {activePreset === 'unfair' && (
              <span className="badge badge-rose" style={{ fontWeight: 800 }}>ACTIVE</span>
            )}
          </div>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45, marginBottom: '0.75rem' }}>
            Without scaling, a <strong>$10,000</strong> spending number is <span style={{ color: '#f87171', fontWeight: 800 }}>100,000x bigger</span> than a 15-visit count. The algorithm is completely blinded by money and ignores customer loyalty!
          </p>
          <div style={{ background: '#200b12', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#fca5a5' }}>
            <AlertTriangle size={15} color="#f87171" />
            <span>Result: Horizontal money-only slices. Store visits are ignored!</span>
          </div>
        </div>

        {/* Balanced Card: Fair Scaling */}
        <div
          onClick={() => handleSelectPreset('balanced')}
          style={{
            background: activePreset === 'balanced' ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, #061e2e 100%)' : '#0e1628',
            border: activePreset === 'balanced' ? '2px solid #06b6d4' : '1px solid #1e293b',
            boxShadow: activePreset === 'balanced' ? '0 0 25px rgba(6, 182, 212, 0.35)' : 'none',
            borderRadius: '16px',
            padding: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.8rem' }}>⚖️</span>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                  The Detective's Solution
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  Equal-Ground AI (Standardized)
                </h3>
              </div>
            </div>
            {activePreset === 'balanced' && (
              <span className="badge badge-cyan" style={{ fontWeight: 800 }}>RECOMMENDED</span>
            )}
          </div>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45, marginBottom: '0.75rem' }}>
            Converts dollars and store visits onto the <strong style={{ color: '#38bdf8' }}>same fair scale</strong> (Z-Score). Both spending and customer visit frequency get an equal 50/50 voice!
          </p>
          <div style={{ background: '#082635', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#7dd3fc' }}>
            <CheckCircle2 size={15} color="#38bdf8" />
            <span>Result: 4 authentic shopper tribes emerge naturally!</span>
          </div>
        </div>
      </div>

      {/* 2. THE BIG NUMBER BULLY METER */}
      <div
        className="card"
        style={{
          background: '#0d1527',
          border: isUnscaledTrap ? '1px solid #ef4444' : '1px solid #06b6d4',
          padding: '1rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scale size={18} color={isUnscaledTrap ? '#f87171' : '#38bdf8'} />
            <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#f8fafc' }}>
              Feature Influence Meter (Who Dictates the Clusters?):
            </span>
          </div>
          <span
            className="mono badge"
            style={{
              background: isUnscaledTrap ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              color: isUnscaledTrap ? '#f87171' : '#34d399',
              fontWeight: 800,
            }}
          >
            {isUnscaledTrap ? '⚠️ 99.9% Dollar Domination' : '✅ 50/50 Perfect Fair Balance'}
          </span>
        </div>

        {/* Meter Progress Bar */}
        <div style={{ width: '100%', height: '14px', borderRadius: '999px', background: '#1e293b', display: 'flex', overflow: 'hidden' }}>
          <div
            style={{
              width: isUnscaledTrap ? '99.5%' : '50%',
              background: isUnscaledTrap ? 'linear-gradient(90deg, #ef4444, #f43f5e)' : 'linear-gradient(90deg, #06b6d4, #3b82f6)',
              transition: 'all 0.4s ease',
            }}
            title="Spending Influence"
          />
          <div
            style={{
              width: isUnscaledTrap ? '0.5%' : '50%',
              background: isUnscaledTrap ? '#475569' : 'linear-gradient(90deg, #10b981, #34d399)',
              transition: 'all 0.4s ease',
            }}
            title="Visits Influence"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.4rem' }}>
          <span>
            Annual Spending ($): <strong style={{ color: '#f8fafc' }}>{isUnscaledTrap ? '99.9% weight' : '50% fair weight'}</strong>
          </span>
          <span>
            Store Visits: <strong style={{ color: isUnscaledTrap ? '#f87171' : '#34d399' }}>{isUnscaledTrap ? '0.1% (Silenced!)' : '50% fair weight'}</strong>
          </span>
        </div>
      </div>

      {/* 3. INTERACTIVE LAB CONTROLS */}
      <div className="card" style={{ background: '#0e172a', border: '1px solid #1e3a5f' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sliders size={18} color="#06b6d4" />
              <span>Detective Investigation Controls</span>
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Fine-tune the clustering algorithm or test different customer traits
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleShuffle} className="btn btn-secondary btn-sm" title="Re-initialize K-Means starting points">
              <RefreshCw size={14} />
              <span>🎲 Shuffle Seed</span>
            </button>
            <button onClick={handleCollectClue} className="btn btn-accent btn-sm">
              <Bookmark size={14} />
              <span>Save Detective Clue</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {/* Quick Trait Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.45rem' }}>
              Customer Traits to Compare:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => handleTraitPreset('annualSpending', 'monthlyVisits')}
                className={`btn btn-sm ${featureX === 'annualSpending' && featureY === 'monthlyVisits' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ justifyContent: 'flex-start', fontSize: '0.75rem' }}
              >
                <span>💳 Spend ($) vs Visits / Mo</span>
              </button>
              <button
                type="button"
                onClick={() => handleTraitPreset('onlineRatio', 'avgCartSize')}
                className={`btn btn-sm ${featureX === 'onlineRatio' && featureY === 'avgCartSize' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ justifyContent: 'flex-start', fontSize: '0.75rem' }}
              >
                <span>🛒 Online % vs Basket Size ($)</span>
              </button>
            </div>
          </div>

          {/* Tribe Count K Selector Buttons */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.775rem', fontWeight: 800, color: '#38bdf8' }}>
                How Many Tribes? (K):
              </label>
              <span className="mono badge badge-cyan">{k} Tribes</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
              {[2, 3, 4, 5].map((kOption) => (
                <button
                  key={kOption}
                  onClick={() => handleKChange(kOption)}
                  className={`btn btn-sm ${k === kOption ? 'btn-primary glow-cyan' : 'btn-secondary'}`}
                  style={{ fontWeight: 800, fontSize: '0.85rem' }}
                >
                  {kOption}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.35rem' }}>
              Tip: K=4 reveals the 4 authentic shopper archetypes!
            </div>
          </div>

          {/* Fair Scale Toggle */}
          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.45rem' }}>
              ⚡ Feature Scaling Toggle:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleToggleScaling(true)}
                className={`btn btn-sm ${useScaling ? 'btn-primary glow-cyan' : 'btn-secondary'}`}
                style={{ flex: 1, fontSize: '0.75rem', fontWeight: 700 }}
              >
                ⚖️ Equal Ground
              </button>
              <button
                type="button"
                onClick={() => handleToggleScaling(false)}
                className={`btn btn-sm ${!useScaling ? 'btn-accent' : 'btn-secondary'}`}
                style={{ flex: 1, fontSize: '0.75rem', fontWeight: 700 }}
              >
                💥 Unscaled Trap
              </button>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '0.35rem' }}>
              {useScaling ? '✅ Fair Z-score normalization active' : '⚠️ Dollars overpower visits!'}
            </div>
          </div>
        </div>
      </div>

      {/* 4. DISCOVERED SHOPPER TRIBES CARDS */}
      <div>
        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Users size={18} color="#06b6d4" />
          <span>Discovered Shopper Tribes ({clusteringResult.clusterSummaries.length} Segments Identified):</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
          {clusteringResult.clusterSummaries.map((summary) => {
            const tribeName = customNames[summary.clusterId] || DEFAULT_TRIBE_NAMES[summary.clusterId] || `Tribe ${summary.clusterId + 1}`;
            return (
              <div
                key={summary.clusterId}
                className="card"
                style={{
                  background: '#0d1527',
                  borderLeft: `5px solid ${summary.color}`,
                  padding: '1rem',
                  boxShadow: `0 0 15px ${summary.color}15`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: summary.color }}>
                    {tribeName}
                  </span>
                  <span className="mono badge" style={{ background: `${summary.color}22`, color: summary.color, fontWeight: 700, fontSize: '0.75rem' }}>
                    {summary.pct}% ({summary.count} shoppers)
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Avg {CLUSTERING_FEATURES[featureX]?.shortLabel}:</span>
                    <strong style={{ color: '#f8fafc' }}>
                      {summary.avgX} {CLUSTERING_FEATURES[featureX]?.unit}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Avg {CLUSTERING_FEATURES[featureY]?.shortLabel}:</span>
                    <strong style={{ color: '#f8fafc' }}>
                      {summary.avgY} {CLUSTERING_FEATURES[featureY]?.unit}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. INTERACTIVE 60FPS SCATTER PLOT */}
      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="#06b6d4" />
              <span>Customer Tribe Scatter Map: {CLUSTERING_FEATURES[featureX]?.label} vs {CLUSTERING_FEATURES[featureY]?.label}</span>
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Each colored dot is an actual shopper. Star (★) marks the tribe centroid center!
            </div>
          </div>
          <span className="mono badge badge-amber">Grouping Tightness (Inertia): {clusteringResult.inertia}</span>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', background: '#09101d', borderRadius: '8px' }}>
            {/* Grid */}
            <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#1f2d47" strokeWidth="1" />
            <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#1f2d47" strokeWidth="1" />

            {/* Customer Points Colored by Cluster */}
            {clusteringResult.clusteredData.map((d, i) => {
              const cx = getSvgX(d[featureX]);
              const cy = getSvgY(d[featureY]);
              const color = CLUSTER_COLORS[d.cluster % CLUSTER_COLORS.length];

              return (
                <circle
                  key={d.id || i}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth="1"
                  opacity="0.88"
                >
                  <title>Shopper {d.name} ({d.id}): {CLUSTERING_FEATURES[featureX]?.shortLabel} = {d[featureX]}, {CLUSTERING_FEATURES[featureY]?.shortLabel} = {d[featureY]}</title>
                </circle>
              );
            })}

            {/* Centroids */}
            {clusteringResult.centroids.map((cent, idx) => {
              const cx = getSvgX(cent[featureX]);
              const cy = getSvgY(cent[featureY]);
              const color = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];

              return (
                <g key={`cent-${idx}`}>
                  <circle cx={cx} cy={cy} r="11" fill={color} stroke="#ffffff" strokeWidth="2.5" opacity="0.95" />
                  <text x={cx} y={cy + 4} fill="#000000" fontSize="11" fontWeight="900" textAnchor="middle">
                    ★
                  </text>
                </g>
              );
            })}

            {/* Labels */}
            <text x={svgWidth / 2} y={svgHeight - 12} fill="#94a3b8" fontSize="11" textAnchor="middle">
              {CLUSTERING_FEATURES[featureX]?.label} ➔
            </text>
            <text x={18} y={svgHeight / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" transform={`rotate(-90, 18, ${svgHeight / 2})`}>
              {CLUSTERING_FEATURES[featureY]?.label} ➔
            </text>
          </svg>
        </div>
      </div>

      {/* 6. DATASET TABLE */}
      <DatasetTable data={clusteringResult.clusteredData} columns={tableColumns} title="Customer Registry & Discovered Tribes" />
    </div>
  );
}

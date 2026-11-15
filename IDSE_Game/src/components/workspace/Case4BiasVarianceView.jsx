import React, { useState, useMemo } from 'react';
import {
  ARCHITECTURES,
  APPLICANT_COHORTS,
  runMultiCohortExperiment,
  groundTruthRisk,
} from '../../data/case4_bias_variance.js';
import { DatasetTable } from '../DatasetTable.jsx';
import { Sliders, Bookmark, Scale, AlertTriangle, CheckCircle, BarChart2, UserCheck, Shuffle, HelpCircle } from 'lucide-react';
import { sound } from '../../utils/sound.js';

export function Case4BiasVarianceView({ onCollectClue }) {
  const [selectedArch, setSelectedArch] = useState('rigid_linear');
  const [testCreditScore, setTestCreditScore] = useState(65);
  const [hasSimulatedAudition, setHasSimulatedAudition] = useState(false);

  const currentArchObj = ARCHITECTURES.find((a) => a.id === selectedArch) || ARCHITECTURES[0];

  const experiment = useMemo(() => {
    return runMultiCohortExperiment(currentArchObj.degree);
  }, [currentArchObj.degree]);

  const handleSelectArch = (archId) => {
    sound.playAnalysis();
    setSelectedArch(archId);
  };

  // Evaluate predictions at test applicant score across all 8 models
  const predictionsAtX = experiment.models.map((m) => Math.max(0, Math.min(100, m.predict(testCreditScore))));
  const minPred = Math.min(...predictionsAtX);
  const maxPred = Math.max(...predictionsAtX);
  const spread = Number((maxPred - minPred).toFixed(1));
  const trueRiskAtX = Number(groundTruthRisk(testCreditScore).toFixed(1));

  const handleAudition = () => {
    sound.playAnalysis();
    setHasSimulatedAudition(true);
  };

  const handleCollectClue = () => {
    sound.playClue();
    const text = `Loan Decision Audit (${currentArchObj.name}): For the exact same customer with credit score ${testCreditScore}, predictions swung between ${minPred.toFixed(0)} and ${maxPred.toFixed(0)} (Spread: ${spread} points). Total expected errors: ${experiment.totalError}.`;
    onCollectClue(text);
  };

  // SVG dimensions
  const svgWidth = 550;
  const svgHeight = 280;
  const padding = 45;

  const minX = 0;
  const maxX = 100;
  const minY = 0;
  const maxY = 100;

  const getSvgX = (x) => padding + (x / maxX) * (svgWidth - 2 * padding);
  const getSvgY = (y) => svgHeight - padding - (y / maxY) * (svgHeight - 2 * padding);

  // Ground truth path
  const groundTruthPath = [];
  for (let x = 0; x <= 100; x += 4) {
    const y = groundTruthRisk(x);
    groundTruthPath.push(`${x === 0 ? 'M' : 'L'} ${getSvgX(x).toFixed(1)} ${getSvgY(y).toFixed(1)}`);
  }

  const tableColumns = [
    { key: 'id', label: 'Applicant ID' },
    { key: 'x', label: 'Credit Health Score (0-100)' },
    { key: 'y', label: 'Observed Risk Rate' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 3 AI Judge Personalities */}
      <div className="card" style={{ background: '#0e172a', border: '1px solid #1e3a5f' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚖️</span> Choose Apex Bank's Loan Algorithm:
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              How does this algorithm handle applicants across 8 different months?
            </p>
          </div>
          <button onClick={handleCollectClue} className="btn btn-accent btn-sm">
            <Bookmark size={14} />
            <span>Save Detective Clue</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {ARCHITECTURES.map((arch) => {
            const isSelected = selectedArch === arch.id;
            return (
              <div
                key={arch.id}
                onClick={() => handleSelectArch(arch.id)}
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
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? '#38bdf8' : '#e2e8f0', marginBottom: '0.35rem' }}>
                  {arch.name}
                </div>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  {arch.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Applicant Fair Trial Arena */}
      <div
        style={{
          background: 'linear-gradient(135deg, #13243d 0%, #0c1524 100%)',
          border: '2px solid #38bdf8',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
              🎮 APPLICANT AUDIT SIMULATOR
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc', margin: '0.2rem 0' }}>
              Send the Same Customer to 8 Different Loan Officers!
            </h4>
          </div>
          <span className="mono badge badge-amber" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
            Customer Credit Score: {testCreditScore} / 100
          </span>
        </div>

        <input
          type="range"
          min={15}
          max={85}
          value={testCreditScore}
          onChange={(e) => {
            setTestCreditScore(Number(e.target.value));
            setHasSimulatedAudition(true);
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: '#94a3b8', marginTop: '0.25rem' }}>
          <span>15 (Poor Credit)</span>
          <span>50 (Average Credit)</span>
          <span>85 (Excellent Credit)</span>
        </div>

        {/* Audit Results Bar */}
        <div style={{ marginTop: '1rem', background: '#0a101d', padding: '1rem', borderRadius: '12px', border: '1px solid #1e2e4a' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>TRUE FAIR RISK:</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{trueRiskAtX} pts</div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>PREDICTIONS GIVEN:</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24' }}>
                [{minPred.toFixed(0)} to {maxPred.toFixed(0)} pts]
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>DECISION UNFAIRNESS SPREAD:</div>
              <div
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: spread > 30 ? '#f43f5e' : spread < 14 ? '#34d399' : '#fbbf24',
                }}
              >
                {spread} pts spread {spread > 30 ? '💥 Wildly Unfair!' : '✅ Fair & Stable!'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#cbd5e1', borderTop: '1px solid #1c2b42', paddingTop: '0.5rem', lineHeight: 1.45 }}>
            {selectedArch === 'flexible_extreme' ? (
              <span style={{ color: '#fb7185' }}>
                ⚠️ <strong>Scandal!</strong> Depending on which month they applied, the exact same person was scored as high as <strong>{maxPred.toFixed(0)} risk</strong> (rejected) or as low as <strong>{minPred.toFixed(0)} risk</strong> (approved)! High Variance causes totally unpredictable roulette decisions!
              </span>
            ) : selectedArch === 'rigid_linear' ? (
              <span style={{ color: '#fbbf24' }}>
                ⚠️ <strong>Stubborn Error:</strong> All 8 months give nearly identical scores, but all of them are wrong because the model drew a straight line and ignored the natural curve (High Bias)!
              </span>
            ) : (
              <span style={{ color: '#34d399' }}>
                🏆 <strong>Fair Balance!</strong> Predictions stay tightly clustered around the true score ({trueRiskAtX} pts). Decisions are both accurate and consistent across all months!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Visual Spaghetti Graph with Live Yellow Scan Line */}
      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BarChart2 size={16} color="#06b6d4" />
              8 Months of AI Decisions (The Spaghetti Plot):
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Dashed green line is true reality. Watch if the lines stay together or explode in all directions!
            </div>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', background: '#09101d', borderRadius: '8px' }}>
            {/* Grid Lines */}
            <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#1f2d47" strokeWidth="1" />
            <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#1f2d47" strokeWidth="1" />

            {/* Ground Truth True Curve (Dashed Green) */}
            <path d={groundTruthPath.join(' ')} fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="6 6" />

            {/* 8 Resampled Cohort Curves */}
            {experiment.cohortCurves.map((curve, idx) => {
              const pathD = curve
                .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getSvgX(pt.x).toFixed(1)} ${getSvgY(pt.y).toFixed(1)}`)
                .join(' ');
              return (
                <path
                  key={idx}
                  d={pathD}
                  fill="none"
                  stroke={currentArchObj.degree === 8 ? '#f43f5e' : currentArchObj.degree === 3 ? '#10b981' : '#38bdf8'}
                  strokeWidth="2"
                  opacity={currentArchObj.degree === 8 ? '0.6' : '0.45'}
                />
              );
            })}

            {/* Test Credit Score Vertical Marker Line */}
            <line
              x1={getSvgX(testCreditScore)}
              y1={padding}
              x2={getSvgX(testCreditScore)}
              y2={svgHeight - padding}
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* Prediction Dots at Test Credit Score */}
            {predictionsAtX.map((pred, i) => (
              <circle
                key={`p-${i}`}
                cx={getSvgX(testCreditScore)}
                cy={getSvgY(pred)}
                r="4.5"
                fill="#fbbf24"
                stroke="#09101d"
                strokeWidth="1.5"
              />
            ))}

            {/* Axis Labels */}
            <text x={svgWidth / 2} y={svgHeight - 12} fill="#94a3b8" fontSize="11" textAnchor="middle">
              Applicant Credit Health Score (0 - 100)
            </text>
            <text x={18} y={svgHeight / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" transform={`rotate(-90, 18, ${svgHeight / 2})`}>
              Predicted Default Risk (0 - 100)
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', marginTop: '0.65rem', fontSize: '0.725rem', color: '#94a3b8', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '16px', height: '3px', background: '#10b981', display: 'inline-block' }} /> True Reality (Dashed Green)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '16px', height: '2px', background: '#38bdf8', display: 'inline-block' }} /> 8 Monthly Decisions
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }} /> Decisions for Selected Customer
          </span>
        </div>
      </div>

      {/* Dataset Sample Table */}
      <DatasetTable
        data={experiment.sampleCohort}
        columns={tableColumns}
        title="Sample Applicant Records (Month 1 Cohort)"
      />
    </div>
  );
}

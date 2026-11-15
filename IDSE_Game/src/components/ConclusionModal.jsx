import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, ArrowRight, Award, Compass, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound.js';

export function ConclusionModal({
  isOpen,
  onClose,
  caseData,
  onCaseSolved,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmittedDecision, setHasSubmittedDecision] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1); // 1 = Conclusion Verdict, 2 = Concept Transfer Challenge
  const [transferAnswerIndex, setTransferAnswerIndex] = useState(null);
  const [hasSubmittedTransfer, setHasSubmittedTransfer] = useState(false);

  if (!isOpen || !caseData) return null;

  const conclusionQ = caseData.conclusionQuestions;
  const transferQ = conclusionQ.transferChallenge;

  const handleSelectOption = (optId) => {
    if (hasSubmittedDecision) return;
    sound.playClick();
    setSelectedOption(optId);
  };

  const handleSubmitDecision = () => {
    if (!selectedOption) return;
    const chosen = conclusionQ.options.find((o) => o.id === selectedOption);
    setHasSubmittedDecision(true);

    if (chosen?.isCorrect) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // fallback
      }
    } else {
      sound.playWarning();
    }
  };

  const handleSelectTransfer = (idx) => {
    if (hasSubmittedTransfer) return;
    sound.playClick();
    setTransferAnswerIndex(idx);
  };

  const handleSubmitTransfer = () => {
    if (transferAnswerIndex === null) return;
    setHasSubmittedTransfer(true);
    const isTransferCorrect = transferAnswerIndex === transferQ.correctIndex;

    if (isTransferCorrect) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // fallback
      }
    } else {
      sound.playWarning();
    }
  };

  const handleFinishCase = () => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.4 },
      });
    } catch {}

    const chosen = conclusionQ.options.find((o) => o.id === selectedOption);
    const isDecisionCorrect = chosen?.isCorrect;
    const isTransferCorrect = transferAnswerIndex === transferQ.correctIndex;

    let points = 50; // base exploration points
    if (isDecisionCorrect) points += 35;
    if (isTransferCorrect) points += 15;

    onCaseSolved({
      caseId: caseData.id,
      score: points,
      badge: isDecisionCorrect ? caseData.badge : null,
      isPerfect: isDecisionCorrect && isTransferCorrect,
    });
  };

  const chosenOptionObj = conclusionQ.options.find((o) => o.id === selectedOption);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', padding: '1.75rem' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Award size={22} color="#fbbf24" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
              Official Case Verdict & Reflection — Case {caseData.id}
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn btn-ghost btn-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Phase 1: Case Conclusion Question */}
        {currentPhase === 1 ? (
          <div>
            <div style={{ background: '#131e33', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem', borderLeft: '4px solid #06b6d4' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Primary Investigation Question
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.5 }}>
                {conclusionQ.question}
              </p>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {conclusionQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                let borderColor = '#1e2b42';
                let bg = '#0f172a';

                if (hasSubmittedDecision) {
                  if (opt.isCorrect) {
                    borderColor = '#10b981';
                    bg = 'rgba(16, 185, 129, 0.1)';
                  } else if (isSelected && !opt.isCorrect) {
                    borderColor = '#ef4444';
                    bg = 'rgba(239, 68, 68, 0.1)';
                  }
                } else if (isSelected) {
                  borderColor = '#06b6d4';
                  bg = 'rgba(6, 182, 212, 0.1)';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    style={{
                      background: bg,
                      border: `1.5px solid ${borderColor}`,
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      cursor: hasSubmittedDecision ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? '#06b6d4' : '#475569'}`,
                        background: isSelected ? '#06b6d4' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }} />}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                      {opt.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Consequence / Feedback Area */}
            {hasSubmittedDecision && (
              <div
                style={{
                  background: chosenOptionObj?.isCorrect ? '#0f2421' : '#271216',
                  border: `1px solid ${chosenOptionObj?.isCorrect ? '#10b981' : '#ef4444'}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1.25rem',
                  animation: 'modalEnter 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  {chosenOptionObj?.isCorrect ? (
                    <CheckCircle size={20} color="#10b981" />
                  ) : (
                    <AlertTriangle size={20} color="#ef4444" />
                  )}
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: chosenOptionObj?.isCorrect ? '#34d399' : '#f87171' }}>
                    {chosenOptionObj?.isCorrect ? 'Accurate Deduction!' : 'Evidence Inconsistency'}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {chosenOptionObj?.feedback}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {!hasSubmittedDecision ? (
                <button
                  onClick={handleSubmitDecision}
                  disabled={!selectedOption}
                  className="btn btn-primary"
                  style={{ opacity: selectedOption ? 1 : 0.5 }}
                >
                  <span>Submit Final Verdict</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sound.playClick();
                    setCurrentPhase(2);
                  }}
                  className="btn btn-accent glow-amber"
                  style={{ fontWeight: 700 }}
                >
                  <span>Proceed to Concept Transfer Challenge</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Phase 2: Transfer Challenge */
          <div>
            <div style={{ background: '#111e33', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Compass size={14} /> Concept Transfer Challenge
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                "{transferQ.scenario}"
              </p>
              <p style={{ fontSize: '0.925rem', fontWeight: 700, color: '#f8fafc' }}>
                {transferQ.question}
              </p>
            </div>

            {/* Transfer Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
              {transferQ.options.map((optText, idx) => {
                const isSelected = transferAnswerIndex === idx;
                let borderColor = '#1e2b42';
                let bg = '#0f172a';

                if (hasSubmittedTransfer) {
                  if (idx === transferQ.correctIndex) {
                    borderColor = '#10b981';
                    bg = 'rgba(16, 185, 129, 0.15)';
                  } else if (isSelected && idx !== transferQ.correctIndex) {
                    borderColor = '#ef4444';
                    bg = 'rgba(239, 68, 68, 0.15)';
                  }
                } else if (isSelected) {
                  borderColor = '#f59e0b';
                  bg = 'rgba(245, 158, 11, 0.1)';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectTransfer(idx)}
                    style={{
                      background: bg,
                      border: `1.5px solid ${borderColor}`,
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      cursor: hasSubmittedTransfer ? 'default' : 'pointer',
                      fontSize: '0.85rem',
                      color: '#e2e8f0',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {optText}
                  </div>
                );
              })}
            </div>

            {hasSubmittedTransfer && (
              <div style={{ background: '#0d192c', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #1c2b42', fontSize: '0.825rem', color: '#94a3b8' }}>
                <strong style={{ color: '#38bdf8' }}>Explanation: </strong>
                {transferQ.explanation}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {!hasSubmittedTransfer ? (
                <button
                  onClick={handleSubmitTransfer}
                  disabled={transferAnswerIndex === null}
                  className="btn btn-accent"
                  style={{ opacity: transferAnswerIndex !== null ? 1 : 0.5 }}
                >
                  <span>Verify Concept Answer</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleFinishCase}
                  className="btn btn-success"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                >
                  <Sparkles size={16} />
                  <span>Complete Investigation & View Debrief</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

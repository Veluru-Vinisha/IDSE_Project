import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Database } from 'lucide-react';
import { sound } from '../utils/sound.js';

export function DatasetTable({
  data = [],
  columns = [],
  highlightKey = null,
  highlightValue = null,
  title = 'Raw Dataset Records',
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter based on search term
  const filtered = data.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageIndex = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

  return (
    <div className="card" style={{ padding: '1rem', background: '#0c1526' }}>
      {/* Table Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={16} color="#06b6d4" />
          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f1f5f9' }}>{title}</span>
          <span className="mono badge badge-cyan" style={{ fontSize: '0.7rem' }}>
            {filtered.length} records
          </span>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '200px' }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="text-input"
            style={{ paddingLeft: '2rem', paddingRight: '0.5rem', paddingTop: '0.35rem', paddingBottom: '0.35rem', fontSize: '0.775rem' }}
          />
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="detective-table-wrapper">
        <table className="detective-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((row, idx) => {
                const isHighlighted = highlightKey && row[highlightKey] === highlightValue;
                return (
                  <tr key={row.id || idx} className={isHighlighted ? 'in-sample' : ''}>
                    {columns.map((col) => {
                      let cellVal = row[col.key];
                      if (col.format) {
                        cellVal = col.format(cellVal, row);
                      }
                      return <td key={col.key}>{cellVal}</td>;
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', color: '#64748b', padding: '1.5rem' }}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>
        <span>
          Page {pageIndex} of {totalPages}
        </span>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => {
              if (pageIndex > 1) {
                sound.playClick();
                setCurrentPage(pageIndex - 1);
              }
            }}
            disabled={pageIndex <= 1}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.25rem 0.5rem', opacity: pageIndex <= 1 ? 0.4 : 1 }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => {
              if (pageIndex < totalPages) {
                sound.playClick();
                setCurrentPage(pageIndex + 1);
              }
            }}
            disabled={pageIndex >= totalPages}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.25rem 0.5rem', opacity: pageIndex >= totalPages ? 0.4 : 1 }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

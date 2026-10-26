import React, { useState } from 'react';
import { Heart, Plus, Trash2, Edit2, Check, X, Sparkles, Shuffle } from 'lucide-react';

export default function ReasonsILoveYou({
  reasons = [],
  onUpdateReasons,
  isEditMode = false
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ quote: '', detail: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newForm, setNewForm] = useState({ quote: '', detail: '' });
  const [activeCardId, setActiveCardId] = useState(null);

  // Handle Edit
  const handleStartEdit = (r) => {
    setEditingId(r.id);
    setEditForm({ quote: r.quote, detail: r.detail || '' });
  };

  const handleSaveEdit = (id) => {
    const updated = reasons.map((r) => {
      if (r.id === id) {
        return { ...r, ...editForm };
      }
      return r;
    });
    onUpdateReasons(updated);
    setEditingId(null);
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm('Do you want to delete this reason?')) {
      const updated = reasons.filter((r) => r.id !== id);
      onUpdateReasons(updated);
    }
  };

  // Handle Add
  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newForm.quote.trim()) return;

    const newReason = {
      id: 'reason_' + Date.now(),
      number: String(reasons.length + 1).padStart(2, '0'),
      quote: newForm.quote,
      detail: newForm.detail || 'One of the countless reasons my heart chose you.'
    };

    onUpdateReasons([...reasons, newReason]);
    setNewForm({ quote: '', detail: '' });
    setIsAddingNew(false);
  };

  const toggleExpand = (id) => {
    setActiveCardId(prev => (prev === id ? null : id));
  };

  return (
    <section className="section reasons-section" id="reasons">
      {/* Background Ambience */}
      <div className="ambient-glow-copper" style={{ top: '10%', left: '10%' }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Heart size={13} fill="#c88151" />
            <span>Why You Mean The World</span>
          </div>

          <h2 className="section-title copper-gradient-text">
            Reasons I Love You
          </h2>

          <p className="section-subtitle text-romance">
            Just a few of the million little reasons why loving you is the easiest thing I have ever done.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="reasons-grid">
          {reasons.map((item, index) => {
            const isEditing = editingId === item.id;
            const isExpanded = activeCardId === item.id;

            return (
              <div
                key={item.id}
                className={`reason-card copper-card ${isExpanded ? 'expanded' : ''}`}
                style={{ animationDelay: `${index * 0.12}s` }}
                onClick={() => !isEditing && toggleExpand(item.id)}
              >
                {/* Number & Heart Icon */}
                <div className="reason-header">
                  <span className="reason-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="reason-heart-wrap">
                    <Heart size={16} fill="rgba(216, 150, 105, 0.4)" color="#c88151" />
                  </div>
                </div>

                {isEditing ? (
                  <div className="edit-reason-wrap" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={editForm.quote}
                      onChange={(e) => setEditForm({ ...editForm, quote: e.target.value })}
                      placeholder="Reason headline..."
                      className="reason-input"
                    />
                    <textarea
                      value={editForm.detail}
                      onChange={(e) => setEditForm({ ...editForm, detail: e.target.value })}
                      placeholder="Why this means so much to you..."
                      rows={2}
                      className="reason-textarea"
                    />
                    <div className="reason-edit-actions">
                      <button
                        type="button"
                        className="btn-action save"
                        onClick={() => handleSaveEdit(item.id)}
                      >
                        <Check size={13} /> Save
                      </button>
                      <button
                        type="button"
                        className="btn-action cancel"
                        onClick={() => setEditingId(null)}
                      >
                        <X size={13} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="reason-quote text-romance">
                      “{item.quote}”
                    </h3>

                    {item.detail && (
                      <p className="reason-detail">
                        {item.detail}
                      </p>
                    )}

                    {/* Card controls */}
                    {isEditMode && (
                      <div className="reason-controls" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(item)}
                          className="control-btn"
                          title="Edit reason"
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="control-btn delete"
                          title="Delete reason"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Reason Form */}
        {isEditMode && (
          <div className="add-reason-wrap">
            {!isAddingNew ? (
              <button
                type="button"
                className="btn-copper-outline"
                onClick={() => setIsAddingNew(true)}
              >
                <Plus size={16} /> Add Another Reason
              </button>
            ) : (
              <form onSubmit={handleAddNew} className="new-reason-form copper-card">
                <h4 className="new-form-title copper-gradient-text">Add a Reason</h4>
                <input
                  type="text"
                  value={newForm.quote}
                  onChange={(e) => setNewForm({ ...newForm, quote: e.target.value })}
                  placeholder="e.g. The way you check up on me after a long shift..."
                  required
                  className="reason-input"
                />
                <textarea
                  value={newForm.detail}
                  onChange={(e) => setNewForm({ ...newForm, detail: e.target.value })}
                  placeholder="Add a sweet personal note (optional)..."
                  rows={2}
                  className="reason-textarea"
                />
                <div className="reason-edit-actions">
                  <button type="submit" className="btn-copper-primary">
                    <Plus size={16} /> Add Reason
                  </button>
                  <button
                    type="button"
                    className="btn-copper-outline"
                    onClick={() => setIsAddingNew(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <style>{`
        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 36px;
        }

        .reason-card {
          padding: 30px 28px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          background: rgba(18, 17, 24, 0.85);
          position: relative;
          transition: var(--transition-smooth);
        }

        .reason-card:hover {
          transform: translateY(-4px);
          border-color: rgba(216, 150, 105, 0.45);
        }

        .reason-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .reason-number {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          color: var(--copper-400);
          letter-spacing: 0.14em;
          font-weight: 700;
        }

        .reason-heart-wrap {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(216, 150, 105, 0.1);
          border: 1px solid rgba(216, 150, 105, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reason-quote {
          font-size: 1.45rem;
          font-weight: 600;
          color: var(--cream-100);
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .reason-detail {
          font-size: 0.95rem;
          color: var(--cream-400);
          line-height: 1.6;
        }

        .reason-controls {
          display: flex;
          gap: 8px;
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(216, 150, 105, 0.12);
        }

        .edit-reason-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .reason-input, .reason-textarea {
          width: 100%;
          background: rgba(10, 9, 14, 0.9);
          border: 1px solid rgba(216, 150, 105, 0.3);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          color: var(--cream-100);
          font-family: inherit;
          font-size: 0.95rem;
        }

        .reason-input:focus, .reason-textarea:focus {
          outline: none;
          border-color: var(--copper-400);
        }

        .reason-edit-actions {
          display: flex;
          gap: 8px;
        }

        .add-reason-wrap {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .new-reason-form {
          width: 100%;
          max-width: 580px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .new-form-title {
          font-size: 1.2rem;
          margin-bottom: 4px;
        }
      `}</style>
    </section>
  );
}

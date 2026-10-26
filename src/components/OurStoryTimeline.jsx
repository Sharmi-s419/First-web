import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircleHeart, 
  HeartHandshake, 
  Crown, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X,
  Calendar,
  Heart
} from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  MessageCircleHeart: MessageCircleHeart,
  HeartHandshake: HeartHandshake,
  Crown: Crown
};

export default function OurStoryTimeline({
  data,
  onUpdateMilestones,
  isEditMode = false
}) {
  const [editingMilestoneId, setEditingMilestoneId] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', title: '', description: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newForm, setNewForm] = useState({ date: '', title: '', description: '' });

  const milestones = data.milestones || [];

  const handleStartEdit = (m) => {
    setEditingMilestoneId(m.id);
    setEditForm({ date: m.date, title: m.title, description: m.description });
  };

  const handleSaveEdit = (id) => {
    const updated = milestones.map(m => {
      if (m.id === id) {
        return { ...m, ...editForm };
      }
      return m;
    });
    onUpdateMilestones(updated);
    setEditingMilestoneId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this milestone?')) {
      const updated = milestones.filter(m => m.id !== id);
      onUpdateMilestones(updated);
    }
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newForm.title.trim()) return;

    const newMilestone = {
      id: 'm_' + Date.now(),
      date: newForm.date || 'Special Memory',
      title: newForm.title,
      description: newForm.description,
      icon: 'Sparkles'
    };

    onUpdateMilestones([...milestones, newMilestone]);
    setNewForm({ date: '', title: '', description: '' });
    setIsAddingNew(false);
  };

  return (
    <section className="section story-section" id="story">
      {/* Background Ambience */}
      <div className="ambient-glow-copper" style={{ top: '20%', right: '10%' }} />
      <div className="ambient-glow-wine" style={{ bottom: '20%', left: '5%' }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Heart size={13} fill="#c88151" />
            <span>Our Journey</span>
          </div>

          <h2 className="section-title copper-gradient-text">
            {data.story?.sectionTitle || "Our Little Beginning"}
          </h2>

          <p className="section-subtitle text-romance">
            {data.myName || 'KD'} &amp; {data.partnerName || 'ROWDY'} • Started on 4/10/26 • First Month on 4/11/26
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container">
          <div className="timeline-line" />

          {milestones.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Sparkles;
            const isEditing = editingMilestoneId === item.id;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`timeline-item ${isEven ? 'left' : 'right'}`}
              >
                {/* Node icon */}
                <div className="timeline-node">
                  <div className="node-glow" />
                  <div className="node-icon-inner">
                    <IconComponent size={18} />
                  </div>
                </div>

                {/* Content Card */}
                <div className="timeline-card copper-card">
                  {isEditing ? (
                    <div className="edit-milestone-form">
                      <input
                        type="text"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        placeholder="Date (e.g. October 4, 2026)"
                        className="milestone-input"
                      />
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        placeholder="Milestone Title"
                        className="milestone-input title-input"
                      />
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Describe this special moment..."
                        rows={3}
                        className="milestone-textarea"
                      />
                      <div className="edit-actions">
                        <button
                          type="button"
                          className="btn-action save"
                          onClick={() => handleSaveEdit(item.id)}
                        >
                          <Check size={14} /> Save
                        </button>
                        <button
                          type="button"
                          className="btn-action cancel"
                          onClick={() => setEditingMilestoneId(null)}
                        >
                          <X size={14} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="card-top">
                        <span className="milestone-date">
                          <Calendar size={13} />
                          {item.date}
                        </span>

                        {isEditMode && (
                          <div className="card-controls">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(item)}
                              className="btn-control"
                              title="Edit milestone"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="btn-control delete"
                              title="Delete milestone"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      <h3 className="milestone-title">{item.title}</h3>
                      <p className="milestone-desc text-romance">{item.description}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Milestone Feature */}
        {isEditMode && (
          <div className="add-milestone-wrapper">
            {!isAddingNew ? (
              <button
                type="button"
                className="btn-copper-outline add-milestone-btn"
                onClick={() => setIsAddingNew(true)}
              >
                <Plus size={16} /> Add New Milestone
              </button>
            ) : (
              <form onSubmit={handleAddNew} className="new-milestone-form copper-card">
                <h4 className="form-title copper-gradient-text">Add a Special Memory</h4>
                <div className="form-row">
                  <input
                    type="text"
                    value={newForm.date}
                    onChange={(e) => setNewForm({ ...newForm, date: e.target.value })}
                    placeholder="Date or Period (e.g. October 15, 2026)"
                    className="milestone-input"
                  />
                  <input
                    type="text"
                    value={newForm.title}
                    onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                    placeholder="Milestone Title *"
                    required
                    className="milestone-input"
                  />
                </div>
                <textarea
                  value={newForm.description}
                  onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                  placeholder="What made this moment unforgettable?"
                  rows={3}
                  className="milestone-textarea"
                />
                <div className="edit-actions">
                  <button type="submit" className="btn-copper-primary">
                    <Plus size={16} /> Save Milestone
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
        .story-section {
          position: relative;
        }

        .timeline-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .timeline-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(216, 150, 105, 0.4) 15%,
            rgba(216, 150, 105, 0.6) 50%,
            rgba(216, 150, 105, 0.4) 85%,
            transparent 100%
          );
          transform: translateX(-50%);
          z-index: 1;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 50px;
          width: 50%;
          display: flex;
          z-index: 2;
        }

        .timeline-item.left {
          left: 0;
          padding-right: 48px;
          justify-content: flex-end;
        }

        .timeline-item.right {
          left: 50%;
          padding-left: 48px;
          justify-content: flex-start;
        }

        .timeline-node {
          position: absolute;
          top: 24px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }

        .timeline-item.left .timeline-node {
          right: -19px;
        }

        .timeline-item.right .timeline-node {
          left: -19px;
        }

        .node-icon-inner {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #14131b;
          border: 1.5px solid var(--copper-400);
          color: var(--copper-300);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(200, 129, 81, 0.4);
          position: relative;
          z-index: 2;
        }

        .node-glow {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(216, 150, 105, 0.2);
          filter: blur(6px);
        }

        .timeline-card {
          width: 100%;
          max-width: 380px;
          padding: 26px 28px;
          background: rgba(18, 17, 24, 0.85);
          position: relative;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .milestone-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--copper-300);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .milestone-title {
          font-size: 1.22rem;
          font-weight: 600;
          color: var(--cream-100);
          margin-bottom: 10px;
          line-height: 1.35;
        }

        .milestone-desc {
          font-size: 1.05rem;
          color: var(--cream-300);
          line-height: 1.6;
        }

        .card-controls {
          display: flex;
          gap: 6px;
        }

        .btn-control {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(216, 150, 105, 0.2);
          color: var(--cream-300);
          border-radius: 6px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-control:hover {
          background: rgba(216, 150, 105, 0.2);
          color: var(--copper-200);
        }

        .btn-control.delete:hover {
          background: rgba(179, 57, 75, 0.3);
          border-color: var(--wine-400);
          color: #ffadb8;
        }

        /* Editing Styles */
        .edit-milestone-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .milestone-input, .milestone-textarea {
          width: 100%;
          background: rgba(10, 9, 14, 0.9);
          border: 1px solid rgba(216, 150, 105, 0.3);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          color: var(--cream-100);
          font-family: inherit;
          font-size: 0.9rem;
        }

        .milestone-input:focus, .milestone-textarea:focus {
          outline: none;
          border-color: var(--copper-400);
          box-shadow: 0 0 10px rgba(216, 150, 105, 0.25);
        }

        .edit-actions {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
        }

        .btn-action.save {
          background: var(--copper-500);
          color: #fff;
        }

        .btn-action.cancel {
          background: rgba(255, 255, 255, 0.1);
          color: var(--cream-300);
        }

        .add-milestone-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 30px;
        }

        .new-milestone-form {
          width: 100%;
          max-width: 600px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-title {
          font-size: 1.25rem;
          margin-bottom: 4px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .timeline-line {
            left: 24px;
          }
          .timeline-item {
            width: 100%;
            left: 0 !important;
            padding-left: 64px !important;
            padding-right: 0 !important;
            justify-content: flex-start !important;
          }
          .timeline-node {
            left: 5px !important;
            right: auto !important;
          }
          .timeline-card {
            max-width: 100%;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

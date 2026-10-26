import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Download, 
  Copy, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Heart, 
  Calendar, 
  BookOpen, 
  Rocket, 
  Lock,
  Layers
} from 'lucide-react';

export default function CustomizerModal({
  data,
  onSaveData,
  onResetData,
  onClose,
  isEditMode,
  onToggleEditMode
}) {
  const [activeTab, setActiveTab] = useState('couple'); // 'couple' | 'dates' | 'export' | 'guide'
  const [copiedCode, setCopiedCode] = useState(false);

  // Form state initialized with data
  const [myName, setMyName] = useState(data.myName || 'KD');
  const [partnerName, setPartnerName] = useState(data.partnerName || 'ROWDY');
  const [startDate, setStartDate] = useState(
    data.relationshipStartDate ? data.relationshipStartDate.slice(0, 16) : '2026-10-04T00:00'
  );
  const [anniversaryDate, setAnniversaryDate] = useState(
    data.anniversaryDate ? data.anniversaryDate.slice(0, 16) : '2026-11-04T00:00'
  );
  const [welcomeTitle, setWelcomeTitle] = useState(data.welcome?.title || 'To My Favourite Person ❤️');
  const [welcomeSubtitle, setWelcomeSubtitle] = useState(data.welcome?.subtitle || 'One month down, a lifetime of memories to go.');

  // Handle Save
  const handleSave = () => {
    const updated = {
      ...data,
      myName,
      partnerName,
      relationshipStartDate: startDate,
      anniversaryDate: anniversaryDate,
      welcome: {
        ...data.welcome,
        title: welcomeTitle,
        subtitle: welcomeSubtitle
      }
    };
    onSaveData(updated);
    alert('Changes saved successfully to your browser! ❤️');
  };

  // Generate exported code for defaultData.js
  const generateExportCode = () => {
    const exportObj = {
      ...data,
      myName,
      partnerName,
      relationshipStartDate: startDate,
      anniversaryDate: anniversaryDate,
      welcome: {
        ...data.welcome,
        title: welcomeTitle,
        subtitle: welcomeSubtitle
      }
    };
    return `// Exported configuration from your customized anniversary website\nexport const defaultAnniversaryData = ${JSON.stringify(exportObj, null, 2)};\n`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleDownloadJson = () => {
    const exportStr = JSON.stringify(data, null, 2);
    const blob = new Blob([exportStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anniversary_backup_${myName}_and_${partnerName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="customizer-overlay" onClick={onClose}>
      <div className="customizer-dialog copper-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="dialog-header">
          <div className="dialog-title-wrap">
            <Sparkles size={18} className="dialog-sparkle" />
            <h3 className="dialog-title copper-gradient-text">Website Customizer</h3>
          </div>
          <button type="button" className="dialog-close-btn" onClick={onClose} aria-label="Close customizer">
            <X size={20} />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="dialog-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'couple' ? 'active' : ''}`}
            onClick={() => setActiveTab('couple')}
          >
            <Heart size={14} /> Names &amp; Welcome
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'dates' ? 'active' : ''}`}
            onClick={() => setActiveTab('dates')}
          >
            <Calendar size={14} /> Relationship Dates
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            <Download size={14} /> Export for Vercel
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            <Rocket size={14} /> Vercel &amp; Privacy Guide
          </button>
        </div>

        {/* Tab Content */}
        <div className="dialog-body">
          {activeTab === 'couple' && (
            <div className="tab-pane">
              <div className="form-group">
                <label className="field-label">Your Name (or Nickname):</label>
                <input
                  type="text"
                  value={myName}
                  onChange={(e) => setMyName(e.target.value)}
                  placeholder="KD"
                  className="field-input"
                />
              </div>

              <div className="form-group">
                <label className="field-label">His Name (or Nickname):</label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="ROWDY"
                  className="field-input"
                />
              </div>

              <div className="form-group">
                <label className="field-label">Welcome Screen Title:</label>
                <input
                  type="text"
                  value={welcomeTitle}
                  onChange={(e) => setWelcomeTitle(e.target.value)}
                  placeholder="To My Favourite Person ❤️"
                  className="field-input"
                />
              </div>

              <div className="form-group">
                <label className="field-label">Welcome Subtitle:</label>
                <input
                  type="text"
                  value={welcomeSubtitle}
                  onChange={(e) => setWelcomeSubtitle(e.target.value)}
                  placeholder="One month down, a lifetime of memories to go."
                  className="field-input"
                />
              </div>

              <div className="inline-edit-callout">
                <Layers size={16} />
                <span>
                  <strong>Tip:</strong> Toggle <em>Interactive Edit Mode</em> on the bottom-left of the page to add photos, edit the letter, and manage reasons directly on the page!
                </span>
              </div>
            </div>
          )}

          {activeTab === 'dates' && (
            <div className="tab-pane">
              <div className="form-group">
                <label className="field-label">Relationship Start Date (4/10/26):</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="field-input"
                />
                <span className="field-hint">Used for the live counter (Days, Hours, Minutes, Seconds).</span>
              </div>

              <div className="form-group">
                <label className="field-label">First-Month Anniversary Date (4/11/26):</label>
                <input
                  type="datetime-local"
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                  className="field-input"
                />
                <span className="field-hint">Marks your 1-month celebration milestone!</span>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="tab-pane">
              <p className="tab-desc">
                When you deploy to Vercel, copy this code and paste it into <code className="code-pill">src/data/defaultData.js</code> so your boyfriend sees all your customized names, dates, letters, and reasons on any device!
              </p>

              <div className="code-preview-wrap">
                <pre className="code-box">{generateExportCode()}</pre>
              </div>

              <div className="export-actions">
                <button type="button" className="btn-copper-primary" onClick={handleCopyCode}>
                  {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedCode ? 'Copied to Clipboard! ✨' : 'Copy Code for defaultData.js'}</span>
                </button>

                <button type="button" className="btn-copper-outline" onClick={handleDownloadJson}>
                  <Download size={16} />
                  <span>Download Backup JSON</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="tab-pane guide-pane">
              <div className="guide-step">
                <div className="step-num">1</div>
                <div>
                  <h4 className="step-title">How to Run Locally</h4>
                  <p className="step-text">Run <code>npm install</code> then <code>npm run dev</code> in this directory. Open the browser at <code>http://localhost:5173</code>.</p>
                </div>
              </div>

              <div className="guide-step">
                <div className="step-num">2</div>
                <div>
                  <h4 className="step-title">How to Deploy to Vercel for Free</h4>
                  <p className="step-text">
                    1. Push this folder to a private GitHub repository.<br />
                    2. Go to <strong>vercel.com</strong>, log in with GitHub, and click <strong>"Add New Project"</strong>.<br />
                    3. Select your repository and click <strong>"Deploy"</strong>. Within 1 minute, you will have a live secure URL (e.g. <code>https://our-first-month.vercel.app</code>)!
                  </p>
                </div>
              </div>

              <div className="guide-step">
                <div className="step-num">3</div>
                <div>
                  <h4 className="step-title">How to Share Privately with ROWDY</h4>
                  <p className="step-text">
                    • In Vercel, your link is unlisted and known only to whoever you share the URL with.<br />
                    • Send the link privately over your private chat or WhatsApp with a sweet note.<br />
                    • No search engine can index a brand new unlinked Vercel deployment!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="dialog-footer">
          <button
            type="button"
            className="btn-copper-outline reset-btn"
            onClick={() => {
              if (window.confirm('Reset all customizations to original defaults?')) {
                onResetData();
                onClose();
              }
            }}
          >
            <RotateCcw size={14} /> Reset
          </button>

          <div className="footer-right">
            <button type="button" className="btn-copper-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn-copper-primary" onClick={handleSave}>
              <Save size={15} /> Save Changes
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .customizer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 5, 8, 0.88);
          backdrop-filter: blur(16px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }

        .customizer-dialog {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          background: linear-gradient(135deg, #181622 0%, #100f17 100%);
          border: 1.5px solid rgba(216, 150, 105, 0.35);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(200, 129, 81, 0.15);
        }

        .dialog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid rgba(216, 150, 105, 0.15);
        }

        .dialog-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dialog-sparkle {
          color: var(--copper-300);
        }

        .dialog-title {
          font-size: 1.35rem;
          font-weight: 700;
        }

        .dialog-close-btn {
          background: transparent;
          border: none;
          color: var(--cream-muted);
          cursor: pointer;
          transition: color 0.2s;
        }

        .dialog-close-btn:hover {
          color: var(--cream-100);
        }

        .dialog-tabs {
          display: flex;
          border-bottom: 1px solid rgba(216, 150, 105, 0.15);
          background: rgba(12, 11, 16, 0.7);
          overflow-x: auto;
        }

        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 14px 20px;
          background: transparent;
          border: none;
          color: var(--cream-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: var(--transition-smooth);
        }

        .tab-btn:hover {
          color: var(--cream-200);
        }

        .tab-btn.active {
          color: var(--copper-200);
          border-bottom-color: var(--copper-400);
          background: rgba(216, 150, 105, 0.08);
        }

        .dialog-body {
          padding: 28px;
          overflow-y: auto;
          flex: 1;
        }

        .tab-pane {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--copper-200);
        }

        .field-input {
          background: rgba(10, 9, 14, 0.95);
          border: 1px solid rgba(216, 150, 105, 0.3);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          color: var(--cream-100);
          font-family: inherit;
          font-size: 0.95rem;
        }

        .field-input:focus {
          outline: none;
          border-color: var(--copper-400);
          box-shadow: 0 0 12px rgba(216, 150, 105, 0.25);
        }

        .field-hint {
          font-size: 0.76rem;
          color: var(--cream-muted);
        }

        .inline-edit-callout {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(216, 150, 105, 0.09);
          border: 1px solid rgba(216, 150, 105, 0.25);
          border-radius: var(--radius-md);
          padding: 14px;
          font-size: 0.85rem;
          color: var(--cream-300);
        }

        .tab-desc {
          font-size: 0.92rem;
          color: var(--cream-300);
          line-height: 1.6;
        }

        .code-pill {
          background: rgba(216, 150, 105, 0.15);
          color: var(--copper-200);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .code-preview-wrap {
          background: #09080c;
          border: 1px solid rgba(216, 150, 105, 0.25);
          border-radius: var(--radius-md);
          max-height: 200px;
          overflow-y: auto;
          padding: 14px;
        }

        .code-box {
          font-family: monospace;
          font-size: 0.78rem;
          color: #d6cbba;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .export-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .guide-pane {
          gap: 20px;
        }

        .guide-step {
          display: flex;
          gap: 16px;
        }

        .step-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(216, 150, 105, 0.15);
          border: 1px solid var(--copper-400);
          color: var(--copper-200);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .step-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--cream-100);
          margin-bottom: 4px;
        }

        .step-text {
          font-size: 0.88rem;
          color: var(--cream-400);
          line-height: 1.6;
        }

        .dialog-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          border-top: 1px solid rgba(216, 150, 105, 0.15);
          background: rgba(12, 11, 16, 0.85);
        }

        .footer-right {
          display: flex;
          gap: 10px;
        }

        .reset-btn {
          color: #ff9fae;
          border-color: rgba(179, 57, 75, 0.3);
        }

        .reset-btn:hover {
          background: rgba(179, 57, 75, 0.2);
        }
      `}</style>
    </div>
  );
}

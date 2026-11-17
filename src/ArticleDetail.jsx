import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { INFO_RELATED_LABELS } from './infoPages.js';

const READER_DEFAULTS = {
  textSize: 18,
  contrast: 'standard',
  lineSpacing: 'normal',
  readingMode: 'default',
  readAloud: false,
};

const loadReaderPreferences = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem('calo-article-prefs') || '{}');
    return {
      textSize: Math.min(28, Math.max(14, Number(saved.textSize) || READER_DEFAULTS.textSize)),
      contrast: saved.contrast === 'high' ? 'high' : 'standard',
      lineSpacing: ['normal', 'wide', 'extra-wide'].includes(saved.lineSpacing) ? saved.lineSpacing : 'normal',
      readingMode: ['default', 'distraction-free'].includes(saved.readingMode) ? saved.readingMode : 'default',
      readAloud: Boolean(saved.readAloud),
    };
  } catch {
    return READER_DEFAULTS;
  }
};

const saveReaderPreferences = (prefs) => {
  try {
    window.localStorage.setItem('calo-article-prefs', JSON.stringify(prefs));
  } catch {
    // Storage not available
  }
};

function ReadingPreferences({ prefs, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !buttonRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
      return () => window.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleUpdate = (key, value) => {
    const updated = { ...prefs, [key]: value };
    onUpdate(updated);
  };

  const handleReset = () => {
    onUpdate(READER_DEFAULTS);
  };

  return (
    <div className="article-reading-preferences">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="article-prefs-toggle"
        aria-label="Reading preferences"
        aria-expanded={isOpen}
        aria-controls="reading-prefs-panel"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M2 3h16M2 10h16M2 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Reading Preferences</span>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id="reading-prefs-panel"
          className="article-prefs-panel"
          role="region"
          aria-labelledby="prefs-heading"
        >
          <h2 id="prefs-heading" className="article-prefs-heading">Reading Preferences</h2>

          <fieldset className="article-prefs-group">
            <legend className="article-prefs-label">Text Size</legend>
            <div className="article-prefs-controls">
              <button
                onClick={() => handleUpdate('textSize', Math.max(14, prefs.textSize - 2))}
                disabled={prefs.textSize <= 14}
                className="article-prefs-btn"
                aria-label="Decrease text size"
              >
                A−
              </button>
              <span className="article-prefs-value">{prefs.textSize}px</span>
              <button
                onClick={() => handleUpdate('textSize', Math.min(28, prefs.textSize + 2))}
                disabled={prefs.textSize >= 28}
                className="article-prefs-btn"
                aria-label="Increase text size"
              >
                A+
              </button>
            </div>
          </fieldset>

          <fieldset className="article-prefs-group">
            <legend className="article-prefs-label">Contrast</legend>
            <div className="article-prefs-controls">
              {['standard', 'high'].map((value) => (
                <label key={value} className="article-prefs-radio">
                  <input
                    type="radio"
                    name="contrast"
                    value={value}
                    checked={prefs.contrast === value}
                    onChange={() => handleUpdate('contrast', value)}
                  />
                  <span>{value === 'standard' ? 'Standard' : 'High Contrast'}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="article-prefs-group">
            <legend className="article-prefs-label">Line Spacing</legend>
            <div className="article-prefs-controls">
              {['normal', 'wide', 'extra-wide'].map((value) => (
                <label key={value} className="article-prefs-checkbox">
                  <input
                    type="radio"
                    name="lineSpacing"
                    value={value}
                    checked={prefs.lineSpacing === value}
                    onChange={() => handleUpdate('lineSpacing', value)}
                  />
                  <span>
                    {value === 'normal' && 'Normal'}
                    {value === 'wide' && 'Wide'}
                    {value === 'extra-wide' && 'Extra Wide'}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="article-prefs-group">
            <legend className="article-prefs-label">Reading Mode</legend>
            <div className="article-prefs-controls">
              {['default', 'distraction-free'].map((value) => (
                <label key={value} className="article-prefs-checkbox">
                  <input
                    type="radio"
                    name="readingMode"
                    value={value}
                    checked={prefs.readingMode === value}
                    onChange={() => handleUpdate('readingMode', value)}
                  />
                  <span>
                    {value === 'default' && 'Default'}
                    {value === 'distraction-free' && 'Distraction-Free'}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="article-prefs-group">
            <legend className="article-prefs-label">Read Aloud</legend>
            <div className="article-prefs-controls">
              <label className="article-prefs-checkbox">
                <input
                  type="checkbox"
                  checked={prefs.readAloud}
                  onChange={(e) => handleUpdate('readAloud', e.target.checked)}
                />
                <span>Enable text-to-speech</span>
              </label>
            </div>
          </fieldset>

          <button
            onClick={handleReset}
            className="article-prefs-reset"
            aria-label="Reset reading preferences to defaults"
          >
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}

function TableOfContents({ sections, activeId }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSectionClick = (id) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsExpanded(false);
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <nav className="article-toc mobile" aria-label="Article sections">
      <button
        className="article-toc-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="toc-list"
      >
        <span>Table of Contents</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {isExpanded && (
        <ul id="toc-list" className="article-toc-list">
          {sections.map((section, index) => (
            <li key={index}>
              <button
                onClick={() => handleSectionClick(index)}
                className={`article-toc-link ${activeId === index ? 'is-active' : ''}`}
                aria-current={activeId === index ? 'location' : undefined}
              >
                {section.heading}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

function DesktopTableOfContents({ sections, activeId }) {
  if (!sections || sections.length === 0) return null;

  const handleSectionClick = (id) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="article-sidebar" aria-label="Article sections">
      <nav className="article-toc-sticky">
        <h2 className="article-toc-title">In this article</h2>
        <ul className="article-toc-list">
          {sections.map((section, index) => (
            <li key={index}>
              <button
                onClick={() => handleSectionClick(index)}
                className={`article-toc-link ${activeId === index ? 'is-active' : ''}`}
                aria-current={activeId === index ? 'location' : undefined}
              >
                {section.heading}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function ArticleSection({ section, index, prefs }) {
  return (
    <section
      id={`section-${index}`}
      className="article-section"
      data-line-spacing={prefs.lineSpacing}
    >
      <h2 className="article-h2">{section.heading}</h2>

      {section.body && section.body.map((text, i) => (
        <p key={i} className="article-p">
          {text}
        </p>
      ))}

      {section.list && (
        <ul className="article-list">
          {section.list.map((item, i) => (
            <li key={i}>
              {Array.isArray(item) ? (
                <>
                  <strong>{item[0]}</strong> {item[1]}
                </>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      )}

      {section.links && (
        <ul className="article-links">
          {section.links.map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="article-link">
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {section.note && (
        <aside className="article-note" role="note">
          {section.note}
        </aside>
      )}
    </section>
  );
}

function SourcesList({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <aside
      id="article-sources"
      className="article-sources"
      aria-labelledby="sources-heading"
    >
      <h2 id="sources-heading">Sources and further reading</h2>
      <ul>
        {sources.map(([label, href]) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="article-link">
              {label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ConsultationCTA({ page, navigate }) {
  if (page.hideConsultation) return null;

  const handleConsultationClick = () => {
    // Scroll to consultation form or navigate to contact page
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
      consultationForm.scrollIntoView({ behavior: 'smooth' });
      consultationForm.focus();
    } else {
      navigate('/contact');
    }
  };

  return (
    <section
      className="article-consultation-cta"
      aria-labelledby="consultation-heading"
    >
      <div className="consultation-content">
        <div className="consultation-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="consultation-text">
          <h2 id="consultation-heading">Ready for a consultation?</h2>
          <p>
            Discuss your financial goals and insurance needs with our team. We're here to help you make informed decisions.
          </p>
        </div>
        <button
          onClick={handleConsultationClick}
          className="consultation-button"
          aria-label="Schedule a consultation"
        >
          Get in Touch
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}

function RelatedArticles({ related, navigate }) {
  if (!related || related.length === 0) return null;

  return (
    <section
      id="article-related"
      className="article-related-section"
      aria-labelledby="related-heading"
    >
      <h2 id="related-heading">Related articles</h2>
      <ul className="article-related-list">
        {related.map((href) => {
          // Get the label from INFO_RELATED_LABELS
          const label = typeof href === 'string' && INFO_RELATED_LABELS[href] 
            ? INFO_RELATED_LABELS[href]
            : href;
          
          return (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(href);
                }}
                className="article-related-link"
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ArticleDetail({ page, navigate, path }) {
  const [prefs, setPrefs] = useState(loadReaderPreferences);
  const [activeSection, setActiveSection] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    saveReaderPreferences(prefs);
  }, [prefs]);

  // Calculate active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const sections = contentRef.current.querySelectorAll('[id^="section-"]');
      let current = 0;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.getBoundingClientRect().top <= 200) {
          current = i;
          break;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSkipToContent = () => {
    contentRef.current?.focus();
  };

  if (!page) return null;

  return (
    <article
      className="article-detail-wrapper"
      data-contrast={prefs.contrast}
      data-text-size={prefs.textSize}
      data-reading-mode={prefs.readingMode}
      style={{ '--article-font-size': `${prefs.textSize}px` }}
    >
      {/* Skip to main content link */}
      <a href="#article-main" className="sr-link" onClick={handleSkipToContent}>
        Skip to main content
      </a>

      {/* Header */}
      <header className="article-header">
        <div className="article-header-container">
          <button 
            onClick={() => window.history.back()}
            className="article-breadcrumb"
            aria-label="Go back to previous page"
          >
            ← Back to CaloCapital
          </button>

          <div className="article-header-meta">
            <div className="article-eyebrow">{page.eyebrow}</div>
            <h1 className="article-title">{page.title}</h1>
            <p className="article-intro">{page.intro}</p>

            <div className="article-metadata">
              {page.readTime && <span className="article-meta-item">{page.readTime}</span>}
              {page.reviewed && (
                <span className="article-meta-item">
                  Reviewed {page.reviewed}
                </span>
              )}
              {page.author && <span className="article-meta-item">By {page.author}</span>}
            </div>
          </div>

          <ReadingPreferences prefs={prefs} onUpdate={setPrefs} />
        </div>
      </header>

      {/* Main content area with sidebar on desktop */}
      <div className="article-main-container">
        <div className="article-sidebar-wrapper">
          <DesktopTableOfContents sections={page.sections} activeId={activeSection} />
        </div>

        <main
          id="article-main"
          className="article-main"
          ref={contentRef}
          tabIndex="-1"
        >
          {/* Mobile Table of Contents */}
          <TableOfContents sections={page.sections} activeId={activeSection} />

          {/* Article content */}
          <div className="article-content">
            {page.sections.map((section, index) => (
              <ArticleSection key={index} section={section} index={index} prefs={prefs} />
            ))}

            {page.note && (
              <aside className="article-note-footer" role="note">
                {page.note}
              </aside>
            )}
          </div>

          {/* Sources */}
          <SourcesList sources={page.sources} />

          {/* Consultation CTA */}
          <ConsultationCTA page={page} navigate={navigate} />

          {/* Contact section */}
          <aside className="article-contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Talk with our team</h2>
            <p className="article-contact-text">
              Call{' '}
              <a href="tel:+19174009543" className="article-link">
                917-400-9543
              </a>{' '}
              or email{' '}
              <a href="mailto:questions@calocapital.io" className="article-link">
                questions@calocapital.io
              </a>
              .
            </p>
          </aside>

          {/* Related articles - will be populated with actual article links */}
          {page.related && page.related.length > 0 && (
            <RelatedArticles related={page.related} navigate={navigate} />
          )}
        </main>
      </div>
    </article>
  );
}

export default ArticleDetail;

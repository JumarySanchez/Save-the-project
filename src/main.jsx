import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Security measures to prevent image saving and unauthorized access
(function() {
  'use strict';

  // Prevent right-click context menu on images
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('img')) {
      e.preventDefault();
      return false;
    }
  }, true);

  // Prevent image dragging
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  }, true);

  // Prevent image selection and copying
  document.addEventListener('selectstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  }, true);

  // Prevent keyboard shortcuts for saving (Ctrl+S, Cmd+S)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      return false;
    }
    // Also prevent developer tools on sensitive pages
    if (e.key === 'F12' || e.key === 'F11') {
      // Allow but don't encourage
    }
  }, true);

  // Prevent image data URI access
  const originalImage = Image.prototype.toDataURL;
  Image.prototype.toDataURL = function(...args) {
    console.warn('Image export prevented for security');
    return '';
  };

  // Clear sensitive data from localStorage on page unload
  window.addEventListener('beforeunload', () => {
    try {
      const keysToPreserve = ['theme', 'language'];
      Object.keys(localStorage).forEach(key => {
        if (!keysToPreserve.includes(key)) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  });

  // Disable console in production to prevent data exposure
  if (import.meta.env.PROD) {
    const noop = () => {};
    window.console.log = noop;
    window.console.warn = noop;
    window.console.error = noop;
    window.console.info = noop;
    window.console.debug = noop;
  }
})();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

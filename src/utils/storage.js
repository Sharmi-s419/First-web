// LocalStorage and IndexedDB helpers for persisting anniversary website customizations

const STORAGE_KEY = 'romantic_anniversary_data_v2';
const DB_NAME = 'AnniversaryMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'mediaFiles';

// Open IndexedDB for large media (custom uploaded songs and photos)
function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => {
      console.warn('IndexedDB open error:', e);
      resolve(null);
    };
  });
}

// Save large media item (e.g. uploaded song blob or base64 photo)
export async function saveMediaItem(key, data) {
  try {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(data, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn('Error saving media item:', err);
    return false;
  }
}

// Retrieve large media item
export async function getMediaItem(key) {
  try {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('Error getting media item:', err);
    return null;
  }
}

// Load data from localStorage with fallback to defaultData
export function loadAnniversaryData(defaultData) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultData;
    const parsed = JSON.parse(saved);
    // Deep merge with default data so any new fields are preserved
    return {
      ...defaultData,
      ...parsed,
      milestones: parsed.milestones || defaultData.milestones,
      photos: parsed.photos || defaultData.photos,
      reasons: parsed.reasons || defaultData.reasons,
      letter: { ...defaultData.letter, ...(parsed.letter || {}) },
      longDistance: { ...defaultData.longDistance, ...(parsed.longDistance || {}) },
      song: { ...defaultData.song, ...(parsed.song || {}) },
      finalSurprise: { ...defaultData.finalSurprise, ...(parsed.finalSurprise || {}) }
    };
  } catch (e) {
    console.warn('Failed to parse saved anniversary data:', e);
    return defaultData;
  }
}

// Save data to localStorage
export function saveAnniversaryData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    return false;
  }
}

// Reset data to defaults
export function clearSavedData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

// Compress image to sensible size for fast local storage
export function compressImageFile(file, maxWidth = 1400, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

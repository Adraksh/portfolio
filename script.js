/* SITE BEHAVIOUR — edit portfolio.js for your content, not this file.
   This file builds project cards, filters, and accessible project dialogs.
   textContent is used for editable text so it is not interpreted as HTML. */

/* SHARED CONTENT — name, initials, biography, email and year */
const all = selector => document.querySelectorAll(selector);
all('[data-name]').forEach(el => el.textContent = portfolio.name);
all('[data-initials]').forEach(el => el.textContent = portfolio.initials);
all('[data-bio]').forEach(el => el.textContent = portfolio.bio);
all('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
all('[data-email]').forEach(el => {
  el.textContent = portfolio.email;
  el.href = 'mailto:' + portfolio.email;
});
const page = document.body.dataset.page;
const projects = portfolio.projects.filter(project => project.discipline === page);
const grid = document.getElementById('projects');
const dialog = document.getElementById('project-dialog');
let lastTrigger;

/* HELPER — create a page element */
function element(tag, className, text) {
  const el = document.createElement(tag);
  el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/* PROJECT PICTURES — thumbnails or sample artwork */
function cover(project) {
  const el = element('div', 'project-cover theme-' + project.theme);
  if (project.image) {
    const img = element('img', 'project-image');
    img.src = project.image;
    img.alt = project.alt;
    img.loading = 'lazy';
    // A visible message helps you find a mistyped image path when editing.
    img.addEventListener('error', () => { img.remove(); el.append(element('span', 'image-error', 'Image unavailable — check the filename in portfolio.js.')); });
    el.append(img);
  } else {
    el.append(element('span', 'cover-top', project.discipline === 'graphic' ? 'VISUAL STUDY' : 'MOTION STUDY'));
    el.append(element('span', 'cover-heading', project.coverText));
    el.append(element('span', 'cover-bottom', project.category.toUpperCase()));
  }
  if (project.sample) el.append(element('span', 'sample-badge', 'Sample project'));
  return el;
}

/* PROJECT LINKS — allow only web URLs */
function safeExternalUrl(value) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
  catch { return ''; }
}

/* PROJECT POPUP — open the chosen image or video */
function openProject(project, trigger) {
  lastTrigger = trigger;
  const media = document.getElementById('dialog-media');
  media.replaceChildren();
  if (project.discipline === 'video' && project.video) {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    video.playsInline = true;
    video.src = project.video;
    if (project.image) video.poster = project.image;
    video.textContent = 'Your browser does not support this video format.';
    media.append(video);
    video.addEventListener('error', () => media.append(element('p', 'media-note', 'Video unavailable. Check the video path and format in portfolio.js.')));
  } else {
    media.append(cover(project));
    if (project.discipline === 'video' && !project.url) media.append(element('p', 'media-note', 'Video has not been added to this project yet.'));
  }
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-description').textContent = project.description;
  document.getElementById('dialog-category').textContent = project.category + (project.sample ? ' / SAMPLE PROJECT' : '');
  const link = document.getElementById('dialog-link');
  const url = safeExternalUrl(project.url);
  link.hidden = !url;
  if (url) link.href = url; else link.removeAttribute('href');
  link.textContent = project.discipline === 'video' ? 'Watch video' : 'View full project';
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

/* GALLERY — build cards for the selected category */
function renderProjects(category = 'All work') {
  grid.replaceChildren();
  const visible = projects.filter(project => category === 'All work' || project.category === category);
  visible.forEach(project => {
    const card = element('article', 'project-card');
    const button = element('button', 'project-open');
    button.type = 'button';
    button.setAttribute('aria-label', 'View ' + project.title);
    button.append(cover(project));
    button.addEventListener('click', () => openProject(project, button));
    const info = element('div', 'project-info');
    info.append(element('p', 'eyebrow', project.category), element('h3', '', project.title));
    card.append(button, info);
    grid.append(card);
  });
  document.querySelector('.empty-state').hidden = visible.length > 0;
  document.getElementById('filter-status').textContent = `${visible.length} projects shown.`;
}

/* FILTER BUTTONS — generated from your project categories */
if (grid) {
  const filters = document.querySelector('.filters');
  ['All work', ...new Set(projects.map(project => project.category))].forEach((category, index) => {
    const button = element('button', 'filter' + (index === 0 ? ' active' : ''), category);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach(other => {
        other.classList.toggle('active', other === button);
        other.setAttribute('aria-pressed', String(other === button));
      });
      renderProjects(category);
    });
    filters.append(button);
  });
  document.querySelector('.collection-count').textContent = `${String(projects.length).padStart(2, '0')} PROJECTS`;
  renderProjects();
}
/* PROJECT POPUP — closing, Escape and restoring keyboard focus. */
if (dialog) {
  // Native dialog supplies keyboard focus trapping and Escape-to-close.
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => {
    dialog.querySelector('video')?.pause();
    document.body.classList.remove('dialog-open');
    lastTrigger?.focus();
  });
}

/* HOME VIDEO BACKGROUND
   A failed download/unsupported format keeps the blue gradient visible.
   Diagnostic details appear in the browser console (F12), not on the page. */
const backgroundVideo = document.querySelector('.portfolio-bg-video');
if (backgroundVideo) {
  const panel = backgroundVideo.closest('.video-preview-panel');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const showFallback = () => panel.classList.remove('is-playing');
  const reportVideoError = () => {
    showFallback();
    console.warn('Background video could not load. Check videos/video-preview.mp4 and use H.264 MP4.', backgroundVideo.error);
  };
  backgroundVideo.muted = true;
  backgroundVideo.addEventListener('playing', () => panel.classList.add('is-playing'));
  backgroundVideo.addEventListener('error', reportVideoError);
  backgroundVideo.querySelector('source').addEventListener('error', reportVideoError);
  const updateMotion = () => {
    if (motionPreference.matches) {
      backgroundVideo.pause();
      showFallback();
    } else {
      backgroundVideo.play().catch(() => {
        showFallback();
        console.info('Background autoplay unavailable; showing the blue gradient.');
      });
    }
  };
  motionPreference.addEventListener('change', updateMotion);
  updateMotion();
}

  document.querySelectorAll(".folder-card").forEach((folder) => {
    const videos = folder.querySelectorAll("video");

    if (!videos.length) return;

    function updatePlayback() {
      const active =
        folder.matches(":hover") ||
        folder.contains(document.activeElement);

      videos.forEach((video) => {
        if (active) {
          video.play().catch(() => {
            // Playback may be restricted by the browser.
          });
        } else {
          video.pause();
        }
      });
    }

    folder.addEventListener("mouseenter", updatePlayback);
    folder.addEventListener("mouseleave", updatePlayback);
    folder.addEventListener("focusin", updatePlayback);
    folder.addEventListener("focusout", () => {
      requestAnimationFrame(updatePlayback);
    });
  });

# Your portfolio — editing guide

## Install these updated files
Back up your current website folder. Copy the six HTML/CSS/JS files into that
folder, replacing the matching files. Keep your existing images and videos
folders. Open index.html in your browser.

Images and videos were NOT included in the upload, so they are NOT in this ZIP.
Your photo path remains images/my-photo.png, exactly as in your uploaded HTML.
The background video path is videos/video-preview.mp4 (relative to index.html).
Enable file-name extensions in File Explorer to check its actual extension.
Use an MP4 encoded as H.264; renaming another format to .mp4 does not convert it.

## Where to edit
- index.html: home headline, About heading, photo path, biography's second
  paragraph, graphic preview and video background path.
- portfolio.js: your name, initials, email, main biography and all project entries.
  These values replace the HTML fallback text when the page loads.
- graphic-design.html / video-editing.html: gallery headings and introductions.
- styles.css: labeled sections for colors, navigation, home, cards, About photo,
  galleries, dialogs, video background and responsive layouts.
- script.js: project cards, category filters, popups and video loading behavior.
- .prettierrc: optional standard Prettier settings. Replaces arrange.prettierrc;
  no CSS-order plugin is required. It does not affect the website itself.

## Video changes
Removed temporary video controls inside the linked card. Consolidated the
conflicting video-layer overrides to a single stack: video, dark overlay, text.
The blue gradient remains visible until the video begins playing, and returns
if playback fails. Reduced-motion visitors see the static gradient.
The smaller labels remain; Make it move stays removed.

The uploaded source uses the correct .mp4 path. Without the actual video file,
its encoding, filename on disk and original playback failure cannot be confirmed.
The fallback prevents a blank rectangle but does not repair a missing or
unsupported video. Send the actual file if it still will not play.

## Cleanup
Removed unused hero-caption, motion-word, old about-grid and portrait CSS.
Combined repeated selectors and responsive rules; removed the homepage's
unused project dialog and guarded its listeners on pages without a dialog.
Preserved gallery themes used by portfolio.js and the sample projects.
Preserved your content and mobile portrait centering; included the requested
mobile About heading centering and justified biography.

## Add real work
In portfolio.js, replace a sample object's title, description, image and alt.
Use video for a local MP4, or url for an external YouTube/Vimeo/project page.
Change sample to false for your own work. New categories create filter buttons.

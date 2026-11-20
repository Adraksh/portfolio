/* YOUR CONTENT — START HERE
   This is the main file to edit. Keep quotes and commas in place.
   Save, then refresh index.html in your browser to see your changes.
   The sample entries below are placeholders, not claims of completed work. */
const portfolio = {
  // EDIT: Your name, initials, email and About paragraph, shared across all pages.
  name: 'Donne Crislee E. Vicera',
  initials: 'DV',
  email: 'viceradonnecrislee@gmail.com',
  bio: 'I enjoy turning ideas into visuals that communicate clearly and videos that hold attention.',
  // PROJECT GALLERIES — graphic entries first, video entries below.
  projects: [
    {
      id: 'brand-study',
      discipline: 'graphic',
      category: 'Brand identity',
      title: 'A distinct first impression',
      description: 'Sample project — replace this with your brand identity work. Explain the brief, your role, and the design choices you made.',
      coverText: 'Identity.\nWith intention.',
      theme: 'identity',
      // YOUR PICTURE: Put your file in images/, then enter its relative path below.
      // Example: image: 'images/my-brand.jpg',
      image: '',
      alt: 'Describe your brand identity artwork here',
      // YOUR LINK: Optional Behance, project page, or other full https:// URL.
      url: '',
      video: '',
      sample: true
    },
    {
      id: 'editorial-study',
      discipline: 'graphic',
      category: 'Editorial',
      title: 'Making room for the message',
      description: 'Sample project — add a poster, publication, or layout here. Share what the design needed to communicate and how you approached it.',
      coverText: 'Less noise.\nMore meaning.',
      theme: 'editorial',
      image: '',
      alt: 'Describe your editorial design here',
      url: '',
      video: '',
      sample: true
    },
    {
      id: 'digital-study',
      discipline: 'graphic',
      category: 'Digital design',
      title: 'A cohesive visual language',
      description: 'Sample project — showcase social graphics, a campaign, or a digital design series. Replace this text with details about your own work.',
      coverText: 'Connect.\nBy design.',
      theme: 'digital',
      image: '',
      alt: 'Describe your digital graphics here',
      url: '',
      video: '',
      sample: true
    },
    {
      id: 'showreel',
      discipline: 'video',
      category: 'Showreel',
      title: 'A selection in motion',
      description: 'Sample project — add your showreel here. Introduce the kind of editing you enjoy and the work featured in your reel.',
      coverText: 'Every frame.\nA feeling.',
      theme: 'showreel',
      // YOUR THUMBNAIL: image: 'images/showreel.jpg',
      image: '',
      alt: 'A still from my editing showreel',
      // YOUR VIDEO: Either set url to a YouTube/Vimeo link, OR set video to a local MP4.
      // Example: url: 'https://www.youtube.com/watch?v=YOUR_ID',
      // Example: video: 'videos/showreel.mp4', (create a videos folder beside index.html)
      // Local videos play in the project dialog; external links open a new tab.
      url: '',
      video: '',
      sample: true
    },
    {
      id: 'story-edit',
      discipline: 'video',
      category: 'Storytelling',
      title: 'Finding the story',
      description: 'Sample project — add a narrative, documentary, or personal edit. Describe your role and the approach to pacing and sound.',
      coverText: 'Find the\nstory.',
      theme: 'story',
      image: '',
      alt: 'A still from my storytelling project',
      url: '',
      video: '',
      sample: true
    },
    {
      id: 'short-edit',
      discipline: 'video',
      category: 'Short form',
      title: 'A moment worth watching',
      description: 'Sample project — add a short edit, social video, or promotional piece. Explain its purpose and the editing choices behind it.',
      coverText: 'Small moment.\nLasting impact.',
      theme: 'short',
      image: '',
      alt: 'A still from my short-form video',
      url: '',
      video: '',
      sample: true
    }
    // ADD A PROJECT: Copy an object above, including { }, and separate objects with commas.
    // Give it a unique id. discipline must be 'graphic' or 'video'.
    // New category names automatically become filter buttons.
    // Change sample to false when the card describes your own real work.
  ]
};

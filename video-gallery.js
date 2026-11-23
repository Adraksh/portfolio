(() => {
  const page = document.querySelector(".ve-page");
  if (!page) return;

  /*
   * ADD YOUR VIDEOS HERE
   *
   * src:    YouTube link (youtu.be or youtube.com/watch?v=...) or local MP4 path.
   * poster: Path to a thumbnail image.
   * title:  A short name for the video.
   *
   * TO ADD ANOTHER CATEGORY:
   * Copy the commented category below and give it
   * a unique id, label, and its own items.
   */
  const categories = [
    {
      id: "long-form",
      label: "Long form",
      items: [
        {
                src: "https://youtu.be/uh6a7aR3rwk",
                poster: "images/video-thumbnails/analytics1.png",
                title: "Analytics Video 1"
        },
        {
                src: "https://youtu.be/XBzqEStK9ds?si=gserrYiW9ruepmde",
                poster: "images/video-thumbnails/analytics2.png",
                title: "Analytics Video 2"
        },
        {
                src: "https://youtu.be/jWHHUrxmwq8?si=pTP3Mt496O4SmpWU",
                poster: "images/video-thumbnails/analytics3.png",
                title: "Analytics Video 3"
        },
        {
                src: "https://youtu.be/zSKSmaI5-sY?si=qY4qN4yWiGCTGPq3",
                poster: "images/video-thumbnails/analytics4.png",
                title: "Analytics Video 4"
        },
        {
                src: "https://youtu.be/_jROs8wuoUk?si=Q9VXCENTpWZ-8nIq",
                poster: "images/video-thumbnails/konstanty3.png",
                title: "Konstanty Video 1"
        },
        {
                src: "https://youtu.be/eW2mj60BwG4?si=KwjP5GDiGBUzkkcJ",
                poster: "images/video-thumbnails/konstanty4.png",
                title: "Konstanty Video 2"
        },
        {
                src: "https://youtu.be/nJq5WXKeOc0?si=rallGqQu55gY_ClO",
                poster: "images/video-thumbnails/konstanty1.png",
                title: "Konstanty Video 3"
        },
        {
                src: "https://youtu.be/ElLF4mDu7Hk?si=45_nzJOQ_5nJ2Uxq",
                poster: "images/video-thumbnails/konstanty2.png",
                title: "Konstanty Video 4"
        },
        {
                src: "https://youtu.be/uaFZ-AYEoQY?si=4JoqPORayUSmX_FT",
                poster: "images/video-thumbnails/shameem.png",
                title: "Shameem Video 4"
        }
        // Remove // and use your actual filenames:
        // {
        //   src: "videos/talking-head-1.mp4",
        //   poster: "images/video-thumbnails/talking-head-1.jpg",
        //   title: "Talking-head editing sample"
        // },
      ]
    },
    {
      id: "short-form",
      label: "Short form",
      items: [
        { src: "https://youtube.com/shorts/a3dYP0AzN48?feature=share",
                title: "Short 1"
        },
        { src: "https://youtube.com/shorts/Bl7jqq2NKww?feature=share",
                title: "Short 2"
        }
        { src: "https://youtube.com/shorts/icrRlSg2zAk?feature=share",
                title: "Short 3"
        }
      ]
    // ADD ANOTHER CATEGORY HERE:
    // {
    //   id: "short-form",
    //   label: "Short Form",
    //   items: [
    //     {
    //       src: "videos/short-form-1.mp4",
    //       poster: "images/video-thumbnails/short-form-1.jpg",
    //       title: "Short-form editing sample"
    //     }
    //   ]
    // },
  ];

  const navigation = page.querySelector(".ve-categories");
  const grid = page.querySelector(".ve-grid");
  const emptyMessage = page.querySelector(".ve-empty");

  const modal = document.querySelector(".ve-modal");
  const player = modal.querySelector(".ve-full-video");
  const closeButton = modal.querySelector(".ve-close");
  const youtubePlayer = document.createElement("iframe");
  youtubePlayer.className = "ve-youtube-video";
  youtubePlayer.hidden = true;
  youtubePlayer.title = "YouTube video player";
  youtubePlayer.referrerPolicy = "strict-origin-when-cross-origin";
  youtubePlayer.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  youtubePlayer.allowFullscreen = true;
  player.after(youtubePlayer);

  function youtubeId(src) {
    try {
      const url = new URL(src);
      const host = url.hostname.toLowerCase();
      let id = null;
      if (host === "youtu.be") id = url.pathname.split("/")[1];
      else if (["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com"].includes(host)) {
        id = url.pathname === "/watch"
          ? url.searchParams.get("v")
          : /^\/(?:embed|shorts)\/([^/]+)/.exec(url.pathname)?.[1];
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id || "") ? id : null;
    } catch {
      return null;
    }
  }

  function stopPlayback() {
    player.pause();
    player.removeAttribute("src");
    player.load();
    youtubePlayer.removeAttribute("src");
  }


  let lastClickedCard = null;
  let startedOnBackground = false;

  function openVideo(item, card) {
    lastClickedCard = card;

    stopPlayback();
    const id = youtubeId(item.src);
    player.hidden = Boolean(id);
    youtubePlayer.hidden = !id;
    modal.setAttribute("aria-label", item.title);

    if (id) {
      youtubePlayer.title = item.title;
      youtubePlayer.src = `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1`;
    } else {
      player.src = item.src;
      player.poster = item.poster || "";
      player.setAttribute("aria-label", item.title);
      player.setAttribute("controlsList", "nodownload");
    }

    modal.showModal();
    document.documentElement.classList.add("ve-modal-open");
    closeButton.focus({ preventScroll: true });
    if (!id) player.play().catch(() => {});
  }

  // Add this listener only once, outside openVideo().
// Toggle playback once when Space is pressed.
  player.addEventListener("keydown", (event) => {
    if (event.code !== "Space") return;

    event.preventDefault();
    event.stopPropagation();

    // Holding Space should not keep toggling playback.
    if (event.repeat) return;

    if (player.paused) {
      player.play().catch(() => {});
    } else {
      player.pause();
    }
  }, true);

  // Prevent another toggle when Space is released.
  player.addEventListener("keyup", (event) => {
    if (event.code !== "Space") return;

    event.preventDefault();
    event.stopPropagation();
  }, true);

  function closeVideo() {
    stopPlayback();
    modal.close();
  }
  closeButton.addEventListener("click", closeVideo);

  // Close only when the click starts and ends outside the player.
  modal.addEventListener("pointerdown", (event) => {
    startedOnBackground = event.target === modal;
  });

  modal.addEventListener("click", (event) => {
    if (startedOnBackground && event.target === modal) {
      closeVideo();
    }
    startedOnBackground = false;
  });

  // Also runs when the user closes the dialog with Escape.
  modal.addEventListener("close", () => {
    stopPlayback();

    document.documentElement.classList.remove("ve-modal-open");
    lastClickedCard?.focus({ preventScroll: true });
  });

  function showCategory(category) {
    navigation.querySelectorAll("button").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category.id)
      );
    });

    grid.replaceChildren();
    emptyMessage.hidden = category.items.length > 0;

    category.items.forEach((item) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "ve-card";
      card.setAttribute("aria-label", `Play ${item.title}`);
      card.setAttribute("aria-haspopup", "dialog");

      if (item.poster) {
        const thumbnail = document.createElement("img");
        thumbnail.src = item.poster;
        thumbnail.alt = "";
        thumbnail.loading = "lazy";
        thumbnail.decoding = "async";
        card.append(thumbnail);
      }

      const playIcon = document.createElement("span");
      playIcon.className = "ve-play";
      playIcon.setAttribute("aria-hidden", "true");

      card.append(playIcon);
      card.addEventListener("click", () => openVideo(item, card));
      grid.append(card);
    });
  }

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ve-category";
    button.dataset.category = category.id;
    button.textContent = category.label;
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => showCategory(category));
    navigation.append(button);
  });

  if (categories.length) showCategory(categories[0]);
})();

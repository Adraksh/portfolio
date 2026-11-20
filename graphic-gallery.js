(() => {
  const page = document.querySelector(".gd-page");
  if (!page) return;

  /*
   * CONFIGURE YOUR GALLERY HERE
   *
   * Add your actual image paths inside "items".
   * Remove the // before an example to enable it.
   *
   * TO ADD ANOTHER CATEGORY:
   * Copy the commented Marketing object below.
   * Give it a unique id, a label, and its own items.
   * Its button and gallery will be created automatically.
   */
  const categories = [
    {
      id: "social media",
      label: "Social Media",
      items: [
          {
            src: "images/graphics/pinoy-kitchenette1.png",
            alt: "Pinoy Kitchenette Poster 1"
          },
          {
            src: "images/graphics/pinoy-kitchenette2.png",
            alt: "Pinoy Kitchenette Poster 2"
          },
          {
            src: "images/graphics/pinoy-kitchenette3.png",
            alt: "Pinoy Kitchenette Poster 3"
          },
          {
            src: "images/graphics/pinoy-kitchenette4.png",
            alt: "Pinoy Kitchenette Poster 4"
          },
          {
            src: "images/graphics/school1.png",
            alt: "School Organization Poster 1"
          },
          {
            src: "images/graphics/school2.png",
            alt: "School Organization Poster 2"
          },
          {
            src: "images/graphics/school3.png",
            alt: "School Organization Poster 3"
          },
          {
            src: "images/graphics/school4.png",
            alt: "School Organization Poster 4"
          },
        // Replace these with real filenames before enabling:
        // {
        //   src: "images/graphics/design-1.jpg",
        //   alt: "Social media campaign for a coffee shop"
        // },
        // {
        //   src: "images/graphics/design-2.png",
        //   alt: "Product launch announcement"
        // },
      ]
    },
    {
        id: "t-shirt designs",
        label: "T-Shirt Designs",
        items: [
            {
                src:"images/graphics/tshirt-front.png",
                alt:"T-shirt front"
            },
            {
                src:"images/graphics/tshirt-back.png",
                alt:"T-shirt back"
            },
            {
                src:"images/graphics/tshirt2-front.png",
                alt:"T-shirt 2 front"
            },
            {
                src:"images/graphics/tshirt2-back.png",
                alt:"T-shirt 2 back"
            },
            {
                src:"images/graphics/tshirt2.png",
                alt:"T-shirt mockup"
            },
            {
                src:"images/graphics/tshirt1.png",
                alt:"T-shirt design"
            }
        ]
    }

    // ADD YOUR NEXT CATEGORY HERE:
    // {
    //   id: "marketing",
    //   label: "Marketing",
    //   items: [
    //     {
    //       src: "images/graphics/marketing-1.jpg",
    //       alt: "Description of your marketing design"
    //     }
    //   ]
    // },
  ];

  const navigation = page.querySelector(".gd-categories");
  const grid = page.querySelector(".gd-grid");
  const emptyMessage = page.querySelector(".gd-empty");

  function showCategory(category) {
    navigation.querySelectorAll("button").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category.id)
      );
    });

    grid.replaceChildren();
    emptyMessage.hidden = category.items.length > 0;
    grid.setAttribute("aria-label", `${category.label} designs`);

    category.items.forEach((item) => {
      const link = document.createElement("a");
      link.className = "gd-artwork";
      link.href = item.src;
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute(
        "aria-label",
        `View ${item.alt} — opens in a new tab`
      );

      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt;
      image.loading = "lazy";
      image.decoding = "async";

      link.append(image);
      grid.append(link);
    });
  }

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gd-category";
    button.dataset.category = category.id;
    button.textContent = category.label;
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
      showCategory(category);
    });

    navigation.append(button);
  });

  if (categories.length) showCategory(categories[0]);
})();

// ==========================================================
// Segmentation viewer data
// ==========================================================

const caseInfo = {
  en: {
    failure: {
      label: "Failure case",
      score: "Dice = 0.00"
    },
    typical: {
      label: "Typical case",
      score: "Dice ≈ 0.80"
    },
    strong: {
      label: "Strong case",
      score: "Dice ≈ 0.98"
    }
  },

  zh: {
    failure: {
      label: "失败案例",
      score: "Dice = 0.00"
    },
    typical: {
      label: "典型案例",
      score: "Dice ≈ 0.80"
    },
    strong: {
      label: "优秀案例",
      score: "Dice ≈ 0.98"
    }
  }
};


let selectedCase = "typical";
let selectedView = "original";

let currentLanguage =
  localStorage.getItem(
    "portfolio-language"
  ) || "en";


// ==========================================================
// Segmentation viewer elements
// ==========================================================

const viewerImage =
  document.getElementById(
    "viewerImage"
  );

const placeholderArt =
  document.getElementById(
    "placeholderArt"
  );

const viewerCaseLabel =
  document.getElementById(
    "viewerCaseLabel"
  );

const viewerScore =
  document.getElementById(
    "viewerScore"
  );


// ==========================================================
// Biomedical AI card elements
// ==========================================================

const bioCard =
  document.getElementById(
    "bioCard"
  );

const bioOptions =
  document.querySelectorAll(
    "[data-bio-topic]"
  );

const bioMessageLabel =
  document.getElementById(
    "bioMessageLabel"
  );

const bioMessageText =
  document.getElementById(
    "bioMessageText"
  );


// ==========================================================
// Biomedical AI card content
// ==========================================================

const bioTopics = {

  ai: {
    en: {
      label: "AI",
      text:
        "Model performance matters beyond a single metric."
    },

    zh: {
      label: "AI",
      text:
        "模型价值不能只由单一指标决定。"
    }
  },


  biomedical: {
    en: {
      label: "Biomedical",
      text:
        "Clinical and biological context changes what counts as a meaningful error."
    },

    zh: {
      label: "生物医学",
      text:
        "临床与生物医学背景会改变我们对模型错误的判断。"
    }
  },


  regulation: {
    en: {
      label: "Regulation",
      text:
        "Validation, traceability, and documentation shape how medical AI reaches real-world use."
    },

    zh: {
      label: "法规",
      text:
        "验证、可追溯性与技术文档会影响医疗 AI 如何进入真实应用。"
    }
  }

};


// ==========================================================
// Update biomedical AI card
// ==========================================================

function updateBioTopic(topic) {

  // Use the currently selected language
  const content =
    bioTopics[topic][currentLanguage];


  // Skip this feature on pages without the card
  if (
    !bioMessageLabel ||
    !bioMessageText
  ) {
    return;
  }


  bioMessageLabel.textContent =
    content.label;

  bioMessageText.textContent =
    content.text;
}


// ==========================================================
// Update segmentation viewer
// ==========================================================

function updateViewer() {

  // Skip viewer text on pages without the viewer
  if (
    viewerCaseLabel &&
    viewerScore
  ) {

    viewerCaseLabel.textContent =
      caseInfo[currentLanguage][
        selectedCase
      ].label;

    viewerScore.textContent =
      caseInfo[currentLanguage][
        selectedCase
      ].score;

  }


  // About page does not contain the viewer
  if (!viewerImage) {
    return;
  }


  const path =
    `assets/${selectedCase}-${selectedView}.png`;


  const probe =
    new Image();


  // Show the real exported image when available
  probe.onload = () => {

    viewerImage.src =
      path;

    viewerImage.hidden =
      false;

    if (placeholderArt) {
      placeholderArt.hidden =
        true;
    }

  };


  // Keep the CSS placeholder when an image is missing
  probe.onerror = () => {

    viewerImage.hidden =
      true;

    if (placeholderArt) {
      placeholderArt.hidden =
        false;
    }

  };


  probe.src =
    path;
}


// ==========================================================
// Language switching
// ==========================================================

function setLanguage(language) {

  currentLanguage =
    language;


  // Update the document language
  document.documentElement.lang =
    language === "zh"
      ? "zh"
      : "en";


  // Remember the visitor's preference
  localStorage.setItem(
    "portfolio-language",
    language
  );


  // Translate bilingual text
  document
    .querySelectorAll(
      "[data-en][data-zh]"
    )
    .forEach((element) => {

      const value =
        language === "zh"
          ? element.dataset.zh
          : element.dataset.en;


      // Preserve HTML structure inside complex elements
      if (
        element.children.length === 0
      ) {

        element.textContent =
          value;

      }

    });


  // Highlight the active language button
  document
    .querySelectorAll(
      "[data-language]"
    )
    .forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.language ===
          language
      );

    });


  // Refresh viewer labels
  updateViewer();


  // Refresh the selected biomedical topic
  const activeBioOption =
    document.querySelector(
      ".bio-option.active"
    );


  if (activeBioOption) {

    updateBioTopic(
      activeBioOption.dataset.bioTopic
    );

  }

}


// ==========================================================
// Language button events
// ==========================================================

document
  .querySelectorAll(
    "[data-language]"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        setLanguage(
          button.dataset.language
        );

      }
    );

  });


// ==========================================================
// Segmentation case controls
// ==========================================================

document
  .querySelectorAll(
    "[data-case]"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        selectedCase =
          button.dataset.case;


        document
          .querySelectorAll(
            "[data-case]"
          )
          .forEach((item) => {

            item.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );


        updateViewer();

      }
    );

  });


// ==========================================================
// Segmentation view controls
// ==========================================================

document
  .querySelectorAll(
    "[data-view]"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        selectedView =
          button.dataset.view;


        document
          .querySelectorAll(
            "[data-view]"
          )
          .forEach((item) => {

            item.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );


        updateViewer();

      }
    );

  });


// ==========================================================
// Biomedical topic controls
// ==========================================================

bioOptions.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        // Remove the previous active state
        bioOptions.forEach(
          (item) => {

            item.classList.remove(
              "active"
            );

          }
        );


        // Highlight the selected topic
        button.classList.add(
          "active"
        );


        // Update the explanation text
        updateBioTopic(
          button.dataset.bioTopic
        );

      }
    );

  }
);


// ==========================================================
// Biomedical card pointer interaction
// ==========================================================

if (bioCard) {

  bioCard.addEventListener(
    "mousemove",
    (event) => {

      const bounds =
        bioCard.getBoundingClientRect();


      // Measure pointer position inside the card
      const x =
        event.clientX -
        bounds.left;

      const y =
        event.clientY -
        bounds.top;


      // Keep the tilt intentionally subtle
      const rotateY =
        (
          (x / bounds.width) -
          0.5
        ) * 4;

      const rotateX =
        (
          (y / bounds.height) -
          0.5
        ) * -4;


      bioCard.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

    }
  );


  // Restore the neutral position
  bioCard.addEventListener(
    "mouseleave",
    () => {

      bioCard.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg)";

    }
  );

}


// ==========================================================
// Initialize page after all variables and functions exist
// ==========================================================

setLanguage(
  currentLanguage
);
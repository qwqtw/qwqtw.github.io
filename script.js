const caseInfo = {
  en: {
    failure: { label: "Failure case", score: "Dice = 0.00" },
    typical: { label: "Typical case", score: "Dice ≈ 0.80" },
    strong: { label: "Strong case", score: "Dice ≈ 0.98" }
  },
  zh: {
    failure: { label: "失败案例", score: "Dice = 0.00" },
    typical: { label: "典型案例", score: "Dice ≈ 0.80" },
    strong: { label: "优秀案例", score: "Dice ≈ 0.98" }
  }
};

let selectedCase = "typical";
let selectedView = "original";
let currentLanguage = localStorage.getItem("portfolio-language") || "en";

const viewerImage = document.getElementById("viewerImage");
const placeholderArt = document.getElementById("placeholderArt");
const viewerCaseLabel = document.getElementById("viewerCaseLabel");
const viewerScore = document.getElementById("viewerScore");

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh" : "en";
  localStorage.setItem("portfolio-language", language);

  document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
    const value = language === "zh" ? element.dataset.zh : element.dataset.en;

    // Preserve nested structure only when the element contains no child elements.
    if (element.children.length === 0) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.classList.toggle("active", button.dataset.language === language);
  });

  updateViewer();
}

function updateViewer() {
  if (viewerCaseLabel && viewerScore) {
    viewerCaseLabel.textContent = caseInfo[currentLanguage][selectedCase].label;
    viewerScore.textContent = caseInfo[currentLanguage][selectedCase].score;
  }

  if (!viewerImage) return;

  const path = `assets/${selectedCase}-${selectedView}.png`;
  const probe = new Image();

  probe.onload = () => {
    viewerImage.src = path;
    viewerImage.hidden = false;
    if (placeholderArt) placeholderArt.hidden = true;
  };

  probe.onerror = () => {
    viewerImage.hidden = true;
    if (placeholderArt) placeholderArt.hidden = false;
  };

  probe.src = path;
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

document.querySelectorAll("[data-case]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCase = button.dataset.case;
    document.querySelectorAll("[data-case]").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    updateViewer();
  });
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedView = button.dataset.view;
    document.querySelectorAll("[data-view]").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    updateViewer();
  });
});

setLanguage(currentLanguage);

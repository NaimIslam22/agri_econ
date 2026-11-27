/**
 * Central Chapter Registry
 * ------------------------
 * Add new chapters by appending an entry to window.STUDY_NOTES_CONFIG.chapters.
 * All paths are relative to the project root so the site works seamlessly on
 * GitHub Pages, static web servers, and local file systems.
 */
window.STUDY_NOTES_CONFIG = {
  siteTitle: "Agricultural Economics",
  siteSubtitle: "University Lecture Study Notes · Department of Economics, JnU",
  instructor: "Dr. Tabassum Zaman, Professor, Department of Economics, JnU",
  chapters: [
    {
      id: "chapter-01",
      number: "01",
      slug: "chapter-01-intro-agricultural-economics",
      path: "chapters/chapter-01-intro-agricultural-economics/index.html",
      title: "Introduction to Agricultural Economics",
      shortTitle: "Intro to Agricultural Economics",
      subtitle: "Bangladesh's Agricultural Puzzle, Core Pillars, Land Tenure, Credit & Structural Transformation",
      lectureSource: "11-page lecture PDF",
      topics: [
        "Bangladesh's Agricultural Puzzle",
        "Microeconomic Duality",
        "Ricardian Rent & Von Thünen",
        "Tenancy (Barga vs. Kuth)",
        "Cobweb Theorem & Interventions"
      ]
    },
    {
      id: "chapter-02",
      number: "02",
      slug: "chapter-02-traditional-agriculture",
      path: "chapters/chapter-02-traditional-agriculture/index.html",
      title: "Structure and Characteristics of Traditional Agriculture",
      shortTitle: "Traditional Agriculture",
      subtitle: "Resource Configuration, Schultz's Hypothesis, Boserup Model, Case Studies & Mathematical Models",
      lectureSource: "22-page lecture PDF",
      topics: [
        "Core Structural Characteristics",
        "Schultz's “Poor but Efficient”",
        "Boserup & Vent-for-Surplus",
        "Milpa & Bangladeshi Basat Cases",
        "Land Fragmentation & VMP Math"
      ]
    },
    {
      id: "chapter-03",
      number: "03",
      slug: "chapter-03-agricultures-contribution",
      path: "chapters/chapter-03-agricultures-contribution/index.html",
      title: "Agriculture's Contribution to Economic Development",
      shortTitle: "Agriculture's Contribution",
      subtitle: "Ghatak & Ingersent Framework, Product & Factor Contributions, Capital Flows & Comparators",
      lectureSource: "16-page lecture PDF",
      topics: [
        "Ghatak & Ingersent Framework",
        "Product Share & Worked Example",
        "Factor & Inter-sectoral Capital Flows",
        "India, Vietnam & Sub-Saharan Africa",
        "Exam Blueprint & Revision Table"
      ]
    }
  ]
};

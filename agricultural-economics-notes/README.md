# Agricultural Economics — Modular Study Notes Website

A static, minimalist blue-and-white academic website combining the Agricultural Economics lecture study notes while preserving 100% of the original educational content, formatting, formulas, tables, and collapsible sections verbatim.

## Project Structure

```text
agricultural-economics-notes/
├── index.html                                              # Course Homepage & Chapter Directory
├── README.md                                               # Documentation & Guide to Adding Chapters
├── config/
│   └── chapters.js                                         # Central Chapter Registry (Single Source of Truth)
├── assets/
│   ├── css/
│   │   ├── layout.css                                      # Shared Topbar, Sidebar, Breadcrumb & Pager Styles
│   │   └── home.css                                        # Homepage Hero & Chapter Card Styles
│   ├── js/
│   │   ├── navigation.js                                   # Dynamic Sidebar, Mobile Drawer & Pager Controller
│   │   └── home.js                                         # Homepage Card Renderer & Search Filter
│   └── images/
│       └── emblem.svg                                      # Minimalist Academic Emblem
├── components/
│   ├── header.html                                         # Reusable Topbar Component Reference
│   ├── sidebar.html                                        # Reusable Sidebar Component Reference
│   └── chapter-nav.html                                    # Reusable Previous/Next Pager Reference
└── chapters/
    ├── chapter-01-intro-agricultural-economics/
    │   └── index.html                                      # Chapter 1 (Original HTML content preserved verbatim)
    ├── chapter-02-traditional-agriculture/
    │   └── index.html                                      # Chapter 2 (Original HTML content preserved verbatim)
    └── chapter-03-agricultures-contribution/
        └── index.html                                      # Chapter 3 (Original HTML content preserved verbatim)
```

## How to Add a New Chapter

1. **Create a Chapter Folder**
   Create a new directory inside `chapters/`, for example:
   `chapters/chapter-04-agricultural-marketing/`

2. **Add the Chapter `index.html`**
   Place your standalone chapter HTML inside `chapters/chapter-04-agricultural-marketing/index.html` and include the four integration hooks without modifying your `<main>` educational content:
   - **In `<head>`** (after your original `<style>`):
     ```html
     <link rel="stylesheet" href="../../assets/css/layout.css">
     ```
   - **On `<body>`**:
     ```html
     <body data-root="../../" data-chapter-id="chapter-04">
     ```
   - **Around `<main>`**:
     ```html
     <div id="site-topbar-mount"></div>
     <div class="site-shell">
       <div id="site-sidebar-mount"></div>
       <div class="site-content-wrap">
         <div id="site-breadcrumb-mount"></div>
         <main>
           <!-- Original chapter content -->
         </main>
         <div id="site-pager-mount"></div>
       </div>
     </div>
     ```
   - **Before `</body>`**:
     ```html
     <script src="../../config/chapters.js"></script>
     <script src="../../assets/js/navigation.js"></script>
     ```

3. **Register the Chapter in `config/chapters.js`**
   Append a new entry to `window.STUDY_NOTES_CONFIG.chapters`:
   ```javascript
   {
     id: "chapter-04",
     number: "04",
     slug: "chapter-04-agricultural-marketing",
     path: "chapters/chapter-04-agricultural-marketing/index.html",
     title: "Your Chapter Title",
     shortTitle: "Short Title",
     subtitle: "Brief chapter summary",
     lectureSource: "Lecture PDF source",
     topics: ["Topic 1", "Topic 2", "Topic 3"]
   }
   ```
   The homepage cards, instant search filter, sidebar navigation, breadcrumbs, and Previous/Next buttons will update automatically.

## Hosting & GitHub Pages Compatibility

- Uses pure vanilla HTML, CSS, and JavaScript with zero external dependencies.
- Uses strictly relative paths (`./` and `../../`), making it compatible with local file viewing (`file://`), any static web host, and GitHub Pages subpath deployments (`https://<username>.github.io/<repo-name>/`).

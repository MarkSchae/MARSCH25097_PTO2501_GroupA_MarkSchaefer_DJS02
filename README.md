# JS Podcast App DSJ02

## Overview

This project is a **dynamic podcast app built with vanilla JavaScript and Tailwind CSS**. It allows users to browse podcasts, view detailed information in a modal, and explore season and episode data **without leaving the page**.  

The app demonstrates **object-oriented design, modular code, and clean front-end development practices**. It also showcases **functional programming principles** where data transformations are seperate from UI rendering, improving maintainability and readability.

## Styling & Component Design

The app uses **Tailwind CSS** for styling. Instead of linking the compiled CSS in the shadow DOM, the `output.css` file is **injected directly into the shadow DOM**, by building a js variable of the entire tailwind css using node.js ```node src/scripts/javascript/css-build.js```, of each web component using the `saveCssBuildFn` function. This ensures that styles are **encapsulated and do not leak** into the global DOM.

The `DataPreview` component is designed to also work as a **drop-and-go module**. All logic is modularized into imported functions, so the component remains **clean, reusable, and self-contained** but allows a **roll-up or bundler program** to package the component as a single file that can be easily imported and used in any project without modifying the internal logic.

---

## Features

- **Landing Page**: Displays all available podcasts with:
  - Cover images.
  - Podcast titles.
  - Number of seasons.
  - Genre names.
  - Last updated date (human-readable format).

- **Podcast Modal**:
  - Opens when a podcast card is clicked.
  - Shows larger cover image, title, description, genres.
  - Lists seasons and episodes.
  - Includes an exit button and overlay for focus.

- **Data Handling**:
  - Uses **localStorage** for saving static data (podcasts, genres, seasons).
  - Combines relational arrays for easier access.

- **Reusable Code**:
  - **Object-oriented design** with a Web Component (`DataPreview`) encapsulating the rendering logic.
  - Helper functions and separate modules for:
    - Rendering card grids (`renderGrid`).
    - Rendering modals (`renderCardModalFn`).
    - Removing modals (`removeCardModalFn`).
    - Tailwind CSS injection (`saveCssBuildFn`).
    - Date formatting (`lastUpdated`, `updatedDate`).
  - Modular design allows **reuse across multiple components** without duplicating code.
  - Importing functions instead of embedding all logic in component methods keeps:
    - Methods concise and readable.
    - Encapsulation intact.
    - Easier testing and maintainability.

- **Responsive Design**:
  - Mobile-first layout with responsive grid for desktop.
  - Scrollable modal content for long descriptions and multiple seasons.
  - Shadow DOM ensures styles don’t leak globally.

---

## Design & Workflow Decisions

1. **Procedural First**  
   Initially, all logic (rendering, DOM manipulation) was written procedurally in the main script to ensure the core functionality worked end-to-end. This allowed for rapid testing and problem-solving.

2. **Refactor to OOP & Functional Design**  
   After verifying the procedural flow, the code was refactored into a **Web Component** (`DataPreview`) to:
   - Encapsulate DOM structure and behavior.
   - Keep internal state private (`#appData`).
   - Provide a clean interface via setters and custom events for communication.

3. **Why Import Functions**  
   Functions/logic for rendering the grid, modals, removing modals, and injecting CSS were **imported** instead of embedding their logic/data & behaviour inside the component methods because:
   - They are **reusable** across multiple components if needed in the future.
   - They **keep methods short**, making the component code easier to read and maintain but If an imported function starts being used frequently across multiple instances of the same component or in multiple components, it can be refactored into its own Web Component.
   - This approach supports **single-responsibility** and **modular testing**.

4. **Shadow DOM & Event Communication**  
   - The component uses **Shadow DOM** to isolate styles and structure.
   - `CustomEvent` with `bubbles: true` and `composed: true` allows communication to the main app, enabling **stateless, reusable components**.

---

## Technologies Used

- **Vanilla JavaScript (ES6+)**
- **Tailwind CSS**
- **HTML5 & CSS3**
- **LocalStorage** for data persistence

---

## File Structure

project-root/
│
├─ src/
│ ├─ scripts/
│ │ ├─ index.js # Main entry point
│ │ ├─ render-data-card-grid.js # Grid rendering logic
│ │ ├─ render-card-modal.js # Modal rendering logic
│ │ ├─ exit-modal-view.js # Modal removal logic
│ │ ├─ save-css.js # Inject Tailwind CSS into Shadow DOM
│ │ ├─ data-handling.js # Saving/loading data
│ │ ├─ relational-mapper.js # Combines relational data
│ │ ├─ helper-functions.js # Utility functions (dates, formatting)
│ │ └─ data.js # Static podcast, genre, season arrays
│ │
│ ├─ styles/
│ │ └─ stylesheets/
│ │ └─ output.css # Tailwind compiled CSS
│ │
│ └─ images/ # Podcast cover images and exit button
│
└─ index.html


---

## How to Use

### Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
npm install
npx tailwindcss -i ./src/styles/stylesheets/input.css -o ./src/styles/stylesheets/output.css
Open the App using Liveserver in vs code

Open index.html in your browser:

Browse podcasts on the landing page

Click a podcast card to view details in a modal

Scroll through season and episode information

Close the modal using the exit button

This project injects Tailwind CSS directly into the Shadow DOM using the `tailwindCssBuild` variable. To update it after making changes to your Tailwind configuration or utility classes:

1. **Ensure Node.js is installed** on your machine.

2. **Run the build script** (this will compile your Tailwind CSS and update the `tailwindCssBuild` variable):
```bash
  node src/scripts/javascript/css-build.js


Future Improvements

Implement functional filtering by genres and recently updated

Enhance modal scroll behavior and responsiveness

Add more functional programming improvements for pure data handling

Improve accessibility (keyboard navigation, ARIA roles)

Include validation testing and error catching

Optimize performance for very large datasets

Add customizable css attributes and real-time style updates via user inputs
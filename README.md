# Abstracted Vanilla JS Podcast App DSJ02

## Overview

This project is a **dynamic podcast app built with vanilla JavaScript and Tailwind CSS**. It allows users to browse podcasts, view detailed information in a modal, and explore season and episode data without leaving the page. The app demonstrates **object-oriented design, modular code, and clean front-end development practices**.

---

## Features

- **Landing Page**: Displays all available podcasts with:
  - Cover images
  - Podcast titles
  - Number of seasons
  - Genre names
  - Last updated date (human-readable format)

- **Podcast Modal**:
  - Opens when a podcast card is clicked
  - Shows larger cover image, title, description, genres
  - Lists seasons and episodes
  - Includes an exit button and overlay for focus

- **Data Handling**:
  - Uses **localStorage** for saving static data (podcasts, genres, seasons)
  - Combines relational arrays for easier access

- **Reusable Code**:
  - Object-oriented design with classes: `render`, `dataManager`, `relationalMapper`
  - Helper functions for formatting dates (`lastUpdated`, `updatedDate`)
  - Tailwind CSS with custom `@apply` classes for dynamically created elements

- **Responsive Design**:
  - Mobile-first layout with responsive grid for desktop
  - Scrollable modal content for long descriptions and multiple seasons

---

## Technologies Used

- **Vanilla JavaScript (ES6+)**
- **Tailwind CSS**
- **HTML5 & CSS3**
- **LocalStorage API** for data persistence

---

## File Structure

project-root/
│
├─ src/
│ ├─ scripts/
│ │ ├─ index.js # Main entry point
│ │ ├─ render.js # Class for rendering podcasts and modals
│ │ ├─ data-handling.js # Class for saving/loading data
│ │ ├─ relational-mapper.js # Combines relational data
│ │ ├─ helpers.js # Utility functions (dates, formatting)
│ │ └─ data.js # Static podcast, genre, season arrays
│ │
│ ├─ styles/
│ │ └─ stylesheets/
│ │ └─ output.css # Tailwind compiled CSS
│ │
│ └─ images/ # Podcast cover images and exit button
│
└─ index.html


## How to Use

Follow these steps to get the Podcast App running locally and make changes to the Tailwind CSS:

### Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
Install Dependencies
This project uses Tailwind CSS. Make sure you have Node.js installed, then run:

bash
Copy code
npm install
This will install Tailwind CSS and any other required packages.

Build the CSS
Tailwind needs to compile your styles into a single CSS file for the browser. You can build it using:

bash
Copy code
npx tailwindcss -i ./src/styles/stylesheets/input.css -o ./src/styles/stylesheets/output.css

html
Copy code
<link rel="stylesheet" href="src/styles/stylesheets/output.css">
Open the App
Open index.html in your browser:

Browse podcasts on the landing page

Click a podcast card to view details in a modal

Scroll through season and episode information

Close the modal using the exit button


Future Improvements
Implement filtering by genres and recently updated.

Improve modal scroll behavior and responsiveness.

Add functional programming improvements for pure data handling.

Enhance accessibility (keyboard navigation).

Include validation testing and error catching.
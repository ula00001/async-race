# Async Race

## Deploy

https://ula00001.github.io/async-race/

## Score: 340 / 400 points

---

## Project Overview

Async Race is a Single Page Application (SPA) for managing a collection of cars, running drag races, and tracking winners statistics.

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Vite
- CSS Modules
- ESLint (Airbnb)
- Prettier

## ✅ Requirements to Commits and Repository

- [x] **Commit guidelines compliance:** Ensure that all commits follow the specified commit guidelines, thereby promoting a clear and consistent commit history. This includes using meaningful commit messages that accurately describe the changes made.

- [x] **Checklist included in README.md:** Include the project's checklist in the README.md file. Mark all implemented features to provide a clear overview of the project's completion status.

- [x] **Score calculation:** Use this checklist to calculate your score. Check all implemented features, then calculate your score and put it at the top of the `README.md`.

- [x] **UI Deployment link in README.md**: Place the link to the deployed UI at the top of the README.md file, alongside the calculated score.

## Basic Structure (80 / 80 points)

- [x] **Two Views (10 points):** Implemented primary navigation views: "Garage" and "Winners".
- [x] **Garage View Content (30 points):** The "Garage" view must display:
  - [x] Name of view
  - [x] Car creation and editing panel
  - [x] Race control panel
  - [x] Garage section
- [x] **Winners View Content (10 points):** The "Winners" view should display:
  - [x] Name of view ("Winners")
  - [x] Winners table
  - [x] Pagination
- [x] **Persistent State (30 points):** Ensure the view state remains consistent when navigating between views. This includes preserving page numbers and input states. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc.

## Garage View (80 / 90 points)

- [x] **CRUD Operations (20 points):** Create, update and delete cars functionality implemented.
- [x] **Color Selection (10 points):** RGB color picker integrated with car rendering.
- [x] **Random Car Creation (20 points):** Generates random cars with random names and colors.
- [x] **Car Management (10 points):** Edit and delete actions implemented for every car.
- [x] **Empty Garage (10 points - EXTRA):** Empty garage state implemented.
- [ ] **Empty Page Redirect (10 pts - EXTRA)**
- [x] **Pagination (10 points):** Implement pagination for the "Garage" view, displaying 7 cars per page.

## Race Simulation & Animations (120 / 170 points)

- [x] **Start Engine Animation (20 points):** Starts engine request, calculates duration and starts animation. Stops animation if engine drive request fails.
- [x] **Stop Engine Animation (20 points):** Stops engine and resets car position.
- [x] **Responsive Animation (30 points):** Responsive animations implemented for small screens.
- [x] **Start Race Button (10 points):** Starts race for all cars on current page.
- [x] **Reset Race Button (15 points):** Resets active race and car positions.
- [x] **Winner Announcement (5 points):** Displays winner message after race completion.
- [x] **Button States (20 points):** Correct disabled/enabled states during race process.
- [ ] **Race Interrupt Actions (50 pts)**

## Winners View (50 / 50 pts)

- [x] **Display Winners (15 pts):** Winners are added to winners table after race completion.
- [x] **Pagination for Winners (10 pts):** Winners pagination implemented (10 items per page).
- [x] **Winners Table (15 pts):** Displays wins count and best race time.
- [x] **Sorting Functionality (10 pts):** Server-side sorting implemented.

## Code Quality & Standards (10 / 10 pts)

- [x] **Prettier Setup (5 pts):** `format` and `ci:format` scripts configured.
- [x] **ESLint Configuration (5 pts):** ESLint configured with Airbnb style guide and strict TypeScript settings.

# Running Locally

## 1. Clone repository

```bash
git clone <https://github.com/ula00001/async-race.git>
cd async-race
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run development server

```bash
npm run dev
```

## 4. Lint and format checks

```bash
npm run lint
npm run ci:format
```

## 5. Build for production

```bash
npm run build
```

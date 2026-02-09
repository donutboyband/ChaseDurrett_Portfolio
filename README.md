# Chase Durrett — Portfolio

Personal portfolio website built with **SvelteKit**, **TypeScript**, and **Tailwind CSS**.

## Overview

This site serves as a showcase for my work and experience. It features a custom design system using the **Cabinet Grotesk** variable font, dark mode support, and interactive data visualizations.

### Key Features

* **GitHub Integration:** The Work page dynamically fetches public repositories via the GitHub API. It filters out forks/private repos and implements server-side caching (`max-age=7200`) to manage rate limits.
* **Interactive Globe:** The Contact page features a custom D3.js + TopoJSON orthographic globe that renders flight arcs to specific coordinates.
* **Animations:**
* **GSAP:** Used for scroll-triggered timeline animations on the homepage.
* **Physics:** A custom `MouseBlob` component uses spring physics for cursor interaction.
* **Transitions:** Native Svelte transitions (`fly`, `fade`, `slide`) for navigation.


* **Theming:** Persisted light/dark mode with system preference detection.

## Stack

* **Framework:** SvelteKit (Svelte 4)
* **Styling:** Tailwind CSS
* **Visualization:** D3.js, TopoJSON
* **Motion:** GSAP, Svelte Motion
* **Type Safety:** TypeScript

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

```

## Project Structure

* `src/routes/work`: Server-side API fetching logic.
* `src/routes/contact`: D3 globe implementation.
* `src/lib/components`: Reusable UI components (ChipButton, Header, Footer).
* `src/lib/stores`: State management (Theme store).

---

© donutboyband
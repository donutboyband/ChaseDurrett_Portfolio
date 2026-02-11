# Chase Durrett — Portfolio

Personal portfolio website built with **Vite**, **React**, **TanStack Router**, **TypeScript**, and **Tailwind CSS**.

## Overview

This site serves as a showcase for my work and experience. It features a custom design system using the **Cabinet Grotesk** variable font, dark mode support, and interactive data visualizations.

### Key Features

* **GitHub Integration:** The Work page dynamically fetches public repositories via the GitHub API using TanStack Router loaders. It filters out forks/private repos.
* **Interactive Globe:** The Contact page features a custom D3.js + TopoJSON orthographic globe that renders flight arcs to specific coordinates.
* **Animations:**
  * **GSAP:** Used for scroll-triggered timeline animations on the homepage.
  * **Physics:** A custom `MouseBlob` component uses spring physics for cursor interaction.
  * **CSS Transitions:** Smooth page transitions and hover effects.

* **Theming:** Persisted light/dark mode with system preference detection using React Context.

## Stack

* **Framework:** React 18
* **Routing:** TanStack Router (file-based routing)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Visualization:** D3.js, TopoJSON
* **Motion:** GSAP
* **Type Safety:** TypeScript

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

* `src/routes/`: File-based routes (TanStack Router)
* `src/components/`: Reusable UI components (ChipButton, Header, Footer, MouseBlob)
* `src/contexts/`: React Context providers (ThemeContext)

---

© donutboyband
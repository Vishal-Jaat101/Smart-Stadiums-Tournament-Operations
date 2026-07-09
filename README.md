# CONCOURSE - GenAI Smart Stadium Operations Platform

CONCOURSE is a command-center web app designed for stadium operators, volunteers, and operations staff during the 2026 FIFA World Cup. It provides real-time crowd dynamics tracking, AI multi-agent activity orchestration, multilingual speech-to-speech translation, logistics monitoring, and Monte Carlo bottleneck forecasting.

Submitted to **PromptWars Virtual Challenge 4: Smart Stadiums & Tournament Operations**.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (v9 or higher)

### Setup & Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd ConCourse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up your Gemini API Key in a `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *Note: If no API key is specified, the application automatically falls back to the interactive, fully keyless offline simulation engine for judging compatibility.*

4. Launch the local development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## ⚙️ Technical Architecture

CONCOURSE utilizes a clean, modern decoupled React + TypeScript architecture:

```
+-------------------------------------------------------------------------------+
|                                  React App                                    |
|  +-------------------------------------------------------------------------+  |
|  |                           useConcourseState                             |  |
|  |           (Unified Context Hook: State & Dispatch Operations)           |  |
|  +----------------------------------------------------+--------------------+  |
|                                                       |                       |
|           +-------------------------------------------+-----------+           |
|           |                                                       |           |
|  +--------v--------+                                     +--------v--------+  |
|  |   Components    |                                     |   Data Layer    |  |
|  |  - Header       |                                     | - mockData.ts   |  |
|  |  - StadiumBowl  |                                     |                 |  |
|  |  - AgentRail    |                                     |                 |  |
|  |  - Panels/Views |                                     |                 |  |
|  +-----------------+                                     +-----------------+  |
+-------------------------------------------------------------------------------+
```

### Key Modules & Files
- **`src/data/mockData.ts`**: Grounding seed data containing real 2026 FIFA venues (Estadio Azteca risk profiles, AT&T Dallas heat thresholds, Mercedes-Benz Atlanta waste diversion baselines), knockout timelines, cyber threats, and transit lines.
- **`src/hooks/useConcourseState.ts`**: Central state engine. Wireframes the digital twin simulation variables, logs agent interactions, and processes operator actions.
- **`src/components/StadiumBowl.tsx`**: Radial top-down SVG rendering of the stadium divided into wedges. Highlights density status, live waypoint routing (including stairless paths), and real-time alternate gate rerouting.
- **`src/components/AgentRail.tsx`**: Left sidebar activity logging representing the Multi-Agent ADK (LLM reasoning nodes, Workflow sequence orchestrators, and Custom tools).
- **`src/components/RightPanel.tsx`**: Combines the wayfinding path directions with the Gemini Live translation panel (audio simulation, emotion matching, auto-detect language).

---

## 🎨 Design System & Accessibility

- **Stadium Night Charcoal** (`#12151A`): Primary dark backdrop.
- **Floodlight White** (`#F5F7FA`): Text and component outlines.
- **Turf Green** (`#2F8F5B`): Safe / Normal status.
- **Floodlight Amber** (`#E8A93D`): Warning / Caution status.
- **Alert Red-Orange** (`#D9483C`): Danger / Critical density status.
- **Point-Cloud Cyan** (`#3FA9D6`): LiDAR raw spatial sensors overlay.
- **Scoreboard display face**: Oswald bold condensed.
- **Multilingual UI face**: Noto Sans (covers Arabic, Chinese, Korean, Spanish).
- **Accessibility**: Includes a High Contrast filter overlay, accessible ramp/elevator routing, screen-reader labels, and prefers-reduced-motion overrides.

# Weather Plan - Activity plan + React learning project

Target role focus: Software Engineer (Data Apps + FrontEnd)

## Project Vision

Build an app where a user selects:

- Location
- Date
- Activity (for example: hiking, kayaking)

And gets a recommendation:

- `Go`
- `Caution`
- `No-Go`

The recommendation should always include explainable reasons (for example: "high wind for kayaking", "clear and mild for hiking").

The app includes:

- Real weather + marine dashboard experience (search, forecast, trends, saved locations).
- React learning modules that cover core-to-advanced React patterns.
- Production-style quality: accessibility, testing, performance, and reliability.

## Core Product Rules (Domain Logic)

- [ ] Define activity profiles with thresholds (hiking, kayaking, surfing).
- [ ] Score weather conditions against each profile.
- [ ] Return `Go` / `Caution` / `No-Go` with short reasons.
- [ ] Handle uncertainty when data is missing (especially marine data).
- [ ] Prioritize safety when severe conditions are detected.

## Feature Roadmap

Use this as the living checklist whenever you come back to the project.

### Phase 0 - Foundation Setup

- [ ] Replace starter app with a clean app shell and layout.
- [ ] Add routes for sections: Dashboard, Learning Lab, About.
- [ ] Add code formatting/linting baseline and consistent project structure.
- [ ] Add README sections for setup, architecture, and progress tracking.

### Phase 1 - React Basics (Components, Props, JSX)

- [ ] Build reusable UI components (Button, Card, Input, SectionHeader).
- [ ] Implement props-driven components for weather + activity cards.
- [ ] Practice composition patterns with `children` and layout wrappers.
- [ ] Add empty-state and placeholder components.

### Phase 2 - State, Events, and Forms

- [ ] Add location search form (controlled input).
- [ ] Add activity selector and date selector.
- [ ] Implement unit toggle (C/F) and theme toggle (light/dark).
- [ ] Add event-driven interactions (save location, remove location, refresh).
- [ ] Add form validation and user feedback messages.

### Phase 3 - Conditional Rendering and Lists

- [ ] Show loading, error, and success states cleanly.
- [ ] Render hourly/daily forecast lists with stable keys.
- [ ] Add conditional UI for no data, partial data, and offline cases.
- [ ] Add recommendation states (`Go`, `Caution`, `No-Go`) and reason chips.

### Phase 4 - Effects and Async Data Fetching

- [ ] Fetch weather data from API with robust error handling.
- [ ] Fetch marine data where required (wind, waves, swell, etc.).
- [ ] Use `useEffect` for API lifecycle and cleanup.
- [ ] Add debounced search to reduce unnecessary requests.
- [ ] Separate API layer from presentation components.

### Phase 5 - Advanced Hooks and Custom Hooks

- [ ] Use `useMemo` for derived data (trend summaries, plan score, computed labels).
- [ ] Use `useCallback` for stable handlers passed to child components.
- [ ] Use `useRef` for focus management and interaction polish.
- [ ] Create custom hooks: `useWeather`, `useMarine`, `usePlanScore`, `useGeolocation`, `useDebounce`.

### Phase 6 - Context and Reducer Patterns

- [ ] Add app-wide context for preferences (units, theme, default city, default activity).
- [ ] Use `useReducer` for predictable global state transitions.
- [ ] Document why local state vs context is used per feature.

### Phase 7 - Routing and Navigation

- [ ] Add nested routes for Learning Lab modules.
- [ ] Add route params (e.g., location detail pages, activity detail pages).
- [ ] Add not-found route and graceful fallback navigation.

### Phase 8 - Performance and Reliability

- [ ] Add `React.memo` selectively for heavy subtrees.
- [ ] Add lazy-loaded sections with `React.lazy` + `Suspense`.
- [ ] Add error boundary for runtime UI failures.
- [ ] Add caching strategy and retry behavior (when query library is added).

### Phase 9 - Accessibility and UX Quality

- [ ] Ensure semantic HTML and keyboard accessibility across views.
- [ ] Add proper labels, `aria-*` attributes, and focus states.
- [ ] Verify color contrast and responsive behavior on mobile/tablet/desktop.
- [ ] Improve loading UX with skeletons instead of plain spinners.

### Phase 10 - Testing

- [ ] Unit test utility functions and data transformers.
- [ ] Unit test activity-threshold and scoring logic.
- [ ] Test custom hooks behavior and edge cases.
- [ ] Add integration tests for key user journeys.
- [ ] Add one end-to-end flow: select location + date + activity -> get recommendation -> save plan.

### Phase 11 - Product + Demo Polish

- [ ] Add architecture diagram and data flow explanation in docs.
- [ ] Add decision log (tradeoffs and alternatives considered).
- [ ] Add measurable performance notes and improvements made.
- [ ] Prepare 3-5 demo stories to present in product walkthrough format.

## Primary User Journeys

- [ ] "Can I hike in this area this Saturday?"
- [ ] "Is kayaking safe at this beach tomorrow morning?"
- [ ] "Compare two locations for the same activity and day."
- [ ] "See why recommendation changed from `Go` to `Caution`."

## React Feature Coverage Checklist

Mark these off as they are demonstrated in code:

- [ ] JSX and component composition
- [ ] Props and lifted state
- [ ] `useState`
- [ ] `useEffect`
- [ ] `useRef`
- [ ] `useMemo`
- [ ] `useCallback`
- [ ] `useContext`
- [ ] `useReducer`
- [ ] Custom hooks
- [ ] Controlled forms
- [ ] Conditional rendering
- [ ] List rendering and keys
- [ ] Client-side routing
- [ ] Code splitting (`React.lazy`, `Suspense`)
- [ ] Error boundaries
- [ ] Accessibility best practices
- [ ] Testing with React Testing Library/Vitest
- [ ] Domain modeling and derived recommendation state

## Suggested Weekly Cadence

- Week 1: Phases 0-2
- Week 2: Phases 3-5
- Week 3: Phases 6-8
- Week 4: Phases 9-11 + product demo prep

## "What Should I Work On Today?"

When you sit down, use this quick order:

1. Pick one unchecked item from the current phase.
2. Implement it with clean commits.
3. Add/update tests for it.
4. Update this README checklist.
5. Note one tradeoff or lesson learned.

## Current Status

- [ ] Foundation started
- [ ] Data layer started
- [ ] Learning Lab started
- [ ] Testing baseline started
- [ ] Product polish started

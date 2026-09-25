# Frontend conventions (client/)

- React 18 function components, JavaScript with JSX. Named exports for components;
  pages use a default export. Import with the `@/` alias (`@/components/ui`).
- Data flow: component -> `@/api` -> server or fixture. Never `fetch` in a component,
  never import from `src/mocks` outside `src/api` (ESLint blocks it).
- Shared workflow state (projectId, approved, qaPassed...) comes from `useProject()`.
  Feature data stays local to the feature (useState / useAsync).
- Loading: `useAsync(loader, deps)`. Polling: `usePolling(fn, ms)`.
- UI kit first: `Button`, `GlassPanel`, `Modal`, `Tabs`, `StatusBadge`, `Spinner`,
  `EmptyState`, `ErrorNotice` from `@/components/ui`. Extend the kit (Person 1) rather
  than re-creating a button or badge in a feature folder.
- Styling: plain CSS file next to the component, class names prefixed by the feature
  (`qa-`, `play-`, `hub-`, `sdd-`). Colors, spacing, radii and fonts only through the
  CSS variables in `src/styles/tokens.css` - no raw hex values in feature CSS.
- Dark glassmorphism: `.glass` surfaces, IBM Blue `var(--ibm-blue)` for primary actions.
- Accessibility: real buttons for actions, labels on inputs, keyboard reachable,
  respect `prefers-reduced-motion`.
- Remove the `<FeatureStub>` wrapper once the real UI is in place.
- Charts use `recharts`; markdown uses `react-markdown`. Ask before adding a dependency.

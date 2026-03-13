# Visa Application Tracking Dashboard

A CRM-style visa application detail page built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

---

## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Install & Run

```bash
# 1. Clone the repository
git clone <repo-url>
cd visa-application-case

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Other Commands

```bash
npm run build      # Production build (output: dist/)
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## Architecture Decisions

### 1. Component Structure

The application is split into focused, single-responsibility components:

| Component | Responsibility |
|---|---|
| `StageProgressBar` | Renders the 5-stage pipeline (completed / current / pending) |
| `TravelerSidebar` | Traveler info, appointment countdown, related applications |
| `DocumentManagement` | Document list with loading / error / success states |
| `InternalNotes` | Staff-only notes with add functionality |
| `CommunicationLog` | Read-only email/SMS log |
| `MoveToNextStageModal` | Stage transition confirmation dialog |

All state (stages, documents, modal visibility) lives in `App.tsx` and is passed down as props. This keeps components stateless and reusable, with the exception of `InternalNotes` which manages its own local list state since notes are self-contained.

### 2. shadcn/ui Integration

Rather than building native HTML buttons and inputs, shadcn/ui primitives are used throughout:

- `Button` — all interactive actions (variants: `default`, `outline`, `ghost`, `icon`)
- `Badge` — document status (Uploaded / Missing / Revision Requested) and application statuses
- `Input` — navbar search bar
- `Textarea` — internal notes input
- `Dialog` — Move to Next Stage modal and revision note viewer
- `Tooltip` — disabled state explanation on the final stage button
- `Separator` — sidebar section dividers

shadcn/ui was configured manually (no CLI) since the project uses Vite + React without Next.js. Path alias `@/` maps to `./src/` in both `vite.config.ts` and `tsconfig.app.json`.

### 3. i18n (Internationalization)

All UI strings are externalized to `src/messages/en.json`. A lightweight custom hook (`useTranslation`) handles key lookup with `{{param}}` interpolation — no external library needed.

```ts
const { t } = useTranslation();
t('moveStageModal.question', { current: 'Document Collection', next: 'Appointment Booking' })
// → "Are you sure you want to move this application from Document Collection to Appointment Booking?"
```

This makes the app ready for multi-language support by simply adding new locale files.

### 4. Document Loading Simulation

`fetchDocuments()` in `src/utils/documents.ts` simulates a real API call:
- **1–2 second random delay** — triggers the loading skeleton UI
- **30% random failure rate** — surfaces the error state with a Retry button

This approach allows all three UI states (loading, error, success) to be exercised without a backend.

### 5. Role-Based Access Control (Extensibility)

The current implementation renders all actions for every user. To add role-based access (e.g. `viewer` vs `manager`), a `useRole()` hook or a React context can be introduced and passed to components that need conditional rendering — without restructuring the component tree. For example:

```ts
const { role } = useRole();
{role === 'manager' && <Button>Move to Next Stage</Button>}
```

### 6. Real-Time Updates (Extensibility)

For production, `InternalNotes` and `CommunicationLog` could subscribe to a WebSocket or use polling via `setInterval` inside a `useEffect`. The current mock data structure is already shaped to match what a real API would return, so the transition would only require replacing `fetchDocuments()` and the notes `useState` with API calls.

### 7. Styling Approach

A hybrid approach is used:
- **Tailwind CSS utility classes** — for layout and spacing
- **Custom CSS in `App.css`** — for complex component-specific styles (stage progress bar, document rows, appointment countdown, etc.)
- **shadcn CSS variables** in `index.css` — for theming tokens (`--primary`, `--border`, `--radius`, etc.)

This avoids deeply nested Tailwind class strings in JSX while keeping design tokens centralized.

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

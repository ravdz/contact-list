# Contact List

A React application that displays a paginated, selectable list of contacts.

## Overview

The app fetches contact data in batches and lets users browse, load more items, and select contacts. Selected contacts are visually highlighted and pinned to the top of the list. The implementation focuses on clear UX (loading and error states, retry on failure) and on list performance when selecting, deselecting, and scrolling.

## Tech Stack

- **React** with **TypeScript**
- **Create React App**
- **Testing Library** (React, user-event, jest-dom) for component tests

Dependencies are kept minimal; the code is written manually without extra libraries beyond what is needed.

## Features

The application implements the following behaviour (aligned with the original specification):

1. **Paginated data** — Contacts are fetched using the `apiData` function, with 10 items per batch.
2. **Load more** — A “Load more” button at the bottom of the list fetches the next batch and appends it to the existing list.
3. **Loading state** — A spinner/loader is shown while a batch is being fetched.
4. **Error state** — When a fetch fails, an error state is shown with an option to refetch the failed batch (e.g. “Try again”).
5. **Selectable cards** — Each contact card is clickable and can be selected.
6. **Selected styling** — Selected contacts have a visible outline (or equivalent visual distinction).
7. **Deselection** — Clicking a selected card again deselects it.
8. **Selected at top** — Selected contacts are displayed at the top of the list.
9. **Performance** — The list is optimized for smooth interaction when selecting, deselecting, and scrolling.

Design and layout follow the provided pattern, with UX in mind.

## Tests

The project includes functional/unit tests in `src/tests/ContactList.test.tsx`. They cover:

- Pagination (10 items per batch)
- “Load more” button fetching and appending the next batch
- Loading state visibility
- Error state and “Try again” refetch
- Card selection and deselection
- Selected cards having the correct outline/class
- Selected contacts appearing at the top of the list

Run tests:

```bash
yarn test
```

## Getting Started

### Prerequisites

- Node.js
- Yarn (or npm)

### Install and run

```bash
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for production

```bash
yarn build
```

The built app is output to the `build` folder.

## Project Structure

The UI is organized using an atomic-style structure:

- **atoms** — Button, Heading, PersonAvatar, Spinner, Text
- **molecules** — ContactItem, ErrorState, LoadingState
- **organisms** — ContactList (orchestrates data fetching, pagination, selection, and list order)

Data is fetched via `src/api.ts`; types are defined in `src/types.ts`.

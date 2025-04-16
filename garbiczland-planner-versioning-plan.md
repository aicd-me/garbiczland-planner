# Garbiczland Planner: Versioning & Sharing Feature Plan

## Objective

Enable users to:
- Save multiple versions of their planning to a remote server
- Restore any saved version at any time
- Share versions with others via unique links
- Manage versions through a sidebar UI

---

## 1. Backend API (Remote Server)

**Endpoints:**
- `POST /api/versions` — Save a new version (returns unique version ID)
- `GET /api/versions/:id` — Retrieve a version by ID
- `GET /api/versions?user=xyz` — List all versions for a user (if authentication is used)
- `DELETE /api/versions/:id` — Delete a version

**Data Model:**
- `id` (unique, for sharing)
- `userId` (optional, for user-specific storage)
- `name` (user-given, e.g. "Festival Plan v1")
- `description` (optional)
- `timestamp`
- `data` (the serialized planning state: zoneItems, scenarios, shapes, usedColors, currentScenario, backgroundImageUrl)

**Authentication:** (optional, for private versions)
- Could use anonymous tokens, OAuth, or skip for public sharing

---

## 2. Frontend Integration

**API Client:**  
JS functions to call the backend endpoints (using fetch/AJAX)

**Version Management Logic:**
- Save current state as a new version (with name/description)
- List all saved versions (with metadata)
- Restore a version (replace current state)
- Delete a version
- Generate a shareable link (e.g., `/planner?version=abc123`)
- On app load, if a version ID is in the URL, fetch and load that version

---

## 3. UI/UX Changes

**Sidebar for Version Management:**
- List of saved versions (name, timestamp, description, share button, delete button, restore button)
- "Save Current Version" button (opens modal for name/description)
- "Share" button for each version (copies link to clipboard)
- Highlight the currently loaded version

**Modal Dialogs:**
- For naming/saving a new version
- For confirming deletion

---

## 4. State Management

- When a version is loaded, replace the current app state with the version's data
- If the user edits the plan after loading a version, prompt to save as a new version (to avoid overwriting)
- Optionally, keep local autosave for unsaved changes

---

## 5. Shareable Links

- Each version has a unique ID; the link format is `/planner?version=abc123`
- When visiting such a link, the app fetches and loads the version from the server

---

## Mermaid Diagram: System Overview

```mermaid
flowchart TD
    subgraph User Browser
        A[Sidebar: Version List]
        B[Save Version Button]
        C[Share Link Button]
        D[Load/Restore Version]
        E[Current Planning State]
    end
    subgraph Remote Server
        F[API: /api/versions]
        G[Version Storage (DB)]
    end

    A -- List Versions --> F
    B -- Save Version (POST) --> F
    D -- Load Version (GET) --> F
    C -- Get Shareable Link --> F
    F -- Store/Retrieve --> G
    F -- Return Data --> A
    F -- Return Data --> D
    F -- Return Link --> C
    E -- Save/Restore --> B
    E -- Save/Restore --> D
```

---

## Implementation Steps

1. **Backend**
   - Implement the API endpoints for version CRUD (Node.js/Express, Python/Flask, etc.)
   - Store version data in a database (MongoDB, SQLite, etc.)
   - Deploy the backend (can use free services for prototyping)

2. **Frontend**
   - Add API client functions for version management
   - Add sidebar UI for version list and actions
   - Add modal dialogs for save/delete/restore
   - Update state management to support loading/switching versions
   - Handle shareable links on app load

3. **Testing**
   - Test saving, restoring, deleting, and sharing versions
   - Test loading a version via a shareable link

---

## Optional Enhancements

- User authentication for private versions
- Version history/rollback
- Tagging or categorizing versions
- Export/import as JSON for offline backup

---

**Please review this plan. If you are pleased, I will request to switch to code mode to begin implementation.**
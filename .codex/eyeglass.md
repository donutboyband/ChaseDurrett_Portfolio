# Eyeglass Integration for Codex CLI

Eyeglass provides HTTP endpoints for interacting with UI elements selected in the browser.

## Base URL
`http://localhost:3300/api`

## Endpoints

### Wait for Request (blocking)
```
GET /api/wait?timeout=300000
```
Blocks until user selects an element. Returns markdown with element context.

### Get Current Focus
```
GET /api/focus
```
Returns the currently focused element as markdown.

### Update Status
```
POST /api/status
Content-Type: application/json

{"status": "fixing", "message": "Working on it..."}
```
Status values: `idle`, `pending`, `fixing`, `success`, `failed`

### Report Action
```
POST /api/action
Content-Type: application/json

{"action": "reading", "target": "src/components/Button.tsx"}
```
Actions: `reading`, `writing`, `searching`, `thinking`

### Send Thought
```
POST /api/thought
Content-Type: application/json

{"content": "I think we should use a CSS variable for this color..."}
```

### Get History
```
GET /api/history
```
Returns up to 5 previous focus requests.

## Workflow

1. Start the bridge: `npx eyeglass-bridge`
2. Call `GET /api/wait` to block until user selects an element
3. Make your changes based on the returned context
4. Call `POST /api/status` with `{"status": "success", "message": "Done!"}`
5. Loop back to step 2

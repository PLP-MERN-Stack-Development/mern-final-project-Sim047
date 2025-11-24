/* ================================================================== */
/* TAILWIND BASE                                                      */
/* ================================================================== */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ================================================================== */
/* THEME VARIABLES                                                    */
/* ================================================================== */

/* --- Light Theme (WhatsApp-style warm) --- */
:root.light {
  --bg: #f5f5f5;
  --bg-card: #ffffff;
  --bg-chat: #ece5dd;
  --text: #111;
  --text-light: #444;
  --primary: #25d366;
  --accent: #128c7e;

  --msg-mine: #d9fdd3;
  --msg-other: #ffffff;

  --border: #ddd;

  --date-bg: #d9d9d9;
  --status-bg: #ffffff;
}

/* --- Dark Theme --- */
:root.dark {
  --bg: #0f0f0f;
  --bg-card: #181818;
  --bg-chat: #1a1a1a;

  --text: #f0f0f0;
  --text-light: #aaa;

  --primary: #25d366;
  --accent: #0f5f4f;

  --msg-mine: #054640;
  --msg-other: #1f1f1f;

  --border: #333;

  --date-bg: #2e2e2e;
  --status-bg: #222;
}

/* Apply background and text color */
body {
  background: var(--bg);
  color: var(--text);
}

/* ================================================================== */
/* LAYOUT                                                             */
/* ================================================================== */

.layout {
  display: flex;
  gap: 1rem;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Main area */
.main {
  background: var(--bg-chat);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

/* ================================================================== */
/* MESSAGES                                                           */
/* ================================================================== */

.message {
  padding: 8px;
  border-radius: 12px;
  background: var(--msg-other);
  max-width: 70%;
}

.msg-mine {
  align-self: flex-end;
  background: var(--msg-mine);
}

.message .avatar {
  border-radius: 6px;
}

/* ================================================================== */
/* DATE SEPARATORS                                                    */
/* ================================================================== */

.card-date {
  background: var(--date-bg);
  color: var(--text);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 8px;
}

/* ================================================================== */
/* STATUS CHIP                                                        */
/* ================================================================== */

.card-status {
  background: var(--status-bg);
  border: 1px solid var(--border);
  padding: 2px 6px;
  border-radius: 6px;
}

/* ================================================================== */
/* INPUTS & BUTTONS                                                   */
/* ================================================================== */

.input {
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
}

.btn {
  background: var(--primary);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
}

.btn:hover {
  opacity: 0.9;
}

/* ================================================================== */
/* REACTIONS                                                          */
/* ================================================================== */

.reacted {
  background: var(--primary);
  color: #fff !important;
  border-color: var(--primary) !important;
}

/* ================================================================== */
/* SCROLLBAR (optional styling)                                      */
/* ================================================================== */

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}

/* ================================================================== */
/* CHAT COMPOSER                                                      */
/* ================================================================== */

.composer {
  border-top: 1px solid var(--border);
  padding-top: 0.5rem;
}

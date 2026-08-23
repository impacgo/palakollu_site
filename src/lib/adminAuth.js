const SESSION_KEY = "pt_admin_session";

// Frontend-only demo passcode. There is no server behind this — it exists
// purely so the admin UI can be reviewed before a real backend and
// server-side auth are built (see spec §49). Never treat this as security.
export const DEMO_PASSCODE = "palakollu2024";

export function isAdminAuthed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function loginAdmin(passcode) {
  if (passcode.trim() === DEMO_PASSCODE) {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private browsing / storage disabled */
    }
    return true;
  }
  return false;
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

const API_BASE = "/api";

// Simple event subscription for user state
const listeners = [];

function notify(user) {
  listeners.forEach(fn => fn(user));
}

const AuthService = {
  // PUBLIC_INTERFACE
  getUser() {
    /**
     * Returns the current user from localStorage, or null.
     */
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
    } catch {
      return null;
    }
  },

  // PUBLIC_INTERFACE
  subscribe(fn) {
    /**
     * Subscribe to auth changes
     */
    listeners.push(fn);
  },

  // PUBLIC_INTERFACE
  unsubscribe(fn) {
    /**
     * Unsubscribe from auth changes
     */
    const idx = listeners.indexOf(fn);
    if (idx >= 0) listeners.splice(idx, 1);
  },

  // PUBLIC_INTERFACE
  async login(email, password) {
    /**
     * Attempt login and set user state.
     */
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error(await res.text());
    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    notify(user);
    return user;
  },

  // PUBLIC_INTERFACE
  async register(name, email, password, role) {
    /**
     * Register new user. On success, returns user object (does NOT log in).
     */
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    });
    if (!res.ok) throw new Error(await res.text());
    const user = await res.json();
    return user;
  },

  // PUBLIC_INTERFACE
  logout() {
    /**
     * Log out the current user.
     */
    localStorage.removeItem("user");
    notify(null);
  }
};

export default AuthService;

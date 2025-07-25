const API_BASE = "/api";

// PUBLIC_INTERFACE
async function getDashboard(role) {
  /**
   * Get dashboard summary data based on user role.
   */
  const res = await fetch(`${API_BASE}/dashboard?role=${encodeURIComponent(role)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
async function getApplications(userId, role) {
  /**
   * Get all applications (citizen: own, officer: all under jurisdiction).
   */
  const res = await fetch(`${API_BASE}/applications?userId=${encodeURIComponent(userId)}&role=${encodeURIComponent(role)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
async function submitApplication(data) {
  /**
   * Submit a new land record application.
   */
  const res = await fetch(`${API_BASE}/applications`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
async function fetchGISData() {
  /**
   * Fetch land records GIS data.
   */
  const res = await fetch(`${API_BASE}/gis`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
async function uploadDocument(applicationId, type, file) {
  /**
   * Upload a document for an application.
   */
  const form = new FormData();
  form.append("type", type);
  form.append("file", file);
  const res = await fetch(`${API_BASE}/applications/${applicationId}/documents`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
async function makePayment(applicationId, amount) {
  /**
   * Initiate payment for an application.
   */
  const res = await fetch(`${API_BASE}/payments`, {
    method: "POST",
    body: JSON.stringify({ applicationId, amount }),
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
async function getNotifications(userId) {
  /**
   * Get current user's notifications.
   */
  const res = await fetch(`${API_BASE}/notifications?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default {
  getDashboard,
  getApplications,
  submitApplication,
  fetchGISData,
  uploadDocument,
  makePayment,
  getNotifications,
};

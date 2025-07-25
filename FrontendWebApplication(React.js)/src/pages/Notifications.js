import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ApiService from "../services/ApiService";
import { useTranslation } from "react-i18next";

// PUBLIC_INTERFACE
function Notifications() {
  /**
   * Shows notifications to the logged-in user.
   */
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }
    ApiService.getNotifications(user.id).then(setNotes).catch(() => setNotes([]));
    // For demo, also refresh every 30s
    const interval = setInterval(() => {
      ApiService.getNotifications(user.id).then(setNotes).catch(() => setNotes([]));
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  if (!user || !notes.length) return null;

  return (
    <div className="notifications">
      <h4>{t("Notifications")}</h4>
      <ul>
        {notes.map((n, idx) => <li key={idx}>{n.message}</li>)}
      </ul>
    </div>
  );
}

export default Notifications;

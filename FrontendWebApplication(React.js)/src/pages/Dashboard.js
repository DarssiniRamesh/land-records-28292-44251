import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import ApiService from "../services/ApiService";

// PUBLIC_INTERFACE
function Dashboard() {
  /**
   * Dashboard with summary data and applications table.
   */
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const dash = await ApiService.getDashboard(user.role);
        setDashboard(dash);
        const apps = await ApiService.getApplications(user.id, user.role);
        setApplications(apps);
      } catch {
        setDashboard(null);
        setApplications([]);
      }
      setLoading(false);
    }
    if (user) loadData();
  }, [user]);

  if (!user) return null;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h2>{t("Dashboard")}</h2>
      {dashboard && (
        <div className="dashboard-summary">
          <div>{t("Role")}: {t(user.role.charAt(0).toUpperCase() + user.role.slice(1))}</div>
          {/* Display summary info as per user.role */}
          {user.role === "officer" || user.role === "admin" ? (
            <>
              <div>{t("Applications")}: {dashboard.totalApplications || 0}</div>
              <div>{t("Pending")}: {dashboard.pending || 0}</div>
              <div>{t("Approved")}: {dashboard.approved || 0}</div>
              <div>{t("Rejected")}: {dashboard.rejected || 0}</div>
            </>
          ) : (
            <>
              <div>{t("Your Applications")}: {dashboard.myApplications || 0}</div>
            </>
          )}
        </div>
      )}

      <h3>{t("Applications")}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t("Status")}</th>
            <th>{t("Type")}</th>
            <th>{t("Amount")}</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{t(app.status)}</td>
              <td>{t(app.type)}</td>
              <td>{app.amount || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

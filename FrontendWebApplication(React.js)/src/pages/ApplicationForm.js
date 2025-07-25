import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import ApiService from "../services/ApiService";

// PUBLIC_INTERFACE
function ApplicationForm() {
  /**
   * Form to submit new land record applications (mutation, correction, etc.).
   */
  const { user } = useAuth();
  const { t } = useTranslation();
  const [appType, setAppType] = useState("Mutation Request");
  const [details, setDetails] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = {
        userId: user.id,
        type: appType,
        details,
      };
      await ApiService.submitApplication(data);
      setSuccess("Application submitted!");
      setDetails("");
    } catch (err) {
      setError(err.message || "Submission failed.");
    }
    setLoading(false);
  };

  if (!user || user.role !== "citizen") return <div>{t("Access denied.")}</div>;

  return (
    <div className="centered-form">
      <h2>{t("Apply")}</h2>
      <form onSubmit={onSubmit}>
        <label>
          {t("Type")}:<br />
          <select value={appType} onChange={e => setAppType(e.target.value)}>
            <option value="Mutation Request">{t("Mutation Request")}</option>
            <option value="Record Correction">{t("Record Correction")}</option>
            <option value="Land Type Conversion">{t("Land Type Conversion")}</option>
          </select>
        </label>
        <label>
          {t("Details")}:<br />
          <textarea value={details} required onChange={e => setDetails(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "..." : t("Submit")}
        </button>
      </form>
      {success && <div className="success">{t("Success")}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default ApplicationForm;

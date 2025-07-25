import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import ApiService from "../services/ApiService";

// PUBLIC_INTERFACE
function DocumentUpload() {
  /**
   * Citizen document upload for applications.
   */
  const { user } = useAuth();
  const { t } = useTranslation();
  const [applicationId, setApplicationId] = useState("");
  const [docType, setDocType] = useState("Identity Proof");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setError("");
    if (!file || !applicationId) {
      setError("Missing required fields.");
      setLoading(false);
      return;
    }
    try {
      await ApiService.uploadDocument(applicationId, docType, file);
      setStatus("Uploaded!");
      setFile(null);
    } catch (err) {
      setError(err.message || "Upload failed.");
    }
    setLoading(false);
  };

  if (!user || user.role !== "citizen") return <div>{t("Access denied.")}</div>;

  return (
    <div className="centered-form">
      <h2>{t("Upload Documents")}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Application ID:
          <input type="text" value={applicationId} required onChange={e => setApplicationId(e.target.value)} />
        </label>
        <label>
          {t("Document Type")}:
          <select value={docType} onChange={e => setDocType(e.target.value)}>
            <option value="Identity Proof">Identity Proof</option>
            <option value="Land Deed">Land Deed</option>
            <option value="Payment Receipt">Payment Receipt</option>
          </select>
        </label>
        <label>
          {t("Select file")}: <input type="file" onChange={e => setFile(e.target.files[0] || null)} />
        </label>
        <button type="submit" disabled={loading}>{loading ? "..." : t("Upload")}</button>
      </form>
      {status && <div className="success">{status}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default DocumentUpload;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import ApiService from "../services/ApiService";

// PUBLIC_INTERFACE
function Payments() {
  /**
   * Payments UI for initiating and viewing payments.
   */
  const { user } = useAuth();
  const { t } = useTranslation();
  const [applicationId, setApplicationId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setError("");
    try {
      await ApiService.makePayment(applicationId, amount);
      setStatus("Payment successful!");
      setApplicationId("");
      setAmount("");
    } catch (err) {
      setError(err.message || "Payment failed.");
    }
    setLoading(false);
  };

  return (
    <div className="centered-form">
      <h2>{t("Make Payment")}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Application ID:
          <input type="text" value={applicationId} required onChange={e => setApplicationId(e.target.value)} />
        </label>
        <label>
          {t("Amount")}:<br />
          <input type="number" min="1" value={amount} required onChange={e => setAmount(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>{loading ? "..." : t("Pay")}</button>
      </form>
      {status && <div className="success">{status}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Payments;

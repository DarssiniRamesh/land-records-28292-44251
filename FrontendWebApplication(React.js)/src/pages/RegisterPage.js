import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "../services/AuthService";
import { useAuth } from "../hooks/useAuth";

// PUBLIC_INTERFACE
function RegisterPage() {
  /**
   * Registration page UI and logic.
   */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("citizen");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  if (user) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await AuthService.register(name, email, password, role);
      setSuccess("Registered successfully. Please login.");
      setTimeout(() => history.push("/login"), 1200);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="centered-form">
      <h2>{t("Register")}</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          {t("Name")}:<br />
          <input type="text" value={name} required onChange={e => setName(e.target.value)} />
        </label>
        <label>
          {t("Email")}:<br />
          <input type="email" value={email} required onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          {t("Role")}:<br />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="citizen">{t("Citizen")}</option>
            <option value="officer">{t("Officer")}</option>
            <option value="admin">{t("Admin")}</option>
          </select>
        </label>
        <label>
          {t("Password")}:<br />
          <input type="password" value={password} required onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm {t("Password")}:<br />
          <input type="password" value={confPassword} required onChange={e => setConfPassword(e.target.value)} />
        </label>
        <button type="submit">{t("Register")}</button>
      </form>
    </div>
  );
}

export default RegisterPage;

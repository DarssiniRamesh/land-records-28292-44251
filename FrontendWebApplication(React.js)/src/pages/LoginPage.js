import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "../services/AuthService";
import { useAuth } from "../hooks/useAuth";

// PUBLIC_INTERFACE
function LoginPage() {
  /**
   * Login page UI and logic.
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, user } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  if (user) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const u = await AuthService.login(email, password);
      setUser(u);
      history.push("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="centered-form">
      <h2>{t("Login")}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          {t("Email")}:<br />
          <input type="email" value={email} required onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          {t("Password")}:<br />
          <input type="password" value={password} required onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">{t("Login")}</button>
      </form>
    </div>
  );
}

export default LoginPage;

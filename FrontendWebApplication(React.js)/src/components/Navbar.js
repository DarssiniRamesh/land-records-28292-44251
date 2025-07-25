import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import AuthService from "../services/AuthService";

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * Navigation bar for public & dashboard views.
   */
  const { user, setUser } = useAuth();
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const onLogout = () => {
    AuthService.logout();
    setUser(null);
    history.push("/login");
  };

  const switchLang = () => {
    i18n.changeLanguage(i18n.language === "en" ? "hi" : "en");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/dashboard">{t("Dashboard")}</Link>
        {user && user.role === "citizen" && (
          <>
            <Link to="/apply">{t("Apply")}</Link>
            <Link to="/map">{t("Map")}</Link>
            <Link to="/upload">{t("Upload")}</Link>
            <Link to="/payments">{t("Payments")}</Link>
          </>
        )}
        {user && (user.role === "officer" || user.role === "admin") && (
          <>
            <Link to="/map">{t("Map")}</Link>
            <Link to="/payments">{t("Payments")}</Link>
          </>
        )}
      </div>
      <div className="nav-right">
        <button type="button" onClick={switchLang}>
          {i18n.language === "en" ? t("Hindi") : t("English")}
        </button>
        {!user && (
          <>
            <Link to="/login">{t("Login")}</Link>
            <Link to="/register">{t("Register")}</Link>
          </>
        )}
        {user && (
          <>
            <span>{t("Welcome")}, {user.name} ({t(user.role.charAt(0).toUpperCase() + user.role.slice(1))})</span>
            <button type="button" onClick={onLogout}>{t("Logout")}</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ApplicationForm from "./pages/ApplicationForm";
import GISMap from "./pages/GISMap";
import DocumentUpload from "./pages/DocumentUpload";
import Payments from "./pages/Payments";
import Notifications from "./pages/Notifications";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import "./App.css";

// PUBLIC_INTERFACE
function PrivateRoute({ children, roles, ...rest }) {
  /**
   * A private route that only allows access to authenticated users with (optional) roles.
   */
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && (!roles || roles.includes(user.role)) ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main entry point with router, navigation, and layout.
   */
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Notifications />
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/apply">
              <ApplicationForm />
            </PrivateRoute>
            <PrivateRoute path="/map">
              <GISMap />
            </PrivateRoute>
            <PrivateRoute path="/upload">
              <DocumentUpload />
            </PrivateRoute>
            <PrivateRoute path="/payments">
              <Payments />
            </PrivateRoute>
            <Route path="*">
              <div style={{ padding: "2em" }}>{t("Not Found")}</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ApiService from "../services/ApiService";

// PUBLIC_INTERFACE
function GISMap() {
  /**
   * Simple GIS visualization (static, since no persistent data).
   * In production, would embed something like Leaflet/Mapbox with plot overlay.
   */
  const { t } = useTranslation();
  const mapRef = useRef();

  useEffect(() => {
    // Simple map representation, in a real app use Leaflet/Google Maps, etc.
    const canvas = mapRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e8f3d6";
    ctx.fillRect(0, 0, 350, 250);
    // Mock up some land plots
    ctx.strokeStyle = "#377d22";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 50, 80, 70);
    ctx.strokeRect(160, 60, 110, 90);
    ctx.strokeRect(80, 140, 100, 50);
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#444";
    ctx.fillText("Plot A", 62, 65);
    ctx.fillText("Plot B", 162, 75);
    ctx.fillText("Plot C", 82, 157);
  }, []);

  return (
    <div className="centered-form">
      <h2>{t("Map")}</h2>
      <canvas ref={mapRef} width={350} height={250} style={{ border: "1px solid #888" }}>
        GIS Map
      </canvas>
      {/* In production, fetch from ApiService.fetchGISData() and show overlays */}
    </div>
  );
}

export default GISMap;

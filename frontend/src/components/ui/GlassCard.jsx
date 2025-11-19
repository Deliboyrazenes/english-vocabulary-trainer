import React from "react";
import styles from "./GlassCard.module.css";

export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`${styles.glassCard} ${className}`}>
      {children}
    </div>
  );
}
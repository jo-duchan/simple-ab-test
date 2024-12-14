"use client";

import React from "react";
import styles from "./ProtoDemoStateView.module.scss";
import useAnalyticsStore from "@/store/prototype-analytics-store";

export default function ProtoDemoStateView() {
  const { data } = useAnalyticsStore();
  return (
    <div className={styles.container}>
      <div>some state...</div>
    </div>
  );
}

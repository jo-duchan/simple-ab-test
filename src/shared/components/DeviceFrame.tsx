import React from "react";
import styles from "./DeviceFrame.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function DeviceFrame({ children }: Props) {
  return <div className={styles["device-frame"]}>{children}</div>;
}

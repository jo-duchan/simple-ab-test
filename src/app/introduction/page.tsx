import React from "react";
import styles from "./page.module.scss";
import FigmaPrototype from "@/shared/components/FigmaPrototype";
import DeviceFrame from "@/shared/components/DeviceFrame";
import ProtoDemoStateView from "./components/ProtoDemoStateView";

export default function Page() {
  return (
    <div className={styles.container}>
      <DeviceFrame>
        <FigmaPrototype
          url="https://www.figma.com/proto/iIwEmaTF9xhYmyNdgqjL1b/test11?node-id=346-16&t=S7NEQeRXmWJH95DP-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=346%3A16&show-proto-sidebar=1"
          lastNodeId="346:19"
          isDeviceFrame
        />
      </DeviceFrame>
      <ProtoDemoStateView />
    </div>
  );
}

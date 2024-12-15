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
          url="https://www.figma.com/proto/BvoAQg077j9Qe1XiBIs50N/Simple-A%2FB-Test?node-id=8-59&p=f&t=rKpdKaDt40KPlqdv-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A3532"
          lastNodeId="8:59"
          isDeviceFrame
        />
      </DeviceFrame>
      <ProtoDemoStateView />
    </div>
  );
}

import React from "react";
import styles from "./page.module.scss";
import FigmaPrototype from "@/shared/components/FigmaPrototype";

export default function Page() {
  return (
    <div className={styles.container}>
      <h3>Introduction Page</h3>
      <FigmaPrototype
        url="https://www.figma.com/proto/iIwEmaTF9xhYmyNdgqjL1b/test11?node-id=7-3&node-type=frame&t=Vvt0RLmYtybsltha-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A3"
        lastNodeId="222:2"
      />
    </div>
  );
}

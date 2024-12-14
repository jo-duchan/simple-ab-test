"use client";

import React from "react";
import styles from "./ProtoDemoStateView.module.scss";
import useAnalyticsStore from "@/store/prototype-analytics-store";

interface StateViewItemProps {
  pageId: string;
  count: number;
  time: number;
}

function StateViewItem(props: StateViewItemProps) {
  return (
    <div className={styles["state-view-item"]}>
      <h3>페이지 이름: {props.pageId}</h3>
      <p>터치(클릭) 수: {props.count}</p>
      <p>페이지 체류 시간: {props.time}ms</p>
    </div>
  );
}

export default function ProtoDemoStateView() {
  const { data } = useAnalyticsStore();

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        {Object.entries(data.timeSpent).map(([key, content], idx) => (
          <StateViewItem
            key={`${key}-${idx}`}
            pageId={key}
            count={data.userActions[key].count}
            time={content}
          />
        ))}
        <h3 className={styles.totalTimeSpent}>
          목적 달성 시간:{" "}
          {Object.entries(data.timeSpent)
            .reduce((acc, cur) => (acc += cur[1]), 0)
            .toString()}
          ms
        </h3>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  generateFigmaProtoURL,
  createTimer,
} from "../utils/figma-prototype-util";
import { UserActionData, TimeSpentData } from "../types/prototype-analytics";

interface Props {
  url: string;
  lastNodeId: string;
  isDeviceFrame?: boolean;
  isHideUI?: boolean;
}

export default function FigmaPrototype({
  url,
  lastNodeId,
  isDeviceFrame = false,
  isHideUI = true,
}: Props) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string>("");
  const [userActions, setUserActions] = useState<UserActionData>({});
  const [timeSpent, setTimeSpent] = useState<TimeSpentData>({});
  const timerRef = useRef(createTimer()); // 타이머 유지

  useEffect(() => {
    const generatedUrl = generateFigmaProtoURL({
      url,
      isDeviceFrame,
      isHideUI,
    });
    setEmbedUrl(generatedUrl);
  }, [url, isDeviceFrame, isHideUI]);

  const logUserAction = (
    nodeId: string,
    position: { x: number; y: number }
  ) => {
    setUserActions((prev) => {
      const currentPage = prev[nodeId] || { count: 0, positions: [] };
      return {
        ...prev,
        [nodeId]: {
          count: currentPage.count + 1,
          positions: [...currentPage.positions, position],
        },
      };
    });
  };

  const logTimeSpent = (beforeId: string, currentId: string) => {
    if (beforeId && beforeId !== lastNodeId) {
      // 이전 페이지의 체류 시간 계산 및 저장
      const elapsedTime = timerRef.current.getElapsedTime();
      setTimeSpent((prev) => ({
        ...prev,
        [beforeId]: (prev[beforeId] || 0) + elapsedTime,
      }));
    }

    if (currentId !== lastNodeId) {
      // 새 페이지 타이머 시작
      timerRef.current = createTimer();
      timerRef.current.start();
    }
  };

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const expectedOrigin = "https://www.figma.com";
      const nodeId = event.data?.data?.presentedNodeId;

      if (event.origin !== expectedOrigin) return;

      if (event.data.type === "PRESENTED_NODE_CHANGED") {
        // 이전 페이지의 체류 시간 기록 및 새 페이지 타이머 시작
        logTimeSpent(currentId, nodeId);
        setCurrentId(nodeId); // 현재 페이지 ID 업데이트
      }

      if (
        event.data.type === "MOUSE_PRESS_OR_RELEASE" &&
        event.data.data.targetNodeId
      ) {
        logUserAction(nodeId, event.data.data.targetNodeMousePosition);
      }
    };

    // 이벤트 핸들러 등록
    window.addEventListener("message", messageHandler);

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("message", messageHandler);

      // 마지막으로 남은 페이지 체류 시간 기록
      logTimeSpent(currentId, "");
    };
  }, [currentId]);

  useEffect(() => {
    if (currentId === lastNodeId) {
      console.log(userActions, timeSpent);
    }
  }, [currentId, lastNodeId]);

  // 로딩 상태 처리
  if (!embedUrl) {
    return <p>Loading Figma Embed...</p>;
  }

  return <iframe src={embedUrl} width="100%" height="100%" allowFullScreen />;
}

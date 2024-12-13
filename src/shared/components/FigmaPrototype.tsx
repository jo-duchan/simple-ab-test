"use client";

import React, { useEffect } from "react";
import { generateFigmaProtoURL } from "../utils/figma-prototype-util";

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
  const embedUrl = generateFigmaProtoURL({
    url,
    isDeviceFrame,
    isHideUI,
  });

  useEffect(() => {}, []);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe src={embedUrl} width="100%" height="100%" allowFullScreen />
    </div>
  );
}

interface ParsedFigmaData {
  protoId: string;
  nodeId: string | null;
}

export const parsedFigmaUrl = (url: string): ParsedFigmaData => {
  const parsedUrl = new URL(url);
  const pathParts = parsedUrl.pathname.split("/");

  const protoId = pathParts[2];
  const nodeId = parsedUrl.searchParams.get("node-id");

  return { protoId, nodeId };
};

interface FigmaProtoParams {
  url: string;
  isDeviceFrame?: boolean;
  isHideUI?: boolean;
}

export const generateFigmaProtoURL = ({
  url,
  isDeviceFrame = false,
  isHideUI = true,
}: FigmaProtoParams): string => {
  const { protoId, nodeId } = parsedFigmaUrl(url);

  const BASE_URL = "https://embed.figma.com/proto";

  // URLSearchParams로 쿼리 파라미터 생성
  const params = new URLSearchParams({
    "starting-point-node-id": nodeId || "",
    "embed-host": process.env.NEXT_PUBLIC_FIGMA_HOST_ID || "",
    "device-frame": isDeviceFrame.toString(),
    "hide-ui": isHideUI ? "1" : "0",
    "content-scaling": "responsive",
    "client-id": process.env.NEXT_PUBLIC_FIGMA_CLIENT_ID || "",
  });

  return `${BASE_URL}/${protoId}?${params.toString()}`;
};

export function createTimer() {
  let startTime = 0;

  return {
    start() {
      startTime = performance.now();
    },
    getElapsedTime() {
      return performance.now() - startTime;
    },
  };
}

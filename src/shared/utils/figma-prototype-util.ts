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
  const startNodeId = `starting-point-node-id=${nodeId}`;
  const embedHost = `embed-host=${process.env.NEXT_PUBLIC_FIGMA_HOST_ID}`;
  const deviceFrame = `device-frame=${isDeviceFrame}`;
  const hideUI = `hide-ui=${isHideUI ? 1 : 0}`;
  const client = `client-id=${process.env.NEXT_PUBLIC_FIGMA_CLIENT_ID}`;

  return `${BASE_URL}/${protoId}?${startNodeId}&${embedHost}&${deviceFrame}&${hideUI}&${client}`;
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

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

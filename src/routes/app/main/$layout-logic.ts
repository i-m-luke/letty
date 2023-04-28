import type { PromptData, ThreadData } from "$types";
import type LayoutLoadData from "./LayoutLoadData";
import type LayoutData from "./LayoutData";
import type TreeNodeData from "$lib/components/TreeNodeData";
import { transformToTreeInfo } from "$lib/transformers";

// PURE CODE:

export function transformData(layoutLoadData: LayoutLoadData): LayoutData {
  const promptDataToTreeNodeData = (data: PromptData): TreeNodeData => {
    return { text: data.name };
  };
  const threadDataToTreeNodeData = (data: ThreadData): TreeNodeData => {
    return { text: data.name };
  };

  return {
    promptTreeNodeInfoCollection: transformToTreeInfo(
      layoutLoadData.promptDataCollection,
      promptDataToTreeNodeData
    ),
    threadTreeNodeInfoCollection: transformToTreeInfo(
      layoutLoadData.threadDataCollection,
      threadDataToTreeNodeData
    ),
  };
}

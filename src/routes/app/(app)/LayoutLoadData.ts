import type { ThreadData, PromptData, DBNode } from "$types";

type LayoutLoadData = {
  promptDataCollection: DBNode<PromptData>[];
  threadDataCollection: DBNode<ThreadData>[];
};

export default LayoutLoadData;

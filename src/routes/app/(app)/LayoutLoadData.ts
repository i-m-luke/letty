import type { ThreadData, PromptData, DBNode } from "$types";
import type { Writable } from "svelte/store";
import type { TreeNodeInfo } from "$lib/components/Tree";

type LayoutLoadData = {
  promptDataCollection: DBNode<PromptData>[];
  threadDataCollection: DBNode<ThreadData>[];
  threadTreeState: Writable<TreeNodeInfo[]>;
  promptTreeState: Writable<TreeNodeInfo[]>;
};

export default LayoutLoadData;

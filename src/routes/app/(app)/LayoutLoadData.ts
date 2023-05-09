import type { ThreadData, PromptData, DBNode } from "$types";
import type { Writable } from "svelte/store";
import type { TreeNodeInfo } from "$lib/components/Tree";

type LayoutLoadData = {
  threadTreeState: Writable<TreeNodeInfo<ThreadData>[]>;
  promptTreeState: Writable<TreeNodeInfo<PromptData>[]>;
};

export default LayoutLoadData;

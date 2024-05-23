import type { Writable } from "svelte/store";
import type { TreeNodeInfo } from "$lib/components/Tree";

type LayoutLoadData = {
  threadTreeState: TreeNodeInfo[];
  promptTreeState: TreeNodeInfo[];
};

export default LayoutLoadData;

import _Tree from "./Tree.svelte";
import _TreeNode from "./TreeNode.svelte";

export const Tree = _Tree;
export default Tree;

export const TreeNode = _TreeNode;

export type TreeNodeInfoOpts<TNodeData> = {
  childNodes?: TreeNodeInfo<TNodeData>[];
  data?: TNodeData;
};

export class TreeNodeInfo<TNodeData> {
  // isFolder: boolean;
  isRoot: boolean;
  text: string;  
  childNodes: TreeNodeInfo<TNodeData>[] = [];
  data?: TNodeData = undefined;

  constructor(isRoot: boolean, text: string, opts?: TreeNodeInfoOpts<TNodeData>) {
    this.isRoot = isRoot;
    this.text = text;
    this.childNodes = opts?.childNodes ?? [];
    this.data = opts?.data;
  }
}

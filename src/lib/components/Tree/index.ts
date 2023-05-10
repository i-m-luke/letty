import _Tree from "./Tree.svelte";
import _TreeNode from "./TreeNode.svelte";

export const Tree = _Tree;
export default Tree;

export const TreeNode = _TreeNode;

export class TreeNodeInfo<TNodeData> {
  isRoot: boolean;
  // isFolder: boolean;
  text: string;
  childNodes: TreeNodeInfo<TNodeData>[] = [];
  data?: TNodeData;

  // TODO: Rework childNodes and data as Opts
  constructor(
    isRoot: boolean,
    text: string,
    childNodes: TreeNodeInfo<TNodeData>[],
    data?: TNodeData
  ) {
    this.isRoot = isRoot;
    this.childNodes = childNodes;
    this.text = text;
    this.data = data;
  }
}

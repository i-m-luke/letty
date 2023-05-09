import _Tree from "./Tree.svelte";
import _TreeNode from "./TreeNode.svelte";

export const Tree = _Tree;
export default Tree;

export const TreeNode = _TreeNode;

export class TreeNodeInfo {
  isRootNode: boolean;
  children: TreeNodeInfo[] = [];
  text: string;
  data?: any;

  constructor(
    isRootNode: boolean,
    text: string,
    children: TreeNodeInfo[],
    data?: any
  ) {
    this.isRootNode = isRootNode;
    this.children = children;
    this.text = text;
    this.data = data;
  }
}

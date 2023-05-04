import _Tree from "./Tree.svelte";
import _TreeNode from "./TreeNode.svelte";

export const Tree = _Tree;
export default Tree;

export const TreeNode = _TreeNode;

export class TreeNodeData {
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}

export class TreeNodeInfo extends TreeNodeData {
  isRootNode: boolean;
  children: TreeNodeInfo[] = [];
  data?: any;

  constructor(
    isRootNode: boolean,
    text: string,
    children: TreeNodeInfo[],
    data?: any
  ) {
    super(text);
    this.isRootNode = isRootNode;
    this.children = children;
    this.data = data;
  }
}

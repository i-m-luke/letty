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
  id: string;
  children: TreeNodeInfo[] = [];

  constructor(
    isRootNode: boolean,
    id: string,
    text: string,
    children: TreeNodeInfo[]
  ) {
    super(text);
    this.isRootNode = isRootNode;
    this.id = id;
    this.children = children;
  }
}

import _Tree from "./Tree.svelte";
import _TreeNode from "./TreeNode.svelte";

export const Tree = _Tree;
export const TreeNode = _TreeNode;

export type TreeNodeInfoOpts = {
  childNodes?: TreeNodeInfo[];
};

export type TreeNodeInfoData = {
  _id: string;
};

export class TreeNodeInfo {
  isRoot: boolean;
  text: string;
  data: TreeNodeInfoData;
  isFolder: boolean;

  childNodes: TreeNodeInfo[] = [];

  constructor(
    isRoot: boolean,
    text: string,
    data: TreeNodeInfoData,
    opts?: TreeNodeInfoOpts
  ) {
    this.isRoot = isRoot;
    this.text = text;
    this.data = data;

    this.childNodes = opts?.childNodes ?? [];
    this.isFolder = this.childNodes.length > 0;
  }
}

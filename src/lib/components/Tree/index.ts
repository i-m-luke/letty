import _Tree from "./Tree.svelte";
import _TreeNode from "./TreeNode.svelte";

export const Tree = _Tree;
export const TreeNode = _TreeNode;

export type TreeNodeInfoOpts = {
  childNodes?: TreeNodeInfo[];
};

export type TreeNodeInfoData = {
  id: string;
  folderId: string;
};

export enum TreeNodeType {
  Folder = "folder",
  Content = "content",
  Root = "root",
  Unknown = "unkown",
}

export class TreeNodeInfo {
  type: TreeNodeType;
  text: string;
  data: TreeNodeInfoData;
  childNodes: TreeNodeInfo[] = [];

  constructor(
    type: TreeNodeType,
    text: string,
    data: TreeNodeInfoData,
    opts?: TreeNodeInfoOpts
  ) {
    this.type = type;
    this.text = text;
    this.data = data;

    this.childNodes = opts?.childNodes ?? [];
  }
}

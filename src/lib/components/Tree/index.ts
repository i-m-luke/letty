import _Tree from "./Tree.svelte";
import _TreeNode from "./TreeNode.svelte";

export const Tree = _Tree;
export const TreeNode = _TreeNode;

export type TreeNodeInfoOpts = {
  childNodes?: TreeNodeInfo[];
};

export type TreeNodeInfoData = {
  _id: string;
  _folderId: string;
};

export enum TreeNodeType {
  Folder = "folder",
  Content = "content",
  Unknown = "unkown",
}

export class TreeNodeInfo {
  isRoot: boolean;
  type: TreeNodeType;
  text: string;
  data: TreeNodeInfoData;

  childNodes: TreeNodeInfo[] = [];

  constructor(
    isRoot: boolean,
    type: TreeNodeType,
    text: string,
    data: TreeNodeInfoData,
    opts?: TreeNodeInfoOpts
  ) {
    this.isRoot = isRoot;
    this.type = type;
    this.text = text;
    this.data = data;

    this.childNodes = opts?.childNodes ?? [];
  }
}

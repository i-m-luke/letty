import type LayoutLoadData from "./LayoutLoadData.js";
import type { DBNode, FolderData, FolderItem } from "$types";
import { TreeNodeInfo } from "$lib/components/Tree/index";
import { writable } from "svelte/store";

// data: data předaná z +layout.server.ts
export async function load({ data }): Promise<LayoutLoadData> {
  const { threadData, promptData, threadFolders, promptFolders } = data;

  const threadTreeNodeInfo = transformFolderDBNodeToTreeState(
    threadFolders,
    threadData
  );
  const promptTreeNodeInfo = transformFolderDBNodeToTreeState(
    promptFolders,
    promptData
  );

  return {
    threadTreeState: writable(threadTreeNodeInfo),
    promptTreeState: writable(promptTreeNodeInfo),
  };
}

const transformFolderDBNodeToTreeState = (
  folderDBNodes: DBNode<FolderData>[],
  folderItems: FolderItem[]
): TreeNodeInfo[] => {
  const rootFolderDBNodes = folderDBNodes.filter(
    (dbNode) => dbNode.parentId === ""
  );
  return rootFolderDBNodes.map((rootFolderDBNode) =>
    transformFolderDBNodeToTreeNodeInfo(
      rootFolderDBNode,
      folderDBNodes,
      folderItems,
      true
    )
  );
};

const transformFolderDBNodeToTreeNodeInfo = (
  parentFolderDbNode: DBNode<FolderData>,
  folderDbNodes: DBNode<FolderData>[],
  folderItems: FolderItem[],
  isRootNode: boolean
): TreeNodeInfo => {
  const folderSubnodes = folderDbNodes
    .filter((folderDbNode) => folderDbNode.parentId === parentFolderDbNode._id)
    .map((dbNodeSubnode) =>
      transformFolderDBNodeToTreeNodeInfo(
        dbNodeSubnode,
        folderDbNodes,
        folderItems,
        false
      )
    );

  const folderItemSubnodes = folderItems
    .filter((folderItem) =>
      parentFolderDbNode.data.itemsIds.includes(folderItem._id)
    )
    .map(
      (folderItem) =>
        new TreeNodeInfo(false, folderItem.name, [], { id: folderItem._id })
    );

  return {
    isRootNode,
    children: [...folderSubnodes, ...folderItemSubnodes],
    text: parentFolderDbNode.data.name,
    data: {
      id: parentFolderDbNode._id,
    },
  };
};

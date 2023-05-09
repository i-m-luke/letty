import type LayoutLoadData from "./LayoutLoadData.js";
import type { DBNode, FolderData, FolderItem } from "$types";
import { TreeNodeInfo } from "$lib/components/Tree/index";
import { writable } from "svelte/store";

// data: data předaná z +layout.server.ts
export async function load({ data }): Promise<LayoutLoadData> {
  const { threadData, promptData, threadFolders, promptFolders } = data;
  const threadTreeNodeInfo = transformToTreeInfo(threadFolders, threadData);
  const promptTreeNodeInfo = transformToTreeInfo(promptFolders, promptData);
  return {
    threadTreeState: writable(threadTreeNodeInfo),
    promptTreeState: writable(promptTreeNodeInfo),
  };
}

const transformToTreeInfo = (
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
  folderDbNode: DBNode<FolderData>,
  folderDbNodes: DBNode<FolderData>[],
  folderItems: FolderItem[],
  isRootNode: boolean
): TreeNodeInfo => {
  const folderSubnodes = folderDbNodes
    .filter((_dbNode) => _dbNode.parentId === folderDbNode._id)
    .map((dbNodeSubnode) =>
      transformFolderDBNodeToTreeNodeInfo(
        dbNodeSubnode,
        folderDbNodes,
        folderItems,
        false
      )
    );

  const folderItemSubnodes = folderDbNode.data.itemsIds.map((itemId) => {
    const item = folderItems.find((item) => item._id === itemId) ?? {
      name: "UNKNOWN",
      _id: "UNKNOWN",
    };
    return new TreeNodeInfo(false, item.name, [], { id: item._id });
  });

  return {
    isRootNode,
    children: [...folderSubnodes, ...folderItemSubnodes],
    text: folderDbNode.data.name,
    data: {
      id: folderDbNode._id,
    },
  };
};

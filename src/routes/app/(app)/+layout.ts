import type LayoutLoadData from "./LayoutLoadData";
import type { DBNode, FolderData, ContentData } from "$types";
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
  folderDbNodes: DBNode<FolderData>[],
  contentDbNodes: ContentData[]
): TreeNodeInfo[] => {
  const rootFolderDBNodes = folderDbNodes.filter((dbNode) => dbNode.parentId === "");
  return rootFolderDBNodes.map((rootFolderDBNode) =>
    transformFolderDBNodeToTreeNodeInfo(
      rootFolderDBNode,
      folderDbNodes,
      contentDbNodes,
      true
    )
  );
};

const transformFolderDBNodeToTreeNodeInfo = (
  currentFolderDbNode: DBNode<FolderData>,
  folderDbNodes: DBNode<FolderData>[],
  contentDbNodes: ContentData[],
  isRootNode: boolean
): TreeNodeInfo => {
  const subfolderNodes = folderDbNodes
    .filter((folderDbNode) => folderDbNode.parentId === currentFolderDbNode._id)
    .map((dbNodeSubnode) =>
      transformFolderDBNodeToTreeNodeInfo(
        dbNodeSubnode,
        folderDbNodes,
        contentDbNodes,
        false
      )
    );

  const contentNodes = contentDbNodes
    .filter((folderItem) =>
      currentFolderDbNode.data.itemsIds.includes(folderItem._id)
    )
    .map(({ name, _id }) => new TreeNodeInfo(false, name, { _id }));

  return new TreeNodeInfo(
    isRootNode,
    currentFolderDbNode.data.name,
    { _id: currentFolderDbNode._id },
    {
      childNodes: [...subfolderNodes, ...contentNodes],
    }
  );
};

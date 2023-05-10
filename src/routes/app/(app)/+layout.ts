import type LayoutLoadData from "./LayoutLoadData";
import type {
  ThreadData,
  DBNode,
  FolderData,
  FolderItem,
  PromptData,
  WithId,
} from "$types";
import { TreeNodeInfo } from "$lib/components/Tree/index";
import { writable } from "svelte/store";

// data: data předaná z +layout.server.ts
export async function load({ data }): Promise<LayoutLoadData> {
  const { threadData, promptData, threadFolders, promptFolders } = data;

  const threadTreeNodeInfo = transformFolderDBNodeToTreeState<ThreadData>(
    threadFolders,
    threadData
  );
  const promptTreeNodeInfo = transformFolderDBNodeToTreeState<PromptData>(
    promptFolders,
    promptData
  );

  return {
    threadTreeState: writable(threadTreeNodeInfo),
    promptTreeState: writable(promptTreeNodeInfo),
  };
}

const transformFolderDBNodeToTreeState = <TTreeNodeData extends WithId>(
  folderDBNodes: DBNode<FolderData>[],
  folderItems: FolderItem[]
): TreeNodeInfo<TTreeNodeData>[] => {
  const rootFolderDBNodes = folderDBNodes.filter((dbNode) => dbNode.parentId === "");
  return rootFolderDBNodes.map((rootFolderDBNode) =>
    transformFolderDBNodeToTreeNodeInfo<TTreeNodeData>(
      rootFolderDBNode,
      folderDBNodes,
      folderItems,
      true
    )
  );
};

const transformFolderDBNodeToTreeNodeInfo = <TTreeNodeData extends WithId>(
  parentFolderDbNode: DBNode<FolderData>,
  folderDbNodes: DBNode<FolderData>[],
  folderItems: FolderItem[],
  isRootNode: boolean
): TreeNodeInfo<TTreeNodeData> => {
  const folderSubnodes = folderDbNodes
    .filter((folderDbNode) => folderDbNode.parentId === parentFolderDbNode._id)
    .map((dbNodeSubnode) =>
      transformFolderDBNodeToTreeNodeInfo<TTreeNodeData>(
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
        new TreeNodeInfo<TTreeNodeData>(false, folderItem.name, [], {
          _id: parentFolderDbNode._id,
        } as TTreeNodeData)
    );

  return new TreeNodeInfo<TTreeNodeData>(
    isRootNode,
    parentFolderDbNode.data.name,
    [...folderSubnodes, ...folderItemSubnodes],
    {
      _id: parentFolderDbNode._id,
    } as TTreeNodeData
  );
};

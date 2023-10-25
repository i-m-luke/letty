import type LayoutLoadData from "./LayoutLoadData";
import type {
  ThreadData,
  DBNode,
  FolderData,
  ContentData,
  PromptData
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

const transformFolderDBNodeToTreeState = <TContentData extends ContentData>(
  folderDbNodes: DBNode<FolderData>[],
  contentDbNodes: TContentData[]
): TreeNodeInfo<TContentData>[] => {
  const rootFolderDBNodes = folderDbNodes.filter((dbNode) => dbNode.parentId === "");
  return rootFolderDBNodes.map((rootFolderDBNode) =>
    transformFolderDBNodeToTreeNodeInfo<TContentData>(
      rootFolderDBNode,
      folderDbNodes,
      contentDbNodes,
      true
    )
  );
};

const transformFolderDBNodeToTreeNodeInfo = <TContentData extends ContentData>(
  parentFolderDbNode: DBNode<FolderData>,
  folderDbNodes: DBNode<FolderData>[],
  contentDbNodes: TContentData[],
  isRootNode: boolean
): TreeNodeInfo<TContentData> => {
  const folderSubnodes = folderDbNodes
    .filter((folderDbNode) => folderDbNode.parentId === parentFolderDbNode._id)
    .map((dbNodeSubnode) =>
      transformFolderDBNodeToTreeNodeInfo<TContentData>(
        dbNodeSubnode,
        folderDbNodes,
        contentDbNodes,
        false
      )
    );

  const folderItemSubnodes = contentDbNodes
    .filter((folderItem) =>
      parentFolderDbNode.data.itemsIds.includes(folderItem._id)
    )
    .map(
      (folderItem) =>
        new TreeNodeInfo<TContentData>(false, folderItem.name, { data: folderItem })
    );

  return new TreeNodeInfo<TContentData>(isRootNode, parentFolderDbNode.data.name, {
    childNodes: [...folderSubnodes, ...folderItemSubnodes],
  });
};

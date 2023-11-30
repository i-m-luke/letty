import type LayoutLoadData from "./LayoutLoadData";
import type { ContentData, Folder, WithId, WithParentId } from "$types";
import { TreeNode, TreeNodeInfo, TreeNodeType } from "$lib/components/Tree/index";
import { writable } from "svelte/store";

type Content = {
  name: string;
} & WithId &
  WithParentId;

// data: data předaná z +layout.server.ts
export function load({ data }): LayoutLoadData {
  const { threadData, promptData, threadFolders, promptFolders } = data;

  const { filtered: rootThreadFolderNodes, rest: restThreadFolderNodes } = filter(
    threadFolders,
    (node) => node.parentId === ""
  );
  const threadTreeNodeInfo = rootThreadFolderNodes.map((folderNode) =>
    transformDBNodeToTreeNode(folderNode, threadData, restThreadFolderNodes)
  );

  const { filtered: rootPromptFolderNodes, rest: restPromptFolderNodes } = filter(
    promptFolders,
    (node) => node.parentId === ""
  );
  const promptTreeNodeInfo = rootPromptFolderNodes.map((folderNode) =>
    transformDBNodeToTreeNode(folderNode, promptData, restPromptFolderNodes)
  );

  return {
    threadTreeState: writable(threadTreeNodeInfo),
    promptTreeState: writable(promptTreeNodeInfo),
  };
}

// NOTE: Použít namísto této fce Object.groupBy? Provést benchmark!
const filter = <T>(items: T[], predicate: (item: T) => boolean) => {
  const newItems = [...items];
  const filtered: T[] = [];
  const rest: T[] = [];
  while (items.length > 0) {
    const item = newItems.pop();
    if (item === undefined) break;
    const targetColl = predicate(item) ? filtered : rest;
    targetColl.push(item);
  }
  return { filtered, rest };
};

const transformDBNodeToTreeNode = (
  currentFolderNode: Folder,
  contentNodes: Content[],
  folderNodes: Folder[]
): TreeNodeInfo => {
  const { filtered: filteredContentNodes, rest: restContentNodes } = filter(
    contentNodes,
    (node) => node.parentId === currentFolderNode._id
  );
  const contentChildNodes = filteredContentNodes.map(({ _id, parentId, name }) => {
    return new TreeNodeInfo(false, TreeNodeType.Content, name, {
      _id,
      _folderId: parentId,
    });
  });

  const { filtered: filteredFolderNodes, rest: restFolderNodes } = filter(
    folderNodes,
    (node) => node.parentId === currentFolderNode._id
  );
  const folderChildNodes = filteredFolderNodes.map((node) =>
    transformDBNodeToTreeNode(node, restContentNodes, restFolderNodes)
  );

  return new TreeNodeInfo(
    false,
    TreeNodeType.Folder,
    currentFolderNode.name,
    {
      _id: currentFolderNode._id,
      _folderId: currentFolderNode.parentId,
    },
    { childNodes: [...folderChildNodes, ...contentChildNodes] }
  );
};

// const transformFolderDBNodeToTreeState = (
//   folderDbNodes: Folder[],
//   contentDbNodes: ContentData[]
// ): TreeNodeInfo[] => {
//   const rootFolderDBNodes = folderDbNodes.filter((dbNode) => dbNode.parentId === "");
//   return rootFolderDBNodes.map((rootFolderDBNode) =>
//     transformFolderDBNodeToTreeNodeInfo(
//       rootFolderDBNode,
//       folderDbNodes,
//       contentDbNodes,
//       true
//     )
//   );
// };

// const transformFolderDBNodeToTreeNodeInfo = (
//   currentFolderDbNode: Folder,
//   folderDbNodes: Folder[],
//   contentDbNodes: ContentData[],
//   isRootNode: boolean
// ): TreeNodeInfo => {
//   const subfolderNodes = folderDbNodes
//     .filter((folderDbNode) => folderDbNode.parentId === currentFolderDbNode._id)
//     .map((dbNodeSubnode) =>
//       transformFolderDBNodeToTreeNodeInfo(
//         dbNodeSubnode,
//         folderDbNodes,
//         contentDbNodes,
//         false
//       )
//     );

//   const contentNodes = contentDbNodes
//     .filter((folderItem) =>
//       currentFolderDbNode.data.itemsIds.includes(folderItem._id)
//     )
//     .map(
//       ({ name, _id }) =>
//         new TreeNodeInfo(false, TreeNodeType.Content, name, {
//           _id,
//           _folderId: currentFolderDbNode._id,
//         })
//     );

//   return new TreeNodeInfo(
//     isRootNode,
//     TreeNodeType.Folder,
//     currentFolderDbNode.data.name,
//     { _id: currentFolderDbNode._id, _folderId: currentFolderDbNode.parentId ?? "" },
//     {
//       childNodes: [...subfolderNodes, ...contentNodes],
//     }
//   );
// };

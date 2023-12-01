import type LayoutLoadData from "./LayoutLoadData";
import type { DBNode, Folder, WithId, WithParentId } from "$types";
import { TreeNodeInfo, TreeNodeType } from "$lib/components/Tree/index";
import { writable } from "svelte/store";

type Content = {
  name: string;
} & WithId &
  WithParentId;

// data: data předaná z +layout.server.ts
export function load({ data }): LayoutLoadData {
  const { threadData, promptData, threadFolders, promptFolders } = data;

  const filterRootContentNodes = (contentData: ({ name: string } & DBNode)[]) =>
    contentData
      .filter((data) => data.parentId === "")
      .map(
        (data) =>
          new TreeNodeInfo(TreeNodeType.Content, data.name, {
            id: data._id,
            folderId: "",
          })
      );

  const { filtered: rootThreadFolderNodes, rest: restThreadFolderNodes } = filter(
    threadFolders,
    (node) => node.parentId === ""
  );
  const threadTreeNodeInfo = [
    ...rootThreadFolderNodes.map((folderNode) =>
      transformDBNodeToTreeNode(folderNode, threadData, restThreadFolderNodes)
    ),
    ...filterRootContentNodes(threadData),
  ];

  const { filtered: rootPromptFolderNodes, rest: restPromptFolderNodes } = filter(
    promptFolders,
    (node) => node.parentId === ""
  );
  const promptTreeNodeInfo = [
    ...rootPromptFolderNodes.map((folderNode) =>
      transformDBNodeToTreeNode(folderNode, promptData, restPromptFolderNodes)
    ),
    ...filterRootContentNodes(promptData),
  ];

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
    return new TreeNodeInfo(TreeNodeType.Content, name, {
      id: _id,
      folderId: parentId,
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
    TreeNodeType.Folder,
    currentFolderNode.name,
    {
      id: currentFolderNode._id,
      folderId: currentFolderNode.parentId,
    },
    { childNodes: [...folderChildNodes, ...contentChildNodes] }
  );
};

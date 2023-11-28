import type { FolderData, Thread, DBNode, Prompt } from "$types";

type LayoutServerLoadData = {
  threadData: Thread[];
  promptData: Prompt[];
  threadFolders: DBNode<FolderData>[];
  promptFolders: DBNode<FolderData>[];
};
export default LayoutServerLoadData;

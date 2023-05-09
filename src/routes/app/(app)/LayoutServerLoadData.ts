import type { FolderData, ThreadData, DBNode, PromptData } from "$types";

type LayoutServerLoadData = {
  threadData: ThreadData[];
  promptData: PromptData[];
  threadFolders: DBNode<FolderData>[];
  promptFolders: DBNode<FolderData>[];
};
export default LayoutServerLoadData;

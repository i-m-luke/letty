import type { Folder, Thread, DBNode, Prompt } from "$types";

type LayoutServerLoadData = {
  threadData: Thread[];
  promptData: Prompt[];
  threadFolders: DBNode<Folder>[];
  promptFolders: DBNode<Folder>[];
};
export default LayoutServerLoadData;

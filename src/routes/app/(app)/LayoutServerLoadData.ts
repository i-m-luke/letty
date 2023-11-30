import type { Thread, DBNode, Prompt, Folder } from "$types";

type LayoutServerLoadData = {
  threadData: Thread[];
  promptData: Prompt[];
  threadFolders: Folder[];
  promptFolders: Folder[];
};
export default LayoutServerLoadData;

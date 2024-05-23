import { DialogProxy } from "$lib/components/Dialog";
import {
  type TreeNodeInfoData,
  TreeNodeInfo,
  TreeNodeType,
} from "$lib/components/Tree";
import { ViewModelBase } from "$lib/ViewModelBase";
import { get, writable } from "svelte/store";
import CreateDialogData from "./CreateDialogData";
import {
  addNodeToMultipleNodes,
  fetchDeletePrompt,
  fetchDeletePromptFolder,
  fetchDeleteThread,
  fetchDeleteThreadFolder,
  fetchPostPrompt,
  fetchPostPromptFolder,
  fetchPostThread,
  fetchPostThreadFolder,
  removeNodeFromMultipleNodes,
} from "./$logic";
import { CreateDialogEntriesIssue } from "./CreateDialogEntriesIssue";

export class ViewModel extends ViewModelBase {
  readonly threadTreeState = writable<TreeNodeInfo[]>();
  readonly promptTreeState = writable<TreeNodeInfo[]>();

  readonly createThreadDialogProxy: DialogProxy = new DialogProxy();
  readonly createThreadDialogData: CreateDialogData = new CreateDialogData();
  readonly createPromptDialogProxy = new DialogProxy();
  readonly createPromptDialogData = new CreateDialogData();
  readonly sureToDeleteDialogProxy = new DialogProxy();

  constructor(props: ViewModelProps) {
    super();
    this.threadTreeState.set([
      new TreeNodeInfo(
        TreeNodeType.Root,
        "THREADING",
        { folderId: "root", id: "" },
        { childNodes: [...props.threadTreeState] }
      ),
    ]);

    this.promptTreeState.set([
      new TreeNodeInfo(
        TreeNodeType.Root,
        "PROMPTING",
        { folderId: "root", id: "" },
        { childNodes: [...props.promptTreeState] }
      ),
    ]);
  }

  addItemToPromptFolderNode(treeNodeData: TreeNodeInfoData) {
    const beforeConfirm = async () => {
      const type = get(this.createPromptDialogData.type);
      const name = get(this.createPromptDialogData.name);
      const res = await (async () => {
        switch (type) {
          case TreeNodeType.Content:
            return fetchPostPrompt({ parentId: treeNodeData.id, name });
          case TreeNodeType.Folder:
            return fetchPostPromptFolder({ parentId: treeNodeData.id, name });
          default:
            throw new Error("Invalid TreeNodeType");
        }
      })();

      if (!res.success) {
        const nameIssue =
          res.issues.find((issue) => issue.type === CreateDialogEntriesIssue.Name)
            ?.message ?? "";
        this.createPromptDialogData.nameIssue.set(nameIssue);
        return false;
      }

      const { data } = res;
      const newTreeNode = new TreeNodeInfo(type, data.name, {
        id: data._id,
        folderId: data.parentId,
      });
      this.promptTreeState.update((current) =>
        addNodeToMultipleNodes(treeNodeData.id, current, newTreeNode)
      );

      return true;
    };

    this.createPromptDialogProxy.showModalAndWaitTillClosed({ beforeConfirm });
  }

  removePromptFolderNode(data: TreeNodeInfoData) {
    const { confirmed } = this.sureToDeleteDialogProxy.showModalAndWaitTillClosed();
    confirmed.then(() => {
      fetchDeletePromptFolder({ parentId: data.folderId, _id: data.id })
        .then(() => {
          this.promptTreeState.update((current) =>
            removeNodeFromMultipleNodes(data.id, current)
          );
        })
        .catch((err) => console.error("ERROR WHILE FETCHING:", err));
    });
  }

  removePromptContentNode(data: TreeNodeInfoData) {
    const { confirmed } = this.sureToDeleteDialogProxy.showModalAndWaitTillClosed();
    confirmed.then(() => {
      fetchDeletePrompt({ parentId: data.folderId, _id: data.id })
        .then(() => {
          this.promptTreeState.update((current) =>
            removeNodeFromMultipleNodes(data.id, current)
          );
        })
        .catch((err) => console.error("ERROR WHILE FETCHING:", err));
    });
  }

  addItemToThreadFolderNode(treeNodeData: TreeNodeInfoData) {
    const beforeConfirm = async () => {
      const type = get(this.createThreadDialogData.type);
      const name = get(this.createThreadDialogData.name);
      const res = await (() => {
        switch (type) {
          case TreeNodeType.Content:
            return fetchPostThread({ parentId: treeNodeData.id, name });
          case TreeNodeType.Folder:
            return fetchPostThreadFolder({ parentId: treeNodeData.id, name });
          default:
            throw new Error("Invalid TreeNodeType");
        }
      })();

      if (!res.success) {
        const nameIssue =
          res.issues.find((issue) => issue.type === CreateDialogEntriesIssue.Name)
            ?.message ?? "";
        this.createThreadDialogData.nameIssue.set(nameIssue);
        return false;
      }

      const { data } = res;
      const newTreeNode = new TreeNodeInfo(type, data.name, {
        id: data._id,
        folderId: data.parentId,
      });
      this.threadTreeState.update((current) =>
        addNodeToMultipleNodes(treeNodeData.id, current, newTreeNode)
      );

      return true;
    };

    this.createThreadDialogProxy.showModalAndWaitTillClosed({ beforeConfirm });
  }

  removeThreadFolderNode(data: TreeNodeInfoData) {
    const { confirmed } = this.sureToDeleteDialogProxy.showModalAndWaitTillClosed();
    confirmed.then(() => {
      fetchDeleteThreadFolder({ _id: data.id, parentId: data.folderId })
        .then(() => {
          this.threadTreeState.update((current) =>
            removeNodeFromMultipleNodes(data.id, current)
          );
        })
        .catch((err) => console.error("ERROR WHILE FETCHING:", err));
    });
  }

  removeThreadContentNode(data: TreeNodeInfoData) {
    const { confirmed } = this.sureToDeleteDialogProxy.showModalAndWaitTillClosed();
    confirmed.then(() => {
      fetchDeleteThread({ _id: data.id, parentId: data.folderId })
        .then(() => {
          this.threadTreeState.update((current) =>
            removeNodeFromMultipleNodes(data.id, current)
          );
        })
        .catch((err) => console.error("ERROR WHILE FETCHING:", err));
    });
  }
}

export type ViewModelProps = {
  threadTreeState: TreeNodeInfo[];
  promptTreeState: TreeNodeInfo[];
};

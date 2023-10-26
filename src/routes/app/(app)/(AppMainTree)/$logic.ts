import type { TreeNodeInfo } from "$lib/components/Tree";
import { RequestType } from "../Request";
import type Request from "../Request";
import type { TreeNodeInfoData } from "$lib/components/Tree";

//#region  IMPURE CODE:

//#region  POST

export const fetchPOST =
  <TData>(type: RequestType) =>
  async (data: TData) => {
    const req: Request = {
      type,
      data,
    };
    return await fetch(`/app/`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

export const fetchPostThread = fetchPOST<TreeNodeInfoData>(RequestType.Thread);
export const fetchPostPrompt = fetchPOST<TreeNodeInfoData>(RequestType.Prompt);

//#endregion

//#region  DELETE

export const fetchDELETE =
  <TData>(type: RequestType) =>
  async (data: TData) => {
    const req: Request = {
      type,
      data,
    };
    return await fetch(`/app/`, {
      method: "DELETE",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

export const fetchDeleteThread = fetchDELETE<TreeNodeInfoData>(RequestType.Thread);
export const fetchDeletePrompt = fetchDELETE<TreeNodeInfoData>(RequestType.Prompt);

//#endregion

//#endregion

export const addNodeToMultipleNodes = (
  targetNodeId: string,
  currentNode: TreeNodeInfo,
  nodeToAdd: TreeNodeInfo
): TreeNodeInfo => {
  return currentNode.data._id === targetNodeId
    ? { ...currentNode, childNodes: [...currentNode.childNodes, nodeToAdd] }
    : {
        ...currentNode,
        childNodes: currentNode.childNodes.map((node) =>
          addNodeToMultipleNodes(targetNodeId, node, nodeToAdd)
        ),
      };
};

export const removeNodeFromSingleNode = (
  currentNode: TreeNodeInfo,
  targetNode: TreeNodeInfo,
  successfull?: boolean
): TreeNodeInfo => {
  const newCurrentNode = { ...currentNode };
  const newChildNodes = [...newCurrentNode.childNodes];

  if (!successfull) {
    const targetNodeIndex = currentNode.childNodes.findIndex(
      (childNode) => childNode.data._id === targetNode.data._id
    );
    if (targetNodeIndex > -1) {
      const childNodes = newChildNodes.splice(targetNodeIndex, 1);
      return {
        ...newCurrentNode,
        childNodes: childNodes.map((childNode) =>
          removeNodeFromSingleNode(childNode, targetNode, true)
        ),
      };
    }
  }

  return {
    ...newCurrentNode,
    childNodes: newChildNodes.map((childNode) =>
      removeNodeFromSingleNode(childNode, targetNode, false)
    ),
  };
};

export const removeNodeFromMultipleNodes = (
  currentNode: TreeNodeInfo,
  targetNode: TreeNodeInfo
): TreeNodeInfo => {
  const childNodes = currentNode.childNodes.filter(
    (childNode) => childNode.data._id === targetNode.data._id
  );
  return {
    ...currentNode,
    childNodes: childNodes.map((childNode) =>
      removeNodeFromMultipleNodes(childNode, targetNode)
    ),
  };
};

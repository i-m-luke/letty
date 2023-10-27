import type { TreeNodeInfo } from "$lib/components/Tree";
import { RequestType } from "../Request";
import type Request from "../Request";
import type { TreeNodeInfoData } from "$lib/components/Tree";
import routes from "$routes";
import type { PromptData } from "$types";

//#region  IMPURE CODE:

//#region  POST

export const fetchPOST =
  <TData>(type: RequestType) =>
  async (data: TData): Promise<PromptData> => {
    const req: Request = {
      type,
      data,
    };

    const res = await fetch(routes.static.app, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // TODO
    return {
      _id: "TODO",
      name: "TODO",
      prompt: "TODO",
    };
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
    return await fetch(routes.static.app, {
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

export const addNodeToSingleNode = (
  targetNodeId: string,
  currentNode: TreeNodeInfo,
  nodeToAdd: TreeNodeInfo
): TreeNodeInfo => {
  const clone = (node: TreeNodeInfo): TreeNodeInfo => {
    return {
      ...node,
      childNodes: node.childNodes.map(clone),
    };
  };
  const newCurrentNode = clone(currentNode);

  const findNodeById = (
    id: string,
    nodes: TreeNodeInfo[]
  ): TreeNodeInfo | undefined => {
    for (const node of nodes) {
      if (node.data._id === id) return node;
      const foundNode = findNodeById(id, node.childNodes);
      if (foundNode) return foundNode;
    }

    findNodeById(targetNodeId, newCurrentNode.childNodes)?.childNodes.push(
      nodeToAdd
    );
  };

  return newCurrentNode;
};

// TODO: TEST & DEBUG
export const removeNodeFromMultipleNodes = (
  currentNode: TreeNodeInfo,
  targetNode: TreeNodeInfo
): TreeNodeInfo => {
  return {
    ...currentNode,
    childNodes: currentNode.childNodes
      .filter((childNode) => childNode.data._id === targetNode.data._id)
      .map((childNode) => removeNodeFromMultipleNodes(childNode, targetNode)),
  };
};

// TODO: TEST & DEBUG
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

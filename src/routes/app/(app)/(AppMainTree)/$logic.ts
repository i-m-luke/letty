import type { TreeNodeInfo } from "$lib/components/Tree";
import { RequestType } from "../Request";
import type { DeleteRequest, DeleteRequestData, PostRequest } from "../Request";
import routes from "$routes";
import {
  PromptSchema,
  ThreadSchema,
  FolderSchema,
  ResponseSchema,
  type SafeResponse,
  type NewThread,
  type NewPrompt,
  type NewFolder,
} from "$types";

//#region  IMPURE CODE:

//#region  POST

const fetchPOST = async <TResData>(
  req: PostRequest,
  parseResponseDataFn: (obj: any) => TResData
): Promise<SafeResponse<TResData>> => {
  const res = ResponseSchema.parse(
    await fetch(routes.static.app, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((res) => res))
  );
  return res.success ? { ...res, data: parseResponseDataFn(res.data) } : { ...res };
};

export const fetchPostThread = async (data: NewThread) =>
  fetchPOST({ type: RequestType.Thread, data }, ThreadSchema.parse);

export const fetchPostPrompt = async (data: NewPrompt) =>
  fetchPOST({ type: RequestType.Prompt, data }, PromptSchema.parse);

export const fetchPostPromptFolder = async (data: NewFolder) =>
  fetchPOST({ type: RequestType.PromptFolder, data }, FolderSchema.parse);

export const fetchPostThreadFolder = async (data: NewFolder) =>
  fetchPOST({ type: RequestType.ThreadFolder, data }, FolderSchema.parse);

//#endregion

//#region  DELETE

export const fetchDELETE = async (type: RequestType, data: DeleteRequestData) => {
  const req: DeleteRequest = {
    type,
    data,
  };

  // TODO
  const res = fetch(routes.static.app, {
    method: "DELETE",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return true; // TODO: return delete successful?
};

export const fetchDeleteThread = (data: DeleteRequestData) =>
  fetchDELETE(RequestType.Thread, data);

export const fetchDeletePrompt = (data: DeleteRequestData) =>
  fetchDELETE(RequestType.Prompt, data);

export const fetchDeletePromptFolder = (data: DeleteRequestData) =>
  fetchDELETE(RequestType.PromptFolder, data);

export const fetchDeleteThreadFolder = (data: DeleteRequestData) =>
  fetchDELETE(RequestType.ThreadFolder, data);

//#endregion

//#endregion

export const addNodeToMultipleNodes = (
  targetNodeId: string,
  nodes: TreeNodeInfo[],
  nodeToAdd: TreeNodeInfo
): TreeNodeInfo[] =>
  nodes.map((node) => {
    const newChildNodes = addNodeToMultipleNodes(
      targetNodeId,
      node.childNodes,
      nodeToAdd
    );
    return {
      ...node,
      childNodes:
        node.data.id === targetNodeId
          ? [...newChildNodes, nodeToAdd]
          : newChildNodes,
    };
  });

export const removeNodeFromMultipleNodes = (
  targetNodeId: string,
  nodes: TreeNodeInfo[]
): TreeNodeInfo[] => {
  return nodes
    .filter((node) => node.data.id !== targetNodeId)
    .map((node) => {
      return {
        ...node,
        childNodes: removeNodeFromMultipleNodes(targetNodeId, node.childNodes),
      };
    });
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
      if (node.data.id === id) return node;
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
export const removeNodeFromSingleNode = (
  currentNode: TreeNodeInfo,
  targetNode: TreeNodeInfo,
  successfull?: boolean
): TreeNodeInfo => {
  const newCurrentNode = { ...currentNode };
  const newChildNodes = [...newCurrentNode.childNodes];

  if (!successfull) {
    const targetNodeIndex = currentNode.childNodes.findIndex(
      (childNode) => childNode.data.id === targetNode.data.id
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

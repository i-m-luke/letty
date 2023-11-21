import type { TreeNodeInfo } from "$lib/components/Tree";
import { RequestType, type Request, type RequestData } from "../Request";
import routes from "$routes";
import {
  PromptDataSchema,
  type PromptData,
  type ThreadData,
  ThreadDataSchema,
} from "$types";

//#region  IMPURE CODE:

//#region  POST

export const fetchPOST =
  <TResData>(type: RequestType, convertResDataFn: (data: any) => TResData) =>
  async (data: RequestData): Promise<TResData> => {
    const req: Request = {
      type,
      data,
    };

    // TODO
    const res = await fetch(routes.static.app, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return convertResDataFn(await res.json());
  };

export const fetchPostThread = fetchPOST<ThreadData>(
  RequestType.Thread,
  ThreadDataSchema.parse
);
export const fetchPostPrompt = fetchPOST<PromptData>(
  RequestType.Prompt,
  PromptDataSchema.parse
);

//#endregion

//#region  DELETE

export const fetchDELETE =
  (type: RequestType) =>
  async (data: RequestData): Promise<boolean> => {
    const req: Request = {
      type,
      data,
    };
    const res = fetch(routes.static.app, {
      method: "DELETE",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return true; // TODO: return delete successful?
  };

export const fetchDeleteThread = fetchDELETE(RequestType.Thread);
export const fetchDeletePrompt = fetchDELETE(RequestType.Prompt);

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
        node.data._id === targetNodeId
          ? [...newChildNodes, nodeToAdd]
          : newChildNodes,
    };
  });

export const removeNodeFromMultipleNodes = (
  targetNodeId: string,
  nodes: TreeNodeInfo[]
): TreeNodeInfo[] => {
  return nodes
    .filter((node) => node.data._id !== targetNodeId)
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

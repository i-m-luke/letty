import type { TreeNodeInfo } from "$lib/components/Tree";

export const addNodeToNode = (
  targetNodeId: string,
  currentNode: TreeNodeInfo,
  nodeToAdd: TreeNodeInfo
): TreeNodeInfo => {
  return currentNode.data._id === targetNodeId
    ? { ...currentNode, childNodes: [...currentNode.childNodes, nodeToAdd] }
    : {
        ...currentNode,
        childNodes: currentNode.childNodes.map((node) =>
          addNodeToNode(targetNodeId, node, nodeToAdd)
        ),
      };
};

const a_removeNodeFromNode = (
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
          a_removeNodeFromNode(childNode, targetNode, true)
        ),
      };
    }
  }

  return {
    ...newCurrentNode,
    childNodes: newChildNodes.map((childNode) =>
      a_removeNodeFromNode(childNode, targetNode, false)
    ),
  };
};

const slower_removeNodeFromNode = (
  currentNode: TreeNodeInfo,
  targetNode: TreeNodeInfo
): TreeNodeInfo => {
  const childNodes = currentNode.childNodes.filter(
    (childNode) => childNode.data._id === targetNode.data._id
  );
  return {
    ...currentNode,
    childNodes: childNodes.map((childNode) =>
      slower_removeNodeFromNode(childNode, targetNode)
    ),
  };
};

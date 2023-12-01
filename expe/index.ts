import { log } from "./logging"; // facade pattern
import { ZodError, ZodObject, ZodRawShape, ZodSchema, strictObject, z } from "zod";

import {
  sendMessage,
  ContextMessage,
  SendMessageResult,
  sendSingleMessage,
  sendMessageWithContext,
} from "./ai-interface";

// MAIN:
while (true) {
  // test

  type DBNode = {
    id: string;
    parentId: string;
    data: {
      name: string;
    };
  };

  type TreeNodeInfo = {
    id: string;
    folderId: string;
    isFolder: boolean;
    childNodes?: TreeNodeInfo[];
    data: { name: string };
  };

  // NOTE: Použít namísto této fce Object.groupBy? Provést benchmark!
  const filter = <T>(items: T[], predicate: (item: T) => boolean) => {
    const newItems = [...items];
    const filtered: T[] = [];
    const rest: T[] = [];
    while (items.length > 0) {
      const item = newItems.pop();
      if (item === undefined) break;
      const targetColl = predicate(item) ? filtered : rest;
      targetColl.push(item);
    }
    return { filtered, rest };
  };

  const transformDBNodeToTreeNode = (
    currentFolderNode: DBNode,
    contentNodes: DBNode[],
    folderNodes: DBNode[]
  ): TreeNodeInfo => {
    const { filtered: filteredContentNodes, rest: restContentNodes } = filter(
      contentNodes,
      (node) => node.parentId === currentFolderNode.id
    );
    const contentChildNodes = filteredContentNodes.map(
      ({ id, parentId, data: { name } }) => {
        return {
          id,
          folderId: parentId,
          isFolder: false,
          data: { name },
        };
      }
    );

    const { filtered: filteredFolderNodes, rest: restFolderNodes } = filter(
      folderNodes,
      (node) => node.parentId === currentFolderNode.id
    );
    const folderChildNodes = filteredFolderNodes.map((node) =>
      transformDBNodeToTreeNode(node, restContentNodes, restFolderNodes)
    );

    return {
      id: currentFolderNode.id,
      folderId: currentFolderNode.parentId,
      isFolder: true,
      childNodes: [...folderChildNodes, ...contentChildNodes],
      data: {
        name: currentFolderNode.data.name,
      },
    };
  };

  const folderNodes: DBNode[] = [
    { id: "1", parentId: "", data: { name: "A" } },
    { id: "2", parentId: "1", data: { name: "B" } },
    { id: "3", parentId: "", data: { name: "C" } },
  ];
  const contentNodes: DBNode[] = [
    { id: "1", parentId: "1", data: { name: "A" } },
    { id: "2", parentId: "1", data: { name: "B" } },
    { id: "3", parentId: "2", data: { name: "A" } },
  ];
  // filtered root nodes
  const { filtered: rootFolderNodes, rest: restFolderNodes } = filter(
    folderNodes,
    (node) => node.parentId === ""
  );
  const treeNodes = rootFolderNodes.map((rootNode) =>
    transformDBNodeToTreeNode(rootNode, contentNodes, restFolderNodes)
  );

  console.log(treeNodes);
}

debugger;

const logResult = (response: SendMessageResult) => {
  log("RESPONSE: " + response.response);
  log("TOKENS: " + response.data.usage?.total_tokens);
  log("COST (KČ): " + Number(response.data.usage?.total_tokens) * 0.00132);
};

// NOTE: Pro vscode debugging použít expe skript
const main = async () => {
  const messageInputElemText = "Help me to choose a new car";
  const selectedContextMessages: ContextMessage[] = [
    {
      content: "I have a car",
    },
    {
      content: "My car brand is Seat",
    },
    {
      content: "I like blue color",
    },
  ];

  sendSingleMessage(messageInputElemText);
  sendMessageWithContext(
    messageInputElemText,
    selectedContextMessages.map((cMessage) => cMessage.content)
  );

  // without context:
  const response01 = await sendMessage(messageInputElemText);
  logResult(response01);

  // with context:
  const response02 = await sendMessage(messageInputElemText, {
    contextMessages: selectedContextMessages,
  });
  logResult(response02);

  // store new message to db
};

main();

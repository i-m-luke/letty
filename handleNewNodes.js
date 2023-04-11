class NodeData {
    id; // number
    data; // object
}

class Node {
    parentId; // number
    data; // NodeData
}

// impure code 
let newNodes; // = unhandled nodes, Node[]
let handledNodes;

const handleNewNodes = () {
    const copiedNewNodes = [...newNodes];
    const copiedHandledNodes = [...handledNodes];
    const nodesDiff; // ... vytvořit roždíl mezi newNodes a copiedHandledNodes
    // ... poslání rozdílu (nodesDiff) na backend ke zpracování
    handledNodes = copiedHandledNodes;   
}

// Pozn.: Na serveru se ve stromu (data struct) podle Node.ParentID najde uzel a připojí se k němu child node (Node.Data)
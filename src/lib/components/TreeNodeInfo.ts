import TreeNodeData from './TreeNodeData';

export default class TreeNodeInfo extends TreeNodeData {
	isRootNode: boolean;
	id: string;
	children: TreeNodeInfo[] = [];

	constructor(isRootNode: boolean, id: string, text: string, children: TreeNodeInfo[]) {
		super(text);
		this.isRootNode = isRootNode;
		this.id = id;
		this.children = children;
	}
}

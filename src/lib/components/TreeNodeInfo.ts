export default class TreeNodeInfo {
	isRootNode: boolean;
	id: number;
	text: string;
	children: TreeNodeInfo[] = [];

	constructor(isRootNode: boolean, objectId: number, text: string, children: TreeNodeInfo[]) {
		this.isRootNode = isRootNode;
		this.id = objectId;
		this.text = text;
		this.children = children;
	}
}

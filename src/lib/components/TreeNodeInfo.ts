export default class TreeNodeInfo {
	isRootNode: boolean;
	objectId: number;
	text: string;
	children: TreeNodeInfo[] = [];

	constructor(isRootNode: boolean, objectId: number, text: string, children: TreeNodeInfo[]) {
		this.isRootNode = isRootNode;
		this.objectId = objectId;
		this.text = text;
		this.children = children;
	}
}

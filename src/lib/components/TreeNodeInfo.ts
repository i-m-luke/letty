export default class TreeNodeInfo {
	isRootNode: boolean;
	id: string;
	text: string;
	children: TreeNodeInfo[] = [];

	constructor(isRootNode: boolean, id: string, text: string, children: TreeNodeInfo[]) {
		this.isRootNode = isRootNode;
		this.id = id;
		this.text = text;
		this.children = children;
	}
}

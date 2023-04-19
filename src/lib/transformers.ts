import type TreeNodeInfo from './components/TreeNodeInfo';
import type TreeNodeData from './components/TreeNodeData';
import type { DBNode } from '$types';

export function transformCollectionToNodeInfo<TItem>(
	transformFn: (item: TItem) => TreeNodeInfo,
	collection: TItem[]
) {
	return collection.map(transformFn);
}

export const transformToTreeInfo = <TDBNodeData>(
	dbNodes: DBNode<TDBNodeData>[],
	transformDBNodeDataFn: (dbNodeData: TDBNodeData) => TreeNodeData
): TreeNodeInfo[] => {
	const rootDBNodes = dbNodes.filter((dbNode) => dbNode.parentId === undefined);
	return rootDBNodes.map((rootDBNode) =>
		transformToTreeNodeInfo<TDBNodeData>(rootDBNode, dbNodes, transformDBNodeDataFn)
	);
};

export const transformToTreeNodeInfo = <TDBNodeData>(
	dbNode: DBNode<TDBNodeData>,
	dbNodes: DBNode<TDBNodeData>[],
	transformDBNodeDataFn: (dbNodeData: TDBNodeData) => TreeNodeData
): TreeNodeInfo => {
	const treeNodeInfoPrototype: TreeNodeInfo = {
		isRootNode: false,
		id: dbNode.id,
		...transformDBNodeDataFn(dbNode.data),
		children: []
	};

	const dbNodeSubnodes = dbNodes.filter((_dbNode) => _dbNode.parentId === dbNode.id);
	if (dbNodeSubnodes !== undefined) {
		return {
			...treeNodeInfoPrototype,
			isRootNode: true,
			children: dbNodeSubnodes.map((dbNodeSubnode) =>
				transformToTreeNodeInfo(dbNodeSubnode, dbNodes, transformDBNodeDataFn)
			)
		};
	}

	return treeNodeInfoPrototype;
};

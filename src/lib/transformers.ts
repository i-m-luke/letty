import type TreeNodeInfo from './components/TreeNodeInfo';

export function transformCollectionToNodeInfo<TItem>(
	transformFn: (item: TItem) => TreeNodeInfo,
	collection: TItem[]
) {
	return collection.map(transformFn);
}

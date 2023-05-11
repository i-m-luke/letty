import type { TreeNodeInfo } from "./components/Tree";

export function transformCollectionToNodeInfo<TItem>(
  transformFn: (item: TItem) => TreeNodeInfo<TItem>,
  collection: TItem[]
) {
  return collection.map(transformFn);
}

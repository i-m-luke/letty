export function load({ params }) {
	return {
		selectedNodeId: Number(params.parentId)
	};
}

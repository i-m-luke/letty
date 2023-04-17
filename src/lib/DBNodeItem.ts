type DBNodeItem<TData> = {
	id: number;
	childrenIds: number[];
	data: TData;
};

export default DBNodeItem;

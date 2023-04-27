// file route

const data = new Map<string, { someValue: number }>();
data.set('item01', { someValue: 1 });
data.set('item02', { someValue: 2 });

export function GET({ params }) {
	return data.get(params.item);
}

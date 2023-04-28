// file route

const data = new Map<string, { someValue: number }>();
data.set('1', { someValue: 1 });
data.set('2', { someValue: 2 });

export function GET({ params }) {
	return data.get(params.item);
}

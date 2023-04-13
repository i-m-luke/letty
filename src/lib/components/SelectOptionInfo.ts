import type ISelectOptionInfo from './ISelectOptionInfo';

export default class SelectOptionInfo<TData> implements ISelectOptionInfo {
	text: string;
	data: TData;

	constructor(text: string, data: TData) {
		this.text = text;
		this.data = data;
	}
}

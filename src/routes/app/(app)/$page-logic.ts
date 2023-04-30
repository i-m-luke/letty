import type PageData from './PageData';
import type PageLoadData from './PageLoadData';
import { transformData as transformLayoutData } from './$layout-logic';

export function transformData(data: PageLoadData): PageData {
	return transformLayoutData(data);
}

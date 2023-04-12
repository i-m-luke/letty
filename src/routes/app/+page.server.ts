import PromptInfo from './PromptInfo';
import type AppLoadDataType from './AppLoadDataType';
// import { v4 as uuidv4 } from 'uuid';

const fakeDB = {
	promptInfoCollection: [
		new PromptInfo(1, 'random number', 'give me a random number', []),
		new PromptInfo(2, 'random name', 'give me a random name', [])
	]
};

export function load(): AppLoadDataType {
	return {
		promptInfoCollection: [
			new PromptInfo(1, 'random number', 'give me a random number', []),
			new PromptInfo(2, 'random name', 'give me a random name', [])
		]
	};
}

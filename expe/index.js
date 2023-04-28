import { Configuration, OpenAIApi } from 'openai';
const CHATGPT_API_KEY = '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';
const config = new Configuration({
    apiKey: CHATGPT_API_KEY
});
const openAiApi = new OpenAIApi(config);
const completion = await openAiApi.createCompletion({
    model: 'gpt-3.5-turbo',
    prompt: 'Dej mi háhodné číslo v rozmezí 1-10'
});
console.log(completion.data.choices[0].text);
debugger;
//# sourceMappingURL=index.js.map
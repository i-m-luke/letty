export enum POSTType {
  CreateThread = "CreateThread",
  CreatePrompt = "CreatePrompt",
}

type POSTRequest<TData> = {
  type: POSTType;
  data: TData;
};

export default POSTRequest;

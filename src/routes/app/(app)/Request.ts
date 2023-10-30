export enum RequestType {
  Thread = "Thread",
  Prompt = "Prompt",
}

type Request<TData> = {
  type: RequestType;
  data: TData;
};

export default Request;

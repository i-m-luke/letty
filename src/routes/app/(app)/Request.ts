export enum RequestType {
  Thread = "Thread",
  Prompt = "Prompt",
}

type Request = {
  type: RequestType;
  data: any;
};

export default Request;

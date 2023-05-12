export enum DeleteRequestType {
  Thread = "Thread",
  Prompt = "Prompt",
}

type DeleteRequest = {
  type: DeleteRequestType;
  data: any;
};

export default DeleteRequest;

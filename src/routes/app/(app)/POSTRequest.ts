export enum PostRequestType {
  Thread = "Thread",
  Prompt = "Prompt",
}

type PostRequest = {
  type: PostRequestType;
  data: any;
};

export default PostRequest;

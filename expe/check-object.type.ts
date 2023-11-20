type DataType = {
  propA: string;
  propB: number;
  propC: { prop: string };
};

const clientSideFn = () => {
  checkObjectType<DataType>({ prop: ".." });
};

let reqData = {};
let resData = {};
const fakeAPI = {
  sendReq: (data: any) => {
    reqData = data;
  },
  getReq: () => reqData,
  sendRes: (data: any) => {
    resData = data;
  },
  getRes: () => resData,
};

const serverSideFn = () => {};

const checkObjectType = <TDataType extends object>(object: any) => {
  const testObject = {} as TDataType;
  Object.entries(testObject).forEach(([key, value]) =>
    console.log(`key: ${key}, value: ${value}`)
  );
};

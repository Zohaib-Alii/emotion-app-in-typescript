// ts interface
export type State = {
  userName: string;
  userID: string | number;
  test: boolean;
  allFeeds: string[];
};

export type LoginType = {
  email: string;
  password: string;
};
export type formSubmitValues = {
  email: string;
  password: string;
  Name: null | string;
};

export type errorInfo = {
  values: {};
  errorFileds: {}[];
  outofDate: boolean;
};

export type emptyArray = {
  Bio: string;
  Religion: string;
  id: string;
  image: string;
  likes: {}[];
  nickName: string;
};
export type feedsType = {
  id: string;
  image: string | null;
  Bio: string;
  nickName: string;
  Religion: string;
};

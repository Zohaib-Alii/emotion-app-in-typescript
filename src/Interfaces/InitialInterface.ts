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
// store by default for userSelector
export type storeDefault = {
  currentUser: {
    allFeeds: {}[];
    test: boolean;
    userID: string;
    userName: string;
  };
};
export type feedsType = {
  id: string;
  image: string | null;
  Bio: string;
  nickName: string;
  Religion: string;
};
// add new feeds
export type addProfileType = {
  image: {}[] | null;
  Bio: string;
  nickName: string;
  Religion: string;
};

export type imageNormFile = {
  file: {} | null;
  fileList: {}[];
};

export type imageUpload = {
  uid: string;
  lastModified: number | string;
  lastModifiedDate: number | string;
  // Wed Dec 21 2022 15:54:35 GMT-0800 (Pacific Standard Time) {}
  name: string;
  // "d0ef18e8f39049e7876f18ddb5070788-removebg-preview.png"
  size: number | string;
  // 11298
  type: string;
  // "image/png"
  webkitRelativePath: "" | string | number;
};

export type feeds = {
  feeds: {
    Bio: string;
    Religion: string;
    id: string;
    image: string;
    likes: {}[];
    nickName: string;
  };
};

export type alreadyLikeChecked = {
  type: {} | undefined;
};

export type currentLike = {
  likedOn: {};
  likerId: string;
  likerName: string;
  status: string;
};

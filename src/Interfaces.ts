export interface Image {
  dimension: {
    height: number;
    width: number;
  } | null;
  filename: string;
  id: string;
  imageType: string;
  label: {
    en: string;
    ja: string;
    ko: string;
    vn: string;
  };
  name: string;
  trimmed: {
    filename: string;
    height: number;
    width: number;
  };
  __typename: 'Picture';
}

export interface User {
  description: string;
  id: string;
  nickname: string;
  profileImage: Image;
  role: 'member' | 'teacher' | 'admin';
  status: {
    follower: number;
    following: string;
  };
  username: string;
  __typename: 'User';
}

export interface Post {
  commentsLength: number | null;
  content: string | null;
  created: string | null;
  id: string | null;
  image: any | null;
  isLike: boolean | null;
  likesLength: number | null;
  sticker: Image | null;
  user: User | null;
  __typename: 'Discuss';
}

export interface DiscussList {
  data: {
    discussList: {
      total: number;
      list: Array<Post>;
      __typename: 'DiscussList';
    };
  };
  extensions: {
    runTime: number;
  };
}

export interface CheckFollow {
  data: {
    checkFollow: {
      isFollow: boolean;
      __typename: 'CheckFollow';
    };
  };
  extensions: {
    runTime: number;
  };
}

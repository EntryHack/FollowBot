import fetch from 'node-fetch';
import axios from 'axios';
import { sid } from './State';

export const follow = async (id: string) => {
  if (sid === '') return;

  return await (
    await fetch('https://playentry.org/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Cookie: `ETR_SID=${sid}`,
      },
      body: JSON.stringify({
        query: `mutation FOLLOW($user: String) {
          follow(user: $user) {
            id
            user {
              id
              username
              nickname
              profileImage {
                id
                name
                label {
                  ko
                  en
                  ja
                  vn
                  __typename
                }
                filename
                imageType
                dimension {
                  width
                  height
                  __typename
                }
                trimmed {
                  filename
                  width
                  height
                  __typename
                }
                __typename
              }
              status {
                following
                follower
                __typename
              }
              __typename
            }
            follow {
              id
              username
              nickname
              profileImage {
                id
                name
                label {
                  ko
                  en
                  ja
                  vn
                  __typename
                }
                filename
                imageType
                dimension {
                  width
                  height
                  __typename
                }
                trimmed {
                  filename
                  width
                  height
                  __typename
                }
                __typename
              }
              status {
                following
                follower
                __typename
              }
              __typename
            }
            __typename
          }
        }
        `,
        operationName: 'FOLLOW',
        variables: {
          user: id,
        },
      }),
    })
  ).json();
};

export const getPages = async () => {
  return await (
    await axios({
      method: 'POST',
      url: 'https://playentry.org/graphql',
      data: {
        query:
          'query ($pageParam: PageParam, $query: String, $user: String, $category: String, $term: String, $prefix: String, $progress: String) {\n  discussList(\n    pageParam: $pageParam\n    query: $query\n    user: $user\n    category: $category\n    term: $term\n    prefix: $prefix\n    progress: $progress\n  ) {\n    total\n    list {\n      id\n      title\n      created\n      commentsLength\n      likesLength\n      visit\n      user {\n        id\n        nickname\n        username\n        profileImage {\n          id\n          name\n          label {\n            ko\n            en\n            ja\n            vn\n            __typename\n          }\n          filename\n          imageType\n          dimension {\n            width\n            height\n            __typename\n          }\n          trimmed {\n            filename\n            width\n            height\n            __typename\n          }\n          __typename\n        }\n        status {\n          following\n          follower\n          __typename\n        }\n        description\n        role\n        __typename\n      }\n      bestComment {\n        content\n        __typename\n      }\n      thumbnail\n      __typename\n    }\n    __typename\n  }\n}\n',
        variables: {
          query: '',
          category: 'free',
          pageParam: { display: 10, sort: 'created' },
          term: 'all',
        },
      },
      headers: {
        'content-type': 'application/json',
        Cookies: `ETR_SID=${sid}`,
      },
    })
  ).data;
};

export const getFollowers = async (id: string) => {
  return new Promise<any>((resolve) => {
    axios({
      method: 'POST',
      url: 'https://playentry.org/graphql',
      headers: {
        'content-type': 'application/json',
      },
      data: `{"query":"query SELECT_FOLLOWERS($user: String, $pageParam: PageParam) {\\n  followers(user: $user, pageParam: $pageParam) {\\n    total\\n    list {\\n      user {\\n        id\\n        username\\n        nickname\\n        profileImage {\\n          id\\n          name\\n          label {\\n            ko\\n            en\\n            ja\\n            vn\\n            __typename\\n          }\\n          filename\\n          imageType\\n          dimension {\\n            width\\n            height\\n            __typename\\n          }\\n          trimmed {\\n            filename\\n            width\\n            height\\n            __typename\\n          }\\n          __typename\\n        }\\n        status {\\n          following\\n          follower\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n","operationName":"SELECT_FOLLOWERS","variables":{"user":"${id}","pageParam":{"display":50}}}`,
    })
      .then(async (res) => resolve(await res.data))
      .catch(() => {});
  });
};

export const getFollowing = async (id: string) => {
  return new Promise<any>((resolve) => {
    axios({
      method: 'POST',
      url: 'https://playentry.org/graphql',
      headers: {
        'content-type': 'application/json',
      },
      data: `{"query":"query SELECT_FOLLOWINGS($user: String, $pageParam: PageParam) {\n  followings(user: $user, pageParam: $pageParam) {\n    total\n    list {\n      follow {\n        id\n        username\n        nickname\n        profileImage {\n          id\n          name\n          label {\n            ko\n            en\n            ja\n            vn\n            __typename\n          }\n          filename\n          imageType\n          dimension {\n            width\n            height\n            __typename\n          }\n          trimmed {\n            filename\n            width\n            height\n            __typename\n          }\n          __typename\n        }\n        status {\n          following\n          follower\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n","operationName":"SELECT_FOLLOWINGS","variables":{"user":"${id}","pageParam":{"display":50}}}`,
    })
      .then(async (res) => resolve(await res.data))
      .catch(() => {});
  });
};

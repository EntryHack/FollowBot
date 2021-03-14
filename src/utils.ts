import fetch from 'node-fetch';
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
    await fetch('https://playentry.org/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Cookie: `ETR_SID=${sid}`,
      },
      body: JSON.stringify({
        query: `query(
          $pageParam: PageParam
          $query: String
          $user: String
          $category: String
          $term: String
          $prefix: String
          $progress: String
        ) {
          discussList(
            pageParam: $pageParam
            query: $query
            user: $user
            category: $category
            term: $term
            prefix: $prefix
            progress: $progress
          ) {
            total
            list {
              id
              content
              created
              commentsLength
              likesLength
              user {
                id
                nickname
                username
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
                description
                role
                __typename
              }
              image {
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
              sticker {
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
              isLike
              __typename
            }
            __typename
          }
        }
        `,
        variables: {
          query: '',
          category: 'free',
          pageParam: { display: 10, sort: 'created' },
          term: 'all',
        },
      }),
    })
  ).json();
};

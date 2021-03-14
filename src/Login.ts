import fetch from 'node-fetch';
import { setSid, sid } from './State';

export const login = async (username: string, password: string, remember: boolean = false) => {
  const res = await fetch('https://playentry.org/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation(
        $username: String!
        $password: String!
        $rememberme: Boolean
        $captchaValue: String
        $captchaKey: String
        $captchaType: String
      ) {
        signinByUsername(
          username: $username
          password: $password
          rememberme: $rememberme
          captchaValue: $captchaValue
          captchaKey: $captchaKey
          captchaType: $captchaType
        ) {
          id
          username
          nickname
          role
          isEmailAuth
          isSnsAuth
          isPhoneAuth
          studentTerm
          status {
            userStatus
          }
          profileImage {
            id
            name
            label {
              ko
              en
              ja
              vn
            }
            filename
            imageType
            dimension {
              width
              height
            }
            trimmed {
              filename
              width
              height
            }
          }
          banned {
            username
            nickname
            reason
            bannedCount
            bannedType
            projectId
            startDate
            userReflect {
              status
              endDate
            }
          }
        }
      }
      `,
      variables: { username, password, rememberme: remember },
    }),
  });
  const cookie = new RegExp('ETR_SID' + '=[^;]+').exec(res.headers.get('set-cookie')!);
  const ETR_SID = decodeURIComponent(!!cookie ? cookie.toString().replace(/^[^=]+./, '') : '');

  setSid(ETR_SID);

  return await res.json();
};

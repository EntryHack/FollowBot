import db from 'quick.db';
import { login } from './Login';
import { follow, getFollowers, getFollowing, getPages } from './utils';
import { DiscussList } from './Interfaces';
import config from './config';

const main = async () => {
  await login(config.username, config.password);

  const ids: Array<string> = [];

  setInterval(async () => {
    const { data: res }: DiscussList = await getPages();

    res.discussList.list.forEach(async (post) => {
      if (post.user?.id === undefined) return;
      if (ids.includes(post.user.id)) return;

      ids.push(post.user.id);
      await follow(post.user.id);
      console.log(`${post.user.username}님을 팔로우했어요!`);

      (await getFollowers(post.user.id)).data.followers.list.forEach(async ({ user }: any) => {
        if (user?.id === undefined) return;
        if (ids.includes(user.id)) return;

        ids.push(user.id);
        await follow(user.id);
        console.log(`${user.username}님을 팔로우했어요!`);

        (await getFollowers(user.id)).data.followers.list.forEach(async ({ user }: any) => {
          if (user?.id === undefined) return;
          if (ids.includes(user.id)) return;

          ids.push(user.id);
          await follow(user.id);
          console.log(`${user.username}님을 팔로우했어요!`);
        });

        (await getFollowing(user.id)).data.followers.list.forEach(async ({ user }: any) => {
          if (user?.id === undefined) return;
          if (ids.includes(user.id)) return;

          ids.push(user.id);
          await follow(user.id);
          console.log(`${user.username}님을 팔로우했어요!`);
        });
      });

      (await getFollowing(post.user.id)).data.followers.list.forEach(async ({ user }: any) => {
        if (user?.id === undefined) return;
        if (ids.includes(user.id)) return;

        ids.push(user.id);
        await follow(user.id);
        console.log(`${user.username}님을 팔로우했어요!`);

        (await getFollowers(user.id)).data.followers.list.forEach(async ({ user }: any) => {
          if (user?.id === undefined) return;
          if (ids.includes(user.id)) return;

          ids.push(user.id);
          await follow(user.id);
          console.log(`${user.username}님을 팔로우했어요!`);
        });

        (await getFollowing(user.id)).data.followers.list.forEach(async ({ user }: any) => {
          if (user?.id === undefined) return;
          if (ids.includes(user.id)) return;

          ids.push(user.id);
          await follow(user.id);
          console.log(`${user.username}님을 팔로우했어요!`);
        });
      });
    });
  }, 1000);

  setInterval(() => {
    db.set(
      `users-${
        new Date().getFullYear().toString() +
        ((new Date().getMonth() + 1).toString().length === 1 ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()) +
        new Date().getDate().toString()
      }`,
      ids
    );
  }, 10000);
};

main();

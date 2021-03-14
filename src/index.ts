import { login } from './Login';
import { follow, getPages } from './utils';
import { DiscussList } from './Interfaces';
import config from './config';

const main = async () => {
  await login(config.username, config.password);

  const ids: Array<string> = [];

  setInterval(async () => {
    const res: DiscussList = await getPages();

    res.data.discussList.list.forEach(async (post) => {
      if (post.user?.id === undefined) return;
      if (ids.includes(post.user.id)) return;

      ids.push(post.user.id);
      await follow(post.user.id);
      console.log(`${res.data.discussList.list[0].user?.nickname}님을 팔로우했어요!`);
    });
  }, 1000);
};

main();

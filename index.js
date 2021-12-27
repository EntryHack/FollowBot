fetch('https://playentry.org/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `query FIND_USERSTATUS_BY_USERNAME($id: String) {
      userstatus(id: $id) {
        status {
          following
          follower
        }
      }
    }`,
    variables: { id: '604db5a187ee84008ea66612' },
  }),
})
  .then((res) => res.json())
  .then(
    ({
      data: {
        userstatus: { status },
      },
    }) => {
      document.getElementById('following').textContent = status.following + '명';
      document.getElementById('followers').textContent = status.follower + '명';
      document.getElementById('f4f').textContent = ((status.follower / status.following) * 100).toFixed(2) + '%';
    }
  );

export const useState = <T>(value: T) => {
  let v = value;
  const state: [T, (value: T) => T] = [v, (value: T) => (v = value)];
  return state;
};

export const [logon, setLogon] = useState(false);
// export const [sid, setSid] = useState('wa');

export let sid = ''
export const setSid = (value: string) => {
  sid = value
}
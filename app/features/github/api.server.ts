export const getUser = async () => {
  const res = await fetch('https://api.github.com/users/gabrrielsilva');

  return res.json();
}
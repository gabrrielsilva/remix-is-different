import type { Repo, User } from './types';

const url = 'https://api.github.com';
const config = {
  headers: {
    accept: 'application/vnd.github.v3+json',
    Authorization: 'token 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',
  },
};

export const getUser = async (user: string): Promise<User> => {
  const res = await fetch(`${url}/users/${user}`, config);

  return res.json();
};

export const getRepos = async (user: string): Promise<Repo[]> => {
  const res = await fetch(`${url}/users/${user}/repos`, config);

  return res.json();
};

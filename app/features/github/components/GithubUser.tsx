import type { User } from '../types';

interface GithubUserProps {
  user: User
}

export function GithubUser({ user }: GithubUserProps) {
  const { avatar_url, name, bio, location } = user;

  return (
    <>
      <img src={avatar_url} alt={name} width='100' />
      <h1>{ name }</h1>
      <h2>{ bio }</h2>
      <h2>{ location }</h2>
    </>
  )
}
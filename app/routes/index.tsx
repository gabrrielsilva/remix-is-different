import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/features/github/api.server';
import type { User } from '~/features/github/types';

interface LoaderData {
  user: User;
}

export const loader = async () => {
  return  json<LoaderData>({
    user: await getUser()
  })
};

export default function () {
  const { user: { id, name, avatar_url, bio, location } } = useLoaderData<LoaderData>();

  return (
    <>
      <img src={avatar_url} alt={name} width='100' />
      <h1>{ name }</h1>
      <h2>{ bio }</h2>
      <h2>{ location }</h2>
    </>
  );
}
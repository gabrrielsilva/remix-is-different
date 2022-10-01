import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Repo } from '~/features/github/types';

interface LoaderData {
  repos: Repo[]
}

export const meta: MetaFunction = ({ parentsData }) => ({
  title: `Github - ${parentsData['routes/github.$user'].user.name} - Repos`,
});

export const loader: LoaderFunction = async ({ params }) => {
  throw new Error('Servidor ta cansado!')
  
  // return json<LoaderData>({
  //   repos: await getRepos(params.user ?? '')
  // })
}

export default function () {
  const { repos } = useLoaderData<LoaderData>();

  return (
    <ul>
      {repos.map(repo => (
        <li key={repo.id}>{ repo.name }</li>
      ))}
    </ul>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log(error.message);
  
  return <h1>Whoops... rota 'repos' ta com defeito</h1>
}
import type { Message } from '@prisma/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { z } from 'zod';
import { getMessages, sendMessage } from '~/features/chat/api.server';

const schema = z.object({
  message: z.string().min(6),
})

interface LoaderData {
  messages: Message[]
}

interface ActionData {
  message: Message | null,
  error: string
}

export const loader: LoaderFunction = async function () {
  return json<LoaderData>({
    messages: await getMessages()
  })
}

export const action: ActionFunction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  const payload = schema.safeParse(data);

  // return sendMessage(String(data.message ?? ''));
  return json<ActionData>({
    message: payload.success ? await sendMessage(String(data.message ?? '')) : null,
    error: !payload.success ? 'Please, report or try again' : ''
  })
}

export default function () {
  const { messages } = useLoaderData<LoaderData>();
  const transition = useTransition();
  const isSubmitting = transition.state === 'submitting';
  const formRef = useRef<HTMLFormElement>(null);
  const data = useActionData<ActionData>();

  console.log(data);
  
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting])

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <h1>Chat</h1>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
      <Form ref={formRef} method='post' style={{ display: 'flex' }}>
        <textarea autoFocus name='message' disabled={isSubmitting} ></textarea>
        <button type='submit' disabled={isSubmitting}>Enviar</button>
      </Form>
      {isSubmitting && <p>Enviando mensagem...</p>}
    </>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log(error.message);
  
  return <h1>{error.message}</h1>
}
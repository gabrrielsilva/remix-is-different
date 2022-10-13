import crypto from 'node:crypto';
import { db } from '~/service/db.server';

export const getMessages = () => {
  return db.message.findMany();
}

export const sendMessage = (message: string) => {
  return db.message.create({
    data: {
      message,
      user: crypto.randomUUID()
    }
  })
}
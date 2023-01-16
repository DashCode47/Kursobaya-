// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Messages, Comments, Post, User, ChatRoom } = initSchema(schema);

export {
  Messages,
  Comments,
  Post,
  User,
  ChatRoom
};
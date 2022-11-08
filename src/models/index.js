// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comments, Post, User } = initSchema(schema);

export {
  Comments,
  Post,
  User
};
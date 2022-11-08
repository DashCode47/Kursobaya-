import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

type CommentsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerComments = {
  readonly id: string;
  readonly text?: string | null;
  readonly image?: string | null;
  readonly postID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComments = {
  readonly id: string;
  readonly text?: string | null;
  readonly image?: string | null;
  readonly postID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comments = LazyLoading extends LazyLoadingDisabled ? EagerComments : LazyComments

export declare const Comments: (new (init: ModelInit<Comments, CommentsMetaData>) => Comments) & {
  copyOf(source: Comments, mutator: (draft: MutableModel<Comments, CommentsMetaData>) => MutableModel<Comments, CommentsMetaData> | void): Comments;
}

type EagerPost = {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly nofLikes?: number | null;
  readonly nofComments?: number | null;
  readonly Comments?: (Comments | null)[] | null;
  readonly block?: string | null;
  readonly userID: string;
  readonly type: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly nofLikes?: number | null;
  readonly nofComments?: number | null;
  readonly Comments: AsyncCollection<Comments>;
  readonly block?: string | null;
  readonly userID: string;
  readonly type: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post, PostMetaData>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

type EagerUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly UserComments?: (Comments | null)[] | null;
  readonly UserPosts?: (Post | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly UserComments: AsyncCollection<Comments>;
  readonly UserPosts: AsyncCollection<Post>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}
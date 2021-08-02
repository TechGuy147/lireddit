import { Post } from "../entities/Post";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";
// import { MyContext } from "src/types";
import { MyContext } from '../types'

@Resolver()
export class PostResolver {
    // Get All Posts
    @Query(() => [Post])
    posts(
        @Ctx() { em }: MyContext
    ): Promise<Post[]> {

        return em.find(Post, {});

    }

    // Get Post Using Id
    @Query(() => Post, { nullable: true })
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {

        return em.findOne(Post, { id });

    }

    // Create New Post
    @Mutation(() => Post)
    async createPost(
        @Arg('title', () => String) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, { title });
        await em.persistAndFlush(post);
        return post;

    }

    // Update Post
    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id', () => Int) id: number,
        @Arg('title', () => String) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id });
        if (!post) {
            return null;
        }
        if (typeof title !== 'undefined') {
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post;

    }

    // Delete Post
    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Boolean> {
        try {
            await em.nativeDelete(Post, { id });
        }
        catch {
            return false;
        }
        return true;
    }

}

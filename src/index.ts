import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./entities/constants";
// import { Post } from "./entities/Post";
import mikroConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from "./resolvers/post";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(3000, () => {
        console.log("Server started on localhost:3000")
    })

    // // To insert data into Table
    // const post = orm.em.create(Post, { title: "First Post" })
    // await orm.em.persistAndFlush(post);

    // // Native Insert
    // await orm.em.nativeInsert(Post, { title: "Second Post" })

    // // Get Data from Table
    // const posts = await orm.em.find(Post, {});
    // console.log("Postssss", posts)
};

main();

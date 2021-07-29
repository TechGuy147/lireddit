import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./entities/constants";
import { Post } from "./entities/Post";
import mikroConfig from './mikro-orm.config'

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

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

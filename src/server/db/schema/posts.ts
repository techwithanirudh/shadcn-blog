import { integer, text, uniqueIndex, timestamp } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { pgTableCreator } from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `blog_${name}`);

export const posts = createTable('post', {
    createdAt: timestamp('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP(3)`),
    slug: text('slug').primaryKey(),
    likes: integer('likes').notNull().default(0),
    views: integer('views').notNull().default(0)
})  
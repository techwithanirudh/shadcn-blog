import fs from 'node:fs/promises';
import path from 'node:path';

import { db } from '.';
import { posts } from './schema';

const main = async () => {
  try {
    const files = await fs.readdir(path.join(process.cwd(), './src/content'));

    for (const file of files) {
      const slug = file.replace('.mdx', '');
      await db.insert(posts).values({ slug, views: 0 });
    }

    console.log('DB seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
  }
};

main();

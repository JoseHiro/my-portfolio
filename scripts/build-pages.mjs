import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('out-pages');
const base = (process.env.PAGES_BASE_PATH || '/my-portfolio').replace(/\/$/, '');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp('public/img', path.join(output, 'img'), { recursive: true });
await cp('public/design-lab', path.join(output, 'design-lab'), { recursive: true });
for (const file of ['design-lab/index.html', 'design-lab/horizontal.html']) {
  const html = await readFile(path.join(output, file), 'utf8');
  await writeFile(path.join(output, file), html.replaceAll('/img/', `${base}/img/`));
}
const horizontal = await readFile(path.join(output, 'design-lab/horizontal.html'), 'utf8');
await writeFile(path.join(output, 'index.html'), horizontal.replace('href="index.html#3"', 'href="design-lab/index.html#3"'));
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`GitHub Pages site prepared at ${output} (base: ${base})`);

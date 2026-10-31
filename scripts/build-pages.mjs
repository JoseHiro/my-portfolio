import { cp, mkdir, readFile, writeFile, rm, readdir } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('out-pages');
const base = (process.env.PAGES_BASE_PATH || '/my-portfolio').replace(/\/$/, '');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp('public/img', path.join(output, 'img'), { recursive: true });
await cp('public/design-lab', path.join(output, 'design-lab'), { recursive: true });
async function fixPaths(directory) {
  for (const entry of await readdir(directory, {withFileTypes:true})) {
    const file=path.join(directory,entry.name);
    if(entry.isDirectory()) await fixPaths(file);
    else if(/\.(html|js)$/.test(entry.name)) {
      const text=await readFile(file,'utf8');
      await writeFile(file,text.replaceAll(/(?<!\.)\/img\//g, `${base}/img/`));
    }
  }
}
await fixPaths(path.join(output,'design-lab'));
const horizontal = await readFile(path.join(output, 'design-lab/horizontal.html'), 'utf8');
await writeFile(path.join(output, 'index.html'), horizontal.replace('href="index.html#3"', 'href="design-lab/index.html#3"').replace('src="projects.js', 'src="design-lab/projects.js').replace('src="catalog.js"', 'src="design-lab/catalog.js"'));
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`GitHub Pages site prepared at ${output} (base: ${base})`);

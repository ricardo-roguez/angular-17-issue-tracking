
import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
    projectRoot: '/.src',
    projectName: 'my-blog',
    outDir: './dist/static',
    distFolder: './dist/my-blog',
    routes: {
    '/posts/:id': {
      type: 'contentFolder',
      id: {
        folder: "./mdfiles"
      }
    },}
}
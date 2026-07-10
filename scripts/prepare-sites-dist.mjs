import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const hasExtension = url.pathname.split('/').pop()?.includes('.');
    if (!hasExtension) {
      const cleanPath = url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname;
      response = await env.ASSETS.fetch(new Request(new URL(cleanPath + '/index.html', request.url), request));
      if (response.status !== 404) {
        return response;
      }
    }

    return env.ASSETS.fetch(new Request(new URL('/404.html', request.url), request));
  }
};
`;

await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/client', { recursive: true });
await cp('out', 'dist/client', { recursive: true });
await writeFile('dist/server/index.js', worker);

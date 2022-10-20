#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
if (process.argv[2] === 'fork') {
  await import('./fork.js');
} else {
  ((await import('./boot.js'))).default(decodeURI((new URL(import.meta.url)).pathname));
}

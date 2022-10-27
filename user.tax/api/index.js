#!/usr/bin/env -S node --loader=@u6x/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict
if (process.argv[2] === 'fork') {
  await import('./fork.js');
} else {
  ((await import('./boot.js'))).default(decodeURI((new URL(import.meta.url)).pathname));
}

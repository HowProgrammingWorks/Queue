'use strict';

const { performance } = require('node:perf_hooks');

const OPS = 100_000;

const options = { nodeSize: 2048, poolSize: 2 };

const implementations = {
  queue: require('../JavaScript/1-queue.js'),
  naïve: require('../JavaScript/2-naïve.js'),
  fixed: require('../JavaScript/3-fixed.js'),
  unrolled: require('../JavaScript/4-unrolled.js'),
  spare: require('../JavaScript/5-spare.js'),
  pool: require('../JavaScript/6-pool.js'),
  circular: require('../JavaScript/8-circular.js'),
  nodiv: require('../JavaScript/9-no-div.js'),
};

const test = (queue) => {
  const startMem = process.memoryUsage().heapUsed;
  const t0 = performance.now();

  let preventOpt = 0;
  for (let i = 0; i < OPS; i++) {
    queue.enqueue({ id: i });
  }
  for (let i = 0; i < OPS; i++) {
    const { id } = queue.dequeue();
    preventOpt += id;
  }

  const t1 = performance.now();
  if (preventOpt === 0) console.log('Never print');
  const endMem = process.memoryUsage().heapUsed;

  return {
    cpu: (t1 - t0).toFixed(2),
    memory: ((endMem - startMem) / 1024).toFixed(2),
  };
};

const main = () => {
  const results = {};
  const entries = Object.entries(implementations);
  for (const { 0: name, 1: Queue } of entries) {
    global.gc();
    const queue = new Queue(options);
    const result = test(queue);
    results[name] = result;
  }
  console.table(results);
};

main();

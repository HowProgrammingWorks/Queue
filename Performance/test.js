'use strict';

const path = require('node:path');
const process = require('node:process');
const { performance } = require('node:perf_hooks');

const WARM_UP = 3;

const test = (queue, ops) => {
  global.gc();
  const startMem = process.memoryUsage().heapUsed;
  const t0 = performance.now();

  let preventOpt = 0;
  for (let i = 0; i < ops; i++) {
    queue.enqueue({ id: i });
  }
  for (let i = 0; i < ops; i++) {
    const item = queue.dequeue();
    if (item) preventOpt += item.id;
  }

  const t1 = performance.now();
  if (preventOpt === 0) console.log('Never print');
  const endMem = process.memoryUsage().heapUsed;

  return { cpu: t1 - t0, ram: (endMem - startMem) / 1024 };
};

const main = (file, rounds, ops, options) => {
  const name = path.basename(file, '.js').split('-').at(-1);
  const Queue = require(`../JavaScript/${file}`);
  const queue = new Queue(options);
  const results = { cpu: 0, ram: 0 };
  const count = rounds + WARM_UP;
  for (let i = 0; i < count; i++) {
    const { cpu, ram } = test(queue, ops);
    if (i > WARM_UP) {
      results.cpu += cpu;
      results.ram += ram;
    }
  }
  results.cpu = parseFloat((results.cpu / rounds).toFixed(2));
  results.ram = parseFloat((results.ram / rounds).toFixed(2));
  console.log(JSON.stringify({ name, ...results }));
};

const file = process.argv.at(2);
const rounds = parseInt(process.argv.at(3));
const ops = parseInt(process.argv.at(4));
const nodeSize = parseInt(process.argv.at(5));
const poolSize = parseInt(process.argv.at(6));
const options = { nodeSize, poolSize };

main(file, rounds, ops, options);

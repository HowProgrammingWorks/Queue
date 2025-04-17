'use strict';

const { execSync } = require('node:child_process');

const implementations = [
  //['1-queue.js', 2048, 1],
  ['2-naïve.js', 2048, 1],
  ['3-fixed.js', 2048, 1],
  ['4-unrolled.js', 2048, 1],
  ['5-spare.js', 2048, 1],
  ['6-pool.js', 1024, 2],
  ['7-current.js', 1024, 2],
  ['8-circular.js', 2048, 1],
  ['9-nodiv.js', 2048, 1],
];

const rounds = 100;
const ops = 500_000;

const main = () => {
  const results = [];
  for (const [file, nodeSize, poolSize] of implementations) {
    const options = `${file} ${rounds} ${ops} ${nodeSize} ${poolSize}`;
    console.log(`Test: ${options}`);
    const switches = '--nouse-idle-notification --expose-gc';
    const cmd = `node ${switches} Performance/test.js ${options}`;
    const out = execSync(cmd, { encoding: 'utf8' });
    results.push(out.replaceAll('\n', ','));
  }
  const data = results.join('').slice(0, -1);
  console.table(JSON.parse(`[${data}]`));
};

main();

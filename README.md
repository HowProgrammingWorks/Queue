# JavaScript Queue optimised for V8

- Implementations:
  - [1-queue.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/1-queue.js) — Interface with naïve implementation on the top of Array
  - [2-naïve.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/2-naïve.js) — naïve implementation on the top of singly linked list
  - [3-fixed.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/3-fixed.js) — FixedQueue (from Node.js) on the top of FixedCircularBuffer
  - [4-unrolled.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/4-unrolled.js) — UnrolledQueue on the top of unrolled array
  - [5-spare.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/5-spare.js) — unrolled array + single spare (free) item
  - [6-pool.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/6-pool.js) — unrolled array + object pool
  - [7-current.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/7-current.js) — unrolled array combined with pool into common singly linked list
  - [8-circular.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/8-circular.js) — circular buffer + unrolled array
  - [9-no-div.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/9-no-div.js) — circular buffer + unrolled array without div operation
- Production-ready code
  - Metarhia: [metautil](https://github.com/metarhia/metautil)
  - Node.js implementation: [lib/internal/fixed_queue.js](https://github.com/nodejs/node/blob/86bfdb552863f09d36cba7f1145134346eb2e640/lib/internal/fixed_queue.js)
- Underlying data structures:
  - [Linked list](https://github.com/HowProgrammingWorks/LinkedList)
  - [Double-ended queue](https://github.com/HowProgrammingWorks/Dequeue)
- Related async abstractions:
  - [Asynchronous Queue](https://github.com/HowProgrammingWorks/AsyncQueue)
  - [Asynchronous Concurrent Queue with Priority and Factor](https://github.com/HowProgrammingWorks/ConcurrentQueue)


## Performance tests

> UNDER CONSTRUCTION

Run: `npm run perf`

```
┌─────────┬────────────┬───────┬──────────┐
│ (index) │ name       │ cpu   │ ram      │
├─────────┼────────────┼───────┼──────────┤
│ 0       │ 'naïve'    │ 58.57 │ 37454.62 │
│ 1       │ 'fixed'    │ 5.03  │ 19473.76 │
│ 2       │ 'unrolled' │ 5.16  │ 19278.73 │
│ 3       │ 'spare'    │ 4.97  │ 19298.66 │
│ 4       │ 'pool'     │ 5.34  │ 19205.66 │
│ 5       │ 'current'  │ 5.3   │ 15610.69 │
│ 6       │ 'circular' │ 5.24  │ 19242.05 │
│ 7       │ 'nodiv'    │ 4.97  │ 19314.83 │
└─────────┴────────────┴───────┴──────────┘
```

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

> Node: UNDER CONSTRUCTION

Run: `Performance/run.sh`

```
┌──────────┬──────────┬───────────┐
│ (index)  │ cpu      │ memory    │
├──────────┼──────────┼───────────┤
│ queue    │ '576.54' │ '5524.62' │
│ naïve    │ '12.06'  │ '7620.13' │
│ fixed    │ '6.32'   │ '6045.08' │
│ unrolled │ '6.46'   │ '6045.98' │
│ spare    │ '6.72'   │ '5896.03' │
│ pool     │ '6.51'   │ '6029.93' │
│ circular │ '5.67'   │ '5510.35' │
│ nodiv    │ '4.45'   │ '4093.59' │
└──────────┴──────────┴───────────┘
```

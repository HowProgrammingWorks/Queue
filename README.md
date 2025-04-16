# JavaScript Queue optimised for V8

- Implementations:
  - [1-queue.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/1-queue.js) — Interface with naïve implementation on the top of Array
  - [2-naïve.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/2-naïve.js) — naïve implementation on the top of singly linked list
  - [3-fixed.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/3-fixed.js) — FixedQueue (from Node.js) on the top of FixedCircularBuffer
  - [4-unrolled.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/4-unrolled.js) — UnrolledQueue on the top of unrolled arrey
  - [5-spare.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/5-spare.js) — unrolled arrey + single spare (free) item
  - [6-pool.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/6-pool.js) — unrolled arrey + object pool
  - [7-current.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/7-current.js) — unrolled arrey combined with pool into common singly linked list
  - [8-circular.js](https://github.com/HowProgrammingWorks/Queue/blob/main/JavaScript/8-circular.js) — circular buffer + unrolled array
- Production-ready code
  - Metarhia: [metautil](https://github.com/metarhia/metautil)
  - Node.js implementation: [lib/internal/fixed_queue.js](https://github.com/nodejs/node/blob/86bfdb552863f09d36cba7f1145134346eb2e640/lib/internal/fixed_queue.js)
- Underlying data structures:
  - [Linked list](https://github.com/HowProgrammingWorks/LinkedList)
  - [Double-ended queue](https://github.com/HowProgrammingWorks/Dequeue)
- Related async abstractions:
  - [Asynchronous Queue](https://github.com/HowProgrammingWorks/AsyncQueue)
  - [Asynchronous Concurrent Queue with Priority and Factor](https://github.com/HowProgrammingWorks/ConcurrentQueue)

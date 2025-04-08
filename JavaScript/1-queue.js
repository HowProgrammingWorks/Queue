'use strict';

class Queue {
  #buffer = [];

  get length() {
    return this.#buffer.length;
  }

  isEmpty() {
    return this.#buffer.length === 0;
  }

  enqueue(item) {
    this.#buffer.push(item);
  }

  dequeue() {
    return this.#buffer.shift();
  }
}

// Usage

const mq = new Queue();

for (let id = 0; id < 5; id++) {
  mq.enqueue({ id });
}

while (!mq.isEmpty()) {
  const task = mq.dequeue();
  console.log(`Processing ${task.id}`);
}

for (let id = 100; id < 105; id++) {
  mq.enqueue({ id });
}

while (!mq.isEmpty()) {
  const task = mq.dequeue();
  console.log(`Processing ${task.id}`);
}

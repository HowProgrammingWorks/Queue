'use strict';

class QueueNode {
  length = 0;

  constructor({ size }) {
    this.size = size;
    this.buffer = new Array(size);
    this.reset();
  }

  reset() {
    this.readIndex = 0;
    this.writeIndex = 0;
    this.next = null;
  }

  enqueue(item) {
    if (this.writeIndex >= this.size) return false;
    this.buffer[this.writeIndex++] = item;
    this.length++;
    return true;
  }

  dequeue() {
    if (this.length === 0) return null;
    const index = this.readIndex++;
    const item = this.buffer[index];
    this.buffer[index] = null;
    this.length--;
    return item;
  }
}

class UnrolledQueue {
  #length = 0;
  #nodeSize = 2048;
  #head = null;
  #tail = null;
  #spare = null;

  constructor(options = {}) {
    const { nodeSize } = options;
    if (nodeSize) this.#nodeSize = nodeSize;
    const node = this.#createNode();
    this.#head = node;
    this.#tail = node;
  }

  #createNode() {
    return new QueueNode({ size: this.#nodeSize });
  }

  get length() {
    return this.#length;
  }

  enqueue(item) {
    if (!this.#head.enqueue(item)) {
      let node = this.#spare;
      if (node) this.#spare = null;
      else node = this.#createNode();
      this.#head.next = node;
      this.#head = node;
      this.#head.enqueue(item);
    }
    this.#length++;
  }

  dequeue() {
    if (this.#length === 0) return null;
    const tail = this.#tail;
    const item = tail.dequeue();
    this.#length--;
    if (tail.length > 0) return item;
    const next = this.#tail.next;
    if (next) {
      this.#tail = next;
      if (!this.#spare) {
        tail.reset();
        this.#spare = tail;
      }
    } else {
      tail.reset();
    }
    return item;
  }
}

// Usage

const mq = new UnrolledQueue({ nodeSize: 8 });

for (let id = 0; id < 5; id++) {
  mq.enqueue({ id });
}

while (mq.length) {
  const task = mq.dequeue();
  console.log(`Processing ${task.id}`);
}

for (let id = 100; id < 105; id++) {
  mq.enqueue({ id });
}

while (mq.length) {
  const task = mq.dequeue();
  console.log(`Processing ${task.id}`);
}

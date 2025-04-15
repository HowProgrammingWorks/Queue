'use strict';

class QueueNode {
  length = 0;

  constructor({ size }) {
    this.size = size;
    this.buffer = new Array(size).fill(null);
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
  #nodeSize = 1024;
  #poolSize = 2;
  #head = null;
  #tail = null;
  #current = null;

  constructor(options = {}) {
    const { nodeSize, poolSize } = options;
    if (nodeSize) this.#nodeSize = nodeSize;
    if (poolSize) this.#poolSize = poolSize;

    const first = this.#createNode();
    let node = first;
    for (let i = 1; i < this.#poolSize; i++) {
      node.next = this.#createNode();
      node = node.next;
    }

    this.#head = first;
    this.#current = first;
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
      if (this.#head.next === this.#current) {
        const node = this.#createNode();
        node.next = this.#head.next;
        this.#head.next = node;
        if (this.#tail === this.#head) this.#tail = node;
      }
      this.#head = this.#head.next;
      this.#head.enqueue(item);
    }
    this.#length++;
  }

  dequeue() {
    if (this.#length === 0) return null;
    const current = this.#current;
    const item = current.dequeue();
    this.#length--;
    if (current.length === 0) {
      current.reset();
      if (current !== this.#head) {
        this.#current = current.next;
        this.#tail.next = current;
        this.#tail = current;
      }
    }
    return item;
  }
}

// Usage

const mq = new UnrolledQueue({ nodeSize: 8, poolSize: 2 });

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

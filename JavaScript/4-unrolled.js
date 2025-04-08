'use strict';

class QueueNode {
  #length = 0;

  constructor({ size }) {
    this.size = size;
    this.buffer = new Array(size);
    this.readIndex = 0;
    this.writeIndex = 0;
    this.next = null;
  }

  get length() {
    return this.#length;
  }

  isEmpty() {
    return this.#length === 0;
  }

  isFull() {
    return this.#length === this.size;
  }

  enqueue(item) {
    if (this.isFull()) return false;
    this.buffer[this.writeIndex++] = item;
    this.#length++;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.buffer[this.readIndex++];
    this.#length--;
    return item;
  }
}

class UnrolledQueue {
  #length = 0;

  constructor(options = {}) {
    const { nodeSize = 2048 } = options;
    const node = new QueueNode({ size: nodeSize });
    this.head = node;
    this.tail = node;
    this.nodeSize = nodeSize;
  }

  get length() {
    return this.#length;
  }

  isEmpty() {
    return this.#length === 0;
  }

  enqueue(item) {
    if (!this.head.enqueue(item)) {
      const node = new QueueNode({ size: this.nodeSize });
      this.head.next = node;
      this.head = node;
      this.head.enqueue(item);
    }
    this.#length++;
  }

  dequeue() {
    const item = this.tail.dequeue();
    if (item !== null) {
      this.#length--;
      if (this.tail.isEmpty() && this.tail.next) {
        this.tail = this.tail.next;
      }
    }
    return item;
  }
}

// Usage

const mq = new UnrolledQueue({ nodeSize: 8 });

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

'use strict';

class CircularQueueNode {
  length = 0;

  constructor({ size }) {
    this.size = size;
    this.buffer = new Array(size);
    this.readIndex = 0;
    this.writeIndex = 0;
    this.next = null;
  }

  enqueue(item) {
    if (this.length === this.size) return false;
    this.buffer[this.writeIndex] = item;
    this.writeIndex = (this.writeIndex + 1) % this.size;
    this.length++;
    return true;
  }

  dequeue() {
    if (this.length === 0) return null;
    const item = this.buffer[this.readIndex];
    this.buffer[this.readIndex] = null;
    this.readIndex = (this.readIndex + 1) % this.size;
    this.length--;
    return item;
  }
}

class UnrolledQueue {
  #length = 0;
  #nodeSize = 2048;
  #head = null;
  #tail = null;

  constructor(options = {}) {
    const { nodeSize } = options;
    if (nodeSize) this.#nodeSize = nodeSize;
    const node = new CircularQueueNode({ size: this.#nodeSize });
    this.#head = node;
    this.#tail = node;
  }

  get length() {
    return this.#length;
  }

  enqueue(item) {
    if (!this.#head.enqueue(item)) {
      const node = new CircularQueueNode({ size: this.#nodeSize });
      this.#head.next = node;
      this.#head = node;
      this.#head.enqueue(item);
    }
    this.#length++;
  }

  dequeue() {
    if (this.#length === 0) return null;
    const item = this.#tail.dequeue();
    this.#length--;
    if (this.#tail.length === 0 && this.#tail.next) {
      this.#tail = this.#tail.next;
    }
    return item;
  }
}

module.exports = UnrolledQueue;

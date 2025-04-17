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

    this.#head = node;
    this.#current = first;
    this.#tail = first;
  }

  #createNode() {
    return new QueueNode({ size: this.#nodeSize });
  }

  get length() {
    return this.#length;
  }

  enqueue(item) {
    if (!this.#current.enqueue(item)) {
      if (this.#current === this.#head) {
        const node = this.#createNode();
        this.#current.next = node;
        this.#current = node;
        this.#head = node;
      } else {
        this.#current = this.#current.next;
      }
      this.#current.enqueue(item);
    }
    this.#length++;
  }

  dequeue() {
    if (this.#length === 0) return null;
    const node = this.#tail;
    const item = node.dequeue();
    this.#length--;
    if (node.length === 0 && node !== this.#current) {
      this.#tail = node.next;
      node.reset();
      this.#head.next = node;
      this.#head = node;
    }
    return item;
  }
}

module.exports = UnrolledQueue;

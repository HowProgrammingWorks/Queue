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

class Pool {
  constructor(count, factory) {
    const instances = new Array(count);
    for (let i = 0; i < count; i++) instances[i] = factory();
    this.count = count;
    this.instances = instances;
    this.factory = factory;
  }

  acquire() {
    const instance = this.instances.shift() || this.factory();
    return instance;
  }

  release(instance) {
    const { instances, count } = this;
    if (instances.length < count) instances.push(instance);
  }
}

class UnrolledQueue {
  #length = 0;
  #head = null;
  #tail = null;
  #pool = null;

  constructor(options = {}) {
    const { nodeSize = 1024, poolSize = 2 } = options;
    const pool = new Pool(poolSize, () => new QueueNode({ size: nodeSize }));
    this.#pool = pool;
    const node = pool.acquire();
    this.#head = node;
    this.#tail = node;
  }

  get length() {
    return this.#length;
  }

  enqueue(item) {
    if (!this.#head.enqueue(item)) {
      const node = this.#pool.acquire();
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
      this.#pool.release(tail);
    }
    tail.reset();
    return item;
  }
}

module.exports = UnrolledQueue;

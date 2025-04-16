'use strict';

class Queue {
  #buffer = [];

  get length() {
    return this.#buffer.length;
  }

  enqueue(item) {
    this.#buffer.push(item);
  }

  dequeue() {
    return this.#buffer.shift();
  }
}

module.exports = Queue;

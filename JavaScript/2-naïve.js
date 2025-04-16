'use strict';

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  #length = 0;
  #head = null;
  #tail = null;

  get length() {
    return this.#length;
  }

  enqueue(item) {
    const node = new ListNode(item);
    if (this.#tail) {
      this.#tail.next = node;
    } else {
      this.#head = node;
    }
    this.#tail = node;
    this.#length++;
  }

  dequeue() {
    if (this.#length === 0) return null;
    const item = this.#head.value;
    this.#head = this.#head.next;
    if (!this.#head) this.#tail = null;
    this.#length--;
    return item;
  }
}

module.exports = Queue;

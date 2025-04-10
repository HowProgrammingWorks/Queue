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

// Usage

const mq = new Queue();

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

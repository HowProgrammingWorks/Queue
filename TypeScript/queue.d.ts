interface UnrolledQueueOptions {
  nodeSize?: number;
}

declare class UnrolledQueue<T = unknown> {
  constructor(options?: UnrolledQueueOptions);

  readonly length: number;

  enqueue(item: T): void;
  dequeue(): T | null;
}

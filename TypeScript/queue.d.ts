interface UnrolledQueueOptions {
  nodeSize?: number;
}

declare class UnrolledQueue<T = any> {
  constructor(options?: UnrolledQueueOptions);

  readonly length: number;

  enqueue(item: T): void;
  dequeue(): T | null;
}

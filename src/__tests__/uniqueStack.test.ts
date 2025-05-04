import { UniqueStack } from '@/core/UniqueStack';

test('UniqueStack', () => {
  const us = new UniqueStack<number>();

  us.push(1);
  us.push(2);
  us.push(3);
  us.push(1);
  us.push(4);

  expect(us.length).toBe(4);

  expect(us.peek()).toBe(4);

  expect(us.peekAt(0)).toBe(4);
  expect(us.peekAt(1)).toBe(1);
  expect(us.peekAt(2)).toBe(3);
  expect(us.peekAt(3)).toBe(2);
  expect(us.peekAt(-2)).toBe(3);

  us.remove(3);

  expect(us.length).toBe(3);
  expect(us.peek()).toBe(4);
  expect(us.toArray()).toEqual([2, 1, 4]);

  us.clear();

  expect(us.length).toBe(0);
});

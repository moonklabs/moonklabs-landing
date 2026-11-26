export interface RateLimiter {
  /** Returns false once the key has used up its allowance for the current window. */
  check(key: string, now?: number): boolean;
}

/** Fixed-window limiter kept in memory. It is per Worker isolate, so it slows bursts rather than guaranteeing a cap. */
export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const hits = new Map<string, { readonly count: number; readonly resetAt: number }>();
  return {
    check(key, now = Date.now()) {
      const entry = hits.get(key);
      if (!entry || entry.resetAt <= now) {
        hits.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }
      if (entry.count >= limit) return false;
      hits.set(key, { count: entry.count + 1, resetAt: entry.resetAt });
      return true;
    },
  };
}

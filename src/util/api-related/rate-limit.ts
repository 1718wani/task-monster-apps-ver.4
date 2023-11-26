import { LRUCache } from "lru-cache";

export const rateLimit = () => {
  const caches = new Map<string, LRUCache<string, number>>();

  return {
    check: (
      limit: number,
      token: string,
      key: string,
      ttl: number
    ): Promise<void> => {
      // キャッシュインスタンスを取得または新規作成
      let cache = caches.get(key);
      if (!cache) {
        cache = new LRUCache<string, number>({ max: 500, ttl });
        caches.set(key, cache);
      }

      // 現在の利用状況を取得
      const tokenCount = cache.get(token) ?? 0;

      // 新しい利用状況を更新
      const currentUsage = tokenCount + 1;
      cache.set(token, currentUsage);

      // 利用可能かどうかを判定
      const isRateLimited = currentUsage > limit;

      // レスポンスヘッダを設定
      const headersList = new Headers();
      headersList.set("X-RateLimit-Limit", String(limit));
      headersList.set(
        "X-RateLimit-Remaining",
        isRateLimited ? "0" : String(limit - currentUsage)
      );

      // 制限を超えていた場合はPromiseをrejectする
      return isRateLimited ? Promise.reject() : Promise.resolve();
    },
  };
};

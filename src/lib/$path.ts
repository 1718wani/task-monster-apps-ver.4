export const pagesPath = {
  "HomeList": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/HomeList' as const, hash: url?.hash })
  },
  "battletask": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/battletask/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  "createsubtask": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/createsubtask/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  "createtodo": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/createtodo' as const, hash: url?.hash })
  },
  "login": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  "publictasks": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/publictasks' as const, hash: url?.hash })
  },
  "signin": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/' as const, hash: url?.hash })
};

export type PagesPath = typeof pagesPath;

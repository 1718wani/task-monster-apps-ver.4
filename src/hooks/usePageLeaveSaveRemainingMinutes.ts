import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePageLeaveSaveRemainingMinutes = () => {
  const router = useRouter();
  const [isProgrammaticNavigation, setIsProgrammaticNavigation] =
    useState(false);

  // この関数を追加
  const setProgrammaticNavigation = (value: boolean) => {
    setIsProgrammaticNavigation(value);
  };

  useEffect(() => {
    // 1. App外ページへの遷移 or ブラウザリロード
    const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      console.log("beforeunloadhandlerが呼び出されました！");
      event.preventDefault();
      // これがないとChromeで動作しない
      event.returnValue = "";
    };

    const pageChangeHandler = () => {
      const message =
        "このページから移動しますか？入力された内容は保存されません。";

      if (!window.confirm(message)) {
        throw "changeRoute aborted";
      }
    };
    if (!isProgrammaticNavigation) {
      router.events.on("routeChangeStart", pageChangeHandler);
      window.addEventListener("beforeunload", beforeUnloadHandler);
      return () => {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
        router.events.off("routeChangeStart", pageChangeHandler);
      };
    }
  }, [router, isProgrammaticNavigation]);

  return {
    setProgrammaticNavigation,
  };
};

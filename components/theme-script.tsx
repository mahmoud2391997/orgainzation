import Script from "next/script";

export function ThemeScript() {
  return (
    <Script id="antitude-theme-init" strategy="beforeInteractive">
      {`
(function () {
  try {
    var saved = window.localStorage.getItem("antitude-theme");
    var isDark = saved === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  } catch (e) {
    // no-op
  }
})();
      `}
    </Script>
  );
}


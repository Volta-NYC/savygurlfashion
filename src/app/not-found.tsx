import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center gap-5 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display-xl">Lost the thread.</h1>
      <p className="max-w-md text-ink-soft">
        The page you&apos;re looking for has sold out or moved. Let&apos;s get you back to the good stuff.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/shop" className="btn-outline">Shop the boutique</Link>
      </div>
    </div>
  );
}

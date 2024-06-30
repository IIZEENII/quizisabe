import { buttonVariants } from "@/features/shared/presenters/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="m-auto flex justify-center gap-4 items-center min-h-[100vh]">
      <Link href="/game" className={buttonVariants()} >Play now</Link>
    </main>
  );
}

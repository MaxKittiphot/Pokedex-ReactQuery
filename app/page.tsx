"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/pokedex");
      }}
    >
      Click me poke pokedex!!!
    </div>
  );
}

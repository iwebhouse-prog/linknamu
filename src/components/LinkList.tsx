"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 받기 전에는 모두 0회로 보이고, 응답이 오면 실제 값으로 바뀐다
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Record<string, number> }) => setCounts(data.counts))
      .catch((error) => {
        if (!controller.signal.aborted) console.error("클릭 수 조회 실패", error);
      });

    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    // 화면에는 바로 +1, 서버 응답이 오면 실제 값으로 맞춘다
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // 새 탭으로 이동해도 요청이 끊기지 않도록 keepalive
    fetch(`/api/clicks/${id}`, { method: "POST", keepalive: true })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { count: number }) => setCounts((prev) => ({ ...prev, [id]: data.count })))
      .catch((error) => {
        console.error("클릭 수 저장 실패", error);
        setCounts((prev) => ({ ...prev, [id]: Math.max((prev[id] ?? 1) - 1, 0) }));
      });
  }

  return (
    <ul className="mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}

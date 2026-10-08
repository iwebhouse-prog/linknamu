import type { NextRequest } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 해당 링크의 클릭 수를 1 늘리고, 늘어난 값을 돌려준다
export async function POST(_req: NextRequest, ctx: RouteContext<"/api/clicks/[id]">) {
  const { id } = await ctx.params;

  // 등록된 링크 id만 허용해 아무 문서나 만들어지지 않게 한다
  if (!profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 저장 실패", error);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}

import { connection } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";

// 모든 링크의 클릭 수를 { [링크 id]: 횟수 } 형태로 한 번에 돌려준다
export async function GET() {
  await connection(); // 빌드 시 프리렌더하지 않고 요청마다 DB를 조회

  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find().toArray();
    const counts = Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
    return Response.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

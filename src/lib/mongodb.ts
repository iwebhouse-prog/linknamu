import { MongoClient } from "mongodb";

export type ClickDoc = {
  _id: string; // 링크 id
  count: number;
};

// 개발 모드에서는 HMR로 모듈이 다시 로드돼도 연결을 하나만 유지한다
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient() {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local을 확인하세요.");
    }
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 연결에 실패하면 다음 요청에서 다시 시도할 수 있게 비워 둔다
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection() {
  const client = await getClient();
  return client.db("linknamu").collection<ClickDoc>("clicks");
}

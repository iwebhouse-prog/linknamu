export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

// 보여 주기용 더미 데이터 — 실제 내용으로 교체 예정
export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 : 요즘에는 AI 개발에 관심이 많아요",
  imageUrl: "/profile.jpg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
    { id: "blog", title: "Blog", url: "https://velog.io" },
  ],
};

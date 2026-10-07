import { profile } from "@/data/site";
import GithubView, { type GithubData } from "./GithubView";

const sample: GithubData = { repos: 42, followers: 128, stars: 356, live: false };

async function load(): Promise<GithubData> {
  if (!profile.github) return sample;
  try {
    const opts = { next: { revalidate: 3600 } };
    const [u, r] = await Promise.all([
      fetch(`https://api.github.com/users/${profile.github}`, opts),
      fetch(`https://api.github.com/users/${profile.github}/repos?per_page=100`, opts),
    ]);
    if (!u.ok || !r.ok) return sample;
    const user = await u.json();
    const repos: { stargazers_count: number }[] = await r.json();
    return {
      repos: user.public_repos,
      followers: user.followers,
      stars: repos.reduce((s, x) => s + x.stargazers_count, 0),
      live: true,
    };
  } catch {
    return sample;
  }
}

export default async function GithubStats() {
  return <GithubView data={await load()} />;
}

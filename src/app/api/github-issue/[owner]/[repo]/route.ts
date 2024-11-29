import {octokit} from "@/app/lib/octokit";
import {NextResponse} from "next/server";

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export async function GET(
  _: Request,
  {params}: { params: { owner: string; repo: string } }
) {
  const {owner, repo} = await params;

  const octokitResponse = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner,
    repo,
    state: 'open',
    per_page: 100,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  const issues = octokitResponse.data;
  const today: string = getToday();
  const seed = Array.from(today).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomIndex = seed % issues.length;
  const randomIssue = issues[randomIndex]

  return NextResponse.json(randomIssue)
}

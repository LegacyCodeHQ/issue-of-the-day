import {octokit} from "@/app/lib/octokit";
import {NextResponse} from "next/server";

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

  return NextResponse.json(octokitResponse.data)
}

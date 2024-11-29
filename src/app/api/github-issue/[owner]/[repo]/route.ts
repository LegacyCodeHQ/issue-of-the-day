import {octokit} from "@/app/lib/octokit";
import {NextResponse} from "next/server";
import {SummarizedGitHubIssue} from "@/app/api/github-issue/[owner]/[repo]/types";

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getRandomIndex(issueCount: number): number {
  const today: string = getToday();
  const seed = Array.from(today).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return seed % issueCount;
}

function summarizeGitHubIssue(issue: any): SummarizedGitHubIssue {
  return {
    title: issue.title,
    number: issue.number,
    html_url: issue.html_url,
    state: issue.state,
    created_at: issue.created_at,
    comments: issue.comments,
    body: issue.body,
    author: issue.user.login
  };
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
  const issueCount = issues.length;
  if (issueCount === 0) {
    return NextResponse.json({message: "No open issues found"}, {status: 404});
  }

  const randomIssue = issues[getRandomIndex(issueCount)];
  return NextResponse.json(summarizeGitHubIssue(randomIssue));
}

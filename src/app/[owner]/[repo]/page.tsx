import {SummarizedGitHubIssue} from "@/app/api/github-issue/[owner]/[repo]/types";

interface IssueOfTheDayPageProps {
  params: {
    owner: string;
    repo: string;
  };
}

export default async function IssueOfTheDayPage({params}: IssueOfTheDayPageProps) {
  const {owner, repo} = await params;

  const encodedOwner = encodeURIComponent(owner);
  const encodedRepo = encodeURIComponent(repo);

  const response = await fetch(
    `http://localhost:3000/api/github-issue/${encodedOwner}/${encodedRepo}`,
    {cache: 'no-cache'}
  );

  const issue: SummarizedGitHubIssue = await response.json();

  return <div
    className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold">
          Random Issue from {owner}/{repo}
        </h1>
        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              #{issue.number} {issue.title}
            </a>
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Created by {issue.author} on {new Date(issue.created_at).toLocaleDateString()}</p>
            <p>Comments: {issue.comments}</p>
          </div>
          <div className="prose dark:prose-invert">
            <p>{issue.body}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
}

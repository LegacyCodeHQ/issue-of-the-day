import {SummarizedGitHubIssue} from "@/app/api/github-issue/[owner]/[repo]/types";
import {IssueOfTheDayCard} from "@/app/[owner]/[repo]/IssueOfTheDayCard";

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

  return <IssueOfTheDayCard issue={issue}/>
}

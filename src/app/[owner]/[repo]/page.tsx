import {SummarizedGitHubIssue} from "@/app/api/github-issue/[owner]/[repo]/types";
import {IssueOfTheDayCard} from "@/app/[owner]/[repo]/IssueOfTheDayCard";

interface IssueOfTheDayPageProps {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

function getNextUpdateTime(response: Response): string {
  const cacheControl = response.headers.get('Cache-Control');
  if (!cacheControl) return 'soon';

  // Match s-maxage first, fall back to max-age
  const maxAgeMatch = cacheControl.match(/s-maxage=(\d+)/);
  if (!maxAgeMatch?.[1]) {
    // If no s-maxage, try max-age
    const regularMaxAge = cacheControl.match(/max-age=(\d+)/);
    if (!regularMaxAge?.[1]) return 'soon';
    return formatNextUpdate(regularMaxAge[1]);
  }

  return formatNextUpdate(maxAgeMatch[1]);
}

function formatNextUpdate(seconds: string): string {
  const parsed = parseInt(seconds, 10);
  if (isNaN(parsed)) return 'soon';

  try {
    const hours = Math.floor(parsed / 3600);
    const minutes = Math.floor((parsed % 3600) / 60);

    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    return 'less than a minute';
  } catch (error) {
    console.error(error);
    return 'soon';
  }
}

export default async function IssueOfTheDayPage({params}: IssueOfTheDayPageProps) {
  const {owner, repo} = await params;

  const encodedOwner = encodeURIComponent(owner);
  const encodedRepo = encodeURIComponent(repo);

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/github-issue/${encodedOwner}/${encodedRepo}`);
  const nextUpdateTime = getNextUpdateTime(response);

  const issue: SummarizedGitHubIssue = await response.json();
  console.log('Next update time', nextUpdateTime);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <IssueOfTheDayCard
        issue={issue}
        owner={owner}
        repo={repo}
      />
      <p className="text-sm text-gray-500 mt-4 text-center">
        {nextUpdateTime === 'soon' 
          ? 'A new random issue will be available soon'
          : `A new random issue will be available in ${nextUpdateTime}`}
      </p>
    </div>
  );
}

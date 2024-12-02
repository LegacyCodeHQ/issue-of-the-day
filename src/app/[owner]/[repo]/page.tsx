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

    let issue: SummarizedGitHubIssue;
    let text: string | null = null;
    try {
        text = await response.text();
        console.log('API Response:', text);
        issue = JSON.parse(text);
    } catch (error) {
        console.error('Failed to parse API response:', error);
        console.error('Response body:', text);
        throw new Error(`Failed to load issue: Invalid JSON response from API`);
    }

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
            <div className="mt-4 text-center text-sm text-gray-600">
                Built by{' '}
                <a
                    href="https://twitter.com/ragunathjawahar"
                    className="text-blue-500 hover:underline hover:underline-offset-2 inline-flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ragunath Jawahar
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         className="w-3 h-3 fill-current">
                        <title>X</title>
                        <path
                            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                </a>
                , source is available on{' '}
                <a
                    href="https://github.com/LegacyCodeHQ/issue-of-the-day"
                    className="text-blue-500 hover:underline hover:underline-offset-2 inline-flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         className="w-4 h-4 fill-current">
                        <title>GitHub</title>
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                </a>
            </div>
        </div>
    );
}

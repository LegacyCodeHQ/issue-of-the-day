export interface SummarizedGitHubIssue {
  title: string;
  number: number;
  html_url: string;
  state: string;
  created_at: string;
  comments: number;
  body: string;
  author: string;
  labels: Array<{
    name: string;
    color: string;
    description?: string;
  }>;
}

export function summarizeGitHubIssue(issue: any): SummarizedGitHubIssue {
  return {
    title: issue.title,
    number: issue.number,
    html_url: issue.html_url,
    state: issue.state,
    created_at: issue.created_at,
    comments: issue.comments,
    body: issue.body,
    author: issue.user.login,
    labels: issue.labels.map((label: any) => ({
      name: label.name,
      color: label.color,
      description: label.description
    }))
  };
}

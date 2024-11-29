export interface SummarizedGitHubIssue {
  title: string;
  number: number;
  html_url: string;
  state: string;
  created_at: string;
  comments: number;
  body: string;
  author: string;
}

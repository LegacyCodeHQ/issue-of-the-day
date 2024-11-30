import {FC} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {GitPullRequest, MessageSquare} from 'lucide-react'
import Link from 'next/link'
import {SummarizedGitHubIssue} from "@/app/api/github-issue/[owner]/[repo]/types";

export const IssueOfTheDayCard: FC<{ issue: SummarizedGitHubIssue }> = ({issue}) => {
  const createdAt = new Date(issue.created_at)
  const timeAgo = formatDistanceToNow(createdAt, {addSuffix: true})

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              <Link href={issue.html_url} className="hover:underline">
                {issue.title}
              </Link>
            </CardTitle>
            <Badge variant={issue.state === 'open' ? 'default' : 'secondary'} className="ml-2 mt-1">
              {issue.state}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            #{issue.number} opened {timeAgo}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{issue.body}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {issue.labels.map((label) => (
              <Badge
                key={label.name}
                variant="outline"
                style={{
                  backgroundColor: `#${label.color}22`,
                  borderColor: `#${label.color}`,
                  color: `#${label.color}`
                }}
              >
                {label.name}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex items-center justify-between w-full text-sm">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback>{issue.author.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">{issue.author}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4 text-muted-foreground"/>
                <span className="text-muted-foreground">{issue.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitPullRequest className="w-4 h-4 text-muted-foreground"/>
                <span className="text-muted-foreground">{issue.number}</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


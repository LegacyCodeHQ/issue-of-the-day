# Issue of the Day

A simple web application that surfaces a random issue from any GitHub repository of your choice.

## About

This project was inspired by [Peer Richelsen](https://x.com/peer_rich)'
s [tweet](https://x.com/peer_rich/status/1862609684768649570).

![Issue of the Day Screenshot](docs/tweet.png)

## Usage

~~Visit [issueoftheday.com](https://issueoftheday.com) to try it out.~~

By default, the site redirects to `/calcom/cal.com`, but you can explore issues from any public GitHub repository using
the `issueoftheday.com/{owner}/{repo}` format.

## Development

This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically
optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployment

The application requires the following environment variables - `NEXT_PUBLIC_APP_URL` and `GITHUB_TOKEN`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

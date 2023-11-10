## Live Application Link

The live app can be found [here](https://responsive-dashboard-zeta.vercel.app/)

## High Level Decisions

| Decision                      | Reasoning                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Next.js**                   | The latest version of Next takes advantage of React 18's server/client components. With these advancements, we can define critical functions and/or render any component/page that doesn't rely on the client (i.e. not including hooks like useState, useEffect, useContext, etc.) in server components. In this case, the server will actually generate the HTML and send it to the client, rather than the client generating HTML via JavaScript, which boosts performance and can have a positive impact on SEO. But SSR (server-side-rendering) isn't exactly a new concept, so why the hype around latest versions of React/Next? Fetching and/or mutating data from server components, including server actions and route handlers, has an extremely noticeable and positive impact on the performance of your application. It also automatically out-of-the-box memoizes network requests, which means that with default cache settings, multiple network requests to the same endpoint will only be called once. Additionally, because data is fetched on the server rather than the client, you will not see the network requests in browser developer tools; revalidating cache will appear in fetch network calls, but it wouldn't be in a legible format for users to inspect. This is useful for obscuring sensitive information passed via APIs. Next also has a number of other features/improvements over previous generations, but what is the most exciting in my opinion is the advancements in SSR. |
| **TypeScript**                | I'm a big fan of TypeScript! It can definitely introduce more overhead when first starting to work on a project, but it's well worth it in the long run. Similar to unit testing, using TypeScript can resolve a large number of trivial issues before ever actually encountering them, saving development and/or QA time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Material UI**               | There are a ton of rapid UI prototyping libraries out there, each with their own niches. For the use case of this project - including rendering data in tables, charts, and graphs - I found prototyping with MUI a breeze. It not only provides pretty much every general component you'd typically want to use in a given application, but also the vast documentation, deep customization options, and out-of-the-box inclusion of accessibility IDs/labels is what continues to bring me back to MUI for projects.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Vercel Deployment/Hosting** | Vercel actually wasn't my first option for deployment, I tried at first to deploy to GitHub Pages via GitHub Actions. This, however, has a big drawback, especially when attempting to take advantage of the latest bleeding-edge SSR features that Next/React introduce: **there is no server**. We can, of course, configure Next to do SSG (static-site-generation) instead, but server actions files would need to be rewritten as client components, resulting in none of the performance gains that the latest versions of Next/React introduce. This was a big no-no for me. I not only didn't want to rewrite critical portions of the project after having recently wrapped them up, but also rewriting them to be exclusively on the client felt like a big step backwards for me. Vercel to the resuce! It is not only significantly easier to set up a CI pipeline for deployment to Vercel rather than GitHub Actions (pretty much at the click of a button!), but it also has access to a server, which means the ability to take advantage of the latest SSR improvements and no need to rewrite the project.                                                                                                                                                                                                                                                                                                                                                                                             |

## What I'm proud of

- Fetching, refetching, and handling errors from a server component and exposing them to a global context for client components to consume
- Generalized and reusable `DataTable` component (and sub-components) which can accept and render data from any type in a table, not just the `Hotel` type relevant to this project.
- Reusable `DataChart` component to render area graphs, line graphs, bar graphs, pie charts, or scatter plots.
- Module aliases for cleaner imports, including for Jest.
- Background and charts animations + interactive elements (loading/error states, hover, etc.).

## If I had more time

- Finish writing unit tests for other components/pages.
- Move the endpoint I'm calling into an environment variable.
- Create constants folder/module alias:
  - Create `strings.ts` file for defining all of the text used across the app. This would be used for localization.
  - Create `colors.ts` file for defining all of the colors used across the app. This could be referenced either directly or from a `ThemeProvider` like MUI has.
  - General files for other constants used across the app, like chart configurations
- Styling/Interaction improvements:
  - Make the `DataTable` component horizontally scroll the expanded data into view
  - Make components' stylings more aesthetically pleasing (i.e. Filter menu in `DataTable` and more)

## How to Run the App?

General instructions for running the project can be found below in the default generated Next README. I did also add some extra scripts to `package.json` useful for running tests and clearing tests cache. Whichever package manager you are using would be used to call these other scripts in the same format (i.e. if using `npm`, to start the server would be `npm run dev`, and similarly, to run test suites with coverage would be `npm run test`)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

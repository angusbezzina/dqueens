This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Before you begin, you will need to make sure that you have npm installed on your machine (see [here](https://www.npmjs.com/))

First install the project depencies: `yarn install`

Next, run the development server  `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see a local version of the website.

You will need to have a local version of the backend of this project running concurrently or simply change the ``STRAPI_API_URL`` variable to point to [dqueens.herokuapp.com](https://dqueens.herokuapp.com/). I have sent you a file `.env.local` that you will need to add to the project locally in order for this to work too.

## Where can I change the data for the page (a note for Alexis)

The site is broken up into components (reusable elements on the page), sections (the visible sections on the page) and pages (the overall page layouts).

To edit the majority of the data on the page, you will need to update the files located in `lib/data`, specifically `services.tsx`, `openHours.tsx` and `labels.tsx`. 

To edit the address details at the bottom, you can make edits to the code in `components/addressBar.tsx`.

You can change the location using the `lib/data/constants.tsx` file.

The AR component is hosted elsewhere, but if you no longer want it there, go to `components/nav.tsx` and remove the content inside the `<a></a>` tags along with the tags themselves.

If anything is unclear, just email or message me.

## Deployment

To deploy this project, ensure the project builds locally (test with the command `yarn build`) and then simply push the changes via git to the `Main` branch of this repo. Vercel will handle the rest.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
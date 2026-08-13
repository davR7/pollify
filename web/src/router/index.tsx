import { createBrowserRouter } from "react-router-dom";
import { PrivateLayout, PublicLayout } from "../layouts";
import { SignInPage, SignUpPage } from "../pages/auth";
import { MyPollsPage } from "../pages/polls/my-polls";
import { NewPollPage } from "../pages/polls/new-poll";
import { PollVotePage } from "../pages/polls/poll-vote";
import { PollsPage } from "../pages/polls/polls";
import { NotFoundPage } from "../pages/system/not-found";
import { RequireAuth } from "./guards/RequireAuth";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/",
            element: <MyPollsPage />,
          },
          {
            path: "/polls",
            element: <PollsPage />,
          },
          {
            path: "/polls/:pollId/votes",
            element: <PollVotePage />,
          },
          {
            path: "/polls/new",
            element: <NewPollPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

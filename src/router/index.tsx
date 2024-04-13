import {
  createBrowserRouter,
  redirect,
  useActionData
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import Login from "../components/Login";
import App from "../App";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: App,
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/login");
    },
  },
]);

import { lazy } from "react";

function importView(...args) {
  const path = args
    .map((arg) => {
      if (Array.isArray(arg)) {
        const nestPath = new Array(arg[1])
          .fill(0)
          .map(() => arg[0])
          .join("/");
        arg = nestPath;
      }
      return arg;
    })
    .join("/");
  return import(`../views/${path}.js`);
}

export const mainRoutes = [
  {
    path: `/dashboard`,
    component: lazy(() => importView(["Dashboard", 2])),
  },
  {
    path: `/items`,
    component: lazy(() => importView("Items", "routes")),
    routes: [
      {
        path: `/items/new`,
        component: lazy(() => importView("Items", "New")),
      },
    ],
  },
  {
    path: `/item`,
    component: lazy(() => importView(["Item", 2])),
  },
];

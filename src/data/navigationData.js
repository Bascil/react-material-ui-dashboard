import {
  Dashboard,
  MenuBook,
  ImportContacts,
  PostAdd,
} from "@material-ui/icons";

export const mainNavigation = [
  {
    name: "Item Search",
    icon: Dashboard,
    url: `/dashboard`,
  },
  {
    name: "Item",
    icon: MenuBook,
    url: `/item`,
  },
  {
    name: "Items",
    icon: ImportContacts,
    url: `/items`,
    navigationData: [
      {
        name: "New",
        icon: PostAdd,
        url: `/items/new`,
      },
    ],
  },
];

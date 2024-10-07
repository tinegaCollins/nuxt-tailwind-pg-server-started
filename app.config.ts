export default defineAppConfig({
  ui: {
    primary: "primaryColor",
    dropdown: {
      background: "bg-black dark:bg-black",
      padding: "px-2 py-3",
      ring: "ring-0",
      width: "w-80",
      item: {
        active: "bg-black",
        inactive: "text-white dark:text-white",
        padding: "py-3",
      },
    },
    accordion: {
      item: {
        padding: "pl-3 py-2",
        size: 'text-base',
      }
    },
    notifications: {
      position: "top-0 right-0",
    }

  },
});

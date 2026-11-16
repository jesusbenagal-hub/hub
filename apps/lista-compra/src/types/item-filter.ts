/** Which items the list shows. */
export const ItemFilter = {
  All: "all",
  Pending: "pending",
  Purchased: "purchased",
} as const;

export type ItemFilter = (typeof ItemFilter)[keyof typeof ItemFilter];

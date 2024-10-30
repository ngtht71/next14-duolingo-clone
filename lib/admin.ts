import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2o05VUhxaqJ6nP0INtVGMkBhdNN",
  "user_2o4nHiNJzX4oSxUDzMDicRgACRH",
  "user_2nywjnAEHpfSaScKjZQM3gLOiBH"
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};

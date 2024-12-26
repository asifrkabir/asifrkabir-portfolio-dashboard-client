import Users from "./components/Users";

const UsersPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">User</h1>
      </div>
      <Users />
    </div>
  );
};

export default UsersPage;

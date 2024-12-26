import { AddBlogModal } from "./_components/AddBlog/AddBlogModal";
import Blogs from "./_components/Blogs";

const BlogsPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Blog</h1>
        <AddBlogModal />
      </div>
      <Blogs />
    </div>
  );
};

export default BlogsPage;

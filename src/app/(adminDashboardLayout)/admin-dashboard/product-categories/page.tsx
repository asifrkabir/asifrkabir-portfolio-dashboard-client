import { AddProductCategoryModal } from "./components/AddProductCategory/AddProductCategoryModal";
import ProductCategories from "./components/ProductCategories";

const CategoriesPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Product Category</h1>
        <AddProductCategoryModal />
      </div>
      <ProductCategories />
    </div>
  );
};

export default CategoriesPage;

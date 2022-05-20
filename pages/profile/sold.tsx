import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout title="販売履歴" canGoBack>
      <div className="flex flex-col space-y-5 divide-y  pb-10">
       <ProductList kind="sales"/>
      </div>
    </Layout>
  );
};

export default Sold;

import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="ライブの情報を作成する">
      <form className=" space-y-4 py-10 px-4">
        <Input required label="ライブ名" name="name" type="text" />
        <Input
          required
          label="販売価格"
          placeholder="0"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea name="description" label="商品の説明" />
        <Button text="ライブを始める" />
      </form>
    </Layout>
  );
};

export default Create;

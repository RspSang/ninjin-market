import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title="パク">
      <div className="space-y-4 py-10 px-4 pb-16">
        <Message message="ご購入ありがとうございます。 短い間ですが、よろしくお願いします。" />
        <Message message="こちらこそ、よろしくお願いします。" reversed />
        <Message message="商品の受け渡しは明日14時、市役所前でいかがでしょうか" />
        <form className="fixed inset-x-0 bottom-0  bg-white py-2">
          <div className="relative mx-auto flex w-full  max-w-md items-center">
            <input
              type="text"
              className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;

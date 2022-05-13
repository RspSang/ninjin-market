import type { NextPage } from "next";
import Layout from "../../components/layout";
import Message from "../../components/message";

const Stream: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10  px-4">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">iPhone 14</h1>
          <span className="mt-3 block text-2xl text-gray-900">￥100000</span>
          <p className=" my-6 text-gray-700">
            ○iPhone14 Pro ○SIMフリー ○256GB ○シエラブルー
            ○バッテリー最大容量100% ○auで購入 残債なし ○ほぼ新品です。
            購入後、動作確認や充電数回しました。
            ご不明な点がございましたら、お知らせください。
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ライブチャット</h2>
          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16">
            <Message message="ご購入ありがとうございます。 短い間ですが、よろしくお願いします。" />
            <Message message="こちらこそ、よろしくお願いします。" reversed />
            <Message message="商品の受け渡しは明日14時、市役所前でいかがでしょうか" />
          </div>
          <div className="fixed inset-x-0 bottom-0  bg-white py-2">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
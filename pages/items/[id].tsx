import type { NextPage } from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";

const ItemDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="h-96 rounded-md bg-slate-300" />
          <div className="flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            <div className="h-12 w-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">高知太郎</p>
              <p className="text-xs font-medium text-gray-500">
                プロフィールを見る &rarr;
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">iPhone 14</h1>
            <span className="mt-3 block text-3xl text-gray-900">￥100,000</span>
            <p className=" my-6 text-gray-700">
              ○iPhone14 Pro ○SIMフリー ○256GB ○シエラブルー
              ○バッテリー最大容量100% ○auで購入 残債なし ○ほぼ新品です。
              購入後、動作確認や充電数回しました。
              ご不明な点がございましたら、お知らせください。
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="購入手続きへ" />
              <button className="flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            この商品を見ている人におすすめ
          </h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="mb-4 h-56 w-full rounded-md bg-slate-300" />
                <h3 className="-mb-1 text-gray-700">Galaxy S60</h3>
                <span className="text-sm font-medium text-gray-900">
                  ￥90,000
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;

import type { NextPage } from "next";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout hasTabBar title="チャット">
      <div className="divide-y-[1px] py-10 ">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            className="flex cursor-pointer items-center space-x-3 px-4 py-3"
          >
            <div className="h-12 w-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">パク</p>
              <p className="text-sm  text-gray-500">
                明日、昼2時すぎに後免駅の前で会おう！
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;

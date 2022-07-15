import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Image from "next/image";
import client from "@libs/server/client";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: Boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  product,
  relatedProducts,
  isLiked,
}) => {
  const router = useRouter();
  const { data, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    toggleFav({});
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
  };
  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="relative pb-80">
            <Image
              layout="fill"
              src={`https://imagedelivery.net/GSDuBVO5Xp3QfdrHmnLc2A/${product?.image}/productDetail`}
              className="rounded-md bg-slate-300 object-center"
            />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            <Image
              width={48}
              height={48}
              src={`https://imagedelivery.net/GSDuBVO5Xp3QfdrHmnLc2A/${product?.user.avatar}/avatar`}
              className="h-12 w-12 rounded-full bg-slate-300"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {product?.user?.name}
              </p>
              <Link href={`/users/profiles/${product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  プロフィールを見る &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <span className="mt-3 block text-3xl text-gray-900">
              ￥{product?.price}
            </span>
            <p className=" my-6 text-gray-700">{product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="購入手続きへ" />
              <button
                onClick={onFavClick}
                className={cls(
                  "flex items-center justify-center rounded-md p-3 hover:bg-gray-100 ",
                  isLiked
                    ? "text-red-500  hover:text-red-600"
                    : "text-gray-400  hover:text-gray-500"
                )}
              >
                {isLiked ? (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
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
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            この商品を見ている人におすすめ
          </h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {relatedProducts?.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <a>
                  <div>
                    <Image
                      width={264}
                      height={224}
                      src={`https://imagedelivery.net/GSDuBVO5Xp3QfdrHmnLc2A/${product?.image}/relatedProducts`}
                      className="mb-4 h-56 w-full rounded-md bg-slate-300"
                    />
                    <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      ￥{product.price}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }
  const product = await client.product.findUnique({
    where: {
      id: +ctx.params.id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  const isLiked = false;
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      isLiked,
    },
  };
};

export default ItemDetail;

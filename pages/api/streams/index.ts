import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { page },
    session: { user },
    body: { name, price, description },
  } = req;
  if (req.method === "POST") {
    // const {
    //   result: {
    //     uid,
    //     rtmps: { streamKey, url },
    //   },
    // } = await (
    //   await fetch(
    //     `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
    //       },
    //       body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
    //     }
    //   )
    // ).json();
    const streams = await client.stream.create({
      data: {
        cloudflareId: "xx", //uid,
        cloudflareKey: "xx", //streamKey,
        cloudflareUrl: "xx", //url,
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, streams });
  } else if (req.method === "GET") {
    const take = 10;
    const skip = (+page - 1) * 10;
    const list = await client.stream.findMany({
      take,
      skip,
    });
    res.json({ ok: true, list });
  }
}

export default withApiSession(
  withHandler({ method: ["GET", "POST"], handler })
);

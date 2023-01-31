import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const publicKey =
  "BLoRNVmgLcwVDbUzE9ZK56dIWHLpYsxRK_znUZkjPHQNJjvRtN6qPozmEAer7nDrp9Wlav3Ui0ri09-f0RrOMVs";
const privateKey = "Iv1kHysPpLriCWvvtX4PkMQGq3qJUT_lZ6r2kHGn75c";

WebPush.setVapidDetails("http://localhost/3333", publicKey, privateKey);

export async function notifcationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, reply) => {
    console.log(request.body);

    return reply.status(201).send();
  });

  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    WebPush.sendNotification(subscription, "SDS");
    return reply.status(201).send();
  });
}

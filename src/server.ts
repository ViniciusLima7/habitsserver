import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = Fastify();
const prisma = new PrismaClient();

//Pegar - Acessar
app.get("/dev", async () => {
  const habits = await prisma.habit.findMany();
  //   return "Olá Developer React SDS";
  return habits;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server Running HTTP");
  });

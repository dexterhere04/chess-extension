import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    message: "GambitVoice Backend",
  };
});

try {
  await app.listen({
    host: "0.0.0.0",
    port: 8080,
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
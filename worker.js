export default {
  async fetch(request, env, ctx) {
    // Only process POST requests from Telegram
    if (request.method === "POST") {
      try {
        const update = await request.json();

        // Check if the update contains a message
        if (update.message && update.message.text) {
          const chatId = update.message.chat.id;
          const text = update.message.text;

          // Simple response for /start command
          if (text === "/start") {
            await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: "MackTrack bot is active and running!"
              })
            });
          }
        }

        return new Response("OK", { status: 200 });
      } catch (err) {
        return new Response("Error processing update", { status: 500 });
      }
    }

    // Return simple text for standard GET browser checks
    return new Response("MackTrack Telegram Bot API is running.", { status: 200 });
  }
};

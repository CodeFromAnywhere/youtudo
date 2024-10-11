import { YoutubeTranscript } from "youtube-transcript";
import welcome from "welcome.html";

export default {
  /**
   * @param {Request} request
   * @param {Env} env
   * @param {ExecutionContext} ctx
   * @returns {Promise<Response>}
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    console.log(`Hello ${navigator.userAgent} at path ${url.pathname}!`);
    const v = url.searchParams.get("v");

    if (url.pathname === "/watch" && v) {
      try {
        const transcript = await YoutubeTranscript.fetchTranscript(
          `https://www.youtube.com/watch?v=${v}`,
        ).then((transcript) => transcript.map((x) => x.text).join(" "));

        return new Response(transcript);
      } catch (e) {
        return new Response("err" + e.message);
      }
    }
    return new Response(welcome, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};

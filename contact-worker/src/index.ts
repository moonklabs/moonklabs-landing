import { handleContact, type ContactEnv } from "./handler";

// Receives inquiries from moonklabs.com (a static site with no server of its
// own) and relays them to Google Chat and email.
export default {
  async fetch(request: Request, env: ContactEnv): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/contact") return handleContact(request, env);
    return new Response(JSON.stringify({ success: false, error: "Not Found" }), {
      status: 404,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  },
};

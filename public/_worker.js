const EMAIL = "hello.hemi.phillips@gmail.com";

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init.headers ?? {}),
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/contact/email") {
      if (request.method !== "GET") {
        return json(
          { error: "Method not allowed" },
          { status: 405, headers: { allow: "GET" } },
        );
      }

      return json({ email: EMAIL });
    }

    return env.ASSETS.fetch(request);
  },
};

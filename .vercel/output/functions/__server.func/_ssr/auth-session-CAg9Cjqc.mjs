import { c as createServerRpc } from "./createServerRpc-F4CYOIGM.mjs";
import { c as createServerFn, b as getRequest } from "./server-Gf6avwXa.mjs";
import { g as getSession } from "../_libs/start-authjs.mjs";
import "../_libs/auth__core.mjs";
import { a as authConfig } from "./auth-DvLnJq-q.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/preact.mjs";
import "../_libs/panva__hkdf.mjs";
import "../_libs/jose.mjs";
import "../_libs/preact-render-to-string.mjs";
import "../_libs/oauth4webapi.mjs";
const fetchAuthSession_createServerFn_handler = createServerRpc({
  id: "a5bd66eb4dc18e634193e8cd2782a09e2ce407953c06bc3b2e156f0191a637c9",
  name: "fetchAuthSession",
  filename: "src/lib/auth-session.ts"
}, (opts) => fetchAuthSession.__executeServer(opts));
const fetchAuthSession = createServerFn({
  method: "GET"
}).handler(fetchAuthSession_createServerFn_handler, async () => {
  const request = getRequest();
  return getSession(request, authConfig);
});
export {
  fetchAuthSession_createServerFn_handler
};

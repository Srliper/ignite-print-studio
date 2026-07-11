import { s as setEnvDefaults$1, c as createActionURL, A as Auth, a as skipCSRFCheck, r as raw } from "./auth__core.mjs";
import "./preact.mjs";
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false };
const getEnv = (env) => {
  if (env.startsWith("VITE_")) {
    return __vite_import_meta_env__?.[env];
  }
  if (typeof process !== "undefined" && typeof process.env !== "undefined") {
    return process.env[env];
  }
  return void 0;
};
const conditionalEnv = (...envs) => {
  for (const env of envs) {
    const value = getEnv(env);
    if (value) {
      return value;
    }
  }
  return void 0;
};
function setEnvDefaults(envObject, config) {
  if (envObject.AUTH_URL) {
    delete config.basePath;
  } else if (!config.basePath) {
    config.basePath = getBasePath(config);
  }
  setEnvDefaults$1(envObject, config);
  config.trustHost ??= false;
}
const getBasePath = (config) => {
  if (config?.basePath) return config.basePath;
  const ev = conditionalEnv("VITE_AUTH_PATH", "AUTH_PATH");
  return ev ?? "/api/auth";
};
async function serverSignIn(provider, options = {}, authorizationParams = {}, config, context) {
  const { request } = context;
  const { protocol } = new URL(request.url);
  const headers = new Headers(request.headers);
  const {
    redirect: shouldRedirect = true,
    redirectTo,
    callbackUrl: _callbackUrl,
    ...rest
  } = options;
  const callbackUrl = redirectTo ?? _callbackUrl ?? headers.get("Referer") ?? "/";
  setEnvDefaults(process.env, config);
  const base = createActionURL("signin", protocol, headers, process.env, config);
  if (!provider) {
    const url2 = `${base}?${new URLSearchParams({ callbackUrl })}`;
    if (shouldRedirect) {
      return redirectResponse(context, url2);
    }
    return url2;
  }
  let url = `${base}/${provider}?${new URLSearchParams(
    typeof authorizationParams === "string" ? authorizationParams : authorizationParams instanceof URLSearchParams ? authorizationParams : Array.isArray(authorizationParams) ? authorizationParams : Object.entries(authorizationParams)
  )}`;
  let foundProvider = void 0;
  for (const _provider of config.providers) {
    const { id } = typeof _provider === "function" ? _provider() : _provider;
    if (id === provider) {
      foundProvider = id;
      break;
    }
  }
  if (!foundProvider) {
    const url2 = `${base}?${new URLSearchParams({ callbackUrl })}`;
    if (shouldRedirect) {
      return redirectResponse(context, url2);
    }
    return url2;
  }
  if (foundProvider === "credentials") {
    url = url.replace("signin", "callback");
  }
  headers.set("Content-Type", "application/x-www-form-urlencoded");
  const body = new URLSearchParams({ ...rest, callbackUrl });
  const req = new Request(url, { method: "POST", headers, body });
  const res = await Auth(req, { ...config, raw, skipCSRFCheck });
  if (context.response) {
    for (const c of res.cookies ?? []) {
      context.response.headers.append(
        "set-cookie",
        serializeCookie(c.name, c.value, normalizeCookieOptions(c.options))
      );
    }
  }
  if (shouldRedirect && res.redirect) {
    return redirectResponse(context, res.redirect);
  }
  return res.redirect;
}
async function serverSignOut(options = {}, config, context) {
  const { request } = context;
  const { protocol } = new URL(request.url);
  const headers = new Headers(request.headers);
  headers.set("Content-Type", "application/x-www-form-urlencoded");
  setEnvDefaults(process.env, config);
  const url = createActionURL("signout", protocol, headers, process.env, config);
  const callbackUrl = options.redirectTo ?? headers.get("Referer") ?? "/";
  const body = new URLSearchParams({ callbackUrl });
  const req = new Request(url, { method: "POST", headers, body });
  const res = await Auth(req, { ...config, raw, skipCSRFCheck });
  if (context.response) {
    for (const c of res.cookies ?? []) {
      context.response.headers.append(
        "set-cookie",
        serializeCookie(c.name, c.value, normalizeCookieOptions(c.options))
      );
    }
  }
  const shouldRedirect = options.redirect ?? true;
  if (shouldRedirect && res.redirect) {
    return redirectResponse(context, res.redirect);
  }
  return res.redirect;
}
function normalizeCookieOptions(options) {
  if (!options) return void 0;
  return {
    ...options,
    sameSite: typeof options.sameSite === "boolean" ? options.sameSite ? "strict" : "lax" : options.sameSite
  };
}
function serializeCookie(name, value, options) {
  let cookie = `${name}=${value}`;
  if (options?.path) {
    cookie += `; Path=${options.path}`;
  } else {
    cookie += "; Path=/";
  }
  if (options?.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (options?.secure) {
    cookie += "; Secure";
  }
  if (options?.sameSite) {
    cookie += `; SameSite=${options.sameSite}`;
  }
  if (options?.maxAge !== void 0) {
    cookie += `; Max-Age=${options.maxAge}`;
  }
  if (options?.expires) {
    cookie += `; Expires=${options.expires.toUTCString()}`;
  }
  return cookie;
}
function redirectResponse(context, url) {
  if (context.response) {
    context.response.headers.set("Location", url);
  }
}
const authorizationParamsPrefix = "authorizationParams-";
function StartAuthJS(config) {
  const handler = async (context) => {
    const _config = typeof config === "object" ? config : await config(context);
    setEnvDefaults(process.env, _config);
    const { request } = context;
    return Auth(request, _config);
  };
  return {
    GET: handler,
    POST: handler,
    signIn: async (context) => {
      const { request } = context;
      const _config = typeof config === "object" ? config : await config(context);
      setEnvDefaults(process.env, _config);
      const formData = await request.formData();
      const { providerId: provider, ...options } = Object.fromEntries(formData);
      const authorizationParams = {};
      const _options = {};
      for (const key in options) {
        if (key.startsWith(authorizationParamsPrefix)) {
          authorizationParams[key.slice(authorizationParamsPrefix.length)] = options[key];
        } else {
          _options[key] = options[key];
        }
      }
      return serverSignIn(
        provider,
        _options,
        authorizationParams,
        _config,
        context
      );
    },
    signOut: async (context) => {
      const _config = typeof config === "object" ? config : await config(context);
      setEnvDefaults(process.env, _config);
      const options = Object.fromEntries(await context.request.formData());
      return serverSignOut(options, _config, context);
    }
  };
}
async function getSession(request, config) {
  setEnvDefaults(process.env, config);
  const { protocol } = new URL(request.url);
  const url = createActionURL(
    "session",
    protocol,
    new Headers(request.headers),
    process.env,
    config
  );
  const response = await Auth(
    new Request(url, { headers: request.headers }),
    config
  );
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error(data.message);
}
export {
  StartAuthJS as S,
  getSession as g
};

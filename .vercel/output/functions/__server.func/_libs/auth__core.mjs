import { h as hkdf } from "./panva__hkdf.mjs";
import { j as jwtDecrypt, c as calculateJwkThumbprint, e as encode$1, E as EncryptJWT, d as decodeJwt } from "./jose.mjs";
import { D } from "./preact-render-to-string.mjs";
import { u, b } from "./preact.mjs";
import { g as generateRandomState, a as generateRandomCodeVerifier, c as calculatePKCECodeChallenge, b as generateRandomNonce, d as discoveryRequest, e as customFetch$1, p as processDiscoveryResponse, P as PrivateKeyJwt, C as ClientSecretJwt, f as ClientSecretPost, v as validateAuthResponse, s as skipStateCheck, A as AuthorizationResponseError, h as authorizationCodeGrantRequest, i as processAuthorizationCodeResponse, j as getValidatedIdTokenClaims, u as userInfoRequest, k as processUserInfoResponse, l as allowInsecureRequests, N as None, m as modifyAssertion } from "./oauth4webapi.mjs";
var __classPrivateFieldSet = function(receiver, state2, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state2 === "function" ? receiver !== state2 || !f : !state2.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state2.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state2, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state2 === "function" ? receiver !== state2 || !f : !state2.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state2.get(receiver);
};
var _SessionStore_instances, _SessionStore_chunks, _SessionStore_option, _SessionStore_logger, _SessionStore_chunk, _SessionStore_clean;
const ALLOWED_COOKIE_SIZE = 4096;
const ESTIMATED_EMPTY_COOKIE_SIZE = 160;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function defaultCookies(useSecureCookies) {
  const cookiePrefix = useSecureCookies ? "__Secure-" : "";
  return {
    // default cookie options
    sessionToken: {
      name: `${cookiePrefix}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    callbackUrl: {
      name: `${cookiePrefix}authjs.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    csrfToken: {
      // Default to __Host- for CSRF token for additional protection if using useSecureCookies
      // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
      name: `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}authjs.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15
        // 15 minutes in seconds
      }
    },
    state: {
      name: `${cookiePrefix}authjs.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15
        // 15 minutes in seconds
      }
    },
    nonce: {
      name: `${cookiePrefix}authjs.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    webauthnChallenge: {
      name: `${cookiePrefix}authjs.challenge`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15
        // 15 minutes in seconds
      }
    }
  };
}
class SessionStore {
  constructor(option, cookies, logger) {
    _SessionStore_instances.add(this);
    _SessionStore_chunks.set(this, {});
    _SessionStore_option.set(this, void 0);
    _SessionStore_logger.set(this, void 0);
    __classPrivateFieldSet(this, _SessionStore_logger, logger, "f");
    __classPrivateFieldSet(this, _SessionStore_option, option, "f");
    if (!cookies)
      return;
    const { name: sessionCookiePrefix } = option;
    for (const [name, value] of Object.entries(cookies)) {
      if (!name.startsWith(sessionCookiePrefix) || !value)
        continue;
      __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
    }
  }
  /**
   * The JWT Session or database Session ID
   * constructed from the cookie chunks.
   */
  get value() {
    const sortedKeys = Object.keys(__classPrivateFieldGet(this, _SessionStore_chunks, "f")).sort((a, b2) => {
      const aSuffix = parseInt(a.split(".").pop() || "0");
      const bSuffix = parseInt(b2.split(".").pop() || "0");
      return aSuffix - bSuffix;
    });
    return sortedKeys.map((key) => __classPrivateFieldGet(this, _SessionStore_chunks, "f")[key]).join("");
  }
  /**
   * Given a cookie value, return new cookies, chunked, to fit the allowed cookie size.
   * If the cookie has changed from chunked to unchunked or vice versa,
   * it deletes the old cookies as well.
   */
  chunk(value, options) {
    const cookies = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this);
    const chunked = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_chunk).call(this, {
      name: __classPrivateFieldGet(this, _SessionStore_option, "f").name,
      value,
      options: { ...__classPrivateFieldGet(this, _SessionStore_option, "f").options, ...options }
    });
    for (const chunk of chunked) {
      cookies[chunk.name] = chunk;
    }
    return Object.values(cookies);
  }
  /** Returns a list of cookies that should be cleaned. */
  clean() {
    return Object.values(__classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this));
  }
}
_SessionStore_chunks = /* @__PURE__ */ new WeakMap(), _SessionStore_option = /* @__PURE__ */ new WeakMap(), _SessionStore_logger = /* @__PURE__ */ new WeakMap(), _SessionStore_instances = /* @__PURE__ */ new WeakSet(), _SessionStore_chunk = function _SessionStore_chunk2(cookie2) {
  const chunkCount = Math.ceil(cookie2.value.length / CHUNK_SIZE);
  if (chunkCount === 1) {
    __classPrivateFieldGet(this, _SessionStore_chunks, "f")[cookie2.name] = cookie2.value;
    return [cookie2];
  }
  const cookies = [];
  for (let i = 0; i < chunkCount; i++) {
    const name = `${cookie2.name}.${i}`;
    const value = cookie2.value.substr(i * CHUNK_SIZE, CHUNK_SIZE);
    cookies.push({ ...cookie2, name, value });
    __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
  }
  __classPrivateFieldGet(this, _SessionStore_logger, "f").debug("CHUNKING_SESSION_COOKIE", {
    message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
    emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
    valueSize: cookie2.value.length,
    chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
  });
  return cookies;
}, _SessionStore_clean = function _SessionStore_clean2() {
  const cleanedChunks = {};
  for (const name in __classPrivateFieldGet(this, _SessionStore_chunks, "f")) {
    delete __classPrivateFieldGet(this, _SessionStore_chunks, "f")?.[name];
    cleanedChunks[name] = {
      name,
      value: "",
      options: { ...__classPrivateFieldGet(this, _SessionStore_option, "f").options, maxAge: 0 }
    };
  }
  return cleanedChunks;
};
class AuthError extends Error {
  /** @internal */
  constructor(message, errorOptions) {
    if (message instanceof Error) {
      super(void 0, {
        cause: { err: message, ...message.cause, ...errorOptions }
      });
    } else if (typeof message === "string") {
      if (errorOptions instanceof Error) {
        errorOptions = { err: errorOptions, ...errorOptions.cause };
      }
      super(message, errorOptions);
    } else {
      super(void 0, message);
    }
    this.name = this.constructor.name;
    this.type = this.constructor.type ?? "AuthError";
    this.kind = this.constructor.kind ?? "error";
    Error.captureStackTrace?.(this, this.constructor);
    const url = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
    this.message += `${this.message ? ". " : ""}Read more at ${url}`;
  }
}
class SignInError extends AuthError {
}
SignInError.kind = "signIn";
class AdapterError extends AuthError {
}
AdapterError.type = "AdapterError";
class AccessDenied extends AuthError {
}
AccessDenied.type = "AccessDenied";
class CallbackRouteError extends AuthError {
}
CallbackRouteError.type = "CallbackRouteError";
class ErrorPageLoop extends AuthError {
}
ErrorPageLoop.type = "ErrorPageLoop";
class EventError extends AuthError {
}
EventError.type = "EventError";
class InvalidCallbackUrl extends AuthError {
}
InvalidCallbackUrl.type = "InvalidCallbackUrl";
class CredentialsSignin extends SignInError {
  constructor() {
    super(...arguments);
    this.code = "credentials";
  }
}
CredentialsSignin.type = "CredentialsSignin";
class InvalidEndpoints extends AuthError {
}
InvalidEndpoints.type = "InvalidEndpoints";
class InvalidCheck extends AuthError {
}
InvalidCheck.type = "InvalidCheck";
class JWTSessionError extends AuthError {
}
JWTSessionError.type = "JWTSessionError";
class MissingAdapter extends AuthError {
}
MissingAdapter.type = "MissingAdapter";
class MissingAdapterMethods extends AuthError {
}
MissingAdapterMethods.type = "MissingAdapterMethods";
class MissingAuthorize extends AuthError {
}
MissingAuthorize.type = "MissingAuthorize";
class MissingSecret extends AuthError {
}
MissingSecret.type = "MissingSecret";
class OAuthAccountNotLinked extends SignInError {
}
OAuthAccountNotLinked.type = "OAuthAccountNotLinked";
class OAuthCallbackError extends SignInError {
}
OAuthCallbackError.type = "OAuthCallbackError";
class OAuthProfileParseError extends AuthError {
}
OAuthProfileParseError.type = "OAuthProfileParseError";
class SessionTokenError extends AuthError {
}
SessionTokenError.type = "SessionTokenError";
class OAuthSignInError extends SignInError {
}
OAuthSignInError.type = "OAuthSignInError";
class EmailSignInError extends SignInError {
}
EmailSignInError.type = "EmailSignInError";
class SignOutError extends AuthError {
}
SignOutError.type = "SignOutError";
class UnknownAction extends AuthError {
}
UnknownAction.type = "UnknownAction";
class UnsupportedStrategy extends AuthError {
}
UnsupportedStrategy.type = "UnsupportedStrategy";
class InvalidProvider extends AuthError {
}
InvalidProvider.type = "InvalidProvider";
class UntrustedHost extends AuthError {
}
UntrustedHost.type = "UntrustedHost";
class Verification extends AuthError {
}
Verification.type = "Verification";
class MissingCSRF extends SignInError {
}
MissingCSRF.type = "MissingCSRF";
const clientErrors = /* @__PURE__ */ new Set([
  "CredentialsSignin",
  "OAuthAccountNotLinked",
  "OAuthCallbackError",
  "AccessDenied",
  "Verification",
  "MissingCSRF",
  "AccountNotLinked",
  "WebAuthnVerificationError"
]);
function isClientError(error) {
  if (error instanceof AuthError)
    return clientErrors.has(error.type);
  return false;
}
class DuplicateConditionalUI extends AuthError {
}
DuplicateConditionalUI.type = "DuplicateConditionalUI";
class MissingWebAuthnAutocomplete extends AuthError {
}
MissingWebAuthnAutocomplete.type = "MissingWebAuthnAutocomplete";
class WebAuthnVerificationError extends AuthError {
}
WebAuthnVerificationError.type = "WebAuthnVerificationError";
class AccountNotLinked extends SignInError {
}
AccountNotLinked.type = "AccountNotLinked";
class ExperimentalFeatureNotEnabled extends AuthError {
}
ExperimentalFeatureNotEnabled.type = "ExperimentalFeatureNotEnabled";
let warned = false;
function isValidHttpUrl(url, baseUrl) {
  try {
    return /^https?:/.test(new URL(url, url.startsWith("/") ? baseUrl : void 0).protocol);
  } catch {
    return false;
  }
}
function isSemverString(version) {
  return /^v\d+(?:\.\d+){0,2}$/.test(version);
}
let hasCredentials = false;
let hasEmail = false;
let hasWebAuthn = false;
const emailMethods = [
  "createVerificationToken",
  "useVerificationToken",
  "getUserByEmail"
];
const sessionMethods = [
  "createUser",
  "getUser",
  "getUserByEmail",
  "getUserByAccount",
  "updateUser",
  "linkAccount",
  "createSession",
  "getSessionAndUser",
  "updateSession",
  "deleteSession"
];
const webauthnMethods = [
  "createUser",
  "getUser",
  "linkAccount",
  "getAccount",
  "getAuthenticator",
  "createAuthenticator",
  "listAuthenticatorsByUserId",
  "updateAuthenticatorCounter"
];
function assertConfig(request, options) {
  const { url } = request;
  const warnings = [];
  if (!warned && options.debug)
    warnings.push("debug-enabled");
  if (!options.trustHost) {
    return new UntrustedHost(`Host must be trusted. URL was: ${request.url}`);
  }
  if (!options.secret?.length) {
    return new MissingSecret("Please define a `secret`");
  }
  const callbackUrlParam = request.query?.callbackUrl;
  if (callbackUrlParam && !isValidHttpUrl(callbackUrlParam, url.origin)) {
    return new InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlParam}`);
  }
  const { callbackUrl: defaultCallbackUrl } = defaultCookies(options.useSecureCookies ?? url.protocol === "https:");
  const callbackUrlCookie = request.cookies?.[options.cookies?.callbackUrl?.name ?? defaultCallbackUrl.name];
  if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.origin)) {
    return new InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlCookie}`);
  }
  let hasConditionalUIProvider = false;
  for (const p of options.providers) {
    const provider = typeof p === "function" ? p() : p;
    if ((provider.type === "oauth" || provider.type === "oidc") && !(provider.issuer ?? provider.options?.issuer)) {
      const { authorization: a, token: t, userinfo: u2 } = provider;
      let key;
      if (typeof a !== "string" && !a?.url)
        key = "authorization";
      else if (typeof t !== "string" && !t?.url)
        key = "token";
      else if (typeof u2 !== "string" && !u2?.url)
        key = "userinfo";
      if (key) {
        return new InvalidEndpoints(`Provider "${provider.id}" is missing both \`issuer\` and \`${key}\` endpoint config. At least one of them is required`);
      }
    }
    if (provider.type === "credentials")
      hasCredentials = true;
    else if (provider.type === "email")
      hasEmail = true;
    else if (provider.type === "webauthn") {
      hasWebAuthn = true;
      if (provider.simpleWebAuthnBrowserVersion && !isSemverString(provider.simpleWebAuthnBrowserVersion)) {
        return new AuthError(`Invalid provider config for "${provider.id}": simpleWebAuthnBrowserVersion "${provider.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
      }
      if (provider.enableConditionalUI) {
        if (hasConditionalUIProvider) {
          return new DuplicateConditionalUI(`Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time`);
        }
        hasConditionalUIProvider = true;
        const hasWebauthnFormField = Object.values(provider.formFields).some((f) => f.autocomplete && f.autocomplete.toString().indexOf("webauthn") > -1);
        if (!hasWebauthnFormField) {
          return new MissingWebAuthnAutocomplete(`Provider "${provider.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
        }
      }
    }
  }
  if (hasCredentials) {
    const dbStrategy = options.session?.strategy === "database";
    const onlyCredentials = !options.providers.some((p) => (typeof p === "function" ? p() : p).type !== "credentials");
    if (dbStrategy && onlyCredentials) {
      return new UnsupportedStrategy("Signing in with credentials only supported if JWT strategy is enabled");
    }
    const credentialsNoAuthorize = options.providers.some((p) => {
      const provider = typeof p === "function" ? p() : p;
      return provider.type === "credentials" && !provider.authorize;
    });
    if (credentialsNoAuthorize) {
      return new MissingAuthorize("Must define an authorize() handler to use credentials authentication provider");
    }
  }
  const { adapter, session: session2 } = options;
  const requiredMethods = [];
  if (hasEmail || session2?.strategy === "database" || !session2?.strategy && adapter) {
    if (hasEmail) {
      if (!adapter)
        return new MissingAdapter("Email login requires an adapter");
      requiredMethods.push(...emailMethods);
    } else {
      if (!adapter)
        return new MissingAdapter("Database session requires an adapter");
      requiredMethods.push(...sessionMethods);
    }
  }
  if (hasWebAuthn) {
    if (options.experimental?.enableWebAuthn) {
      warnings.push("experimental-webauthn");
    } else {
      return new ExperimentalFeatureNotEnabled("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
    }
    if (!adapter)
      return new MissingAdapter("WebAuthn requires an adapter");
    requiredMethods.push(...webauthnMethods);
  }
  if (adapter) {
    const missing = requiredMethods.filter((m) => !(m in adapter));
    if (missing.length) {
      return new MissingAdapterMethods(`Required adapter methods were missing: ${missing.join(", ")}`);
    }
  }
  if (!warned)
    warned = true;
  return warnings;
}
const cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
const cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parse(str, options) {
  const obj = new NullObject();
  const len = str.length;
  if (len < 2)
    return obj;
  const dec = decode$1;
  let index = 0;
  do {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1)
      break;
    const colonIdx = str.indexOf(";", index);
    const endIdx = colonIdx === -1 ? len : colonIdx;
    if (eqIdx > endIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const keyStartIdx = startIndex(str, index, eqIdx);
    const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
    const key = str.slice(keyStartIdx, keyEndIdx);
    if (obj[key] === void 0) {
      let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
      let valEndIdx = endIndex(str, endIdx, valStartIdx);
      const value = dec(str.slice(valStartIdx, valEndIdx));
      obj[key] = value;
    }
    index = endIdx + 1;
  } while (index < len);
  return obj;
}
function startIndex(str, index, max) {
  do {
    const code = str.charCodeAt(index);
    if (code !== 32 && code !== 9)
      return index;
  } while (++index < max);
  return max;
}
function endIndex(str, index, min) {
  while (index > min) {
    const code = str.charCodeAt(--index);
    if (code !== 32 && code !== 9)
      return index + 1;
  }
  return min;
}
function serialize(name, val, options) {
  const enc2 = options?.encode || encodeURIComponent;
  if (!cookieNameRegExp.test(name)) {
    throw new TypeError(`argument name is invalid: ${name}`);
  }
  const value = enc2(val);
  if (!cookieValueRegExp.test(value)) {
    throw new TypeError(`argument val is invalid: ${val}`);
  }
  let str = name + "=" + value;
  if (!options)
    return str;
  if (options.maxAge !== void 0) {
    if (!Number.isInteger(options.maxAge)) {
      throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
    }
    str += "; Max-Age=" + options.maxAge;
  }
  if (options.domain) {
    if (!domainValueRegExp.test(options.domain)) {
      throw new TypeError(`option domain is invalid: ${options.domain}`);
    }
    str += "; Domain=" + options.domain;
  }
  if (options.path) {
    if (!pathValueRegExp.test(options.path)) {
      throw new TypeError(`option path is invalid: ${options.path}`);
    }
    str += "; Path=" + options.path;
  }
  if (options.expires) {
    if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
      throw new TypeError(`option expires is invalid: ${options.expires}`);
    }
    str += "; Expires=" + options.expires.toUTCString();
  }
  if (options.httpOnly) {
    str += "; HttpOnly";
  }
  if (options.secure) {
    str += "; Secure";
  }
  if (options.partitioned) {
    str += "; Partitioned";
  }
  if (options.priority) {
    const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${options.priority}`);
    }
  }
  if (options.sameSite) {
    const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
    switch (sameSite) {
      case true:
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
    }
  }
  return str;
}
function decode$1(str) {
  if (str.indexOf("%") === -1)
    return str;
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}
function isDate(val) {
  return __toString.call(val) === "[object Date]";
}
const cookie = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  parse,
  serialize
});
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60;
const now = () => Date.now() / 1e3 | 0;
const alg = "dir";
const enc = "A256CBC-HS512";
async function encode(params) {
  const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt } = params;
  const secrets = Array.isArray(secret) ? secret : [secret];
  const encryptionSecret = await getDerivedEncryptionKey(enc, secrets[0], salt);
  const thumbprint = await calculateJwkThumbprint({ kty: "oct", k: encode$1(encryptionSecret) }, `sha${encryptionSecret.byteLength << 3}`);
  return await new EncryptJWT(token).setProtectedHeader({ alg, enc, kid: thumbprint }).setIssuedAt().setExpirationTime(now() + maxAge).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
async function decode(params) {
  const { token, secret, salt } = params;
  const secrets = Array.isArray(secret) ? secret : [secret];
  if (!token)
    return null;
  const { payload } = await jwtDecrypt(token, async ({ kid, enc: enc2 }) => {
    for (const secret2 of secrets) {
      const encryptionSecret = await getDerivedEncryptionKey(enc2, secret2, salt);
      if (kid === void 0)
        return encryptionSecret;
      const thumbprint = await calculateJwkThumbprint({ kty: "oct", k: encode$1(encryptionSecret) }, `sha${encryptionSecret.byteLength << 3}`);
      if (kid === thumbprint)
        return encryptionSecret;
    }
    throw new Error("no matching decryption secret");
  }, {
    clockTolerance: 15,
    keyManagementAlgorithms: [alg],
    contentEncryptionAlgorithms: [enc, "A256GCM"]
  });
  return payload;
}
async function getDerivedEncryptionKey(enc2, keyMaterial, salt) {
  let length;
  switch (enc2) {
    case "A256CBC-HS512":
      length = 64;
      break;
    case "A256GCM":
      length = 32;
      break;
    default:
      throw new Error("Unsupported JWT Content Encryption Algorithm");
  }
  return await hkdf("sha256", keyMaterial, salt, `Auth.js Generated Encryption Key (${salt})`, length);
}
async function createCallbackUrl({ options, paramValue, cookieValue }) {
  const { url, callbacks } = options;
  let callbackUrl = url.origin;
  if (paramValue) {
    callbackUrl = await callbacks.redirect({
      url: paramValue,
      baseUrl: url.origin
    });
  } else if (cookieValue) {
    callbackUrl = await callbacks.redirect({
      url: cookieValue,
      baseUrl: url.origin
    });
  }
  return {
    callbackUrl,
    // Save callback URL in a cookie so that it can be used for subsequent requests in signin/signout/callback flow
    callbackUrlCookie: callbackUrl !== cookieValue ? callbackUrl : void 0
  };
}
const red = "\x1B[31m";
const yellow = "\x1B[33m";
const grey = "\x1B[90m";
const reset = "\x1B[0m";
const defaultLogger = {
  error(error) {
    const name = error instanceof AuthError ? error.type : error.name;
    console.error(`${red}[auth][error]${reset} ${name}: ${error.message}`);
    if (error.cause && typeof error.cause === "object" && "err" in error.cause && error.cause.err instanceof Error) {
      const { err, ...data } = error.cause;
      console.error(`${red}[auth][cause]${reset}:`, err.stack);
      if (data)
        console.error(`${red}[auth][details]${reset}:`, JSON.stringify(data, null, 2));
    } else if (error.stack) {
      console.error(error.stack.replace(/.*/, "").substring(1));
    }
  },
  warn(code) {
    const url = `https://warnings.authjs.dev`;
    console.warn(`${yellow}[auth][warn][${code}]${reset}`, `Read more: ${url}`);
  },
  debug(message, metadata) {
    console.log(`${grey}[auth][debug]:${reset} ${message}`, JSON.stringify(metadata, null, 2));
  }
};
function setLogger(config) {
  const newLogger = {
    ...defaultLogger
  };
  if (!config.debug)
    newLogger.debug = () => {
    };
  if (config.logger?.error)
    newLogger.error = config.logger.error;
  if (config.logger?.warn)
    newLogger.warn = config.logger.warn;
  if (config.logger?.debug)
    newLogger.debug = config.logger.debug;
  config.logger ?? (config.logger = newLogger);
  return newLogger;
}
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error",
  "webauthn-options"
];
function isAuthAction(action) {
  return actions.includes(action);
}
const { parse: parseCookie$1, serialize: serializeCookie } = cookie;
async function getBody(req) {
  if (!("body" in req) || !req.body || req.method !== "POST")
    return;
  const contentType = req.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return await req.json();
  } else if (contentType?.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(await req.text());
    return Object.fromEntries(params);
  }
}
async function toInternalRequest(req, config) {
  try {
    if (req.method !== "GET" && req.method !== "POST")
      throw new UnknownAction("Only GET and POST requests are supported");
    config.basePath ?? (config.basePath = "/auth");
    const url = new URL(req.url);
    const { action, providerId } = parseActionAndProviderId(url.pathname, config.basePath);
    return {
      url,
      action,
      providerId,
      method: req.method,
      headers: Object.fromEntries(req.headers),
      body: req.body ? await getBody(req) : void 0,
      cookies: parseCookie$1(req.headers.get("cookie") ?? "") ?? {},
      error: url.searchParams.get("error") ?? void 0,
      query: Object.fromEntries(url.searchParams)
    };
  } catch (e) {
    const logger = setLogger(config);
    logger.error(e);
    logger.debug("request", req);
  }
}
function toRequest(request) {
  return new Request(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.method === "POST" ? JSON.stringify(request.body ?? {}) : void 0
  });
}
function toResponse(res) {
  const headers = new Headers(res.headers);
  res.cookies?.forEach((cookie2) => {
    const { name, value, options } = cookie2;
    const cookieHeader = serializeCookie(name, value, options);
    if (headers.has("Set-Cookie"))
      headers.append("Set-Cookie", cookieHeader);
    else
      headers.set("Set-Cookie", cookieHeader);
  });
  let body = res.body;
  if (headers.get("content-type") === "application/json")
    body = JSON.stringify(res.body);
  else if (headers.get("content-type") === "application/x-www-form-urlencoded")
    body = new URLSearchParams(res.body).toString();
  const status = res.redirect ? 302 : res.status ?? 200;
  const response = new Response(body, { headers, status });
  if (res.redirect)
    response.headers.set("Location", res.redirect);
  return response;
}
async function createHash(message) {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b2) => b2.toString(16).padStart(2, "0")).join("").toString();
}
function randomString(size) {
  const i2hex = (i) => ("0" + i.toString(16)).slice(-2);
  const r = (a, i) => a + i2hex(i);
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes).reduce(r, "");
}
function parseActionAndProviderId(pathname, base) {
  const a = pathname.match(new RegExp(`^${base}(.+)`));
  if (a === null)
    throw new UnknownAction(`Cannot parse action at ${pathname}`);
  const actionAndProviderId = a.at(-1);
  const b2 = actionAndProviderId.replace(/^\//, "").split("/").filter(Boolean);
  if (b2.length !== 1 && b2.length !== 2)
    throw new UnknownAction(`Cannot parse action at ${pathname}`);
  const [action, providerId] = b2;
  if (!isAuthAction(action))
    throw new UnknownAction(`Cannot parse action at ${pathname}`);
  if (providerId && !["signin", "callback", "webauthn-options"].includes(action))
    throw new UnknownAction(`Cannot parse action at ${pathname}`);
  return {
    action,
    providerId: providerId == "undefined" ? void 0 : providerId
  };
}
async function createCSRFToken({ options, cookieValue, isPost, bodyValue }) {
  if (cookieValue) {
    const [csrfToken2, csrfTokenHash2] = cookieValue.split("|");
    const expectedCsrfTokenHash = await createHash(`${csrfToken2}${options.secret}`);
    if (csrfTokenHash2 === expectedCsrfTokenHash) {
      const csrfTokenVerified = isPost && csrfToken2 === bodyValue;
      return { csrfTokenVerified, csrfToken: csrfToken2 };
    }
  }
  const csrfToken = randomString(32);
  const csrfTokenHash = await createHash(`${csrfToken}${options.secret}`);
  const cookie2 = `${csrfToken}|${csrfTokenHash}`;
  return { cookie: cookie2, csrfToken };
}
function validateCSRF(action, verified) {
  if (verified)
    return;
  throw new MissingCSRF(`CSRF token was missing during an action ${action}`);
}
function isObject(item) {
  return item !== null && typeof item === "object";
}
function merge(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!isObject(target[key]))
          target[key] = Array.isArray(source[key]) ? [] : {};
        merge(target[key], source[key]);
      } else if (source[key] !== void 0)
        target[key] = source[key];
    }
  }
  return merge(target, ...sources);
}
const skipCSRFCheck = /* @__PURE__ */ Symbol("skip-csrf-check");
const raw = /* @__PURE__ */ Symbol("return-type-raw");
const customFetch = /* @__PURE__ */ Symbol("custom-fetch");
const conformInternal = /* @__PURE__ */ Symbol("conform-internal");
function parseProviders(params) {
  const { providerId, config } = params;
  const url = new URL(config.basePath ?? "/auth", params.url.origin);
  const providers = config.providers.map((p) => {
    const provider2 = typeof p === "function" ? p() : p;
    const { options: userOptions, ...defaults } = provider2;
    const id = userOptions?.id ?? defaults.id;
    const merged = merge(defaults, userOptions, {
      signinUrl: `${url}/signin/${id}`,
      callbackUrl: `${url}/callback/${id}`
    });
    if (provider2.type === "oauth" || provider2.type === "oidc") {
      merged.redirectProxyUrl ?? (merged.redirectProxyUrl = userOptions?.redirectProxyUrl ?? config.redirectProxyUrl);
      const normalized = normalizeOAuth(merged);
      if (normalized.authorization?.url.searchParams.get("response_mode") === "form_post") {
        delete normalized.redirectProxyUrl;
      }
      normalized[customFetch] ?? (normalized[customFetch] = userOptions?.[customFetch]);
      return normalized;
    }
    return merged;
  });
  const provider = providers.find(({ id }) => id === providerId);
  if (providerId && !provider) {
    const availableProviders = providers.map((p) => p.id).join(", ");
    throw new Error(`Provider with id "${providerId}" not found. Available providers: [${availableProviders}].`);
  }
  return { providers, provider };
}
function normalizeOAuth(c) {
  if (c.issuer)
    c.wellKnown ?? (c.wellKnown = `${c.issuer}/.well-known/openid-configuration`);
  const authorization = normalizeEndpoint(c.authorization, c.issuer);
  if (authorization && !authorization.url?.searchParams.has("scope")) {
    authorization.url.searchParams.set("scope", "openid profile email");
  }
  const token = normalizeEndpoint(c.token, c.issuer);
  const userinfo = normalizeEndpoint(c.userinfo, c.issuer);
  const checks = c.checks ?? ["pkce"];
  if (c.redirectProxyUrl) {
    if (!checks.includes("state"))
      checks.push("state");
    c.redirectProxyUrl = `${c.redirectProxyUrl}/callback/${c.id}`;
  }
  return {
    ...c,
    authorization,
    token,
    checks,
    userinfo,
    profile: c.profile ?? defaultProfile,
    account: c.account ?? defaultAccount
  };
}
const defaultProfile = (profile) => {
  return stripUndefined({
    id: profile.sub ?? profile.id ?? crypto.randomUUID(),
    name: profile.name ?? profile.nickname ?? profile.preferred_username,
    email: profile.email,
    image: profile.picture
  });
};
const defaultAccount = (account) => {
  return stripUndefined({
    access_token: account.access_token,
    id_token: account.id_token,
    refresh_token: account.refresh_token,
    expires_at: account.expires_at,
    scope: account.scope,
    token_type: account.token_type,
    session_state: account.session_state
  });
};
function stripUndefined(o) {
  const result = {};
  for (const [k, v] of Object.entries(o)) {
    if (v !== void 0)
      result[k] = v;
  }
  return result;
}
function normalizeEndpoint(e, issuer) {
  if (!e && issuer)
    return;
  if (typeof e === "string") {
    return { url: new URL(e) };
  }
  const url = new URL(e?.url ?? "https://authjs.dev");
  if (e?.params != null) {
    for (let [key, value] of Object.entries(e.params)) {
      if (key === "claims") {
        value = JSON.stringify(value);
      }
      url.searchParams.set(key, String(value));
    }
  }
  return {
    url,
    request: e?.request,
    conform: e?.conform,
    ...e?.clientPrivateKey ? { clientPrivateKey: e?.clientPrivateKey } : null
  };
}
function isOIDCProvider(provider) {
  return provider.type === "oidc";
}
const defaultCallbacks = {
  signIn() {
    return true;
  },
  redirect({ url, baseUrl }) {
    if (url.startsWith("/"))
      return `${baseUrl}${url}`;
    else if (new URL(url).origin === baseUrl)
      return url;
    return baseUrl;
  },
  session({ session: session2 }) {
    return {
      user: {
        name: session2.user?.name,
        email: session2.user?.email,
        image: session2.user?.image
      },
      expires: session2.expires?.toISOString?.() ?? session2.expires
    };
  },
  jwt({ token }) {
    return token;
  }
};
async function init({ authOptions: config, providerId, action, url, cookies: reqCookies, callbackUrl: reqCallbackUrl, csrfToken: reqCsrfToken, csrfDisabled, isPost }) {
  const logger = setLogger(config);
  const { providers, provider } = parseProviders({ url, providerId, config });
  const maxAge = 30 * 24 * 60 * 60;
  let isOnRedirectProxy = false;
  if ((provider?.type === "oauth" || provider?.type === "oidc") && provider.redirectProxyUrl) {
    try {
      isOnRedirectProxy = new URL(provider.redirectProxyUrl).origin === url.origin;
    } catch {
      throw new TypeError(`redirectProxyUrl must be a valid URL. Received: ${provider.redirectProxyUrl}`);
    }
  }
  const options = {
    debug: false,
    pages: {},
    theme: {
      colorScheme: "auto",
      logo: "",
      brandColor: "",
      buttonText: ""
    },
    // Custom options override defaults
    ...config,
    // These computed settings can have values in userOptions but we override them
    // and are request-specific.
    url,
    action,
    // @ts-expect-errors
    provider,
    cookies: merge(defaultCookies(config.useSecureCookies ?? url.protocol === "https:"), config.cookies),
    providers,
    // Session options
    session: {
      // If no adapter specified, force use of JSON Web Tokens (stateless)
      strategy: config.adapter ? "database" : "jwt",
      maxAge,
      updateAge: 24 * 60 * 60,
      generateSessionToken: () => crypto.randomUUID(),
      ...config.session
    },
    // JWT options
    jwt: {
      secret: config.secret,
      // Asserted in assert.ts
      maxAge: config.session?.maxAge ?? maxAge,
      // default to same as `session.maxAge`
      encode,
      decode,
      ...config.jwt
    },
    // Event messages
    events: eventsErrorHandler(config.events ?? {}, logger),
    adapter: adapterErrorHandler(config.adapter, logger),
    // Callback functions
    callbacks: { ...defaultCallbacks, ...config.callbacks },
    logger,
    callbackUrl: url.origin,
    isOnRedirectProxy,
    experimental: {
      ...config.experimental
    }
  };
  const cookies = [];
  if (csrfDisabled) {
    options.csrfTokenVerified = true;
  } else {
    const { csrfToken, cookie: csrfCookie, csrfTokenVerified } = await createCSRFToken({
      options,
      cookieValue: reqCookies?.[options.cookies.csrfToken.name],
      isPost,
      bodyValue: reqCsrfToken
    });
    options.csrfToken = csrfToken;
    options.csrfTokenVerified = csrfTokenVerified;
    if (csrfCookie) {
      cookies.push({
        name: options.cookies.csrfToken.name,
        value: csrfCookie,
        options: options.cookies.csrfToken.options
      });
    }
  }
  const { callbackUrl, callbackUrlCookie } = await createCallbackUrl({
    options,
    cookieValue: reqCookies?.[options.cookies.callbackUrl.name],
    paramValue: reqCallbackUrl
  });
  options.callbackUrl = callbackUrl;
  if (callbackUrlCookie) {
    cookies.push({
      name: options.cookies.callbackUrl.name,
      value: callbackUrlCookie,
      options: options.cookies.callbackUrl.options
    });
  }
  return { options, cookies };
}
function eventsErrorHandler(methods, logger) {
  return Object.keys(methods).reduce((acc, name) => {
    acc[name] = async (...args) => {
      try {
        const method = methods[name];
        return await method(...args);
      } catch (e) {
        logger.error(new EventError(e));
      }
    };
    return acc;
  }, {});
}
function adapterErrorHandler(adapter, logger) {
  if (!adapter)
    return;
  return Object.keys(adapter).reduce((acc, name) => {
    acc[name] = async (...args) => {
      try {
        logger.debug(`adapter_${name}`, { args });
        const method = adapter[name];
        return await method(...args);
      } catch (e) {
        const error = new AdapterError(e);
        logger.error(error);
        throw error;
      }
    };
    return acc;
  }, {});
}
function ErrorPage(props) {
  const { url, error = "default", theme } = props;
  const signinPageUrl = `${url}/signin`;
  const errors = {
    default: {
      status: 200,
      heading: "Error",
      message: u("p", { children: u("a", { className: "site", href: url?.origin, children: url?.host }) })
    },
    Configuration: {
      status: 500,
      heading: "Server error",
      message: u("div", { children: [u("p", { children: "There is a problem with the server configuration." }), u("p", { children: "Check the server logs for more information." })] })
    },
    AccessDenied: {
      status: 403,
      heading: "Access Denied",
      message: u("div", { children: [u("p", { children: "You do not have permission to sign in." }), u("p", { children: u("a", { className: "button", href: signinPageUrl, children: "Sign in" }) })] })
    },
    Verification: {
      status: 403,
      heading: "Unable to sign in",
      message: u("div", { children: [u("p", { children: "The sign in link is no longer valid." }), u("p", { children: "It may have been used already or it may have expired." })] }),
      signin: u("a", { className: "button", href: signinPageUrl, children: "Sign in" })
    }
  };
  const { status, heading, message, signin } = errors[error] ?? errors.default;
  return {
    status,
    html: u("div", { className: "error", children: [theme?.brandColor && u("style", { dangerouslySetInnerHTML: {
      __html: `
        :root {
          --brand-color: ${theme?.brandColor}
        }
      `
    } }), u("div", { className: "card", children: [theme?.logo && u("img", { src: theme?.logo, alt: "Logo", className: "logo" }), u("h1", { children: heading }), u("div", { className: "message", children: message }), signin] })] })
  };
}
async function webauthnScript(authURL, providerID) {
  const WebAuthnBrowser = window.SimpleWebAuthnBrowser;
  async function fetchOptions(action) {
    const url = new URL(`${authURL}/webauthn-options/${providerID}`);
    if (action)
      url.searchParams.append("action", action);
    const formFields = getFormFields();
    formFields.forEach((field) => {
      url.searchParams.append(field.name, field.value);
    });
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch options", res);
      return;
    }
    return res.json();
  }
  function getForm() {
    const formID = `#${providerID}-form`;
    const form = document.querySelector(formID);
    if (!form)
      throw new Error(`Form '${formID}' not found`);
    return form;
  }
  function getFormFields() {
    const form = getForm();
    const formFields = Array.from(form.querySelectorAll("input[data-form-field]"));
    return formFields;
  }
  async function submitForm(action, data) {
    const form = getForm();
    if (action) {
      const actionInput = document.createElement("input");
      actionInput.type = "hidden";
      actionInput.name = "action";
      actionInput.value = action;
      form.appendChild(actionInput);
    }
    if (data) {
      const dataInput = document.createElement("input");
      dataInput.type = "hidden";
      dataInput.name = "data";
      dataInput.value = JSON.stringify(data);
      form.appendChild(dataInput);
    }
    return form.submit();
  }
  async function authenticationFlow(options, autofill) {
    const authResp = await WebAuthnBrowser.startAuthentication(options, autofill);
    return await submitForm("authenticate", authResp);
  }
  async function registrationFlow(options) {
    const formFields = getFormFields();
    formFields.forEach((field) => {
      if (field.required && !field.value) {
        throw new Error(`Missing required field: ${field.name}`);
      }
    });
    const regResp = await WebAuthnBrowser.startRegistration(options);
    return await submitForm("register", regResp);
  }
  async function autofillAuthentication() {
    if (!WebAuthnBrowser.browserSupportsWebAuthnAutofill())
      return;
    const res = await fetchOptions("authenticate");
    if (!res) {
      console.error("Failed to fetch option for autofill authentication");
      return;
    }
    try {
      await authenticationFlow(res.options, true);
    } catch (e) {
      console.error(e);
    }
  }
  async function setupForm() {
    const form = getForm();
    if (!WebAuthnBrowser.browserSupportsWebAuthn()) {
      form.style.display = "none";
      return;
    }
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const res = await fetchOptions(void 0);
        if (!res) {
          console.error("Failed to fetch options for form submission");
          return;
        }
        if (res.action === "authenticate") {
          try {
            await authenticationFlow(res.options, false);
          } catch (e2) {
            console.error(e2);
          }
        } else if (res.action === "register") {
          try {
            await registrationFlow(res.options);
          } catch (e2) {
            console.error(e2);
          }
        }
      });
    }
  }
  setupForm();
  autofillAuthentication();
}
const signinErrors = {
  default: "Unable to sign in.",
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallbackError: "Try signing in with a different account.",
  OAuthCreateAccount: "Try signing in with a different account.",
  EmailCreateAccount: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page."
};
function ConditionalUIScript(providerID) {
  const startConditionalUIScript = `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${webauthnScript})(authURL, "${providerID}");
`;
  return u(b, { children: u("script", { dangerouslySetInnerHTML: { __html: startConditionalUIScript } }) });
}
function SigninPage(props) {
  const { csrfToken, providers = [], callbackUrl, theme, email, error: errorType } = props;
  if (typeof document !== "undefined" && theme?.brandColor) {
    document.documentElement.style.setProperty("--brand-color", theme.brandColor);
  }
  if (typeof document !== "undefined" && theme?.buttonText) {
    document.documentElement.style.setProperty("--button-text-color", theme.buttonText);
  }
  const error = errorType && (signinErrors[errorType] ?? signinErrors.default);
  const providerLogoPath = "https://authjs.dev/img/providers";
  const conditionalUIProviderID = providers.find((provider) => provider.type === "webauthn" && provider.enableConditionalUI)?.id;
  return u("div", { className: "signin", children: [theme?.brandColor && u("style", { dangerouslySetInnerHTML: {
    __html: `:root {--brand-color: ${theme.brandColor}}`
  } }), theme?.buttonText && u("style", { dangerouslySetInnerHTML: {
    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
  } }), u("div", { className: "card", children: [error && u("div", { className: "error", children: u("p", { children: error }) }), theme?.logo && u("img", { src: theme.logo, alt: "Logo", className: "logo" }), providers.map((provider, i) => {
    let bg, brandColor, logo;
    if (provider.type === "oauth" || provider.type === "oidc") {
      ({
        bg = "#fff",
        brandColor,
        logo = `${providerLogoPath}/${provider.id}.svg`
      } = provider.style ?? {});
    }
    const color = brandColor ?? bg ?? "#fff";
    return u("div", { className: "provider", children: [provider.type === "oauth" || provider.type === "oidc" ? u("form", { action: provider.signinUrl, method: "POST", children: [u("input", { type: "hidden", name: "csrfToken", value: csrfToken }), callbackUrl && u("input", { type: "hidden", name: "callbackUrl", value: callbackUrl }), u("button", { type: "submit", className: "button", style: {
      "--provider-brand-color": color
    }, tabIndex: 0, children: [u("span", { style: {
      filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)",
      "mix-blend-mode": "luminosity",
      opacity: 0.95
    }, children: ["Sign in with ", provider.name] }), logo && u("img", { loading: "lazy", height: 24, src: logo })] })] }) : null, (provider.type === "email" || provider.type === "credentials" || provider.type === "webauthn") && i > 0 && providers[i - 1].type !== "email" && providers[i - 1].type !== "credentials" && providers[i - 1].type !== "webauthn" && u("hr", {}), provider.type === "email" && u("form", { action: provider.signinUrl, method: "POST", children: [u("input", { type: "hidden", name: "csrfToken", value: csrfToken }), u("label", { className: "section-header", htmlFor: `input-email-for-${provider.id}-provider`, children: "Email" }), u("input", { id: `input-email-for-${provider.id}-provider`, autoFocus: true, type: "email", name: "email", value: email, placeholder: "email@example.com", required: true }), u("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] }), provider.type === "credentials" && u("form", { action: provider.callbackUrl, method: "POST", children: [u("input", { type: "hidden", name: "csrfToken", value: csrfToken }), Object.keys(provider.credentials).map((credential) => {
      return u("div", { children: [u("label", { className: "section-header", htmlFor: `input-${credential}-for-${provider.id}-provider`, children: provider.credentials[credential].label ?? credential }), u("input", { name: credential, id: `input-${credential}-for-${provider.id}-provider`, type: provider.credentials[credential].type ?? "text", placeholder: provider.credentials[credential].placeholder ?? "", ...provider.credentials[credential] })] }, `input-group-${provider.id}`);
    }), u("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] }), provider.type === "webauthn" && u("form", { action: provider.callbackUrl, method: "POST", id: `${provider.id}-form`, children: [u("input", { type: "hidden", name: "csrfToken", value: csrfToken }), Object.keys(provider.formFields).map((field) => {
      return u("div", { children: [u("label", { className: "section-header", htmlFor: `input-${field}-for-${provider.id}-provider`, children: provider.formFields[field].label ?? field }), u("input", { name: field, "data-form-field": true, id: `input-${field}-for-${provider.id}-provider`, type: provider.formFields[field].type ?? "text", placeholder: provider.formFields[field].placeholder ?? "", ...provider.formFields[field] })] }, `input-group-${provider.id}`);
    }), u("button", { id: `submitButton-${provider.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] }), (provider.type === "email" || provider.type === "credentials" || provider.type === "webauthn") && i + 1 < providers.length && u("hr", {})] }, provider.id);
  })] }), conditionalUIProviderID && ConditionalUIScript(conditionalUIProviderID)] });
}
function SignoutPage(props) {
  const { url, csrfToken, theme } = props;
  return u("div", { className: "signout", children: [theme?.brandColor && u("style", { dangerouslySetInnerHTML: {
    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
  } }), theme?.buttonText && u("style", { dangerouslySetInnerHTML: {
    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
  } }), u("div", { className: "card", children: [theme?.logo && u("img", { src: theme.logo, alt: "Logo", className: "logo" }), u("h1", { children: "Signout" }), u("p", { children: "Are you sure you want to sign out?" }), u("form", { action: url?.toString(), method: "POST", children: [u("input", { type: "hidden", name: "csrfToken", value: csrfToken }), u("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] });
}
const css = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
  --provider-bg: #fff;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #fff
  );
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
  --provider-bg: #161b22;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #000
  );
}

.__next-auth-theme-dark img[src$="42-school.svg"],
  .__next-auth-theme-dark img[src$="apple.svg"],
  .__next-auth-theme-dark img[src$="boxyhq-saml.svg"],
  .__next-auth-theme-dark img[src$="eveonline.svg"],
  .__next-auth-theme-dark img[src$="github.svg"],
  .__next-auth-theme-dark img[src$="mailchimp.svg"],
  .__next-auth-theme-dark img[src$="medium.svg"],
  .__next-auth-theme-dark img[src$="okta.svg"],
  .__next-auth-theme-dark img[src$="patreon.svg"],
  .__next-auth-theme-dark img[src$="ping-id.svg"],
  .__next-auth-theme-dark img[src$="roblox.svg"],
  .__next-auth-theme-dark img[src$="threads.svg"],
  .__next-auth-theme-dark img[src$="wikimedia.svg"] {
    filter: invert(1);
  }

.__next-auth-theme-dark #submitButton {
    background-color: var(--provider-bg, var(--color-info));
  }

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
    --provider-bg: #161b22;
    --provider-bg-hover: color-mix(
      in srgb,
      var(--provider-brand-color) 30%,
      #000
    );
  }
    .__next-auth-theme-auto img[src$="42-school.svg"],
    .__next-auth-theme-auto img[src$="apple.svg"],
    .__next-auth-theme-auto img[src$="boxyhq-saml.svg"],
    .__next-auth-theme-auto img[src$="eveonline.svg"],
    .__next-auth-theme-auto img[src$="github.svg"],
    .__next-auth-theme-auto img[src$="mailchimp.svg"],
    .__next-auth-theme-auto img[src$="medium.svg"],
    .__next-auth-theme-auto img[src$="okta.svg"],
    .__next-auth-theme-auto img[src$="patreon.svg"],
    .__next-auth-theme-auto img[src$="ping-id.svg"],
    .__next-auth-theme-auto img[src$="roblox.svg"],
    .__next-auth-theme-auto img[src$="threads.svg"],
    .__next-auth-theme-auto img[src$="wikimedia.svg"] {
      filter: invert(1);
    }
    .__next-auth-theme-auto #submitButton {
      background-color: var(--provider-bg, var(--color-info));
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: var(--provider-bg);
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;
function VerifyRequestPage(props) {
  const { url, theme } = props;
  return u("div", { className: "verify-request", children: [theme.brandColor && u("style", { dangerouslySetInnerHTML: {
    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
  } }), u("div", { className: "card", children: [theme.logo && u("img", { src: theme.logo, alt: "Logo", className: "logo" }), u("h1", { children: "Check your email" }), u("p", { children: "A sign in link has been sent to your email address." }), u("p", { children: u("a", { className: "site", href: url.origin, children: url.host }) })] })] });
}
function send({ html, title, status, cookies, theme, headTags }) {
  return {
    cookies,
    status,
    headers: { "Content-Type": "text/html" },
    body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${css}</style><title>${title}</title>${headTags ?? ""}</head><body class="__next-auth-theme-${theme?.colorScheme ?? "auto"}"><div class="page">${D(html)}</div></body></html>`
  };
}
function renderPage(params) {
  const { url, theme, query, cookies, pages, providers } = params;
  return {
    csrf(skip, options, cookies2) {
      if (!skip) {
        return {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, no-cache, no-store",
            Expires: "0",
            Pragma: "no-cache"
          },
          body: { csrfToken: options.csrfToken },
          cookies: cookies2
        };
      }
      options.logger.warn("csrf-disabled");
      cookies2.push({
        name: options.cookies.csrfToken.name,
        value: "",
        options: { ...options.cookies.csrfToken.options, maxAge: 0 }
      });
      return { status: 404, cookies: cookies2 };
    },
    providers(providers2) {
      return {
        headers: { "Content-Type": "application/json" },
        body: providers2.reduce((acc, { id, name, type, signinUrl, callbackUrl }) => {
          acc[id] = { id, name, type, signinUrl, callbackUrl };
          return acc;
        }, {})
      };
    },
    signin(providerId, error) {
      if (providerId)
        throw new UnknownAction("Unsupported action");
      if (pages?.signIn) {
        let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: params.callbackUrl ?? "/" })}`;
        if (error)
          signinUrl = `${signinUrl}&${new URLSearchParams({ error })}`;
        return { redirect: signinUrl, cookies };
      }
      const webauthnProvider = providers?.find((p) => p.type === "webauthn" && p.enableConditionalUI && !!p.simpleWebAuthnBrowserVersion);
      let simpleWebAuthnBrowserScript = "";
      if (webauthnProvider) {
        const { simpleWebAuthnBrowserVersion } = webauthnProvider;
        simpleWebAuthnBrowserScript = `<script src="https://unpkg.com/@simplewebauthn/browser@${simpleWebAuthnBrowserVersion}/dist/bundle/index.umd.min.js" crossorigin="anonymous"><\/script>`;
      }
      return send({
        cookies,
        theme,
        html: SigninPage({
          csrfToken: params.csrfToken,
          // We only want to render providers
          providers: params.providers?.filter((provider) => (
            // Always render oauth and email type providers
            ["email", "oauth", "oidc"].includes(provider.type) || // Only render credentials type provider if credentials are defined
            provider.type === "credentials" && provider.credentials || // Only render webauthn type provider if formFields are defined
            provider.type === "webauthn" && provider.formFields || // Don't render other provider types
            false
          )),
          callbackUrl: params.callbackUrl,
          theme: params.theme,
          error,
          ...query
        }),
        title: "Sign In",
        headTags: simpleWebAuthnBrowserScript
      });
    },
    signout() {
      if (pages?.signOut)
        return { redirect: pages.signOut, cookies };
      return send({
        cookies,
        theme,
        html: SignoutPage({ csrfToken: params.csrfToken, url, theme }),
        title: "Sign Out"
      });
    },
    verifyRequest(props) {
      if (pages?.verifyRequest)
        return {
          redirect: `${pages.verifyRequest}${url?.search ?? ""}`,
          cookies
        };
      return send({
        cookies,
        theme,
        html: VerifyRequestPage({ url, theme, ...props }),
        title: "Verify Request"
      });
    },
    error(error) {
      if (pages?.error) {
        return {
          redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
          cookies
        };
      }
      return send({
        cookies,
        theme,
        // @ts-expect-error fix error type
        ...ErrorPage({ url, theme, error }),
        title: "Error"
      });
    }
  };
}
function fromDate(time, date = Date.now()) {
  return new Date(date + time * 1e3);
}
async function handleLoginOrRegister(sessionToken, _profile, _account, options) {
  if (!_account?.providerAccountId || !_account.type)
    throw new Error("Missing or invalid provider account");
  if (!["email", "oauth", "oidc", "webauthn"].includes(_account.type))
    throw new Error("Provider not supported");
  const { adapter, jwt, events, session: { strategy: sessionStrategy, generateSessionToken } } = options;
  if (!adapter) {
    return { user: _profile, account: _account };
  }
  const profile = _profile;
  let account = _account;
  const { createUser, updateUser, getUser, getUserByAccount, getUserByEmail, linkAccount, createSession, getSessionAndUser, deleteSession } = adapter;
  let session2 = null;
  let user = null;
  let isNewUser = false;
  const useJwtSession = sessionStrategy === "jwt";
  if (sessionToken) {
    if (useJwtSession) {
      try {
        const salt = options.cookies.sessionToken.name;
        session2 = await jwt.decode({ ...jwt, token: sessionToken, salt });
        if (session2 && "sub" in session2 && session2.sub) {
          user = await getUser(session2.sub);
        }
      } catch {
      }
    } else {
      const userAndSession = await getSessionAndUser(sessionToken);
      if (userAndSession) {
        session2 = userAndSession.session;
        user = userAndSession.user;
      }
    }
  }
  if (account.type === "email") {
    const userByEmail = await getUserByEmail(profile.email);
    if (userByEmail) {
      if (user?.id !== userByEmail.id && !useJwtSession && sessionToken) {
        await deleteSession(sessionToken);
      }
      user = await updateUser({
        id: userByEmail.id,
        emailVerified: /* @__PURE__ */ new Date()
      });
      await events.updateUser?.({ user });
    } else {
      user = await createUser({ ...profile, emailVerified: /* @__PURE__ */ new Date() });
      await events.createUser?.({ user });
      isNewUser = true;
    }
    session2 = useJwtSession ? {} : await createSession({
      sessionToken: generateSessionToken(),
      userId: user.id,
      expires: fromDate(options.session.maxAge)
    });
    return { session: session2, user, isNewUser };
  } else if (account.type === "webauthn") {
    const userByAccount2 = await getUserByAccount({
      providerAccountId: account.providerAccountId,
      provider: account.provider
    });
    if (userByAccount2) {
      if (user) {
        if (userByAccount2.id === user.id) {
          const currentAccount2 = { ...account, userId: user.id };
          return { session: session2, user, isNewUser, account: currentAccount2 };
        }
        throw new AccountNotLinked("The account is already associated with another user", { provider: account.provider });
      }
      session2 = useJwtSession ? {} : await createSession({
        sessionToken: generateSessionToken(),
        userId: userByAccount2.id,
        expires: fromDate(options.session.maxAge)
      });
      const currentAccount = {
        ...account,
        userId: userByAccount2.id
      };
      return {
        session: session2,
        user: userByAccount2,
        isNewUser,
        account: currentAccount
      };
    } else {
      if (user) {
        await linkAccount({ ...account, userId: user.id });
        await events.linkAccount?.({ user, account, profile });
        const currentAccount2 = { ...account, userId: user.id };
        return { session: session2, user, isNewUser, account: currentAccount2 };
      }
      const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
      if (userByEmail) {
        throw new AccountNotLinked("Another account already exists with the same e-mail address", { provider: account.provider });
      } else {
        user = await createUser({ ...profile });
      }
      await events.createUser?.({ user });
      await linkAccount({ ...account, userId: user.id });
      await events.linkAccount?.({ user, account, profile });
      session2 = useJwtSession ? {} : await createSession({
        sessionToken: generateSessionToken(),
        userId: user.id,
        expires: fromDate(options.session.maxAge)
      });
      const currentAccount = { ...account, userId: user.id };
      return { session: session2, user, isNewUser: true, account: currentAccount };
    }
  }
  const userByAccount = await getUserByAccount({
    providerAccountId: account.providerAccountId,
    provider: account.provider
  });
  if (userByAccount) {
    if (user) {
      if (userByAccount.id === user.id) {
        return { session: session2, user, isNewUser };
      }
      throw new OAuthAccountNotLinked("The account is already associated with another user", { provider: account.provider });
    }
    session2 = useJwtSession ? {} : await createSession({
      sessionToken: generateSessionToken(),
      userId: userByAccount.id,
      expires: fromDate(options.session.maxAge)
    });
    return { session: session2, user: userByAccount, isNewUser };
  } else {
    const { provider: p } = options;
    const { type, provider, providerAccountId, userId, ...tokenSet } = account;
    const defaults = { providerAccountId, provider, type, userId };
    account = Object.assign(p.account(tokenSet) ?? {}, defaults);
    if (user) {
      await linkAccount({ ...account, userId: user.id });
      await events.linkAccount?.({ user, account, profile });
      return { session: session2, user, isNewUser };
    }
    const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
    if (userByEmail) {
      const provider2 = options.provider;
      if (provider2?.allowDangerousEmailAccountLinking) {
        user = userByEmail;
        isNewUser = false;
      } else {
        throw new OAuthAccountNotLinked("Another account already exists with the same e-mail address", { provider: account.provider });
      }
    } else {
      user = await createUser({ ...profile, emailVerified: null });
      isNewUser = true;
    }
    await events.createUser?.({ user });
    await linkAccount({ ...account, userId: user.id });
    await events.linkAccount?.({ user, account, profile });
    session2 = useJwtSession ? {} : await createSession({
      sessionToken: generateSessionToken(),
      userId: user.id,
      expires: fromDate(options.session.maxAge)
    });
    return { session: session2, user, isNewUser };
  }
}
const COOKIE_TTL = 60 * 15;
async function sealCookie(name, payload, options) {
  const { cookies, logger } = options;
  const cookie2 = cookies[name];
  const expires = /* @__PURE__ */ new Date();
  expires.setTime(expires.getTime() + COOKIE_TTL * 1e3);
  logger.debug(`CREATE_${name.toUpperCase()}`, {
    name: cookie2.name,
    payload,
    COOKIE_TTL,
    expires
  });
  const encoded = await encode({
    ...options.jwt,
    maxAge: COOKIE_TTL,
    token: { value: payload },
    salt: cookie2.name
  });
  const cookieOptions = { ...cookie2.options, expires };
  return { name: cookie2.name, value: encoded, options: cookieOptions };
}
async function parseCookie(name, value, options) {
  try {
    const { logger, cookies, jwt } = options;
    logger.debug(`PARSE_${name.toUpperCase()}`, { cookie: value });
    if (!value)
      throw new InvalidCheck(`${name} cookie was missing`);
    const parsed = await decode({
      ...jwt,
      token: value,
      salt: cookies[name].name
    });
    if (parsed?.value)
      return parsed.value;
    throw new Error("Invalid cookie");
  } catch (error) {
    throw new InvalidCheck(`${name} value could not be parsed`, {
      cause: error
    });
  }
}
function clearCookie(name, options, resCookies) {
  const { logger, cookies } = options;
  const cookie2 = cookies[name];
  logger.debug(`CLEAR_${name.toUpperCase()}`, { cookie: cookie2 });
  resCookies.push({
    name: cookie2.name,
    value: "",
    options: { ...cookies[name].options, maxAge: 0 }
  });
}
function useCookie(check, name) {
  return async function(cookies, resCookies, options) {
    const { provider, logger } = options;
    if (!provider?.checks?.includes(check))
      return;
    const cookieValue = cookies?.[options.cookies[name].name];
    logger.debug(`USE_${name.toUpperCase()}`, { value: cookieValue });
    const parsed = await parseCookie(name, cookieValue, options);
    clearCookie(name, options, resCookies);
    return parsed;
  };
}
const pkce = {
  /** Creates a PKCE code challenge and verifier pair. The verifier in stored in the cookie. */
  async create(options) {
    const code_verifier = generateRandomCodeVerifier();
    const value = await calculatePKCECodeChallenge(code_verifier);
    const cookie2 = await sealCookie("pkceCodeVerifier", code_verifier, options);
    return { cookie: cookie2, value };
  },
  /**
   * Returns code_verifier if the provider is configured to use PKCE,
   * and clears the container cookie afterwards.
   * An error is thrown if the code_verifier is missing or invalid.
   */
  use: useCookie("pkce", "pkceCodeVerifier")
};
const STATE_MAX_AGE = 60 * 15;
const encodedStateSalt = "encodedState";
const state = {
  /** Creates a state cookie with an optionally encoded body. */
  async create(options, origin) {
    const { provider } = options;
    if (!provider.checks.includes("state")) {
      if (origin) {
        throw new InvalidCheck("State data was provided but the provider is not configured to use state");
      }
      return;
    }
    const payload = {
      origin,
      random: generateRandomState()
    };
    const value = await encode({
      secret: options.jwt.secret,
      token: payload,
      salt: encodedStateSalt,
      maxAge: STATE_MAX_AGE
    });
    const cookie2 = await sealCookie("state", value, options);
    return { cookie: cookie2, value };
  },
  /**
   * Returns state if the provider is configured to use state,
   * and clears the container cookie afterwards.
   * An error is thrown if the state is missing or invalid.
   */
  use: useCookie("state", "state"),
  /** Decodes the state. If it could not be decoded, it throws an error. */
  async decode(state2, options) {
    try {
      options.logger.debug("DECODE_STATE", { state: state2 });
      const payload = await decode({
        secret: options.jwt.secret,
        token: state2,
        salt: encodedStateSalt
      });
      if (payload)
        return payload;
      throw new Error("Invalid state");
    } catch (error) {
      throw new InvalidCheck("State could not be decoded", { cause: error });
    }
  }
};
const nonce = {
  async create(options) {
    if (!options.provider.checks.includes("nonce"))
      return;
    const value = generateRandomNonce();
    const cookie2 = await sealCookie("nonce", value, options);
    return { cookie: cookie2, value };
  },
  /**
   * Returns nonce if the provider is configured to use nonce,
   * and clears the container cookie afterwards.
   * An error is thrown if the nonce is missing or invalid.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
   * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
   */
  use: useCookie("nonce", "nonce")
};
const WEBAUTHN_CHALLENGE_MAX_AGE = 60 * 15;
const webauthnChallengeSalt = "encodedWebauthnChallenge";
const webauthnChallenge = {
  async create(options, challenge, registerData) {
    return {
      cookie: await sealCookie("webauthnChallenge", await encode({
        secret: options.jwt.secret,
        token: { challenge, registerData },
        salt: webauthnChallengeSalt,
        maxAge: WEBAUTHN_CHALLENGE_MAX_AGE
      }), options)
    };
  },
  /** Returns WebAuthn challenge if present. */
  async use(options, cookies, resCookies) {
    const cookieValue = cookies?.[options.cookies.webauthnChallenge.name];
    const parsed = await parseCookie("webauthnChallenge", cookieValue, options);
    const payload = await decode({
      secret: options.jwt.secret,
      token: parsed,
      salt: webauthnChallengeSalt
    });
    clearCookie("webauthnChallenge", options, resCookies);
    if (!payload)
      throw new InvalidCheck("WebAuthn challenge was missing");
    return payload;
  }
};
function formUrlEncode(token) {
  return encodeURIComponent(token).replace(/%20/g, "+");
}
function clientSecretBasic(clientId, clientSecret) {
  const username = formUrlEncode(clientId);
  const password = formUrlEncode(clientSecret);
  const credentials = btoa(`${username}:${password}`);
  return `Basic ${credentials}`;
}
async function handleOAuth(params, cookies, options) {
  const { logger, provider } = options;
  let as;
  const { token, userinfo } = provider;
  if ((!token?.url || token.url.host === "authjs.dev") && (!userinfo?.url || userinfo.url.host === "authjs.dev")) {
    const issuer = new URL(provider.issuer);
    const discoveryResponse = await discoveryRequest(issuer, {
      [allowInsecureRequests]: true,
      [customFetch$1]: provider[customFetch]
    });
    as = await processDiscoveryResponse(issuer, discoveryResponse);
    if (!as.token_endpoint)
      throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
    if (!as.userinfo_endpoint)
      throw new TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
  } else {
    as = {
      issuer: provider.issuer ?? "https://authjs.dev",
      // TODO: review fallback issuer
      token_endpoint: token?.url.toString(),
      userinfo_endpoint: userinfo?.url.toString()
    };
  }
  const client = {
    client_id: provider.clientId,
    ...provider.client
  };
  let clientAuth;
  switch (client.token_endpoint_auth_method) {
    // TODO: in the next breaking major version have undefined be `client_secret_post`
    case void 0:
    case "client_secret_basic":
      clientAuth = (_as, _client, _body, headers) => {
        headers.set("authorization", clientSecretBasic(provider.clientId, provider.clientSecret));
      };
      break;
    case "client_secret_post":
      clientAuth = ClientSecretPost(provider.clientSecret);
      break;
    case "client_secret_jwt":
      clientAuth = ClientSecretJwt(provider.clientSecret);
      break;
    case "private_key_jwt":
      clientAuth = PrivateKeyJwt(provider.token.clientPrivateKey, {
        // TODO: review in the next breaking change
        [modifyAssertion](_header, payload) {
          payload.aud = [as.issuer, as.token_endpoint];
        }
      });
      break;
    case "none":
      clientAuth = None();
      break;
    default:
      throw new Error("unsupported client authentication method");
  }
  const resCookies = [];
  const state$1 = await state.use(cookies, resCookies, options);
  let codeGrantParams;
  try {
    codeGrantParams = validateAuthResponse(as, client, new URLSearchParams(params), provider.checks.includes("state") ? state$1 : skipStateCheck);
  } catch (err) {
    if (err instanceof AuthorizationResponseError) {
      const cause = {
        providerId: provider.id,
        ...Object.fromEntries(err.cause.entries())
      };
      logger.debug("OAuthCallbackError", cause);
      throw new OAuthCallbackError("OAuth Provider returned an error", cause);
    }
    throw err;
  }
  const codeVerifier = await pkce.use(cookies, resCookies, options);
  let redirect_uri = provider.callbackUrl;
  if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
    redirect_uri = provider.redirectProxyUrl;
  }
  let codeGrantResponse = await authorizationCodeGrantRequest(as, client, clientAuth, codeGrantParams, redirect_uri, codeVerifier ?? "decoy", {
    // TODO: move away from allowing insecure HTTP requests
    [allowInsecureRequests]: true,
    [customFetch$1]: (...args) => {
      if (!provider.checks.includes("pkce")) {
        args[1].body.delete("code_verifier");
      }
      return (provider[customFetch] ?? fetch)(...args);
    }
  });
  if (provider.token?.conform) {
    codeGrantResponse = await provider.token.conform(codeGrantResponse.clone()) ?? codeGrantResponse;
  }
  let profile = {};
  const requireIdToken = isOIDCProvider(provider);
  if (provider[conformInternal]) {
    switch (provider.id) {
      case "microsoft-entra-id":
      case "azure-ad": {
        const responseJson = await codeGrantResponse.clone().json();
        if (responseJson.error) {
          const cause = {
            providerId: provider.id,
            ...responseJson
          };
          throw new OAuthCallbackError(`OAuth Provider returned an error: ${responseJson.error}`, cause);
        }
        const { tid } = decodeJwt(responseJson.id_token);
        if (typeof tid === "string") {
          const tenantRe = /microsoftonline\.com\/(\w+)\/v2\.0/;
          const tenantId = as.issuer?.match(tenantRe)?.[1] ?? "common";
          const issuer = new URL(as.issuer.replace(tenantId, tid));
          const discoveryResponse = await discoveryRequest(issuer, {
            [customFetch$1]: provider[customFetch]
          });
          as = await processDiscoveryResponse(issuer, discoveryResponse);
        }
        break;
      }
    }
  }
  const processedCodeResponse = await processAuthorizationCodeResponse(as, client, codeGrantResponse, {
    expectedNonce: await nonce.use(cookies, resCookies, options),
    requireIdToken
  });
  const tokens = processedCodeResponse;
  if (requireIdToken) {
    const idTokenClaims = getValidatedIdTokenClaims(processedCodeResponse);
    profile = idTokenClaims;
    if (provider[conformInternal] && provider.id === "apple") {
      try {
        profile.user = JSON.parse(params?.user);
      } catch {
      }
    }
    if (provider.idToken === false) {
      const userinfoResponse = await userInfoRequest(as, client, processedCodeResponse.access_token, {
        [customFetch$1]: provider[customFetch],
        // TODO: move away from allowing insecure HTTP requests
        [allowInsecureRequests]: true
      });
      profile = await processUserInfoResponse(as, client, idTokenClaims.sub, userinfoResponse);
    }
  } else {
    if (userinfo?.request) {
      const _profile = await userinfo.request({ tokens, provider });
      if (_profile instanceof Object)
        profile = _profile;
    } else if (userinfo?.url) {
      const userinfoResponse = await userInfoRequest(as, client, processedCodeResponse.access_token, {
        [customFetch$1]: provider[customFetch],
        // TODO: move away from allowing insecure HTTP requests
        [allowInsecureRequests]: true
      });
      profile = await userinfoResponse.json();
    } else {
      throw new TypeError("No userinfo endpoint configured");
    }
  }
  if (tokens.expires_in) {
    tokens.expires_at = Math.floor(Date.now() / 1e3) + Number(tokens.expires_in);
  }
  const profileResult = await getUserAndAccount(profile, provider, tokens, logger);
  return { ...profileResult, profile, cookies: resCookies };
}
async function getUserAndAccount(OAuthProfile, provider, tokens, logger) {
  try {
    const userFromProfile = await provider.profile(OAuthProfile, tokens);
    const user = {
      ...userFromProfile,
      // The user's id is intentionally not set based on the profile id, as
      // the user should remain independent of the provider and the profile id
      // is saved on the Account already, as `providerAccountId`.
      id: crypto.randomUUID(),
      email: userFromProfile.email?.toLowerCase()
    };
    return {
      user,
      account: {
        ...tokens,
        provider: provider.id,
        type: provider.type,
        providerAccountId: userFromProfile.id ?? crypto.randomUUID()
      }
    };
  } catch (e) {
    logger.debug("getProfile error details", OAuthProfile);
    logger.error(new OAuthProfileParseError(e, { provider: provider.id }));
  }
}
function inferWebAuthnOptions(action, loggedIn, userInfoResponse) {
  const { user, exists = false } = userInfoResponse ?? {};
  switch (action) {
    case "authenticate": {
      return "authenticate";
    }
    case "register": {
      if (user && loggedIn === exists)
        return "register";
      break;
    }
    case void 0: {
      if (!loggedIn) {
        if (user) {
          if (exists) {
            return "authenticate";
          } else {
            return "register";
          }
        } else {
          return "authenticate";
        }
      }
      break;
    }
  }
  return null;
}
async function getRegistrationResponse(options, request, user, resCookies) {
  const regOptions = await getRegistrationOptions(options, request, user);
  const { cookie: cookie2 } = await webauthnChallenge.create(options, regOptions.challenge, user);
  return {
    status: 200,
    cookies: [...resCookies ?? [], cookie2],
    body: {
      action: "register",
      options: regOptions
    },
    headers: {
      "Content-Type": "application/json"
    }
  };
}
async function getAuthenticationResponse(options, request, user, resCookies) {
  const authOptions = await getAuthenticationOptions(options, request, user);
  const { cookie: cookie2 } = await webauthnChallenge.create(options, authOptions.challenge);
  return {
    status: 200,
    cookies: [...resCookies ?? [], cookie2],
    body: {
      action: "authenticate",
      options: authOptions
    },
    headers: {
      "Content-Type": "application/json"
    }
  };
}
async function verifyAuthenticate(options, request, resCookies) {
  const { adapter, provider } = options;
  const data = request.body && typeof request.body.data === "string" ? JSON.parse(request.body.data) : void 0;
  if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string") {
    throw new AuthError("Invalid WebAuthn Authentication response");
  }
  const credentialID = toBase64(fromBase64(data.id));
  const authenticator = await adapter.getAuthenticator(credentialID);
  if (!authenticator) {
    throw new AuthError(`WebAuthn authenticator not found in database: ${JSON.stringify({
      credentialID
    })}`);
  }
  const { challenge: expectedChallenge } = await webauthnChallenge.use(options, request.cookies, resCookies);
  let verification;
  try {
    const relayingParty = provider.getRelayingParty(options, request);
    verification = await provider.simpleWebAuthn.verifyAuthenticationResponse({
      ...provider.verifyAuthenticationOptions,
      expectedChallenge,
      response: data,
      authenticator: fromAdapterAuthenticator(authenticator),
      expectedOrigin: relayingParty.origin,
      expectedRPID: relayingParty.id
    });
  } catch (e) {
    throw new WebAuthnVerificationError(e);
  }
  const { verified, authenticationInfo } = verification;
  if (!verified) {
    throw new WebAuthnVerificationError("WebAuthn authentication response could not be verified");
  }
  try {
    const { newCounter } = authenticationInfo;
    await adapter.updateAuthenticatorCounter(authenticator.credentialID, newCounter);
  } catch (e) {
    throw new AdapterError(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({
      credentialID,
      oldCounter: authenticator.counter,
      newCounter: authenticationInfo.newCounter
    })}`, e);
  }
  const account = await adapter.getAccount(authenticator.providerAccountId, provider.id);
  if (!account) {
    throw new AuthError(`WebAuthn account not found in database: ${JSON.stringify({
      credentialID,
      providerAccountId: authenticator.providerAccountId
    })}`);
  }
  const user = await adapter.getUser(account.userId);
  if (!user) {
    throw new AuthError(`WebAuthn user not found in database: ${JSON.stringify({
      credentialID,
      providerAccountId: authenticator.providerAccountId,
      userID: account.userId
    })}`);
  }
  return {
    account,
    user
  };
}
async function verifyRegister(options, request, resCookies) {
  const { provider } = options;
  const data = request.body && typeof request.body.data === "string" ? JSON.parse(request.body.data) : void 0;
  if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string") {
    throw new AuthError("Invalid WebAuthn Registration response");
  }
  const { challenge: expectedChallenge, registerData: user } = await webauthnChallenge.use(options, request.cookies, resCookies);
  if (!user) {
    throw new AuthError("Missing user registration data in WebAuthn challenge cookie");
  }
  let verification;
  try {
    const relayingParty = provider.getRelayingParty(options, request);
    verification = await provider.simpleWebAuthn.verifyRegistrationResponse({
      ...provider.verifyRegistrationOptions,
      expectedChallenge,
      response: data,
      expectedOrigin: relayingParty.origin,
      expectedRPID: relayingParty.id
    });
  } catch (e) {
    throw new WebAuthnVerificationError(e);
  }
  if (!verification.verified || !verification.registrationInfo) {
    throw new WebAuthnVerificationError("WebAuthn registration response could not be verified");
  }
  const account = {
    providerAccountId: toBase64(verification.registrationInfo.credentialID),
    provider: options.provider.id,
    type: provider.type
  };
  const authenticator = {
    providerAccountId: account.providerAccountId,
    counter: verification.registrationInfo.counter,
    credentialID: toBase64(verification.registrationInfo.credentialID),
    credentialPublicKey: toBase64(verification.registrationInfo.credentialPublicKey),
    credentialBackedUp: verification.registrationInfo.credentialBackedUp,
    credentialDeviceType: verification.registrationInfo.credentialDeviceType,
    transports: transportsToString(data.response.transports)
  };
  return {
    user,
    account,
    authenticator
  };
}
async function getAuthenticationOptions(options, request, user) {
  const { provider, adapter } = options;
  const authenticators = user && user["id"] ? await adapter.listAuthenticatorsByUserId(user.id) : null;
  const relayingParty = provider.getRelayingParty(options, request);
  return await provider.simpleWebAuthn.generateAuthenticationOptions({
    ...provider.authenticationOptions,
    rpID: relayingParty.id,
    allowCredentials: authenticators?.map((a) => ({
      id: fromBase64(a.credentialID),
      type: "public-key",
      transports: stringToTransports(a.transports)
    }))
  });
}
async function getRegistrationOptions(options, request, user) {
  const { provider, adapter } = options;
  const authenticators = user["id"] ? await adapter.listAuthenticatorsByUserId(user.id) : null;
  const userID = randomString(32);
  const relayingParty = provider.getRelayingParty(options, request);
  return await provider.simpleWebAuthn.generateRegistrationOptions({
    ...provider.registrationOptions,
    userID,
    userName: user.email,
    userDisplayName: user.name ?? void 0,
    rpID: relayingParty.id,
    rpName: relayingParty.name,
    excludeCredentials: authenticators?.map((a) => ({
      id: fromBase64(a.credentialID),
      type: "public-key",
      transports: stringToTransports(a.transports)
    }))
  });
}
function assertInternalOptionsWebAuthn(options) {
  const { provider, adapter } = options;
  if (!adapter)
    throw new MissingAdapter("An adapter is required for the WebAuthn provider");
  if (!provider || provider.type !== "webauthn") {
    throw new InvalidProvider("Provider must be WebAuthn");
  }
  return { ...options, provider, adapter };
}
function fromAdapterAuthenticator(authenticator) {
  return {
    ...authenticator,
    credentialDeviceType: authenticator.credentialDeviceType,
    transports: stringToTransports(authenticator.transports),
    credentialID: fromBase64(authenticator.credentialID),
    credentialPublicKey: fromBase64(authenticator.credentialPublicKey)
  };
}
function fromBase64(base64) {
  return new Uint8Array(Buffer.from(base64, "base64"));
}
function toBase64(bytes) {
  return Buffer.from(bytes).toString("base64");
}
function transportsToString(transports) {
  return transports?.join(",");
}
function stringToTransports(tstring) {
  return tstring ? tstring.split(",") : void 0;
}
async function callback(request, options, sessionStore, cookies) {
  if (!options.provider)
    throw new InvalidProvider("Callback route called without provider");
  const { query, body, method, headers } = request;
  const { provider, adapter, url, callbackUrl, pages, jwt, events, callbacks, session: { strategy: sessionStrategy, maxAge: sessionMaxAge }, logger } = options;
  const useJwtSession = sessionStrategy === "jwt";
  try {
    if (provider.type === "oauth" || provider.type === "oidc") {
      const params = provider.authorization?.url.searchParams.get("response_mode") === "form_post" ? body : query;
      if (options.isOnRedirectProxy && params?.state) {
        const parsedState = await state.decode(params.state, options);
        const shouldRedirect = parsedState?.origin && new URL(parsedState.origin).origin !== options.url.origin;
        if (shouldRedirect) {
          const proxyRedirect = `${parsedState.origin}?${new URLSearchParams(params)}`;
          logger.debug("Proxy redirecting to", proxyRedirect);
          return { redirect: proxyRedirect, cookies };
        }
      }
      const authorizationResult = await handleOAuth(params, request.cookies, options);
      if (authorizationResult.cookies.length) {
        cookies.push(...authorizationResult.cookies);
      }
      logger.debug("authorization result", authorizationResult);
      const { user: userFromProvider, account, profile: OAuthProfile } = authorizationResult;
      if (!userFromProvider || !account || !OAuthProfile) {
        return { redirect: `${url}/signin`, cookies };
      }
      let userByAccount;
      if (adapter) {
        const { getUserByAccount } = adapter;
        userByAccount = await getUserByAccount({
          providerAccountId: account.providerAccountId,
          provider: provider.id
        });
      }
      const redirect = await handleAuthorized({
        user: userByAccount ?? userFromProvider,
        account,
        profile: OAuthProfile
      }, options);
      if (redirect)
        return { redirect, cookies };
      const { user, session: session2, isNewUser } = await handleLoginOrRegister(sessionStore.value, userFromProvider, account, options);
      if (useJwtSession) {
        const defaultToken = {
          name: user.name,
          email: user.email,
          picture: user.image,
          sub: user.id?.toString()
        };
        const token = await callbacks.jwt({
          token: defaultToken,
          user,
          account,
          profile: OAuthProfile,
          isNewUser,
          trigger: isNewUser ? "signUp" : "signIn"
        });
        if (token === null) {
          cookies.push(...sessionStore.clean());
        } else {
          const salt = options.cookies.sessionToken.name;
          const newToken = await jwt.encode({ ...jwt, token, salt });
          const cookieExpires = /* @__PURE__ */ new Date();
          cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1e3);
          const sessionCookies = sessionStore.chunk(newToken, {
            expires: cookieExpires
          });
          cookies.push(...sessionCookies);
        }
      } else {
        cookies.push({
          name: options.cookies.sessionToken.name,
          value: session2.sessionToken,
          options: {
            ...options.cookies.sessionToken.options,
            expires: session2.expires
          }
        });
      }
      await events.signIn?.({
        user,
        account,
        profile: OAuthProfile,
        isNewUser
      });
      if (isNewUser && pages.newUser) {
        return {
          redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
          cookies
        };
      }
      return { redirect: callbackUrl, cookies };
    } else if (provider.type === "email") {
      const paramToken = query?.token;
      const paramIdentifier = query?.email;
      if (!paramToken) {
        const e = new TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", { cause: { hasToken: !!paramToken } });
        e.name = "Configuration";
        throw e;
      }
      const secret = provider.secret ?? options.secret;
      const invite = await adapter.useVerificationToken({
        // @ts-expect-error User-land adapters might decide to omit the identifier during lookup
        identifier: paramIdentifier,
        // TODO: Drop this requirement for lookup in official adapters too
        token: await createHash(`${paramToken}${secret}`)
      });
      const hasInvite = !!invite;
      const expired = hasInvite && invite.expires.valueOf() < Date.now();
      const invalidInvite = !hasInvite || expired || // The user might have configured the link to not contain the identifier
      // so we only compare if it exists
      paramIdentifier && invite.identifier !== paramIdentifier;
      if (invalidInvite)
        throw new Verification({ hasInvite, expired });
      const { identifier } = invite;
      const user = await adapter.getUserByEmail(identifier) ?? {
        id: crypto.randomUUID(),
        email: identifier,
        emailVerified: null
      };
      const account = {
        providerAccountId: user.email,
        userId: user.id,
        type: "email",
        provider: provider.id
      };
      const redirect = await handleAuthorized({ user, account }, options);
      if (redirect)
        return { redirect, cookies };
      const { user: loggedInUser, session: session2, isNewUser } = await handleLoginOrRegister(sessionStore.value, user, account, options);
      if (useJwtSession) {
        const defaultToken = {
          name: loggedInUser.name,
          email: loggedInUser.email,
          picture: loggedInUser.image,
          sub: loggedInUser.id?.toString()
        };
        const token = await callbacks.jwt({
          token: defaultToken,
          user: loggedInUser,
          account,
          isNewUser,
          trigger: isNewUser ? "signUp" : "signIn"
        });
        if (token === null) {
          cookies.push(...sessionStore.clean());
        } else {
          const salt = options.cookies.sessionToken.name;
          const newToken = await jwt.encode({ ...jwt, token, salt });
          const cookieExpires = /* @__PURE__ */ new Date();
          cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1e3);
          const sessionCookies = sessionStore.chunk(newToken, {
            expires: cookieExpires
          });
          cookies.push(...sessionCookies);
        }
      } else {
        cookies.push({
          name: options.cookies.sessionToken.name,
          value: session2.sessionToken,
          options: {
            ...options.cookies.sessionToken.options,
            expires: session2.expires
          }
        });
      }
      await events.signIn?.({ user: loggedInUser, account, isNewUser });
      if (isNewUser && pages.newUser) {
        return {
          redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
          cookies
        };
      }
      return { redirect: callbackUrl, cookies };
    } else if (provider.type === "credentials" && method === "POST") {
      const credentials = body ?? {};
      Object.entries(query ?? {}).forEach(([k, v]) => url.searchParams.set(k, v));
      const userFromAuthorize = await provider.authorize(
        credentials,
        // prettier-ignore
        new Request(url, { headers, method, body: JSON.stringify(body) })
      );
      const user = userFromAuthorize;
      if (!user)
        throw new CredentialsSignin();
      else
        user.id = user.id?.toString() ?? crypto.randomUUID();
      const account = {
        providerAccountId: user.id,
        type: "credentials",
        provider: provider.id
      };
      const redirect = await handleAuthorized({ user, account, credentials }, options);
      if (redirect)
        return { redirect, cookies };
      const defaultToken = {
        name: user.name,
        email: user.email,
        picture: user.image,
        sub: user.id
      };
      const token = await callbacks.jwt({
        token: defaultToken,
        user,
        account,
        isNewUser: false,
        trigger: "signIn"
      });
      if (token === null) {
        cookies.push(...sessionStore.clean());
      } else {
        const salt = options.cookies.sessionToken.name;
        const newToken = await jwt.encode({ ...jwt, token, salt });
        const cookieExpires = /* @__PURE__ */ new Date();
        cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1e3);
        const sessionCookies = sessionStore.chunk(newToken, {
          expires: cookieExpires
        });
        cookies.push(...sessionCookies);
      }
      await events.signIn?.({ user, account });
      return { redirect: callbackUrl, cookies };
    } else if (provider.type === "webauthn" && method === "POST") {
      const action = request.body?.action;
      if (typeof action !== "string" || action !== "authenticate" && action !== "register") {
        throw new AuthError("Invalid action parameter");
      }
      const localOptions = assertInternalOptionsWebAuthn(options);
      let user;
      let account;
      let authenticator;
      switch (action) {
        case "authenticate": {
          const verified = await verifyAuthenticate(localOptions, request, cookies);
          user = verified.user;
          account = verified.account;
          break;
        }
        case "register": {
          const verified = await verifyRegister(options, request, cookies);
          user = verified.user;
          account = verified.account;
          authenticator = verified.authenticator;
          break;
        }
      }
      await handleAuthorized({ user, account }, options);
      const { user: loggedInUser, isNewUser, session: session2, account: currentAccount } = await handleLoginOrRegister(sessionStore.value, user, account, options);
      if (!currentAccount) {
        throw new AuthError("Error creating or finding account");
      }
      if (authenticator && loggedInUser.id) {
        await localOptions.adapter.createAuthenticator({
          ...authenticator,
          userId: loggedInUser.id
        });
      }
      if (useJwtSession) {
        const defaultToken = {
          name: loggedInUser.name,
          email: loggedInUser.email,
          picture: loggedInUser.image,
          sub: loggedInUser.id?.toString()
        };
        const token = await callbacks.jwt({
          token: defaultToken,
          user: loggedInUser,
          account: currentAccount,
          isNewUser,
          trigger: isNewUser ? "signUp" : "signIn"
        });
        if (token === null) {
          cookies.push(...sessionStore.clean());
        } else {
          const salt = options.cookies.sessionToken.name;
          const newToken = await jwt.encode({ ...jwt, token, salt });
          const cookieExpires = /* @__PURE__ */ new Date();
          cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1e3);
          const sessionCookies = sessionStore.chunk(newToken, {
            expires: cookieExpires
          });
          cookies.push(...sessionCookies);
        }
      } else {
        cookies.push({
          name: options.cookies.sessionToken.name,
          value: session2.sessionToken,
          options: {
            ...options.cookies.sessionToken.options,
            expires: session2.expires
          }
        });
      }
      await events.signIn?.({
        user: loggedInUser,
        account: currentAccount,
        isNewUser
      });
      if (isNewUser && pages.newUser) {
        return {
          redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
          cookies
        };
      }
      return { redirect: callbackUrl, cookies };
    }
    throw new InvalidProvider(`Callback for provider type (${provider.type}) is not supported`);
  } catch (e) {
    if (e instanceof AuthError)
      throw e;
    const error = new CallbackRouteError(e, { provider: provider.id });
    logger.debug("callback route error details", { method, query, body });
    throw error;
  }
}
async function handleAuthorized(params, config) {
  let authorized;
  const { signIn: signIn2, redirect } = config.callbacks;
  try {
    authorized = await signIn2(params);
  } catch (e) {
    if (e instanceof AuthError)
      throw e;
    throw new AccessDenied(e);
  }
  if (!authorized)
    throw new AccessDenied("AccessDenied");
  if (typeof authorized !== "string")
    return;
  return await redirect({ url: authorized, baseUrl: config.url.origin });
}
async function session(options, sessionStore, cookies, isUpdate, newSession) {
  const { adapter, jwt, events, callbacks, logger, session: { strategy: sessionStrategy, maxAge: sessionMaxAge } } = options;
  const response = {
    body: null,
    headers: {
      "Content-Type": "application/json",
      ...!isUpdate && {
        "Cache-Control": "private, no-cache, no-store",
        Expires: "0",
        Pragma: "no-cache"
      }
    },
    cookies
  };
  const sessionToken = sessionStore.value;
  if (!sessionToken)
    return response;
  if (sessionStrategy === "jwt") {
    try {
      const salt = options.cookies.sessionToken.name;
      const payload = await jwt.decode({ ...jwt, token: sessionToken, salt });
      if (!payload)
        throw new Error("Invalid JWT");
      const token = await callbacks.jwt({
        token: payload,
        ...isUpdate && { trigger: "update" },
        session: newSession
      });
      const newExpires = fromDate(sessionMaxAge);
      if (token !== null) {
        const session2 = {
          user: { name: token.name, email: token.email, image: token.picture },
          expires: newExpires.toISOString()
        };
        const newSession2 = await callbacks.session({ session: session2, token });
        response.body = newSession2;
        const newToken = await jwt.encode({ ...jwt, token, salt });
        const sessionCookies = sessionStore.chunk(newToken, {
          expires: newExpires
        });
        response.cookies?.push(...sessionCookies);
        await events.session?.({ session: newSession2, token });
      } else {
        response.cookies?.push(...sessionStore.clean());
      }
    } catch (e) {
      logger.error(new JWTSessionError(e));
      response.cookies?.push(...sessionStore.clean());
    }
    return response;
  }
  try {
    const { getSessionAndUser, deleteSession, updateSession } = adapter;
    let userAndSession = await getSessionAndUser(sessionToken);
    if (userAndSession && userAndSession.session.expires.valueOf() < Date.now()) {
      await deleteSession(sessionToken);
      userAndSession = null;
    }
    if (userAndSession) {
      const { user, session: session2 } = userAndSession;
      const sessionUpdateAge = options.session.updateAge;
      const sessionIsDueToBeUpdatedDate = session2.expires.valueOf() - sessionMaxAge * 1e3 + sessionUpdateAge * 1e3;
      const newExpires = fromDate(sessionMaxAge);
      if (sessionIsDueToBeUpdatedDate <= Date.now()) {
        await updateSession({
          sessionToken,
          expires: newExpires
        });
      }
      const sessionPayload = await callbacks.session({
        // TODO: user already passed below,
        // remove from session object in https://github.com/nextauthjs/next-auth/pull/9702
        // @ts-expect-error
        session: { ...session2, user },
        user,
        newSession,
        ...isUpdate ? { trigger: "update" } : {}
      });
      response.body = sessionPayload;
      response.cookies?.push({
        name: options.cookies.sessionToken.name,
        value: sessionToken,
        options: {
          ...options.cookies.sessionToken.options,
          expires: newExpires
        }
      });
      await events.session?.({ session: sessionPayload });
    } else if (sessionToken) {
      response.cookies?.push(...sessionStore.clean());
    }
  } catch (e) {
    logger.error(new SessionTokenError(e));
  }
  return response;
}
async function getAuthorizationUrl(query, options) {
  const { logger, provider } = options;
  let url = provider.authorization?.url;
  if (!url || url.host === "authjs.dev") {
    const issuer = new URL(provider.issuer);
    const discoveryResponse = await discoveryRequest(issuer, {
      [customFetch$1]: provider[customFetch],
      // TODO: move away from allowing insecure HTTP requests
      [allowInsecureRequests]: true
    });
    const as = await processDiscoveryResponse(issuer, discoveryResponse).catch((error) => {
      if (!(error instanceof TypeError) || error.message !== "Invalid URL")
        throw error;
      throw new TypeError(`Discovery request responded with an invalid issuer. expected: ${issuer}`);
    });
    if (!as.authorization_endpoint) {
      throw new TypeError("Authorization server did not provide an authorization endpoint.");
    }
    url = new URL(as.authorization_endpoint);
  }
  const authParams = url.searchParams;
  let redirect_uri = provider.callbackUrl;
  let data;
  if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
    redirect_uri = provider.redirectProxyUrl;
    data = provider.callbackUrl;
    logger.debug("using redirect proxy", { redirect_uri, data });
  }
  const params = Object.assign({
    response_type: "code",
    // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
    client_id: provider.clientId,
    redirect_uri,
    // @ts-expect-error TODO:
    ...provider.authorization?.params
  }, Object.fromEntries(provider.authorization?.url.searchParams ?? []), query);
  for (const k in params)
    authParams.set(k, params[k]);
  const cookies = [];
  if (
    // Otherwise "POST /redirect_uri" wouldn't include the cookies
    provider.authorization?.url.searchParams.get("response_mode") === "form_post"
  ) {
    options.cookies.state.options.sameSite = "none";
    options.cookies.state.options.secure = true;
    options.cookies.nonce.options.sameSite = "none";
    options.cookies.nonce.options.secure = true;
  }
  const state$1 = await state.create(options, data);
  if (state$1) {
    authParams.set("state", state$1.value);
    cookies.push(state$1.cookie);
  }
  if (provider.checks?.includes("pkce")) {
    {
      const { value, cookie: cookie2 } = await pkce.create(options);
      authParams.set("code_challenge", value);
      authParams.set("code_challenge_method", "S256");
      cookies.push(cookie2);
    }
  }
  const nonce$1 = await nonce.create(options);
  if (nonce$1) {
    authParams.set("nonce", nonce$1.value);
    cookies.push(nonce$1.cookie);
  }
  if (provider.type === "oidc" && !url.searchParams.has("scope")) {
    url.searchParams.set("scope", "openid profile email");
  }
  logger.debug("authorization url is ready", { url, cookies, provider });
  return { redirect: url.toString(), cookies };
}
async function sendToken(request, options) {
  const { body } = request;
  const { provider, callbacks, adapter } = options;
  const normalizer = provider.normalizeIdentifier ?? defaultNormalizer;
  const email = normalizer(body?.email);
  const defaultUser = { id: crypto.randomUUID(), email, emailVerified: null };
  const user = await adapter.getUserByEmail(email) ?? defaultUser;
  const account = {
    providerAccountId: email,
    userId: user.id,
    type: "email",
    provider: provider.id
  };
  let authorized;
  try {
    authorized = await callbacks.signIn({
      user,
      account,
      email: { verificationRequest: true }
    });
  } catch (e) {
    throw new AccessDenied(e);
  }
  if (!authorized)
    throw new AccessDenied("AccessDenied");
  if (typeof authorized === "string") {
    return {
      redirect: await callbacks.redirect({
        url: authorized,
        baseUrl: options.url.origin
      })
    };
  }
  const { callbackUrl, theme } = options;
  const token = await provider.generateVerificationToken?.() ?? randomString(32);
  const ONE_DAY_IN_SECONDS = 86400;
  const expires = new Date(Date.now() + (provider.maxAge ?? ONE_DAY_IN_SECONDS) * 1e3);
  const secret = provider.secret ?? options.secret;
  const baseUrl = new URL(options.basePath, options.url.origin);
  const sendRequest = provider.sendVerificationRequest({
    identifier: email,
    token,
    expires,
    url: `${baseUrl}/callback/${provider.id}?${new URLSearchParams({
      callbackUrl,
      token,
      email
    })}`,
    provider,
    theme,
    request: toRequest(request)
  });
  const createToken = adapter.createVerificationToken?.({
    identifier: email,
    token: await createHash(`${token}${secret}`),
    expires
  });
  await Promise.all([sendRequest, createToken]);
  return {
    redirect: `${baseUrl}/verify-request?${new URLSearchParams({
      provider: provider.id,
      type: provider.type
    })}`
  };
}
function defaultNormalizer(email) {
  if (!email)
    throw new Error("Missing email from request body.");
  const trimmedEmail = email.toLowerCase().trim();
  if (trimmedEmail.includes('"')) {
    throw new Error("Invalid email address format.");
  }
  let [local, domain] = trimmedEmail.split("@");
  if (!local || !domain || trimmedEmail.split("@").length !== 2) {
    throw new Error("Invalid email address format.");
  }
  domain = domain.split(",")[0];
  if (!domain) {
    throw new Error("Invalid email address format.");
  }
  return `${local}@${domain}`;
}
async function signIn(request, cookies, options) {
  const signInUrl = `${options.url.origin}${options.basePath}/signin`;
  if (!options.provider)
    return { redirect: signInUrl, cookies };
  switch (options.provider.type) {
    case "oauth":
    case "oidc": {
      const { redirect, cookies: authCookies } = await getAuthorizationUrl(request.query, options);
      if (authCookies)
        cookies.push(...authCookies);
      return { redirect, cookies };
    }
    case "email": {
      const response = await sendToken(request, options);
      return { ...response, cookies };
    }
    default:
      return { redirect: signInUrl, cookies };
  }
}
async function signOut(cookies, sessionStore, options) {
  const { jwt, events, callbackUrl: redirect, logger, session: session2 } = options;
  const sessionToken = sessionStore.value;
  if (!sessionToken)
    return { redirect, cookies };
  try {
    if (session2.strategy === "jwt") {
      const salt = options.cookies.sessionToken.name;
      const token = await jwt.decode({ ...jwt, token: sessionToken, salt });
      await events.signOut?.({ token });
    } else {
      const session3 = await options.adapter?.deleteSession(sessionToken);
      await events.signOut?.({ session: session3 });
    }
  } catch (e) {
    logger.error(new SignOutError(e));
  }
  cookies.push(...sessionStore.clean());
  return { redirect, cookies };
}
async function getLoggedInUser(options, sessionStore) {
  const { adapter, jwt, session: { strategy: sessionStrategy } } = options;
  const sessionToken = sessionStore.value;
  if (!sessionToken)
    return null;
  if (sessionStrategy === "jwt") {
    const salt = options.cookies.sessionToken.name;
    const payload = await jwt.decode({ ...jwt, token: sessionToken, salt });
    if (payload && payload.sub) {
      return {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        image: payload.picture
      };
    }
  } else {
    const userAndSession = await adapter?.getSessionAndUser(sessionToken);
    if (userAndSession) {
      return userAndSession.user;
    }
  }
  return null;
}
async function webAuthnOptions(request, options, sessionStore, cookies) {
  const narrowOptions = assertInternalOptionsWebAuthn(options);
  const { provider } = narrowOptions;
  const { action } = request.query ?? {};
  if (action !== "register" && action !== "authenticate" && typeof action !== "undefined") {
    return {
      status: 400,
      body: { error: "Invalid action" },
      cookies,
      headers: {
        "Content-Type": "application/json"
      }
    };
  }
  const sessionUser = await getLoggedInUser(options, sessionStore);
  const getUserInfoResponse = sessionUser ? {
    user: sessionUser,
    exists: true
  } : await provider.getUserInfo(options, request);
  const userInfo = getUserInfoResponse?.user;
  const decision = inferWebAuthnOptions(action, !!sessionUser, getUserInfoResponse);
  switch (decision) {
    case "authenticate":
      return getAuthenticationResponse(narrowOptions, request, userInfo, cookies);
    case "register":
      if (typeof userInfo?.email === "string") {
        return getRegistrationResponse(narrowOptions, request, userInfo, cookies);
      }
      break;
    default:
      return {
        status: 400,
        body: { error: "Invalid request" },
        cookies,
        headers: {
          "Content-Type": "application/json"
        }
      };
  }
}
async function AuthInternal(request, authOptions) {
  const { action, providerId, error, method } = request;
  const csrfDisabled = authOptions.skipCSRFCheck === skipCSRFCheck;
  const { options, cookies } = await init({
    authOptions,
    action,
    providerId,
    url: request.url,
    callbackUrl: request.body?.callbackUrl ?? request.query?.callbackUrl,
    csrfToken: request.body?.csrfToken,
    cookies: request.cookies,
    isPost: method === "POST",
    csrfDisabled
  });
  const sessionStore = new SessionStore(options.cookies.sessionToken, request.cookies, options.logger);
  if (method === "GET") {
    const render = renderPage({ ...options, query: request.query, cookies });
    switch (action) {
      case "callback":
        return await callback(request, options, sessionStore, cookies);
      case "csrf":
        return render.csrf(csrfDisabled, options, cookies);
      case "error":
        return render.error(error);
      case "providers":
        return render.providers(options.providers);
      case "session":
        return await session(options, sessionStore, cookies);
      case "signin":
        return render.signin(providerId, error);
      case "signout":
        return render.signout();
      case "verify-request":
        return render.verifyRequest();
      case "webauthn-options":
        return await webAuthnOptions(request, options, sessionStore, cookies);
    }
  } else {
    const { csrfTokenVerified } = options;
    switch (action) {
      case "callback":
        if (options.provider.type === "credentials")
          validateCSRF(action, csrfTokenVerified);
        return await callback(request, options, sessionStore, cookies);
      case "session":
        validateCSRF(action, csrfTokenVerified);
        return await session(options, sessionStore, cookies, true, request.body?.data);
      case "signin":
        validateCSRF(action, csrfTokenVerified);
        return await signIn(request, cookies, options);
      case "signout":
        validateCSRF(action, csrfTokenVerified);
        return await signOut(cookies, sessionStore, options);
    }
  }
  throw new UnknownAction(`Cannot handle action: ${action}`);
}
function setEnvDefaults(envObject, config, suppressBasePathWarning = false) {
  try {
    const url = envObject.AUTH_URL;
    if (url) {
      if (config.basePath) {
        if (!suppressBasePathWarning) {
          const logger = setLogger(config);
          logger.warn("env-url-basepath-redundant");
        }
      } else {
        config.basePath = new URL(url).pathname;
      }
    }
  } catch {
  } finally {
    config.basePath ?? (config.basePath = `/auth`);
  }
  if (!config.secret?.length) {
    config.secret = [];
    const secret = envObject.AUTH_SECRET;
    if (secret)
      config.secret.push(secret);
    for (const i of [1, 2, 3]) {
      const secret2 = envObject[`AUTH_SECRET_${i}`];
      if (secret2)
        config.secret.unshift(secret2);
    }
  }
  config.redirectProxyUrl ?? (config.redirectProxyUrl = envObject.AUTH_REDIRECT_PROXY_URL);
  config.trustHost ?? (config.trustHost = !!(envObject.AUTH_URL ?? envObject.AUTH_TRUST_HOST ?? envObject.VERCEL ?? envObject.CF_PAGES ?? envObject.NODE_ENV !== "production"));
  config.providers = config.providers.map((provider) => {
    const { id } = typeof provider === "function" ? provider({}) : provider;
    const ID = id.toUpperCase().replace(/-/g, "_");
    const clientId = envObject[`AUTH_${ID}_ID`];
    const clientSecret = envObject[`AUTH_${ID}_SECRET`];
    const issuer = envObject[`AUTH_${ID}_ISSUER`];
    const apiKey = envObject[`AUTH_${ID}_KEY`];
    const finalProvider = typeof provider === "function" ? provider({ clientId, clientSecret, issuer, apiKey }) : provider;
    if (finalProvider.type === "oauth" || finalProvider.type === "oidc") {
      finalProvider.clientId ?? (finalProvider.clientId = clientId);
      finalProvider.clientSecret ?? (finalProvider.clientSecret = clientSecret);
      finalProvider.issuer ?? (finalProvider.issuer = issuer);
    } else if (finalProvider.type === "email") {
      finalProvider.apiKey ?? (finalProvider.apiKey = apiKey);
    }
    return finalProvider;
  });
}
function createActionURL(action, protocol, headers, envObject, config) {
  const basePath = config?.basePath;
  const envUrl = envObject.AUTH_URL ?? envObject.NEXTAUTH_URL;
  let url;
  if (envUrl) {
    url = new URL(envUrl);
    if (basePath && basePath !== "/" && url.pathname !== "/") {
      if (url.pathname !== basePath) {
        const logger = setLogger(config);
        logger.warn("env-url-basepath-mismatch");
      }
      url.pathname = "/";
    }
  } else {
    const detectedHost = headers.get("x-forwarded-host") ?? headers.get("host");
    const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol ?? "https";
    const _protocol = detectedProtocol.endsWith(":") ? detectedProtocol : detectedProtocol + ":";
    url = new URL(`${_protocol}//${detectedHost}`);
  }
  const sanitizedUrl = url.toString().replace(/\/$/, "");
  if (basePath) {
    const sanitizedBasePath = basePath?.replace(/(^\/|\/$)/g, "") ?? "";
    return new URL(`${sanitizedUrl}/${sanitizedBasePath}/${action}`);
  }
  return new URL(`${sanitizedUrl}/${action}`);
}
async function Auth(request, config) {
  const logger = setLogger(config);
  const internalRequest = await toInternalRequest(request, config);
  if (!internalRequest)
    return Response.json(`Bad request.`, { status: 400 });
  const warningsOrError = assertConfig(internalRequest, config);
  if (Array.isArray(warningsOrError)) {
    warningsOrError.forEach(logger.warn);
  } else if (warningsOrError) {
    logger.error(warningsOrError);
    const htmlPages = /* @__PURE__ */ new Set([
      "signin",
      "signout",
      "error",
      "verify-request"
    ]);
    if (!htmlPages.has(internalRequest.action) || internalRequest.method !== "GET") {
      const message = "There was a problem with the server configuration. Check the server logs for more information.";
      return Response.json({ message }, { status: 500 });
    }
    const { pages, theme } = config;
    const authOnErrorPage = pages?.error && internalRequest.url.searchParams.get("callbackUrl")?.startsWith(pages.error);
    if (!pages?.error || authOnErrorPage) {
      if (authOnErrorPage) {
        logger.error(new ErrorPageLoop(`The error page ${pages?.error} should not require authentication`));
      }
      const page = renderPage({ theme }).error("Configuration");
      return toResponse(page);
    }
    const url = `${internalRequest.url.origin}${pages.error}?error=Configuration`;
    return Response.redirect(url);
  }
  const isRedirect = request.headers?.has("X-Auth-Return-Redirect");
  const isRaw = config.raw === raw;
  try {
    const internalResponse = await AuthInternal(internalRequest, config);
    if (isRaw)
      return internalResponse;
    const response = toResponse(internalResponse);
    const url = response.headers.get("Location");
    if (!isRedirect || !url)
      return response;
    return Response.json({ url }, { headers: response.headers });
  } catch (e) {
    const error = e;
    logger.error(error);
    const isAuthError = error instanceof AuthError;
    if (isAuthError && isRaw && !isRedirect)
      throw error;
    if (request.method === "POST" && internalRequest.action === "session")
      return Response.json(null, { status: 400 });
    const isClientSafeErrorType = isClientError(error);
    const type = isClientSafeErrorType ? error.type : "Configuration";
    const params = new URLSearchParams({ error: type });
    if (error instanceof CredentialsSignin)
      params.set("code", error.code);
    const pageKind = isAuthError && error.kind || "error";
    const pagePath = config.pages?.[pageKind] ?? `${config.basePath}/${pageKind.toLowerCase()}`;
    const url = `${internalRequest.url.origin}${pagePath}?${params}`;
    if (isRedirect)
      return Response.json({ url });
    return Response.redirect(url);
  }
}
function Google(options) {
  return {
    id: "google",
    name: "Google",
    type: "oidc",
    issuer: "https://accounts.google.com",
    style: {
      brandColor: "#1a73e8"
    },
    options
  };
}
export {
  Auth as A,
  Google as G,
  skipCSRFCheck as a,
  createActionURL as c,
  raw as r,
  setEnvDefaults as s
};

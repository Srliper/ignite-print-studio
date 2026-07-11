import * as crypto from "crypto";
import { createHmac } from "crypto";
const fallback = (digest, ikm, salt, info, keylen) => {
  const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
  const prk = createHmac(digest, salt.byteLength ? salt : new Uint8Array(hashlen)).update(ikm).digest();
  const N = Math.ceil(keylen / hashlen);
  const T = new Uint8Array(hashlen * N + info.byteLength + 1);
  let prev = 0;
  let start = 0;
  for (let c = 1; c <= N; c++) {
    T.set(info, start);
    T[start + info.byteLength] = c;
    T.set(createHmac(digest, prk).update(T.subarray(prev, start + info.byteLength + 1)).digest(), start);
    prev = start;
    start += hashlen;
  }
  return T.slice(0, keylen);
};
let hkdf$1;
if (typeof crypto.hkdf === "function" && !process.versions.electron) {
  hkdf$1 = async (...args) => new Promise((resolve, reject) => {
    crypto.hkdf(...args, (err, arrayBuffer) => {
      if (err)
        reject(err);
      else
        resolve(new Uint8Array(arrayBuffer));
    });
  });
}
const derive = async (digest, ikm, salt, info, keylen) => (hkdf$1 || fallback)(digest, ikm, salt, info, keylen);
function normalizeDigest(digest) {
  switch (digest) {
    case "sha256":
    case "sha384":
    case "sha512":
    case "sha1":
      return digest;
    default:
      throw new TypeError('unsupported "digest" value');
  }
}
function normalizeUint8Array(input, label) {
  if (typeof input === "string")
    return new TextEncoder().encode(input);
  if (!(input instanceof Uint8Array))
    throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
  return input;
}
function normalizeIkm(input) {
  const ikm = normalizeUint8Array(input, "ikm");
  if (!ikm.byteLength)
    throw new TypeError(`"ikm" must be at least one byte in length`);
  return ikm;
}
function normalizeInfo(input) {
  const info = normalizeUint8Array(input, "info");
  if (info.byteLength > 1024) {
    throw TypeError('"info" must not contain more than 1024 bytes');
  }
  return info;
}
function normalizeKeylen(input, digest) {
  if (typeof input !== "number" || !Number.isInteger(input) || input < 1) {
    throw new TypeError('"keylen" must be a positive integer');
  }
  const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
  if (input > 255 * hashlen) {
    throw new TypeError('"keylen" too large');
  }
  return input;
}
async function hkdf(digest, ikm, salt, info, keylen) {
  return derive(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, "salt"), normalizeInfo(info), normalizeKeylen(keylen, digest));
}
export {
  hkdf as h
};


import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.1.4";globalThis.nextVersion = "15.5.25";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
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
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
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
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
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
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var a = {}, b = {};
      function c(d) {
        var e = b[d];
        if (void 0 !== e) return e.exports;
        var f = b[d] = { exports: {} }, g = true;
        try {
          a[d](f, f.exports, c), g = false;
        } finally {
          g && delete b[d];
        }
        return f.exports;
      }
      c.m = a, c.amdO = {}, (() => {
        var a2 = [];
        c.O = (b2, d, e, f) => {
          if (d) {
            f = f || 0;
            for (var g = a2.length; g > 0 && a2[g - 1][2] > f; g--) a2[g] = a2[g - 1];
            a2[g] = [d, e, f];
            return;
          }
          for (var h = 1 / 0, g = 0; g < a2.length; g++) {
            for (var [d, e, f] = a2[g], i = true, j = 0; j < d.length; j++) (false & f || h >= f) && Object.keys(c.O).every((a3) => c.O[a3](d[j])) ? d.splice(j--, 1) : (i = false, f < h && (h = f));
            if (i) {
              a2.splice(g--, 1);
              var k = e();
              void 0 !== k && (b2 = k);
            }
          }
          return b2;
        };
      })(), c.n = (a2) => {
        var b2 = a2 && a2.__esModule ? () => a2.default : () => a2;
        return c.d(b2, { a: b2 }), b2;
      }, c.d = (a2, b2) => {
        for (var d in b2) c.o(b2, d) && !c.o(a2, d) && Object.defineProperty(a2, d, { enumerable: true, get: b2[d] });
      }, c.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (a2) {
          if ("object" == typeof window) return window;
        }
      }(), c.o = (a2, b2) => Object.prototype.hasOwnProperty.call(a2, b2), c.r = (a2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a2, "__esModule", { value: true });
      }, (() => {
        var a2 = { 149: 0 };
        c.O.j = (b3) => 0 === a2[b3];
        var b2 = (b3, d2) => {
          var e, f, [g, h, i] = d2, j = 0;
          if (g.some((b4) => 0 !== a2[b4])) {
            for (e in h) c.o(h, e) && (c.m[e] = h[e]);
            if (i) var k = i(c);
          }
          for (b3 && b3(d2); j < g.length; j++) f = g[j], c.o(a2, f) && a2[f] && a2[f][0](), a2[f] = 0;
          return c.O(k);
        }, d = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        d.forEach(b2.bind(null, 0)), d.push = b2.bind(null, d.push.bind(d));
      })();
    })();
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/middleware.js
var require_middleware = __commonJS({
  ".next/server/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[751], { 58: (a, b, c) => {
      "use strict";
      c.d(b, { xl: () => g });
      let d = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class e {
        disable() {
          throw d;
        }
        getStore() {
        }
        run() {
          throw d;
        }
        exit() {
          throw d;
        }
        enterWith() {
          throw d;
        }
        static bind(a2) {
          return a2;
        }
      }
      let f = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function g() {
        return f ? new f() : new e();
      }
    }, 66: (a, b, c) => {
      "use strict";
      c.d(b, { RM: () => f, s8: () => e });
      let d = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), e = "NEXT_HTTP_ERROR_FALLBACK";
      function f(a2) {
        if ("object" != typeof a2 || null === a2 || !("digest" in a2) || "string" != typeof a2.digest) return false;
        let [b2, c2] = a2.digest.split(";");
        return b2 === e && d.has(Number(c2));
      }
    }, 107: (a, b, c) => {
      "use strict";
      c.d(b, { wi: () => m, I3: () => k, Ui: () => i, xI: () => g, Pk: () => h });
      var d = c(814), e = c(159);
      c(979), c(128), c(379), c(770), c(340), c(809);
      let f = "function" == typeof d.unstable_postpone;
      function g(a2, b2, c2) {
        let d2 = Object.defineProperty(new e.F(`Route ${b2.route} couldn't be rendered statically because it used \`${a2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw c2.revalidate = 0, b2.dynamicUsageDescription = a2, b2.dynamicUsageStack = d2.stack, d2;
      }
      function h(a2) {
        switch (a2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }
      function i(a2, b2, c2) {
        (function() {
          if (!f) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), c2 && c2.dynamicAccesses.push({ stack: c2.isDebugDynamicAccesses ? Error().stack : void 0, expression: b2 }), d.unstable_postpone(j(a2, b2));
      }
      function j(a2, b2) {
        return `Route ${a2} needs to bail out of prerendering at this point because it used ${b2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function k(a2) {
        return "object" == typeof a2 && null !== a2 && "string" == typeof a2.message && l(a2.message);
      }
      function l(a2) {
        return a2.includes("needs to bail out of prerendering at this point because it used") && a2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === l(j("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      function m(a2, b2) {
        return a2.runtimeStagePromise ? a2.runtimeStagePromise.then(() => b2) : b2;
      }
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)`), RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 128: (a, b, c) => {
      "use strict";
      c.d(b, { M1: () => e, FP: () => d });
      let d = (0, c(58).xl)();
      function e(a2) {
        throw Object.defineProperty(Error(`\`${a2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }
    }, 159: (a, b, c) => {
      "use strict";
      c.d(b, { F: () => e, h: () => f });
      let d = "DYNAMIC_SERVER_USAGE";
      class e extends Error {
        constructor(a2) {
          super("Dynamic server usage: " + a2), this.description = a2, this.digest = d;
        }
      }
      function f(a2) {
        return "object" == typeof a2 && null !== a2 && "digest" in a2 && "string" == typeof a2.digest && a2.digest === d;
      }
    }, 165: (a, b, c) => {
      "use strict";
      var d = c(356).Buffer;
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { handleFetch: function() {
        return h;
      }, interceptFetch: function() {
        return i;
      }, reader: function() {
        return f;
      } });
      let e = c(392), f = { url: (a2) => a2.url, header: (a2, b2) => a2.headers.get(b2) };
      async function g(a2, b2) {
        let { url: c2, method: e2, headers: f2, body: g2, cache: h2, credentials: i2, integrity: j, mode: k, redirect: l, referrer: m, referrerPolicy: n } = b2;
        return { testData: a2, api: "fetch", request: { url: c2, method: e2, headers: [...Array.from(f2), ["next-test-stack", function() {
          let a3 = (Error().stack ?? "").split("\n");
          for (let b3 = 1; b3 < a3.length; b3++) if (a3[b3].length > 0) {
            a3 = a3.slice(b3);
            break;
          }
          return (a3 = (a3 = (a3 = a3.filter((a4) => !a4.includes("/next/dist/"))).slice(0, 5)).map((a4) => a4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: g2 ? d.from(await b2.arrayBuffer()).toString("base64") : null, cache: h2, credentials: i2, integrity: j, mode: k, redirect: l, referrer: m, referrerPolicy: n } };
      }
      async function h(a2, b2) {
        let c2 = (0, e.getTestReqInfo)(b2, f);
        if (!c2) return a2(b2);
        let { testData: h2, proxyPort: i2 } = c2, j = await g(h2, b2), k = await a2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(j), next: { internal: true } });
        if (!k.ok) throw Object.defineProperty(Error(`Proxy request failed: ${k.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let l = await k.json(), { api: m } = l;
        switch (m) {
          case "continue":
            return a2(b2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${b2.method} ${b2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            let { status: n, headers: o, body: p } = l.response;
            return new Response(p ? d.from(p, "base64") : null, { status: n, headers: new Headers(o) });
          default:
            return m;
        }
      }
      function i(a2) {
        return c.g.fetch = function(b2, c2) {
          var d2;
          return (null == c2 || null == (d2 = c2.next) ? void 0 : d2.internal) ? a2(b2, c2) : h(a2, new Request(b2, c2));
        }, () => {
          c.g.fetch = a2;
        };
      }
    }, 213: (a) => {
      (() => {
        "use strict";
        var b = { 993: (a2) => {
          var b2 = Object.prototype.hasOwnProperty, c2 = "~";
          function d2() {
          }
          function e2(a3, b3, c3) {
            this.fn = a3, this.context = b3, this.once = c3 || false;
          }
          function f(a3, b3, d3, f2, g2) {
            if ("function" != typeof d3) throw TypeError("The listener must be a function");
            var h2 = new e2(d3, f2 || a3, g2), i = c2 ? c2 + b3 : b3;
            return a3._events[i] ? a3._events[i].fn ? a3._events[i] = [a3._events[i], h2] : a3._events[i].push(h2) : (a3._events[i] = h2, a3._eventsCount++), a3;
          }
          function g(a3, b3) {
            0 == --a3._eventsCount ? a3._events = new d2() : delete a3._events[b3];
          }
          function h() {
            this._events = new d2(), this._eventsCount = 0;
          }
          Object.create && (d2.prototype = /* @__PURE__ */ Object.create(null), new d2().__proto__ || (c2 = false)), h.prototype.eventNames = function() {
            var a3, d3, e3 = [];
            if (0 === this._eventsCount) return e3;
            for (d3 in a3 = this._events) b2.call(a3, d3) && e3.push(c2 ? d3.slice(1) : d3);
            return Object.getOwnPropertySymbols ? e3.concat(Object.getOwnPropertySymbols(a3)) : e3;
          }, h.prototype.listeners = function(a3) {
            var b3 = c2 ? c2 + a3 : a3, d3 = this._events[b3];
            if (!d3) return [];
            if (d3.fn) return [d3.fn];
            for (var e3 = 0, f2 = d3.length, g2 = Array(f2); e3 < f2; e3++) g2[e3] = d3[e3].fn;
            return g2;
          }, h.prototype.listenerCount = function(a3) {
            var b3 = c2 ? c2 + a3 : a3, d3 = this._events[b3];
            return d3 ? d3.fn ? 1 : d3.length : 0;
          }, h.prototype.emit = function(a3, b3, d3, e3, f2, g2) {
            var h2 = c2 ? c2 + a3 : a3;
            if (!this._events[h2]) return false;
            var i, j, k = this._events[h2], l = arguments.length;
            if (k.fn) {
              switch (k.once && this.removeListener(a3, k.fn, void 0, true), l) {
                case 1:
                  return k.fn.call(k.context), true;
                case 2:
                  return k.fn.call(k.context, b3), true;
                case 3:
                  return k.fn.call(k.context, b3, d3), true;
                case 4:
                  return k.fn.call(k.context, b3, d3, e3), true;
                case 5:
                  return k.fn.call(k.context, b3, d3, e3, f2), true;
                case 6:
                  return k.fn.call(k.context, b3, d3, e3, f2, g2), true;
              }
              for (j = 1, i = Array(l - 1); j < l; j++) i[j - 1] = arguments[j];
              k.fn.apply(k.context, i);
            } else {
              var m, n = k.length;
              for (j = 0; j < n; j++) switch (k[j].once && this.removeListener(a3, k[j].fn, void 0, true), l) {
                case 1:
                  k[j].fn.call(k[j].context);
                  break;
                case 2:
                  k[j].fn.call(k[j].context, b3);
                  break;
                case 3:
                  k[j].fn.call(k[j].context, b3, d3);
                  break;
                case 4:
                  k[j].fn.call(k[j].context, b3, d3, e3);
                  break;
                default:
                  if (!i) for (m = 1, i = Array(l - 1); m < l; m++) i[m - 1] = arguments[m];
                  k[j].fn.apply(k[j].context, i);
              }
            }
            return true;
          }, h.prototype.on = function(a3, b3, c3) {
            return f(this, a3, b3, c3, false);
          }, h.prototype.once = function(a3, b3, c3) {
            return f(this, a3, b3, c3, true);
          }, h.prototype.removeListener = function(a3, b3, d3, e3) {
            var f2 = c2 ? c2 + a3 : a3;
            if (!this._events[f2]) return this;
            if (!b3) return g(this, f2), this;
            var h2 = this._events[f2];
            if (h2.fn) h2.fn !== b3 || e3 && !h2.once || d3 && h2.context !== d3 || g(this, f2);
            else {
              for (var i = 0, j = [], k = h2.length; i < k; i++) (h2[i].fn !== b3 || e3 && !h2[i].once || d3 && h2[i].context !== d3) && j.push(h2[i]);
              j.length ? this._events[f2] = 1 === j.length ? j[0] : j : g(this, f2);
            }
            return this;
          }, h.prototype.removeAllListeners = function(a3) {
            var b3;
            return a3 ? (b3 = c2 ? c2 + a3 : a3, this._events[b3] && g(this, b3)) : (this._events = new d2(), this._eventsCount = 0), this;
          }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = c2, h.EventEmitter = h, a2.exports = h;
        }, 213: (a2) => {
          a2.exports = (a3, b2) => (b2 = b2 || (() => {
          }), a3.then((a4) => new Promise((a5) => {
            a5(b2());
          }).then(() => a4), (a4) => new Promise((a5) => {
            a5(b2());
          }).then(() => {
            throw a4;
          })));
        }, 574: (a2, b2) => {
          Object.defineProperty(b2, "__esModule", { value: true }), b2.default = function(a3, b3, c2) {
            let d2 = 0, e2 = a3.length;
            for (; e2 > 0; ) {
              let f = e2 / 2 | 0, g = d2 + f;
              0 >= c2(a3[g], b3) ? (d2 = ++g, e2 -= f + 1) : e2 = f;
            }
            return d2;
          };
        }, 821: (a2, b2, c2) => {
          Object.defineProperty(b2, "__esModule", { value: true });
          let d2 = c2(574);
          class e2 {
            constructor() {
              this._queue = [];
            }
            enqueue(a3, b3) {
              let c3 = { priority: (b3 = Object.assign({ priority: 0 }, b3)).priority, run: a3 };
              if (this.size && this._queue[this.size - 1].priority >= b3.priority) return void this._queue.push(c3);
              let e3 = d2.default(this._queue, c3, (a4, b4) => b4.priority - a4.priority);
              this._queue.splice(e3, 0, c3);
            }
            dequeue() {
              let a3 = this._queue.shift();
              return null == a3 ? void 0 : a3.run;
            }
            filter(a3) {
              return this._queue.filter((b3) => b3.priority === a3.priority).map((a4) => a4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          b2.default = e2;
        }, 816: (a2, b2, c2) => {
          let d2 = c2(213);
          class e2 extends Error {
            constructor(a3) {
              super(a3), this.name = "TimeoutError";
            }
          }
          let f = (a3, b3, c3) => new Promise((f2, g) => {
            if ("number" != typeof b3 || b3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (b3 === 1 / 0) return void f2(a3);
            let h = setTimeout(() => {
              if ("function" == typeof c3) {
                try {
                  f2(c3());
                } catch (a4) {
                  g(a4);
                }
                return;
              }
              let d3 = "string" == typeof c3 ? c3 : `Promise timed out after ${b3} milliseconds`, h2 = c3 instanceof Error ? c3 : new e2(d3);
              "function" == typeof a3.cancel && a3.cancel(), g(h2);
            }, b3);
            d2(a3.then(f2, g), () => {
              clearTimeout(h);
            });
          });
          a2.exports = f, a2.exports.default = f, a2.exports.TimeoutError = e2;
        } }, c = {};
        function d(a2) {
          var e2 = c[a2];
          if (void 0 !== e2) return e2.exports;
          var f = c[a2] = { exports: {} }, g = true;
          try {
            b[a2](f, f.exports, d), g = false;
          } finally {
            g && delete c[a2];
          }
          return f.exports;
        }
        d.ab = "//";
        var e = {};
        (() => {
          Object.defineProperty(e, "__esModule", { value: true });
          let a2 = d(993), b2 = d(816), c2 = d(821), f = () => {
          }, g = new b2.TimeoutError();
          class h extends a2 {
            constructor(a3) {
              var b3, d2, e2, g2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = f, this._resolveIdle = f, !("number" == typeof (a3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: c2.default }, a3)).intervalCap && a3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (d2 = null == (b3 = a3.intervalCap) ? void 0 : b3.toString()) ? d2 : ""}\` (${typeof a3.intervalCap})`);
              if (void 0 === a3.interval || !(Number.isFinite(a3.interval) && a3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (g2 = null == (e2 = a3.interval) ? void 0 : e2.toString()) ? g2 : ""}\` (${typeof a3.interval})`);
              this._carryoverConcurrencyCount = a3.carryoverConcurrencyCount, this._isIntervalIgnored = a3.intervalCap === 1 / 0 || 0 === a3.interval, this._intervalCap = a3.intervalCap, this._interval = a3.interval, this._queue = new a3.queueClass(), this._queueClass = a3.queueClass, this.concurrency = a3.concurrency, this._timeout = a3.timeout, this._throwOnTimeout = true === a3.throwOnTimeout, this._isPaused = false === a3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = f, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = f, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let a3 = Date.now();
              if (void 0 === this._intervalId) {
                let b3 = this._intervalEnd - a3;
                if (!(b3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, b3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let a3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let b3 = this._queue.dequeue();
                  return !!b3 && (this.emit("active"), b3(), a3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(a3) {
              if (!("number" == typeof a3 && a3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${a3}\` (${typeof a3})`);
              this._concurrency = a3, this._processQueue();
            }
            async add(a3, c3 = {}) {
              return new Promise((d2, e2) => {
                let f2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let f3 = void 0 === this._timeout && void 0 === c3.timeout ? a3() : b2.default(Promise.resolve(a3()), void 0 === c3.timeout ? this._timeout : c3.timeout, () => {
                      (void 0 === c3.throwOnTimeout ? this._throwOnTimeout : c3.throwOnTimeout) && e2(g);
                    });
                    d2(await f3);
                  } catch (a4) {
                    e2(a4);
                  }
                  this._next();
                };
                this._queue.enqueue(f2, c3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(a3, b3) {
              return Promise.all(a3.map(async (a4) => this.add(a4, b3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((a3) => {
                let b3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  b3(), a3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((a3) => {
                let b3 = this._resolveIdle;
                this._resolveIdle = () => {
                  b3(), a3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(a3) {
              return this._queue.filter(a3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(a3) {
              this._timeout = a3;
            }
          }
          e.default = h;
        })(), a.exports = e;
      })();
    }, 340: (a, b, c) => {
      "use strict";
      function d(a2) {
        return "object" == typeof a2 && null !== a2 && "digest" in a2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === a2.digest;
      }
      c.d(b, { C: () => d });
    }, 356: (a) => {
      "use strict";
      a.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 378: (a, b, c) => {
      "use strict";
      c.d(b, { Q: () => d });
      var d = function(a2) {
        return a2[a2.SeeOther = 303] = "SeeOther", a2[a2.TemporaryRedirect = 307] = "TemporaryRedirect", a2[a2.PermanentRedirect = 308] = "PermanentRedirect", a2;
      }({});
    }, 379: (a, b, c) => {
      "use strict";
      c.d(b, { J: () => d });
      let d = (0, c(58).xl)();
    }, 392: (a, b, c) => {
      "use strict";
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { getTestReqInfo: function() {
        return g;
      }, withRequest: function() {
        return f;
      } });
      let d = new (c(521)).AsyncLocalStorage();
      function e(a2, b2) {
        let c2 = b2.header(a2, "next-test-proxy-port");
        if (!c2) return;
        let d2 = b2.url(a2);
        return { url: d2, proxyPort: Number(c2), testData: b2.header(a2, "next-test-data") || "" };
      }
      function f(a2, b2, c2) {
        let f2 = e(a2, b2);
        return f2 ? d.run(f2, c2) : c2();
      }
      function g(a2, b2) {
        let c2 = d.getStore();
        return c2 || (a2 && b2 ? e(a2, b2) : void 0);
      }
    }, 440: (a, b) => {
      "use strict";
      var c = { H: null, A: null };
      function d(a2) {
        var b2 = "https://react.dev/errors/" + a2;
        if (1 < arguments.length) {
          b2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var c2 = 2; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
        }
        return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var e = Array.isArray;
      function f() {
      }
      var g = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.memo"), o = Symbol.for("react.lazy"), p = Symbol.iterator, q = Object.prototype.hasOwnProperty, r = Object.assign;
      function s(a2, b2, c2) {
        var d2 = c2.ref;
        return { $$typeof: g, type: a2, key: b2, ref: void 0 !== d2 ? d2 : null, props: c2 };
      }
      function t(a2) {
        return "object" == typeof a2 && null !== a2 && a2.$$typeof === g;
      }
      var u = /\/+/g;
      function v(a2, b2) {
        var c2, d2;
        return "object" == typeof a2 && null !== a2 && null != a2.key ? (c2 = "" + a2.key, d2 = { "=": "=0", ":": "=2" }, "$" + c2.replace(/[=:]/g, function(a3) {
          return d2[a3];
        })) : b2.toString(36);
      }
      function w(a2, b2, c2) {
        if (null == a2) return a2;
        var i2 = [], j2 = 0;
        return !function a3(b3, c3, i3, j3, k2) {
          var l2, m2, n2, q2 = typeof b3;
          ("undefined" === q2 || "boolean" === q2) && (b3 = null);
          var r2 = false;
          if (null === b3) r2 = true;
          else switch (q2) {
            case "bigint":
            case "string":
            case "number":
              r2 = true;
              break;
            case "object":
              switch (b3.$$typeof) {
                case g:
                case h:
                  r2 = true;
                  break;
                case o:
                  return a3((r2 = b3._init)(b3._payload), c3, i3, j3, k2);
              }
          }
          if (r2) return k2 = k2(b3), r2 = "" === j3 ? "." + v(b3, 0) : j3, e(k2) ? (i3 = "", null != r2 && (i3 = r2.replace(u, "$&/") + "/"), a3(k2, c3, i3, "", function(a4) {
            return a4;
          })) : null != k2 && (t(k2) && (l2 = k2, m2 = i3 + (null == k2.key || b3 && b3.key === k2.key ? "" : ("" + k2.key).replace(u, "$&/") + "/") + r2, k2 = s(l2.type, m2, l2.props)), c3.push(k2)), 1;
          r2 = 0;
          var w2 = "" === j3 ? "." : j3 + ":";
          if (e(b3)) for (var x2 = 0; x2 < b3.length; x2++) q2 = w2 + v(j3 = b3[x2], x2), r2 += a3(j3, c3, i3, q2, k2);
          else if ("function" == typeof (x2 = null === (n2 = b3) || "object" != typeof n2 ? null : "function" == typeof (n2 = p && n2[p] || n2["@@iterator"]) ? n2 : null)) for (b3 = x2.call(b3), x2 = 0; !(j3 = b3.next()).done; ) q2 = w2 + v(j3 = j3.value, x2++), r2 += a3(j3, c3, i3, q2, k2);
          else if ("object" === q2) {
            if ("function" == typeof b3.then) return a3(function(a4) {
              switch (a4.status) {
                case "fulfilled":
                  return a4.value;
                case "rejected":
                  throw a4.reason;
                default:
                  switch ("string" == typeof a4.status ? a4.then(f, f) : (a4.status = "pending", a4.then(function(b4) {
                    "pending" === a4.status && (a4.status = "fulfilled", a4.value = b4);
                  }, function(b4) {
                    "pending" === a4.status && (a4.status = "rejected", a4.reason = b4);
                  })), a4.status) {
                    case "fulfilled":
                      return a4.value;
                    case "rejected":
                      throw a4.reason;
                  }
              }
              throw a4;
            }(b3), c3, i3, j3, k2);
            throw Error(d(31, "[object Object]" === (c3 = String(b3)) ? "object with keys {" + Object.keys(b3).join(", ") + "}" : c3));
          }
          return r2;
        }(a2, i2, "", "", function(a3) {
          return b2.call(c2, a3, j2++);
        }), i2;
      }
      function x(a2) {
        if (-1 === a2._status) {
          var b2 = a2._result;
          (b2 = b2()).then(function(b3) {
            (0 === a2._status || -1 === a2._status) && (a2._status = 1, a2._result = b3);
          }, function(b3) {
            (0 === a2._status || -1 === a2._status) && (a2._status = 2, a2._result = b3);
          }), -1 === a2._status && (a2._status = 0, a2._result = b2);
        }
        if (1 === a2._status) return a2._result.default;
        throw a2._result;
      }
      function y() {
        return /* @__PURE__ */ new WeakMap();
      }
      function z() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      b.Children = { map: w, forEach: function(a2, b2, c2) {
        w(a2, function() {
          b2.apply(this, arguments);
        }, c2);
      }, count: function(a2) {
        var b2 = 0;
        return w(a2, function() {
          b2++;
        }), b2;
      }, toArray: function(a2) {
        return w(a2, function(a3) {
          return a3;
        }) || [];
      }, only: function(a2) {
        if (!t(a2)) throw Error(d(143));
        return a2;
      } }, b.Fragment = i, b.Profiler = k, b.StrictMode = j, b.Suspense = m, b.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, b.cache = function(a2) {
        return function() {
          var b2 = c.A;
          if (!b2) return a2.apply(null, arguments);
          var d2 = b2.getCacheForType(y);
          void 0 === (b2 = d2.get(a2)) && (b2 = z(), d2.set(a2, b2)), d2 = 0;
          for (var e2 = arguments.length; d2 < e2; d2++) {
            var f2 = arguments[d2];
            if ("function" == typeof f2 || "object" == typeof f2 && null !== f2) {
              var g2 = b2.o;
              null === g2 && (b2.o = g2 = /* @__PURE__ */ new WeakMap()), void 0 === (b2 = g2.get(f2)) && (b2 = z(), g2.set(f2, b2));
            } else null === (g2 = b2.p) && (b2.p = g2 = /* @__PURE__ */ new Map()), void 0 === (b2 = g2.get(f2)) && (b2 = z(), g2.set(f2, b2));
          }
          if (1 === b2.s) return b2.v;
          if (2 === b2.s) throw b2.v;
          try {
            var h2 = a2.apply(null, arguments);
            return (d2 = b2).s = 1, d2.v = h2;
          } catch (a3) {
            throw (h2 = b2).s = 2, h2.v = a3, a3;
          }
        };
      }, b.cacheSignal = function() {
        var a2 = c.A;
        return a2 ? a2.cacheSignal() : null;
      }, b.captureOwnerStack = function() {
        return null;
      }, b.cloneElement = function(a2, b2, c2) {
        if (null == a2) throw Error(d(267, a2));
        var e2 = r({}, a2.props), f2 = a2.key;
        if (null != b2) for (g2 in void 0 !== b2.key && (f2 = "" + b2.key), b2) q.call(b2, g2) && "key" !== g2 && "__self" !== g2 && "__source" !== g2 && ("ref" !== g2 || void 0 !== b2.ref) && (e2[g2] = b2[g2]);
        var g2 = arguments.length - 2;
        if (1 === g2) e2.children = c2;
        else if (1 < g2) {
          for (var h2 = Array(g2), i2 = 0; i2 < g2; i2++) h2[i2] = arguments[i2 + 2];
          e2.children = h2;
        }
        return s(a2.type, f2, e2);
      }, b.createElement = function(a2, b2, c2) {
        var d2, e2 = {}, f2 = null;
        if (null != b2) for (d2 in void 0 !== b2.key && (f2 = "" + b2.key), b2) q.call(b2, d2) && "key" !== d2 && "__self" !== d2 && "__source" !== d2 && (e2[d2] = b2[d2]);
        var g2 = arguments.length - 2;
        if (1 === g2) e2.children = c2;
        else if (1 < g2) {
          for (var h2 = Array(g2), i2 = 0; i2 < g2; i2++) h2[i2] = arguments[i2 + 2];
          e2.children = h2;
        }
        if (a2 && a2.defaultProps) for (d2 in g2 = a2.defaultProps) void 0 === e2[d2] && (e2[d2] = g2[d2]);
        return s(a2, f2, e2);
      }, b.createRef = function() {
        return { current: null };
      }, b.forwardRef = function(a2) {
        return { $$typeof: l, render: a2 };
      }, b.isValidElement = t, b.lazy = function(a2) {
        return { $$typeof: o, _payload: { _status: -1, _result: a2 }, _init: x };
      }, b.memo = function(a2, b2) {
        return { $$typeof: n, type: a2, compare: void 0 === b2 ? null : b2 };
      }, b.use = function(a2) {
        return c.H.use(a2);
      }, b.useCallback = function(a2, b2) {
        return c.H.useCallback(a2, b2);
      }, b.useDebugValue = function() {
      }, b.useId = function() {
        return c.H.useId();
      }, b.useMemo = function(a2, b2) {
        return c.H.useMemo(a2, b2);
      }, b.version = "19.2.0-canary-0bdb9206-20250818";
    }, 443: (a) => {
      "use strict";
      var b = Object.defineProperty, c = Object.getOwnPropertyDescriptor, d = Object.getOwnPropertyNames, e = Object.prototype.hasOwnProperty, f = {};
      function g(a2) {
        var b2;
        let c2 = ["path" in a2 && a2.path && `Path=${a2.path}`, "expires" in a2 && (a2.expires || 0 === a2.expires) && `Expires=${("number" == typeof a2.expires ? new Date(a2.expires) : a2.expires).toUTCString()}`, "maxAge" in a2 && "number" == typeof a2.maxAge && `Max-Age=${a2.maxAge}`, "domain" in a2 && a2.domain && `Domain=${a2.domain}`, "secure" in a2 && a2.secure && "Secure", "httpOnly" in a2 && a2.httpOnly && "HttpOnly", "sameSite" in a2 && a2.sameSite && `SameSite=${a2.sameSite}`, "partitioned" in a2 && a2.partitioned && "Partitioned", "priority" in a2 && a2.priority && `Priority=${a2.priority}`].filter(Boolean), d2 = `${a2.name}=${encodeURIComponent(null != (b2 = a2.value) ? b2 : "")}`;
        return 0 === c2.length ? d2 : `${d2}; ${c2.join("; ")}`;
      }
      function h(a2) {
        let b2 = /* @__PURE__ */ new Map();
        for (let c2 of a2.split(/; */)) {
          if (!c2) continue;
          let a3 = c2.indexOf("=");
          if (-1 === a3) {
            b2.set(c2, "true");
            continue;
          }
          let [d2, e2] = [c2.slice(0, a3), c2.slice(a3 + 1)];
          try {
            b2.set(d2, decodeURIComponent(null != e2 ? e2 : "true"));
          } catch {
          }
        }
        return b2;
      }
      function i(a2) {
        if (!a2) return;
        let [[b2, c2], ...d2] = h(a2), { domain: e2, expires: f2, httponly: g2, maxage: i2, path: l2, samesite: m2, secure: n, partitioned: o, priority: p } = Object.fromEntries(d2.map(([a3, b3]) => [a3.toLowerCase().replace(/-/g, ""), b3]));
        {
          var q, r, s = { name: b2, value: decodeURIComponent(c2), domain: e2, ...f2 && { expires: new Date(f2) }, ...g2 && { httpOnly: true }, ..."string" == typeof i2 && { maxAge: Number(i2) }, path: l2, ...m2 && { sameSite: j.includes(q = (q = m2).toLowerCase()) ? q : void 0 }, ...n && { secure: true }, ...p && { priority: k.includes(r = (r = p).toLowerCase()) ? r : void 0 }, ...o && { partitioned: true } };
          let a3 = {};
          for (let b3 in s) s[b3] && (a3[b3] = s[b3]);
          return a3;
        }
      }
      ((a2, c2) => {
        for (var d2 in c2) b(a2, d2, { get: c2[d2], enumerable: true });
      })(f, { RequestCookies: () => l, ResponseCookies: () => m, parseCookie: () => h, parseSetCookie: () => i, stringifyCookie: () => g }), a.exports = ((a2, f2, g2, h2) => {
        if (f2 && "object" == typeof f2 || "function" == typeof f2) for (let i2 of d(f2)) e.call(a2, i2) || i2 === g2 || b(a2, i2, { get: () => f2[i2], enumerable: !(h2 = c(f2, i2)) || h2.enumerable });
        return a2;
      })(b({}, "__esModule", { value: true }), f);
      var j = ["strict", "lax", "none"], k = ["low", "medium", "high"], l = class {
        constructor(a2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = a2;
          let b2 = a2.get("cookie");
          if (b2) for (let [a3, c2] of h(b2)) this._parsed.set(a3, { name: a3, value: c2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...a2) {
          let b2 = "string" == typeof a2[0] ? a2[0] : a2[0].name;
          return this._parsed.get(b2);
        }
        getAll(...a2) {
          var b2;
          let c2 = Array.from(this._parsed);
          if (!a2.length) return c2.map(([a3, b3]) => b3);
          let d2 = "string" == typeof a2[0] ? a2[0] : null == (b2 = a2[0]) ? void 0 : b2.name;
          return c2.filter(([a3]) => a3 === d2).map(([a3, b3]) => b3);
        }
        has(a2) {
          return this._parsed.has(a2);
        }
        set(...a2) {
          let [b2, c2] = 1 === a2.length ? [a2[0].name, a2[0].value] : a2, d2 = this._parsed;
          return d2.set(b2, { name: b2, value: c2 }), this._headers.set("cookie", Array.from(d2).map(([a3, b3]) => g(b3)).join("; ")), this;
        }
        delete(a2) {
          let b2 = this._parsed, c2 = Array.isArray(a2) ? a2.map((a3) => b2.delete(a3)) : b2.delete(a2);
          return this._headers.set("cookie", Array.from(b2).map(([a3, b3]) => g(b3)).join("; ")), c2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((a2) => `${a2.name}=${encodeURIComponent(a2.value)}`).join("; ");
        }
      }, m = class {
        constructor(a2) {
          var b2, c2, d2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = a2;
          let e2 = null != (d2 = null != (c2 = null == (b2 = a2.getSetCookie) ? void 0 : b2.call(a2)) ? c2 : a2.get("set-cookie")) ? d2 : [];
          for (let a3 of Array.isArray(e2) ? e2 : function(a4) {
            if (!a4) return [];
            var b3, c3, d3, e3, f2, g2 = [], h2 = 0;
            function i2() {
              for (; h2 < a4.length && /\s/.test(a4.charAt(h2)); ) h2 += 1;
              return h2 < a4.length;
            }
            for (; h2 < a4.length; ) {
              for (b3 = h2, f2 = false; i2(); ) if ("," === (c3 = a4.charAt(h2))) {
                for (d3 = h2, h2 += 1, i2(), e3 = h2; h2 < a4.length && "=" !== (c3 = a4.charAt(h2)) && ";" !== c3 && "," !== c3; ) h2 += 1;
                h2 < a4.length && "=" === a4.charAt(h2) ? (f2 = true, h2 = e3, g2.push(a4.substring(b3, d3)), b3 = h2) : h2 = d3 + 1;
              } else h2 += 1;
              (!f2 || h2 >= a4.length) && g2.push(a4.substring(b3, a4.length));
            }
            return g2;
          }(e2)) {
            let b3 = i(a3);
            b3 && this._parsed.set(b3.name, b3);
          }
        }
        get(...a2) {
          let b2 = "string" == typeof a2[0] ? a2[0] : a2[0].name;
          return this._parsed.get(b2);
        }
        getAll(...a2) {
          var b2;
          let c2 = Array.from(this._parsed.values());
          if (!a2.length) return c2;
          let d2 = "string" == typeof a2[0] ? a2[0] : null == (b2 = a2[0]) ? void 0 : b2.name;
          return c2.filter((a3) => a3.name === d2);
        }
        has(a2) {
          return this._parsed.has(a2);
        }
        set(...a2) {
          let [b2, c2, d2] = 1 === a2.length ? [a2[0].name, a2[0].value, a2[0]] : a2, e2 = this._parsed;
          return e2.set(b2, function(a3 = { name: "", value: "" }) {
            return "number" == typeof a3.expires && (a3.expires = new Date(a3.expires)), a3.maxAge && (a3.expires = new Date(Date.now() + 1e3 * a3.maxAge)), (null === a3.path || void 0 === a3.path) && (a3.path = "/"), a3;
          }({ name: b2, value: c2, ...d2 })), function(a3, b3) {
            for (let [, c3] of (b3.delete("set-cookie"), a3)) {
              let a4 = g(c3);
              b3.append("set-cookie", a4);
            }
          }(e2, this._headers), this;
        }
        delete(...a2) {
          let [b2, c2] = "string" == typeof a2[0] ? [a2[0]] : [a2[0].name, a2[0]];
          return this.set({ ...c2, name: b2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(g).join("; ");
        }
      };
    }, 449: (a, b, c) => {
      var d;
      (() => {
        var e = { 226: function(e2, f2) {
          !function(g2, h) {
            "use strict";
            var i = "function", j = "undefined", k = "object", l = "string", m = "major", n = "model", o = "name", p = "type", q = "vendor", r = "version", s = "architecture", t = "console", u = "mobile", v = "tablet", w = "smarttv", x = "wearable", y = "embedded", z = "Amazon", A = "Apple", B = "ASUS", C = "BlackBerry", D = "Browser", E = "Chrome", F = "Firefox", G = "Google", H = "Huawei", I = "Microsoft", J = "Motorola", K = "Opera", L = "Samsung", M = "Sharp", N = "Sony", O = "Xiaomi", P = "Zebra", Q = "Facebook", R = "Chromium OS", S = "Mac OS", T = function(a2, b2) {
              var c2 = {};
              for (var d2 in a2) b2[d2] && b2[d2].length % 2 == 0 ? c2[d2] = b2[d2].concat(a2[d2]) : c2[d2] = a2[d2];
              return c2;
            }, U = function(a2) {
              for (var b2 = {}, c2 = 0; c2 < a2.length; c2++) b2[a2[c2].toUpperCase()] = a2[c2];
              return b2;
            }, V = function(a2, b2) {
              return typeof a2 === l && -1 !== W(b2).indexOf(W(a2));
            }, W = function(a2) {
              return a2.toLowerCase();
            }, X = function(a2, b2) {
              if (typeof a2 === l) return a2 = a2.replace(/^\s\s*/, ""), typeof b2 === j ? a2 : a2.substring(0, 350);
            }, Y = function(a2, b2) {
              for (var c2, d2, e3, f3, g3, j2, l2 = 0; l2 < b2.length && !g3; ) {
                var m2 = b2[l2], n2 = b2[l2 + 1];
                for (c2 = d2 = 0; c2 < m2.length && !g3 && m2[c2]; ) if (g3 = m2[c2++].exec(a2)) for (e3 = 0; e3 < n2.length; e3++) j2 = g3[++d2], typeof (f3 = n2[e3]) === k && f3.length > 0 ? 2 === f3.length ? typeof f3[1] == i ? this[f3[0]] = f3[1].call(this, j2) : this[f3[0]] = f3[1] : 3 === f3.length ? typeof f3[1] !== i || f3[1].exec && f3[1].test ? this[f3[0]] = j2 ? j2.replace(f3[1], f3[2]) : void 0 : this[f3[0]] = j2 ? f3[1].call(this, j2, f3[2]) : void 0 : 4 === f3.length && (this[f3[0]] = j2 ? f3[3].call(this, j2.replace(f3[1], f3[2])) : h) : this[f3] = j2 || h;
                l2 += 2;
              }
            }, Z = function(a2, b2) {
              for (var c2 in b2) if (typeof b2[c2] === k && b2[c2].length > 0) {
                for (var d2 = 0; d2 < b2[c2].length; d2++) if (V(b2[c2][d2], a2)) return "?" === c2 ? h : c2;
              } else if (V(b2[c2], a2)) return "?" === c2 ? h : c2;
              return a2;
            }, $ = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, _ = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [r, [o, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [r, [o, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [o, r], [/opios[\/ ]+([\w\.]+)/i], [r, [o, K + " Mini"]], [/\bopr\/([\w\.]+)/i], [r, [o, K]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [o, r], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [r, [o, "UC" + D]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [r, [o, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [r, [o, "WeChat"]], [/konqueror\/([\w\.]+)/i], [r, [o, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [r, [o, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [r, [o, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[o, /(.+)/, "$1 Secure " + D], r], [/\bfocus\/([\w\.]+)/i], [r, [o, F + " Focus"]], [/\bopt\/([\w\.]+)/i], [r, [o, K + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [r, [o, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [r, [o, "Dolphin"]], [/coast\/([\w\.]+)/i], [r, [o, K + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [r, [o, "MIUI " + D]], [/fxios\/([-\w\.]+)/i], [r, [o, F]], [/\bqihu|(qi?ho?o?|360)browser/i], [[o, "360 " + D]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[o, /(.+)/, "$1 " + D], r], [/(comodo_dragon)\/([\w\.]+)/i], [[o, /_/g, " "], r], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [o, r], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [o], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[o, Q], r], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [o, r], [/\bgsa\/([\w\.]+) .*safari\//i], [r, [o, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [r, [o, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [r, [o, E + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[o, E + " WebView"], r], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [r, [o, "Android " + D]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [o, r], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [r, [o, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [r, o], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [o, [r, Z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [o, r], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[o, "Netscape"], r], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [r, [o, F + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [o, r], [/(cobalt)\/([\w\.]+)/i], [o, [r, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[s, "amd64"]], [/(ia32(?=;))/i], [[s, W]], [/((?:i[346]|x)86)[;\)]/i], [[s, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[s, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[s, "armhf"]], [/windows (ce|mobile); ppc;/i], [[s, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[s, /ower/, "", W]], [/(sun4\w)[;\)]/i], [[s, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[s, W]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [n, [q, L], [p, v]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [n, [q, L], [p, u]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [n, [q, A], [p, u]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [n, [q, A], [p, v]], [/(macintosh);/i], [n, [q, A]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [n, [q, M], [p, u]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [n, [q, H], [p, v]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [n, [q, H], [p, u]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[n, /_/g, " "], [q, O], [p, u]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[n, /_/g, " "], [q, O], [p, v]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [n, [q, "OPPO"], [p, u]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [n, [q, "Vivo"], [p, u]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [n, [q, "Realme"], [p, u]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [n, [q, J], [p, u]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [n, [q, J], [p, v]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [n, [q, "LG"], [p, v]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [n, [q, "LG"], [p, u]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [n, [q, "Lenovo"], [p, v]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[n, /_/g, " "], [q, "Nokia"], [p, u]], [/(pixel c)\b/i], [n, [q, G], [p, v]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [n, [q, G], [p, u]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [n, [q, N], [p, u]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[n, "Xperia Tablet"], [q, N], [p, v]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [n, [q, "OnePlus"], [p, u]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [n, [q, z], [p, v]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[n, /(.+)/g, "Fire Phone $1"], [q, z], [p, u]], [/(playbook);[-\w\),; ]+(rim)/i], [n, q, [p, v]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [n, [q, C], [p, u]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [n, [q, B], [p, v]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [n, [q, B], [p, u]], [/(nexus 9)/i], [n, [q, "HTC"], [p, v]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [q, [n, /_/g, " "], [p, u]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [n, [q, "Acer"], [p, v]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [n, [q, "Meizu"], [p, u]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [q, n, [p, u]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [q, n, [p, v]], [/(surface duo)/i], [n, [q, I], [p, v]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [n, [q, "Fairphone"], [p, u]], [/(u304aa)/i], [n, [q, "AT&T"], [p, u]], [/\bsie-(\w*)/i], [n, [q, "Siemens"], [p, u]], [/\b(rct\w+) b/i], [n, [q, "RCA"], [p, v]], [/\b(venue[\d ]{2,7}) b/i], [n, [q, "Dell"], [p, v]], [/\b(q(?:mv|ta)\w+) b/i], [n, [q, "Verizon"], [p, v]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [n, [q, "Barnes & Noble"], [p, v]], [/\b(tm\d{3}\w+) b/i], [n, [q, "NuVision"], [p, v]], [/\b(k88) b/i], [n, [q, "ZTE"], [p, v]], [/\b(nx\d{3}j) b/i], [n, [q, "ZTE"], [p, u]], [/\b(gen\d{3}) b.+49h/i], [n, [q, "Swiss"], [p, u]], [/\b(zur\d{3}) b/i], [n, [q, "Swiss"], [p, v]], [/\b((zeki)?tb.*\b) b/i], [n, [q, "Zeki"], [p, v]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[q, "Dragon Touch"], n, [p, v]], [/\b(ns-?\w{0,9}) b/i], [n, [q, "Insignia"], [p, v]], [/\b((nxa|next)-?\w{0,9}) b/i], [n, [q, "NextBook"], [p, v]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[q, "Voice"], n, [p, u]], [/\b(lvtel\-)?(v1[12]) b/i], [[q, "LvTel"], n, [p, u]], [/\b(ph-1) /i], [n, [q, "Essential"], [p, u]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [n, [q, "Envizen"], [p, v]], [/\b(trio[-\w\. ]+) b/i], [n, [q, "MachSpeed"], [p, v]], [/\btu_(1491) b/i], [n, [q, "Rotor"], [p, v]], [/(shield[\w ]+) b/i], [n, [q, "Nvidia"], [p, v]], [/(sprint) (\w+)/i], [q, n, [p, u]], [/(kin\.[onetw]{3})/i], [[n, /\./g, " "], [q, I], [p, u]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [n, [q, P], [p, v]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [n, [q, P], [p, u]], [/smart-tv.+(samsung)/i], [q, [p, w]], [/hbbtv.+maple;(\d+)/i], [[n, /^/, "SmartTV"], [q, L], [p, w]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[q, "LG"], [p, w]], [/(apple) ?tv/i], [q, [n, A + " TV"], [p, w]], [/crkey/i], [[n, E + "cast"], [q, G], [p, w]], [/droid.+aft(\w)( bui|\))/i], [n, [q, z], [p, w]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [n, [q, M], [p, w]], [/(bravia[\w ]+)( bui|\))/i], [n, [q, N], [p, w]], [/(mitv-\w{5}) bui/i], [n, [q, O], [p, w]], [/Hbbtv.*(technisat) (.*);/i], [q, n, [p, w]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[q, X], [n, X], [p, w]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[p, w]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [q, n, [p, t]], [/droid.+; (shield) bui/i], [n, [q, "Nvidia"], [p, t]], [/(playstation [345portablevi]+)/i], [n, [q, N], [p, t]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [n, [q, I], [p, t]], [/((pebble))app/i], [q, n, [p, x]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [n, [q, A], [p, x]], [/droid.+; (glass) \d/i], [n, [q, G], [p, x]], [/droid.+; (wt63?0{2,3})\)/i], [n, [q, P], [p, x]], [/(quest( 2| pro)?)/i], [n, [q, Q], [p, x]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [q, [p, y]], [/(aeobc)\b/i], [n, [q, z], [p, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [n, [p, u]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [n, [p, v]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[p, v]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[p, u]], [/(android[-\w\. ]{0,9});.+buil/i], [n, [q, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [r, [o, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [r, [o, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [o, r], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [r, o]], os: [[/microsoft (windows) (vista|xp)/i], [o, r], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [o, [r, Z, $]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[o, "Windows"], [r, Z, $]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[r, /_/g, "."], [o, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[o, S], [r, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [r, o], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [o, r], [/\(bb(10);/i], [r, [o, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [r, [o, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [r, [o, F + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [r, [o, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [r, [o, "watchOS"]], [/crkey\/([\d\.]+)/i], [r, [o, E + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[o, R], r], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [o, r], [/(sunos) ?([\w\.\d]*)/i], [[o, "Solaris"], r], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [o, r]] }, aa = function(a2, b2) {
              if (typeof a2 === k && (b2 = a2, a2 = h), !(this instanceof aa)) return new aa(a2, b2).getResult();
              var c2 = typeof g2 !== j && g2.navigator ? g2.navigator : h, d2 = a2 || (c2 && c2.userAgent ? c2.userAgent : ""), e3 = c2 && c2.userAgentData ? c2.userAgentData : h, f3 = b2 ? T(_, b2) : _, t2 = c2 && c2.userAgent == d2;
              return this.getBrowser = function() {
                var a3, b3 = {};
                return b3[o] = h, b3[r] = h, Y.call(b3, d2, f3.browser), b3[m] = typeof (a3 = b3[r]) === l ? a3.replace(/[^\d\.]/g, "").split(".")[0] : h, t2 && c2 && c2.brave && typeof c2.brave.isBrave == i && (b3[o] = "Brave"), b3;
              }, this.getCPU = function() {
                var a3 = {};
                return a3[s] = h, Y.call(a3, d2, f3.cpu), a3;
              }, this.getDevice = function() {
                var a3 = {};
                return a3[q] = h, a3[n] = h, a3[p] = h, Y.call(a3, d2, f3.device), t2 && !a3[p] && e3 && e3.mobile && (a3[p] = u), t2 && "Macintosh" == a3[n] && c2 && typeof c2.standalone !== j && c2.maxTouchPoints && c2.maxTouchPoints > 2 && (a3[n] = "iPad", a3[p] = v), a3;
              }, this.getEngine = function() {
                var a3 = {};
                return a3[o] = h, a3[r] = h, Y.call(a3, d2, f3.engine), a3;
              }, this.getOS = function() {
                var a3 = {};
                return a3[o] = h, a3[r] = h, Y.call(a3, d2, f3.os), t2 && !a3[o] && e3 && "Unknown" != e3.platform && (a3[o] = e3.platform.replace(/chrome os/i, R).replace(/macos/i, S)), a3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return d2;
              }, this.setUA = function(a3) {
                return d2 = typeof a3 === l && a3.length > 350 ? X(a3, 350) : a3, this;
              }, this.setUA(d2), this;
            };
            aa.VERSION = "1.0.35", aa.BROWSER = U([o, r, m]), aa.CPU = U([s]), aa.DEVICE = U([n, q, p, t, u, w, v, x, y]), aa.ENGINE = aa.OS = U([o, r]), typeof f2 !== j ? (e2.exports && (f2 = e2.exports = aa), f2.UAParser = aa) : c.amdO ? void 0 === (d = function() {
              return aa;
            }.call(b, c, b, a)) || (a.exports = d) : typeof g2 !== j && (g2.UAParser = aa);
            var ab = typeof g2 !== j && (g2.jQuery || g2.Zepto);
            if (ab && !ab.ua) {
              var ac = new aa();
              ab.ua = ac.getResult(), ab.ua.get = function() {
                return ac.getUA();
              }, ab.ua.set = function(a2) {
                ac.setUA(a2);
                var b2 = ac.getResult();
                for (var c2 in b2) ab.ua[c2] = b2[c2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, f = {};
        function g(a2) {
          var b2 = f[a2];
          if (void 0 !== b2) return b2.exports;
          var c2 = f[a2] = { exports: {} }, d2 = true;
          try {
            e[a2].call(c2.exports, c2, c2.exports, g), d2 = false;
          } finally {
            d2 && delete f[a2];
          }
          return c2.exports;
        }
        g.ab = "//", a.exports = g(226);
      })();
    }, 515: (a, b, c) => {
      "use strict";
      c.d(b, { X: () => function a2(b2) {
        if ((0, g.p)(b2) || (0, f.C)(b2) || (0, i.h)(b2) || (0, h.I3)(b2) || "object" == typeof b2 && null !== b2 && b2.$$typeof === e || (0, d.Ts)(b2)) throw b2;
        b2 instanceof Error && "cause" in b2 && a2(b2.cause);
      } });
      var d = c(770);
      let e = Symbol.for("react.postpone");
      var f = c(340), g = c(747), h = c(107), i = c(159);
    }, 521: (a) => {
      "use strict";
      a.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 663: (a) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var b = {};
        (() => {
          b.parse = function(b2, c2) {
            if ("string" != typeof b2) throw TypeError("argument str must be a string");
            for (var e2 = {}, f = b2.split(d), g = (c2 || {}).decode || a2, h = 0; h < f.length; h++) {
              var i = f[h], j = i.indexOf("=");
              if (!(j < 0)) {
                var k = i.substr(0, j).trim(), l = i.substr(++j, i.length).trim();
                '"' == l[0] && (l = l.slice(1, -1)), void 0 == e2[k] && (e2[k] = function(a3, b3) {
                  try {
                    return b3(a3);
                  } catch (b4) {
                    return a3;
                  }
                }(l, g));
              }
            }
            return e2;
          }, b.serialize = function(a3, b2, d2) {
            var f = d2 || {}, g = f.encode || c;
            if ("function" != typeof g) throw TypeError("option encode is invalid");
            if (!e.test(a3)) throw TypeError("argument name is invalid");
            var h = g(b2);
            if (h && !e.test(h)) throw TypeError("argument val is invalid");
            var i = a3 + "=" + h;
            if (null != f.maxAge) {
              var j = f.maxAge - 0;
              if (isNaN(j) || !isFinite(j)) throw TypeError("option maxAge is invalid");
              i += "; Max-Age=" + Math.floor(j);
            }
            if (f.domain) {
              if (!e.test(f.domain)) throw TypeError("option domain is invalid");
              i += "; Domain=" + f.domain;
            }
            if (f.path) {
              if (!e.test(f.path)) throw TypeError("option path is invalid");
              i += "; Path=" + f.path;
            }
            if (f.expires) {
              if ("function" != typeof f.expires.toUTCString) throw TypeError("option expires is invalid");
              i += "; Expires=" + f.expires.toUTCString();
            }
            if (f.httpOnly && (i += "; HttpOnly"), f.secure && (i += "; Secure"), f.sameSite) switch ("string" == typeof f.sameSite ? f.sameSite.toLowerCase() : f.sameSite) {
              case true:
              case "strict":
                i += "; SameSite=Strict";
                break;
              case "lax":
                i += "; SameSite=Lax";
                break;
              case "none":
                i += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return i;
          };
          var a2 = decodeURIComponent, c = encodeURIComponent, d = /; */, e = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), a.exports = b;
      })();
    }, 720: (a, b, c) => {
      "use strict";
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { interceptTestApis: function() {
        return f;
      }, wrapRequestHandler: function() {
        return g;
      } });
      let d = c(392), e = c(165);
      function f() {
        return (0, e.interceptFetch)(c.g.fetch);
      }
      function g(a2) {
        return (b2, c2) => (0, d.withRequest)(b2, e.reader, () => a2(b2, c2));
      }
    }, 747: (a, b, c) => {
      "use strict";
      c.d(b, { p: () => f });
      var d = c(66), e = c(944);
      function f(a2) {
        return (0, e.nJ)(a2) || (0, d.RM)(a2);
      }
    }, 770: (a, b, c) => {
      "use strict";
      function d(a2) {
        return "object" == typeof a2 && null !== a2 && "digest" in a2 && a2.digest === e;
      }
      c.d(b, { Ts: () => d, W5: () => h });
      let e = "HANGING_PROMISE_REJECTION";
      class f extends Error {
        constructor(a2, b2) {
          super(`During prerendering, ${b2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${b2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${a2}".`), this.route = a2, this.expression = b2, this.digest = e;
        }
      }
      let g = /* @__PURE__ */ new WeakMap();
      function h(a2, b2, c2) {
        if (a2.aborted) return Promise.reject(new f(b2, c2));
        {
          let d2 = new Promise((d3, e2) => {
            let h2 = e2.bind(null, new f(b2, c2)), i2 = g.get(a2);
            if (i2) i2.push(h2);
            else {
              let b3 = [h2];
              g.set(a2, b3), a2.addEventListener("abort", () => {
                for (let a3 = 0; a3 < b3.length; a3++) b3[a3]();
              }, { once: true });
            }
          });
          return d2.catch(i), d2;
        }
      }
      function i() {
      }
    }, 794: (a, b, c) => {
      "use strict";
      let d, e, f, g, h, i;
      c.r(b), c.d(b, { default: () => iI });
      var j, k = {};
      c.r(k), c.d(k, { q: () => d1, l: () => d4 });
      var l = {};
      async function m() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      c.r(l), c.d(l, { config: () => iE, middleware: () => iB });
      let n = null;
      async function o() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        n || (n = m());
        let a10 = await n;
        if (null == a10 ? void 0 : a10.register) try {
          await a10.register();
        } catch (a11) {
          throw a11.message = `An error occurred while loading instrumentation hook: ${a11.message}`, a11;
        }
      }
      async function p(...a10) {
        let b10 = await m();
        try {
          var c10;
          await (null == b10 || null == (c10 = b10.onRequestError) ? void 0 : c10.call(b10, ...a10));
        } catch (a11) {
          console.error("Error in instrumentation.onRequestError:", a11);
        }
      }
      let q = null;
      function r() {
        return q || (q = o()), q;
      }
      function s(a10) {
        return `The edge runtime does not support Node.js '${a10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== c.g.process && (process.env = c.g.process.env, c.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(a10) {
          let b10 = new Proxy(function() {
          }, { get(b11, c10) {
            if ("then" === c10) return {};
            throw Object.defineProperty(Error(s(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(s(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(c10, d10, e10) {
            if ("function" == typeof e10[0]) return e10[0](b10);
            throw Object.defineProperty(Error(s(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => b10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      r();
      class t extends Error {
        constructor({ page: a10 }) {
          super(`The middleware "${a10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class u extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class v extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let w = "_N_T_", x = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function y(a10) {
        var b10, c10, d10, e10, f10, g10 = [], h10 = 0;
        function i2() {
          for (; h10 < a10.length && /\s/.test(a10.charAt(h10)); ) h10 += 1;
          return h10 < a10.length;
        }
        for (; h10 < a10.length; ) {
          for (b10 = h10, f10 = false; i2(); ) if ("," === (c10 = a10.charAt(h10))) {
            for (d10 = h10, h10 += 1, i2(), e10 = h10; h10 < a10.length && "=" !== (c10 = a10.charAt(h10)) && ";" !== c10 && "," !== c10; ) h10 += 1;
            h10 < a10.length && "=" === a10.charAt(h10) ? (f10 = true, h10 = e10, g10.push(a10.substring(b10, d10)), b10 = h10) : h10 = d10 + 1;
          } else h10 += 1;
          (!f10 || h10 >= a10.length) && g10.push(a10.substring(b10, a10.length));
        }
        return g10;
      }
      function z(a10) {
        let b10 = {}, c10 = [];
        if (a10) for (let [d10, e10] of a10.entries()) "set-cookie" === d10.toLowerCase() ? (c10.push(...y(e10)), b10[d10] = 1 === c10.length ? c10[0] : c10) : b10[d10] = e10;
        return b10;
      }
      function A(a10) {
        try {
          return String(new URL(String(a10)));
        } catch (b10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(a10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: b10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...x, GROUP: { builtinReact: [x.reactServerComponents, x.actionBrowser], serverOnly: [x.reactServerComponents, x.actionBrowser, x.instrument, x.middleware], neutralTarget: [x.apiNode, x.apiEdge], clientOnly: [x.serverSideRendering, x.appPagesBrowser], bundled: [x.reactServerComponents, x.actionBrowser, x.serverSideRendering, x.appPagesBrowser, x.shared, x.instrument, x.middleware], appPages: [x.reactServerComponents, x.serverSideRendering, x.appPagesBrowser, x.actionBrowser] } });
      let B = Symbol("response"), C = Symbol("passThrough"), D = Symbol("waitUntil");
      class E {
        constructor(a10, b10) {
          this[C] = false, this[D] = b10 ? { kind: "external", function: b10 } : { kind: "internal", promises: [] };
        }
        respondWith(a10) {
          this[B] || (this[B] = Promise.resolve(a10));
        }
        passThroughOnException() {
          this[C] = true;
        }
        waitUntil(a10) {
          if ("external" === this[D].kind) return (0, this[D].function)(a10);
          this[D].promises.push(a10);
        }
      }
      class F extends E {
        constructor(a10) {
          var b10;
          super(a10.request, null == (b10 = a10.context) ? void 0 : b10.waitUntil), this.sourcePage = a10.page;
        }
        get request() {
          throw Object.defineProperty(new t({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new t({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function G(a10) {
        return a10.replace(/\/$/, "") || "/";
      }
      function H(a10) {
        let b10 = a10.indexOf("#"), c10 = a10.indexOf("?"), d10 = c10 > -1 && (b10 < 0 || c10 < b10);
        return d10 || b10 > -1 ? { pathname: a10.substring(0, d10 ? c10 : b10), query: d10 ? a10.substring(c10, b10 > -1 ? b10 : void 0) : "", hash: b10 > -1 ? a10.slice(b10) : "" } : { pathname: a10, query: "", hash: "" };
      }
      function I(a10, b10) {
        if (!a10.startsWith("/") || !b10) return a10;
        let { pathname: c10, query: d10, hash: e10 } = H(a10);
        return "" + b10 + c10 + d10 + e10;
      }
      function J(a10, b10) {
        if (!a10.startsWith("/") || !b10) return a10;
        let { pathname: c10, query: d10, hash: e10 } = H(a10);
        return "" + c10 + b10 + d10 + e10;
      }
      function K(a10, b10) {
        if ("string" != typeof a10) return false;
        let { pathname: c10 } = H(a10);
        return c10 === b10 || c10.startsWith(b10 + "/");
      }
      let L = /* @__PURE__ */ new WeakMap();
      function M(a10, b10) {
        let c10;
        if (!b10) return { pathname: a10 };
        let d10 = L.get(b10);
        d10 || (d10 = b10.map((a11) => a11.toLowerCase()), L.set(b10, d10));
        let e10 = a10.split("/", 2);
        if (!e10[1]) return { pathname: a10 };
        let f10 = e10[1].toLowerCase(), g10 = d10.indexOf(f10);
        return g10 < 0 ? { pathname: a10 } : (c10 = b10[g10], { pathname: a10 = a10.slice(c10.length + 1) || "/", detectedLocale: c10 });
      }
      let N = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function O(a10, b10) {
        return new URL(String(a10).replace(N, "localhost"), b10 && String(b10).replace(N, "localhost"));
      }
      let P = Symbol("NextURLInternal");
      class Q {
        constructor(a10, b10, c10) {
          let d10, e10;
          "object" == typeof b10 && "pathname" in b10 || "string" == typeof b10 ? (d10 = b10, e10 = c10 || {}) : e10 = c10 || b10 || {}, this[P] = { url: O(a10, d10 ?? e10.base), options: e10, basePath: "" }, this.analyze();
        }
        analyze() {
          var a10, b10, c10, d10, e10;
          let f10 = function(a11, b11) {
            var c11, d11;
            let { basePath: e11, i18n: f11, trailingSlash: g11 } = null != (c11 = b11.nextConfig) ? c11 : {}, h11 = { pathname: a11, trailingSlash: "/" !== a11 ? a11.endsWith("/") : g11 };
            e11 && K(h11.pathname, e11) && (h11.pathname = function(a12, b12) {
              if (!K(a12, b12)) return a12;
              let c12 = a12.slice(b12.length);
              return c12.startsWith("/") ? c12 : "/" + c12;
            }(h11.pathname, e11), h11.basePath = e11);
            let i2 = h11.pathname;
            if (h11.pathname.startsWith("/_next/data/") && h11.pathname.endsWith(".json")) {
              let a12 = h11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              h11.buildId = a12[0], i2 = "index" !== a12[1] ? "/" + a12.slice(1).join("/") : "/", true === b11.parseData && (h11.pathname = i2);
            }
            if (f11) {
              let a12 = b11.i18nProvider ? b11.i18nProvider.analyze(h11.pathname) : M(h11.pathname, f11.locales);
              h11.locale = a12.detectedLocale, h11.pathname = null != (d11 = a12.pathname) ? d11 : h11.pathname, !a12.detectedLocale && h11.buildId && (a12 = b11.i18nProvider ? b11.i18nProvider.analyze(i2) : M(i2, f11.locales)).detectedLocale && (h11.locale = a12.detectedLocale);
            }
            return h11;
          }(this[P].url.pathname, { nextConfig: this[P].options.nextConfig, parseData: true, i18nProvider: this[P].options.i18nProvider }), g10 = function(a11, b11) {
            let c11;
            if ((null == b11 ? void 0 : b11.host) && !Array.isArray(b11.host)) c11 = b11.host.toString().split(":", 1)[0];
            else {
              if (!a11.hostname) return;
              c11 = a11.hostname;
            }
            return c11.toLowerCase();
          }(this[P].url, this[P].options.headers);
          this[P].domainLocale = this[P].options.i18nProvider ? this[P].options.i18nProvider.detectDomainLocale(g10) : function(a11, b11, c11) {
            if (a11) for (let f11 of (c11 && (c11 = c11.toLowerCase()), a11)) {
              var d11, e11;
              if (b11 === (null == (d11 = f11.domain) ? void 0 : d11.split(":", 1)[0].toLowerCase()) || c11 === f11.defaultLocale.toLowerCase() || (null == (e11 = f11.locales) ? void 0 : e11.some((a12) => a12.toLowerCase() === c11))) return f11;
            }
          }(null == (b10 = this[P].options.nextConfig) || null == (a10 = b10.i18n) ? void 0 : a10.domains, g10);
          let h10 = (null == (c10 = this[P].domainLocale) ? void 0 : c10.defaultLocale) || (null == (e10 = this[P].options.nextConfig) || null == (d10 = e10.i18n) ? void 0 : d10.defaultLocale);
          this[P].url.pathname = f10.pathname, this[P].defaultLocale = h10, this[P].basePath = f10.basePath ?? "", this[P].buildId = f10.buildId, this[P].locale = f10.locale ?? h10, this[P].trailingSlash = f10.trailingSlash;
        }
        formatPathname() {
          var a10;
          let b10;
          return b10 = function(a11, b11, c10, d10) {
            if (!b11 || b11 === c10) return a11;
            let e10 = a11.toLowerCase();
            return !d10 && (K(e10, "/api") || K(e10, "/" + b11.toLowerCase())) ? a11 : I(a11, "/" + b11);
          }((a10 = { basePath: this[P].basePath, buildId: this[P].buildId, defaultLocale: this[P].options.forceLocale ? void 0 : this[P].defaultLocale, locale: this[P].locale, pathname: this[P].url.pathname, trailingSlash: this[P].trailingSlash }).pathname, a10.locale, a10.buildId ? void 0 : a10.defaultLocale, a10.ignorePrefix), (a10.buildId || !a10.trailingSlash) && (b10 = G(b10)), a10.buildId && (b10 = J(I(b10, "/_next/data/" + a10.buildId), "/" === a10.pathname ? "index.json" : ".json")), b10 = I(b10, a10.basePath), !a10.buildId && a10.trailingSlash ? b10.endsWith("/") ? b10 : J(b10, "/") : G(b10);
        }
        formatSearch() {
          return this[P].url.search;
        }
        get buildId() {
          return this[P].buildId;
        }
        set buildId(a10) {
          this[P].buildId = a10;
        }
        get locale() {
          return this[P].locale ?? "";
        }
        set locale(a10) {
          var b10, c10;
          if (!this[P].locale || !(null == (c10 = this[P].options.nextConfig) || null == (b10 = c10.i18n) ? void 0 : b10.locales.includes(a10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${a10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[P].locale = a10;
        }
        get defaultLocale() {
          return this[P].defaultLocale;
        }
        get domainLocale() {
          return this[P].domainLocale;
        }
        get searchParams() {
          return this[P].url.searchParams;
        }
        get host() {
          return this[P].url.host;
        }
        set host(a10) {
          this[P].url.host = a10;
        }
        get hostname() {
          return this[P].url.hostname;
        }
        set hostname(a10) {
          this[P].url.hostname = a10;
        }
        get port() {
          return this[P].url.port;
        }
        set port(a10) {
          this[P].url.port = a10;
        }
        get protocol() {
          return this[P].url.protocol;
        }
        set protocol(a10) {
          this[P].url.protocol = a10;
        }
        get href() {
          let a10 = this.formatPathname(), b10 = this.formatSearch();
          return `${this.protocol}//${this.host}${a10}${b10}${this.hash}`;
        }
        set href(a10) {
          this[P].url = O(a10), this.analyze();
        }
        get origin() {
          return this[P].url.origin;
        }
        get pathname() {
          return this[P].url.pathname;
        }
        set pathname(a10) {
          this[P].url.pathname = a10;
        }
        get hash() {
          return this[P].url.hash;
        }
        set hash(a10) {
          this[P].url.hash = a10;
        }
        get search() {
          return this[P].url.search;
        }
        set search(a10) {
          this[P].url.search = a10;
        }
        get password() {
          return this[P].url.password;
        }
        set password(a10) {
          this[P].url.password = a10;
        }
        get username() {
          return this[P].url.username;
        }
        set username(a10) {
          this[P].url.username = a10;
        }
        get basePath() {
          return this[P].basePath;
        }
        set basePath(a10) {
          this[P].basePath = a10.startsWith("/") ? a10 : `/${a10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new Q(String(this), this[P].options);
        }
      }
      var R = c(443);
      let S = Symbol("internal request");
      class T extends Request {
        constructor(a10, b10 = {}) {
          let c10 = "string" != typeof a10 && "url" in a10 ? a10.url : String(a10);
          A(c10), a10 instanceof Request ? super(a10, b10) : super(c10, b10);
          let d10 = new Q(c10, { headers: z(this.headers), nextConfig: b10.nextConfig });
          this[S] = { cookies: new R.RequestCookies(this.headers), nextUrl: d10, url: d10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[S].cookies;
        }
        get nextUrl() {
          return this[S].nextUrl;
        }
        get page() {
          throw new u();
        }
        get ua() {
          throw new v();
        }
        get url() {
          return this[S].url;
        }
      }
      class U {
        static get(a10, b10, c10) {
          let d10 = Reflect.get(a10, b10, c10);
          return "function" == typeof d10 ? d10.bind(a10) : d10;
        }
        static set(a10, b10, c10, d10) {
          return Reflect.set(a10, b10, c10, d10);
        }
        static has(a10, b10) {
          return Reflect.has(a10, b10);
        }
        static deleteProperty(a10, b10) {
          return Reflect.deleteProperty(a10, b10);
        }
      }
      let V = Symbol("internal response"), W = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function X(a10, b10) {
        var c10;
        if (null == a10 || null == (c10 = a10.request) ? void 0 : c10.headers) {
          if (!(a10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let c11 = [];
          for (let [d10, e10] of a10.request.headers) b10.set("x-middleware-request-" + d10, e10), c11.push(d10);
          b10.set("x-middleware-override-headers", c11.join(","));
        }
      }
      class Y extends Response {
        constructor(a10, b10 = {}) {
          super(a10, b10);
          let c10 = this.headers, d10 = new Proxy(new R.ResponseCookies(c10), { get(a11, d11, e10) {
            switch (d11) {
              case "delete":
              case "set":
                return (...e11) => {
                  let f10 = Reflect.apply(a11[d11], a11, e11), g10 = new Headers(c10);
                  return f10 instanceof R.ResponseCookies && c10.set("x-middleware-set-cookie", f10.getAll().map((a12) => (0, R.stringifyCookie)(a12)).join(",")), X(b10, g10), f10;
                };
              default:
                return U.get(a11, d11, e10);
            }
          } });
          this[V] = { cookies: d10, url: b10.url ? new Q(b10.url, { headers: z(c10), nextConfig: b10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[V].cookies;
        }
        static json(a10, b10) {
          let c10 = Response.json(a10, b10);
          return new Y(c10.body, c10);
        }
        static redirect(a10, b10) {
          let c10 = "number" == typeof b10 ? b10 : (null == b10 ? void 0 : b10.status) ?? 307;
          if (!W.has(c10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let d10 = "object" == typeof b10 ? b10 : {}, e10 = new Headers(null == d10 ? void 0 : d10.headers);
          return e10.set("Location", A(a10)), new Y(null, { ...d10, headers: e10, status: c10 });
        }
        static rewrite(a10, b10) {
          let c10 = new Headers(null == b10 ? void 0 : b10.headers);
          return c10.set("x-middleware-rewrite", A(a10)), X(b10, c10), new Y(null, { ...b10, headers: c10 });
        }
        static next(a10) {
          let b10 = new Headers(null == a10 ? void 0 : a10.headers);
          return b10.set("x-middleware-next", "1"), X(a10, b10), new Y(null, { ...a10, headers: b10 });
        }
      }
      function Z(a10, b10) {
        let c10 = "string" == typeof b10 ? new URL(b10) : b10, d10 = new URL(a10, b10), e10 = d10.origin === c10.origin;
        return { url: e10 ? d10.toString().slice(c10.origin.length) : d10.toString(), isRelative: e10 };
      }
      let $ = "next-router-prefetch", _ = ["rsc", "next-router-state-tree", $, "next-hmr-refresh", "next-router-segment-prefetch"], aa = "_rsc";
      class ab extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new ab();
        }
      }
      class ac extends Headers {
        constructor(a10) {
          super(), this.headers = new Proxy(a10, { get(b10, c10, d10) {
            if ("symbol" == typeof c10) return U.get(b10, c10, d10);
            let e10 = c10.toLowerCase(), f10 = Object.keys(a10).find((a11) => a11.toLowerCase() === e10);
            if (void 0 !== f10) return U.get(b10, f10, d10);
          }, set(b10, c10, d10, e10) {
            if ("symbol" == typeof c10) return U.set(b10, c10, d10, e10);
            let f10 = c10.toLowerCase(), g10 = Object.keys(a10).find((a11) => a11.toLowerCase() === f10);
            return U.set(b10, g10 ?? c10, d10, e10);
          }, has(b10, c10) {
            if ("symbol" == typeof c10) return U.has(b10, c10);
            let d10 = c10.toLowerCase(), e10 = Object.keys(a10).find((a11) => a11.toLowerCase() === d10);
            return void 0 !== e10 && U.has(b10, e10);
          }, deleteProperty(b10, c10) {
            if ("symbol" == typeof c10) return U.deleteProperty(b10, c10);
            let d10 = c10.toLowerCase(), e10 = Object.keys(a10).find((a11) => a11.toLowerCase() === d10);
            return void 0 === e10 || U.deleteProperty(b10, e10);
          } });
        }
        static seal(a10) {
          return new Proxy(a10, { get(a11, b10, c10) {
            switch (b10) {
              case "append":
              case "delete":
              case "set":
                return ab.callable;
              default:
                return U.get(a11, b10, c10);
            }
          } });
        }
        merge(a10) {
          return Array.isArray(a10) ? a10.join(", ") : a10;
        }
        static from(a10) {
          return a10 instanceof Headers ? a10 : new ac(a10);
        }
        append(a10, b10) {
          let c10 = this.headers[a10];
          "string" == typeof c10 ? this.headers[a10] = [c10, b10] : Array.isArray(c10) ? c10.push(b10) : this.headers[a10] = b10;
        }
        delete(a10) {
          delete this.headers[a10];
        }
        get(a10) {
          let b10 = this.headers[a10];
          return void 0 !== b10 ? this.merge(b10) : null;
        }
        has(a10) {
          return void 0 !== this.headers[a10];
        }
        set(a10, b10) {
          this.headers[a10] = b10;
        }
        forEach(a10, b10) {
          for (let [c10, d10] of this.entries()) a10.call(b10, d10, c10, this);
        }
        *entries() {
          for (let a10 of Object.keys(this.headers)) {
            let b10 = a10.toLowerCase(), c10 = this.get(b10);
            yield [b10, c10];
          }
        }
        *keys() {
          for (let a10 of Object.keys(this.headers)) {
            let b10 = a10.toLowerCase();
            yield b10;
          }
        }
        *values() {
          for (let a10 of Object.keys(this.headers)) {
            let b10 = this.get(a10);
            yield b10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var ad = c(379);
      class ae extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new ae();
        }
      }
      class af {
        static seal(a10) {
          return new Proxy(a10, { get(a11, b10, c10) {
            switch (b10) {
              case "clear":
              case "delete":
              case "set":
                return ae.callable;
              default:
                return U.get(a11, b10, c10);
            }
          } });
        }
      }
      let ag = Symbol.for("next.mutated.cookies");
      class ah {
        static wrap(a10, b10) {
          let c10 = new R.ResponseCookies(new Headers());
          for (let b11 of a10.getAll()) c10.set(b11);
          let d10 = [], e10 = /* @__PURE__ */ new Set(), f10 = () => {
            let a11 = ad.J.getStore();
            if (a11 && (a11.pathWasRevalidated = true), d10 = c10.getAll().filter((a12) => e10.has(a12.name)), b10) {
              let a12 = [];
              for (let b11 of d10) {
                let c11 = new R.ResponseCookies(new Headers());
                c11.set(b11), a12.push(c11.toString());
              }
              b10(a12);
            }
          }, g10 = new Proxy(c10, { get(a11, b11, c11) {
            switch (b11) {
              case ag:
                return d10;
              case "delete":
                return function(...b12) {
                  e10.add("string" == typeof b12[0] ? b12[0] : b12[0].name);
                  try {
                    return a11.delete(...b12), g10;
                  } finally {
                    f10();
                  }
                };
              case "set":
                return function(...b12) {
                  e10.add("string" == typeof b12[0] ? b12[0] : b12[0].name);
                  try {
                    return a11.set(...b12), g10;
                  } finally {
                    f10();
                  }
                };
              default:
                return U.get(a11, b11, c11);
            }
          } });
          return g10;
        }
      }
      function ai(a10) {
        return "action" === a10.phase;
      }
      function aj(a10, b10) {
        if (!ai(a10)) throw new ae();
      }
      var ak = function(a10) {
        return a10.handleRequest = "BaseServer.handleRequest", a10.run = "BaseServer.run", a10.pipe = "BaseServer.pipe", a10.getStaticHTML = "BaseServer.getStaticHTML", a10.render = "BaseServer.render", a10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", a10.renderToResponse = "BaseServer.renderToResponse", a10.renderToHTML = "BaseServer.renderToHTML", a10.renderError = "BaseServer.renderError", a10.renderErrorToResponse = "BaseServer.renderErrorToResponse", a10.renderErrorToHTML = "BaseServer.renderErrorToHTML", a10.render404 = "BaseServer.render404", a10;
      }(ak || {}), al = function(a10) {
        return a10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", a10.loadComponents = "LoadComponents.loadComponents", a10;
      }(al || {}), am = function(a10) {
        return a10.getRequestHandler = "NextServer.getRequestHandler", a10.getServer = "NextServer.getServer", a10.getServerRequestHandler = "NextServer.getServerRequestHandler", a10.createServer = "createServer.createServer", a10;
      }(am || {}), an = function(a10) {
        return a10.compression = "NextNodeServer.compression", a10.getBuildId = "NextNodeServer.getBuildId", a10.createComponentTree = "NextNodeServer.createComponentTree", a10.clientComponentLoading = "NextNodeServer.clientComponentLoading", a10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", a10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", a10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", a10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", a10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", a10.sendRenderResult = "NextNodeServer.sendRenderResult", a10.proxyRequest = "NextNodeServer.proxyRequest", a10.runApi = "NextNodeServer.runApi", a10.render = "NextNodeServer.render", a10.renderHTML = "NextNodeServer.renderHTML", a10.imageOptimizer = "NextNodeServer.imageOptimizer", a10.getPagePath = "NextNodeServer.getPagePath", a10.getRoutesManifest = "NextNodeServer.getRoutesManifest", a10.findPageComponents = "NextNodeServer.findPageComponents", a10.getFontManifest = "NextNodeServer.getFontManifest", a10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", a10.getRequestHandler = "NextNodeServer.getRequestHandler", a10.renderToHTML = "NextNodeServer.renderToHTML", a10.renderError = "NextNodeServer.renderError", a10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", a10.render404 = "NextNodeServer.render404", a10.startResponse = "NextNodeServer.startResponse", a10.route = "route", a10.onProxyReq = "onProxyReq", a10.apiResolver = "apiResolver", a10.internalFetch = "internalFetch", a10;
      }(an || {}), ao = function(a10) {
        return a10.startServer = "startServer.startServer", a10;
      }(ao || {}), ap = function(a10) {
        return a10.getServerSideProps = "Render.getServerSideProps", a10.getStaticProps = "Render.getStaticProps", a10.renderToString = "Render.renderToString", a10.renderDocument = "Render.renderDocument", a10.createBodyResult = "Render.createBodyResult", a10;
      }(ap || {}), aq = function(a10) {
        return a10.renderToString = "AppRender.renderToString", a10.renderToReadableStream = "AppRender.renderToReadableStream", a10.getBodyResult = "AppRender.getBodyResult", a10.fetch = "AppRender.fetch", a10;
      }(aq || {}), ar = function(a10) {
        return a10.executeRoute = "Router.executeRoute", a10;
      }(ar || {}), as = function(a10) {
        return a10.runHandler = "Node.runHandler", a10;
      }(as || {}), at = function(a10) {
        return a10.runHandler = "AppRouteRouteHandlers.runHandler", a10;
      }(at || {}), au = function(a10) {
        return a10.generateMetadata = "ResolveMetadata.generateMetadata", a10.generateViewport = "ResolveMetadata.generateViewport", a10;
      }(au || {}), av = function(a10) {
        return a10.execute = "Middleware.execute", a10;
      }(av || {});
      let aw = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), ax = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function ay(a10) {
        return null !== a10 && "object" == typeof a10 && "then" in a10 && "function" == typeof a10.then;
      }
      let az = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: aA, propagation: aB, trace: aC, SpanStatusCode: aD, SpanKind: aE, ROOT_CONTEXT: aF } = d = c(817);
      class aG extends Error {
        constructor(a10, b10) {
          super(), this.bubble = a10, this.result = b10;
        }
      }
      let aH = (a10, b10) => {
        (function(a11) {
          return "object" == typeof a11 && null !== a11 && a11 instanceof aG;
        })(b10) && b10.bubble ? a10.setAttribute("next.bubble", true) : (b10 && (a10.recordException(b10), a10.setAttribute("error.type", b10.name)), a10.setStatus({ code: aD.ERROR, message: null == b10 ? void 0 : b10.message })), a10.end();
      }, aI = /* @__PURE__ */ new Map(), aJ = d.createContextKey("next.rootSpanId"), aK = 0, aL = { set(a10, b10, c10) {
        a10.push({ key: b10, value: c10 });
      } };
      class aM {
        getTracerInstance() {
          return aC.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return aA;
        }
        getTracePropagationData() {
          let a10 = aA.active(), b10 = [];
          return aB.inject(a10, b10, aL), b10;
        }
        getActiveScopeSpan() {
          return aC.getSpan(null == aA ? void 0 : aA.active());
        }
        withPropagatedContext(a10, b10, c10) {
          let d10 = aA.active();
          if (aC.getSpanContext(d10)) return b10();
          let e10 = aB.extract(d10, a10, c10);
          return aA.with(e10, b10);
        }
        trace(...a10) {
          var b10;
          let [c10, d10, e10] = a10, { fn: f10, options: g10 } = "function" == typeof d10 ? { fn: d10, options: {} } : { fn: e10, options: { ...d10 } }, h10 = g10.spanName ?? c10;
          if (!aw.has(c10) && "1" !== process.env.NEXT_OTEL_VERBOSE || g10.hideSpan) return f10();
          let i2 = this.getSpanContext((null == g10 ? void 0 : g10.parentSpan) ?? this.getActiveScopeSpan()), j2 = false;
          i2 ? (null == (b10 = aC.getSpanContext(i2)) ? void 0 : b10.isRemote) && (j2 = true) : (i2 = (null == aA ? void 0 : aA.active()) ?? aF, j2 = true);
          let k2 = aK++;
          return g10.attributes = { "next.span_name": h10, "next.span_type": c10, ...g10.attributes }, aA.with(i2.setValue(aJ, k2), () => this.getTracerInstance().startActiveSpan(h10, g10, (a11) => {
            let b11;
            az && c10 && ax.has(c10) && (b11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let d11 = false, e11 = () => {
              !d11 && (d11 = true, aI.delete(k2), b11 && performance.measure(`${az}:next-${(c10.split(".").pop() || "").replace(/[A-Z]/g, (a12) => "-" + a12.toLowerCase())}`, { start: b11, end: performance.now() }));
            };
            if (j2 && aI.set(k2, new Map(Object.entries(g10.attributes ?? {}))), f10.length > 1) try {
              return f10(a11, (b12) => aH(a11, b12));
            } catch (b12) {
              throw aH(a11, b12), b12;
            } finally {
              e11();
            }
            try {
              let b12 = f10(a11);
              if (ay(b12)) return b12.then((b13) => (a11.end(), b13)).catch((b13) => {
                throw aH(a11, b13), b13;
              }).finally(e11);
              return a11.end(), e11(), b12;
            } catch (b12) {
              throw aH(a11, b12), e11(), b12;
            }
          }));
        }
        wrap(...a10) {
          let b10 = this, [c10, d10, e10] = 3 === a10.length ? a10 : [a10[0], {}, a10[1]];
          return aw.has(c10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let a11 = d10;
            "function" == typeof a11 && "function" == typeof e10 && (a11 = a11.apply(this, arguments));
            let f10 = arguments.length - 1, g10 = arguments[f10];
            if ("function" != typeof g10) return b10.trace(c10, a11, () => e10.apply(this, arguments));
            {
              let d11 = b10.getContext().bind(aA.active(), g10);
              return b10.trace(c10, a11, (a12, b11) => (arguments[f10] = function(a13) {
                return null == b11 || b11(a13), d11.apply(this, arguments);
              }, e10.apply(this, arguments)));
            }
          } : e10;
        }
        startSpan(...a10) {
          let [b10, c10] = a10, d10 = this.getSpanContext((null == c10 ? void 0 : c10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(b10, c10, d10);
        }
        getSpanContext(a10) {
          return a10 ? aC.setSpan(aA.active(), a10) : void 0;
        }
        getRootSpanAttributes() {
          let a10 = aA.active().getValue(aJ);
          return aI.get(a10);
        }
        setRootSpanAttribute(a10, b10) {
          let c10 = aA.active().getValue(aJ), d10 = aI.get(c10);
          d10 && d10.set(a10, b10);
        }
      }
      let aN = (() => {
        let a10 = new aM();
        return () => a10;
      })(), aO = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(aO);
      class aP {
        constructor(a10, b10, c10, d10) {
          var e10;
          let f10 = a10 && function(a11, b11) {
            let c11 = ac.from(a11.headers);
            return { isOnDemandRevalidate: c11.get("x-prerender-revalidate") === b11.previewModeId, revalidateOnlyGenerated: c11.has("x-prerender-revalidate-if-generated") };
          }(b10, a10).isOnDemandRevalidate, g10 = null == (e10 = c10.get(aO)) ? void 0 : e10.value;
          this._isEnabled = !!(!f10 && g10 && a10 && g10 === a10.previewModeId), this._previewModeId = null == a10 ? void 0 : a10.previewModeId, this._mutableCookies = d10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: aO, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: aO, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function aQ(a10, b10) {
        if ("x-middleware-set-cookie" in a10.headers && "string" == typeof a10.headers["x-middleware-set-cookie"]) {
          let c10 = a10.headers["x-middleware-set-cookie"], d10 = new Headers();
          for (let a11 of y(c10)) d10.append("set-cookie", a11);
          for (let a11 of new R.ResponseCookies(d10).getAll()) b10.set(a11);
        }
      }
      var aR = c(128), aS = c(213), aT = c.n(aS), aU = c(809);
      class aV {
        constructor(a10, b10, c10) {
          this.prev = null, this.next = null, this.key = a10, this.data = b10, this.size = c10;
        }
      }
      class aW {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class aX {
        constructor(a10, b10, c10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = a10, this.calculateSize = b10, this.onEvict = c10, this.head = new aW(), this.tail = new aW(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(a10) {
          a10.prev = this.head, a10.next = this.head.next, this.head.next.prev = a10, this.head.next = a10;
        }
        removeNode(a10) {
          a10.prev.next = a10.next, a10.next.prev = a10.prev;
        }
        moveToHead(a10) {
          this.removeNode(a10), this.addToHead(a10);
        }
        removeTail() {
          let a10 = this.tail.prev;
          return this.removeNode(a10), a10;
        }
        set(a10, b10) {
          let c10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, b10)) ?? 1;
          if (c10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${c10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E789", enumerable: false, configurable: true });
          if (c10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let d10 = this.cache.get(a10);
          if (d10) d10.data = b10, this.totalSize = this.totalSize - d10.size + c10, d10.size = c10, this.moveToHead(d10);
          else {
            let d11 = new aV(a10, b10, c10);
            this.cache.set(a10, d11), this.addToHead(d11), this.totalSize += c10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let a11 = this.removeTail();
            this.cache.delete(a11.key), this.totalSize -= a11.size, null == this.onEvict || this.onEvict.call(this, a11.key, a11.data);
          }
          return true;
        }
        has(a10) {
          return this.cache.has(a10);
        }
        get(a10) {
          let b10 = this.cache.get(a10);
          if (b10) return this.moveToHead(b10), b10.data;
        }
        *[Symbol.iterator]() {
          let a10 = this.head.next;
          for (; a10 && a10 !== this.tail; ) {
            let b10 = a10;
            yield [b10.key, b10.data], a10 = a10.next;
          }
        }
        remove(a10) {
          let b10 = this.cache.get(a10);
          b10 && (this.removeNode(b10), this.cache.delete(a10), this.totalSize -= b10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      c(356).Buffer, new aX(52428800, (a10) => a10.size), process.env.NEXT_PRIVATE_DEBUG_CACHE && console.debug.bind(console, "DefaultCacheHandler:"), process.env.NEXT_PRIVATE_DEBUG_CACHE && ((a10, ...b10) => {
        console.log(`use-cache: ${a10}`, ...b10);
      }), Symbol.for("@next/cache-handlers");
      let aY = Symbol.for("@next/cache-handlers-map"), aZ = Symbol.for("@next/cache-handlers-set"), a$ = globalThis;
      function a_() {
        if (a$[aY]) return a$[aY].entries();
      }
      async function a0(a10, b10) {
        if (!a10) return b10();
        let c10 = a1(a10);
        try {
          return await b10();
        } finally {
          let b11 = function(a11, b12) {
            let c11 = new Set(a11.pendingRevalidatedTags), d10 = new Set(a11.pendingRevalidateWrites);
            return { pendingRevalidatedTags: b12.pendingRevalidatedTags.filter((a12) => !c11.has(a12)), pendingRevalidates: Object.fromEntries(Object.entries(b12.pendingRevalidates).filter(([b13]) => !(b13 in a11.pendingRevalidates))), pendingRevalidateWrites: b12.pendingRevalidateWrites.filter((a12) => !d10.has(a12)) };
          }(c10, a1(a10));
          await a3(a10, b11);
        }
      }
      function a1(a10) {
        return { pendingRevalidatedTags: a10.pendingRevalidatedTags ? [...a10.pendingRevalidatedTags] : [], pendingRevalidates: { ...a10.pendingRevalidates }, pendingRevalidateWrites: a10.pendingRevalidateWrites ? [...a10.pendingRevalidateWrites] : [] };
      }
      async function a2(a10, b10) {
        if (0 === a10.length) return;
        let c10 = [];
        b10 && c10.push(b10.revalidateTag(a10));
        let d10 = function() {
          if (a$[aZ]) return a$[aZ].values();
        }();
        if (d10) for (let b11 of d10) c10.push(b11.expireTags(...a10));
        await Promise.all(c10);
      }
      async function a3(a10, b10) {
        let c10 = (null == b10 ? void 0 : b10.pendingRevalidatedTags) ?? a10.pendingRevalidatedTags ?? [], d10 = (null == b10 ? void 0 : b10.pendingRevalidates) ?? a10.pendingRevalidates ?? {}, e10 = (null == b10 ? void 0 : b10.pendingRevalidateWrites) ?? a10.pendingRevalidateWrites ?? [];
        return Promise.all([a2(c10, a10.incrementalCache), ...Object.values(d10), ...e10]);
      }
      let a4 = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class a5 {
        disable() {
          throw a4;
        }
        getStore() {
        }
        run() {
          throw a4;
        }
        exit() {
          throw a4;
        }
        enterWith() {
          throw a4;
        }
        static bind(a10) {
          return a10;
        }
      }
      let a6 = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage, a7 = a6 ? new a6() : new a5();
      class a8 {
        constructor({ waitUntil: a10, onClose: b10, onTaskError: c10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = a10, this.onClose = b10, this.onTaskError = c10, this.callbackQueue = new (aT())(), this.callbackQueue.pause();
        }
        after(a10) {
          if (ay(a10)) this.waitUntil || a9(), this.waitUntil(a10.catch((a11) => this.reportTaskError("promise", a11)));
          else if ("function" == typeof a10) this.addCallback(a10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(a10) {
          var b10;
          this.waitUntil || a9();
          let c10 = aR.FP.getStore();
          c10 && this.workUnitStores.add(c10);
          let d10 = a7.getStore(), e10 = d10 ? d10.rootTaskSpawnPhase : null == c10 ? void 0 : c10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let f10 = (b10 = async () => {
            try {
              await a7.run({ rootTaskSpawnPhase: e10 }, () => a10());
            } catch (a11) {
              this.reportTaskError("function", a11);
            }
          }, a6 ? a6.bind(b10) : a5.bind(b10));
          this.callbackQueue.add(f10);
        }
        async runCallbacksOnClose() {
          return await new Promise((a10) => this.onClose(a10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let a11 of this.workUnitStores) a11.phase = "after";
          let a10 = ad.J.getStore();
          if (!a10) throw Object.defineProperty(new aU.z("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return a0(a10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(a10, b10) {
          if (console.error("promise" === a10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", b10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, b10);
          } catch (a11) {
            console.error(Object.defineProperty(new aU.z("`onTaskError` threw while handling an error thrown from an `after` task", { cause: a11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function a9() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function ba(a10) {
        let b10, c10 = { then: (d10, e10) => (b10 || (b10 = a10()), b10.then((a11) => {
          c10.value = a11;
        }).catch(() => {
        }), b10.then(d10, e10)) };
        return c10;
      }
      class bb {
        onClose(a10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", a10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function bc() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let bd = Symbol.for("@next/request-context");
      async function be(a10, b10, c10) {
        let d10 = [], e10 = c10 && c10.size > 0;
        for (let b11 of ((a11) => {
          let b12 = ["/layout"];
          if (a11.startsWith("/")) {
            let c11 = a11.split("/");
            for (let a12 = 1; a12 < c11.length + 1; a12++) {
              let d11 = c11.slice(0, a12).join("/");
              d11 && (d11.endsWith("/page") || d11.endsWith("/route") || (d11 = `${d11}${!d11.endsWith("/") ? "/" : ""}layout`), b12.push(d11));
            }
          }
          return b12;
        })(a10)) b11 = `${w}${b11}`, d10.push(b11);
        if (b10.pathname && !e10) {
          let a11 = `${w}${b10.pathname}`;
          d10.push(a11);
        }
        return { tags: d10, expirationsByCacheKind: function(a11) {
          let b11 = /* @__PURE__ */ new Map(), c11 = a_();
          if (c11) for (let [d11, e11] of c11) "getExpiration" in e11 && b11.set(d11, ba(async () => e11.getExpiration(...a11)));
          return b11;
        }(d10) };
      }
      class bf extends T {
        constructor(a10) {
          super(a10.input, a10.init), this.sourcePage = a10.page;
        }
        get request() {
          throw Object.defineProperty(new t({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new t({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new t({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let bg = { keys: (a10) => Array.from(a10.keys()), get: (a10, b10) => a10.get(b10) ?? void 0 }, bh = (a10, b10) => aN().withPropagatedContext(a10.headers, b10, bg), bi = false;
      async function bj(a10) {
        var b10;
        let d10, e10;
        if (!bi && (bi = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
          let { interceptTestApis: a11, wrapRequestHandler: b11 } = c(720);
          a11(), bh = b11(bh);
        }
        await r();
        let f10 = void 0 !== globalThis.__BUILD_MANIFEST;
        a10.request.url = a10.request.url.replace(/\.rsc($|\?)/, "$1");
        let g10 = a10.bypassNextUrl ? new URL(a10.request.url) : new Q(a10.request.url, { headers: a10.request.headers, nextConfig: a10.request.nextConfig });
        for (let a11 of [...g10.searchParams.keys()]) {
          let b11 = g10.searchParams.getAll(a11), c10 = function(a12) {
            for (let b12 of ["nxtP", "nxtI"]) if (a12 !== b12 && a12.startsWith(b12)) return a12.substring(b12.length);
            return null;
          }(a11);
          if (c10) {
            for (let a12 of (g10.searchParams.delete(c10), b11)) g10.searchParams.append(c10, a12);
            g10.searchParams.delete(a11);
          }
        }
        let h10 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in g10 && (h10 = g10.buildId || "", g10.buildId = "");
        let i2 = function(a11) {
          let b11 = new Headers();
          for (let [c10, d11] of Object.entries(a11)) for (let a12 of Array.isArray(d11) ? d11 : [d11]) void 0 !== a12 && ("number" == typeof a12 && (a12 = a12.toString()), b11.append(c10, a12));
          return b11;
        }(a10.request.headers), j2 = i2.has("x-nextjs-data"), k2 = "1" === i2.get("rsc");
        j2 && "/index" === g10.pathname && (g10.pathname = "/");
        let l2 = /* @__PURE__ */ new Map();
        if (!f10) for (let a11 of _) {
          let b11 = i2.get(a11);
          null !== b11 && (l2.set(a11, b11), i2.delete(a11));
        }
        let m2 = g10.searchParams.get(aa), n2 = new bf({ page: a10.page, input: function(a11) {
          let b11 = "string" == typeof a11, c10 = b11 ? new URL(a11) : a11;
          return c10.searchParams.delete(aa), b11 ? c10.toString() : c10;
        }(g10).toString(), init: { body: a10.request.body, headers: i2, method: a10.request.method, nextConfig: a10.request.nextConfig, signal: a10.request.signal } });
        j2 && Object.defineProperty(n2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && a10.IncrementalCache && (globalThis.__incrementalCache = new a10.IncrementalCache({ CurCacheHandler: a10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: a10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: bc() }) }));
        let o2 = a10.request.waitUntil ?? (null == (b10 = function() {
          let a11 = globalThis[bd];
          return null == a11 ? void 0 : a11.get();
        }()) ? void 0 : b10.waitUntil), p2 = new F({ request: n2, page: a10.page, context: o2 ? { waitUntil: o2 } : void 0 });
        if ((d10 = await bh(n2, () => {
          if ("/middleware" === a10.page || "/src/middleware" === a10.page) {
            let b11 = p2.waitUntil.bind(p2), c10 = new bb();
            return aN().trace(av.execute, { spanName: `middleware ${n2.method} ${n2.nextUrl.pathname}`, attributes: { "http.target": n2.nextUrl.pathname, "http.method": n2.method } }, async () => {
              try {
                var d11, f11, g11, i3, j3, k3;
                let l3 = bc(), m3 = await be("/", n2.nextUrl, null), o3 = (j3 = n2.nextUrl, k3 = (a11) => {
                  e10 = a11;
                }, function(a11, b12, c11, d12, e11, f12, g12, h11, i4, j4, k4, l4) {
                  function m4(a12) {
                    c11 && c11.setHeader("Set-Cookie", a12);
                  }
                  let n3 = {};
                  return { type: "request", phase: a11, implicitTags: f12, url: { pathname: d12.pathname, search: d12.search ?? "" }, rootParams: e11, get headers() {
                    return n3.headers || (n3.headers = function(a12) {
                      let b13 = ac.from(a12);
                      for (let a13 of _) b13.delete(a13);
                      return ac.seal(b13);
                    }(b12.headers)), n3.headers;
                  }, get cookies() {
                    if (!n3.cookies) {
                      let a12 = new R.RequestCookies(ac.from(b12.headers));
                      aQ(b12, a12), n3.cookies = af.seal(a12);
                    }
                    return n3.cookies;
                  }, set cookies(value) {
                    n3.cookies = value;
                  }, get mutableCookies() {
                    if (!n3.mutableCookies) {
                      let a12 = function(a13, b13) {
                        let c12 = new R.RequestCookies(ac.from(a13));
                        return ah.wrap(c12, b13);
                      }(b12.headers, g12 || (c11 ? m4 : void 0));
                      aQ(b12, a12), n3.mutableCookies = a12;
                    }
                    return n3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return n3.userspaceMutableCookies || (n3.userspaceMutableCookies = function(a12) {
                      let b13 = new Proxy(a12.mutableCookies, { get(c12, d13, e12) {
                        switch (d13) {
                          case "delete":
                            return function(...d14) {
                              return aj(a12, "cookies().delete"), c12.delete(...d14), b13;
                            };
                          case "set":
                            return function(...d14) {
                              return aj(a12, "cookies().set"), c12.set(...d14), b13;
                            };
                          default:
                            return U.get(c12, d13, e12);
                        }
                      } });
                      return b13;
                    }(this)), n3.userspaceMutableCookies;
                  }, get draftMode() {
                    return n3.draftMode || (n3.draftMode = new aP(i4, b12, this.cookies, this.mutableCookies)), n3.draftMode;
                  }, renderResumeDataCache: h11 ?? null, isHmrRefresh: j4, serverComponentsHmrCache: k4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", n2, void 0, j3, {}, m3, k3, void 0, l3, false, void 0, null)), q3 = function({ page: a11, renderOpts: b12, isPrefetchRequest: c11, buildId: d12, previouslyRevalidatedTags: e11 }) {
                  var f12;
                  let g12 = !b12.shouldWaitOnAllReady && !b12.supportsDynamicResponse && !b12.isDraftMode && !b12.isPossibleServerAction, h11 = b12.dev ?? false, i4 = h11 || g12 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), j4 = { isStaticGeneration: g12, page: a11, route: (f12 = a11.split("/").reduce((a12, b13, c12, d13) => b13 ? "(" === b13[0] && b13.endsWith(")") || "@" === b13[0] || ("page" === b13 || "route" === b13) && c12 === d13.length - 1 ? a12 : a12 + "/" + b13 : a12, "")).startsWith("/") ? f12 : "/" + f12, incrementalCache: b12.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: b12.cacheLifeProfiles, isRevalidate: b12.isRevalidate, isBuildTimePrerendering: b12.nextExport, hasReadableErrorStacks: b12.hasReadableErrorStacks, fetchCache: b12.fetchCache, isOnDemandRevalidate: b12.isOnDemandRevalidate, isDraftMode: b12.isDraftMode, isPrefetchRequest: c11, buildId: d12, reactLoadableManifest: (null == b12 ? void 0 : b12.reactLoadableManifest) || {}, assetPrefix: (null == b12 ? void 0 : b12.assetPrefix) || "", afterContext: function(a12) {
                    let { waitUntil: b13, onClose: c12, onAfterTaskError: d13 } = a12;
                    return new a8({ waitUntil: b13, onClose: c12, onTaskError: d13 });
                  }(b12), cacheComponentsEnabled: b12.experimental.cacheComponents, dev: h11, previouslyRevalidatedTags: e11, refreshTagsByCacheKind: function() {
                    let a12 = /* @__PURE__ */ new Map(), b13 = a_();
                    if (b13) for (let [c12, d13] of b13) "refreshTags" in d13 && a12.set(c12, ba(async () => d13.refreshTags()));
                    return a12;
                  }(), runInCleanSnapshot: a6 ? a6.snapshot() : function(a12, ...b13) {
                    return a12(...b13);
                  }, shouldTrackFetchMetrics: i4 };
                  return b12.store = j4, j4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (f11 = a10.request.nextConfig) || null == (d11 = f11.experimental) ? void 0 : d11.cacheLife, experimental: { isRoutePPREnabled: false, cacheComponents: false, authInterrupts: !!(null == (i3 = a10.request.nextConfig) || null == (g11 = i3.experimental) ? void 0 : g11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: b11, onClose: c10.onClose.bind(c10), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === n2.headers.get($), buildId: h10 ?? "", previouslyRevalidatedTags: [] });
                return await ad.J.run(q3, () => aR.FP.run(o3, a10.handler, n2, p2));
              } finally {
                setTimeout(() => {
                  c10.dispatchClose();
                }, 0);
              }
            });
          }
          return a10.handler(n2, p2);
        })) && !(d10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        d10 && e10 && d10.headers.set("set-cookie", e10);
        let q2 = null == d10 ? void 0 : d10.headers.get("x-middleware-rewrite");
        if (d10 && q2 && (k2 || !f10)) {
          let b11 = new Q(q2, { forceLocale: true, headers: a10.request.headers, nextConfig: a10.request.nextConfig });
          f10 || b11.host !== n2.nextUrl.host || (b11.buildId = h10 || b11.buildId, d10.headers.set("x-middleware-rewrite", String(b11)));
          let { url: c10, isRelative: e11 } = Z(b11.toString(), g10.toString());
          !f10 && j2 && d10.headers.set("x-nextjs-rewrite", c10), k2 && e11 && (g10.pathname !== b11.pathname && d10.headers.set("x-nextjs-rewritten-path", b11.pathname), g10.search !== b11.search && d10.headers.set("x-nextjs-rewritten-query", b11.search.slice(1)));
        }
        if (d10 && q2 && k2 && m2) {
          let a11 = new URL(q2);
          a11.searchParams.has(aa) || (a11.searchParams.set(aa, m2), d10.headers.set("x-middleware-rewrite", a11.toString()));
        }
        let s2 = null == d10 ? void 0 : d10.headers.get("Location");
        if (d10 && s2 && !f10) {
          let b11 = new Q(s2, { forceLocale: false, headers: a10.request.headers, nextConfig: a10.request.nextConfig });
          d10 = new Response(d10.body, d10), b11.host === g10.host && (b11.buildId = h10 || b11.buildId, d10.headers.set("Location", b11.toString())), j2 && (d10.headers.delete("Location"), d10.headers.set("x-nextjs-redirect", Z(b11.toString(), g10.toString()).url));
        }
        let t2 = d10 || Y.next(), u2 = t2.headers.get("x-middleware-override-headers"), v2 = [];
        if (u2) {
          for (let [a11, b11] of l2) t2.headers.set(`x-middleware-request-${a11}`, b11), v2.push(a11);
          v2.length > 0 && t2.headers.set("x-middleware-override-headers", u2 + "," + v2.join(","));
        }
        return { response: t2, waitUntil: ("internal" === p2[D].kind ? Promise.all(p2[D].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: n2.fetchMetrics };
      }
      var bk = function(a10, b10, c10, d10, e10) {
        if ("m" === d10) throw TypeError("Private method is not writable");
        if ("a" === d10 && !e10) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof b10 ? a10 !== b10 || !e10 : !b10.has(a10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === d10 ? e10.call(a10, c10) : e10 ? e10.value = c10 : b10.set(a10, c10), c10;
      }, bl = function(a10, b10, c10, d10) {
        if ("a" === c10 && !d10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof b10 ? a10 !== b10 || !d10 : !b10.has(a10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === c10 ? d10 : "a" === c10 ? d10.call(a10) : d10 ? d10.value : b10.get(a10);
      };
      function bm(a10) {
        let b10 = a10 ? "__Secure-" : "";
        return { sessionToken: { name: `${b10}authjs.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: a10 } }, callbackUrl: { name: `${b10}authjs.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: a10 } }, csrfToken: { name: `${a10 ? "__Host-" : ""}authjs.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: a10 } }, pkceCodeVerifier: { name: `${b10}authjs.pkce.code_verifier`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: a10, maxAge: 900 } }, state: { name: `${b10}authjs.state`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: a10, maxAge: 900 } }, nonce: { name: `${b10}authjs.nonce`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: a10 } }, webauthnChallenge: { name: `${b10}authjs.challenge`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: a10, maxAge: 900 } } };
      }
      class bn {
        constructor(a10, b10, c10) {
          if (eC.add(this), eD.set(this, {}), eE.set(this, void 0), eF.set(this, void 0), bk(this, eF, c10, "f"), bk(this, eE, a10, "f"), !b10) return;
          let { name: d10 } = a10;
          for (let [a11, c11] of Object.entries(b10)) a11.startsWith(d10) && c11 && (bl(this, eD, "f")[a11] = c11);
        }
        get value() {
          return Object.keys(bl(this, eD, "f")).sort((a10, b10) => parseInt(a10.split(".").pop() || "0") - parseInt(b10.split(".").pop() || "0")).map((a10) => bl(this, eD, "f")[a10]).join("");
        }
        chunk(a10, b10) {
          let c10 = bl(this, eC, "m", eH).call(this);
          for (let d10 of bl(this, eC, "m", eG).call(this, { name: bl(this, eE, "f").name, value: a10, options: { ...bl(this, eE, "f").options, ...b10 } })) c10[d10.name] = d10;
          return Object.values(c10);
        }
        clean() {
          return Object.values(bl(this, eC, "m", eH).call(this));
        }
      }
      eD = /* @__PURE__ */ new WeakMap(), eE = /* @__PURE__ */ new WeakMap(), eF = /* @__PURE__ */ new WeakMap(), eC = /* @__PURE__ */ new WeakSet(), eG = function(a10) {
        let b10 = Math.ceil(a10.value.length / 3936);
        if (1 === b10) return bl(this, eD, "f")[a10.name] = a10.value, [a10];
        let c10 = [];
        for (let d10 = 0; d10 < b10; d10++) {
          let b11 = `${a10.name}.${d10}`, e10 = a10.value.substr(3936 * d10, 3936);
          c10.push({ ...a10, name: b11, value: e10 }), bl(this, eD, "f")[b11] = e10;
        }
        return bl(this, eF, "f").debug("CHUNKING_SESSION_COOKIE", { message: "Session cookie exceeds allowed 4096 bytes.", emptyCookieSize: 160, valueSize: a10.value.length, chunks: c10.map((a11) => a11.value.length + 160) }), c10;
      }, eH = function() {
        let a10 = {};
        for (let b10 in bl(this, eD, "f")) delete bl(this, eD, "f")?.[b10], a10[b10] = { name: b10, value: "", options: { ...bl(this, eE, "f").options, maxAge: 0 } };
        return a10;
      };
      class bo extends Error {
        constructor(a10, b10) {
          a10 instanceof Error ? super(void 0, { cause: { err: a10, ...a10.cause, ...b10 } }) : "string" == typeof a10 ? (b10 instanceof Error && (b10 = { err: b10, ...b10.cause }), super(a10, b10)) : super(void 0, a10), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
          let c10 = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
          this.message += `${this.message ? ". " : ""}Read more at ${c10}`;
        }
      }
      class bp extends bo {
      }
      bp.kind = "signIn";
      class bq extends bo {
      }
      bq.type = "AdapterError";
      class br extends bo {
      }
      br.type = "AccessDenied";
      class bs extends bo {
      }
      bs.type = "CallbackRouteError";
      class bt extends bo {
      }
      bt.type = "ErrorPageLoop";
      class bu extends bo {
      }
      bu.type = "EventError";
      class bv extends bo {
      }
      bv.type = "InvalidCallbackUrl";
      class bw extends bp {
        constructor() {
          super(...arguments), this.code = "credentials";
        }
      }
      bw.type = "CredentialsSignin";
      class bx extends bo {
      }
      bx.type = "InvalidEndpoints";
      class by extends bo {
      }
      by.type = "InvalidCheck";
      class bz extends bo {
      }
      bz.type = "JWTSessionError";
      class bA extends bo {
      }
      bA.type = "MissingAdapter";
      class bB extends bo {
      }
      bB.type = "MissingAdapterMethods";
      class bC extends bo {
      }
      bC.type = "MissingAuthorize";
      class bD extends bo {
      }
      bD.type = "MissingSecret";
      class bE extends bp {
      }
      bE.type = "OAuthAccountNotLinked";
      class bF extends bp {
      }
      bF.type = "OAuthCallbackError";
      class bG extends bo {
      }
      bG.type = "OAuthProfileParseError";
      class bH extends bo {
      }
      bH.type = "SessionTokenError";
      class bI extends bp {
      }
      bI.type = "OAuthSignInError";
      class bJ extends bp {
      }
      bJ.type = "EmailSignInError";
      class bK extends bo {
      }
      bK.type = "SignOutError";
      class bL extends bo {
      }
      bL.type = "UnknownAction";
      class bM extends bo {
      }
      bM.type = "UnsupportedStrategy";
      class bN extends bo {
      }
      bN.type = "InvalidProvider";
      class bO extends bo {
      }
      bO.type = "UntrustedHost";
      class bP extends bo {
      }
      bP.type = "Verification";
      class bQ extends bp {
      }
      bQ.type = "MissingCSRF";
      let bR = /* @__PURE__ */ new Set(["CredentialsSignin", "OAuthAccountNotLinked", "OAuthCallbackError", "AccessDenied", "Verification", "MissingCSRF", "AccountNotLinked", "WebAuthnVerificationError"]);
      class bS extends bo {
      }
      bS.type = "DuplicateConditionalUI";
      class bT extends bo {
      }
      bT.type = "MissingWebAuthnAutocomplete";
      class bU extends bo {
      }
      bU.type = "WebAuthnVerificationError";
      class bV extends bp {
      }
      bV.type = "AccountNotLinked";
      class bW extends bo {
      }
      bW.type = "ExperimentalFeatureNotEnabled";
      let bX = false;
      function bY(a10, b10) {
        try {
          return /^https?:/.test(new URL(a10, a10.startsWith("/") ? b10 : void 0).protocol);
        } catch {
          return false;
        }
      }
      let bZ = false, b$ = false, b_ = false, b0 = ["createVerificationToken", "useVerificationToken", "getUserByEmail"], b1 = ["createUser", "getUser", "getUserByEmail", "getUserByAccount", "updateUser", "linkAccount", "createSession", "getSessionAndUser", "updateSession", "deleteSession"], b2 = ["createUser", "getUser", "linkAccount", "getAccount", "getAuthenticator", "createAuthenticator", "listAuthenticatorsByUserId", "updateAuthenticatorCounter"], b3 = async (a10, b10, c10, d10, e10) => {
        let { crypto: { subtle: f10 } } = (() => {
          if ("undefined" != typeof globalThis) return globalThis;
          if ("undefined" != typeof self) return self;
          if ("undefined" != typeof window) return window;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await f10.deriveBits({ name: "HKDF", hash: `SHA-${a10.substr(3)}`, salt: c10, info: d10 }, await f10.importKey("raw", b10, "HKDF", false, ["deriveBits"]), e10 << 3));
      };
      function b4(a10, b10) {
        if ("string" == typeof a10) return new TextEncoder().encode(a10);
        if (!(a10 instanceof Uint8Array)) throw TypeError(`"${b10}"" must be an instance of Uint8Array or a string`);
        return a10;
      }
      async function b5(a10, b10, c10, d10, e10) {
        return b3(function(a11) {
          switch (a11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return a11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(a10), function(a11) {
          let b11 = b4(a11, "ikm");
          if (!b11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return b11;
        }(b10), b4(c10, "salt"), function(a11) {
          let b11 = b4(a11, "info");
          if (b11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return b11;
        }(d10), function(a11, b11) {
          if ("number" != typeof a11 || !Number.isInteger(a11) || a11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (a11 > 255 * (parseInt(b11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return a11;
        }(e10, a10));
      }
      let b6 = new TextEncoder(), b7 = new TextDecoder(), b8 = new TextDecoder("utf-8", { fatal: true });
      function b9(...a10) {
        let b10 = new Uint8Array(a10.reduce((a11, { length: b11 }) => a11 + b11, 0)), c10 = 0;
        for (let d10 of a10) b10.set(d10, c10), c10 += d10.length;
        return b10;
      }
      function ca(a10, b10, c10) {
        if (b10 < 0 || b10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${b10}`);
        a10.set([b10 >>> 24, b10 >>> 16, b10 >>> 8, 255 & b10], c10);
      }
      function cb(a10) {
        let b10 = Math.floor(a10 / 4294967296), c10 = new Uint8Array(8);
        return ca(c10, b10, 0), ca(c10, a10 % 4294967296, 4), c10;
      }
      function cc(a10) {
        let b10 = new Uint8Array(4);
        return ca(b10, a10), b10;
      }
      let cd = /[^\x00-\x7f]/;
      function ce(a10) {
        if ("string" == typeof a10 && a10.length >= 128) {
          if (cd.test(a10)) throw TypeError("non-ASCII string encountered in encode()");
          return b6.encode(a10);
        }
        let b10 = new Uint8Array(a10.length);
        for (let c10 = 0; c10 < a10.length; c10++) {
          let d10 = a10.charCodeAt(c10);
          if (d10 > 127) throw TypeError("non-ASCII string encountered in encode()");
          b10[c10] = d10;
        }
        return b10;
      }
      async function cf(a10, b10) {
        let c10 = `SHA-${a10.slice(-3)}`;
        return new Uint8Array(await crypto.subtle.digest(c10, b10));
      }
      function cg(a10) {
        try {
          return function(a11, b10 = false) {
            if (Uint8Array.fromBase64) return Uint8Array.fromBase64(a11, { alphabet: b10 ? "base64url" : "base64" });
            if (b10) {
              if (a11.includes("+") || a11.includes("/")) throw TypeError("Invalid base64url");
              a11 = a11.replace(/-/g, "+").replace(/_/g, "/");
            }
            let c10 = atob(a11), d10 = new Uint8Array(c10.length);
            for (let a12 = 0; a12 < c10.length; a12++) d10[a12] = c10.charCodeAt(a12);
            return d10;
          }("string" == typeof a10 ? a10 : b7.decode(a10), true);
        } catch (a11) {
          throw TypeError("The input to be decoded is not correctly encoded.", { cause: a11 });
        }
      }
      function ch(a10) {
        return function(a11, b10 = false) {
          if (Uint8Array.prototype.toBase64) return a11.toBase64({ alphabet: b10 ? "base64url" : "base64", omitPadding: b10 });
          let c10 = [];
          for (let b11 = 0; b11 < a11.length; b11 += 32768) c10.push(String.fromCharCode.apply(null, a11.subarray(b11, b11 + 32768)));
          let d10 = btoa(c10.join(""));
          return b10 ? d10.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_") : d10;
        }("string" == typeof a10 ? b6.encode(a10) : a10, true);
      }
      class ci extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(a10, b10) {
          super(a10, b10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class cj extends ci {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(a10, b10, c10 = "unspecified", d10 = "unspecified") {
          super(a10, { cause: { claim: c10, reason: d10, payload: b10 } }), this.claim = c10, this.reason = d10, this.payload = b10;
        }
      }
      class ck extends ci {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(a10, b10, c10 = "unspecified", d10 = "unspecified") {
          super(a10, { cause: { claim: c10, reason: d10, payload: b10 } }), this.claim = c10, this.reason = d10, this.payload = b10;
        }
      }
      class cl extends ci {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class cm extends ci {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class cn extends ci {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(a10 = "decryption operation failed", b10) {
          super(a10, b10);
        }
      }
      class co extends ci {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class cp extends ci {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class cq extends ci {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class cr extends ci {
        [Symbol.asyncIterator] = async function* () {
        };
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(a10 = "multiple matching keys found in the JSON Web Key Set", b10) {
          super(a10, b10);
        }
      }
      function cs(a10, b10) {
        if (!(a10 instanceof Uint8Array)) throw TypeError(`${b10} must be an instance of Uint8Array`);
      }
      function ct(a10) {
        if ("object" != typeof a10 || null === a10 || "[object Object]" !== Object.prototype.toString.call(a10)) return false;
        let b10 = Object.getPrototypeOf(a10);
        return null === b10 || null === Object.getPrototypeOf(b10);
      }
      function cu(...a10) {
        let b10 = /* @__PURE__ */ new Set();
        for (let c10 of a10) if (c10) for (let a11 of Object.keys(c10)) {
          if (b10.has(a11)) return false;
          b10.add(a11);
        }
        return true;
      }
      function cv(a10, b10) {
        if (void 0 !== a10) throw TypeError(`${b10} can only be called once`);
      }
      function cw(a10, b10, c10) {
        try {
          return cg(a10);
        } catch {
          throw new c10(`Failed to base64url decode the ${b10}`);
        }
      }
      let cx = { __proto__: null };
      function cy(a10, b10) {
        if (void 0 !== b10 && (!Array.isArray(b10) || b10.some((a11) => "string" != typeof a11))) throw TypeError(`"${a10}" option must be an array of strings`);
        return void 0 === b10 ? void 0 : new Set(b10);
      }
      function cz(a10, b10, c10, d10, e10) {
        if (void 0 !== e10.crit && d10?.crit === void 0) throw new a10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!d10 || void 0 === d10.crit) return [];
        if (!Array.isArray(d10.crit) || 0 === d10.crit.length || d10.crit.some((a11) => "string" != typeof a11 || 0 === a11.length)) throw new a10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        let f10 = void 0 === c10 ? b10 : { __proto__: null, ...c10, ...b10 };
        for (let b11 of d10.crit) {
          if (!(b11 in f10)) throw new cm(`Extension Header Parameter "${b11}" is not recognized`);
          if (!Object.hasOwn(e10, b11) || void 0 === e10[b11]) throw new a10(`Extension Header Parameter "${b11}" is missing`);
          if (f10[b11] && (!Object.hasOwn(d10, b11) || void 0 === d10[b11])) throw new a10(`Extension Header Parameter "${b11}" MUST be integrity protected`);
        }
        return d10.crit;
      }
      function cA(a10, b10) {
        let c10, d10;
        try {
          c10 = JSON.stringify(b10), d10 = JSON.parse(c10);
        } catch (b11) {
          throw new a10("JOSE Header is not valid JSON", { cause: b11 });
        }
        if (!ct(d10)) throw new a10("JOSE Header is not a JSON object");
        return [d10, c10];
      }
      async function cB(a10, b10, c10) {
        let d10, f10, { alg: g10, secret: h10 } = a10, i2 = "decrypt" === c10 || "sign" === c10;
        if (h10 && b10 instanceof Uint8Array) return b10;
        if (ct(b10)) {
          if ("string" != typeof (d10 = function(a11) {
            let b11 = cN(a11);
            if (void 0 !== b11.ext && "boolean" != typeof b11.ext) throw TypeError('"ext" (Extractable) Parameter must be a boolean');
            if (void 0 !== b11.key_ops) {
              let a12 = b11.key_ops, c11 = Array.isArray(a12) ? [...a12] : void 0;
              if (!c11 || c11.some((a13) => "string" != typeof a13) || new Set(c11).size !== c11.length) throw TypeError('"key_ops" (Key Operations) Parameter must be an array of unique strings');
              b11.key_ops = c11;
            }
            return b11;
          }(b10)).kty) throw cJ(g10, b10, h10);
          if (!(h10 ? "oct" === d10.kty && "string" == typeof d10.k : "oct" !== d10.kty && (i2 ? "AKP" === d10.kty && "string" == typeof d10.priv || "string" == typeof d10.d : void 0 === d10.d && void 0 === d10.priv))) throw TypeError(h10 ? 'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present' : `JSON Web Key for this operation must be a ${i2 ? "private" : "public"} JWK`);
          if (((a11, b11, c11) => {
            let { alg: d11 } = a11;
            if (void 0 !== b11.use) {
              let a12 = "sign" === c11 || "verify" === c11 ? "sig" : "enc";
              if (b11.use !== a12) throw TypeError(`Invalid key for this operation, its "use" must be "${a12}" when present`);
            }
            if (void 0 !== b11.alg && b11.alg !== d11) throw TypeError(`Invalid key for this operation, its "alg" must be "${d11}" when present`);
            if (Array.isArray(b11.key_ops)) {
              let d12 = "encrypt" === c11 || "decrypt" === c11 ? a11.ops?.[+("encrypt" !== c11)] : c11;
              if (d12 && !b11.key_ops.includes(d12)) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${d12}" when present`);
            }
          })(a10, d10, c10), "oct" === d10.kty) return cg(d10.k);
          if (!Object.isFrozen(b10)) {
            let { key_ops: a11 } = b10;
            Array.isArray(a11) && Object.freeze(a11), Object.freeze(b10);
          }
        } else {
          if (!cG(b10)) throw cJ(g10, b10, h10);
          let a11 = h10 ? "secret" : i2 ? "private" : "public";
          if (b10.type !== a11 && (h10 || ["secret", "public", "private"].includes(b10.type))) throw TypeError(`${b10[Symbol.toStringTag]} instances must be of type "${a11}" for the ${g10} algorithm`);
          if (cE(b10)) return b10;
          if ("secret" === (f10 = b10).type) return f10.export();
        }
        let j2 = (e ||= /* @__PURE__ */ new WeakMap()).get(b10);
        if (j2?.[g10]) return j2[g10];
        if (j2 || e.set(b10, j2 = {}), f10 && "function" == typeof f10.toCryptoKey) {
          let b11 = "public" === f10.type, c11 = cC[f10.asymmetricKeyDetails?.namedCurve], d11 = a10.resolve?.({ crv: c11, asymmetricKeyType: f10.asymmetricKeyType }) ?? a10.subtle;
          return j2[g10] = f10.toCryptoKey(d11, b11, a10.usages[+!b11]);
        }
        return (d10 ??= f10.export({ format: "jwk" })).alg = g10, j2[g10] = await cO(a10, d10);
      }
      let cC = { __proto__: null, prime256v1: "P-256", secp384r1: "P-384", secp521r1: "P-521" };
      function cD(a10) {
        if (!cE(a10)) throw Error("CryptoKey instance expected");
      }
      let cE = (a10) => {
        if (a10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return a10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, cF = (a10) => a10?.[Symbol.toStringTag] === "KeyObject", cG = (a10) => cE(a10) || cF(a10);
      function cH(a10, b10, ...c10) {
        if (c10.length > 2) {
          let b11 = c10.pop();
          a10 += `one of type ${c10.join(", ")}, or ${b11}.`;
        } else 2 === c10.length ? a10 += `one of type ${c10[0]} or ${c10[1]}.` : a10 += `of type ${c10[0]}.`;
        return null == b10 ? a10 += ` Received ${b10}` : "function" == typeof b10 && b10.name ? a10 += ` Received function ${b10.name}` : "object" == typeof b10 && null != b10 && b10.constructor?.name && (a10 += ` Received an instance of ${b10.constructor.name}`), a10;
      }
      let cI = (a10, ...b10) => cH("Key must be ", a10, ...b10);
      function cJ(a10, b10, c10) {
        let d10 = ["CryptoKey", "KeyObject", "JSON Web Key"];
        return c10 && d10.push("Uint8Array"), TypeError(cH(`Key for the ${a10} algorithm must be `, b10, ...d10));
      }
      let cK = (a10, b10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${b10} must be ${a10}`);
      function cL(a10, b10) {
        if (b10 && !a10.usages.includes(b10)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${b10}.`);
      }
      function cM(a10, b10, c10) {
        let d10 = a10.algorithm;
        if (d10.name !== b10.name) throw cK(b10.name);
        if (b10.hash && d10.hash?.name !== b10.hash) throw cK(b10.hash, "algorithm.hash");
        if (b10.namedCurve && d10.namedCurve !== b10.namedCurve) throw cK(b10.namedCurve, "algorithm.namedCurve");
        if (void 0 !== b10.length && d10.length !== b10.length) throw cK(b10.length, "algorithm.length");
        cL(a10, c10);
      }
      function cN(a10) {
        return { __proto__: null, ...a10 };
      }
      async function cO(a10, b10, c10) {
        if (!a10.kty.includes(b10.kty)) throw new cm('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        let d10 = a10.resolve?.({ kty: b10.kty, crv: b10.crv }) ?? a10.subtle, e10 = !!(b10.d || b10.priv), f10 = { ...b10, ext: c10 ?? b10.ext };
        return "AKP" !== f10.kty && delete f10.alg, delete f10.use, crypto.subtle.importKey("jwk", f10, d10, f10.ext ?? !e10, b10.key_ops ?? a10.usages[+!!e10]);
      }
      async function cP(a10, b10, c10, d10 = false) {
        return a10 instanceof Uint8Array && (a10 = await crypto.subtle.importKey("raw", a10, b10, d10, [c10])), cM(a10, b10, c10), a10;
      }
      async function cQ(a10) {
        if (cF(a10)) if ("secret" !== a10.type) return a10.export({ format: "jwk" });
        else a10 = a10.export();
        if (a10 instanceof Uint8Array) return { kty: "oct", k: ch(a10) };
        if (!cE(a10)) throw TypeError(cI(a10, "CryptoKey", "KeyObject", "Uint8Array"));
        if (!a10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let b10 = await crypto.subtle.exportKey("jwk", a10);
        for (let a11 of (delete b10.ext, delete b10.key_ops, delete b10.use, "AKP" !== b10.kty && delete b10.alg, Object.keys(b10))) void 0 === b10[a11] && delete b10[a11];
        return b10;
      }
      let cR = (a10, b10) => {
        if ("string" != typeof a10 || !a10) throw new cq(`${b10} missing or invalid`);
      };
      async function cS(a10, b10) {
        let c10, d10;
        if (ct(a10)) {
          if ("string" != typeof (c10 = cN(a10)).kty) throw TypeError(cI(a10, "CryptoKey", "KeyObject", "JSON Web Key"));
        } else if (cG(a10)) c10 = cN(await cQ(a10));
        else throw TypeError(cI(a10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("sha256" !== (b10 ??= "sha256") && "sha384" !== b10 && "sha512" !== b10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (c10.kty) {
          case "AKP":
            cR(c10.alg, '"alg" (Algorithm) Parameter'), cR(c10.pub, '"pub" (Public key) Parameter'), d10 = { alg: c10.alg, kty: c10.kty, pub: c10.pub };
            break;
          case "EC":
            cR(c10.crv, '"crv" (Curve) Parameter'), cR(c10.x, '"x" (X Coordinate) Parameter'), cR(c10.y, '"y" (Y Coordinate) Parameter'), d10 = { crv: c10.crv, kty: c10.kty, x: c10.x, y: c10.y };
            break;
          case "OKP":
            cR(c10.crv, '"crv" (Subtype of Key Pair) Parameter'), cR(c10.x, '"x" (Public Key) Parameter'), d10 = { crv: c10.crv, kty: c10.kty, x: c10.x };
            break;
          case "RSA":
            cR(c10.e, '"e" (Exponent) Parameter'), cR(c10.n, '"n" (Modulus) Parameter'), d10 = { e: c10.e, kty: c10.kty, n: c10.n };
            break;
          case "oct":
            if ("string" != typeof c10.k) throw new cq('"k" (Key Value) Parameter missing or invalid');
            d10 = { k: c10.k, kty: c10.kty };
            break;
          default:
            throw new cm('"kty" (Key Type) Parameter missing or unsupported');
        }
        let e10 = ce(JSON.stringify(d10));
        return ch(await cf(b10, e10));
      }
      let cT = (a10) => crypto.getRandomValues(new Uint8Array(a10.cekBits >> 3));
      function cU(a10, b10) {
        let c10 = a10.byteLength << 3;
        if (c10 !== b10) throw new co(`Invalid Content Encryption Key length. Expected ${b10} bits, got ${c10} bits`);
      }
      function cV(a10, b10) {
        if (b10.length << 3 !== a10.ivBits) throw new co("Invalid Initialization Vector length");
      }
      async function cW(a10, b10, c10) {
        if (!(b10 instanceof Uint8Array)) throw TypeError(cI(b10, "Uint8Array"));
        let d10 = a10.cekBits >> 1;
        return [await crypto.subtle.importKey("raw", b10.subarray(d10 >> 3), "AES-CBC", false, [c10]), await crypto.subtle.importKey("raw", b10.subarray(0, d10 >> 3), { hash: `SHA-${d10 << 1}`, name: "HMAC" }, false, ["sign"]), d10];
      }
      async function cX(a10, b10, c10) {
        return new Uint8Array((await crypto.subtle.sign("HMAC", a10, b10)).slice(0, c10 >> 3));
      }
      async function cY(a10, b10, c10, d10, e10) {
        let [f10, g10, h10] = await cW(a10, c10, "encrypt"), i2 = new Uint8Array(await crypto.subtle.encrypt({ iv: d10, name: "AES-CBC" }, f10, b10)), j2 = b9(e10, d10, i2, cb(8 * e10.length));
        return { ciphertext: i2, tag: await cX(g10, j2, h10), iv: d10 };
      }
      async function cZ(a10, b10) {
        let c10 = { name: "HMAC", hash: "SHA-256" }, d10 = await crypto.subtle.generateKey(c10, false, ["sign", "verify"]), e10 = await crypto.subtle.sign(c10, d10, a10);
        return crypto.subtle.verify(c10, d10, e10, b10);
      }
      async function c$(a10, b10, c10, d10, e10, f10) {
        let [g10, h10, i2] = await cW(a10, b10, "decrypt"), j2 = b9(f10, d10, c10, cb(8 * f10.length)), k2 = await cX(h10, j2, i2);
        try {
          if (await cZ(e10, k2)) return new Uint8Array(await crypto.subtle.decrypt({ iv: d10, name: "AES-CBC" }, g10, c10));
        } catch {
        }
        throw new cn();
      }
      async function c_(a10, b10, c10, d10, e10) {
        if (!cE(c10) && !(c10 instanceof Uint8Array)) throw TypeError(cI(c10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (d10 ? cV(a10, d10) : d10 = crypto.getRandomValues(new Uint8Array(a10.ivBits >> 3)), c10 instanceof Uint8Array && cU(c10, a10.cekBits), a10.cbc) return cY(a10, b10, c10, d10, e10);
        let f10 = await cP(c10, a10.subtle, "encrypt"), g10 = new Uint8Array(await crypto.subtle.encrypt({ additionalData: e10, iv: d10, name: "AES-GCM", tagLength: 128 }, f10, b10));
        return { ciphertext: g10.subarray(0, -16), tag: g10.subarray(-16), iv: d10 };
      }
      async function c0(a10, b10, c10, d10, e10, f10) {
        if (!cE(b10) && !(b10 instanceof Uint8Array)) throw TypeError(cI(b10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (!d10) throw new co("JWE Initialization Vector missing");
        if (!e10) throw new co("JWE Authentication Tag missing");
        if (!a10.cbc && 16 !== e10.length) throw new co("Invalid Authentication Tag length");
        if (cV(a10, d10), b10 instanceof Uint8Array && cU(b10, a10.cekBits), a10.cbc) return c$(a10, b10, c10, d10, e10, f10);
        let g10 = await cP(b10, a10.subtle, "decrypt");
        try {
          return new Uint8Array(await crypto.subtle.decrypt({ additionalData: f10, iv: d10, name: "AES-GCM", tagLength: 128 }, g10, b9(c10, e10)));
        } catch {
          throw new cn();
        }
      }
      function c1(a10) {
        let b10 = { __proto__: null };
        for (let c10 in a10) b10[c10] = { ...a10[c10], alg: c10 };
        return b10;
      }
      let c2 = [["encrypt", "wrapKey"], ["decrypt", "unwrapKey"]], c3 = [[], ["deriveBits"]], c4 = [[], []];
      function c5(a10) {
        return { kty: ["RSA"], mode: "key-encryption", subtle: { name: "RSA-OAEP", hash: `SHA-${a10}` }, usages: c2, ops: ["wrapKey", "unwrapKey"] };
      }
      function c6(a10) {
        return { kty: ["EC", "OKP"], mode: a10, subtle: { name: "ECDH" }, resolve: ({ kty: a11, crv: b10, asymmetricKeyType: c10 }) => {
          if ("X25519" === b10 || "x25519" === c10) return { name: "X25519" };
          if ("OKP" === a11) throw new cm('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
          return { name: "ECDH", namedCurve: b10 };
        }, usages: c3, ops: [void 0, "deriveBits"] };
      }
      function c7(a10, b10 = false) {
        return { kty: ["oct"], mode: "key-wrapping", secret: true, subtle: { name: b10 ? "AES-GCM" : "AES-KW", length: a10 }, usages: c4, ops: b10 ? ["encrypt", "decrypt"] : ["wrapKey", "unwrapKey"] };
      }
      function c8() {
        return { kty: ["oct"], mode: "key-wrapping", secret: true, subtle: { name: "PBKDF2" }, usages: c4, ops: ["deriveBits", "deriveBits"] };
      }
      let c9 = c1({ dir: { kty: ["oct"], mode: "direct-encryption", secret: true, subtle: { name: "AES-GCM" }, usages: c4, ops: ["encrypt", "decrypt"] }, "RSA-OAEP": c5(1), "RSA-OAEP-256": c5(256), "RSA-OAEP-384": c5(384), "RSA-OAEP-512": c5(512), "ECDH-ES": c6("direct-key-agreement"), "ECDH-ES+A128KW": c6("key-agreement-with-key-wrapping"), "ECDH-ES+A192KW": c6("key-agreement-with-key-wrapping"), "ECDH-ES+A256KW": c6("key-agreement-with-key-wrapping"), A128KW: c7(128), A192KW: c7(192), A256KW: c7(256), A128GCMKW: c7(128, true), A192GCMKW: c7(192, true), A256GCMKW: c7(256, true), "PBES2-HS256+A128KW": c8(), "PBES2-HS384+A192KW": c8(), "PBES2-HS512+A256KW": c8() }), da = ["encrypt", "decrypt"];
      function db(a10, b10 = false) {
        return { kty: ["oct"], secret: true, subtle: { name: b10 ? "AES-CBC" : "AES-GCM", length: a10 }, usages: c4, ops: da, cekBits: a10, ivBits: b10 ? 128 : 96, cbc: b10 };
      }
      let dc = c1({ A128GCM: db(128), A192GCM: db(192), A256GCM: db(256), "A128CBC-HS256": db(256, true), "A192CBC-HS384": db(384, true), "A256CBC-HS512": db(512, true) });
      function dd(a10, b10) {
        throw new cm(`Invalid or unsupported "${a10}" (JWE ${b10}) header value`);
      }
      function de(a10) {
        return ("string" == typeof a10 ? c9[a10] : void 0) ?? dd("alg", "Algorithm");
      }
      function df(a10) {
        return "key-wrapping" === a10.mode || "key-encryption" === a10.mode || "key-agreement-with-key-wrapping" === a10.mode;
      }
      function dg(a10) {
        return ("string" == typeof a10 ? dc[a10] : void 0) ?? dd("enc", "Encryption Algorithm");
      }
      function dh(a10, b10) {
        if ("ECDH" !== a10.algorithm.name && "X25519" !== a10.algorithm.name) throw TypeError("CryptoKey does not support this operation, its algorithm.name must be ECDH or X25519");
        cL(a10, b10);
      }
      async function di(a10, b10, c10) {
        let d10 = await cP(b10, de(a10).subtle, "wrapKey", true), e10 = await crypto.subtle.importKey("raw", c10, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.wrapKey("raw", e10, d10, "AES-KW"));
      }
      async function dj(a10, b10, c10) {
        let d10 = await cP(b10, de(a10).subtle, "unwrapKey", true), e10 = await crypto.subtle.unwrapKey("raw", c10, d10, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.exportKey("raw", e10));
      }
      function dk(a10, b10, c10) {
        cM(b10, de(a10).subtle, c10), function(a11, b11) {
          let { modulusLength: c11 } = b11.algorithm;
          if ("number" != typeof c11 || c11 < 2048) throw TypeError(`${a11} requires key modulusLength to be 2048 bits or larger`);
        }(a10, b10);
      }
      async function dl(a10, b10, c10, d10) {
        if (!(a10 instanceof Uint8Array) || a10.length < 8) throw new co("PBES2 Salt Input must be 8 or more octets");
        if (!Number.isSafeInteger(c10) || 1 !== Math.sign(c10)) throw new co("PBES2 Count Input must be a positive integer");
        let e10 = b9(ce(b10), Uint8Array.of(0), a10), f10 = parseInt(b10.slice(13, 16), 10), g10 = { hash: `SHA-${b10.slice(8, 11)}`, iterations: c10, name: "PBKDF2", salt: e10 }, h10 = await cP(d10, de(b10).subtle, "deriveBits");
        return new Uint8Array(await crypto.subtle.deriveBits(g10, h10, f10));
      }
      function dm(a10) {
        return b9(cc(a10.length), a10);
      }
      async function dn(a10, b10, c10) {
        let d10 = b10 >> 3, e10 = Math.ceil(d10 / 32), f10 = new Uint8Array(32 * e10);
        for (let b11 = 1; b11 <= e10; b11++) {
          let d11 = await cf("sha256", b9(cc(b11), a10, c10));
          f10.set(d11, (b11 - 1) * 32);
        }
        return f10.slice(0, d10);
      }
      async function dp(a10, b10, c10, d10, e10 = new Uint8Array(), f10 = new Uint8Array()) {
        dh(a10), dh(b10, "deriveBits");
        let g10 = b9(dm(ce(c10)), dm(e10), dm(f10), cc(d10));
        return dn(new Uint8Array(await crypto.subtle.deriveBits({ name: a10.algorithm.name, public: a10 }, b10, "X25519" === a10.algorithm.name ? 256 : Math.ceil(parseInt(a10.algorithm.namedCurve.slice(-3), 10) / 8) << 3)), d10, g10);
      }
      function dq(a10) {
        cD(a10);
        let b10 = a10.algorithm.namedCurve;
        if ("P-256" !== b10 && "P-384" !== b10 && "P-521" !== b10 && "X25519" !== a10.algorithm.name) throw new cm("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      }
      function dr(a10, b10) {
        let c10 = a10[b10];
        if (void 0 !== c10) {
          if ("string" != typeof c10) throw new co(`JOSE Header "${b10}" (Agreement Party${"apu" === b10 ? "U" : "V"}Info) invalid`);
          return cw(c10, b10, co);
        }
      }
      function ds(a10, b10) {
        if (void 0 !== a10 && void 0 !== b10 && a10.byteLength === b10.byteLength) {
          for (let c10 = 0; c10 < a10.byteLength; c10++) if (a10[c10] !== b10[c10]) return;
          throw new co('JOSE Header "apu" and "apv" values must be distinct');
        }
      }
      function dt(a10) {
        if (void 0 !== a10) throw new co("Encountered unexpected JWE Encrypted Key");
      }
      async function du(a10, b10, c10, d10, e10, f10) {
        let { alg: g10 } = a10, h10 = a10.mode;
        if ("direct-encryption" === h10) return dt(d10), c10;
        let i2 = "direct-key-agreement" === h10;
        switch (i2 ? dt(d10) : function(a11) {
          if (void 0 === a11) throw new co("JWE Encrypted Key missing");
        }(d10), a10.subtle.name) {
          case "ECDH": {
            let { epk: d11 } = e10;
            if (!ct(d11) || ["d", "k", "p", "q", "dp", "dq", "qi", "oth", "priv"].some((a11) => Object.hasOwn(d11, a11))) throw new co('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            dq(c10);
            let f11 = await cO(a10, d11), h11 = dr(e10, "apu"), j2 = dr(e10, "apv");
            ds(h11, j2);
            let k2 = await dp(f11, c10, i2 ? b10.alg : g10, i2 ? b10.cekBits : parseInt(g10.slice(-5, -2), 10), h11, j2);
            if (i2) return k2;
            c10 = k2;
            break;
          }
          case "RSA-OAEP":
            return cD(c10), dk(g10, c10, "decrypt"), new Uint8Array(await crypto.subtle.decrypt("RSA-OAEP", c10, d10));
          case "PBKDF2": {
            if ("number" != typeof e10.p2c) throw new co('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            if (void 0 !== f10 && f10 !== 1 / 0 && (!Number.isSafeInteger(f10) || f10 < 1)) throw TypeError("maxPBES2Count must be a positive safe integer or Infinity");
            if (e10.p2c > (f10 ?? 1e4)) throw new co('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof e10.p2s) throw new co('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            let a11 = cw(e10.p2s, "p2s", co);
            c10 = await dl(a11, g10, e10.p2c, c10);
            break;
          }
          case "AES-GCM": {
            if ("string" != typeof e10.iv) throw new co('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof e10.tag) throw new co('JOSE Header "tag" (Authentication Tag) missing or invalid');
            let a11 = cw(e10.iv, "iv", co), b11 = cw(e10.tag, "tag", co);
            if (12 !== a11.byteLength) throw new co("Invalid Initialization Vector length");
            if (16 !== b11.byteLength) throw new co("Invalid Authentication Tag length");
            return c0(dg(g10.slice(0, -2)), c10, d10, a11, b11, new Uint8Array());
          }
        }
        return dj(g10.slice(-6), c10, d10);
      }
      async function dv(a10, b10, c10, d10, e10, f10 = {}) {
        let g10, h10, { alg: i2, mode: j2 } = a10, k2 = df(a10);
        if (void 0 !== e10 && !k2) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${i2}`);
        let l2 = await cB("direct-encryption" === j2 ? b10 : a10, c10, "encrypt");
        if ("direct-encryption" === j2) return [l2, void 0, void 0];
        let m2 = k2 ? e10 ?? cT(b10) : void 0;
        switch (m2 && cU(m2, b10.cekBits), a10.subtle.name) {
          case "ECDH": {
            let c11;
            dq(l2);
            let { apu: e11, apv: g11 } = f10;
            void 0 !== e11 && cs(e11, '"apu"'), void 0 !== g11 && cs(g11, '"apv"');
            let k3 = e11 ?? dr(d10, "apu"), m3 = g11 ?? dr(d10, "apv");
            ds(k3, m3), c11 = void 0 !== f10.epk ? await cB(a10, f10.epk, "decrypt") : (await crypto.subtle.generateKey(l2.algorithm, true, ["deriveBits"])).privateKey;
            let n2 = crypto.subtle, o2 = c11;
            if (!o2.extractable) {
              if ("function" != typeof n2.getPublicKey) throw TypeError('CryptoKey for "epk" must be extractable');
              o2 = await n2.getPublicKey(c11, []);
            }
            let { x: p2, y: q2, crv: r2, kty: s2 } = await n2.exportKey("jwk", o2), t2 = "direct-key-agreement" === j2, u2 = await dp(l2, c11, t2 ? b10.alg : i2, t2 ? b10.cekBits : parseInt(i2.slice(-5, -2), 10), k3, m3), v2 = { x: p2, crv: r2, kty: s2 };
            if ("EC" === s2 && (v2.y = q2), h10 = { epk: v2 }, void 0 !== e11 && (h10.apu = ch(e11)), void 0 !== g11 && (h10.apv = ch(g11)), t2) return [u2, void 0, h10];
            l2 = u2;
            break;
          }
          case "RSA-OAEP":
            cD(l2), dk(i2, l2, "encrypt"), g10 = new Uint8Array(await crypto.subtle.encrypt("RSA-OAEP", l2, m2));
            break;
          case "PBKDF2": {
            let { p2c: a11 = 2048, p2s: b11 = crypto.getRandomValues(new Uint8Array(16)) } = f10;
            l2 = await dl(b11, i2, a11, l2), h10 = { p2c: a11, p2s: ch(b11) };
            break;
          }
          case "AES-GCM": {
            let a11 = void 0 === f10.iv ? crypto.getRandomValues(new Uint8Array(12)) : f10.iv;
            if (!(a11 instanceof Uint8Array)) throw TypeError('"iv" must be an instance of Uint8Array');
            let b11 = await c_(dg(i2.slice(0, -2)), m2, l2, a11, new Uint8Array());
            g10 = b11.ciphertext, h10 = { iv: ch(b11.iv), tag: ch(b11.tag) };
          }
        }
        if (!((g10 ??= await di(i2.slice(-6), l2, m2)) instanceof Uint8Array) || !g10.byteLength) throw TypeError("JWE key management algorithm did not produce an Encrypted Key");
        return [m2, g10, h10];
      }
      function dw(a10, b10) {
        if (void 0 !== a10.zip && "DEF" !== a10.zip) throw new cm('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
        if (void 0 !== a10.zip && !b10?.zip) throw new co('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
      }
      function dx(a10) {
        if (typeof globalThis[a10] > "u") throw new cm(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${a10} API.`);
      }
      async function dy(a10, b10, c10 = 1 / 0) {
        let d10 = a10.writable.getWriter();
        d10.write(b10).catch(() => {
        }), d10.close().catch(() => {
        });
        let e10 = [], f10 = 0, g10 = a10.readable.getReader();
        for (; ; ) {
          let { value: a11, done: b11 } = await g10.read();
          if (b11) break;
          if (e10.push(a11), f10 += a11.byteLength, c10 !== 1 / 0 && f10 > c10) throw new co("Decompressed plaintext exceeded the configured limit");
        }
        return b9(...e10);
      }
      async function dz(a10) {
        return dx("CompressionStream"), dy(new CompressionStream("deflate-raw"), a10);
      }
      async function dA(a10, b10) {
        return dx("DecompressionStream"), dy(new DecompressionStream("deflate-raw"), a10, b10);
      }
      function dB(a10, b10, c10) {
        if (!cu(a10, b10, c10)) throw new co("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
      }
      async function dC(a10, b10, c10) {
        let d10, e10, f10, g10, h10, i2, [j2, k2, l2] = b10, [m2, n2, o2, p2, q2, r2, s2, t2, , u2] = a10, v2 = n2, w2 = o2, x2 = l2 ?? de(j2.alg);
        "integrated-encryption" === x2.mode ? f10 = await cB(x2, c10, "encrypt") : [f10, d10, e10] = await dv(x2, k2, c10, j2, r2, t2), e10 && (u2 ? w2 = w2 ? { ...w2, ...e10 } : e10 : v2 = v2 ? { ...v2, ...e10 } : e10, dB(v2, w2, p2));
        let y2 = v2 ? ch(JSON.stringify(v2)) : "", z2 = q2?.byteLength ? ch(q2) : void 0, A2 = ce(z2 ? `${y2}.${z2}` : y2), B2 = m2;
        "DEF" === j2.zip && (B2 = await dz(B2).catch((a11) => {
          throw new co("Failed to compress plaintext", { cause: a11 });
        })), "integrated-encryption" === x2.mode ? [d10, g10] = await x2.encrypt(f10, B2, A2, v2, j2, t2) : { ciphertext: g10, tag: h10, iv: i2 } = await c_(k2, B2, f10, s2, A2);
        let C2 = { ciphertext: ch(g10) };
        return i2 && (C2.iv = ch(i2)), h10 && (C2.tag = ch(h10)), d10?.byteLength && (C2.encrypted_key = ch(d10)), z2 && (C2.aad = z2), v2 && (C2.protected = y2), p2 && (C2.unprotected = p2), w2 && (C2.header = w2), C2;
      }
      async function dD(a10, b10, c10) {
        return dC(a10, function(a11, b11, c11 = false) {
          if (!a11[1] && !a11[2] && !a11[3]) throw new co("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          void 0 !== b11 && (a11[8] = b11?.crit);
          let [, d10, e10, f10, g10, h10, i2, j2, k2] = a11;
          if (void 0 !== g10 && cs(g10, "JWE Additional Authenticated Data"), void 0 !== h10 && cs(h10, "JWE Content Encryption Key"), void 0 !== i2 && cs(i2, "JWE Initialization Vector"), c11 || void 0 === d10 || (d10 = cA(co, d10)[0], a11[1] = d10), void 0 !== e10 && (e10 = cA(co, e10)[0], a11[2] = e10), c11 || void 0 === f10 || (f10 = cA(co, f10)[0], a11[3] = f10), void 0 !== j2 && !ct(j2)) throw TypeError("JWE Key Management Parameters must be an object");
          dB(d10, e10, f10);
          let l2 = { ...d10, ...e10, ...f10 };
          (function(a12, b12) {
            let { crit: c12 } = b12 ?? {};
            if (Array.isArray(c12) && new Set(c12).size !== c12.length) throw new a12('"crit" (Critical) Header Parameter MUST NOT contain duplicate values');
          })(co, d10), cz(co, cx, k2, d10, l2), dw(l2, d10);
          let { alg: m2, enc: n2 } = l2;
          if ("string" != typeof m2 || !m2) throw new co('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          let o2 = c9[m2];
          if (o2?.mode === "integrated-encryption") {
            if (void 0 !== n2) throw new co('JWE "enc" (Encryption Algorithm) Header Parameter must not be present for integrated encryption');
            if (void 0 !== h10) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${m2}`);
            if (void 0 !== i2) throw TypeError(`setInitializationVector cannot be called with JWE "alg" (Algorithm) Header ${m2}`);
            return [l2, void 0, o2];
          }
          if ("string" != typeof n2 || !n2) throw new co('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          return [l2, dg(n2), o2];
        }(a10, c10), b10);
      }
      let dE = (a10) => Math.floor(a10.getTime() / 1e3), dF = { s: 1, m: 60, h: 3600, d: 86400, w: 604800, y: 31557600 }, dG = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, dH = "check_failed";
      function dI() {
        throw TypeError("Invalid time period format");
      }
      function dJ(a10) {
        "string" != typeof a10 && dI();
        let b10 = dG.exec(a10);
        (!b10 || b10[4] && b10[1]) && dI();
        let c10 = Math.round(parseFloat(b10[2]) * dF[b10[3][0].toLowerCase()]);
        return Number.isFinite(c10) || dI(), "-" === b10[1] || "ago" === b10[4] ? -c10 : c10;
      }
      function dK(a10, b10) {
        if (!Number.isFinite(b10)) throw TypeError(`Invalid ${a10} input`);
        return b10;
      }
      function dL(a10, b10) {
        if ("string" != typeof b10) throw TypeError(`"${a10}" claim must be a string`);
      }
      function dM(a10, b10) {
        return "number" == typeof a10 ? dK(b10, a10) : a10 instanceof Date ? dK(b10, dE(a10)) : dE(/* @__PURE__ */ new Date()) + dJ(a10);
      }
      let dN = (a10) => {
        let b10 = a10.toLowerCase();
        return a10.includes("/") ? b10 : `application/${b10}`;
      };
      function dO(a10, b10, c10 = false) {
        let d10 = a10[b10];
        if (!(void 0 === d10 && !c10)) {
          if ("number" != typeof d10) throw new cj(`"${b10}" claim must be a number`, a10, b10, "invalid");
          return d10;
        }
      }
      function dP(a10, b10) {
        throw new cj(`unexpected "${b10}" claim value`, a10, b10, dH);
      }
      function dQ(a10) {
        return f.get(a10);
      }
      class dR {
        constructor(a10 = {}) {
          if (!ct(a10)) throw TypeError("JWT Claims Set MUST be an object");
          (f ||= /* @__PURE__ */ new WeakMap()).set(this, structuredClone(a10));
        }
        setIssuer(a10) {
          return dL("iss", a10), dQ(this).iss = a10, this;
        }
        setSubject(a10) {
          return dL("sub", a10), dQ(this).sub = a10, this;
        }
        setAudience(a10) {
          return function(a11) {
            if ("string" != typeof a11 && (!Array.isArray(a11) || Array.from(a11).some((a12) => "string" != typeof a12))) throw TypeError('"aud" claim must be a string or an array of strings');
          }(a10), dQ(this).aud = a10, this;
        }
        setJti(a10) {
          return dL("jti", a10), dQ(this).jti = a10, this;
        }
        setNotBefore(a10) {
          return dQ(this).nbf = dM(a10, "setNotBefore"), this;
        }
        setExpirationTime(a10) {
          return dQ(this).exp = dM(a10, "setExpirationTime"), this;
        }
        setIssuedAt(a10) {
          let b10 = dQ(this);
          return void 0 === a10 ? b10.iat = dE(/* @__PURE__ */ new Date()) : "string" == typeof a10 ? b10.iat = dK("setIssuedAt", dE(/* @__PURE__ */ new Date()) + dJ(a10)) : b10.iat = dM(a10, "setIssuedAt"), this;
        }
      }
      let dS = dR;
      class dT extends dS {
        #a = [void 0];
        #b;
        #c;
        #d;
        setProtectedHeader(a10) {
          return cv(this.#a[1], "setProtectedHeader"), this.#a[1] = a10, this;
        }
        setKeyManagementParameters(a10) {
          return cv(this.#a[7], "setKeyManagementParameters"), this.#a[7] = a10, this;
        }
        setContentEncryptionKey(a10) {
          return cv(this.#a[5], "setContentEncryptionKey"), this.#a[5] = a10, this;
        }
        setInitializationVector(a10) {
          return cv(this.#a[6], "setInitializationVector"), this.#a[6] = a10, this;
        }
        replicateIssuerAsHeader() {
          return this.#b = true, this;
        }
        replicateSubjectAsHeader() {
          return this.#c = true, this;
        }
        replicateAudienceAsHeader() {
          return this.#d = true, this;
        }
        async encrypt(a10, b10) {
          var c10;
          let d10 = function(a11) {
            let b11 = dQ(a11);
            for (let a12 of ["iat", "nbf", "exp"]) {
              let c11 = b11[a12];
              if ("number" == typeof c11 && !Number.isFinite(c11)) throw TypeError(`"${a12}" claim must be a finite number`);
            }
            return b6.encode(JSON.stringify(b11));
          }(this);
          this.#a[1] && (this.#b || this.#c || this.#d) && (this.#a[1] = { ...this.#a[1], iss: this.#b ? dQ(this).iss : void 0, sub: this.#c ? dQ(this).sub : void 0, aud: this.#d ? dQ(this).aud : void 0 });
          let e10 = [...this.#a];
          return e10[0] = d10, [(c10 = await dD(e10, a10, b10)).protected, c10.encrypted_key, c10.iv, c10.ciphertext, c10.tag].join(".");
        }
      }
      async function dU(a10, b10, c10, d10 = function(a11) {
        let b11, { protected: c11, ciphertext: d11, iv: e10, tag: f10, aad: g10 } = a11;
        return void 0 !== c11 && (b11 = function(a12, b12, c12) {
          let d12;
          try {
            d12 = JSON.parse(b8.decode(cg(a12)));
          } catch {
            throw new b12(c12);
          }
          if (!ct(d12)) throw new b12(c12);
          return d12;
        }(c11, co, "JWE Protected Header is invalid")), [b11, cw(d11, "ciphertext", co), void 0 !== e10 ? cw(e10, "iv", co) : void 0, void 0 !== f10 ? cw(f10, "tag", co) : void 0, function(a12, b12, c12) {
          try {
            return ce(a12);
          } catch {
            throw new c12("The aad is not a valid base64url string");
          }
        }((c11 ?? "") + (void 0 !== g10 ? `.${g10}` : ""), 0, co)];
      }(a10)) {
        let e10, f10, g10, h10, [i2, j2, k2, l2, m2] = d10, { header: n2, unprotected: o2, aad: p2 } = a10;
        if (void 0 !== n2 || void 0 !== o2) {
          if (!cu(i2, n2, o2)) throw new co("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
          e10 = { ...i2, ...n2, ...o2 };
        } else e10 = i2 ?? {};
        let [q2, r2, s2, t2, u2] = b10, { encrypted_key: v2 } = a10;
        cz(co, cx, s2, i2, e10), dw(e10, i2);
        let { alg: w2, enc: x2 } = e10;
        if ("string" != typeof w2 || !w2) throw new co("missing JWE Algorithm (alg) in JWE Header");
        let y2 = c9[w2];
        if ("" === v2 && (!y2 || !df(y2))) throw new co("JWE Encrypted Key incorrect type");
        let z2 = y2?.mode === "integrated-encryption";
        if (!z2 && ("string" != typeof x2 || !x2)) throw new co("missing JWE Encryption Algorithm (enc) in JWE Header");
        if (q2 && !q2.has(w2) || !q2 && w2.startsWith("PBES2")) throw new cl('"alg" (Algorithm) Header Parameter value not allowed');
        if (z2) {
          if (void 0 !== x2) throw new co('JWE "enc" (Encryption Algorithm) Header Parameter must not be present for integrated encryption');
          if (k2?.byteLength) throw new co("JWE Initialization Vector must be empty for integrated encryption");
          if (l2?.byteLength) throw new co("JWE Authentication Tag must be empty for integrated encryption");
        } else {
          if (r2 && !r2.has(x2)) throw new cl('"enc" (Encryption Algorithm) Header Parameter value not allowed');
          f10 = dg(x2);
        }
        if (void 0 !== v2) try {
          g10 = cw(v2, "encrypted_key", co);
        } catch (a11) {
          if (!y2 || !df(y2)) throw a11;
          g10 = new Uint8Array();
        }
        let A2 = false;
        "function" == typeof c10 && (c10 = await c10(i2, a10), A2 = true);
        let B2 = y2 ?? de(w2);
        df(B2) && void 0 === g10 && (g10 = new Uint8Array());
        let C2 = await cB("direct-encryption" === B2.mode ? f10 : B2, c10, "decrypt");
        if ("integrated-encryption" === B2.mode) h10 = await B2.decrypt(C2, g10, j2, m2, i2, e10);
        else {
          let a11, b11 = f10;
          try {
            a11 = await du(B2, b11, C2, g10, e10, t2), df(B2) && a11 instanceof Uint8Array && a11.byteLength << 3 !== b11.cekBits && (a11 = cT(b11));
          } catch (c11) {
            if (c11 instanceof TypeError || c11 instanceof co || c11 instanceof cm) throw c11;
            a11 = cT(b11);
          }
          h10 = await c0(b11, a11, j2, k2, l2, m2);
        }
        if ("DEF" === e10.zip) {
          let a11 = u2 ?? 25e4;
          if (0 === a11) throw new cm('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          if (a11 !== 1 / 0 && (!Number.isSafeInteger(a11) || a11 < 1)) throw TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
          h10 = await dA(h10, a11).catch((a12) => {
            throw a12 instanceof co ? a12 : new co("Failed to decompress plaintext", { cause: a12 });
          });
        }
        return { plaintext: h10, ...i2 && { protectedHeader: i2 }, ...void 0 !== p2 && { additionalAuthenticatedData: cw(p2, "aad", co) }, ...o2 && { sharedUnprotectedHeader: o2 }, ...n2 && { unprotectedHeader: n2 }, ...A2 && { key: C2 } };
      }
      async function dV(a10, b10, c10) {
        if (a10 instanceof Uint8Array && (a10 = b7.decode(a10)), "string" != typeof a10) throw new co("Compact JWE must be a string or Uint8Array");
        let { 0: d10, 1: e10, 2: f10, 3: g10, 4: h10, length: i2 } = a10.split(".");
        if (5 !== i2) throw new co("Invalid Compact JWE");
        return dU({ ciphertext: g10, iv: f10 || void 0, protected: d10, tag: h10 || void 0, encrypted_key: e10 || void 0 }, b10, c10);
      }
      async function dW(a10, b10, c10) {
        let { plaintext: d10, ...e10 } = await dV(a10, [c10 && cy("keyManagementAlgorithms", c10.keyManagementAlgorithms), c10 && cy("contentEncryptionAlgorithms", c10.contentEncryptionAlgorithms), c10?.crit, c10?.maxPBES2Count, c10?.maxDecompressedLength], b10), { protectedHeader: f10 } = e10, g10 = function(a11, b11, c11 = {}) {
          let d11, e11, f11;
          try {
            d11 = JSON.parse(b8.decode(b11));
          } catch {
          }
          if (!ct(d11)) throw new cp("JWT Claims Set must be a top-level JSON object");
          let { typ: g11 } = c11;
          if (void 0 !== g11 && ("string" != typeof a11.typ || dN(a11.typ) !== dN(g11))) throw new cj('unexpected "typ" JWT header value', d11, "typ", dH);
          let { requiredClaims: h10 = [], issuer: i2, subject: j2, audience: k2, maxTokenAge: l2 } = c11, m2 = [...h10];
          for (let a12 of (void 0 !== l2 && m2.push("iat"), void 0 !== k2 && m2.push("aud"), void 0 !== j2 && m2.push("sub"), void 0 !== i2 && m2.push("iss"), new Set(m2.reverse()))) if (!Object.hasOwn(d11, a12)) throw new cj(`missing required "${a12}" claim`, d11, a12, "missing");
          void 0 === i2 || (Array.isArray(i2) ? i2 : [i2]).includes(d11.iss) || dP(d11, "iss"), void 0 !== j2 && d11.sub !== j2 && dP(d11, "sub"), void 0 === k2 || (e11 = d11.aud, f11 = "string" == typeof k2 ? [k2] : k2, "string" == typeof e11 ? f11.includes(e11) : !!Array.isArray(e11) && f11.some((a12) => e11.includes(a12))) || dP(d11, "aud");
          let { clockTolerance: n2 } = c11, o2 = 0;
          if ("string" == typeof n2) o2 = dJ(n2);
          else if (void 0 !== n2) {
            if ("number" != typeof n2) throw TypeError("Invalid clockTolerance option type");
            o2 = n2;
          }
          dK("clockTolerance option", o2);
          let { currentDate: p2 } = c11, q2 = dK("currentDate option", dE(void 0 === p2 ? /* @__PURE__ */ new Date() : p2)), r2 = dO(d11, "iat", void 0 !== l2), s2 = dO(d11, "nbf");
          if (void 0 !== s2 && s2 > q2 + o2) throw new cj('"nbf" claim timestamp check failed', d11, "nbf", dH);
          let t2 = dO(d11, "exp");
          if (void 0 !== t2 && t2 <= q2 - o2) throw new ck('"exp" claim timestamp check failed', d11, "exp", dH);
          if (void 0 !== l2) {
            let a12 = q2 - r2;
            if (a12 - o2 > dK("maxTokenAge option", "number" == typeof l2 ? l2 : dJ(l2))) throw new ck('"iat" claim timestamp check failed (too far in the past)', d11, "iat", dH);
            if (a12 < -o2) throw new cj('"iat" claim timestamp check failed (it should be in the past)', d11, "iat", dH);
          }
          return d11;
        }(f10, d10, c10);
        for (let a11 of ["iss", "sub", "aud"]) if (void 0 !== f10[a11] && ("aud" === a11 ? JSON.stringify(f10.aud) !== JSON.stringify(g10.aud) : f10[a11] !== g10[a11])) throw new cj(`replicated "${a11}" claim header parameter mismatch`, g10, a11, "mismatch");
        return { payload: g10, ...e10 };
      }
      let dX = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, dY = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, dZ = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, d$ = /^[\u0020-\u003A\u003D-\u007E]*$/, d_ = Object.prototype.toString, d0 = (() => {
        let a10 = function() {
        };
        return a10.prototype = /* @__PURE__ */ Object.create(null), a10;
      })();
      function d1(a10, b10) {
        let c10 = new d0(), d10 = a10.length;
        if (d10 < 2) return c10;
        let e10 = b10?.decode || d5, f10 = 0;
        do {
          let b11 = a10.indexOf("=", f10);
          if (-1 === b11) break;
          let g10 = a10.indexOf(";", f10), h10 = -1 === g10 ? d10 : g10;
          if (b11 > h10) {
            f10 = a10.lastIndexOf(";", b11 - 1) + 1;
            continue;
          }
          let i2 = d2(a10, f10, b11), j2 = d3(a10, b11, i2), k2 = a10.slice(i2, j2);
          if (void 0 === c10[k2]) {
            let d11 = d2(a10, b11 + 1, h10), f11 = d3(a10, h10, d11), g11 = e10(a10.slice(d11, f11));
            c10[k2] = g11;
          }
          f10 = h10 + 1;
        } while (f10 < d10);
        return c10;
      }
      function d2(a10, b10, c10) {
        do {
          let c11 = a10.charCodeAt(b10);
          if (32 !== c11 && 9 !== c11) return b10;
        } while (++b10 < c10);
        return c10;
      }
      function d3(a10, b10, c10) {
        for (; b10 > c10; ) {
          let c11 = a10.charCodeAt(--b10);
          if (32 !== c11 && 9 !== c11) return b10 + 1;
        }
        return c10;
      }
      function d4(a10, b10, c10) {
        let d10 = c10?.encode || encodeURIComponent;
        if (!dX.test(a10)) throw TypeError(`argument name is invalid: ${a10}`);
        let e10 = d10(b10);
        if (!dY.test(e10)) throw TypeError(`argument val is invalid: ${b10}`);
        let f10 = a10 + "=" + e10;
        if (!c10) return f10;
        if (void 0 !== c10.maxAge) {
          if (!Number.isInteger(c10.maxAge)) throw TypeError(`option maxAge is invalid: ${c10.maxAge}`);
          f10 += "; Max-Age=" + c10.maxAge;
        }
        if (c10.domain) {
          if (!dZ.test(c10.domain)) throw TypeError(`option domain is invalid: ${c10.domain}`);
          f10 += "; Domain=" + c10.domain;
        }
        if (c10.path) {
          if (!d$.test(c10.path)) throw TypeError(`option path is invalid: ${c10.path}`);
          f10 += "; Path=" + c10.path;
        }
        if (c10.expires) {
          var g10;
          if (g10 = c10.expires, "[object Date]" !== d_.call(g10) || !Number.isFinite(c10.expires.valueOf())) throw TypeError(`option expires is invalid: ${c10.expires}`);
          f10 += "; Expires=" + c10.expires.toUTCString();
        }
        if (c10.httpOnly && (f10 += "; HttpOnly"), c10.secure && (f10 += "; Secure"), c10.partitioned && (f10 += "; Partitioned"), c10.priority) switch ("string" == typeof c10.priority ? c10.priority.toLowerCase() : void 0) {
          case "low":
            f10 += "; Priority=Low";
            break;
          case "medium":
            f10 += "; Priority=Medium";
            break;
          case "high":
            f10 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${c10.priority}`);
        }
        if (c10.sameSite) switch ("string" == typeof c10.sameSite ? c10.sameSite.toLowerCase() : c10.sameSite) {
          case true:
          case "strict":
            f10 += "; SameSite=Strict";
            break;
          case "lax":
            f10 += "; SameSite=Lax";
            break;
          case "none":
            f10 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${c10.sameSite}`);
        }
        return f10;
      }
      function d5(a10) {
        if (-1 === a10.indexOf("%")) return a10;
        try {
          return decodeURIComponent(a10);
        } catch (b10) {
          return a10;
        }
      }
      let { q: d6 } = k, d7 = "A256CBC-HS512";
      async function d8(a10) {
        let { token: b10 = {}, secret: c10, maxAge: d10 = 2592e3, salt: e10 } = a10, f10 = Array.isArray(c10) ? c10 : [c10], g10 = await ea(d7, f10[0], e10), h10 = await cS({ kty: "oct", k: ch(g10) }, `sha${g10.byteLength << 3}`);
        return await new dT(b10).setProtectedHeader({ alg: "dir", enc: d7, kid: h10 }).setIssuedAt().setExpirationTime((Date.now() / 1e3 | 0) + d10).setJti(crypto.randomUUID()).encrypt(g10);
      }
      async function d9(a10) {
        let { token: b10, secret: c10, salt: d10 } = a10, e10 = Array.isArray(c10) ? c10 : [c10];
        if (!b10) return null;
        let { payload: f10 } = await dW(b10, async ({ kid: a11, enc: b11 }) => {
          for (let c11 of e10) {
            let e11 = await ea(b11, c11, d10);
            if (void 0 === a11 || a11 === await cS({ kty: "oct", k: ch(e11) }, `sha${e11.byteLength << 3}`)) return e11;
          }
          throw Error("no matching decryption secret");
        }, { clockTolerance: 15, keyManagementAlgorithms: ["dir"], contentEncryptionAlgorithms: [d7, "A256GCM"] });
        return f10;
      }
      async function ea(a10, b10, c10) {
        let d10;
        switch (a10) {
          case "A256CBC-HS512":
            d10 = 64;
            break;
          case "A256GCM":
            d10 = 32;
            break;
          default:
            throw Error("Unsupported JWT Content Encryption Algorithm");
        }
        return await b5("sha256", b10, c10, `Auth.js Generated Encryption Key (${c10})`, d10);
      }
      async function eb({ options: a10, paramValue: b10, cookieValue: c10 }) {
        let { url: d10, callbacks: e10 } = a10, f10 = d10.origin;
        return b10 ? f10 = await e10.redirect({ url: b10, baseUrl: d10.origin }) : c10 && (f10 = await e10.redirect({ url: c10, baseUrl: d10.origin })), { callbackUrl: f10, callbackUrlCookie: f10 !== c10 ? f10 : void 0 };
      }
      let ec = "\x1B[31m", ed = "\x1B[0m", ee = { error(a10) {
        let b10 = a10 instanceof bo ? a10.type : a10.name;
        if (console.error(`${ec}[auth][error]${ed} ${b10}: ${a10.message}`), a10.cause && "object" == typeof a10.cause && "err" in a10.cause && a10.cause.err instanceof Error) {
          let { err: b11, ...c10 } = a10.cause;
          console.error(`${ec}[auth][cause]${ed}:`, b11.stack), c10 && console.error(`${ec}[auth][details]${ed}:`, JSON.stringify(c10, null, 2));
        } else a10.stack && console.error(a10.stack.replace(/.*/, "").substring(1));
      }, warn(a10) {
        console.warn(`\x1B[33m[auth][warn][${a10}]${ed}`, "Read more: https://warnings.authjs.dev");
      }, debug(a10, b10) {
        console.log(`\x1B[90m[auth][debug]:${ed} ${a10}`, JSON.stringify(b10, null, 2));
      } };
      function ef(a10) {
        let b10 = { ...ee };
        return a10.debug || (b10.debug = () => {
        }), a10.logger?.error && (b10.error = a10.logger.error), a10.logger?.warn && (b10.warn = a10.logger.warn), a10.logger?.debug && (b10.debug = a10.logger.debug), a10.logger ?? (a10.logger = b10), b10;
      }
      let eg = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "webauthn-options"], { q: eh, l: ei } = k;
      async function ej(a10) {
        if (!("body" in a10) || !a10.body || "POST" !== a10.method) return;
        let b10 = a10.headers.get("content-type");
        return b10?.includes("application/json") ? await a10.json() : b10?.includes("application/x-www-form-urlencoded") ? Object.fromEntries(new URLSearchParams(await a10.text())) : void 0;
      }
      async function ek(a10, b10) {
        try {
          if ("GET" !== a10.method && "POST" !== a10.method) throw new bL("Only GET and POST requests are supported");
          b10.basePath ?? (b10.basePath = "/auth");
          let c10 = new URL(a10.url), { action: d10, providerId: e10 } = function(a11, b11) {
            let c11 = a11.match(RegExp(`^${b11}(.+)`));
            if (null === c11) throw new bL(`Cannot parse action at ${a11}`);
            let d11 = c11.at(-1).replace(/^\//, "").split("/").filter(Boolean);
            if (1 !== d11.length && 2 !== d11.length) throw new bL(`Cannot parse action at ${a11}`);
            let [e11, f10] = d11;
            if (!eg.includes(e11) || f10 && !["signin", "callback", "webauthn-options"].includes(e11)) throw new bL(`Cannot parse action at ${a11}`);
            return { action: e11, providerId: "undefined" == f10 ? void 0 : f10 };
          }(c10.pathname, b10.basePath);
          return { url: c10, action: d10, providerId: e10, method: a10.method, headers: Object.fromEntries(a10.headers), body: a10.body ? await ej(a10) : void 0, cookies: eh(a10.headers.get("cookie") ?? "") ?? {}, error: c10.searchParams.get("error") ?? void 0, query: Object.fromEntries(c10.searchParams) };
        } catch (d10) {
          let c10 = ef(b10);
          c10.error(d10), c10.debug("request", a10);
        }
      }
      function el(a10) {
        let b10 = new Headers(a10.headers);
        a10.cookies?.forEach((a11) => {
          let { name: c11, value: d11, options: e10 } = a11, f10 = ei(c11, d11, e10);
          b10.has("Set-Cookie") ? b10.append("Set-Cookie", f10) : b10.set("Set-Cookie", f10);
        });
        let c10 = a10.body;
        "application/json" === b10.get("content-type") ? c10 = JSON.stringify(a10.body) : "application/x-www-form-urlencoded" === b10.get("content-type") && (c10 = new URLSearchParams(a10.body).toString());
        let d10 = new Response(c10, { headers: b10, status: a10.redirect ? 302 : a10.status ?? 200 });
        return a10.redirect && d10.headers.set("Location", a10.redirect), d10;
      }
      async function em(a10) {
        let b10 = new TextEncoder().encode(a10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", b10))).map((a11) => a11.toString(16).padStart(2, "0")).join("").toString();
      }
      function en(a10) {
        return Array.from(crypto.getRandomValues(new Uint8Array(a10))).reduce((a11, b10) => a11 + ("0" + b10.toString(16)).slice(-2), "");
      }
      async function eo({ options: a10, cookieValue: b10, isPost: c10, bodyValue: d10 }) {
        if (b10) {
          let [e11, f11] = b10.split("|");
          if (f11 === await em(`${e11}${a10.secret}`)) return { csrfTokenVerified: c10 && e11 === d10, csrfToken: e11 };
        }
        let e10 = en(32), f10 = await em(`${e10}${a10.secret}`);
        return { cookie: `${e10}|${f10}`, csrfToken: e10 };
      }
      function ep(a10, b10) {
        if (!b10) throw new bQ(`CSRF token was missing during an action ${a10}`);
      }
      function eq(a10) {
        return null !== a10 && "object" == typeof a10;
      }
      function er(a10, ...b10) {
        if (!b10.length) return a10;
        let c10 = b10.shift();
        if (eq(a10) && eq(c10)) for (let b11 in c10) eq(c10[b11]) ? (eq(a10[b11]) || (a10[b11] = Array.isArray(c10[b11]) ? [] : {}), er(a10[b11], c10[b11])) : void 0 !== c10[b11] && (a10[b11] = c10[b11]);
        return er(a10, ...b10);
      }
      let es = Symbol("skip-csrf-check"), et = Symbol("return-type-raw"), eu = Symbol("custom-fetch"), ev = Symbol("conform-internal"), ew = (a10) => ey({ id: a10.sub ?? a10.id ?? crypto.randomUUID(), name: a10.name ?? a10.nickname ?? a10.preferred_username, email: a10.email, image: a10.picture }), ex = (a10) => ey({ access_token: a10.access_token, id_token: a10.id_token, refresh_token: a10.refresh_token, expires_at: a10.expires_at, scope: a10.scope, token_type: a10.token_type, session_state: a10.session_state });
      function ey(a10) {
        let b10 = {};
        for (let [c10, d10] of Object.entries(a10)) void 0 !== d10 && (b10[c10] = d10);
        return b10;
      }
      function ez(a10, b10) {
        if (!a10 && b10) return;
        if ("string" == typeof a10) return { url: new URL(a10) };
        let c10 = new URL(a10?.url ?? "https://authjs.dev");
        if (a10?.params != null) for (let [b11, d10] of Object.entries(a10.params)) "claims" === b11 && (d10 = JSON.stringify(d10)), c10.searchParams.set(b11, String(d10));
        return { url: c10, request: a10?.request, conform: a10?.conform, ...a10?.clientPrivateKey ? { clientPrivateKey: a10?.clientPrivateKey } : null };
      }
      let eA = { signIn: () => true, redirect: ({ url: a10, baseUrl: b10 }) => a10.startsWith("/") ? `${b10}${a10}` : new URL(a10).origin === b10 ? a10 : b10, session: ({ session: a10 }) => ({ user: { name: a10.user?.name, email: a10.user?.email, image: a10.user?.image }, expires: a10.expires?.toISOString?.() ?? a10.expires }), jwt: ({ token: a10 }) => a10 };
      async function eB({ authOptions: a10, providerId: b10, action: c10, url: d10, cookies: e10, callbackUrl: f10, csrfToken: g10, csrfDisabled: h10, isPost: i2 }) {
        var j2, k2;
        let l2 = ef(a10), { providers: m2, provider: n2 } = function(a11) {
          let { providerId: b11, config: c11 } = a11, d11 = new URL(c11.basePath ?? "/auth", a11.url.origin), e11 = c11.providers.map((a12) => {
            let b12 = "function" == typeof a12 ? a12() : a12, { options: e12, ...f12 } = b12, g11 = e12?.id ?? f12.id, h11 = er(f12, e12, { signinUrl: `${d11}/signin/${g11}`, callbackUrl: `${d11}/callback/${g11}` });
            if ("oauth" === b12.type || "oidc" === b12.type) {
              h11.redirectProxyUrl ?? (h11.redirectProxyUrl = e12?.redirectProxyUrl ?? c11.redirectProxyUrl);
              let a13 = function(a14) {
                a14.issuer && (a14.wellKnown ?? (a14.wellKnown = `${a14.issuer}/.well-known/openid-configuration`));
                let b13 = ez(a14.authorization, a14.issuer);
                b13 && !b13.url?.searchParams.has("scope") && b13.url.searchParams.set("scope", "openid profile email");
                let c12 = ez(a14.token, a14.issuer), d12 = ez(a14.userinfo, a14.issuer), e13 = a14.checks ?? ["pkce"];
                return a14.redirectProxyUrl && (e13.includes("state") || e13.push("state"), a14.redirectProxyUrl = `${a14.redirectProxyUrl}/callback/${a14.id}`), { ...a14, authorization: b13, token: c12, checks: e13, userinfo: d12, profile: a14.profile ?? ew, account: a14.account ?? ex };
              }(h11);
              return a13.authorization?.url.searchParams.get("response_mode") === "form_post" && delete a13.redirectProxyUrl, a13[eu] ?? (a13[eu] = e12?.[eu]), a13;
            }
            return h11;
          }), f11 = e11.find(({ id: a12 }) => a12 === b11);
          if (b11 && !f11) {
            let a12 = e11.map((a13) => a13.id).join(", ");
            throw Error(`Provider with id "${b11}" not found. Available providers: [${a12}].`);
          }
          return { providers: e11, provider: f11 };
        }({ url: d10, providerId: b10, config: a10 }), o2 = false;
        if ((n2?.type === "oauth" || n2?.type === "oidc") && n2.redirectProxyUrl) try {
          o2 = new URL(n2.redirectProxyUrl).origin === d10.origin;
        } catch {
          throw TypeError(`redirectProxyUrl must be a valid URL. Received: ${n2.redirectProxyUrl}`);
        }
        let p2 = { debug: false, pages: {}, theme: { colorScheme: "auto", logo: "", brandColor: "", buttonText: "" }, ...a10, url: d10, action: c10, provider: n2, cookies: er(bm(a10.useSecureCookies ?? "https:" === d10.protocol), a10.cookies), providers: m2, session: { strategy: a10.adapter ? "database" : "jwt", maxAge: 2592e3, updateAge: 86400, generateSessionToken: () => crypto.randomUUID(), ...a10.session }, jwt: { secret: a10.secret, maxAge: a10.session?.maxAge ?? 2592e3, encode: d8, decode: d9, ...a10.jwt }, events: (j2 = a10.events ?? {}, k2 = l2, Object.keys(j2).reduce((a11, b11) => (a11[b11] = async (...a12) => {
          try {
            let c11 = j2[b11];
            return await c11(...a12);
          } catch (a13) {
            k2.error(new bu(a13));
          }
        }, a11), {})), adapter: function(a11, b11) {
          if (a11) return Object.keys(a11).reduce((c11, d11) => (c11[d11] = async (...c12) => {
            try {
              b11.debug(`adapter_${d11}`, { args: c12 });
              let e11 = a11[d11];
              return await e11(...c12);
            } catch (c13) {
              let a12 = new bq(c13);
              throw b11.error(a12), a12;
            }
          }, c11), {});
        }(a10.adapter, l2), callbacks: { ...eA, ...a10.callbacks }, logger: l2, callbackUrl: d10.origin, isOnRedirectProxy: o2, experimental: { ...a10.experimental } }, q2 = [];
        if (h10) p2.csrfTokenVerified = true;
        else {
          let { csrfToken: a11, cookie: b11, csrfTokenVerified: c11 } = await eo({ options: p2, cookieValue: e10?.[p2.cookies.csrfToken.name], isPost: i2, bodyValue: g10 });
          p2.csrfToken = a11, p2.csrfTokenVerified = c11, b11 && q2.push({ name: p2.cookies.csrfToken.name, value: b11, options: p2.cookies.csrfToken.options });
        }
        let { callbackUrl: r2, callbackUrlCookie: s2 } = await eb({ options: p2, cookieValue: e10?.[p2.cookies.callbackUrl.name], paramValue: f10 });
        return p2.callbackUrl = r2, s2 && q2.push({ name: p2.cookies.callbackUrl.name, value: s2, options: p2.cookies.callbackUrl.options }), { options: p2, cookies: q2 };
      }
      var eC, eD, eE, eF, eG, eH, eI, eJ, eK, eL, eM, eN, eO, eP, eQ, eR, eS = {}, eT = [], eU = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, eV = Array.isArray;
      function eW(a10, b10) {
        for (var c10 in b10) a10[c10] = b10[c10];
        return a10;
      }
      function eX(a10) {
        a10 && a10.parentNode && a10.parentNode.removeChild(a10);
      }
      function eY(a10, b10, c10, d10, e10) {
        var f10 = { type: a10, props: b10, key: c10, ref: d10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == e10 ? ++eK : e10, __i: -1, __u: 0 };
        return null == e10 && null != eJ.vnode && eJ.vnode(f10), f10;
      }
      function eZ(a10) {
        return a10.children;
      }
      function e$(a10, b10) {
        this.props = a10, this.context = b10;
      }
      function e_(a10, b10) {
        if (null == b10) return a10.__ ? e_(a10.__, a10.__i + 1) : null;
        for (var c10; b10 < a10.__k.length; b10++) if (null != (c10 = a10.__k[b10]) && null != c10.__e) return c10.__e;
        return "function" == typeof a10.type ? e_(a10) : null;
      }
      function e0(a10) {
        (!a10.__d && (a10.__d = true) && eL.push(a10) && !e1.__r++ || eM !== eJ.debounceRendering) && ((eM = eJ.debounceRendering) || eN)(e1);
      }
      function e1() {
        var a10, b10, c10, d10, e10, f10, g10, h10;
        for (eL.sort(eO); a10 = eL.shift(); ) a10.__d && (b10 = eL.length, d10 = void 0, f10 = (e10 = (c10 = a10).__v).__e, g10 = [], h10 = [], c10.__P && ((d10 = eW({}, e10)).__v = e10.__v + 1, eJ.vnode && eJ.vnode(d10), e6(c10.__P, d10, e10, c10.__n, c10.__P.namespaceURI, 32 & e10.__u ? [f10] : null, g10, null == f10 ? e_(e10) : f10, !!(32 & e10.__u), h10), d10.__v = e10.__v, d10.__.__k[d10.__i] = d10, function(a11, b11, c11) {
          b11.__d = void 0;
          for (var d11 = 0; d11 < c11.length; d11++) e7(c11[d11], c11[++d11], c11[++d11]);
          eJ.__c && eJ.__c(b11, a11), a11.some(function(b12) {
            try {
              a11 = b12.__h, b12.__h = [], a11.some(function(a12) {
                a12.call(b12);
              });
            } catch (a12) {
              eJ.__e(a12, b12.__v);
            }
          });
        }(g10, d10, h10), d10.__e != f10 && function a11(b11) {
          var c11, d11;
          if (null != (b11 = b11.__) && null != b11.__c) {
            for (b11.__e = b11.__c.base = null, c11 = 0; c11 < b11.__k.length; c11++) if (null != (d11 = b11.__k[c11]) && null != d11.__e) {
              b11.__e = b11.__c.base = d11.__e;
              break;
            }
            return a11(b11);
          }
        }(d10)), eL.length > b10 && eL.sort(eO));
        e1.__r = 0;
      }
      function e2(a10, b10, c10, d10, e10, f10, g10, h10, i2, j2, k2) {
        var l2, m2, n2, o2, p2, q2 = d10 && d10.__k || eT, r2 = b10.length;
        for (c10.__d = i2, function(a11, b11, c11) {
          var d11, e11, f11, g11, h11, i3 = b11.length, j3 = c11.length, k3 = j3, l3 = 0;
          for (a11.__k = [], d11 = 0; d11 < i3; d11++) null != (e11 = b11[d11]) && "boolean" != typeof e11 && "function" != typeof e11 ? (g11 = d11 + l3, (e11 = a11.__k[d11] = "string" == typeof e11 || "number" == typeof e11 || "bigint" == typeof e11 || e11.constructor == String ? eY(null, e11, null, null, null) : eV(e11) ? eY(eZ, { children: e11 }, null, null, null) : void 0 === e11.constructor && e11.__b > 0 ? eY(e11.type, e11.props, e11.key, e11.ref ? e11.ref : null, e11.__v) : e11).__ = a11, e11.__b = a11.__b + 1, f11 = null, -1 !== (h11 = e11.__i = function(a12, b12, c12, d12) {
            var e12 = a12.key, f12 = a12.type, g12 = c12 - 1, h12 = c12 + 1, i4 = b12[c12];
            if (null === i4 || i4 && e12 == i4.key && f12 === i4.type && 0 == (131072 & i4.__u)) return c12;
            if (d12 > +(null != i4 && 0 == (131072 & i4.__u))) for (; g12 >= 0 || h12 < b12.length; ) {
              if (g12 >= 0) {
                if ((i4 = b12[g12]) && 0 == (131072 & i4.__u) && e12 == i4.key && f12 === i4.type) return g12;
                g12--;
              }
              if (h12 < b12.length) {
                if ((i4 = b12[h12]) && 0 == (131072 & i4.__u) && e12 == i4.key && f12 === i4.type) return h12;
                h12++;
              }
            }
            return -1;
          }(e11, c11, g11, k3)) && (k3--, (f11 = c11[h11]) && (f11.__u |= 131072)), null == f11 || null === f11.__v ? (-1 == h11 && l3--, "function" != typeof e11.type && (e11.__u |= 65536)) : h11 !== g11 && (h11 == g11 - 1 ? l3-- : h11 == g11 + 1 ? l3++ : (h11 > g11 ? l3-- : l3++, e11.__u |= 65536))) : e11 = a11.__k[d11] = null;
          if (k3) for (d11 = 0; d11 < j3; d11++) null != (f11 = c11[d11]) && 0 == (131072 & f11.__u) && (f11.__e == a11.__d && (a11.__d = e_(f11)), function a12(b12, c12, d12) {
            var e12, f12;
            if (eJ.unmount && eJ.unmount(b12), (e12 = b12.ref) && (e12.current && e12.current !== b12.__e || e7(e12, null, c12)), null != (e12 = b12.__c)) {
              if (e12.componentWillUnmount) try {
                e12.componentWillUnmount();
              } catch (a13) {
                eJ.__e(a13, c12);
              }
              e12.base = e12.__P = null;
            }
            if (e12 = b12.__k) for (f12 = 0; f12 < e12.length; f12++) e12[f12] && a12(e12[f12], c12, d12 || "function" != typeof b12.type);
            d12 || eX(b12.__e), b12.__c = b12.__ = b12.__e = b12.__d = void 0;
          }(f11, f11));
        }(c10, b10, q2), i2 = c10.__d, l2 = 0; l2 < r2; l2++) null != (n2 = c10.__k[l2]) && (m2 = -1 === n2.__i ? eS : q2[n2.__i] || eS, n2.__i = l2, e6(a10, n2, m2, e10, f10, g10, h10, i2, j2, k2), o2 = n2.__e, n2.ref && m2.ref != n2.ref && (m2.ref && e7(m2.ref, null, n2), k2.push(n2.ref, n2.__c || o2, n2)), null == p2 && null != o2 && (p2 = o2), 65536 & n2.__u || m2.__k === n2.__k ? i2 = function a11(b11, c11, d11) {
          var e11, f11;
          if ("function" == typeof b11.type) {
            for (e11 = b11.__k, f11 = 0; e11 && f11 < e11.length; f11++) e11[f11] && (e11[f11].__ = b11, c11 = a11(e11[f11], c11, d11));
            return c11;
          }
          b11.__e != c11 && (c11 && b11.type && !d11.contains(c11) && (c11 = e_(b11)), d11.insertBefore(b11.__e, c11 || null), c11 = b11.__e);
          do
            c11 = c11 && c11.nextSibling;
          while (null != c11 && 8 === c11.nodeType);
          return c11;
        }(n2, i2, a10) : "function" == typeof n2.type && void 0 !== n2.__d ? i2 = n2.__d : o2 && (i2 = o2.nextSibling), n2.__d = void 0, n2.__u &= -196609);
        c10.__d = i2, c10.__e = p2;
      }
      function e3(a10, b10, c10) {
        "-" === b10[0] ? a10.setProperty(b10, null == c10 ? "" : c10) : a10[b10] = null == c10 ? "" : "number" != typeof c10 || eU.test(b10) ? c10 : c10 + "px";
      }
      function e4(a10, b10, c10, d10, e10) {
        var f10;
        a: if ("style" === b10) if ("string" == typeof c10) a10.style.cssText = c10;
        else {
          if ("string" == typeof d10 && (a10.style.cssText = d10 = ""), d10) for (b10 in d10) c10 && b10 in c10 || e3(a10.style, b10, "");
          if (c10) for (b10 in c10) d10 && c10[b10] === d10[b10] || e3(a10.style, b10, c10[b10]);
        }
        else if ("o" === b10[0] && "n" === b10[1]) f10 = b10 !== (b10 = b10.replace(/(PointerCapture)$|Capture$/i, "$1")), b10 = b10.toLowerCase() in a10 || "onFocusOut" === b10 || "onFocusIn" === b10 ? b10.toLowerCase().slice(2) : b10.slice(2), a10.l || (a10.l = {}), a10.l[b10 + f10] = c10, c10 ? d10 ? c10.u = d10.u : (c10.u = eP, a10.addEventListener(b10, f10 ? eR : eQ, f10)) : a10.removeEventListener(b10, f10 ? eR : eQ, f10);
        else {
          if ("http://www.w3.org/2000/svg" == e10) b10 = b10.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if ("width" != b10 && "height" != b10 && "href" != b10 && "list" != b10 && "form" != b10 && "tabIndex" != b10 && "download" != b10 && "rowSpan" != b10 && "colSpan" != b10 && "role" != b10 && "popover" != b10 && b10 in a10) try {
            a10[b10] = null == c10 ? "" : c10;
            break a;
          } catch (a11) {
          }
          "function" == typeof c10 || (null == c10 || false === c10 && "-" !== b10[4] ? a10.removeAttribute(b10) : a10.setAttribute(b10, "popover" == b10 && 1 == c10 ? "" : c10));
        }
      }
      function e5(a10) {
        return function(b10) {
          if (this.l) {
            var c10 = this.l[b10.type + a10];
            if (null == b10.t) b10.t = eP++;
            else if (b10.t < c10.u) return;
            return c10(eJ.event ? eJ.event(b10) : b10);
          }
        };
      }
      function e6(a10, b10, c10, d10, e10, f10, g10, h10, i2, j2) {
        var k2, l2, m2, n2, o2, p2, q2, r2, s2, t2, u2, v2, w2, x2, y2, z2, A2 = b10.type;
        if (void 0 !== b10.constructor) return null;
        128 & c10.__u && (i2 = !!(32 & c10.__u), f10 = [h10 = b10.__e = c10.__e]), (k2 = eJ.__b) && k2(b10);
        a: if ("function" == typeof A2) try {
          if (r2 = b10.props, s2 = "prototype" in A2 && A2.prototype.render, t2 = (k2 = A2.contextType) && d10[k2.__c], u2 = k2 ? t2 ? t2.props.value : k2.__ : d10, c10.__c ? q2 = (l2 = b10.__c = c10.__c).__ = l2.__E : (s2 ? b10.__c = l2 = new A2(r2, u2) : (b10.__c = l2 = new e$(r2, u2), l2.constructor = A2, l2.render = e8), t2 && t2.sub(l2), l2.props = r2, l2.state || (l2.state = {}), l2.context = u2, l2.__n = d10, m2 = l2.__d = true, l2.__h = [], l2._sb = []), s2 && null == l2.__s && (l2.__s = l2.state), s2 && null != A2.getDerivedStateFromProps && (l2.__s == l2.state && (l2.__s = eW({}, l2.__s)), eW(l2.__s, A2.getDerivedStateFromProps(r2, l2.__s))), n2 = l2.props, o2 = l2.state, l2.__v = b10, m2) s2 && null == A2.getDerivedStateFromProps && null != l2.componentWillMount && l2.componentWillMount(), s2 && null != l2.componentDidMount && l2.__h.push(l2.componentDidMount);
          else {
            if (s2 && null == A2.getDerivedStateFromProps && r2 !== n2 && null != l2.componentWillReceiveProps && l2.componentWillReceiveProps(r2, u2), !l2.__e && (null != l2.shouldComponentUpdate && false === l2.shouldComponentUpdate(r2, l2.__s, u2) || b10.__v === c10.__v)) {
              for (b10.__v !== c10.__v && (l2.props = r2, l2.state = l2.__s, l2.__d = false), b10.__e = c10.__e, b10.__k = c10.__k, b10.__k.some(function(a11) {
                a11 && (a11.__ = b10);
              }), v2 = 0; v2 < l2._sb.length; v2++) l2.__h.push(l2._sb[v2]);
              l2._sb = [], l2.__h.length && g10.push(l2);
              break a;
            }
            null != l2.componentWillUpdate && l2.componentWillUpdate(r2, l2.__s, u2), s2 && null != l2.componentDidUpdate && l2.__h.push(function() {
              l2.componentDidUpdate(n2, o2, p2);
            });
          }
          if (l2.context = u2, l2.props = r2, l2.__P = a10, l2.__e = false, w2 = eJ.__r, x2 = 0, s2) {
            for (l2.state = l2.__s, l2.__d = false, w2 && w2(b10), k2 = l2.render(l2.props, l2.state, l2.context), y2 = 0; y2 < l2._sb.length; y2++) l2.__h.push(l2._sb[y2]);
            l2._sb = [];
          } else do
            l2.__d = false, w2 && w2(b10), k2 = l2.render(l2.props, l2.state, l2.context), l2.state = l2.__s;
          while (l2.__d && ++x2 < 25);
          l2.state = l2.__s, null != l2.getChildContext && (d10 = eW(eW({}, d10), l2.getChildContext())), s2 && !m2 && null != l2.getSnapshotBeforeUpdate && (p2 = l2.getSnapshotBeforeUpdate(n2, o2)), e2(a10, eV(z2 = null != k2 && k2.type === eZ && null == k2.key ? k2.props.children : k2) ? z2 : [z2], b10, c10, d10, e10, f10, g10, h10, i2, j2), l2.base = b10.__e, b10.__u &= -161, l2.__h.length && g10.push(l2), q2 && (l2.__E = l2.__ = null);
        } catch (a11) {
          if (b10.__v = null, i2 || null != f10) {
            for (b10.__u |= i2 ? 160 : 128; h10 && 8 === h10.nodeType && h10.nextSibling; ) h10 = h10.nextSibling;
            f10[f10.indexOf(h10)] = null, b10.__e = h10;
          } else b10.__e = c10.__e, b10.__k = c10.__k;
          eJ.__e(a11, b10, c10);
        }
        else null == f10 && b10.__v === c10.__v ? (b10.__k = c10.__k, b10.__e = c10.__e) : b10.__e = function(a11, b11, c11, d11, e11, f11, g11, h11, i3) {
          var j3, k3, l3, m3, n3, o3, p3, q3 = c11.props, r3 = b11.props, s3 = b11.type;
          if ("svg" === s3 ? e11 = "http://www.w3.org/2000/svg" : "math" === s3 ? e11 = "http://www.w3.org/1998/Math/MathML" : e11 || (e11 = "http://www.w3.org/1999/xhtml"), null != f11) {
            for (j3 = 0; j3 < f11.length; j3++) if ((n3 = f11[j3]) && "setAttribute" in n3 == !!s3 && (s3 ? n3.localName === s3 : 3 === n3.nodeType)) {
              a11 = n3, f11[j3] = null;
              break;
            }
          }
          if (null == a11) {
            if (null === s3) return document.createTextNode(r3);
            a11 = document.createElementNS(e11, s3, r3.is && r3), h11 && (eJ.__m && eJ.__m(b11, f11), h11 = false), f11 = null;
          }
          if (null === s3) q3 === r3 || h11 && a11.data === r3 || (a11.data = r3);
          else {
            if (f11 = f11 && eI.call(a11.childNodes), q3 = c11.props || eS, !h11 && null != f11) for (q3 = {}, j3 = 0; j3 < a11.attributes.length; j3++) q3[(n3 = a11.attributes[j3]).name] = n3.value;
            for (j3 in q3) if (n3 = q3[j3], "children" == j3) ;
            else if ("dangerouslySetInnerHTML" == j3) l3 = n3;
            else if (!(j3 in r3)) {
              if ("value" == j3 && "defaultValue" in r3 || "checked" == j3 && "defaultChecked" in r3) continue;
              e4(a11, j3, null, n3, e11);
            }
            for (j3 in r3) n3 = r3[j3], "children" == j3 ? m3 = n3 : "dangerouslySetInnerHTML" == j3 ? k3 = n3 : "value" == j3 ? o3 = n3 : "checked" == j3 ? p3 = n3 : h11 && "function" != typeof n3 || q3[j3] === n3 || e4(a11, j3, n3, q3[j3], e11);
            if (k3) h11 || l3 && (k3.__html === l3.__html || k3.__html === a11.innerHTML) || (a11.innerHTML = k3.__html), b11.__k = [];
            else if (l3 && (a11.innerHTML = ""), e2(a11, eV(m3) ? m3 : [m3], b11, c11, d11, "foreignObject" === s3 ? "http://www.w3.org/1999/xhtml" : e11, f11, g11, f11 ? f11[0] : c11.__k && e_(c11, 0), h11, i3), null != f11) for (j3 = f11.length; j3--; ) eX(f11[j3]);
            h11 || (j3 = "value", "progress" === s3 && null == o3 ? a11.removeAttribute("value") : void 0 === o3 || o3 === a11[j3] && ("progress" !== s3 || o3) && ("option" !== s3 || o3 === q3[j3]) || e4(a11, j3, o3, q3[j3], e11), j3 = "checked", void 0 !== p3 && p3 !== a11[j3] && e4(a11, j3, p3, q3[j3], e11));
          }
          return a11;
        }(c10.__e, b10, c10, d10, e10, f10, g10, i2, j2);
        (k2 = eJ.diffed) && k2(b10);
      }
      function e7(a10, b10, c10) {
        try {
          if ("function" == typeof a10) {
            var d10 = "function" == typeof a10.__u;
            d10 && a10.__u(), d10 && null == b10 || (a10.__u = a10(b10));
          } else a10.current = b10;
        } catch (a11) {
          eJ.__e(a11, c10);
        }
      }
      function e8(a10, b10, c10) {
        return this.constructor(a10, c10);
      }
      eI = eT.slice, eJ = { __e: function(a10, b10, c10, d10) {
        for (var e10, f10, g10; b10 = b10.__; ) if ((e10 = b10.__c) && !e10.__) try {
          if ((f10 = e10.constructor) && null != f10.getDerivedStateFromError && (e10.setState(f10.getDerivedStateFromError(a10)), g10 = e10.__d), null != e10.componentDidCatch && (e10.componentDidCatch(a10, d10 || {}), g10 = e10.__d), g10) return e10.__E = e10;
        } catch (b11) {
          a10 = b11;
        }
        throw a10;
      } }, eK = 0, e$.prototype.setState = function(a10, b10) {
        var c10;
        c10 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = eW({}, this.state), "function" == typeof a10 && (a10 = a10(eW({}, c10), this.props)), a10 && eW(c10, a10), null != a10 && this.__v && (b10 && this._sb.push(b10), e0(this));
      }, e$.prototype.forceUpdate = function(a10) {
        this.__v && (this.__e = true, a10 && this.__h.push(a10), e0(this));
      }, e$.prototype.render = eZ, eL = [], eN = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, eO = function(a10, b10) {
        return a10.__v.__b - b10.__v.__b;
      }, e1.__r = 0, eP = 0, eQ = e5(false), eR = e5(true);
      var e9 = /[\s\n\\/='"\0<>]/, fa = /^(xlink|xmlns|xml)([A-Z])/, fb = /^accessK|^auto[A-Z]|^cell|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z]/, fc = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, fd = /* @__PURE__ */ new Set(["draggable", "spellcheck"]), fe = /["&<]/;
      function ff(a10) {
        if (0 === a10.length || false === fe.test(a10)) return a10;
        for (var b10 = 0, c10 = 0, d10 = "", e10 = ""; c10 < a10.length; c10++) {
          switch (a10.charCodeAt(c10)) {
            case 34:
              e10 = "&quot;";
              break;
            case 38:
              e10 = "&amp;";
              break;
            case 60:
              e10 = "&lt;";
              break;
            default:
              continue;
          }
          c10 !== b10 && (d10 += a10.slice(b10, c10)), d10 += e10, b10 = c10 + 1;
        }
        return c10 !== b10 && (d10 += a10.slice(b10, c10)), d10;
      }
      var fg = {}, fh = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]), fi = /[A-Z]/g;
      function fj() {
        this.__d = true;
      }
      var fk, fl, fm, fn, fo = {}, fp = [], fq = Array.isArray, fr = Object.assign;
      function fs(a10, b10) {
        var c10, d10 = a10.type, e10 = true;
        return a10.__c ? (e10 = false, (c10 = a10.__c).state = c10.__s) : c10 = new d10(a10.props, b10), a10.__c = c10, c10.__v = a10, c10.props = a10.props, c10.context = b10, c10.__d = true, null == c10.state && (c10.state = fo), null == c10.__s && (c10.__s = c10.state), d10.getDerivedStateFromProps ? c10.state = fr({}, c10.state, d10.getDerivedStateFromProps(c10.props, c10.state)) : e10 && c10.componentWillMount ? (c10.componentWillMount(), c10.state = c10.__s !== c10.state ? c10.__s : c10.state) : !e10 && c10.componentWillUpdate && c10.componentWillUpdate(), fm && fm(a10), c10.render(c10.props, c10.state, b10);
      }
      var ft = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]), fu = 0;
      function fv(a10, b10, c10, d10, e10, f10) {
        b10 || (b10 = {});
        var g10, h10, i2 = b10;
        "ref" in b10 && (g10 = b10.ref, delete b10.ref);
        var j2 = { type: a10, props: i2, key: c10, ref: g10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --fu, __i: -1, __u: 0, __source: e10, __self: f10 };
        if ("function" == typeof a10 && (g10 = a10.defaultProps)) for (h10 in g10) void 0 === i2[h10] && (i2[h10] = g10[h10]);
        return eJ.vnode && eJ.vnode(j2), j2;
      }
      async function fw(a10, b10) {
        let c10 = window.SimpleWebAuthnBrowser;
        async function d10(c11) {
          let d11 = new URL(`${a10}/webauthn-options/${b10}`);
          c11 && d11.searchParams.append("action", c11), f10().forEach((a11) => {
            d11.searchParams.append(a11.name, a11.value);
          });
          let e11 = await fetch(d11);
          return e11.ok ? e11.json() : void console.error("Failed to fetch options", e11);
        }
        function e10() {
          let a11 = `#${b10}-form`, c11 = document.querySelector(a11);
          if (!c11) throw Error(`Form '${a11}' not found`);
          return c11;
        }
        function f10() {
          return Array.from(e10().querySelectorAll("input[data-form-field]"));
        }
        async function g10(a11, b11) {
          let c11 = e10();
          if (a11) {
            let b12 = document.createElement("input");
            b12.type = "hidden", b12.name = "action", b12.value = a11, c11.appendChild(b12);
          }
          if (b11) {
            let a12 = document.createElement("input");
            a12.type = "hidden", a12.name = "data", a12.value = JSON.stringify(b11), c11.appendChild(a12);
          }
          return c11.submit();
        }
        async function h10(a11, b11) {
          let d11 = await c10.startAuthentication(a11, b11);
          return await g10("authenticate", d11);
        }
        async function i2(a11) {
          f10().forEach((a12) => {
            if (a12.required && !a12.value) throw Error(`Missing required field: ${a12.name}`);
          });
          let b11 = await c10.startRegistration(a11);
          return await g10("register", b11);
        }
        async function j2() {
          if (!c10.browserSupportsWebAuthnAutofill()) return;
          let a11 = await d10("authenticate");
          if (!a11) return void console.error("Failed to fetch option for autofill authentication");
          try {
            await h10(a11.options, true);
          } catch (a12) {
            console.error(a12);
          }
        }
        (async function() {
          let a11 = e10();
          if (!c10.browserSupportsWebAuthn()) {
            a11.style.display = "none";
            return;
          }
          a11 && a11.addEventListener("submit", async (a12) => {
            a12.preventDefault();
            let b11 = await d10(void 0);
            if (!b11) return void console.error("Failed to fetch options for form submission");
            if ("authenticate" === b11.action) try {
              await h10(b11.options, false);
            } catch (a13) {
              console.error(a13);
            }
            else if ("register" === b11.action) try {
              await i2(b11.options);
            } catch (a13) {
              console.error(a13);
            }
          });
        })(), j2();
      }
      let fx = { default: "Unable to sign in.", Signin: "Try signing in with a different account.", OAuthSignin: "Try signing in with a different account.", OAuthCallbackError: "Try signing in with a different account.", OAuthCreateAccount: "Try signing in with a different account.", EmailCreateAccount: "Try signing in with a different account.", Callback: "Try signing in with a different account.", OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.", EmailSignin: "The e-mail could not be sent.", CredentialsSignin: "Sign in failed. Check the details you provided are correct.", SessionRequired: "Please sign in to access this page." }, fy = `:root {
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
      function fz({ html: a10, title: b10, status: c10, cookies: d10, theme: e10, headTags: f10 }) {
        return { cookies: d10, status: c10, headers: { "Content-Type": "text/html" }, body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${fy}</style><title>${b10}</title>${f10 ?? ""}</head><body class="__next-auth-theme-${e10?.colorScheme ?? "auto"}"><div class="page">${function(a11, b11, c11) {
          var d11 = eJ.__s;
          eJ.__s = true, fk = eJ.__b, fl = eJ.diffed, fm = eJ.__r, fn = eJ.unmount;
          var e11 = function(a12, b12, c12) {
            var d12, e12, f12, g10 = {};
            for (f12 in b12) "key" == f12 ? d12 = b12[f12] : "ref" == f12 ? e12 = b12[f12] : g10[f12] = b12[f12];
            if (arguments.length > 2 && (g10.children = arguments.length > 3 ? eI.call(arguments, 2) : c12), "function" == typeof a12 && null != a12.defaultProps) for (f12 in a12.defaultProps) void 0 === g10[f12] && (g10[f12] = a12.defaultProps[f12]);
            return eY(a12, g10, d12, e12, null);
          }(eZ, null);
          e11.__k = [a11];
          try {
            var f11 = function a12(b12, c12, d12, e12, f12, g10, h10) {
              if (null == b12 || true === b12 || false === b12 || "" === b12) return "";
              var i2 = typeof b12;
              if ("object" != i2) return "function" == i2 ? "" : "string" == i2 ? ff(b12) : b12 + "";
              if (fq(b12)) {
                var j2, k2 = "";
                f12.__k = b12;
                for (var l2 = 0; l2 < b12.length; l2++) {
                  var m2 = b12[l2];
                  if (null != m2 && "boolean" != typeof m2) {
                    var n2, o2 = a12(m2, c12, d12, e12, f12, g10, h10);
                    "string" == typeof o2 ? k2 += o2 : (j2 || (j2 = []), k2 && j2.push(k2), k2 = "", fq(o2) ? (n2 = j2).push.apply(n2, o2) : j2.push(o2));
                  }
                }
                return j2 ? (k2 && j2.push(k2), j2) : k2;
              }
              if (void 0 !== b12.constructor) return "";
              b12.__ = f12, fk && fk(b12);
              var p2 = b12.type, q2 = b12.props;
              if ("function" == typeof p2) {
                var r2, s2, t2, u2 = c12;
                if (p2 === eZ) {
                  if ("tpl" in q2) {
                    for (var v2 = "", w2 = 0; w2 < q2.tpl.length; w2++) if (v2 += q2.tpl[w2], q2.exprs && w2 < q2.exprs.length) {
                      var x2 = q2.exprs[w2];
                      if (null == x2) continue;
                      "object" == typeof x2 && (void 0 === x2.constructor || fq(x2)) ? v2 += a12(x2, c12, d12, e12, b12, g10, h10) : v2 += x2;
                    }
                    return v2;
                  }
                  if ("UNSTABLE_comment" in q2) return "<!--" + ff(q2.UNSTABLE_comment) + "-->";
                  s2 = q2.children;
                } else {
                  if (null != (r2 = p2.contextType)) {
                    var y2 = c12[r2.__c];
                    u2 = y2 ? y2.props.value : r2.__;
                  }
                  var z2 = p2.prototype && "function" == typeof p2.prototype.render;
                  if (z2) s2 = fs(b12, u2), t2 = b12.__c;
                  else {
                    b12.__c = t2 = { __v: b12, context: u2, props: b12.props, setState: fj, forceUpdate: fj, __d: true, __h: [] };
                    for (var A2 = 0; t2.__d && A2++ < 25; ) t2.__d = false, fm && fm(b12), s2 = p2.call(t2, q2, u2);
                    t2.__d = true;
                  }
                  if (null != t2.getChildContext && (c12 = fr({}, c12, t2.getChildContext())), z2 && eJ.errorBoundaries && (p2.getDerivedStateFromError || t2.componentDidCatch)) {
                    s2 = null != s2 && s2.type === eZ && null == s2.key && null == s2.props.tpl ? s2.props.children : s2;
                    try {
                      return a12(s2, c12, d12, e12, b12, g10, h10);
                    } catch (f13) {
                      return p2.getDerivedStateFromError && (t2.__s = p2.getDerivedStateFromError(f13)), t2.componentDidCatch && t2.componentDidCatch(f13, fo), t2.__d ? (s2 = fs(b12, c12), null != (t2 = b12.__c).getChildContext && (c12 = fr({}, c12, t2.getChildContext())), a12(s2 = null != s2 && s2.type === eZ && null == s2.key && null == s2.props.tpl ? s2.props.children : s2, c12, d12, e12, b12, g10, h10)) : "";
                    } finally {
                      fl && fl(b12), b12.__ = null, fn && fn(b12);
                    }
                  }
                }
                s2 = null != s2 && s2.type === eZ && null == s2.key && null == s2.props.tpl ? s2.props.children : s2;
                try {
                  var B2 = a12(s2, c12, d12, e12, b12, g10, h10);
                  return fl && fl(b12), b12.__ = null, eJ.unmount && eJ.unmount(b12), B2;
                } catch (f13) {
                  if (!g10 && h10 && h10.onError) {
                    var C2 = h10.onError(f13, b12, function(f14) {
                      return a12(f14, c12, d12, e12, b12, g10, h10);
                    });
                    if (void 0 !== C2) return C2;
                    var D2 = eJ.__e;
                    return D2 && D2(f13, b12), "";
                  }
                  if (!g10 || !f13 || "function" != typeof f13.then) throw f13;
                  return f13.then(function f14() {
                    try {
                      return a12(s2, c12, d12, e12, b12, g10, h10);
                    } catch (i3) {
                      if (!i3 || "function" != typeof i3.then) throw i3;
                      return i3.then(function() {
                        return a12(s2, c12, d12, e12, b12, g10, h10);
                      }, f14);
                    }
                  });
                }
              }
              var E2, F2 = "<" + p2, G2 = "";
              for (var H2 in q2) {
                var I2 = q2[H2];
                if ("function" != typeof I2 || "class" === H2 || "className" === H2) {
                  switch (H2) {
                    case "children":
                      E2 = I2;
                      continue;
                    case "key":
                    case "ref":
                    case "__self":
                    case "__source":
                      continue;
                    case "htmlFor":
                      if ("for" in q2) continue;
                      H2 = "for";
                      break;
                    case "className":
                      if ("class" in q2) continue;
                      H2 = "class";
                      break;
                    case "defaultChecked":
                      H2 = "checked";
                      break;
                    case "defaultSelected":
                      H2 = "selected";
                      break;
                    case "defaultValue":
                    case "value":
                      switch (H2 = "value", p2) {
                        case "textarea":
                          E2 = I2;
                          continue;
                        case "select":
                          e12 = I2;
                          continue;
                        case "option":
                          e12 != I2 || "selected" in q2 || (F2 += " selected");
                      }
                      break;
                    case "dangerouslySetInnerHTML":
                      G2 = I2 && I2.__html;
                      continue;
                    case "style":
                      "object" == typeof I2 && (I2 = function(a13) {
                        var b13 = "";
                        for (var c13 in a13) {
                          var d13 = a13[c13];
                          if (null != d13 && "" !== d13) {
                            var e13 = "-" == c13[0] ? c13 : fg[c13] || (fg[c13] = c13.replace(fi, "-$&").toLowerCase()), f13 = ";";
                            "number" != typeof d13 || e13.startsWith("--") || fh.has(e13) || (f13 = "px;"), b13 = b13 + e13 + ":" + d13 + f13;
                          }
                        }
                        return b13 || void 0;
                      }(I2));
                      break;
                    case "acceptCharset":
                      H2 = "accept-charset";
                      break;
                    case "httpEquiv":
                      H2 = "http-equiv";
                      break;
                    default:
                      if (fa.test(H2)) H2 = H2.replace(fa, "$1:$2").toLowerCase();
                      else {
                        if (e9.test(H2)) continue;
                        ("-" === H2[4] || fd.has(H2)) && null != I2 ? I2 += "" : d12 ? fc.test(H2) && (H2 = "panose1" === H2 ? "panose-1" : H2.replace(/([A-Z])/g, "-$1").toLowerCase()) : fb.test(H2) && (H2 = H2.toLowerCase());
                      }
                  }
                  null != I2 && false !== I2 && (F2 = true === I2 || "" === I2 ? F2 + " " + H2 : F2 + " " + H2 + '="' + ("string" == typeof I2 ? ff(I2) : I2 + "") + '"');
                }
              }
              if (e9.test(p2)) throw Error(p2 + " is not a valid HTML tag name in " + F2 + ">");
              if (G2 || ("string" == typeof E2 ? G2 = ff(E2) : null != E2 && false !== E2 && true !== E2 && (G2 = a12(E2, c12, "svg" === p2 || "foreignObject" !== p2 && d12, e12, b12, g10, h10))), fl && fl(b12), b12.__ = null, fn && fn(b12), !G2 && ft.has(p2)) return F2 + "/>";
              var J2 = "</" + p2 + ">", K2 = F2 + ">";
              return fq(G2) ? [K2].concat(G2, [J2]) : "string" != typeof G2 ? [K2, G2, J2] : K2 + G2 + J2;
            }(a11, fo, false, void 0, e11, false, void 0);
            return fq(f11) ? f11.join("") : f11;
          } catch (a12) {
            if (a12.then) throw Error('Use "renderToStringAsync" for suspenseful rendering.');
            throw a12;
          } finally {
            eJ.__c && eJ.__c(a11, fp), eJ.__s = d11, fp.length = 0;
          }
        }(a10)}</div></body></html>` };
      }
      function fA(a10) {
        let { url: b10, theme: c10, query: d10, cookies: e10, pages: f10, providers: g10 } = a10;
        return { csrf: (a11, b11, c11) => a11 ? (b11.logger.warn("csrf-disabled"), c11.push({ name: b11.cookies.csrfToken.name, value: "", options: { ...b11.cookies.csrfToken.options, maxAge: 0 } }), { status: 404, cookies: c11 }) : { headers: { "Content-Type": "application/json", "Cache-Control": "private, no-cache, no-store", Expires: "0", Pragma: "no-cache" }, body: { csrfToken: b11.csrfToken }, cookies: c11 }, providers: (a11) => ({ headers: { "Content-Type": "application/json" }, body: a11.reduce((a12, { id: b11, name: c11, type: d11, signinUrl: e11, callbackUrl: f11 }) => (a12[b11] = { id: b11, name: c11, type: d11, signinUrl: e11, callbackUrl: f11 }, a12), {}) }), signin(b11, h10) {
          if (b11) throw new bL("Unsupported action");
          if (f10?.signIn) {
            let b12 = `${f10.signIn}${f10.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: a10.callbackUrl ?? "/" })}`;
            return h10 && (b12 = `${b12}&${new URLSearchParams({ error: h10 })}`), { redirect: b12, cookies: e10 };
          }
          let i2 = g10?.find((a11) => "webauthn" === a11.type && a11.enableConditionalUI && !!a11.simpleWebAuthnBrowserVersion), j2 = "";
          if (i2) {
            let { simpleWebAuthnBrowserVersion: a11 } = i2;
            j2 = `<script src="https://unpkg.com/@simplewebauthn/browser@${a11}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
          }
          return fz({ cookies: e10, theme: c10, html: function(a11) {
            let { csrfToken: b12, providers: c11 = [], callbackUrl: d11, theme: e11, email: f11, error: g11 } = a11;
            "undefined" != typeof document && e11?.brandColor && document.documentElement.style.setProperty("--brand-color", e11.brandColor), "undefined" != typeof document && e11?.buttonText && document.documentElement.style.setProperty("--button-text-color", e11.buttonText);
            let h11 = g11 && (fx[g11] ?? fx.default), i3 = c11.find((a12) => "webauthn" === a12.type && a12.enableConditionalUI)?.id;
            return fv("div", { className: "signin", children: [e11?.brandColor && fv("style", { dangerouslySetInnerHTML: { __html: `:root {--brand-color: ${e11.brandColor}}` } }), e11?.buttonText && fv("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${e11.buttonText}
        }
      ` } }), fv("div", { className: "card", children: [h11 && fv("div", { className: "error", children: fv("p", { children: h11 }) }), e11?.logo && fv("img", { src: e11.logo, alt: "Logo", className: "logo" }), c11.map((a12, e12) => {
              let g12, h12, i4;
              ("oauth" === a12.type || "oidc" === a12.type) && ({ bg: g12 = "#fff", brandColor: h12, logo: i4 = `https://authjs.dev/img/providers/${a12.id}.svg` } = a12.style ?? {});
              let j3 = h12 ?? g12 ?? "#fff";
              return fv("div", { className: "provider", children: ["oauth" === a12.type || "oidc" === a12.type ? fv("form", { action: a12.signinUrl, method: "POST", children: [fv("input", { type: "hidden", name: "csrfToken", value: b12 }), d11 && fv("input", { type: "hidden", name: "callbackUrl", value: d11 }), fv("button", { type: "submit", className: "button", style: { "--provider-brand-color": j3 }, tabIndex: 0, children: [fv("span", { style: { filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)", "mix-blend-mode": "luminosity", opacity: 0.95 }, children: ["Sign in with ", a12.name] }), i4 && fv("img", { loading: "lazy", height: 24, src: i4 })] })] }) : null, ("email" === a12.type || "credentials" === a12.type || "webauthn" === a12.type) && e12 > 0 && "email" !== c11[e12 - 1].type && "credentials" !== c11[e12 - 1].type && "webauthn" !== c11[e12 - 1].type && fv("hr", {}), "email" === a12.type && fv("form", { action: a12.signinUrl, method: "POST", children: [fv("input", { type: "hidden", name: "csrfToken", value: b12 }), fv("label", { className: "section-header", htmlFor: `input-email-for-${a12.id}-provider`, children: "Email" }), fv("input", { id: `input-email-for-${a12.id}-provider`, autoFocus: true, type: "email", name: "email", value: f11, placeholder: "email@example.com", required: true }), fv("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", a12.name] })] }), "credentials" === a12.type && fv("form", { action: a12.callbackUrl, method: "POST", children: [fv("input", { type: "hidden", name: "csrfToken", value: b12 }), Object.keys(a12.credentials).map((b13) => fv("div", { children: [fv("label", { className: "section-header", htmlFor: `input-${b13}-for-${a12.id}-provider`, children: a12.credentials[b13].label ?? b13 }), fv("input", { name: b13, id: `input-${b13}-for-${a12.id}-provider`, type: a12.credentials[b13].type ?? "text", placeholder: a12.credentials[b13].placeholder ?? "", ...a12.credentials[b13] })] }, `input-group-${a12.id}`)), fv("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", a12.name] })] }), "webauthn" === a12.type && fv("form", { action: a12.callbackUrl, method: "POST", id: `${a12.id}-form`, children: [fv("input", { type: "hidden", name: "csrfToken", value: b12 }), Object.keys(a12.formFields).map((b13) => fv("div", { children: [fv("label", { className: "section-header", htmlFor: `input-${b13}-for-${a12.id}-provider`, children: a12.formFields[b13].label ?? b13 }), fv("input", { name: b13, "data-form-field": true, id: `input-${b13}-for-${a12.id}-provider`, type: a12.formFields[b13].type ?? "text", placeholder: a12.formFields[b13].placeholder ?? "", ...a12.formFields[b13] })] }, `input-group-${a12.id}`)), fv("button", { id: `submitButton-${a12.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", a12.name] })] }), ("email" === a12.type || "credentials" === a12.type || "webauthn" === a12.type) && e12 + 1 < c11.length && fv("hr", {})] }, a12.id);
            })] }), i3 && fv(eZ, { children: fv("script", { dangerouslySetInnerHTML: { __html: `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${fw})(authURL, "${i3}");
` } }) })] });
          }({ csrfToken: a10.csrfToken, providers: a10.providers?.filter((a11) => ["email", "oauth", "oidc"].includes(a11.type) || "credentials" === a11.type && a11.credentials || "webauthn" === a11.type && a11.formFields || false), callbackUrl: a10.callbackUrl, theme: a10.theme, error: h10, ...d10 }), title: "Sign In", headTags: j2 });
        }, signout: () => f10?.signOut ? { redirect: f10.signOut, cookies: e10 } : fz({ cookies: e10, theme: c10, html: function(a11) {
          let { url: b11, csrfToken: c11, theme: d11 } = a11;
          return fv("div", { className: "signout", children: [d11?.brandColor && fv("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${d11.brandColor}
        }
      ` } }), d11?.buttonText && fv("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${d11.buttonText}
        }
      ` } }), fv("div", { className: "card", children: [d11?.logo && fv("img", { src: d11.logo, alt: "Logo", className: "logo" }), fv("h1", { children: "Signout" }), fv("p", { children: "Are you sure you want to sign out?" }), fv("form", { action: b11?.toString(), method: "POST", children: [fv("input", { type: "hidden", name: "csrfToken", value: c11 }), fv("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] });
        }({ csrfToken: a10.csrfToken, url: b10, theme: c10 }), title: "Sign Out" }), verifyRequest: (a11) => f10?.verifyRequest ? { redirect: `${f10.verifyRequest}${b10?.search ?? ""}`, cookies: e10 } : fz({ cookies: e10, theme: c10, html: function(a12) {
          let { url: b11, theme: c11 } = a12;
          return fv("div", { className: "verify-request", children: [c11.brandColor && fv("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${c11.brandColor}
        }
      ` } }), fv("div", { className: "card", children: [c11.logo && fv("img", { src: c11.logo, alt: "Logo", className: "logo" }), fv("h1", { children: "Check your email" }), fv("p", { children: "A sign in link has been sent to your email address." }), fv("p", { children: fv("a", { className: "site", href: b11.origin, children: b11.host }) })] })] });
        }({ url: b10, theme: c10, ...a11 }), title: "Verify Request" }), error: (a11) => f10?.error ? { redirect: `${f10.error}${f10.error.includes("?") ? "&" : "?"}error=${a11}`, cookies: e10 } : fz({ cookies: e10, theme: c10, ...function(a12) {
          let { url: b11, error: c11 = "default", theme: d11 } = a12, e11 = `${b11}/signin`, f11 = { default: { status: 200, heading: "Error", message: fv("p", { children: fv("a", { className: "site", href: b11?.origin, children: b11?.host }) }) }, Configuration: { status: 500, heading: "Server error", message: fv("div", { children: [fv("p", { children: "There is a problem with the server configuration." }), fv("p", { children: "Check the server logs for more information." })] }) }, AccessDenied: { status: 403, heading: "Access Denied", message: fv("div", { children: [fv("p", { children: "You do not have permission to sign in." }), fv("p", { children: fv("a", { className: "button", href: e11, children: "Sign in" }) })] }) }, Verification: { status: 403, heading: "Unable to sign in", message: fv("div", { children: [fv("p", { children: "The sign in link is no longer valid." }), fv("p", { children: "It may have been used already or it may have expired." })] }), signin: fv("a", { className: "button", href: e11, children: "Sign in" }) } }, { status: g11, heading: h10, message: i2, signin: j2 } = f11[c11] ?? f11.default;
          return { status: g11, html: fv("div", { className: "error", children: [d11?.brandColor && fv("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${d11?.brandColor}
        }
      ` } }), fv("div", { className: "card", children: [d11?.logo && fv("img", { src: d11?.logo, alt: "Logo", className: "logo" }), fv("h1", { children: h10 }), fv("div", { className: "message", children: i2 }), j2] })] }) };
        }({ url: b10, theme: c10, error: a11 }), title: "Error" }) };
      }
      function fB(a10, b10 = Date.now()) {
        return new Date(b10 + 1e3 * a10);
      }
      async function fC(a10, b10, c10, d10) {
        if (!c10?.providerAccountId || !c10.type) throw Error("Missing or invalid provider account");
        if (!["email", "oauth", "oidc", "webauthn"].includes(c10.type)) throw Error("Provider not supported");
        let { adapter: e10, jwt: f10, events: g10, session: { strategy: h10, generateSessionToken: i2 } } = d10;
        if (!e10) return { user: b10, account: c10 };
        let j2 = c10, { createUser: k2, updateUser: l2, getUser: m2, getUserByAccount: n2, getUserByEmail: o2, linkAccount: p2, createSession: q2, getSessionAndUser: r2, deleteSession: s2 } = e10, t2 = null, u2 = null, v2 = false, w2 = "jwt" === h10;
        if (a10) if (w2) try {
          let b11 = d10.cookies.sessionToken.name;
          (t2 = await f10.decode({ ...f10, token: a10, salt: b11 })) && "sub" in t2 && t2.sub && (u2 = await m2(t2.sub));
        } catch {
        }
        else {
          let b11 = await r2(a10);
          b11 && (t2 = b11.session, u2 = b11.user);
        }
        if ("email" === j2.type) {
          let c11 = await o2(b10.email);
          return c11 ? (u2?.id !== c11.id && !w2 && a10 && await s2(a10), u2 = await l2({ id: c11.id, emailVerified: /* @__PURE__ */ new Date() }), await g10.updateUser?.({ user: u2 })) : (u2 = await k2({ ...b10, emailVerified: /* @__PURE__ */ new Date() }), await g10.createUser?.({ user: u2 }), v2 = true), { session: t2 = w2 ? {} : await q2({ sessionToken: i2(), userId: u2.id, expires: fB(d10.session.maxAge) }), user: u2, isNewUser: v2 };
        }
        if ("webauthn" === j2.type) {
          let a11 = await n2({ providerAccountId: j2.providerAccountId, provider: j2.provider });
          if (a11) {
            if (u2) {
              if (a11.id === u2.id) {
                let a12 = { ...j2, userId: u2.id };
                return { session: t2, user: u2, isNewUser: v2, account: a12 };
              }
              throw new bV("The account is already associated with another user", { provider: j2.provider });
            }
            t2 = w2 ? {} : await q2({ sessionToken: i2(), userId: a11.id, expires: fB(d10.session.maxAge) });
            let b11 = { ...j2, userId: a11.id };
            return { session: t2, user: a11, isNewUser: v2, account: b11 };
          }
          {
            if (u2) {
              await p2({ ...j2, userId: u2.id }), await g10.linkAccount?.({ user: u2, account: j2, profile: b10 });
              let a13 = { ...j2, userId: u2.id };
              return { session: t2, user: u2, isNewUser: v2, account: a13 };
            }
            if (b10.email ? await o2(b10.email) : null) throw new bV("Another account already exists with the same e-mail address", { provider: j2.provider });
            u2 = await k2({ ...b10 }), await g10.createUser?.({ user: u2 }), await p2({ ...j2, userId: u2.id }), await g10.linkAccount?.({ user: u2, account: j2, profile: b10 }), t2 = w2 ? {} : await q2({ sessionToken: i2(), userId: u2.id, expires: fB(d10.session.maxAge) });
            let a12 = { ...j2, userId: u2.id };
            return { session: t2, user: u2, isNewUser: true, account: a12 };
          }
        }
        let x2 = await n2({ providerAccountId: j2.providerAccountId, provider: j2.provider });
        if (x2) {
          if (u2) {
            if (x2.id === u2.id) return { session: t2, user: u2, isNewUser: v2 };
            throw new bE("The account is already associated with another user", { provider: j2.provider });
          }
          return { session: t2 = w2 ? {} : await q2({ sessionToken: i2(), userId: x2.id, expires: fB(d10.session.maxAge) }), user: x2, isNewUser: v2 };
        }
        {
          let { provider: a11 } = d10, { type: c11, provider: e11, providerAccountId: f11, userId: h11, ...l3 } = j2;
          if (j2 = Object.assign(a11.account(l3) ?? {}, { providerAccountId: f11, provider: e11, type: c11, userId: h11 }), u2) return await p2({ ...j2, userId: u2.id }), await g10.linkAccount?.({ user: u2, account: j2, profile: b10 }), { session: t2, user: u2, isNewUser: v2 };
          let m3 = b10.email ? await o2(b10.email) : null;
          if (m3) {
            let a12 = d10.provider;
            if (a12?.allowDangerousEmailAccountLinking) u2 = m3, v2 = false;
            else throw new bE("Another account already exists with the same e-mail address", { provider: j2.provider });
          } else u2 = await k2({ ...b10, emailVerified: null }), v2 = true;
          return await g10.createUser?.({ user: u2 }), await p2({ ...j2, userId: u2.id }), await g10.linkAccount?.({ user: u2, account: j2, profile: b10 }), { session: t2 = w2 ? {} : await q2({ sessionToken: i2(), userId: u2.id, expires: fB(d10.session.maxAge) }), user: u2, isNewUser: v2 };
        }
      }
      function fD(a10, b10) {
        if (null == a10) return false;
        try {
          return a10 instanceof b10 || Object.getPrototypeOf(a10)[Symbol.toStringTag] === b10.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (g = "oauth4webapi/v3.8.8");
      let fE = "ERR_INVALID_ARG_VALUE", fF = "ERR_INVALID_ARG_TYPE";
      function fG(a10, b10, c10) {
        let d10 = TypeError(a10, { cause: c10 });
        return Object.assign(d10, { code: b10 }), d10;
      }
      let fH = Symbol(), fI = Symbol(), fJ = Symbol(), fK = Symbol(), fL = Symbol(), fM = Symbol();
      Symbol();
      let fN = new TextEncoder(), fO = new TextDecoder();
      function fP(a10) {
        return "string" == typeof a10 ? fN.encode(a10) : fO.decode(a10);
      }
      function fQ(a10) {
        return "string" == typeof a10 ? i(a10) : h(a10);
      }
      h = Uint8Array.prototype.toBase64 ? (a10) => (a10 instanceof ArrayBuffer && (a10 = new Uint8Array(a10)), a10.toBase64({ alphabet: "base64url", omitPadding: true })) : (a10) => {
        a10 instanceof ArrayBuffer && (a10 = new Uint8Array(a10));
        let b10 = [];
        for (let c10 = 0; c10 < a10.byteLength; c10 += 32768) b10.push(String.fromCharCode.apply(null, a10.subarray(c10, c10 + 32768)));
        return btoa(b10.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, i = Uint8Array.fromBase64 ? (a10) => {
        try {
          return Uint8Array.fromBase64(a10, { alphabet: "base64url" });
        } catch (a11) {
          throw fG("The input to be decoded is not correctly encoded.", fE, a11);
        }
      } : (a10) => {
        try {
          let b10 = atob(a10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), c10 = new Uint8Array(b10.length);
          for (let a11 = 0; a11 < b10.length; a11++) c10[a11] = b10.charCodeAt(a11);
          return c10;
        } catch (a11) {
          throw fG("The input to be decoded is not correctly encoded.", fE, a11);
        }
      };
      class fR extends Error {
        code;
        constructor(a10, b10) {
          super(a10, b10), this.name = this.constructor.name, this.code = gW, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class fS extends Error {
        code;
        constructor(a10, b10) {
          super(a10, b10), this.name = this.constructor.name, b10?.code && (this.code = b10?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function fT(a10, b10, c10) {
        return new fS(a10, { code: b10, cause: c10 });
      }
      function fU(a10) {
        return !(null === a10 || "object" != typeof a10 || Array.isArray(a10));
      }
      function fV(a10) {
        fD(a10, Headers) && (a10 = Object.fromEntries(a10.entries()));
        let b10 = new Headers(a10 ?? {});
        if (g && !b10.has("user-agent") && b10.set("user-agent", g), b10.has("authorization")) throw fG('"options.headers" must not include the "authorization" header name', fE);
        return b10;
      }
      function fW(a10, b10) {
        if (void 0 !== b10) {
          if ("function" == typeof b10 && (b10 = b10(a10.href)), !(b10 instanceof AbortSignal)) throw fG('"options.signal" must return or be an instance of AbortSignal', fF);
          return b10;
        }
      }
      function fX(a10) {
        return a10.includes("//") ? a10.replace("//", "/") : a10;
      }
      async function fY(a10, b10, c10, d10) {
        if (!(a10 instanceof URL)) throw fG(`"${b10}" must be an instance of URL`, fF);
        gc(a10, d10?.[fH] !== true);
        let e10 = c10(new URL(a10.href)), f10 = fV(d10?.headers);
        return f10.set("accept", "application/json"), (d10?.[fK] || fetch)(e10.href, { body: void 0, headers: Object.fromEntries(f10.entries()), method: "GET", redirect: "manual", signal: fW(e10, d10?.signal) });
      }
      async function fZ(a10, b10) {
        return fY(a10, "issuerIdentifier", (a11) => {
          switch (b10?.algorithm) {
            case void 0:
            case "oidc":
              a11.pathname = fX(`${a11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !function(a12, b11, c10 = false) {
                "/" === a12.pathname ? a12.pathname = b11 : a12.pathname = fX(`${b11}/${c10 ? a12.pathname : a12.pathname.replace(/(\/)$/, "")}`);
              }(a11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw fG('"options.algorithm" must be "oidc" (default), or "oauth2"', fE);
          }
          return a11;
        }, b10);
      }
      function f$(a10, b10, c10, d10, e10) {
        try {
          if ("number" != typeof a10 || !Number.isFinite(a10)) throw fG(`${c10} must be a number`, fF, e10);
          if (a10 > 0) return;
          if (b10) {
            if (0 !== a10) throw fG(`${c10} must be a non-negative number`, fE, e10);
            return;
          }
          throw fG(`${c10} must be a positive number`, fE, e10);
        } catch (a11) {
          if (d10) throw fT(a11.message, d10, e10);
          throw a11;
        }
      }
      function f_(a10, b10, c10, d10) {
        try {
          if ("string" != typeof a10) throw fG(`${b10} must be a string`, fF, d10);
          if (0 === a10.length) throw fG(`${b10} must not be empty`, fE, d10);
        } catch (a11) {
          if (c10) throw fT(a11.message, c10, d10);
          throw a11;
        }
      }
      async function f0(a10, b10) {
        if (!(a10 instanceof URL) && a10 !== hg) throw fG('"expectedIssuerIdentifier" must be an instance of URL', fF);
        if (!fD(b10, Response)) throw fG('"response" must be an instance of Response', fF);
        if (200 !== b10.status) throw fT('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', g0, b10);
        g8(b10);
        let c10 = await hf(b10);
        if (f_(c10.issuer, '"response" body "issuer" property', g$, { body: c10 }), a10 !== hg && new URL(c10.issuer).href !== a10.href) throw fT('"response" body "issuer" property does not match the expected value', g5, { expected: a10.href, body: c10, attribute: "issuer" });
        return c10;
      }
      function f1(a10) {
        var b10 = a10, c10 = "application/json";
        if (gt(b10) !== c10) throw function(a11, ...b11) {
          let c11 = '"response" content-type must be ';
          if (b11.length > 2) {
            let a12 = b11.pop();
            c11 += `${b11.join(", ")}, or ${a12}`;
          } else 2 === b11.length ? c11 += `${b11[0]} or ${b11[1]}` : c11 += b11[0];
          return fT(c11, g_, a11);
        }(b10, c10);
      }
      function f2() {
        return fQ(crypto.getRandomValues(new Uint8Array(32)));
      }
      async function f3(a10) {
        return f_(a10, "codeVerifier"), fQ(await crypto.subtle.digest("SHA-256", fP(a10)));
      }
      function f4(a10) {
        let b10 = a10?.[fI];
        return "number" == typeof b10 && Number.isFinite(b10) ? b10 : 0;
      }
      function f5(a10) {
        let b10 = a10?.[fJ];
        return "number" == typeof b10 && Number.isFinite(b10) && -1 !== Math.sign(b10) ? b10 : 30;
      }
      function f6() {
        return Math.floor(Date.now() / 1e3);
      }
      function f7(a10) {
        if ("object" != typeof a10 || null === a10) throw fG('"as" must be an object', fF);
        f_(a10.issuer, '"as.issuer"');
      }
      function f8(a10) {
        if ("object" != typeof a10 || null === a10) throw fG('"client" must be an object', fF);
        f_(a10.client_id, '"client.client_id"');
      }
      function f9(a10, b10) {
        let c10 = f6() + f4(b10);
        return { jti: f2(), aud: a10.issuer, exp: c10 + 60, iat: c10, nbf: c10, iss: b10.client_id, sub: b10.client_id };
      }
      async function ga(a10, b10, c10) {
        if (!c10.usages.includes("sign")) throw fG('CryptoKey instances used for signing assertions must include "sign" in their "usages"', fE);
        let d10 = `${fQ(fP(JSON.stringify(a10)))}.${fQ(fP(JSON.stringify(b10)))}`, e10 = fQ(await crypto.subtle.sign(function(a11) {
          switch (a11.algorithm.name) {
            case "ECDSA":
              return { name: a11.algorithm.name, hash: function(a12) {
                let { algorithm: b11 } = a12;
                switch (b11.namedCurve) {
                  case "P-256":
                    return "SHA-256";
                  case "P-384":
                    return "SHA-384";
                  case "P-521":
                    return "SHA-512";
                  default:
                    throw new fR("unsupported ECDSA namedCurve", { cause: a12 });
                }
              }(a11) };
            case "RSA-PSS":
              switch (g9(a11), a11.algorithm.hash.name) {
                case "SHA-256":
                case "SHA-384":
                case "SHA-512":
                  return { name: a11.algorithm.name, saltLength: parseInt(a11.algorithm.hash.name.slice(-3), 10) >> 3 };
                default:
                  throw new fR("unsupported RSA-PSS hash name", { cause: a11 });
              }
            case "RSASSA-PKCS1-v1_5":
              return g9(a11), a11.algorithm.name;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
            case "Ed25519":
              return a11.algorithm.name;
          }
          throw new fR("unsupported CryptoKey algorithm name", { cause: a11 });
        }(c10), c10, fP(d10)));
        return `${d10}.${e10}`;
      }
      let gb = URL.parse ? (a10, b10) => URL.parse(a10, b10) : (a10, b10) => {
        try {
          return new URL(a10, b10);
        } catch {
          return null;
        }
      };
      function gc(a10, b10) {
        if (b10 && "https:" !== a10.protocol) throw fT("only requests to HTTPS are allowed", g1, a10);
        if ("https:" !== a10.protocol && "http:" !== a10.protocol) throw fT("only HTTP and HTTPS requests are allowed", g2, a10);
      }
      function gd(a10, b10, c10, d10) {
        let e10;
        if ("string" != typeof a10 || !(e10 = gb(a10))) throw fT(`authorization server metadata does not contain a valid ${c10 ? `"as.mtls_endpoint_aliases.${b10}"` : `"as.${b10}"`}`, void 0 === a10 ? g6 : g7, { attribute: c10 ? `mtls_endpoint_aliases.${b10}` : b10 });
        return gc(e10, d10), e10;
      }
      function ge(a10, b10, c10, d10) {
        return c10 && a10.mtls_endpoint_aliases && b10 in a10.mtls_endpoint_aliases ? gd(a10.mtls_endpoint_aliases[b10], b10, c10, d10) : gd(a10[b10], b10, c10, d10);
      }
      class gf extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(a10, b10) {
          super(a10, b10), this.name = this.constructor.name, this.code = gV, this.cause = b10.cause, this.error = b10.cause.error, this.status = b10.response.status, this.error_description = b10.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: b10.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class gg extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(a10, b10) {
          super(a10, b10), this.name = this.constructor.name, this.code = gX, this.cause = b10.cause, this.error = b10.cause.get("error"), this.error_description = b10.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class gh extends Error {
        cause;
        code;
        response;
        status;
        constructor(a10, b10) {
          super(a10, b10), this.name = this.constructor.name, this.code = gU, this.cause = b10.cause, this.status = b10.response.status, this.response = b10.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let gi = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", gj = RegExp("^[,\\s]*(" + gi + ")"), gk = RegExp("^[,\\s]*(" + gi + ')\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"[,\\s]*(.*)'), gl = RegExp("^[,\\s]*" + ("(" + gi + ")\\s*=\\s*(") + gi + ")[,\\s]*(.*)"), gm = RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
      async function gn(a10) {
        if (a10.status > 399 && a10.status < 500) {
          g8(a10), f1(a10);
          try {
            let b10 = await a10.clone().json();
            if (fU(b10) && "string" == typeof b10.error && b10.error.length) return b10;
          } catch {
          }
        }
      }
      async function go(a10, b10, c10) {
        if (a10.status !== b10) {
          let b11;
          if (gB(a10), b11 = await gn(a10)) throw await a10.body?.cancel(), new gf("server responded with an error in the response body", { cause: b11, response: a10 });
          throw fT(`"response" is not a conform ${c10} response (unexpected HTTP status code)`, g0, a10);
        }
      }
      function gp(a10) {
        if (!gG.has(a10)) throw fG('"options.DPoP" is not a valid DPoPHandle', fE);
      }
      async function gq(a10, b10, c10, d10, e10, f10) {
        if (f_(a10, '"accessToken"'), !(c10 instanceof URL)) throw fG('"url" must be an instance of URL', fF);
        gc(c10, f10?.[fH] !== true), d10 = fV(d10), f10?.DPoP && (gp(f10.DPoP), await f10.DPoP.addProof(c10, d10, b10.toUpperCase(), a10)), d10.set("authorization", `${d10.has("dpop") ? "DPoP" : "Bearer"} ${a10}`);
        let g10 = await (f10?.[fK] || fetch)(c10.href, { duplex: fD(e10, ReadableStream) ? "half" : void 0, body: e10, headers: Object.fromEntries(d10.entries()), method: b10, redirect: "manual", signal: fW(c10, f10?.signal) });
        return f10?.DPoP?.cacheNonce(g10, c10), g10;
      }
      async function gr(a10, b10, c10, d10) {
        f7(a10), f8(b10);
        let e10 = ge(a10, "userinfo_endpoint", b10.use_mtls_endpoint_aliases, d10?.[fH] !== true), f10 = fV(d10?.headers);
        return b10.userinfo_signed_response_alg ? f10.set("accept", "application/jwt") : (f10.set("accept", "application/json"), f10.append("accept", "application/jwt")), gq(c10, "GET", e10, f10, null, { ...d10, [fI]: f4(b10) });
      }
      let gs = Symbol();
      function gt(a10) {
        return a10.headers.get("content-type")?.split(";")[0];
      }
      async function gu(a10, b10, c10, d10, e10) {
        let f10;
        if (f7(a10), f8(b10), !fD(d10, Response)) throw fG('"response" must be an instance of Response', fF);
        if (gB(d10), 200 !== d10.status) throw fT('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', g0, d10);
        if (g8(d10), "application/jwt" === gt(d10)) {
          let { claims: c11, jwt: g10 } = await ha(await d10.text(), hb.bind(void 0, b10.userinfo_signed_response_alg, a10.userinfo_signing_alg_values_supported, void 0), f4(b10), f5(b10), e10?.[fM]).then(gC.bind(void 0, b10.client_id)).then(gE.bind(void 0, a10));
          gy.set(d10, g10), f10 = c11;
        } else {
          if (b10.userinfo_signed_response_alg) throw fT("JWT UserInfo Response expected", gY, d10);
          f10 = await hf(d10);
        }
        if (f_(f10.sub, '"response" body "sub" property', g$, { body: f10 }), c10 === gs) ;
        else if (f_(c10, '"expectedSubject"'), f10.sub !== c10) throw fT('unexpected "response" body "sub" property value', g5, { expected: c10, body: f10, attribute: "sub" });
        return f10;
      }
      async function gv(a10, b10, c10, d10, e10, f10, g10) {
        return await c10(a10, b10, e10, f10), f10.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (g10?.[fK] || fetch)(d10.href, { body: e10, headers: Object.fromEntries(f10.entries()), method: "POST", redirect: "manual", signal: fW(d10, g10?.signal) });
      }
      async function gw(a10, b10, c10, d10, e10, f10) {
        let g10 = ge(a10, "token_endpoint", b10.use_mtls_endpoint_aliases, f10?.[fH] !== true);
        e10.set("grant_type", d10);
        let h10 = fV(f10?.headers);
        h10.set("accept", "application/json"), f10?.DPoP !== void 0 && (gp(f10.DPoP), await f10.DPoP.addProof(g10, h10, "POST"));
        let i2 = await gv(a10, b10, c10, g10, e10, h10, f10);
        return f10?.DPoP?.cacheNonce(i2, g10), i2;
      }
      let gx = /* @__PURE__ */ new WeakMap(), gy = /* @__PURE__ */ new WeakMap();
      function gz(a10) {
        if (!a10.id_token) return;
        let b10 = gx.get(a10);
        if (!b10) throw fG('"ref" was already garbage collected or did not resolve from the proper sources', fE);
        return b10;
      }
      async function gA(a10, b10, c10, d10, e10, f10) {
        if (f7(a10), f8(b10), !fD(c10, Response)) throw fG('"response" must be an instance of Response', fF);
        await go(c10, 200, "Token Endpoint"), g8(c10);
        let g10 = await hf(c10);
        if (f_(g10.access_token, '"response" body "access_token" property', g$, { body: g10 }), f_(g10.token_type, '"response" body "token_type" property', g$, { body: g10 }), g10.token_type = g10.token_type.toLowerCase(), void 0 !== g10.expires_in) {
          let a11 = "number" != typeof g10.expires_in ? parseFloat(g10.expires_in) : g10.expires_in;
          f$(a11, true, '"response" body "expires_in" property', g$, { body: g10 }), g10.expires_in = a11;
        }
        if (void 0 !== g10.refresh_token && f_(g10.refresh_token, '"response" body "refresh_token" property', g$, { body: g10 }), void 0 !== g10.scope && "string" != typeof g10.scope) throw fT('"response" body "scope" property must be a string', g$, { body: g10 });
        if (void 0 !== g10.id_token) {
          var h10, i2, j2, k2, l2, m2;
          f_(g10.id_token, '"response" body "id_token" property', g$, { body: g10 });
          let f11 = [];
          true === b10.require_auth_time && f11.push("auth_time"), void 0 !== b10.default_max_age && (f$(b10.default_max_age, true, '"client.default_max_age"'), f11.push("auth_time")), d10?.length && f11.push(...d10);
          let { claims: n2, jwt: o2 } = await (h10 = a10, i2 = b10, j2 = g10.id_token, k2 = f11, l2 = e10, ha(j2, hb.bind(void 0, i2.id_token_signed_response_alg, h10.id_token_signing_alg_values_supported, "RS256"), f4(i2), f5(i2), l2).then(gK.bind(void 0, ["aud", "exp", "iat", "iss", "sub", ...k2])).then(gF.bind(void 0, h10)).then(gD.bind(void 0, i2.client_id)).then(gL.bind(void 0, "sub")));
          (function(a11, b11) {
            if (Array.isArray(b11.aud) && 1 !== b11.aud.length) {
              if (void 0 === b11.azp) throw fT('ID Token "aud" (audience) claim includes additional untrusted audiences', g4, { claims: b11, claim: "aud" });
              if (b11.azp !== a11.client_id) throw fT('unexpected ID Token "azp" (authorized party) claim value', g4, { expected: a11.client_id, claims: b11, claim: "azp" });
            }
          })(b10, n2), void 0 !== (m2 = n2).auth_time && f$(m2.auth_time, true, 'ID Token "auth_time" (authentication time)', g$, { claims: m2 }), gy.set(c10, o2), gx.set(g10, n2);
        }
        if (f10?.[g10.token_type] !== void 0) f10[g10.token_type](c10, g10);
        else if ("dpop" !== g10.token_type && "bearer" !== g10.token_type) throw new fR("unsupported `token_type` value", { cause: { body: g10 } });
        return g10;
      }
      function gB(a10) {
        let b10;
        if (b10 = function(a11) {
          if (!fD(a11, Response)) throw fG('"response" must be an instance of Response', fF);
          let b11 = a11.headers.get("www-authenticate");
          if (null === b11) return;
          let c10 = [], d10 = b11;
          for (; d10; ) {
            let a12, b12 = d10.match(gj), e10 = b12?.["1"].toLowerCase();
            if (!e10) return;
            let f10 = d10.substring(b12[0].length);
            if (f10 && !f10.match(/^[\s,]/)) return;
            let g10 = f10.match(/^\s+(.*)$/), h10 = !!g10;
            d10 = g10 ? g10[1] : void 0;
            let i2 = {};
            if (h10) for (; d10; ) {
              let c11, e11;
              if (b12 = d10.match(gk)) {
                [, c11, e11, d10] = b12, e11.includes("\\") && (e11 = e11.replace(/\\([\s\S])/g, "$1")), i2[c11.toLowerCase()] = e11;
                continue;
              }
              if (b12 = d10.match(gl)) {
                [, c11, e11, d10] = b12, i2[c11.toLowerCase()] = e11;
                continue;
              }
              if (b12 = d10.match(gm)) {
                if (Object.keys(i2).length) break;
                [, a12, d10] = b12;
                break;
              }
              return;
            }
            else d10 = f10 || void 0;
            let j2 = { scheme: e10, parameters: i2 };
            a12 && (j2.token68 = a12), c10.push(j2);
          }
          if (c10.length) return c10;
        }(a10)) throw new gh("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: b10, response: a10 });
      }
      function gC(a10, b10) {
        return void 0 !== b10.claims.aud ? gD(a10, b10) : b10;
      }
      function gD(a10, b10) {
        if (Array.isArray(b10.claims.aud)) {
          if (!b10.claims.aud.includes(a10)) throw fT('unexpected JWT "aud" (audience) claim value', g4, { expected: a10, claims: b10.claims, claim: "aud" });
        } else if (b10.claims.aud !== a10) throw fT('unexpected JWT "aud" (audience) claim value', g4, { expected: a10, claims: b10.claims, claim: "aud" });
        return b10;
      }
      function gE(a10, b10) {
        return void 0 !== b10.claims.iss ? gF(a10, b10) : b10;
      }
      function gF(a10, b10) {
        let c10 = a10[hh]?.(b10) ?? a10.issuer;
        if (b10.claims.iss !== c10) throw fT('unexpected JWT "iss" (issuer) claim value', g4, { expected: c10, claims: b10.claims, claim: "iss" });
        return b10;
      }
      let gG = /* @__PURE__ */ new WeakSet(), gH = Symbol();
      async function gI(a10, b10, c10, d10, e10, f10, g10) {
        if (f7(a10), f8(b10), !gG.has(d10)) throw fG('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', fE);
        f_(e10, '"redirectUri"');
        let h10 = hc(d10, "code");
        if (!h10) throw fT('no authorization code in "callbackParameters"', g$);
        let i2 = new URLSearchParams(g10?.additionalParameters);
        return i2.set("redirect_uri", e10), i2.set("code", h10), f10 !== gH && (f_(f10, '"codeVerifier"'), i2.set("code_verifier", f10)), gw(a10, b10, c10, "authorization_code", i2, g10);
      }
      let gJ = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function gK(a10, b10) {
        for (let c10 of a10) if (void 0 === b10.claims[c10]) throw fT(`JWT "${c10}" (${gJ[c10]}) claim missing`, g$, { claims: b10.claims });
        return b10;
      }
      function gL(a10, b10) {
        if ("string" != typeof b10.claims[a10]) throw fT(`unexpected JWT "${a10}" (${gJ[a10]}) claim type`, g$, { claims: b10.claims });
        return b10;
      }
      function gM(a10, b10) {
        if (b10 === gQ) return b10;
        let c10 = void 0 === b10;
        return (c10 && (b10 = a10.default_max_age), void 0 === b10) ? gQ : (f$(b10, true, c10 ? '"client.default_max_age"' : '"maxAge" argument'), b10);
      }
      function gN(a10, b10, c10) {
        if (c10 === gQ) return;
        let d10 = f6() + f4(a10), e10 = f5(a10);
        if (b10.auth_time + c10 < d10 - e10) throw fT("too much time has elapsed since the last End-User authentication", g3, { claims: b10, now: d10, tolerance: e10, claim: "auth_time" });
      }
      function gO(a10, b10) {
        let c10 = b10 === gP ? void 0 : b10;
        if (a10.nonce !== c10) throw fT('unexpected ID Token "nonce" claim value', g4, { expected: c10, claims: a10, claim: "nonce" });
      }
      let gP = Symbol(), gQ = Symbol();
      async function gR(a10, b10, c10, d10) {
        return "string" == typeof d10?.expectedNonce || "number" == typeof d10?.maxAge || d10?.requireIdToken ? gS(a10, b10, c10, d10.expectedNonce, d10.maxAge, d10[fM], d10.recognizedTokenTypes) : gT(a10, b10, c10, d10?.maxAge, d10?.[fM], d10?.recognizedTokenTypes);
      }
      async function gS(a10, b10, c10, d10, e10, f10, g10) {
        let h10 = [];
        switch (d10) {
          case void 0:
            d10 = gP;
            break;
          case gP:
            break;
          default:
            f_(d10, '"expectedNonce" argument'), h10.push("nonce");
        }
        (e10 = gM(b10, e10)) !== gQ && h10.push("auth_time");
        let i2 = await gA(a10, b10, c10, h10, f10, g10);
        f_(i2.id_token, '"response" body "id_token" property', g$, { body: i2 });
        let j2 = gz(i2);
        return gN(b10, j2, e10), gO(j2, d10), i2;
      }
      async function gT(a10, b10, c10, d10, e10, f10) {
        let g10 = await gA(a10, b10, c10, void 0, e10, f10), h10 = gz(g10);
        return h10 && (gN(b10, h10, gM(b10, d10)), gO(h10, gP)), g10;
      }
      let gU = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", gV = "OAUTH_RESPONSE_BODY_ERROR", gW = "OAUTH_UNSUPPORTED_OPERATION", gX = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", gY = "OAUTH_JWT_USERINFO_EXPECTED", gZ = "OAUTH_PARSE_ERROR", g$ = "OAUTH_INVALID_RESPONSE", g_ = "OAUTH_RESPONSE_IS_NOT_JSON", g0 = "OAUTH_RESPONSE_IS_NOT_CONFORM", g1 = "OAUTH_HTTP_REQUEST_FORBIDDEN", g2 = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", g3 = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", g4 = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", g5 = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", g6 = "OAUTH_MISSING_SERVER_METADATA", g7 = "OAUTH_INVALID_SERVER_METADATA";
      function g8(a10) {
        if (a10.bodyUsed) throw fG('"response" body has been used already', fE);
      }
      function g9(a10) {
        let { algorithm: b10 } = a10;
        if ("number" != typeof b10.modulusLength || b10.modulusLength < 2048) throw new fR(`unsupported ${b10.name} modulusLength`, { cause: a10 });
      }
      async function ha(a10, b10, c10, d10, e10) {
        let f10, g10, { 0: h10, 1: i2, length: j2 } = a10.split(".");
        if (5 === j2) if (void 0 !== e10) a10 = await e10(a10), { 0: h10, 1: i2, length: j2 } = a10.split(".");
        else throw new fR("JWE decryption is not configured", { cause: a10 });
        if (3 !== j2) throw fT("Invalid JWT", g$, a10);
        try {
          f10 = JSON.parse(fP(fQ(h10)));
        } catch (a11) {
          throw fT("failed to parse JWT Header body as base64url encoded JSON", gZ, a11);
        }
        if (!fU(f10)) throw fT("JWT Header must be a top level object", g$, a10);
        if (b10(f10), void 0 !== f10.crit) throw new fR('no JWT "crit" header parameter extensions are supported', { cause: { header: f10 } });
        try {
          g10 = JSON.parse(fP(fQ(i2)));
        } catch (a11) {
          throw fT("failed to parse JWT Payload body as base64url encoded JSON", gZ, a11);
        }
        if (!fU(g10)) throw fT("JWT Payload must be a top level object", g$, a10);
        let k2 = f6() + c10;
        if (void 0 !== g10.exp) {
          if ("number" != typeof g10.exp) throw fT('unexpected JWT "exp" (expiration time) claim type', g$, { claims: g10 });
          if (g10.exp <= k2 - d10) throw fT('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', g3, { claims: g10, now: k2, tolerance: d10, claim: "exp" });
        }
        if (void 0 !== g10.iat && "number" != typeof g10.iat) throw fT('unexpected JWT "iat" (issued at) claim type', g$, { claims: g10 });
        if (void 0 !== g10.iss && "string" != typeof g10.iss) throw fT('unexpected JWT "iss" (issuer) claim type', g$, { claims: g10 });
        if (void 0 !== g10.nbf) {
          if ("number" != typeof g10.nbf) throw fT('unexpected JWT "nbf" (not before) claim type', g$, { claims: g10 });
          if (g10.nbf > k2 + d10) throw fT('unexpected JWT "nbf" (not before) claim value', g3, { claims: g10, now: k2, tolerance: d10, claim: "nbf" });
        }
        if (void 0 !== g10.aud && "string" != typeof g10.aud && !Array.isArray(g10.aud)) throw fT('unexpected JWT "aud" (audience) claim type', g$, { claims: g10 });
        return { header: f10, claims: g10, jwt: a10 };
      }
      function hb(a10, b10, c10, d10) {
        if (void 0 !== a10) {
          if ("string" == typeof a10 ? d10.alg !== a10 : !a10.includes(d10.alg)) throw fT('unexpected JWT "alg" header parameter', g$, { header: d10, expected: a10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(b10)) {
          if (!b10.includes(d10.alg)) throw fT('unexpected JWT "alg" header parameter', g$, { header: d10, expected: b10, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== c10) {
          if ("string" == typeof c10 ? d10.alg !== c10 : "function" == typeof c10 ? !c10(d10.alg) : !c10.includes(d10.alg)) throw fT('unexpected JWT "alg" header parameter', g$, { header: d10, expected: c10, reason: "default value" });
          return;
        }
        throw fT('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: a10, issuer: b10, fallback: c10 });
      }
      function hc(a10, b10) {
        let { 0: c10, length: d10 } = a10.getAll(b10);
        if (d10 > 1) throw fT(`"${b10}" parameter must be provided only once`, g$);
        return c10;
      }
      let hd = Symbol(), he = Symbol();
      async function hf(a10, b10 = f1) {
        let c10;
        try {
          c10 = await a10.json();
        } catch (c11) {
          throw b10(a10), fT('failed to parse "response" body as JSON', gZ, c11);
        }
        if (!fU(c10)) throw fT('"response" body must be a top level object', g$, { body: c10 });
        return c10;
      }
      let hg = Symbol(), hh = Symbol();
      async function hi(a10, b10, c10) {
        let { cookies: d10, logger: e10 } = c10, f10 = d10[a10], g10 = /* @__PURE__ */ new Date();
        g10.setTime(g10.getTime() + 9e5), e10.debug(`CREATE_${a10.toUpperCase()}`, { name: f10.name, payload: b10, COOKIE_TTL: 900, expires: g10 });
        let h10 = await d8({ ...c10.jwt, maxAge: 900, token: { value: b10, provider: c10.provider.id }, salt: f10.name }), i2 = { ...f10.options, expires: g10 };
        return { name: f10.name, value: h10, options: i2 };
      }
      async function hj(a10, b10, c10) {
        try {
          let { logger: d10, cookies: e10, jwt: f10 } = c10;
          if (d10.debug(`PARSE_${a10.toUpperCase()}`, { cookie: b10 }), !b10) throw new by(`${a10} cookie was missing`);
          let g10 = await d9({ ...f10, token: b10, salt: e10[a10].name });
          if (!g10?.value) throw Error("Invalid cookie");
          if (g10.provider !== c10.provider?.id) throw Error(`${a10} cookie was created for a different provider than the one handling the callback`);
          return g10.value;
        } catch (b11) {
          throw new by(`${a10} value could not be parsed`, { cause: b11 });
        }
      }
      function hk(a10, b10, c10) {
        let { logger: d10, cookies: e10 } = b10, f10 = e10[a10];
        d10.debug(`CLEAR_${a10.toUpperCase()}`, { cookie: f10 }), c10.push({ name: f10.name, value: "", options: { ...e10[a10].options, maxAge: 0 } });
      }
      function hl(a10, b10) {
        return async function(c10, d10, e10) {
          let { provider: f10, logger: g10 } = e10;
          if (!f10?.checks?.includes(a10)) return;
          let h10 = c10?.[e10.cookies[b10].name];
          g10.debug(`USE_${b10.toUpperCase()}`, { value: h10 });
          let i2 = await hj(b10, h10, e10);
          return hk(b10, e10, d10), i2;
        };
      }
      let hm = { async create(a10) {
        let b10 = f2(), c10 = await f3(b10);
        return { cookie: await hi("pkceCodeVerifier", b10, a10), value: c10 };
      }, use: hl("pkce", "pkceCodeVerifier") }, hn = "encodedState", ho = { async create(a10, b10) {
        let { provider: c10 } = a10;
        if (!c10.checks.includes("state")) {
          if (b10) throw new by("State data was provided but the provider is not configured to use state");
          return;
        }
        let d10 = { origin: b10, random: f2() }, e10 = await d8({ secret: a10.jwt.secret, token: d10, salt: hn, maxAge: 900 });
        return { cookie: await hi("state", e10, a10), value: e10 };
      }, use: hl("state", "state"), async decode(a10, b10) {
        try {
          b10.logger.debug("DECODE_STATE", { state: a10 });
          let c10 = await d9({ secret: b10.jwt.secret, token: a10, salt: hn });
          if (c10) return c10;
          throw Error("Invalid state");
        } catch (a11) {
          throw new by("State could not be decoded", { cause: a11 });
        }
      } }, hp = { async create(a10) {
        if (!a10.provider.checks.includes("nonce")) return;
        let b10 = f2();
        return { cookie: await hi("nonce", b10, a10), value: b10 };
      }, use: hl("nonce", "nonce") }, hq = "encodedWebauthnChallenge", hr = { create: async (a10, b10, c10) => ({ cookie: await hi("webauthnChallenge", await d8({ secret: a10.jwt.secret, token: { challenge: b10, registerData: c10 }, salt: hq, maxAge: 900 }), a10) }), async use(a10, b10, c10) {
        let d10 = b10?.[a10.cookies.webauthnChallenge.name], e10 = await hj("webauthnChallenge", d10, a10), f10 = await d9({ secret: a10.jwt.secret, token: e10, salt: hq });
        if (hk("webauthnChallenge", a10, c10), !f10) throw new by("WebAuthn challenge was missing");
        return f10;
      } };
      function hs(a10) {
        return encodeURIComponent(a10).replace(/%20/g, "+");
      }
      async function ht(a10, b10, c10) {
        let d10, e10, f10, { logger: g10, provider: h10 } = c10, { token: i2, userinfo: j2 } = h10;
        if (i2?.url && "authjs.dev" !== i2.url.host || j2?.url && "authjs.dev" !== j2.url.host) d10 = { issuer: h10.issuer ?? "https://authjs.dev", token_endpoint: i2?.url.toString(), userinfo_endpoint: j2?.url.toString() };
        else {
          let a11 = new URL(h10.issuer), b11 = await fZ(a11, { [fH]: true, [fK]: h10[eu] });
          if (!(d10 = await f0(a11, b11)).token_endpoint) throw TypeError("TODO: Authorization server did not provide a token endpoint.");
          if (!d10.userinfo_endpoint) throw TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
        }
        let k2 = { client_id: h10.clientId, ...h10.client };
        switch (k2.token_endpoint_auth_method) {
          case void 0:
          case "client_secret_basic":
            e10 = (a11, b11, c11, d11) => {
              d11.set("authorization", function(a12, b12) {
                let c12 = hs(a12), d12 = hs(b12), e11 = btoa(`${c12}:${d12}`);
                return `Basic ${e11}`;
              }(h10.clientId, h10.clientSecret));
            };
            break;
          case "client_secret_post":
            var l2;
            f_(l2 = h10.clientSecret, '"clientSecret"'), e10 = (a11, b11, c11, d11) => {
              c11.set("client_id", b11.client_id), c11.set("client_secret", l2);
            };
            break;
          case "client_secret_jwt":
            e10 = function(a11, b11) {
              let c11;
              f_(a11, '"clientSecret"');
              let d11 = void 0;
              return async (b12, e11, f11, g11) => {
                c11 ||= await crypto.subtle.importKey("raw", fP(a11), { hash: "SHA-256", name: "HMAC" }, false, ["sign"]);
                let h11 = { alg: "HS256" }, i3 = f9(b12, e11);
                d11?.(h11, i3);
                let j3 = `${fQ(fP(JSON.stringify(h11)))}.${fQ(fP(JSON.stringify(i3)))}`, k3 = await crypto.subtle.sign(c11.algorithm, c11, fP(j3));
                f11.set("client_id", e11.client_id), f11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), f11.set("client_assertion", `${j3}.${fQ(new Uint8Array(k3))}`);
              };
            }(h10.clientSecret);
            break;
          case "private_key_jwt":
            e10 = function(a11, b11) {
              let { key: c11, kid: d11 } = a11 instanceof CryptoKey ? { key: a11 } : a11?.key instanceof CryptoKey ? (void 0 !== a11.kid && f_(a11.kid, '"kid"'), { key: a11.key, kid: a11.kid }) : {};
              var e11 = '"clientPrivateKey.key"';
              if (!(c11 instanceof CryptoKey)) throw fG(`${e11} must be a CryptoKey`, fF);
              if ("private" !== c11.type) throw fG(`${e11} must be a private CryptoKey`, fE);
              return async (a12, e12, f11, g11) => {
                let h11 = { alg: function(a13) {
                  switch (a13.algorithm.name) {
                    case "RSA-PSS":
                      switch (a13.algorithm.hash.name) {
                        case "SHA-256":
                          return "PS256";
                        case "SHA-384":
                          return "PS384";
                        case "SHA-512":
                          return "PS512";
                        default:
                          throw new fR("unsupported RsaHashedKeyAlgorithm hash name", { cause: a13 });
                      }
                    case "RSASSA-PKCS1-v1_5":
                      switch (a13.algorithm.hash.name) {
                        case "SHA-256":
                          return "RS256";
                        case "SHA-384":
                          return "RS384";
                        case "SHA-512":
                          return "RS512";
                        default:
                          throw new fR("unsupported RsaHashedKeyAlgorithm hash name", { cause: a13 });
                      }
                    case "ECDSA":
                      switch (a13.algorithm.namedCurve) {
                        case "P-256":
                          return "ES256";
                        case "P-384":
                          return "ES384";
                        case "P-521":
                          return "ES512";
                        default:
                          throw new fR("unsupported EcKeyAlgorithm namedCurve", { cause: a13 });
                      }
                    case "Ed25519":
                    case "ML-DSA-44":
                    case "ML-DSA-65":
                    case "ML-DSA-87":
                      return a13.algorithm.name;
                    case "EdDSA":
                      return "Ed25519";
                    default:
                      throw new fR("unsupported CryptoKey algorithm name", { cause: a13 });
                  }
                }(c11), kid: d11 }, i3 = f9(a12, e12);
                b11?.[fL]?.(h11, i3), f11.set("client_id", e12.client_id), f11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), f11.set("client_assertion", await ga(h11, i3, c11));
              };
            }(h10.token.clientPrivateKey, { [fL](a11, b11) {
              b11.aud = [d10.issuer, d10.token_endpoint];
            } });
            break;
          case "none":
            e10 = (a11, b11, c11, d11) => {
              c11.set("client_id", b11.client_id);
            };
            break;
          default:
            throw Error("unsupported client authentication method");
        }
        let m2 = [], n2 = await ho.use(b10, m2, c10);
        try {
          f10 = function(a11, b11, c11, d11) {
            var e11;
            if (f7(a11), f8(b11), c11 instanceof URL && (c11 = c11.searchParams), !(c11 instanceof URLSearchParams)) throw fG('"parameters" must be an instance of URLSearchParams, or URL', fF);
            if (hc(c11, "response")) throw fT('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', g$, { parameters: c11 });
            let f11 = hc(c11, "iss"), g11 = hc(c11, "state");
            if (!f11 && a11.authorization_response_iss_parameter_supported) throw fT('response parameter "iss" (issuer) missing', g$, { parameters: c11 });
            if (f11 && f11 !== a11.issuer) throw fT('unexpected "iss" (issuer) response parameter value', g$, { expected: a11.issuer, parameters: c11 });
            switch (d11) {
              case void 0:
              case he:
                if (void 0 !== g11) throw fT('unexpected "state" response parameter encountered', g$, { expected: void 0, parameters: c11 });
                break;
              case hd:
                break;
              default:
                if (f_(d11, '"expectedState" argument'), g11 !== d11) throw fT(void 0 === g11 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', g$, { expected: d11, parameters: c11 });
            }
            if (hc(c11, "error")) throw new gg("authorization response from the server is an error", { cause: c11 });
            let h11 = hc(c11, "id_token"), i3 = hc(c11, "token");
            if (void 0 !== h11 || void 0 !== i3) throw new fR("implicit and hybrid flows are not supported");
            return e11 = new URLSearchParams(c11), gG.add(e11), e11;
          }(d10, k2, new URLSearchParams(a10), h10.checks.includes("state") ? n2 : hd);
        } catch (a11) {
          if (a11 instanceof gg) {
            let b11 = { providerId: h10.id, ...Object.fromEntries(a11.cause.entries()) };
            throw g10.debug("OAuthCallbackError", b11), new bF("OAuth Provider returned an error", b11);
          }
          throw a11;
        }
        let o2 = await hm.use(b10, m2, c10), p2 = h10.callbackUrl;
        !c10.isOnRedirectProxy && h10.redirectProxyUrl && (p2 = h10.redirectProxyUrl);
        let q2 = await gI(d10, k2, e10, f10, p2, o2 ?? "decoy", { [fH]: true, [fK]: (...a11) => (h10.checks.includes("pkce") || a11[1].body.delete("code_verifier"), (h10[eu] ?? fetch)(...a11)) });
        h10.token?.conform && (q2 = await h10.token.conform(q2.clone()) ?? q2);
        let r2 = {}, s2 = "oidc" === h10.type;
        if (h10[ev]) switch (h10.id) {
          case "microsoft-entra-id":
          case "azure-ad": {
            let a11 = await q2.clone().json();
            if (a11.error) {
              let b12 = { providerId: h10.id, ...a11 };
              throw new bF(`OAuth Provider returned an error: ${a11.error}`, b12);
            }
            let { tid: b11 } = function(a12) {
              let b12, c11;
              if ("string" != typeof a12) throw new cp("JWTs must use Compact JWS serialization, JWT must be a string");
              let { 1: d11, length: e11 } = a12.split(".");
              if (5 === e11) throw new cp("Only JWTs using Compact JWS serialization can be decoded");
              if (3 !== e11) throw new cp("Invalid JWT");
              if (!d11) throw new cp("JWTs must contain a payload");
              try {
                b12 = cg(d11);
              } catch {
                throw new cp("Failed to base64url decode the payload");
              }
              try {
                c11 = JSON.parse(b8.decode(b12));
              } catch {
                throw new cp("Failed to parse the decoded payload as JSON");
              }
              if (!ct(c11)) throw new cp("Invalid JWT Claims Set");
              return c11;
            }(a11.id_token);
            if ("string" == typeof b11) {
              let a12 = d10.issuer?.match(/microsoftonline\.com\/(\w+)\/v2\.0/)?.[1] ?? "common", c11 = new URL(d10.issuer.replace(a12, b11)), e11 = await fZ(c11, { [fK]: h10[eu] });
              d10 = await f0(c11, e11);
            }
          }
        }
        let t2 = await gR(d10, k2, q2, { expectedNonce: await hp.use(b10, m2, c10), requireIdToken: s2 });
        if (s2) {
          let b11 = gz(t2);
          if (r2 = b11, h10[ev] && "apple" === h10.id) try {
            r2.user = JSON.parse(a10?.user);
          } catch {
          }
          if (false === h10.idToken) {
            let a11 = await gr(d10, k2, t2.access_token, { [fK]: h10[eu], [fH]: true });
            r2 = await gu(d10, k2, b11.sub, a11);
          }
        } else if (j2?.request) {
          let a11 = await j2.request({ tokens: t2, provider: h10 });
          a11 instanceof Object && (r2 = a11);
        } else if (j2?.url) {
          let a11 = await gr(d10, k2, t2.access_token, { [fK]: h10[eu], [fH]: true });
          r2 = await a11.json();
        } else throw TypeError("No userinfo endpoint configured");
        return t2.expires_in && (t2.expires_at = Math.floor(Date.now() / 1e3) + Number(t2.expires_in)), { ...await hu(r2, h10, t2, g10), profile: r2, cookies: m2 };
      }
      async function hu(a10, b10, c10, d10) {
        try {
          let d11 = await b10.profile(a10, c10);
          return { user: { ...d11, id: crypto.randomUUID(), email: d11.email?.toLowerCase() }, account: { ...c10, provider: b10.id, type: b10.type, providerAccountId: d11.id ?? crypto.randomUUID() } };
        } catch (c11) {
          d10.debug("getProfile error details", a10), d10.error(new bG(c11, { provider: b10.id }));
        }
      }
      var hv = c(356).Buffer;
      async function hw(a10, b10, c10, d10) {
        let e10 = await hB(a10, b10, c10), { cookie: f10 } = await hr.create(a10, e10.challenge, c10);
        return { status: 200, cookies: [...d10 ?? [], f10], body: { action: "register", options: e10 }, headers: { "Content-Type": "application/json" } };
      }
      async function hx(a10, b10, c10, d10) {
        let e10 = await hA(a10, b10, c10), { cookie: f10 } = await hr.create(a10, e10.challenge);
        return { status: 200, cookies: [...d10 ?? [], f10], body: { action: "authenticate", options: e10 }, headers: { "Content-Type": "application/json" } };
      }
      async function hy(a10, b10, c10) {
        let d10, { adapter: e10, provider: f10 } = a10, g10 = b10.body && "string" == typeof b10.body.data ? JSON.parse(b10.body.data) : void 0;
        if (!g10 || "object" != typeof g10 || !("id" in g10) || "string" != typeof g10.id) throw new bo("Invalid WebAuthn Authentication response");
        let h10 = hE(hD(g10.id)), i2 = await e10.getAuthenticator(h10);
        if (!i2) throw new bo(`WebAuthn authenticator not found in database: ${JSON.stringify({ credentialID: h10 })}`);
        let { challenge: j2 } = await hr.use(a10, b10.cookies, c10);
        try {
          var k2;
          let c11 = f10.getRelayingParty(a10, b10);
          d10 = await f10.simpleWebAuthn.verifyAuthenticationResponse({ ...f10.verifyAuthenticationOptions, expectedChallenge: j2, response: g10, authenticator: { ...k2 = i2, credentialDeviceType: k2.credentialDeviceType, transports: hF(k2.transports), credentialID: hD(k2.credentialID), credentialPublicKey: hD(k2.credentialPublicKey) }, expectedOrigin: c11.origin, expectedRPID: c11.id });
        } catch (a11) {
          throw new bU(a11);
        }
        let { verified: l2, authenticationInfo: m2 } = d10;
        if (!l2) throw new bU("WebAuthn authentication response could not be verified");
        try {
          let { newCounter: a11 } = m2;
          await e10.updateAuthenticatorCounter(i2.credentialID, a11);
        } catch (a11) {
          throw new bq(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({ credentialID: h10, oldCounter: i2.counter, newCounter: m2.newCounter })}`, a11);
        }
        let n2 = await e10.getAccount(i2.providerAccountId, f10.id);
        if (!n2) throw new bo(`WebAuthn account not found in database: ${JSON.stringify({ credentialID: h10, providerAccountId: i2.providerAccountId })}`);
        let o2 = await e10.getUser(n2.userId);
        if (!o2) throw new bo(`WebAuthn user not found in database: ${JSON.stringify({ credentialID: h10, providerAccountId: i2.providerAccountId, userID: n2.userId })}`);
        return { account: n2, user: o2 };
      }
      async function hz(a10, b10, c10) {
        var d10;
        let e10, { provider: f10 } = a10, g10 = b10.body && "string" == typeof b10.body.data ? JSON.parse(b10.body.data) : void 0;
        if (!g10 || "object" != typeof g10 || !("id" in g10) || "string" != typeof g10.id) throw new bo("Invalid WebAuthn Registration response");
        let { challenge: h10, registerData: i2 } = await hr.use(a10, b10.cookies, c10);
        if (!i2) throw new bo("Missing user registration data in WebAuthn challenge cookie");
        try {
          let c11 = f10.getRelayingParty(a10, b10);
          e10 = await f10.simpleWebAuthn.verifyRegistrationResponse({ ...f10.verifyRegistrationOptions, expectedChallenge: h10, response: g10, expectedOrigin: c11.origin, expectedRPID: c11.id });
        } catch (a11) {
          throw new bU(a11);
        }
        if (!e10.verified || !e10.registrationInfo) throw new bU("WebAuthn registration response could not be verified");
        let j2 = { providerAccountId: hE(e10.registrationInfo.credentialID), provider: a10.provider.id, type: f10.type }, k2 = { providerAccountId: j2.providerAccountId, counter: e10.registrationInfo.counter, credentialID: hE(e10.registrationInfo.credentialID), credentialPublicKey: hE(e10.registrationInfo.credentialPublicKey), credentialBackedUp: e10.registrationInfo.credentialBackedUp, credentialDeviceType: e10.registrationInfo.credentialDeviceType, transports: (d10 = g10.response.transports, d10?.join(",")) };
        return { user: i2, account: j2, authenticator: k2 };
      }
      async function hA(a10, b10, c10) {
        let { provider: d10, adapter: e10 } = a10, f10 = c10 && c10.id ? await e10.listAuthenticatorsByUserId(c10.id) : null, g10 = d10.getRelayingParty(a10, b10);
        return await d10.simpleWebAuthn.generateAuthenticationOptions({ ...d10.authenticationOptions, rpID: g10.id, allowCredentials: f10?.map((a11) => ({ id: hD(a11.credentialID), type: "public-key", transports: hF(a11.transports) })) });
      }
      async function hB(a10, b10, c10) {
        let { provider: d10, adapter: e10 } = a10, f10 = c10.id ? await e10.listAuthenticatorsByUserId(c10.id) : null, g10 = en(32), h10 = d10.getRelayingParty(a10, b10);
        return await d10.simpleWebAuthn.generateRegistrationOptions({ ...d10.registrationOptions, userID: g10, userName: c10.email, userDisplayName: c10.name ?? void 0, rpID: h10.id, rpName: h10.name, excludeCredentials: f10?.map((a11) => ({ id: hD(a11.credentialID), type: "public-key", transports: hF(a11.transports) })) });
      }
      function hC(a10) {
        let { provider: b10, adapter: c10 } = a10;
        if (!c10) throw new bA("An adapter is required for the WebAuthn provider");
        if (!b10 || "webauthn" !== b10.type) throw new bN("Provider must be WebAuthn");
        return { ...a10, provider: b10, adapter: c10 };
      }
      function hD(a10) {
        return new Uint8Array(hv.from(a10, "base64"));
      }
      function hE(a10) {
        return hv.from(a10).toString("base64");
      }
      function hF(a10) {
        return a10 ? a10.split(",") : void 0;
      }
      async function hG(a10, b10, c10, d10) {
        if (!b10.provider) throw new bN("Callback route called without provider");
        let { query: e10, body: f10, method: g10, headers: h10 } = a10, { provider: i2, adapter: j2, url: k2, callbackUrl: l2, pages: m2, jwt: n2, events: o2, callbacks: p2, session: { strategy: q2, maxAge: r2 }, logger: s2 } = b10, t2 = "jwt" === q2;
        try {
          if ("oauth" === i2.type || "oidc" === i2.type) {
            let g11, h11 = i2.authorization?.url.searchParams.get("response_mode") === "form_post" ? f10 : e10;
            if (b10.isOnRedirectProxy && h11?.state) {
              let a11 = await ho.decode(h11.state, b10);
              if (a11?.origin && new URL(a11.origin).origin !== b10.url.origin) {
                let b11 = `${a11.origin}?${new URLSearchParams(h11)}`;
                return s2.debug("Proxy redirecting to", b11), { redirect: b11, cookies: d10 };
              }
            }
            let q3 = await ht(h11, a10.cookies, b10);
            q3.cookies.length && d10.push(...q3.cookies), s2.debug("authorization result", q3);
            let { user: u2, account: v2, profile: w2 } = q3;
            if (!u2 || !v2 || !w2) return { redirect: `${k2}/signin`, cookies: d10 };
            if (j2) {
              let { getUserByAccount: a11 } = j2;
              g11 = await a11({ providerAccountId: v2.providerAccountId, provider: i2.id });
            }
            let x2 = await hH({ user: g11 ?? u2, account: v2, profile: w2 }, b10);
            if (x2) return { redirect: x2, cookies: d10 };
            let { user: y2, session: z2, isNewUser: A2 } = await fC(c10.value, u2, v2, b10);
            if (t2) {
              let a11 = { name: y2.name, email: y2.email, picture: y2.image, sub: y2.id?.toString() }, e11 = await p2.jwt({ token: a11, user: y2, account: v2, profile: w2, isNewUser: A2, trigger: A2 ? "signUp" : "signIn" });
              if (null === e11) d10.push(...c10.clean());
              else {
                let a12 = b10.cookies.sessionToken.name, f11 = await n2.encode({ ...n2, token: e11, salt: a12 }), g12 = /* @__PURE__ */ new Date();
                g12.setTime(g12.getTime() + 1e3 * r2);
                let h12 = c10.chunk(f11, { expires: g12 });
                d10.push(...h12);
              }
            } else d10.push({ name: b10.cookies.sessionToken.name, value: z2.sessionToken, options: { ...b10.cookies.sessionToken.options, expires: z2.expires } });
            if (await o2.signIn?.({ user: y2, account: v2, profile: w2, isNewUser: A2 }), A2 && m2.newUser) return { redirect: `${m2.newUser}${m2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: l2 })}`, cookies: d10 };
            return { redirect: l2, cookies: d10 };
          }
          if ("email" === i2.type) {
            let a11 = e10?.token, f11 = e10?.email;
            if (!a11) {
              let b11 = TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", { cause: { hasToken: !!a11 } });
              throw b11.name = "Configuration", b11;
            }
            let g11 = i2.secret ?? b10.secret, h11 = await j2.useVerificationToken({ identifier: f11, token: await em(`${a11}${g11}`) }), k3 = !!h11, q3 = k3 && h11.expires.valueOf() < Date.now();
            if (!k3 || q3 || f11 && h11.identifier !== f11) throw new bP({ hasInvite: k3, expired: q3 });
            let { identifier: s3 } = h11, u2 = await j2.getUserByEmail(s3) ?? { id: crypto.randomUUID(), email: s3, emailVerified: null }, v2 = { providerAccountId: u2.email, userId: u2.id, type: "email", provider: i2.id }, w2 = await hH({ user: u2, account: v2 }, b10);
            if (w2) return { redirect: w2, cookies: d10 };
            let { user: x2, session: y2, isNewUser: z2 } = await fC(c10.value, u2, v2, b10);
            if (t2) {
              let a12 = { name: x2.name, email: x2.email, picture: x2.image, sub: x2.id?.toString() }, e11 = await p2.jwt({ token: a12, user: x2, account: v2, isNewUser: z2, trigger: z2 ? "signUp" : "signIn" });
              if (null === e11) d10.push(...c10.clean());
              else {
                let a13 = b10.cookies.sessionToken.name, f12 = await n2.encode({ ...n2, token: e11, salt: a13 }), g12 = /* @__PURE__ */ new Date();
                g12.setTime(g12.getTime() + 1e3 * r2);
                let h12 = c10.chunk(f12, { expires: g12 });
                d10.push(...h12);
              }
            } else d10.push({ name: b10.cookies.sessionToken.name, value: y2.sessionToken, options: { ...b10.cookies.sessionToken.options, expires: y2.expires } });
            if (await o2.signIn?.({ user: x2, account: v2, isNewUser: z2 }), z2 && m2.newUser) return { redirect: `${m2.newUser}${m2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: l2 })}`, cookies: d10 };
            return { redirect: l2, cookies: d10 };
          }
          if ("credentials" === i2.type && "POST" === g10) {
            let a11 = f10 ?? {};
            Object.entries(e10 ?? {}).forEach(([a12, b11]) => k2.searchParams.set(a12, b11));
            let j3 = await i2.authorize(a11, new Request(k2, { headers: h10, method: g10, body: JSON.stringify(f10) }));
            if (j3) j3.id = j3.id?.toString() ?? crypto.randomUUID();
            else throw new bw();
            let m3 = { providerAccountId: j3.id, type: "credentials", provider: i2.id }, q3 = await hH({ user: j3, account: m3, credentials: a11 }, b10);
            if (q3) return { redirect: q3, cookies: d10 };
            let s3 = { name: j3.name, email: j3.email, picture: j3.image, sub: j3.id }, t3 = await p2.jwt({ token: s3, user: j3, account: m3, isNewUser: false, trigger: "signIn" });
            if (null === t3) d10.push(...c10.clean());
            else {
              let a12 = b10.cookies.sessionToken.name, e11 = await n2.encode({ ...n2, token: t3, salt: a12 }), f11 = /* @__PURE__ */ new Date();
              f11.setTime(f11.getTime() + 1e3 * r2);
              let g11 = c10.chunk(e11, { expires: f11 });
              d10.push(...g11);
            }
            return await o2.signIn?.({ user: j3, account: m3 }), { redirect: l2, cookies: d10 };
          } else if ("webauthn" === i2.type && "POST" === g10) {
            let e11, f11, g11, h11 = a10.body?.action;
            if ("string" != typeof h11 || "authenticate" !== h11 && "register" !== h11) throw new bo("Invalid action parameter");
            let i3 = hC(b10);
            switch (h11) {
              case "authenticate": {
                let b11 = await hy(i3, a10, d10);
                e11 = b11.user, f11 = b11.account;
                break;
              }
              case "register": {
                let c11 = await hz(b10, a10, d10);
                e11 = c11.user, f11 = c11.account, g11 = c11.authenticator;
              }
            }
            await hH({ user: e11, account: f11 }, b10);
            let { user: j3, isNewUser: k3, session: q3, account: s3 } = await fC(c10.value, e11, f11, b10);
            if (!s3) throw new bo("Error creating or finding account");
            if (g11 && j3.id && await i3.adapter.createAuthenticator({ ...g11, userId: j3.id }), t2) {
              let a11 = { name: j3.name, email: j3.email, picture: j3.image, sub: j3.id?.toString() }, e12 = await p2.jwt({ token: a11, user: j3, account: s3, isNewUser: k3, trigger: k3 ? "signUp" : "signIn" });
              if (null === e12) d10.push(...c10.clean());
              else {
                let a12 = b10.cookies.sessionToken.name, f12 = await n2.encode({ ...n2, token: e12, salt: a12 }), g12 = /* @__PURE__ */ new Date();
                g12.setTime(g12.getTime() + 1e3 * r2);
                let h12 = c10.chunk(f12, { expires: g12 });
                d10.push(...h12);
              }
            } else d10.push({ name: b10.cookies.sessionToken.name, value: q3.sessionToken, options: { ...b10.cookies.sessionToken.options, expires: q3.expires } });
            if (await o2.signIn?.({ user: j3, account: s3, isNewUser: k3 }), k3 && m2.newUser) return { redirect: `${m2.newUser}${m2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: l2 })}`, cookies: d10 };
            return { redirect: l2, cookies: d10 };
          }
          throw new bN(`Callback for provider type (${i2.type}) is not supported`);
        } catch (b11) {
          if (b11 instanceof bo) throw b11;
          let a11 = new bs(b11, { provider: i2.id });
          throw s2.debug("callback route error details", { method: g10, query: e10, body: f10 }), a11;
        }
      }
      async function hH(a10, b10) {
        let c10, { signIn: d10, redirect: e10 } = b10.callbacks;
        try {
          c10 = await d10(a10);
        } catch (a11) {
          if (a11 instanceof bo) throw a11;
          throw new br(a11);
        }
        if (!c10) throw new br("AccessDenied");
        if ("string" == typeof c10) return await e10({ url: c10, baseUrl: b10.url.origin });
      }
      async function hI(a10, b10, c10, d10, e10) {
        let { adapter: f10, jwt: g10, events: h10, callbacks: i2, logger: j2, session: { strategy: k2, maxAge: l2 } } = a10, m2 = { body: null, headers: { "Content-Type": "application/json", ...!d10 && { "Cache-Control": "private, no-cache, no-store", Expires: "0", Pragma: "no-cache" } }, cookies: c10 }, n2 = b10.value;
        if (!n2) return m2;
        if ("jwt" === k2) {
          try {
            let c11 = a10.cookies.sessionToken.name, f11 = await g10.decode({ ...g10, token: n2, salt: c11 });
            if (!f11) throw Error("Invalid JWT");
            let j3 = await i2.jwt({ token: f11, ...d10 && { trigger: "update" }, session: e10 }), k3 = fB(l2);
            if (null !== j3) {
              let a11 = { user: { name: j3.name, email: j3.email, image: j3.picture }, expires: k3.toISOString() }, d11 = await i2.session({ session: a11, token: j3 });
              m2.body = d11;
              let e11 = await g10.encode({ ...g10, token: j3, salt: c11 }), f12 = b10.chunk(e11, { expires: k3 });
              m2.cookies?.push(...f12), await h10.session?.({ session: d11, token: j3 });
            } else m2.cookies?.push(...b10.clean());
          } catch (a11) {
            j2.error(new bz(a11)), m2.cookies?.push(...b10.clean());
          }
          return m2;
        }
        try {
          let { getSessionAndUser: c11, deleteSession: g11, updateSession: j3 } = f10, k3 = await c11(n2);
          if (k3 && k3.session.expires.valueOf() < Date.now() && (await g11(n2), k3 = null), k3) {
            let { user: b11, session: c12 } = k3, f11 = a10.session.updateAge, g12 = c12.expires.valueOf() - 1e3 * l2 + 1e3 * f11, o2 = fB(l2);
            g12 <= Date.now() && await j3({ sessionToken: n2, expires: o2 });
            let p2 = await i2.session({ session: { ...c12, user: b11 }, user: b11, newSession: e10, ...d10 ? { trigger: "update" } : {} });
            m2.body = p2, m2.cookies?.push({ name: a10.cookies.sessionToken.name, value: n2, options: { ...a10.cookies.sessionToken.options, expires: o2 } }), await h10.session?.({ session: p2 });
          } else n2 && m2.cookies?.push(...b10.clean());
        } catch (a11) {
          j2.error(new bH(a11));
        }
        return m2;
      }
      async function hJ(a10, b10) {
        let c10, d10, { logger: e10, provider: f10 } = b10, g10 = f10.authorization?.url;
        if (!g10 || "authjs.dev" === g10.host) {
          let a11 = new URL(f10.issuer), b11 = await fZ(a11, { [fK]: f10[eu], [fH]: true }), c11 = await f0(a11, b11).catch((b12) => {
            if (!(b12 instanceof TypeError) || "Invalid URL" !== b12.message) throw b12;
            throw TypeError(`Discovery request responded with an invalid issuer. expected: ${a11}`);
          });
          if (!c11.authorization_endpoint) throw TypeError("Authorization server did not provide an authorization endpoint.");
          g10 = new URL(c11.authorization_endpoint);
        }
        let h10 = g10.searchParams, i2 = f10.callbackUrl;
        !b10.isOnRedirectProxy && f10.redirectProxyUrl && (i2 = f10.redirectProxyUrl, d10 = f10.callbackUrl, e10.debug("using redirect proxy", { redirect_uri: i2, data: d10 }));
        let j2 = Object.assign({ response_type: "code", client_id: f10.clientId, redirect_uri: i2, ...f10.authorization?.params }, Object.fromEntries(f10.authorization?.url.searchParams ?? []), a10);
        for (let a11 in j2) h10.set(a11, j2[a11]);
        let k2 = [];
        f10.authorization?.url.searchParams.get("response_mode") === "form_post" && (b10.cookies.state.options.sameSite = "none", b10.cookies.state.options.secure = true, b10.cookies.nonce.options.sameSite = "none", b10.cookies.nonce.options.secure = true);
        let l2 = await ho.create(b10, d10);
        if (l2 && (h10.set("state", l2.value), k2.push(l2.cookie)), f10.checks?.includes("pkce")) if (c10 && !c10.code_challenge_methods_supported?.includes("S256")) "oidc" === f10.type && (f10.checks = ["nonce"]);
        else {
          let { value: a11, cookie: c11 } = await hm.create(b10);
          h10.set("code_challenge", a11), h10.set("code_challenge_method", "S256"), k2.push(c11);
        }
        let m2 = await hp.create(b10);
        return m2 && (h10.set("nonce", m2.value), k2.push(m2.cookie)), "oidc" !== f10.type || g10.searchParams.has("scope") || g10.searchParams.set("scope", "openid profile email"), e10.debug("authorization url is ready", { url: g10, cookies: k2, provider: f10 }), { redirect: g10.toString(), cookies: k2 };
      }
      async function hK(a10, b10) {
        let c10, { body: d10 } = a10, { provider: e10, callbacks: f10, adapter: g10 } = b10, h10 = (e10.normalizeIdentifier ?? function(a11) {
          if (!a11) throw Error("Missing email from request body.");
          let b11 = a11.normalize("NFKC").toLowerCase().trim();
          if (b11.includes('"')) throw Error("Invalid email address format.");
          let [c11, d11] = b11.split("@");
          if (!c11 || !d11 || 2 !== b11.split("@").length || !(d11 = d11.split(",")[0])) throw Error("Invalid email address format.");
          return `${c11}@${d11}`;
        })(d10?.email), i2 = { id: crypto.randomUUID(), email: h10, emailVerified: null }, j2 = await g10.getUserByEmail(h10) ?? i2, k2 = { providerAccountId: h10, userId: j2.id, type: "email", provider: e10.id };
        try {
          c10 = await f10.signIn({ user: j2, account: k2, email: { verificationRequest: true } });
        } catch (a11) {
          throw new br(a11);
        }
        if (!c10) throw new br("AccessDenied");
        if ("string" == typeof c10) return { redirect: await f10.redirect({ url: c10, baseUrl: b10.url.origin }) };
        let { callbackUrl: l2, theme: m2 } = b10, n2 = await e10.generateVerificationToken?.() ?? en(32), o2 = new Date(Date.now() + (e10.maxAge ?? 86400) * 1e3), p2 = e10.secret ?? b10.secret, q2 = new URL(b10.basePath, b10.url.origin), r2 = e10.sendVerificationRequest({ identifier: h10, token: n2, expires: o2, url: `${q2}/callback/${e10.id}?${new URLSearchParams({ callbackUrl: l2, token: n2, email: h10 })}`, provider: e10, theme: m2, request: new Request(a10.url, { headers: a10.headers, method: a10.method, body: "POST" === a10.method ? JSON.stringify(a10.body ?? {}) : void 0 }) }), s2 = g10.createVerificationToken?.({ identifier: h10, token: await em(`${n2}${p2}`), expires: o2 });
        return await Promise.all([r2, s2]), { redirect: `${q2}/verify-request?${new URLSearchParams({ provider: e10.id, type: e10.type })}` };
      }
      async function hL(a10, b10, c10) {
        let d10 = `${c10.url.origin}${c10.basePath}/signin`;
        if (!c10.provider) return { redirect: d10, cookies: b10 };
        switch (c10.provider.type) {
          case "oauth":
          case "oidc": {
            let { redirect: d11, cookies: e10 } = await hJ(a10.query, c10);
            return e10 && b10.push(...e10), { redirect: d11, cookies: b10 };
          }
          case "email":
            return { ...await hK(a10, c10), cookies: b10 };
          default:
            return { redirect: d10, cookies: b10 };
        }
      }
      async function hM(a10, b10, c10) {
        let { jwt: d10, events: e10, callbackUrl: f10, logger: g10, session: h10 } = c10, i2 = b10.value;
        if (!i2) return { redirect: f10, cookies: a10 };
        try {
          if ("jwt" === h10.strategy) {
            let a11 = c10.cookies.sessionToken.name, b11 = await d10.decode({ ...d10, token: i2, salt: a11 });
            await e10.signOut?.({ token: b11 });
          } else {
            let a11 = await c10.adapter?.deleteSession(i2);
            await e10.signOut?.({ session: a11 });
          }
        } catch (a11) {
          g10.error(new bK(a11));
        }
        return a10.push(...b10.clean()), { redirect: f10, cookies: a10 };
      }
      async function hN(a10, b10) {
        let { adapter: c10, jwt: d10, session: { strategy: e10 } } = a10, f10 = b10.value;
        if (!f10) return null;
        if ("jwt" === e10) {
          let b11 = a10.cookies.sessionToken.name, c11 = await d10.decode({ ...d10, token: f10, salt: b11 });
          if (c11 && c11.sub) return { id: c11.sub, name: c11.name, email: c11.email, image: c11.picture };
        } else {
          let a11 = await c10?.getSessionAndUser(f10);
          if (a11) return a11.user;
        }
        return null;
      }
      async function hO(a10, b10, c10, d10) {
        let e10 = hC(b10), { provider: f10 } = e10, { action: g10 } = a10.query ?? {};
        if ("register" !== g10 && "authenticate" !== g10 && void 0 !== g10) return { status: 400, body: { error: "Invalid action" }, cookies: d10, headers: { "Content-Type": "application/json" } };
        let h10 = await hN(b10, c10), i2 = h10 ? { user: h10, exists: true } : await f10.getUserInfo(b10, a10), j2 = i2?.user;
        switch (function(a11, b11, c11) {
          let { user: d11, exists: e11 = false } = c11 ?? {};
          switch (a11) {
            case "authenticate":
              return "authenticate";
            case "register":
              if (d11 && b11 === e11) return "register";
              break;
            case void 0:
              if (!b11) if (!d11) return "authenticate";
              else if (e11) return "authenticate";
              else return "register";
          }
          return null;
        }(g10, !!h10, i2)) {
          case "authenticate":
            return hx(e10, a10, j2, d10);
          case "register":
            if ("string" == typeof j2?.email) return hw(e10, a10, j2, d10);
            break;
          default:
            return { status: 400, body: { error: "Invalid request" }, cookies: d10, headers: { "Content-Type": "application/json" } };
        }
      }
      async function hP(a10, b10) {
        let { action: c10, providerId: d10, error: e10, method: f10 } = a10, g10 = b10.skipCSRFCheck === es, { options: h10, cookies: i2 } = await eB({ authOptions: b10, action: c10, providerId: d10, url: a10.url, callbackUrl: a10.body?.callbackUrl ?? a10.query?.callbackUrl, csrfToken: a10.body?.csrfToken, cookies: a10.cookies, isPost: "POST" === f10, csrfDisabled: g10 }), j2 = new bn(h10.cookies.sessionToken, a10.cookies, h10.logger);
        if ("GET" === f10) {
          let b11 = fA({ ...h10, query: a10.query, cookies: i2 });
          switch (c10) {
            case "callback":
              return await hG(a10, h10, j2, i2);
            case "csrf":
              return b11.csrf(g10, h10, i2);
            case "error":
              return b11.error(e10);
            case "providers":
              return b11.providers(h10.providers);
            case "session":
              return await hI(h10, j2, i2);
            case "signin":
              return b11.signin(d10, e10);
            case "signout":
              return b11.signout();
            case "verify-request":
              return b11.verifyRequest();
            case "webauthn-options":
              return await hO(a10, h10, j2, i2);
          }
        } else {
          let { csrfTokenVerified: b11 } = h10;
          switch (c10) {
            case "callback":
              return "credentials" === h10.provider.type && ep(c10, b11), await hG(a10, h10, j2, i2);
            case "session":
              return ep(c10, b11), await hI(h10, j2, i2, true, a10.body?.data);
            case "signin":
              return ep(c10, b11), await hL(a10, i2, h10);
            case "signout":
              return ep(c10, b11), await hM(i2, j2, h10);
          }
        }
        throw new bL(`Cannot handle action: ${c10}`);
      }
      function hQ(a10, b10, c10, d10, e10) {
        let f10, g10 = e10?.basePath, h10 = d10.AUTH_URL ?? d10.NEXTAUTH_URL;
        if (h10) f10 = new URL(h10), g10 && "/" !== g10 && "/" !== f10.pathname && (f10.pathname !== g10 && ef(e10).warn("env-url-basepath-mismatch"), f10.pathname = "/");
        else {
          let a11 = c10.get("x-forwarded-host") ?? c10.get("host"), d11 = c10.get("x-forwarded-proto") ?? b10 ?? "https", e11 = d11.endsWith(":") ? d11 : d11 + ":";
          f10 = new URL(`${e11}//${a11}`);
        }
        let i2 = f10.toString().replace(/\/$/, "");
        if (g10) {
          let b11 = g10?.replace(/(^\/|\/$)/g, "") ?? "";
          return new URL(`${i2}/${b11}/${a10}`);
        }
        return new URL(`${i2}/${a10}`);
      }
      async function hR(a10, b10) {
        let c10 = ef(b10), d10 = await ek(a10, b10);
        if (!d10) return Response.json("Bad request.", { status: 400 });
        let e10 = function(a11, b11) {
          let { url: c11 } = a11, d11 = [];
          if (!bX && b11.debug && d11.push("debug-enabled"), !b11.trustHost) return new bO(`Host must be trusted. URL was: ${a11.url}`);
          if (!b11.secret?.length) return new bD("Please define a `secret`");
          let e11 = a11.query?.callbackUrl;
          if (e11 && !bY(e11, c11.origin)) return new bv(`Invalid callback URL. Received: ${e11}`);
          let { callbackUrl: f11 } = bm(b11.useSecureCookies ?? "https:" === c11.protocol), g11 = a11.cookies?.[b11.cookies?.callbackUrl?.name ?? f11.name];
          if (g11 && !bY(g11, c11.origin)) return new bv(`Invalid callback URL. Received: ${g11}`);
          let h10 = false;
          for (let a12 of b11.providers) {
            let b12 = "function" == typeof a12 ? a12() : a12;
            if (("oauth" === b12.type || "oidc" === b12.type) && !(b12.issuer ?? b12.options?.issuer)) {
              let a13, { authorization: c12, token: d12, userinfo: e12 } = b12;
              if ("string" == typeof c12 || c12?.url ? "string" == typeof d12 || d12?.url ? "string" == typeof e12 || e12?.url || (a13 = "userinfo") : a13 = "token" : a13 = "authorization", a13) return new bx(`Provider "${b12.id}" is missing both \`issuer\` and \`${a13}\` endpoint config. At least one of them is required`);
            }
            if ("credentials" === b12.type) bZ = true;
            else if ("email" === b12.type) b$ = true;
            else if ("webauthn" === b12.type) {
              var i2;
              if (b_ = true, b12.simpleWebAuthnBrowserVersion && (i2 = b12.simpleWebAuthnBrowserVersion, !/^v\d+(?:\.\d+){0,2}$/.test(i2))) return new bo(`Invalid provider config for "${b12.id}": simpleWebAuthnBrowserVersion "${b12.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
              if (b12.enableConditionalUI) {
                if (h10) return new bS("Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time");
                if (h10 = true, !Object.values(b12.formFields).some((a13) => a13.autocomplete && a13.autocomplete.toString().indexOf("webauthn") > -1)) return new bT(`Provider "${b12.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
              }
            }
          }
          if (bZ) {
            let a12 = b11.session?.strategy === "database", c12 = !b11.providers.some((a13) => "credentials" !== ("function" == typeof a13 ? a13() : a13).type);
            if (a12 && c12) return new bM("Signing in with credentials only supported if JWT strategy is enabled");
            if (b11.providers.some((a13) => {
              let b12 = "function" == typeof a13 ? a13() : a13;
              return "credentials" === b12.type && !b12.authorize;
            })) return new bC("Must define an authorize() handler to use credentials authentication provider");
          }
          let { adapter: j2, session: k2 } = b11, l2 = [];
          if (b$ || k2?.strategy === "database" || !k2?.strategy && j2) if (b$) {
            if (!j2) return new bA("Email login requires an adapter");
            l2.push(...b0);
          } else {
            if (!j2) return new bA("Database session requires an adapter");
            l2.push(...b1);
          }
          if (b_) {
            if (!b11.experimental?.enableWebAuthn) return new bW("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
            if (d11.push("experimental-webauthn"), !j2) return new bA("WebAuthn requires an adapter");
            l2.push(...b2);
          }
          if (j2) {
            let a12 = l2.filter((a13) => !(a13 in j2));
            if (a12.length) return new bB(`Required adapter methods were missing: ${a12.join(", ")}`);
          }
          return bX || (bX = true), d11;
        }(d10, b10);
        if (Array.isArray(e10)) e10.forEach(c10.warn);
        else if (e10) {
          if (c10.error(e10), !(/* @__PURE__ */ new Set(["signin", "signout", "error", "verify-request"])).has(d10.action) || "GET" !== d10.method) return Response.json({ message: "There was a problem with the server configuration. Check the server logs for more information." }, { status: 500 });
          let { pages: a11, theme: f11 } = b10, g11 = a11?.error && d10.url.searchParams.get("callbackUrl")?.startsWith(a11.error);
          if (!a11?.error || g11) return g11 && c10.error(new bt(`The error page ${a11?.error} should not require authentication`)), el(fA({ theme: f11 }).error("Configuration"));
          let h10 = `${d10.url.origin}${a11.error}?error=Configuration`;
          return Response.redirect(h10);
        }
        let f10 = a10.headers?.has("X-Auth-Return-Redirect"), g10 = b10.raw === et;
        try {
          let a11 = await hP(d10, b10);
          if (g10) return a11;
          let c11 = el(a11), e11 = c11.headers.get("Location");
          if (!f10 || !e11) return c11;
          return Response.json({ url: e11 }, { headers: c11.headers });
        } catch (l2) {
          c10.error(l2);
          let e11 = l2 instanceof bo;
          if (e11 && g10 && !f10) throw l2;
          if ("POST" === a10.method && "session" === d10.action) return Response.json(null, { status: 400 });
          let h10 = new URLSearchParams({ error: l2 instanceof bo && bR.has(l2.type) ? l2.type : "Configuration" });
          l2 instanceof bw && h10.set("code", l2.code);
          let i2 = e11 && l2.kind || "error", j2 = b10.pages?.[i2] ?? `${b10.basePath}/${i2.toLowerCase()}`, k2 = `${d10.url.origin}${j2}?${h10}`;
          if (f10) return Response.json({ url: k2 });
          return Response.redirect(k2);
        }
      }
      c(449), "undefined" == typeof URLPattern || URLPattern;
      var hS = c(107), hT = c(979), hU = c(770);
      function hV() {
        let a10 = a7.getStore();
        return (null == a10 ? void 0 : a10.rootTaskSpawnPhase) === "action";
      }
      c(918);
      let { env: hW, stdout: hX } = (null == (j = globalThis) ? void 0 : j.process) ?? {}, hY = hW && !hW.NO_COLOR && (hW.FORCE_COLOR || (null == hX ? void 0 : hX.isTTY) && !hW.CI && "dumb" !== hW.TERM), hZ = (a10, b10, c10, d10) => {
        let e10 = a10.substring(0, d10) + c10, f10 = a10.substring(d10 + b10.length), g10 = f10.indexOf(b10);
        return ~g10 ? e10 + hZ(f10, b10, c10, g10) : e10 + f10;
      }, h$ = (a10, b10, c10 = a10) => hY ? (d10) => {
        let e10 = "" + d10, f10 = e10.indexOf(b10, a10.length);
        return ~f10 ? a10 + hZ(e10, b10, c10, f10) + b10 : a10 + e10 + b10;
      } : String, h_ = h$("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      h$("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), h$("\x1B[3m", "\x1B[23m"), h$("\x1B[4m", "\x1B[24m"), h$("\x1B[7m", "\x1B[27m"), h$("\x1B[8m", "\x1B[28m"), h$("\x1B[9m", "\x1B[29m"), h$("\x1B[30m", "\x1B[39m");
      let h0 = h$("\x1B[31m", "\x1B[39m"), h1 = h$("\x1B[32m", "\x1B[39m"), h2 = h$("\x1B[33m", "\x1B[39m");
      h$("\x1B[34m", "\x1B[39m");
      let h3 = h$("\x1B[35m", "\x1B[39m");
      h$("\x1B[38;2;173;127;168m", "\x1B[39m"), h$("\x1B[36m", "\x1B[39m");
      let h4 = h$("\x1B[37m", "\x1B[39m");
      function h5(a10) {
        let b10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!b10) return a10;
        let { origin: c10 } = new URL(b10), { href: d10, origin: e10 } = a10.nextUrl;
        return new T(d10.replace(e10, c10), a10);
      }
      function h6(a10) {
        try {
          a10.secret ?? (a10.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
          let b10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
          if (!b10) return;
          let { pathname: c10 } = new URL(b10);
          if ("/" === c10) return;
          a10.basePath || (a10.basePath = c10);
        } catch {
        } finally {
          a10.basePath || (a10.basePath = "/api/auth"), function(a11, b10, c10 = false) {
            try {
              let d10 = a11.AUTH_URL;
              d10 && (b10.basePath ? c10 || ef(b10).warn("env-url-basepath-redundant") : b10.basePath = new URL(d10).pathname);
            } catch {
            } finally {
              b10.basePath ?? (b10.basePath = "/auth");
            }
            if (!b10.secret?.length) {
              b10.secret = [];
              let c11 = a11.AUTH_SECRET;
              for (let d10 of (c11 && b10.secret.push(c11), [1, 2, 3])) {
                let c12 = a11[`AUTH_SECRET_${d10}`];
                c12 && b10.secret.unshift(c12);
              }
            }
            b10.redirectProxyUrl ?? (b10.redirectProxyUrl = a11.AUTH_REDIRECT_PROXY_URL), b10.trustHost ?? (b10.trustHost = !!(a11.AUTH_URL ?? a11.AUTH_TRUST_HOST ?? a11.VERCEL ?? a11.CF_PAGES ?? "production" !== a11.NODE_ENV)), b10.providers = b10.providers.map((b11) => {
              let { id: c11 } = "function" == typeof b11 ? b11({}) : b11, d10 = c11.toUpperCase().replace(/-/g, "_"), e10 = a11[`AUTH_${d10}_ID`], f10 = a11[`AUTH_${d10}_SECRET`], g10 = a11[`AUTH_${d10}_ISSUER`], h10 = a11[`AUTH_${d10}_KEY`], i2 = "function" == typeof b11 ? b11({ clientId: e10, clientSecret: f10, issuer: g10, apiKey: h10 }) : b11;
              return "oauth" === i2.type || "oidc" === i2.type ? (i2.clientId ?? (i2.clientId = e10), i2.clientSecret ?? (i2.clientSecret = f10), i2.issuer ?? (i2.issuer = g10)) : "email" === i2.type && (i2.apiKey ?? (i2.apiKey = h10)), i2;
            });
          }(process.env, a10, true);
        }
      }
      h$("\x1B[90m", "\x1B[39m"), h$("\x1B[40m", "\x1B[49m"), h$("\x1B[41m", "\x1B[49m"), h$("\x1B[42m", "\x1B[49m"), h$("\x1B[43m", "\x1B[49m"), h$("\x1B[44m", "\x1B[49m"), h$("\x1B[45m", "\x1B[49m"), h$("\x1B[46m", "\x1B[49m"), h$("\x1B[47m", "\x1B[49m"), h4(h_("\u25CB")), h0(h_("\u2A2F")), h2(h_("\u26A0")), h4(h_(" ")), h1(h_("\u2713")), h3(h_("\xBB")), new aX(1e4, (a10) => a10.length), /* @__PURE__ */ new WeakMap();
      var h7 = c(814);
      let h8 = { current: null }, h9 = "function" == typeof h7.cache ? h7.cache : (a10) => a10, ia = console.warn;
      function ib(a10) {
        return function(...b10) {
          ia(a10(...b10));
        };
      }
      function ic() {
        let a10 = "cookies", b10 = ad.J.getStore(), c10 = aR.FP.getStore();
        if (b10) {
          if (c10 && "after" === c10.phase && !hV()) throw Object.defineProperty(Error(`Route ${b10.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E88", enumerable: false, configurable: true });
          if (b10.forceStatic) return ie(af.seal(new R.RequestCookies(new Headers({}))));
          if (b10.dynamicShouldError) throw Object.defineProperty(new hT.f(`Route ${b10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E549", enumerable: false, configurable: true });
          if (c10) switch (c10.type) {
            case "cache":
              let f10 = Object.defineProperty(Error(`Route ${b10.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E398", enumerable: false, configurable: true });
              throw Error.captureStackTrace(f10, ic), b10.invalidDynamicUsageError ??= f10, f10;
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${b10.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E157", enumerable: false, configurable: true });
            case "prerender":
              var d10 = b10, e10 = c10;
              let g10 = id.get(e10);
              if (g10) return g10;
              let h10 = (0, hU.W5)(e10.renderSignal, d10.route, "`cookies()`");
              return id.set(e10, h10), h10;
            case "prerender-client":
              let i2 = "`cookies`";
              throw Object.defineProperty(new aU.z(`${i2} must not be used within a client component. Next.js should be preventing ${i2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, hS.Ui)(b10.route, a10, c10.dynamicTracking);
            case "prerender-legacy":
              return (0, hS.xI)(a10, b10, c10);
            case "prerender-runtime":
              return (0, hS.wi)(c10, function(a11) {
                let b11 = id.get(a11);
                if (b11) return b11;
                let c11 = Promise.resolve(a11);
                return id.set(a11, c11), c11;
              }(c10.cookies));
            case "private-cache":
              return ie(c10.cookies);
            case "request":
              return (0, hS.Pk)(c10), ie(ai(c10) ? c10.userspaceMutableCookies : c10.cookies);
          }
        }
        (0, aR.M1)(a10);
      }
      h9((a10) => {
        try {
          ia(h8.current);
        } finally {
          h8.current = null;
        }
      });
      let id = /* @__PURE__ */ new WeakMap();
      function ie(a10) {
        let b10 = id.get(a10);
        if (b10) return b10;
        let c10 = Promise.resolve(a10);
        return id.set(a10, c10), Object.defineProperties(c10, { [Symbol.iterator]: { value: a10[Symbol.iterator] ? a10[Symbol.iterator].bind(a10) : ig.bind(a10) }, size: { get: () => a10.size }, get: { value: a10.get.bind(a10) }, getAll: { value: a10.getAll.bind(a10) }, has: { value: a10.has.bind(a10) }, set: { value: a10.set.bind(a10) }, delete: { value: a10.delete.bind(a10) }, clear: { value: "function" == typeof a10.clear ? a10.clear.bind(a10) : ih.bind(a10, c10) }, toString: { value: a10.toString.bind(a10) } }), c10;
      }
      function ig() {
        return this.getAll().map((a10) => [a10.name, a10]).values();
      }
      function ih(a10) {
        for (let a11 of this.getAll()) this.delete(a11.name);
        return a10;
      }
      function ii() {
        let a10 = "headers", b10 = ad.J.getStore(), c10 = aR.FP.getStore();
        if (b10) {
          if (c10 && "after" === c10.phase && !hV()) throw Object.defineProperty(Error(`Route ${b10.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E367", enumerable: false, configurable: true });
          if (b10.forceStatic) return ik(ac.seal(new Headers({})));
          if (c10) switch (c10.type) {
            case "cache": {
              let a11 = Object.defineProperty(Error(`Route ${b10.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E304", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a11, ii), b10.invalidDynamicUsageError ??= a11, a11;
            }
            case "private-cache": {
              let a11 = Object.defineProperty(Error(`Route ${b10.route} used "headers" inside "use cache: private". Accessing "headers" inside a private cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E742", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a11, ii), b10.invalidDynamicUsageError ??= a11, a11;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${b10.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E127", enumerable: false, configurable: true });
          }
          if (b10.dynamicShouldError) throw Object.defineProperty(new hT.f(`Route ${b10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E525", enumerable: false, configurable: true });
          if (c10) switch (c10.type) {
            case "prerender":
            case "prerender-runtime":
              var d10 = b10, e10 = c10;
              let f10 = ij.get(e10);
              if (f10) return f10;
              let g10 = (0, hU.W5)(e10.renderSignal, d10.route, "`headers()`");
              return ij.set(e10, g10), g10;
            case "prerender-client":
              let h10 = "`headers`";
              throw Object.defineProperty(new aU.z(`${h10} must not be used within a client component. Next.js should be preventing ${h10} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, hS.Ui)(b10.route, a10, c10.dynamicTracking);
            case "prerender-legacy":
              return (0, hS.xI)(a10, b10, c10);
            case "request":
              return (0, hS.Pk)(c10), ik(c10.headers);
          }
        }
        (0, aR.M1)(a10);
      }
      ib(function(a10, b10) {
        let c10 = a10 ? `Route "${a10}" ` : "This route ";
        return Object.defineProperty(Error(`${c10}used ${b10}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E223", enumerable: false, configurable: true });
      });
      let ij = /* @__PURE__ */ new WeakMap();
      function ik(a10) {
        let b10 = ij.get(a10);
        if (b10) return b10;
        let c10 = Promise.resolve(a10);
        return ij.set(a10, c10), Object.defineProperties(c10, { append: { value: a10.append.bind(a10) }, delete: { value: a10.delete.bind(a10) }, get: { value: a10.get.bind(a10) }, has: { value: a10.has.bind(a10) }, set: { value: a10.set.bind(a10) }, getSetCookie: { value: a10.getSetCookie.bind(a10) }, forEach: { value: a10.forEach.bind(a10) }, keys: { value: a10.keys.bind(a10) }, values: { value: a10.values.bind(a10) }, entries: { value: a10.entries.bind(a10) }, [Symbol.iterator]: { value: a10[Symbol.iterator].bind(a10) } }), c10;
      }
      async function il(a10, b10) {
        return hR(new Request(hQ("session", a10.get("x-forwarded-proto"), a10, process.env, b10), { headers: { cookie: a10.get("cookie") ?? "" } }), { ...b10, callbacks: { ...b10.callbacks, async session(...a11) {
          let c10 = await b10.callbacks?.session?.(...a11) ?? { ...a11[0].session, expires: a11[0].session.expires?.toISOString?.() ?? a11[0].session.expires };
          return { user: a11[0].user ?? a11[0].token, ...c10 };
        } } });
      }
      async function im(a10) {
        return a10.ok ? await a10.json() : null;
      }
      function io(a10) {
        return "function" == typeof a10;
      }
      function ip(a10, b10) {
        return "function" == typeof a10 ? async (...c10) => {
          if (!c10.length) {
            let c11 = await ii(), d11 = await a10(void 0);
            return b10?.(d11), il(c11, d11).then(im);
          }
          if (c10[0] instanceof Request) {
            let d11 = c10[0], e11 = c10[1], f11 = await a10(d11);
            return b10?.(f11), iq([d11, e11], f11);
          }
          if (io(c10[0])) {
            let d11 = c10[0];
            return async (...c11) => {
              let e11 = await a10(c11[0]);
              return b10?.(e11), iq(c11, e11, d11);
            };
          }
          let d10 = "req" in c10[0] ? c10[0].req : c10[0], e10 = "res" in c10[0] ? c10[0].res : c10[1], f10 = await a10(d10);
          return b10?.(f10), il(new Headers(d10.headers), f10).then(async (a11) => {
            let b11 = await im(a11);
            for (let b12 of a11.headers.getSetCookie()) "headers" in e10 ? e10.headers.append("set-cookie", b12) : e10.appendHeader("set-cookie", b12);
            return b11;
          });
        } : (...b11) => {
          if (!b11.length) return Promise.resolve(ii()).then((b12) => il(b12, a10).then(im));
          if (b11[0] instanceof Request) return iq([b11[0], b11[1]], a10);
          if (io(b11[0])) {
            let c11 = b11[0];
            return async (...b12) => iq(b12, a10, c11).then((a11) => a11);
          }
          let c10 = "req" in b11[0] ? b11[0].req : b11[0], d10 = "res" in b11[0] ? b11[0].res : b11[1];
          return il(new Headers(c10.headers), a10).then(async (a11) => {
            let b12 = await im(a11);
            for (let b13 of a11.headers.getSetCookie()) "headers" in d10 ? d10.headers.append("set-cookie", b13) : d10.appendHeader("set-cookie", b13);
            return b12;
          });
        };
      }
      async function iq(a10, b10, c10) {
        let d10 = h5(a10[0]), e10 = await il(d10.headers, b10), f10 = await im(e10), g10 = true;
        b10.callbacks?.authorized && (g10 = await b10.callbacks.authorized({ request: d10, auth: f10 }));
        let h10 = Y.next?.();
        if (g10 instanceof Response) {
          h10 = g10;
          let a11 = g10.headers.get("Location"), { pathname: c11 } = d10.nextUrl;
          a11 && function(a12, b11, c12) {
            let d11 = b11.replace(`${a12}/`, ""), e11 = Object.values(c12.pages ?? {});
            return (ir.has(d11) || e11.includes(b11)) && b11 === a12;
          }(c11, new URL(a11).pathname, b10) && (g10 = true);
        } else if (c10) d10.auth = f10, h10 = await c10(d10, a10[1]) ?? Y.next();
        else if (!g10) {
          let a11 = b10.pages?.signIn ?? `${b10.basePath}/signin`;
          if (d10.nextUrl.pathname !== a11) {
            let b11 = d10.nextUrl.clone();
            b11.pathname = a11, b11.searchParams.set("callbackUrl", d10.nextUrl.href), h10 = Y.redirect(b11);
          }
        }
        let i2 = new Response(h10?.body, h10);
        for (let a11 of e10.headers.getSetCookie()) i2.headers.append("set-cookie", a11);
        return i2;
      }
      ib(function(a10, b10) {
        let c10 = a10 ? `Route "${a10}" ` : "This route ";
        return Object.defineProperty(Error(`${c10}used ${b10}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E277", enumerable: false, configurable: true });
      }), c(159), /* @__PURE__ */ new WeakMap(), ib(function(a10, b10) {
        let c10 = a10 ? `Route "${a10}" ` : "This route ";
        return Object.defineProperty(Error(`${c10}used ${b10}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E377", enumerable: false, configurable: true });
      });
      let ir = /* @__PURE__ */ new Set(["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error"]);
      var is = c(378), it = c(944);
      let iu = c(918).s;
      function iv(a10, b10) {
        var c10;
        throw null != b10 || (b10 = (null == iu || null == (c10 = iu.getStore()) ? void 0 : c10.isAction) ? it.zB.push : it.zB.replace), function(a11, b11, c11) {
          void 0 === c11 && (c11 = is.Q.TemporaryRedirect);
          let d10 = Object.defineProperty(Error(it.oJ), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          return d10.digest = it.oJ + ";" + b11 + ";" + a11 + ";" + c11 + ";", d10;
        }(a10, b10, is.Q.TemporaryRedirect);
      }
      var iw = c(66);
      async function ix(a10, b10 = {}, c10, d10) {
        let e10 = new Headers(await ii()), { redirect: f10 = true, redirectTo: g10, ...h10 } = b10 instanceof FormData ? Object.fromEntries(b10) : b10, i2 = g10?.toString() ?? e10.get("Referer") ?? "/", j2 = hQ("signin", e10.get("x-forwarded-proto"), e10, process.env, d10);
        if (!a10) return j2.searchParams.append("callbackUrl", i2), f10 && iv(j2.toString()), j2.toString();
        let k2 = `${j2}/${a10}?${new URLSearchParams(c10)}`, l2 = {};
        for (let b11 of d10.providers) {
          let { options: c11, ...d11 } = "function" == typeof b11 ? b11() : b11, e11 = c11?.id ?? d11.id;
          if (e11 === a10) {
            l2 = { id: e11, type: c11?.type ?? d11.type };
            break;
          }
        }
        if (!l2.id) {
          let a11 = `${j2}?${new URLSearchParams({ callbackUrl: i2 })}`;
          return f10 && iv(a11), a11;
        }
        "credentials" === l2.type && (k2 = k2.replace("signin", "callback")), e10.set("Content-Type", "application/x-www-form-urlencoded");
        let m2 = new Request(k2, { method: "POST", headers: e10, body: new URLSearchParams({ ...h10, callbackUrl: i2 }) }), n2 = await hR(m2, { ...d10, raw: et, skipCSRFCheck: es }), o2 = await ic();
        for (let a11 of n2?.cookies ?? []) o2.set(a11.name, a11.value, a11.options);
        let p2 = (n2 instanceof Response ? n2.headers.get("Location") : n2.redirect) ?? k2;
        return f10 ? iv(p2) : p2;
      }
      async function iy(a10, b10) {
        let c10 = new Headers(await ii());
        c10.set("Content-Type", "application/x-www-form-urlencoded");
        let d10 = hQ("signout", c10.get("x-forwarded-proto"), c10, process.env, b10), e10 = new URLSearchParams({ callbackUrl: a10?.redirectTo ?? c10.get("Referer") ?? "/" }), f10 = new Request(d10, { method: "POST", headers: c10, body: e10 }), g10 = await hR(f10, { ...b10, raw: et, skipCSRFCheck: es }), h10 = await ic();
        for (let a11 of g10?.cookies ?? []) h10.set(a11.name, a11.value, a11.options);
        return a10?.redirect ?? true ? iv(g10.redirect) : g10;
      }
      async function iz(a10, b10) {
        let c10 = new Headers(await ii());
        c10.set("Content-Type", "application/json");
        let d10 = new Request(hQ("session", c10.get("x-forwarded-proto"), c10, process.env, b10), { method: "POST", headers: c10, body: JSON.stringify({ data: a10 }) }), e10 = await hR(d10, { ...b10, raw: et, skipCSRFCheck: es }), f10 = await ic();
        for (let a11 of e10?.cookies ?? []) f10.set(a11.name, a11.value, a11.options);
        return e10.body;
      }
      iw.s8, iw.s8, iw.s8, c(515).X;
      let { handlers: iA, auth: iB, signIn: iC, signOut: iD } = function(a10) {
        if ("function" == typeof a10) {
          let b11 = async (b12) => {
            let c10 = await a10(b12);
            return h6(c10), hR(h5(b12), c10);
          };
          return { handlers: { GET: b11, POST: b11 }, auth: ip(a10, (a11) => h6(a11)), signIn: async (b12, c10, d10) => {
            let e10 = await a10(void 0);
            return h6(e10), ix(b12, c10, d10, e10);
          }, signOut: async (b12) => {
            let c10 = await a10(void 0);
            return h6(c10), iy(b12, c10);
          }, unstable_update: async (b12) => {
            let c10 = await a10(void 0);
            return h6(c10), iz(b12, c10);
          } };
        }
        h6(a10);
        let b10 = (b11) => hR(h5(b11), a10);
        return { handlers: { GET: b10, POST: b10 }, auth: ip(a10), signIn: (b11, c10, d10) => ix(b11, c10, d10, a10), signOut: (b11) => iy(b11, a10), unstable_update: (b11) => iz(b11, a10) };
      }({ providers: [function(a10) {
        return { id: "google", name: "Google", type: "oidc", issuer: "https://accounts.google.com", style: { brandColor: "#1a73e8" }, options: a10 };
      }], pages: { signIn: "/signin", error: "/signin" }, callbacks: { signIn({ profile: a10 }) {
        let b10 = a10?.email?.toLowerCase();
        return !!b10 && (process.env.ALLOWED_EMAILS ?? "").split(",").map((a11) => a11.trim().toLowerCase()).filter(Boolean).includes(b10);
      }, authorized: ({ auth: a10 }) => !!a10?.user }, session: { strategy: "jwt", maxAge: 15552e3 }, trustHost: true }), iE = { matcher: ["/((?!api|signin|_next/static|_next/image|favicon.ico|manifest.json|icons|sw.js).*)"] };
      c(747);
      let iF = { ...l }, iG = iF.middleware || iF.default, iH = "/middleware";
      if ("function" != typeof iG) throw Object.defineProperty(Error(`The Middleware "${iH}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", { value: "E120", enumerable: false, configurable: true });
      function iI(a10) {
        return bj({ ...a10, page: iH, handler: async (...a11) => {
          try {
            return await iG(...a11);
          } catch (e10) {
            let b10 = a11[0], c10 = new URL(b10.url), d10 = c10.pathname + c10.search;
            throw await p(e10, { path: d10, method: b10.method, headers: Object.fromEntries(b10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), e10;
          }
        } });
      }
    }, 809: (a, b, c) => {
      "use strict";
      c.d(b, { z: () => d });
      class d extends Error {
        constructor(a2, b2) {
          super("Invariant: " + (a2.endsWith(".") ? a2 : a2 + ".") + " This is a bug in Next.js.", b2), this.name = "InvariantError";
        }
      }
    }, 814: (a, b, c) => {
      "use strict";
      a.exports = c(440);
    }, 817: (a, b, c) => {
      (() => {
        "use strict";
        var b2 = { 491: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ContextAPI = void 0;
          let d2 = c2(223), e2 = c2(172), f2 = c2(930), g = "context", h = new d2.NoopContextManager();
          class i {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new i()), this._instance;
            }
            setGlobalContextManager(a3) {
              return (0, e2.registerGlobal)(g, a3, f2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(a3, b4, c3, ...d3) {
              return this._getContextManager().with(a3, b4, c3, ...d3);
            }
            bind(a3, b4) {
              return this._getContextManager().bind(a3, b4);
            }
            _getContextManager() {
              return (0, e2.getGlobal)(g) || h;
            }
            disable() {
              this._getContextManager().disable(), (0, e2.unregisterGlobal)(g, f2.DiagAPI.instance());
            }
          }
          b3.ContextAPI = i;
        }, 930: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagAPI = void 0;
          let d2 = c2(56), e2 = c2(912), f2 = c2(957), g = c2(172);
          class h {
            constructor() {
              function a3(a4) {
                return function(...b5) {
                  let c3 = (0, g.getGlobal)("diag");
                  if (c3) return c3[a4](...b5);
                };
              }
              let b4 = this;
              b4.setLogger = (a4, c3 = { logLevel: f2.DiagLogLevel.INFO }) => {
                var d3, h2, i;
                if (a4 === b4) {
                  let a5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return b4.error(null != (d3 = a5.stack) ? d3 : a5.message), false;
                }
                "number" == typeof c3 && (c3 = { logLevel: c3 });
                let j = (0, g.getGlobal)("diag"), k = (0, e2.createLogLevelDiagLogger)(null != (h2 = c3.logLevel) ? h2 : f2.DiagLogLevel.INFO, a4);
                if (j && !c3.suppressOverrideMessage) {
                  let a5 = null != (i = Error().stack) ? i : "<failed to generate stacktrace>";
                  j.warn(`Current logger will be overwritten from ${a5}`), k.warn(`Current logger will overwrite one already registered from ${a5}`);
                }
                return (0, g.registerGlobal)("diag", k, b4, true);
              }, b4.disable = () => {
                (0, g.unregisterGlobal)("diag", b4);
              }, b4.createComponentLogger = (a4) => new d2.DiagComponentLogger(a4), b4.verbose = a3("verbose"), b4.debug = a3("debug"), b4.info = a3("info"), b4.warn = a3("warn"), b4.error = a3("error");
            }
            static instance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
          }
          b3.DiagAPI = h;
        }, 653: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.MetricsAPI = void 0;
          let d2 = c2(660), e2 = c2(172), f2 = c2(930), g = "metrics";
          class h {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
            setGlobalMeterProvider(a3) {
              return (0, e2.registerGlobal)(g, a3, f2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, e2.getGlobal)(g) || d2.NOOP_METER_PROVIDER;
            }
            getMeter(a3, b4, c3) {
              return this.getMeterProvider().getMeter(a3, b4, c3);
            }
            disable() {
              (0, e2.unregisterGlobal)(g, f2.DiagAPI.instance());
            }
          }
          b3.MetricsAPI = h;
        }, 181: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.PropagationAPI = void 0;
          let d2 = c2(172), e2 = c2(874), f2 = c2(194), g = c2(277), h = c2(369), i = c2(930), j = "propagation", k = new e2.NoopTextMapPropagator();
          class l {
            constructor() {
              this.createBaggage = h.createBaggage, this.getBaggage = g.getBaggage, this.getActiveBaggage = g.getActiveBaggage, this.setBaggage = g.setBaggage, this.deleteBaggage = g.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalPropagator(a3) {
              return (0, d2.registerGlobal)(j, a3, i.DiagAPI.instance());
            }
            inject(a3, b4, c3 = f2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(a3, b4, c3);
            }
            extract(a3, b4, c3 = f2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(a3, b4, c3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, d2.unregisterGlobal)(j, i.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, d2.getGlobal)(j) || k;
            }
          }
          b3.PropagationAPI = l;
        }, 997: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceAPI = void 0;
          let d2 = c2(172), e2 = c2(846), f2 = c2(139), g = c2(607), h = c2(930), i = "trace";
          class j {
            constructor() {
              this._proxyTracerProvider = new e2.ProxyTracerProvider(), this.wrapSpanContext = f2.wrapSpanContext, this.isSpanContextValid = f2.isSpanContextValid, this.deleteSpan = g.deleteSpan, this.getSpan = g.getSpan, this.getActiveSpan = g.getActiveSpan, this.getSpanContext = g.getSpanContext, this.setSpan = g.setSpan, this.setSpanContext = g.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new j()), this._instance;
            }
            setGlobalTracerProvider(a3) {
              let b4 = (0, d2.registerGlobal)(i, this._proxyTracerProvider, h.DiagAPI.instance());
              return b4 && this._proxyTracerProvider.setDelegate(a3), b4;
            }
            getTracerProvider() {
              return (0, d2.getGlobal)(i) || this._proxyTracerProvider;
            }
            getTracer(a3, b4) {
              return this.getTracerProvider().getTracer(a3, b4);
            }
            disable() {
              (0, d2.unregisterGlobal)(i, h.DiagAPI.instance()), this._proxyTracerProvider = new e2.ProxyTracerProvider();
            }
          }
          b3.TraceAPI = j;
        }, 277: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.deleteBaggage = b3.setBaggage = b3.getActiveBaggage = b3.getBaggage = void 0;
          let d2 = c2(491), e2 = (0, c2(780).createContextKey)("OpenTelemetry Baggage Key");
          function f2(a3) {
            return a3.getValue(e2) || void 0;
          }
          b3.getBaggage = f2, b3.getActiveBaggage = function() {
            return f2(d2.ContextAPI.getInstance().active());
          }, b3.setBaggage = function(a3, b4) {
            return a3.setValue(e2, b4);
          }, b3.deleteBaggage = function(a3) {
            return a3.deleteValue(e2);
          };
        }, 993: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.BaggageImpl = void 0;
          class c2 {
            constructor(a3) {
              this._entries = a3 ? new Map(a3) : /* @__PURE__ */ new Map();
            }
            getEntry(a3) {
              let b4 = this._entries.get(a3);
              if (b4) return Object.assign({}, b4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([a3, b4]) => [a3, b4]);
            }
            setEntry(a3, b4) {
              let d2 = new c2(this._entries);
              return d2._entries.set(a3, b4), d2;
            }
            removeEntry(a3) {
              let b4 = new c2(this._entries);
              return b4._entries.delete(a3), b4;
            }
            removeEntries(...a3) {
              let b4 = new c2(this._entries);
              for (let c3 of a3) b4._entries.delete(c3);
              return b4;
            }
            clear() {
              return new c2();
            }
          }
          b3.BaggageImpl = c2;
        }, 830: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.baggageEntryMetadataSymbol = void 0, b3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.baggageEntryMetadataFromString = b3.createBaggage = void 0;
          let d2 = c2(930), e2 = c2(993), f2 = c2(830), g = d2.DiagAPI.instance();
          b3.createBaggage = function(a3 = {}) {
            return new e2.BaggageImpl(new Map(Object.entries(a3)));
          }, b3.baggageEntryMetadataFromString = function(a3) {
            return "string" != typeof a3 && (g.error(`Cannot create baggage metadata from unknown type: ${typeof a3}`), a3 = ""), { __TYPE__: f2.baggageEntryMetadataSymbol, toString: () => a3 };
          };
        }, 67: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.context = void 0, b3.context = c2(491).ContextAPI.getInstance();
        }, 223: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopContextManager = void 0;
          let d2 = c2(780);
          class e2 {
            active() {
              return d2.ROOT_CONTEXT;
            }
            with(a3, b4, c3, ...d3) {
              return b4.call(c3, ...d3);
            }
            bind(a3, b4) {
              return b4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          b3.NoopContextManager = e2;
        }, 780: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ROOT_CONTEXT = b3.createContextKey = void 0, b3.createContextKey = function(a3) {
            return Symbol.for(a3);
          };
          class c2 {
            constructor(a3) {
              let b4 = this;
              b4._currentContext = a3 ? new Map(a3) : /* @__PURE__ */ new Map(), b4.getValue = (a4) => b4._currentContext.get(a4), b4.setValue = (a4, d2) => {
                let e2 = new c2(b4._currentContext);
                return e2._currentContext.set(a4, d2), e2;
              }, b4.deleteValue = (a4) => {
                let d2 = new c2(b4._currentContext);
                return d2._currentContext.delete(a4), d2;
              };
            }
          }
          b3.ROOT_CONTEXT = new c2();
        }, 506: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.diag = void 0, b3.diag = c2(930).DiagAPI.instance();
        }, 56: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagComponentLogger = void 0;
          let d2 = c2(172);
          class e2 {
            constructor(a3) {
              this._namespace = a3.namespace || "DiagComponentLogger";
            }
            debug(...a3) {
              return f2("debug", this._namespace, a3);
            }
            error(...a3) {
              return f2("error", this._namespace, a3);
            }
            info(...a3) {
              return f2("info", this._namespace, a3);
            }
            warn(...a3) {
              return f2("warn", this._namespace, a3);
            }
            verbose(...a3) {
              return f2("verbose", this._namespace, a3);
            }
          }
          function f2(a3, b4, c3) {
            let e3 = (0, d2.getGlobal)("diag");
            if (e3) return c3.unshift(b4), e3[a3](...c3);
          }
          b3.DiagComponentLogger = e2;
        }, 972: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagConsoleLogger = void 0;
          let c2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class d2 {
            constructor() {
              for (let a3 = 0; a3 < c2.length; a3++) this[c2[a3].n] = /* @__PURE__ */ function(a4) {
                return function(...b4) {
                  if (console) {
                    let c3 = console[a4];
                    if ("function" != typeof c3 && (c3 = console.log), "function" == typeof c3) return c3.apply(console, b4);
                  }
                };
              }(c2[a3].c);
            }
          }
          b3.DiagConsoleLogger = d2;
        }, 912: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createLogLevelDiagLogger = void 0;
          let d2 = c2(957);
          b3.createLogLevelDiagLogger = function(a3, b4) {
            function c3(c4, d3) {
              let e2 = b4[c4];
              return "function" == typeof e2 && a3 >= d3 ? e2.bind(b4) : function() {
              };
            }
            return a3 < d2.DiagLogLevel.NONE ? a3 = d2.DiagLogLevel.NONE : a3 > d2.DiagLogLevel.ALL && (a3 = d2.DiagLogLevel.ALL), b4 = b4 || {}, { error: c3("error", d2.DiagLogLevel.ERROR), warn: c3("warn", d2.DiagLogLevel.WARN), info: c3("info", d2.DiagLogLevel.INFO), debug: c3("debug", d2.DiagLogLevel.DEBUG), verbose: c3("verbose", d2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagLogLevel = void 0, function(a3) {
            a3[a3.NONE = 0] = "NONE", a3[a3.ERROR = 30] = "ERROR", a3[a3.WARN = 50] = "WARN", a3[a3.INFO = 60] = "INFO", a3[a3.DEBUG = 70] = "DEBUG", a3[a3.VERBOSE = 80] = "VERBOSE", a3[a3.ALL = 9999] = "ALL";
          }(b3.DiagLogLevel || (b3.DiagLogLevel = {}));
        }, 172: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.unregisterGlobal = b3.getGlobal = b3.registerGlobal = void 0;
          let d2 = c2(200), e2 = c2(521), f2 = c2(130), g = e2.VERSION.split(".")[0], h = Symbol.for(`opentelemetry.js.api.${g}`), i = d2._globalThis;
          b3.registerGlobal = function(a3, b4, c3, d3 = false) {
            var f3;
            let g2 = i[h] = null != (f3 = i[h]) ? f3 : { version: e2.VERSION };
            if (!d3 && g2[a3]) {
              let b5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${a3}`);
              return c3.error(b5.stack || b5.message), false;
            }
            if (g2.version !== e2.VERSION) {
              let b5 = Error(`@opentelemetry/api: Registration of version v${g2.version} for ${a3} does not match previously registered API v${e2.VERSION}`);
              return c3.error(b5.stack || b5.message), false;
            }
            return g2[a3] = b4, c3.debug(`@opentelemetry/api: Registered a global for ${a3} v${e2.VERSION}.`), true;
          }, b3.getGlobal = function(a3) {
            var b4, c3;
            let d3 = null == (b4 = i[h]) ? void 0 : b4.version;
            if (d3 && (0, f2.isCompatible)(d3)) return null == (c3 = i[h]) ? void 0 : c3[a3];
          }, b3.unregisterGlobal = function(a3, b4) {
            b4.debug(`@opentelemetry/api: Unregistering a global for ${a3} v${e2.VERSION}.`);
            let c3 = i[h];
            c3 && delete c3[a3];
          };
        }, 130: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.isCompatible = b3._makeCompatibilityCheck = void 0;
          let d2 = c2(521), e2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function f2(a3) {
            let b4 = /* @__PURE__ */ new Set([a3]), c3 = /* @__PURE__ */ new Set(), d3 = a3.match(e2);
            if (!d3) return () => false;
            let f3 = { major: +d3[1], minor: +d3[2], patch: +d3[3], prerelease: d3[4] };
            if (null != f3.prerelease) return function(b5) {
              return b5 === a3;
            };
            function g(a4) {
              return c3.add(a4), false;
            }
            return function(a4) {
              if (b4.has(a4)) return true;
              if (c3.has(a4)) return false;
              let d4 = a4.match(e2);
              if (!d4) return g(a4);
              let h = { major: +d4[1], minor: +d4[2], patch: +d4[3], prerelease: d4[4] };
              if (null != h.prerelease || f3.major !== h.major) return g(a4);
              if (0 === f3.major) return f3.minor === h.minor && f3.patch <= h.patch ? (b4.add(a4), true) : g(a4);
              return f3.minor <= h.minor ? (b4.add(a4), true) : g(a4);
            };
          }
          b3._makeCompatibilityCheck = f2, b3.isCompatible = f2(d2.VERSION);
        }, 886: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.metrics = void 0, b3.metrics = c2(653).MetricsAPI.getInstance();
        }, 901: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ValueType = void 0, function(a3) {
            a3[a3.INT = 0] = "INT", a3[a3.DOUBLE = 1] = "DOUBLE";
          }(b3.ValueType || (b3.ValueType = {}));
        }, 102: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createNoopMeter = b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = b3.NOOP_OBSERVABLE_GAUGE_METRIC = b3.NOOP_OBSERVABLE_COUNTER_METRIC = b3.NOOP_UP_DOWN_COUNTER_METRIC = b3.NOOP_HISTOGRAM_METRIC = b3.NOOP_COUNTER_METRIC = b3.NOOP_METER = b3.NoopObservableUpDownCounterMetric = b3.NoopObservableGaugeMetric = b3.NoopObservableCounterMetric = b3.NoopObservableMetric = b3.NoopHistogramMetric = b3.NoopUpDownCounterMetric = b3.NoopCounterMetric = b3.NoopMetric = b3.NoopMeter = void 0;
          class c2 {
            constructor() {
            }
            createHistogram(a3, c3) {
              return b3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(a3, c3) {
              return b3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(a3, c3) {
              return b3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(a3, c3) {
              return b3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(a3, c3) {
              return b3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(a3, c3) {
              return b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(a3, b4) {
            }
            removeBatchObservableCallback(a3) {
            }
          }
          b3.NoopMeter = c2;
          class d2 {
          }
          b3.NoopMetric = d2;
          class e2 extends d2 {
            add(a3, b4) {
            }
          }
          b3.NoopCounterMetric = e2;
          class f2 extends d2 {
            add(a3, b4) {
            }
          }
          b3.NoopUpDownCounterMetric = f2;
          class g extends d2 {
            record(a3, b4) {
            }
          }
          b3.NoopHistogramMetric = g;
          class h {
            addCallback(a3) {
            }
            removeCallback(a3) {
            }
          }
          b3.NoopObservableMetric = h;
          class i extends h {
          }
          b3.NoopObservableCounterMetric = i;
          class j extends h {
          }
          b3.NoopObservableGaugeMetric = j;
          class k extends h {
          }
          b3.NoopObservableUpDownCounterMetric = k, b3.NOOP_METER = new c2(), b3.NOOP_COUNTER_METRIC = new e2(), b3.NOOP_HISTOGRAM_METRIC = new g(), b3.NOOP_UP_DOWN_COUNTER_METRIC = new f2(), b3.NOOP_OBSERVABLE_COUNTER_METRIC = new i(), b3.NOOP_OBSERVABLE_GAUGE_METRIC = new j(), b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new k(), b3.createNoopMeter = function() {
            return b3.NOOP_METER;
          };
        }, 660: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NOOP_METER_PROVIDER = b3.NoopMeterProvider = void 0;
          let d2 = c2(102);
          class e2 {
            getMeter(a3, b4, c3) {
              return d2.NOOP_METER;
            }
          }
          b3.NoopMeterProvider = e2, b3.NOOP_METER_PROVIDER = new e2();
        }, 200: function(a2, b3, c2) {
          var d2 = this && this.__createBinding || (Object.create ? function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), Object.defineProperty(a3, d3, { enumerable: true, get: function() {
              return b4[c3];
            } });
          } : function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), a3[d3] = b4[c3];
          }), e2 = this && this.__exportStar || function(a3, b4) {
            for (var c3 in a3) "default" === c3 || Object.prototype.hasOwnProperty.call(b4, c3) || d2(b4, a3, c3);
          };
          Object.defineProperty(b3, "__esModule", { value: true }), e2(c2(46), b3);
        }, 651: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3._globalThis = void 0, b3._globalThis = "object" == typeof globalThis ? globalThis : c.g;
        }, 46: function(a2, b3, c2) {
          var d2 = this && this.__createBinding || (Object.create ? function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), Object.defineProperty(a3, d3, { enumerable: true, get: function() {
              return b4[c3];
            } });
          } : function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), a3[d3] = b4[c3];
          }), e2 = this && this.__exportStar || function(a3, b4) {
            for (var c3 in a3) "default" === c3 || Object.prototype.hasOwnProperty.call(b4, c3) || d2(b4, a3, c3);
          };
          Object.defineProperty(b3, "__esModule", { value: true }), e2(c2(651), b3);
        }, 939: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.propagation = void 0, b3.propagation = c2(181).PropagationAPI.getInstance();
        }, 874: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTextMapPropagator = void 0;
          class c2 {
            inject(a3, b4) {
            }
            extract(a3, b4) {
              return a3;
            }
            fields() {
              return [];
            }
          }
          b3.NoopTextMapPropagator = c2;
        }, 194: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.defaultTextMapSetter = b3.defaultTextMapGetter = void 0, b3.defaultTextMapGetter = { get(a3, b4) {
            if (null != a3) return a3[b4];
          }, keys: (a3) => null == a3 ? [] : Object.keys(a3) }, b3.defaultTextMapSetter = { set(a3, b4, c2) {
            null != a3 && (a3[b4] = c2);
          } };
        }, 845: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.trace = void 0, b3.trace = c2(997).TraceAPI.getInstance();
        }, 403: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NonRecordingSpan = void 0;
          let d2 = c2(476);
          class e2 {
            constructor(a3 = d2.INVALID_SPAN_CONTEXT) {
              this._spanContext = a3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(a3, b4) {
              return this;
            }
            setAttributes(a3) {
              return this;
            }
            addEvent(a3, b4) {
              return this;
            }
            setStatus(a3) {
              return this;
            }
            updateName(a3) {
              return this;
            }
            end(a3) {
            }
            isRecording() {
              return false;
            }
            recordException(a3, b4) {
            }
          }
          b3.NonRecordingSpan = e2;
        }, 614: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTracer = void 0;
          let d2 = c2(491), e2 = c2(607), f2 = c2(403), g = c2(139), h = d2.ContextAPI.getInstance();
          class i {
            startSpan(a3, b4, c3 = h.active()) {
              var d3;
              if (null == b4 ? void 0 : b4.root) return new f2.NonRecordingSpan();
              let i2 = c3 && (0, e2.getSpanContext)(c3);
              return "object" == typeof (d3 = i2) && "string" == typeof d3.spanId && "string" == typeof d3.traceId && "number" == typeof d3.traceFlags && (0, g.isSpanContextValid)(i2) ? new f2.NonRecordingSpan(i2) : new f2.NonRecordingSpan();
            }
            startActiveSpan(a3, b4, c3, d3) {
              let f3, g2, i2;
              if (arguments.length < 2) return;
              2 == arguments.length ? i2 = b4 : 3 == arguments.length ? (f3 = b4, i2 = c3) : (f3 = b4, g2 = c3, i2 = d3);
              let j = null != g2 ? g2 : h.active(), k = this.startSpan(a3, f3, j), l = (0, e2.setSpan)(j, k);
              return h.with(l, i2, void 0, k);
            }
          }
          b3.NoopTracer = i;
        }, 124: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTracerProvider = void 0;
          let d2 = c2(614);
          class e2 {
            getTracer(a3, b4, c3) {
              return new d2.NoopTracer();
            }
          }
          b3.NoopTracerProvider = e2;
        }, 125: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ProxyTracer = void 0;
          let d2 = new (c2(614)).NoopTracer();
          class e2 {
            constructor(a3, b4, c3, d3) {
              this._provider = a3, this.name = b4, this.version = c3, this.options = d3;
            }
            startSpan(a3, b4, c3) {
              return this._getTracer().startSpan(a3, b4, c3);
            }
            startActiveSpan(a3, b4, c3, d3) {
              let e3 = this._getTracer();
              return Reflect.apply(e3.startActiveSpan, e3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let a3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return a3 ? (this._delegate = a3, this._delegate) : d2;
            }
          }
          b3.ProxyTracer = e2;
        }, 846: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ProxyTracerProvider = void 0;
          let d2 = c2(125), e2 = new (c2(124)).NoopTracerProvider();
          class f2 {
            getTracer(a3, b4, c3) {
              var e3;
              return null != (e3 = this.getDelegateTracer(a3, b4, c3)) ? e3 : new d2.ProxyTracer(this, a3, b4, c3);
            }
            getDelegate() {
              var a3;
              return null != (a3 = this._delegate) ? a3 : e2;
            }
            setDelegate(a3) {
              this._delegate = a3;
            }
            getDelegateTracer(a3, b4, c3) {
              var d3;
              return null == (d3 = this._delegate) ? void 0 : d3.getTracer(a3, b4, c3);
            }
          }
          b3.ProxyTracerProvider = f2;
        }, 996: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SamplingDecision = void 0, function(a3) {
            a3[a3.NOT_RECORD = 0] = "NOT_RECORD", a3[a3.RECORD = 1] = "RECORD", a3[a3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(b3.SamplingDecision || (b3.SamplingDecision = {}));
        }, 607: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.getSpanContext = b3.setSpanContext = b3.deleteSpan = b3.setSpan = b3.getActiveSpan = b3.getSpan = void 0;
          let d2 = c2(780), e2 = c2(403), f2 = c2(491), g = (0, d2.createContextKey)("OpenTelemetry Context Key SPAN");
          function h(a3) {
            return a3.getValue(g) || void 0;
          }
          function i(a3, b4) {
            return a3.setValue(g, b4);
          }
          b3.getSpan = h, b3.getActiveSpan = function() {
            return h(f2.ContextAPI.getInstance().active());
          }, b3.setSpan = i, b3.deleteSpan = function(a3) {
            return a3.deleteValue(g);
          }, b3.setSpanContext = function(a3, b4) {
            return i(a3, new e2.NonRecordingSpan(b4));
          }, b3.getSpanContext = function(a3) {
            var b4;
            return null == (b4 = h(a3)) ? void 0 : b4.spanContext();
          };
        }, 325: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceStateImpl = void 0;
          let d2 = c2(564);
          class e2 {
            constructor(a3) {
              this._internalState = /* @__PURE__ */ new Map(), a3 && this._parse(a3);
            }
            set(a3, b4) {
              let c3 = this._clone();
              return c3._internalState.has(a3) && c3._internalState.delete(a3), c3._internalState.set(a3, b4), c3;
            }
            unset(a3) {
              let b4 = this._clone();
              return b4._internalState.delete(a3), b4;
            }
            get(a3) {
              return this._internalState.get(a3);
            }
            serialize() {
              return this._keys().reduce((a3, b4) => (a3.push(b4 + "=" + this.get(b4)), a3), []).join(",");
            }
            _parse(a3) {
              !(a3.length > 512) && (this._internalState = a3.split(",").reverse().reduce((a4, b4) => {
                let c3 = b4.trim(), e3 = c3.indexOf("=");
                if (-1 !== e3) {
                  let f2 = c3.slice(0, e3), g = c3.slice(e3 + 1, b4.length);
                  (0, d2.validateKey)(f2) && (0, d2.validateValue)(g) && a4.set(f2, g);
                }
                return a4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let a3 = new e2();
              return a3._internalState = new Map(this._internalState), a3;
            }
          }
          b3.TraceStateImpl = e2;
        }, 564: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.validateValue = b3.validateKey = void 0;
          let c2 = "[_0-9a-z-*/]", d2 = `[a-z]${c2}{0,255}`, e2 = `[a-z0-9]${c2}{0,240}@[a-z]${c2}{0,13}`, f2 = RegExp(`^(?:${d2}|${e2})$`), g = /^[ -~]{0,255}[!-~]$/, h = /,|=/;
          b3.validateKey = function(a3) {
            return f2.test(a3);
          }, b3.validateValue = function(a3) {
            return g.test(a3) && !h.test(a3);
          };
        }, 98: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createTraceState = void 0;
          let d2 = c2(325);
          b3.createTraceState = function(a3) {
            return new d2.TraceStateImpl(a3);
          };
        }, 476: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.INVALID_SPAN_CONTEXT = b3.INVALID_TRACEID = b3.INVALID_SPANID = void 0;
          let d2 = c2(475);
          b3.INVALID_SPANID = "0000000000000000", b3.INVALID_TRACEID = "00000000000000000000000000000000", b3.INVALID_SPAN_CONTEXT = { traceId: b3.INVALID_TRACEID, spanId: b3.INVALID_SPANID, traceFlags: d2.TraceFlags.NONE };
        }, 357: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SpanKind = void 0, function(a3) {
            a3[a3.INTERNAL = 0] = "INTERNAL", a3[a3.SERVER = 1] = "SERVER", a3[a3.CLIENT = 2] = "CLIENT", a3[a3.PRODUCER = 3] = "PRODUCER", a3[a3.CONSUMER = 4] = "CONSUMER";
          }(b3.SpanKind || (b3.SpanKind = {}));
        }, 139: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.wrapSpanContext = b3.isSpanContextValid = b3.isValidSpanId = b3.isValidTraceId = void 0;
          let d2 = c2(476), e2 = c2(403), f2 = /^([0-9a-f]{32})$/i, g = /^[0-9a-f]{16}$/i;
          function h(a3) {
            return f2.test(a3) && a3 !== d2.INVALID_TRACEID;
          }
          function i(a3) {
            return g.test(a3) && a3 !== d2.INVALID_SPANID;
          }
          b3.isValidTraceId = h, b3.isValidSpanId = i, b3.isSpanContextValid = function(a3) {
            return h(a3.traceId) && i(a3.spanId);
          }, b3.wrapSpanContext = function(a3) {
            return new e2.NonRecordingSpan(a3);
          };
        }, 847: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SpanStatusCode = void 0, function(a3) {
            a3[a3.UNSET = 0] = "UNSET", a3[a3.OK = 1] = "OK", a3[a3.ERROR = 2] = "ERROR";
          }(b3.SpanStatusCode || (b3.SpanStatusCode = {}));
        }, 475: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceFlags = void 0, function(a3) {
            a3[a3.NONE = 0] = "NONE", a3[a3.SAMPLED = 1] = "SAMPLED";
          }(b3.TraceFlags || (b3.TraceFlags = {}));
        }, 521: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.VERSION = void 0, b3.VERSION = "1.6.0";
        } }, d = {};
        function e(a2) {
          var c2 = d[a2];
          if (void 0 !== c2) return c2.exports;
          var f2 = d[a2] = { exports: {} }, g = true;
          try {
            b2[a2].call(f2.exports, f2, f2.exports, e), g = false;
          } finally {
            g && delete d[a2];
          }
          return f2.exports;
        }
        e.ab = "//";
        var f = {};
        (() => {
          Object.defineProperty(f, "__esModule", { value: true }), f.trace = f.propagation = f.metrics = f.diag = f.context = f.INVALID_SPAN_CONTEXT = f.INVALID_TRACEID = f.INVALID_SPANID = f.isValidSpanId = f.isValidTraceId = f.isSpanContextValid = f.createTraceState = f.TraceFlags = f.SpanStatusCode = f.SpanKind = f.SamplingDecision = f.ProxyTracerProvider = f.ProxyTracer = f.defaultTextMapSetter = f.defaultTextMapGetter = f.ValueType = f.createNoopMeter = f.DiagLogLevel = f.DiagConsoleLogger = f.ROOT_CONTEXT = f.createContextKey = f.baggageEntryMetadataFromString = void 0;
          var a2 = e(369);
          Object.defineProperty(f, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return a2.baggageEntryMetadataFromString;
          } });
          var b3 = e(780);
          Object.defineProperty(f, "createContextKey", { enumerable: true, get: function() {
            return b3.createContextKey;
          } }), Object.defineProperty(f, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return b3.ROOT_CONTEXT;
          } });
          var c2 = e(972);
          Object.defineProperty(f, "DiagConsoleLogger", { enumerable: true, get: function() {
            return c2.DiagConsoleLogger;
          } });
          var d2 = e(957);
          Object.defineProperty(f, "DiagLogLevel", { enumerable: true, get: function() {
            return d2.DiagLogLevel;
          } });
          var g = e(102);
          Object.defineProperty(f, "createNoopMeter", { enumerable: true, get: function() {
            return g.createNoopMeter;
          } });
          var h = e(901);
          Object.defineProperty(f, "ValueType", { enumerable: true, get: function() {
            return h.ValueType;
          } });
          var i = e(194);
          Object.defineProperty(f, "defaultTextMapGetter", { enumerable: true, get: function() {
            return i.defaultTextMapGetter;
          } }), Object.defineProperty(f, "defaultTextMapSetter", { enumerable: true, get: function() {
            return i.defaultTextMapSetter;
          } });
          var j = e(125);
          Object.defineProperty(f, "ProxyTracer", { enumerable: true, get: function() {
            return j.ProxyTracer;
          } });
          var k = e(846);
          Object.defineProperty(f, "ProxyTracerProvider", { enumerable: true, get: function() {
            return k.ProxyTracerProvider;
          } });
          var l = e(996);
          Object.defineProperty(f, "SamplingDecision", { enumerable: true, get: function() {
            return l.SamplingDecision;
          } });
          var m = e(357);
          Object.defineProperty(f, "SpanKind", { enumerable: true, get: function() {
            return m.SpanKind;
          } });
          var n = e(847);
          Object.defineProperty(f, "SpanStatusCode", { enumerable: true, get: function() {
            return n.SpanStatusCode;
          } });
          var o = e(475);
          Object.defineProperty(f, "TraceFlags", { enumerable: true, get: function() {
            return o.TraceFlags;
          } });
          var p = e(98);
          Object.defineProperty(f, "createTraceState", { enumerable: true, get: function() {
            return p.createTraceState;
          } });
          var q = e(139);
          Object.defineProperty(f, "isSpanContextValid", { enumerable: true, get: function() {
            return q.isSpanContextValid;
          } }), Object.defineProperty(f, "isValidTraceId", { enumerable: true, get: function() {
            return q.isValidTraceId;
          } }), Object.defineProperty(f, "isValidSpanId", { enumerable: true, get: function() {
            return q.isValidSpanId;
          } });
          var r = e(476);
          Object.defineProperty(f, "INVALID_SPANID", { enumerable: true, get: function() {
            return r.INVALID_SPANID;
          } }), Object.defineProperty(f, "INVALID_TRACEID", { enumerable: true, get: function() {
            return r.INVALID_TRACEID;
          } }), Object.defineProperty(f, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return r.INVALID_SPAN_CONTEXT;
          } });
          let s = e(67);
          Object.defineProperty(f, "context", { enumerable: true, get: function() {
            return s.context;
          } });
          let t = e(506);
          Object.defineProperty(f, "diag", { enumerable: true, get: function() {
            return t.diag;
          } });
          let u = e(886);
          Object.defineProperty(f, "metrics", { enumerable: true, get: function() {
            return u.metrics;
          } });
          let v = e(939);
          Object.defineProperty(f, "propagation", { enumerable: true, get: function() {
            return v.propagation;
          } });
          let w = e(845);
          Object.defineProperty(f, "trace", { enumerable: true, get: function() {
            return w.trace;
          } }), f.default = { context: s.context, diag: t.diag, metrics: u.metrics, propagation: v.propagation, trace: w.trace };
        })(), a.exports = f;
      })();
    }, 918: (a, b, c) => {
      "use strict";
      c.d(b, { s: () => d });
      let d = (0, c(58).xl)();
    }, 944: (a, b, c) => {
      "use strict";
      c.d(b, { nJ: () => g, oJ: () => e, zB: () => f });
      var d = c(378);
      let e = "NEXT_REDIRECT";
      var f = function(a2) {
        return a2.push = "push", a2.replace = "replace", a2;
      }({});
      function g(a2) {
        if ("object" != typeof a2 || null === a2 || !("digest" in a2) || "string" != typeof a2.digest) return false;
        let b2 = a2.digest.split(";"), [c2, f2] = b2, g2 = b2.slice(2, -2).join(";"), h = Number(b2.at(-2));
        return c2 === e && ("replace" === f2 || "push" === f2) && "string" == typeof g2 && !isNaN(h) && h in d.Q;
      }
    }, 979: (a, b, c) => {
      "use strict";
      c.d(b, { f: () => d });
      class d extends Error {
        constructor(...a2) {
          super(...a2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    } }, (a) => {
      var b = a(a.s = 794);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_middleware = b;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(path3);
  } catch {
  }
  const correspondingRoute = routes.find((route) => route.regex.some((r) => {
    const regex = new RegExp(r);
    return regex.test(path3) || decodedPath !== void 0 && regex.test(decodedPath);
  }));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|signin|_next\\/static|_next\\/image|favicon.ico|manifest.json|icons|sw.js).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/cacheHeaders.js
var CACHE_CONTROL_HEADER = "cache-control";
var OPEN_NEXT_CACHE_HEADER = "x-opennext-cache";
var CACHE_TAGS_HEADER = "x-next-cache-tags";
var ISR_HEADER = "x-isr";
var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
var NO_STORE_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";
function fixCacheControlForError(headers, statusCode) {
  if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
    return;
  }
  if (statusCode === 404 || statusCode === 500) {
    headers[CACHE_CONTROL_HEADER] = NO_STORE_CACHE_CONTROL;
  }
}

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.mjs", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "maximumResponseBody": 5e7, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": true, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "D:\\shift-log", "experimental": { "useSkewCookie": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "clientParamParsing": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 23, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "routerBFCache": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "cacheComponents": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "devtoolSegmentExplorer": true, "browserDebugInfoInTerminal": false, "optimizeRouterScrolling": false, "middlewareClientMaxBodySize": 10485760, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.mjs", "turbopack": { "root": "D:\\shift-log" } };
var BuildId = "lxE31Yw-SpGGzB441hVM-";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/signin", "regex": "^/signin(?:/)?$", "routeKeys": {}, "namedRegex": "^/signin(?:/)?$" }], "dynamic": [{ "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "1e66216143ea17ddfa22de769b99e86a", "previewModeSigningKey": "1c418df4455959287ea7e79d9880053f1ae2e45b6c455e17d7ca8eace9d5cdd9", "previewModeEncryptionKey": "82b95db208f1d5152f5929b907b909885646730f4734b841bf3c9f3efe7a1855" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/middleware.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|signin|_next\\/static|_next\\/image|favicon.ico|manifest.json|icons|sw.js).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/((?!api|signin|_next/static|_next/image|favicon.ico|manifest.json|icons|sw.js).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "lxE31Yw-SpGGzB441hVM-", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "/hkimy9RRdZXnez4b20CTha+4HzxAa+7H4AZteJcwO4=", "__NEXT_PREVIEW_MODE_ID": "1e66216143ea17ddfa22de769b99e86a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "1c418df4455959287ea7e79d9880053f1ae2e45b6c455e17d7ca8eace9d5cdd9", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "82b95db208f1d5152f5929b907b909885646730f4734b841bf3c9f3efe7a1855" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/api/state/route": "/api/state", "/api/tick/route": "/api/tick", "/api/complete/route": "/api/complete", "/page": "/", "/signin/page": "/signin" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
import { Transform } from "node:stream";
init_util();

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: url.startsWith("/") ? `/${match3?.[1] ?? ""}` : "",
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s?]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.[CACHE_TAGS_HEADER]?.split(",") ?? [];
    delete value.meta?.headers?.[CACHE_TAGS_HEADER];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      [CACHE_CONTROL_HEADER]: NO_STORE_CACHE_CONTROL,
      [OPEN_NEXT_CACHE_HEADER]: "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      [CACHE_CONTROL_HEADER]: `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      [OPEN_NEXT_CACHE_HEADER]: isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    [CACHE_CONTROL_HEADER]: `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    [OPEN_NEXT_CACHE_HEADER]: "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
  const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
  if (isSegmentResponse) {
    return {
      body: cachedValue.segmentData[segmentHeader],
      additionalHeaders: {
        [NEXT_PRERENDER_HEADER]: "1",
        [NEXT_POSTPONED_HEADER]: "2"
      }
    };
  }
  if (cachedValue.rsc === void 0) {
    return void 0;
  }
  return { body: cachedValue.rsc, additionalHeaders: {} };
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body;
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const appRouterResult = getBodyForAppRouter(event, cachedValue);
      body = appRouterResult?.body;
      additionalHeaders = appRouterResult?.additionalHeaders ?? {};
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  if (body === void 0) {
    debug("Missing body in the cache entry, falling back to the server");
    return void 0;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  const statusCode = computeStatusCode(event.rewriteStatusCode, cachedValue.meta?.status);
  const headers = {
    ...cacheControl,
    "content-type": type,
    ...cachedValue.meta?.headers,
    vary: VARY_HEADER,
    ...additionalHeaders
  };
  fixCacheControlForError(headers, statusCode);
  return {
    type: "core",
    statusCode,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers
  };
}
function computeStatusCode(rewriteStatusCode, cachedStatusCode) {
  if (cachedStatusCode !== void 0 && cachedStatusCode !== 200) {
    return cachedStatusCode;
  }
  return rewriteStatusCode ?? cachedStatusCode ?? 200;
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => escapePathDelimiters(decodeURIComponent(segment), true)).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers[PRERENDER_REVALIDATE_HEADER]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  try {
    localizedPath = decodePathParams(localizedPath) || "/";
  } catch {
    return event;
  }
  const cacheKey = localizedPath === "/" ? "/index" : localizedPath;
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath) || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(cacheKey);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(cacheKey, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(cacheKey, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page": {
          const result = await generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
          return result ?? event;
        }
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          const statusCode = computeStatusCode(event.rewriteStatusCode, cachedData.value.meta?.status);
          const headers = {
            ...cacheControl,
            ...cachedData.value.meta?.headers,
            vary: VARY_HEADER
          };
          fixCacheControlForError(headers, statusCode);
          return {
            type: "core",
            statusCode,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers,
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      headers: {
        ...internalEvent.headers,
        "x-nextjs-data": "1"
      },
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers[ISR_HEADER] && headers[PRERENDER_REVALIDATE_HEADER] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch {
  }
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath) || decodedPath !== void 0 && r.test(decodedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie")
        return;
      if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const setCookies = responseHeaders.getSetCookie();
  if (setCookies.length > 0) {
    resHeaders["set-cookie"] = setCookies;
  }
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": NO_STORE_CACHE_CONTROL
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers[ISR_HEADER] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};

var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x2 + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
import { MessageChannel } from "node:worker_threads";
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    init_install_fetch();
    globalThis.DOMException || (() => {
      const port = new MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import Stream, { PassThrough, pipeline } from "node:stream";
import { types, deprecate } from "node:util";
import { format } from "node:url";
import { isIP } from "net";
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof Stream)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https : http).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pipeline(response_, new PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline(body, zlib.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline(response_, new PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? pipeline(body, zlib.createInflate(), reject) : pipeline(body, zlib.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = pipeline(body, zlib.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installFetch() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _Blob, Blob2, Blob$1, _File, File, t, i, h, r, m, f2, e, x, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop3() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop3;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry4 = this._queue.shift();
              this._queueTotalSize -= entry4.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry4.buffer, entry4.byteOffset, entry4.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context} has member 'readable' that`);
          const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable2, "writable", "ReadableWritablePair");
          assertWritableStream(writable2, `${context} has member 'writable' that`);
          return { readable: readable2, writable: writable2 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop3);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable2 = stream._writable;
              const state = writable2._state;
              if (state === "erroring") {
                throw writable2._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = __require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, __require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob3 } = __require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    Blob$1 = Blob2;
    _File = class File2 extends Blob$1 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    };
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof Stream)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = Stream.Readable.from(body);
        } else if (isBlob(body)) {
          stream = Stream.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof Stream) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = deprecate(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof Stream && typeof body.getBoundary !== "function") {
        p1 = new PassThrough({ highWaterMark });
        p2 = new PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = deprecate((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof Stream) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return format(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-2835083a.js
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css4) => css4.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
var current_component, escaped, missing_component, on_destroy;
var init_index_2835083a = __esm({
  ".svelte-kit/output/server/chunks/index-2835083a.js"() {
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-1c45ba0b.js
var hooks_1c45ba0b_exports = {};
var init_hooks_1c45ba0b = __esm({
  ".svelte-kit/output/server/chunks/hooks-1c45ba0b.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var Navbar, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_2835083a();
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="${"border-b border-neutral-600"}"><div class="${"max-w-screen-lg mx-auto py-2"}"><h1 class="${"text-3xl text-center font-light"}">Comment-Power</h1></div></div>`;
    });
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-30b0d6e7.js";
    js = ["pages/__layout.svelte-30b0d6e7.js", "chunks/index-ed1dd974.js"];
    css = ["assets/pages/__layout.svelte-072ccc0d.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_2835083a();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css2,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-706df929.js";
    js2 = ["error.svelte-706df929.js", "chunks/index-ed1dd974.js"];
    css2 = [];
  }
});

// node_modules/chart.js/dist/chart.js
var require_chart = __commonJS({
  "node_modules/chart.js/dist/chart.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Chart = factory());
    })(exports, function() {
      "use strict";
      function fontString(pixelSize, fontStyle, fontFamily) {
        return fontStyle + " " + pixelSize + "px " + fontFamily;
      }
      const requestAnimFrame = function() {
        if (typeof window === "undefined") {
          return function(callback2) {
            return callback2();
          };
        }
        return window.requestAnimationFrame;
      }();
      function throttled(fn, thisArg, updateFn) {
        const updateArgs = updateFn || ((args2) => Array.prototype.slice.call(args2));
        let ticking = false;
        let args = [];
        return function(...rest) {
          args = updateArgs(rest);
          if (!ticking) {
            ticking = true;
            requestAnimFrame.call(window, () => {
              ticking = false;
              fn.apply(thisArg, args);
            });
          }
        };
      }
      function debounce(fn, delay) {
        let timeout;
        return function(...args) {
          if (delay) {
            clearTimeout(timeout);
            timeout = setTimeout(fn, delay, args);
          } else {
            fn.apply(this, args);
          }
          return delay;
        };
      }
      const _toLeftRightCenter = (align) => align === "start" ? "left" : align === "end" ? "right" : "center";
      const _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
      const _textX = (align, left, right, rtl) => {
        const check = rtl ? "left" : "right";
        return align === check ? right : align === "center" ? (left + right) / 2 : left;
      };
      class Animator {
        constructor() {
          this._request = null;
          this._charts = /* @__PURE__ */ new Map();
          this._running = false;
          this._lastDate = void 0;
        }
        _notify(chart, anims, date, type) {
          const callbacks = anims.listeners[type];
          const numSteps = anims.duration;
          callbacks.forEach((fn) => fn({
            chart,
            initial: anims.initial,
            numSteps,
            currentStep: Math.min(date - anims.start, numSteps)
          }));
        }
        _refresh() {
          if (this._request) {
            return;
          }
          this._running = true;
          this._request = requestAnimFrame.call(window, () => {
            this._update();
            this._request = null;
            if (this._running) {
              this._refresh();
            }
          });
        }
        _update(date = Date.now()) {
          let remaining = 0;
          this._charts.forEach((anims, chart) => {
            if (!anims.running || !anims.items.length) {
              return;
            }
            const items = anims.items;
            let i2 = items.length - 1;
            let draw2 = false;
            let item;
            for (; i2 >= 0; --i2) {
              item = items[i2];
              if (item._active) {
                if (item._total > anims.duration) {
                  anims.duration = item._total;
                }
                item.tick(date);
                draw2 = true;
              } else {
                items[i2] = items[items.length - 1];
                items.pop();
              }
            }
            if (draw2) {
              chart.draw();
              this._notify(chart, anims, date, "progress");
            }
            if (!items.length) {
              anims.running = false;
              this._notify(chart, anims, date, "complete");
              anims.initial = false;
            }
            remaining += items.length;
          });
          this._lastDate = date;
          if (remaining === 0) {
            this._running = false;
          }
        }
        _getAnims(chart) {
          const charts = this._charts;
          let anims = charts.get(chart);
          if (!anims) {
            anims = {
              running: false,
              initial: true,
              items: [],
              listeners: {
                complete: [],
                progress: []
              }
            };
            charts.set(chart, anims);
          }
          return anims;
        }
        listen(chart, event, cb) {
          this._getAnims(chart).listeners[event].push(cb);
        }
        add(chart, items) {
          if (!items || !items.length) {
            return;
          }
          this._getAnims(chart).items.push(...items);
        }
        has(chart) {
          return this._getAnims(chart).items.length > 0;
        }
        start(chart) {
          const anims = this._charts.get(chart);
          if (!anims) {
            return;
          }
          anims.running = true;
          anims.start = Date.now();
          anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
          this._refresh();
        }
        running(chart) {
          if (!this._running) {
            return false;
          }
          const anims = this._charts.get(chart);
          if (!anims || !anims.running || !anims.items.length) {
            return false;
          }
          return true;
        }
        stop(chart) {
          const anims = this._charts.get(chart);
          if (!anims || !anims.items.length) {
            return;
          }
          const items = anims.items;
          let i2 = items.length - 1;
          for (; i2 >= 0; --i2) {
            items[i2].cancel();
          }
          anims.items = [];
          this._notify(chart, anims, Date.now(), "complete");
        }
        remove(chart) {
          return this._charts.delete(chart);
        }
      }
      var animator = new Animator();
      const map$1 = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 };
      const hex = "0123456789ABCDEF";
      const h1 = (b) => hex[b & 15];
      const h2 = (b) => hex[(b & 240) >> 4] + hex[b & 15];
      const eq = (b) => (b & 240) >> 4 === (b & 15);
      function isShort(v) {
        return eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
      }
      function hexParse(str) {
        var len = str.length;
        var ret;
        if (str[0] === "#") {
          if (len === 4 || len === 5) {
            ret = {
              r: 255 & map$1[str[1]] * 17,
              g: 255 & map$1[str[2]] * 17,
              b: 255 & map$1[str[3]] * 17,
              a: len === 5 ? map$1[str[4]] * 17 : 255
            };
          } else if (len === 7 || len === 9) {
            ret = {
              r: map$1[str[1]] << 4 | map$1[str[2]],
              g: map$1[str[3]] << 4 | map$1[str[4]],
              b: map$1[str[5]] << 4 | map$1[str[6]],
              a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
            };
          }
        }
        return ret;
      }
      function hexString(v) {
        var f3 = isShort(v) ? h1 : h2;
        return v ? "#" + f3(v.r) + f3(v.g) + f3(v.b) + (v.a < 255 ? f3(v.a) : "") : v;
      }
      function round(v) {
        return v + 0.5 | 0;
      }
      const lim = (v, l, h3) => Math.max(Math.min(v, h3), l);
      function p2b(v) {
        return lim(round(v * 2.55), 0, 255);
      }
      function n2b(v) {
        return lim(round(v * 255), 0, 255);
      }
      function b2n(v) {
        return lim(round(v / 2.55) / 100, 0, 1);
      }
      function n2p(v) {
        return lim(round(v * 100), 0, 100);
      }
      const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
      function rgbParse(str) {
        const m2 = RGB_RE.exec(str);
        let a = 255;
        let r2, g, b;
        if (!m2) {
          return;
        }
        if (m2[7] !== r2) {
          const v = +m2[7];
          a = 255 & (m2[8] ? p2b(v) : v * 255);
        }
        r2 = +m2[1];
        g = +m2[3];
        b = +m2[5];
        r2 = 255 & (m2[2] ? p2b(r2) : r2);
        g = 255 & (m2[4] ? p2b(g) : g);
        b = 255 & (m2[6] ? p2b(b) : b);
        return {
          r: r2,
          g,
          b,
          a
        };
      }
      function rgbString(v) {
        return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
      }
      const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
      function hsl2rgbn(h3, s3, l) {
        const a = s3 * Math.min(l, 1 - l);
        const f3 = (n, k = (n + h3 / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return [f3(0), f3(8), f3(4)];
      }
      function hsv2rgbn(h3, s3, v) {
        const f3 = (n, k = (n + h3 / 60) % 6) => v - v * s3 * Math.max(Math.min(k, 4 - k, 1), 0);
        return [f3(5), f3(3), f3(1)];
      }
      function hwb2rgbn(h3, w, b) {
        const rgb = hsl2rgbn(h3, 1, 0.5);
        let i2;
        if (w + b > 1) {
          i2 = 1 / (w + b);
          w *= i2;
          b *= i2;
        }
        for (i2 = 0; i2 < 3; i2++) {
          rgb[i2] *= 1 - w - b;
          rgb[i2] += w;
        }
        return rgb;
      }
      function rgb2hsl(v) {
        const range = 255;
        const r2 = v.r / range;
        const g = v.g / range;
        const b = v.b / range;
        const max = Math.max(r2, g, b);
        const min = Math.min(r2, g, b);
        const l = (max + min) / 2;
        let h3, s3, d;
        if (max !== min) {
          d = max - min;
          s3 = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          h3 = max === r2 ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r2) / d + 2 : (r2 - g) / d + 4;
          h3 = h3 * 60 + 0.5;
        }
        return [h3 | 0, s3 || 0, l];
      }
      function calln(f3, a, b, c) {
        return (Array.isArray(a) ? f3(a[0], a[1], a[2]) : f3(a, b, c)).map(n2b);
      }
      function hsl2rgb(h3, s3, l) {
        return calln(hsl2rgbn, h3, s3, l);
      }
      function hwb2rgb(h3, w, b) {
        return calln(hwb2rgbn, h3, w, b);
      }
      function hsv2rgb(h3, s3, v) {
        return calln(hsv2rgbn, h3, s3, v);
      }
      function hue(h3) {
        return (h3 % 360 + 360) % 360;
      }
      function hueParse(str) {
        const m2 = HUE_RE.exec(str);
        let a = 255;
        let v;
        if (!m2) {
          return;
        }
        if (m2[5] !== v) {
          a = m2[6] ? p2b(+m2[5]) : n2b(+m2[5]);
        }
        const h3 = hue(+m2[2]);
        const p1 = +m2[3] / 100;
        const p2 = +m2[4] / 100;
        if (m2[1] === "hwb") {
          v = hwb2rgb(h3, p1, p2);
        } else if (m2[1] === "hsv") {
          v = hsv2rgb(h3, p1, p2);
        } else {
          v = hsl2rgb(h3, p1, p2);
        }
        return {
          r: v[0],
          g: v[1],
          b: v[2],
          a
        };
      }
      function rotate(v, deg) {
        var h3 = rgb2hsl(v);
        h3[0] = hue(h3[0] + deg);
        h3 = hsl2rgb(h3);
        v.r = h3[0];
        v.g = h3[1];
        v.b = h3[2];
      }
      function hslString(v) {
        if (!v) {
          return;
        }
        const a = rgb2hsl(v);
        const h3 = a[0];
        const s3 = n2p(a[1]);
        const l = n2p(a[2]);
        return v.a < 255 ? `hsla(${h3}, ${s3}%, ${l}%, ${b2n(v.a)})` : `hsl(${h3}, ${s3}%, ${l}%)`;
      }
      const map$1$1 = {
        x: "dark",
        Z: "light",
        Y: "re",
        X: "blu",
        W: "gr",
        V: "medium",
        U: "slate",
        A: "ee",
        T: "ol",
        S: "or",
        B: "ra",
        C: "lateg",
        D: "ights",
        R: "in",
        Q: "turquois",
        E: "hi",
        P: "ro",
        O: "al",
        N: "le",
        M: "de",
        L: "yello",
        F: "en",
        K: "ch",
        G: "arks",
        H: "ea",
        I: "ightg",
        J: "wh"
      };
      const names = {
        OiceXe: "f0f8ff",
        antiquewEte: "faebd7",
        aqua: "ffff",
        aquamarRe: "7fffd4",
        azuY: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "0",
        blanKedOmond: "ffebcd",
        Xe: "ff",
        XeviTet: "8a2be2",
        bPwn: "a52a2a",
        burlywood: "deb887",
        caMtXe: "5f9ea0",
        KartYuse: "7fff00",
        KocTate: "d2691e",
        cSO: "ff7f50",
        cSnflowerXe: "6495ed",
        cSnsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "ffff",
        xXe: "8b",
        xcyan: "8b8b",
        xgTMnPd: "b8860b",
        xWay: "a9a9a9",
        xgYF: "6400",
        xgYy: "a9a9a9",
        xkhaki: "bdb76b",
        xmagFta: "8b008b",
        xTivegYF: "556b2f",
        xSange: "ff8c00",
        xScEd: "9932cc",
        xYd: "8b0000",
        xsOmon: "e9967a",
        xsHgYF: "8fbc8f",
        xUXe: "483d8b",
        xUWay: "2f4f4f",
        xUgYy: "2f4f4f",
        xQe: "ced1",
        xviTet: "9400d3",
        dAppRk: "ff1493",
        dApskyXe: "bfff",
        dimWay: "696969",
        dimgYy: "696969",
        dodgerXe: "1e90ff",
        fiYbrick: "b22222",
        flSOwEte: "fffaf0",
        foYstWAn: "228b22",
        fuKsia: "ff00ff",
        gaRsbSo: "dcdcdc",
        ghostwEte: "f8f8ff",
        gTd: "ffd700",
        gTMnPd: "daa520",
        Way: "808080",
        gYF: "8000",
        gYFLw: "adff2f",
        gYy: "808080",
        honeyMw: "f0fff0",
        hotpRk: "ff69b4",
        RdianYd: "cd5c5c",
        Rdigo: "4b0082",
        ivSy: "fffff0",
        khaki: "f0e68c",
        lavFMr: "e6e6fa",
        lavFMrXsh: "fff0f5",
        lawngYF: "7cfc00",
        NmoncEffon: "fffacd",
        ZXe: "add8e6",
        ZcSO: "f08080",
        Zcyan: "e0ffff",
        ZgTMnPdLw: "fafad2",
        ZWay: "d3d3d3",
        ZgYF: "90ee90",
        ZgYy: "d3d3d3",
        ZpRk: "ffb6c1",
        ZsOmon: "ffa07a",
        ZsHgYF: "20b2aa",
        ZskyXe: "87cefa",
        ZUWay: "778899",
        ZUgYy: "778899",
        ZstAlXe: "b0c4de",
        ZLw: "ffffe0",
        lime: "ff00",
        limegYF: "32cd32",
        lRF: "faf0e6",
        magFta: "ff00ff",
        maPon: "800000",
        VaquamarRe: "66cdaa",
        VXe: "cd",
        VScEd: "ba55d3",
        VpurpN: "9370db",
        VsHgYF: "3cb371",
        VUXe: "7b68ee",
        VsprRggYF: "fa9a",
        VQe: "48d1cc",
        VviTetYd: "c71585",
        midnightXe: "191970",
        mRtcYam: "f5fffa",
        mistyPse: "ffe4e1",
        moccasR: "ffe4b5",
        navajowEte: "ffdead",
        navy: "80",
        Tdlace: "fdf5e6",
        Tive: "808000",
        TivedBb: "6b8e23",
        Sange: "ffa500",
        SangeYd: "ff4500",
        ScEd: "da70d6",
        pOegTMnPd: "eee8aa",
        pOegYF: "98fb98",
        pOeQe: "afeeee",
        pOeviTetYd: "db7093",
        papayawEp: "ffefd5",
        pHKpuff: "ffdab9",
        peru: "cd853f",
        pRk: "ffc0cb",
        plum: "dda0dd",
        powMrXe: "b0e0e6",
        purpN: "800080",
        YbeccapurpN: "663399",
        Yd: "ff0000",
        Psybrown: "bc8f8f",
        PyOXe: "4169e1",
        saddNbPwn: "8b4513",
        sOmon: "fa8072",
        sandybPwn: "f4a460",
        sHgYF: "2e8b57",
        sHshell: "fff5ee",
        siFna: "a0522d",
        silver: "c0c0c0",
        skyXe: "87ceeb",
        UXe: "6a5acd",
        UWay: "708090",
        UgYy: "708090",
        snow: "fffafa",
        sprRggYF: "ff7f",
        stAlXe: "4682b4",
        tan: "d2b48c",
        teO: "8080",
        tEstN: "d8bfd8",
        tomato: "ff6347",
        Qe: "40e0d0",
        viTet: "ee82ee",
        JHt: "f5deb3",
        wEte: "ffffff",
        wEtesmoke: "f5f5f5",
        Lw: "ffff00",
        LwgYF: "9acd32"
      };
      function unpack() {
        const unpacked = {};
        const keys = Object.keys(names);
        const tkeys = Object.keys(map$1$1);
        let i2, j, k, ok, nk;
        for (i2 = 0; i2 < keys.length; i2++) {
          ok = nk = keys[i2];
          for (j = 0; j < tkeys.length; j++) {
            k = tkeys[j];
            nk = nk.replace(k, map$1$1[k]);
          }
          k = parseInt(names[ok], 16);
          unpacked[nk] = [k >> 16 & 255, k >> 8 & 255, k & 255];
        }
        return unpacked;
      }
      let names$1;
      function nameParse(str) {
        if (!names$1) {
          names$1 = unpack();
          names$1.transparent = [0, 0, 0, 0];
        }
        const a = names$1[str.toLowerCase()];
        return a && {
          r: a[0],
          g: a[1],
          b: a[2],
          a: a.length === 4 ? a[3] : 255
        };
      }
      function modHSL(v, i2, ratio) {
        if (v) {
          let tmp = rgb2hsl(v);
          tmp[i2] = Math.max(0, Math.min(tmp[i2] + tmp[i2] * ratio, i2 === 0 ? 360 : 1));
          tmp = hsl2rgb(tmp);
          v.r = tmp[0];
          v.g = tmp[1];
          v.b = tmp[2];
        }
      }
      function clone$1(v, proto) {
        return v ? Object.assign(proto || {}, v) : v;
      }
      function fromObject(input) {
        var v = { r: 0, g: 0, b: 0, a: 255 };
        if (Array.isArray(input)) {
          if (input.length >= 3) {
            v = { r: input[0], g: input[1], b: input[2], a: 255 };
            if (input.length > 3) {
              v.a = n2b(input[3]);
            }
          }
        } else {
          v = clone$1(input, { r: 0, g: 0, b: 0, a: 1 });
          v.a = n2b(v.a);
        }
        return v;
      }
      function functionParse(str) {
        if (str.charAt(0) === "r") {
          return rgbParse(str);
        }
        return hueParse(str);
      }
      class Color {
        constructor(input) {
          if (input instanceof Color) {
            return input;
          }
          const type = typeof input;
          let v;
          if (type === "object") {
            v = fromObject(input);
          } else if (type === "string") {
            v = hexParse(input) || nameParse(input) || functionParse(input);
          }
          this._rgb = v;
          this._valid = !!v;
        }
        get valid() {
          return this._valid;
        }
        get rgb() {
          var v = clone$1(this._rgb);
          if (v) {
            v.a = b2n(v.a);
          }
          return v;
        }
        set rgb(obj) {
          this._rgb = fromObject(obj);
        }
        rgbString() {
          return this._valid ? rgbString(this._rgb) : this._rgb;
        }
        hexString() {
          return this._valid ? hexString(this._rgb) : this._rgb;
        }
        hslString() {
          return this._valid ? hslString(this._rgb) : this._rgb;
        }
        mix(color2, weight) {
          const me = this;
          if (color2) {
            const c1 = me.rgb;
            const c2 = color2.rgb;
            let w2;
            const p = weight === w2 ? 0.5 : weight;
            const w = 2 * p - 1;
            const a = c1.a - c2.a;
            const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
            w2 = 1 - w1;
            c1.r = 255 & w1 * c1.r + w2 * c2.r + 0.5;
            c1.g = 255 & w1 * c1.g + w2 * c2.g + 0.5;
            c1.b = 255 & w1 * c1.b + w2 * c2.b + 0.5;
            c1.a = p * c1.a + (1 - p) * c2.a;
            me.rgb = c1;
          }
          return me;
        }
        clone() {
          return new Color(this.rgb);
        }
        alpha(a) {
          this._rgb.a = n2b(a);
          return this;
        }
        clearer(ratio) {
          const rgb = this._rgb;
          rgb.a *= 1 - ratio;
          return this;
        }
        greyscale() {
          const rgb = this._rgb;
          const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
          rgb.r = rgb.g = rgb.b = val;
          return this;
        }
        opaquer(ratio) {
          const rgb = this._rgb;
          rgb.a *= 1 + ratio;
          return this;
        }
        negate() {
          const v = this._rgb;
          v.r = 255 - v.r;
          v.g = 255 - v.g;
          v.b = 255 - v.b;
          return this;
        }
        lighten(ratio) {
          modHSL(this._rgb, 2, ratio);
          return this;
        }
        darken(ratio) {
          modHSL(this._rgb, 2, -ratio);
          return this;
        }
        saturate(ratio) {
          modHSL(this._rgb, 1, ratio);
          return this;
        }
        desaturate(ratio) {
          modHSL(this._rgb, 1, -ratio);
          return this;
        }
        rotate(deg) {
          rotate(this._rgb, deg);
          return this;
        }
      }
      function index_esm(input) {
        return new Color(input);
      }
      const isPatternOrGradient = (value) => value instanceof CanvasGradient || value instanceof CanvasPattern;
      function color(value) {
        return isPatternOrGradient(value) ? value : index_esm(value);
      }
      function getHoverColor(value) {
        return isPatternOrGradient(value) ? value : index_esm(value).saturate(0.5).darken(0.1).hexString();
      }
      function noop3() {
      }
      const uid = function() {
        let id = 0;
        return function() {
          return id++;
        };
      }();
      function isNullOrUndef(value) {
        return value === null || typeof value === "undefined";
      }
      function isArray(value) {
        if (Array.isArray && Array.isArray(value)) {
          return true;
        }
        const type = Object.prototype.toString.call(value);
        if (type.substr(0, 7) === "[object" && type.substr(-6) === "Array]") {
          return true;
        }
        return false;
      }
      function isObject(value) {
        return value !== null && Object.prototype.toString.call(value) === "[object Object]";
      }
      const isNumberFinite = (value) => (typeof value === "number" || value instanceof Number) && isFinite(+value);
      function finiteOrDefault(value, defaultValue) {
        return isNumberFinite(value) ? value : defaultValue;
      }
      function valueOrDefault(value, defaultValue) {
        return typeof value === "undefined" ? defaultValue : value;
      }
      const toPercentage = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 : value / dimension;
      const toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
      function callback(fn, args, thisArg) {
        if (fn && typeof fn.call === "function") {
          return fn.apply(thisArg, args);
        }
      }
      function each(loopable, fn, thisArg, reverse) {
        let i2, len, keys;
        if (isArray(loopable)) {
          len = loopable.length;
          if (reverse) {
            for (i2 = len - 1; i2 >= 0; i2--) {
              fn.call(thisArg, loopable[i2], i2);
            }
          } else {
            for (i2 = 0; i2 < len; i2++) {
              fn.call(thisArg, loopable[i2], i2);
            }
          }
        } else if (isObject(loopable)) {
          keys = Object.keys(loopable);
          len = keys.length;
          for (i2 = 0; i2 < len; i2++) {
            fn.call(thisArg, loopable[keys[i2]], keys[i2]);
          }
        }
      }
      function _elementsEqual(a0, a1) {
        let i2, ilen, v0, v1;
        if (!a0 || !a1 || a0.length !== a1.length) {
          return false;
        }
        for (i2 = 0, ilen = a0.length; i2 < ilen; ++i2) {
          v0 = a0[i2];
          v1 = a1[i2];
          if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
            return false;
          }
        }
        return true;
      }
      function clone2(source) {
        if (isArray(source)) {
          return source.map(clone2);
        }
        if (isObject(source)) {
          const target = /* @__PURE__ */ Object.create(null);
          const keys = Object.keys(source);
          const klen = keys.length;
          let k = 0;
          for (; k < klen; ++k) {
            target[keys[k]] = clone2(source[keys[k]]);
          }
          return target;
        }
        return source;
      }
      function isValidKey(key2) {
        return ["__proto__", "prototype", "constructor"].indexOf(key2) === -1;
      }
      function _merger(key2, target, source, options) {
        if (!isValidKey(key2)) {
          return;
        }
        const tval = target[key2];
        const sval = source[key2];
        if (isObject(tval) && isObject(sval)) {
          merge(tval, sval, options);
        } else {
          target[key2] = clone2(sval);
        }
      }
      function merge(target, source, options) {
        const sources = isArray(source) ? source : [source];
        const ilen = sources.length;
        if (!isObject(target)) {
          return target;
        }
        options = options || {};
        const merger = options.merger || _merger;
        for (let i2 = 0; i2 < ilen; ++i2) {
          source = sources[i2];
          if (!isObject(source)) {
            continue;
          }
          const keys = Object.keys(source);
          for (let k = 0, klen = keys.length; k < klen; ++k) {
            merger(keys[k], target, source, options);
          }
        }
        return target;
      }
      function mergeIf(target, source) {
        return merge(target, source, { merger: _mergerIf });
      }
      function _mergerIf(key2, target, source) {
        if (!isValidKey(key2)) {
          return;
        }
        const tval = target[key2];
        const sval = source[key2];
        if (isObject(tval) && isObject(sval)) {
          mergeIf(tval, sval);
        } else if (!Object.prototype.hasOwnProperty.call(target, key2)) {
          target[key2] = clone2(sval);
        }
      }
      function _deprecated(scope, value, previous, current) {
        if (value !== void 0) {
          console.warn(scope + ': "' + previous + '" is deprecated. Please use "' + current + '" instead');
        }
      }
      const emptyString = "";
      const dot = ".";
      function indexOfDotOrLength(key2, start) {
        const idx = key2.indexOf(dot, start);
        return idx === -1 ? key2.length : idx;
      }
      function resolveObjectKey(obj, key2) {
        if (key2 === emptyString) {
          return obj;
        }
        let pos = 0;
        let idx = indexOfDotOrLength(key2, pos);
        while (obj && idx > pos) {
          obj = obj[key2.substr(pos, idx - pos)];
          pos = idx + 1;
          idx = indexOfDotOrLength(key2, pos);
        }
        return obj;
      }
      function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      const defined = (value) => typeof value !== "undefined";
      const isFunction = (value) => typeof value === "function";
      const setsEqual = (a, b) => {
        if (a.size !== b.size) {
          return false;
        }
        for (const item of a) {
          if (!b.has(item)) {
            return false;
          }
        }
        return true;
      };
      function _isClickEvent(e2) {
        return e2.type === "mouseup" || e2.type === "click" || e2.type === "contextmenu";
      }
      const overrides = /* @__PURE__ */ Object.create(null);
      const descriptors = /* @__PURE__ */ Object.create(null);
      function getScope$1(node, key2) {
        if (!key2) {
          return node;
        }
        const keys = key2.split(".");
        for (let i2 = 0, n = keys.length; i2 < n; ++i2) {
          const k = keys[i2];
          node = node[k] || (node[k] = /* @__PURE__ */ Object.create(null));
        }
        return node;
      }
      function set(root, scope, values) {
        if (typeof scope === "string") {
          return merge(getScope$1(root, scope), values);
        }
        return merge(getScope$1(root, ""), scope);
      }
      class Defaults {
        constructor(_descriptors2) {
          this.animation = void 0;
          this.backgroundColor = "rgba(0,0,0,0.1)";
          this.borderColor = "rgba(0,0,0,0.1)";
          this.color = "#666";
          this.datasets = {};
          this.devicePixelRatio = (context) => context.chart.platform.getDevicePixelRatio();
          this.elements = {};
          this.events = [
            "mousemove",
            "mouseout",
            "click",
            "touchstart",
            "touchmove"
          ];
          this.font = {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 12,
            style: "normal",
            lineHeight: 1.2,
            weight: null
          };
          this.hover = {};
          this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
          this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
          this.hoverColor = (ctx, options) => getHoverColor(options.color);
          this.indexAxis = "x";
          this.interaction = {
            mode: "nearest",
            intersect: true
          };
          this.maintainAspectRatio = true;
          this.onHover = null;
          this.onClick = null;
          this.parsing = true;
          this.plugins = {};
          this.responsive = true;
          this.scale = void 0;
          this.scales = {};
          this.showLine = true;
          this.drawActiveElementsOnTop = true;
          this.describe(_descriptors2);
        }
        set(scope, values) {
          return set(this, scope, values);
        }
        get(scope) {
          return getScope$1(this, scope);
        }
        describe(scope, values) {
          return set(descriptors, scope, values);
        }
        override(scope, values) {
          return set(overrides, scope, values);
        }
        route(scope, name, targetScope, targetName) {
          const scopeObject = getScope$1(this, scope);
          const targetScopeObject = getScope$1(this, targetScope);
          const privateName = "_" + name;
          Object.defineProperties(scopeObject, {
            [privateName]: {
              value: scopeObject[name],
              writable: true
            },
            [name]: {
              enumerable: true,
              get() {
                const local = this[privateName];
                const target = targetScopeObject[targetName];
                if (isObject(local)) {
                  return Object.assign({}, target, local);
                }
                return valueOrDefault(local, target);
              },
              set(value) {
                this[privateName] = value;
              }
            }
          });
        }
      }
      var defaults = new Defaults({
        _scriptable: (name) => !name.startsWith("on"),
        _indexable: (name) => name !== "events",
        hover: {
          _fallback: "interaction"
        },
        interaction: {
          _scriptable: false,
          _indexable: false
        }
      });
      const PI = Math.PI;
      const TAU = 2 * PI;
      const PITAU = TAU + PI;
      const INFINITY = Number.POSITIVE_INFINITY;
      const RAD_PER_DEG = PI / 180;
      const HALF_PI = PI / 2;
      const QUARTER_PI = PI / 4;
      const TWO_THIRDS_PI = PI * 2 / 3;
      const log10 = Math.log10;
      const sign = Math.sign;
      function niceNum(range) {
        const roundedRange = Math.round(range);
        range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
        const niceRange = Math.pow(10, Math.floor(log10(range)));
        const fraction = range / niceRange;
        const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
        return niceFraction * niceRange;
      }
      function _factorize(value) {
        const result = [];
        const sqrt = Math.sqrt(value);
        let i2;
        for (i2 = 1; i2 < sqrt; i2++) {
          if (value % i2 === 0) {
            result.push(i2);
            result.push(value / i2);
          }
        }
        if (sqrt === (sqrt | 0)) {
          result.push(sqrt);
        }
        result.sort((a, b) => a - b).pop();
        return result;
      }
      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function almostEquals(x2, y, epsilon) {
        return Math.abs(x2 - y) < epsilon;
      }
      function almostWhole(x2, epsilon) {
        const rounded = Math.round(x2);
        return rounded - epsilon <= x2 && rounded + epsilon >= x2;
      }
      function _setMinAndMaxByKey(array, target, property) {
        let i2, ilen, value;
        for (i2 = 0, ilen = array.length; i2 < ilen; i2++) {
          value = array[i2][property];
          if (!isNaN(value)) {
            target.min = Math.min(target.min, value);
            target.max = Math.max(target.max, value);
          }
        }
      }
      function toRadians(degrees) {
        return degrees * (PI / 180);
      }
      function toDegrees(radians) {
        return radians * (180 / PI);
      }
      function _decimalPlaces(x2) {
        if (!isNumberFinite(x2)) {
          return;
        }
        let e2 = 1;
        let p = 0;
        while (Math.round(x2 * e2) / e2 !== x2) {
          e2 *= 10;
          p++;
        }
        return p;
      }
      function getAngleFromPoint(centrePoint, anglePoint) {
        const distanceFromXCenter = anglePoint.x - centrePoint.x;
        const distanceFromYCenter = anglePoint.y - centrePoint.y;
        const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
        let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
        if (angle < -0.5 * PI) {
          angle += TAU;
        }
        return {
          angle,
          distance: radialDistanceFromCenter
        };
      }
      function distanceBetweenPoints(pt1, pt2) {
        return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
      }
      function _angleDiff(a, b) {
        return (a - b + PITAU) % TAU - PI;
      }
      function _normalizeAngle(a) {
        return (a % TAU + TAU) % TAU;
      }
      function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
        const a = _normalizeAngle(angle);
        const s3 = _normalizeAngle(start);
        const e2 = _normalizeAngle(end);
        const angleToStart = _normalizeAngle(s3 - a);
        const angleToEnd = _normalizeAngle(e2 - a);
        const startToAngle = _normalizeAngle(a - s3);
        const endToAngle = _normalizeAngle(a - e2);
        return a === s3 || a === e2 || sameAngleIsFullCircle && s3 === e2 || angleToStart > angleToEnd && startToAngle < endToAngle;
      }
      function _limitValue(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }
      function _int16Range(value) {
        return _limitValue(value, -32768, 32767);
      }
      function _isBetween(value, start, end, epsilon = 1e-6) {
        return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
      }
      function toFontString(font) {
        if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
          return null;
        }
        return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
      }
      function _measureText(ctx, data, gc, longest, string) {
        let textWidth = data[string];
        if (!textWidth) {
          textWidth = data[string] = ctx.measureText(string).width;
          gc.push(string);
        }
        if (textWidth > longest) {
          longest = textWidth;
        }
        return longest;
      }
      function _longestText(ctx, font, arrayOfThings, cache) {
        cache = cache || {};
        let data = cache.data = cache.data || {};
        let gc = cache.garbageCollect = cache.garbageCollect || [];
        if (cache.font !== font) {
          data = cache.data = {};
          gc = cache.garbageCollect = [];
          cache.font = font;
        }
        ctx.save();
        ctx.font = font;
        let longest = 0;
        const ilen = arrayOfThings.length;
        let i2, j, jlen, thing, nestedThing;
        for (i2 = 0; i2 < ilen; i2++) {
          thing = arrayOfThings[i2];
          if (thing !== void 0 && thing !== null && isArray(thing) !== true) {
            longest = _measureText(ctx, data, gc, longest, thing);
          } else if (isArray(thing)) {
            for (j = 0, jlen = thing.length; j < jlen; j++) {
              nestedThing = thing[j];
              if (nestedThing !== void 0 && nestedThing !== null && !isArray(nestedThing)) {
                longest = _measureText(ctx, data, gc, longest, nestedThing);
              }
            }
          }
        }
        ctx.restore();
        const gcLen = gc.length / 2;
        if (gcLen > arrayOfThings.length) {
          for (i2 = 0; i2 < gcLen; i2++) {
            delete data[gc[i2]];
          }
          gc.splice(0, gcLen);
        }
        return longest;
      }
      function _alignPixel(chart, pixel, width) {
        const devicePixelRatio = chart.currentDevicePixelRatio;
        const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
        return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
      }
      function clearCanvas(canvas, ctx) {
        ctx = ctx || canvas.getContext("2d");
        ctx.save();
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
      function drawPoint(ctx, options, x2, y) {
        let type, xOffset, yOffset, size, cornerRadius;
        const style = options.pointStyle;
        const rotation = options.rotation;
        const radius = options.radius;
        let rad = (rotation || 0) * RAD_PER_DEG;
        if (style && typeof style === "object") {
          type = style.toString();
          if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
            ctx.save();
            ctx.translate(x2, y);
            ctx.rotate(rad);
            ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
            ctx.restore();
            return;
          }
        }
        if (isNaN(radius) || radius <= 0) {
          return;
        }
        ctx.beginPath();
        switch (style) {
          default:
            ctx.arc(x2, y, radius, 0, TAU);
            ctx.closePath();
            break;
          case "triangle":
            ctx.moveTo(x2 + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x2 + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x2 + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
            ctx.closePath();
            break;
          case "rectRounded":
            cornerRadius = radius * 0.516;
            size = radius - cornerRadius;
            xOffset = Math.cos(rad + QUARTER_PI) * size;
            yOffset = Math.sin(rad + QUARTER_PI) * size;
            ctx.arc(x2 - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
            ctx.arc(x2 + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
            ctx.arc(x2 + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
            ctx.arc(x2 - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
            ctx.closePath();
            break;
          case "rect":
            if (!rotation) {
              size = Math.SQRT1_2 * radius;
              ctx.rect(x2 - size, y - size, 2 * size, 2 * size);
              break;
            }
            rad += QUARTER_PI;
          case "rectRot":
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x2 - xOffset, y - yOffset);
            ctx.lineTo(x2 + yOffset, y - xOffset);
            ctx.lineTo(x2 + xOffset, y + yOffset);
            ctx.lineTo(x2 - yOffset, y + xOffset);
            ctx.closePath();
            break;
          case "crossRot":
            rad += QUARTER_PI;
          case "cross":
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x2 - xOffset, y - yOffset);
            ctx.lineTo(x2 + xOffset, y + yOffset);
            ctx.moveTo(x2 + yOffset, y - xOffset);
            ctx.lineTo(x2 - yOffset, y + xOffset);
            break;
          case "star":
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x2 - xOffset, y - yOffset);
            ctx.lineTo(x2 + xOffset, y + yOffset);
            ctx.moveTo(x2 + yOffset, y - xOffset);
            ctx.lineTo(x2 - yOffset, y + xOffset);
            rad += QUARTER_PI;
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x2 - xOffset, y - yOffset);
            ctx.lineTo(x2 + xOffset, y + yOffset);
            ctx.moveTo(x2 + yOffset, y - xOffset);
            ctx.lineTo(x2 - yOffset, y + xOffset);
            break;
          case "line":
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x2 - xOffset, y - yOffset);
            ctx.lineTo(x2 + xOffset, y + yOffset);
            break;
          case "dash":
            ctx.moveTo(x2, y);
            ctx.lineTo(x2 + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
            break;
        }
        ctx.fill();
        if (options.borderWidth > 0) {
          ctx.stroke();
        }
      }
      function _isPointInArea(point, area, margin) {
        margin = margin || 0.5;
        return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
      }
      function clipArea(ctx, area) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
        ctx.clip();
      }
      function unclipArea(ctx) {
        ctx.restore();
      }
      function _steppedLineTo(ctx, previous, target, flip, mode) {
        if (!previous) {
          return ctx.lineTo(target.x, target.y);
        }
        if (mode === "middle") {
          const midpoint = (previous.x + target.x) / 2;
          ctx.lineTo(midpoint, previous.y);
          ctx.lineTo(midpoint, target.y);
        } else if (mode === "after" !== !!flip) {
          ctx.lineTo(previous.x, target.y);
        } else {
          ctx.lineTo(target.x, previous.y);
        }
        ctx.lineTo(target.x, target.y);
      }
      function _bezierCurveTo(ctx, previous, target, flip) {
        if (!previous) {
          return ctx.lineTo(target.x, target.y);
        }
        ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
      }
      function renderText(ctx, text, x2, y, font, opts = {}) {
        const lines = isArray(text) ? text : [text];
        const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
        let i2, line;
        ctx.save();
        ctx.font = font.string;
        setRenderOpts(ctx, opts);
        for (i2 = 0; i2 < lines.length; ++i2) {
          line = lines[i2];
          if (stroke) {
            if (opts.strokeColor) {
              ctx.strokeStyle = opts.strokeColor;
            }
            if (!isNullOrUndef(opts.strokeWidth)) {
              ctx.lineWidth = opts.strokeWidth;
            }
            ctx.strokeText(line, x2, y, opts.maxWidth);
          }
          ctx.fillText(line, x2, y, opts.maxWidth);
          decorateText(ctx, x2, y, line, opts);
          y += font.lineHeight;
        }
        ctx.restore();
      }
      function setRenderOpts(ctx, opts) {
        if (opts.translation) {
          ctx.translate(opts.translation[0], opts.translation[1]);
        }
        if (!isNullOrUndef(opts.rotation)) {
          ctx.rotate(opts.rotation);
        }
        if (opts.color) {
          ctx.fillStyle = opts.color;
        }
        if (opts.textAlign) {
          ctx.textAlign = opts.textAlign;
        }
        if (opts.textBaseline) {
          ctx.textBaseline = opts.textBaseline;
        }
      }
      function decorateText(ctx, x2, y, line, opts) {
        if (opts.strikethrough || opts.underline) {
          const metrics = ctx.measureText(line);
          const left = x2 - metrics.actualBoundingBoxLeft;
          const right = x2 + metrics.actualBoundingBoxRight;
          const top = y - metrics.actualBoundingBoxAscent;
          const bottom = y + metrics.actualBoundingBoxDescent;
          const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.beginPath();
          ctx.lineWidth = opts.decorationWidth || 2;
          ctx.moveTo(left, yDecoration);
          ctx.lineTo(right, yDecoration);
          ctx.stroke();
        }
      }
      function addRoundedRectPath(ctx, rect) {
        const { x: x2, y, w, h: h3, radius } = rect;
        ctx.arc(x2 + radius.topLeft, y + radius.topLeft, radius.topLeft, -HALF_PI, PI, true);
        ctx.lineTo(x2, y + h3 - radius.bottomLeft);
        ctx.arc(x2 + radius.bottomLeft, y + h3 - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
        ctx.lineTo(x2 + w - radius.bottomRight, y + h3);
        ctx.arc(x2 + w - radius.bottomRight, y + h3 - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
        ctx.lineTo(x2 + w, y + radius.topRight);
        ctx.arc(x2 + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
        ctx.lineTo(x2 + radius.topLeft, y);
      }
      function _lookup(table, value, cmp) {
        cmp = cmp || ((index) => table[index] < value);
        let hi = table.length - 1;
        let lo = 0;
        let mid;
        while (hi - lo > 1) {
          mid = lo + hi >> 1;
          if (cmp(mid)) {
            lo = mid;
          } else {
            hi = mid;
          }
        }
        return { lo, hi };
      }
      const _lookupByKey = (table, key2, value) => _lookup(table, value, (index) => table[index][key2] < value);
      const _rlookupByKey = (table, key2, value) => _lookup(table, value, (index) => table[index][key2] >= value);
      function _filterBetween(values, min, max) {
        let start = 0;
        let end = values.length;
        while (start < end && values[start] < min) {
          start++;
        }
        while (end > start && values[end - 1] > max) {
          end--;
        }
        return start > 0 || end < values.length ? values.slice(start, end) : values;
      }
      const arrayEvents = ["push", "pop", "shift", "splice", "unshift"];
      function listenArrayEvents(array, listener) {
        if (array._chartjs) {
          array._chartjs.listeners.push(listener);
          return;
        }
        Object.defineProperty(array, "_chartjs", {
          configurable: true,
          enumerable: false,
          value: {
            listeners: [listener]
          }
        });
        arrayEvents.forEach((key2) => {
          const method = "_onData" + _capitalize(key2);
          const base2 = array[key2];
          Object.defineProperty(array, key2, {
            configurable: true,
            enumerable: false,
            value(...args) {
              const res = base2.apply(this, args);
              array._chartjs.listeners.forEach((object) => {
                if (typeof object[method] === "function") {
                  object[method](...args);
                }
              });
              return res;
            }
          });
        });
      }
      function unlistenArrayEvents(array, listener) {
        const stub = array._chartjs;
        if (!stub) {
          return;
        }
        const listeners = stub.listeners;
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
        if (listeners.length > 0) {
          return;
        }
        arrayEvents.forEach((key2) => {
          delete array[key2];
        });
        delete array._chartjs;
      }
      function _arrayUnique(items) {
        const set2 = /* @__PURE__ */ new Set();
        let i2, ilen;
        for (i2 = 0, ilen = items.length; i2 < ilen; ++i2) {
          set2.add(items[i2]);
        }
        if (set2.size === ilen) {
          return items;
        }
        return Array.from(set2);
      }
      function _isDomSupported() {
        return typeof window !== "undefined" && typeof document !== "undefined";
      }
      function _getParentNode(domNode) {
        let parent = domNode.parentNode;
        if (parent && parent.toString() === "[object ShadowRoot]") {
          parent = parent.host;
        }
        return parent;
      }
      function parseMaxStyle(styleValue, node, parentProperty) {
        let valueInPixels;
        if (typeof styleValue === "string") {
          valueInPixels = parseInt(styleValue, 10);
          if (styleValue.indexOf("%") !== -1) {
            valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
          }
        } else {
          valueInPixels = styleValue;
        }
        return valueInPixels;
      }
      const getComputedStyle = (element) => window.getComputedStyle(element, null);
      function getStyle(el, property) {
        return getComputedStyle(el).getPropertyValue(property);
      }
      const positions = ["top", "right", "bottom", "left"];
      function getPositionedStyle(styles, style, suffix) {
        const result = {};
        suffix = suffix ? "-" + suffix : "";
        for (let i2 = 0; i2 < 4; i2++) {
          const pos = positions[i2];
          result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
        }
        result.width = result.left + result.right;
        result.height = result.top + result.bottom;
        return result;
      }
      const useOffsetPos = (x2, y, target) => (x2 > 0 || y > 0) && (!target || !target.shadowRoot);
      function getCanvasPosition(evt, canvas) {
        const e2 = evt.native || evt;
        const touches = e2.touches;
        const source = touches && touches.length ? touches[0] : e2;
        const { offsetX, offsetY } = source;
        let box = false;
        let x2, y;
        if (useOffsetPos(offsetX, offsetY, e2.target)) {
          x2 = offsetX;
          y = offsetY;
        } else {
          const rect = canvas.getBoundingClientRect();
          x2 = source.clientX - rect.left;
          y = source.clientY - rect.top;
          box = true;
        }
        return { x: x2, y, box };
      }
      function getRelativePosition$1(evt, chart) {
        const { canvas, currentDevicePixelRatio } = chart;
        const style = getComputedStyle(canvas);
        const borderBox = style.boxSizing === "border-box";
        const paddings = getPositionedStyle(style, "padding");
        const borders = getPositionedStyle(style, "border", "width");
        const { x: x2, y, box } = getCanvasPosition(evt, canvas);
        const xOffset = paddings.left + (box && borders.left);
        const yOffset = paddings.top + (box && borders.top);
        let { width, height } = chart;
        if (borderBox) {
          width -= paddings.width + borders.width;
          height -= paddings.height + borders.height;
        }
        return {
          x: Math.round((x2 - xOffset) / width * canvas.width / currentDevicePixelRatio),
          y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
        };
      }
      function getContainerSize(canvas, width, height) {
        let maxWidth, maxHeight;
        if (width === void 0 || height === void 0) {
          const container = _getParentNode(canvas);
          if (!container) {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
          } else {
            const rect = container.getBoundingClientRect();
            const containerStyle = getComputedStyle(container);
            const containerBorder = getPositionedStyle(containerStyle, "border", "width");
            const containerPadding = getPositionedStyle(containerStyle, "padding");
            width = rect.width - containerPadding.width - containerBorder.width;
            height = rect.height - containerPadding.height - containerBorder.height;
            maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
            maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
          }
        }
        return {
          width,
          height,
          maxWidth: maxWidth || INFINITY,
          maxHeight: maxHeight || INFINITY
        };
      }
      const round1 = (v) => Math.round(v * 10) / 10;
      function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
        const style = getComputedStyle(canvas);
        const margins = getPositionedStyle(style, "margin");
        const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
        const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
        const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
        let { width, height } = containerSize;
        if (style.boxSizing === "content-box") {
          const borders = getPositionedStyle(style, "border", "width");
          const paddings = getPositionedStyle(style, "padding");
          width -= paddings.width + borders.width;
          height -= paddings.height + borders.height;
        }
        width = Math.max(0, width - margins.width);
        height = Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height - margins.height);
        width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
        height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
        if (width && !height) {
          height = round1(width / 2);
        }
        return {
          width,
          height
        };
      }
      function retinaScale(chart, forceRatio, forceStyle) {
        const pixelRatio = forceRatio || 1;
        const deviceHeight = Math.floor(chart.height * pixelRatio);
        const deviceWidth = Math.floor(chart.width * pixelRatio);
        chart.height = deviceHeight / pixelRatio;
        chart.width = deviceWidth / pixelRatio;
        const canvas = chart.canvas;
        if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
          canvas.style.height = `${chart.height}px`;
          canvas.style.width = `${chart.width}px`;
        }
        if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
          chart.currentDevicePixelRatio = pixelRatio;
          canvas.height = deviceHeight;
          canvas.width = deviceWidth;
          chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          return true;
        }
        return false;
      }
      const supportsEventListenerOptions = function() {
        let passiveSupported = false;
        try {
          const options = {
            get passive() {
              passiveSupported = true;
              return false;
            }
          };
          window.addEventListener("test", null, options);
          window.removeEventListener("test", null, options);
        } catch (e2) {
        }
        return passiveSupported;
      }();
      function readUsedSize(element, property) {
        const value = getStyle(element, property);
        const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
        return matches ? +matches[1] : void 0;
      }
      function getRelativePosition(e2, chart) {
        if ("native" in e2) {
          return {
            x: e2.x,
            y: e2.y
          };
        }
        return getRelativePosition$1(e2, chart);
      }
      function evaluateAllVisibleItems(chart, handler) {
        const metasets = chart.getSortedVisibleDatasetMetas();
        let index, data, element;
        for (let i2 = 0, ilen = metasets.length; i2 < ilen; ++i2) {
          ({ index, data } = metasets[i2]);
          for (let j = 0, jlen = data.length; j < jlen; ++j) {
            element = data[j];
            if (!element.skip) {
              handler(element, index, j);
            }
          }
        }
      }
      function binarySearch(metaset, axis, value, intersect) {
        const { controller, data, _sorted } = metaset;
        const iScale = controller._cachedMeta.iScale;
        if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
          const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
          if (!intersect) {
            return lookupMethod(data, axis, value);
          } else if (controller._sharedOptions) {
            const el = data[0];
            const range = typeof el.getRange === "function" && el.getRange(axis);
            if (range) {
              const start = lookupMethod(data, axis, value - range);
              const end = lookupMethod(data, axis, value + range);
              return { lo: start.lo, hi: end.hi };
            }
          }
        }
        return { lo: 0, hi: data.length - 1 };
      }
      function optimizedEvaluateItems(chart, axis, position, handler, intersect) {
        const metasets = chart.getSortedVisibleDatasetMetas();
        const value = position[axis];
        for (let i2 = 0, ilen = metasets.length; i2 < ilen; ++i2) {
          const { index, data } = metasets[i2];
          const { lo, hi } = binarySearch(metasets[i2], axis, value, intersect);
          for (let j = lo; j <= hi; ++j) {
            const element = data[j];
            if (!element.skip) {
              handler(element, index, j);
            }
          }
        }
      }
      function getDistanceMetricForAxis(axis) {
        const useX = axis.indexOf("x") !== -1;
        const useY = axis.indexOf("y") !== -1;
        return function(pt1, pt2) {
          const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
          const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
          return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        };
      }
      function getIntersectItems(chart, position, axis, useFinalPosition) {
        const items = [];
        if (!_isPointInArea(position, chart.chartArea, chart._minPadding)) {
          return items;
        }
        const evaluationFunc = function(element, datasetIndex, index) {
          if (element.inRange(position.x, position.y, useFinalPosition)) {
            items.push({ element, datasetIndex, index });
          }
        };
        optimizedEvaluateItems(chart, axis, position, evaluationFunc, true);
        return items;
      }
      function getNearestRadialItems(chart, position, axis, useFinalPosition) {
        let items = [];
        function evaluationFunc(element, datasetIndex, index) {
          const { startAngle, endAngle } = element.getProps(["startAngle", "endAngle"], useFinalPosition);
          const { angle } = getAngleFromPoint(element, { x: position.x, y: position.y });
          if (_angleBetween(angle, startAngle, endAngle)) {
            items.push({ element, datasetIndex, index });
          }
        }
        optimizedEvaluateItems(chart, axis, position, evaluationFunc);
        return items;
      }
      function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition) {
        let items = [];
        const distanceMetric = getDistanceMetricForAxis(axis);
        let minDistance = Number.POSITIVE_INFINITY;
        function evaluationFunc(element, datasetIndex, index) {
          const inRange2 = element.inRange(position.x, position.y, useFinalPosition);
          if (intersect && !inRange2) {
            return;
          }
          const center = element.getCenterPoint(useFinalPosition);
          const pointInArea = _isPointInArea(center, chart.chartArea, chart._minPadding);
          if (!pointInArea && !inRange2) {
            return;
          }
          const distance = distanceMetric(position, center);
          if (distance < minDistance) {
            items = [{ element, datasetIndex, index }];
            minDistance = distance;
          } else if (distance === minDistance) {
            items.push({ element, datasetIndex, index });
          }
        }
        optimizedEvaluateItems(chart, axis, position, evaluationFunc);
        return items;
      }
      function getNearestItems(chart, position, axis, intersect, useFinalPosition) {
        if (!_isPointInArea(position, chart.chartArea, chart._minPadding)) {
          return [];
        }
        return axis === "r" && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition);
      }
      function getAxisItems(chart, e2, options, useFinalPosition) {
        const position = getRelativePosition(e2, chart);
        const items = [];
        const axis = options.axis;
        const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
        let intersectsItem = false;
        evaluateAllVisibleItems(chart, (element, datasetIndex, index) => {
          if (element[rangeMethod](position[axis], useFinalPosition)) {
            items.push({ element, datasetIndex, index });
          }
          if (element.inRange(position.x, position.y, useFinalPosition)) {
            intersectsItem = true;
          }
        });
        if (options.intersect && !intersectsItem) {
          return [];
        }
        return items;
      }
      var Interaction = {
        modes: {
          index(chart, e2, options, useFinalPosition) {
            const position = getRelativePosition(e2, chart);
            const axis = options.axis || "x";
            const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition) : getNearestItems(chart, position, axis, false, useFinalPosition);
            const elements2 = [];
            if (!items.length) {
              return [];
            }
            chart.getSortedVisibleDatasetMetas().forEach((meta) => {
              const index = items[0].index;
              const element = meta.data[index];
              if (element && !element.skip) {
                elements2.push({ element, datasetIndex: meta.index, index });
              }
            });
            return elements2;
          },
          dataset(chart, e2, options, useFinalPosition) {
            const position = getRelativePosition(e2, chart);
            const axis = options.axis || "xy";
            let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition) : getNearestItems(chart, position, axis, false, useFinalPosition);
            if (items.length > 0) {
              const datasetIndex = items[0].datasetIndex;
              const data = chart.getDatasetMeta(datasetIndex).data;
              items = [];
              for (let i2 = 0; i2 < data.length; ++i2) {
                items.push({ element: data[i2], datasetIndex, index: i2 });
              }
            }
            return items;
          },
          point(chart, e2, options, useFinalPosition) {
            const position = getRelativePosition(e2, chart);
            const axis = options.axis || "xy";
            return getIntersectItems(chart, position, axis, useFinalPosition);
          },
          nearest(chart, e2, options, useFinalPosition) {
            const position = getRelativePosition(e2, chart);
            const axis = options.axis || "xy";
            return getNearestItems(chart, position, axis, options.intersect, useFinalPosition);
          },
          x(chart, e2, options, useFinalPosition) {
            return getAxisItems(chart, e2, { axis: "x", intersect: options.intersect }, useFinalPosition);
          },
          y(chart, e2, options, useFinalPosition) {
            return getAxisItems(chart, e2, { axis: "y", intersect: options.intersect }, useFinalPosition);
          }
        }
      };
      const LINE_HEIGHT = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
      const FONT_STYLE = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
      function toLineHeight(value, size) {
        const matches = ("" + value).match(LINE_HEIGHT);
        if (!matches || matches[1] === "normal") {
          return size * 1.2;
        }
        value = +matches[2];
        switch (matches[3]) {
          case "px":
            return value;
          case "%":
            value /= 100;
            break;
        }
        return size * value;
      }
      const numberOrZero = (v) => +v || 0;
      function _readValueToProps(value, props) {
        const ret = {};
        const objProps = isObject(props);
        const keys = objProps ? Object.keys(props) : props;
        const read2 = isObject(value) ? objProps ? (prop) => valueOrDefault(value[prop], value[props[prop]]) : (prop) => value[prop] : () => value;
        for (const prop of keys) {
          ret[prop] = numberOrZero(read2(prop));
        }
        return ret;
      }
      function toTRBL(value) {
        return _readValueToProps(value, { top: "y", right: "x", bottom: "y", left: "x" });
      }
      function toTRBLCorners(value) {
        return _readValueToProps(value, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
      }
      function toPadding(value) {
        const obj = toTRBL(value);
        obj.width = obj.left + obj.right;
        obj.height = obj.top + obj.bottom;
        return obj;
      }
      function toFont(options, fallback) {
        options = options || {};
        fallback = fallback || defaults.font;
        let size = valueOrDefault(options.size, fallback.size);
        if (typeof size === "string") {
          size = parseInt(size, 10);
        }
        let style = valueOrDefault(options.style, fallback.style);
        if (style && !("" + style).match(FONT_STYLE)) {
          console.warn('Invalid font style specified: "' + style + '"');
          style = "";
        }
        const font = {
          family: valueOrDefault(options.family, fallback.family),
          lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
          size,
          style,
          weight: valueOrDefault(options.weight, fallback.weight),
          string: ""
        };
        font.string = toFontString(font);
        return font;
      }
      function resolve2(inputs, context, index, info) {
        let cacheable = true;
        let i2, ilen, value;
        for (i2 = 0, ilen = inputs.length; i2 < ilen; ++i2) {
          value = inputs[i2];
          if (value === void 0) {
            continue;
          }
          if (context !== void 0 && typeof value === "function") {
            value = value(context);
            cacheable = false;
          }
          if (index !== void 0 && isArray(value)) {
            value = value[index % value.length];
            cacheable = false;
          }
          if (value !== void 0) {
            if (info && !cacheable) {
              info.cacheable = false;
            }
            return value;
          }
        }
      }
      function _addGrace(minmax, grace, beginAtZero) {
        const { min, max } = minmax;
        const change = toDimension(grace, (max - min) / 2);
        const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
        return {
          min: keepZero(min, -Math.abs(change)),
          max: keepZero(max, change)
        };
      }
      function createContext(parentContext, context) {
        return Object.assign(Object.create(parentContext), context);
      }
      const STATIC_POSITIONS = ["left", "top", "right", "bottom"];
      function filterByPosition(array, position) {
        return array.filter((v) => v.pos === position);
      }
      function filterDynamicPositionByAxis(array, axis) {
        return array.filter((v) => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
      }
      function sortByWeight(array, reverse) {
        return array.sort((a, b) => {
          const v0 = reverse ? b : a;
          const v1 = reverse ? a : b;
          return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
        });
      }
      function wrapBoxes(boxes) {
        const layoutBoxes = [];
        let i2, ilen, box, pos, stack, stackWeight;
        for (i2 = 0, ilen = (boxes || []).length; i2 < ilen; ++i2) {
          box = boxes[i2];
          ({ position: pos, options: { stack, stackWeight = 1 } } = box);
          layoutBoxes.push({
            index: i2,
            box,
            pos,
            horizontal: box.isHorizontal(),
            weight: box.weight,
            stack: stack && pos + stack,
            stackWeight
          });
        }
        return layoutBoxes;
      }
      function buildStacks(layouts2) {
        const stacks = {};
        for (const wrap of layouts2) {
          const { stack, pos, stackWeight } = wrap;
          if (!stack || !STATIC_POSITIONS.includes(pos)) {
            continue;
          }
          const _stack = stacks[stack] || (stacks[stack] = { count: 0, placed: 0, weight: 0, size: 0 });
          _stack.count++;
          _stack.weight += stackWeight;
        }
        return stacks;
      }
      function setLayoutDims(layouts2, params) {
        const stacks = buildStacks(layouts2);
        const { vBoxMaxWidth, hBoxMaxHeight } = params;
        let i2, ilen, layout;
        for (i2 = 0, ilen = layouts2.length; i2 < ilen; ++i2) {
          layout = layouts2[i2];
          const { fullSize } = layout.box;
          const stack = stacks[layout.stack];
          const factor = stack && layout.stackWeight / stack.weight;
          if (layout.horizontal) {
            layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
            layout.height = hBoxMaxHeight;
          } else {
            layout.width = vBoxMaxWidth;
            layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
          }
        }
        return stacks;
      }
      function buildLayoutBoxes(boxes) {
        const layoutBoxes = wrapBoxes(boxes);
        const fullSize = sortByWeight(layoutBoxes.filter((wrap) => wrap.box.fullSize), true);
        const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
        const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
        const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
        const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
        const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
        const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
        return {
          fullSize,
          leftAndTop: left.concat(top),
          rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
          chartArea: filterByPosition(layoutBoxes, "chartArea"),
          vertical: left.concat(right).concat(centerVertical),
          horizontal: top.concat(bottom).concat(centerHorizontal)
        };
      }
      function getCombinedMax(maxPadding, chartArea, a, b) {
        return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
      }
      function updateMaxPadding(maxPadding, boxPadding) {
        maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
        maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
        maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
        maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
      }
      function updateDims(chartArea, params, layout, stacks) {
        const { pos, box } = layout;
        const maxPadding = chartArea.maxPadding;
        if (!isObject(pos)) {
          if (layout.size) {
            chartArea[pos] -= layout.size;
          }
          const stack = stacks[layout.stack] || { size: 0, count: 1 };
          stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
          layout.size = stack.size / stack.count;
          chartArea[pos] += layout.size;
        }
        if (box.getPadding) {
          updateMaxPadding(maxPadding, box.getPadding());
        }
        const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
        const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
        const widthChanged = newWidth !== chartArea.w;
        const heightChanged = newHeight !== chartArea.h;
        chartArea.w = newWidth;
        chartArea.h = newHeight;
        return layout.horizontal ? { same: widthChanged, other: heightChanged } : { same: heightChanged, other: widthChanged };
      }
      function handleMaxPadding(chartArea) {
        const maxPadding = chartArea.maxPadding;
        function updatePos(pos) {
          const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
          chartArea[pos] += change;
          return change;
        }
        chartArea.y += updatePos("top");
        chartArea.x += updatePos("left");
        updatePos("right");
        updatePos("bottom");
      }
      function getMargins(horizontal, chartArea) {
        const maxPadding = chartArea.maxPadding;
        function marginForPositions(positions2) {
          const margin = { left: 0, top: 0, right: 0, bottom: 0 };
          positions2.forEach((pos) => {
            margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
          });
          return margin;
        }
        return horizontal ? marginForPositions(["left", "right"]) : marginForPositions(["top", "bottom"]);
      }
      function fitBoxes(boxes, chartArea, params, stacks) {
        const refitBoxes = [];
        let i2, ilen, layout, box, refit, changed;
        for (i2 = 0, ilen = boxes.length, refit = 0; i2 < ilen; ++i2) {
          layout = boxes[i2];
          box = layout.box;
          box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
          const { same, other } = updateDims(chartArea, params, layout, stacks);
          refit |= same && refitBoxes.length;
          changed = changed || other;
          if (!box.fullSize) {
            refitBoxes.push(layout);
          }
        }
        return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
      }
      function setBoxDims(box, left, top, width, height) {
        box.top = top;
        box.left = left;
        box.right = left + width;
        box.bottom = top + height;
        box.width = width;
        box.height = height;
      }
      function placeBoxes(boxes, chartArea, params, stacks) {
        const userPadding = params.padding;
        let { x: x2, y } = chartArea;
        for (const layout of boxes) {
          const box = layout.box;
          const stack = stacks[layout.stack] || { count: 1, placed: 0, weight: 1 };
          const weight = layout.stackWeight / stack.weight || 1;
          if (layout.horizontal) {
            const width = chartArea.w * weight;
            const height = stack.size || box.height;
            if (defined(stack.start)) {
              y = stack.start;
            }
            if (box.fullSize) {
              setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
            } else {
              setBoxDims(box, chartArea.left + stack.placed, y, width, height);
            }
            stack.start = y;
            stack.placed += width;
            y = box.bottom;
          } else {
            const height = chartArea.h * weight;
            const width = stack.size || box.width;
            if (defined(stack.start)) {
              x2 = stack.start;
            }
            if (box.fullSize) {
              setBoxDims(box, x2, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
            } else {
              setBoxDims(box, x2, chartArea.top + stack.placed, width, height);
            }
            stack.start = x2;
            stack.placed += height;
            x2 = box.right;
          }
        }
        chartArea.x = x2;
        chartArea.y = y;
      }
      defaults.set("layout", {
        autoPadding: true,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      });
      var layouts = {
        addBox(chart, item) {
          if (!chart.boxes) {
            chart.boxes = [];
          }
          item.fullSize = item.fullSize || false;
          item.position = item.position || "top";
          item.weight = item.weight || 0;
          item._layers = item._layers || function() {
            return [{
              z: 0,
              draw(chartArea) {
                item.draw(chartArea);
              }
            }];
          };
          chart.boxes.push(item);
        },
        removeBox(chart, layoutItem) {
          const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
          if (index !== -1) {
            chart.boxes.splice(index, 1);
          }
        },
        configure(chart, item, options) {
          item.fullSize = options.fullSize;
          item.position = options.position;
          item.weight = options.weight;
        },
        update(chart, width, height, minPadding) {
          if (!chart) {
            return;
          }
          const padding = toPadding(chart.options.layout.padding);
          const availableWidth = Math.max(width - padding.width, 0);
          const availableHeight = Math.max(height - padding.height, 0);
          const boxes = buildLayoutBoxes(chart.boxes);
          const verticalBoxes = boxes.vertical;
          const horizontalBoxes = boxes.horizontal;
          each(chart.boxes, (box) => {
            if (typeof box.beforeLayout === "function") {
              box.beforeLayout();
            }
          });
          const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
          const params = Object.freeze({
            outerWidth: width,
            outerHeight: height,
            padding,
            availableWidth,
            availableHeight,
            vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
            hBoxMaxHeight: availableHeight / 2
          });
          const maxPadding = Object.assign({}, padding);
          updateMaxPadding(maxPadding, toPadding(minPadding));
          const chartArea = Object.assign({
            maxPadding,
            w: availableWidth,
            h: availableHeight,
            x: padding.left,
            y: padding.top
          }, padding);
          const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
          fitBoxes(boxes.fullSize, chartArea, params, stacks);
          fitBoxes(verticalBoxes, chartArea, params, stacks);
          if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
            fitBoxes(verticalBoxes, chartArea, params, stacks);
          }
          handleMaxPadding(chartArea);
          placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
          chartArea.x += chartArea.w;
          chartArea.y += chartArea.h;
          placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
          chart.chartArea = {
            left: chartArea.left,
            top: chartArea.top,
            right: chartArea.left + chartArea.w,
            bottom: chartArea.top + chartArea.h,
            height: chartArea.h,
            width: chartArea.w
          };
          each(boxes.chartArea, (layout) => {
            const box = layout.box;
            Object.assign(box, chart.chartArea);
            box.update(chartArea.w, chartArea.h, { left: 0, top: 0, right: 0, bottom: 0 });
          });
        }
      };
      function _createResolver(scopes, prefixes = [""], rootScopes = scopes, fallback, getTarget2 = () => scopes[0]) {
        if (!defined(fallback)) {
          fallback = _resolve("_fallback", scopes);
        }
        const cache = {
          [Symbol.toStringTag]: "Object",
          _cacheable: true,
          _scopes: scopes,
          _rootScopes: rootScopes,
          _fallback: fallback,
          _getTarget: getTarget2,
          override: (scope) => _createResolver([scope, ...scopes], prefixes, rootScopes, fallback)
        };
        return new Proxy(cache, {
          deleteProperty(target, prop) {
            delete target[prop];
            delete target._keys;
            delete scopes[0][prop];
            return true;
          },
          get(target, prop) {
            return _cached(target, prop, () => _resolveWithPrefixes(prop, prefixes, scopes, target));
          },
          getOwnPropertyDescriptor(target, prop) {
            return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
          },
          getPrototypeOf() {
            return Reflect.getPrototypeOf(scopes[0]);
          },
          has(target, prop) {
            return getKeysFromAllScopes(target).includes(prop);
          },
          ownKeys(target) {
            return getKeysFromAllScopes(target);
          },
          set(target, prop, value) {
            const storage = target._storage || (target._storage = getTarget2());
            target[prop] = storage[prop] = value;
            delete target._keys;
            return true;
          }
        });
      }
      function _attachContext(proxy, context, subProxy, descriptorDefaults) {
        const cache = {
          _cacheable: false,
          _proxy: proxy,
          _context: context,
          _subProxy: subProxy,
          _stack: /* @__PURE__ */ new Set(),
          _descriptors: _descriptors(proxy, descriptorDefaults),
          setContext: (ctx) => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
          override: (scope) => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
        };
        return new Proxy(cache, {
          deleteProperty(target, prop) {
            delete target[prop];
            delete proxy[prop];
            return true;
          },
          get(target, prop, receiver) {
            return _cached(target, prop, () => _resolveWithContext(target, prop, receiver));
          },
          getOwnPropertyDescriptor(target, prop) {
            return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? { enumerable: true, configurable: true } : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
          },
          getPrototypeOf() {
            return Reflect.getPrototypeOf(proxy);
          },
          has(target, prop) {
            return Reflect.has(proxy, prop);
          },
          ownKeys() {
            return Reflect.ownKeys(proxy);
          },
          set(target, prop, value) {
            proxy[prop] = value;
            delete target[prop];
            return true;
          }
        });
      }
      function _descriptors(proxy, defaults2 = { scriptable: true, indexable: true }) {
        const { _scriptable = defaults2.scriptable, _indexable = defaults2.indexable, _allKeys = defaults2.allKeys } = proxy;
        return {
          allKeys: _allKeys,
          scriptable: _scriptable,
          indexable: _indexable,
          isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
          isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
        };
      }
      const readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
      const needsSubResolver = (prop, value) => isObject(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
      function _cached(target, prop, resolve3) {
        if (Object.prototype.hasOwnProperty.call(target, prop)) {
          return target[prop];
        }
        const value = resolve3();
        target[prop] = value;
        return value;
      }
      function _resolveWithContext(target, prop, receiver) {
        const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
        let value = _proxy[prop];
        if (isFunction(value) && descriptors2.isScriptable(prop)) {
          value = _resolveScriptable(prop, value, target, receiver);
        }
        if (isArray(value) && value.length) {
          value = _resolveArray(prop, value, target, descriptors2.isIndexable);
        }
        if (needsSubResolver(prop, value)) {
          value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors2);
        }
        return value;
      }
      function _resolveScriptable(prop, value, target, receiver) {
        const { _proxy, _context, _subProxy, _stack } = target;
        if (_stack.has(prop)) {
          throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
        }
        _stack.add(prop);
        value = value(_context, _subProxy || receiver);
        _stack.delete(prop);
        if (needsSubResolver(prop, value)) {
          value = createSubResolver(_proxy._scopes, _proxy, prop, value);
        }
        return value;
      }
      function _resolveArray(prop, value, target, isIndexable) {
        const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
        if (defined(_context.index) && isIndexable(prop)) {
          value = value[_context.index % value.length];
        } else if (isObject(value[0])) {
          const arr = value;
          const scopes = _proxy._scopes.filter((s3) => s3 !== arr);
          value = [];
          for (const item of arr) {
            const resolver = createSubResolver(scopes, _proxy, prop, item);
            value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors2));
          }
        }
        return value;
      }
      function resolveFallback(fallback, prop, value) {
        return isFunction(fallback) ? fallback(prop, value) : fallback;
      }
      const getScope = (key2, parent) => key2 === true ? parent : typeof key2 === "string" ? resolveObjectKey(parent, key2) : void 0;
      function addScopes(set2, parentScopes, key2, parentFallback, value) {
        for (const parent of parentScopes) {
          const scope = getScope(key2, parent);
          if (scope) {
            set2.add(scope);
            const fallback = resolveFallback(scope._fallback, key2, value);
            if (defined(fallback) && fallback !== key2 && fallback !== parentFallback) {
              return fallback;
            }
          } else if (scope === false && defined(parentFallback) && key2 !== parentFallback) {
            return null;
          }
        }
        return false;
      }
      function createSubResolver(parentScopes, resolver, prop, value) {
        const rootScopes = resolver._rootScopes;
        const fallback = resolveFallback(resolver._fallback, prop, value);
        const allScopes = [...parentScopes, ...rootScopes];
        const set2 = /* @__PURE__ */ new Set();
        set2.add(value);
        let key2 = addScopesFromKey(set2, allScopes, prop, fallback || prop, value);
        if (key2 === null) {
          return false;
        }
        if (defined(fallback) && fallback !== prop) {
          key2 = addScopesFromKey(set2, allScopes, fallback, key2, value);
          if (key2 === null) {
            return false;
          }
        }
        return _createResolver(Array.from(set2), [""], rootScopes, fallback, () => subGetTarget(resolver, prop, value));
      }
      function addScopesFromKey(set2, allScopes, key2, fallback, item) {
        while (key2) {
          key2 = addScopes(set2, allScopes, key2, fallback, item);
        }
        return key2;
      }
      function subGetTarget(resolver, prop, value) {
        const parent = resolver._getTarget();
        if (!(prop in parent)) {
          parent[prop] = {};
        }
        const target = parent[prop];
        if (isArray(target) && isObject(value)) {
          return value;
        }
        return target;
      }
      function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
        let value;
        for (const prefix of prefixes) {
          value = _resolve(readKey(prefix, prop), scopes);
          if (defined(value)) {
            return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
          }
        }
      }
      function _resolve(key2, scopes) {
        for (const scope of scopes) {
          if (!scope) {
            continue;
          }
          const value = scope[key2];
          if (defined(value)) {
            return value;
          }
        }
      }
      function getKeysFromAllScopes(target) {
        let keys = target._keys;
        if (!keys) {
          keys = target._keys = resolveKeysFromAllScopes(target._scopes);
        }
        return keys;
      }
      function resolveKeysFromAllScopes(scopes) {
        const set2 = /* @__PURE__ */ new Set();
        for (const scope of scopes) {
          for (const key2 of Object.keys(scope).filter((k) => !k.startsWith("_"))) {
            set2.add(key2);
          }
        }
        return Array.from(set2);
      }
      const EPSILON = Number.EPSILON || 1e-14;
      const getPoint = (points, i2) => i2 < points.length && !points[i2].skip && points[i2];
      const getValueAxis = (indexAxis) => indexAxis === "x" ? "y" : "x";
      function splineCurve(firstPoint, middlePoint, afterPoint, t2) {
        const previous = firstPoint.skip ? middlePoint : firstPoint;
        const current = middlePoint;
        const next = afterPoint.skip ? middlePoint : afterPoint;
        const d01 = distanceBetweenPoints(current, previous);
        const d12 = distanceBetweenPoints(next, current);
        let s01 = d01 / (d01 + d12);
        let s12 = d12 / (d01 + d12);
        s01 = isNaN(s01) ? 0 : s01;
        s12 = isNaN(s12) ? 0 : s12;
        const fa = t2 * s01;
        const fb = t2 * s12;
        return {
          previous: {
            x: current.x - fa * (next.x - previous.x),
            y: current.y - fa * (next.y - previous.y)
          },
          next: {
            x: current.x + fb * (next.x - previous.x),
            y: current.y + fb * (next.y - previous.y)
          }
        };
      }
      function monotoneAdjust(points, deltaK, mK) {
        const pointsLen = points.length;
        let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (let i2 = 0; i2 < pointsLen - 1; ++i2) {
          pointCurrent = pointAfter;
          pointAfter = getPoint(points, i2 + 1);
          if (!pointCurrent || !pointAfter) {
            continue;
          }
          if (almostEquals(deltaK[i2], 0, EPSILON)) {
            mK[i2] = mK[i2 + 1] = 0;
            continue;
          }
          alphaK = mK[i2] / deltaK[i2];
          betaK = mK[i2 + 1] / deltaK[i2];
          squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
          if (squaredMagnitude <= 9) {
            continue;
          }
          tauK = 3 / Math.sqrt(squaredMagnitude);
          mK[i2] = alphaK * tauK * deltaK[i2];
          mK[i2 + 1] = betaK * tauK * deltaK[i2];
        }
      }
      function monotoneCompute(points, mK, indexAxis = "x") {
        const valueAxis = getValueAxis(indexAxis);
        const pointsLen = points.length;
        let delta, pointBefore, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (let i2 = 0; i2 < pointsLen; ++i2) {
          pointBefore = pointCurrent;
          pointCurrent = pointAfter;
          pointAfter = getPoint(points, i2 + 1);
          if (!pointCurrent) {
            continue;
          }
          const iPixel = pointCurrent[indexAxis];
          const vPixel = pointCurrent[valueAxis];
          if (pointBefore) {
            delta = (iPixel - pointBefore[indexAxis]) / 3;
            pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
            pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i2];
          }
          if (pointAfter) {
            delta = (pointAfter[indexAxis] - iPixel) / 3;
            pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
            pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i2];
          }
        }
      }
      function splineCurveMonotone(points, indexAxis = "x") {
        const valueAxis = getValueAxis(indexAxis);
        const pointsLen = points.length;
        const deltaK = Array(pointsLen).fill(0);
        const mK = Array(pointsLen);
        let i2, pointBefore, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (i2 = 0; i2 < pointsLen; ++i2) {
          pointBefore = pointCurrent;
          pointCurrent = pointAfter;
          pointAfter = getPoint(points, i2 + 1);
          if (!pointCurrent) {
            continue;
          }
          if (pointAfter) {
            const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
            deltaK[i2] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
          }
          mK[i2] = !pointBefore ? deltaK[i2] : !pointAfter ? deltaK[i2 - 1] : sign(deltaK[i2 - 1]) !== sign(deltaK[i2]) ? 0 : (deltaK[i2 - 1] + deltaK[i2]) / 2;
        }
        monotoneAdjust(points, deltaK, mK);
        monotoneCompute(points, mK, indexAxis);
      }
      function capControlPoint(pt, min, max) {
        return Math.max(Math.min(pt, max), min);
      }
      function capBezierPoints(points, area) {
        let i2, ilen, point, inArea, inAreaPrev;
        let inAreaNext = _isPointInArea(points[0], area);
        for (i2 = 0, ilen = points.length; i2 < ilen; ++i2) {
          inAreaPrev = inArea;
          inArea = inAreaNext;
          inAreaNext = i2 < ilen - 1 && _isPointInArea(points[i2 + 1], area);
          if (!inArea) {
            continue;
          }
          point = points[i2];
          if (inAreaPrev) {
            point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
            point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
          }
          if (inAreaNext) {
            point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
            point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
          }
        }
      }
      function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
        let i2, ilen, point, controlPoints;
        if (options.spanGaps) {
          points = points.filter((pt) => !pt.skip);
        }
        if (options.cubicInterpolationMode === "monotone") {
          splineCurveMonotone(points, indexAxis);
        } else {
          let prev = loop ? points[points.length - 1] : points[0];
          for (i2 = 0, ilen = points.length; i2 < ilen; ++i2) {
            point = points[i2];
            controlPoints = splineCurve(prev, point, points[Math.min(i2 + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
            point.cp1x = controlPoints.previous.x;
            point.cp1y = controlPoints.previous.y;
            point.cp2x = controlPoints.next.x;
            point.cp2y = controlPoints.next.y;
            prev = point;
          }
        }
        if (options.capBezierPoints) {
          capBezierPoints(points, area);
        }
      }
      const atEdge = (t2) => t2 === 0 || t2 === 1;
      const elasticIn = (t2, s3, p) => -(Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 - s3) * TAU / p));
      const elasticOut = (t2, s3, p) => Math.pow(2, -10 * t2) * Math.sin((t2 - s3) * TAU / p) + 1;
      const effects = {
        linear: (t2) => t2,
        easeInQuad: (t2) => t2 * t2,
        easeOutQuad: (t2) => -t2 * (t2 - 2),
        easeInOutQuad: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 : -0.5 * (--t2 * (t2 - 2) - 1),
        easeInCubic: (t2) => t2 * t2 * t2,
        easeOutCubic: (t2) => (t2 -= 1) * t2 * t2 + 1,
        easeInOutCubic: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 : 0.5 * ((t2 -= 2) * t2 * t2 + 2),
        easeInQuart: (t2) => t2 * t2 * t2 * t2,
        easeOutQuart: (t2) => -((t2 -= 1) * t2 * t2 * t2 - 1),
        easeInOutQuart: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 * t2 : -0.5 * ((t2 -= 2) * t2 * t2 * t2 - 2),
        easeInQuint: (t2) => t2 * t2 * t2 * t2 * t2,
        easeOutQuint: (t2) => (t2 -= 1) * t2 * t2 * t2 * t2 + 1,
        easeInOutQuint: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 * t2 * t2 : 0.5 * ((t2 -= 2) * t2 * t2 * t2 * t2 + 2),
        easeInSine: (t2) => -Math.cos(t2 * HALF_PI) + 1,
        easeOutSine: (t2) => Math.sin(t2 * HALF_PI),
        easeInOutSine: (t2) => -0.5 * (Math.cos(PI * t2) - 1),
        easeInExpo: (t2) => t2 === 0 ? 0 : Math.pow(2, 10 * (t2 - 1)),
        easeOutExpo: (t2) => t2 === 1 ? 1 : -Math.pow(2, -10 * t2) + 1,
        easeInOutExpo: (t2) => atEdge(t2) ? t2 : t2 < 0.5 ? 0.5 * Math.pow(2, 10 * (t2 * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t2 * 2 - 1)) + 2),
        easeInCirc: (t2) => t2 >= 1 ? t2 : -(Math.sqrt(1 - t2 * t2) - 1),
        easeOutCirc: (t2) => Math.sqrt(1 - (t2 -= 1) * t2),
        easeInOutCirc: (t2) => (t2 /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t2 * t2) - 1) : 0.5 * (Math.sqrt(1 - (t2 -= 2) * t2) + 1),
        easeInElastic: (t2) => atEdge(t2) ? t2 : elasticIn(t2, 0.075, 0.3),
        easeOutElastic: (t2) => atEdge(t2) ? t2 : elasticOut(t2, 0.075, 0.3),
        easeInOutElastic(t2) {
          const s3 = 0.1125;
          const p = 0.45;
          return atEdge(t2) ? t2 : t2 < 0.5 ? 0.5 * elasticIn(t2 * 2, s3, p) : 0.5 + 0.5 * elasticOut(t2 * 2 - 1, s3, p);
        },
        easeInBack(t2) {
          const s3 = 1.70158;
          return t2 * t2 * ((s3 + 1) * t2 - s3);
        },
        easeOutBack(t2) {
          const s3 = 1.70158;
          return (t2 -= 1) * t2 * ((s3 + 1) * t2 + s3) + 1;
        },
        easeInOutBack(t2) {
          let s3 = 1.70158;
          if ((t2 /= 0.5) < 1) {
            return 0.5 * (t2 * t2 * (((s3 *= 1.525) + 1) * t2 - s3));
          }
          return 0.5 * ((t2 -= 2) * t2 * (((s3 *= 1.525) + 1) * t2 + s3) + 2);
        },
        easeInBounce: (t2) => 1 - effects.easeOutBounce(1 - t2),
        easeOutBounce(t2) {
          const m2 = 7.5625;
          const d = 2.75;
          if (t2 < 1 / d) {
            return m2 * t2 * t2;
          }
          if (t2 < 2 / d) {
            return m2 * (t2 -= 1.5 / d) * t2 + 0.75;
          }
          if (t2 < 2.5 / d) {
            return m2 * (t2 -= 2.25 / d) * t2 + 0.9375;
          }
          return m2 * (t2 -= 2.625 / d) * t2 + 0.984375;
        },
        easeInOutBounce: (t2) => t2 < 0.5 ? effects.easeInBounce(t2 * 2) * 0.5 : effects.easeOutBounce(t2 * 2 - 1) * 0.5 + 0.5
      };
      function _pointInLine(p1, p2, t2, mode) {
        return {
          x: p1.x + t2 * (p2.x - p1.x),
          y: p1.y + t2 * (p2.y - p1.y)
        };
      }
      function _steppedInterpolation(p1, p2, t2, mode) {
        return {
          x: p1.x + t2 * (p2.x - p1.x),
          y: mode === "middle" ? t2 < 0.5 ? p1.y : p2.y : mode === "after" ? t2 < 1 ? p1.y : p2.y : t2 > 0 ? p2.y : p1.y
        };
      }
      function _bezierInterpolation(p1, p2, t2, mode) {
        const cp1 = { x: p1.cp2x, y: p1.cp2y };
        const cp2 = { x: p2.cp1x, y: p2.cp1y };
        const a = _pointInLine(p1, cp1, t2);
        const b = _pointInLine(cp1, cp2, t2);
        const c = _pointInLine(cp2, p2, t2);
        const d = _pointInLine(a, b, t2);
        const e2 = _pointInLine(b, c, t2);
        return _pointInLine(d, e2, t2);
      }
      const intlCache = /* @__PURE__ */ new Map();
      function getNumberFormat(locale, options) {
        options = options || {};
        const cacheKey = locale + JSON.stringify(options);
        let formatter = intlCache.get(cacheKey);
        if (!formatter) {
          formatter = new Intl.NumberFormat(locale, options);
          intlCache.set(cacheKey, formatter);
        }
        return formatter;
      }
      function formatNumber(num, locale, options) {
        return getNumberFormat(locale, options).format(num);
      }
      const getRightToLeftAdapter = function(rectX, width) {
        return {
          x(x2) {
            return rectX + rectX + width - x2;
          },
          setWidth(w) {
            width = w;
          },
          textAlign(align) {
            if (align === "center") {
              return align;
            }
            return align === "right" ? "left" : "right";
          },
          xPlus(x2, value) {
            return x2 - value;
          },
          leftForLtr(x2, itemWidth) {
            return x2 - itemWidth;
          }
        };
      };
      const getLeftToRightAdapter = function() {
        return {
          x(x2) {
            return x2;
          },
          setWidth(w) {
          },
          textAlign(align) {
            return align;
          },
          xPlus(x2, value) {
            return x2 + value;
          },
          leftForLtr(x2, _itemWidth) {
            return x2;
          }
        };
      };
      function getRtlAdapter(rtl, rectX, width) {
        return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
      }
      function overrideTextDirection(ctx, direction) {
        let style, original;
        if (direction === "ltr" || direction === "rtl") {
          style = ctx.canvas.style;
          original = [
            style.getPropertyValue("direction"),
            style.getPropertyPriority("direction")
          ];
          style.setProperty("direction", direction, "important");
          ctx.prevTextDirection = original;
        }
      }
      function restoreTextDirection(ctx, original) {
        if (original !== void 0) {
          delete ctx.prevTextDirection;
          ctx.canvas.style.setProperty("direction", original[0], original[1]);
        }
      }
      function propertyFn(property) {
        if (property === "angle") {
          return {
            between: _angleBetween,
            compare: _angleDiff,
            normalize: _normalizeAngle
          };
        }
        return {
          between: _isBetween,
          compare: (a, b) => a - b,
          normalize: (x2) => x2
        };
      }
      function normalizeSegment({ start, end, count, loop, style }) {
        return {
          start: start % count,
          end: end % count,
          loop: loop && (end - start + 1) % count === 0,
          style
        };
      }
      function getSegment(segment, points, bounds) {
        const { property, start: startBound, end: endBound } = bounds;
        const { between, normalize: normalize2 } = propertyFn(property);
        const count = points.length;
        let { start, end, loop } = segment;
        let i2, ilen;
        if (loop) {
          start += count;
          end += count;
          for (i2 = 0, ilen = count; i2 < ilen; ++i2) {
            if (!between(normalize2(points[start % count][property]), startBound, endBound)) {
              break;
            }
            start--;
            end--;
          }
          start %= count;
          end %= count;
        }
        if (end < start) {
          end += count;
        }
        return { start, end, loop, style: segment.style };
      }
      function _boundSegment(segment, points, bounds) {
        if (!bounds) {
          return [segment];
        }
        const { property, start: startBound, end: endBound } = bounds;
        const count = points.length;
        const { compare, between, normalize: normalize2 } = propertyFn(property);
        const { start, end, loop, style } = getSegment(segment, points, bounds);
        const result = [];
        let inside = false;
        let subStart = null;
        let value, point, prevValue;
        const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
        const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
        const shouldStart = () => inside || startIsBefore();
        const shouldStop = () => !inside || endIsBefore();
        for (let i2 = start, prev = start; i2 <= end; ++i2) {
          point = points[i2 % count];
          if (point.skip) {
            continue;
          }
          value = normalize2(point[property]);
          if (value === prevValue) {
            continue;
          }
          inside = between(value, startBound, endBound);
          if (subStart === null && shouldStart()) {
            subStart = compare(value, startBound) === 0 ? i2 : prev;
          }
          if (subStart !== null && shouldStop()) {
            result.push(normalizeSegment({ start: subStart, end: i2, loop, count, style }));
            subStart = null;
          }
          prev = i2;
          prevValue = value;
        }
        if (subStart !== null) {
          result.push(normalizeSegment({ start: subStart, end, loop, count, style }));
        }
        return result;
      }
      function _boundSegments(line, bounds) {
        const result = [];
        const segments = line.segments;
        for (let i2 = 0; i2 < segments.length; i2++) {
          const sub = _boundSegment(segments[i2], line.points, bounds);
          if (sub.length) {
            result.push(...sub);
          }
        }
        return result;
      }
      function findStartAndEnd(points, count, loop, spanGaps) {
        let start = 0;
        let end = count - 1;
        if (loop && !spanGaps) {
          while (start < count && !points[start].skip) {
            start++;
          }
        }
        while (start < count && points[start].skip) {
          start++;
        }
        start %= count;
        if (loop) {
          end += start;
        }
        while (end > start && points[end % count].skip) {
          end--;
        }
        end %= count;
        return { start, end };
      }
      function solidSegments(points, start, max, loop) {
        const count = points.length;
        const result = [];
        let last = start;
        let prev = points[start];
        let end;
        for (end = start + 1; end <= max; ++end) {
          const cur = points[end % count];
          if (cur.skip || cur.stop) {
            if (!prev.skip) {
              loop = false;
              result.push({ start: start % count, end: (end - 1) % count, loop });
              start = last = cur.stop ? end : null;
            }
          } else {
            last = end;
            if (prev.skip) {
              start = end;
            }
          }
          prev = cur;
        }
        if (last !== null) {
          result.push({ start: start % count, end: last % count, loop });
        }
        return result;
      }
      function _computeSegments(line, segmentOptions) {
        const points = line.points;
        const spanGaps = line.options.spanGaps;
        const count = points.length;
        if (!count) {
          return [];
        }
        const loop = !!line._loop;
        const { start, end } = findStartAndEnd(points, count, loop, spanGaps);
        if (spanGaps === true) {
          return splitByStyles(line, [{ start, end, loop }], points, segmentOptions);
        }
        const max = end < start ? end + count : end;
        const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
        return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
      }
      function splitByStyles(line, segments, points, segmentOptions) {
        if (!segmentOptions || !segmentOptions.setContext || !points) {
          return segments;
        }
        return doSplitByStyles(line, segments, points, segmentOptions);
      }
      function doSplitByStyles(line, segments, points, segmentOptions) {
        const chartContext = line._chart.getContext();
        const baseStyle = readStyle(line.options);
        const { _datasetIndex: datasetIndex, options: { spanGaps } } = line;
        const count = points.length;
        const result = [];
        let prevStyle = baseStyle;
        let start = segments[0].start;
        let i2 = start;
        function addStyle(s3, e2, l, st) {
          const dir = spanGaps ? -1 : 1;
          if (s3 === e2) {
            return;
          }
          s3 += count;
          while (points[s3 % count].skip) {
            s3 -= dir;
          }
          while (points[e2 % count].skip) {
            e2 += dir;
          }
          if (s3 % count !== e2 % count) {
            result.push({ start: s3 % count, end: e2 % count, loop: l, style: st });
            prevStyle = st;
            start = e2 % count;
          }
        }
        for (const segment of segments) {
          start = spanGaps ? start : segment.start;
          let prev = points[start % count];
          let style;
          for (i2 = start + 1; i2 <= segment.end; i2++) {
            const pt = points[i2 % count];
            style = readStyle(segmentOptions.setContext(createContext(chartContext, {
              type: "segment",
              p0: prev,
              p1: pt,
              p0DataIndex: (i2 - 1) % count,
              p1DataIndex: i2 % count,
              datasetIndex
            })));
            if (styleChanged(style, prevStyle)) {
              addStyle(start, i2 - 1, segment.loop, prevStyle);
            }
            prev = pt;
            prevStyle = style;
          }
          if (start < i2 - 1) {
            addStyle(start, i2 - 1, segment.loop, prevStyle);
          }
        }
        return result;
      }
      function readStyle(options) {
        return {
          backgroundColor: options.backgroundColor,
          borderCapStyle: options.borderCapStyle,
          borderDash: options.borderDash,
          borderDashOffset: options.borderDashOffset,
          borderJoinStyle: options.borderJoinStyle,
          borderWidth: options.borderWidth,
          borderColor: options.borderColor
        };
      }
      function styleChanged(style, prevStyle) {
        return prevStyle && JSON.stringify(style) !== JSON.stringify(prevStyle);
      }
      var helpers = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        easingEffects: effects,
        color,
        getHoverColor,
        noop: noop3,
        uid,
        isNullOrUndef,
        isArray,
        isObject,
        isFinite: isNumberFinite,
        finiteOrDefault,
        valueOrDefault,
        toPercentage,
        toDimension,
        callback,
        each,
        _elementsEqual,
        clone: clone2,
        _merger,
        merge,
        mergeIf,
        _mergerIf,
        _deprecated,
        resolveObjectKey,
        _capitalize,
        defined,
        isFunction,
        setsEqual,
        _isClickEvent,
        toFontString,
        _measureText,
        _longestText,
        _alignPixel,
        clearCanvas,
        drawPoint,
        _isPointInArea,
        clipArea,
        unclipArea,
        _steppedLineTo,
        _bezierCurveTo,
        renderText,
        addRoundedRectPath,
        _lookup,
        _lookupByKey,
        _rlookupByKey,
        _filterBetween,
        listenArrayEvents,
        unlistenArrayEvents,
        _arrayUnique,
        _createResolver,
        _attachContext,
        _descriptors,
        splineCurve,
        splineCurveMonotone,
        _updateBezierControlPoints,
        _isDomSupported,
        _getParentNode,
        getStyle,
        getRelativePosition: getRelativePosition$1,
        getMaximumSize,
        retinaScale,
        supportsEventListenerOptions,
        readUsedSize,
        fontString,
        requestAnimFrame,
        throttled,
        debounce,
        _toLeftRightCenter,
        _alignStartEnd,
        _textX,
        _pointInLine,
        _steppedInterpolation,
        _bezierInterpolation,
        formatNumber,
        toLineHeight,
        _readValueToProps,
        toTRBL,
        toTRBLCorners,
        toPadding,
        toFont,
        resolve: resolve2,
        _addGrace,
        createContext,
        PI,
        TAU,
        PITAU,
        INFINITY,
        RAD_PER_DEG,
        HALF_PI,
        QUARTER_PI,
        TWO_THIRDS_PI,
        log10,
        sign,
        niceNum,
        _factorize,
        isNumber,
        almostEquals,
        almostWhole,
        _setMinAndMaxByKey,
        toRadians,
        toDegrees,
        _decimalPlaces,
        getAngleFromPoint,
        distanceBetweenPoints,
        _angleDiff,
        _normalizeAngle,
        _angleBetween,
        _limitValue,
        _int16Range,
        _isBetween,
        getRtlAdapter,
        overrideTextDirection,
        restoreTextDirection,
        _boundSegment,
        _boundSegments,
        _computeSegments
      });
      class BasePlatform {
        acquireContext(canvas, aspectRatio) {
        }
        releaseContext(context) {
          return false;
        }
        addEventListener(chart, type, listener) {
        }
        removeEventListener(chart, type, listener) {
        }
        getDevicePixelRatio() {
          return 1;
        }
        getMaximumSize(element, width, height, aspectRatio) {
          width = Math.max(0, width || element.width);
          height = height || element.height;
          return {
            width,
            height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
          };
        }
        isAttached(canvas) {
          return true;
        }
        updateConfig(config) {
        }
      }
      class BasicPlatform extends BasePlatform {
        acquireContext(item) {
          return item && item.getContext && item.getContext("2d") || null;
        }
        updateConfig(config) {
          config.options.animation = false;
        }
      }
      const EXPANDO_KEY = "$chartjs";
      const EVENT_TYPES = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
      };
      const isNullOrEmpty = (value) => value === null || value === "";
      function initCanvas(canvas, aspectRatio) {
        const style = canvas.style;
        const renderHeight = canvas.getAttribute("height");
        const renderWidth = canvas.getAttribute("width");
        canvas[EXPANDO_KEY] = {
          initial: {
            height: renderHeight,
            width: renderWidth,
            style: {
              display: style.display,
              height: style.height,
              width: style.width
            }
          }
        };
        style.display = style.display || "block";
        style.boxSizing = style.boxSizing || "border-box";
        if (isNullOrEmpty(renderWidth)) {
          const displayWidth = readUsedSize(canvas, "width");
          if (displayWidth !== void 0) {
            canvas.width = displayWidth;
          }
        }
        if (isNullOrEmpty(renderHeight)) {
          if (canvas.style.height === "") {
            canvas.height = canvas.width / (aspectRatio || 2);
          } else {
            const displayHeight = readUsedSize(canvas, "height");
            if (displayHeight !== void 0) {
              canvas.height = displayHeight;
            }
          }
        }
        return canvas;
      }
      const eventListenerOptions = supportsEventListenerOptions ? { passive: true } : false;
      function addListener(node, type, listener) {
        node.addEventListener(type, listener, eventListenerOptions);
      }
      function removeListener(chart, type, listener) {
        chart.canvas.removeEventListener(type, listener, eventListenerOptions);
      }
      function fromNativeEvent(event, chart) {
        const type = EVENT_TYPES[event.type] || event.type;
        const { x: x2, y } = getRelativePosition$1(event, chart);
        return {
          type,
          chart,
          native: event,
          x: x2 !== void 0 ? x2 : null,
          y: y !== void 0 ? y : null
        };
      }
      function nodeListContains(nodeList, canvas) {
        for (const node of nodeList) {
          if (node === canvas || node.contains(canvas)) {
            return true;
          }
        }
      }
      function createAttachObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const observer = new MutationObserver((entries) => {
          let trigger = false;
          for (const entry4 of entries) {
            trigger = trigger || nodeListContains(entry4.addedNodes, canvas);
            trigger = trigger && !nodeListContains(entry4.removedNodes, canvas);
          }
          if (trigger) {
            listener();
          }
        });
        observer.observe(document, { childList: true, subtree: true });
        return observer;
      }
      function createDetachObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const observer = new MutationObserver((entries) => {
          let trigger = false;
          for (const entry4 of entries) {
            trigger = trigger || nodeListContains(entry4.removedNodes, canvas);
            trigger = trigger && !nodeListContains(entry4.addedNodes, canvas);
          }
          if (trigger) {
            listener();
          }
        });
        observer.observe(document, { childList: true, subtree: true });
        return observer;
      }
      const drpListeningCharts = /* @__PURE__ */ new Map();
      let oldDevicePixelRatio = 0;
      function onWindowResize() {
        const dpr = window.devicePixelRatio;
        if (dpr === oldDevicePixelRatio) {
          return;
        }
        oldDevicePixelRatio = dpr;
        drpListeningCharts.forEach((resize, chart) => {
          if (chart.currentDevicePixelRatio !== dpr) {
            resize();
          }
        });
      }
      function listenDevicePixelRatioChanges(chart, resize) {
        if (!drpListeningCharts.size) {
          window.addEventListener("resize", onWindowResize);
        }
        drpListeningCharts.set(chart, resize);
      }
      function unlistenDevicePixelRatioChanges(chart) {
        drpListeningCharts.delete(chart);
        if (!drpListeningCharts.size) {
          window.removeEventListener("resize", onWindowResize);
        }
      }
      function createResizeObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const container = canvas && _getParentNode(canvas);
        if (!container) {
          return;
        }
        const resize = throttled((width, height) => {
          const w = container.clientWidth;
          listener(width, height);
          if (w < container.clientWidth) {
            listener();
          }
        }, window);
        const observer = new ResizeObserver((entries) => {
          const entry4 = entries[0];
          const width = entry4.contentRect.width;
          const height = entry4.contentRect.height;
          if (width === 0 && height === 0) {
            return;
          }
          resize(width, height);
        });
        observer.observe(container);
        listenDevicePixelRatioChanges(chart, resize);
        return observer;
      }
      function releaseObserver(chart, type, observer) {
        if (observer) {
          observer.disconnect();
        }
        if (type === "resize") {
          unlistenDevicePixelRatioChanges(chart);
        }
      }
      function createProxyAndListen(chart, type, listener) {
        const canvas = chart.canvas;
        const proxy = throttled((event) => {
          if (chart.ctx !== null) {
            listener(fromNativeEvent(event, chart));
          }
        }, chart, (args) => {
          const event = args[0];
          return [event, event.offsetX, event.offsetY];
        });
        addListener(canvas, type, proxy);
        return proxy;
      }
      class DomPlatform extends BasePlatform {
        acquireContext(canvas, aspectRatio) {
          const context = canvas && canvas.getContext && canvas.getContext("2d");
          if (context && context.canvas === canvas) {
            initCanvas(canvas, aspectRatio);
            return context;
          }
          return null;
        }
        releaseContext(context) {
          const canvas = context.canvas;
          if (!canvas[EXPANDO_KEY]) {
            return false;
          }
          const initial = canvas[EXPANDO_KEY].initial;
          ["height", "width"].forEach((prop) => {
            const value = initial[prop];
            if (isNullOrUndef(value)) {
              canvas.removeAttribute(prop);
            } else {
              canvas.setAttribute(prop, value);
            }
          });
          const style = initial.style || {};
          Object.keys(style).forEach((key2) => {
            canvas.style[key2] = style[key2];
          });
          canvas.width = canvas.width;
          delete canvas[EXPANDO_KEY];
          return true;
        }
        addEventListener(chart, type, listener) {
          this.removeEventListener(chart, type);
          const proxies = chart.$proxies || (chart.$proxies = {});
          const handlers = {
            attach: createAttachObserver,
            detach: createDetachObserver,
            resize: createResizeObserver
          };
          const handler = handlers[type] || createProxyAndListen;
          proxies[type] = handler(chart, type, listener);
        }
        removeEventListener(chart, type) {
          const proxies = chart.$proxies || (chart.$proxies = {});
          const proxy = proxies[type];
          if (!proxy) {
            return;
          }
          const handlers = {
            attach: releaseObserver,
            detach: releaseObserver,
            resize: releaseObserver
          };
          const handler = handlers[type] || removeListener;
          handler(chart, type, proxy);
          proxies[type] = void 0;
        }
        getDevicePixelRatio() {
          return window.devicePixelRatio;
        }
        getMaximumSize(canvas, width, height, aspectRatio) {
          return getMaximumSize(canvas, width, height, aspectRatio);
        }
        isAttached(canvas) {
          const container = _getParentNode(canvas);
          return !!(container && container.isConnected);
        }
      }
      function _detectPlatform(canvas) {
        if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
          return BasicPlatform;
        }
        return DomPlatform;
      }
      var platforms = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        _detectPlatform,
        BasePlatform,
        BasicPlatform,
        DomPlatform
      });
      const transparent = "transparent";
      const interpolators = {
        boolean(from, to, factor) {
          return factor > 0.5 ? to : from;
        },
        color(from, to, factor) {
          const c0 = color(from || transparent);
          const c1 = c0.valid && color(to || transparent);
          return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
        },
        number(from, to, factor) {
          return from + (to - from) * factor;
        }
      };
      class Animation {
        constructor(cfg, target, prop, to) {
          const currentValue = target[prop];
          to = resolve2([cfg.to, to, currentValue, cfg.from]);
          const from = resolve2([cfg.from, currentValue, to]);
          this._active = true;
          this._fn = cfg.fn || interpolators[cfg.type || typeof from];
          this._easing = effects[cfg.easing] || effects.linear;
          this._start = Math.floor(Date.now() + (cfg.delay || 0));
          this._duration = this._total = Math.floor(cfg.duration);
          this._loop = !!cfg.loop;
          this._target = target;
          this._prop = prop;
          this._from = from;
          this._to = to;
          this._promises = void 0;
        }
        active() {
          return this._active;
        }
        update(cfg, to, date) {
          if (this._active) {
            this._notify(false);
            const currentValue = this._target[this._prop];
            const elapsed = date - this._start;
            const remain = this._duration - elapsed;
            this._start = date;
            this._duration = Math.floor(Math.max(remain, cfg.duration));
            this._total += elapsed;
            this._loop = !!cfg.loop;
            this._to = resolve2([cfg.to, to, currentValue, cfg.from]);
            this._from = resolve2([cfg.from, currentValue, to]);
          }
        }
        cancel() {
          if (this._active) {
            this.tick(Date.now());
            this._active = false;
            this._notify(false);
          }
        }
        tick(date) {
          const elapsed = date - this._start;
          const duration = this._duration;
          const prop = this._prop;
          const from = this._from;
          const loop = this._loop;
          const to = this._to;
          let factor;
          this._active = from !== to && (loop || elapsed < duration);
          if (!this._active) {
            this._target[prop] = to;
            this._notify(true);
            return;
          }
          if (elapsed < 0) {
            this._target[prop] = from;
            return;
          }
          factor = elapsed / duration % 2;
          factor = loop && factor > 1 ? 2 - factor : factor;
          factor = this._easing(Math.min(1, Math.max(0, factor)));
          this._target[prop] = this._fn(from, to, factor);
        }
        wait() {
          const promises = this._promises || (this._promises = []);
          return new Promise((res, rej) => {
            promises.push({ res, rej });
          });
        }
        _notify(resolved) {
          const method = resolved ? "res" : "rej";
          const promises = this._promises || [];
          for (let i2 = 0; i2 < promises.length; i2++) {
            promises[i2][method]();
          }
        }
      }
      const numbers = ["x", "y", "borderWidth", "radius", "tension"];
      const colors = ["color", "borderColor", "backgroundColor"];
      defaults.set("animation", {
        delay: void 0,
        duration: 1e3,
        easing: "easeOutQuart",
        fn: void 0,
        from: void 0,
        loop: void 0,
        to: void 0,
        type: void 0
      });
      const animationOptions = Object.keys(defaults.animation);
      defaults.describe("animation", {
        _fallback: false,
        _indexable: false,
        _scriptable: (name) => name !== "onProgress" && name !== "onComplete" && name !== "fn"
      });
      defaults.set("animations", {
        colors: {
          type: "color",
          properties: colors
        },
        numbers: {
          type: "number",
          properties: numbers
        }
      });
      defaults.describe("animations", {
        _fallback: "animation"
      });
      defaults.set("transitions", {
        active: {
          animation: {
            duration: 400
          }
        },
        resize: {
          animation: {
            duration: 0
          }
        },
        show: {
          animations: {
            colors: {
              from: "transparent"
            },
            visible: {
              type: "boolean",
              duration: 0
            }
          }
        },
        hide: {
          animations: {
            colors: {
              to: "transparent"
            },
            visible: {
              type: "boolean",
              easing: "linear",
              fn: (v) => v | 0
            }
          }
        }
      });
      class Animations {
        constructor(chart, config) {
          this._chart = chart;
          this._properties = /* @__PURE__ */ new Map();
          this.configure(config);
        }
        configure(config) {
          if (!isObject(config)) {
            return;
          }
          const animatedProps = this._properties;
          Object.getOwnPropertyNames(config).forEach((key2) => {
            const cfg = config[key2];
            if (!isObject(cfg)) {
              return;
            }
            const resolved = {};
            for (const option of animationOptions) {
              resolved[option] = cfg[option];
            }
            (isArray(cfg.properties) && cfg.properties || [key2]).forEach((prop) => {
              if (prop === key2 || !animatedProps.has(prop)) {
                animatedProps.set(prop, resolved);
              }
            });
          });
        }
        _animateOptions(target, values) {
          const newOptions = values.options;
          const options = resolveTargetOptions(target, newOptions);
          if (!options) {
            return [];
          }
          const animations = this._createAnimations(options, newOptions);
          if (newOptions.$shared) {
            awaitAll(target.options.$animations, newOptions).then(() => {
              target.options = newOptions;
            }, () => {
            });
          }
          return animations;
        }
        _createAnimations(target, values) {
          const animatedProps = this._properties;
          const animations = [];
          const running = target.$animations || (target.$animations = {});
          const props = Object.keys(values);
          const date = Date.now();
          let i2;
          for (i2 = props.length - 1; i2 >= 0; --i2) {
            const prop = props[i2];
            if (prop.charAt(0) === "$") {
              continue;
            }
            if (prop === "options") {
              animations.push(...this._animateOptions(target, values));
              continue;
            }
            const value = values[prop];
            let animation = running[prop];
            const cfg = animatedProps.get(prop);
            if (animation) {
              if (cfg && animation.active()) {
                animation.update(cfg, value, date);
                continue;
              } else {
                animation.cancel();
              }
            }
            if (!cfg || !cfg.duration) {
              target[prop] = value;
              continue;
            }
            running[prop] = animation = new Animation(cfg, target, prop, value);
            animations.push(animation);
          }
          return animations;
        }
        update(target, values) {
          if (this._properties.size === 0) {
            Object.assign(target, values);
            return;
          }
          const animations = this._createAnimations(target, values);
          if (animations.length) {
            animator.add(this._chart, animations);
            return true;
          }
        }
      }
      function awaitAll(animations, properties) {
        const running = [];
        const keys = Object.keys(properties);
        for (let i2 = 0; i2 < keys.length; i2++) {
          const anim = animations[keys[i2]];
          if (anim && anim.active()) {
            running.push(anim.wait());
          }
        }
        return Promise.all(running);
      }
      function resolveTargetOptions(target, newOptions) {
        if (!newOptions) {
          return;
        }
        let options = target.options;
        if (!options) {
          target.options = newOptions;
          return;
        }
        if (options.$shared) {
          target.options = options = Object.assign({}, options, { $shared: false, $animations: {} });
        }
        return options;
      }
      function scaleClip(scale, allowedOverflow) {
        const opts = scale && scale.options || {};
        const reverse = opts.reverse;
        const min = opts.min === void 0 ? allowedOverflow : 0;
        const max = opts.max === void 0 ? allowedOverflow : 0;
        return {
          start: reverse ? max : min,
          end: reverse ? min : max
        };
      }
      function defaultClip(xScale, yScale, allowedOverflow) {
        if (allowedOverflow === false) {
          return false;
        }
        const x2 = scaleClip(xScale, allowedOverflow);
        const y = scaleClip(yScale, allowedOverflow);
        return {
          top: y.end,
          right: x2.end,
          bottom: y.start,
          left: x2.start
        };
      }
      function toClip(value) {
        let t2, r2, b, l;
        if (isObject(value)) {
          t2 = value.top;
          r2 = value.right;
          b = value.bottom;
          l = value.left;
        } else {
          t2 = r2 = b = l = value;
        }
        return {
          top: t2,
          right: r2,
          bottom: b,
          left: l,
          disabled: value === false
        };
      }
      function getSortedDatasetIndices(chart, filterVisible) {
        const keys = [];
        const metasets = chart._getSortedDatasetMetas(filterVisible);
        let i2, ilen;
        for (i2 = 0, ilen = metasets.length; i2 < ilen; ++i2) {
          keys.push(metasets[i2].index);
        }
        return keys;
      }
      function applyStack(stack, value, dsIndex, options = {}) {
        const keys = stack.keys;
        const singleMode = options.mode === "single";
        let i2, ilen, datasetIndex, otherValue;
        if (value === null) {
          return;
        }
        for (i2 = 0, ilen = keys.length; i2 < ilen; ++i2) {
          datasetIndex = +keys[i2];
          if (datasetIndex === dsIndex) {
            if (options.all) {
              continue;
            }
            break;
          }
          otherValue = stack.values[datasetIndex];
          if (isNumberFinite(otherValue) && (singleMode || (value === 0 || sign(value) === sign(otherValue)))) {
            value += otherValue;
          }
        }
        return value;
      }
      function convertObjectDataToArray(data) {
        const keys = Object.keys(data);
        const adata = new Array(keys.length);
        let i2, ilen, key2;
        for (i2 = 0, ilen = keys.length; i2 < ilen; ++i2) {
          key2 = keys[i2];
          adata[i2] = {
            x: key2,
            y: data[key2]
          };
        }
        return adata;
      }
      function isStacked(scale, meta) {
        const stacked = scale && scale.options.stacked;
        return stacked || stacked === void 0 && meta.stack !== void 0;
      }
      function getStackKey(indexScale, valueScale, meta) {
        return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
      }
      function getUserBounds(scale) {
        const { min, max, minDefined, maxDefined } = scale.getUserBounds();
        return {
          min: minDefined ? min : Number.NEGATIVE_INFINITY,
          max: maxDefined ? max : Number.POSITIVE_INFINITY
        };
      }
      function getOrCreateStack(stacks, stackKey, indexValue) {
        const subStack = stacks[stackKey] || (stacks[stackKey] = {});
        return subStack[indexValue] || (subStack[indexValue] = {});
      }
      function getLastIndexInStack(stack, vScale, positive, type) {
        for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
          const value = stack[meta.index];
          if (positive && value > 0 || !positive && value < 0) {
            return meta.index;
          }
        }
        return null;
      }
      function updateStacks(controller, parsed) {
        const { chart, _cachedMeta: meta } = controller;
        const stacks = chart._stacks || (chart._stacks = {});
        const { iScale, vScale, index: datasetIndex } = meta;
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const key2 = getStackKey(iScale, vScale, meta);
        const ilen = parsed.length;
        let stack;
        for (let i2 = 0; i2 < ilen; ++i2) {
          const item = parsed[i2];
          const { [iAxis]: index, [vAxis]: value } = item;
          const itemStacks = item._stacks || (item._stacks = {});
          stack = itemStacks[vAxis] = getOrCreateStack(stacks, key2, index);
          stack[datasetIndex] = value;
          stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
          stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
        }
      }
      function getFirstScaleId(chart, axis) {
        const scales2 = chart.scales;
        return Object.keys(scales2).filter((key2) => scales2[key2].axis === axis).shift();
      }
      function createDatasetContext(parent, index) {
        return createContext(parent, {
          active: false,
          dataset: void 0,
          datasetIndex: index,
          index,
          mode: "default",
          type: "dataset"
        });
      }
      function createDataContext(parent, index, element) {
        return createContext(parent, {
          active: false,
          dataIndex: index,
          parsed: void 0,
          raw: void 0,
          element,
          index,
          mode: "default",
          type: "data"
        });
      }
      function clearStacks(meta, items) {
        const datasetIndex = meta.controller.index;
        const axis = meta.vScale && meta.vScale.axis;
        if (!axis) {
          return;
        }
        items = items || meta._parsed;
        for (const parsed of items) {
          const stacks = parsed._stacks;
          if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) {
            return;
          }
          delete stacks[axis][datasetIndex];
        }
      }
      const isDirectUpdateMode = (mode) => mode === "reset" || mode === "none";
      const cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
      const createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && { keys: getSortedDatasetIndices(chart, true), values: null };
      class DatasetController {
        constructor(chart, datasetIndex) {
          this.chart = chart;
          this._ctx = chart.ctx;
          this.index = datasetIndex;
          this._cachedDataOpts = {};
          this._cachedMeta = this.getMeta();
          this._type = this._cachedMeta.type;
          this.options = void 0;
          this._parsing = false;
          this._data = void 0;
          this._objectData = void 0;
          this._sharedOptions = void 0;
          this._drawStart = void 0;
          this._drawCount = void 0;
          this.enableOptionSharing = false;
          this.$context = void 0;
          this._syncList = [];
          this.initialize();
        }
        initialize() {
          const meta = this._cachedMeta;
          this.configure();
          this.linkScales();
          meta._stacked = isStacked(meta.vScale, meta);
          this.addElements();
        }
        updateIndex(datasetIndex) {
          if (this.index !== datasetIndex) {
            clearStacks(this._cachedMeta);
          }
          this.index = datasetIndex;
        }
        linkScales() {
          const chart = this.chart;
          const meta = this._cachedMeta;
          const dataset = this.getDataset();
          const chooseId = (axis, x2, y, r2) => axis === "x" ? x2 : axis === "r" ? r2 : y;
          const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
          const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
          const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
          const indexAxis = meta.indexAxis;
          const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
          const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
          meta.xScale = this.getScaleForId(xid);
          meta.yScale = this.getScaleForId(yid);
          meta.rScale = this.getScaleForId(rid);
          meta.iScale = this.getScaleForId(iid);
          meta.vScale = this.getScaleForId(vid);
        }
        getDataset() {
          return this.chart.data.datasets[this.index];
        }
        getMeta() {
          return this.chart.getDatasetMeta(this.index);
        }
        getScaleForId(scaleID) {
          return this.chart.scales[scaleID];
        }
        _getOtherScale(scale) {
          const meta = this._cachedMeta;
          return scale === meta.iScale ? meta.vScale : meta.iScale;
        }
        reset() {
          this._update("reset");
        }
        _destroy() {
          const meta = this._cachedMeta;
          if (this._data) {
            unlistenArrayEvents(this._data, this);
          }
          if (meta._stacked) {
            clearStacks(meta);
          }
        }
        _dataCheck() {
          const dataset = this.getDataset();
          const data = dataset.data || (dataset.data = []);
          const _data = this._data;
          if (isObject(data)) {
            this._data = convertObjectDataToArray(data);
          } else if (_data !== data) {
            if (_data) {
              unlistenArrayEvents(_data, this);
              const meta = this._cachedMeta;
              clearStacks(meta);
              meta._parsed = [];
            }
            if (data && Object.isExtensible(data)) {
              listenArrayEvents(data, this);
            }
            this._syncList = [];
            this._data = data;
          }
        }
        addElements() {
          const meta = this._cachedMeta;
          this._dataCheck();
          if (this.datasetElementType) {
            meta.dataset = new this.datasetElementType();
          }
        }
        buildOrUpdateElements(resetNewElements) {
          const meta = this._cachedMeta;
          const dataset = this.getDataset();
          let stackChanged = false;
          this._dataCheck();
          const oldStacked = meta._stacked;
          meta._stacked = isStacked(meta.vScale, meta);
          if (meta.stack !== dataset.stack) {
            stackChanged = true;
            clearStacks(meta);
            meta.stack = dataset.stack;
          }
          this._resyncElements(resetNewElements);
          if (stackChanged || oldStacked !== meta._stacked) {
            updateStacks(this, meta._parsed);
          }
        }
        configure() {
          const config = this.chart.config;
          const scopeKeys = config.datasetScopeKeys(this._type);
          const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
          this.options = config.createResolver(scopes, this.getContext());
          this._parsing = this.options.parsing;
          this._cachedDataOpts = {};
        }
        parse(start, count) {
          const { _cachedMeta: meta, _data: data } = this;
          const { iScale, _stacked } = meta;
          const iAxis = iScale.axis;
          let sorted = start === 0 && count === data.length ? true : meta._sorted;
          let prev = start > 0 && meta._parsed[start - 1];
          let i2, cur, parsed;
          if (this._parsing === false) {
            meta._parsed = data;
            meta._sorted = true;
            parsed = data;
          } else {
            if (isArray(data[start])) {
              parsed = this.parseArrayData(meta, data, start, count);
            } else if (isObject(data[start])) {
              parsed = this.parseObjectData(meta, data, start, count);
            } else {
              parsed = this.parsePrimitiveData(meta, data, start, count);
            }
            const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
            for (i2 = 0; i2 < count; ++i2) {
              meta._parsed[i2 + start] = cur = parsed[i2];
              if (sorted) {
                if (isNotInOrderComparedToPrev()) {
                  sorted = false;
                }
                prev = cur;
              }
            }
            meta._sorted = sorted;
          }
          if (_stacked) {
            updateStacks(this, parsed);
          }
        }
        parsePrimitiveData(meta, data, start, count) {
          const { iScale, vScale } = meta;
          const iAxis = iScale.axis;
          const vAxis = vScale.axis;
          const labels = iScale.getLabels();
          const singleScale = iScale === vScale;
          const parsed = new Array(count);
          let i2, ilen, index;
          for (i2 = 0, ilen = count; i2 < ilen; ++i2) {
            index = i2 + start;
            parsed[i2] = {
              [iAxis]: singleScale || iScale.parse(labels[index], index),
              [vAxis]: vScale.parse(data[index], index)
            };
          }
          return parsed;
        }
        parseArrayData(meta, data, start, count) {
          const { xScale, yScale } = meta;
          const parsed = new Array(count);
          let i2, ilen, index, item;
          for (i2 = 0, ilen = count; i2 < ilen; ++i2) {
            index = i2 + start;
            item = data[index];
            parsed[i2] = {
              x: xScale.parse(item[0], index),
              y: yScale.parse(item[1], index)
            };
          }
          return parsed;
        }
        parseObjectData(meta, data, start, count) {
          const { xScale, yScale } = meta;
          const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
          const parsed = new Array(count);
          let i2, ilen, index, item;
          for (i2 = 0, ilen = count; i2 < ilen; ++i2) {
            index = i2 + start;
            item = data[index];
            parsed[i2] = {
              x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
              y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
            };
          }
          return parsed;
        }
        getParsed(index) {
          return this._cachedMeta._parsed[index];
        }
        getDataElement(index) {
          return this._cachedMeta.data[index];
        }
        applyStack(scale, parsed, mode) {
          const chart = this.chart;
          const meta = this._cachedMeta;
          const value = parsed[scale.axis];
          const stack = {
            keys: getSortedDatasetIndices(chart, true),
            values: parsed._stacks[scale.axis]
          };
          return applyStack(stack, value, meta.index, { mode });
        }
        updateRangeFromParsed(range, scale, parsed, stack) {
          const parsedValue = parsed[scale.axis];
          let value = parsedValue === null ? NaN : parsedValue;
          const values = stack && parsed._stacks[scale.axis];
          if (stack && values) {
            stack.values = values;
            value = applyStack(stack, parsedValue, this._cachedMeta.index);
          }
          range.min = Math.min(range.min, value);
          range.max = Math.max(range.max, value);
        }
        getMinMax(scale, canStack) {
          const meta = this._cachedMeta;
          const _parsed = meta._parsed;
          const sorted = meta._sorted && scale === meta.iScale;
          const ilen = _parsed.length;
          const otherScale = this._getOtherScale(scale);
          const stack = createStack(canStack, meta, this.chart);
          const range = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
          const { min: otherMin, max: otherMax } = getUserBounds(otherScale);
          let i2, parsed;
          function _skip() {
            parsed = _parsed[i2];
            const otherValue = parsed[otherScale.axis];
            return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
          }
          for (i2 = 0; i2 < ilen; ++i2) {
            if (_skip()) {
              continue;
            }
            this.updateRangeFromParsed(range, scale, parsed, stack);
            if (sorted) {
              break;
            }
          }
          if (sorted) {
            for (i2 = ilen - 1; i2 >= 0; --i2) {
              if (_skip()) {
                continue;
              }
              this.updateRangeFromParsed(range, scale, parsed, stack);
              break;
            }
          }
          return range;
        }
        getAllParsedValues(scale) {
          const parsed = this._cachedMeta._parsed;
          const values = [];
          let i2, ilen, value;
          for (i2 = 0, ilen = parsed.length; i2 < ilen; ++i2) {
            value = parsed[i2][scale.axis];
            if (isNumberFinite(value)) {
              values.push(value);
            }
          }
          return values;
        }
        getMaxOverflow() {
          return false;
        }
        getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const iScale = meta.iScale;
          const vScale = meta.vScale;
          const parsed = this.getParsed(index);
          return {
            label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
            value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
          };
        }
        _update(mode) {
          const meta = this._cachedMeta;
          this.update(mode || "default");
          meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
        }
        update(mode) {
        }
        draw() {
          const ctx = this._ctx;
          const chart = this.chart;
          const meta = this._cachedMeta;
          const elements2 = meta.data || [];
          const area = chart.chartArea;
          const active = [];
          const start = this._drawStart || 0;
          const count = this._drawCount || elements2.length - start;
          const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
          let i2;
          if (meta.dataset) {
            meta.dataset.draw(ctx, area, start, count);
          }
          for (i2 = start; i2 < start + count; ++i2) {
            const element = elements2[i2];
            if (element.hidden) {
              continue;
            }
            if (element.active && drawActiveElementsOnTop) {
              active.push(element);
            } else {
              element.draw(ctx, area);
            }
          }
          for (i2 = 0; i2 < active.length; ++i2) {
            active[i2].draw(ctx, area);
          }
        }
        getStyle(index, active) {
          const mode = active ? "active" : "default";
          return index === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
        }
        getContext(index, active, mode) {
          const dataset = this.getDataset();
          let context;
          if (index >= 0 && index < this._cachedMeta.data.length) {
            const element = this._cachedMeta.data[index];
            context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
            context.parsed = this.getParsed(index);
            context.raw = dataset.data[index];
            context.index = context.dataIndex = index;
          } else {
            context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
            context.dataset = dataset;
            context.index = context.datasetIndex = this.index;
          }
          context.active = !!active;
          context.mode = mode;
          return context;
        }
        resolveDatasetElementOptions(mode) {
          return this._resolveElementOptions(this.datasetElementType.id, mode);
        }
        resolveDataElementOptions(index, mode) {
          return this._resolveElementOptions(this.dataElementType.id, mode, index);
        }
        _resolveElementOptions(elementType, mode = "default", index) {
          const active = mode === "active";
          const cache = this._cachedDataOpts;
          const cacheKey = elementType + "-" + mode;
          const cached = cache[cacheKey];
          const sharing = this.enableOptionSharing && defined(index);
          if (cached) {
            return cloneIfNotShared(cached, sharing);
          }
          const config = this.chart.config;
          const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
          const prefixes = active ? [`${elementType}Hover`, "hover", elementType, ""] : [elementType, ""];
          const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
          const names2 = Object.keys(defaults.elements[elementType]);
          const context = () => this.getContext(index, active);
          const values = config.resolveNamedOptions(scopes, names2, context, prefixes);
          if (values.$shared) {
            values.$shared = sharing;
            cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
          }
          return values;
        }
        _resolveAnimations(index, transition, active) {
          const chart = this.chart;
          const cache = this._cachedDataOpts;
          const cacheKey = `animation-${transition}`;
          const cached = cache[cacheKey];
          if (cached) {
            return cached;
          }
          let options;
          if (chart.options.animation !== false) {
            const config = this.chart.config;
            const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
            const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
            options = config.createResolver(scopes, this.getContext(index, active, transition));
          }
          const animations = new Animations(chart, options && options.animations);
          if (options && options._cacheable) {
            cache[cacheKey] = Object.freeze(animations);
          }
          return animations;
        }
        getSharedOptions(options) {
          if (!options.$shared) {
            return;
          }
          return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
        }
        includeOptions(mode, sharedOptions) {
          return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
        }
        updateElement(element, index, properties, mode) {
          if (isDirectUpdateMode(mode)) {
            Object.assign(element, properties);
          } else {
            this._resolveAnimations(index, mode).update(element, properties);
          }
        }
        updateSharedOptions(sharedOptions, mode, newOptions) {
          if (sharedOptions && !isDirectUpdateMode(mode)) {
            this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
          }
        }
        _setStyle(element, index, mode, active) {
          element.active = active;
          const options = this.getStyle(index, active);
          this._resolveAnimations(index, mode, active).update(element, {
            options: !active && this.getSharedOptions(options) || options
          });
        }
        removeHoverStyle(element, datasetIndex, index) {
          this._setStyle(element, index, "active", false);
        }
        setHoverStyle(element, datasetIndex, index) {
          this._setStyle(element, index, "active", true);
        }
        _removeDatasetHoverStyle() {
          const element = this._cachedMeta.dataset;
          if (element) {
            this._setStyle(element, void 0, "active", false);
          }
        }
        _setDatasetHoverStyle() {
          const element = this._cachedMeta.dataset;
          if (element) {
            this._setStyle(element, void 0, "active", true);
          }
        }
        _resyncElements(resetNewElements) {
          const data = this._data;
          const elements2 = this._cachedMeta.data;
          for (const [method, arg1, arg2] of this._syncList) {
            this[method](arg1, arg2);
          }
          this._syncList = [];
          const numMeta = elements2.length;
          const numData = data.length;
          const count = Math.min(numData, numMeta);
          if (count) {
            this.parse(0, count);
          }
          if (numData > numMeta) {
            this._insertElements(numMeta, numData - numMeta, resetNewElements);
          } else if (numData < numMeta) {
            this._removeElements(numData, numMeta - numData);
          }
        }
        _insertElements(start, count, resetNewElements = true) {
          const meta = this._cachedMeta;
          const data = meta.data;
          const end = start + count;
          let i2;
          const move = (arr) => {
            arr.length += count;
            for (i2 = arr.length - 1; i2 >= end; i2--) {
              arr[i2] = arr[i2 - count];
            }
          };
          move(data);
          for (i2 = start; i2 < end; ++i2) {
            data[i2] = new this.dataElementType();
          }
          if (this._parsing) {
            move(meta._parsed);
          }
          this.parse(start, count);
          if (resetNewElements) {
            this.updateElements(data, start, count, "reset");
          }
        }
        updateElements(element, start, count, mode) {
        }
        _removeElements(start, count) {
          const meta = this._cachedMeta;
          if (this._parsing) {
            const removed = meta._parsed.splice(start, count);
            if (meta._stacked) {
              clearStacks(meta, removed);
            }
          }
          meta.data.splice(start, count);
        }
        _sync(args) {
          if (this._parsing) {
            this._syncList.push(args);
          } else {
            const [method, arg1, arg2] = args;
            this[method](arg1, arg2);
          }
          this.chart._dataChanges.push([this.index, ...args]);
        }
        _onDataPush() {
          const count = arguments.length;
          this._sync(["_insertElements", this.getDataset().data.length - count, count]);
        }
        _onDataPop() {
          this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
        }
        _onDataShift() {
          this._sync(["_removeElements", 0, 1]);
        }
        _onDataSplice(start, count) {
          if (count) {
            this._sync(["_removeElements", start, count]);
          }
          const newCount = arguments.length - 2;
          if (newCount) {
            this._sync(["_insertElements", start, newCount]);
          }
        }
        _onDataUnshift() {
          this._sync(["_insertElements", 0, arguments.length]);
        }
      }
      DatasetController.defaults = {};
      DatasetController.prototype.datasetElementType = null;
      DatasetController.prototype.dataElementType = null;
      class Element {
        constructor() {
          this.x = void 0;
          this.y = void 0;
          this.active = false;
          this.options = void 0;
          this.$animations = void 0;
        }
        tooltipPosition(useFinalPosition) {
          const { x: x2, y } = this.getProps(["x", "y"], useFinalPosition);
          return { x: x2, y };
        }
        hasValue() {
          return isNumber(this.x) && isNumber(this.y);
        }
        getProps(props, final) {
          const anims = this.$animations;
          if (!final || !anims) {
            return this;
          }
          const ret = {};
          props.forEach((prop) => {
            ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
          });
          return ret;
        }
      }
      Element.defaults = {};
      Element.defaultRoutes = void 0;
      const formatters = {
        values(value) {
          return isArray(value) ? value : "" + value;
        },
        numeric(tickValue, index, ticks) {
          if (tickValue === 0) {
            return "0";
          }
          const locale = this.chart.options.locale;
          let notation;
          let delta = tickValue;
          if (ticks.length > 1) {
            const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
            if (maxTick < 1e-4 || maxTick > 1e15) {
              notation = "scientific";
            }
            delta = calculateDelta(tickValue, ticks);
          }
          const logDelta = log10(Math.abs(delta));
          const numDecimal = Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
          const options = { notation, minimumFractionDigits: numDecimal, maximumFractionDigits: numDecimal };
          Object.assign(options, this.options.ticks.format);
          return formatNumber(tickValue, locale, options);
        },
        logarithmic(tickValue, index, ticks) {
          if (tickValue === 0) {
            return "0";
          }
          const remain = tickValue / Math.pow(10, Math.floor(log10(tickValue)));
          if (remain === 1 || remain === 2 || remain === 5) {
            return formatters.numeric.call(this, tickValue, index, ticks);
          }
          return "";
        }
      };
      function calculateDelta(tickValue, ticks) {
        let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
        if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
          delta = tickValue - Math.floor(tickValue);
        }
        return delta;
      }
      var Ticks = { formatters };
      defaults.set("scale", {
        display: true,
        offset: false,
        reverse: false,
        beginAtZero: false,
        bounds: "ticks",
        grace: 0,
        grid: {
          display: true,
          lineWidth: 1,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          tickLength: 8,
          tickWidth: (_ctx, options) => options.lineWidth,
          tickColor: (_ctx, options) => options.color,
          offset: false,
          borderDash: [],
          borderDashOffset: 0,
          borderWidth: 1
        },
        title: {
          display: false,
          text: "",
          padding: {
            top: 4,
            bottom: 4
          }
        },
        ticks: {
          minRotation: 0,
          maxRotation: 50,
          mirror: false,
          textStrokeWidth: 0,
          textStrokeColor: "",
          padding: 3,
          display: true,
          autoSkip: true,
          autoSkipPadding: 3,
          labelOffset: 0,
          callback: Ticks.formatters.values,
          minor: {},
          major: {},
          align: "center",
          crossAlign: "near",
          showLabelBackdrop: false,
          backdropColor: "rgba(255, 255, 255, 0.75)",
          backdropPadding: 2
        }
      });
      defaults.route("scale.ticks", "color", "", "color");
      defaults.route("scale.grid", "color", "", "borderColor");
      defaults.route("scale.grid", "borderColor", "", "borderColor");
      defaults.route("scale.title", "color", "", "color");
      defaults.describe("scale", {
        _fallback: false,
        _scriptable: (name) => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
        _indexable: (name) => name !== "borderDash" && name !== "tickBorderDash"
      });
      defaults.describe("scales", {
        _fallback: "scale"
      });
      defaults.describe("scale.ticks", {
        _scriptable: (name) => name !== "backdropPadding" && name !== "callback",
        _indexable: (name) => name !== "backdropPadding"
      });
      function autoSkip(scale, ticks) {
        const tickOpts = scale.options.ticks;
        const ticksLimit = tickOpts.maxTicksLimit || determineMaxTicks(scale);
        const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
        const numMajorIndices = majorIndices.length;
        const first = majorIndices[0];
        const last = majorIndices[numMajorIndices - 1];
        const newTicks = [];
        if (numMajorIndices > ticksLimit) {
          skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
          return newTicks;
        }
        const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
        if (numMajorIndices > 0) {
          let i2, ilen;
          const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
          skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
          for (i2 = 0, ilen = numMajorIndices - 1; i2 < ilen; i2++) {
            skip(ticks, newTicks, spacing, majorIndices[i2], majorIndices[i2 + 1]);
          }
          skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
          return newTicks;
        }
        skip(ticks, newTicks, spacing);
        return newTicks;
      }
      function determineMaxTicks(scale) {
        const offset = scale.options.offset;
        const tickLength = scale._tickSize();
        const maxScale = scale._length / tickLength + (offset ? 0 : 1);
        const maxChart = scale._maxLength / tickLength;
        return Math.floor(Math.min(maxScale, maxChart));
      }
      function calculateSpacing(majorIndices, ticks, ticksLimit) {
        const evenMajorSpacing = getEvenSpacing(majorIndices);
        const spacing = ticks.length / ticksLimit;
        if (!evenMajorSpacing) {
          return Math.max(spacing, 1);
        }
        const factors = _factorize(evenMajorSpacing);
        for (let i2 = 0, ilen = factors.length - 1; i2 < ilen; i2++) {
          const factor = factors[i2];
          if (factor > spacing) {
            return factor;
          }
        }
        return Math.max(spacing, 1);
      }
      function getMajorIndices(ticks) {
        const result = [];
        let i2, ilen;
        for (i2 = 0, ilen = ticks.length; i2 < ilen; i2++) {
          if (ticks[i2].major) {
            result.push(i2);
          }
        }
        return result;
      }
      function skipMajors(ticks, newTicks, majorIndices, spacing) {
        let count = 0;
        let next = majorIndices[0];
        let i2;
        spacing = Math.ceil(spacing);
        for (i2 = 0; i2 < ticks.length; i2++) {
          if (i2 === next) {
            newTicks.push(ticks[i2]);
            count++;
            next = majorIndices[count * spacing];
          }
        }
      }
      function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
        const start = valueOrDefault(majorStart, 0);
        const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
        let count = 0;
        let length, i2, next;
        spacing = Math.ceil(spacing);
        if (majorEnd) {
          length = majorEnd - majorStart;
          spacing = length / Math.floor(length / spacing);
        }
        next = start;
        while (next < 0) {
          count++;
          next = Math.round(start + count * spacing);
        }
        for (i2 = Math.max(start, 0); i2 < end; i2++) {
          if (i2 === next) {
            newTicks.push(ticks[i2]);
            count++;
            next = Math.round(start + count * spacing);
          }
        }
      }
      function getEvenSpacing(arr) {
        const len = arr.length;
        let i2, diff;
        if (len < 2) {
          return false;
        }
        for (diff = arr[0], i2 = 1; i2 < len; ++i2) {
          if (arr[i2] - arr[i2 - 1] !== diff) {
            return false;
          }
        }
        return diff;
      }
      const reverseAlign = (align) => align === "left" ? "right" : align === "right" ? "left" : align;
      const offsetFromEdge = (scale, edge, offset) => edge === "top" || edge === "left" ? scale[edge] + offset : scale[edge] - offset;
      function sample(arr, numItems) {
        const result = [];
        const increment = arr.length / numItems;
        const len = arr.length;
        let i2 = 0;
        for (; i2 < len; i2 += increment) {
          result.push(arr[Math.floor(i2)]);
        }
        return result;
      }
      function getPixelForGridLine(scale, index, offsetGridLines) {
        const length = scale.ticks.length;
        const validIndex2 = Math.min(index, length - 1);
        const start = scale._startPixel;
        const end = scale._endPixel;
        const epsilon = 1e-6;
        let lineValue = scale.getPixelForTick(validIndex2);
        let offset;
        if (offsetGridLines) {
          if (length === 1) {
            offset = Math.max(lineValue - start, end - lineValue);
          } else if (index === 0) {
            offset = (scale.getPixelForTick(1) - lineValue) / 2;
          } else {
            offset = (lineValue - scale.getPixelForTick(validIndex2 - 1)) / 2;
          }
          lineValue += validIndex2 < index ? offset : -offset;
          if (lineValue < start - epsilon || lineValue > end + epsilon) {
            return;
          }
        }
        return lineValue;
      }
      function garbageCollect(caches, length) {
        each(caches, (cache) => {
          const gc = cache.gc;
          const gcLen = gc.length / 2;
          let i2;
          if (gcLen > length) {
            for (i2 = 0; i2 < gcLen; ++i2) {
              delete cache.data[gc[i2]];
            }
            gc.splice(0, gcLen);
          }
        });
      }
      function getTickMarkLength(options) {
        return options.drawTicks ? options.tickLength : 0;
      }
      function getTitleHeight(options, fallback) {
        if (!options.display) {
          return 0;
        }
        const font = toFont(options.font, fallback);
        const padding = toPadding(options.padding);
        const lines = isArray(options.text) ? options.text.length : 1;
        return lines * font.lineHeight + padding.height;
      }
      function createScaleContext(parent, scale) {
        return createContext(parent, {
          scale,
          type: "scale"
        });
      }
      function createTickContext(parent, index, tick) {
        return createContext(parent, {
          tick,
          index,
          type: "tick"
        });
      }
      function titleAlign(align, position, reverse) {
        let ret = _toLeftRightCenter(align);
        if (reverse && position !== "right" || !reverse && position === "right") {
          ret = reverseAlign(ret);
        }
        return ret;
      }
      function titleArgs(scale, offset, position, align) {
        const { top, left, bottom, right, chart } = scale;
        const { chartArea, scales: scales2 } = chart;
        let rotation = 0;
        let maxWidth, titleX, titleY;
        const height = bottom - top;
        const width = right - left;
        if (scale.isHorizontal()) {
          titleX = _alignStartEnd(align, left, right);
          if (isObject(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            titleY = scales2[positionAxisID].getPixelForValue(value) + height - offset;
          } else if (position === "center") {
            titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
          } else {
            titleY = offsetFromEdge(scale, position, offset);
          }
          maxWidth = right - left;
        } else {
          if (isObject(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            titleX = scales2[positionAxisID].getPixelForValue(value) - width + offset;
          } else if (position === "center") {
            titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
          } else {
            titleX = offsetFromEdge(scale, position, offset);
          }
          titleY = _alignStartEnd(align, bottom, top);
          rotation = position === "left" ? -HALF_PI : HALF_PI;
        }
        return { titleX, titleY, maxWidth, rotation };
      }
      class Scale extends Element {
        constructor(cfg) {
          super();
          this.id = cfg.id;
          this.type = cfg.type;
          this.options = void 0;
          this.ctx = cfg.ctx;
          this.chart = cfg.chart;
          this.top = void 0;
          this.bottom = void 0;
          this.left = void 0;
          this.right = void 0;
          this.width = void 0;
          this.height = void 0;
          this._margins = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          };
          this.maxWidth = void 0;
          this.maxHeight = void 0;
          this.paddingTop = void 0;
          this.paddingBottom = void 0;
          this.paddingLeft = void 0;
          this.paddingRight = void 0;
          this.axis = void 0;
          this.labelRotation = void 0;
          this.min = void 0;
          this.max = void 0;
          this._range = void 0;
          this.ticks = [];
          this._gridLineItems = null;
          this._labelItems = null;
          this._labelSizes = null;
          this._length = 0;
          this._maxLength = 0;
          this._longestTextCache = {};
          this._startPixel = void 0;
          this._endPixel = void 0;
          this._reversePixels = false;
          this._userMax = void 0;
          this._userMin = void 0;
          this._suggestedMax = void 0;
          this._suggestedMin = void 0;
          this._ticksLength = 0;
          this._borderValue = 0;
          this._cache = {};
          this._dataLimitsCached = false;
          this.$context = void 0;
        }
        init(options) {
          this.options = options.setContext(this.getContext());
          this.axis = options.axis;
          this._userMin = this.parse(options.min);
          this._userMax = this.parse(options.max);
          this._suggestedMin = this.parse(options.suggestedMin);
          this._suggestedMax = this.parse(options.suggestedMax);
        }
        parse(raw, index) {
          return raw;
        }
        getUserBounds() {
          let { _userMin, _userMax, _suggestedMin, _suggestedMax } = this;
          _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
          _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
          _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
          _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
          return {
            min: finiteOrDefault(_userMin, _suggestedMin),
            max: finiteOrDefault(_userMax, _suggestedMax),
            minDefined: isNumberFinite(_userMin),
            maxDefined: isNumberFinite(_userMax)
          };
        }
        getMinMax(canStack) {
          let { min, max, minDefined, maxDefined } = this.getUserBounds();
          let range;
          if (minDefined && maxDefined) {
            return { min, max };
          }
          const metas = this.getMatchingVisibleMetas();
          for (let i2 = 0, ilen = metas.length; i2 < ilen; ++i2) {
            range = metas[i2].controller.getMinMax(this, canStack);
            if (!minDefined) {
              min = Math.min(min, range.min);
            }
            if (!maxDefined) {
              max = Math.max(max, range.max);
            }
          }
          min = maxDefined && min > max ? max : min;
          max = minDefined && min > max ? min : max;
          return {
            min: finiteOrDefault(min, finiteOrDefault(max, min)),
            max: finiteOrDefault(max, finiteOrDefault(min, max))
          };
        }
        getPadding() {
          return {
            left: this.paddingLeft || 0,
            top: this.paddingTop || 0,
            right: this.paddingRight || 0,
            bottom: this.paddingBottom || 0
          };
        }
        getTicks() {
          return this.ticks;
        }
        getLabels() {
          const data = this.chart.data;
          return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
        }
        beforeLayout() {
          this._cache = {};
          this._dataLimitsCached = false;
        }
        beforeUpdate() {
          callback(this.options.beforeUpdate, [this]);
        }
        update(maxWidth, maxHeight, margins) {
          const { beginAtZero, grace, ticks: tickOpts } = this.options;
          const sampleSize = tickOpts.sampleSize;
          this.beforeUpdate();
          this.maxWidth = maxWidth;
          this.maxHeight = maxHeight;
          this._margins = margins = Object.assign({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, margins);
          this.ticks = null;
          this._labelSizes = null;
          this._gridLineItems = null;
          this._labelItems = null;
          this.beforeSetDimensions();
          this.setDimensions();
          this.afterSetDimensions();
          this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
          if (!this._dataLimitsCached) {
            this.beforeDataLimits();
            this.determineDataLimits();
            this.afterDataLimits();
            this._range = _addGrace(this, grace, beginAtZero);
            this._dataLimitsCached = true;
          }
          this.beforeBuildTicks();
          this.ticks = this.buildTicks() || [];
          this.afterBuildTicks();
          const samplingEnabled = sampleSize < this.ticks.length;
          this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
          this.configure();
          this.beforeCalculateLabelRotation();
          this.calculateLabelRotation();
          this.afterCalculateLabelRotation();
          if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
            this.ticks = autoSkip(this, this.ticks);
            this._labelSizes = null;
          }
          if (samplingEnabled) {
            this._convertTicksToLabels(this.ticks);
          }
          this.beforeFit();
          this.fit();
          this.afterFit();
          this.afterUpdate();
        }
        configure() {
          let reversePixels = this.options.reverse;
          let startPixel, endPixel;
          if (this.isHorizontal()) {
            startPixel = this.left;
            endPixel = this.right;
          } else {
            startPixel = this.top;
            endPixel = this.bottom;
            reversePixels = !reversePixels;
          }
          this._startPixel = startPixel;
          this._endPixel = endPixel;
          this._reversePixels = reversePixels;
          this._length = endPixel - startPixel;
          this._alignToPixels = this.options.alignToPixels;
        }
        afterUpdate() {
          callback(this.options.afterUpdate, [this]);
        }
        beforeSetDimensions() {
          callback(this.options.beforeSetDimensions, [this]);
        }
        setDimensions() {
          if (this.isHorizontal()) {
            this.width = this.maxWidth;
            this.left = 0;
            this.right = this.width;
          } else {
            this.height = this.maxHeight;
            this.top = 0;
            this.bottom = this.height;
          }
          this.paddingLeft = 0;
          this.paddingTop = 0;
          this.paddingRight = 0;
          this.paddingBottom = 0;
        }
        afterSetDimensions() {
          callback(this.options.afterSetDimensions, [this]);
        }
        _callHooks(name) {
          this.chart.notifyPlugins(name, this.getContext());
          callback(this.options[name], [this]);
        }
        beforeDataLimits() {
          this._callHooks("beforeDataLimits");
        }
        determineDataLimits() {
        }
        afterDataLimits() {
          this._callHooks("afterDataLimits");
        }
        beforeBuildTicks() {
          this._callHooks("beforeBuildTicks");
        }
        buildTicks() {
          return [];
        }
        afterBuildTicks() {
          this._callHooks("afterBuildTicks");
        }
        beforeTickToLabelConversion() {
          callback(this.options.beforeTickToLabelConversion, [this]);
        }
        generateTickLabels(ticks) {
          const tickOpts = this.options.ticks;
          let i2, ilen, tick;
          for (i2 = 0, ilen = ticks.length; i2 < ilen; i2++) {
            tick = ticks[i2];
            tick.label = callback(tickOpts.callback, [tick.value, i2, ticks], this);
          }
        }
        afterTickToLabelConversion() {
          callback(this.options.afterTickToLabelConversion, [this]);
        }
        beforeCalculateLabelRotation() {
          callback(this.options.beforeCalculateLabelRotation, [this]);
        }
        calculateLabelRotation() {
          const options = this.options;
          const tickOpts = options.ticks;
          const numTicks = this.ticks.length;
          const minRotation = tickOpts.minRotation || 0;
          const maxRotation = tickOpts.maxRotation;
          let labelRotation = minRotation;
          let tickWidth, maxHeight, maxLabelDiagonal;
          if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
            this.labelRotation = minRotation;
            return;
          }
          const labelSizes = this._getLabelSizes();
          const maxLabelWidth = labelSizes.widest.width;
          const maxLabelHeight = labelSizes.highest.height;
          const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
          tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
          if (maxLabelWidth + 6 > tickWidth) {
            tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
            maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
            maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
            labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
            labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
          }
          this.labelRotation = labelRotation;
        }
        afterCalculateLabelRotation() {
          callback(this.options.afterCalculateLabelRotation, [this]);
        }
        beforeFit() {
          callback(this.options.beforeFit, [this]);
        }
        fit() {
          const minSize = {
            width: 0,
            height: 0
          };
          const { chart, options: { ticks: tickOpts, title: titleOpts, grid: gridOpts } } = this;
          const display = this._isVisible();
          const isHorizontal = this.isHorizontal();
          if (display) {
            const titleHeight = getTitleHeight(titleOpts, chart.options.font);
            if (isHorizontal) {
              minSize.width = this.maxWidth;
              minSize.height = getTickMarkLength(gridOpts) + titleHeight;
            } else {
              minSize.height = this.maxHeight;
              minSize.width = getTickMarkLength(gridOpts) + titleHeight;
            }
            if (tickOpts.display && this.ticks.length) {
              const { first, last, widest, highest } = this._getLabelSizes();
              const tickPadding = tickOpts.padding * 2;
              const angleRadians = toRadians(this.labelRotation);
              const cos = Math.cos(angleRadians);
              const sin = Math.sin(angleRadians);
              if (isHorizontal) {
                const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
                minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
              } else {
                const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
                minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
              }
              this._calculatePadding(first, last, sin, cos);
            }
          }
          this._handleMargins();
          if (isHorizontal) {
            this.width = this._length = chart.width - this._margins.left - this._margins.right;
            this.height = minSize.height;
          } else {
            this.width = minSize.width;
            this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
          }
        }
        _calculatePadding(first, last, sin, cos) {
          const { ticks: { align, padding }, position } = this.options;
          const isRotated = this.labelRotation !== 0;
          const labelsBelowTicks = position !== "top" && this.axis === "x";
          if (this.isHorizontal()) {
            const offsetLeft = this.getPixelForTick(0) - this.left;
            const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
            let paddingLeft = 0;
            let paddingRight = 0;
            if (isRotated) {
              if (labelsBelowTicks) {
                paddingLeft = cos * first.width;
                paddingRight = sin * last.height;
              } else {
                paddingLeft = sin * first.height;
                paddingRight = cos * last.width;
              }
            } else if (align === "start") {
              paddingRight = last.width;
            } else if (align === "end") {
              paddingLeft = first.width;
            } else {
              paddingLeft = first.width / 2;
              paddingRight = last.width / 2;
            }
            this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
            this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
          } else {
            let paddingTop = last.height / 2;
            let paddingBottom = first.height / 2;
            if (align === "start") {
              paddingTop = 0;
              paddingBottom = first.height;
            } else if (align === "end") {
              paddingTop = last.height;
              paddingBottom = 0;
            }
            this.paddingTop = paddingTop + padding;
            this.paddingBottom = paddingBottom + padding;
          }
        }
        _handleMargins() {
          if (this._margins) {
            this._margins.left = Math.max(this.paddingLeft, this._margins.left);
            this._margins.top = Math.max(this.paddingTop, this._margins.top);
            this._margins.right = Math.max(this.paddingRight, this._margins.right);
            this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
          }
        }
        afterFit() {
          callback(this.options.afterFit, [this]);
        }
        isHorizontal() {
          const { axis, position } = this.options;
          return position === "top" || position === "bottom" || axis === "x";
        }
        isFullSize() {
          return this.options.fullSize;
        }
        _convertTicksToLabels(ticks) {
          this.beforeTickToLabelConversion();
          this.generateTickLabels(ticks);
          let i2, ilen;
          for (i2 = 0, ilen = ticks.length; i2 < ilen; i2++) {
            if (isNullOrUndef(ticks[i2].label)) {
              ticks.splice(i2, 1);
              ilen--;
              i2--;
            }
          }
          this.afterTickToLabelConversion();
        }
        _getLabelSizes() {
          let labelSizes = this._labelSizes;
          if (!labelSizes) {
            const sampleSize = this.options.ticks.sampleSize;
            let ticks = this.ticks;
            if (sampleSize < ticks.length) {
              ticks = sample(ticks, sampleSize);
            }
            this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length);
          }
          return labelSizes;
        }
        _computeLabelSizes(ticks, length) {
          const { ctx, _longestTextCache: caches } = this;
          const widths = [];
          const heights = [];
          let widestLabelSize = 0;
          let highestLabelSize = 0;
          let i2, j, jlen, label, tickFont, fontString2, cache, lineHeight, width, height, nestedLabel;
          for (i2 = 0; i2 < length; ++i2) {
            label = ticks[i2].label;
            tickFont = this._resolveTickFontOptions(i2);
            ctx.font = fontString2 = tickFont.string;
            cache = caches[fontString2] = caches[fontString2] || { data: {}, gc: [] };
            lineHeight = tickFont.lineHeight;
            width = height = 0;
            if (!isNullOrUndef(label) && !isArray(label)) {
              width = _measureText(ctx, cache.data, cache.gc, width, label);
              height = lineHeight;
            } else if (isArray(label)) {
              for (j = 0, jlen = label.length; j < jlen; ++j) {
                nestedLabel = label[j];
                if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
                  width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                  height += lineHeight;
                }
              }
            }
            widths.push(width);
            heights.push(height);
            widestLabelSize = Math.max(width, widestLabelSize);
            highestLabelSize = Math.max(height, highestLabelSize);
          }
          garbageCollect(caches, length);
          const widest = widths.indexOf(widestLabelSize);
          const highest = heights.indexOf(highestLabelSize);
          const valueAt = (idx) => ({ width: widths[idx] || 0, height: heights[idx] || 0 });
          return {
            first: valueAt(0),
            last: valueAt(length - 1),
            widest: valueAt(widest),
            highest: valueAt(highest),
            widths,
            heights
          };
        }
        getLabelForValue(value) {
          return value;
        }
        getPixelForValue(value, index) {
          return NaN;
        }
        getValueForPixel(pixel) {
        }
        getPixelForTick(index) {
          const ticks = this.ticks;
          if (index < 0 || index > ticks.length - 1) {
            return null;
          }
          return this.getPixelForValue(ticks[index].value);
        }
        getPixelForDecimal(decimal) {
          if (this._reversePixels) {
            decimal = 1 - decimal;
          }
          const pixel = this._startPixel + decimal * this._length;
          return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
        }
        getDecimalForPixel(pixel) {
          const decimal = (pixel - this._startPixel) / this._length;
          return this._reversePixels ? 1 - decimal : decimal;
        }
        getBasePixel() {
          return this.getPixelForValue(this.getBaseValue());
        }
        getBaseValue() {
          const { min, max } = this;
          return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
        }
        getContext(index) {
          const ticks = this.ticks || [];
          if (index >= 0 && index < ticks.length) {
            const tick = ticks[index];
            return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
          }
          return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
        }
        _tickSize() {
          const optionTicks = this.options.ticks;
          const rot = toRadians(this.labelRotation);
          const cos = Math.abs(Math.cos(rot));
          const sin = Math.abs(Math.sin(rot));
          const labelSizes = this._getLabelSizes();
          const padding = optionTicks.autoSkipPadding || 0;
          const w = labelSizes ? labelSizes.widest.width + padding : 0;
          const h3 = labelSizes ? labelSizes.highest.height + padding : 0;
          return this.isHorizontal() ? h3 * cos > w * sin ? w / cos : h3 / sin : h3 * sin < w * cos ? h3 / cos : w / sin;
        }
        _isVisible() {
          const display = this.options.display;
          if (display !== "auto") {
            return !!display;
          }
          return this.getMatchingVisibleMetas().length > 0;
        }
        _computeGridLineItems(chartArea) {
          const axis = this.axis;
          const chart = this.chart;
          const options = this.options;
          const { grid, position } = options;
          const offset = grid.offset;
          const isHorizontal = this.isHorizontal();
          const ticks = this.ticks;
          const ticksLength = ticks.length + (offset ? 1 : 0);
          const tl = getTickMarkLength(grid);
          const items = [];
          const borderOpts = grid.setContext(this.getContext());
          const axisWidth = borderOpts.drawBorder ? borderOpts.borderWidth : 0;
          const axisHalfWidth = axisWidth / 2;
          const alignBorderValue = function(pixel) {
            return _alignPixel(chart, pixel, axisWidth);
          };
          let borderValue, i2, lineValue, alignedLineValue;
          let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
          if (position === "top") {
            borderValue = alignBorderValue(this.bottom);
            ty1 = this.bottom - tl;
            ty2 = borderValue - axisHalfWidth;
            y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
            y2 = chartArea.bottom;
          } else if (position === "bottom") {
            borderValue = alignBorderValue(this.top);
            y1 = chartArea.top;
            y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
            ty1 = borderValue + axisHalfWidth;
            ty2 = this.top + tl;
          } else if (position === "left") {
            borderValue = alignBorderValue(this.right);
            tx1 = this.right - tl;
            tx2 = borderValue - axisHalfWidth;
            x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
            x2 = chartArea.right;
          } else if (position === "right") {
            borderValue = alignBorderValue(this.left);
            x1 = chartArea.left;
            x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
            tx1 = borderValue + axisHalfWidth;
            tx2 = this.left + tl;
          } else if (axis === "x") {
            if (position === "center") {
              borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
            } else if (isObject(position)) {
              const positionAxisID = Object.keys(position)[0];
              const value = position[positionAxisID];
              borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
            }
            y1 = chartArea.top;
            y2 = chartArea.bottom;
            ty1 = borderValue + axisHalfWidth;
            ty2 = ty1 + tl;
          } else if (axis === "y") {
            if (position === "center") {
              borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
            } else if (isObject(position)) {
              const positionAxisID = Object.keys(position)[0];
              const value = position[positionAxisID];
              borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
            }
            tx1 = borderValue - axisHalfWidth;
            tx2 = tx1 - tl;
            x1 = chartArea.left;
            x2 = chartArea.right;
          }
          const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
          const step = Math.max(1, Math.ceil(ticksLength / limit));
          for (i2 = 0; i2 < ticksLength; i2 += step) {
            const optsAtIndex = grid.setContext(this.getContext(i2));
            const lineWidth = optsAtIndex.lineWidth;
            const lineColor = optsAtIndex.color;
            const borderDash = grid.borderDash || [];
            const borderDashOffset = optsAtIndex.borderDashOffset;
            const tickWidth = optsAtIndex.tickWidth;
            const tickColor = optsAtIndex.tickColor;
            const tickBorderDash = optsAtIndex.tickBorderDash || [];
            const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
            lineValue = getPixelForGridLine(this, i2, offset);
            if (lineValue === void 0) {
              continue;
            }
            alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
            if (isHorizontal) {
              tx1 = tx2 = x1 = x2 = alignedLineValue;
            } else {
              ty1 = ty2 = y1 = y2 = alignedLineValue;
            }
            items.push({
              tx1,
              ty1,
              tx2,
              ty2,
              x1,
              y1,
              x2,
              y2,
              width: lineWidth,
              color: lineColor,
              borderDash,
              borderDashOffset,
              tickWidth,
              tickColor,
              tickBorderDash,
              tickBorderDashOffset
            });
          }
          this._ticksLength = ticksLength;
          this._borderValue = borderValue;
          return items;
        }
        _computeLabelItems(chartArea) {
          const axis = this.axis;
          const options = this.options;
          const { position, ticks: optionTicks } = options;
          const isHorizontal = this.isHorizontal();
          const ticks = this.ticks;
          const { align, crossAlign, padding, mirror } = optionTicks;
          const tl = getTickMarkLength(options.grid);
          const tickAndPadding = tl + padding;
          const hTickAndPadding = mirror ? -padding : tickAndPadding;
          const rotation = -toRadians(this.labelRotation);
          const items = [];
          let i2, ilen, tick, label, x2, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
          let textBaseline = "middle";
          if (position === "top") {
            y = this.bottom - hTickAndPadding;
            textAlign = this._getXAxisLabelAlignment();
          } else if (position === "bottom") {
            y = this.top + hTickAndPadding;
            textAlign = this._getXAxisLabelAlignment();
          } else if (position === "left") {
            const ret = this._getYAxisLabelAlignment(tl);
            textAlign = ret.textAlign;
            x2 = ret.x;
          } else if (position === "right") {
            const ret = this._getYAxisLabelAlignment(tl);
            textAlign = ret.textAlign;
            x2 = ret.x;
          } else if (axis === "x") {
            if (position === "center") {
              y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
            } else if (isObject(position)) {
              const positionAxisID = Object.keys(position)[0];
              const value = position[positionAxisID];
              y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
            }
            textAlign = this._getXAxisLabelAlignment();
          } else if (axis === "y") {
            if (position === "center") {
              x2 = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
            } else if (isObject(position)) {
              const positionAxisID = Object.keys(position)[0];
              const value = position[positionAxisID];
              x2 = this.chart.scales[positionAxisID].getPixelForValue(value);
            }
            textAlign = this._getYAxisLabelAlignment(tl).textAlign;
          }
          if (axis === "y") {
            if (align === "start") {
              textBaseline = "top";
            } else if (align === "end") {
              textBaseline = "bottom";
            }
          }
          const labelSizes = this._getLabelSizes();
          for (i2 = 0, ilen = ticks.length; i2 < ilen; ++i2) {
            tick = ticks[i2];
            label = tick.label;
            const optsAtIndex = optionTicks.setContext(this.getContext(i2));
            pixel = this.getPixelForTick(i2) + optionTicks.labelOffset;
            font = this._resolveTickFontOptions(i2);
            lineHeight = font.lineHeight;
            lineCount = isArray(label) ? label.length : 1;
            const halfCount = lineCount / 2;
            const color2 = optsAtIndex.color;
            const strokeColor = optsAtIndex.textStrokeColor;
            const strokeWidth = optsAtIndex.textStrokeWidth;
            if (isHorizontal) {
              x2 = pixel;
              if (position === "top") {
                if (crossAlign === "near" || rotation !== 0) {
                  textOffset = -lineCount * lineHeight + lineHeight / 2;
                } else if (crossAlign === "center") {
                  textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
                } else {
                  textOffset = -labelSizes.highest.height + lineHeight / 2;
                }
              } else {
                if (crossAlign === "near" || rotation !== 0) {
                  textOffset = lineHeight / 2;
                } else if (crossAlign === "center") {
                  textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
                } else {
                  textOffset = labelSizes.highest.height - lineCount * lineHeight;
                }
              }
              if (mirror) {
                textOffset *= -1;
              }
            } else {
              y = pixel;
              textOffset = (1 - lineCount) * lineHeight / 2;
            }
            let backdrop;
            if (optsAtIndex.showLabelBackdrop) {
              const labelPadding = toPadding(optsAtIndex.backdropPadding);
              const height = labelSizes.heights[i2];
              const width = labelSizes.widths[i2];
              let top = y + textOffset - labelPadding.top;
              let left = x2 - labelPadding.left;
              switch (textBaseline) {
                case "middle":
                  top -= height / 2;
                  break;
                case "bottom":
                  top -= height;
                  break;
              }
              switch (textAlign) {
                case "center":
                  left -= width / 2;
                  break;
                case "right":
                  left -= width;
                  break;
              }
              backdrop = {
                left,
                top,
                width: width + labelPadding.width,
                height: height + labelPadding.height,
                color: optsAtIndex.backdropColor
              };
            }
            items.push({
              rotation,
              label,
              font,
              color: color2,
              strokeColor,
              strokeWidth,
              textOffset,
              textAlign,
              textBaseline,
              translation: [x2, y],
              backdrop
            });
          }
          return items;
        }
        _getXAxisLabelAlignment() {
          const { position, ticks } = this.options;
          const rotation = -toRadians(this.labelRotation);
          if (rotation) {
            return position === "top" ? "left" : "right";
          }
          let align = "center";
          if (ticks.align === "start") {
            align = "left";
          } else if (ticks.align === "end") {
            align = "right";
          }
          return align;
        }
        _getYAxisLabelAlignment(tl) {
          const { position, ticks: { crossAlign, mirror, padding } } = this.options;
          const labelSizes = this._getLabelSizes();
          const tickAndPadding = tl + padding;
          const widest = labelSizes.widest.width;
          let textAlign;
          let x2;
          if (position === "left") {
            if (mirror) {
              x2 = this.right + padding;
              if (crossAlign === "near") {
                textAlign = "left";
              } else if (crossAlign === "center") {
                textAlign = "center";
                x2 += widest / 2;
              } else {
                textAlign = "right";
                x2 += widest;
              }
            } else {
              x2 = this.right - tickAndPadding;
              if (crossAlign === "near") {
                textAlign = "right";
              } else if (crossAlign === "center") {
                textAlign = "center";
                x2 -= widest / 2;
              } else {
                textAlign = "left";
                x2 = this.left;
              }
            }
          } else if (position === "right") {
            if (mirror) {
              x2 = this.left + padding;
              if (crossAlign === "near") {
                textAlign = "right";
              } else if (crossAlign === "center") {
                textAlign = "center";
                x2 -= widest / 2;
              } else {
                textAlign = "left";
                x2 -= widest;
              }
            } else {
              x2 = this.left + tickAndPadding;
              if (crossAlign === "near") {
                textAlign = "left";
              } else if (crossAlign === "center") {
                textAlign = "center";
                x2 += widest / 2;
              } else {
                textAlign = "right";
                x2 = this.right;
              }
            }
          } else {
            textAlign = "right";
          }
          return { textAlign, x: x2 };
        }
        _computeLabelArea() {
          if (this.options.ticks.mirror) {
            return;
          }
          const chart = this.chart;
          const position = this.options.position;
          if (position === "left" || position === "right") {
            return { top: 0, left: this.left, bottom: chart.height, right: this.right };
          }
          if (position === "top" || position === "bottom") {
            return { top: this.top, left: 0, bottom: this.bottom, right: chart.width };
          }
        }
        drawBackground() {
          const { ctx, options: { backgroundColor }, left, top, width, height } = this;
          if (backgroundColor) {
            ctx.save();
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(left, top, width, height);
            ctx.restore();
          }
        }
        getLineWidthForValue(value) {
          const grid = this.options.grid;
          if (!this._isVisible() || !grid.display) {
            return 0;
          }
          const ticks = this.ticks;
          const index = ticks.findIndex((t2) => t2.value === value);
          if (index >= 0) {
            const opts = grid.setContext(this.getContext(index));
            return opts.lineWidth;
          }
          return 0;
        }
        drawGrid(chartArea) {
          const grid = this.options.grid;
          const ctx = this.ctx;
          const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
          let i2, ilen;
          const drawLine = (p1, p2, style) => {
            if (!style.width || !style.color) {
              return;
            }
            ctx.save();
            ctx.lineWidth = style.width;
            ctx.strokeStyle = style.color;
            ctx.setLineDash(style.borderDash || []);
            ctx.lineDashOffset = style.borderDashOffset;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          };
          if (grid.display) {
            for (i2 = 0, ilen = items.length; i2 < ilen; ++i2) {
              const item = items[i2];
              if (grid.drawOnChartArea) {
                drawLine({ x: item.x1, y: item.y1 }, { x: item.x2, y: item.y2 }, item);
              }
              if (grid.drawTicks) {
                drawLine({ x: item.tx1, y: item.ty1 }, { x: item.tx2, y: item.ty2 }, {
                  color: item.tickColor,
                  width: item.tickWidth,
                  borderDash: item.tickBorderDash,
                  borderDashOffset: item.tickBorderDashOffset
                });
              }
            }
          }
        }
        drawBorder() {
          const { chart, ctx, options: { grid } } = this;
          const borderOpts = grid.setContext(this.getContext());
          const axisWidth = grid.drawBorder ? borderOpts.borderWidth : 0;
          if (!axisWidth) {
            return;
          }
          const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
          const borderValue = this._borderValue;
          let x1, x2, y1, y2;
          if (this.isHorizontal()) {
            x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
            x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
            y1 = y2 = borderValue;
          } else {
            y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
            y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
            x1 = x2 = borderValue;
          }
          ctx.save();
          ctx.lineWidth = borderOpts.borderWidth;
          ctx.strokeStyle = borderOpts.borderColor;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.restore();
        }
        drawLabels(chartArea) {
          const optionTicks = this.options.ticks;
          if (!optionTicks.display) {
            return;
          }
          const ctx = this.ctx;
          const area = this._computeLabelArea();
          if (area) {
            clipArea(ctx, area);
          }
          const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
          let i2, ilen;
          for (i2 = 0, ilen = items.length; i2 < ilen; ++i2) {
            const item = items[i2];
            const tickFont = item.font;
            const label = item.label;
            if (item.backdrop) {
              ctx.fillStyle = item.backdrop.color;
              ctx.fillRect(item.backdrop.left, item.backdrop.top, item.backdrop.width, item.backdrop.height);
            }
            let y = item.textOffset;
            renderText(ctx, label, 0, y, tickFont, item);
          }
          if (area) {
            unclipArea(ctx);
          }
        }
        drawTitle() {
          const { ctx, options: { position, title, reverse } } = this;
          if (!title.display) {
            return;
          }
          const font = toFont(title.font);
          const padding = toPadding(title.padding);
          const align = title.align;
          let offset = font.lineHeight / 2;
          if (position === "bottom" || position === "center" || isObject(position)) {
            offset += padding.bottom;
            if (isArray(title.text)) {
              offset += font.lineHeight * (title.text.length - 1);
            }
          } else {
            offset += padding.top;
          }
          const { titleX, titleY, maxWidth, rotation } = titleArgs(this, offset, position, align);
          renderText(ctx, title.text, 0, 0, font, {
            color: title.color,
            maxWidth,
            rotation,
            textAlign: titleAlign(align, position, reverse),
            textBaseline: "middle",
            translation: [titleX, titleY]
          });
        }
        draw(chartArea) {
          if (!this._isVisible()) {
            return;
          }
          this.drawBackground();
          this.drawGrid(chartArea);
          this.drawBorder();
          this.drawTitle();
          this.drawLabels(chartArea);
        }
        _layers() {
          const opts = this.options;
          const tz = opts.ticks && opts.ticks.z || 0;
          const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
          if (!this._isVisible() || this.draw !== Scale.prototype.draw) {
            return [{
              z: tz,
              draw: (chartArea) => {
                this.draw(chartArea);
              }
            }];
          }
          return [{
            z: gz,
            draw: (chartArea) => {
              this.drawBackground();
              this.drawGrid(chartArea);
              this.drawTitle();
            }
          }, {
            z: gz + 1,
            draw: () => {
              this.drawBorder();
            }
          }, {
            z: tz,
            draw: (chartArea) => {
              this.drawLabels(chartArea);
            }
          }];
        }
        getMatchingVisibleMetas(type) {
          const metas = this.chart.getSortedVisibleDatasetMetas();
          const axisID = this.axis + "AxisID";
          const result = [];
          let i2, ilen;
          for (i2 = 0, ilen = metas.length; i2 < ilen; ++i2) {
            const meta = metas[i2];
            if (meta[axisID] === this.id && (!type || meta.type === type)) {
              result.push(meta);
            }
          }
          return result;
        }
        _resolveTickFontOptions(index) {
          const opts = this.options.ticks.setContext(this.getContext(index));
          return toFont(opts.font);
        }
        _maxDigits() {
          const fontSize = this._resolveTickFontOptions(0).lineHeight;
          return (this.isHorizontal() ? this.width : this.height) / fontSize;
        }
      }
      class TypedRegistry {
        constructor(type, scope, override) {
          this.type = type;
          this.scope = scope;
          this.override = override;
          this.items = /* @__PURE__ */ Object.create(null);
        }
        isForType(type) {
          return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
        }
        register(item) {
          const proto = Object.getPrototypeOf(item);
          let parentScope;
          if (isIChartComponent(proto)) {
            parentScope = this.register(proto);
          }
          const items = this.items;
          const id = item.id;
          const scope = this.scope + "." + id;
          if (!id) {
            throw new Error("class does not have id: " + item);
          }
          if (id in items) {
            return scope;
          }
          items[id] = item;
          registerDefaults(item, scope, parentScope);
          if (this.override) {
            defaults.override(item.id, item.overrides);
          }
          return scope;
        }
        get(id) {
          return this.items[id];
        }
        unregister(item) {
          const items = this.items;
          const id = item.id;
          const scope = this.scope;
          if (id in items) {
            delete items[id];
          }
          if (scope && id in defaults[scope]) {
            delete defaults[scope][id];
            if (this.override) {
              delete overrides[id];
            }
          }
        }
      }
      function registerDefaults(item, scope, parentScope) {
        const itemDefaults = merge(/* @__PURE__ */ Object.create(null), [
          parentScope ? defaults.get(parentScope) : {},
          defaults.get(scope),
          item.defaults
        ]);
        defaults.set(scope, itemDefaults);
        if (item.defaultRoutes) {
          routeDefaults(scope, item.defaultRoutes);
        }
        if (item.descriptors) {
          defaults.describe(scope, item.descriptors);
        }
      }
      function routeDefaults(scope, routes) {
        Object.keys(routes).forEach((property) => {
          const propertyParts = property.split(".");
          const sourceName = propertyParts.pop();
          const sourceScope = [scope].concat(propertyParts).join(".");
          const parts = routes[property].split(".");
          const targetName = parts.pop();
          const targetScope = parts.join(".");
          defaults.route(sourceScope, sourceName, targetScope, targetName);
        });
      }
      function isIChartComponent(proto) {
        return "id" in proto && "defaults" in proto;
      }
      class Registry {
        constructor() {
          this.controllers = new TypedRegistry(DatasetController, "datasets", true);
          this.elements = new TypedRegistry(Element, "elements");
          this.plugins = new TypedRegistry(Object, "plugins");
          this.scales = new TypedRegistry(Scale, "scales");
          this._typedRegistries = [this.controllers, this.scales, this.elements];
        }
        add(...args) {
          this._each("register", args);
        }
        remove(...args) {
          this._each("unregister", args);
        }
        addControllers(...args) {
          this._each("register", args, this.controllers);
        }
        addElements(...args) {
          this._each("register", args, this.elements);
        }
        addPlugins(...args) {
          this._each("register", args, this.plugins);
        }
        addScales(...args) {
          this._each("register", args, this.scales);
        }
        getController(id) {
          return this._get(id, this.controllers, "controller");
        }
        getElement(id) {
          return this._get(id, this.elements, "element");
        }
        getPlugin(id) {
          return this._get(id, this.plugins, "plugin");
        }
        getScale(id) {
          return this._get(id, this.scales, "scale");
        }
        removeControllers(...args) {
          this._each("unregister", args, this.controllers);
        }
        removeElements(...args) {
          this._each("unregister", args, this.elements);
        }
        removePlugins(...args) {
          this._each("unregister", args, this.plugins);
        }
        removeScales(...args) {
          this._each("unregister", args, this.scales);
        }
        _each(method, args, typedRegistry) {
          [...args].forEach((arg) => {
            const reg = typedRegistry || this._getRegistryForType(arg);
            if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
              this._exec(method, reg, arg);
            } else {
              each(arg, (item) => {
                const itemReg = typedRegistry || this._getRegistryForType(item);
                this._exec(method, itemReg, item);
              });
            }
          });
        }
        _exec(method, registry2, component) {
          const camelMethod = _capitalize(method);
          callback(component["before" + camelMethod], [], component);
          registry2[method](component);
          callback(component["after" + camelMethod], [], component);
        }
        _getRegistryForType(type) {
          for (let i2 = 0; i2 < this._typedRegistries.length; i2++) {
            const reg = this._typedRegistries[i2];
            if (reg.isForType(type)) {
              return reg;
            }
          }
          return this.plugins;
        }
        _get(id, typedRegistry, type) {
          const item = typedRegistry.get(id);
          if (item === void 0) {
            throw new Error('"' + id + '" is not a registered ' + type + ".");
          }
          return item;
        }
      }
      var registry = new Registry();
      class PluginService {
        constructor() {
          this._init = [];
        }
        notify(chart, hook, args, filter) {
          if (hook === "beforeInit") {
            this._init = this._createDescriptors(chart, true);
            this._notify(this._init, chart, "install");
          }
          const descriptors2 = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
          const result = this._notify(descriptors2, chart, hook, args);
          if (hook === "afterDestroy") {
            this._notify(descriptors2, chart, "stop");
            this._notify(this._init, chart, "uninstall");
          }
          return result;
        }
        _notify(descriptors2, chart, hook, args) {
          args = args || {};
          for (const descriptor of descriptors2) {
            const plugin = descriptor.plugin;
            const method = plugin[hook];
            const params = [chart, args, descriptor.options];
            if (callback(method, params, plugin) === false && args.cancelable) {
              return false;
            }
          }
          return true;
        }
        invalidate() {
          if (!isNullOrUndef(this._cache)) {
            this._oldCache = this._cache;
            this._cache = void 0;
          }
        }
        _descriptors(chart) {
          if (this._cache) {
            return this._cache;
          }
          const descriptors2 = this._cache = this._createDescriptors(chart);
          this._notifyStateChanges(chart);
          return descriptors2;
        }
        _createDescriptors(chart, all) {
          const config = chart && chart.config;
          const options = valueOrDefault(config.options && config.options.plugins, {});
          const plugins2 = allPlugins(config);
          return options === false && !all ? [] : createDescriptors(chart, plugins2, options, all);
        }
        _notifyStateChanges(chart) {
          const previousDescriptors = this._oldCache || [];
          const descriptors2 = this._cache;
          const diff = (a, b) => a.filter((x2) => !b.some((y) => x2.plugin.id === y.plugin.id));
          this._notify(diff(previousDescriptors, descriptors2), chart, "stop");
          this._notify(diff(descriptors2, previousDescriptors), chart, "start");
        }
      }
      function allPlugins(config) {
        const plugins2 = [];
        const keys = Object.keys(registry.plugins.items);
        for (let i2 = 0; i2 < keys.length; i2++) {
          plugins2.push(registry.getPlugin(keys[i2]));
        }
        const local = config.plugins || [];
        for (let i2 = 0; i2 < local.length; i2++) {
          const plugin = local[i2];
          if (plugins2.indexOf(plugin) === -1) {
            plugins2.push(plugin);
          }
        }
        return plugins2;
      }
      function getOpts(options, all) {
        if (!all && options === false) {
          return null;
        }
        if (options === true) {
          return {};
        }
        return options;
      }
      function createDescriptors(chart, plugins2, options, all) {
        const result = [];
        const context = chart.getContext();
        for (let i2 = 0; i2 < plugins2.length; i2++) {
          const plugin = plugins2[i2];
          const id = plugin.id;
          const opts = getOpts(options[id], all);
          if (opts === null) {
            continue;
          }
          result.push({
            plugin,
            options: pluginOpts(chart.config, plugin, opts, context)
          });
        }
        return result;
      }
      function pluginOpts(config, plugin, opts, context) {
        const keys = config.pluginScopeKeys(plugin);
        const scopes = config.getOptionScopes(opts, keys);
        return config.createResolver(scopes, context, [""], { scriptable: false, indexable: false, allKeys: true });
      }
      function getIndexAxis(type, options) {
        const datasetDefaults = defaults.datasets[type] || {};
        const datasetOptions = (options.datasets || {})[type] || {};
        return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
      }
      function getAxisFromDefaultScaleID(id, indexAxis) {
        let axis = id;
        if (id === "_index_") {
          axis = indexAxis;
        } else if (id === "_value_") {
          axis = indexAxis === "x" ? "y" : "x";
        }
        return axis;
      }
      function getDefaultScaleIDFromAxis(axis, indexAxis) {
        return axis === indexAxis ? "_index_" : "_value_";
      }
      function axisFromPosition(position) {
        if (position === "top" || position === "bottom") {
          return "x";
        }
        if (position === "left" || position === "right") {
          return "y";
        }
      }
      function determineAxis(id, scaleOptions) {
        if (id === "x" || id === "y") {
          return id;
        }
        return scaleOptions.axis || axisFromPosition(scaleOptions.position) || id.charAt(0).toLowerCase();
      }
      function mergeScaleConfig(config, options) {
        const chartDefaults = overrides[config.type] || { scales: {} };
        const configScales = options.scales || {};
        const chartIndexAxis = getIndexAxis(config.type, options);
        const firstIDs = /* @__PURE__ */ Object.create(null);
        const scales2 = /* @__PURE__ */ Object.create(null);
        Object.keys(configScales).forEach((id) => {
          const scaleConf = configScales[id];
          if (!isObject(scaleConf)) {
            return console.error(`Invalid scale configuration for scale: ${id}`);
          }
          if (scaleConf._proxy) {
            return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
          }
          const axis = determineAxis(id, scaleConf);
          const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
          const defaultScaleOptions = chartDefaults.scales || {};
          firstIDs[axis] = firstIDs[axis] || id;
          scales2[id] = mergeIf(/* @__PURE__ */ Object.create(null), [{ axis }, scaleConf, defaultScaleOptions[axis], defaultScaleOptions[defaultId]]);
        });
        config.data.datasets.forEach((dataset) => {
          const type = dataset.type || config.type;
          const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
          const datasetDefaults = overrides[type] || {};
          const defaultScaleOptions = datasetDefaults.scales || {};
          Object.keys(defaultScaleOptions).forEach((defaultID) => {
            const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
            const id = dataset[axis + "AxisID"] || firstIDs[axis] || axis;
            scales2[id] = scales2[id] || /* @__PURE__ */ Object.create(null);
            mergeIf(scales2[id], [{ axis }, configScales[id], defaultScaleOptions[defaultID]]);
          });
        });
        Object.keys(scales2).forEach((key2) => {
          const scale = scales2[key2];
          mergeIf(scale, [defaults.scales[scale.type], defaults.scale]);
        });
        return scales2;
      }
      function initOptions(config) {
        const options = config.options || (config.options = {});
        options.plugins = valueOrDefault(options.plugins, {});
        options.scales = mergeScaleConfig(config, options);
      }
      function initData(data) {
        data = data || {};
        data.datasets = data.datasets || [];
        data.labels = data.labels || [];
        return data;
      }
      function initConfig(config) {
        config = config || {};
        config.data = initData(config.data);
        initOptions(config);
        return config;
      }
      const keyCache = /* @__PURE__ */ new Map();
      const keysCached = /* @__PURE__ */ new Set();
      function cachedKeys(cacheKey, generate) {
        let keys = keyCache.get(cacheKey);
        if (!keys) {
          keys = generate();
          keyCache.set(cacheKey, keys);
          keysCached.add(keys);
        }
        return keys;
      }
      const addIfFound = (set2, obj, key2) => {
        const opts = resolveObjectKey(obj, key2);
        if (opts !== void 0) {
          set2.add(opts);
        }
      };
      class Config {
        constructor(config) {
          this._config = initConfig(config);
          this._scopeCache = /* @__PURE__ */ new Map();
          this._resolverCache = /* @__PURE__ */ new Map();
        }
        get platform() {
          return this._config.platform;
        }
        get type() {
          return this._config.type;
        }
        set type(type) {
          this._config.type = type;
        }
        get data() {
          return this._config.data;
        }
        set data(data) {
          this._config.data = initData(data);
        }
        get options() {
          return this._config.options;
        }
        set options(options) {
          this._config.options = options;
        }
        get plugins() {
          return this._config.plugins;
        }
        update() {
          const config = this._config;
          this.clearCache();
          initOptions(config);
        }
        clearCache() {
          this._scopeCache.clear();
          this._resolverCache.clear();
        }
        datasetScopeKeys(datasetType) {
          return cachedKeys(datasetType, () => [[
            `datasets.${datasetType}`,
            ""
          ]]);
        }
        datasetAnimationScopeKeys(datasetType, transition) {
          return cachedKeys(`${datasetType}.transition.${transition}`, () => [
            [
              `datasets.${datasetType}.transitions.${transition}`,
              `transitions.${transition}`
            ],
            [
              `datasets.${datasetType}`,
              ""
            ]
          ]);
        }
        datasetElementScopeKeys(datasetType, elementType) {
          return cachedKeys(`${datasetType}-${elementType}`, () => [[
            `datasets.${datasetType}.elements.${elementType}`,
            `datasets.${datasetType}`,
            `elements.${elementType}`,
            ""
          ]]);
        }
        pluginScopeKeys(plugin) {
          const id = plugin.id;
          const type = this.type;
          return cachedKeys(`${type}-plugin-${id}`, () => [[
            `plugins.${id}`,
            ...plugin.additionalOptionScopes || []
          ]]);
        }
        _cachedScopes(mainScope, resetCache) {
          const _scopeCache = this._scopeCache;
          let cache = _scopeCache.get(mainScope);
          if (!cache || resetCache) {
            cache = /* @__PURE__ */ new Map();
            _scopeCache.set(mainScope, cache);
          }
          return cache;
        }
        getOptionScopes(mainScope, keyLists, resetCache) {
          const { options, type } = this;
          const cache = this._cachedScopes(mainScope, resetCache);
          const cached = cache.get(keyLists);
          if (cached) {
            return cached;
          }
          const scopes = /* @__PURE__ */ new Set();
          keyLists.forEach((keys) => {
            if (mainScope) {
              scopes.add(mainScope);
              keys.forEach((key2) => addIfFound(scopes, mainScope, key2));
            }
            keys.forEach((key2) => addIfFound(scopes, options, key2));
            keys.forEach((key2) => addIfFound(scopes, overrides[type] || {}, key2));
            keys.forEach((key2) => addIfFound(scopes, defaults, key2));
            keys.forEach((key2) => addIfFound(scopes, descriptors, key2));
          });
          const array = Array.from(scopes);
          if (array.length === 0) {
            array.push(/* @__PURE__ */ Object.create(null));
          }
          if (keysCached.has(keyLists)) {
            cache.set(keyLists, array);
          }
          return array;
        }
        chartOptionScopes() {
          const { options, type } = this;
          return [
            options,
            overrides[type] || {},
            defaults.datasets[type] || {},
            { type },
            defaults,
            descriptors
          ];
        }
        resolveNamedOptions(scopes, names2, context, prefixes = [""]) {
          const result = { $shared: true };
          const { resolver, subPrefixes } = getResolver(this._resolverCache, scopes, prefixes);
          let options = resolver;
          if (needContext(resolver, names2)) {
            result.$shared = false;
            context = isFunction(context) ? context() : context;
            const subResolver = this.createResolver(scopes, context, subPrefixes);
            options = _attachContext(resolver, context, subResolver);
          }
          for (const prop of names2) {
            result[prop] = options[prop];
          }
          return result;
        }
        createResolver(scopes, context, prefixes = [""], descriptorDefaults) {
          const { resolver } = getResolver(this._resolverCache, scopes, prefixes);
          return isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
        }
      }
      function getResolver(resolverCache, scopes, prefixes) {
        let cache = resolverCache.get(scopes);
        if (!cache) {
          cache = /* @__PURE__ */ new Map();
          resolverCache.set(scopes, cache);
        }
        const cacheKey = prefixes.join();
        let cached = cache.get(cacheKey);
        if (!cached) {
          const resolver = _createResolver(scopes, prefixes);
          cached = {
            resolver,
            subPrefixes: prefixes.filter((p) => !p.toLowerCase().includes("hover"))
          };
          cache.set(cacheKey, cached);
        }
        return cached;
      }
      const hasFunction = (value) => isObject(value) && Object.getOwnPropertyNames(value).reduce((acc, key2) => acc || isFunction(value[key2]), false);
      function needContext(proxy, names2) {
        const { isScriptable, isIndexable } = _descriptors(proxy);
        for (const prop of names2) {
          const scriptable = isScriptable(prop);
          const indexable = isIndexable(prop);
          const value = (indexable || scriptable) && proxy[prop];
          if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) {
            return true;
          }
        }
        return false;
      }
      var version = "3.7.1";
      const KNOWN_POSITIONS = ["top", "bottom", "left", "right", "chartArea"];
      function positionIsHorizontal(position, axis) {
        return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
      }
      function compare2Level(l1, l2) {
        return function(a, b) {
          return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
        };
      }
      function onAnimationsComplete(context) {
        const chart = context.chart;
        const animationOptions2 = chart.options.animation;
        chart.notifyPlugins("afterRender");
        callback(animationOptions2 && animationOptions2.onComplete, [context], chart);
      }
      function onAnimationProgress(context) {
        const chart = context.chart;
        const animationOptions2 = chart.options.animation;
        callback(animationOptions2 && animationOptions2.onProgress, [context], chart);
      }
      function getCanvas(item) {
        if (_isDomSupported() && typeof item === "string") {
          item = document.getElementById(item);
        } else if (item && item.length) {
          item = item[0];
        }
        if (item && item.canvas) {
          item = item.canvas;
        }
        return item;
      }
      const instances = {};
      const getChart = (key2) => {
        const canvas = getCanvas(key2);
        return Object.values(instances).filter((c) => c.canvas === canvas).pop();
      };
      function moveNumericKeys(obj, start, move) {
        const keys = Object.keys(obj);
        for (const key2 of keys) {
          const intKey = +key2;
          if (intKey >= start) {
            const value = obj[key2];
            delete obj[key2];
            if (move > 0 || intKey > start) {
              obj[intKey + move] = value;
            }
          }
        }
      }
      function determineLastEvent(e2, lastEvent, inChartArea, isClick) {
        if (!inChartArea || e2.type === "mouseout") {
          return null;
        }
        if (isClick) {
          return lastEvent;
        }
        return e2;
      }
      class Chart {
        constructor(item, userConfig) {
          const config = this.config = new Config(userConfig);
          const initialCanvas = getCanvas(item);
          const existingChart = getChart(initialCanvas);
          if (existingChart) {
            throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "' must be destroyed before the canvas can be reused.");
          }
          const options = config.createResolver(config.chartOptionScopes(), this.getContext());
          this.platform = new (config.platform || _detectPlatform(initialCanvas))();
          this.platform.updateConfig(config);
          const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
          const canvas = context && context.canvas;
          const height = canvas && canvas.height;
          const width = canvas && canvas.width;
          this.id = uid();
          this.ctx = context;
          this.canvas = canvas;
          this.width = width;
          this.height = height;
          this._options = options;
          this._aspectRatio = this.aspectRatio;
          this._layers = [];
          this._metasets = [];
          this._stacks = void 0;
          this.boxes = [];
          this.currentDevicePixelRatio = void 0;
          this.chartArea = void 0;
          this._active = [];
          this._lastEvent = void 0;
          this._listeners = {};
          this._responsiveListeners = void 0;
          this._sortedMetasets = [];
          this.scales = {};
          this._plugins = new PluginService();
          this.$proxies = {};
          this._hiddenIndices = {};
          this.attached = false;
          this._animationsDisabled = void 0;
          this.$context = void 0;
          this._doResize = debounce((mode) => this.update(mode), options.resizeDelay || 0);
          this._dataChanges = [];
          instances[this.id] = this;
          if (!context || !canvas) {
            console.error("Failed to create chart: can't acquire context from the given item");
            return;
          }
          animator.listen(this, "complete", onAnimationsComplete);
          animator.listen(this, "progress", onAnimationProgress);
          this._initialize();
          if (this.attached) {
            this.update();
          }
        }
        get aspectRatio() {
          const { options: { aspectRatio, maintainAspectRatio }, width, height, _aspectRatio } = this;
          if (!isNullOrUndef(aspectRatio)) {
            return aspectRatio;
          }
          if (maintainAspectRatio && _aspectRatio) {
            return _aspectRatio;
          }
          return height ? width / height : null;
        }
        get data() {
          return this.config.data;
        }
        set data(data) {
          this.config.data = data;
        }
        get options() {
          return this._options;
        }
        set options(options) {
          this.config.options = options;
        }
        _initialize() {
          this.notifyPlugins("beforeInit");
          if (this.options.responsive) {
            this.resize();
          } else {
            retinaScale(this, this.options.devicePixelRatio);
          }
          this.bindEvents();
          this.notifyPlugins("afterInit");
          return this;
        }
        clear() {
          clearCanvas(this.canvas, this.ctx);
          return this;
        }
        stop() {
          animator.stop(this);
          return this;
        }
        resize(width, height) {
          if (!animator.running(this)) {
            this._resize(width, height);
          } else {
            this._resizeBeforeDraw = { width, height };
          }
        }
        _resize(width, height) {
          const options = this.options;
          const canvas = this.canvas;
          const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
          const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
          const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
          const mode = this.width ? "resize" : "attach";
          this.width = newSize.width;
          this.height = newSize.height;
          this._aspectRatio = this.aspectRatio;
          if (!retinaScale(this, newRatio, true)) {
            return;
          }
          this.notifyPlugins("resize", { size: newSize });
          callback(options.onResize, [this, newSize], this);
          if (this.attached) {
            if (this._doResize(mode)) {
              this.render();
            }
          }
        }
        ensureScalesHaveIDs() {
          const options = this.options;
          const scalesOptions = options.scales || {};
          each(scalesOptions, (axisOptions, axisID) => {
            axisOptions.id = axisID;
          });
        }
        buildOrUpdateScales() {
          const options = this.options;
          const scaleOpts = options.scales;
          const scales2 = this.scales;
          const updated2 = Object.keys(scales2).reduce((obj, id) => {
            obj[id] = false;
            return obj;
          }, {});
          let items = [];
          if (scaleOpts) {
            items = items.concat(Object.keys(scaleOpts).map((id) => {
              const scaleOptions = scaleOpts[id];
              const axis = determineAxis(id, scaleOptions);
              const isRadial = axis === "r";
              const isHorizontal = axis === "x";
              return {
                options: scaleOptions,
                dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
                dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
              };
            }));
          }
          each(items, (item) => {
            const scaleOptions = item.options;
            const id = scaleOptions.id;
            const axis = determineAxis(id, scaleOptions);
            const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
            if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
              scaleOptions.position = item.dposition;
            }
            updated2[id] = true;
            let scale = null;
            if (id in scales2 && scales2[id].type === scaleType) {
              scale = scales2[id];
            } else {
              const scaleClass = registry.getScale(scaleType);
              scale = new scaleClass({
                id,
                type: scaleType,
                ctx: this.ctx,
                chart: this
              });
              scales2[scale.id] = scale;
            }
            scale.init(scaleOptions, options);
          });
          each(updated2, (hasUpdated, id) => {
            if (!hasUpdated) {
              delete scales2[id];
            }
          });
          each(scales2, (scale) => {
            layouts.configure(this, scale, scale.options);
            layouts.addBox(this, scale);
          });
        }
        _updateMetasets() {
          const metasets = this._metasets;
          const numData = this.data.datasets.length;
          const numMeta = metasets.length;
          metasets.sort((a, b) => a.index - b.index);
          if (numMeta > numData) {
            for (let i2 = numData; i2 < numMeta; ++i2) {
              this._destroyDatasetMeta(i2);
            }
            metasets.splice(numData, numMeta - numData);
          }
          this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
        }
        _removeUnreferencedMetasets() {
          const { _metasets: metasets, data: { datasets } } = this;
          if (metasets.length > datasets.length) {
            delete this._stacks;
          }
          metasets.forEach((meta, index) => {
            if (datasets.filter((x2) => x2 === meta._dataset).length === 0) {
              this._destroyDatasetMeta(index);
            }
          });
        }
        buildOrUpdateControllers() {
          const newControllers = [];
          const datasets = this.data.datasets;
          let i2, ilen;
          this._removeUnreferencedMetasets();
          for (i2 = 0, ilen = datasets.length; i2 < ilen; i2++) {
            const dataset = datasets[i2];
            let meta = this.getDatasetMeta(i2);
            const type = dataset.type || this.config.type;
            if (meta.type && meta.type !== type) {
              this._destroyDatasetMeta(i2);
              meta = this.getDatasetMeta(i2);
            }
            meta.type = type;
            meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
            meta.order = dataset.order || 0;
            meta.index = i2;
            meta.label = "" + dataset.label;
            meta.visible = this.isDatasetVisible(i2);
            if (meta.controller) {
              meta.controller.updateIndex(i2);
              meta.controller.linkScales();
            } else {
              const ControllerClass = registry.getController(type);
              const { datasetElementType, dataElementType } = defaults.datasets[type];
              Object.assign(ControllerClass.prototype, {
                dataElementType: registry.getElement(dataElementType),
                datasetElementType: datasetElementType && registry.getElement(datasetElementType)
              });
              meta.controller = new ControllerClass(this, i2);
              newControllers.push(meta.controller);
            }
          }
          this._updateMetasets();
          return newControllers;
        }
        _resetElements() {
          each(this.data.datasets, (dataset, datasetIndex) => {
            this.getDatasetMeta(datasetIndex).controller.reset();
          }, this);
        }
        reset() {
          this._resetElements();
          this.notifyPlugins("reset");
        }
        update(mode) {
          const config = this.config;
          config.update();
          const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
          const animsDisabled = this._animationsDisabled = !options.animation;
          this._updateScales();
          this._checkEventBindings();
          this._updateHiddenIndices();
          this._plugins.invalidate();
          if (this.notifyPlugins("beforeUpdate", { mode, cancelable: true }) === false) {
            return;
          }
          const newControllers = this.buildOrUpdateControllers();
          this.notifyPlugins("beforeElementsUpdate");
          let minPadding = 0;
          for (let i2 = 0, ilen = this.data.datasets.length; i2 < ilen; i2++) {
            const { controller } = this.getDatasetMeta(i2);
            const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
            controller.buildOrUpdateElements(reset);
            minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
          }
          minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
          this._updateLayout(minPadding);
          if (!animsDisabled) {
            each(newControllers, (controller) => {
              controller.reset();
            });
          }
          this._updateDatasets(mode);
          this.notifyPlugins("afterUpdate", { mode });
          this._layers.sort(compare2Level("z", "_idx"));
          const { _active, _lastEvent } = this;
          if (_lastEvent) {
            this._eventHandler(_lastEvent, true);
          } else if (_active.length) {
            this._updateHoverStyles(_active, _active, true);
          }
          this.render();
        }
        _updateScales() {
          each(this.scales, (scale) => {
            layouts.removeBox(this, scale);
          });
          this.ensureScalesHaveIDs();
          this.buildOrUpdateScales();
        }
        _checkEventBindings() {
          const options = this.options;
          const existingEvents = new Set(Object.keys(this._listeners));
          const newEvents = new Set(options.events);
          if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
            this.unbindEvents();
            this.bindEvents();
          }
        }
        _updateHiddenIndices() {
          const { _hiddenIndices } = this;
          const changes = this._getUniformDataChanges() || [];
          for (const { method, start, count } of changes) {
            const move = method === "_removeElements" ? -count : count;
            moveNumericKeys(_hiddenIndices, start, move);
          }
        }
        _getUniformDataChanges() {
          const _dataChanges = this._dataChanges;
          if (!_dataChanges || !_dataChanges.length) {
            return;
          }
          this._dataChanges = [];
          const datasetCount = this.data.datasets.length;
          const makeSet = (idx) => new Set(_dataChanges.filter((c) => c[0] === idx).map((c, i2) => i2 + "," + c.splice(1).join(",")));
          const changeSet = makeSet(0);
          for (let i2 = 1; i2 < datasetCount; i2++) {
            if (!setsEqual(changeSet, makeSet(i2))) {
              return;
            }
          }
          return Array.from(changeSet).map((c) => c.split(",")).map((a) => ({ method: a[1], start: +a[2], count: +a[3] }));
        }
        _updateLayout(minPadding) {
          if (this.notifyPlugins("beforeLayout", { cancelable: true }) === false) {
            return;
          }
          layouts.update(this, this.width, this.height, minPadding);
          const area = this.chartArea;
          const noArea = area.width <= 0 || area.height <= 0;
          this._layers = [];
          each(this.boxes, (box) => {
            if (noArea && box.position === "chartArea") {
              return;
            }
            if (box.configure) {
              box.configure();
            }
            this._layers.push(...box._layers());
          }, this);
          this._layers.forEach((item, index) => {
            item._idx = index;
          });
          this.notifyPlugins("afterLayout");
        }
        _updateDatasets(mode) {
          if (this.notifyPlugins("beforeDatasetsUpdate", { mode, cancelable: true }) === false) {
            return;
          }
          for (let i2 = 0, ilen = this.data.datasets.length; i2 < ilen; ++i2) {
            this.getDatasetMeta(i2).controller.configure();
          }
          for (let i2 = 0, ilen = this.data.datasets.length; i2 < ilen; ++i2) {
            this._updateDataset(i2, isFunction(mode) ? mode({ datasetIndex: i2 }) : mode);
          }
          this.notifyPlugins("afterDatasetsUpdate", { mode });
        }
        _updateDataset(index, mode) {
          const meta = this.getDatasetMeta(index);
          const args = { meta, index, mode, cancelable: true };
          if (this.notifyPlugins("beforeDatasetUpdate", args) === false) {
            return;
          }
          meta.controller._update(mode);
          args.cancelable = false;
          this.notifyPlugins("afterDatasetUpdate", args);
        }
        render() {
          if (this.notifyPlugins("beforeRender", { cancelable: true }) === false) {
            return;
          }
          if (animator.has(this)) {
            if (this.attached && !animator.running(this)) {
              animator.start(this);
            }
          } else {
            this.draw();
            onAnimationsComplete({ chart: this });
          }
        }
        draw() {
          let i2;
          if (this._resizeBeforeDraw) {
            const { width, height } = this._resizeBeforeDraw;
            this._resize(width, height);
            this._resizeBeforeDraw = null;
          }
          this.clear();
          if (this.width <= 0 || this.height <= 0) {
            return;
          }
          if (this.notifyPlugins("beforeDraw", { cancelable: true }) === false) {
            return;
          }
          const layers = this._layers;
          for (i2 = 0; i2 < layers.length && layers[i2].z <= 0; ++i2) {
            layers[i2].draw(this.chartArea);
          }
          this._drawDatasets();
          for (; i2 < layers.length; ++i2) {
            layers[i2].draw(this.chartArea);
          }
          this.notifyPlugins("afterDraw");
        }
        _getSortedDatasetMetas(filterVisible) {
          const metasets = this._sortedMetasets;
          const result = [];
          let i2, ilen;
          for (i2 = 0, ilen = metasets.length; i2 < ilen; ++i2) {
            const meta = metasets[i2];
            if (!filterVisible || meta.visible) {
              result.push(meta);
            }
          }
          return result;
        }
        getSortedVisibleDatasetMetas() {
          return this._getSortedDatasetMetas(true);
        }
        _drawDatasets() {
          if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: true }) === false) {
            return;
          }
          const metasets = this.getSortedVisibleDatasetMetas();
          for (let i2 = metasets.length - 1; i2 >= 0; --i2) {
            this._drawDataset(metasets[i2]);
          }
          this.notifyPlugins("afterDatasetsDraw");
        }
        _drawDataset(meta) {
          const ctx = this.ctx;
          const clip = meta._clip;
          const useClip = !clip.disabled;
          const area = this.chartArea;
          const args = {
            meta,
            index: meta.index,
            cancelable: true
          };
          if (this.notifyPlugins("beforeDatasetDraw", args) === false) {
            return;
          }
          if (useClip) {
            clipArea(ctx, {
              left: clip.left === false ? 0 : area.left - clip.left,
              right: clip.right === false ? this.width : area.right + clip.right,
              top: clip.top === false ? 0 : area.top - clip.top,
              bottom: clip.bottom === false ? this.height : area.bottom + clip.bottom
            });
          }
          meta.controller.draw();
          if (useClip) {
            unclipArea(ctx);
          }
          args.cancelable = false;
          this.notifyPlugins("afterDatasetDraw", args);
        }
        getElementsAtEventForMode(e2, mode, options, useFinalPosition) {
          const method = Interaction.modes[mode];
          if (typeof method === "function") {
            return method(this, e2, options, useFinalPosition);
          }
          return [];
        }
        getDatasetMeta(datasetIndex) {
          const dataset = this.data.datasets[datasetIndex];
          const metasets = this._metasets;
          let meta = metasets.filter((x2) => x2 && x2._dataset === dataset).pop();
          if (!meta) {
            meta = {
              type: null,
              data: [],
              dataset: null,
              controller: null,
              hidden: null,
              xAxisID: null,
              yAxisID: null,
              order: dataset && dataset.order || 0,
              index: datasetIndex,
              _dataset: dataset,
              _parsed: [],
              _sorted: false
            };
            metasets.push(meta);
          }
          return meta;
        }
        getContext() {
          return this.$context || (this.$context = createContext(null, { chart: this, type: "chart" }));
        }
        getVisibleDatasetCount() {
          return this.getSortedVisibleDatasetMetas().length;
        }
        isDatasetVisible(datasetIndex) {
          const dataset = this.data.datasets[datasetIndex];
          if (!dataset) {
            return false;
          }
          const meta = this.getDatasetMeta(datasetIndex);
          return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
        }
        setDatasetVisibility(datasetIndex, visible) {
          const meta = this.getDatasetMeta(datasetIndex);
          meta.hidden = !visible;
        }
        toggleDataVisibility(index) {
          this._hiddenIndices[index] = !this._hiddenIndices[index];
        }
        getDataVisibility(index) {
          return !this._hiddenIndices[index];
        }
        _updateVisibility(datasetIndex, dataIndex, visible) {
          const mode = visible ? "show" : "hide";
          const meta = this.getDatasetMeta(datasetIndex);
          const anims = meta.controller._resolveAnimations(void 0, mode);
          if (defined(dataIndex)) {
            meta.data[dataIndex].hidden = !visible;
            this.update();
          } else {
            this.setDatasetVisibility(datasetIndex, visible);
            anims.update(meta, { visible });
            this.update((ctx) => ctx.datasetIndex === datasetIndex ? mode : void 0);
          }
        }
        hide(datasetIndex, dataIndex) {
          this._updateVisibility(datasetIndex, dataIndex, false);
        }
        show(datasetIndex, dataIndex) {
          this._updateVisibility(datasetIndex, dataIndex, true);
        }
        _destroyDatasetMeta(datasetIndex) {
          const meta = this._metasets[datasetIndex];
          if (meta && meta.controller) {
            meta.controller._destroy();
          }
          delete this._metasets[datasetIndex];
        }
        _stop() {
          let i2, ilen;
          this.stop();
          animator.remove(this);
          for (i2 = 0, ilen = this.data.datasets.length; i2 < ilen; ++i2) {
            this._destroyDatasetMeta(i2);
          }
        }
        destroy() {
          this.notifyPlugins("beforeDestroy");
          const { canvas, ctx } = this;
          this._stop();
          this.config.clearCache();
          if (canvas) {
            this.unbindEvents();
            clearCanvas(canvas, ctx);
            this.platform.releaseContext(ctx);
            this.canvas = null;
            this.ctx = null;
          }
          this.notifyPlugins("destroy");
          delete instances[this.id];
          this.notifyPlugins("afterDestroy");
        }
        toBase64Image(...args) {
          return this.canvas.toDataURL(...args);
        }
        bindEvents() {
          this.bindUserEvents();
          if (this.options.responsive) {
            this.bindResponsiveEvents();
          } else {
            this.attached = true;
          }
        }
        bindUserEvents() {
          const listeners = this._listeners;
          const platform = this.platform;
          const _add = (type, listener2) => {
            platform.addEventListener(this, type, listener2);
            listeners[type] = listener2;
          };
          const listener = (e2, x2, y) => {
            e2.offsetX = x2;
            e2.offsetY = y;
            this._eventHandler(e2);
          };
          each(this.options.events, (type) => _add(type, listener));
        }
        bindResponsiveEvents() {
          if (!this._responsiveListeners) {
            this._responsiveListeners = {};
          }
          const listeners = this._responsiveListeners;
          const platform = this.platform;
          const _add = (type, listener2) => {
            platform.addEventListener(this, type, listener2);
            listeners[type] = listener2;
          };
          const _remove = (type, listener2) => {
            if (listeners[type]) {
              platform.removeEventListener(this, type, listener2);
              delete listeners[type];
            }
          };
          const listener = (width, height) => {
            if (this.canvas) {
              this.resize(width, height);
            }
          };
          let detached;
          const attached = () => {
            _remove("attach", attached);
            this.attached = true;
            this.resize();
            _add("resize", listener);
            _add("detach", detached);
          };
          detached = () => {
            this.attached = false;
            _remove("resize", listener);
            this._stop();
            this._resize(0, 0);
            _add("attach", attached);
          };
          if (platform.isAttached(this.canvas)) {
            attached();
          } else {
            detached();
          }
        }
        unbindEvents() {
          each(this._listeners, (listener, type) => {
            this.platform.removeEventListener(this, type, listener);
          });
          this._listeners = {};
          each(this._responsiveListeners, (listener, type) => {
            this.platform.removeEventListener(this, type, listener);
          });
          this._responsiveListeners = void 0;
        }
        updateHoverStyle(items, mode, enabled) {
          const prefix = enabled ? "set" : "remove";
          let meta, item, i2, ilen;
          if (mode === "dataset") {
            meta = this.getDatasetMeta(items[0].datasetIndex);
            meta.controller["_" + prefix + "DatasetHoverStyle"]();
          }
          for (i2 = 0, ilen = items.length; i2 < ilen; ++i2) {
            item = items[i2];
            const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
            if (controller) {
              controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
            }
          }
        }
        getActiveElements() {
          return this._active || [];
        }
        setActiveElements(activeElements) {
          const lastActive = this._active || [];
          const active = activeElements.map(({ datasetIndex, index }) => {
            const meta = this.getDatasetMeta(datasetIndex);
            if (!meta) {
              throw new Error("No dataset found at index " + datasetIndex);
            }
            return {
              datasetIndex,
              element: meta.data[index],
              index
            };
          });
          const changed = !_elementsEqual(active, lastActive);
          if (changed) {
            this._active = active;
            this._lastEvent = null;
            this._updateHoverStyles(active, lastActive);
          }
        }
        notifyPlugins(hook, args, filter) {
          return this._plugins.notify(this, hook, args, filter);
        }
        _updateHoverStyles(active, lastActive, replay) {
          const hoverOptions = this.options.hover;
          const diff = (a, b) => a.filter((x2) => !b.some((y) => x2.datasetIndex === y.datasetIndex && x2.index === y.index));
          const deactivated = diff(lastActive, active);
          const activated = replay ? active : diff(active, lastActive);
          if (deactivated.length) {
            this.updateHoverStyle(deactivated, hoverOptions.mode, false);
          }
          if (activated.length && hoverOptions.mode) {
            this.updateHoverStyle(activated, hoverOptions.mode, true);
          }
        }
        _eventHandler(e2, replay) {
          const args = {
            event: e2,
            replay,
            cancelable: true,
            inChartArea: _isPointInArea(e2, this.chartArea, this._minPadding)
          };
          const eventFilter = (plugin) => (plugin.options.events || this.options.events).includes(e2.native.type);
          if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) {
            return;
          }
          const changed = this._handleEvent(e2, replay, args.inChartArea);
          args.cancelable = false;
          this.notifyPlugins("afterEvent", args, eventFilter);
          if (changed || args.changed) {
            this.render();
          }
          return this;
        }
        _handleEvent(e2, replay, inChartArea) {
          const { _active: lastActive = [], options } = this;
          const useFinalPosition = replay;
          const active = this._getActiveElements(e2, lastActive, inChartArea, useFinalPosition);
          const isClick = _isClickEvent(e2);
          const lastEvent = determineLastEvent(e2, this._lastEvent, inChartArea, isClick);
          if (inChartArea) {
            this._lastEvent = null;
            callback(options.onHover, [e2, active, this], this);
            if (isClick) {
              callback(options.onClick, [e2, active, this], this);
            }
          }
          const changed = !_elementsEqual(active, lastActive);
          if (changed || replay) {
            this._active = active;
            this._updateHoverStyles(active, lastActive, replay);
          }
          this._lastEvent = lastEvent;
          return changed;
        }
        _getActiveElements(e2, lastActive, inChartArea, useFinalPosition) {
          if (e2.type === "mouseout") {
            return [];
          }
          if (!inChartArea) {
            return lastActive;
          }
          const hoverOptions = this.options.hover;
          return this.getElementsAtEventForMode(e2, hoverOptions.mode, hoverOptions, useFinalPosition);
        }
      }
      const invalidatePlugins = () => each(Chart.instances, (chart) => chart._plugins.invalidate());
      const enumerable = true;
      Object.defineProperties(Chart, {
        defaults: {
          enumerable,
          value: defaults
        },
        instances: {
          enumerable,
          value: instances
        },
        overrides: {
          enumerable,
          value: overrides
        },
        registry: {
          enumerable,
          value: registry
        },
        version: {
          enumerable,
          value: version
        },
        getChart: {
          enumerable,
          value: getChart
        },
        register: {
          enumerable,
          value: (...items) => {
            registry.add(...items);
            invalidatePlugins();
          }
        },
        unregister: {
          enumerable,
          value: (...items) => {
            registry.remove(...items);
            invalidatePlugins();
          }
        }
      });
      function abstract() {
        throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
      }
      class DateAdapter {
        constructor(options) {
          this.options = options || {};
        }
        formats() {
          return abstract();
        }
        parse(value, format2) {
          return abstract();
        }
        format(timestamp, format2) {
          return abstract();
        }
        add(timestamp, amount, unit) {
          return abstract();
        }
        diff(a, b, unit) {
          return abstract();
        }
        startOf(timestamp, unit, weekday) {
          return abstract();
        }
        endOf(timestamp, unit) {
          return abstract();
        }
      }
      DateAdapter.override = function(members) {
        Object.assign(DateAdapter.prototype, members);
      };
      var _adapters = {
        _date: DateAdapter
      };
      function getAllScaleValues(scale, type) {
        if (!scale._cache.$bar) {
          const visibleMetas = scale.getMatchingVisibleMetas(type);
          let values = [];
          for (let i2 = 0, ilen = visibleMetas.length; i2 < ilen; i2++) {
            values = values.concat(visibleMetas[i2].controller.getAllParsedValues(scale));
          }
          scale._cache.$bar = _arrayUnique(values.sort((a, b) => a - b));
        }
        return scale._cache.$bar;
      }
      function computeMinSampleSize(meta) {
        const scale = meta.iScale;
        const values = getAllScaleValues(scale, meta.type);
        let min = scale._length;
        let i2, ilen, curr, prev;
        const updateMinAndPrev = () => {
          if (curr === 32767 || curr === -32768) {
            return;
          }
          if (defined(prev)) {
            min = Math.min(min, Math.abs(curr - prev) || min);
          }
          prev = curr;
        };
        for (i2 = 0, ilen = values.length; i2 < ilen; ++i2) {
          curr = scale.getPixelForValue(values[i2]);
          updateMinAndPrev();
        }
        prev = void 0;
        for (i2 = 0, ilen = scale.ticks.length; i2 < ilen; ++i2) {
          curr = scale.getPixelForTick(i2);
          updateMinAndPrev();
        }
        return min;
      }
      function computeFitCategoryTraits(index, ruler, options, stackCount) {
        const thickness = options.barThickness;
        let size, ratio;
        if (isNullOrUndef(thickness)) {
          size = ruler.min * options.categoryPercentage;
          ratio = options.barPercentage;
        } else {
          size = thickness * stackCount;
          ratio = 1;
        }
        return {
          chunk: size / stackCount,
          ratio,
          start: ruler.pixels[index] - size / 2
        };
      }
      function computeFlexCategoryTraits(index, ruler, options, stackCount) {
        const pixels = ruler.pixels;
        const curr = pixels[index];
        let prev = index > 0 ? pixels[index - 1] : null;
        let next = index < pixels.length - 1 ? pixels[index + 1] : null;
        const percent = options.categoryPercentage;
        if (prev === null) {
          prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
        }
        if (next === null) {
          next = curr + curr - prev;
        }
        const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
        const size = Math.abs(next - prev) / 2 * percent;
        return {
          chunk: size / stackCount,
          ratio: options.barPercentage,
          start
        };
      }
      function parseFloatBar(entry4, item, vScale, i2) {
        const startValue = vScale.parse(entry4[0], i2);
        const endValue = vScale.parse(entry4[1], i2);
        const min = Math.min(startValue, endValue);
        const max = Math.max(startValue, endValue);
        let barStart = min;
        let barEnd = max;
        if (Math.abs(min) > Math.abs(max)) {
          barStart = max;
          barEnd = min;
        }
        item[vScale.axis] = barEnd;
        item._custom = {
          barStart,
          barEnd,
          start: startValue,
          end: endValue,
          min,
          max
        };
      }
      function parseValue(entry4, item, vScale, i2) {
        if (isArray(entry4)) {
          parseFloatBar(entry4, item, vScale, i2);
        } else {
          item[vScale.axis] = vScale.parse(entry4, i2);
        }
        return item;
      }
      function parseArrayOrPrimitive(meta, data, start, count) {
        const iScale = meta.iScale;
        const vScale = meta.vScale;
        const labels = iScale.getLabels();
        const singleScale = iScale === vScale;
        const parsed = [];
        let i2, ilen, item, entry4;
        for (i2 = start, ilen = start + count; i2 < ilen; ++i2) {
          entry4 = data[i2];
          item = {};
          item[iScale.axis] = singleScale || iScale.parse(labels[i2], i2);
          parsed.push(parseValue(entry4, item, vScale, i2));
        }
        return parsed;
      }
      function isFloatBar(custom) {
        return custom && custom.barStart !== void 0 && custom.barEnd !== void 0;
      }
      function barSign(size, vScale, actualBase) {
        if (size !== 0) {
          return sign(size);
        }
        return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
      }
      function borderProps(properties) {
        let reverse, start, end, top, bottom;
        if (properties.horizontal) {
          reverse = properties.base > properties.x;
          start = "left";
          end = "right";
        } else {
          reverse = properties.base < properties.y;
          start = "bottom";
          end = "top";
        }
        if (reverse) {
          top = "end";
          bottom = "start";
        } else {
          top = "start";
          bottom = "end";
        }
        return { start, end, reverse, top, bottom };
      }
      function setBorderSkipped(properties, options, stack, index) {
        let edge = options.borderSkipped;
        const res = {};
        if (!edge) {
          properties.borderSkipped = res;
          return;
        }
        const { start, end, reverse, top, bottom } = borderProps(properties);
        if (edge === "middle" && stack) {
          properties.enableBorderRadius = true;
          if ((stack._top || 0) === index) {
            edge = top;
          } else if ((stack._bottom || 0) === index) {
            edge = bottom;
          } else {
            res[parseEdge(bottom, start, end, reverse)] = true;
            edge = top;
          }
        }
        res[parseEdge(edge, start, end, reverse)] = true;
        properties.borderSkipped = res;
      }
      function parseEdge(edge, a, b, reverse) {
        if (reverse) {
          edge = swap(edge, a, b);
          edge = startEnd(edge, b, a);
        } else {
          edge = startEnd(edge, a, b);
        }
        return edge;
      }
      function swap(orig, v1, v2) {
        return orig === v1 ? v2 : orig === v2 ? v1 : orig;
      }
      function startEnd(v, start, end) {
        return v === "start" ? start : v === "end" ? end : v;
      }
      function setInflateAmount(properties, { inflateAmount }, ratio) {
        properties.inflateAmount = inflateAmount === "auto" ? ratio === 1 ? 0.33 : 0 : inflateAmount;
      }
      class BarController extends DatasetController {
        parsePrimitiveData(meta, data, start, count) {
          return parseArrayOrPrimitive(meta, data, start, count);
        }
        parseArrayData(meta, data, start, count) {
          return parseArrayOrPrimitive(meta, data, start, count);
        }
        parseObjectData(meta, data, start, count) {
          const { iScale, vScale } = meta;
          const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
          const iAxisKey = iScale.axis === "x" ? xAxisKey : yAxisKey;
          const vAxisKey = vScale.axis === "x" ? xAxisKey : yAxisKey;
          const parsed = [];
          let i2, ilen, item, obj;
          for (i2 = start, ilen = start + count; i2 < ilen; ++i2) {
            obj = data[i2];
            item = {};
            item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i2);
            parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i2));
          }
          return parsed;
        }
        updateRangeFromParsed(range, scale, parsed, stack) {
          super.updateRangeFromParsed(range, scale, parsed, stack);
          const custom = parsed._custom;
          if (custom && scale === this._cachedMeta.vScale) {
            range.min = Math.min(range.min, custom.min);
            range.max = Math.max(range.max, custom.max);
          }
        }
        getMaxOverflow() {
          return 0;
        }
        getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const { iScale, vScale } = meta;
          const parsed = this.getParsed(index);
          const custom = parsed._custom;
          const value = isFloatBar(custom) ? "[" + custom.start + ", " + custom.end + "]" : "" + vScale.getLabelForValue(parsed[vScale.axis]);
          return {
            label: "" + iScale.getLabelForValue(parsed[iScale.axis]),
            value
          };
        }
        initialize() {
          this.enableOptionSharing = true;
          super.initialize();
          const meta = this._cachedMeta;
          meta.stack = this.getDataset().stack;
        }
        update(mode) {
          const meta = this._cachedMeta;
          this.updateElements(meta.data, 0, meta.data.length, mode);
        }
        updateElements(bars, start, count, mode) {
          const reset = mode === "reset";
          const { index, _cachedMeta: { vScale } } = this;
          const base2 = vScale.getBasePixel();
          const horizontal = vScale.isHorizontal();
          const ruler = this._getRuler();
          const firstOpts = this.resolveDataElementOptions(start, mode);
          const sharedOptions = this.getSharedOptions(firstOpts);
          const includeOptions = this.includeOptions(mode, sharedOptions);
          this.updateSharedOptions(sharedOptions, mode, firstOpts);
          for (let i2 = start; i2 < start + count; i2++) {
            const parsed = this.getParsed(i2);
            const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? { base: base2, head: base2 } : this._calculateBarValuePixels(i2);
            const ipixels = this._calculateBarIndexPixels(i2, ruler);
            const stack = (parsed._stacks || {})[vScale.axis];
            const properties = {
              horizontal,
              base: vpixels.base,
              enableBorderRadius: !stack || isFloatBar(parsed._custom) || (index === stack._top || index === stack._bottom),
              x: horizontal ? vpixels.head : ipixels.center,
              y: horizontal ? ipixels.center : vpixels.head,
              height: horizontal ? ipixels.size : Math.abs(vpixels.size),
              width: horizontal ? Math.abs(vpixels.size) : ipixels.size
            };
            if (includeOptions) {
              properties.options = sharedOptions || this.resolveDataElementOptions(i2, bars[i2].active ? "active" : mode);
            }
            const options = properties.options || bars[i2].options;
            setBorderSkipped(properties, options, stack, index);
            setInflateAmount(properties, options, ruler.ratio);
            this.updateElement(bars[i2], i2, properties, mode);
          }
        }
        _getStacks(last, dataIndex) {
          const meta = this._cachedMeta;
          const iScale = meta.iScale;
          const metasets = iScale.getMatchingVisibleMetas(this._type);
          const stacked = iScale.options.stacked;
          const ilen = metasets.length;
          const stacks = [];
          let i2, item;
          for (i2 = 0; i2 < ilen; ++i2) {
            item = metasets[i2];
            if (!item.controller.options.grouped) {
              continue;
            }
            if (typeof dataIndex !== "undefined") {
              const val = item.controller.getParsed(dataIndex)[item.controller._cachedMeta.vScale.axis];
              if (isNullOrUndef(val) || isNaN(val)) {
                continue;
              }
            }
            if (stacked === false || stacks.indexOf(item.stack) === -1 || stacked === void 0 && item.stack === void 0) {
              stacks.push(item.stack);
            }
            if (item.index === last) {
              break;
            }
          }
          if (!stacks.length) {
            stacks.push(void 0);
          }
          return stacks;
        }
        _getStackCount(index) {
          return this._getStacks(void 0, index).length;
        }
        _getStackIndex(datasetIndex, name, dataIndex) {
          const stacks = this._getStacks(datasetIndex, dataIndex);
          const index = name !== void 0 ? stacks.indexOf(name) : -1;
          return index === -1 ? stacks.length - 1 : index;
        }
        _getRuler() {
          const opts = this.options;
          const meta = this._cachedMeta;
          const iScale = meta.iScale;
          const pixels = [];
          let i2, ilen;
          for (i2 = 0, ilen = meta.data.length; i2 < ilen; ++i2) {
            pixels.push(iScale.getPixelForValue(this.getParsed(i2)[iScale.axis], i2));
          }
          const barThickness = opts.barThickness;
          const min = barThickness || computeMinSampleSize(meta);
          return {
            min,
            pixels,
            start: iScale._startPixel,
            end: iScale._endPixel,
            stackCount: this._getStackCount(),
            scale: iScale,
            grouped: opts.grouped,
            ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
          };
        }
        _calculateBarValuePixels(index) {
          const { _cachedMeta: { vScale, _stacked }, options: { base: baseValue, minBarLength } } = this;
          const actualBase = baseValue || 0;
          const parsed = this.getParsed(index);
          const custom = parsed._custom;
          const floating = isFloatBar(custom);
          let value = parsed[vScale.axis];
          let start = 0;
          let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
          let head, size;
          if (length !== value) {
            start = length - value;
            length = value;
          }
          if (floating) {
            value = custom.barStart;
            length = custom.barEnd - custom.barStart;
            if (value !== 0 && sign(value) !== sign(custom.barEnd)) {
              start = 0;
            }
            start += value;
          }
          const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
          let base2 = vScale.getPixelForValue(startValue);
          if (this.chart.getDataVisibility(index)) {
            head = vScale.getPixelForValue(start + length);
          } else {
            head = base2;
          }
          size = head - base2;
          if (Math.abs(size) < minBarLength) {
            size = barSign(size, vScale, actualBase) * minBarLength;
            if (value === actualBase) {
              base2 -= size / 2;
            }
            head = base2 + size;
          }
          if (base2 === vScale.getPixelForValue(actualBase)) {
            const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
            base2 += halfGrid;
            size -= halfGrid;
          }
          return {
            size,
            base: base2,
            head,
            center: head + size / 2
          };
        }
        _calculateBarIndexPixels(index, ruler) {
          const scale = ruler.scale;
          const options = this.options;
          const skipNull = options.skipNull;
          const maxBarThickness = valueOrDefault(options.maxBarThickness, Infinity);
          let center, size;
          if (ruler.grouped) {
            const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
            const range = options.barThickness === "flex" ? computeFlexCategoryTraits(index, ruler, options, stackCount) : computeFitCategoryTraits(index, ruler, options, stackCount);
            const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : void 0);
            center = range.start + range.chunk * stackIndex + range.chunk / 2;
            size = Math.min(maxBarThickness, range.chunk * range.ratio);
          } else {
            center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
            size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
          }
          return {
            base: center - size / 2,
            head: center + size / 2,
            center,
            size
          };
        }
        draw() {
          const meta = this._cachedMeta;
          const vScale = meta.vScale;
          const rects = meta.data;
          const ilen = rects.length;
          let i2 = 0;
          for (; i2 < ilen; ++i2) {
            if (this.getParsed(i2)[vScale.axis] !== null) {
              rects[i2].draw(this._ctx);
            }
          }
        }
      }
      BarController.id = "bar";
      BarController.defaults = {
        datasetElementType: false,
        dataElementType: "bar",
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        grouped: true,
        animations: {
          numbers: {
            type: "number",
            properties: ["x", "y", "base", "width", "height"]
          }
        }
      };
      BarController.overrides = {
        scales: {
          _index_: {
            type: "category",
            offset: true,
            grid: {
              offset: true
            }
          },
          _value_: {
            type: "linear",
            beginAtZero: true
          }
        }
      };
      class BubbleController extends DatasetController {
        initialize() {
          this.enableOptionSharing = true;
          super.initialize();
        }
        parsePrimitiveData(meta, data, start, count) {
          const parsed = super.parsePrimitiveData(meta, data, start, count);
          for (let i2 = 0; i2 < parsed.length; i2++) {
            parsed[i2]._custom = this.resolveDataElementOptions(i2 + start).radius;
          }
          return parsed;
        }
        parseArrayData(meta, data, start, count) {
          const parsed = super.parseArrayData(meta, data, start, count);
          for (let i2 = 0; i2 < parsed.length; i2++) {
            const item = data[start + i2];
            parsed[i2]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i2 + start).radius);
          }
          return parsed;
        }
        parseObjectData(meta, data, start, count) {
          const parsed = super.parseObjectData(meta, data, start, count);
          for (let i2 = 0; i2 < parsed.length; i2++) {
            const item = data[start + i2];
            parsed[i2]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i2 + start).radius);
          }
          return parsed;
        }
        getMaxOverflow() {
          const data = this._cachedMeta.data;
          let max = 0;
          for (let i2 = data.length - 1; i2 >= 0; --i2) {
            max = Math.max(max, data[i2].size(this.resolveDataElementOptions(i2)) / 2);
          }
          return max > 0 && max;
        }
        getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const { xScale, yScale } = meta;
          const parsed = this.getParsed(index);
          const x2 = xScale.getLabelForValue(parsed.x);
          const y = yScale.getLabelForValue(parsed.y);
          const r2 = parsed._custom;
          return {
            label: meta.label,
            value: "(" + x2 + ", " + y + (r2 ? ", " + r2 : "") + ")"
          };
        }
        update(mode) {
          const points = this._cachedMeta.data;
          this.updateElements(points, 0, points.length, mode);
        }
        updateElements(points, start, count, mode) {
          const reset = mode === "reset";
          const { iScale, vScale } = this._cachedMeta;
          const firstOpts = this.resolveDataElementOptions(start, mode);
          const sharedOptions = this.getSharedOptions(firstOpts);
          const includeOptions = this.includeOptions(mode, sharedOptions);
          const iAxis = iScale.axis;
          const vAxis = vScale.axis;
          for (let i2 = start; i2 < start + count; i2++) {
            const point = points[i2];
            const parsed = !reset && this.getParsed(i2);
            const properties = {};
            const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(parsed[iAxis]);
            const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
            properties.skip = isNaN(iPixel) || isNaN(vPixel);
            if (includeOptions) {
              properties.options = this.resolveDataElementOptions(i2, point.active ? "active" : mode);
              if (reset) {
                properties.options.radius = 0;
              }
            }
            this.updateElement(point, i2, properties, mode);
          }
          this.updateSharedOptions(sharedOptions, mode, firstOpts);
        }
        resolveDataElementOptions(index, mode) {
          const parsed = this.getParsed(index);
          let values = super.resolveDataElementOptions(index, mode);
          if (values.$shared) {
            values = Object.assign({}, values, { $shared: false });
          }
          const radius = values.radius;
          if (mode !== "active") {
            values.radius = 0;
          }
          values.radius += valueOrDefault(parsed && parsed._custom, radius);
          return values;
        }
      }
      BubbleController.id = "bubble";
      BubbleController.defaults = {
        datasetElementType: false,
        dataElementType: "point",
        animations: {
          numbers: {
            type: "number",
            properties: ["x", "y", "borderWidth", "radius"]
          }
        }
      };
      BubbleController.overrides = {
        scales: {
          x: {
            type: "linear"
          },
          y: {
            type: "linear"
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title() {
                return "";
              }
            }
          }
        }
      };
      function getRatioAndOffset(rotation, circumference, cutout) {
        let ratioX = 1;
        let ratioY = 1;
        let offsetX = 0;
        let offsetY = 0;
        if (circumference < TAU) {
          const startAngle = rotation;
          const endAngle = startAngle + circumference;
          const startX = Math.cos(startAngle);
          const startY = Math.sin(startAngle);
          const endX = Math.cos(endAngle);
          const endY = Math.sin(endAngle);
          const calcMax = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
          const calcMin = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
          const maxX = calcMax(0, startX, endX);
          const maxY = calcMax(HALF_PI, startY, endY);
          const minX = calcMin(PI, startX, endX);
          const minY = calcMin(PI + HALF_PI, startY, endY);
          ratioX = (maxX - minX) / 2;
          ratioY = (maxY - minY) / 2;
          offsetX = -(maxX + minX) / 2;
          offsetY = -(maxY + minY) / 2;
        }
        return { ratioX, ratioY, offsetX, offsetY };
      }
      class DoughnutController extends DatasetController {
        constructor(chart, datasetIndex) {
          super(chart, datasetIndex);
          this.enableOptionSharing = true;
          this.innerRadius = void 0;
          this.outerRadius = void 0;
          this.offsetX = void 0;
          this.offsetY = void 0;
        }
        linkScales() {
        }
        parse(start, count) {
          const data = this.getDataset().data;
          const meta = this._cachedMeta;
          if (this._parsing === false) {
            meta._parsed = data;
          } else {
            let getter = (i3) => +data[i3];
            if (isObject(data[start])) {
              const { key: key2 = "value" } = this._parsing;
              getter = (i3) => +resolveObjectKey(data[i3], key2);
            }
            let i2, ilen;
            for (i2 = start, ilen = start + count; i2 < ilen; ++i2) {
              meta._parsed[i2] = getter(i2);
            }
          }
        }
        _getRotation() {
          return toRadians(this.options.rotation - 90);
        }
        _getCircumference() {
          return toRadians(this.options.circumference);
        }
        _getRotationExtents() {
          let min = TAU;
          let max = -TAU;
          for (let i2 = 0; i2 < this.chart.data.datasets.length; ++i2) {
            if (this.chart.isDatasetVisible(i2)) {
              const controller = this.chart.getDatasetMeta(i2).controller;
              const rotation = controller._getRotation();
              const circumference = controller._getCircumference();
              min = Math.min(min, rotation);
              max = Math.max(max, rotation + circumference);
            }
          }
          return {
            rotation: min,
            circumference: max - min
          };
        }
        update(mode) {
          const chart = this.chart;
          const { chartArea } = chart;
          const meta = this._cachedMeta;
          const arcs = meta.data;
          const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
          const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
          const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
          const chartWeight = this._getRingWeight(this.index);
          const { circumference, rotation } = this._getRotationExtents();
          const { ratioX, ratioY, offsetX, offsetY } = getRatioAndOffset(rotation, circumference, cutout);
          const maxWidth = (chartArea.width - spacing) / ratioX;
          const maxHeight = (chartArea.height - spacing) / ratioY;
          const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
          const outerRadius = toDimension(this.options.radius, maxRadius);
          const innerRadius = Math.max(outerRadius * cutout, 0);
          const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
          this.offsetX = offsetX * outerRadius;
          this.offsetY = offsetY * outerRadius;
          meta.total = this.calculateTotal();
          this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
          this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
          this.updateElements(arcs, 0, arcs.length, mode);
        }
        _circumference(i2, reset) {
          const opts = this.options;
          const meta = this._cachedMeta;
          const circumference = this._getCircumference();
          if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i2) || meta._parsed[i2] === null || meta.data[i2].hidden) {
            return 0;
          }
          return this.calculateCircumference(meta._parsed[i2] * circumference / TAU);
        }
        updateElements(arcs, start, count, mode) {
          const reset = mode === "reset";
          const chart = this.chart;
          const chartArea = chart.chartArea;
          const opts = chart.options;
          const animationOpts = opts.animation;
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;
          const animateScale = reset && animationOpts.animateScale;
          const innerRadius = animateScale ? 0 : this.innerRadius;
          const outerRadius = animateScale ? 0 : this.outerRadius;
          const firstOpts = this.resolveDataElementOptions(start, mode);
          const sharedOptions = this.getSharedOptions(firstOpts);
          const includeOptions = this.includeOptions(mode, sharedOptions);
          let startAngle = this._getRotation();
          let i2;
          for (i2 = 0; i2 < start; ++i2) {
            startAngle += this._circumference(i2, reset);
          }
          for (i2 = start; i2 < start + count; ++i2) {
            const circumference = this._circumference(i2, reset);
            const arc = arcs[i2];
            const properties = {
              x: centerX + this.offsetX,
              y: centerY + this.offsetY,
              startAngle,
              endAngle: startAngle + circumference,
              circumference,
              outerRadius,
              innerRadius
            };
            if (includeOptions) {
              properties.options = sharedOptions || this.resolveDataElementOptions(i2, arc.active ? "active" : mode);
            }
            startAngle += circumference;
            this.updateElement(arc, i2, properties, mode);
          }
          this.updateSharedOptions(sharedOptions, mode, firstOpts);
        }
        calculateTotal() {
          const meta = this._cachedMeta;
          const metaData = meta.data;
          let total = 0;
          let i2;
          for (i2 = 0; i2 < metaData.length; i2++) {
            const value = meta._parsed[i2];
            if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i2) && !metaData[i2].hidden) {
              total += Math.abs(value);
            }
          }
          return total;
        }
        calculateCircumference(value) {
          const total = this._cachedMeta.total;
          if (total > 0 && !isNaN(value)) {
            return TAU * (Math.abs(value) / total);
          }
          return 0;
        }
        getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const chart = this.chart;
          const labels = chart.data.labels || [];
          const value = formatNumber(meta._parsed[index], chart.options.locale);
          return {
            label: labels[index] || "",
            value
          };
        }
        getMaxBorderWidth(arcs) {
          let max = 0;
          const chart = this.chart;
          let i2, ilen, meta, controller, options;
          if (!arcs) {
            for (i2 = 0, ilen = chart.data.datasets.length; i2 < ilen; ++i2) {
              if (chart.isDatasetVisible(i2)) {
                meta = chart.getDatasetMeta(i2);
                arcs = meta.data;
                controller = meta.controller;
                break;
              }
            }
          }
          if (!arcs) {
            return 0;
          }
          for (i2 = 0, ilen = arcs.length; i2 < ilen; ++i2) {
            options = controller.resolveDataElementOptions(i2);
            if (options.borderAlign !== "inner") {
              max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
            }
          }
          return max;
        }
        getMaxOffset(arcs) {
          let max = 0;
          for (let i2 = 0, ilen = arcs.length; i2 < ilen; ++i2) {
            const options = this.resolveDataElementOptions(i2);
            max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
          }
          return max;
        }
        _getRingWeightOffset(datasetIndex) {
          let ringWeightOffset = 0;
          for (let i2 = 0; i2 < datasetIndex; ++i2) {
            if (this.chart.isDatasetVisible(i2)) {
              ringWeightOffset += this._getRingWeight(i2);
            }
          }
          return ringWeightOffset;
        }
        _getRingWeight(datasetIndex) {
          return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
        }
        _getVisibleDatasetWeightTotal() {
          return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
        }
      }
      DoughnutController.id = "doughnut";
      DoughnutController.defaults = {
        datasetElementType: false,
        dataElementType: "arc",
        animation: {
          animateRotate: true,
          animateScale: false
        },
        animations: {
          numbers: {
            type: "number",
            properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"]
          }
        },
        cutout: "50%",
        rotation: 0,
        circumference: 360,
        radius: "100%",
        spacing: 0,
        indexAxis: "r"
      };
      DoughnutController.descriptors = {
        _scriptable: (name) => name !== "spacing",
        _indexable: (name) => name !== "spacing"
      };
      DoughnutController.overrides = {
        aspectRatio: 1,
        plugins: {
          legend: {
            labels: {
              generateLabels(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  const { labels: { pointStyle } } = chart.legend.options;
                  return data.labels.map((label, i2) => {
                    const meta = chart.getDatasetMeta(0);
                    const style = meta.controller.getStyle(i2);
                    return {
                      text: label,
                      fillStyle: style.backgroundColor,
                      strokeStyle: style.borderColor,
                      lineWidth: style.borderWidth,
                      pointStyle,
                      hidden: !chart.getDataVisibility(i2),
                      index: i2
                    };
                  });
                }
                return [];
              }
            },
            onClick(e2, legendItem, legend) {
              legend.chart.toggleDataVisibility(legendItem.index);
              legend.chart.update();
            }
          },
          tooltip: {
            callbacks: {
              title() {
                return "";
              },
              label(tooltipItem) {
                let dataLabel = tooltipItem.label;
                const value = ": " + tooltipItem.formattedValue;
                if (isArray(dataLabel)) {
                  dataLabel = dataLabel.slice();
                  dataLabel[0] += value;
                } else {
                  dataLabel += value;
                }
                return dataLabel;
              }
            }
          }
        }
      };
      class LineController extends DatasetController {
        initialize() {
          this.enableOptionSharing = true;
          super.initialize();
        }
        update(mode) {
          const meta = this._cachedMeta;
          const { dataset: line, data: points = [], _dataset } = meta;
          const animationsDisabled = this.chart._animationsDisabled;
          let { start, count } = getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
          this._drawStart = start;
          this._drawCount = count;
          if (scaleRangesChanged(meta)) {
            start = 0;
            count = points.length;
          }
          line._chart = this.chart;
          line._datasetIndex = this.index;
          line._decimated = !!_dataset._decimated;
          line.points = points;
          const options = this.resolveDatasetElementOptions(mode);
          if (!this.options.showLine) {
            options.borderWidth = 0;
          }
          options.segment = this.options.segment;
          this.updateElement(line, void 0, {
            animated: !animationsDisabled,
            options
          }, mode);
          this.updateElements(points, start, count, mode);
        }
        updateElements(points, start, count, mode) {
          const reset = mode === "reset";
          const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
          const firstOpts = this.resolveDataElementOptions(start, mode);
          const sharedOptions = this.getSharedOptions(firstOpts);
          const includeOptions = this.includeOptions(mode, sharedOptions);
          const iAxis = iScale.axis;
          const vAxis = vScale.axis;
          const { spanGaps, segment } = this.options;
          const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
          const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
          let prevParsed = start > 0 && this.getParsed(start - 1);
          for (let i2 = start; i2 < start + count; ++i2) {
            const point = points[i2];
            const parsed = this.getParsed(i2);
            const properties = directUpdate ? point : {};
            const nullData = isNullOrUndef(parsed[vAxis]);
            const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i2);
            const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i2);
            properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
            properties.stop = i2 > 0 && parsed[iAxis] - prevParsed[iAxis] > maxGapLength;
            if (segment) {
              properties.parsed = parsed;
              properties.raw = _dataset.data[i2];
            }
            if (includeOptions) {
              properties.options = sharedOptions || this.resolveDataElementOptions(i2, point.active ? "active" : mode);
            }
            if (!directUpdate) {
              this.updateElement(point, i2, properties, mode);
            }
            prevParsed = parsed;
          }
          this.updateSharedOptions(sharedOptions, mode, firstOpts);
        }
        getMaxOverflow() {
          const meta = this._cachedMeta;
          const dataset = meta.dataset;
          const border = dataset.options && dataset.options.borderWidth || 0;
          const data = meta.data || [];
          if (!data.length) {
            return border;
          }
          const firstPoint = data[0].size(this.resolveDataElementOptions(0));
          const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
          return Math.max(border, firstPoint, lastPoint) / 2;
        }
        draw() {
          const meta = this._cachedMeta;
          meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
          super.draw();
        }
      }
      LineController.id = "line";
      LineController.defaults = {
        datasetElementType: "line",
        dataElementType: "point",
        showLine: true,
        spanGaps: false
      };
      LineController.overrides = {
        scales: {
          _index_: {
            type: "category"
          },
          _value_: {
            type: "linear"
          }
        }
      };
      function getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
        const pointCount = points.length;
        let start = 0;
        let count = pointCount;
        if (meta._sorted) {
          const { iScale, _parsed } = meta;
          const axis = iScale.axis;
          const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
          if (minDefined) {
            start = _limitValue(Math.min(_lookupByKey(_parsed, iScale.axis, min).lo, animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo), 0, pointCount - 1);
          }
          if (maxDefined) {
            count = _limitValue(Math.max(_lookupByKey(_parsed, iScale.axis, max).hi + 1, animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max)).hi + 1), start, pointCount) - start;
          } else {
            count = pointCount - start;
          }
        }
        return { start, count };
      }
      function scaleRangesChanged(meta) {
        const { xScale, yScale, _scaleRanges } = meta;
        const newRanges = {
          xmin: xScale.min,
          xmax: xScale.max,
          ymin: yScale.min,
          ymax: yScale.max
        };
        if (!_scaleRanges) {
          meta._scaleRanges = newRanges;
          return true;
        }
        const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
        Object.assign(_scaleRanges, newRanges);
        return changed;
      }
      class PolarAreaController extends DatasetController {
        constructor(chart, datasetIndex) {
          super(chart, datasetIndex);
          this.innerRadius = void 0;
          this.outerRadius = void 0;
        }
        getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const chart = this.chart;
          const labels = chart.data.labels || [];
          const value = formatNumber(meta._parsed[index].r, chart.options.locale);
          return {
            label: labels[index] || "",
            value
          };
        }
        update(mode) {
          const arcs = this._cachedMeta.data;
          this._updateRadius();
          this.updateElements(arcs, 0, arcs.length, mode);
        }
        _updateRadius() {
          const chart = this.chart;
          const chartArea = chart.chartArea;
          const opts = chart.options;
          const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
          const outerRadius = Math.max(minSize / 2, 0);
          const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
          const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
          this.outerRadius = outerRadius - radiusLength * this.index;
          this.innerRadius = this.outerRadius - radiusLength;
        }
        updateElements(arcs, start, count, mode) {
          const reset = mode === "reset";
          const chart = this.chart;
          const dataset = this.getDataset();
          const opts = chart.options;
          const animationOpts = opts.animation;
          const scale = this._cachedMeta.rScale;
          const centerX = scale.xCenter;
          const centerY = scale.yCenter;
          const datasetStartAngle = scale.getIndexAngle(0) - 0.5 * PI;
          let angle = datasetStartAngle;
          let i2;
          const defaultAngle = 360 / this.countVisibleElements();
          for (i2 = 0; i2 < start; ++i2) {
            angle += this._computeAngle(i2, mode, defaultAngle);
          }
          for (i2 = start; i2 < start + count; i2++) {
            const arc = arcs[i2];
            let startAngle = angle;
            let endAngle = angle + this._computeAngle(i2, mode, defaultAngle);
            let outerRadius = chart.getDataVisibility(i2) ? scale.getDistanceFromCenterForValue(dataset.data[i2]) : 0;
            angle = endAngle;
            if (reset) {
              if (animationOpts.animateScale) {
                outerRadius = 0;
              }
              if (animationOpts.animateRotate) {
                startAngle = endAngle = datasetStartAngle;
              }
            }
            const properties = {
              x: centerX,
              y: centerY,
              innerRadius: 0,
              outerRadius,
              startAngle,
              endAngle,
              options: this.resolveDataElementOptions(i2, arc.active ? "active" : mode)
            };
            this.updateElement(arc, i2, properties, mode);
          }
        }
        countVisibleElements() {
          const dataset = this.getDataset();
          const meta = this._cachedMeta;
          let count = 0;
          meta.data.forEach((element, index) => {
            if (!isNaN(dataset.data[index]) && this.chart.getDataVisibility(index)) {
              count++;
            }
          });
          return count;
        }
        _computeAngle(index, mode, defaultAngle) {
          return this.chart.getDataVisibility(index) ? toRadians(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
        }
      }
      PolarAreaController.id = "polarArea";
      PolarAreaController.defaults = {
        dataElementType: "arc",
        animation: {
          animateRotate: true,
          animateScale: true
        },
        animations: {
          numbers: {
            type: "number",
            properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"]
          }
        },
        indexAxis: "r",
        startAngle: 0
      };
      PolarAreaController.overrides = {
        aspectRatio: 1,
        plugins: {
          legend: {
            labels: {
              generateLabels(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  const { labels: { pointStyle } } = chart.legend.options;
                  return data.labels.map((label, i2) => {
                    const meta = chart.getDatasetMeta(0);
                    const style = meta.controller.getStyle(i2);
                    return {
                      text: label,
                      fillStyle: style.backgroundColor,
                      strokeStyle: style.borderColor,
                      lineWidth: style.borderWidth,
                      pointStyle,
                      hidden: !chart.getDataVisibility(i2),
                      index: i2
                    };
                  });
                }
                return [];
              }
            },
            onClick(e2, legendItem, legend) {
              legend.chart.toggleDataVisibility(legendItem.index);
              legend.chart.update();
            }
          },
          tooltip: {
            callbacks: {
              title() {
                return "";
              },
              label(context) {
                return context.chart.data.labels[context.dataIndex] + ": " + context.formattedValue;
              }
            }
          }
        },
        scales: {
          r: {
            type: "radialLinear",
            angleLines: {
              display: false
            },
            beginAtZero: true,
            grid: {
              circular: true
            },
            pointLabels: {
              display: false
            },
            startAngle: 0
          }
        }
      };
      class PieController extends DoughnutController {
      }
      PieController.id = "pie";
      PieController.defaults = {
        cutout: 0,
        rotation: 0,
        circumference: 360,
        radius: "100%"
      };
      class RadarController extends DatasetController {
        getLabelAndValue(index) {
          const vScale = this._cachedMeta.vScale;
          const parsed = this.getParsed(index);
          return {
            label: vScale.getLabels()[index],
            value: "" + vScale.getLabelForValue(parsed[vScale.axis])
          };
        }
        update(mode) {
          const meta = this._cachedMeta;
          const line = meta.dataset;
          const points = meta.data || [];
          const labels = meta.iScale.getLabels();
          line.points = points;
          if (mode !== "resize") {
            const options = this.resolveDatasetElementOptions(mode);
            if (!this.options.showLine) {
              options.borderWidth = 0;
            }
            const properties = {
              _loop: true,
              _fullLoop: labels.length === points.length,
              options
            };
            this.updateElement(line, void 0, properties, mode);
          }
          this.updateElements(points, 0, points.length, mode);
        }
        updateElements(points, start, count, mode) {
          const dataset = this.getDataset();
          const scale = this._cachedMeta.rScale;
          const reset = mode === "reset";
          for (let i2 = start; i2 < start + count; i2++) {
            const point = points[i2];
            const options = this.resolveDataElementOptions(i2, point.active ? "active" : mode);
            const pointPosition = scale.getPointPositionForValue(i2, dataset.data[i2]);
            const x2 = reset ? scale.xCenter : pointPosition.x;
            const y = reset ? scale.yCenter : pointPosition.y;
            const properties = {
              x: x2,
              y,
              angle: pointPosition.angle,
              skip: isNaN(x2) || isNaN(y),
              options
            };
            this.updateElement(point, i2, properties, mode);
          }
        }
      }
      RadarController.id = "radar";
      RadarController.defaults = {
        datasetElementType: "line",
        dataElementType: "point",
        indexAxis: "r",
        showLine: true,
        elements: {
          line: {
            fill: "start"
          }
        }
      };
      RadarController.overrides = {
        aspectRatio: 1,
        scales: {
          r: {
            type: "radialLinear"
          }
        }
      };
      class ScatterController extends LineController {
      }
      ScatterController.id = "scatter";
      ScatterController.defaults = {
        showLine: false,
        fill: false
      };
      ScatterController.overrides = {
        interaction: {
          mode: "point"
        },
        plugins: {
          tooltip: {
            callbacks: {
              title() {
                return "";
              },
              label(item) {
                return "(" + item.label + ", " + item.formattedValue + ")";
              }
            }
          }
        },
        scales: {
          x: {
            type: "linear"
          },
          y: {
            type: "linear"
          }
        }
      };
      var controllers = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PolarAreaController,
        PieController,
        RadarController,
        ScatterController
      });
      function clipArc(ctx, element, endAngle) {
        const { startAngle, pixelMargin, x: x2, y, outerRadius, innerRadius } = element;
        let angleMargin = pixelMargin / outerRadius;
        ctx.beginPath();
        ctx.arc(x2, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
        if (innerRadius > pixelMargin) {
          angleMargin = pixelMargin / innerRadius;
          ctx.arc(x2, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
        } else {
          ctx.arc(x2, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
        }
        ctx.closePath();
        ctx.clip();
      }
      function toRadiusCorners(value) {
        return _readValueToProps(value, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
      }
      function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
        const o = toRadiusCorners(arc.options.borderRadius);
        const halfThickness = (outerRadius - innerRadius) / 2;
        const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
        const computeOuterLimit = (val) => {
          const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
          return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
        };
        return {
          outerStart: computeOuterLimit(o.outerStart),
          outerEnd: computeOuterLimit(o.outerEnd),
          innerStart: _limitValue(o.innerStart, 0, innerLimit),
          innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
        };
      }
      function rThetaToXY(r2, theta, x2, y) {
        return {
          x: x2 + r2 * Math.cos(theta),
          y: y + r2 * Math.sin(theta)
        };
      }
      function pathArc(ctx, element, offset, spacing, end) {
        const { x: x2, y, startAngle: start, pixelMargin, innerRadius: innerR } = element;
        const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
        const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
        let spacingOffset = 0;
        const alpha = end - start;
        if (spacing) {
          const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
          const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
          const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
          const adjustedAngle = avNogSpacingRadius !== 0 ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha;
          spacingOffset = (alpha - adjustedAngle) / 2;
        }
        const beta = Math.max(1e-3, alpha * outerRadius - offset / PI) / outerRadius;
        const angleOffset = (alpha - beta) / 2;
        const startAngle = start + angleOffset + spacingOffset;
        const endAngle = end - angleOffset - spacingOffset;
        const { outerStart, outerEnd, innerStart, innerEnd } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
        const outerStartAdjustedRadius = outerRadius - outerStart;
        const outerEndAdjustedRadius = outerRadius - outerEnd;
        const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
        const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
        const innerStartAdjustedRadius = innerRadius + innerStart;
        const innerEndAdjustedRadius = innerRadius + innerEnd;
        const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
        const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
        ctx.beginPath();
        ctx.arc(x2, y, outerRadius, outerStartAdjustedAngle, outerEndAdjustedAngle);
        if (outerEnd > 0) {
          const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x2, y);
          ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
        }
        const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x2, y);
        ctx.lineTo(p4.x, p4.y);
        if (innerEnd > 0) {
          const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x2, y);
          ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
        }
        ctx.arc(x2, y, innerRadius, endAngle - innerEnd / innerRadius, startAngle + innerStart / innerRadius, true);
        if (innerStart > 0) {
          const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x2, y);
          ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
        }
        const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x2, y);
        ctx.lineTo(p8.x, p8.y);
        if (outerStart > 0) {
          const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x2, y);
          ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
        }
        ctx.closePath();
      }
      function drawArc(ctx, element, offset, spacing) {
        const { fullCircles, startAngle, circumference } = element;
        let endAngle = element.endAngle;
        if (fullCircles) {
          pathArc(ctx, element, offset, spacing, startAngle + TAU);
          for (let i2 = 0; i2 < fullCircles; ++i2) {
            ctx.fill();
          }
          if (!isNaN(circumference)) {
            endAngle = startAngle + circumference % TAU;
            if (circumference % TAU === 0) {
              endAngle += TAU;
            }
          }
        }
        pathArc(ctx, element, offset, spacing, endAngle);
        ctx.fill();
        return endAngle;
      }
      function drawFullCircleBorders(ctx, element, inner) {
        const { x: x2, y, startAngle, pixelMargin, fullCircles } = element;
        const outerRadius = Math.max(element.outerRadius - pixelMargin, 0);
        const innerRadius = element.innerRadius + pixelMargin;
        let i2;
        if (inner) {
          clipArc(ctx, element, startAngle + TAU);
        }
        ctx.beginPath();
        ctx.arc(x2, y, innerRadius, startAngle + TAU, startAngle, true);
        for (i2 = 0; i2 < fullCircles; ++i2) {
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x2, y, outerRadius, startAngle, startAngle + TAU);
        for (i2 = 0; i2 < fullCircles; ++i2) {
          ctx.stroke();
        }
      }
      function drawBorder(ctx, element, offset, spacing, endAngle) {
        const { options } = element;
        const { borderWidth, borderJoinStyle } = options;
        const inner = options.borderAlign === "inner";
        if (!borderWidth) {
          return;
        }
        if (inner) {
          ctx.lineWidth = borderWidth * 2;
          ctx.lineJoin = borderJoinStyle || "round";
        } else {
          ctx.lineWidth = borderWidth;
          ctx.lineJoin = borderJoinStyle || "bevel";
        }
        if (element.fullCircles) {
          drawFullCircleBorders(ctx, element, inner);
        }
        if (inner) {
          clipArc(ctx, element, endAngle);
        }
        pathArc(ctx, element, offset, spacing, endAngle);
        ctx.stroke();
      }
      class ArcElement extends Element {
        constructor(cfg) {
          super();
          this.options = void 0;
          this.circumference = void 0;
          this.startAngle = void 0;
          this.endAngle = void 0;
          this.innerRadius = void 0;
          this.outerRadius = void 0;
          this.pixelMargin = 0;
          this.fullCircles = 0;
          if (cfg) {
            Object.assign(this, cfg);
          }
        }
        inRange(chartX, chartY, useFinalPosition) {
          const point = this.getProps(["x", "y"], useFinalPosition);
          const { angle, distance } = getAngleFromPoint(point, { x: chartX, y: chartY });
          const { startAngle, endAngle, innerRadius, outerRadius, circumference } = this.getProps([
            "startAngle",
            "endAngle",
            "innerRadius",
            "outerRadius",
            "circumference"
          ], useFinalPosition);
          const rAdjust = this.options.spacing / 2;
          const _circumference = valueOrDefault(circumference, endAngle - startAngle);
          const betweenAngles = _circumference >= TAU || _angleBetween(angle, startAngle, endAngle);
          const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
          return betweenAngles && withinRadius;
        }
        getCenterPoint(useFinalPosition) {
          const { x: x2, y, startAngle, endAngle, innerRadius, outerRadius } = this.getProps([
            "x",
            "y",
            "startAngle",
            "endAngle",
            "innerRadius",
            "outerRadius",
            "circumference"
          ], useFinalPosition);
          const { offset, spacing } = this.options;
          const halfAngle = (startAngle + endAngle) / 2;
          const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
          return {
            x: x2 + Math.cos(halfAngle) * halfRadius,
            y: y + Math.sin(halfAngle) * halfRadius
          };
        }
        tooltipPosition(useFinalPosition) {
          return this.getCenterPoint(useFinalPosition);
        }
        draw(ctx) {
          const { options, circumference } = this;
          const offset = (options.offset || 0) / 2;
          const spacing = (options.spacing || 0) / 2;
          this.pixelMargin = options.borderAlign === "inner" ? 0.33 : 0;
          this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
          if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) {
            return;
          }
          ctx.save();
          let radiusOffset = 0;
          if (offset) {
            radiusOffset = offset / 2;
            const halfAngle = (this.startAngle + this.endAngle) / 2;
            ctx.translate(Math.cos(halfAngle) * radiusOffset, Math.sin(halfAngle) * radiusOffset);
            if (this.circumference >= PI) {
              radiusOffset = offset;
            }
          }
          ctx.fillStyle = options.backgroundColor;
          ctx.strokeStyle = options.borderColor;
          const endAngle = drawArc(ctx, this, radiusOffset, spacing);
          drawBorder(ctx, this, radiusOffset, spacing, endAngle);
          ctx.restore();
        }
      }
      ArcElement.id = "arc";
      ArcElement.defaults = {
        borderAlign: "center",
        borderColor: "#fff",
        borderJoinStyle: void 0,
        borderRadius: 0,
        borderWidth: 2,
        offset: 0,
        spacing: 0,
        angle: void 0
      };
      ArcElement.defaultRoutes = {
        backgroundColor: "backgroundColor"
      };
      function setStyle(ctx, options, style = options) {
        ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
        ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
        ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
        ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
        ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
        ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
      }
      function lineTo(ctx, previous, target) {
        ctx.lineTo(target.x, target.y);
      }
      function getLineMethod(options) {
        if (options.stepped) {
          return _steppedLineTo;
        }
        if (options.tension || options.cubicInterpolationMode === "monotone") {
          return _bezierCurveTo;
        }
        return lineTo;
      }
      function pathVars(points, segment, params = {}) {
        const count = points.length;
        const { start: paramsStart = 0, end: paramsEnd = count - 1 } = params;
        const { start: segmentStart, end: segmentEnd } = segment;
        const start = Math.max(paramsStart, segmentStart);
        const end = Math.min(paramsEnd, segmentEnd);
        const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
        return {
          count,
          start,
          loop: segment.loop,
          ilen: end < start && !outside ? count + end - start : end - start
        };
      }
      function pathSegment(ctx, line, segment, params) {
        const { points, options } = line;
        const { count, start, loop, ilen } = pathVars(points, segment, params);
        const lineMethod = getLineMethod(options);
        let { move = true, reverse } = params || {};
        let i2, point, prev;
        for (i2 = 0; i2 <= ilen; ++i2) {
          point = points[(start + (reverse ? ilen - i2 : i2)) % count];
          if (point.skip) {
            continue;
          } else if (move) {
            ctx.moveTo(point.x, point.y);
            move = false;
          } else {
            lineMethod(ctx, prev, point, reverse, options.stepped);
          }
          prev = point;
        }
        if (loop) {
          point = points[(start + (reverse ? ilen : 0)) % count];
          lineMethod(ctx, prev, point, reverse, options.stepped);
        }
        return !!loop;
      }
      function fastPathSegment(ctx, line, segment, params) {
        const points = line.points;
        const { count, start, ilen } = pathVars(points, segment, params);
        const { move = true, reverse } = params || {};
        let avgX = 0;
        let countX = 0;
        let i2, point, prevX, minY, maxY, lastY;
        const pointIndex = (index) => (start + (reverse ? ilen - index : index)) % count;
        const drawX = () => {
          if (minY !== maxY) {
            ctx.lineTo(avgX, maxY);
            ctx.lineTo(avgX, minY);
            ctx.lineTo(avgX, lastY);
          }
        };
        if (move) {
          point = points[pointIndex(0)];
          ctx.moveTo(point.x, point.y);
        }
        for (i2 = 0; i2 <= ilen; ++i2) {
          point = points[pointIndex(i2)];
          if (point.skip) {
            continue;
          }
          const x2 = point.x;
          const y = point.y;
          const truncX = x2 | 0;
          if (truncX === prevX) {
            if (y < minY) {
              minY = y;
            } else if (y > maxY) {
              maxY = y;
            }
            avgX = (countX * avgX + x2) / ++countX;
          } else {
            drawX();
            ctx.lineTo(x2, y);
            prevX = truncX;
            countX = 0;
            minY = maxY = y;
          }
          lastY = y;
        }
        drawX();
      }
      function _getSegmentMethod(line) {
        const opts = line.options;
        const borderDash = opts.borderDash && opts.borderDash.length;
        const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== "monotone" && !opts.stepped && !borderDash;
        return useFastPath ? fastPathSegment : pathSegment;
      }
      function _getInterpolationMethod(options) {
        if (options.stepped) {
          return _steppedInterpolation;
        }
        if (options.tension || options.cubicInterpolationMode === "monotone") {
          return _bezierInterpolation;
        }
        return _pointInLine;
      }
      function strokePathWithCache(ctx, line, start, count) {
        let path = line._path;
        if (!path) {
          path = line._path = new Path2D();
          if (line.path(path, start, count)) {
            path.closePath();
          }
        }
        setStyle(ctx, line.options);
        ctx.stroke(path);
      }
      function strokePathDirect(ctx, line, start, count) {
        const { segments, options } = line;
        const segmentMethod = _getSegmentMethod(line);
        for (const segment of segments) {
          setStyle(ctx, options, segment.style);
          ctx.beginPath();
          if (segmentMethod(ctx, line, segment, { start, end: start + count - 1 })) {
            ctx.closePath();
          }
          ctx.stroke();
        }
      }
      const usePath2D = typeof Path2D === "function";
      function draw(ctx, line, start, count) {
        if (usePath2D && !line.options.segment) {
          strokePathWithCache(ctx, line, start, count);
        } else {
          strokePathDirect(ctx, line, start, count);
        }
      }
      class LineElement extends Element {
        constructor(cfg) {
          super();
          this.animated = true;
          this.options = void 0;
          this._chart = void 0;
          this._loop = void 0;
          this._fullLoop = void 0;
          this._path = void 0;
          this._points = void 0;
          this._segments = void 0;
          this._decimated = false;
          this._pointsUpdated = false;
          this._datasetIndex = void 0;
          if (cfg) {
            Object.assign(this, cfg);
          }
        }
        updateControlPoints(chartArea, indexAxis) {
          const options = this.options;
          if ((options.tension || options.cubicInterpolationMode === "monotone") && !options.stepped && !this._pointsUpdated) {
            const loop = options.spanGaps ? this._loop : this._fullLoop;
            _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
            this._pointsUpdated = true;
          }
        }
        set points(points) {
          this._points = points;
          delete this._segments;
          delete this._path;
          this._pointsUpdated = false;
        }
        get points() {
          return this._points;
        }
        get segments() {
          return this._segments || (this._segments = _computeSegments(this, this.options.segment));
        }
        first() {
          const segments = this.segments;
          const points = this.points;
          return segments.length && points[segments[0].start];
        }
        last() {
          const segments = this.segments;
          const points = this.points;
          const count = segments.length;
          return count && points[segments[count - 1].end];
        }
        interpolate(point, property) {
          const options = this.options;
          const value = point[property];
          const points = this.points;
          const segments = _boundSegments(this, { property, start: value, end: value });
          if (!segments.length) {
            return;
          }
          const result = [];
          const _interpolate = _getInterpolationMethod(options);
          let i2, ilen;
          for (i2 = 0, ilen = segments.length; i2 < ilen; ++i2) {
            const { start, end } = segments[i2];
            const p1 = points[start];
            const p2 = points[end];
            if (p1 === p2) {
              result.push(p1);
              continue;
            }
            const t2 = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
            const interpolated = _interpolate(p1, p2, t2, options.stepped);
            interpolated[property] = point[property];
            result.push(interpolated);
          }
          return result.length === 1 ? result[0] : result;
        }
        pathSegment(ctx, segment, params) {
          const segmentMethod = _getSegmentMethod(this);
          return segmentMethod(ctx, this, segment, params);
        }
        path(ctx, start, count) {
          const segments = this.segments;
          const segmentMethod = _getSegmentMethod(this);
          let loop = this._loop;
          start = start || 0;
          count = count || this.points.length - start;
          for (const segment of segments) {
            loop &= segmentMethod(ctx, this, segment, { start, end: start + count - 1 });
          }
          return !!loop;
        }
        draw(ctx, chartArea, start, count) {
          const options = this.options || {};
          const points = this.points || [];
          if (points.length && options.borderWidth) {
            ctx.save();
            draw(ctx, this, start, count);
            ctx.restore();
          }
          if (this.animated) {
            this._pointsUpdated = false;
            this._path = void 0;
          }
        }
      }
      LineElement.id = "line";
      LineElement.defaults = {
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        borderWidth: 3,
        capBezierPoints: true,
        cubicInterpolationMode: "default",
        fill: false,
        spanGaps: false,
        stepped: false,
        tension: 0
      };
      LineElement.defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
      };
      LineElement.descriptors = {
        _scriptable: true,
        _indexable: (name) => name !== "borderDash" && name !== "fill"
      };
      function inRange$1(el, pos, axis, useFinalPosition) {
        const options = el.options;
        const { [axis]: value } = el.getProps([axis], useFinalPosition);
        return Math.abs(pos - value) < options.radius + options.hitRadius;
      }
      class PointElement extends Element {
        constructor(cfg) {
          super();
          this.options = void 0;
          this.parsed = void 0;
          this.skip = void 0;
          this.stop = void 0;
          if (cfg) {
            Object.assign(this, cfg);
          }
        }
        inRange(mouseX, mouseY, useFinalPosition) {
          const options = this.options;
          const { x: x2, y } = this.getProps(["x", "y"], useFinalPosition);
          return Math.pow(mouseX - x2, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
        }
        inXRange(mouseX, useFinalPosition) {
          return inRange$1(this, mouseX, "x", useFinalPosition);
        }
        inYRange(mouseY, useFinalPosition) {
          return inRange$1(this, mouseY, "y", useFinalPosition);
        }
        getCenterPoint(useFinalPosition) {
          const { x: x2, y } = this.getProps(["x", "y"], useFinalPosition);
          return { x: x2, y };
        }
        size(options) {
          options = options || this.options || {};
          let radius = options.radius || 0;
          radius = Math.max(radius, radius && options.hoverRadius || 0);
          const borderWidth = radius && options.borderWidth || 0;
          return (radius + borderWidth) * 2;
        }
        draw(ctx, area) {
          const options = this.options;
          if (this.skip || options.radius < 0.1 || !_isPointInArea(this, area, this.size(options) / 2)) {
            return;
          }
          ctx.strokeStyle = options.borderColor;
          ctx.lineWidth = options.borderWidth;
          ctx.fillStyle = options.backgroundColor;
          drawPoint(ctx, options, this.x, this.y);
        }
        getRange() {
          const options = this.options || {};
          return options.radius + options.hitRadius;
        }
      }
      PointElement.id = "point";
      PointElement.defaults = {
        borderWidth: 1,
        hitRadius: 1,
        hoverBorderWidth: 1,
        hoverRadius: 4,
        pointStyle: "circle",
        radius: 3,
        rotation: 0
      };
      PointElement.defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
      };
      function getBarBounds(bar, useFinalPosition) {
        const { x: x2, y, base: base2, width, height } = bar.getProps(["x", "y", "base", "width", "height"], useFinalPosition);
        let left, right, top, bottom, half;
        if (bar.horizontal) {
          half = height / 2;
          left = Math.min(x2, base2);
          right = Math.max(x2, base2);
          top = y - half;
          bottom = y + half;
        } else {
          half = width / 2;
          left = x2 - half;
          right = x2 + half;
          top = Math.min(y, base2);
          bottom = Math.max(y, base2);
        }
        return { left, top, right, bottom };
      }
      function skipOrLimit(skip2, value, min, max) {
        return skip2 ? 0 : _limitValue(value, min, max);
      }
      function parseBorderWidth(bar, maxW, maxH) {
        const value = bar.options.borderWidth;
        const skip2 = bar.borderSkipped;
        const o = toTRBL(value);
        return {
          t: skipOrLimit(skip2.top, o.top, 0, maxH),
          r: skipOrLimit(skip2.right, o.right, 0, maxW),
          b: skipOrLimit(skip2.bottom, o.bottom, 0, maxH),
          l: skipOrLimit(skip2.left, o.left, 0, maxW)
        };
      }
      function parseBorderRadius(bar, maxW, maxH) {
        const { enableBorderRadius } = bar.getProps(["enableBorderRadius"]);
        const value = bar.options.borderRadius;
        const o = toTRBLCorners(value);
        const maxR = Math.min(maxW, maxH);
        const skip2 = bar.borderSkipped;
        const enableBorder = enableBorderRadius || isObject(value);
        return {
          topLeft: skipOrLimit(!enableBorder || skip2.top || skip2.left, o.topLeft, 0, maxR),
          topRight: skipOrLimit(!enableBorder || skip2.top || skip2.right, o.topRight, 0, maxR),
          bottomLeft: skipOrLimit(!enableBorder || skip2.bottom || skip2.left, o.bottomLeft, 0, maxR),
          bottomRight: skipOrLimit(!enableBorder || skip2.bottom || skip2.right, o.bottomRight, 0, maxR)
        };
      }
      function boundingRects(bar) {
        const bounds = getBarBounds(bar);
        const width = bounds.right - bounds.left;
        const height = bounds.bottom - bounds.top;
        const border = parseBorderWidth(bar, width / 2, height / 2);
        const radius = parseBorderRadius(bar, width / 2, height / 2);
        return {
          outer: {
            x: bounds.left,
            y: bounds.top,
            w: width,
            h: height,
            radius
          },
          inner: {
            x: bounds.left + border.l,
            y: bounds.top + border.t,
            w: width - border.l - border.r,
            h: height - border.t - border.b,
            radius: {
              topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
              topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
              bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
              bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
            }
          }
        };
      }
      function inRange(bar, x2, y, useFinalPosition) {
        const skipX = x2 === null;
        const skipY = y === null;
        const skipBoth = skipX && skipY;
        const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
        return bounds && (skipX || _isBetween(x2, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
      }
      function hasRadius(radius) {
        return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
      }
      function addNormalRectPath(ctx, rect) {
        ctx.rect(rect.x, rect.y, rect.w, rect.h);
      }
      function inflateRect(rect, amount, refRect = {}) {
        const x2 = rect.x !== refRect.x ? -amount : 0;
        const y = rect.y !== refRect.y ? -amount : 0;
        const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x2;
        const h3 = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
        return {
          x: rect.x + x2,
          y: rect.y + y,
          w: rect.w + w,
          h: rect.h + h3,
          radius: rect.radius
        };
      }
      class BarElement extends Element {
        constructor(cfg) {
          super();
          this.options = void 0;
          this.horizontal = void 0;
          this.base = void 0;
          this.width = void 0;
          this.height = void 0;
          this.inflateAmount = void 0;
          if (cfg) {
            Object.assign(this, cfg);
          }
        }
        draw(ctx) {
          const { inflateAmount, options: { borderColor, backgroundColor } } = this;
          const { inner, outer } = boundingRects(this);
          const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
          ctx.save();
          if (outer.w !== inner.w || outer.h !== inner.h) {
            ctx.beginPath();
            addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
            ctx.clip();
            addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
            ctx.fillStyle = borderColor;
            ctx.fill("evenodd");
          }
          ctx.beginPath();
          addRectPath(ctx, inflateRect(inner, inflateAmount));
          ctx.fillStyle = backgroundColor;
          ctx.fill();
          ctx.restore();
        }
        inRange(mouseX, mouseY, useFinalPosition) {
          return inRange(this, mouseX, mouseY, useFinalPosition);
        }
        inXRange(mouseX, useFinalPosition) {
          return inRange(this, mouseX, null, useFinalPosition);
        }
        inYRange(mouseY, useFinalPosition) {
          return inRange(this, null, mouseY, useFinalPosition);
        }
        getCenterPoint(useFinalPosition) {
          const { x: x2, y, base: base2, horizontal } = this.getProps(["x", "y", "base", "horizontal"], useFinalPosition);
          return {
            x: horizontal ? (x2 + base2) / 2 : x2,
            y: horizontal ? y : (y + base2) / 2
          };
        }
        getRange(axis) {
          return axis === "x" ? this.width / 2 : this.height / 2;
        }
      }
      BarElement.id = "bar";
      BarElement.defaults = {
        borderSkipped: "start",
        borderWidth: 0,
        borderRadius: 0,
        inflateAmount: "auto",
        pointStyle: void 0
      };
      BarElement.defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
      };
      var elements = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        ArcElement,
        LineElement,
        PointElement,
        BarElement
      });
      function lttbDecimation(data, start, count, availableWidth, options) {
        const samples = options.samples || availableWidth;
        if (samples >= count) {
          return data.slice(start, start + count);
        }
        const decimated = [];
        const bucketWidth = (count - 2) / (samples - 2);
        let sampledIndex = 0;
        const endIndex = start + count - 1;
        let a = start;
        let i2, maxAreaPoint, maxArea, area, nextA;
        decimated[sampledIndex++] = data[a];
        for (i2 = 0; i2 < samples - 2; i2++) {
          let avgX = 0;
          let avgY = 0;
          let j;
          const avgRangeStart = Math.floor((i2 + 1) * bucketWidth) + 1 + start;
          const avgRangeEnd = Math.min(Math.floor((i2 + 2) * bucketWidth) + 1, count) + start;
          const avgRangeLength = avgRangeEnd - avgRangeStart;
          for (j = avgRangeStart; j < avgRangeEnd; j++) {
            avgX += data[j].x;
            avgY += data[j].y;
          }
          avgX /= avgRangeLength;
          avgY /= avgRangeLength;
          const rangeOffs = Math.floor(i2 * bucketWidth) + 1 + start;
          const rangeTo = Math.min(Math.floor((i2 + 1) * bucketWidth) + 1, count) + start;
          const { x: pointAx, y: pointAy } = data[a];
          maxArea = area = -1;
          for (j = rangeOffs; j < rangeTo; j++) {
            area = 0.5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));
            if (area > maxArea) {
              maxArea = area;
              maxAreaPoint = data[j];
              nextA = j;
            }
          }
          decimated[sampledIndex++] = maxAreaPoint;
          a = nextA;
        }
        decimated[sampledIndex++] = data[endIndex];
        return decimated;
      }
      function minMaxDecimation(data, start, count, availableWidth) {
        let avgX = 0;
        let countX = 0;
        let i2, point, x2, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
        const decimated = [];
        const endIndex = start + count - 1;
        const xMin = data[start].x;
        const xMax = data[endIndex].x;
        const dx = xMax - xMin;
        for (i2 = start; i2 < start + count; ++i2) {
          point = data[i2];
          x2 = (point.x - xMin) / dx * availableWidth;
          y = point.y;
          const truncX = x2 | 0;
          if (truncX === prevX) {
            if (y < minY) {
              minY = y;
              minIndex = i2;
            } else if (y > maxY) {
              maxY = y;
              maxIndex = i2;
            }
            avgX = (countX * avgX + point.x) / ++countX;
          } else {
            const lastIndex = i2 - 1;
            if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
              const intermediateIndex1 = Math.min(minIndex, maxIndex);
              const intermediateIndex2 = Math.max(minIndex, maxIndex);
              if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
                decimated.push(__spreadProps(__spreadValues({}, data[intermediateIndex1]), {
                  x: avgX
                }));
              }
              if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
                decimated.push(__spreadProps(__spreadValues({}, data[intermediateIndex2]), {
                  x: avgX
                }));
              }
            }
            if (i2 > 0 && lastIndex !== startIndex) {
              decimated.push(data[lastIndex]);
            }
            decimated.push(point);
            prevX = truncX;
            countX = 0;
            minY = maxY = y;
            minIndex = maxIndex = startIndex = i2;
          }
        }
        return decimated;
      }
      function cleanDecimatedDataset(dataset) {
        if (dataset._decimated) {
          const data = dataset._data;
          delete dataset._decimated;
          delete dataset._data;
          Object.defineProperty(dataset, "data", { value: data });
        }
      }
      function cleanDecimatedData(chart) {
        chart.data.datasets.forEach((dataset) => {
          cleanDecimatedDataset(dataset);
        });
      }
      function getStartAndCountOfVisiblePointsSimplified(meta, points) {
        const pointCount = points.length;
        let start = 0;
        let count;
        const { iScale } = meta;
        const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
        if (minDefined) {
          start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
        }
        if (maxDefined) {
          count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start;
        } else {
          count = pointCount - start;
        }
        return { start, count };
      }
      var plugin_decimation = {
        id: "decimation",
        defaults: {
          algorithm: "min-max",
          enabled: false
        },
        beforeElementsUpdate: (chart, args, options) => {
          if (!options.enabled) {
            cleanDecimatedData(chart);
            return;
          }
          const availableWidth = chart.width;
          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const { _data, indexAxis } = dataset;
            const meta = chart.getDatasetMeta(datasetIndex);
            const data = _data || dataset.data;
            if (resolve2([indexAxis, chart.options.indexAxis]) === "y") {
              return;
            }
            if (meta.type !== "line") {
              return;
            }
            const xAxis = chart.scales[meta.xAxisID];
            if (xAxis.type !== "linear" && xAxis.type !== "time") {
              return;
            }
            if (chart.options.parsing) {
              return;
            }
            let { start, count } = getStartAndCountOfVisiblePointsSimplified(meta, data);
            const threshold = options.threshold || 4 * availableWidth;
            if (count <= threshold) {
              cleanDecimatedDataset(dataset);
              return;
            }
            if (isNullOrUndef(_data)) {
              dataset._data = data;
              delete dataset.data;
              Object.defineProperty(dataset, "data", {
                configurable: true,
                enumerable: true,
                get: function() {
                  return this._decimated;
                },
                set: function(d) {
                  this._data = d;
                }
              });
            }
            let decimated;
            switch (options.algorithm) {
              case "lttb":
                decimated = lttbDecimation(data, start, count, availableWidth, options);
                break;
              case "min-max":
                decimated = minMaxDecimation(data, start, count, availableWidth);
                break;
              default:
                throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
            }
            dataset._decimated = decimated;
          });
        },
        destroy(chart) {
          cleanDecimatedData(chart);
        }
      };
      function getLineByIndex(chart, index) {
        const meta = chart.getDatasetMeta(index);
        const visible = meta && chart.isDatasetVisible(index);
        return visible ? meta.dataset : null;
      }
      function parseFillOption(line) {
        const options = line.options;
        const fillOption = options.fill;
        let fill = valueOrDefault(fillOption && fillOption.target, fillOption);
        if (fill === void 0) {
          fill = !!options.backgroundColor;
        }
        if (fill === false || fill === null) {
          return false;
        }
        if (fill === true) {
          return "origin";
        }
        return fill;
      }
      function decodeFill(line, index, count) {
        const fill = parseFillOption(line);
        if (isObject(fill)) {
          return isNaN(fill.value) ? false : fill;
        }
        let target = parseFloat(fill);
        if (isNumberFinite(target) && Math.floor(target) === target) {
          if (fill[0] === "-" || fill[0] === "+") {
            target = index + target;
          }
          if (target === index || target < 0 || target >= count) {
            return false;
          }
          return target;
        }
        return ["origin", "start", "end", "stack", "shape"].indexOf(fill) >= 0 && fill;
      }
      function computeLinearBoundary(source) {
        const { scale = {}, fill } = source;
        let target = null;
        let horizontal;
        if (fill === "start") {
          target = scale.bottom;
        } else if (fill === "end") {
          target = scale.top;
        } else if (isObject(fill)) {
          target = scale.getPixelForValue(fill.value);
        } else if (scale.getBasePixel) {
          target = scale.getBasePixel();
        }
        if (isNumberFinite(target)) {
          horizontal = scale.isHorizontal();
          return {
            x: horizontal ? target : null,
            y: horizontal ? null : target
          };
        }
        return null;
      }
      class simpleArc {
        constructor(opts) {
          this.x = opts.x;
          this.y = opts.y;
          this.radius = opts.radius;
        }
        pathSegment(ctx, bounds, opts) {
          const { x: x2, y, radius } = this;
          bounds = bounds || { start: 0, end: TAU };
          ctx.arc(x2, y, radius, bounds.end, bounds.start, true);
          return !opts.bounds;
        }
        interpolate(point) {
          const { x: x2, y, radius } = this;
          const angle = point.angle;
          return {
            x: x2 + Math.cos(angle) * radius,
            y: y + Math.sin(angle) * radius,
            angle
          };
        }
      }
      function computeCircularBoundary(source) {
        const { scale, fill } = source;
        const options = scale.options;
        const length = scale.getLabels().length;
        const target = [];
        const start = options.reverse ? scale.max : scale.min;
        const end = options.reverse ? scale.min : scale.max;
        let i2, center, value;
        if (fill === "start") {
          value = start;
        } else if (fill === "end") {
          value = end;
        } else if (isObject(fill)) {
          value = fill.value;
        } else {
          value = scale.getBaseValue();
        }
        if (options.grid.circular) {
          center = scale.getPointPositionForValue(0, start);
          return new simpleArc({
            x: center.x,
            y: center.y,
            radius: scale.getDistanceFromCenterForValue(value)
          });
        }
        for (i2 = 0; i2 < length; ++i2) {
          target.push(scale.getPointPositionForValue(i2, value));
        }
        return target;
      }
      function computeBoundary(source) {
        const scale = source.scale || {};
        if (scale.getPointPositionForValue) {
          return computeCircularBoundary(source);
        }
        return computeLinearBoundary(source);
      }
      function findSegmentEnd(start, end, points) {
        for (; end > start; end--) {
          const point = points[end];
          if (!isNaN(point.x) && !isNaN(point.y)) {
            break;
          }
        }
        return end;
      }
      function pointsFromSegments(boundary, line) {
        const { x: x2 = null, y = null } = boundary || {};
        const linePoints = line.points;
        const points = [];
        line.segments.forEach(({ start, end }) => {
          end = findSegmentEnd(start, end, linePoints);
          const first = linePoints[start];
          const last = linePoints[end];
          if (y !== null) {
            points.push({ x: first.x, y });
            points.push({ x: last.x, y });
          } else if (x2 !== null) {
            points.push({ x: x2, y: first.y });
            points.push({ x: x2, y: last.y });
          }
        });
        return points;
      }
      function buildStackLine(source) {
        const { scale, index, line } = source;
        const points = [];
        const segments = line.segments;
        const sourcePoints = line.points;
        const linesBelow = getLinesBelow(scale, index);
        linesBelow.push(createBoundaryLine({ x: null, y: scale.bottom }, line));
        for (let i2 = 0; i2 < segments.length; i2++) {
          const segment = segments[i2];
          for (let j = segment.start; j <= segment.end; j++) {
            addPointsBelow(points, sourcePoints[j], linesBelow);
          }
        }
        return new LineElement({ points, options: {} });
      }
      function getLinesBelow(scale, index) {
        const below = [];
        const metas = scale.getMatchingVisibleMetas("line");
        for (let i2 = 0; i2 < metas.length; i2++) {
          const meta = metas[i2];
          if (meta.index === index) {
            break;
          }
          if (!meta.hidden) {
            below.unshift(meta.dataset);
          }
        }
        return below;
      }
      function addPointsBelow(points, sourcePoint, linesBelow) {
        const postponed = [];
        for (let j = 0; j < linesBelow.length; j++) {
          const line = linesBelow[j];
          const { first, last, point } = findPoint(line, sourcePoint, "x");
          if (!point || first && last) {
            continue;
          }
          if (first) {
            postponed.unshift(point);
          } else {
            points.push(point);
            if (!last) {
              break;
            }
          }
        }
        points.push(...postponed);
      }
      function findPoint(line, sourcePoint, property) {
        const point = line.interpolate(sourcePoint, property);
        if (!point) {
          return {};
        }
        const pointValue = point[property];
        const segments = line.segments;
        const linePoints = line.points;
        let first = false;
        let last = false;
        for (let i2 = 0; i2 < segments.length; i2++) {
          const segment = segments[i2];
          const firstValue = linePoints[segment.start][property];
          const lastValue = linePoints[segment.end][property];
          if (_isBetween(pointValue, firstValue, lastValue)) {
            first = pointValue === firstValue;
            last = pointValue === lastValue;
            break;
          }
        }
        return { first, last, point };
      }
      function getTarget(source) {
        const { chart, fill, line } = source;
        if (isNumberFinite(fill)) {
          return getLineByIndex(chart, fill);
        }
        if (fill === "stack") {
          return buildStackLine(source);
        }
        if (fill === "shape") {
          return true;
        }
        const boundary = computeBoundary(source);
        if (boundary instanceof simpleArc) {
          return boundary;
        }
        return createBoundaryLine(boundary, line);
      }
      function createBoundaryLine(boundary, line) {
        let points = [];
        let _loop = false;
        if (isArray(boundary)) {
          _loop = true;
          points = boundary;
        } else {
          points = pointsFromSegments(boundary, line);
        }
        return points.length ? new LineElement({
          points,
          options: { tension: 0 },
          _loop,
          _fullLoop: _loop
        }) : null;
      }
      function resolveTarget(sources, index, propagate) {
        const source = sources[index];
        let fill = source.fill;
        const visited = [index];
        let target;
        if (!propagate) {
          return fill;
        }
        while (fill !== false && visited.indexOf(fill) === -1) {
          if (!isNumberFinite(fill)) {
            return fill;
          }
          target = sources[fill];
          if (!target) {
            return false;
          }
          if (target.visible) {
            return fill;
          }
          visited.push(fill);
          fill = target.fill;
        }
        return false;
      }
      function _clip(ctx, target, clipY) {
        const { segments, points } = target;
        let first = true;
        let lineLoop = false;
        ctx.beginPath();
        for (const segment of segments) {
          const { start, end } = segment;
          const firstPoint = points[start];
          const lastPoint = points[findSegmentEnd(start, end, points)];
          if (first) {
            ctx.moveTo(firstPoint.x, firstPoint.y);
            first = false;
          } else {
            ctx.lineTo(firstPoint.x, clipY);
            ctx.lineTo(firstPoint.x, firstPoint.y);
          }
          lineLoop = !!target.pathSegment(ctx, segment, { move: lineLoop });
          if (lineLoop) {
            ctx.closePath();
          } else {
            ctx.lineTo(lastPoint.x, clipY);
          }
        }
        ctx.lineTo(target.first().x, clipY);
        ctx.closePath();
        ctx.clip();
      }
      function getBounds(property, first, last, loop) {
        if (loop) {
          return;
        }
        let start = first[property];
        let end = last[property];
        if (property === "angle") {
          start = _normalizeAngle(start);
          end = _normalizeAngle(end);
        }
        return { property, start, end };
      }
      function _getEdge(a, b, prop, fn) {
        if (a && b) {
          return fn(a[prop], b[prop]);
        }
        return a ? a[prop] : b ? b[prop] : 0;
      }
      function _segments(line, target, property) {
        const segments = line.segments;
        const points = line.points;
        const tpoints = target.points;
        const parts = [];
        for (const segment of segments) {
          let { start, end } = segment;
          end = findSegmentEnd(start, end, points);
          const bounds = getBounds(property, points[start], points[end], segment.loop);
          if (!target.segments) {
            parts.push({
              source: segment,
              target: bounds,
              start: points[start],
              end: points[end]
            });
            continue;
          }
          const targetSegments = _boundSegments(target, bounds);
          for (const tgt of targetSegments) {
            const subBounds = getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
            const fillSources = _boundSegment(segment, points, subBounds);
            for (const fillSource of fillSources) {
              parts.push({
                source: fillSource,
                target: tgt,
                start: {
                  [property]: _getEdge(bounds, subBounds, "start", Math.max)
                },
                end: {
                  [property]: _getEdge(bounds, subBounds, "end", Math.min)
                }
              });
            }
          }
        }
        return parts;
      }
      function clipBounds(ctx, scale, bounds) {
        const { top, bottom } = scale.chart.chartArea;
        const { property, start, end } = bounds || {};
        if (property === "x") {
          ctx.beginPath();
          ctx.rect(start, top, end - start, bottom - top);
          ctx.clip();
        }
      }
      function interpolatedLineTo(ctx, target, point, property) {
        const interpolatedPoint = target.interpolate(point, property);
        if (interpolatedPoint) {
          ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
        }
      }
      function _fill(ctx, cfg) {
        const { line, target, property, color: color2, scale } = cfg;
        const segments = _segments(line, target, property);
        for (const { source: src, target: tgt, start, end } of segments) {
          const { style: { backgroundColor = color2 } = {} } = src;
          const notShape = target !== true;
          ctx.save();
          ctx.fillStyle = backgroundColor;
          clipBounds(ctx, scale, notShape && getBounds(property, start, end));
          ctx.beginPath();
          const lineLoop = !!line.pathSegment(ctx, src);
          let loop;
          if (notShape) {
            if (lineLoop) {
              ctx.closePath();
            } else {
              interpolatedLineTo(ctx, target, end, property);
            }
            const targetLoop = !!target.pathSegment(ctx, tgt, { move: lineLoop, reverse: true });
            loop = lineLoop && targetLoop;
            if (!loop) {
              interpolatedLineTo(ctx, target, start, property);
            }
          }
          ctx.closePath();
          ctx.fill(loop ? "evenodd" : "nonzero");
          ctx.restore();
        }
      }
      function doFill(ctx, cfg) {
        const { line, target, above, below, area, scale } = cfg;
        const property = line._loop ? "angle" : cfg.axis;
        ctx.save();
        if (property === "x" && below !== above) {
          _clip(ctx, target, area.top);
          _fill(ctx, { line, target, color: above, scale, property });
          ctx.restore();
          ctx.save();
          _clip(ctx, target, area.bottom);
        }
        _fill(ctx, { line, target, color: below, scale, property });
        ctx.restore();
      }
      function drawfill(ctx, source, area) {
        const target = getTarget(source);
        const { line, scale, axis } = source;
        const lineOpts = line.options;
        const fillOption = lineOpts.fill;
        const color2 = lineOpts.backgroundColor;
        const { above = color2, below = color2 } = fillOption || {};
        if (target && line.points.length) {
          clipArea(ctx, area);
          doFill(ctx, { line, target, above, below, area, scale, axis });
          unclipArea(ctx);
        }
      }
      var plugin_filler = {
        id: "filler",
        afterDatasetsUpdate(chart, _args, options) {
          const count = (chart.data.datasets || []).length;
          const sources = [];
          let meta, i2, line, source;
          for (i2 = 0; i2 < count; ++i2) {
            meta = chart.getDatasetMeta(i2);
            line = meta.dataset;
            source = null;
            if (line && line.options && line instanceof LineElement) {
              source = {
                visible: chart.isDatasetVisible(i2),
                index: i2,
                fill: decodeFill(line, i2, count),
                chart,
                axis: meta.controller.options.indexAxis,
                scale: meta.vScale,
                line
              };
            }
            meta.$filler = source;
            sources.push(source);
          }
          for (i2 = 0; i2 < count; ++i2) {
            source = sources[i2];
            if (!source || source.fill === false) {
              continue;
            }
            source.fill = resolveTarget(sources, i2, options.propagate);
          }
        },
        beforeDraw(chart, _args, options) {
          const draw2 = options.drawTime === "beforeDraw";
          const metasets = chart.getSortedVisibleDatasetMetas();
          const area = chart.chartArea;
          for (let i2 = metasets.length - 1; i2 >= 0; --i2) {
            const source = metasets[i2].$filler;
            if (!source) {
              continue;
            }
            source.line.updateControlPoints(area, source.axis);
            if (draw2) {
              drawfill(chart.ctx, source, area);
            }
          }
        },
        beforeDatasetsDraw(chart, _args, options) {
          if (options.drawTime !== "beforeDatasetsDraw") {
            return;
          }
          const metasets = chart.getSortedVisibleDatasetMetas();
          for (let i2 = metasets.length - 1; i2 >= 0; --i2) {
            const source = metasets[i2].$filler;
            if (source) {
              drawfill(chart.ctx, source, chart.chartArea);
            }
          }
        },
        beforeDatasetDraw(chart, args, options) {
          const source = args.meta.$filler;
          if (!source || source.fill === false || options.drawTime !== "beforeDatasetDraw") {
            return;
          }
          drawfill(chart.ctx, source, chart.chartArea);
        },
        defaults: {
          propagate: true,
          drawTime: "beforeDatasetDraw"
        }
      };
      const getBoxSize = (labelOpts, fontSize) => {
        let { boxHeight = fontSize, boxWidth = fontSize } = labelOpts;
        if (labelOpts.usePointStyle) {
          boxHeight = Math.min(boxHeight, fontSize);
          boxWidth = Math.min(boxWidth, fontSize);
        }
        return {
          boxWidth,
          boxHeight,
          itemHeight: Math.max(fontSize, boxHeight)
        };
      };
      const itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
      class Legend extends Element {
        constructor(config) {
          super();
          this._added = false;
          this.legendHitBoxes = [];
          this._hoveredItem = null;
          this.doughnutMode = false;
          this.chart = config.chart;
          this.options = config.options;
          this.ctx = config.ctx;
          this.legendItems = void 0;
          this.columnSizes = void 0;
          this.lineWidths = void 0;
          this.maxHeight = void 0;
          this.maxWidth = void 0;
          this.top = void 0;
          this.bottom = void 0;
          this.left = void 0;
          this.right = void 0;
          this.height = void 0;
          this.width = void 0;
          this._margins = void 0;
          this.position = void 0;
          this.weight = void 0;
          this.fullSize = void 0;
        }
        update(maxWidth, maxHeight, margins) {
          this.maxWidth = maxWidth;
          this.maxHeight = maxHeight;
          this._margins = margins;
          this.setDimensions();
          this.buildLabels();
          this.fit();
        }
        setDimensions() {
          if (this.isHorizontal()) {
            this.width = this.maxWidth;
            this.left = this._margins.left;
            this.right = this.width;
          } else {
            this.height = this.maxHeight;
            this.top = this._margins.top;
            this.bottom = this.height;
          }
        }
        buildLabels() {
          const labelOpts = this.options.labels || {};
          let legendItems = callback(labelOpts.generateLabels, [this.chart], this) || [];
          if (labelOpts.filter) {
            legendItems = legendItems.filter((item) => labelOpts.filter(item, this.chart.data));
          }
          if (labelOpts.sort) {
            legendItems = legendItems.sort((a, b) => labelOpts.sort(a, b, this.chart.data));
          }
          if (this.options.reverse) {
            legendItems.reverse();
          }
          this.legendItems = legendItems;
        }
        fit() {
          const { options, ctx } = this;
          if (!options.display) {
            this.width = this.height = 0;
            return;
          }
          const labelOpts = options.labels;
          const labelFont = toFont(labelOpts.font);
          const fontSize = labelFont.size;
          const titleHeight = this._computeTitleHeight();
          const { boxWidth, itemHeight } = getBoxSize(labelOpts, fontSize);
          let width, height;
          ctx.font = labelFont.string;
          if (this.isHorizontal()) {
            width = this.maxWidth;
            height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
          } else {
            height = this.maxHeight;
            width = this._fitCols(titleHeight, fontSize, boxWidth, itemHeight) + 10;
          }
          this.width = Math.min(width, options.maxWidth || this.maxWidth);
          this.height = Math.min(height, options.maxHeight || this.maxHeight);
        }
        _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
          const { ctx, maxWidth, options: { labels: { padding } } } = this;
          const hitboxes = this.legendHitBoxes = [];
          const lineWidths = this.lineWidths = [0];
          const lineHeight = itemHeight + padding;
          let totalHeight = titleHeight;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          let row = -1;
          let top = -lineHeight;
          this.legendItems.forEach((legendItem, i2) => {
            const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
            if (i2 === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
              totalHeight += lineHeight;
              lineWidths[lineWidths.length - (i2 > 0 ? 0 : 1)] = 0;
              top += lineHeight;
              row++;
            }
            hitboxes[i2] = { left: 0, top, row, width: itemWidth, height: itemHeight };
            lineWidths[lineWidths.length - 1] += itemWidth + padding;
          });
          return totalHeight;
        }
        _fitCols(titleHeight, fontSize, boxWidth, itemHeight) {
          const { ctx, maxHeight, options: { labels: { padding } } } = this;
          const hitboxes = this.legendHitBoxes = [];
          const columnSizes = this.columnSizes = [];
          const heightLimit = maxHeight - titleHeight;
          let totalWidth = padding;
          let currentColWidth = 0;
          let currentColHeight = 0;
          let left = 0;
          let col = 0;
          this.legendItems.forEach((legendItem, i2) => {
            const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
            if (i2 > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
              totalWidth += currentColWidth + padding;
              columnSizes.push({ width: currentColWidth, height: currentColHeight });
              left += currentColWidth + padding;
              col++;
              currentColWidth = currentColHeight = 0;
            }
            hitboxes[i2] = { left, top: currentColHeight, col, width: itemWidth, height: itemHeight };
            currentColWidth = Math.max(currentColWidth, itemWidth);
            currentColHeight += itemHeight + padding;
          });
          totalWidth += currentColWidth;
          columnSizes.push({ width: currentColWidth, height: currentColHeight });
          return totalWidth;
        }
        adjustHitBoxes() {
          if (!this.options.display) {
            return;
          }
          const titleHeight = this._computeTitleHeight();
          const { legendHitBoxes: hitboxes, options: { align, labels: { padding }, rtl } } = this;
          const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
          if (this.isHorizontal()) {
            let row = 0;
            let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
            for (const hitbox of hitboxes) {
              if (row !== hitbox.row) {
                row = hitbox.row;
                left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
              }
              hitbox.top += this.top + titleHeight + padding;
              hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
              left += hitbox.width + padding;
            }
          } else {
            let col = 0;
            let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
            for (const hitbox of hitboxes) {
              if (hitbox.col !== col) {
                col = hitbox.col;
                top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
              }
              hitbox.top = top;
              hitbox.left += this.left + padding;
              hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
              top += hitbox.height + padding;
            }
          }
        }
        isHorizontal() {
          return this.options.position === "top" || this.options.position === "bottom";
        }
        draw() {
          if (this.options.display) {
            const ctx = this.ctx;
            clipArea(ctx, this);
            this._draw();
            unclipArea(ctx);
          }
        }
        _draw() {
          const { options: opts, columnSizes, lineWidths, ctx } = this;
          const { align, labels: labelOpts } = opts;
          const defaultColor = defaults.color;
          const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
          const labelFont = toFont(labelOpts.font);
          const { color: fontColor, padding } = labelOpts;
          const fontSize = labelFont.size;
          const halfFontSize = fontSize / 2;
          let cursor;
          this.drawTitle();
          ctx.textAlign = rtlHelper.textAlign("left");
          ctx.textBaseline = "middle";
          ctx.lineWidth = 0.5;
          ctx.font = labelFont.string;
          const { boxWidth, boxHeight, itemHeight } = getBoxSize(labelOpts, fontSize);
          const drawLegendBox = function(x2, y, legendItem) {
            if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
              return;
            }
            ctx.save();
            const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
            ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
            ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
            ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
            ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
            ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
            if (labelOpts.usePointStyle) {
              const drawOptions = {
                radius: boxWidth * Math.SQRT2 / 2,
                pointStyle: legendItem.pointStyle,
                rotation: legendItem.rotation,
                borderWidth: lineWidth
              };
              const centerX = rtlHelper.xPlus(x2, boxWidth / 2);
              const centerY = y + halfFontSize;
              drawPoint(ctx, drawOptions, centerX, centerY);
            } else {
              const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
              const xBoxLeft = rtlHelper.leftForLtr(x2, boxWidth);
              const borderRadius = toTRBLCorners(legendItem.borderRadius);
              ctx.beginPath();
              if (Object.values(borderRadius).some((v) => v !== 0)) {
                addRoundedRectPath(ctx, {
                  x: xBoxLeft,
                  y: yBoxTop,
                  w: boxWidth,
                  h: boxHeight,
                  radius: borderRadius
                });
              } else {
                ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
              }
              ctx.fill();
              if (lineWidth !== 0) {
                ctx.stroke();
              }
            }
            ctx.restore();
          };
          const fillText = function(x2, y, legendItem) {
            renderText(ctx, legendItem.text, x2, y + itemHeight / 2, labelFont, {
              strikethrough: legendItem.hidden,
              textAlign: rtlHelper.textAlign(legendItem.textAlign)
            });
          };
          const isHorizontal = this.isHorizontal();
          const titleHeight = this._computeTitleHeight();
          if (isHorizontal) {
            cursor = {
              x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
              y: this.top + padding + titleHeight,
              line: 0
            };
          } else {
            cursor = {
              x: this.left + padding,
              y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
              line: 0
            };
          }
          overrideTextDirection(this.ctx, opts.textDirection);
          const lineHeight = itemHeight + padding;
          this.legendItems.forEach((legendItem, i2) => {
            ctx.strokeStyle = legendItem.fontColor || fontColor;
            ctx.fillStyle = legendItem.fontColor || fontColor;
            const textWidth = ctx.measureText(legendItem.text).width;
            const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
            const width = boxWidth + halfFontSize + textWidth;
            let x2 = cursor.x;
            let y = cursor.y;
            rtlHelper.setWidth(this.width);
            if (isHorizontal) {
              if (i2 > 0 && x2 + width + padding > this.right) {
                y = cursor.y += lineHeight;
                cursor.line++;
                x2 = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
              }
            } else if (i2 > 0 && y + lineHeight > this.bottom) {
              x2 = cursor.x = x2 + columnSizes[cursor.line].width + padding;
              cursor.line++;
              y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
            }
            const realX = rtlHelper.x(x2);
            drawLegendBox(realX, y, legendItem);
            x2 = _textX(textAlign, x2 + boxWidth + halfFontSize, isHorizontal ? x2 + width : this.right, opts.rtl);
            fillText(rtlHelper.x(x2), y, legendItem);
            if (isHorizontal) {
              cursor.x += width + padding;
            } else {
              cursor.y += lineHeight;
            }
          });
          restoreTextDirection(this.ctx, opts.textDirection);
        }
        drawTitle() {
          const opts = this.options;
          const titleOpts = opts.title;
          const titleFont = toFont(titleOpts.font);
          const titlePadding = toPadding(titleOpts.padding);
          if (!titleOpts.display) {
            return;
          }
          const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
          const ctx = this.ctx;
          const position = titleOpts.position;
          const halfFontSize = titleFont.size / 2;
          const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
          let y;
          let left = this.left;
          let maxWidth = this.width;
          if (this.isHorizontal()) {
            maxWidth = Math.max(...this.lineWidths);
            y = this.top + topPaddingPlusHalfFontSize;
            left = _alignStartEnd(opts.align, left, this.right - maxWidth);
          } else {
            const maxHeight = this.columnSizes.reduce((acc, size) => Math.max(acc, size.height), 0);
            y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
          }
          const x2 = _alignStartEnd(position, left, left + maxWidth);
          ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
          ctx.textBaseline = "middle";
          ctx.strokeStyle = titleOpts.color;
          ctx.fillStyle = titleOpts.color;
          ctx.font = titleFont.string;
          renderText(ctx, titleOpts.text, x2, y, titleFont);
        }
        _computeTitleHeight() {
          const titleOpts = this.options.title;
          const titleFont = toFont(titleOpts.font);
          const titlePadding = toPadding(titleOpts.padding);
          return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
        }
        _getLegendItemAt(x2, y) {
          let i2, hitBox, lh;
          if (_isBetween(x2, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
            lh = this.legendHitBoxes;
            for (i2 = 0; i2 < lh.length; ++i2) {
              hitBox = lh[i2];
              if (_isBetween(x2, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) {
                return this.legendItems[i2];
              }
            }
          }
          return null;
        }
        handleEvent(e2) {
          const opts = this.options;
          if (!isListened(e2.type, opts)) {
            return;
          }
          const hoveredItem = this._getLegendItemAt(e2.x, e2.y);
          if (e2.type === "mousemove") {
            const previous = this._hoveredItem;
            const sameItem = itemsEqual(previous, hoveredItem);
            if (previous && !sameItem) {
              callback(opts.onLeave, [e2, previous, this], this);
            }
            this._hoveredItem = hoveredItem;
            if (hoveredItem && !sameItem) {
              callback(opts.onHover, [e2, hoveredItem, this], this);
            }
          } else if (hoveredItem) {
            callback(opts.onClick, [e2, hoveredItem, this], this);
          }
        }
      }
      function isListened(type, opts) {
        if (type === "mousemove" && (opts.onHover || opts.onLeave)) {
          return true;
        }
        if (opts.onClick && (type === "click" || type === "mouseup")) {
          return true;
        }
        return false;
      }
      var plugin_legend = {
        id: "legend",
        _element: Legend,
        start(chart, _args, options) {
          const legend = chart.legend = new Legend({ ctx: chart.ctx, options, chart });
          layouts.configure(chart, legend, options);
          layouts.addBox(chart, legend);
        },
        stop(chart) {
          layouts.removeBox(chart, chart.legend);
          delete chart.legend;
        },
        beforeUpdate(chart, _args, options) {
          const legend = chart.legend;
          layouts.configure(chart, legend, options);
          legend.options = options;
        },
        afterUpdate(chart) {
          const legend = chart.legend;
          legend.buildLabels();
          legend.adjustHitBoxes();
        },
        afterEvent(chart, args) {
          if (!args.replay) {
            chart.legend.handleEvent(args.event);
          }
        },
        defaults: {
          display: true,
          position: "top",
          align: "center",
          fullSize: true,
          reverse: false,
          weight: 1e3,
          onClick(e2, legendItem, legend) {
            const index = legendItem.datasetIndex;
            const ci = legend.chart;
            if (ci.isDatasetVisible(index)) {
              ci.hide(index);
              legendItem.hidden = true;
            } else {
              ci.show(index);
              legendItem.hidden = false;
            }
          },
          onHover: null,
          onLeave: null,
          labels: {
            color: (ctx) => ctx.chart.options.color,
            boxWidth: 40,
            padding: 10,
            generateLabels(chart) {
              const datasets = chart.data.datasets;
              const { labels: { usePointStyle, pointStyle, textAlign, color: color2 } } = chart.legend.options;
              return chart._getSortedDatasetMetas().map((meta) => {
                const style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
                const borderWidth = toPadding(style.borderWidth);
                return {
                  text: datasets[meta.index].label,
                  fillStyle: style.backgroundColor,
                  fontColor: color2,
                  hidden: !meta.visible,
                  lineCap: style.borderCapStyle,
                  lineDash: style.borderDash,
                  lineDashOffset: style.borderDashOffset,
                  lineJoin: style.borderJoinStyle,
                  lineWidth: (borderWidth.width + borderWidth.height) / 4,
                  strokeStyle: style.borderColor,
                  pointStyle: pointStyle || style.pointStyle,
                  rotation: style.rotation,
                  textAlign: textAlign || style.textAlign,
                  borderRadius: 0,
                  datasetIndex: meta.index
                };
              }, this);
            }
          },
          title: {
            color: (ctx) => ctx.chart.options.color,
            display: false,
            position: "center",
            text: ""
          }
        },
        descriptors: {
          _scriptable: (name) => !name.startsWith("on"),
          labels: {
            _scriptable: (name) => !["generateLabels", "filter", "sort"].includes(name)
          }
        }
      };
      class Title extends Element {
        constructor(config) {
          super();
          this.chart = config.chart;
          this.options = config.options;
          this.ctx = config.ctx;
          this._padding = void 0;
          this.top = void 0;
          this.bottom = void 0;
          this.left = void 0;
          this.right = void 0;
          this.width = void 0;
          this.height = void 0;
          this.position = void 0;
          this.weight = void 0;
          this.fullSize = void 0;
        }
        update(maxWidth, maxHeight) {
          const opts = this.options;
          this.left = 0;
          this.top = 0;
          if (!opts.display) {
            this.width = this.height = this.right = this.bottom = 0;
            return;
          }
          this.width = this.right = maxWidth;
          this.height = this.bottom = maxHeight;
          const lineCount = isArray(opts.text) ? opts.text.length : 1;
          this._padding = toPadding(opts.padding);
          const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
          if (this.isHorizontal()) {
            this.height = textSize;
          } else {
            this.width = textSize;
          }
        }
        isHorizontal() {
          const pos = this.options.position;
          return pos === "top" || pos === "bottom";
        }
        _drawArgs(offset) {
          const { top, left, bottom, right, options } = this;
          const align = options.align;
          let rotation = 0;
          let maxWidth, titleX, titleY;
          if (this.isHorizontal()) {
            titleX = _alignStartEnd(align, left, right);
            titleY = top + offset;
            maxWidth = right - left;
          } else {
            if (options.position === "left") {
              titleX = left + offset;
              titleY = _alignStartEnd(align, bottom, top);
              rotation = PI * -0.5;
            } else {
              titleX = right - offset;
              titleY = _alignStartEnd(align, top, bottom);
              rotation = PI * 0.5;
            }
            maxWidth = bottom - top;
          }
          return { titleX, titleY, maxWidth, rotation };
        }
        draw() {
          const ctx = this.ctx;
          const opts = this.options;
          if (!opts.display) {
            return;
          }
          const fontOpts = toFont(opts.font);
          const lineHeight = fontOpts.lineHeight;
          const offset = lineHeight / 2 + this._padding.top;
          const { titleX, titleY, maxWidth, rotation } = this._drawArgs(offset);
          renderText(ctx, opts.text, 0, 0, fontOpts, {
            color: opts.color,
            maxWidth,
            rotation,
            textAlign: _toLeftRightCenter(opts.align),
            textBaseline: "middle",
            translation: [titleX, titleY]
          });
        }
      }
      function createTitle(chart, titleOpts) {
        const title = new Title({
          ctx: chart.ctx,
          options: titleOpts,
          chart
        });
        layouts.configure(chart, title, titleOpts);
        layouts.addBox(chart, title);
        chart.titleBlock = title;
      }
      var plugin_title = {
        id: "title",
        _element: Title,
        start(chart, _args, options) {
          createTitle(chart, options);
        },
        stop(chart) {
          const titleBlock = chart.titleBlock;
          layouts.removeBox(chart, titleBlock);
          delete chart.titleBlock;
        },
        beforeUpdate(chart, _args, options) {
          const title = chart.titleBlock;
          layouts.configure(chart, title, options);
          title.options = options;
        },
        defaults: {
          align: "center",
          display: false,
          font: {
            weight: "bold"
          },
          fullSize: true,
          padding: 10,
          position: "top",
          text: "",
          weight: 2e3
        },
        defaultRoutes: {
          color: "color"
        },
        descriptors: {
          _scriptable: true,
          _indexable: false
        }
      };
      const map = /* @__PURE__ */ new WeakMap();
      var plugin_subtitle = {
        id: "subtitle",
        start(chart, _args, options) {
          const title = new Title({
            ctx: chart.ctx,
            options,
            chart
          });
          layouts.configure(chart, title, options);
          layouts.addBox(chart, title);
          map.set(chart, title);
        },
        stop(chart) {
          layouts.removeBox(chart, map.get(chart));
          map.delete(chart);
        },
        beforeUpdate(chart, _args, options) {
          const title = map.get(chart);
          layouts.configure(chart, title, options);
          title.options = options;
        },
        defaults: {
          align: "center",
          display: false,
          font: {
            weight: "normal"
          },
          fullSize: true,
          padding: 0,
          position: "top",
          text: "",
          weight: 1500
        },
        defaultRoutes: {
          color: "color"
        },
        descriptors: {
          _scriptable: true,
          _indexable: false
        }
      };
      const positioners = {
        average(items) {
          if (!items.length) {
            return false;
          }
          let i2, len;
          let x2 = 0;
          let y = 0;
          let count = 0;
          for (i2 = 0, len = items.length; i2 < len; ++i2) {
            const el = items[i2].element;
            if (el && el.hasValue()) {
              const pos = el.tooltipPosition();
              x2 += pos.x;
              y += pos.y;
              ++count;
            }
          }
          return {
            x: x2 / count,
            y: y / count
          };
        },
        nearest(items, eventPosition) {
          if (!items.length) {
            return false;
          }
          let x2 = eventPosition.x;
          let y = eventPosition.y;
          let minDistance = Number.POSITIVE_INFINITY;
          let i2, len, nearestElement;
          for (i2 = 0, len = items.length; i2 < len; ++i2) {
            const el = items[i2].element;
            if (el && el.hasValue()) {
              const center = el.getCenterPoint();
              const d = distanceBetweenPoints(eventPosition, center);
              if (d < minDistance) {
                minDistance = d;
                nearestElement = el;
              }
            }
          }
          if (nearestElement) {
            const tp = nearestElement.tooltipPosition();
            x2 = tp.x;
            y = tp.y;
          }
          return {
            x: x2,
            y
          };
        }
      };
      function pushOrConcat(base2, toPush) {
        if (toPush) {
          if (isArray(toPush)) {
            Array.prototype.push.apply(base2, toPush);
          } else {
            base2.push(toPush);
          }
        }
        return base2;
      }
      function splitNewlines(str) {
        if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) {
          return str.split("\n");
        }
        return str;
      }
      function createTooltipItem(chart, item) {
        const { element, datasetIndex, index } = item;
        const controller = chart.getDatasetMeta(datasetIndex).controller;
        const { label, value } = controller.getLabelAndValue(index);
        return {
          chart,
          label,
          parsed: controller.getParsed(index),
          raw: chart.data.datasets[datasetIndex].data[index],
          formattedValue: value,
          dataset: controller.getDataset(),
          dataIndex: index,
          datasetIndex,
          element
        };
      }
      function getTooltipSize(tooltip, options) {
        const ctx = tooltip.chart.ctx;
        const { body, footer, title } = tooltip;
        const { boxWidth, boxHeight } = options;
        const bodyFont = toFont(options.bodyFont);
        const titleFont = toFont(options.titleFont);
        const footerFont = toFont(options.footerFont);
        const titleLineCount = title.length;
        const footerLineCount = footer.length;
        const bodyLineItemCount = body.length;
        const padding = toPadding(options.padding);
        let height = padding.height;
        let width = 0;
        let combinedBodyLength = body.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
        combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
        if (titleLineCount) {
          height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
        }
        if (combinedBodyLength) {
          const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
          height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
        }
        if (footerLineCount) {
          height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
        }
        let widthPadding = 0;
        const maxLineWidth = function(line) {
          width = Math.max(width, ctx.measureText(line).width + widthPadding);
        };
        ctx.save();
        ctx.font = titleFont.string;
        each(tooltip.title, maxLineWidth);
        ctx.font = bodyFont.string;
        each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
        widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
        each(body, (bodyItem) => {
          each(bodyItem.before, maxLineWidth);
          each(bodyItem.lines, maxLineWidth);
          each(bodyItem.after, maxLineWidth);
        });
        widthPadding = 0;
        ctx.font = footerFont.string;
        each(tooltip.footer, maxLineWidth);
        ctx.restore();
        width += padding.width;
        return { width, height };
      }
      function determineYAlign(chart, size) {
        const { y, height } = size;
        if (y < height / 2) {
          return "top";
        } else if (y > chart.height - height / 2) {
          return "bottom";
        }
        return "center";
      }
      function doesNotFitWithAlign(xAlign, chart, options, size) {
        const { x: x2, width } = size;
        const caret = options.caretSize + options.caretPadding;
        if (xAlign === "left" && x2 + width + caret > chart.width) {
          return true;
        }
        if (xAlign === "right" && x2 - width - caret < 0) {
          return true;
        }
      }
      function determineXAlign(chart, options, size, yAlign) {
        const { x: x2, width } = size;
        const { width: chartWidth, chartArea: { left, right } } = chart;
        let xAlign = "center";
        if (yAlign === "center") {
          xAlign = x2 <= (left + right) / 2 ? "left" : "right";
        } else if (x2 <= width / 2) {
          xAlign = "left";
        } else if (x2 >= chartWidth - width / 2) {
          xAlign = "right";
        }
        if (doesNotFitWithAlign(xAlign, chart, options, size)) {
          xAlign = "center";
        }
        return xAlign;
      }
      function determineAlignment(chart, options, size) {
        const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
        return {
          xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
          yAlign
        };
      }
      function alignX(size, xAlign) {
        let { x: x2, width } = size;
        if (xAlign === "right") {
          x2 -= width;
        } else if (xAlign === "center") {
          x2 -= width / 2;
        }
        return x2;
      }
      function alignY(size, yAlign, paddingAndSize) {
        let { y, height } = size;
        if (yAlign === "top") {
          y += paddingAndSize;
        } else if (yAlign === "bottom") {
          y -= height + paddingAndSize;
        } else {
          y -= height / 2;
        }
        return y;
      }
      function getBackgroundPoint(options, size, alignment, chart) {
        const { caretSize, caretPadding, cornerRadius } = options;
        const { xAlign, yAlign } = alignment;
        const paddingAndSize = caretSize + caretPadding;
        const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
        let x2 = alignX(size, xAlign);
        const y = alignY(size, yAlign, paddingAndSize);
        if (yAlign === "center") {
          if (xAlign === "left") {
            x2 += paddingAndSize;
          } else if (xAlign === "right") {
            x2 -= paddingAndSize;
          }
        } else if (xAlign === "left") {
          x2 -= Math.max(topLeft, bottomLeft) + caretSize;
        } else if (xAlign === "right") {
          x2 += Math.max(topRight, bottomRight) + caretSize;
        }
        return {
          x: _limitValue(x2, 0, chart.width - size.width),
          y: _limitValue(y, 0, chart.height - size.height)
        };
      }
      function getAlignedX(tooltip, align, options) {
        const padding = toPadding(options.padding);
        return align === "center" ? tooltip.x + tooltip.width / 2 : align === "right" ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
      }
      function getBeforeAfterBodyLines(callback2) {
        return pushOrConcat([], splitNewlines(callback2));
      }
      function createTooltipContext(parent, tooltip, tooltipItems) {
        return createContext(parent, {
          tooltip,
          tooltipItems,
          type: "tooltip"
        });
      }
      function overrideCallbacks(callbacks, context) {
        const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
        return override ? callbacks.override(override) : callbacks;
      }
      class Tooltip extends Element {
        constructor(config) {
          super();
          this.opacity = 0;
          this._active = [];
          this._eventPosition = void 0;
          this._size = void 0;
          this._cachedAnimations = void 0;
          this._tooltipItems = [];
          this.$animations = void 0;
          this.$context = void 0;
          this.chart = config.chart || config._chart;
          this._chart = this.chart;
          this.options = config.options;
          this.dataPoints = void 0;
          this.title = void 0;
          this.beforeBody = void 0;
          this.body = void 0;
          this.afterBody = void 0;
          this.footer = void 0;
          this.xAlign = void 0;
          this.yAlign = void 0;
          this.x = void 0;
          this.y = void 0;
          this.height = void 0;
          this.width = void 0;
          this.caretX = void 0;
          this.caretY = void 0;
          this.labelColors = void 0;
          this.labelPointStyles = void 0;
          this.labelTextColors = void 0;
        }
        initialize(options) {
          this.options = options;
          this._cachedAnimations = void 0;
          this.$context = void 0;
        }
        _resolveAnimations() {
          const cached = this._cachedAnimations;
          if (cached) {
            return cached;
          }
          const chart = this.chart;
          const options = this.options.setContext(this.getContext());
          const opts = options.enabled && chart.options.animation && options.animations;
          const animations = new Animations(this.chart, opts);
          if (opts._cacheable) {
            this._cachedAnimations = Object.freeze(animations);
          }
          return animations;
        }
        getContext() {
          return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
        }
        getTitle(context, options) {
          const { callbacks } = options;
          const beforeTitle = callbacks.beforeTitle.apply(this, [context]);
          const title = callbacks.title.apply(this, [context]);
          const afterTitle = callbacks.afterTitle.apply(this, [context]);
          let lines = [];
          lines = pushOrConcat(lines, splitNewlines(beforeTitle));
          lines = pushOrConcat(lines, splitNewlines(title));
          lines = pushOrConcat(lines, splitNewlines(afterTitle));
          return lines;
        }
        getBeforeBody(tooltipItems, options) {
          return getBeforeAfterBodyLines(options.callbacks.beforeBody.apply(this, [tooltipItems]));
        }
        getBody(tooltipItems, options) {
          const { callbacks } = options;
          const bodyItems = [];
          each(tooltipItems, (context) => {
            const bodyItem = {
              before: [],
              lines: [],
              after: []
            };
            const scoped = overrideCallbacks(callbacks, context);
            pushOrConcat(bodyItem.before, splitNewlines(scoped.beforeLabel.call(this, context)));
            pushOrConcat(bodyItem.lines, scoped.label.call(this, context));
            pushOrConcat(bodyItem.after, splitNewlines(scoped.afterLabel.call(this, context)));
            bodyItems.push(bodyItem);
          });
          return bodyItems;
        }
        getAfterBody(tooltipItems, options) {
          return getBeforeAfterBodyLines(options.callbacks.afterBody.apply(this, [tooltipItems]));
        }
        getFooter(tooltipItems, options) {
          const { callbacks } = options;
          const beforeFooter = callbacks.beforeFooter.apply(this, [tooltipItems]);
          const footer = callbacks.footer.apply(this, [tooltipItems]);
          const afterFooter = callbacks.afterFooter.apply(this, [tooltipItems]);
          let lines = [];
          lines = pushOrConcat(lines, splitNewlines(beforeFooter));
          lines = pushOrConcat(lines, splitNewlines(footer));
          lines = pushOrConcat(lines, splitNewlines(afterFooter));
          return lines;
        }
        _createItems(options) {
          const active = this._active;
          const data = this.chart.data;
          const labelColors = [];
          const labelPointStyles = [];
          const labelTextColors = [];
          let tooltipItems = [];
          let i2, len;
          for (i2 = 0, len = active.length; i2 < len; ++i2) {
            tooltipItems.push(createTooltipItem(this.chart, active[i2]));
          }
          if (options.filter) {
            tooltipItems = tooltipItems.filter((element, index, array) => options.filter(element, index, array, data));
          }
          if (options.itemSort) {
            tooltipItems = tooltipItems.sort((a, b) => options.itemSort(a, b, data));
          }
          each(tooltipItems, (context) => {
            const scoped = overrideCallbacks(options.callbacks, context);
            labelColors.push(scoped.labelColor.call(this, context));
            labelPointStyles.push(scoped.labelPointStyle.call(this, context));
            labelTextColors.push(scoped.labelTextColor.call(this, context));
          });
          this.labelColors = labelColors;
          this.labelPointStyles = labelPointStyles;
          this.labelTextColors = labelTextColors;
          this.dataPoints = tooltipItems;
          return tooltipItems;
        }
        update(changed, replay) {
          const options = this.options.setContext(this.getContext());
          const active = this._active;
          let properties;
          let tooltipItems = [];
          if (!active.length) {
            if (this.opacity !== 0) {
              properties = {
                opacity: 0
              };
            }
          } else {
            const position = positioners[options.position].call(this, active, this._eventPosition);
            tooltipItems = this._createItems(options);
            this.title = this.getTitle(tooltipItems, options);
            this.beforeBody = this.getBeforeBody(tooltipItems, options);
            this.body = this.getBody(tooltipItems, options);
            this.afterBody = this.getAfterBody(tooltipItems, options);
            this.footer = this.getFooter(tooltipItems, options);
            const size = this._size = getTooltipSize(this, options);
            const positionAndSize = Object.assign({}, position, size);
            const alignment = determineAlignment(this.chart, options, positionAndSize);
            const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
            this.xAlign = alignment.xAlign;
            this.yAlign = alignment.yAlign;
            properties = {
              opacity: 1,
              x: backgroundPoint.x,
              y: backgroundPoint.y,
              width: size.width,
              height: size.height,
              caretX: position.x,
              caretY: position.y
            };
          }
          this._tooltipItems = tooltipItems;
          this.$context = void 0;
          if (properties) {
            this._resolveAnimations().update(this, properties);
          }
          if (changed && options.external) {
            options.external.call(this, { chart: this.chart, tooltip: this, replay });
          }
        }
        drawCaret(tooltipPoint, ctx, size, options) {
          const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
          ctx.lineTo(caretPosition.x1, caretPosition.y1);
          ctx.lineTo(caretPosition.x2, caretPosition.y2);
          ctx.lineTo(caretPosition.x3, caretPosition.y3);
        }
        getCaretPosition(tooltipPoint, size, options) {
          const { xAlign, yAlign } = this;
          const { caretSize, cornerRadius } = options;
          const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
          const { x: ptX, y: ptY } = tooltipPoint;
          const { width, height } = size;
          let x1, x2, x3, y1, y2, y3;
          if (yAlign === "center") {
            y2 = ptY + height / 2;
            if (xAlign === "left") {
              x1 = ptX;
              x2 = x1 - caretSize;
              y1 = y2 + caretSize;
              y3 = y2 - caretSize;
            } else {
              x1 = ptX + width;
              x2 = x1 + caretSize;
              y1 = y2 - caretSize;
              y3 = y2 + caretSize;
            }
            x3 = x1;
          } else {
            if (xAlign === "left") {
              x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
            } else if (xAlign === "right") {
              x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
            } else {
              x2 = this.caretX;
            }
            if (yAlign === "top") {
              y1 = ptY;
              y2 = y1 - caretSize;
              x1 = x2 - caretSize;
              x3 = x2 + caretSize;
            } else {
              y1 = ptY + height;
              y2 = y1 + caretSize;
              x1 = x2 + caretSize;
              x3 = x2 - caretSize;
            }
            y3 = y1;
          }
          return { x1, x2, x3, y1, y2, y3 };
        }
        drawTitle(pt, ctx, options) {
          const title = this.title;
          const length = title.length;
          let titleFont, titleSpacing, i2;
          if (length) {
            const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
            pt.x = getAlignedX(this, options.titleAlign, options);
            ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
            ctx.textBaseline = "middle";
            titleFont = toFont(options.titleFont);
            titleSpacing = options.titleSpacing;
            ctx.fillStyle = options.titleColor;
            ctx.font = titleFont.string;
            for (i2 = 0; i2 < length; ++i2) {
              ctx.fillText(title[i2], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
              pt.y += titleFont.lineHeight + titleSpacing;
              if (i2 + 1 === length) {
                pt.y += options.titleMarginBottom - titleSpacing;
              }
            }
          }
        }
        _drawColorBox(ctx, pt, i2, rtlHelper, options) {
          const labelColors = this.labelColors[i2];
          const labelPointStyle = this.labelPointStyles[i2];
          const { boxHeight, boxWidth, boxPadding } = options;
          const bodyFont = toFont(options.bodyFont);
          const colorX = getAlignedX(this, "left", options);
          const rtlColorX = rtlHelper.x(colorX);
          const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
          const colorY = pt.y + yOffSet;
          if (options.usePointStyle) {
            const drawOptions = {
              radius: Math.min(boxWidth, boxHeight) / 2,
              pointStyle: labelPointStyle.pointStyle,
              rotation: labelPointStyle.rotation,
              borderWidth: 1
            };
            const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
            const centerY = colorY + boxHeight / 2;
            ctx.strokeStyle = options.multiKeyBackground;
            ctx.fillStyle = options.multiKeyBackground;
            drawPoint(ctx, drawOptions, centerX, centerY);
            ctx.strokeStyle = labelColors.borderColor;
            ctx.fillStyle = labelColors.backgroundColor;
            drawPoint(ctx, drawOptions, centerX, centerY);
          } else {
            ctx.lineWidth = labelColors.borderWidth || 1;
            ctx.strokeStyle = labelColors.borderColor;
            ctx.setLineDash(labelColors.borderDash || []);
            ctx.lineDashOffset = labelColors.borderDashOffset || 0;
            const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth - boxPadding);
            const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - boxPadding - 2);
            const borderRadius = toTRBLCorners(labelColors.borderRadius);
            if (Object.values(borderRadius).some((v) => v !== 0)) {
              ctx.beginPath();
              ctx.fillStyle = options.multiKeyBackground;
              addRoundedRectPath(ctx, {
                x: outerX,
                y: colorY,
                w: boxWidth,
                h: boxHeight,
                radius: borderRadius
              });
              ctx.fill();
              ctx.stroke();
              ctx.fillStyle = labelColors.backgroundColor;
              ctx.beginPath();
              addRoundedRectPath(ctx, {
                x: innerX,
                y: colorY + 1,
                w: boxWidth - 2,
                h: boxHeight - 2,
                radius: borderRadius
              });
              ctx.fill();
            } else {
              ctx.fillStyle = options.multiKeyBackground;
              ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
              ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
              ctx.fillStyle = labelColors.backgroundColor;
              ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
            }
          }
          ctx.fillStyle = this.labelTextColors[i2];
        }
        drawBody(pt, ctx, options) {
          const { body } = this;
          const { bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding } = options;
          const bodyFont = toFont(options.bodyFont);
          let bodyLineHeight = bodyFont.lineHeight;
          let xLinePadding = 0;
          const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
          const fillLineOfText = function(line) {
            ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
            pt.y += bodyLineHeight + bodySpacing;
          };
          const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
          let bodyItem, textColor, lines, i2, j, ilen, jlen;
          ctx.textAlign = bodyAlign;
          ctx.textBaseline = "middle";
          ctx.font = bodyFont.string;
          pt.x = getAlignedX(this, bodyAlignForCalculation, options);
          ctx.fillStyle = options.bodyColor;
          each(this.beforeBody, fillLineOfText);
          xLinePadding = displayColors && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
          for (i2 = 0, ilen = body.length; i2 < ilen; ++i2) {
            bodyItem = body[i2];
            textColor = this.labelTextColors[i2];
            ctx.fillStyle = textColor;
            each(bodyItem.before, fillLineOfText);
            lines = bodyItem.lines;
            if (displayColors && lines.length) {
              this._drawColorBox(ctx, pt, i2, rtlHelper, options);
              bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
            }
            for (j = 0, jlen = lines.length; j < jlen; ++j) {
              fillLineOfText(lines[j]);
              bodyLineHeight = bodyFont.lineHeight;
            }
            each(bodyItem.after, fillLineOfText);
          }
          xLinePadding = 0;
          bodyLineHeight = bodyFont.lineHeight;
          each(this.afterBody, fillLineOfText);
          pt.y -= bodySpacing;
        }
        drawFooter(pt, ctx, options) {
          const footer = this.footer;
          const length = footer.length;
          let footerFont, i2;
          if (length) {
            const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
            pt.x = getAlignedX(this, options.footerAlign, options);
            pt.y += options.footerMarginTop;
            ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
            ctx.textBaseline = "middle";
            footerFont = toFont(options.footerFont);
            ctx.fillStyle = options.footerColor;
            ctx.font = footerFont.string;
            for (i2 = 0; i2 < length; ++i2) {
              ctx.fillText(footer[i2], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
              pt.y += footerFont.lineHeight + options.footerSpacing;
            }
          }
        }
        drawBackground(pt, ctx, tooltipSize, options) {
          const { xAlign, yAlign } = this;
          const { x: x2, y } = pt;
          const { width, height } = tooltipSize;
          const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(options.cornerRadius);
          ctx.fillStyle = options.backgroundColor;
          ctx.strokeStyle = options.borderColor;
          ctx.lineWidth = options.borderWidth;
          ctx.beginPath();
          ctx.moveTo(x2 + topLeft, y);
          if (yAlign === "top") {
            this.drawCaret(pt, ctx, tooltipSize, options);
          }
          ctx.lineTo(x2 + width - topRight, y);
          ctx.quadraticCurveTo(x2 + width, y, x2 + width, y + topRight);
          if (yAlign === "center" && xAlign === "right") {
            this.drawCaret(pt, ctx, tooltipSize, options);
          }
          ctx.lineTo(x2 + width, y + height - bottomRight);
          ctx.quadraticCurveTo(x2 + width, y + height, x2 + width - bottomRight, y + height);
          if (yAlign === "bottom") {
            this.drawCaret(pt, ctx, tooltipSize, options);
          }
          ctx.lineTo(x2 + bottomLeft, y + height);
          ctx.quadraticCurveTo(x2, y + height, x2, y + height - bottomLeft);
          if (yAlign === "center" && xAlign === "left") {
            this.drawCaret(pt, ctx, tooltipSize, options);
          }
          ctx.lineTo(x2, y + topLeft);
          ctx.quadraticCurveTo(x2, y, x2 + topLeft, y);
          ctx.closePath();
          ctx.fill();
          if (options.borderWidth > 0) {
            ctx.stroke();
          }
        }
        _updateAnimationTarget(options) {
          const chart = this.chart;
          const anims = this.$animations;
          const animX = anims && anims.x;
          const animY = anims && anims.y;
          if (animX || animY) {
            const position = positioners[options.position].call(this, this._active, this._eventPosition);
            if (!position) {
              return;
            }
            const size = this._size = getTooltipSize(this, options);
            const positionAndSize = Object.assign({}, position, this._size);
            const alignment = determineAlignment(chart, options, positionAndSize);
            const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
            if (animX._to !== point.x || animY._to !== point.y) {
              this.xAlign = alignment.xAlign;
              this.yAlign = alignment.yAlign;
              this.width = size.width;
              this.height = size.height;
              this.caretX = position.x;
              this.caretY = position.y;
              this._resolveAnimations().update(this, point);
            }
          }
        }
        draw(ctx) {
          const options = this.options.setContext(this.getContext());
          let opacity = this.opacity;
          if (!opacity) {
            return;
          }
          this._updateAnimationTarget(options);
          const tooltipSize = {
            width: this.width,
            height: this.height
          };
          const pt = {
            x: this.x,
            y: this.y
          };
          opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
          const padding = toPadding(options.padding);
          const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
          if (options.enabled && hasTooltipContent) {
            ctx.save();
            ctx.globalAlpha = opacity;
            this.drawBackground(pt, ctx, tooltipSize, options);
            overrideTextDirection(ctx, options.textDirection);
            pt.y += padding.top;
            this.drawTitle(pt, ctx, options);
            this.drawBody(pt, ctx, options);
            this.drawFooter(pt, ctx, options);
            restoreTextDirection(ctx, options.textDirection);
            ctx.restore();
          }
        }
        getActiveElements() {
          return this._active || [];
        }
        setActiveElements(activeElements, eventPosition) {
          const lastActive = this._active;
          const active = activeElements.map(({ datasetIndex, index }) => {
            const meta = this.chart.getDatasetMeta(datasetIndex);
            if (!meta) {
              throw new Error("Cannot find a dataset at index " + datasetIndex);
            }
            return {
              datasetIndex,
              element: meta.data[index],
              index
            };
          });
          const changed = !_elementsEqual(lastActive, active);
          const positionChanged = this._positionChanged(active, eventPosition);
          if (changed || positionChanged) {
            this._active = active;
            this._eventPosition = eventPosition;
            this._ignoreReplayEvents = true;
            this.update(true);
          }
        }
        handleEvent(e2, replay, inChartArea = true) {
          if (replay && this._ignoreReplayEvents) {
            return false;
          }
          this._ignoreReplayEvents = false;
          const options = this.options;
          const lastActive = this._active || [];
          const active = this._getActiveElements(e2, lastActive, replay, inChartArea);
          const positionChanged = this._positionChanged(active, e2);
          const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
          if (changed) {
            this._active = active;
            if (options.enabled || options.external) {
              this._eventPosition = {
                x: e2.x,
                y: e2.y
              };
              this.update(true, replay);
            }
          }
          return changed;
        }
        _getActiveElements(e2, lastActive, replay, inChartArea) {
          const options = this.options;
          if (e2.type === "mouseout") {
            return [];
          }
          if (!inChartArea) {
            return lastActive;
          }
          const active = this.chart.getElementsAtEventForMode(e2, options.mode, options, replay);
          if (options.reverse) {
            active.reverse();
          }
          return active;
        }
        _positionChanged(active, e2) {
          const { caretX, caretY, options } = this;
          const position = positioners[options.position].call(this, active, e2);
          return position !== false && (caretX !== position.x || caretY !== position.y);
        }
      }
      Tooltip.positioners = positioners;
      var plugin_tooltip = {
        id: "tooltip",
        _element: Tooltip,
        positioners,
        afterInit(chart, _args, options) {
          if (options) {
            chart.tooltip = new Tooltip({ chart, options });
          }
        },
        beforeUpdate(chart, _args, options) {
          if (chart.tooltip) {
            chart.tooltip.initialize(options);
          }
        },
        reset(chart, _args, options) {
          if (chart.tooltip) {
            chart.tooltip.initialize(options);
          }
        },
        afterDraw(chart) {
          const tooltip = chart.tooltip;
          const args = {
            tooltip
          };
          if (chart.notifyPlugins("beforeTooltipDraw", args) === false) {
            return;
          }
          if (tooltip) {
            tooltip.draw(chart.ctx);
          }
          chart.notifyPlugins("afterTooltipDraw", args);
        },
        afterEvent(chart, args) {
          if (chart.tooltip) {
            const useFinalPosition = args.replay;
            if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
              args.changed = true;
            }
          }
        },
        defaults: {
          enabled: true,
          external: null,
          position: "average",
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "#fff",
          titleFont: {
            weight: "bold"
          },
          titleSpacing: 2,
          titleMarginBottom: 6,
          titleAlign: "left",
          bodyColor: "#fff",
          bodySpacing: 2,
          bodyFont: {},
          bodyAlign: "left",
          footerColor: "#fff",
          footerSpacing: 2,
          footerMarginTop: 6,
          footerFont: {
            weight: "bold"
          },
          footerAlign: "left",
          padding: 6,
          caretPadding: 2,
          caretSize: 5,
          cornerRadius: 6,
          boxHeight: (ctx, opts) => opts.bodyFont.size,
          boxWidth: (ctx, opts) => opts.bodyFont.size,
          multiKeyBackground: "#fff",
          displayColors: true,
          boxPadding: 0,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          animation: {
            duration: 400,
            easing: "easeOutQuart"
          },
          animations: {
            numbers: {
              type: "number",
              properties: ["x", "y", "width", "height", "caretX", "caretY"]
            },
            opacity: {
              easing: "linear",
              duration: 200
            }
          },
          callbacks: {
            beforeTitle: noop3,
            title(tooltipItems) {
              if (tooltipItems.length > 0) {
                const item = tooltipItems[0];
                const labels = item.chart.data.labels;
                const labelCount = labels ? labels.length : 0;
                if (this && this.options && this.options.mode === "dataset") {
                  return item.dataset.label || "";
                } else if (item.label) {
                  return item.label;
                } else if (labelCount > 0 && item.dataIndex < labelCount) {
                  return labels[item.dataIndex];
                }
              }
              return "";
            },
            afterTitle: noop3,
            beforeBody: noop3,
            beforeLabel: noop3,
            label(tooltipItem) {
              if (this && this.options && this.options.mode === "dataset") {
                return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
              }
              let label = tooltipItem.dataset.label || "";
              if (label) {
                label += ": ";
              }
              const value = tooltipItem.formattedValue;
              if (!isNullOrUndef(value)) {
                label += value;
              }
              return label;
            },
            labelColor(tooltipItem) {
              const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
              const options = meta.controller.getStyle(tooltipItem.dataIndex);
              return {
                borderColor: options.borderColor,
                backgroundColor: options.backgroundColor,
                borderWidth: options.borderWidth,
                borderDash: options.borderDash,
                borderDashOffset: options.borderDashOffset,
                borderRadius: 0
              };
            },
            labelTextColor() {
              return this.options.bodyColor;
            },
            labelPointStyle(tooltipItem) {
              const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
              const options = meta.controller.getStyle(tooltipItem.dataIndex);
              return {
                pointStyle: options.pointStyle,
                rotation: options.rotation
              };
            },
            afterLabel: noop3,
            afterBody: noop3,
            beforeFooter: noop3,
            footer: noop3,
            afterFooter: noop3
          }
        },
        defaultRoutes: {
          bodyFont: "font",
          footerFont: "font",
          titleFont: "font"
        },
        descriptors: {
          _scriptable: (name) => name !== "filter" && name !== "itemSort" && name !== "external",
          _indexable: false,
          callbacks: {
            _scriptable: false,
            _indexable: false
          },
          animation: {
            _fallback: false
          },
          animations: {
            _fallback: "animation"
          }
        },
        additionalOptionScopes: ["interaction"]
      };
      var plugins = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        Decimation: plugin_decimation,
        Filler: plugin_filler,
        Legend: plugin_legend,
        SubTitle: plugin_subtitle,
        Title: plugin_title,
        Tooltip: plugin_tooltip
      });
      const addIfString = (labels, raw, index, addedLabels) => {
        if (typeof raw === "string") {
          index = labels.push(raw) - 1;
          addedLabels.unshift({ index, label: raw });
        } else if (isNaN(raw)) {
          index = null;
        }
        return index;
      };
      function findOrAddLabel(labels, raw, index, addedLabels) {
        const first = labels.indexOf(raw);
        if (first === -1) {
          return addIfString(labels, raw, index, addedLabels);
        }
        const last = labels.lastIndexOf(raw);
        return first !== last ? index : first;
      }
      const validIndex = (index, max) => index === null ? null : _limitValue(Math.round(index), 0, max);
      class CategoryScale extends Scale {
        constructor(cfg) {
          super(cfg);
          this._startValue = void 0;
          this._valueRange = 0;
          this._addedLabels = [];
        }
        init(scaleOptions) {
          const added = this._addedLabels;
          if (added.length) {
            const labels = this.getLabels();
            for (const { index, label } of added) {
              if (labels[index] === label) {
                labels.splice(index, 1);
              }
            }
            this._addedLabels = [];
          }
          super.init(scaleOptions);
        }
        parse(raw, index) {
          if (isNullOrUndef(raw)) {
            return null;
          }
          const labels = this.getLabels();
          index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw), this._addedLabels);
          return validIndex(index, labels.length - 1);
        }
        determineDataLimits() {
          const { minDefined, maxDefined } = this.getUserBounds();
          let { min, max } = this.getMinMax(true);
          if (this.options.bounds === "ticks") {
            if (!minDefined) {
              min = 0;
            }
            if (!maxDefined) {
              max = this.getLabels().length - 1;
            }
          }
          this.min = min;
          this.max = max;
        }
        buildTicks() {
          const min = this.min;
          const max = this.max;
          const offset = this.options.offset;
          const ticks = [];
          let labels = this.getLabels();
          labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
          this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
          this._startValue = this.min - (offset ? 0.5 : 0);
          for (let value = min; value <= max; value++) {
            ticks.push({ value });
          }
          return ticks;
        }
        getLabelForValue(value) {
          const labels = this.getLabels();
          if (value >= 0 && value < labels.length) {
            return labels[value];
          }
          return value;
        }
        configure() {
          super.configure();
          if (!this.isHorizontal()) {
            this._reversePixels = !this._reversePixels;
          }
        }
        getPixelForValue(value) {
          if (typeof value !== "number") {
            value = this.parse(value);
          }
          return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
        }
        getPixelForTick(index) {
          const ticks = this.ticks;
          if (index < 0 || index > ticks.length - 1) {
            return null;
          }
          return this.getPixelForValue(ticks[index].value);
        }
        getValueForPixel(pixel) {
          return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
        }
        getBasePixel() {
          return this.bottom;
        }
      }
      CategoryScale.id = "category";
      CategoryScale.defaults = {
        ticks: {
          callback: CategoryScale.prototype.getLabelForValue
        }
      };
      function generateTicks$1(generationOptions, dataRange) {
        const ticks = [];
        const MIN_SPACING = 1e-14;
        const { bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds } = generationOptions;
        const unit = step || 1;
        const maxSpaces = maxTicks - 1;
        const { min: rmin, max: rmax } = dataRange;
        const minDefined = !isNullOrUndef(min);
        const maxDefined = !isNullOrUndef(max);
        const countDefined = !isNullOrUndef(count);
        const minSpacing = (rmax - rmin) / (maxDigits + 1);
        let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
        let factor, niceMin, niceMax, numSpaces;
        if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
          return [{ value: rmin }, { value: rmax }];
        }
        numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
        if (numSpaces > maxSpaces) {
          spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
        }
        if (!isNullOrUndef(precision)) {
          factor = Math.pow(10, precision);
          spacing = Math.ceil(spacing * factor) / factor;
        }
        if (bounds === "ticks") {
          niceMin = Math.floor(rmin / spacing) * spacing;
          niceMax = Math.ceil(rmax / spacing) * spacing;
        } else {
          niceMin = rmin;
          niceMax = rmax;
        }
        if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
          numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
          spacing = (max - min) / numSpaces;
          niceMin = min;
          niceMax = max;
        } else if (countDefined) {
          niceMin = minDefined ? min : niceMin;
          niceMax = maxDefined ? max : niceMax;
          numSpaces = count - 1;
          spacing = (niceMax - niceMin) / numSpaces;
        } else {
          numSpaces = (niceMax - niceMin) / spacing;
          if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
            numSpaces = Math.round(numSpaces);
          } else {
            numSpaces = Math.ceil(numSpaces);
          }
        }
        const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
        factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
        niceMin = Math.round(niceMin * factor) / factor;
        niceMax = Math.round(niceMax * factor) / factor;
        let j = 0;
        if (minDefined) {
          if (includeBounds && niceMin !== min) {
            ticks.push({ value: min });
            if (niceMin < min) {
              j++;
            }
            if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
              j++;
            }
          } else if (niceMin < min) {
            j++;
          }
        }
        for (; j < numSpaces; ++j) {
          ticks.push({ value: Math.round((niceMin + j * spacing) * factor) / factor });
        }
        if (maxDefined && includeBounds && niceMax !== max) {
          if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
            ticks[ticks.length - 1].value = max;
          } else {
            ticks.push({ value: max });
          }
        } else if (!maxDefined || niceMax === max) {
          ticks.push({ value: niceMax });
        }
        return ticks;
      }
      function relativeLabelSize(value, minSpacing, { horizontal, minRotation }) {
        const rad = toRadians(minRotation);
        const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 1e-3;
        const length = 0.75 * minSpacing * ("" + value).length;
        return Math.min(minSpacing / ratio, length);
      }
      class LinearScaleBase extends Scale {
        constructor(cfg) {
          super(cfg);
          this.start = void 0;
          this.end = void 0;
          this._startValue = void 0;
          this._endValue = void 0;
          this._valueRange = 0;
        }
        parse(raw, index) {
          if (isNullOrUndef(raw)) {
            return null;
          }
          if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) {
            return null;
          }
          return +raw;
        }
        handleTickRangeOptions() {
          const { beginAtZero } = this.options;
          const { minDefined, maxDefined } = this.getUserBounds();
          let { min, max } = this;
          const setMin = (v) => min = minDefined ? min : v;
          const setMax = (v) => max = maxDefined ? max : v;
          if (beginAtZero) {
            const minSign = sign(min);
            const maxSign = sign(max);
            if (minSign < 0 && maxSign < 0) {
              setMax(0);
            } else if (minSign > 0 && maxSign > 0) {
              setMin(0);
            }
          }
          if (min === max) {
            let offset = 1;
            if (max >= Number.MAX_SAFE_INTEGER || min <= Number.MIN_SAFE_INTEGER) {
              offset = Math.abs(max * 0.05);
            }
            setMax(max + offset);
            if (!beginAtZero) {
              setMin(min - offset);
            }
          }
          this.min = min;
          this.max = max;
        }
        getTickLimit() {
          const tickOpts = this.options.ticks;
          let { maxTicksLimit, stepSize } = tickOpts;
          let maxTicks;
          if (stepSize) {
            maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
            if (maxTicks > 1e3) {
              console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
              maxTicks = 1e3;
            }
          } else {
            maxTicks = this.computeTickLimit();
            maxTicksLimit = maxTicksLimit || 11;
          }
          if (maxTicksLimit) {
            maxTicks = Math.min(maxTicksLimit, maxTicks);
          }
          return maxTicks;
        }
        computeTickLimit() {
          return Number.POSITIVE_INFINITY;
        }
        buildTicks() {
          const opts = this.options;
          const tickOpts = opts.ticks;
          let maxTicks = this.getTickLimit();
          maxTicks = Math.max(2, maxTicks);
          const numericGeneratorOptions = {
            maxTicks,
            bounds: opts.bounds,
            min: opts.min,
            max: opts.max,
            precision: tickOpts.precision,
            step: tickOpts.stepSize,
            count: tickOpts.count,
            maxDigits: this._maxDigits(),
            horizontal: this.isHorizontal(),
            minRotation: tickOpts.minRotation || 0,
            includeBounds: tickOpts.includeBounds !== false
          };
          const dataRange = this._range || this;
          const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
          if (opts.bounds === "ticks") {
            _setMinAndMaxByKey(ticks, this, "value");
          }
          if (opts.reverse) {
            ticks.reverse();
            this.start = this.max;
            this.end = this.min;
          } else {
            this.start = this.min;
            this.end = this.max;
          }
          return ticks;
        }
        configure() {
          const ticks = this.ticks;
          let start = this.min;
          let end = this.max;
          super.configure();
          if (this.options.offset && ticks.length) {
            const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
            start -= offset;
            end += offset;
          }
          this._startValue = start;
          this._endValue = end;
          this._valueRange = end - start;
        }
        getLabelForValue(value) {
          return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
        }
      }
      class LinearScale extends LinearScaleBase {
        determineDataLimits() {
          const { min, max } = this.getMinMax(true);
          this.min = isNumberFinite(min) ? min : 0;
          this.max = isNumberFinite(max) ? max : 1;
          this.handleTickRangeOptions();
        }
        computeTickLimit() {
          const horizontal = this.isHorizontal();
          const length = horizontal ? this.width : this.height;
          const minRotation = toRadians(this.options.ticks.minRotation);
          const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 1e-3;
          const tickFont = this._resolveTickFontOptions(0);
          return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
        }
        getPixelForValue(value) {
          return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
        }
        getValueForPixel(pixel) {
          return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
        }
      }
      LinearScale.id = "linear";
      LinearScale.defaults = {
        ticks: {
          callback: Ticks.formatters.numeric
        }
      };
      function isMajor(tickVal) {
        const remain = tickVal / Math.pow(10, Math.floor(log10(tickVal)));
        return remain === 1;
      }
      function generateTicks(generationOptions, dataRange) {
        const endExp = Math.floor(log10(dataRange.max));
        const endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
        const ticks = [];
        let tickVal = finiteOrDefault(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));
        let exp = Math.floor(log10(tickVal));
        let significand = Math.floor(tickVal / Math.pow(10, exp));
        let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
        do {
          ticks.push({ value: tickVal, major: isMajor(tickVal) });
          ++significand;
          if (significand === 10) {
            significand = 1;
            ++exp;
            precision = exp >= 0 ? 1 : precision;
          }
          tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
        } while (exp < endExp || exp === endExp && significand < endSignificand);
        const lastTick = finiteOrDefault(generationOptions.max, tickVal);
        ticks.push({ value: lastTick, major: isMajor(tickVal) });
        return ticks;
      }
      class LogarithmicScale extends Scale {
        constructor(cfg) {
          super(cfg);
          this.start = void 0;
          this.end = void 0;
          this._startValue = void 0;
          this._valueRange = 0;
        }
        parse(raw, index) {
          const value = LinearScaleBase.prototype.parse.apply(this, [raw, index]);
          if (value === 0) {
            this._zero = true;
            return void 0;
          }
          return isNumberFinite(value) && value > 0 ? value : null;
        }
        determineDataLimits() {
          const { min, max } = this.getMinMax(true);
          this.min = isNumberFinite(min) ? Math.max(0, min) : null;
          this.max = isNumberFinite(max) ? Math.max(0, max) : null;
          if (this.options.beginAtZero) {
            this._zero = true;
          }
          this.handleTickRangeOptions();
        }
        handleTickRangeOptions() {
          const { minDefined, maxDefined } = this.getUserBounds();
          let min = this.min;
          let max = this.max;
          const setMin = (v) => min = minDefined ? min : v;
          const setMax = (v) => max = maxDefined ? max : v;
          const exp = (v, m2) => Math.pow(10, Math.floor(log10(v)) + m2);
          if (min === max) {
            if (min <= 0) {
              setMin(1);
              setMax(10);
            } else {
              setMin(exp(min, -1));
              setMax(exp(max, 1));
            }
          }
          if (min <= 0) {
            setMin(exp(max, -1));
          }
          if (max <= 0) {
            setMax(exp(min, 1));
          }
          if (this._zero && this.min !== this._suggestedMin && min === exp(this.min, 0)) {
            setMin(exp(min, -1));
          }
          this.min = min;
          this.max = max;
        }
        buildTicks() {
          const opts = this.options;
          const generationOptions = {
            min: this._userMin,
            max: this._userMax
          };
          const ticks = generateTicks(generationOptions, this);
          if (opts.bounds === "ticks") {
            _setMinAndMaxByKey(ticks, this, "value");
          }
          if (opts.reverse) {
            ticks.reverse();
            this.start = this.max;
            this.end = this.min;
          } else {
            this.start = this.min;
            this.end = this.max;
          }
          return ticks;
        }
        getLabelForValue(value) {
          return value === void 0 ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
        }
        configure() {
          const start = this.min;
          super.configure();
          this._startValue = log10(start);
          this._valueRange = log10(this.max) - log10(start);
        }
        getPixelForValue(value) {
          if (value === void 0 || value === 0) {
            value = this.min;
          }
          if (value === null || isNaN(value)) {
            return NaN;
          }
          return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
        }
        getValueForPixel(pixel) {
          const decimal = this.getDecimalForPixel(pixel);
          return Math.pow(10, this._startValue + decimal * this._valueRange);
        }
      }
      LogarithmicScale.id = "logarithmic";
      LogarithmicScale.defaults = {
        ticks: {
          callback: Ticks.formatters.logarithmic,
          major: {
            enabled: true
          }
        }
      };
      function getTickBackdropHeight(opts) {
        const tickOpts = opts.ticks;
        if (tickOpts.display && opts.display) {
          const padding = toPadding(tickOpts.backdropPadding);
          return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
        }
        return 0;
      }
      function measureLabelSize(ctx, font, label) {
        label = isArray(label) ? label : [label];
        return {
          w: _longestText(ctx, font.string, label),
          h: label.length * font.lineHeight
        };
      }
      function determineLimits(angle, pos, size, min, max) {
        if (angle === min || angle === max) {
          return {
            start: pos - size / 2,
            end: pos + size / 2
          };
        } else if (angle < min || angle > max) {
          return {
            start: pos - size,
            end: pos
          };
        }
        return {
          start: pos,
          end: pos + size
        };
      }
      function fitWithPointLabels(scale) {
        const orig = {
          l: scale.left + scale._padding.left,
          r: scale.right - scale._padding.right,
          t: scale.top + scale._padding.top,
          b: scale.bottom - scale._padding.bottom
        };
        const limits = Object.assign({}, orig);
        const labelSizes = [];
        const padding = [];
        const valueCount = scale._pointLabels.length;
        const pointLabelOpts = scale.options.pointLabels;
        const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
        for (let i2 = 0; i2 < valueCount; i2++) {
          const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i2));
          padding[i2] = opts.padding;
          const pointPosition = scale.getPointPosition(i2, scale.drawingArea + padding[i2], additionalAngle);
          const plFont = toFont(opts.font);
          const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i2]);
          labelSizes[i2] = textSize;
          const angleRadians = _normalizeAngle(scale.getIndexAngle(i2) + additionalAngle);
          const angle = Math.round(toDegrees(angleRadians));
          const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
          const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
          updateLimits(limits, orig, angleRadians, hLimits, vLimits);
        }
        scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
        scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
      }
      function updateLimits(limits, orig, angle, hLimits, vLimits) {
        const sin = Math.abs(Math.sin(angle));
        const cos = Math.abs(Math.cos(angle));
        let x2 = 0;
        let y = 0;
        if (hLimits.start < orig.l) {
          x2 = (orig.l - hLimits.start) / sin;
          limits.l = Math.min(limits.l, orig.l - x2);
        } else if (hLimits.end > orig.r) {
          x2 = (hLimits.end - orig.r) / sin;
          limits.r = Math.max(limits.r, orig.r + x2);
        }
        if (vLimits.start < orig.t) {
          y = (orig.t - vLimits.start) / cos;
          limits.t = Math.min(limits.t, orig.t - y);
        } else if (vLimits.end > orig.b) {
          y = (vLimits.end - orig.b) / cos;
          limits.b = Math.max(limits.b, orig.b + y);
        }
      }
      function buildPointLabelItems(scale, labelSizes, padding) {
        const items = [];
        const valueCount = scale._pointLabels.length;
        const opts = scale.options;
        const extra = getTickBackdropHeight(opts) / 2;
        const outerDistance = scale.drawingArea;
        const additionalAngle = opts.pointLabels.centerPointLabels ? PI / valueCount : 0;
        for (let i2 = 0; i2 < valueCount; i2++) {
          const pointLabelPosition = scale.getPointPosition(i2, outerDistance + extra + padding[i2], additionalAngle);
          const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
          const size = labelSizes[i2];
          const y = yForAngle(pointLabelPosition.y, size.h, angle);
          const textAlign = getTextAlignForAngle(angle);
          const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
          items.push({
            x: pointLabelPosition.x,
            y,
            textAlign,
            left,
            top: y,
            right: left + size.w,
            bottom: y + size.h
          });
        }
        return items;
      }
      function getTextAlignForAngle(angle) {
        if (angle === 0 || angle === 180) {
          return "center";
        } else if (angle < 180) {
          return "left";
        }
        return "right";
      }
      function leftForTextAlign(x2, w, align) {
        if (align === "right") {
          x2 -= w;
        } else if (align === "center") {
          x2 -= w / 2;
        }
        return x2;
      }
      function yForAngle(y, h3, angle) {
        if (angle === 90 || angle === 270) {
          y -= h3 / 2;
        } else if (angle > 270 || angle < 90) {
          y -= h3;
        }
        return y;
      }
      function drawPointLabels(scale, labelCount) {
        const { ctx, options: { pointLabels } } = scale;
        for (let i2 = labelCount - 1; i2 >= 0; i2--) {
          const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i2));
          const plFont = toFont(optsAtIndex.font);
          const { x: x2, y, textAlign, left, top, right, bottom } = scale._pointLabelItems[i2];
          const { backdropColor } = optsAtIndex;
          if (!isNullOrUndef(backdropColor)) {
            const padding = toPadding(optsAtIndex.backdropPadding);
            ctx.fillStyle = backdropColor;
            ctx.fillRect(left - padding.left, top - padding.top, right - left + padding.width, bottom - top + padding.height);
          }
          renderText(ctx, scale._pointLabels[i2], x2, y + plFont.lineHeight / 2, plFont, {
            color: optsAtIndex.color,
            textAlign,
            textBaseline: "middle"
          });
        }
      }
      function pathRadiusLine(scale, radius, circular, labelCount) {
        const { ctx } = scale;
        if (circular) {
          ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
        } else {
          let pointPosition = scale.getPointPosition(0, radius);
          ctx.moveTo(pointPosition.x, pointPosition.y);
          for (let i2 = 1; i2 < labelCount; i2++) {
            pointPosition = scale.getPointPosition(i2, radius);
            ctx.lineTo(pointPosition.x, pointPosition.y);
          }
        }
      }
      function drawRadiusLine(scale, gridLineOpts, radius, labelCount) {
        const ctx = scale.ctx;
        const circular = gridLineOpts.circular;
        const { color: color2, lineWidth } = gridLineOpts;
        if (!circular && !labelCount || !color2 || !lineWidth || radius < 0) {
          return;
        }
        ctx.save();
        ctx.strokeStyle = color2;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash(gridLineOpts.borderDash);
        ctx.lineDashOffset = gridLineOpts.borderDashOffset;
        ctx.beginPath();
        pathRadiusLine(scale, radius, circular, labelCount);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      function createPointLabelContext(parent, index, label) {
        return createContext(parent, {
          label,
          index,
          type: "pointLabel"
        });
      }
      class RadialLinearScale extends LinearScaleBase {
        constructor(cfg) {
          super(cfg);
          this.xCenter = void 0;
          this.yCenter = void 0;
          this.drawingArea = void 0;
          this._pointLabels = [];
          this._pointLabelItems = [];
        }
        setDimensions() {
          const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
          const w = this.width = this.maxWidth - padding.width;
          const h3 = this.height = this.maxHeight - padding.height;
          this.xCenter = Math.floor(this.left + w / 2 + padding.left);
          this.yCenter = Math.floor(this.top + h3 / 2 + padding.top);
          this.drawingArea = Math.floor(Math.min(w, h3) / 2);
        }
        determineDataLimits() {
          const { min, max } = this.getMinMax(false);
          this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
          this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
          this.handleTickRangeOptions();
        }
        computeTickLimit() {
          return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
        }
        generateTickLabels(ticks) {
          LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
          this._pointLabels = this.getLabels().map((value, index) => {
            const label = callback(this.options.pointLabels.callback, [value, index], this);
            return label || label === 0 ? label : "";
          }).filter((v, i2) => this.chart.getDataVisibility(i2));
        }
        fit() {
          const opts = this.options;
          if (opts.display && opts.pointLabels.display) {
            fitWithPointLabels(this);
          } else {
            this.setCenterPoint(0, 0, 0, 0);
          }
        }
        setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
          this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
          this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
          this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
        }
        getIndexAngle(index) {
          const angleMultiplier = TAU / (this._pointLabels.length || 1);
          const startAngle = this.options.startAngle || 0;
          return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
        }
        getDistanceFromCenterForValue(value) {
          if (isNullOrUndef(value)) {
            return NaN;
          }
          const scalingFactor = this.drawingArea / (this.max - this.min);
          if (this.options.reverse) {
            return (this.max - value) * scalingFactor;
          }
          return (value - this.min) * scalingFactor;
        }
        getValueForDistanceFromCenter(distance) {
          if (isNullOrUndef(distance)) {
            return NaN;
          }
          const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
          return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
        }
        getPointLabelContext(index) {
          const pointLabels = this._pointLabels || [];
          if (index >= 0 && index < pointLabels.length) {
            const pointLabel = pointLabels[index];
            return createPointLabelContext(this.getContext(), index, pointLabel);
          }
        }
        getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
          const angle = this.getIndexAngle(index) - HALF_PI + additionalAngle;
          return {
            x: Math.cos(angle) * distanceFromCenter + this.xCenter,
            y: Math.sin(angle) * distanceFromCenter + this.yCenter,
            angle
          };
        }
        getPointPositionForValue(index, value) {
          return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
        }
        getBasePosition(index) {
          return this.getPointPositionForValue(index || 0, this.getBaseValue());
        }
        getPointLabelPosition(index) {
          const { left, top, right, bottom } = this._pointLabelItems[index];
          return {
            left,
            top,
            right,
            bottom
          };
        }
        drawBackground() {
          const { backgroundColor, grid: { circular } } = this.options;
          if (backgroundColor) {
            const ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
            ctx.closePath();
            ctx.fillStyle = backgroundColor;
            ctx.fill();
            ctx.restore();
          }
        }
        drawGrid() {
          const ctx = this.ctx;
          const opts = this.options;
          const { angleLines, grid } = opts;
          const labelCount = this._pointLabels.length;
          let i2, offset, position;
          if (opts.pointLabels.display) {
            drawPointLabels(this, labelCount);
          }
          if (grid.display) {
            this.ticks.forEach((tick, index) => {
              if (index !== 0) {
                offset = this.getDistanceFromCenterForValue(tick.value);
                const optsAtIndex = grid.setContext(this.getContext(index - 1));
                drawRadiusLine(this, optsAtIndex, offset, labelCount);
              }
            });
          }
          if (angleLines.display) {
            ctx.save();
            for (i2 = labelCount - 1; i2 >= 0; i2--) {
              const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i2));
              const { color: color2, lineWidth } = optsAtIndex;
              if (!lineWidth || !color2) {
                continue;
              }
              ctx.lineWidth = lineWidth;
              ctx.strokeStyle = color2;
              ctx.setLineDash(optsAtIndex.borderDash);
              ctx.lineDashOffset = optsAtIndex.borderDashOffset;
              offset = this.getDistanceFromCenterForValue(opts.ticks.reverse ? this.min : this.max);
              position = this.getPointPosition(i2, offset);
              ctx.beginPath();
              ctx.moveTo(this.xCenter, this.yCenter);
              ctx.lineTo(position.x, position.y);
              ctx.stroke();
            }
            ctx.restore();
          }
        }
        drawBorder() {
        }
        drawLabels() {
          const ctx = this.ctx;
          const opts = this.options;
          const tickOpts = opts.ticks;
          if (!tickOpts.display) {
            return;
          }
          const startAngle = this.getIndexAngle(0);
          let offset, width;
          ctx.save();
          ctx.translate(this.xCenter, this.yCenter);
          ctx.rotate(startAngle);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          this.ticks.forEach((tick, index) => {
            if (index === 0 && !opts.reverse) {
              return;
            }
            const optsAtIndex = tickOpts.setContext(this.getContext(index));
            const tickFont = toFont(optsAtIndex.font);
            offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
            if (optsAtIndex.showLabelBackdrop) {
              ctx.font = tickFont.string;
              width = ctx.measureText(tick.label).width;
              ctx.fillStyle = optsAtIndex.backdropColor;
              const padding = toPadding(optsAtIndex.backdropPadding);
              ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
            }
            renderText(ctx, tick.label, 0, -offset, tickFont, {
              color: optsAtIndex.color
            });
          });
          ctx.restore();
        }
        drawTitle() {
        }
      }
      RadialLinearScale.id = "radialLinear";
      RadialLinearScale.defaults = {
        display: true,
        animate: true,
        position: "chartArea",
        angleLines: {
          display: true,
          lineWidth: 1,
          borderDash: [],
          borderDashOffset: 0
        },
        grid: {
          circular: false
        },
        startAngle: 0,
        ticks: {
          showLabelBackdrop: true,
          callback: Ticks.formatters.numeric
        },
        pointLabels: {
          backdropColor: void 0,
          backdropPadding: 2,
          display: true,
          font: {
            size: 10
          },
          callback(label) {
            return label;
          },
          padding: 5,
          centerPointLabels: false
        }
      };
      RadialLinearScale.defaultRoutes = {
        "angleLines.color": "borderColor",
        "pointLabels.color": "color",
        "ticks.color": "color"
      };
      RadialLinearScale.descriptors = {
        angleLines: {
          _fallback: "grid"
        }
      };
      const INTERVALS = {
        millisecond: { common: true, size: 1, steps: 1e3 },
        second: { common: true, size: 1e3, steps: 60 },
        minute: { common: true, size: 6e4, steps: 60 },
        hour: { common: true, size: 36e5, steps: 24 },
        day: { common: true, size: 864e5, steps: 30 },
        week: { common: false, size: 6048e5, steps: 4 },
        month: { common: true, size: 2628e6, steps: 12 },
        quarter: { common: false, size: 7884e6, steps: 4 },
        year: { common: true, size: 3154e7 }
      };
      const UNITS = Object.keys(INTERVALS);
      function sorter(a, b) {
        return a - b;
      }
      function parse2(scale, input) {
        if (isNullOrUndef(input)) {
          return null;
        }
        const adapter = scale._adapter;
        const { parser, round: round2, isoWeekday } = scale._parseOpts;
        let value = input;
        if (typeof parser === "function") {
          value = parser(value);
        }
        if (!isNumberFinite(value)) {
          value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
        }
        if (value === null) {
          return null;
        }
        if (round2) {
          value = round2 === "week" && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round2);
        }
        return +value;
      }
      function determineUnitForAutoTicks(minUnit, min, max, capacity) {
        const ilen = UNITS.length;
        for (let i2 = UNITS.indexOf(minUnit); i2 < ilen - 1; ++i2) {
          const interval = INTERVALS[UNITS[i2]];
          const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
          if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
            return UNITS[i2];
          }
        }
        return UNITS[ilen - 1];
      }
      function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
        for (let i2 = UNITS.length - 1; i2 >= UNITS.indexOf(minUnit); i2--) {
          const unit = UNITS[i2];
          if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
            return unit;
          }
        }
        return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
      }
      function determineMajorUnit(unit) {
        for (let i2 = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i2 < ilen; ++i2) {
          if (INTERVALS[UNITS[i2]].common) {
            return UNITS[i2];
          }
        }
      }
      function addTick(ticks, time, timestamps) {
        if (!timestamps) {
          ticks[time] = true;
        } else if (timestamps.length) {
          const { lo, hi } = _lookup(timestamps, time);
          const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
          ticks[timestamp] = true;
        }
      }
      function setMajorTicks(scale, ticks, map2, majorUnit) {
        const adapter = scale._adapter;
        const first = +adapter.startOf(ticks[0].value, majorUnit);
        const last = ticks[ticks.length - 1].value;
        let major, index;
        for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
          index = map2[major];
          if (index >= 0) {
            ticks[index].major = true;
          }
        }
        return ticks;
      }
      function ticksFromTimestamps(scale, values, majorUnit) {
        const ticks = [];
        const map2 = {};
        const ilen = values.length;
        let i2, value;
        for (i2 = 0; i2 < ilen; ++i2) {
          value = values[i2];
          map2[value] = i2;
          ticks.push({
            value,
            major: false
          });
        }
        return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map2, majorUnit);
      }
      class TimeScale extends Scale {
        constructor(props) {
          super(props);
          this._cache = {
            data: [],
            labels: [],
            all: []
          };
          this._unit = "day";
          this._majorUnit = void 0;
          this._offsets = {};
          this._normalized = false;
          this._parseOpts = void 0;
        }
        init(scaleOpts, opts) {
          const time = scaleOpts.time || (scaleOpts.time = {});
          const adapter = this._adapter = new _adapters._date(scaleOpts.adapters.date);
          mergeIf(time.displayFormats, adapter.formats());
          this._parseOpts = {
            parser: time.parser,
            round: time.round,
            isoWeekday: time.isoWeekday
          };
          super.init(scaleOpts);
          this._normalized = opts.normalized;
        }
        parse(raw, index) {
          if (raw === void 0) {
            return null;
          }
          return parse2(this, raw);
        }
        beforeLayout() {
          super.beforeLayout();
          this._cache = {
            data: [],
            labels: [],
            all: []
          };
        }
        determineDataLimits() {
          const options = this.options;
          const adapter = this._adapter;
          const unit = options.time.unit || "day";
          let { min, max, minDefined, maxDefined } = this.getUserBounds();
          function _applyBounds(bounds) {
            if (!minDefined && !isNaN(bounds.min)) {
              min = Math.min(min, bounds.min);
            }
            if (!maxDefined && !isNaN(bounds.max)) {
              max = Math.max(max, bounds.max);
            }
          }
          if (!minDefined || !maxDefined) {
            _applyBounds(this._getLabelBounds());
            if (options.bounds !== "ticks" || options.ticks.source !== "labels") {
              _applyBounds(this.getMinMax(false));
            }
          }
          min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
          max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
          this.min = Math.min(min, max - 1);
          this.max = Math.max(min + 1, max);
        }
        _getLabelBounds() {
          const arr = this.getLabelTimestamps();
          let min = Number.POSITIVE_INFINITY;
          let max = Number.NEGATIVE_INFINITY;
          if (arr.length) {
            min = arr[0];
            max = arr[arr.length - 1];
          }
          return { min, max };
        }
        buildTicks() {
          const options = this.options;
          const timeOpts = options.time;
          const tickOpts = options.ticks;
          const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
          if (options.bounds === "ticks" && timestamps.length) {
            this.min = this._userMin || timestamps[0];
            this.max = this._userMax || timestamps[timestamps.length - 1];
          }
          const min = this.min;
          const max = this.max;
          const ticks = _filterBetween(timestamps, min, max);
          this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
          this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
          this.initOffsets(timestamps);
          if (options.reverse) {
            ticks.reverse();
          }
          return ticksFromTimestamps(this, ticks, this._majorUnit);
        }
        initOffsets(timestamps) {
          let start = 0;
          let end = 0;
          let first, last;
          if (this.options.offset && timestamps.length) {
            first = this.getDecimalForValue(timestamps[0]);
            if (timestamps.length === 1) {
              start = 1 - first;
            } else {
              start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
            }
            last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
            if (timestamps.length === 1) {
              end = last;
            } else {
              end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
            }
          }
          const limit = timestamps.length < 3 ? 0.5 : 0.25;
          start = _limitValue(start, 0, limit);
          end = _limitValue(end, 0, limit);
          this._offsets = { start, end, factor: 1 / (start + 1 + end) };
        }
        _generate() {
          const adapter = this._adapter;
          const min = this.min;
          const max = this.max;
          const options = this.options;
          const timeOpts = options.time;
          const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
          const stepSize = valueOrDefault(timeOpts.stepSize, 1);
          const weekday = minor === "week" ? timeOpts.isoWeekday : false;
          const hasWeekday = isNumber(weekday) || weekday === true;
          const ticks = {};
          let first = min;
          let time, count;
          if (hasWeekday) {
            first = +adapter.startOf(first, "isoWeek", weekday);
          }
          first = +adapter.startOf(first, hasWeekday ? "day" : minor);
          if (adapter.diff(max, min, minor) > 1e5 * stepSize) {
            throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
          }
          const timestamps = options.ticks.source === "data" && this.getDataTimestamps();
          for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++) {
            addTick(ticks, time, timestamps);
          }
          if (time === max || options.bounds === "ticks" || count === 1) {
            addTick(ticks, time, timestamps);
          }
          return Object.keys(ticks).sort((a, b) => a - b).map((x2) => +x2);
        }
        getLabelForValue(value) {
          const adapter = this._adapter;
          const timeOpts = this.options.time;
          if (timeOpts.tooltipFormat) {
            return adapter.format(value, timeOpts.tooltipFormat);
          }
          return adapter.format(value, timeOpts.displayFormats.datetime);
        }
        _tickFormatFunction(time, index, ticks, format2) {
          const options = this.options;
          const formats = options.time.displayFormats;
          const unit = this._unit;
          const majorUnit = this._majorUnit;
          const minorFormat = unit && formats[unit];
          const majorFormat = majorUnit && formats[majorUnit];
          const tick = ticks[index];
          const major = majorUnit && majorFormat && tick && tick.major;
          const label = this._adapter.format(time, format2 || (major ? majorFormat : minorFormat));
          const formatter = options.ticks.callback;
          return formatter ? callback(formatter, [label, index, ticks], this) : label;
        }
        generateTickLabels(ticks) {
          let i2, ilen, tick;
          for (i2 = 0, ilen = ticks.length; i2 < ilen; ++i2) {
            tick = ticks[i2];
            tick.label = this._tickFormatFunction(tick.value, i2, ticks);
          }
        }
        getDecimalForValue(value) {
          return value === null ? NaN : (value - this.min) / (this.max - this.min);
        }
        getPixelForValue(value) {
          const offsets = this._offsets;
          const pos = this.getDecimalForValue(value);
          return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
        }
        getValueForPixel(pixel) {
          const offsets = this._offsets;
          const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
          return this.min + pos * (this.max - this.min);
        }
        _getLabelSize(label) {
          const ticksOpts = this.options.ticks;
          const tickLabelWidth = this.ctx.measureText(label).width;
          const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
          const cosRotation = Math.cos(angle);
          const sinRotation = Math.sin(angle);
          const tickFontSize = this._resolveTickFontOptions(0).size;
          return {
            w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
            h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
          };
        }
        _getLabelCapacity(exampleTime) {
          const timeOpts = this.options.time;
          const displayFormats = timeOpts.displayFormats;
          const format2 = displayFormats[timeOpts.unit] || displayFormats.millisecond;
          const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [exampleTime], this._majorUnit), format2);
          const size = this._getLabelSize(exampleLabel);
          const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
          return capacity > 0 ? capacity : 1;
        }
        getDataTimestamps() {
          let timestamps = this._cache.data || [];
          let i2, ilen;
          if (timestamps.length) {
            return timestamps;
          }
          const metas = this.getMatchingVisibleMetas();
          if (this._normalized && metas.length) {
            return this._cache.data = metas[0].controller.getAllParsedValues(this);
          }
          for (i2 = 0, ilen = metas.length; i2 < ilen; ++i2) {
            timestamps = timestamps.concat(metas[i2].controller.getAllParsedValues(this));
          }
          return this._cache.data = this.normalize(timestamps);
        }
        getLabelTimestamps() {
          const timestamps = this._cache.labels || [];
          let i2, ilen;
          if (timestamps.length) {
            return timestamps;
          }
          const labels = this.getLabels();
          for (i2 = 0, ilen = labels.length; i2 < ilen; ++i2) {
            timestamps.push(parse2(this, labels[i2]));
          }
          return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
        }
        normalize(values) {
          return _arrayUnique(values.sort(sorter));
        }
      }
      TimeScale.id = "time";
      TimeScale.defaults = {
        bounds: "data",
        adapters: {},
        time: {
          parser: false,
          unit: false,
          round: false,
          isoWeekday: false,
          minUnit: "millisecond",
          displayFormats: {}
        },
        ticks: {
          source: "auto",
          major: {
            enabled: false
          }
        }
      };
      function interpolate(table, val, reverse) {
        let lo = 0;
        let hi = table.length - 1;
        let prevSource, nextSource, prevTarget, nextTarget;
        if (reverse) {
          if (val >= table[lo].pos && val <= table[hi].pos) {
            ({ lo, hi } = _lookupByKey(table, "pos", val));
          }
          ({ pos: prevSource, time: prevTarget } = table[lo]);
          ({ pos: nextSource, time: nextTarget } = table[hi]);
        } else {
          if (val >= table[lo].time && val <= table[hi].time) {
            ({ lo, hi } = _lookupByKey(table, "time", val));
          }
          ({ time: prevSource, pos: prevTarget } = table[lo]);
          ({ time: nextSource, pos: nextTarget } = table[hi]);
        }
        const span = nextSource - prevSource;
        return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
      }
      class TimeSeriesScale extends TimeScale {
        constructor(props) {
          super(props);
          this._table = [];
          this._minPos = void 0;
          this._tableRange = void 0;
        }
        initOffsets() {
          const timestamps = this._getTimestampsForTable();
          const table = this._table = this.buildLookupTable(timestamps);
          this._minPos = interpolate(table, this.min);
          this._tableRange = interpolate(table, this.max) - this._minPos;
          super.initOffsets(timestamps);
        }
        buildLookupTable(timestamps) {
          const { min, max } = this;
          const items = [];
          const table = [];
          let i2, ilen, prev, curr, next;
          for (i2 = 0, ilen = timestamps.length; i2 < ilen; ++i2) {
            curr = timestamps[i2];
            if (curr >= min && curr <= max) {
              items.push(curr);
            }
          }
          if (items.length < 2) {
            return [
              { time: min, pos: 0 },
              { time: max, pos: 1 }
            ];
          }
          for (i2 = 0, ilen = items.length; i2 < ilen; ++i2) {
            next = items[i2 + 1];
            prev = items[i2 - 1];
            curr = items[i2];
            if (Math.round((next + prev) / 2) !== curr) {
              table.push({ time: curr, pos: i2 / (ilen - 1) });
            }
          }
          return table;
        }
        _getTimestampsForTable() {
          let timestamps = this._cache.all || [];
          if (timestamps.length) {
            return timestamps;
          }
          const data = this.getDataTimestamps();
          const label = this.getLabelTimestamps();
          if (data.length && label.length) {
            timestamps = this.normalize(data.concat(label));
          } else {
            timestamps = data.length ? data : label;
          }
          timestamps = this._cache.all = timestamps;
          return timestamps;
        }
        getDecimalForValue(value) {
          return (interpolate(this._table, value) - this._minPos) / this._tableRange;
        }
        getValueForPixel(pixel) {
          const offsets = this._offsets;
          const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
          return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
        }
      }
      TimeSeriesScale.id = "timeseries";
      TimeSeriesScale.defaults = TimeScale.defaults;
      var scales = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale
      });
      Chart.register(controllers, scales, elements, plugins);
      Chart.helpers = __spreadValues({}, helpers);
      Chart._adapters = _adapters;
      Chart.Animation = Animation;
      Chart.Animations = Animations;
      Chart.animator = animator;
      Chart.controllers = registry.controllers.items;
      Chart.DatasetController = DatasetController;
      Chart.Element = Element;
      Chart.elements = elements;
      Chart.Interaction = Interaction;
      Chart.layouts = layouts;
      Chart.platforms = platforms;
      Chart.Scale = Scale;
      Chart.Ticks = Ticks;
      Object.assign(Chart, controllers, scales, elements, plugins, platforms);
      Chart.Chart = Chart;
      if (typeof window !== "undefined") {
        window.Chart = Chart;
      }
      return Chart;
    });
  }
});

// node_modules/chart.js/auto/auto.js
var require_auto = __commonJS({
  "node_modules/chart.js/auto/auto.js"(exports, module) {
    module.exports = require_chart();
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes,
  load: () => load2
});
async function load2({ fetch: fetch3 }) {
  const response = await fetch3("/api");
  return {
    status: response.status,
    props: {
      simpleMetrics: response.ok && await response.json()
    }
  };
}
var import_auto, ArticleDistribution, CommentDistribution, Charts, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_2835083a();
    import_auto = __toESM(require_auto(), 1);
    ArticleDistribution = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let chartCanvas;
      return `<div class="${"flex-1 p-3 min-w-[300px] min-h-[300px]"}"><canvas aria-label="${"chart"}"${add_attribute("this", chartCanvas, 0)}></canvas></div>`;
    });
    CommentDistribution = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let chartCanvas;
      return `<div class="${"flex-1 p-3 min-w-[300px] min-h-[300px]"}"><canvas aria-label="${"chart"}"${add_attribute("this", chartCanvas, 0)}></canvas></div>`;
    });
    Charts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="${"flex max-w-screen-lg flex-wrap"}">${validate_component(ArticleDistribution, "ArticleDistribution").$$render($$result, {}, {}, {})}
  ${validate_component(CommentDistribution, "CommentDistribution").$$render($$result, {}, {}, {})}</div>`;
    });
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { simpleMetrics } = $$props;
      if ($$props.simpleMetrics === void 0 && $$bindings.simpleMetrics && simpleMetrics !== void 0)
        $$bindings.simpleMetrics(simpleMetrics);
      return `<div class="${"max-w-screen-lg mx-auto p-2"}"><div class="${"flex justify-between text-center w-full py-3"}"><div class="${"flex-1 py-2"}"><div class="${"text-xl font-semibold"}">${escape(simpleMetrics.articleCount)}</div>
      <div class="${"text-neutral-500 text-sm"}">Artikel</div></div>
    <div class="${"flex-1 py-2 border-x border-neutral-600"}"><div class="${"text-xl font-semibold"}">${escape(simpleMetrics.commentCount)}</div>
      <div class="${"text-neutral-500 text-sm"}">Kommentare</div></div>
    <div class="${"flex-1 py-2"}"><div class="${"text-xl font-semibold"}">${escape(simpleMetrics.commentsPerArticle.toFixed(2))}</div>
      <div class="${"text-neutral-500 text-sm"}">Kommentare pro Artikel</div></div></div>
  ${validate_component(Charts, "Charts").$$render($$result, {}, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css3,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-c78d2310.js";
    js3 = ["pages/index.svelte-c78d2310.js", "chunks/index-ed1dd974.js"];
    css3 = [];
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    var fs = __require("fs");
    var path = __require("path");
    var os = __require("os");
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse2(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key2 = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key2] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key2) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key2)) {
            process.env[key2] = parsed[key2];
          } else {
            if (override === true) {
              process.env[key2] = parsed[key2];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key2}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key2}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e2) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e2.message}`);
        }
        return { error: e2 };
      }
    }
    var DotenvModule = {
      config,
      parse: parse2
    };
    module.exports.config = DotenvModule.config;
    module.exports.parse = DotenvModule.parse;
    module.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module) {
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    module.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module) {
    var re = /^dotenv_config_(encoding|path|debug|override)=(.+)$/;
    module.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// node_modules/dotenv/config.js
var init_config = __esm({
  "node_modules/dotenv/config.js"() {
    (function() {
      require_main().config(Object.assign({}, require_env_options(), require_cli_options()(process.argv)));
    })();
  }
});

// node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "node_modules/postgres-array/index.js"(exports) {
    "use strict";
    exports.parse = function(source, transform) {
      return new ArrayParser(source, transform).parse();
    };
    var ArrayParser = class {
      constructor(source, transform) {
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
      }
      isEof() {
        return this.position >= this.source.length;
      }
      nextCharacter() {
        var character = this.source[this.position++];
        if (character === "\\") {
          return {
            value: this.source[this.position++],
            escaped: true
          };
        }
        return {
          value: character,
          escaped: false
        };
      }
      record(character) {
        this.recorded.push(character);
      }
      newEntry(includeEmpty) {
        var entry4;
        if (this.recorded.length > 0 || includeEmpty) {
          entry4 = this.recorded.join("");
          if (entry4 === "NULL" && !includeEmpty) {
            entry4 = null;
          }
          if (entry4 !== null)
            entry4 = this.transform(entry4);
          this.entries.push(entry4);
          this.recorded = [];
        }
      }
      consumeDimensions() {
        if (this.source[0] === "[") {
          while (!this.isEof()) {
            var char = this.nextCharacter();
            if (char.value === "=")
              break;
          }
        }
      }
      parse(nested) {
        var character, parser, quote;
        this.consumeDimensions();
        while (!this.isEof()) {
          character = this.nextCharacter();
          if (character.value === "{" && !quote) {
            this.dimension++;
            if (this.dimension > 1) {
              parser = new ArrayParser(this.source.substr(this.position - 1), this.transform);
              this.entries.push(parser.parse(true));
              this.position += parser.position - 2;
            }
          } else if (character.value === "}" && !quote) {
            this.dimension--;
            if (!this.dimension) {
              this.newEntry();
              if (nested)
                return this.entries;
            }
          } else if (character.value === '"' && !character.escaped) {
            if (quote)
              this.newEntry(true);
            quote = !quote;
          } else if (character.value === "," && !quote) {
            this.newEntry();
          } else {
            this.record(character.value);
          }
        }
        if (this.dimension !== 0) {
          throw new Error("array dimension not balanced");
        }
        return this.entries;
      }
    };
    function identity(value) {
      return value;
    }
  }
});

// node_modules/pg-types/lib/arrayParser.js
var require_arrayParser = __commonJS({
  "node_modules/pg-types/lib/arrayParser.js"(exports, module) {
    var array = require_postgres_array();
    module.exports = {
      create: function(source, transform) {
        return {
          parse: function() {
            return array.parse(source, transform);
          }
        };
      }
    };
  }
});

// node_modules/postgres-date/index.js
var require_postgres_date = __commonJS({
  "node_modules/postgres-date/index.js"(exports, module) {
    "use strict";
    var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
    var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
    var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
    var INFINITY = /^-?infinity$/;
    module.exports = function parseDate(isoDate) {
      if (INFINITY.test(isoDate)) {
        return Number(isoDate.replace("i", "I"));
      }
      var matches = DATE_TIME.exec(isoDate);
      if (!matches) {
        return getDate(isoDate) || null;
      }
      var isBC = !!matches[8];
      var year = parseInt(matches[1], 10);
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var hour = parseInt(matches[4], 10);
      var minute = parseInt(matches[5], 10);
      var second = parseInt(matches[6], 10);
      var ms = matches[7];
      ms = ms ? 1e3 * parseFloat(ms) : 0;
      var date;
      var offset = timeZoneOffset(isoDate);
      if (offset != null) {
        date = new Date(Date.UTC(year, month, day, hour, minute, second, ms));
        if (is0To99(year)) {
          date.setUTCFullYear(year);
        }
        if (offset !== 0) {
          date.setTime(date.getTime() - offset);
        }
      } else {
        date = new Date(year, month, day, hour, minute, second, ms);
        if (is0To99(year)) {
          date.setFullYear(year);
        }
      }
      return date;
    };
    function getDate(isoDate) {
      var matches = DATE.exec(isoDate);
      if (!matches) {
        return;
      }
      var year = parseInt(matches[1], 10);
      var isBC = !!matches[4];
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var date = new Date(year, month, day);
      if (is0To99(year)) {
        date.setFullYear(year);
      }
      return date;
    }
    function timeZoneOffset(isoDate) {
      if (isoDate.endsWith("+00")) {
        return 0;
      }
      var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
      if (!zone)
        return;
      var type = zone[1];
      if (type === "Z") {
        return 0;
      }
      var sign = type === "-" ? -1 : 1;
      var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
      return offset * sign * 1e3;
    }
    function bcYearToNegativeYear(year) {
      return -(year - 1);
    }
    function is0To99(num) {
      return num >= 0 && num < 100;
    }
  }
});

// node_modules/xtend/mutable.js
var require_mutable = __commonJS({
  "node_modules/xtend/mutable.js"(exports, module) {
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key2 in source) {
          if (hasOwnProperty.call(source, key2)) {
            target[key2] = source[key2];
          }
        }
      }
      return target;
    }
  }
});

// node_modules/postgres-interval/index.js
var require_postgres_interval = __commonJS({
  "node_modules/postgres-interval/index.js"(exports, module) {
    "use strict";
    var extend = require_mutable();
    module.exports = PostgresInterval;
    function PostgresInterval(raw) {
      if (!(this instanceof PostgresInterval)) {
        return new PostgresInterval(raw);
      }
      extend(this, parse2(raw));
    }
    var properties = ["seconds", "minutes", "hours", "days", "months", "years"];
    PostgresInterval.prototype.toPostgres = function() {
      var filtered = properties.filter(this.hasOwnProperty, this);
      if (this.milliseconds && filtered.indexOf("seconds") < 0) {
        filtered.push("seconds");
      }
      if (filtered.length === 0)
        return "0";
      return filtered.map(function(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "");
        }
        return value + " " + property;
      }, this).join(" ");
    };
    var propertiesISOEquivalent = {
      years: "Y",
      months: "M",
      days: "D",
      hours: "H",
      minutes: "M",
      seconds: "S"
    };
    var dateProperties = ["years", "months", "days"];
    var timeProperties = ["hours", "minutes", "seconds"];
    PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
      var datePart = dateProperties.map(buildProperty, this).join("");
      var timePart = timeProperties.map(buildProperty, this).join("");
      return "P" + datePart + "T" + timePart;
      function buildProperty(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "");
        }
        return value + propertiesISOEquivalent[property];
      }
    };
    var NUMBER = "([+-]?\\d+)";
    var YEAR = NUMBER + "\\s+years?";
    var MONTH = NUMBER + "\\s+mons?";
    var DAY = NUMBER + "\\s+days?";
    var TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?";
    var INTERVAL = new RegExp([YEAR, MONTH, DAY, TIME].map(function(regexString) {
      return "(" + regexString + ")?";
    }).join("\\s*"));
    var positions = {
      years: 2,
      months: 4,
      days: 6,
      hours: 9,
      minutes: 10,
      seconds: 11,
      milliseconds: 12
    };
    var negatives = ["hours", "minutes", "seconds", "milliseconds"];
    function parseMilliseconds(fraction) {
      var microseconds = fraction + "000000".slice(fraction.length);
      return parseInt(microseconds, 10) / 1e3;
    }
    function parse2(interval) {
      if (!interval)
        return {};
      var matches = INTERVAL.exec(interval);
      var isNegative = matches[8] === "-";
      return Object.keys(positions).reduce(function(parsed, property) {
        var position = positions[property];
        var value = matches[position];
        if (!value)
          return parsed;
        value = property === "milliseconds" ? parseMilliseconds(value) : parseInt(value, 10);
        if (!value)
          return parsed;
        if (isNegative && ~negatives.indexOf(property)) {
          value *= -1;
        }
        parsed[property] = value;
        return parsed;
      }, {});
    }
  }
});

// node_modules/postgres-bytea/index.js
var require_postgres_bytea = __commonJS({
  "node_modules/postgres-bytea/index.js"(exports, module) {
    "use strict";
    module.exports = function parseBytea(input) {
      if (/^\\x/.test(input)) {
        return new Buffer(input.substr(2), "hex");
      }
      var output = "";
      var i2 = 0;
      while (i2 < input.length) {
        if (input[i2] !== "\\") {
          output += input[i2];
          ++i2;
        } else {
          if (/[0-7]{3}/.test(input.substr(i2 + 1, 3))) {
            output += String.fromCharCode(parseInt(input.substr(i2 + 1, 3), 8));
            i2 += 4;
          } else {
            var backslashes = 1;
            while (i2 + backslashes < input.length && input[i2 + backslashes] === "\\") {
              backslashes++;
            }
            for (var k = 0; k < Math.floor(backslashes / 2); ++k) {
              output += "\\";
            }
            i2 += Math.floor(backslashes / 2) * 2;
          }
        }
      }
      return new Buffer(output, "binary");
    };
  }
});

// node_modules/pg-types/lib/textParsers.js
var require_textParsers = __commonJS({
  "node_modules/pg-types/lib/textParsers.js"(exports, module) {
    var array = require_postgres_array();
    var arrayParser = require_arrayParser();
    var parseDate = require_postgres_date();
    var parseInterval = require_postgres_interval();
    var parseByteA = require_postgres_bytea();
    function allowNull(fn) {
      return function nullAllowed(value) {
        if (value === null)
          return value;
        return fn(value);
      };
    }
    function parseBool(value) {
      if (value === null)
        return value;
      return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
    }
    function parseBoolArray(value) {
      if (!value)
        return null;
      return array.parse(value, parseBool);
    }
    function parseBaseTenInt(string) {
      return parseInt(string, 10);
    }
    function parseIntegerArray(value) {
      if (!value)
        return null;
      return array.parse(value, allowNull(parseBaseTenInt));
    }
    function parseBigIntegerArray(value) {
      if (!value)
        return null;
      return array.parse(value, allowNull(function(entry4) {
        return parseBigInteger(entry4).trim();
      }));
    }
    var parsePointArray = function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry4) {
        if (entry4 !== null) {
          entry4 = parsePoint(entry4);
        }
        return entry4;
      });
      return p.parse();
    };
    var parseFloatArray = function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry4) {
        if (entry4 !== null) {
          entry4 = parseFloat(entry4);
        }
        return entry4;
      });
      return p.parse();
    };
    var parseStringArray = function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value);
      return p.parse();
    };
    var parseDateArray = function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry4) {
        if (entry4 !== null) {
          entry4 = parseDate(entry4);
        }
        return entry4;
      });
      return p.parse();
    };
    var parseIntervalArray = function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry4) {
        if (entry4 !== null) {
          entry4 = parseInterval(entry4);
        }
        return entry4;
      });
      return p.parse();
    };
    var parseByteAArray = function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(parseByteA));
    };
    var parseInteger = function(value) {
      return parseInt(value, 10);
    };
    var parseBigInteger = function(value) {
      var valStr = String(value);
      if (/^\d+$/.test(valStr)) {
        return valStr;
      }
      return value;
    };
    var parseJsonArray = function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(JSON.parse));
    };
    var parsePoint = function(value) {
      if (value[0] !== "(") {
        return null;
      }
      value = value.substring(1, value.length - 1).split(",");
      return {
        x: parseFloat(value[0]),
        y: parseFloat(value[1])
      };
    };
    var parseCircle = function(value) {
      if (value[0] !== "<" && value[1] !== "(") {
        return null;
      }
      var point = "(";
      var radius = "";
      var pointParsed = false;
      for (var i2 = 2; i2 < value.length - 1; i2++) {
        if (!pointParsed) {
          point += value[i2];
        }
        if (value[i2] === ")") {
          pointParsed = true;
          continue;
        } else if (!pointParsed) {
          continue;
        }
        if (value[i2] === ",") {
          continue;
        }
        radius += value[i2];
      }
      var result = parsePoint(point);
      result.radius = parseFloat(radius);
      return result;
    };
    var init2 = function(register) {
      register(20, parseBigInteger);
      register(21, parseInteger);
      register(23, parseInteger);
      register(26, parseInteger);
      register(700, parseFloat);
      register(701, parseFloat);
      register(16, parseBool);
      register(1082, parseDate);
      register(1114, parseDate);
      register(1184, parseDate);
      register(600, parsePoint);
      register(651, parseStringArray);
      register(718, parseCircle);
      register(1e3, parseBoolArray);
      register(1001, parseByteAArray);
      register(1005, parseIntegerArray);
      register(1007, parseIntegerArray);
      register(1028, parseIntegerArray);
      register(1016, parseBigIntegerArray);
      register(1017, parsePointArray);
      register(1021, parseFloatArray);
      register(1022, parseFloatArray);
      register(1231, parseFloatArray);
      register(1014, parseStringArray);
      register(1015, parseStringArray);
      register(1008, parseStringArray);
      register(1009, parseStringArray);
      register(1040, parseStringArray);
      register(1041, parseStringArray);
      register(1115, parseDateArray);
      register(1182, parseDateArray);
      register(1185, parseDateArray);
      register(1186, parseInterval);
      register(1187, parseIntervalArray);
      register(17, parseByteA);
      register(114, JSON.parse.bind(JSON));
      register(3802, JSON.parse.bind(JSON));
      register(199, parseJsonArray);
      register(3807, parseJsonArray);
      register(3907, parseStringArray);
      register(2951, parseStringArray);
      register(791, parseStringArray);
      register(1183, parseStringArray);
      register(1270, parseStringArray);
    };
    module.exports = {
      init: init2
    };
  }
});

// node_modules/pg-int8/index.js
var require_pg_int8 = __commonJS({
  "node_modules/pg-int8/index.js"(exports, module) {
    "use strict";
    var BASE = 1e6;
    function readInt8(buffer) {
      var high = buffer.readInt32BE(0);
      var low = buffer.readUInt32BE(4);
      var sign = "";
      if (high < 0) {
        high = ~high + (low === 0);
        low = ~low + 1 >>> 0;
        sign = "-";
      }
      var result = "";
      var carry;
      var t2;
      var digits;
      var pad;
      var l;
      var i2;
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t2 = 4294967296 * carry + low;
        low = t2 / BASE >>> 0;
        digits = "" + (t2 - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i2 = 0; i2 < l; i2++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t2 = 4294967296 * carry + low;
        low = t2 / BASE >>> 0;
        digits = "" + (t2 - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i2 = 0; i2 < l; i2++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t2 = 4294967296 * carry + low;
        low = t2 / BASE >>> 0;
        digits = "" + (t2 - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i2 = 0; i2 < l; i2++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        t2 = 4294967296 * carry + low;
        digits = "" + t2 % BASE;
        return sign + digits + result;
      }
    }
    module.exports = readInt8;
  }
});

// node_modules/pg-types/lib/binaryParsers.js
var require_binaryParsers = __commonJS({
  "node_modules/pg-types/lib/binaryParsers.js"(exports, module) {
    var parseInt64 = require_pg_int8();
    var parseBits = function(data, bits, offset, invert, callback) {
      offset = offset || 0;
      invert = invert || false;
      callback = callback || function(lastValue, newValue, bits2) {
        return lastValue * Math.pow(2, bits2) + newValue;
      };
      var offsetBytes = offset >> 3;
      var inv = function(value) {
        if (invert) {
          return ~value & 255;
        }
        return value;
      };
      var mask = 255;
      var firstBits = 8 - offset % 8;
      if (bits < firstBits) {
        mask = 255 << 8 - bits & 255;
        firstBits = bits;
      }
      if (offset) {
        mask = mask >> offset % 8;
      }
      var result = 0;
      if (offset % 8 + bits >= 8) {
        result = callback(0, inv(data[offsetBytes]) & mask, firstBits);
      }
      var bytes = bits + offset >> 3;
      for (var i2 = offsetBytes + 1; i2 < bytes; i2++) {
        result = callback(result, inv(data[i2]), 8);
      }
      var lastBits = (bits + offset) % 8;
      if (lastBits > 0) {
        result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits);
      }
      return result;
    };
    var parseFloatFromBits = function(data, precisionBits, exponentBits) {
      var bias = Math.pow(2, exponentBits - 1) - 1;
      var sign = parseBits(data, 1);
      var exponent = parseBits(data, exponentBits, 1);
      if (exponent === 0) {
        return 0;
      }
      var precisionBitsCounter = 1;
      var parsePrecisionBits = function(lastValue, newValue, bits) {
        if (lastValue === 0) {
          lastValue = 1;
        }
        for (var i2 = 1; i2 <= bits; i2++) {
          precisionBitsCounter /= 2;
          if ((newValue & 1 << bits - i2) > 0) {
            lastValue += precisionBitsCounter;
          }
        }
        return lastValue;
      };
      var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
      if (exponent == Math.pow(2, exponentBits + 1) - 1) {
        if (mantissa === 0) {
          return sign === 0 ? Infinity : -Infinity;
        }
        return NaN;
      }
      return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
    };
    var parseInt16 = function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 15, 1, true) + 1);
      }
      return parseBits(value, 15, 1);
    };
    var parseInt32 = function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 31, 1, true) + 1);
      }
      return parseBits(value, 31, 1);
    };
    var parseFloat32 = function(value) {
      return parseFloatFromBits(value, 23, 8);
    };
    var parseFloat64 = function(value) {
      return parseFloatFromBits(value, 52, 11);
    };
    var parseNumeric = function(value) {
      var sign = parseBits(value, 16, 32);
      if (sign == 49152) {
        return NaN;
      }
      var weight = Math.pow(1e4, parseBits(value, 16, 16));
      var result = 0;
      var digits = [];
      var ndigits = parseBits(value, 16);
      for (var i2 = 0; i2 < ndigits; i2++) {
        result += parseBits(value, 16, 64 + 16 * i2) * weight;
        weight /= 1e4;
      }
      var scale = Math.pow(10, parseBits(value, 16, 48));
      return (sign === 0 ? 1 : -1) * Math.round(result * scale) / scale;
    };
    var parseDate = function(isUTC, value) {
      var sign = parseBits(value, 1);
      var rawValue = parseBits(value, 63, 1);
      var result = new Date((sign === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
      if (!isUTC) {
        result.setTime(result.getTime() + result.getTimezoneOffset() * 6e4);
      }
      result.usec = rawValue % 1e3;
      result.getMicroSeconds = function() {
        return this.usec;
      };
      result.setMicroSeconds = function(value2) {
        this.usec = value2;
      };
      result.getUTCMicroSeconds = function() {
        return this.usec;
      };
      return result;
    };
    var parseArray = function(value) {
      var dim = parseBits(value, 32);
      var flags = parseBits(value, 32, 32);
      var elementType = parseBits(value, 32, 64);
      var offset = 96;
      var dims = [];
      for (var i2 = 0; i2 < dim; i2++) {
        dims[i2] = parseBits(value, 32, offset);
        offset += 32;
        offset += 32;
      }
      var parseElement = function(elementType2) {
        var length = parseBits(value, 32, offset);
        offset += 32;
        if (length == 4294967295) {
          return null;
        }
        var result;
        if (elementType2 == 23 || elementType2 == 20) {
          result = parseBits(value, length * 8, offset);
          offset += length * 8;
          return result;
        } else if (elementType2 == 25) {
          result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
          return result;
        } else {
          console.log("ERROR: ElementType not implemented: " + elementType2);
        }
      };
      var parse2 = function(dimension, elementType2) {
        var array = [];
        var i3;
        if (dimension.length > 1) {
          var count = dimension.shift();
          for (i3 = 0; i3 < count; i3++) {
            array[i3] = parse2(dimension, elementType2);
          }
          dimension.unshift(count);
        } else {
          for (i3 = 0; i3 < dimension[0]; i3++) {
            array[i3] = parseElement(elementType2);
          }
        }
        return array;
      };
      return parse2(dims, elementType);
    };
    var parseText = function(value) {
      return value.toString("utf8");
    };
    var parseBool = function(value) {
      if (value === null)
        return null;
      return parseBits(value, 8) > 0;
    };
    var init2 = function(register) {
      register(20, parseInt64);
      register(21, parseInt16);
      register(23, parseInt32);
      register(26, parseInt32);
      register(1700, parseNumeric);
      register(700, parseFloat32);
      register(701, parseFloat64);
      register(16, parseBool);
      register(1114, parseDate.bind(null, false));
      register(1184, parseDate.bind(null, true));
      register(1e3, parseArray);
      register(1007, parseArray);
      register(1016, parseArray);
      register(1008, parseArray);
      register(1009, parseArray);
      register(25, parseText);
    };
    module.exports = {
      init: init2
    };
  }
});

// node_modules/pg-types/lib/builtins.js
var require_builtins = __commonJS({
  "node_modules/pg-types/lib/builtins.js"(exports, module) {
    module.exports = {
      BOOL: 16,
      BYTEA: 17,
      CHAR: 18,
      INT8: 20,
      INT2: 21,
      INT4: 23,
      REGPROC: 24,
      TEXT: 25,
      OID: 26,
      TID: 27,
      XID: 28,
      CID: 29,
      JSON: 114,
      XML: 142,
      PG_NODE_TREE: 194,
      SMGR: 210,
      PATH: 602,
      POLYGON: 604,
      CIDR: 650,
      FLOAT4: 700,
      FLOAT8: 701,
      ABSTIME: 702,
      RELTIME: 703,
      TINTERVAL: 704,
      CIRCLE: 718,
      MACADDR8: 774,
      MONEY: 790,
      MACADDR: 829,
      INET: 869,
      ACLITEM: 1033,
      BPCHAR: 1042,
      VARCHAR: 1043,
      DATE: 1082,
      TIME: 1083,
      TIMESTAMP: 1114,
      TIMESTAMPTZ: 1184,
      INTERVAL: 1186,
      TIMETZ: 1266,
      BIT: 1560,
      VARBIT: 1562,
      NUMERIC: 1700,
      REFCURSOR: 1790,
      REGPROCEDURE: 2202,
      REGOPER: 2203,
      REGOPERATOR: 2204,
      REGCLASS: 2205,
      REGTYPE: 2206,
      UUID: 2950,
      TXID_SNAPSHOT: 2970,
      PG_LSN: 3220,
      PG_NDISTINCT: 3361,
      PG_DEPENDENCIES: 3402,
      TSVECTOR: 3614,
      TSQUERY: 3615,
      GTSVECTOR: 3642,
      REGCONFIG: 3734,
      REGDICTIONARY: 3769,
      JSONB: 3802,
      REGNAMESPACE: 4089,
      REGROLE: 4096
    };
  }
});

// node_modules/pg-types/index.js
var require_pg_types = __commonJS({
  "node_modules/pg-types/index.js"(exports) {
    var textParsers = require_textParsers();
    var binaryParsers = require_binaryParsers();
    var arrayParser = require_arrayParser();
    var builtinTypes = require_builtins();
    exports.getTypeParser = getTypeParser;
    exports.setTypeParser = setTypeParser;
    exports.arrayParser = arrayParser;
    exports.builtins = builtinTypes;
    var typeParsers = {
      text: {},
      binary: {}
    };
    function noParse(val) {
      return String(val);
    }
    function getTypeParser(oid, format2) {
      format2 = format2 || "text";
      if (!typeParsers[format2]) {
        return noParse;
      }
      return typeParsers[format2][oid] || noParse;
    }
    function setTypeParser(oid, format2, parseFn) {
      if (typeof format2 == "function") {
        parseFn = format2;
        format2 = "text";
      }
      typeParsers[format2][oid] = parseFn;
    }
    textParsers.init(function(oid, converter) {
      typeParsers.text[oid] = converter;
    });
    binaryParsers.init(function(oid, converter) {
      typeParsers.binary[oid] = converter;
    });
  }
});

// node_modules/pg/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/pg/lib/defaults.js"(exports, module) {
    "use strict";
    module.exports = {
      host: "localhost",
      user: process.platform === "win32" ? process.env.USERNAME : process.env.USER,
      database: void 0,
      password: null,
      connectionString: void 0,
      port: 5432,
      rows: 0,
      binary: false,
      max: 10,
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      statement_timeout: false,
      idle_in_transaction_session_timeout: false,
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    var pgTypes = require_pg_types();
    var parseBigInteger = pgTypes.getTypeParser(20, "text");
    var parseBigIntegerArray = pgTypes.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val) {
      pgTypes.setTypeParser(20, "text", val ? pgTypes.getTypeParser(23, "text") : parseBigInteger);
      pgTypes.setTypeParser(1016, "text", val ? pgTypes.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
  }
});

// node_modules/pg/lib/utils.js
var require_utils = __commonJS({
  "node_modules/pg/lib/utils.js"(exports, module) {
    "use strict";
    var crypto2 = __require("crypto");
    var defaults = require_defaults();
    function escapeElement(elementRepresentation) {
      var escaped3 = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return '"' + escaped3 + '"';
    }
    function arrayString(val) {
      var result = "{";
      for (var i2 = 0; i2 < val.length; i2++) {
        if (i2 > 0) {
          result = result + ",";
        }
        if (val[i2] === null || typeof val[i2] === "undefined") {
          result = result + "NULL";
        } else if (Array.isArray(val[i2])) {
          result = result + arrayString(val[i2]);
        } else if (val[i2] instanceof Buffer) {
          result += "\\\\x" + val[i2].toString("hex");
        } else {
          result += escapeElement(prepareValue(val[i2]));
        }
      }
      result = result + "}";
      return result;
    }
    var prepareValue = function(val, seen) {
      if (val == null) {
        return null;
      }
      if (val instanceof Buffer) {
        return val;
      }
      if (ArrayBuffer.isView(val)) {
        var buf = Buffer.from(val.buffer, val.byteOffset, val.byteLength);
        if (buf.length === val.byteLength) {
          return buf;
        }
        return buf.slice(val.byteOffset, val.byteOffset + val.byteLength);
      }
      if (val instanceof Date) {
        if (defaults.parseInputDatesAsUTC) {
          return dateToStringUTC(val);
        } else {
          return dateToString(val);
        }
      }
      if (Array.isArray(val)) {
        return arrayString(val);
      }
      if (typeof val === "object") {
        return prepareObject(val, seen);
      }
      return val.toString();
    };
    function prepareObject(val, seen) {
      if (val && typeof val.toPostgres === "function") {
        seen = seen || [];
        if (seen.indexOf(val) !== -1) {
          throw new Error('circular reference detected while preparing "' + val + '" for query');
        }
        seen.push(val);
        return prepareValue(val.toPostgres(prepareValue), seen);
      }
      return JSON.stringify(val);
    }
    function pad(number, digits) {
      number = "" + number;
      while (number.length < digits) {
        number = "0" + number;
      }
      return number;
    }
    function dateToString(date) {
      var offset = -date.getTimezoneOffset();
      var year = date.getFullYear();
      var isBCYear = year < 1;
      if (isBCYear)
        year = Math.abs(year) + 1;
      var ret = pad(year, 4) + "-" + pad(date.getMonth() + 1, 2) + "-" + pad(date.getDate(), 2) + "T" + pad(date.getHours(), 2) + ":" + pad(date.getMinutes(), 2) + ":" + pad(date.getSeconds(), 2) + "." + pad(date.getMilliseconds(), 3);
      if (offset < 0) {
        ret += "-";
        offset *= -1;
      } else {
        ret += "+";
      }
      ret += pad(Math.floor(offset / 60), 2) + ":" + pad(offset % 60, 2);
      if (isBCYear)
        ret += " BC";
      return ret;
    }
    function dateToStringUTC(date) {
      var year = date.getUTCFullYear();
      var isBCYear = year < 1;
      if (isBCYear)
        year = Math.abs(year) + 1;
      var ret = pad(year, 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + "T" + pad(date.getUTCHours(), 2) + ":" + pad(date.getUTCMinutes(), 2) + ":" + pad(date.getUTCSeconds(), 2) + "." + pad(date.getUTCMilliseconds(), 3);
      ret += "+00:00";
      if (isBCYear)
        ret += " BC";
      return ret;
    }
    function normalizeQueryConfig(config, values, callback) {
      config = typeof config === "string" ? { text: config } : config;
      if (values) {
        if (typeof values === "function") {
          config.callback = values;
        } else {
          config.values = values;
        }
      }
      if (callback) {
        config.callback = callback;
      }
      return config;
    }
    var md5 = function(string) {
      return crypto2.createHash("md5").update(string, "utf-8").digest("hex");
    };
    var postgresMd5PasswordHash = function(user, password, salt) {
      var inner = md5(password + user);
      var outer = md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    };
    module.exports = {
      prepareValue: function prepareValueWrapper(value) {
        return prepareValue(value);
      },
      normalizeQueryConfig,
      postgresMd5PasswordHash,
      md5
    };
  }
});

// node_modules/pg/lib/sasl.js
var require_sasl = __commonJS({
  "node_modules/pg/lib/sasl.js"(exports, module) {
    "use strict";
    var crypto2 = __require("crypto");
    function startSession(mechanisms) {
      if (mechanisms.indexOf("SCRAM-SHA-256") === -1) {
        throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
      }
      const clientNonce = crypto2.randomBytes(18).toString("base64");
      return {
        mechanism: "SCRAM-SHA-256",
        clientNonce,
        response: "n,,n=*,r=" + clientNonce,
        message: "SASLInitialResponse"
      };
    }
    function continueSession(session, password, serverData) {
      if (session.message !== "SASLInitialResponse") {
        throw new Error("SASL: Last message was not SASLInitialResponse");
      }
      if (typeof password !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
      }
      const sv = parseServerFirstMessage(serverData);
      if (!sv.nonce.startsWith(session.clientNonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
      } else if (sv.nonce.length === session.clientNonce.length) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
      }
      var saltBytes = Buffer.from(sv.salt, "base64");
      var saltedPassword = Hi(password, saltBytes, sv.iteration);
      var clientKey = hmacSha256(saltedPassword, "Client Key");
      var storedKey = sha2562(clientKey);
      var clientFirstMessageBare = "n=*,r=" + session.clientNonce;
      var serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
      var clientFinalMessageWithoutProof = "c=biws,r=" + sv.nonce;
      var authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
      var clientSignature = hmacSha256(storedKey, authMessage);
      var clientProofBytes = xorBuffers(clientKey, clientSignature);
      var clientProof = clientProofBytes.toString("base64");
      var serverKey = hmacSha256(saltedPassword, "Server Key");
      var serverSignatureBytes = hmacSha256(serverKey, authMessage);
      session.message = "SASLResponse";
      session.serverSignature = serverSignatureBytes.toString("base64");
      session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
    }
    function finalizeSession(session, serverData) {
      if (session.message !== "SASLResponse") {
        throw new Error("SASL: Last message was not SASLResponse");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
      }
      const { serverSignature } = parseServerFinalMessage(serverData);
      if (serverSignature !== session.serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      }
    }
    function isPrintableChars(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: text must be a string");
      }
      return text.split("").map((_, i2) => text.charCodeAt(i2)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
    }
    function isBase64(text) {
      return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
    }
    function parseAttributePairs(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: attribute pairs text must be a string");
      }
      return new Map(text.split(",").map((attrValue) => {
        if (!/^.=/.test(attrValue)) {
          throw new Error("SASL: Invalid attribute pair entry");
        }
        const name = attrValue[0];
        const value = attrValue.substring(2);
        return [name, value];
      }));
    }
    function parseServerFirstMessage(data) {
      const attrPairs = parseAttributePairs(data);
      const nonce = attrPairs.get("r");
      if (!nonce) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
      } else if (!isPrintableChars(nonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
      }
      const salt = attrPairs.get("s");
      if (!salt) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
      } else if (!isBase64(salt)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
      }
      const iterationText = attrPairs.get("i");
      if (!iterationText) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
      } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
      }
      const iteration = parseInt(iterationText, 10);
      return {
        nonce,
        salt,
        iteration
      };
    }
    function parseServerFinalMessage(serverData) {
      const attrPairs = parseAttributePairs(serverData);
      const serverSignature = attrPairs.get("v");
      if (!serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
      } else if (!isBase64(serverSignature)) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
      }
      return {
        serverSignature
      };
    }
    function xorBuffers(a, b) {
      if (!Buffer.isBuffer(a)) {
        throw new TypeError("first argument must be a Buffer");
      }
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("second argument must be a Buffer");
      }
      if (a.length !== b.length) {
        throw new Error("Buffer lengths must match");
      }
      if (a.length === 0) {
        throw new Error("Buffers cannot be empty");
      }
      return Buffer.from(a.map((_, i2) => a[i2] ^ b[i2]));
    }
    function sha2562(text) {
      return crypto2.createHash("sha256").update(text).digest();
    }
    function hmacSha256(key2, msg) {
      return crypto2.createHmac("sha256", key2).update(msg).digest();
    }
    function Hi(password, saltBytes, iterations) {
      var ui1 = hmacSha256(password, Buffer.concat([saltBytes, Buffer.from([0, 0, 0, 1])]));
      var ui = ui1;
      for (var i2 = 0; i2 < iterations - 1; i2++) {
        ui1 = hmacSha256(password, ui1);
        ui = xorBuffers(ui, ui1);
      }
      return ui;
    }
    module.exports = {
      startSession,
      continueSession,
      finalizeSession
    };
  }
});

// node_modules/split2/index.js
var require_split2 = __commonJS({
  "node_modules/split2/index.js"(exports, module) {
    "use strict";
    var { Transform } = __require("stream");
    var { StringDecoder } = __require("string_decoder");
    var kLast = Symbol("last");
    var kDecoder = Symbol("decoder");
    function transform(chunk, enc, cb) {
      let list;
      if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1)
          return cb();
        list.shift();
        this.overflow = false;
      } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
      }
      this[kLast] = list.pop();
      for (let i2 = 0; i2 < list.length; i2++) {
        try {
          push(this, this.mapper(list[i2]));
        } catch (error2) {
          return cb(error2);
        }
      }
      this.overflow = this[kLast].length > this.maxLength;
      if (this.overflow && !this.skipOverflow) {
        cb(new Error("maximum buffer reached"));
        return;
      }
      cb();
    }
    function flush(cb) {
      this[kLast] += this[kDecoder].end();
      if (this[kLast]) {
        try {
          push(this, this.mapper(this[kLast]));
        } catch (error2) {
          return cb(error2);
        }
      }
      cb();
    }
    function push(self2, val) {
      if (val !== void 0) {
        self2.push(val);
      }
    }
    function noop3(incoming) {
      return incoming;
    }
    function split(matcher, mapper, options) {
      matcher = matcher || /\r?\n/;
      mapper = mapper || noop3;
      options = options || {};
      switch (arguments.length) {
        case 1:
          if (typeof matcher === "function") {
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof matcher === "object" && !(matcher instanceof RegExp)) {
            options = matcher;
            matcher = /\r?\n/;
          }
          break;
        case 2:
          if (typeof matcher === "function") {
            options = mapper;
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof mapper === "object") {
            options = mapper;
            mapper = noop3;
          }
      }
      options = Object.assign({}, options);
      options.autoDestroy = true;
      options.transform = transform;
      options.flush = flush;
      options.readableObjectMode = true;
      const stream = new Transform(options);
      stream[kLast] = "";
      stream[kDecoder] = new StringDecoder("utf8");
      stream.matcher = matcher;
      stream.mapper = mapper;
      stream.maxLength = options.maxLength;
      stream.skipOverflow = options.skipOverflow || false;
      stream.overflow = false;
      stream._destroy = function(err, cb) {
        this._writableState.errorEmitted = false;
        cb(err);
      };
      return stream;
    }
    module.exports = split;
  }
});

// node_modules/pgpass/lib/helper.js
var require_helper = __commonJS({
  "node_modules/pgpass/lib/helper.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var Stream2 = __require("stream").Stream;
    var split = require_split2();
    var util = __require("util");
    var defaultPort = 5432;
    var isWin = process.platform === "win32";
    var warnStream = process.stderr;
    var S_IRWXG = 56;
    var S_IRWXO = 7;
    var S_IFMT = 61440;
    var S_IFREG = 32768;
    function isRegFile(mode) {
      return (mode & S_IFMT) == S_IFREG;
    }
    var fieldNames = ["host", "port", "database", "user", "password"];
    var nrOfFields = fieldNames.length;
    var passKey = fieldNames[nrOfFields - 1];
    function warn() {
      var isWritable = warnStream instanceof Stream2 && warnStream.writable === true;
      if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
      }
    }
    Object.defineProperty(module.exports, "isWin", {
      get: function() {
        return isWin;
      },
      set: function(val) {
        isWin = val;
      }
    });
    module.exports.warnTo = function(stream) {
      var old = warnStream;
      warnStream = stream;
      return old;
    };
    module.exports.getFileName = function(rawEnv) {
      var env = rawEnv || process.env;
      var file = env.PGPASSFILE || (isWin ? path.join(env.APPDATA || "./", "postgresql", "pgpass.conf") : path.join(env.HOME || "./", ".pgpass"));
      return file;
    };
    module.exports.usePgPass = function(stats, fname) {
      if (Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD")) {
        return false;
      }
      if (isWin) {
        return true;
      }
      fname = fname || "<unkn>";
      if (!isRegFile(stats.mode)) {
        warn('WARNING: password file "%s" is not a plain file', fname);
        return false;
      }
      if (stats.mode & (S_IRWXG | S_IRWXO)) {
        warn('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
      }
      return true;
    };
    var matcher = module.exports.match = function(connInfo, entry4) {
      return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
          if (Number(connInfo[field] || defaultPort) === Number(entry4[field])) {
            return prev && true;
          }
        }
        return prev && (entry4[field] === "*" || entry4[field] === connInfo[field]);
      }, true);
    };
    module.exports.getPassword = function(connInfo, stream, cb) {
      var pass;
      var lineStream = stream.pipe(split());
      function onLine(line) {
        var entry4 = parseLine(line);
        if (entry4 && isValidEntry(entry4) && matcher(connInfo, entry4)) {
          pass = entry4[passKey];
          lineStream.end();
        }
      }
      var onEnd = function() {
        stream.destroy();
        cb(pass);
      };
      var onErr = function(err) {
        stream.destroy();
        warn("WARNING: error on reading file: %s", err);
        cb(void 0);
      };
      stream.on("error", onErr);
      lineStream.on("data", onLine).on("end", onEnd).on("error", onErr);
    };
    var parseLine = module.exports.parseLine = function(line) {
      if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
      }
      var curChar = "";
      var prevChar = "";
      var fieldIdx = 0;
      var startIdx = 0;
      var endIdx = 0;
      var obj = {};
      var isLastField = false;
      var addToObj = function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE")) {
          field = field.replace(/\\([:\\])/g, "$1");
        }
        obj[fieldNames[idx]] = field;
      };
      for (var i2 = 0; i2 < line.length - 1; i2 += 1) {
        curChar = line.charAt(i2 + 1);
        prevChar = line.charAt(i2);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
          addToObj(fieldIdx, startIdx);
          break;
        }
        if (i2 >= 0 && curChar == ":" && prevChar !== "\\") {
          addToObj(fieldIdx, startIdx, i2 + 1);
          startIdx = i2 + 2;
          fieldIdx += 1;
        }
      }
      obj = Object.keys(obj).length === nrOfFields ? obj : null;
      return obj;
    };
    var isValidEntry = module.exports.isValidEntry = function(entry4) {
      var rules = {
        0: function(x2) {
          return x2.length > 0;
        },
        1: function(x2) {
          if (x2 === "*") {
            return true;
          }
          x2 = Number(x2);
          return isFinite(x2) && x2 > 0 && x2 < 9007199254740992 && Math.floor(x2) === x2;
        },
        2: function(x2) {
          return x2.length > 0;
        },
        3: function(x2) {
          return x2.length > 0;
        },
        4: function(x2) {
          return x2.length > 0;
        }
      };
      for (var idx = 0; idx < fieldNames.length; idx += 1) {
        var rule = rules[idx];
        var value = entry4[fieldNames[idx]] || "";
        var res = rule(value);
        if (!res) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/pgpass/lib/index.js
var require_lib = __commonJS({
  "node_modules/pgpass/lib/index.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var fs = __require("fs");
    var helper = require_helper();
    module.exports = function(connInfo, cb) {
      var file = helper.getFileName();
      fs.stat(file, function(err, stat) {
        if (err || !helper.usePgPass(stat, file)) {
          return cb(void 0);
        }
        var st = fs.createReadStream(file);
        helper.getPassword(connInfo, st, cb);
      });
    };
    module.exports.warnTo = helper.warnTo;
  }
});

// node_modules/pg/lib/type-overrides.js
var require_type_overrides = __commonJS({
  "node_modules/pg/lib/type-overrides.js"(exports, module) {
    "use strict";
    var types2 = require_pg_types();
    function TypeOverrides(userTypes) {
      this._types = userTypes || types2;
      this.text = {};
      this.binary = {};
    }
    TypeOverrides.prototype.getOverrides = function(format2) {
      switch (format2) {
        case "text":
          return this.text;
        case "binary":
          return this.binary;
        default:
          return {};
      }
    };
    TypeOverrides.prototype.setTypeParser = function(oid, format2, parseFn) {
      if (typeof format2 === "function") {
        parseFn = format2;
        format2 = "text";
      }
      this.getOverrides(format2)[oid] = parseFn;
    };
    TypeOverrides.prototype.getTypeParser = function(oid, format2) {
      format2 = format2 || "text";
      return this.getOverrides(format2)[oid] || this._types.getTypeParser(oid, format2);
    };
    module.exports = TypeOverrides;
  }
});

// node_modules/pg-connection-string/index.js
var require_pg_connection_string = __commonJS({
  "node_modules/pg-connection-string/index.js"(exports, module) {
    "use strict";
    var url = __require("url");
    var fs = __require("fs");
    function parse2(str) {
      if (str.charAt(0) === "/") {
        var config = str.split(" ");
        return { host: config[0], database: config[1] };
      }
      var result = url.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str) ? encodeURI(str).replace(/\%25(\d\d)/g, "%$1") : str, true);
      var config = result.query;
      for (var k in config) {
        if (Array.isArray(config[k])) {
          config[k] = config[k][config[k].length - 1];
        }
      }
      var auth = (result.auth || ":").split(":");
      config.user = auth[0];
      config.password = auth.splice(1).join(":");
      config.port = result.port;
      if (result.protocol == "socket:") {
        config.host = decodeURI(result.pathname);
        config.database = result.query.db;
        config.client_encoding = result.query.encoding;
        return config;
      }
      if (!config.host) {
        config.host = result.hostname;
      }
      var pathname = result.pathname;
      if (!config.host && pathname && /^%2f/i.test(pathname)) {
        var pathnameSplit = pathname.split("/");
        config.host = decodeURIComponent(pathnameSplit[0]);
        pathname = pathnameSplit.splice(1).join("/");
      }
      if (pathname && pathname.charAt(0) === "/") {
        pathname = pathname.slice(1) || null;
      }
      config.database = pathname && decodeURI(pathname);
      if (config.ssl === "true" || config.ssl === "1") {
        config.ssl = true;
      }
      if (config.ssl === "0") {
        config.ssl = false;
      }
      if (config.sslcert || config.sslkey || config.sslrootcert || config.sslmode) {
        config.ssl = {};
      }
      if (config.sslcert) {
        config.ssl.cert = fs.readFileSync(config.sslcert).toString();
      }
      if (config.sslkey) {
        config.ssl.key = fs.readFileSync(config.sslkey).toString();
      }
      if (config.sslrootcert) {
        config.ssl.ca = fs.readFileSync(config.sslrootcert).toString();
      }
      switch (config.sslmode) {
        case "disable": {
          config.ssl = false;
          break;
        }
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full": {
          break;
        }
        case "no-verify": {
          config.ssl.rejectUnauthorized = false;
          break;
        }
      }
      return config;
    }
    module.exports = parse2;
    parse2.parse = parse2;
  }
});

// node_modules/pg/lib/connection-parameters.js
var require_connection_parameters = __commonJS({
  "node_modules/pg/lib/connection-parameters.js"(exports, module) {
    "use strict";
    var dns = __require("dns");
    var defaults = require_defaults();
    var parse2 = require_pg_connection_string().parse;
    var val = function(key2, config, envVar) {
      if (envVar === void 0) {
        envVar = process.env["PG" + key2.toUpperCase()];
      } else if (envVar === false) {
      } else {
        envVar = process.env[envVar];
      }
      return config[key2] || envVar || defaults[key2];
    };
    var readSSLConfigFromEnvironment = function() {
      switch (process.env.PGSSLMODE) {
        case "disable":
          return false;
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full":
          return true;
        case "no-verify":
          return { rejectUnauthorized: false };
      }
      return defaults.ssl;
    };
    var quoteParamValue = function(value) {
      return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    };
    var add = function(params, config, paramName) {
      var value = config[paramName];
      if (value !== void 0 && value !== null) {
        params.push(paramName + "=" + quoteParamValue(value));
      }
    };
    var ConnectionParameters = class {
      constructor(config) {
        config = typeof config === "string" ? parse2(config) : config || {};
        if (config.connectionString) {
          config = Object.assign({}, config, parse2(config.connectionString));
        }
        this.user = val("user", config);
        this.database = val("database", config);
        if (this.database === void 0) {
          this.database = this.user;
        }
        this.port = parseInt(val("port", config), 10);
        this.host = val("host", config);
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: val("password", config)
        });
        this.binary = val("binary", config);
        this.options = val("options", config);
        this.ssl = typeof config.ssl === "undefined" ? readSSLConfigFromEnvironment() : config.ssl;
        if (typeof this.ssl === "string") {
          if (this.ssl === "true") {
            this.ssl = true;
          }
        }
        if (this.ssl === "no-verify") {
          this.ssl = { rejectUnauthorized: false };
        }
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this.client_encoding = val("client_encoding", config);
        this.replication = val("replication", config);
        this.isDomainSocket = !(this.host || "").indexOf("/");
        this.application_name = val("application_name", config, "PGAPPNAME");
        this.fallback_application_name = val("fallback_application_name", config, false);
        this.statement_timeout = val("statement_timeout", config, false);
        this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config, false);
        this.query_timeout = val("query_timeout", config, false);
        if (config.connectionTimeoutMillis === void 0) {
          this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
        } else {
          this.connect_timeout = Math.floor(config.connectionTimeoutMillis / 1e3);
        }
        if (config.keepAlive === false) {
          this.keepalives = 0;
        } else if (config.keepAlive === true) {
          this.keepalives = 1;
        }
        if (typeof config.keepAliveInitialDelayMillis === "number") {
          this.keepalives_idle = Math.floor(config.keepAliveInitialDelayMillis / 1e3);
        }
      }
      getLibpqConnectionString(cb) {
        var params = [];
        add(params, this, "user");
        add(params, this, "password");
        add(params, this, "port");
        add(params, this, "application_name");
        add(params, this, "fallback_application_name");
        add(params, this, "connect_timeout");
        add(params, this, "options");
        var ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
        add(params, ssl, "sslmode");
        add(params, ssl, "sslca");
        add(params, ssl, "sslkey");
        add(params, ssl, "sslcert");
        add(params, ssl, "sslrootcert");
        if (this.database) {
          params.push("dbname=" + quoteParamValue(this.database));
        }
        if (this.replication) {
          params.push("replication=" + quoteParamValue(this.replication));
        }
        if (this.host) {
          params.push("host=" + quoteParamValue(this.host));
        }
        if (this.isDomainSocket) {
          return cb(null, params.join(" "));
        }
        if (this.client_encoding) {
          params.push("client_encoding=" + quoteParamValue(this.client_encoding));
        }
        dns.lookup(this.host, function(err, address) {
          if (err)
            return cb(err, null);
          params.push("hostaddr=" + quoteParamValue(address));
          return cb(null, params.join(" "));
        });
      }
    };
    module.exports = ConnectionParameters;
  }
});

// node_modules/pg/lib/result.js
var require_result = __commonJS({
  "node_modules/pg/lib/result.js"(exports, module) {
    "use strict";
    var types2 = require_pg_types();
    var matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
    var Result = class {
      constructor(rowMode, types3) {
        this.command = null;
        this.rowCount = null;
        this.oid = null;
        this.rows = [];
        this.fields = [];
        this._parsers = void 0;
        this._types = types3;
        this.RowCtor = null;
        this.rowAsArray = rowMode === "array";
        if (this.rowAsArray) {
          this.parseRow = this._parseRowAsArray;
        }
      }
      addCommandComplete(msg) {
        var match;
        if (msg.text) {
          match = matchRegexp.exec(msg.text);
        } else {
          match = matchRegexp.exec(msg.command);
        }
        if (match) {
          this.command = match[1];
          if (match[3]) {
            this.oid = parseInt(match[2], 10);
            this.rowCount = parseInt(match[3], 10);
          } else if (match[2]) {
            this.rowCount = parseInt(match[2], 10);
          }
        }
      }
      _parseRowAsArray(rowData) {
        var row = new Array(rowData.length);
        for (var i2 = 0, len = rowData.length; i2 < len; i2++) {
          var rawValue = rowData[i2];
          if (rawValue !== null) {
            row[i2] = this._parsers[i2](rawValue);
          } else {
            row[i2] = null;
          }
        }
        return row;
      }
      parseRow(rowData) {
        var row = {};
        for (var i2 = 0, len = rowData.length; i2 < len; i2++) {
          var rawValue = rowData[i2];
          var field = this.fields[i2].name;
          if (rawValue !== null) {
            row[field] = this._parsers[i2](rawValue);
          } else {
            row[field] = null;
          }
        }
        return row;
      }
      addRow(row) {
        this.rows.push(row);
      }
      addFields(fieldDescriptions) {
        this.fields = fieldDescriptions;
        if (this.fields.length) {
          this._parsers = new Array(fieldDescriptions.length);
        }
        for (var i2 = 0; i2 < fieldDescriptions.length; i2++) {
          var desc = fieldDescriptions[i2];
          if (this._types) {
            this._parsers[i2] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
          } else {
            this._parsers[i2] = types2.getTypeParser(desc.dataTypeID, desc.format || "text");
          }
        }
      }
    };
    module.exports = Result;
  }
});

// node_modules/pg/lib/query.js
var require_query = __commonJS({
  "node_modules/pg/lib/query.js"(exports, module) {
    "use strict";
    var { EventEmitter } = __require("events");
    var Result = require_result();
    var utils = require_utils();
    var Query = class extends EventEmitter {
      constructor(config, values, callback) {
        super();
        config = utils.normalizeQueryConfig(config, values, callback);
        this.text = config.text;
        this.values = config.values;
        this.rows = config.rows;
        this.types = config.types;
        this.name = config.name;
        this.binary = config.binary;
        this.portal = config.portal || "";
        this.callback = config.callback;
        this._rowMode = config.rowMode;
        if (process.domain && config.callback) {
          this.callback = process.domain.bind(config.callback);
        }
        this._result = new Result(this._rowMode, this.types);
        this._results = this._result;
        this.isPreparedStatement = false;
        this._canceledDueToError = false;
        this._promise = null;
      }
      requiresPreparation() {
        if (this.name) {
          return true;
        }
        if (this.rows) {
          return true;
        }
        if (!this.text) {
          return false;
        }
        if (!this.values) {
          return false;
        }
        return this.values.length > 0;
      }
      _checkForMultirow() {
        if (this._result.command) {
          if (!Array.isArray(this._results)) {
            this._results = [this._result];
          }
          this._result = new Result(this._rowMode, this.types);
          this._results.push(this._result);
        }
      }
      handleRowDescription(msg) {
        this._checkForMultirow();
        this._result.addFields(msg.fields);
        this._accumulateRows = this.callback || !this.listeners("row").length;
      }
      handleDataRow(msg) {
        let row;
        if (this._canceledDueToError) {
          return;
        }
        try {
          row = this._result.parseRow(msg.fields);
        } catch (err) {
          this._canceledDueToError = err;
          return;
        }
        this.emit("row", row, this._result);
        if (this._accumulateRows) {
          this._result.addRow(row);
        }
      }
      handleCommandComplete(msg, connection) {
        this._checkForMultirow();
        this._result.addCommandComplete(msg);
        if (this.rows) {
          connection.sync();
        }
      }
      handleEmptyQuery(connection) {
        if (this.rows) {
          connection.sync();
        }
      }
      handleError(err, connection) {
        if (this._canceledDueToError) {
          err = this._canceledDueToError;
          this._canceledDueToError = false;
        }
        if (this.callback) {
          return this.callback(err);
        }
        this.emit("error", err);
      }
      handleReadyForQuery(con) {
        if (this._canceledDueToError) {
          return this.handleError(this._canceledDueToError, con);
        }
        if (this.callback) {
          this.callback(null, this._results);
        }
        this.emit("end", this._results);
      }
      submit(connection) {
        if (typeof this.text !== "string" && typeof this.name !== "string") {
          return new Error("A query must have either text or a name. Supplying neither is unsupported.");
        }
        const previous = connection.parsedStatements[this.name];
        if (this.text && previous && this.text !== previous) {
          return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
        }
        if (this.values && !Array.isArray(this.values)) {
          return new Error("Query values must be an array");
        }
        if (this.requiresPreparation()) {
          this.prepare(connection);
        } else {
          connection.query(this.text);
        }
        return null;
      }
      hasBeenParsed(connection) {
        return this.name && connection.parsedStatements[this.name];
      }
      handlePortalSuspended(connection) {
        this._getRows(connection, this.rows);
      }
      _getRows(connection, rows) {
        connection.execute({
          portal: this.portal,
          rows
        });
        if (!rows) {
          connection.sync();
        } else {
          connection.flush();
        }
      }
      prepare(connection) {
        this.isPreparedStatement = true;
        if (!this.hasBeenParsed(connection)) {
          connection.parse({
            text: this.text,
            name: this.name,
            types: this.types
          });
        }
        try {
          connection.bind({
            portal: this.portal,
            statement: this.name,
            values: this.values,
            binary: this.binary,
            valueMapper: utils.prepareValue
          });
        } catch (err) {
          this.handleError(err, connection);
          return;
        }
        connection.describe({
          type: "P",
          name: this.portal || ""
        });
        this._getRows(connection, this.rows);
      }
      handleCopyInResponse(connection) {
        connection.sendCopyFail("No source stream defined");
      }
      handleCopyData(msg, connection) {
      }
    };
    module.exports = Query;
  }
});

// node_modules/pg-protocol/dist/messages.js
var require_messages = __commonJS({
  "node_modules/pg-protocol/dist/messages.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoticeMessage = exports.DataRowMessage = exports.CommandCompleteMessage = exports.ReadyForQueryMessage = exports.NotificationResponseMessage = exports.BackendKeyDataMessage = exports.AuthenticationMD5Password = exports.ParameterStatusMessage = exports.ParameterDescriptionMessage = exports.RowDescriptionMessage = exports.Field = exports.CopyResponse = exports.CopyDataMessage = exports.DatabaseError = exports.copyDone = exports.emptyQuery = exports.replicationStart = exports.portalSuspended = exports.noData = exports.closeComplete = exports.bindComplete = exports.parseComplete = void 0;
    exports.parseComplete = {
      name: "parseComplete",
      length: 5
    };
    exports.bindComplete = {
      name: "bindComplete",
      length: 5
    };
    exports.closeComplete = {
      name: "closeComplete",
      length: 5
    };
    exports.noData = {
      name: "noData",
      length: 5
    };
    exports.portalSuspended = {
      name: "portalSuspended",
      length: 5
    };
    exports.replicationStart = {
      name: "replicationStart",
      length: 4
    };
    exports.emptyQuery = {
      name: "emptyQuery",
      length: 4
    };
    exports.copyDone = {
      name: "copyDone",
      length: 4
    };
    var DatabaseError = class extends Error {
      constructor(message, length, name) {
        super(message);
        this.length = length;
        this.name = name;
      }
    };
    exports.DatabaseError = DatabaseError;
    var CopyDataMessage = class {
      constructor(length, chunk) {
        this.length = length;
        this.chunk = chunk;
        this.name = "copyData";
      }
    };
    exports.CopyDataMessage = CopyDataMessage;
    var CopyResponse = class {
      constructor(length, name, binary, columnCount) {
        this.length = length;
        this.name = name;
        this.binary = binary;
        this.columnTypes = new Array(columnCount);
      }
    };
    exports.CopyResponse = CopyResponse;
    var Field = class {
      constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format2) {
        this.name = name;
        this.tableID = tableID;
        this.columnID = columnID;
        this.dataTypeID = dataTypeID;
        this.dataTypeSize = dataTypeSize;
        this.dataTypeModifier = dataTypeModifier;
        this.format = format2;
      }
    };
    exports.Field = Field;
    var RowDescriptionMessage = class {
      constructor(length, fieldCount) {
        this.length = length;
        this.fieldCount = fieldCount;
        this.name = "rowDescription";
        this.fields = new Array(this.fieldCount);
      }
    };
    exports.RowDescriptionMessage = RowDescriptionMessage;
    var ParameterDescriptionMessage = class {
      constructor(length, parameterCount) {
        this.length = length;
        this.parameterCount = parameterCount;
        this.name = "parameterDescription";
        this.dataTypeIDs = new Array(this.parameterCount);
      }
    };
    exports.ParameterDescriptionMessage = ParameterDescriptionMessage;
    var ParameterStatusMessage = class {
      constructor(length, parameterName, parameterValue) {
        this.length = length;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.name = "parameterStatus";
      }
    };
    exports.ParameterStatusMessage = ParameterStatusMessage;
    var AuthenticationMD5Password = class {
      constructor(length, salt) {
        this.length = length;
        this.salt = salt;
        this.name = "authenticationMD5Password";
      }
    };
    exports.AuthenticationMD5Password = AuthenticationMD5Password;
    var BackendKeyDataMessage = class {
      constructor(length, processID, secretKey) {
        this.length = length;
        this.processID = processID;
        this.secretKey = secretKey;
        this.name = "backendKeyData";
      }
    };
    exports.BackendKeyDataMessage = BackendKeyDataMessage;
    var NotificationResponseMessage = class {
      constructor(length, processId, channel, payload) {
        this.length = length;
        this.processId = processId;
        this.channel = channel;
        this.payload = payload;
        this.name = "notification";
      }
    };
    exports.NotificationResponseMessage = NotificationResponseMessage;
    var ReadyForQueryMessage = class {
      constructor(length, status) {
        this.length = length;
        this.status = status;
        this.name = "readyForQuery";
      }
    };
    exports.ReadyForQueryMessage = ReadyForQueryMessage;
    var CommandCompleteMessage = class {
      constructor(length, text) {
        this.length = length;
        this.text = text;
        this.name = "commandComplete";
      }
    };
    exports.CommandCompleteMessage = CommandCompleteMessage;
    var DataRowMessage = class {
      constructor(length, fields) {
        this.length = length;
        this.fields = fields;
        this.name = "dataRow";
        this.fieldCount = fields.length;
      }
    };
    exports.DataRowMessage = DataRowMessage;
    var NoticeMessage = class {
      constructor(length, message) {
        this.length = length;
        this.message = message;
        this.name = "notice";
      }
    };
    exports.NoticeMessage = NoticeMessage;
  }
});

// node_modules/pg-protocol/dist/buffer-writer.js
var require_buffer_writer = __commonJS({
  "node_modules/pg-protocol/dist/buffer-writer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Writer = void 0;
    var Writer = class {
      constructor(size = 256) {
        this.size = size;
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(size);
      }
      ensure(size) {
        var remaining = this.buffer.length - this.offset;
        if (remaining < size) {
          var oldBuffer = this.buffer;
          var newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
          this.buffer = Buffer.allocUnsafe(newSize);
          oldBuffer.copy(this.buffer);
        }
      }
      addInt32(num) {
        this.ensure(4);
        this.buffer[this.offset++] = num >>> 24 & 255;
        this.buffer[this.offset++] = num >>> 16 & 255;
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addInt16(num) {
        this.ensure(2);
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addCString(string) {
        if (!string) {
          this.ensure(1);
        } else {
          var len = Buffer.byteLength(string);
          this.ensure(len + 1);
          this.buffer.write(string, this.offset, "utf-8");
          this.offset += len;
        }
        this.buffer[this.offset++] = 0;
        return this;
      }
      addString(string = "") {
        var len = Buffer.byteLength(string);
        this.ensure(len);
        this.buffer.write(string, this.offset);
        this.offset += len;
        return this;
      }
      add(otherBuffer) {
        this.ensure(otherBuffer.length);
        otherBuffer.copy(this.buffer, this.offset);
        this.offset += otherBuffer.length;
        return this;
      }
      join(code) {
        if (code) {
          this.buffer[this.headerPosition] = code;
          const length = this.offset - (this.headerPosition + 1);
          this.buffer.writeInt32BE(length, this.headerPosition + 1);
        }
        return this.buffer.slice(code ? 0 : 5, this.offset);
      }
      flush(code) {
        var result = this.join(code);
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(this.size);
        return result;
      }
    };
    exports.Writer = Writer;
  }
});

// node_modules/pg-protocol/dist/serializer.js
var require_serializer = __commonJS({
  "node_modules/pg-protocol/dist/serializer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = void 0;
    var buffer_writer_1 = require_buffer_writer();
    var writer = new buffer_writer_1.Writer();
    var startup = (opts) => {
      writer.addInt16(3).addInt16(0);
      for (const key2 of Object.keys(opts)) {
        writer.addCString(key2).addCString(opts[key2]);
      }
      writer.addCString("client_encoding").addCString("UTF8");
      var bodyBuffer = writer.addCString("").flush();
      var length = bodyBuffer.length + 4;
      return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
    };
    var requestSsl = () => {
      const response = Buffer.allocUnsafe(8);
      response.writeInt32BE(8, 0);
      response.writeInt32BE(80877103, 4);
      return response;
    };
    var password = (password2) => {
      return writer.addCString(password2).flush(112);
    };
    var sendSASLInitialResponseMessage = function(mechanism, initialResponse) {
      writer.addCString(mechanism).addInt32(Buffer.byteLength(initialResponse)).addString(initialResponse);
      return writer.flush(112);
    };
    var sendSCRAMClientFinalMessage = function(additionalData) {
      return writer.addString(additionalData).flush(112);
    };
    var query = (text) => {
      return writer.addCString(text).flush(81);
    };
    var emptyArray = [];
    var parse2 = (query2) => {
      const name = query2.name || "";
      if (name.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", name, name.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      const types2 = query2.types || emptyArray;
      var len = types2.length;
      var buffer = writer.addCString(name).addCString(query2.text).addInt16(len);
      for (var i2 = 0; i2 < len; i2++) {
        buffer.addInt32(types2[i2]);
      }
      return writer.flush(80);
    };
    var paramWriter = new buffer_writer_1.Writer();
    var writeValues = function(values, valueMapper) {
      for (let i2 = 0; i2 < values.length; i2++) {
        const mappedVal = valueMapper ? valueMapper(values[i2], i2) : values[i2];
        if (mappedVal == null) {
          writer.addInt16(0);
          paramWriter.addInt32(-1);
        } else if (mappedVal instanceof Buffer) {
          writer.addInt16(1);
          paramWriter.addInt32(mappedVal.length);
          paramWriter.add(mappedVal);
        } else {
          writer.addInt16(0);
          paramWriter.addInt32(Buffer.byteLength(mappedVal));
          paramWriter.addString(mappedVal);
        }
      }
    };
    var bind = (config = {}) => {
      const portal = config.portal || "";
      const statement = config.statement || "";
      const binary = config.binary || false;
      const values = config.values || emptyArray;
      const len = values.length;
      writer.addCString(portal).addCString(statement);
      writer.addInt16(len);
      writeValues(values, config.valueMapper);
      writer.addInt16(len);
      writer.add(paramWriter.flush());
      writer.addInt16(binary ? 1 : 0);
      return writer.flush(66);
    };
    var emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
    var execute = (config) => {
      if (!config || !config.portal && !config.rows) {
        return emptyExecute;
      }
      const portal = config.portal || "";
      const rows = config.rows || 0;
      const portalLength = Buffer.byteLength(portal);
      const len = 4 + portalLength + 1 + 4;
      const buff = Buffer.allocUnsafe(1 + len);
      buff[0] = 69;
      buff.writeInt32BE(len, 1);
      buff.write(portal, 5, "utf-8");
      buff[portalLength + 5] = 0;
      buff.writeUInt32BE(rows, buff.length - 4);
      return buff;
    };
    var cancel = (processID, secretKey) => {
      const buffer = Buffer.allocUnsafe(16);
      buffer.writeInt32BE(16, 0);
      buffer.writeInt16BE(1234, 4);
      buffer.writeInt16BE(5678, 6);
      buffer.writeInt32BE(processID, 8);
      buffer.writeInt32BE(secretKey, 12);
      return buffer;
    };
    var cstringMessage = (code, string) => {
      const stringLen = Buffer.byteLength(string);
      const len = 4 + stringLen + 1;
      const buffer = Buffer.allocUnsafe(1 + len);
      buffer[0] = code;
      buffer.writeInt32BE(len, 1);
      buffer.write(string, 5, "utf-8");
      buffer[len] = 0;
      return buffer;
    };
    var emptyDescribePortal = writer.addCString("P").flush(68);
    var emptyDescribeStatement = writer.addCString("S").flush(68);
    var describe = (msg) => {
      return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
    };
    var close = (msg) => {
      const text = `${msg.type}${msg.name || ""}`;
      return cstringMessage(67, text);
    };
    var copyData = (chunk) => {
      return writer.add(chunk).flush(100);
    };
    var copyFail = (message) => {
      return cstringMessage(102, message);
    };
    var codeOnlyBuffer = (code) => Buffer.from([code, 0, 0, 0, 4]);
    var flushBuffer = codeOnlyBuffer(72);
    var syncBuffer = codeOnlyBuffer(83);
    var endBuffer = codeOnlyBuffer(88);
    var copyDoneBuffer = codeOnlyBuffer(99);
    var serialize2 = {
      startup,
      password,
      requestSsl,
      sendSASLInitialResponseMessage,
      sendSCRAMClientFinalMessage,
      query,
      parse: parse2,
      bind,
      execute,
      describe,
      close,
      flush: () => flushBuffer,
      sync: () => syncBuffer,
      end: () => endBuffer,
      copyData,
      copyDone: () => copyDoneBuffer,
      copyFail,
      cancel
    };
    exports.serialize = serialize2;
  }
});

// node_modules/pg-protocol/dist/buffer-reader.js
var require_buffer_reader = __commonJS({
  "node_modules/pg-protocol/dist/buffer-reader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BufferReader = void 0;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var BufferReader = class {
      constructor(offset = 0) {
        this.offset = offset;
        this.buffer = emptyBuffer;
        this.encoding = "utf-8";
      }
      setBuffer(offset, buffer) {
        this.offset = offset;
        this.buffer = buffer;
      }
      int16() {
        const result = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return result;
      }
      byte() {
        const result = this.buffer[this.offset];
        this.offset++;
        return result;
      }
      int32() {
        const result = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      string(length) {
        const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
      cstring() {
        const start = this.offset;
        let end = start;
        while (this.buffer[end++] !== 0) {
        }
        this.offset = end;
        return this.buffer.toString(this.encoding, start, end - 1);
      }
      bytes(length) {
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
    };
    exports.BufferReader = BufferReader;
  }
});

// node_modules/pg-protocol/dist/parser.js
var require_parser = __commonJS({
  "node_modules/pg-protocol/dist/parser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    var messages_1 = require_messages();
    var buffer_reader_1 = require_buffer_reader();
    var assert_1 = __importDefault(__require("assert"));
    var CODE_LENGTH = 1;
    var LEN_LENGTH = 4;
    var HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var Parser = class {
      constructor(opts) {
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
        this.reader = new buffer_reader_1.BufferReader();
        if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
          throw new Error("Binary mode not supported yet");
        }
        this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
      }
      parse(buffer, callback) {
        this.mergeBuffer(buffer);
        const bufferFullLength = this.bufferOffset + this.bufferLength;
        let offset = this.bufferOffset;
        while (offset + HEADER_LENGTH <= bufferFullLength) {
          const code = this.buffer[offset];
          const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
          const fullMessageLength = CODE_LENGTH + length;
          if (fullMessageLength + offset <= bufferFullLength) {
            const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
            callback(message);
            offset += fullMessageLength;
          } else {
            break;
          }
        }
        if (offset === bufferFullLength) {
          this.buffer = emptyBuffer;
          this.bufferLength = 0;
          this.bufferOffset = 0;
        } else {
          this.bufferLength = bufferFullLength - offset;
          this.bufferOffset = offset;
        }
      }
      mergeBuffer(buffer) {
        if (this.bufferLength > 0) {
          const newLength = this.bufferLength + buffer.byteLength;
          const newFullLength = newLength + this.bufferOffset;
          if (newFullLength > this.buffer.byteLength) {
            let newBuffer;
            if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
              newBuffer = this.buffer;
            } else {
              let newBufferLength = this.buffer.byteLength * 2;
              while (newLength >= newBufferLength) {
                newBufferLength *= 2;
              }
              newBuffer = Buffer.allocUnsafe(newBufferLength);
            }
            this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
            this.buffer = newBuffer;
            this.bufferOffset = 0;
          }
          buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
          this.bufferLength = newLength;
        } else {
          this.buffer = buffer;
          this.bufferOffset = 0;
          this.bufferLength = buffer.byteLength;
        }
      }
      handlePacket(offset, code, length, bytes) {
        switch (code) {
          case 50:
            return messages_1.bindComplete;
          case 49:
            return messages_1.parseComplete;
          case 51:
            return messages_1.closeComplete;
          case 110:
            return messages_1.noData;
          case 115:
            return messages_1.portalSuspended;
          case 99:
            return messages_1.copyDone;
          case 87:
            return messages_1.replicationStart;
          case 73:
            return messages_1.emptyQuery;
          case 68:
            return this.parseDataRowMessage(offset, length, bytes);
          case 67:
            return this.parseCommandCompleteMessage(offset, length, bytes);
          case 90:
            return this.parseReadyForQueryMessage(offset, length, bytes);
          case 65:
            return this.parseNotificationMessage(offset, length, bytes);
          case 82:
            return this.parseAuthenticationResponse(offset, length, bytes);
          case 83:
            return this.parseParameterStatusMessage(offset, length, bytes);
          case 75:
            return this.parseBackendKeyData(offset, length, bytes);
          case 69:
            return this.parseErrorMessage(offset, length, bytes, "error");
          case 78:
            return this.parseErrorMessage(offset, length, bytes, "notice");
          case 84:
            return this.parseRowDescriptionMessage(offset, length, bytes);
          case 116:
            return this.parseParameterDescriptionMessage(offset, length, bytes);
          case 71:
            return this.parseCopyInMessage(offset, length, bytes);
          case 72:
            return this.parseCopyOutMessage(offset, length, bytes);
          case 100:
            return this.parseCopyData(offset, length, bytes);
          default:
            assert_1.default.fail(`unknown message code: ${code.toString(16)}`);
        }
      }
      parseReadyForQueryMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const status = this.reader.string(1);
        return new messages_1.ReadyForQueryMessage(length, status);
      }
      parseCommandCompleteMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const text = this.reader.cstring();
        return new messages_1.CommandCompleteMessage(length, text);
      }
      parseCopyData(offset, length, bytes) {
        const chunk = bytes.slice(offset, offset + (length - 4));
        return new messages_1.CopyDataMessage(length, chunk);
      }
      parseCopyInMessage(offset, length, bytes) {
        return this.parseCopyMessage(offset, length, bytes, "copyInResponse");
      }
      parseCopyOutMessage(offset, length, bytes) {
        return this.parseCopyMessage(offset, length, bytes, "copyOutResponse");
      }
      parseCopyMessage(offset, length, bytes, messageName) {
        this.reader.setBuffer(offset, bytes);
        const isBinary = this.reader.byte() !== 0;
        const columnCount = this.reader.int16();
        const message = new messages_1.CopyResponse(length, messageName, isBinary, columnCount);
        for (let i2 = 0; i2 < columnCount; i2++) {
          message.columnTypes[i2] = this.reader.int16();
        }
        return message;
      }
      parseNotificationMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const processId = this.reader.int32();
        const channel = this.reader.cstring();
        const payload = this.reader.cstring();
        return new messages_1.NotificationResponseMessage(length, processId, channel, payload);
      }
      parseRowDescriptionMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const fieldCount = this.reader.int16();
        const message = new messages_1.RowDescriptionMessage(length, fieldCount);
        for (let i2 = 0; i2 < fieldCount; i2++) {
          message.fields[i2] = this.parseField();
        }
        return message;
      }
      parseField() {
        const name = this.reader.cstring();
        const tableID = this.reader.int32();
        const columnID = this.reader.int16();
        const dataTypeID = this.reader.int32();
        const dataTypeSize = this.reader.int16();
        const dataTypeModifier = this.reader.int32();
        const mode = this.reader.int16() === 0 ? "text" : "binary";
        return new messages_1.Field(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
      }
      parseParameterDescriptionMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const parameterCount = this.reader.int16();
        const message = new messages_1.ParameterDescriptionMessage(length, parameterCount);
        for (let i2 = 0; i2 < parameterCount; i2++) {
          message.dataTypeIDs[i2] = this.reader.int32();
        }
        return message;
      }
      parseDataRowMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const fieldCount = this.reader.int16();
        const fields = new Array(fieldCount);
        for (let i2 = 0; i2 < fieldCount; i2++) {
          const len = this.reader.int32();
          fields[i2] = len === -1 ? null : this.reader.string(len);
        }
        return new messages_1.DataRowMessage(length, fields);
      }
      parseParameterStatusMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const name = this.reader.cstring();
        const value = this.reader.cstring();
        return new messages_1.ParameterStatusMessage(length, name, value);
      }
      parseBackendKeyData(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const processID = this.reader.int32();
        const secretKey = this.reader.int32();
        return new messages_1.BackendKeyDataMessage(length, processID, secretKey);
      }
      parseAuthenticationResponse(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const code = this.reader.int32();
        const message = {
          name: "authenticationOk",
          length
        };
        switch (code) {
          case 0:
            break;
          case 3:
            if (message.length === 8) {
              message.name = "authenticationCleartextPassword";
            }
            break;
          case 5:
            if (message.length === 12) {
              message.name = "authenticationMD5Password";
              const salt = this.reader.bytes(4);
              return new messages_1.AuthenticationMD5Password(length, salt);
            }
            break;
          case 10:
            message.name = "authenticationSASL";
            message.mechanisms = [];
            let mechanism;
            do {
              mechanism = this.reader.cstring();
              if (mechanism) {
                message.mechanisms.push(mechanism);
              }
            } while (mechanism);
            break;
          case 11:
            message.name = "authenticationSASLContinue";
            message.data = this.reader.string(length - 8);
            break;
          case 12:
            message.name = "authenticationSASLFinal";
            message.data = this.reader.string(length - 8);
            break;
          default:
            throw new Error("Unknown authenticationOk message type " + code);
        }
        return message;
      }
      parseErrorMessage(offset, length, bytes, name) {
        this.reader.setBuffer(offset, bytes);
        const fields = {};
        let fieldType = this.reader.string(1);
        while (fieldType !== "\0") {
          fields[fieldType] = this.reader.cstring();
          fieldType = this.reader.string(1);
        }
        const messageValue = fields.M;
        const message = name === "notice" ? new messages_1.NoticeMessage(length, messageValue) : new messages_1.DatabaseError(messageValue, length, name);
        message.severity = fields.S;
        message.code = fields.C;
        message.detail = fields.D;
        message.hint = fields.H;
        message.position = fields.P;
        message.internalPosition = fields.p;
        message.internalQuery = fields.q;
        message.where = fields.W;
        message.schema = fields.s;
        message.table = fields.t;
        message.column = fields.c;
        message.dataType = fields.d;
        message.constraint = fields.n;
        message.file = fields.F;
        message.line = fields.L;
        message.routine = fields.R;
        return message;
      }
    };
    exports.Parser = Parser;
  }
});

// node_modules/pg-protocol/dist/index.js
var require_dist = __commonJS({
  "node_modules/pg-protocol/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseError = exports.serialize = exports.parse = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: function() {
      return messages_1.DatabaseError;
    } });
    var serializer_1 = require_serializer();
    Object.defineProperty(exports, "serialize", { enumerable: true, get: function() {
      return serializer_1.serialize;
    } });
    var parser_1 = require_parser();
    function parse2(stream, callback) {
      const parser = new parser_1.Parser();
      stream.on("data", (buffer) => parser.parse(buffer, callback));
      return new Promise((resolve2) => stream.on("end", () => resolve2()));
    }
    exports.parse = parse2;
  }
});

// node_modules/pg/lib/connection.js
var require_connection = __commonJS({
  "node_modules/pg/lib/connection.js"(exports, module) {
    "use strict";
    var net = __require("net");
    var EventEmitter = __require("events").EventEmitter;
    var { parse: parse2, serialize: serialize2 } = require_dist();
    var flushBuffer = serialize2.flush();
    var syncBuffer = serialize2.sync();
    var endBuffer = serialize2.end();
    var Connection = class extends EventEmitter {
      constructor(config) {
        super();
        config = config || {};
        this.stream = config.stream || new net.Socket();
        this._keepAlive = config.keepAlive;
        this._keepAliveInitialDelayMillis = config.keepAliveInitialDelayMillis;
        this.lastBuffer = false;
        this.parsedStatements = {};
        this.ssl = config.ssl || false;
        this._ending = false;
        this._emitMessage = false;
        var self2 = this;
        this.on("newListener", function(eventName) {
          if (eventName === "message") {
            self2._emitMessage = true;
          }
        });
      }
      connect(port, host) {
        var self2 = this;
        this._connecting = true;
        this.stream.setNoDelay(true);
        this.stream.connect(port, host);
        this.stream.once("connect", function() {
          if (self2._keepAlive) {
            self2.stream.setKeepAlive(true, self2._keepAliveInitialDelayMillis);
          }
          self2.emit("connect");
        });
        const reportStreamError = function(error2) {
          if (self2._ending && (error2.code === "ECONNRESET" || error2.code === "EPIPE")) {
            return;
          }
          self2.emit("error", error2);
        };
        this.stream.on("error", reportStreamError);
        this.stream.on("close", function() {
          self2.emit("end");
        });
        if (!this.ssl) {
          return this.attachListeners(this.stream);
        }
        this.stream.once("data", function(buffer) {
          var responseCode = buffer.toString("utf8");
          switch (responseCode) {
            case "S":
              break;
            case "N":
              self2.stream.end();
              return self2.emit("error", new Error("The server does not support SSL connections"));
            default:
              self2.stream.end();
              return self2.emit("error", new Error("There was an error establishing an SSL connection"));
          }
          var tls = __require("tls");
          const options = {
            socket: self2.stream
          };
          if (self2.ssl !== true) {
            Object.assign(options, self2.ssl);
            if ("key" in self2.ssl) {
              options.key = self2.ssl.key;
            }
          }
          if (net.isIP(host) === 0) {
            options.servername = host;
          }
          try {
            self2.stream = tls.connect(options);
          } catch (err) {
            return self2.emit("error", err);
          }
          self2.attachListeners(self2.stream);
          self2.stream.on("error", reportStreamError);
          self2.emit("sslconnect");
        });
      }
      attachListeners(stream) {
        stream.on("end", () => {
          this.emit("end");
        });
        parse2(stream, (msg) => {
          var eventName = msg.name === "error" ? "errorMessage" : msg.name;
          if (this._emitMessage) {
            this.emit("message", msg);
          }
          this.emit(eventName, msg);
        });
      }
      requestSsl() {
        this.stream.write(serialize2.requestSsl());
      }
      startup(config) {
        this.stream.write(serialize2.startup(config));
      }
      cancel(processID, secretKey) {
        this._send(serialize2.cancel(processID, secretKey));
      }
      password(password) {
        this._send(serialize2.password(password));
      }
      sendSASLInitialResponseMessage(mechanism, initialResponse) {
        this._send(serialize2.sendSASLInitialResponseMessage(mechanism, initialResponse));
      }
      sendSCRAMClientFinalMessage(additionalData) {
        this._send(serialize2.sendSCRAMClientFinalMessage(additionalData));
      }
      _send(buffer) {
        if (!this.stream.writable) {
          return false;
        }
        return this.stream.write(buffer);
      }
      query(text) {
        this._send(serialize2.query(text));
      }
      parse(query) {
        this._send(serialize2.parse(query));
      }
      bind(config) {
        this._send(serialize2.bind(config));
      }
      execute(config) {
        this._send(serialize2.execute(config));
      }
      flush() {
        if (this.stream.writable) {
          this.stream.write(flushBuffer);
        }
      }
      sync() {
        this._ending = true;
        this._send(flushBuffer);
        this._send(syncBuffer);
      }
      ref() {
        this.stream.ref();
      }
      unref() {
        this.stream.unref();
      }
      end() {
        this._ending = true;
        if (!this._connecting || !this.stream.writable) {
          this.stream.end();
          return;
        }
        return this.stream.write(endBuffer, () => {
          this.stream.end();
        });
      }
      close(msg) {
        this._send(serialize2.close(msg));
      }
      describe(msg) {
        this._send(serialize2.describe(msg));
      }
      sendCopyFromChunk(chunk) {
        this._send(serialize2.copyData(chunk));
      }
      endCopyFrom() {
        this._send(serialize2.copyDone());
      }
      sendCopyFail(msg) {
        this._send(serialize2.copyFail(msg));
      }
    };
    module.exports = Connection;
  }
});

// node_modules/pg/lib/client.js
var require_client = __commonJS({
  "node_modules/pg/lib/client.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events").EventEmitter;
    var util = __require("util");
    var utils = require_utils();
    var sasl = require_sasl();
    var pgPass = require_lib();
    var TypeOverrides = require_type_overrides();
    var ConnectionParameters = require_connection_parameters();
    var Query = require_query();
    var defaults = require_defaults();
    var Connection = require_connection();
    var Client = class extends EventEmitter {
      constructor(config) {
        super();
        this.connectionParameters = new ConnectionParameters(config);
        this.user = this.connectionParameters.user;
        this.database = this.connectionParameters.database;
        this.port = this.connectionParameters.port;
        this.host = this.connectionParameters.host;
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: this.connectionParameters.password
        });
        this.replication = this.connectionParameters.replication;
        var c = config || {};
        this._Promise = c.Promise || global.Promise;
        this._types = new TypeOverrides(c.types);
        this._ending = false;
        this._connecting = false;
        this._connected = false;
        this._connectionError = false;
        this._queryable = true;
        this.connection = c.connection || new Connection({
          stream: c.stream,
          ssl: this.connectionParameters.ssl,
          keepAlive: c.keepAlive || false,
          keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
          encoding: this.connectionParameters.client_encoding || "utf8"
        });
        this.queryQueue = [];
        this.binary = c.binary || defaults.binary;
        this.processID = null;
        this.secretKey = null;
        this.ssl = this.connectionParameters.ssl || false;
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
      }
      _errorAllQueries(err) {
        const enqueueError = (query) => {
          process.nextTick(() => {
            query.handleError(err, this.connection);
          });
        };
        if (this.activeQuery) {
          enqueueError(this.activeQuery);
          this.activeQuery = null;
        }
        this.queryQueue.forEach(enqueueError);
        this.queryQueue.length = 0;
      }
      _connect(callback) {
        var self2 = this;
        var con = this.connection;
        this._connectionCallback = callback;
        if (this._connecting || this._connected) {
          const err = new Error("Client has already been connected. You cannot reuse a client.");
          process.nextTick(() => {
            callback(err);
          });
          return;
        }
        this._connecting = true;
        this.connectionTimeoutHandle;
        if (this._connectionTimeoutMillis > 0) {
          this.connectionTimeoutHandle = setTimeout(() => {
            con._ending = true;
            con.stream.destroy(new Error("timeout expired"));
          }, this._connectionTimeoutMillis);
        }
        if (this.host && this.host.indexOf("/") === 0) {
          con.connect(this.host + "/.s.PGSQL." + this.port);
        } else {
          con.connect(this.port, this.host);
        }
        con.on("connect", function() {
          if (self2.ssl) {
            con.requestSsl();
          } else {
            con.startup(self2.getStartupConf());
          }
        });
        con.on("sslconnect", function() {
          con.startup(self2.getStartupConf());
        });
        this._attachListeners(con);
        con.once("end", () => {
          const error2 = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
          clearTimeout(this.connectionTimeoutHandle);
          this._errorAllQueries(error2);
          if (!this._ending) {
            if (this._connecting && !this._connectionError) {
              if (this._connectionCallback) {
                this._connectionCallback(error2);
              } else {
                this._handleErrorEvent(error2);
              }
            } else if (!this._connectionError) {
              this._handleErrorEvent(error2);
            }
          }
          process.nextTick(() => {
            this.emit("end");
          });
        });
      }
      connect(callback) {
        if (callback) {
          this._connect(callback);
          return;
        }
        return new this._Promise((resolve2, reject) => {
          this._connect((error2) => {
            if (error2) {
              reject(error2);
            } else {
              resolve2();
            }
          });
        });
      }
      _attachListeners(con) {
        con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
        con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
        con.on("authenticationSASL", this._handleAuthSASL.bind(this));
        con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
        con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
        con.on("backendKeyData", this._handleBackendKeyData.bind(this));
        con.on("error", this._handleErrorEvent.bind(this));
        con.on("errorMessage", this._handleErrorMessage.bind(this));
        con.on("readyForQuery", this._handleReadyForQuery.bind(this));
        con.on("notice", this._handleNotice.bind(this));
        con.on("rowDescription", this._handleRowDescription.bind(this));
        con.on("dataRow", this._handleDataRow.bind(this));
        con.on("portalSuspended", this._handlePortalSuspended.bind(this));
        con.on("emptyQuery", this._handleEmptyQuery.bind(this));
        con.on("commandComplete", this._handleCommandComplete.bind(this));
        con.on("parseComplete", this._handleParseComplete.bind(this));
        con.on("copyInResponse", this._handleCopyInResponse.bind(this));
        con.on("copyData", this._handleCopyData.bind(this));
        con.on("notification", this._handleNotification.bind(this));
      }
      _checkPgPass(cb) {
        const con = this.connection;
        if (typeof this.password === "function") {
          this._Promise.resolve().then(() => this.password()).then((pass) => {
            if (pass !== void 0) {
              if (typeof pass !== "string") {
                con.emit("error", new TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = pass;
            } else {
              this.connectionParameters.password = this.password = null;
            }
            cb();
          }).catch((err) => {
            con.emit("error", err);
          });
        } else if (this.password !== null) {
          cb();
        } else {
          pgPass(this.connectionParameters, (pass) => {
            if (pass !== void 0) {
              this.connectionParameters.password = this.password = pass;
            }
            cb();
          });
        }
      }
      _handleAuthCleartextPassword(msg) {
        this._checkPgPass(() => {
          this.connection.password(this.password);
        });
      }
      _handleAuthMD5Password(msg) {
        this._checkPgPass(() => {
          const hashedPassword = utils.postgresMd5PasswordHash(this.user, this.password, msg.salt);
          this.connection.password(hashedPassword);
        });
      }
      _handleAuthSASL(msg) {
        this._checkPgPass(() => {
          this.saslSession = sasl.startSession(msg.mechanisms);
          this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
        });
      }
      _handleAuthSASLContinue(msg) {
        sasl.continueSession(this.saslSession, this.password, msg.data);
        this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
      }
      _handleAuthSASLFinal(msg) {
        sasl.finalizeSession(this.saslSession, msg.data);
        this.saslSession = null;
      }
      _handleBackendKeyData(msg) {
        this.processID = msg.processID;
        this.secretKey = msg.secretKey;
      }
      _handleReadyForQuery(msg) {
        if (this._connecting) {
          this._connecting = false;
          this._connected = true;
          clearTimeout(this.connectionTimeoutHandle);
          if (this._connectionCallback) {
            this._connectionCallback(null, this);
            this._connectionCallback = null;
          }
          this.emit("connect");
        }
        const { activeQuery } = this;
        this.activeQuery = null;
        this.readyForQuery = true;
        if (activeQuery) {
          activeQuery.handleReadyForQuery(this.connection);
        }
        this._pulseQueryQueue();
      }
      _handleErrorWhileConnecting(err) {
        if (this._connectionError) {
          return;
        }
        this._connectionError = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
          return this._connectionCallback(err);
        }
        this.emit("error", err);
      }
      _handleErrorEvent(err) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(err);
        }
        this._queryable = false;
        this._errorAllQueries(err);
        this.emit("error", err);
      }
      _handleErrorMessage(msg) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(msg);
        }
        const activeQuery = this.activeQuery;
        if (!activeQuery) {
          this._handleErrorEvent(msg);
          return;
        }
        this.activeQuery = null;
        activeQuery.handleError(msg, this.connection);
      }
      _handleRowDescription(msg) {
        this.activeQuery.handleRowDescription(msg);
      }
      _handleDataRow(msg) {
        this.activeQuery.handleDataRow(msg);
      }
      _handlePortalSuspended(msg) {
        this.activeQuery.handlePortalSuspended(this.connection);
      }
      _handleEmptyQuery(msg) {
        this.activeQuery.handleEmptyQuery(this.connection);
      }
      _handleCommandComplete(msg) {
        this.activeQuery.handleCommandComplete(msg, this.connection);
      }
      _handleParseComplete(msg) {
        if (this.activeQuery.name) {
          this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text;
        }
      }
      _handleCopyInResponse(msg) {
        this.activeQuery.handleCopyInResponse(this.connection);
      }
      _handleCopyData(msg) {
        this.activeQuery.handleCopyData(msg, this.connection);
      }
      _handleNotification(msg) {
        this.emit("notification", msg);
      }
      _handleNotice(msg) {
        this.emit("notice", msg);
      }
      getStartupConf() {
        var params = this.connectionParameters;
        var data = {
          user: params.user,
          database: params.database
        };
        var appName = params.application_name || params.fallback_application_name;
        if (appName) {
          data.application_name = appName;
        }
        if (params.replication) {
          data.replication = "" + params.replication;
        }
        if (params.statement_timeout) {
          data.statement_timeout = String(parseInt(params.statement_timeout, 10));
        }
        if (params.idle_in_transaction_session_timeout) {
          data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
        }
        if (params.options) {
          data.options = params.options;
        }
        return data;
      }
      cancel(client, query) {
        if (client.activeQuery === query) {
          var con = this.connection;
          if (this.host && this.host.indexOf("/") === 0) {
            con.connect(this.host + "/.s.PGSQL." + this.port);
          } else {
            con.connect(this.port, this.host);
          }
          con.on("connect", function() {
            con.cancel(client.processID, client.secretKey);
          });
        } else if (client.queryQueue.indexOf(query) !== -1) {
          client.queryQueue.splice(client.queryQueue.indexOf(query), 1);
        }
      }
      setTypeParser(oid, format2, parseFn) {
        return this._types.setTypeParser(oid, format2, parseFn);
      }
      getTypeParser(oid, format2) {
        return this._types.getTypeParser(oid, format2);
      }
      escapeIdentifier(str) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      escapeLiteral(str) {
        var hasBackslash = false;
        var escaped3 = "'";
        for (var i2 = 0; i2 < str.length; i2++) {
          var c = str[i2];
          if (c === "'") {
            escaped3 += c + c;
          } else if (c === "\\") {
            escaped3 += c + c;
            hasBackslash = true;
          } else {
            escaped3 += c;
          }
        }
        escaped3 += "'";
        if (hasBackslash === true) {
          escaped3 = " E" + escaped3;
        }
        return escaped3;
      }
      _pulseQueryQueue() {
        if (this.readyForQuery === true) {
          this.activeQuery = this.queryQueue.shift();
          if (this.activeQuery) {
            this.readyForQuery = false;
            this.hasExecuted = true;
            const queryError = this.activeQuery.submit(this.connection);
            if (queryError) {
              process.nextTick(() => {
                this.activeQuery.handleError(queryError, this.connection);
                this.readyForQuery = true;
                this._pulseQueryQueue();
              });
            }
          } else if (this.hasExecuted) {
            this.activeQuery = null;
            this.emit("drain");
          }
        }
      }
      query(config, values, callback) {
        var query;
        var result;
        var readTimeout;
        var readTimeoutTimer;
        var queryCallback;
        if (config === null || config === void 0) {
          throw new TypeError("Client was passed a null or undefined query");
        } else if (typeof config.submit === "function") {
          readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
          result = query = config;
          if (typeof values === "function") {
            query.callback = query.callback || values;
          }
        } else {
          readTimeout = this.connectionParameters.query_timeout;
          query = new Query(config, values, callback);
          if (!query.callback) {
            result = new this._Promise((resolve2, reject) => {
              query.callback = (err, res) => err ? reject(err) : resolve2(res);
            });
          }
        }
        if (readTimeout) {
          queryCallback = query.callback;
          readTimeoutTimer = setTimeout(() => {
            var error2 = new Error("Query read timeout");
            process.nextTick(() => {
              query.handleError(error2, this.connection);
            });
            queryCallback(error2);
            query.callback = () => {
            };
            var index = this.queryQueue.indexOf(query);
            if (index > -1) {
              this.queryQueue.splice(index, 1);
            }
            this._pulseQueryQueue();
          }, readTimeout);
          query.callback = (err, res) => {
            clearTimeout(readTimeoutTimer);
            queryCallback(err, res);
          };
        }
        if (this.binary && !query.binary) {
          query.binary = true;
        }
        if (query._result && !query._result._types) {
          query._result._types = this._types;
        }
        if (!this._queryable) {
          process.nextTick(() => {
            query.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._ending) {
          process.nextTick(() => {
            query.handleError(new Error("Client was closed and is not queryable"), this.connection);
          });
          return result;
        }
        this.queryQueue.push(query);
        this._pulseQueryQueue();
        return result;
      }
      ref() {
        this.connection.ref();
      }
      unref() {
        this.connection.unref();
      }
      end(cb) {
        this._ending = true;
        if (!this.connection._connecting) {
          if (cb) {
            cb();
          } else {
            return this._Promise.resolve();
          }
        }
        if (this.activeQuery || !this._queryable) {
          this.connection.stream.destroy();
        } else {
          this.connection.end();
        }
        if (cb) {
          this.connection.once("end", cb);
        } else {
          return new this._Promise((resolve2) => {
            this.connection.once("end", resolve2);
          });
        }
      }
    };
    Client.Query = Query;
    module.exports = Client;
  }
});

// node_modules/pg-pool/index.js
var require_pg_pool = __commonJS({
  "node_modules/pg-pool/index.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events").EventEmitter;
    var NOOP = function() {
    };
    var removeWhere = (list, predicate) => {
      const i2 = list.findIndex(predicate);
      return i2 === -1 ? void 0 : list.splice(i2, 1)[0];
    };
    var IdleItem = class {
      constructor(client, idleListener, timeoutId) {
        this.client = client;
        this.idleListener = idleListener;
        this.timeoutId = timeoutId;
      }
    };
    var PendingItem = class {
      constructor(callback) {
        this.callback = callback;
      }
    };
    function throwOnDoubleRelease() {
      throw new Error("Release called on client which has already been released to the pool.");
    }
    function promisify(Promise2, callback) {
      if (callback) {
        return { callback, result: void 0 };
      }
      let rej;
      let res;
      const cb = function(err, client) {
        err ? rej(err) : res(client);
      };
      const result = new Promise2(function(resolve2, reject) {
        res = resolve2;
        rej = reject;
      });
      return { callback: cb, result };
    }
    function makeIdleListener(pool2, client) {
      return function idleListener(err) {
        err.client = client;
        client.removeListener("error", idleListener);
        client.on("error", () => {
          pool2.log("additional client error after disconnection due to error", err);
        });
        pool2._remove(client);
        pool2.emit("error", err, client);
      };
    }
    var Pool2 = class extends EventEmitter {
      constructor(options, Client) {
        super();
        this.options = Object.assign({}, options);
        if (options != null && "password" in options) {
          Object.defineProperty(this.options, "password", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: options.password
          });
        }
        if (options != null && options.ssl && options.ssl.key) {
          Object.defineProperty(this.options.ssl, "key", {
            enumerable: false
          });
        }
        this.options.max = this.options.max || this.options.poolSize || 10;
        this.options.maxUses = this.options.maxUses || Infinity;
        this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
        this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
        this.log = this.options.log || function() {
        };
        this.Client = this.options.Client || Client || require_lib2().Client;
        this.Promise = this.options.Promise || global.Promise;
        if (typeof this.options.idleTimeoutMillis === "undefined") {
          this.options.idleTimeoutMillis = 1e4;
        }
        this._clients = [];
        this._idle = [];
        this._expired = /* @__PURE__ */ new WeakSet();
        this._pendingQueue = [];
        this._endCallback = void 0;
        this.ending = false;
        this.ended = false;
      }
      _isFull() {
        return this._clients.length >= this.options.max;
      }
      _pulseQueue() {
        this.log("pulse queue");
        if (this.ended) {
          this.log("pulse queue ended");
          return;
        }
        if (this.ending) {
          this.log("pulse queue on ending");
          if (this._idle.length) {
            this._idle.slice().map((item) => {
              this._remove(item.client);
            });
          }
          if (!this._clients.length) {
            this.ended = true;
            this._endCallback();
          }
          return;
        }
        if (!this._pendingQueue.length) {
          this.log("no queued requests");
          return;
        }
        if (!this._idle.length && this._isFull()) {
          return;
        }
        const pendingItem = this._pendingQueue.shift();
        if (this._idle.length) {
          const idleItem = this._idle.pop();
          clearTimeout(idleItem.timeoutId);
          const client = idleItem.client;
          client.ref && client.ref();
          const idleListener = idleItem.idleListener;
          return this._acquireClient(client, pendingItem, idleListener, false);
        }
        if (!this._isFull()) {
          return this.newClient(pendingItem);
        }
        throw new Error("unexpected condition");
      }
      _remove(client) {
        const removed = removeWhere(this._idle, (item) => item.client === client);
        if (removed !== void 0) {
          clearTimeout(removed.timeoutId);
        }
        this._clients = this._clients.filter((c) => c !== client);
        client.end();
        this.emit("remove", client);
      }
      connect(cb) {
        if (this.ending) {
          const err = new Error("Cannot use a pool after calling end on the pool");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        const response = promisify(this.Promise, cb);
        const result = response.result;
        if (this._isFull() || this._idle.length) {
          if (this._idle.length) {
            process.nextTick(() => this._pulseQueue());
          }
          if (!this.options.connectionTimeoutMillis) {
            this._pendingQueue.push(new PendingItem(response.callback));
            return result;
          }
          const queueCallback = (err, res, done) => {
            clearTimeout(tid);
            response.callback(err, res, done);
          };
          const pendingItem = new PendingItem(queueCallback);
          const tid = setTimeout(() => {
            removeWhere(this._pendingQueue, (i2) => i2.callback === queueCallback);
            pendingItem.timedOut = true;
            response.callback(new Error("timeout exceeded when trying to connect"));
          }, this.options.connectionTimeoutMillis);
          this._pendingQueue.push(pendingItem);
          return result;
        }
        this.newClient(new PendingItem(response.callback));
        return result;
      }
      newClient(pendingItem) {
        const client = new this.Client(this.options);
        this._clients.push(client);
        const idleListener = makeIdleListener(this, client);
        this.log("checking client timeout");
        let tid;
        let timeoutHit = false;
        if (this.options.connectionTimeoutMillis) {
          tid = setTimeout(() => {
            this.log("ending client due to timeout");
            timeoutHit = true;
            client.connection ? client.connection.stream.destroy() : client.end();
          }, this.options.connectionTimeoutMillis);
        }
        this.log("connecting new client");
        client.connect((err) => {
          if (tid) {
            clearTimeout(tid);
          }
          client.on("error", idleListener);
          if (err) {
            this.log("client failed to connect", err);
            this._clients = this._clients.filter((c) => c !== client);
            if (timeoutHit) {
              err.message = "Connection terminated due to connection timeout";
            }
            this._pulseQueue();
            if (!pendingItem.timedOut) {
              pendingItem.callback(err, void 0, NOOP);
            }
          } else {
            this.log("new client connected");
            if (this.options.maxLifetimeSeconds !== 0) {
              setTimeout(() => {
                this.log("ending client due to expired lifetime");
                this._expired.add(client);
                const idleIndex = this._idle.findIndex((idleItem) => idleItem.client === client);
                if (idleIndex !== -1) {
                  this._acquireClient(client, new PendingItem((err2, client2, clientRelease) => clientRelease()), idleListener, false);
                }
              }, this.options.maxLifetimeSeconds * 1e3);
            }
            return this._acquireClient(client, pendingItem, idleListener, true);
          }
        });
      }
      _acquireClient(client, pendingItem, idleListener, isNew) {
        if (isNew) {
          this.emit("connect", client);
        }
        this.emit("acquire", client);
        client.release = this._releaseOnce(client, idleListener);
        client.removeListener("error", idleListener);
        if (!pendingItem.timedOut) {
          if (isNew && this.options.verify) {
            this.options.verify(client, (err) => {
              if (err) {
                client.release(err);
                return pendingItem.callback(err, void 0, NOOP);
              }
              pendingItem.callback(void 0, client, client.release);
            });
          } else {
            pendingItem.callback(void 0, client, client.release);
          }
        } else {
          if (isNew && this.options.verify) {
            this.options.verify(client, client.release);
          } else {
            client.release();
          }
        }
      }
      _releaseOnce(client, idleListener) {
        let released = false;
        return (err) => {
          if (released) {
            throwOnDoubleRelease();
          }
          released = true;
          this._release(client, idleListener, err);
        };
      }
      _release(client, idleListener, err) {
        client.on("error", idleListener);
        client._poolUseCount = (client._poolUseCount || 0) + 1;
        if (err || this.ending || !client._queryable || client._ending || client._poolUseCount >= this.options.maxUses) {
          if (client._poolUseCount >= this.options.maxUses) {
            this.log("remove expended client");
          }
          this._remove(client);
          this._pulseQueue();
          return;
        }
        const isExpired = this._expired.has(client);
        if (isExpired) {
          this.log("remove expired client");
          this._expired.delete(client);
          this._remove(client);
          this._pulseQueue();
          return;
        }
        let tid;
        if (this.options.idleTimeoutMillis) {
          tid = setTimeout(() => {
            this.log("remove idle client");
            this._remove(client);
          }, this.options.idleTimeoutMillis);
          if (this.options.allowExitOnIdle) {
            tid.unref();
          }
        }
        if (this.options.allowExitOnIdle) {
          client.unref();
        }
        this._idle.push(new IdleItem(client, idleListener, tid));
        this._pulseQueue();
      }
      query(text, values, cb) {
        if (typeof text === "function") {
          const response2 = promisify(this.Promise, text);
          setImmediate(function() {
            return response2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
          });
          return response2.result;
        }
        if (typeof values === "function") {
          cb = values;
          values = void 0;
        }
        const response = promisify(this.Promise, cb);
        cb = response.callback;
        this.connect((err, client) => {
          if (err) {
            return cb(err);
          }
          let clientReleased = false;
          const onError = (err2) => {
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client.release(err2);
            cb(err2);
          };
          client.once("error", onError);
          this.log("dispatching query");
          client.query(text, values, (err2, res) => {
            this.log("query dispatched");
            client.removeListener("error", onError);
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client.release(err2);
            if (err2) {
              return cb(err2);
            } else {
              return cb(void 0, res);
            }
          });
        });
        return response.result;
      }
      end(cb) {
        this.log("ending");
        if (this.ending) {
          const err = new Error("Called end on pool more than once");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        this.ending = true;
        const promised = promisify(this.Promise, cb);
        this._endCallback = promised.callback;
        this._pulseQueue();
        return promised.result;
      }
      get waitingCount() {
        return this._pendingQueue.length;
      }
      get idleCount() {
        return this._idle.length;
      }
      get expiredCount() {
        return this._clients.reduce((acc, client) => acc + (this._expired.has(client) ? 1 : 0), 0);
      }
      get totalCount() {
        return this._clients.length;
      }
    };
    module.exports = Pool2;
  }
});

// node_modules/pg/package.json
var require_package = __commonJS({
  "node_modules/pg/package.json"(exports, module) {
    module.exports = {
      name: "pg",
      version: "8.7.3",
      description: "PostgreSQL client - pure javascript & libpq with the same API",
      keywords: [
        "database",
        "libpq",
        "pg",
        "postgre",
        "postgres",
        "postgresql",
        "rdbms"
      ],
      homepage: "https://github.com/brianc/node-postgres",
      repository: {
        type: "git",
        url: "git://github.com/brianc/node-postgres.git",
        directory: "packages/pg"
      },
      author: "Brian Carlson <brian.m.carlson@gmail.com>",
      main: "./lib",
      dependencies: {
        "buffer-writer": "2.0.0",
        "packet-reader": "1.0.0",
        "pg-connection-string": "^2.5.0",
        "pg-pool": "^3.5.1",
        "pg-protocol": "^1.5.0",
        "pg-types": "^2.1.0",
        pgpass: "1.x"
      },
      devDependencies: {
        async: "0.9.0",
        bluebird: "3.5.2",
        co: "4.6.0",
        "pg-copy-streams": "0.3.0"
      },
      peerDependencies: {
        "pg-native": ">=2.0.0"
      },
      peerDependenciesMeta: {
        "pg-native": {
          optional: true
        }
      },
      scripts: {
        test: "make test-all"
      },
      files: [
        "lib",
        "SPONSORS.md"
      ],
      license: "MIT",
      engines: {
        node: ">= 8.0.0"
      },
      gitHead: "4fa7ee891a456168a75695ac026792136f16577f"
    };
  }
});

// node_modules/pg/lib/native/query.js
var require_query2 = __commonJS({
  "node_modules/pg/lib/native/query.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events").EventEmitter;
    var util = __require("util");
    var utils = require_utils();
    var NativeQuery = module.exports = function(config, values, callback) {
      EventEmitter.call(this);
      config = utils.normalizeQueryConfig(config, values, callback);
      this.text = config.text;
      this.values = config.values;
      this.name = config.name;
      this.callback = config.callback;
      this.state = "new";
      this._arrayMode = config.rowMode === "array";
      this._emitRowEvents = false;
      this.on("newListener", function(event) {
        if (event === "row")
          this._emitRowEvents = true;
      }.bind(this));
    };
    util.inherits(NativeQuery, EventEmitter);
    var errorFieldMap = {
      sqlState: "code",
      statementPosition: "position",
      messagePrimary: "message",
      context: "where",
      schemaName: "schema",
      tableName: "table",
      columnName: "column",
      dataTypeName: "dataType",
      constraintName: "constraint",
      sourceFile: "file",
      sourceLine: "line",
      sourceFunction: "routine"
    };
    NativeQuery.prototype.handleError = function(err) {
      var fields = this.native.pq.resultErrorFields();
      if (fields) {
        for (var key2 in fields) {
          var normalizedFieldName = errorFieldMap[key2] || key2;
          err[normalizedFieldName] = fields[key2];
        }
      }
      if (this.callback) {
        this.callback(err);
      } else {
        this.emit("error", err);
      }
      this.state = "error";
    };
    NativeQuery.prototype.then = function(onSuccess, onFailure) {
      return this._getPromise().then(onSuccess, onFailure);
    };
    NativeQuery.prototype.catch = function(callback) {
      return this._getPromise().catch(callback);
    };
    NativeQuery.prototype._getPromise = function() {
      if (this._promise)
        return this._promise;
      this._promise = new Promise(function(resolve2, reject) {
        this._once("end", resolve2);
        this._once("error", reject);
      }.bind(this));
      return this._promise;
    };
    NativeQuery.prototype.submit = function(client) {
      this.state = "running";
      var self2 = this;
      this.native = client.native;
      client.native.arrayMode = this._arrayMode;
      var after = function(err, rows, results) {
        client.native.arrayMode = false;
        setImmediate(function() {
          self2.emit("_done");
        });
        if (err) {
          return self2.handleError(err);
        }
        if (self2._emitRowEvents) {
          if (results.length > 1) {
            rows.forEach((rowOfRows, i2) => {
              rowOfRows.forEach((row) => {
                self2.emit("row", row, results[i2]);
              });
            });
          } else {
            rows.forEach(function(row) {
              self2.emit("row", row, results);
            });
          }
        }
        self2.state = "end";
        self2.emit("end", results);
        if (self2.callback) {
          self2.callback(null, results);
        }
      };
      if (process.domain) {
        after = process.domain.bind(after);
      }
      if (this.name) {
        if (this.name.length > 63) {
          console.error("Warning! Postgres only supports 63 characters for query names.");
          console.error("You supplied %s (%s)", this.name, this.name.length);
          console.error("This can cause conflicts and silent errors executing queries");
        }
        var values = (this.values || []).map(utils.prepareValue);
        if (client.namedQueries[this.name]) {
          if (this.text && client.namedQueries[this.name] !== this.text) {
            const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
            return after(err);
          }
          return client.native.execute(this.name, values, after);
        }
        return client.native.prepare(this.name, this.text, values.length, function(err) {
          if (err)
            return after(err);
          client.namedQueries[self2.name] = self2.text;
          return self2.native.execute(self2.name, values, after);
        });
      } else if (this.values) {
        if (!Array.isArray(this.values)) {
          const err = new Error("Query values must be an array");
          return after(err);
        }
        var vals = this.values.map(utils.prepareValue);
        client.native.query(this.text, vals, after);
      } else {
        client.native.query(this.text, after);
      }
    };
  }
});

// node_modules/pg/lib/native/client.js
var require_client2 = __commonJS({
  "node_modules/pg/lib/native/client.js"(exports, module) {
    "use strict";
    var Native = __require("pg-native");
    var TypeOverrides = require_type_overrides();
    var pkg = require_package();
    var EventEmitter = __require("events").EventEmitter;
    var util = __require("util");
    var ConnectionParameters = require_connection_parameters();
    var NativeQuery = require_query2();
    var Client = module.exports = function(config) {
      EventEmitter.call(this);
      config = config || {};
      this._Promise = config.Promise || global.Promise;
      this._types = new TypeOverrides(config.types);
      this.native = new Native({
        types: this._types
      });
      this._queryQueue = [];
      this._ending = false;
      this._connecting = false;
      this._connected = false;
      this._queryable = true;
      var cp = this.connectionParameters = new ConnectionParameters(config);
      this.user = cp.user;
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: cp.password
      });
      this.database = cp.database;
      this.host = cp.host;
      this.port = cp.port;
      this.namedQueries = {};
    };
    Client.Query = NativeQuery;
    util.inherits(Client, EventEmitter);
    Client.prototype._errorAllQueries = function(err) {
      const enqueueError = (query) => {
        process.nextTick(() => {
          query.native = this.native;
          query.handleError(err);
        });
      };
      if (this._hasActiveQuery()) {
        enqueueError(this._activeQuery);
        this._activeQuery = null;
      }
      this._queryQueue.forEach(enqueueError);
      this._queryQueue.length = 0;
    };
    Client.prototype._connect = function(cb) {
      var self2 = this;
      if (this._connecting) {
        process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
        return;
      }
      this._connecting = true;
      this.connectionParameters.getLibpqConnectionString(function(err, conString) {
        if (err)
          return cb(err);
        self2.native.connect(conString, function(err2) {
          if (err2) {
            self2.native.end();
            return cb(err2);
          }
          self2._connected = true;
          self2.native.on("error", function(err3) {
            self2._queryable = false;
            self2._errorAllQueries(err3);
            self2.emit("error", err3);
          });
          self2.native.on("notification", function(msg) {
            self2.emit("notification", {
              channel: msg.relname,
              payload: msg.extra
            });
          });
          self2.emit("connect");
          self2._pulseQueryQueue(true);
          cb();
        });
      });
    };
    Client.prototype.connect = function(callback) {
      if (callback) {
        this._connect(callback);
        return;
      }
      return new this._Promise((resolve2, reject) => {
        this._connect((error2) => {
          if (error2) {
            reject(error2);
          } else {
            resolve2();
          }
        });
      });
    };
    Client.prototype.query = function(config, values, callback) {
      var query;
      var result;
      var readTimeout;
      var readTimeoutTimer;
      var queryCallback;
      if (config === null || config === void 0) {
        throw new TypeError("Client was passed a null or undefined query");
      } else if (typeof config.submit === "function") {
        readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
        result = query = config;
        if (typeof values === "function") {
          config.callback = values;
        }
      } else {
        readTimeout = this.connectionParameters.query_timeout;
        query = new NativeQuery(config, values, callback);
        if (!query.callback) {
          let resolveOut, rejectOut;
          result = new this._Promise((resolve2, reject) => {
            resolveOut = resolve2;
            rejectOut = reject;
          });
          query.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
        }
      }
      if (readTimeout) {
        queryCallback = query.callback;
        readTimeoutTimer = setTimeout(() => {
          var error2 = new Error("Query read timeout");
          process.nextTick(() => {
            query.handleError(error2, this.connection);
          });
          queryCallback(error2);
          query.callback = () => {
          };
          var index = this._queryQueue.indexOf(query);
          if (index > -1) {
            this._queryQueue.splice(index, 1);
          }
          this._pulseQueryQueue();
        }, readTimeout);
        query.callback = (err, res) => {
          clearTimeout(readTimeoutTimer);
          queryCallback(err, res);
        };
      }
      if (!this._queryable) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client has encountered a connection error and is not queryable"));
        });
        return result;
      }
      if (this._ending) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client was closed and is not queryable"));
        });
        return result;
      }
      this._queryQueue.push(query);
      this._pulseQueryQueue();
      return result;
    };
    Client.prototype.end = function(cb) {
      var self2 = this;
      this._ending = true;
      if (!this._connected) {
        this.once("connect", this.end.bind(this, cb));
      }
      var result;
      if (!cb) {
        result = new this._Promise(function(resolve2, reject) {
          cb = (err) => err ? reject(err) : resolve2();
        });
      }
      this.native.end(function() {
        self2._errorAllQueries(new Error("Connection terminated"));
        process.nextTick(() => {
          self2.emit("end");
          if (cb)
            cb();
        });
      });
      return result;
    };
    Client.prototype._hasActiveQuery = function() {
      return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
    };
    Client.prototype._pulseQueryQueue = function(initialConnection) {
      if (!this._connected) {
        return;
      }
      if (this._hasActiveQuery()) {
        return;
      }
      var query = this._queryQueue.shift();
      if (!query) {
        if (!initialConnection) {
          this.emit("drain");
        }
        return;
      }
      this._activeQuery = query;
      query.submit(this);
      var self2 = this;
      query.once("_done", function() {
        self2._pulseQueryQueue();
      });
    };
    Client.prototype.cancel = function(query) {
      if (this._activeQuery === query) {
        this.native.cancel(function() {
        });
      } else if (this._queryQueue.indexOf(query) !== -1) {
        this._queryQueue.splice(this._queryQueue.indexOf(query), 1);
      }
    };
    Client.prototype.ref = function() {
    };
    Client.prototype.unref = function() {
    };
    Client.prototype.setTypeParser = function(oid, format2, parseFn) {
      return this._types.setTypeParser(oid, format2, parseFn);
    };
    Client.prototype.getTypeParser = function(oid, format2) {
      return this._types.getTypeParser(oid, format2);
    };
  }
});

// node_modules/pg/lib/native/index.js
var require_native = __commonJS({
  "node_modules/pg/lib/native/index.js"(exports, module) {
    "use strict";
    module.exports = require_client2();
  }
});

// node_modules/pg/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/pg/lib/index.js"(exports, module) {
    "use strict";
    var Client = require_client();
    var defaults = require_defaults();
    var Connection = require_connection();
    var Pool2 = require_pg_pool();
    var { DatabaseError } = require_dist();
    var poolFactory = (Client2) => {
      return class BoundPool extends Pool2 {
        constructor(options) {
          super(options, Client2);
        }
      };
    };
    var PG = function(clientConstructor) {
      this.defaults = defaults;
      this.Client = clientConstructor;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection;
      this.types = require_pg_types();
      this.DatabaseError = DatabaseError;
    };
    if (typeof process.env.NODE_PG_FORCE_NATIVE !== "undefined") {
      module.exports = new PG(require_native());
    } else {
      module.exports = new PG(Client);
      Object.defineProperty(module.exports, "native", {
        configurable: true,
        enumerable: false,
        get() {
          var native = null;
          try {
            native = new PG(require_native());
          } catch (err) {
            if (err.code !== "MODULE_NOT_FOUND") {
              throw err;
            }
          }
          Object.defineProperty(module.exports, "native", {
            value: native
          });
          return native;
        }
      });
    }
  }
});

// .svelte-kit/output/server/chunks/db-7b9abdea.js
var import_pg, Pool, pool, db;
var init_db_7b9abdea = __esm({
  ".svelte-kit/output/server/chunks/db-7b9abdea.js"() {
    init_config();
    import_pg = __toESM(require_lib2(), 1);
    ({ Pool } = import_pg.default);
    pool = new Pool();
    db = {
      query: async (text, params) => {
        const start = Date.now();
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log("executed query", { text, duration, rows: res.rowCount });
        return res;
      }
    };
  }
});

// .svelte-kit/output/server/entries/endpoints/api/index.js
var api_exports = {};
__export(api_exports, {
  get: () => get
});
async function get() {
  try {
    const articleCount = await db.query("SELECT COUNT(*) FROM articles;");
    const commentCount = await db.query("SELECT COUNT(*) FROM comments;");
    return {
      body: {
        articleCount: articleCount.rows[0].count,
        commentCount: commentCount.rows[0].count,
        commentsPerArticle: commentCount.rows[0].count / articleCount.rows[0].count
      }
    };
  } catch (e2) {
    console.log(e2);
    return {
      body: "An error occured",
      status: 400
    };
  }
}
var import_pg2;
var init_api = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/index.js"() {
    init_db_7b9abdea();
    init_config();
    import_pg2 = __toESM(require_lib2(), 1);
  }
});

// .svelte-kit/output/server/entries/endpoints/api/commentDistribution.js
var commentDistribution_exports = {};
__export(commentDistribution_exports, {
  get: () => get2
});
async function get2() {
  try {
    const count = await db.query("SELECT platforms.name, COUNT(*) FROM comments_platform_links, platforms WHERE comments_platform_links.platform_id = platforms.id GROUP BY name");
    let sorted = count.rows.sort((x2, y) => {
      if (x2.name < y.name)
        return -1;
      if (x2.name > y.name)
        return 1;
      return 0;
    });
    return {
      body: {
        newspapers: sorted
      }
    };
  } catch (e2) {
    console.log(e2);
    return {
      body: "An error occured",
      status: 400
    };
  }
}
var import_pg3;
var init_commentDistribution = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/commentDistribution.js"() {
    init_db_7b9abdea();
    init_config();
    import_pg3 = __toESM(require_lib2(), 1);
  }
});

// .svelte-kit/output/server/entries/endpoints/api/articleDistribution.js
var articleDistribution_exports = {};
__export(articleDistribution_exports, {
  get: () => get3
});
async function get3() {
  try {
    const count = await db.query("SELECT platforms.name, COUNT(*) FROM articles_platform_links, platforms WHERE articles_platform_links.platform_id = platforms.id GROUP BY name;");
    let sorted = count.rows.sort((x2, y) => {
      if (x2.name < y.name)
        return -1;
      if (x2.name > y.name)
        return 1;
      return 0;
    });
    return {
      body: {
        newspapers: sorted
      }
    };
  } catch (e2) {
    console.log(e2);
    return {
      body: "An error occured",
      status: 400
    };
  }
}
var import_pg4;
var init_articleDistribution = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/articleDistribution.js"() {
    init_db_7b9abdea();
    init_config();
    import_pg4 = __toESM(require_lib2(), 1);
  }
});

// .svelte-kit/vercel-tmp/serverless.js
init_install_fetch();

// node_modules/@sveltejs/kit/dist/node.js
import { Readable } from "stream";
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_2835083a();
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key2, value) => key2 in obj ? __defProp2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    const allowed = [];
    for (const method2 in ["get", "post", "put", "patch"]) {
      if (mod[method2])
        allowed.push(method2.toUpperCase());
    }
    if (mod.del)
      allowed.push("DELETE");
    if (mod.get || mod.head)
      allowed.push("HEAD");
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response(`${event.request.method} method not allowed`, {
      status: 405,
      headers: {
        allow: allowed.join(", ")
      }
    });
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry4) {
    return entry4[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry4, i2) {
    names.set(entry4[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode$1(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  #use_hashes;
  #dev;
  #script_needs_csp;
  #style_needs_csp;
  #directives;
  #script_src;
  #style_src;
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    this.#use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.#directives = dev ? __spreadValues2({}, directives) : directives;
    this.#dev = dev;
    const d = this.#directives;
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${generate_hash(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${generate_hash(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues2({}, this.#directives);
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var updated = __spreadProps2(__spreadValues2({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let cache;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      cache = loaded == null ? void 0 : loaded.cache;
      is_private = (cache == null ? void 0 : cache.private) ?? uses_credentials;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: __spreadProps2(__spreadValues2({}, session), {
          subscribe: (fn) => {
            is_private = (cache == null ? void 0 : cache.private) ?? true;
            return session.subscribe(fn);
          }
        }),
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
				],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			addEventListener('load', () => {
				navigator.serviceWorker.register('${options.service_worker}');
			});
		}
	`;
  if (options.amp) {
    const styles2 = `${inlined_style}
${rendered.css.code}`;
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${styles2}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-sveltekit");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"', `data-hydrate="${target}"`];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url, body: body2, response }) => render_json_payload_script({ type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
      if (shadow_props) {
        body += render_json_payload_script({ type: "props" }, shadow_props);
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender && !options.amp) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (cache) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${cache.maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps2(__spreadValues2({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
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
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  if ("maxage" in loaded) {
    throw new Error("maxage should be replaced with cache: { maxage }");
  }
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      return {
        status: 500,
        error: new Error('"dependencies" property returned from load() must be of type string[]')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event.request.headers.get("cookie") || "");
  const new_cookies = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, !!state.prerender) : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url,
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues2({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const authorization = event.request.headers.get("authorization");
            const combined_cookies = __spreadValues2({}, cookies);
            for (const cookie2 of new_cookies) {
              if (!domain_matches(event.url.hostname, cookie2.domain))
                continue;
              if (!path_matches(resolved, cookie2.path))
                continue;
              combined_cookies[cookie2.name] = cookie2.value;
            }
            const cookie = Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, __spreadProps2(__spreadValues2({}, opts), { credentials: void 0 })), options, __spreadProps2(__spreadValues2({}, state), {
            initiator: route
          }));
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          new_cookies.push(...splitCookiesString_1(set_cookie).map((str) => parseString_1(str)));
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 !== "set-cookie" && key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues2({}, stuff),
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const _a = new_cookie, { name, value } = _a, options2 = __objRest(_a, ["name", "value"]);
      return serialize_1(name, value, options2);
    }),
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = body;
    }
    const get4 = method === "head" && mod.head || mod.get;
    if (get4) {
      const result = await get4(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = __spreadValues2(__spreadValues2({}, body), data.body);
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error2,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(__spreadProps2(__spreadValues2({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerender) {
    const should_prerender = leaf.prerender ?? state.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr: {
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      let loaded;
      if (node) {
        try {
          loaded = await load_node(__spreadProps2(__spreadValues2({}, opts), {
            node,
            stuff,
            is_error: false,
            is_leaf: i2 === nodes.length - 1
          }));
          set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
          if (loaded.loaded.redirect) {
            return with_cookies(new Response(void 0, {
              status: loaded.loaded.status,
              headers: {
                location: loaded.loaded.redirect
              }
            }), set_cookie_headers);
          }
          if (loaded.loaded.error) {
            ({ status, error: error2 } = loaded.loaded);
          }
        } catch (err) {
          const e2 = coalesce_to_error(err);
          options.handle_error(e2, event);
          status = 500;
          error2 = e2;
        }
        if (loaded && !error2) {
          branch.push(loaded);
        }
        if (error2) {
          while (i2--) {
            if (route.b[i2]) {
              const index = route.b[i2];
              const error_node = await options.manifest._.nodes[index]();
              let node_loaded;
              let j = i2;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                const error_loaded = await load_node(__spreadProps2(__spreadValues2({}, opts), {
                  node: error_node,
                  stuff: node_loaded.stuff,
                  is_error: true,
                  is_leaf: false,
                  status,
                  error: error2
                }));
                if (error_loaded.loaded.error) {
                  continue;
                }
                page_config = get_page_config(error_node.module, options);
                branch = branch.slice(0, j + 1).concat(error_loaded);
                stuff = __spreadValues2(__spreadValues2({}, node_loaded.stuff), error_loaded.stuff);
                break ssr;
              } catch (err) {
                const e2 = coalesce_to_error(err);
                options.handle_error(e2, event);
                continue;
              }
            }
          }
          return with_cookies(await respond_with_error({
            event,
            options,
            state,
            $session,
            status,
            error: error2,
            resolve_opts
          }), set_cookie_headers);
        }
      }
      if (loaded && loaded.loaded.stuff) {
        stuff = __spreadValues2(__spreadValues2({}, stuff), loaded.loaded.stuff);
      }
    }
  }
  try {
    return with_cookies(await render_response(__spreadProps2(__spreadValues2({}, opts), {
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps2(__spreadValues2({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a, _b, _c;
  let url = new URL(request.url);
  const { parameter, allowed } = options.method_override;
  const method_override = (_a = url.searchParams.get(parameter)) == null ? void 0 : _a.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerender) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
    url = new URL(url.origin + url.pathname.slice(0, -DATA_SUFFIX.length) + url.search);
  }
  if (!state.prerender || !state.prerender.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if ((route == null ? void 0 : route.type) === "page") {
    const normalized = normalize_path(url.pathname, options.trailing_slash);
    if (normalized !== url.pathname && !((_c = state.prerender) == null ? void 0 : _c.fallback)) {
      return new Response(void 0, {
        status: 301,
        headers: {
          "x-sveltekit-normalize": "1",
          location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
        }
      });
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps2(__spreadValues2({}, resolve_opts), {
              ssr: false
            })
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get("location");
                if (location) {
                  const headers = new Headers(response2.headers);
                  headers.set("x-sveltekit-location", location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerender) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="' + assets2 + `/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
    <script>
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    <\/script>
    ` + head + '\n  </head>\n  <body class="bg-neutral-900 text-white">\n    <div>' + body + "</div>\n  </body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module = await Promise.resolve().then(() => (init_hooks_1c45ba0b(), hooks_1c45ba0b_exports));
      this.options.hooks = {
        getSession: module.getSession || (() => ({})),
        handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png"]),
  mimeTypes: { ".png": "image/png" },
  _: {
    entry: { "file": "start-d75e154a.js", "js": ["start-d75e154a.js", "chunks/index-ed1dd974.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "endpoint",
        id: "api",
        pattern: /^\/api\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => (init_api(), api_exports))
      },
      {
        type: "endpoint",
        id: "api/commentDistribution",
        pattern: /^\/api\/commentDistribution\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => (init_commentDistribution(), commentDistribution_exports))
      },
      {
        type: "endpoint",
        id: "api/articleDistribution",
        pattern: /^\/api\/articleDistribution\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => (init_articleDistribution(), articleDistribution_exports))
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/serverless.js
installFetch();
var server = new Server(manifest);
var serverless_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
export {
  serverless_default as default
};
/*!
 * @kurkle/color v0.1.9
 * https://github.com/kurkle/color#readme
 * (c) 2020 Jukka Kurkela
 * Released under the MIT License
 */
/*!
 * Chart.js v3.7.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

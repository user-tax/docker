#!/usr/bin/env -S node --loader=@u6x/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict
import {dirname as _dirname_} from 'path';import { createRequire as _createRequire_ } from 'module';const require = _createRequire_(import.meta.url); const __dirname=_dirname_(decodeURI((new URL(import.meta.url)).pathname));
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target2, all) => {
  for (var name2 in all)
    __defProp(target2, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2,
  mod
));

// ../../node_modules/.pnpm/node-gyp-build-optional-packages@5.0.3/node_modules/node-gyp-build-optional-packages/index.js
var require_node_gyp_build_optional_packages = __commonJS({
  "../../node_modules/.pnpm/node-gyp-build-optional-packages@5.0.3/node_modules/node-gyp-build-optional-packages/index.js"(exports, module) {
    var fs2 = __require("fs");
    var path = __require("path");
    var runtimeRequire = typeof __webpack_require__ === "function" ? __non_webpack_require__ : __require;
    var vars = process.config && process.config.variables || {};
    var prebuildsOnly = !!process.env.PREBUILDS_ONLY;
    var abi = process.versions.modules;
    var runtime = isElectron() ? "electron" : "node";
    var arch = process.arch;
    var platform = process.platform;
    var libc = process.env.LIBC || (isAlpine(platform) ? "musl" : "glibc");
    var armv = process.env.ARM_VERSION || (arch === "arm64" ? "8" : vars.arm_version) || "";
    var uv = (process.versions.uv || "").split(".")[0];
    module.exports = load;
    function load(dir) {
      return runtimeRequire(load.path(dir));
    }
    load.path = function(dir) {
      dir = path.resolve(dir || ".");
      var packageName;
      try {
        packageName = runtimeRequire(path.join(dir, "package.json")).name;
        var varName = packageName.toUpperCase().replace(/-/g, "_") + "_PREBUILD";
        if (process.env[varName])
          dir = process.env[varName];
      } catch (err2) {
      }
      if (!prebuildsOnly) {
        var release = getFirst(path.join(dir, "build/Release"), matchBuild);
        if (release)
          return release;
        var debug = getFirst(path.join(dir, "build/Debug"), matchBuild);
        if (debug)
          return debug;
      }
      var prebuild = resolve(dir);
      if (prebuild)
        return prebuild;
      var nearby = resolve(path.dirname(process.execPath));
      if (nearby)
        return nearby;
      var platformPackage = (packageName[0] == "@" ? "" : "@" + packageName + "/") + packageName + "-" + platform + "-" + arch;
      try {
        var prebuildPackage = path.dirname(__require("module").createRequire(path.join(dir, "package.json")).resolve(platformPackage));
        return resolveFile(prebuildPackage);
      } catch (error) {
      }
      var target2 = [
        "platform=" + platform,
        "arch=" + arch,
        "runtime=" + runtime,
        "abi=" + abi,
        "uv=" + uv,
        armv ? "armv=" + armv : "",
        "libc=" + libc,
        "node=" + process.versions.node,
        process.versions.electron ? "electron=" + process.versions.electron : "",
        typeof __webpack_require__ === "function" ? "webpack=true" : ""
      ].filter(Boolean).join(" ");
      throw new Error("No native build was found for " + target2 + "\n    loaded from: " + dir + " and package: " + platformPackage + "\n");
      function resolve(dir2) {
        var tuples2 = readdirSync(path.join(dir2, "prebuilds")).map(parseTuple);
        var tuple = tuples2.filter(matchTuple(platform, arch)).sort(compareTuples)[0];
        if (!tuple)
          return;
        return resolveFile(path.join(dir2, "prebuilds", tuple.name));
      }
      function resolveFile(prebuilds) {
        var parsed = readdirSync(prebuilds).map(parseTags);
        var candidates = parsed.filter(matchTags(runtime, abi));
        var winner = candidates.sort(compareTags(runtime))[0];
        if (winner)
          return path.join(prebuilds, winner.file);
      }
    };
    function readdirSync(dir) {
      try {
        return fs2.readdirSync(dir);
      } catch (err2) {
        return [];
      }
    }
    function getFirst(dir, filter) {
      var files = readdirSync(dir).filter(filter);
      return files[0] && path.join(dir, files[0]);
    }
    function matchBuild(name2) {
      return /\.node$/.test(name2);
    }
    function parseTuple(name2) {
      var arr = name2.split("-");
      if (arr.length !== 2)
        return;
      var platform2 = arr[0];
      var architectures = arr[1].split("+");
      if (!platform2)
        return;
      if (!architectures.length)
        return;
      if (!architectures.every(Boolean))
        return;
      return { name: name2, platform: platform2, architectures };
    }
    function matchTuple(platform2, arch2) {
      return function(tuple) {
        if (tuple == null)
          return false;
        if (tuple.platform !== platform2)
          return false;
        return tuple.architectures.includes(arch2);
      };
    }
    function compareTuples(a, b2) {
      return a.architectures.length - b2.architectures.length;
    }
    function parseTags(file) {
      var arr = file.split(".");
      var extension = arr.pop();
      var tags = { file, specificity: 0 };
      if (extension !== "node")
        return;
      for (var i = 0; i < arr.length; i++) {
        var tag = arr[i];
        if (tag === "node" || tag === "electron" || tag === "node-webkit") {
          tags.runtime = tag;
        } else if (tag === "napi") {
          tags.napi = true;
        } else if (tag.slice(0, 3) === "abi") {
          tags.abi = tag.slice(3);
        } else if (tag.slice(0, 2) === "uv") {
          tags.uv = tag.slice(2);
        } else if (tag.slice(0, 4) === "armv") {
          tags.armv = tag.slice(4);
        } else if (tag === "glibc" || tag === "musl") {
          tags.libc = tag;
        } else {
          continue;
        }
        tags.specificity++;
      }
      return tags;
    }
    function matchTags(runtime2, abi2) {
      return function(tags) {
        if (tags == null)
          return false;
        if (tags.runtime !== runtime2 && !runtimeAgnostic(tags))
          return false;
        if (tags.abi !== abi2 && !tags.napi)
          return false;
        if (tags.uv && tags.uv !== uv)
          return false;
        if (tags.armv && tags.armv !== armv)
          return false;
        if (tags.libc && tags.libc !== libc)
          return false;
        return true;
      };
    }
    function runtimeAgnostic(tags) {
      return tags.runtime === "node" && tags.napi;
    }
    function compareTags(runtime2) {
      return function(a, b2) {
        if (a.runtime !== b2.runtime) {
          return a.runtime === runtime2 ? -1 : 1;
        } else if (a.abi !== b2.abi) {
          return a.abi ? -1 : 1;
        } else if (a.specificity !== b2.specificity) {
          return a.specificity > b2.specificity ? -1 : 1;
        } else {
          return 0;
        }
      };
    }
    function isElectron() {
      if (process.versions && process.versions.electron)
        return true;
      if (process.env.ELECTRON_RUN_AS_NODE)
        return true;
      return typeof window !== "undefined" && window.process && window.process.type === "renderer";
    }
    function isAlpine(platform2) {
      return platform2 === "linux" && fs2.existsSync("/etc/alpine-release");
    }
    load.parseTags = parseTags;
    load.matchTags = matchTags;
    load.compareTags = compareTags;
    load.parseTuple = parseTuple;
    load.matchTuple = matchTuple;
    load.compareTuples = compareTuples;
  }
});

// ../../node_modules/.pnpm/msgpackr-extract@2.1.2/node_modules/msgpackr-extract/index.js
var require_msgpackr_extract = __commonJS({
  "../../node_modules/.pnpm/msgpackr-extract@2.1.2/node_modules/msgpackr-extract/index.js"(exports, module) {
    module.exports = require_node_gyp_build_optional_packages()(__dirname);
  }
});

// ../../node_modules/.pnpm/prexit@1.0.0/node_modules/prexit/index.js
var require_prexit = __commonJS({
  "../../node_modules/.pnpm/prexit@1.0.0/node_modules/prexit/index.js"(exports, module) {
    var handlers = {};
    var last = [];
    var exitPromise = Promise.resolve();
    var finished = false;
    module.exports = prexit3;
    function prexit3(signals, fn) {
      if (typeof signals === "function") {
        fn = signals;
        signals = prexit3.signals;
      }
      let called = false;
      ["prexit"].concat(signals).forEach((signal) => handle(signal, function() {
        if (called)
          return;
        called = true;
        return fn.apply(fn, arguments);
      }));
    }
    function handle(signal, fn) {
      const handler = handlers[signal];
      if (handler)
        return handler.push(fn);
      const fns = handlers[signal] = [fn];
      process.on(signal, function(err2) {
        signal === "uncaughtException" && prexit3.logExceptions && console.error(err2 && "stack" in err2 ? err2.stack : new Error(err2).stack);
        exitPromise = Promise.all(fns.map(
          (fn2) => Promise.resolve(fn2.apply(fn2, arguments))
        ).concat(exitPromise)).catch(() => prexit3.code = prexit3.code || 1).then(() => done(signal));
      });
    }
    function done(signal) {
      if (finished)
        return;
      finished = true;
      last.forEach((fn) => fn(signal));
      prexit3.ondone();
    }
    prexit3.last = (fn) => last.push(fn);
    prexit3.exit = function(signal, code) {
      if (typeof signal === "number") {
        code = signal;
        signal = "prexit";
      }
      prexit3.code = code || 0;
      process.emit("prexit", signal || "prexit", prexit3.code);
    };
    prexit3.code = 0;
    prexit3.logExceptions = true;
    prexit3.ondone = () => process.exit(prexit3.code);
    prexit3.signals = ["beforeExit", "uncaughtException", "SIGTSTP", "SIGQUIT", "SIGHUP", "SIGTERM", "SIGINT"];
  }
});

// ../../node_modules/.pnpm/fastintcompression@0.0.4/node_modules/fastintcompression/FastIntegerCompression.js
var require_FastIntegerCompression = __commonJS({
  "../../node_modules/.pnpm/fastintcompression@0.0.4/node_modules/fastintcompression/FastIntegerCompression.js"(exports, module) {
    "use strict";
    function FastIntegerCompression() {
    }
    function bytelog(val2) {
      if (val2 < 1 << 7) {
        return 1;
      } else if (val2 < 1 << 14) {
        return 2;
      } else if (val2 < 1 << 21) {
        return 3;
      } else if (val2 < 1 << 28) {
        return 4;
      }
      return 5;
    }
    function zigzag_encode(val2) {
      return val2 + val2 ^ val2 >> 31;
      ;
    }
    function zigzag_decode(val2) {
      return val2 >> 1 ^ -(val2 & 1);
    }
    FastIntegerCompression.computeCompressedSizeInBytes = function(input) {
      var c = input.length;
      var answer = 0;
      for (var i = 0; i < c; i++) {
        answer += bytelog(input[i]);
      }
      return answer;
    };
    FastIntegerCompression.computeCompressedSizeInBytesSigned = function(input) {
      var c = input.length;
      var answer = 0;
      for (var i = 0; i < c; i++) {
        answer += bytelog(zigzag_encode(input[i]));
      }
      return answer;
    };
    FastIntegerCompression.compress = function(input) {
      var c = input.length;
      var buf = new ArrayBuffer(FastIntegerCompression.computeCompressedSizeInBytes(input));
      var view = new Int8Array(buf);
      var pos = 0;
      for (var i = 0; i < c; i++) {
        var val2 = input[i];
        if (val2 < 1 << 7) {
          view[pos++] = val2;
        } else if (val2 < 1 << 14) {
          view[pos++] = val2 & 127 | 128;
          view[pos++] = val2 >>> 7;
        } else if (val2 < 1 << 21) {
          view[pos++] = val2 & 127 | 128;
          view[pos++] = val2 >>> 7 & 127 | 128;
          view[pos++] = val2 >>> 14;
        } else if (val2 < 1 << 28) {
          view[pos++] = val2 & 127 | 128;
          view[pos++] = val2 >>> 7 & 127 | 128;
          view[pos++] = val2 >>> 14 & 127 | 128;
          view[pos++] = val2 >>> 21;
        } else {
          view[pos++] = val2 & 127 | 128;
          view[pos++] = val2 >>> 7 & 127 | 128;
          view[pos++] = val2 >>> 14 & 127 | 128;
          view[pos++] = val2 >>> 21 & 127 | 128;
          view[pos++] = val2 >>> 28;
        }
      }
      return buf;
    };
    FastIntegerCompression.computeHowManyIntegers = function(input) {
      var view = new Int8Array(input);
      var c = view.length;
      var count = 0;
      for (var i = 0; i < c; i++) {
        count += input[i] >>> 7;
      }
      return c - count;
    };
    FastIntegerCompression.uncompress = function(input) {
      var array = [];
      var inbyte = new Int8Array(input);
      var end = inbyte.length;
      var pos = 0;
      while (end > pos) {
        var c = inbyte[pos++];
        var v = c & 127;
        if (c >= 0) {
          array.push(v);
          continue;
        }
        c = inbyte[pos++];
        v |= (c & 127) << 7;
        if (c >= 0) {
          array.push(v);
          continue;
        }
        c = inbyte[pos++];
        v |= (c & 127) << 14;
        if (c >= 0) {
          array.push(v);
          continue;
        }
        c = inbyte[pos++];
        v |= (c & 127) << 21;
        if (c >= 0) {
          array.push(v);
          continue;
        }
        c = inbyte[pos++];
        v |= c << 28;
        v >>>= 0;
        array.push(v);
      }
      return array;
    };
    FastIntegerCompression.compressSigned = function(input) {
      var c = input.length;
      var buf = new ArrayBuffer(FastIntegerCompression.computeCompressedSizeInBytesSigned(input));
      var view = new Int8Array(buf);
      var pos = 0;
      for (var i = 0; i < c; i++) {
        var val2 = zigzag_encode(input[i]);
        if (val2 < 1 << 7) {
          view[pos++] = val2;
        } else if (val2 < 1 << 14) {
          view[pos++] = val2 & 127 | 128;
          view[pos++] = val2 >>> 7;
        } else if (val2 < 1 << 21) {
          view[pos++] = val2 & 127 | 128;
          view[pos++] = val2 >>> 7 & 127 | 128;
          view[pos++] = val2 >>> 14;
        } else if (val2 < 1 << 28) {
          view[pos++] = val2 & 127 | 128;
          view[pos++] = val2 >>> 7 & 127 | 128;
          view[pos++] = val2 >>> 14 & 127 | 128;
          view[pos++] = val2 >>> 21;
        } else {
          view[pos++] = val2 & 127 | 128;
          view[pos++] = val2 >>> 7 & 127 | 128;
          view[pos++] = val2 >>> 14 & 127 | 128;
          view[pos++] = val2 >>> 21 & 127 | 128;
          view[pos++] = val2 >>> 28;
        }
      }
      return buf;
    };
    FastIntegerCompression.uncompressSigned = function(input) {
      var array = [];
      var inbyte = new Int8Array(input);
      var end = inbyte.length;
      var pos = 0;
      while (end > pos) {
        var c = inbyte[pos++];
        var v = c & 127;
        if (c >= 0) {
          array.push(zigzag_decode(v));
          continue;
        }
        c = inbyte[pos++];
        v |= (c & 127) << 7;
        if (c >= 0) {
          array.push(zigzag_decode(v));
          continue;
        }
        c = inbyte[pos++];
        v |= (c & 127) << 14;
        if (c >= 0) {
          array.push(zigzag_decode(v));
          continue;
        }
        c = inbyte[pos++];
        v |= (c & 127) << 21;
        if (c >= 0) {
          array.push(zigzag_decode(v));
          continue;
        }
        c = inbyte[pos++];
        v |= c << 28;
        array.push(zigzag_decode(v));
      }
      return array;
    };
    module.exports = FastIntegerCompression;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/fetch/cookies.js
var require_cookies = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/fetch/cookies.js"(exports, module) {
    "use strict";
    var urllib = __require("url");
    var SESSION_TIMEOUT = 1800;
    var Cookies = class {
      constructor(options2) {
        this.options = options2 || {};
        this.cookies = [];
      }
      set(cookieStr, url) {
        let urlparts = urllib.parse(url || "");
        let cookie = this.parse(cookieStr);
        let domain2;
        if (cookie.domain) {
          domain2 = cookie.domain.replace(/^\./, "");
          if (urlparts.hostname.length < domain2.length || ("." + urlparts.hostname).substr(-domain2.length + 1) !== "." + domain2) {
            cookie.domain = urlparts.hostname;
          }
        } else {
          cookie.domain = urlparts.hostname;
        }
        if (!cookie.path) {
          cookie.path = this.getPath(urlparts.pathname);
        }
        if (!cookie.expires) {
          cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1e3);
        }
        return this.add(cookie);
      }
      get(url) {
        return this.list(url).map((cookie) => cookie.name + "=" + cookie.value).join("; ");
      }
      list(url) {
        let result = [];
        let i;
        let cookie;
        for (i = this.cookies.length - 1; i >= 0; i--) {
          cookie = this.cookies[i];
          if (this.isExpired(cookie)) {
            this.cookies.splice(i, i);
            continue;
          }
          if (this.match(cookie, url)) {
            result.unshift(cookie);
          }
        }
        return result;
      }
      parse(cookieStr) {
        let cookie = {};
        (cookieStr || "").toString().split(";").forEach((cookiePart) => {
          let valueParts = cookiePart.split("=");
          let key2 = valueParts.shift().trim().toLowerCase();
          let value = valueParts.join("=").trim();
          let domain2;
          if (!key2) {
            return;
          }
          switch (key2) {
            case "expires":
              value = new Date(value);
              if (value.toString() !== "Invalid Date") {
                cookie.expires = value;
              }
              break;
            case "path":
              cookie.path = value;
              break;
            case "domain":
              domain2 = value.toLowerCase();
              if (domain2.length && domain2.charAt(0) !== ".") {
                domain2 = "." + domain2;
              }
              cookie.domain = domain2;
              break;
            case "max-age":
              cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1e3);
              break;
            case "secure":
              cookie.secure = true;
              break;
            case "httponly":
              cookie.httponly = true;
              break;
            default:
              if (!cookie.name) {
                cookie.name = key2;
                cookie.value = value;
              }
          }
        });
        return cookie;
      }
      match(cookie, url) {
        let urlparts = urllib.parse(url || "");
        if (urlparts.hostname !== cookie.domain && (cookie.domain.charAt(0) !== "." || ("." + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
          return false;
        }
        let path = this.getPath(urlparts.pathname);
        if (path.substr(0, cookie.path.length) !== cookie.path) {
          return false;
        }
        if (cookie.secure && urlparts.protocol !== "https:") {
          return false;
        }
        return true;
      }
      add(cookie) {
        let i;
        let len;
        if (!cookie || !cookie.name) {
          return false;
        }
        for (i = 0, len = this.cookies.length; i < len; i++) {
          if (this.compare(this.cookies[i], cookie)) {
            if (this.isExpired(cookie)) {
              this.cookies.splice(i, 1);
              return false;
            }
            this.cookies[i] = cookie;
            return true;
          }
        }
        if (!this.isExpired(cookie)) {
          this.cookies.push(cookie);
        }
        return true;
      }
      compare(a, b2) {
        return a.name === b2.name && a.path === b2.path && a.domain === b2.domain && a.secure === b2.secure && a.httponly === a.httponly;
      }
      isExpired(cookie) {
        return cookie.expires && cookie.expires < new Date() || !cookie.value;
      }
      getPath(pathname) {
        let path = (pathname || "/").split("/");
        path.pop();
        path = path.join("/").trim();
        if (path.charAt(0) !== "/") {
          path = "/" + path;
        }
        if (path.substr(-1) !== "/") {
          path += "/";
        }
        return path;
      }
    };
    module.exports = Cookies;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/package.json
var require_package = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/package.json"(exports, module) {
    module.exports = {
      name: "nodemailer",
      version: "6.8.0",
      description: "Easy as cake e-mail sending from your Node.js applications",
      main: "lib/nodemailer.js",
      scripts: {
        test: "grunt --trace-warnings"
      },
      repository: {
        type: "git",
        url: "https://github.com/nodemailer/nodemailer.git"
      },
      keywords: [
        "Nodemailer"
      ],
      author: "Andris Reinman",
      license: "MIT",
      bugs: {
        url: "https://github.com/nodemailer/nodemailer/issues"
      },
      homepage: "https://nodemailer.com/",
      devDependencies: {
        "@aws-sdk/client-ses": "3.180.0",
        "aws-sdk": "2.1225.0",
        bunyan: "1.8.15",
        chai: "4.3.6",
        "eslint-config-nodemailer": "1.2.0",
        "eslint-config-prettier": "8.5.0",
        grunt: "1.5.3",
        "grunt-cli": "1.4.3",
        "grunt-eslint": "24.0.0",
        "grunt-mocha-test": "0.13.3",
        libbase64: "1.2.1",
        libmime: "5.1.0",
        libqp: "1.1.0",
        mocha: "10.0.0",
        "nodemailer-ntlm-auth": "1.0.3",
        proxy: "1.0.2",
        "proxy-test-server": "1.0.0",
        sinon: "14.0.0",
        "smtp-server": "3.11.0"
      },
      engines: {
        node: ">=6.0.0"
      }
    };
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/fetch/index.js
var require_fetch = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/fetch/index.js"(exports, module) {
    "use strict";
    var http = __require("http");
    var https = __require("https");
    var urllib = __require("url");
    var zlib = __require("zlib");
    var PassThrough = __require("stream").PassThrough;
    var Cookies = require_cookies();
    var packageData = require_package();
    var MAX_REDIRECTS = 5;
    module.exports = function(url, options2) {
      return nmfetch(url, options2);
    };
    module.exports.Cookies = Cookies;
    function nmfetch(url, options2) {
      options2 = options2 || {};
      options2.fetchRes = options2.fetchRes || new PassThrough();
      options2.cookies = options2.cookies || new Cookies();
      options2.redirects = options2.redirects || 0;
      options2.maxRedirects = isNaN(options2.maxRedirects) ? MAX_REDIRECTS : options2.maxRedirects;
      if (options2.cookie) {
        [].concat(options2.cookie || []).forEach((cookie) => {
          options2.cookies.set(cookie, url);
        });
        options2.cookie = false;
      }
      let fetchRes = options2.fetchRes;
      let parsed = urllib.parse(url);
      let method = (options2.method || "").toString().trim().toUpperCase() || "GET";
      let finished = false;
      let cookies;
      let body;
      let handler = parsed.protocol === "https:" ? https : http;
      let headers = {
        "accept-encoding": "gzip,deflate",
        "user-agent": "nodemailer/" + packageData.version
      };
      Object.keys(options2.headers || {}).forEach((key2) => {
        headers[key2.toLowerCase().trim()] = options2.headers[key2];
      });
      if (options2.userAgent) {
        headers["user-agent"] = options2.userAgent;
      }
      if (parsed.auth) {
        headers.Authorization = "Basic " + Buffer.from(parsed.auth).toString("base64");
      }
      if (cookies = options2.cookies.get(url)) {
        headers.cookie = cookies;
      }
      if (options2.body) {
        if (options2.contentType !== false) {
          headers["Content-Type"] = options2.contentType || "application/x-www-form-urlencoded";
        }
        if (typeof options2.body.pipe === "function") {
          headers["Transfer-Encoding"] = "chunked";
          body = options2.body;
          body.on("error", (err2) => {
            if (finished) {
              return;
            }
            finished = true;
            err2.type = "FETCH";
            err2.sourceUrl = url;
            fetchRes.emit("error", err2);
          });
        } else {
          if (options2.body instanceof Buffer) {
            body = options2.body;
          } else if (typeof options2.body === "object") {
            try {
              body = Buffer.from(
                Object.keys(options2.body).map((key2) => {
                  let value = options2.body[key2].toString().trim();
                  return encodeURIComponent(key2) + "=" + encodeURIComponent(value);
                }).join("&")
              );
            } catch (E) {
              if (finished) {
                return;
              }
              finished = true;
              E.type = "FETCH";
              E.sourceUrl = url;
              fetchRes.emit("error", E);
              return;
            }
          } else {
            body = Buffer.from(options2.body.toString().trim());
          }
          headers["Content-Type"] = options2.contentType || "application/x-www-form-urlencoded";
          headers["Content-Length"] = body.length;
        }
        method = (options2.method || "").toString().trim().toUpperCase() || "POST";
      }
      let req;
      let reqOptions = {
        method,
        host: parsed.hostname,
        path: parsed.path,
        port: parsed.port ? parsed.port : parsed.protocol === "https:" ? 443 : 80,
        headers,
        rejectUnauthorized: false,
        agent: false
      };
      if (options2.tls) {
        Object.keys(options2.tls).forEach((key2) => {
          reqOptions[key2] = options2.tls[key2];
        });
      }
      try {
        req = handler.request(reqOptions);
      } catch (E) {
        finished = true;
        setImmediate(() => {
          E.type = "FETCH";
          E.sourceUrl = url;
          fetchRes.emit("error", E);
        });
        return fetchRes;
      }
      if (options2.timeout) {
        req.setTimeout(options2.timeout, () => {
          if (finished) {
            return;
          }
          finished = true;
          req.abort();
          let err2 = new Error("Request Timeout");
          err2.type = "FETCH";
          err2.sourceUrl = url;
          fetchRes.emit("error", err2);
        });
      }
      req.on("error", (err2) => {
        if (finished) {
          return;
        }
        finished = true;
        err2.type = "FETCH";
        err2.sourceUrl = url;
        fetchRes.emit("error", err2);
      });
      req.on("response", (res) => {
        let inflate;
        if (finished) {
          return;
        }
        switch (res.headers["content-encoding"]) {
          case "gzip":
          case "deflate":
            inflate = zlib.createUnzip();
            break;
        }
        if (res.headers["set-cookie"]) {
          [].concat(res.headers["set-cookie"] || []).forEach((cookie) => {
            options2.cookies.set(cookie, url);
          });
        }
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          options2.redirects++;
          if (options2.redirects > options2.maxRedirects) {
            finished = true;
            let err2 = new Error("Maximum redirect count exceeded");
            err2.type = "FETCH";
            err2.sourceUrl = url;
            fetchRes.emit("error", err2);
            req.abort();
            return;
          }
          options2.method = "GET";
          options2.body = false;
          return nmfetch(urllib.resolve(url, res.headers.location), options2);
        }
        fetchRes.statusCode = res.statusCode;
        fetchRes.headers = res.headers;
        if (res.statusCode >= 300 && !options2.allowErrorResponse) {
          finished = true;
          let err2 = new Error("Invalid status code " + res.statusCode);
          err2.type = "FETCH";
          err2.sourceUrl = url;
          fetchRes.emit("error", err2);
          req.abort();
          return;
        }
        res.on("error", (err2) => {
          if (finished) {
            return;
          }
          finished = true;
          err2.type = "FETCH";
          err2.sourceUrl = url;
          fetchRes.emit("error", err2);
          req.abort();
        });
        if (inflate) {
          res.pipe(inflate).pipe(fetchRes);
          inflate.on("error", (err2) => {
            if (finished) {
              return;
            }
            finished = true;
            err2.type = "FETCH";
            err2.sourceUrl = url;
            fetchRes.emit("error", err2);
            req.abort();
          });
        } else {
          res.pipe(fetchRes);
        }
      });
      setImmediate(() => {
        if (body) {
          try {
            if (typeof body.pipe === "function") {
              return body.pipe(req);
            } else {
              req.write(body);
            }
          } catch (err2) {
            finished = true;
            err2.type = "FETCH";
            err2.sourceUrl = url;
            fetchRes.emit("error", err2);
            return;
          }
        }
        req.end();
      });
      return fetchRes;
    }
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/shared/index.js
var require_shared = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/shared/index.js"(exports, module) {
    "use strict";
    var urllib = __require("url");
    var util2 = __require("util");
    var fs2 = __require("fs");
    var nmfetch = require_fetch();
    var dns = __require("dns");
    var net2 = __require("net");
    var os3 = __require("os");
    var DNS_TTL = 5 * 60 * 1e3;
    var networkInterfaces;
    try {
      networkInterfaces = os3.networkInterfaces();
    } catch (err2) {
    }
    module.exports.networkInterfaces = networkInterfaces;
    var isFamilySupported = (family, allowInternal) => {
      let networkInterfaces2 = module.exports.networkInterfaces;
      if (!networkInterfaces2) {
        return true;
      }
      const familySupported = Object.keys(networkInterfaces2).map((key2) => networkInterfaces2[key2]).reduce((acc, val2) => acc.concat(val2), []).filter((i) => !i.internal || allowInternal).filter((i) => i.family === "IPv" + family || i.family === family).length > 0;
      return familySupported;
    };
    var resolver = (family, hostname, options2, callback) => {
      options2 = options2 || {};
      const familySupported = isFamilySupported(family, options2.allowInternalNetworkInterfaces);
      if (!familySupported) {
        return callback(null, []);
      }
      const resolver2 = dns.Resolver ? new dns.Resolver(options2) : dns;
      resolver2["resolve" + family](hostname, (err2, addresses) => {
        if (err2) {
          switch (err2.code) {
            case dns.NODATA:
            case dns.NOTFOUND:
            case dns.NOTIMP:
            case dns.SERVFAIL:
            case dns.CONNREFUSED:
            case dns.REFUSED:
            case "EAI_AGAIN":
              return callback(null, []);
          }
          return callback(err2);
        }
        return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
      });
    };
    var dnsCache = module.exports.dnsCache = /* @__PURE__ */ new Map();
    var formatDNSValue = (value, extra) => {
      if (!value) {
        return Object.assign({}, extra || {});
      }
      return Object.assign(
        {
          servername: value.servername,
          host: !value.addresses || !value.addresses.length ? null : value.addresses.length === 1 ? value.addresses[0] : value.addresses[Math.floor(Math.random() * value.addresses.length)]
        },
        extra || {}
      );
    };
    module.exports.resolveHostname = (options2, callback) => {
      options2 = options2 || {};
      if (!options2.host && options2.servername) {
        options2.host = options2.servername;
      }
      if (!options2.host || net2.isIP(options2.host)) {
        let value = {
          addresses: [options2.host],
          servername: options2.servername || false
        };
        return callback(
          null,
          formatDNSValue(value, {
            cached: false
          })
        );
      }
      let cached;
      if (dnsCache.has(options2.host)) {
        cached = dnsCache.get(options2.host);
        if (!cached.expires || cached.expires >= Date.now()) {
          return callback(
            null,
            formatDNSValue(cached.value, {
              cached: true
            })
          );
        }
      }
      resolver(4, options2.host, options2, (err2, addresses) => {
        if (err2) {
          if (cached) {
            return callback(
              null,
              formatDNSValue(cached.value, {
                cached: true,
                error: err2
              })
            );
          }
          return callback(err2);
        }
        if (addresses && addresses.length) {
          let value = {
            addresses,
            servername: options2.servername || options2.host
          };
          dnsCache.set(options2.host, {
            value,
            expires: Date.now() + (options2.dnsTtl || DNS_TTL)
          });
          return callback(
            null,
            formatDNSValue(value, {
              cached: false
            })
          );
        }
        resolver(6, options2.host, options2, (err3, addresses2) => {
          if (err3) {
            if (cached) {
              return callback(
                null,
                formatDNSValue(cached.value, {
                  cached: true,
                  error: err3
                })
              );
            }
            return callback(err3);
          }
          if (addresses2 && addresses2.length) {
            let value = {
              addresses: addresses2,
              servername: options2.servername || options2.host
            };
            dnsCache.set(options2.host, {
              value,
              expires: Date.now() + (options2.dnsTtl || DNS_TTL)
            });
            return callback(
              null,
              formatDNSValue(value, {
                cached: false
              })
            );
          }
          try {
            dns.lookup(options2.host, { all: true }, (err4, addresses3) => {
              if (err4) {
                if (cached) {
                  return callback(
                    null,
                    formatDNSValue(cached.value, {
                      cached: true,
                      error: err4
                    })
                  );
                }
                return callback(err4);
              }
              let address = addresses3 ? addresses3.filter((addr) => isFamilySupported(addr.family)).map((addr) => addr.address).shift() : false;
              if (addresses3 && addresses3.length && !address) {
                let err5 = new Error(`Can not use IPv${addresses3[0].family} addresses with current network`);
                return callback(err5);
              }
              if (!address && cached) {
                return callback(
                  null,
                  formatDNSValue(cached.value, {
                    cached: true
                  })
                );
              }
              let value = {
                addresses: address ? [address] : [options2.host],
                servername: options2.servername || options2.host
              };
              dnsCache.set(options2.host, {
                value,
                expires: Date.now() + (options2.dnsTtl || DNS_TTL)
              });
              return callback(
                null,
                formatDNSValue(value, {
                  cached: false
                })
              );
            });
          } catch (err4) {
            if (cached) {
              return callback(
                null,
                formatDNSValue(cached.value, {
                  cached: true,
                  error: err4
                })
              );
            }
            return callback(err4);
          }
        });
      });
    };
    module.exports.parseConnectionUrl = (str) => {
      str = str || "";
      let options2 = {};
      [urllib.parse(str, true)].forEach((url) => {
        let auth;
        switch (url.protocol) {
          case "smtp:":
            options2.secure = false;
            break;
          case "smtps:":
            options2.secure = true;
            break;
          case "direct:":
            options2.direct = true;
            break;
        }
        if (!isNaN(url.port) && Number(url.port)) {
          options2.port = Number(url.port);
        }
        if (url.hostname) {
          options2.host = url.hostname;
        }
        if (url.auth) {
          auth = url.auth.split(":");
          if (!options2.auth) {
            options2.auth = {};
          }
          options2.auth.user = auth.shift();
          options2.auth.pass = auth.join(":");
        }
        Object.keys(url.query || {}).forEach((key2) => {
          let obj = options2;
          let lKey = key2;
          let value = url.query[key2];
          if (!isNaN(value)) {
            value = Number(value);
          }
          switch (value) {
            case "true":
              value = true;
              break;
            case "false":
              value = false;
              break;
          }
          if (key2.indexOf("tls.") === 0) {
            lKey = key2.substr(4);
            if (!options2.tls) {
              options2.tls = {};
            }
            obj = options2.tls;
          } else if (key2.indexOf(".") >= 0) {
            return;
          }
          if (!(lKey in obj)) {
            obj[lKey] = value;
          }
        });
      });
      return options2;
    };
    module.exports._logFunc = (logger, level, defaults2, data, message, ...args) => {
      let entry = {};
      Object.keys(defaults2 || {}).forEach((key2) => {
        if (key2 !== "level") {
          entry[key2] = defaults2[key2];
        }
      });
      Object.keys(data || {}).forEach((key2) => {
        if (key2 !== "level") {
          entry[key2] = data[key2];
        }
      });
      logger[level](entry, message, ...args);
    };
    module.exports.getLogger = (options2, defaults2) => {
      options2 = options2 || {};
      let response = {};
      let levels = ["trace", "debug", "info", "warn", "error", "fatal"];
      if (!options2.logger) {
        levels.forEach((level) => {
          response[level] = () => false;
        });
        return response;
      }
      let logger = options2.logger;
      if (options2.logger === true) {
        logger = createDefaultLogger(levels);
      }
      levels.forEach((level) => {
        response[level] = (data, message, ...args) => {
          module.exports._logFunc(logger, level, defaults2, data, message, ...args);
        };
      });
      return response;
    };
    module.exports.callbackPromise = (resolve, reject) => function() {
      let args = Array.from(arguments);
      let err2 = args.shift();
      if (err2) {
        reject(err2);
      } else {
        resolve(...args);
      }
    };
    module.exports.resolveContent = (data, key2, callback) => {
      let promise;
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = module.exports.callbackPromise(resolve, reject);
        });
      }
      let content = data && data[key2] && data[key2].content || data[key2];
      let contentStream;
      let encoding = (typeof data[key2] === "object" && data[key2].encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
      if (!content) {
        return callback(null, content);
      }
      if (typeof content === "object") {
        if (typeof content.pipe === "function") {
          return resolveStream(content, (err2, value) => {
            if (err2) {
              return callback(err2);
            }
            if (data[key2].content) {
              data[key2].content = value;
            } else {
              data[key2] = value;
            }
            callback(null, value);
          });
        } else if (/^https?:\/\//i.test(content.path || content.href)) {
          contentStream = nmfetch(content.path || content.href);
          return resolveStream(contentStream, callback);
        } else if (/^data:/i.test(content.path || content.href)) {
          let parts = (content.path || content.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
          if (!parts) {
            return callback(null, Buffer.from(0));
          }
          return callback(null, /\bbase64$/i.test(parts[1]) ? Buffer.from(parts[2], "base64") : Buffer.from(decodeURIComponent(parts[2])));
        } else if (content.path) {
          return resolveStream(fs2.createReadStream(content.path), callback);
        }
      }
      if (typeof data[key2].content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
        content = Buffer.from(data[key2].content, encoding);
      }
      setImmediate(() => callback(null, content));
      return promise;
    };
    module.exports.assign = function() {
      let args = Array.from(arguments);
      let target2 = args.shift() || {};
      args.forEach((source) => {
        Object.keys(source || {}).forEach((key2) => {
          if (["tls", "auth"].includes(key2) && source[key2] && typeof source[key2] === "object") {
            if (!target2[key2]) {
              target2[key2] = {};
            }
            Object.keys(source[key2]).forEach((subKey) => {
              target2[key2][subKey] = source[key2][subKey];
            });
          } else {
            target2[key2] = source[key2];
          }
        });
      });
      return target2;
    };
    module.exports.encodeXText = (str) => {
      if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
        return str;
      }
      let buf = Buffer.from(str);
      let result = "";
      for (let i = 0, len = buf.length; i < len; i++) {
        let c = buf[i];
        if (c < 33 || c > 126 || c === 43 || c === 61) {
          result += "+" + (c < 16 ? "0" : "") + c.toString(16).toUpperCase();
        } else {
          result += String.fromCharCode(c);
        }
      }
      return result;
    };
    function resolveStream(stream, callback) {
      let responded = false;
      let chunks = [];
      let chunklen = 0;
      stream.on("error", (err2) => {
        if (responded) {
          return;
        }
        responded = true;
        callback(err2);
      });
      stream.on("readable", () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      stream.on("end", () => {
        if (responded) {
          return;
        }
        responded = true;
        let value;
        try {
          value = Buffer.concat(chunks, chunklen);
        } catch (E) {
          return callback(E);
        }
        callback(null, value);
      });
    }
    function createDefaultLogger(levels) {
      let levelMaxLen = 0;
      let levelNames = /* @__PURE__ */ new Map();
      levels.forEach((level) => {
        if (level.length > levelMaxLen) {
          levelMaxLen = level.length;
        }
      });
      levels.forEach((level) => {
        let levelName = level.toUpperCase();
        if (levelName.length < levelMaxLen) {
          levelName += " ".repeat(levelMaxLen - levelName.length);
        }
        levelNames.set(level, levelName);
      });
      let print = (level, entry, message, ...args) => {
        let prefix = "";
        if (entry) {
          if (entry.tnx === "server") {
            prefix = "S: ";
          } else if (entry.tnx === "client") {
            prefix = "C: ";
          }
          if (entry.sid) {
            prefix = "[" + entry.sid + "] " + prefix;
          }
          if (entry.cid) {
            prefix = "[#" + entry.cid + "] " + prefix;
          }
        }
        message = util2.format(message, ...args);
        message.split(/\r?\n/).forEach((line) => {
          console.log("[%s] %s %s", new Date().toISOString().substr(0, 19).replace(/T/, " "), levelNames.get(level), prefix + line);
        });
      };
      let logger = {};
      levels.forEach((level) => {
        logger[level] = print.bind(null, level);
      });
      return logger;
    }
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-funcs/mime-types.js
var require_mime_types = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-funcs/mime-types.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var defaultMimeType = "application/octet-stream";
    var defaultExtension = "bin";
    var mimeTypes = /* @__PURE__ */ new Map([
      ["application/acad", "dwg"],
      ["application/applixware", "aw"],
      ["application/arj", "arj"],
      ["application/atom+xml", "xml"],
      ["application/atomcat+xml", "atomcat"],
      ["application/atomsvc+xml", "atomsvc"],
      ["application/base64", ["mm", "mme"]],
      ["application/binhex", "hqx"],
      ["application/binhex4", "hqx"],
      ["application/book", ["book", "boo"]],
      ["application/ccxml+xml,", "ccxml"],
      ["application/cdf", "cdf"],
      ["application/cdmi-capability", "cdmia"],
      ["application/cdmi-container", "cdmic"],
      ["application/cdmi-domain", "cdmid"],
      ["application/cdmi-object", "cdmio"],
      ["application/cdmi-queue", "cdmiq"],
      ["application/clariscad", "ccad"],
      ["application/commonground", "dp"],
      ["application/cu-seeme", "cu"],
      ["application/davmount+xml", "davmount"],
      ["application/drafting", "drw"],
      ["application/dsptype", "tsp"],
      ["application/dssc+der", "dssc"],
      ["application/dssc+xml", "xdssc"],
      ["application/dxf", "dxf"],
      ["application/ecmascript", ["js", "es"]],
      ["application/emma+xml", "emma"],
      ["application/envoy", "evy"],
      ["application/epub+zip", "epub"],
      ["application/excel", ["xls", "xl", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
      ["application/exi", "exi"],
      ["application/font-tdpfr", "pfr"],
      ["application/fractals", "fif"],
      ["application/freeloader", "frl"],
      ["application/futuresplash", "spl"],
      ["application/gnutar", "tgz"],
      ["application/groupwise", "vew"],
      ["application/hlp", "hlp"],
      ["application/hta", "hta"],
      ["application/hyperstudio", "stk"],
      ["application/i-deas", "unv"],
      ["application/iges", ["iges", "igs"]],
      ["application/inf", "inf"],
      ["application/internet-property-stream", "acx"],
      ["application/ipfix", "ipfix"],
      ["application/java", "class"],
      ["application/java-archive", "jar"],
      ["application/java-byte-code", "class"],
      ["application/java-serialized-object", "ser"],
      ["application/java-vm", "class"],
      ["application/javascript", "js"],
      ["application/json", "json"],
      ["application/lha", "lha"],
      ["application/lzx", "lzx"],
      ["application/mac-binary", "bin"],
      ["application/mac-binhex", "hqx"],
      ["application/mac-binhex40", "hqx"],
      ["application/mac-compactpro", "cpt"],
      ["application/macbinary", "bin"],
      ["application/mads+xml", "mads"],
      ["application/marc", "mrc"],
      ["application/marcxml+xml", "mrcx"],
      ["application/mathematica", "ma"],
      ["application/mathml+xml", "mathml"],
      ["application/mbedlet", "mbd"],
      ["application/mbox", "mbox"],
      ["application/mcad", "mcd"],
      ["application/mediaservercontrol+xml", "mscml"],
      ["application/metalink4+xml", "meta4"],
      ["application/mets+xml", "mets"],
      ["application/mime", "aps"],
      ["application/mods+xml", "mods"],
      ["application/mp21", "m21"],
      ["application/mp4", "mp4"],
      ["application/mspowerpoint", ["ppt", "pot", "pps", "ppz"]],
      ["application/msword", ["doc", "dot", "w6w", "wiz", "word"]],
      ["application/mswrite", "wri"],
      ["application/mxf", "mxf"],
      ["application/netmc", "mcp"],
      ["application/octet-stream", ["*"]],
      ["application/oda", "oda"],
      ["application/oebps-package+xml", "opf"],
      ["application/ogg", "ogx"],
      ["application/olescript", "axs"],
      ["application/onenote", "onetoc"],
      ["application/patch-ops-error+xml", "xer"],
      ["application/pdf", "pdf"],
      ["application/pgp-encrypted", "asc"],
      ["application/pgp-signature", "pgp"],
      ["application/pics-rules", "prf"],
      ["application/pkcs-12", "p12"],
      ["application/pkcs-crl", "crl"],
      ["application/pkcs10", "p10"],
      ["application/pkcs7-mime", ["p7c", "p7m"]],
      ["application/pkcs7-signature", "p7s"],
      ["application/pkcs8", "p8"],
      ["application/pkix-attr-cert", "ac"],
      ["application/pkix-cert", ["cer", "crt"]],
      ["application/pkix-crl", "crl"],
      ["application/pkix-pkipath", "pkipath"],
      ["application/pkixcmp", "pki"],
      ["application/plain", "text"],
      ["application/pls+xml", "pls"],
      ["application/postscript", ["ps", "ai", "eps"]],
      ["application/powerpoint", "ppt"],
      ["application/pro_eng", ["part", "prt"]],
      ["application/prs.cww", "cww"],
      ["application/pskc+xml", "pskcxml"],
      ["application/rdf+xml", "rdf"],
      ["application/reginfo+xml", "rif"],
      ["application/relax-ng-compact-syntax", "rnc"],
      ["application/resource-lists+xml", "rl"],
      ["application/resource-lists-diff+xml", "rld"],
      ["application/ringing-tones", "rng"],
      ["application/rls-services+xml", "rs"],
      ["application/rsd+xml", "rsd"],
      ["application/rss+xml", "xml"],
      ["application/rtf", ["rtf", "rtx"]],
      ["application/sbml+xml", "sbml"],
      ["application/scvp-cv-request", "scq"],
      ["application/scvp-cv-response", "scs"],
      ["application/scvp-vp-request", "spq"],
      ["application/scvp-vp-response", "spp"],
      ["application/sdp", "sdp"],
      ["application/sea", "sea"],
      ["application/set", "set"],
      ["application/set-payment-initiation", "setpay"],
      ["application/set-registration-initiation", "setreg"],
      ["application/shf+xml", "shf"],
      ["application/sla", "stl"],
      ["application/smil", ["smi", "smil"]],
      ["application/smil+xml", "smi"],
      ["application/solids", "sol"],
      ["application/sounder", "sdr"],
      ["application/sparql-query", "rq"],
      ["application/sparql-results+xml", "srx"],
      ["application/srgs", "gram"],
      ["application/srgs+xml", "grxml"],
      ["application/sru+xml", "sru"],
      ["application/ssml+xml", "ssml"],
      ["application/step", ["step", "stp"]],
      ["application/streamingmedia", "ssm"],
      ["application/tei+xml", "tei"],
      ["application/thraud+xml", "tfi"],
      ["application/timestamped-data", "tsd"],
      ["application/toolbook", "tbk"],
      ["application/vda", "vda"],
      ["application/vnd.3gpp.pic-bw-large", "plb"],
      ["application/vnd.3gpp.pic-bw-small", "psb"],
      ["application/vnd.3gpp.pic-bw-var", "pvb"],
      ["application/vnd.3gpp2.tcap", "tcap"],
      ["application/vnd.3m.post-it-notes", "pwn"],
      ["application/vnd.accpac.simply.aso", "aso"],
      ["application/vnd.accpac.simply.imp", "imp"],
      ["application/vnd.acucobol", "acu"],
      ["application/vnd.acucorp", "atc"],
      ["application/vnd.adobe.air-application-installer-package+zip", "air"],
      ["application/vnd.adobe.fxp", "fxp"],
      ["application/vnd.adobe.xdp+xml", "xdp"],
      ["application/vnd.adobe.xfdf", "xfdf"],
      ["application/vnd.ahead.space", "ahead"],
      ["application/vnd.airzip.filesecure.azf", "azf"],
      ["application/vnd.airzip.filesecure.azs", "azs"],
      ["application/vnd.amazon.ebook", "azw"],
      ["application/vnd.americandynamics.acc", "acc"],
      ["application/vnd.amiga.ami", "ami"],
      ["application/vnd.android.package-archive", "apk"],
      ["application/vnd.anser-web-certificate-issue-initiation", "cii"],
      ["application/vnd.anser-web-funds-transfer-initiation", "fti"],
      ["application/vnd.antix.game-component", "atx"],
      ["application/vnd.apple.installer+xml", "mpkg"],
      ["application/vnd.apple.mpegurl", "m3u8"],
      ["application/vnd.aristanetworks.swi", "swi"],
      ["application/vnd.audiograph", "aep"],
      ["application/vnd.blueice.multipass", "mpm"],
      ["application/vnd.bmi", "bmi"],
      ["application/vnd.businessobjects", "rep"],
      ["application/vnd.chemdraw+xml", "cdxml"],
      ["application/vnd.chipnuts.karaoke-mmd", "mmd"],
      ["application/vnd.cinderella", "cdy"],
      ["application/vnd.claymore", "cla"],
      ["application/vnd.cloanto.rp9", "rp9"],
      ["application/vnd.clonk.c4group", "c4g"],
      ["application/vnd.cluetrust.cartomobile-config", "c11amc"],
      ["application/vnd.cluetrust.cartomobile-config-pkg", "c11amz"],
      ["application/vnd.commonspace", "csp"],
      ["application/vnd.contact.cmsg", "cdbcmsg"],
      ["application/vnd.cosmocaller", "cmc"],
      ["application/vnd.crick.clicker", "clkx"],
      ["application/vnd.crick.clicker.keyboard", "clkk"],
      ["application/vnd.crick.clicker.palette", "clkp"],
      ["application/vnd.crick.clicker.template", "clkt"],
      ["application/vnd.crick.clicker.wordbank", "clkw"],
      ["application/vnd.criticaltools.wbs+xml", "wbs"],
      ["application/vnd.ctc-posml", "pml"],
      ["application/vnd.cups-ppd", "ppd"],
      ["application/vnd.curl.car", "car"],
      ["application/vnd.curl.pcurl", "pcurl"],
      ["application/vnd.data-vision.rdz", "rdz"],
      ["application/vnd.denovo.fcselayout-link", "fe_launch"],
      ["application/vnd.dna", "dna"],
      ["application/vnd.dolby.mlp", "mlp"],
      ["application/vnd.dpgraph", "dpg"],
      ["application/vnd.dreamfactory", "dfac"],
      ["application/vnd.dvb.ait", "ait"],
      ["application/vnd.dvb.service", "svc"],
      ["application/vnd.dynageo", "geo"],
      ["application/vnd.ecowin.chart", "mag"],
      ["application/vnd.enliven", "nml"],
      ["application/vnd.epson.esf", "esf"],
      ["application/vnd.epson.msf", "msf"],
      ["application/vnd.epson.quickanime", "qam"],
      ["application/vnd.epson.salt", "slt"],
      ["application/vnd.epson.ssf", "ssf"],
      ["application/vnd.eszigno3+xml", "es3"],
      ["application/vnd.ezpix-album", "ez2"],
      ["application/vnd.ezpix-package", "ez3"],
      ["application/vnd.fdf", "fdf"],
      ["application/vnd.fdsn.seed", "seed"],
      ["application/vnd.flographit", "gph"],
      ["application/vnd.fluxtime.clip", "ftc"],
      ["application/vnd.framemaker", "fm"],
      ["application/vnd.frogans.fnc", "fnc"],
      ["application/vnd.frogans.ltf", "ltf"],
      ["application/vnd.fsc.weblaunch", "fsc"],
      ["application/vnd.fujitsu.oasys", "oas"],
      ["application/vnd.fujitsu.oasys2", "oa2"],
      ["application/vnd.fujitsu.oasys3", "oa3"],
      ["application/vnd.fujitsu.oasysgp", "fg5"],
      ["application/vnd.fujitsu.oasysprs", "bh2"],
      ["application/vnd.fujixerox.ddd", "ddd"],
      ["application/vnd.fujixerox.docuworks", "xdw"],
      ["application/vnd.fujixerox.docuworks.binder", "xbd"],
      ["application/vnd.fuzzysheet", "fzs"],
      ["application/vnd.genomatix.tuxedo", "txd"],
      ["application/vnd.geogebra.file", "ggb"],
      ["application/vnd.geogebra.tool", "ggt"],
      ["application/vnd.geometry-explorer", "gex"],
      ["application/vnd.geonext", "gxt"],
      ["application/vnd.geoplan", "g2w"],
      ["application/vnd.geospace", "g3w"],
      ["application/vnd.gmx", "gmx"],
      ["application/vnd.google-earth.kml+xml", "kml"],
      ["application/vnd.google-earth.kmz", "kmz"],
      ["application/vnd.grafeq", "gqf"],
      ["application/vnd.groove-account", "gac"],
      ["application/vnd.groove-help", "ghf"],
      ["application/vnd.groove-identity-message", "gim"],
      ["application/vnd.groove-injector", "grv"],
      ["application/vnd.groove-tool-message", "gtm"],
      ["application/vnd.groove-tool-template", "tpl"],
      ["application/vnd.groove-vcard", "vcg"],
      ["application/vnd.hal+xml", "hal"],
      ["application/vnd.handheld-entertainment+xml", "zmm"],
      ["application/vnd.hbci", "hbci"],
      ["application/vnd.hhe.lesson-player", "les"],
      ["application/vnd.hp-hpgl", ["hgl", "hpg", "hpgl"]],
      ["application/vnd.hp-hpid", "hpid"],
      ["application/vnd.hp-hps", "hps"],
      ["application/vnd.hp-jlyt", "jlt"],
      ["application/vnd.hp-pcl", "pcl"],
      ["application/vnd.hp-pclxl", "pclxl"],
      ["application/vnd.hydrostatix.sof-data", "sfd-hdstx"],
      ["application/vnd.hzn-3d-crossword", "x3d"],
      ["application/vnd.ibm.minipay", "mpy"],
      ["application/vnd.ibm.modcap", "afp"],
      ["application/vnd.ibm.rights-management", "irm"],
      ["application/vnd.ibm.secure-container", "sc"],
      ["application/vnd.iccprofile", "icc"],
      ["application/vnd.igloader", "igl"],
      ["application/vnd.immervision-ivp", "ivp"],
      ["application/vnd.immervision-ivu", "ivu"],
      ["application/vnd.insors.igm", "igm"],
      ["application/vnd.intercon.formnet", "xpw"],
      ["application/vnd.intergeo", "i2g"],
      ["application/vnd.intu.qbo", "qbo"],
      ["application/vnd.intu.qfx", "qfx"],
      ["application/vnd.ipunplugged.rcprofile", "rcprofile"],
      ["application/vnd.irepository.package+xml", "irp"],
      ["application/vnd.is-xpr", "xpr"],
      ["application/vnd.isac.fcs", "fcs"],
      ["application/vnd.jam", "jam"],
      ["application/vnd.jcp.javame.midlet-rms", "rms"],
      ["application/vnd.jisp", "jisp"],
      ["application/vnd.joost.joda-archive", "joda"],
      ["application/vnd.kahootz", "ktz"],
      ["application/vnd.kde.karbon", "karbon"],
      ["application/vnd.kde.kchart", "chrt"],
      ["application/vnd.kde.kformula", "kfo"],
      ["application/vnd.kde.kivio", "flw"],
      ["application/vnd.kde.kontour", "kon"],
      ["application/vnd.kde.kpresenter", "kpr"],
      ["application/vnd.kde.kspread", "ksp"],
      ["application/vnd.kde.kword", "kwd"],
      ["application/vnd.kenameaapp", "htke"],
      ["application/vnd.kidspiration", "kia"],
      ["application/vnd.kinar", "kne"],
      ["application/vnd.koan", "skp"],
      ["application/vnd.kodak-descriptor", "sse"],
      ["application/vnd.las.las+xml", "lasxml"],
      ["application/vnd.llamagraphics.life-balance.desktop", "lbd"],
      ["application/vnd.llamagraphics.life-balance.exchange+xml", "lbe"],
      ["application/vnd.lotus-1-2-3", "123"],
      ["application/vnd.lotus-approach", "apr"],
      ["application/vnd.lotus-freelance", "pre"],
      ["application/vnd.lotus-notes", "nsf"],
      ["application/vnd.lotus-organizer", "org"],
      ["application/vnd.lotus-screencam", "scm"],
      ["application/vnd.lotus-wordpro", "lwp"],
      ["application/vnd.macports.portpkg", "portpkg"],
      ["application/vnd.mcd", "mcd"],
      ["application/vnd.medcalcdata", "mc1"],
      ["application/vnd.mediastation.cdkey", "cdkey"],
      ["application/vnd.mfer", "mwf"],
      ["application/vnd.mfmp", "mfm"],
      ["application/vnd.micrografx.flo", "flo"],
      ["application/vnd.micrografx.igx", "igx"],
      ["application/vnd.mif", "mif"],
      ["application/vnd.mobius.daf", "daf"],
      ["application/vnd.mobius.dis", "dis"],
      ["application/vnd.mobius.mbk", "mbk"],
      ["application/vnd.mobius.mqy", "mqy"],
      ["application/vnd.mobius.msl", "msl"],
      ["application/vnd.mobius.plc", "plc"],
      ["application/vnd.mobius.txf", "txf"],
      ["application/vnd.mophun.application", "mpn"],
      ["application/vnd.mophun.certificate", "mpc"],
      ["application/vnd.mozilla.xul+xml", "xul"],
      ["application/vnd.ms-artgalry", "cil"],
      ["application/vnd.ms-cab-compressed", "cab"],
      ["application/vnd.ms-excel", ["xls", "xla", "xlc", "xlm", "xlt", "xlw", "xlb", "xll"]],
      ["application/vnd.ms-excel.addin.macroenabled.12", "xlam"],
      ["application/vnd.ms-excel.sheet.binary.macroenabled.12", "xlsb"],
      ["application/vnd.ms-excel.sheet.macroenabled.12", "xlsm"],
      ["application/vnd.ms-excel.template.macroenabled.12", "xltm"],
      ["application/vnd.ms-fontobject", "eot"],
      ["application/vnd.ms-htmlhelp", "chm"],
      ["application/vnd.ms-ims", "ims"],
      ["application/vnd.ms-lrm", "lrm"],
      ["application/vnd.ms-officetheme", "thmx"],
      ["application/vnd.ms-outlook", "msg"],
      ["application/vnd.ms-pki.certstore", "sst"],
      ["application/vnd.ms-pki.pko", "pko"],
      ["application/vnd.ms-pki.seccat", "cat"],
      ["application/vnd.ms-pki.stl", "stl"],
      ["application/vnd.ms-pkicertstore", "sst"],
      ["application/vnd.ms-pkiseccat", "cat"],
      ["application/vnd.ms-pkistl", "stl"],
      ["application/vnd.ms-powerpoint", ["ppt", "pot", "pps", "ppa", "pwz"]],
      ["application/vnd.ms-powerpoint.addin.macroenabled.12", "ppam"],
      ["application/vnd.ms-powerpoint.presentation.macroenabled.12", "pptm"],
      ["application/vnd.ms-powerpoint.slide.macroenabled.12", "sldm"],
      ["application/vnd.ms-powerpoint.slideshow.macroenabled.12", "ppsm"],
      ["application/vnd.ms-powerpoint.template.macroenabled.12", "potm"],
      ["application/vnd.ms-project", "mpp"],
      ["application/vnd.ms-word.document.macroenabled.12", "docm"],
      ["application/vnd.ms-word.template.macroenabled.12", "dotm"],
      ["application/vnd.ms-works", ["wks", "wcm", "wdb", "wps"]],
      ["application/vnd.ms-wpl", "wpl"],
      ["application/vnd.ms-xpsdocument", "xps"],
      ["application/vnd.mseq", "mseq"],
      ["application/vnd.musician", "mus"],
      ["application/vnd.muvee.style", "msty"],
      ["application/vnd.neurolanguage.nlu", "nlu"],
      ["application/vnd.noblenet-directory", "nnd"],
      ["application/vnd.noblenet-sealer", "nns"],
      ["application/vnd.noblenet-web", "nnw"],
      ["application/vnd.nokia.configuration-message", "ncm"],
      ["application/vnd.nokia.n-gage.data", "ngdat"],
      ["application/vnd.nokia.n-gage.symbian.install", "n-gage"],
      ["application/vnd.nokia.radio-preset", "rpst"],
      ["application/vnd.nokia.radio-presets", "rpss"],
      ["application/vnd.nokia.ringing-tone", "rng"],
      ["application/vnd.novadigm.edm", "edm"],
      ["application/vnd.novadigm.edx", "edx"],
      ["application/vnd.novadigm.ext", "ext"],
      ["application/vnd.oasis.opendocument.chart", "odc"],
      ["application/vnd.oasis.opendocument.chart-template", "otc"],
      ["application/vnd.oasis.opendocument.database", "odb"],
      ["application/vnd.oasis.opendocument.formula", "odf"],
      ["application/vnd.oasis.opendocument.formula-template", "odft"],
      ["application/vnd.oasis.opendocument.graphics", "odg"],
      ["application/vnd.oasis.opendocument.graphics-template", "otg"],
      ["application/vnd.oasis.opendocument.image", "odi"],
      ["application/vnd.oasis.opendocument.image-template", "oti"],
      ["application/vnd.oasis.opendocument.presentation", "odp"],
      ["application/vnd.oasis.opendocument.presentation-template", "otp"],
      ["application/vnd.oasis.opendocument.spreadsheet", "ods"],
      ["application/vnd.oasis.opendocument.spreadsheet-template", "ots"],
      ["application/vnd.oasis.opendocument.text", "odt"],
      ["application/vnd.oasis.opendocument.text-master", "odm"],
      ["application/vnd.oasis.opendocument.text-template", "ott"],
      ["application/vnd.oasis.opendocument.text-web", "oth"],
      ["application/vnd.olpc-sugar", "xo"],
      ["application/vnd.oma.dd2+xml", "dd2"],
      ["application/vnd.openofficeorg.extension", "oxt"],
      ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.slide", "sldx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.slideshow", "ppsx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.template", "potx"],
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.template", "xltx"],
      ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
      ["application/vnd.openxmlformats-officedocument.wordprocessingml.template", "dotx"],
      ["application/vnd.osgeo.mapguide.package", "mgp"],
      ["application/vnd.osgi.dp", "dp"],
      ["application/vnd.palm", "pdb"],
      ["application/vnd.pawaafile", "paw"],
      ["application/vnd.pg.format", "str"],
      ["application/vnd.pg.osasli", "ei6"],
      ["application/vnd.picsel", "efif"],
      ["application/vnd.pmi.widget", "wg"],
      ["application/vnd.pocketlearn", "plf"],
      ["application/vnd.powerbuilder6", "pbd"],
      ["application/vnd.previewsystems.box", "box"],
      ["application/vnd.proteus.magazine", "mgz"],
      ["application/vnd.publishare-delta-tree", "qps"],
      ["application/vnd.pvi.ptid1", "ptid"],
      ["application/vnd.quark.quarkxpress", "qxd"],
      ["application/vnd.realvnc.bed", "bed"],
      ["application/vnd.recordare.musicxml", "mxl"],
      ["application/vnd.recordare.musicxml+xml", "musicxml"],
      ["application/vnd.rig.cryptonote", "cryptonote"],
      ["application/vnd.rim.cod", "cod"],
      ["application/vnd.rn-realmedia", "rm"],
      ["application/vnd.rn-realplayer", "rnx"],
      ["application/vnd.route66.link66+xml", "link66"],
      ["application/vnd.sailingtracker.track", "st"],
      ["application/vnd.seemail", "see"],
      ["application/vnd.sema", "sema"],
      ["application/vnd.semd", "semd"],
      ["application/vnd.semf", "semf"],
      ["application/vnd.shana.informed.formdata", "ifm"],
      ["application/vnd.shana.informed.formtemplate", "itp"],
      ["application/vnd.shana.informed.interchange", "iif"],
      ["application/vnd.shana.informed.package", "ipk"],
      ["application/vnd.simtech-mindmapper", "twd"],
      ["application/vnd.smaf", "mmf"],
      ["application/vnd.smart.teacher", "teacher"],
      ["application/vnd.solent.sdkm+xml", "sdkm"],
      ["application/vnd.spotfire.dxp", "dxp"],
      ["application/vnd.spotfire.sfs", "sfs"],
      ["application/vnd.stardivision.calc", "sdc"],
      ["application/vnd.stardivision.draw", "sda"],
      ["application/vnd.stardivision.impress", "sdd"],
      ["application/vnd.stardivision.math", "smf"],
      ["application/vnd.stardivision.writer", "sdw"],
      ["application/vnd.stardivision.writer-global", "sgl"],
      ["application/vnd.stepmania.stepchart", "sm"],
      ["application/vnd.sun.xml.calc", "sxc"],
      ["application/vnd.sun.xml.calc.template", "stc"],
      ["application/vnd.sun.xml.draw", "sxd"],
      ["application/vnd.sun.xml.draw.template", "std"],
      ["application/vnd.sun.xml.impress", "sxi"],
      ["application/vnd.sun.xml.impress.template", "sti"],
      ["application/vnd.sun.xml.math", "sxm"],
      ["application/vnd.sun.xml.writer", "sxw"],
      ["application/vnd.sun.xml.writer.global", "sxg"],
      ["application/vnd.sun.xml.writer.template", "stw"],
      ["application/vnd.sus-calendar", "sus"],
      ["application/vnd.svd", "svd"],
      ["application/vnd.symbian.install", "sis"],
      ["application/vnd.syncml+xml", "xsm"],
      ["application/vnd.syncml.dm+wbxml", "bdm"],
      ["application/vnd.syncml.dm+xml", "xdm"],
      ["application/vnd.tao.intent-module-archive", "tao"],
      ["application/vnd.tmobile-livetv", "tmo"],
      ["application/vnd.trid.tpt", "tpt"],
      ["application/vnd.triscape.mxs", "mxs"],
      ["application/vnd.trueapp", "tra"],
      ["application/vnd.ufdl", "ufd"],
      ["application/vnd.uiq.theme", "utz"],
      ["application/vnd.umajin", "umj"],
      ["application/vnd.unity", "unityweb"],
      ["application/vnd.uoml+xml", "uoml"],
      ["application/vnd.vcx", "vcx"],
      ["application/vnd.visio", "vsd"],
      ["application/vnd.visionary", "vis"],
      ["application/vnd.vsf", "vsf"],
      ["application/vnd.wap.wbxml", "wbxml"],
      ["application/vnd.wap.wmlc", "wmlc"],
      ["application/vnd.wap.wmlscriptc", "wmlsc"],
      ["application/vnd.webturbo", "wtb"],
      ["application/vnd.wolfram.player", "nbp"],
      ["application/vnd.wordperfect", "wpd"],
      ["application/vnd.wqd", "wqd"],
      ["application/vnd.wt.stf", "stf"],
      ["application/vnd.xara", ["web", "xar"]],
      ["application/vnd.xfdl", "xfdl"],
      ["application/vnd.yamaha.hv-dic", "hvd"],
      ["application/vnd.yamaha.hv-script", "hvs"],
      ["application/vnd.yamaha.hv-voice", "hvp"],
      ["application/vnd.yamaha.openscoreformat", "osf"],
      ["application/vnd.yamaha.openscoreformat.osfpvg+xml", "osfpvg"],
      ["application/vnd.yamaha.smaf-audio", "saf"],
      ["application/vnd.yamaha.smaf-phrase", "spf"],
      ["application/vnd.yellowriver-custom-menu", "cmp"],
      ["application/vnd.zul", "zir"],
      ["application/vnd.zzazz.deck+xml", "zaz"],
      ["application/vocaltec-media-desc", "vmd"],
      ["application/vocaltec-media-file", "vmf"],
      ["application/voicexml+xml", "vxml"],
      ["application/widget", "wgt"],
      ["application/winhlp", "hlp"],
      ["application/wordperfect", ["wp", "wp5", "wp6", "wpd"]],
      ["application/wordperfect6.0", ["w60", "wp5"]],
      ["application/wordperfect6.1", "w61"],
      ["application/wsdl+xml", "wsdl"],
      ["application/wspolicy+xml", "wspolicy"],
      ["application/x-123", "wk1"],
      ["application/x-7z-compressed", "7z"],
      ["application/x-abiword", "abw"],
      ["application/x-ace-compressed", "ace"],
      ["application/x-aim", "aim"],
      ["application/x-authorware-bin", "aab"],
      ["application/x-authorware-map", "aam"],
      ["application/x-authorware-seg", "aas"],
      ["application/x-bcpio", "bcpio"],
      ["application/x-binary", "bin"],
      ["application/x-binhex40", "hqx"],
      ["application/x-bittorrent", "torrent"],
      ["application/x-bsh", ["bsh", "sh", "shar"]],
      ["application/x-bytecode.elisp", "elc"],
      ["application/x-bytecode.python", "pyc"],
      ["application/x-bzip", "bz"],
      ["application/x-bzip2", ["boz", "bz2"]],
      ["application/x-cdf", "cdf"],
      ["application/x-cdlink", "vcd"],
      ["application/x-chat", ["cha", "chat"]],
      ["application/x-chess-pgn", "pgn"],
      ["application/x-cmu-raster", "ras"],
      ["application/x-cocoa", "cco"],
      ["application/x-compactpro", "cpt"],
      ["application/x-compress", "z"],
      ["application/x-compressed", ["tgz", "gz", "z", "zip"]],
      ["application/x-conference", "nsc"],
      ["application/x-cpio", "cpio"],
      ["application/x-cpt", "cpt"],
      ["application/x-csh", "csh"],
      ["application/x-debian-package", "deb"],
      ["application/x-deepv", "deepv"],
      ["application/x-director", ["dir", "dcr", "dxr"]],
      ["application/x-doom", "wad"],
      ["application/x-dtbncx+xml", "ncx"],
      ["application/x-dtbook+xml", "dtb"],
      ["application/x-dtbresource+xml", "res"],
      ["application/x-dvi", "dvi"],
      ["application/x-elc", "elc"],
      ["application/x-envoy", ["env", "evy"]],
      ["application/x-esrehber", "es"],
      ["application/x-excel", ["xls", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
      ["application/x-font-bdf", "bdf"],
      ["application/x-font-ghostscript", "gsf"],
      ["application/x-font-linux-psf", "psf"],
      ["application/x-font-otf", "otf"],
      ["application/x-font-pcf", "pcf"],
      ["application/x-font-snf", "snf"],
      ["application/x-font-ttf", "ttf"],
      ["application/x-font-type1", "pfa"],
      ["application/x-font-woff", "woff"],
      ["application/x-frame", "mif"],
      ["application/x-freelance", "pre"],
      ["application/x-futuresplash", "spl"],
      ["application/x-gnumeric", "gnumeric"],
      ["application/x-gsp", "gsp"],
      ["application/x-gss", "gss"],
      ["application/x-gtar", "gtar"],
      ["application/x-gzip", ["gz", "gzip"]],
      ["application/x-hdf", "hdf"],
      ["application/x-helpfile", ["help", "hlp"]],
      ["application/x-httpd-imap", "imap"],
      ["application/x-ima", "ima"],
      ["application/x-internet-signup", ["ins", "isp"]],
      ["application/x-internett-signup", "ins"],
      ["application/x-inventor", "iv"],
      ["application/x-ip2", "ip"],
      ["application/x-iphone", "iii"],
      ["application/x-java-class", "class"],
      ["application/x-java-commerce", "jcm"],
      ["application/x-java-jnlp-file", "jnlp"],
      ["application/x-javascript", "js"],
      ["application/x-koan", ["skd", "skm", "skp", "skt"]],
      ["application/x-ksh", "ksh"],
      ["application/x-latex", ["latex", "ltx"]],
      ["application/x-lha", "lha"],
      ["application/x-lisp", "lsp"],
      ["application/x-livescreen", "ivy"],
      ["application/x-lotus", "wq1"],
      ["application/x-lotusscreencam", "scm"],
      ["application/x-lzh", "lzh"],
      ["application/x-lzx", "lzx"],
      ["application/x-mac-binhex40", "hqx"],
      ["application/x-macbinary", "bin"],
      ["application/x-magic-cap-package-1.0", "mc$"],
      ["application/x-mathcad", "mcd"],
      ["application/x-meme", "mm"],
      ["application/x-midi", ["mid", "midi"]],
      ["application/x-mif", "mif"],
      ["application/x-mix-transfer", "nix"],
      ["application/x-mobipocket-ebook", "prc"],
      ["application/x-mplayer2", "asx"],
      ["application/x-ms-application", "application"],
      ["application/x-ms-wmd", "wmd"],
      ["application/x-ms-wmz", "wmz"],
      ["application/x-ms-xbap", "xbap"],
      ["application/x-msaccess", "mdb"],
      ["application/x-msbinder", "obd"],
      ["application/x-mscardfile", "crd"],
      ["application/x-msclip", "clp"],
      ["application/x-msdownload", ["exe", "dll"]],
      ["application/x-msexcel", ["xls", "xla", "xlw"]],
      ["application/x-msmediaview", ["mvb", "m13", "m14"]],
      ["application/x-msmetafile", "wmf"],
      ["application/x-msmoney", "mny"],
      ["application/x-mspowerpoint", "ppt"],
      ["application/x-mspublisher", "pub"],
      ["application/x-msschedule", "scd"],
      ["application/x-msterminal", "trm"],
      ["application/x-mswrite", "wri"],
      ["application/x-navi-animation", "ani"],
      ["application/x-navidoc", "nvd"],
      ["application/x-navimap", "map"],
      ["application/x-navistyle", "stl"],
      ["application/x-netcdf", ["cdf", "nc"]],
      ["application/x-newton-compatible-pkg", "pkg"],
      ["application/x-nokia-9000-communicator-add-on-software", "aos"],
      ["application/x-omc", "omc"],
      ["application/x-omcdatamaker", "omcd"],
      ["application/x-omcregerator", "omcr"],
      ["application/x-pagemaker", ["pm4", "pm5"]],
      ["application/x-pcl", "pcl"],
      ["application/x-perfmon", ["pma", "pmc", "pml", "pmr", "pmw"]],
      ["application/x-pixclscript", "plx"],
      ["application/x-pkcs10", "p10"],
      ["application/x-pkcs12", ["p12", "pfx"]],
      ["application/x-pkcs7-certificates", ["p7b", "spc"]],
      ["application/x-pkcs7-certreqresp", "p7r"],
      ["application/x-pkcs7-mime", ["p7m", "p7c"]],
      ["application/x-pkcs7-signature", ["p7s", "p7a"]],
      ["application/x-pointplus", "css"],
      ["application/x-portable-anymap", "pnm"],
      ["application/x-project", ["mpc", "mpt", "mpv", "mpx"]],
      ["application/x-qpro", "wb1"],
      ["application/x-rar-compressed", "rar"],
      ["application/x-rtf", "rtf"],
      ["application/x-sdp", "sdp"],
      ["application/x-sea", "sea"],
      ["application/x-seelogo", "sl"],
      ["application/x-sh", "sh"],
      ["application/x-shar", ["shar", "sh"]],
      ["application/x-shockwave-flash", "swf"],
      ["application/x-silverlight-app", "xap"],
      ["application/x-sit", "sit"],
      ["application/x-sprite", ["spr", "sprite"]],
      ["application/x-stuffit", "sit"],
      ["application/x-stuffitx", "sitx"],
      ["application/x-sv4cpio", "sv4cpio"],
      ["application/x-sv4crc", "sv4crc"],
      ["application/x-tar", "tar"],
      ["application/x-tbook", ["sbk", "tbk"]],
      ["application/x-tcl", "tcl"],
      ["application/x-tex", "tex"],
      ["application/x-tex-tfm", "tfm"],
      ["application/x-texinfo", ["texi", "texinfo"]],
      ["application/x-troff", ["roff", "t", "tr"]],
      ["application/x-troff-man", "man"],
      ["application/x-troff-me", "me"],
      ["application/x-troff-ms", "ms"],
      ["application/x-troff-msvideo", "avi"],
      ["application/x-ustar", "ustar"],
      ["application/x-visio", ["vsd", "vst", "vsw"]],
      ["application/x-vnd.audioexplosion.mzz", "mzz"],
      ["application/x-vnd.ls-xpix", "xpix"],
      ["application/x-vrml", "vrml"],
      ["application/x-wais-source", ["src", "wsrc"]],
      ["application/x-winhelp", "hlp"],
      ["application/x-wintalk", "wtk"],
      ["application/x-world", ["wrl", "svr"]],
      ["application/x-wpwin", "wpd"],
      ["application/x-wri", "wri"],
      ["application/x-x509-ca-cert", ["cer", "crt", "der"]],
      ["application/x-x509-user-cert", "crt"],
      ["application/x-xfig", "fig"],
      ["application/x-xpinstall", "xpi"],
      ["application/x-zip-compressed", "zip"],
      ["application/xcap-diff+xml", "xdf"],
      ["application/xenc+xml", "xenc"],
      ["application/xhtml+xml", "xhtml"],
      ["application/xml", "xml"],
      ["application/xml-dtd", "dtd"],
      ["application/xop+xml", "xop"],
      ["application/xslt+xml", "xslt"],
      ["application/xspf+xml", "xspf"],
      ["application/xv+xml", "mxml"],
      ["application/yang", "yang"],
      ["application/yin+xml", "yin"],
      ["application/ynd.ms-pkipko", "pko"],
      ["application/zip", "zip"],
      ["audio/adpcm", "adp"],
      ["audio/aiff", ["aiff", "aif", "aifc"]],
      ["audio/basic", ["snd", "au"]],
      ["audio/it", "it"],
      ["audio/make", ["funk", "my", "pfunk"]],
      ["audio/make.my.funk", "pfunk"],
      ["audio/mid", ["mid", "rmi"]],
      ["audio/midi", ["midi", "kar", "mid"]],
      ["audio/mod", "mod"],
      ["audio/mp4", "mp4a"],
      ["audio/mpeg", ["mpga", "mp3", "m2a", "mp2", "mpa", "mpg"]],
      ["audio/mpeg3", "mp3"],
      ["audio/nspaudio", ["la", "lma"]],
      ["audio/ogg", "oga"],
      ["audio/s3m", "s3m"],
      ["audio/tsp-audio", "tsi"],
      ["audio/tsplayer", "tsp"],
      ["audio/vnd.dece.audio", "uva"],
      ["audio/vnd.digital-winds", "eol"],
      ["audio/vnd.dra", "dra"],
      ["audio/vnd.dts", "dts"],
      ["audio/vnd.dts.hd", "dtshd"],
      ["audio/vnd.lucent.voice", "lvp"],
      ["audio/vnd.ms-playready.media.pya", "pya"],
      ["audio/vnd.nuera.ecelp4800", "ecelp4800"],
      ["audio/vnd.nuera.ecelp7470", "ecelp7470"],
      ["audio/vnd.nuera.ecelp9600", "ecelp9600"],
      ["audio/vnd.qcelp", "qcp"],
      ["audio/vnd.rip", "rip"],
      ["audio/voc", "voc"],
      ["audio/voxware", "vox"],
      ["audio/wav", "wav"],
      ["audio/webm", "weba"],
      ["audio/x-aac", "aac"],
      ["audio/x-adpcm", "snd"],
      ["audio/x-aiff", ["aiff", "aif", "aifc"]],
      ["audio/x-au", "au"],
      ["audio/x-gsm", ["gsd", "gsm"]],
      ["audio/x-jam", "jam"],
      ["audio/x-liveaudio", "lam"],
      ["audio/x-mid", ["mid", "midi"]],
      ["audio/x-midi", ["midi", "mid"]],
      ["audio/x-mod", "mod"],
      ["audio/x-mpeg", "mp2"],
      ["audio/x-mpeg-3", "mp3"],
      ["audio/x-mpegurl", "m3u"],
      ["audio/x-mpequrl", "m3u"],
      ["audio/x-ms-wax", "wax"],
      ["audio/x-ms-wma", "wma"],
      ["audio/x-nspaudio", ["la", "lma"]],
      ["audio/x-pn-realaudio", ["ra", "ram", "rm", "rmm", "rmp"]],
      ["audio/x-pn-realaudio-plugin", ["ra", "rmp", "rpm"]],
      ["audio/x-psid", "sid"],
      ["audio/x-realaudio", "ra"],
      ["audio/x-twinvq", "vqf"],
      ["audio/x-twinvq-plugin", ["vqe", "vql"]],
      ["audio/x-vnd.audioexplosion.mjuicemediafile", "mjf"],
      ["audio/x-voc", "voc"],
      ["audio/x-wav", "wav"],
      ["audio/xm", "xm"],
      ["chemical/x-cdx", "cdx"],
      ["chemical/x-cif", "cif"],
      ["chemical/x-cmdf", "cmdf"],
      ["chemical/x-cml", "cml"],
      ["chemical/x-csml", "csml"],
      ["chemical/x-pdb", ["pdb", "xyz"]],
      ["chemical/x-xyz", "xyz"],
      ["drawing/x-dwf", "dwf"],
      ["i-world/i-vrml", "ivr"],
      ["image/bmp", ["bmp", "bm"]],
      ["image/cgm", "cgm"],
      ["image/cis-cod", "cod"],
      ["image/cmu-raster", ["ras", "rast"]],
      ["image/fif", "fif"],
      ["image/florian", ["flo", "turbot"]],
      ["image/g3fax", "g3"],
      ["image/gif", "gif"],
      ["image/ief", ["ief", "iefs"]],
      ["image/jpeg", ["jpeg", "jpe", "jpg", "jfif", "jfif-tbnl"]],
      ["image/jutvision", "jut"],
      ["image/ktx", "ktx"],
      ["image/naplps", ["nap", "naplps"]],
      ["image/pict", ["pic", "pict"]],
      ["image/pipeg", "jfif"],
      ["image/pjpeg", ["jfif", "jpe", "jpeg", "jpg"]],
      ["image/png", ["png", "x-png"]],
      ["image/prs.btif", "btif"],
      ["image/svg+xml", "svg"],
      ["image/tiff", ["tif", "tiff"]],
      ["image/vasa", "mcf"],
      ["image/vnd.adobe.photoshop", "psd"],
      ["image/vnd.dece.graphic", "uvi"],
      ["image/vnd.djvu", "djvu"],
      ["image/vnd.dvb.subtitle", "sub"],
      ["image/vnd.dwg", ["dwg", "dxf", "svf"]],
      ["image/vnd.dxf", "dxf"],
      ["image/vnd.fastbidsheet", "fbs"],
      ["image/vnd.fpx", "fpx"],
      ["image/vnd.fst", "fst"],
      ["image/vnd.fujixerox.edmics-mmr", "mmr"],
      ["image/vnd.fujixerox.edmics-rlc", "rlc"],
      ["image/vnd.ms-modi", "mdi"],
      ["image/vnd.net-fpx", ["fpx", "npx"]],
      ["image/vnd.rn-realflash", "rf"],
      ["image/vnd.rn-realpix", "rp"],
      ["image/vnd.wap.wbmp", "wbmp"],
      ["image/vnd.xiff", "xif"],
      ["image/webp", "webp"],
      ["image/x-cmu-raster", "ras"],
      ["image/x-cmx", "cmx"],
      ["image/x-dwg", ["dwg", "dxf", "svf"]],
      ["image/x-freehand", "fh"],
      ["image/x-icon", "ico"],
      ["image/x-jg", "art"],
      ["image/x-jps", "jps"],
      ["image/x-niff", ["niff", "nif"]],
      ["image/x-pcx", "pcx"],
      ["image/x-pict", ["pct", "pic"]],
      ["image/x-portable-anymap", "pnm"],
      ["image/x-portable-bitmap", "pbm"],
      ["image/x-portable-graymap", "pgm"],
      ["image/x-portable-greymap", "pgm"],
      ["image/x-portable-pixmap", "ppm"],
      ["image/x-quicktime", ["qif", "qti", "qtif"]],
      ["image/x-rgb", "rgb"],
      ["image/x-tiff", ["tif", "tiff"]],
      ["image/x-windows-bmp", "bmp"],
      ["image/x-xbitmap", "xbm"],
      ["image/x-xbm", "xbm"],
      ["image/x-xpixmap", ["xpm", "pm"]],
      ["image/x-xwd", "xwd"],
      ["image/x-xwindowdump", "xwd"],
      ["image/xbm", "xbm"],
      ["image/xpm", "xpm"],
      ["message/rfc822", ["eml", "mht", "mhtml", "nws", "mime"]],
      ["model/iges", ["iges", "igs"]],
      ["model/mesh", "msh"],
      ["model/vnd.collada+xml", "dae"],
      ["model/vnd.dwf", "dwf"],
      ["model/vnd.gdl", "gdl"],
      ["model/vnd.gtw", "gtw"],
      ["model/vnd.mts", "mts"],
      ["model/vnd.vtu", "vtu"],
      ["model/vrml", ["vrml", "wrl", "wrz"]],
      ["model/x-pov", "pov"],
      ["multipart/x-gzip", "gzip"],
      ["multipart/x-ustar", "ustar"],
      ["multipart/x-zip", "zip"],
      ["music/crescendo", ["mid", "midi"]],
      ["music/x-karaoke", "kar"],
      ["paleovu/x-pv", "pvu"],
      ["text/asp", "asp"],
      ["text/calendar", "ics"],
      ["text/css", "css"],
      ["text/csv", "csv"],
      ["text/ecmascript", "js"],
      ["text/h323", "323"],
      ["text/html", ["html", "htm", "stm", "acgi", "htmls", "htx", "shtml"]],
      ["text/iuls", "uls"],
      ["text/javascript", "js"],
      ["text/mcf", "mcf"],
      ["text/n3", "n3"],
      ["text/pascal", "pas"],
      [
        "text/plain",
        [
          "txt",
          "bas",
          "c",
          "h",
          "c++",
          "cc",
          "com",
          "conf",
          "cxx",
          "def",
          "f",
          "f90",
          "for",
          "g",
          "hh",
          "idc",
          "jav",
          "java",
          "list",
          "log",
          "lst",
          "m",
          "mar",
          "pl",
          "sdml",
          "text"
        ]
      ],
      ["text/plain-bas", "par"],
      ["text/prs.lines.tag", "dsc"],
      ["text/richtext", ["rtx", "rt", "rtf"]],
      ["text/scriplet", "wsc"],
      ["text/scriptlet", "sct"],
      ["text/sgml", ["sgm", "sgml"]],
      ["text/tab-separated-values", "tsv"],
      ["text/troff", "t"],
      ["text/turtle", "ttl"],
      ["text/uri-list", ["uni", "unis", "uri", "uris"]],
      ["text/vnd.abc", "abc"],
      ["text/vnd.curl", "curl"],
      ["text/vnd.curl.dcurl", "dcurl"],
      ["text/vnd.curl.mcurl", "mcurl"],
      ["text/vnd.curl.scurl", "scurl"],
      ["text/vnd.fly", "fly"],
      ["text/vnd.fmi.flexstor", "flx"],
      ["text/vnd.graphviz", "gv"],
      ["text/vnd.in3d.3dml", "3dml"],
      ["text/vnd.in3d.spot", "spot"],
      ["text/vnd.rn-realtext", "rt"],
      ["text/vnd.sun.j2me.app-descriptor", "jad"],
      ["text/vnd.wap.wml", "wml"],
      ["text/vnd.wap.wmlscript", "wmls"],
      ["text/webviewhtml", "htt"],
      ["text/x-asm", ["asm", "s"]],
      ["text/x-audiosoft-intra", "aip"],
      ["text/x-c", ["c", "cc", "cpp"]],
      ["text/x-component", "htc"],
      ["text/x-fortran", ["for", "f", "f77", "f90"]],
      ["text/x-h", ["h", "hh"]],
      ["text/x-java-source", ["java", "jav"]],
      ["text/x-java-source,java", "java"],
      ["text/x-la-asf", "lsx"],
      ["text/x-m", "m"],
      ["text/x-pascal", "p"],
      ["text/x-script", "hlb"],
      ["text/x-script.csh", "csh"],
      ["text/x-script.elisp", "el"],
      ["text/x-script.guile", "scm"],
      ["text/x-script.ksh", "ksh"],
      ["text/x-script.lisp", "lsp"],
      ["text/x-script.perl", "pl"],
      ["text/x-script.perl-module", "pm"],
      ["text/x-script.phyton", "py"],
      ["text/x-script.rexx", "rexx"],
      ["text/x-script.scheme", "scm"],
      ["text/x-script.sh", "sh"],
      ["text/x-script.tcl", "tcl"],
      ["text/x-script.tcsh", "tcsh"],
      ["text/x-script.zsh", "zsh"],
      ["text/x-server-parsed-html", ["shtml", "ssi"]],
      ["text/x-setext", "etx"],
      ["text/x-sgml", ["sgm", "sgml"]],
      ["text/x-speech", ["spc", "talk"]],
      ["text/x-uil", "uil"],
      ["text/x-uuencode", ["uu", "uue"]],
      ["text/x-vcalendar", "vcs"],
      ["text/x-vcard", "vcf"],
      ["text/xml", "xml"],
      ["video/3gpp", "3gp"],
      ["video/3gpp2", "3g2"],
      ["video/animaflex", "afl"],
      ["video/avi", "avi"],
      ["video/avs-video", "avs"],
      ["video/dl", "dl"],
      ["video/fli", "fli"],
      ["video/gl", "gl"],
      ["video/h261", "h261"],
      ["video/h263", "h263"],
      ["video/h264", "h264"],
      ["video/jpeg", "jpgv"],
      ["video/jpm", "jpm"],
      ["video/mj2", "mj2"],
      ["video/mp4", "mp4"],
      ["video/mpeg", ["mpeg", "mp2", "mpa", "mpe", "mpg", "mpv2", "m1v", "m2v", "mp3"]],
      ["video/msvideo", "avi"],
      ["video/ogg", "ogv"],
      ["video/quicktime", ["mov", "qt", "moov"]],
      ["video/vdo", "vdo"],
      ["video/vivo", ["viv", "vivo"]],
      ["video/vnd.dece.hd", "uvh"],
      ["video/vnd.dece.mobile", "uvm"],
      ["video/vnd.dece.pd", "uvp"],
      ["video/vnd.dece.sd", "uvs"],
      ["video/vnd.dece.video", "uvv"],
      ["video/vnd.fvt", "fvt"],
      ["video/vnd.mpegurl", "mxu"],
      ["video/vnd.ms-playready.media.pyv", "pyv"],
      ["video/vnd.rn-realvideo", "rv"],
      ["video/vnd.uvvu.mp4", "uvu"],
      ["video/vnd.vivo", ["viv", "vivo"]],
      ["video/vosaic", "vos"],
      ["video/webm", "webm"],
      ["video/x-amt-demorun", "xdr"],
      ["video/x-amt-showrun", "xsr"],
      ["video/x-atomic3d-feature", "fmf"],
      ["video/x-dl", "dl"],
      ["video/x-dv", ["dif", "dv"]],
      ["video/x-f4v", "f4v"],
      ["video/x-fli", "fli"],
      ["video/x-flv", "flv"],
      ["video/x-gl", "gl"],
      ["video/x-isvideo", "isu"],
      ["video/x-la-asf", ["lsf", "lsx"]],
      ["video/x-m4v", "m4v"],
      ["video/x-motion-jpeg", "mjpg"],
      ["video/x-mpeg", ["mp3", "mp2"]],
      ["video/x-mpeq2a", "mp2"],
      ["video/x-ms-asf", ["asf", "asr", "asx"]],
      ["video/x-ms-asf-plugin", "asx"],
      ["video/x-ms-wm", "wm"],
      ["video/x-ms-wmv", "wmv"],
      ["video/x-ms-wmx", "wmx"],
      ["video/x-ms-wvx", "wvx"],
      ["video/x-msvideo", "avi"],
      ["video/x-qtc", "qtc"],
      ["video/x-scm", "scm"],
      ["video/x-sgi-movie", ["movie", "mv"]],
      ["windows/metafile", "wmf"],
      ["www/mime", "mime"],
      ["x-conference/x-cooltalk", "ice"],
      ["x-music/x-midi", ["mid", "midi"]],
      ["x-world/x-3dmf", ["3dm", "3dmf", "qd3", "qd3d"]],
      ["x-world/x-svr", "svr"],
      ["x-world/x-vrml", ["flr", "vrml", "wrl", "wrz", "xaf", "xof"]],
      ["x-world/x-vrt", "vrt"],
      ["xgl/drawing", "xgz"],
      ["xgl/movie", "xmz"]
    ]);
    var extensions2 = /* @__PURE__ */ new Map([
      ["123", "application/vnd.lotus-1-2-3"],
      ["323", "text/h323"],
      ["*", "application/octet-stream"],
      ["3dm", "x-world/x-3dmf"],
      ["3dmf", "x-world/x-3dmf"],
      ["3dml", "text/vnd.in3d.3dml"],
      ["3g2", "video/3gpp2"],
      ["3gp", "video/3gpp"],
      ["7z", "application/x-7z-compressed"],
      ["a", "application/octet-stream"],
      ["aab", "application/x-authorware-bin"],
      ["aac", "audio/x-aac"],
      ["aam", "application/x-authorware-map"],
      ["aas", "application/x-authorware-seg"],
      ["abc", "text/vnd.abc"],
      ["abw", "application/x-abiword"],
      ["ac", "application/pkix-attr-cert"],
      ["acc", "application/vnd.americandynamics.acc"],
      ["ace", "application/x-ace-compressed"],
      ["acgi", "text/html"],
      ["acu", "application/vnd.acucobol"],
      ["acx", "application/internet-property-stream"],
      ["adp", "audio/adpcm"],
      ["aep", "application/vnd.audiograph"],
      ["afl", "video/animaflex"],
      ["afp", "application/vnd.ibm.modcap"],
      ["ahead", "application/vnd.ahead.space"],
      ["ai", "application/postscript"],
      ["aif", ["audio/aiff", "audio/x-aiff"]],
      ["aifc", ["audio/aiff", "audio/x-aiff"]],
      ["aiff", ["audio/aiff", "audio/x-aiff"]],
      ["aim", "application/x-aim"],
      ["aip", "text/x-audiosoft-intra"],
      ["air", "application/vnd.adobe.air-application-installer-package+zip"],
      ["ait", "application/vnd.dvb.ait"],
      ["ami", "application/vnd.amiga.ami"],
      ["ani", "application/x-navi-animation"],
      ["aos", "application/x-nokia-9000-communicator-add-on-software"],
      ["apk", "application/vnd.android.package-archive"],
      ["application", "application/x-ms-application"],
      ["apr", "application/vnd.lotus-approach"],
      ["aps", "application/mime"],
      ["arc", "application/octet-stream"],
      ["arj", ["application/arj", "application/octet-stream"]],
      ["art", "image/x-jg"],
      ["asf", "video/x-ms-asf"],
      ["asm", "text/x-asm"],
      ["aso", "application/vnd.accpac.simply.aso"],
      ["asp", "text/asp"],
      ["asr", "video/x-ms-asf"],
      ["asx", ["video/x-ms-asf", "application/x-mplayer2", "video/x-ms-asf-plugin"]],
      ["atc", "application/vnd.acucorp"],
      ["atomcat", "application/atomcat+xml"],
      ["atomsvc", "application/atomsvc+xml"],
      ["atx", "application/vnd.antix.game-component"],
      ["au", ["audio/basic", "audio/x-au"]],
      ["avi", ["video/avi", "video/msvideo", "application/x-troff-msvideo", "video/x-msvideo"]],
      ["avs", "video/avs-video"],
      ["aw", "application/applixware"],
      ["axs", "application/olescript"],
      ["azf", "application/vnd.airzip.filesecure.azf"],
      ["azs", "application/vnd.airzip.filesecure.azs"],
      ["azw", "application/vnd.amazon.ebook"],
      ["bas", "text/plain"],
      ["bcpio", "application/x-bcpio"],
      ["bdf", "application/x-font-bdf"],
      ["bdm", "application/vnd.syncml.dm+wbxml"],
      ["bed", "application/vnd.realvnc.bed"],
      ["bh2", "application/vnd.fujitsu.oasysprs"],
      ["bin", ["application/octet-stream", "application/mac-binary", "application/macbinary", "application/x-macbinary", "application/x-binary"]],
      ["bm", "image/bmp"],
      ["bmi", "application/vnd.bmi"],
      ["bmp", ["image/bmp", "image/x-windows-bmp"]],
      ["boo", "application/book"],
      ["book", "application/book"],
      ["box", "application/vnd.previewsystems.box"],
      ["boz", "application/x-bzip2"],
      ["bsh", "application/x-bsh"],
      ["btif", "image/prs.btif"],
      ["bz", "application/x-bzip"],
      ["bz2", "application/x-bzip2"],
      ["c", ["text/plain", "text/x-c"]],
      ["c++", "text/plain"],
      ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
      ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
      ["c4g", "application/vnd.clonk.c4group"],
      ["cab", "application/vnd.ms-cab-compressed"],
      ["car", "application/vnd.curl.car"],
      ["cat", ["application/vnd.ms-pkiseccat", "application/vnd.ms-pki.seccat"]],
      ["cc", ["text/plain", "text/x-c"]],
      ["ccad", "application/clariscad"],
      ["cco", "application/x-cocoa"],
      ["ccxml", "application/ccxml+xml,"],
      ["cdbcmsg", "application/vnd.contact.cmsg"],
      ["cdf", ["application/cdf", "application/x-cdf", "application/x-netcdf"]],
      ["cdkey", "application/vnd.mediastation.cdkey"],
      ["cdmia", "application/cdmi-capability"],
      ["cdmic", "application/cdmi-container"],
      ["cdmid", "application/cdmi-domain"],
      ["cdmio", "application/cdmi-object"],
      ["cdmiq", "application/cdmi-queue"],
      ["cdx", "chemical/x-cdx"],
      ["cdxml", "application/vnd.chemdraw+xml"],
      ["cdy", "application/vnd.cinderella"],
      ["cer", ["application/pkix-cert", "application/x-x509-ca-cert"]],
      ["cgm", "image/cgm"],
      ["cha", "application/x-chat"],
      ["chat", "application/x-chat"],
      ["chm", "application/vnd.ms-htmlhelp"],
      ["chrt", "application/vnd.kde.kchart"],
      ["cif", "chemical/x-cif"],
      ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
      ["cil", "application/vnd.ms-artgalry"],
      ["cla", "application/vnd.claymore"],
      ["class", ["application/octet-stream", "application/java", "application/java-byte-code", "application/java-vm", "application/x-java-class"]],
      ["clkk", "application/vnd.crick.clicker.keyboard"],
      ["clkp", "application/vnd.crick.clicker.palette"],
      ["clkt", "application/vnd.crick.clicker.template"],
      ["clkw", "application/vnd.crick.clicker.wordbank"],
      ["clkx", "application/vnd.crick.clicker"],
      ["clp", "application/x-msclip"],
      ["cmc", "application/vnd.cosmocaller"],
      ["cmdf", "chemical/x-cmdf"],
      ["cml", "chemical/x-cml"],
      ["cmp", "application/vnd.yellowriver-custom-menu"],
      ["cmx", "image/x-cmx"],
      ["cod", ["image/cis-cod", "application/vnd.rim.cod"]],
      ["com", ["application/octet-stream", "text/plain"]],
      ["conf", "text/plain"],
      ["cpio", "application/x-cpio"],
      ["cpp", "text/x-c"],
      ["cpt", ["application/mac-compactpro", "application/x-compactpro", "application/x-cpt"]],
      ["crd", "application/x-mscardfile"],
      ["crl", ["application/pkix-crl", "application/pkcs-crl"]],
      ["crt", ["application/pkix-cert", "application/x-x509-user-cert", "application/x-x509-ca-cert"]],
      ["cryptonote", "application/vnd.rig.cryptonote"],
      ["csh", ["text/x-script.csh", "application/x-csh"]],
      ["csml", "chemical/x-csml"],
      ["csp", "application/vnd.commonspace"],
      ["css", ["text/css", "application/x-pointplus"]],
      ["csv", "text/csv"],
      ["cu", "application/cu-seeme"],
      ["curl", "text/vnd.curl"],
      ["cww", "application/prs.cww"],
      ["cxx", "text/plain"],
      ["dae", "model/vnd.collada+xml"],
      ["daf", "application/vnd.mobius.daf"],
      ["davmount", "application/davmount+xml"],
      ["dcr", "application/x-director"],
      ["dcurl", "text/vnd.curl.dcurl"],
      ["dd2", "application/vnd.oma.dd2+xml"],
      ["ddd", "application/vnd.fujixerox.ddd"],
      ["deb", "application/x-debian-package"],
      ["deepv", "application/x-deepv"],
      ["def", "text/plain"],
      ["der", "application/x-x509-ca-cert"],
      ["dfac", "application/vnd.dreamfactory"],
      ["dif", "video/x-dv"],
      ["dir", "application/x-director"],
      ["dis", "application/vnd.mobius.dis"],
      ["djvu", "image/vnd.djvu"],
      ["dl", ["video/dl", "video/x-dl"]],
      ["dll", "application/x-msdownload"],
      ["dms", "application/octet-stream"],
      ["dna", "application/vnd.dna"],
      ["doc", "application/msword"],
      ["docm", "application/vnd.ms-word.document.macroenabled.12"],
      ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      ["dot", "application/msword"],
      ["dotm", "application/vnd.ms-word.template.macroenabled.12"],
      ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"],
      ["dp", ["application/commonground", "application/vnd.osgi.dp"]],
      ["dpg", "application/vnd.dpgraph"],
      ["dra", "audio/vnd.dra"],
      ["drw", "application/drafting"],
      ["dsc", "text/prs.lines.tag"],
      ["dssc", "application/dssc+der"],
      ["dtb", "application/x-dtbook+xml"],
      ["dtd", "application/xml-dtd"],
      ["dts", "audio/vnd.dts"],
      ["dtshd", "audio/vnd.dts.hd"],
      ["dump", "application/octet-stream"],
      ["dv", "video/x-dv"],
      ["dvi", "application/x-dvi"],
      ["dwf", ["model/vnd.dwf", "drawing/x-dwf"]],
      ["dwg", ["application/acad", "image/vnd.dwg", "image/x-dwg"]],
      ["dxf", ["application/dxf", "image/vnd.dwg", "image/vnd.dxf", "image/x-dwg"]],
      ["dxp", "application/vnd.spotfire.dxp"],
      ["dxr", "application/x-director"],
      ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
      ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
      ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
      ["edm", "application/vnd.novadigm.edm"],
      ["edx", "application/vnd.novadigm.edx"],
      ["efif", "application/vnd.picsel"],
      ["ei6", "application/vnd.pg.osasli"],
      ["el", "text/x-script.elisp"],
      ["elc", ["application/x-elc", "application/x-bytecode.elisp"]],
      ["eml", "message/rfc822"],
      ["emma", "application/emma+xml"],
      ["env", "application/x-envoy"],
      ["eol", "audio/vnd.digital-winds"],
      ["eot", "application/vnd.ms-fontobject"],
      ["eps", "application/postscript"],
      ["epub", "application/epub+zip"],
      ["es", ["application/ecmascript", "application/x-esrehber"]],
      ["es3", "application/vnd.eszigno3+xml"],
      ["esf", "application/vnd.epson.esf"],
      ["etx", "text/x-setext"],
      ["evy", ["application/envoy", "application/x-envoy"]],
      ["exe", ["application/octet-stream", "application/x-msdownload"]],
      ["exi", "application/exi"],
      ["ext", "application/vnd.novadigm.ext"],
      ["ez2", "application/vnd.ezpix-album"],
      ["ez3", "application/vnd.ezpix-package"],
      ["f", ["text/plain", "text/x-fortran"]],
      ["f4v", "video/x-f4v"],
      ["f77", "text/x-fortran"],
      ["f90", ["text/plain", "text/x-fortran"]],
      ["fbs", "image/vnd.fastbidsheet"],
      ["fcs", "application/vnd.isac.fcs"],
      ["fdf", "application/vnd.fdf"],
      ["fe_launch", "application/vnd.denovo.fcselayout-link"],
      ["fg5", "application/vnd.fujitsu.oasysgp"],
      ["fh", "image/x-freehand"],
      ["fif", ["application/fractals", "image/fif"]],
      ["fig", "application/x-xfig"],
      ["fli", ["video/fli", "video/x-fli"]],
      ["flo", ["image/florian", "application/vnd.micrografx.flo"]],
      ["flr", "x-world/x-vrml"],
      ["flv", "video/x-flv"],
      ["flw", "application/vnd.kde.kivio"],
      ["flx", "text/vnd.fmi.flexstor"],
      ["fly", "text/vnd.fly"],
      ["fm", "application/vnd.framemaker"],
      ["fmf", "video/x-atomic3d-feature"],
      ["fnc", "application/vnd.frogans.fnc"],
      ["for", ["text/plain", "text/x-fortran"]],
      ["fpx", ["image/vnd.fpx", "image/vnd.net-fpx"]],
      ["frl", "application/freeloader"],
      ["fsc", "application/vnd.fsc.weblaunch"],
      ["fst", "image/vnd.fst"],
      ["ftc", "application/vnd.fluxtime.clip"],
      ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
      ["funk", "audio/make"],
      ["fvt", "video/vnd.fvt"],
      ["fxp", "application/vnd.adobe.fxp"],
      ["fzs", "application/vnd.fuzzysheet"],
      ["g", "text/plain"],
      ["g2w", "application/vnd.geoplan"],
      ["g3", "image/g3fax"],
      ["g3w", "application/vnd.geospace"],
      ["gac", "application/vnd.groove-account"],
      ["gdl", "model/vnd.gdl"],
      ["geo", "application/vnd.dynageo"],
      ["gex", "application/vnd.geometry-explorer"],
      ["ggb", "application/vnd.geogebra.file"],
      ["ggt", "application/vnd.geogebra.tool"],
      ["ghf", "application/vnd.groove-help"],
      ["gif", "image/gif"],
      ["gim", "application/vnd.groove-identity-message"],
      ["gl", ["video/gl", "video/x-gl"]],
      ["gmx", "application/vnd.gmx"],
      ["gnumeric", "application/x-gnumeric"],
      ["gph", "application/vnd.flographit"],
      ["gqf", "application/vnd.grafeq"],
      ["gram", "application/srgs"],
      ["grv", "application/vnd.groove-injector"],
      ["grxml", "application/srgs+xml"],
      ["gsd", "audio/x-gsm"],
      ["gsf", "application/x-font-ghostscript"],
      ["gsm", "audio/x-gsm"],
      ["gsp", "application/x-gsp"],
      ["gss", "application/x-gss"],
      ["gtar", "application/x-gtar"],
      ["gtm", "application/vnd.groove-tool-message"],
      ["gtw", "model/vnd.gtw"],
      ["gv", "text/vnd.graphviz"],
      ["gxt", "application/vnd.geonext"],
      ["gz", ["application/x-gzip", "application/x-compressed"]],
      ["gzip", ["multipart/x-gzip", "application/x-gzip"]],
      ["h", ["text/plain", "text/x-h"]],
      ["h261", "video/h261"],
      ["h263", "video/h263"],
      ["h264", "video/h264"],
      ["hal", "application/vnd.hal+xml"],
      ["hbci", "application/vnd.hbci"],
      ["hdf", "application/x-hdf"],
      ["help", "application/x-helpfile"],
      ["hgl", "application/vnd.hp-hpgl"],
      ["hh", ["text/plain", "text/x-h"]],
      ["hlb", "text/x-script"],
      ["hlp", ["application/winhlp", "application/hlp", "application/x-helpfile", "application/x-winhelp"]],
      ["hpg", "application/vnd.hp-hpgl"],
      ["hpgl", "application/vnd.hp-hpgl"],
      ["hpid", "application/vnd.hp-hpid"],
      ["hps", "application/vnd.hp-hps"],
      [
        "hqx",
        [
          "application/mac-binhex40",
          "application/binhex",
          "application/binhex4",
          "application/mac-binhex",
          "application/x-binhex40",
          "application/x-mac-binhex40"
        ]
      ],
      ["hta", "application/hta"],
      ["htc", "text/x-component"],
      ["htke", "application/vnd.kenameaapp"],
      ["htm", "text/html"],
      ["html", "text/html"],
      ["htmls", "text/html"],
      ["htt", "text/webviewhtml"],
      ["htx", "text/html"],
      ["hvd", "application/vnd.yamaha.hv-dic"],
      ["hvp", "application/vnd.yamaha.hv-voice"],
      ["hvs", "application/vnd.yamaha.hv-script"],
      ["i2g", "application/vnd.intergeo"],
      ["icc", "application/vnd.iccprofile"],
      ["ice", "x-conference/x-cooltalk"],
      ["ico", "image/x-icon"],
      ["ics", "text/calendar"],
      ["idc", "text/plain"],
      ["ief", "image/ief"],
      ["iefs", "image/ief"],
      ["ifm", "application/vnd.shana.informed.formdata"],
      ["iges", ["application/iges", "model/iges"]],
      ["igl", "application/vnd.igloader"],
      ["igm", "application/vnd.insors.igm"],
      ["igs", ["application/iges", "model/iges"]],
      ["igx", "application/vnd.micrografx.igx"],
      ["iif", "application/vnd.shana.informed.interchange"],
      ["iii", "application/x-iphone"],
      ["ima", "application/x-ima"],
      ["imap", "application/x-httpd-imap"],
      ["imp", "application/vnd.accpac.simply.imp"],
      ["ims", "application/vnd.ms-ims"],
      ["inf", "application/inf"],
      ["ins", ["application/x-internet-signup", "application/x-internett-signup"]],
      ["ip", "application/x-ip2"],
      ["ipfix", "application/ipfix"],
      ["ipk", "application/vnd.shana.informed.package"],
      ["irm", "application/vnd.ibm.rights-management"],
      ["irp", "application/vnd.irepository.package+xml"],
      ["isp", "application/x-internet-signup"],
      ["isu", "video/x-isvideo"],
      ["it", "audio/it"],
      ["itp", "application/vnd.shana.informed.formtemplate"],
      ["iv", "application/x-inventor"],
      ["ivp", "application/vnd.immervision-ivp"],
      ["ivr", "i-world/i-vrml"],
      ["ivu", "application/vnd.immervision-ivu"],
      ["ivy", "application/x-livescreen"],
      ["jad", "text/vnd.sun.j2me.app-descriptor"],
      ["jam", ["application/vnd.jam", "audio/x-jam"]],
      ["jar", "application/java-archive"],
      ["jav", ["text/plain", "text/x-java-source"]],
      ["java", ["text/plain", "text/x-java-source,java", "text/x-java-source"]],
      ["jcm", "application/x-java-commerce"],
      ["jfif", ["image/pipeg", "image/jpeg", "image/pjpeg"]],
      ["jfif-tbnl", "image/jpeg"],
      ["jisp", "application/vnd.jisp"],
      ["jlt", "application/vnd.hp-jlyt"],
      ["jnlp", "application/x-java-jnlp-file"],
      ["joda", "application/vnd.joost.joda-archive"],
      ["jpe", ["image/jpeg", "image/pjpeg"]],
      ["jpeg", ["image/jpeg", "image/pjpeg"]],
      ["jpg", ["image/jpeg", "image/pjpeg"]],
      ["jpgv", "video/jpeg"],
      ["jpm", "video/jpm"],
      ["jps", "image/x-jps"],
      ["js", ["application/javascript", "application/ecmascript", "text/javascript", "text/ecmascript", "application/x-javascript"]],
      ["json", "application/json"],
      ["jut", "image/jutvision"],
      ["kar", ["audio/midi", "music/x-karaoke"]],
      ["karbon", "application/vnd.kde.karbon"],
      ["kfo", "application/vnd.kde.kformula"],
      ["kia", "application/vnd.kidspiration"],
      ["kml", "application/vnd.google-earth.kml+xml"],
      ["kmz", "application/vnd.google-earth.kmz"],
      ["kne", "application/vnd.kinar"],
      ["kon", "application/vnd.kde.kontour"],
      ["kpr", "application/vnd.kde.kpresenter"],
      ["ksh", ["application/x-ksh", "text/x-script.ksh"]],
      ["ksp", "application/vnd.kde.kspread"],
      ["ktx", "image/ktx"],
      ["ktz", "application/vnd.kahootz"],
      ["kwd", "application/vnd.kde.kword"],
      ["la", ["audio/nspaudio", "audio/x-nspaudio"]],
      ["lam", "audio/x-liveaudio"],
      ["lasxml", "application/vnd.las.las+xml"],
      ["latex", "application/x-latex"],
      ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
      ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
      ["les", "application/vnd.hhe.lesson-player"],
      ["lha", ["application/octet-stream", "application/lha", "application/x-lha"]],
      ["lhx", "application/octet-stream"],
      ["link66", "application/vnd.route66.link66+xml"],
      ["list", "text/plain"],
      ["lma", ["audio/nspaudio", "audio/x-nspaudio"]],
      ["log", "text/plain"],
      ["lrm", "application/vnd.ms-lrm"],
      ["lsf", "video/x-la-asf"],
      ["lsp", ["application/x-lisp", "text/x-script.lisp"]],
      ["lst", "text/plain"],
      ["lsx", ["video/x-la-asf", "text/x-la-asf"]],
      ["ltf", "application/vnd.frogans.ltf"],
      ["ltx", "application/x-latex"],
      ["lvp", "audio/vnd.lucent.voice"],
      ["lwp", "application/vnd.lotus-wordpro"],
      ["lzh", ["application/octet-stream", "application/x-lzh"]],
      ["lzx", ["application/lzx", "application/octet-stream", "application/x-lzx"]],
      ["m", ["text/plain", "text/x-m"]],
      ["m13", "application/x-msmediaview"],
      ["m14", "application/x-msmediaview"],
      ["m1v", "video/mpeg"],
      ["m21", "application/mp21"],
      ["m2a", "audio/mpeg"],
      ["m2v", "video/mpeg"],
      ["m3u", ["audio/x-mpegurl", "audio/x-mpequrl"]],
      ["m3u8", "application/vnd.apple.mpegurl"],
      ["m4v", "video/x-m4v"],
      ["ma", "application/mathematica"],
      ["mads", "application/mads+xml"],
      ["mag", "application/vnd.ecowin.chart"],
      ["man", "application/x-troff-man"],
      ["map", "application/x-navimap"],
      ["mar", "text/plain"],
      ["mathml", "application/mathml+xml"],
      ["mbd", "application/mbedlet"],
      ["mbk", "application/vnd.mobius.mbk"],
      ["mbox", "application/mbox"],
      ["mc$", "application/x-magic-cap-package-1.0"],
      ["mc1", "application/vnd.medcalcdata"],
      ["mcd", ["application/mcad", "application/vnd.mcd", "application/x-mathcad"]],
      ["mcf", ["image/vasa", "text/mcf"]],
      ["mcp", "application/netmc"],
      ["mcurl", "text/vnd.curl.mcurl"],
      ["mdb", "application/x-msaccess"],
      ["mdi", "image/vnd.ms-modi"],
      ["me", "application/x-troff-me"],
      ["meta4", "application/metalink4+xml"],
      ["mets", "application/mets+xml"],
      ["mfm", "application/vnd.mfmp"],
      ["mgp", "application/vnd.osgeo.mapguide.package"],
      ["mgz", "application/vnd.proteus.magazine"],
      ["mht", "message/rfc822"],
      ["mhtml", "message/rfc822"],
      ["mid", ["audio/mid", "audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
      ["midi", ["audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
      ["mif", ["application/vnd.mif", "application/x-mif", "application/x-frame"]],
      ["mime", ["message/rfc822", "www/mime"]],
      ["mj2", "video/mj2"],
      ["mjf", "audio/x-vnd.audioexplosion.mjuicemediafile"],
      ["mjpg", "video/x-motion-jpeg"],
      ["mlp", "application/vnd.dolby.mlp"],
      ["mm", ["application/base64", "application/x-meme"]],
      ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
      ["mme", "application/base64"],
      ["mmf", "application/vnd.smaf"],
      ["mmr", "image/vnd.fujixerox.edmics-mmr"],
      ["mny", "application/x-msmoney"],
      ["mod", ["audio/mod", "audio/x-mod"]],
      ["mods", "application/mods+xml"],
      ["moov", "video/quicktime"],
      ["mov", "video/quicktime"],
      ["movie", "video/x-sgi-movie"],
      ["mp2", ["video/mpeg", "audio/mpeg", "video/x-mpeg", "audio/x-mpeg", "video/x-mpeq2a"]],
      ["mp3", ["audio/mpeg", "audio/mpeg3", "video/mpeg", "audio/x-mpeg-3", "video/x-mpeg"]],
      ["mp4", ["video/mp4", "application/mp4"]],
      ["mp4a", "audio/mp4"],
      ["mpa", ["video/mpeg", "audio/mpeg"]],
      ["mpc", ["application/vnd.mophun.certificate", "application/x-project"]],
      ["mpe", "video/mpeg"],
      ["mpeg", "video/mpeg"],
      ["mpg", ["video/mpeg", "audio/mpeg"]],
      ["mpga", "audio/mpeg"],
      ["mpkg", "application/vnd.apple.installer+xml"],
      ["mpm", "application/vnd.blueice.multipass"],
      ["mpn", "application/vnd.mophun.application"],
      ["mpp", "application/vnd.ms-project"],
      ["mpt", "application/x-project"],
      ["mpv", "application/x-project"],
      ["mpv2", "video/mpeg"],
      ["mpx", "application/x-project"],
      ["mpy", "application/vnd.ibm.minipay"],
      ["mqy", "application/vnd.mobius.mqy"],
      ["mrc", "application/marc"],
      ["mrcx", "application/marcxml+xml"],
      ["ms", "application/x-troff-ms"],
      ["mscml", "application/mediaservercontrol+xml"],
      ["mseq", "application/vnd.mseq"],
      ["msf", "application/vnd.epson.msf"],
      ["msg", "application/vnd.ms-outlook"],
      ["msh", "model/mesh"],
      ["msl", "application/vnd.mobius.msl"],
      ["msty", "application/vnd.muvee.style"],
      ["mts", "model/vnd.mts"],
      ["mus", "application/vnd.musician"],
      ["musicxml", "application/vnd.recordare.musicxml+xml"],
      ["mv", "video/x-sgi-movie"],
      ["mvb", "application/x-msmediaview"],
      ["mwf", "application/vnd.mfer"],
      ["mxf", "application/mxf"],
      ["mxl", "application/vnd.recordare.musicxml"],
      ["mxml", "application/xv+xml"],
      ["mxs", "application/vnd.triscape.mxs"],
      ["mxu", "video/vnd.mpegurl"],
      ["my", "audio/make"],
      ["mzz", "application/x-vnd.audioexplosion.mzz"],
      ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
      ["n3", "text/n3"],
      ["nap", "image/naplps"],
      ["naplps", "image/naplps"],
      ["nbp", "application/vnd.wolfram.player"],
      ["nc", "application/x-netcdf"],
      ["ncm", "application/vnd.nokia.configuration-message"],
      ["ncx", "application/x-dtbncx+xml"],
      ["ngdat", "application/vnd.nokia.n-gage.data"],
      ["nif", "image/x-niff"],
      ["niff", "image/x-niff"],
      ["nix", "application/x-mix-transfer"],
      ["nlu", "application/vnd.neurolanguage.nlu"],
      ["nml", "application/vnd.enliven"],
      ["nnd", "application/vnd.noblenet-directory"],
      ["nns", "application/vnd.noblenet-sealer"],
      ["nnw", "application/vnd.noblenet-web"],
      ["npx", "image/vnd.net-fpx"],
      ["nsc", "application/x-conference"],
      ["nsf", "application/vnd.lotus-notes"],
      ["nvd", "application/x-navidoc"],
      ["nws", "message/rfc822"],
      ["o", "application/octet-stream"],
      ["oa2", "application/vnd.fujitsu.oasys2"],
      ["oa3", "application/vnd.fujitsu.oasys3"],
      ["oas", "application/vnd.fujitsu.oasys"],
      ["obd", "application/x-msbinder"],
      ["oda", "application/oda"],
      ["odb", "application/vnd.oasis.opendocument.database"],
      ["odc", "application/vnd.oasis.opendocument.chart"],
      ["odf", "application/vnd.oasis.opendocument.formula"],
      ["odft", "application/vnd.oasis.opendocument.formula-template"],
      ["odg", "application/vnd.oasis.opendocument.graphics"],
      ["odi", "application/vnd.oasis.opendocument.image"],
      ["odm", "application/vnd.oasis.opendocument.text-master"],
      ["odp", "application/vnd.oasis.opendocument.presentation"],
      ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
      ["odt", "application/vnd.oasis.opendocument.text"],
      ["oga", "audio/ogg"],
      ["ogv", "video/ogg"],
      ["ogx", "application/ogg"],
      ["omc", "application/x-omc"],
      ["omcd", "application/x-omcdatamaker"],
      ["omcr", "application/x-omcregerator"],
      ["onetoc", "application/onenote"],
      ["opf", "application/oebps-package+xml"],
      ["org", "application/vnd.lotus-organizer"],
      ["osf", "application/vnd.yamaha.openscoreformat"],
      ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
      ["otc", "application/vnd.oasis.opendocument.chart-template"],
      ["otf", "application/x-font-otf"],
      ["otg", "application/vnd.oasis.opendocument.graphics-template"],
      ["oth", "application/vnd.oasis.opendocument.text-web"],
      ["oti", "application/vnd.oasis.opendocument.image-template"],
      ["otp", "application/vnd.oasis.opendocument.presentation-template"],
      ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
      ["ott", "application/vnd.oasis.opendocument.text-template"],
      ["oxt", "application/vnd.openofficeorg.extension"],
      ["p", "text/x-pascal"],
      ["p10", ["application/pkcs10", "application/x-pkcs10"]],
      ["p12", ["application/pkcs-12", "application/x-pkcs12"]],
      ["p7a", "application/x-pkcs7-signature"],
      ["p7b", "application/x-pkcs7-certificates"],
      ["p7c", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
      ["p7m", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
      ["p7r", "application/x-pkcs7-certreqresp"],
      ["p7s", ["application/pkcs7-signature", "application/x-pkcs7-signature"]],
      ["p8", "application/pkcs8"],
      ["par", "text/plain-bas"],
      ["part", "application/pro_eng"],
      ["pas", "text/pascal"],
      ["paw", "application/vnd.pawaafile"],
      ["pbd", "application/vnd.powerbuilder6"],
      ["pbm", "image/x-portable-bitmap"],
      ["pcf", "application/x-font-pcf"],
      ["pcl", ["application/vnd.hp-pcl", "application/x-pcl"]],
      ["pclxl", "application/vnd.hp-pclxl"],
      ["pct", "image/x-pict"],
      ["pcurl", "application/vnd.curl.pcurl"],
      ["pcx", "image/x-pcx"],
      ["pdb", ["application/vnd.palm", "chemical/x-pdb"]],
      ["pdf", "application/pdf"],
      ["pfa", "application/x-font-type1"],
      ["pfr", "application/font-tdpfr"],
      ["pfunk", ["audio/make", "audio/make.my.funk"]],
      ["pfx", "application/x-pkcs12"],
      ["pgm", ["image/x-portable-graymap", "image/x-portable-greymap"]],
      ["pgn", "application/x-chess-pgn"],
      ["pgp", "application/pgp-signature"],
      ["pic", ["image/pict", "image/x-pict"]],
      ["pict", "image/pict"],
      ["pkg", "application/x-newton-compatible-pkg"],
      ["pki", "application/pkixcmp"],
      ["pkipath", "application/pkix-pkipath"],
      ["pko", ["application/ynd.ms-pkipko", "application/vnd.ms-pki.pko"]],
      ["pl", ["text/plain", "text/x-script.perl"]],
      ["plb", "application/vnd.3gpp.pic-bw-large"],
      ["plc", "application/vnd.mobius.plc"],
      ["plf", "application/vnd.pocketlearn"],
      ["pls", "application/pls+xml"],
      ["plx", "application/x-pixclscript"],
      ["pm", ["text/x-script.perl-module", "image/x-xpixmap"]],
      ["pm4", "application/x-pagemaker"],
      ["pm5", "application/x-pagemaker"],
      ["pma", "application/x-perfmon"],
      ["pmc", "application/x-perfmon"],
      ["pml", ["application/vnd.ctc-posml", "application/x-perfmon"]],
      ["pmr", "application/x-perfmon"],
      ["pmw", "application/x-perfmon"],
      ["png", "image/png"],
      ["pnm", ["application/x-portable-anymap", "image/x-portable-anymap"]],
      ["portpkg", "application/vnd.macports.portpkg"],
      ["pot", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
      ["potm", "application/vnd.ms-powerpoint.template.macroenabled.12"],
      ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"],
      ["pov", "model/x-pov"],
      ["ppa", "application/vnd.ms-powerpoint"],
      ["ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12"],
      ["ppd", "application/vnd.cups-ppd"],
      ["ppm", "image/x-portable-pixmap"],
      ["pps", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
      ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12"],
      ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"],
      ["ppt", ["application/vnd.ms-powerpoint", "application/mspowerpoint", "application/powerpoint", "application/x-mspowerpoint"]],
      ["pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12"],
      ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
      ["ppz", "application/mspowerpoint"],
      ["prc", "application/x-mobipocket-ebook"],
      ["pre", ["application/vnd.lotus-freelance", "application/x-freelance"]],
      ["prf", "application/pics-rules"],
      ["prt", "application/pro_eng"],
      ["ps", "application/postscript"],
      ["psb", "application/vnd.3gpp.pic-bw-small"],
      ["psd", ["application/octet-stream", "image/vnd.adobe.photoshop"]],
      ["psf", "application/x-font-linux-psf"],
      ["pskcxml", "application/pskc+xml"],
      ["ptid", "application/vnd.pvi.ptid1"],
      ["pub", "application/x-mspublisher"],
      ["pvb", "application/vnd.3gpp.pic-bw-var"],
      ["pvu", "paleovu/x-pv"],
      ["pwn", "application/vnd.3m.post-it-notes"],
      ["pwz", "application/vnd.ms-powerpoint"],
      ["py", "text/x-script.phyton"],
      ["pya", "audio/vnd.ms-playready.media.pya"],
      ["pyc", "application/x-bytecode.python"],
      ["pyv", "video/vnd.ms-playready.media.pyv"],
      ["qam", "application/vnd.epson.quickanime"],
      ["qbo", "application/vnd.intu.qbo"],
      ["qcp", "audio/vnd.qcelp"],
      ["qd3", "x-world/x-3dmf"],
      ["qd3d", "x-world/x-3dmf"],
      ["qfx", "application/vnd.intu.qfx"],
      ["qif", "image/x-quicktime"],
      ["qps", "application/vnd.publishare-delta-tree"],
      ["qt", "video/quicktime"],
      ["qtc", "video/x-qtc"],
      ["qti", "image/x-quicktime"],
      ["qtif", "image/x-quicktime"],
      ["qxd", "application/vnd.quark.quarkxpress"],
      ["ra", ["audio/x-realaudio", "audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin"]],
      ["ram", "audio/x-pn-realaudio"],
      ["rar", "application/x-rar-compressed"],
      ["ras", ["image/cmu-raster", "application/x-cmu-raster", "image/x-cmu-raster"]],
      ["rast", "image/cmu-raster"],
      ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
      ["rdf", "application/rdf+xml"],
      ["rdz", "application/vnd.data-vision.rdz"],
      ["rep", "application/vnd.businessobjects"],
      ["res", "application/x-dtbresource+xml"],
      ["rexx", "text/x-script.rexx"],
      ["rf", "image/vnd.rn-realflash"],
      ["rgb", "image/x-rgb"],
      ["rif", "application/reginfo+xml"],
      ["rip", "audio/vnd.rip"],
      ["rl", "application/resource-lists+xml"],
      ["rlc", "image/vnd.fujixerox.edmics-rlc"],
      ["rld", "application/resource-lists-diff+xml"],
      ["rm", ["application/vnd.rn-realmedia", "audio/x-pn-realaudio"]],
      ["rmi", "audio/mid"],
      ["rmm", "audio/x-pn-realaudio"],
      ["rmp", ["audio/x-pn-realaudio-plugin", "audio/x-pn-realaudio"]],
      ["rms", "application/vnd.jcp.javame.midlet-rms"],
      ["rnc", "application/relax-ng-compact-syntax"],
      ["rng", ["application/ringing-tones", "application/vnd.nokia.ringing-tone"]],
      ["rnx", "application/vnd.rn-realplayer"],
      ["roff", "application/x-troff"],
      ["rp", "image/vnd.rn-realpix"],
      ["rp9", "application/vnd.cloanto.rp9"],
      ["rpm", "audio/x-pn-realaudio-plugin"],
      ["rpss", "application/vnd.nokia.radio-presets"],
      ["rpst", "application/vnd.nokia.radio-preset"],
      ["rq", "application/sparql-query"],
      ["rs", "application/rls-services+xml"],
      ["rsd", "application/rsd+xml"],
      ["rt", ["text/richtext", "text/vnd.rn-realtext"]],
      ["rtf", ["application/rtf", "text/richtext", "application/x-rtf"]],
      ["rtx", ["text/richtext", "application/rtf"]],
      ["rv", "video/vnd.rn-realvideo"],
      ["s", "text/x-asm"],
      ["s3m", "audio/s3m"],
      ["saf", "application/vnd.yamaha.smaf-audio"],
      ["saveme", "application/octet-stream"],
      ["sbk", "application/x-tbook"],
      ["sbml", "application/sbml+xml"],
      ["sc", "application/vnd.ibm.secure-container"],
      ["scd", "application/x-msschedule"],
      ["scm", ["application/vnd.lotus-screencam", "video/x-scm", "text/x-script.guile", "application/x-lotusscreencam", "text/x-script.scheme"]],
      ["scq", "application/scvp-cv-request"],
      ["scs", "application/scvp-cv-response"],
      ["sct", "text/scriptlet"],
      ["scurl", "text/vnd.curl.scurl"],
      ["sda", "application/vnd.stardivision.draw"],
      ["sdc", "application/vnd.stardivision.calc"],
      ["sdd", "application/vnd.stardivision.impress"],
      ["sdkm", "application/vnd.solent.sdkm+xml"],
      ["sdml", "text/plain"],
      ["sdp", ["application/sdp", "application/x-sdp"]],
      ["sdr", "application/sounder"],
      ["sdw", "application/vnd.stardivision.writer"],
      ["sea", ["application/sea", "application/x-sea"]],
      ["see", "application/vnd.seemail"],
      ["seed", "application/vnd.fdsn.seed"],
      ["sema", "application/vnd.sema"],
      ["semd", "application/vnd.semd"],
      ["semf", "application/vnd.semf"],
      ["ser", "application/java-serialized-object"],
      ["set", "application/set"],
      ["setpay", "application/set-payment-initiation"],
      ["setreg", "application/set-registration-initiation"],
      ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
      ["sfs", "application/vnd.spotfire.sfs"],
      ["sgl", "application/vnd.stardivision.writer-global"],
      ["sgm", ["text/sgml", "text/x-sgml"]],
      ["sgml", ["text/sgml", "text/x-sgml"]],
      ["sh", ["application/x-shar", "application/x-bsh", "application/x-sh", "text/x-script.sh"]],
      ["shar", ["application/x-bsh", "application/x-shar"]],
      ["shf", "application/shf+xml"],
      ["shtml", ["text/html", "text/x-server-parsed-html"]],
      ["sid", "audio/x-psid"],
      ["sis", "application/vnd.symbian.install"],
      ["sit", ["application/x-stuffit", "application/x-sit"]],
      ["sitx", "application/x-stuffitx"],
      ["skd", "application/x-koan"],
      ["skm", "application/x-koan"],
      ["skp", ["application/vnd.koan", "application/x-koan"]],
      ["skt", "application/x-koan"],
      ["sl", "application/x-seelogo"],
      ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
      ["sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"],
      ["slt", "application/vnd.epson.salt"],
      ["sm", "application/vnd.stepmania.stepchart"],
      ["smf", "application/vnd.stardivision.math"],
      ["smi", ["application/smil", "application/smil+xml"]],
      ["smil", "application/smil"],
      ["snd", ["audio/basic", "audio/x-adpcm"]],
      ["snf", "application/x-font-snf"],
      ["sol", "application/solids"],
      ["spc", ["text/x-speech", "application/x-pkcs7-certificates"]],
      ["spf", "application/vnd.yamaha.smaf-phrase"],
      ["spl", ["application/futuresplash", "application/x-futuresplash"]],
      ["spot", "text/vnd.in3d.spot"],
      ["spp", "application/scvp-vp-response"],
      ["spq", "application/scvp-vp-request"],
      ["spr", "application/x-sprite"],
      ["sprite", "application/x-sprite"],
      ["src", "application/x-wais-source"],
      ["sru", "application/sru+xml"],
      ["srx", "application/sparql-results+xml"],
      ["sse", "application/vnd.kodak-descriptor"],
      ["ssf", "application/vnd.epson.ssf"],
      ["ssi", "text/x-server-parsed-html"],
      ["ssm", "application/streamingmedia"],
      ["ssml", "application/ssml+xml"],
      ["sst", ["application/vnd.ms-pkicertstore", "application/vnd.ms-pki.certstore"]],
      ["st", "application/vnd.sailingtracker.track"],
      ["stc", "application/vnd.sun.xml.calc.template"],
      ["std", "application/vnd.sun.xml.draw.template"],
      ["step", "application/step"],
      ["stf", "application/vnd.wt.stf"],
      ["sti", "application/vnd.sun.xml.impress.template"],
      ["stk", "application/hyperstudio"],
      ["stl", ["application/vnd.ms-pkistl", "application/sla", "application/vnd.ms-pki.stl", "application/x-navistyle"]],
      ["stm", "text/html"],
      ["stp", "application/step"],
      ["str", "application/vnd.pg.format"],
      ["stw", "application/vnd.sun.xml.writer.template"],
      ["sub", "image/vnd.dvb.subtitle"],
      ["sus", "application/vnd.sus-calendar"],
      ["sv4cpio", "application/x-sv4cpio"],
      ["sv4crc", "application/x-sv4crc"],
      ["svc", "application/vnd.dvb.service"],
      ["svd", "application/vnd.svd"],
      ["svf", ["image/vnd.dwg", "image/x-dwg"]],
      ["svg", "image/svg+xml"],
      ["svr", ["x-world/x-svr", "application/x-world"]],
      ["swf", "application/x-shockwave-flash"],
      ["swi", "application/vnd.aristanetworks.swi"],
      ["sxc", "application/vnd.sun.xml.calc"],
      ["sxd", "application/vnd.sun.xml.draw"],
      ["sxg", "application/vnd.sun.xml.writer.global"],
      ["sxi", "application/vnd.sun.xml.impress"],
      ["sxm", "application/vnd.sun.xml.math"],
      ["sxw", "application/vnd.sun.xml.writer"],
      ["t", ["text/troff", "application/x-troff"]],
      ["talk", "text/x-speech"],
      ["tao", "application/vnd.tao.intent-module-archive"],
      ["tar", "application/x-tar"],
      ["tbk", ["application/toolbook", "application/x-tbook"]],
      ["tcap", "application/vnd.3gpp2.tcap"],
      ["tcl", ["text/x-script.tcl", "application/x-tcl"]],
      ["tcsh", "text/x-script.tcsh"],
      ["teacher", "application/vnd.smart.teacher"],
      ["tei", "application/tei+xml"],
      ["tex", "application/x-tex"],
      ["texi", "application/x-texinfo"],
      ["texinfo", "application/x-texinfo"],
      ["text", ["application/plain", "text/plain"]],
      ["tfi", "application/thraud+xml"],
      ["tfm", "application/x-tex-tfm"],
      ["tgz", ["application/gnutar", "application/x-compressed"]],
      ["thmx", "application/vnd.ms-officetheme"],
      ["tif", ["image/tiff", "image/x-tiff"]],
      ["tiff", ["image/tiff", "image/x-tiff"]],
      ["tmo", "application/vnd.tmobile-livetv"],
      ["torrent", "application/x-bittorrent"],
      ["tpl", "application/vnd.groove-tool-template"],
      ["tpt", "application/vnd.trid.tpt"],
      ["tr", "application/x-troff"],
      ["tra", "application/vnd.trueapp"],
      ["trm", "application/x-msterminal"],
      ["tsd", "application/timestamped-data"],
      ["tsi", "audio/tsp-audio"],
      ["tsp", ["application/dsptype", "audio/tsplayer"]],
      ["tsv", "text/tab-separated-values"],
      ["ttf", "application/x-font-ttf"],
      ["ttl", "text/turtle"],
      ["turbot", "image/florian"],
      ["twd", "application/vnd.simtech-mindmapper"],
      ["txd", "application/vnd.genomatix.tuxedo"],
      ["txf", "application/vnd.mobius.txf"],
      ["txt", "text/plain"],
      ["ufd", "application/vnd.ufdl"],
      ["uil", "text/x-uil"],
      ["uls", "text/iuls"],
      ["umj", "application/vnd.umajin"],
      ["uni", "text/uri-list"],
      ["unis", "text/uri-list"],
      ["unityweb", "application/vnd.unity"],
      ["unv", "application/i-deas"],
      ["uoml", "application/vnd.uoml+xml"],
      ["uri", "text/uri-list"],
      ["uris", "text/uri-list"],
      ["ustar", ["application/x-ustar", "multipart/x-ustar"]],
      ["utz", "application/vnd.uiq.theme"],
      ["uu", ["application/octet-stream", "text/x-uuencode"]],
      ["uue", "text/x-uuencode"],
      ["uva", "audio/vnd.dece.audio"],
      ["uvh", "video/vnd.dece.hd"],
      ["uvi", "image/vnd.dece.graphic"],
      ["uvm", "video/vnd.dece.mobile"],
      ["uvp", "video/vnd.dece.pd"],
      ["uvs", "video/vnd.dece.sd"],
      ["uvu", "video/vnd.uvvu.mp4"],
      ["uvv", "video/vnd.dece.video"],
      ["vcd", "application/x-cdlink"],
      ["vcf", "text/x-vcard"],
      ["vcg", "application/vnd.groove-vcard"],
      ["vcs", "text/x-vcalendar"],
      ["vcx", "application/vnd.vcx"],
      ["vda", "application/vda"],
      ["vdo", "video/vdo"],
      ["vew", "application/groupwise"],
      ["vis", "application/vnd.visionary"],
      ["viv", ["video/vivo", "video/vnd.vivo"]],
      ["vivo", ["video/vivo", "video/vnd.vivo"]],
      ["vmd", "application/vocaltec-media-desc"],
      ["vmf", "application/vocaltec-media-file"],
      ["voc", ["audio/voc", "audio/x-voc"]],
      ["vos", "video/vosaic"],
      ["vox", "audio/voxware"],
      ["vqe", "audio/x-twinvq-plugin"],
      ["vqf", "audio/x-twinvq"],
      ["vql", "audio/x-twinvq-plugin"],
      ["vrml", ["model/vrml", "x-world/x-vrml", "application/x-vrml"]],
      ["vrt", "x-world/x-vrt"],
      ["vsd", ["application/vnd.visio", "application/x-visio"]],
      ["vsf", "application/vnd.vsf"],
      ["vst", "application/x-visio"],
      ["vsw", "application/x-visio"],
      ["vtu", "model/vnd.vtu"],
      ["vxml", "application/voicexml+xml"],
      ["w60", "application/wordperfect6.0"],
      ["w61", "application/wordperfect6.1"],
      ["w6w", "application/msword"],
      ["wad", "application/x-doom"],
      ["wav", ["audio/wav", "audio/x-wav"]],
      ["wax", "audio/x-ms-wax"],
      ["wb1", "application/x-qpro"],
      ["wbmp", "image/vnd.wap.wbmp"],
      ["wbs", "application/vnd.criticaltools.wbs+xml"],
      ["wbxml", "application/vnd.wap.wbxml"],
      ["wcm", "application/vnd.ms-works"],
      ["wdb", "application/vnd.ms-works"],
      ["web", "application/vnd.xara"],
      ["weba", "audio/webm"],
      ["webm", "video/webm"],
      ["webp", "image/webp"],
      ["wg", "application/vnd.pmi.widget"],
      ["wgt", "application/widget"],
      ["wiz", "application/msword"],
      ["wk1", "application/x-123"],
      ["wks", "application/vnd.ms-works"],
      ["wm", "video/x-ms-wm"],
      ["wma", "audio/x-ms-wma"],
      ["wmd", "application/x-ms-wmd"],
      ["wmf", ["windows/metafile", "application/x-msmetafile"]],
      ["wml", "text/vnd.wap.wml"],
      ["wmlc", "application/vnd.wap.wmlc"],
      ["wmls", "text/vnd.wap.wmlscript"],
      ["wmlsc", "application/vnd.wap.wmlscriptc"],
      ["wmv", "video/x-ms-wmv"],
      ["wmx", "video/x-ms-wmx"],
      ["wmz", "application/x-ms-wmz"],
      ["woff", "application/x-font-woff"],
      ["word", "application/msword"],
      ["wp", "application/wordperfect"],
      ["wp5", ["application/wordperfect", "application/wordperfect6.0"]],
      ["wp6", "application/wordperfect"],
      ["wpd", ["application/wordperfect", "application/vnd.wordperfect", "application/x-wpwin"]],
      ["wpl", "application/vnd.ms-wpl"],
      ["wps", "application/vnd.ms-works"],
      ["wq1", "application/x-lotus"],
      ["wqd", "application/vnd.wqd"],
      ["wri", ["application/mswrite", "application/x-wri", "application/x-mswrite"]],
      ["wrl", ["model/vrml", "x-world/x-vrml", "application/x-world"]],
      ["wrz", ["model/vrml", "x-world/x-vrml"]],
      ["wsc", "text/scriplet"],
      ["wsdl", "application/wsdl+xml"],
      ["wspolicy", "application/wspolicy+xml"],
      ["wsrc", "application/x-wais-source"],
      ["wtb", "application/vnd.webturbo"],
      ["wtk", "application/x-wintalk"],
      ["wvx", "video/x-ms-wvx"],
      ["x-png", "image/png"],
      ["x3d", "application/vnd.hzn-3d-crossword"],
      ["xaf", "x-world/x-vrml"],
      ["xap", "application/x-silverlight-app"],
      ["xar", "application/vnd.xara"],
      ["xbap", "application/x-ms-xbap"],
      ["xbd", "application/vnd.fujixerox.docuworks.binder"],
      ["xbm", ["image/xbm", "image/x-xbm", "image/x-xbitmap"]],
      ["xdf", "application/xcap-diff+xml"],
      ["xdm", "application/vnd.syncml.dm+xml"],
      ["xdp", "application/vnd.adobe.xdp+xml"],
      ["xdr", "video/x-amt-demorun"],
      ["xdssc", "application/dssc+xml"],
      ["xdw", "application/vnd.fujixerox.docuworks"],
      ["xenc", "application/xenc+xml"],
      ["xer", "application/patch-ops-error+xml"],
      ["xfdf", "application/vnd.adobe.xfdf"],
      ["xfdl", "application/vnd.xfdl"],
      ["xgz", "xgl/drawing"],
      ["xhtml", "application/xhtml+xml"],
      ["xif", "image/vnd.xiff"],
      ["xl", "application/excel"],
      ["xla", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xlam", "application/vnd.ms-excel.addin.macroenabled.12"],
      ["xlb", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
      ["xlc", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xld", ["application/excel", "application/x-excel"]],
      ["xlk", ["application/excel", "application/x-excel"]],
      ["xll", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
      ["xlm", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xls", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12"],
      ["xlsm", "application/vnd.ms-excel.sheet.macroenabled.12"],
      ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
      ["xlt", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xltm", "application/vnd.ms-excel.template.macroenabled.12"],
      ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"],
      ["xlv", ["application/excel", "application/x-excel"]],
      ["xlw", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xm", "audio/xm"],
      ["xml", ["application/xml", "text/xml", "application/atom+xml", "application/rss+xml"]],
      ["xmz", "xgl/movie"],
      ["xo", "application/vnd.olpc-sugar"],
      ["xof", "x-world/x-vrml"],
      ["xop", "application/xop+xml"],
      ["xpi", "application/x-xpinstall"],
      ["xpix", "application/x-vnd.ls-xpix"],
      ["xpm", ["image/xpm", "image/x-xpixmap"]],
      ["xpr", "application/vnd.is-xpr"],
      ["xps", "application/vnd.ms-xpsdocument"],
      ["xpw", "application/vnd.intercon.formnet"],
      ["xslt", "application/xslt+xml"],
      ["xsm", "application/vnd.syncml+xml"],
      ["xspf", "application/xspf+xml"],
      ["xsr", "video/x-amt-showrun"],
      ["xul", "application/vnd.mozilla.xul+xml"],
      ["xwd", ["image/x-xwd", "image/x-xwindowdump"]],
      ["xyz", ["chemical/x-xyz", "chemical/x-pdb"]],
      ["yang", "application/yang"],
      ["yin", "application/yin+xml"],
      ["z", ["application/x-compressed", "application/x-compress"]],
      ["zaz", "application/vnd.zzazz.deck+xml"],
      ["zip", ["application/zip", "multipart/x-zip", "application/x-zip-compressed", "application/x-compressed"]],
      ["zir", "application/vnd.zul"],
      ["zmm", "application/vnd.handheld-entertainment+xml"],
      ["zoo", "application/octet-stream"],
      ["zsh", "text/x-script.zsh"]
    ]);
    module.exports = {
      detectMimeType(filename) {
        if (!filename) {
          return defaultMimeType;
        }
        let parsed = path.parse(filename);
        let extension = (parsed.ext.substr(1) || parsed.name || "").split("?").shift().trim().toLowerCase();
        let value = defaultMimeType;
        if (extensions2.has(extension)) {
          value = extensions2.get(extension);
        }
        if (Array.isArray(value)) {
          return value[0];
        }
        return value;
      },
      detectExtension(mimeType) {
        if (!mimeType) {
          return defaultExtension;
        }
        let parts = (mimeType || "").toLowerCase().trim().split("/");
        let rootType = parts.shift().trim();
        let subType = parts.join("/").trim();
        if (mimeTypes.has(rootType + "/" + subType)) {
          let value = mimeTypes.get(rootType + "/" + subType);
          if (Array.isArray(value)) {
            return value[0];
          }
          return value;
        }
        switch (rootType) {
          case "text":
            return "txt";
          default:
            return "bin";
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/base64/index.js
var require_base64 = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/base64/index.js"(exports, module) {
    "use strict";
    var Transform = __require("stream").Transform;
    function encode2(buffer2) {
      if (typeof buffer2 === "string") {
        buffer2 = Buffer.from(buffer2, "utf-8");
      }
      return buffer2.toString("base64");
    }
    function wrap2(str, lineLength) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      if (str.length <= lineLength) {
        return str;
      }
      let result = [];
      let pos = 0;
      let chunkLength = lineLength * 1024;
      while (pos < str.length) {
        let wrappedLines = str.substr(pos, chunkLength).replace(new RegExp(".{" + lineLength + "}", "g"), "$&\r\n").trim();
        result.push(wrappedLines);
        pos += chunkLength;
      }
      return result.join("\r\n").trim();
    }
    var Encoder2 = class extends Transform {
      constructor(options2) {
        super();
        this.options = options2 || {};
        if (this.options.lineLength !== false) {
          this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = "";
        this._remainingBytes = false;
        this.inputBytes = 0;
        this.outputBytes = 0;
      }
      _transform(chunk, encoding, done) {
        if (encoding !== "buffer") {
          chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
          return setImmediate(done);
        }
        this.inputBytes += chunk.length;
        if (this._remainingBytes && this._remainingBytes.length) {
          chunk = Buffer.concat([this._remainingBytes, chunk], this._remainingBytes.length + chunk.length);
          this._remainingBytes = false;
        }
        if (chunk.length % 3) {
          this._remainingBytes = chunk.slice(chunk.length - chunk.length % 3);
          chunk = chunk.slice(0, chunk.length - chunk.length % 3);
        } else {
          this._remainingBytes = false;
        }
        let b642 = this._curLine + encode2(chunk);
        if (this.options.lineLength) {
          b642 = wrap2(b642, this.options.lineLength);
          let lastLF = b642.lastIndexOf("\n");
          if (lastLF < 0) {
            this._curLine = b642;
            b642 = "";
          } else if (lastLF === b642.length - 1) {
            this._curLine = "";
          } else {
            this._curLine = b642.substr(lastLF + 1);
            b642 = b642.substr(0, lastLF + 1);
          }
        }
        if (b642) {
          this.outputBytes += b642.length;
          this.push(Buffer.from(b642, "ascii"));
        }
        setImmediate(done);
      }
      _flush(done) {
        if (this._remainingBytes && this._remainingBytes.length) {
          this._curLine += encode2(this._remainingBytes);
        }
        if (this._curLine) {
          this._curLine = wrap2(this._curLine, this.options.lineLength);
          this.outputBytes += this._curLine.length;
          this.push(this._curLine, "ascii");
          this._curLine = "";
        }
        done();
      }
    };
    module.exports = {
      encode: encode2,
      wrap: wrap2,
      Encoder: Encoder2
    };
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/qp/index.js
var require_qp = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/qp/index.js"(exports, module) {
    "use strict";
    var Transform = __require("stream").Transform;
    function encode2(buffer2) {
      if (typeof buffer2 === "string") {
        buffer2 = Buffer.from(buffer2, "utf-8");
      }
      let ranges = [
        [9],
        [10],
        [13],
        [32, 60],
        [62, 126]
      ];
      let result = "";
      let ord;
      for (let i = 0, len = buffer2.length; i < len; i++) {
        ord = buffer2[i];
        if (checkRanges(ord, ranges) && !((ord === 32 || ord === 9) && (i === len - 1 || buffer2[i + 1] === 10 || buffer2[i + 1] === 13))) {
          result += String.fromCharCode(ord);
          continue;
        }
        result += "=" + (ord < 16 ? "0" : "") + ord.toString(16).toUpperCase();
      }
      return result;
    }
    function wrap2(str, lineLength) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      if (str.length <= lineLength) {
        return str;
      }
      let pos = 0;
      let len = str.length;
      let match, code, line;
      let lineMargin = Math.floor(lineLength / 3);
      let result = "";
      while (pos < len) {
        line = str.substr(pos, lineLength);
        if (match = line.match(/\r\n/)) {
          line = line.substr(0, match.index + match[0].length);
          result += line;
          pos += line.length;
          continue;
        }
        if (line.substr(-1) === "\n") {
          result += line;
          pos += line.length;
          continue;
        } else if (match = line.substr(-lineMargin).match(/\n.*?$/)) {
          line = line.substr(0, line.length - (match[0].length - 1));
          result += line;
          pos += line.length;
          continue;
        } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
          line = line.substr(0, line.length - (match[0].length - 1));
        } else if (line.match(/[=][\da-f]{0,2}$/i)) {
          if (match = line.match(/[=][\da-f]{0,1}$/i)) {
            line = line.substr(0, line.length - match[0].length);
          }
          while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/[=][\da-f]{2}$/gi))) {
            code = parseInt(match[0].substr(1, 2), 16);
            if (code < 128) {
              break;
            }
            line = line.substr(0, line.length - 3);
            if (code >= 192) {
              break;
            }
          }
        }
        if (pos + line.length < len && line.substr(-1) !== "\n") {
          if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
            line = line.substr(0, line.length - 3);
          } else if (line.length === lineLength) {
            line = line.substr(0, line.length - 1);
          }
          pos += line.length;
          line += "=\r\n";
        } else {
          pos += line.length;
        }
        result += line;
      }
      return result;
    }
    function checkRanges(nr, ranges) {
      for (let i = ranges.length - 1; i >= 0; i--) {
        if (!ranges[i].length) {
          continue;
        }
        if (ranges[i].length === 1 && nr === ranges[i][0]) {
          return true;
        }
        if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
          return true;
        }
      }
      return false;
    }
    var Encoder2 = class extends Transform {
      constructor(options2) {
        super();
        this.options = options2 || {};
        if (this.options.lineLength !== false) {
          this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = "";
        this.inputBytes = 0;
        this.outputBytes = 0;
      }
      _transform(chunk, encoding, done) {
        let qp;
        if (encoding !== "buffer") {
          chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
          return done();
        }
        this.inputBytes += chunk.length;
        if (this.options.lineLength) {
          qp = this._curLine + encode2(chunk);
          qp = wrap2(qp, this.options.lineLength);
          qp = qp.replace(/(^|\n)([^\n]*)$/, (match, lineBreak, lastLine) => {
            this._curLine = lastLine;
            return lineBreak;
          });
          if (qp) {
            this.outputBytes += qp.length;
            this.push(qp);
          }
        } else {
          qp = encode2(chunk);
          this.outputBytes += qp.length;
          this.push(qp, "ascii");
        }
        done();
      }
      _flush(done) {
        if (this._curLine) {
          this.outputBytes += this._curLine.length;
          this.push(this._curLine, "ascii");
        }
        done();
      }
    };
    module.exports = {
      encode: encode2,
      wrap: wrap2,
      Encoder: Encoder2
    };
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-funcs/index.js
var require_mime_funcs = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-funcs/index.js"(exports, module) {
    "use strict";
    var base64 = require_base64();
    var qp = require_qp();
    var mimeTypes = require_mime_types();
    module.exports = {
      isPlainText(value, isParam) {
        const re = isParam ? /[\x00-\x08\x0b\x0c\x0e-\x1f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
        if (typeof value !== "string" || re.test(value)) {
          return false;
        } else {
          return true;
        }
      },
      hasLongerLines(str, lineLength) {
        if (str.length > 128 * 1024) {
          return true;
        }
        return new RegExp("^.{" + (lineLength + 1) + ",}", "m").test(str);
      },
      encodeWord(data, mimeWordEncoding, maxLength) {
        mimeWordEncoding = (mimeWordEncoding || "Q").toString().toUpperCase().trim().charAt(0);
        maxLength = maxLength || 0;
        let encodedStr;
        let toCharset = "UTF-8";
        if (maxLength && maxLength > 7 + toCharset.length) {
          maxLength -= 7 + toCharset.length;
        }
        if (mimeWordEncoding === "Q") {
          encodedStr = qp.encode(data).replace(/[^a-z0-9!*+\-/=]/gi, (chr) => {
            let ord = chr.charCodeAt(0).toString(16).toUpperCase();
            if (chr === " ") {
              return "_";
            } else {
              return "=" + (ord.length === 1 ? "0" + ord : ord);
            }
          });
        } else if (mimeWordEncoding === "B") {
          encodedStr = typeof data === "string" ? data : base64.encode(data);
          maxLength = maxLength ? Math.max(3, (maxLength - maxLength % 4) / 4 * 3) : 0;
        }
        if (maxLength && (mimeWordEncoding !== "B" ? encodedStr : base64.encode(data)).length > maxLength) {
          if (mimeWordEncoding === "Q") {
            encodedStr = this.splitMimeEncodedString(encodedStr, maxLength).join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
          } else {
            let parts = [];
            let lpart = "";
            for (let i = 0, len = encodedStr.length; i < len; i++) {
              let chr = encodedStr.charAt(i);
              if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
                lpart += chr;
              } else {
                parts.push(base64.encode(lpart));
                lpart = chr;
              }
            }
            if (lpart) {
              parts.push(base64.encode(lpart));
            }
            if (parts.length > 1) {
              encodedStr = parts.join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
            } else {
              encodedStr = parts.join("");
            }
          }
        } else if (mimeWordEncoding === "B") {
          encodedStr = base64.encode(data);
        }
        return "=?" + toCharset + "?" + mimeWordEncoding + "?" + encodedStr + (encodedStr.substr(-2) === "?=" ? "" : "?=");
      },
      encodeWords(value, mimeWordEncoding, maxLength, encodeAll) {
        maxLength = maxLength || 0;
        let encodedValue;
        let firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
        if (!firstMatch) {
          return value;
        }
        if (encodeAll) {
          return this.encodeWord(value, mimeWordEncoding, maxLength);
        }
        let lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
        if (!lastMatch) {
          return value;
        }
        let startIndex = firstMatch.index + (firstMatch[0].match(/[^\s]/) || {
          index: 0
        }).index;
        let endIndex = lastMatch.index + (lastMatch[1] || "").length;
        encodedValue = (startIndex ? value.substr(0, startIndex) : "") + this.encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || "Q", maxLength) + (endIndex < value.length ? value.substr(endIndex) : "");
        return encodedValue;
      },
      buildHeaderValue(structured) {
        let paramsArray = [];
        Object.keys(structured.params || {}).forEach((param) => {
          let value = structured.params[param];
          if (!this.isPlainText(value, true) || value.length >= 75) {
            this.buildHeaderParam(param, value, 50).forEach((encodedParam) => {
              if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === "*") {
                paramsArray.push(encodedParam.key + "=" + encodedParam.value);
              } else {
                paramsArray.push(encodedParam.key + "=" + JSON.stringify(encodedParam.value));
              }
            });
          } else if (/[\s'"\\;:/=(),<>@[\]?]|^-/.test(value)) {
            paramsArray.push(param + "=" + JSON.stringify(value));
          } else {
            paramsArray.push(param + "=" + value);
          }
        });
        return structured.value + (paramsArray.length ? "; " + paramsArray.join("; ") : "");
      },
      buildHeaderParam(key2, data, maxLength) {
        let list = [];
        let encodedStr = typeof data === "string" ? data : (data || "").toString();
        let encodedStrArr;
        let chr, ord;
        let line;
        let startPos = 0;
        let i, len;
        maxLength = maxLength || 50;
        if (this.isPlainText(data, true)) {
          if (encodedStr.length <= maxLength) {
            return [
              {
                key: key2,
                value: encodedStr
              }
            ];
          }
          encodedStr = encodedStr.replace(new RegExp(".{" + maxLength + "}", "g"), (str) => {
            list.push({
              line: str
            });
            return "";
          });
          if (encodedStr) {
            list.push({
              line: encodedStr
            });
          }
        } else {
          if (/[\uD800-\uDBFF]/.test(encodedStr)) {
            encodedStrArr = [];
            for (i = 0, len = encodedStr.length; i < len; i++) {
              chr = encodedStr.charAt(i);
              ord = chr.charCodeAt(0);
              if (ord >= 55296 && ord <= 56319 && i < len - 1) {
                chr += encodedStr.charAt(i + 1);
                encodedStrArr.push(chr);
                i++;
              } else {
                encodedStrArr.push(chr);
              }
            }
            encodedStr = encodedStrArr;
          }
          line = "utf-8''";
          let encoded = true;
          startPos = 0;
          for (i = 0, len = encodedStr.length; i < len; i++) {
            chr = encodedStr[i];
            if (encoded) {
              chr = this.safeEncodeURIComponent(chr);
            } else {
              chr = chr === " " ? chr : this.safeEncodeURIComponent(chr);
              if (chr !== encodedStr[i]) {
                if ((this.safeEncodeURIComponent(line) + chr).length >= maxLength) {
                  list.push({
                    line,
                    encoded
                  });
                  line = "";
                  startPos = i - 1;
                } else {
                  encoded = true;
                  i = startPos;
                  line = "";
                  continue;
                }
              }
            }
            if ((line + chr).length >= maxLength) {
              list.push({
                line,
                encoded
              });
              line = chr = encodedStr[i] === " " ? " " : this.safeEncodeURIComponent(encodedStr[i]);
              if (chr === encodedStr[i]) {
                encoded = false;
                startPos = i - 1;
              } else {
                encoded = true;
              }
            } else {
              line += chr;
            }
          }
          if (line) {
            list.push({
              line,
              encoded
            });
          }
        }
        return list.map((item, i2) => ({
          key: key2 + "*" + i2 + (item.encoded ? "*" : ""),
          value: item.line
        }));
      },
      parseHeaderValue(str) {
        let response = {
          value: false,
          params: {}
        };
        let key2 = false;
        let value = "";
        let type = "value";
        let quote = false;
        let escaped = false;
        let chr;
        for (let i = 0, len = str.length; i < len; i++) {
          chr = str.charAt(i);
          if (type === "key") {
            if (chr === "=") {
              key2 = value.trim().toLowerCase();
              type = "value";
              value = "";
              continue;
            }
            value += chr;
          } else {
            if (escaped) {
              value += chr;
            } else if (chr === "\\") {
              escaped = true;
              continue;
            } else if (quote && chr === quote) {
              quote = false;
            } else if (!quote && chr === '"') {
              quote = chr;
            } else if (!quote && chr === ";") {
              if (key2 === false) {
                response.value = value.trim();
              } else {
                response.params[key2] = value.trim();
              }
              type = "key";
              value = "";
            } else {
              value += chr;
            }
            escaped = false;
          }
        }
        if (type === "value") {
          if (key2 === false) {
            response.value = value.trim();
          } else {
            response.params[key2] = value.trim();
          }
        } else if (value.trim()) {
          response.params[value.trim().toLowerCase()] = "";
        }
        Object.keys(response.params).forEach((key3) => {
          let actualKey, nr, match, value2;
          if (match = key3.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) {
            actualKey = key3.substr(0, match.index);
            nr = Number(match[2] || match[3]) || 0;
            if (!response.params[actualKey] || typeof response.params[actualKey] !== "object") {
              response.params[actualKey] = {
                charset: false,
                values: []
              };
            }
            value2 = response.params[key3];
            if (nr === 0 && match[0].substr(-1) === "*" && (match = value2.match(/^([^']*)'[^']*'(.*)$/))) {
              response.params[actualKey].charset = match[1] || "iso-8859-1";
              value2 = match[2];
            }
            response.params[actualKey].values[nr] = value2;
            delete response.params[key3];
          }
        });
        Object.keys(response.params).forEach((key3) => {
          let value2;
          if (response.params[key3] && Array.isArray(response.params[key3].values)) {
            value2 = response.params[key3].values.map((val2) => val2 || "").join("");
            if (response.params[key3].charset) {
              response.params[key3] = "=?" + response.params[key3].charset + "?Q?" + value2.replace(/[=?_\s]/g, (s) => {
                let c = s.charCodeAt(0).toString(16);
                if (s === " ") {
                  return "_";
                } else {
                  return "%" + (c.length < 2 ? "0" : "") + c;
                }
              }).replace(/%/g, "=") + "?=";
            } else {
              response.params[key3] = value2;
            }
          }
        });
        return response;
      },
      detectExtension: (mimeType) => mimeTypes.detectExtension(mimeType),
      detectMimeType: (extension) => mimeTypes.detectMimeType(extension),
      foldLines(str, lineLength, afterSpace) {
        str = (str || "").toString();
        lineLength = lineLength || 76;
        let pos = 0, len = str.length, result = "", line, match;
        while (pos < len) {
          line = str.substr(pos, lineLength);
          if (line.length < lineLength) {
            result += line;
            break;
          }
          if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
            line = match[0];
            result += line;
            pos += line.length;
            continue;
          } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || "").length : 0) < line.length) {
            line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || "").length : 0)));
          } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
            line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || "").length : 0));
          }
          result += line;
          pos += line.length;
          if (pos < len) {
            result += "\r\n";
          }
        }
        return result;
      },
      splitMimeEncodedString: (str, maxlen) => {
        let curLine, match, chr, done, lines = [];
        maxlen = Math.max(maxlen || 0, 12);
        while (str.length) {
          curLine = str.substr(0, maxlen);
          if (match = curLine.match(/[=][0-9A-F]?$/i)) {
            curLine = curLine.substr(0, match.index);
          }
          done = false;
          while (!done) {
            done = true;
            if (match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i)) {
              chr = parseInt(match[1], 16);
              if (chr < 194 && chr > 127) {
                curLine = curLine.substr(0, curLine.length - 3);
                done = false;
              }
            }
          }
          if (curLine.length) {
            lines.push(curLine);
          }
          str = str.substr(curLine.length);
        }
        return lines;
      },
      encodeURICharComponent: (chr) => {
        let res = "";
        let ord = chr.charCodeAt(0).toString(16).toUpperCase();
        if (ord.length % 2) {
          ord = "0" + ord;
        }
        if (ord.length > 2) {
          for (let i = 0, len = ord.length / 2; i < len; i++) {
            res += "%" + ord.substr(i, 2);
          }
        } else {
          res += "%" + ord;
        }
        return res;
      },
      safeEncodeURIComponent(str) {
        str = (str || "").toString();
        try {
          str = encodeURIComponent(str);
        } catch (E) {
          return str.replace(/[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g, "");
        }
        return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, (chr) => this.encodeURICharComponent(chr));
      }
    };
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/addressparser/index.js
var require_addressparser = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/addressparser/index.js"(exports, module) {
    "use strict";
    function _handleAddress(tokens) {
      let token;
      let isGroup = false;
      let state = "text";
      let address;
      let addresses = [];
      let data = {
        address: [],
        comment: [],
        group: [],
        text: []
      };
      let i;
      let len;
      for (i = 0, len = tokens.length; i < len; i++) {
        token = tokens[i];
        if (token.type === "operator") {
          switch (token.value) {
            case "<":
              state = "address";
              break;
            case "(":
              state = "comment";
              break;
            case ":":
              state = "group";
              isGroup = true;
              break;
            default:
              state = "text";
          }
        } else if (token.value) {
          if (state === "address") {
            token.value = token.value.replace(/^[^<]*<\s*/, "");
          }
          data[state].push(token.value);
        }
      }
      if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
      }
      if (isGroup) {
        data.text = data.text.join(" ");
        addresses.push({
          name: data.text || address && address.name,
          group: data.group.length ? addressparser(data.group.join(",")) : []
        });
      } else {
        if (!data.address.length && data.text.length) {
          for (i = data.text.length - 1; i >= 0; i--) {
            if (data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
              data.address = data.text.splice(i, 1);
              break;
            }
          }
          let _regexHandler = function(address2) {
            if (!data.address.length) {
              data.address = [address2.trim()];
              return " ";
            } else {
              return address2;
            }
          };
          if (!data.address.length) {
            for (i = data.text.length - 1; i >= 0; i--) {
              data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
              if (data.address.length) {
                break;
              }
            }
          }
        }
        if (!data.text.length && data.comment.length) {
          data.text = data.comment;
          data.comment = [];
        }
        if (data.address.length > 1) {
          data.text = data.text.concat(data.address.splice(1));
        }
        data.text = data.text.join(" ");
        data.address = data.address.join(" ");
        if (!data.address && isGroup) {
          return [];
        } else {
          address = {
            address: data.address || data.text || "",
            name: data.text || data.address || ""
          };
          if (address.address === address.name) {
            if ((address.address || "").match(/@/)) {
              address.name = "";
            } else {
              address.address = "";
            }
          }
          addresses.push(address);
        }
      }
      return addresses;
    }
    var Tokenizer2 = class {
      constructor(str) {
        this.str = (str || "").toString();
        this.operatorCurrent = "";
        this.operatorExpecting = "";
        this.node = null;
        this.escaped = false;
        this.list = [];
        this.operators = {
          '"': '"',
          "(": ")",
          "<": ">",
          ",": "",
          ":": ";",
          ";": ""
        };
      }
      tokenize() {
        let chr, list = [];
        for (let i = 0, len = this.str.length; i < len; i++) {
          chr = this.str.charAt(i);
          this.checkChar(chr);
        }
        this.list.forEach((node) => {
          node.value = (node.value || "").toString().trim();
          if (node.value) {
            list.push(node);
          }
        });
        return list;
      }
      checkChar(chr) {
        if (this.escaped) {
        } else if (chr === this.operatorExpecting) {
          this.node = {
            type: "operator",
            value: chr
          };
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = "";
          this.escaped = false;
          return;
        } else if (!this.operatorExpecting && chr in this.operators) {
          this.node = {
            type: "operator",
            value: chr
          };
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = this.operators[chr];
          this.escaped = false;
          return;
        } else if (['"', "'"].includes(this.operatorExpecting) && chr === "\\") {
          this.escaped = true;
          return;
        }
        if (!this.node) {
          this.node = {
            type: "text",
            value: ""
          };
          this.list.push(this.node);
        }
        if (chr === "\n") {
          chr = " ";
        }
        if (chr.charCodeAt(0) >= 33 || [" ", "	"].includes(chr)) {
          this.node.value += chr;
        }
        this.escaped = false;
      }
    };
    function addressparser(str, options2) {
      options2 = options2 || {};
      let tokenizer = new Tokenizer2(str);
      let tokens = tokenizer.tokenize();
      let addresses = [];
      let address = [];
      let parsedAddresses = [];
      tokens.forEach((token) => {
        if (token.type === "operator" && (token.value === "," || token.value === ";")) {
          if (address.length) {
            addresses.push(address);
          }
          address = [];
        } else {
          address.push(token);
        }
      });
      if (address.length) {
        addresses.push(address);
      }
      addresses.forEach((address2) => {
        address2 = _handleAddress(address2);
        if (address2.length) {
          parsedAddresses = parsedAddresses.concat(address2);
        }
      });
      if (options2.flatten) {
        let addresses2 = [];
        let walkAddressList = (list) => {
          list.forEach((address2) => {
            if (address2.group) {
              return walkAddressList(address2.group);
            } else {
              addresses2.push(address2);
            }
          });
        };
        walkAddressList(parsedAddresses);
        return addresses2;
      }
      return parsedAddresses;
    }
    module.exports = addressparser;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-node/last-newline.js
var require_last_newline = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-node/last-newline.js"(exports, module) {
    "use strict";
    var Transform = __require("stream").Transform;
    var LastNewline = class extends Transform {
      constructor() {
        super();
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        if (chunk.length) {
          this.lastByte = chunk[chunk.length - 1];
        }
        this.push(chunk);
        done();
      }
      _flush(done) {
        if (this.lastByte === 10) {
          return done();
        }
        if (this.lastByte === 13) {
          this.push(Buffer.from("\n"));
          return done();
        }
        this.push(Buffer.from("\r\n"));
        return done();
      }
    };
    module.exports = LastNewline;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-node/le-windows.js
var require_le_windows = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-node/le-windows.js"(exports, module) {
    "use strict";
    var stream = __require("stream");
    var Transform = stream.Transform;
    var LeWindows = class extends Transform {
      constructor(options2) {
        super(options2);
        this.options = options2 || {};
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 10) {
            if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
              if (i > lastPos) {
                buf = chunk.slice(lastPos, i);
                this.push(buf);
              }
              this.push(Buffer.from("\r\n"));
              lastPos = i + 1;
            }
          }
        }
        if (lastPos && lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          this.push(buf);
        } else if (!lastPos) {
          this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
      }
    };
    module.exports = LeWindows;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-node/le-unix.js
var require_le_unix = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-node/le-unix.js"(exports, module) {
    "use strict";
    var stream = __require("stream");
    var Transform = stream.Transform;
    var LeWindows = class extends Transform {
      constructor(options2) {
        super(options2);
        this.options = options2 || {};
      }
      _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 13) {
            buf = chunk.slice(lastPos, i);
            lastPos = i + 1;
            this.push(buf);
          }
        }
        if (lastPos && lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          this.push(buf);
        } else if (!lastPos) {
          this.push(chunk);
        }
        done();
      }
    };
    module.exports = LeWindows;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-node/index.js
var require_mime_node = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mime-node/index.js"(exports, module) {
    "use strict";
    var crypto2 = __require("crypto");
    var fs2 = __require("fs");
    var punycode = __require("punycode");
    var PassThrough = __require("stream").PassThrough;
    var shared = require_shared();
    var mimeFuncs = require_mime_funcs();
    var qp = require_qp();
    var base64 = require_base64();
    var addressparser = require_addressparser();
    var nmfetch = require_fetch();
    var LastNewline = require_last_newline();
    var LeWindows = require_le_windows();
    var LeUnix = require_le_unix();
    var MimeNode = class {
      constructor(contentType, options2) {
        this.nodeCounter = 0;
        options2 = options2 || {};
        this.baseBoundary = options2.baseBoundary || crypto2.randomBytes(8).toString("hex");
        this.boundaryPrefix = options2.boundaryPrefix || "--_NmP";
        this.disableFileAccess = !!options2.disableFileAccess;
        this.disableUrlAccess = !!options2.disableUrlAccess;
        this.normalizeHeaderKey = options2.normalizeHeaderKey;
        this.date = new Date();
        this.rootNode = options2.rootNode || this;
        this.keepBcc = !!options2.keepBcc;
        if (options2.filename) {
          this.filename = options2.filename;
          if (!contentType) {
            contentType = mimeFuncs.detectMimeType(this.filename.split(".").pop());
          }
        }
        this.textEncoding = (options2.textEncoding || "").toString().trim().charAt(0).toUpperCase();
        this.parentNode = options2.parentNode;
        this.hostname = options2.hostname;
        this.newline = options2.newline;
        this.childNodes = [];
        this._nodeId = ++this.rootNode.nodeCounter;
        this._headers = [];
        this._isPlainText = false;
        this._hasLongLines = false;
        this._envelope = false;
        this._raw = false;
        this._transforms = [];
        this._processFuncs = [];
        if (contentType) {
          this.setHeader("Content-Type", contentType);
        }
      }
      createChild(contentType, options2) {
        if (!options2 && typeof contentType === "object") {
          options2 = contentType;
          contentType = void 0;
        }
        let node = new MimeNode(contentType, options2);
        this.appendChild(node);
        return node;
      }
      appendChild(childNode) {
        if (childNode.rootNode !== this.rootNode) {
          childNode.rootNode = this.rootNode;
          childNode._nodeId = ++this.rootNode.nodeCounter;
        }
        childNode.parentNode = this;
        this.childNodes.push(childNode);
        return childNode;
      }
      replace(node) {
        if (node === this) {
          return this;
        }
        this.parentNode.childNodes.forEach((childNode, i) => {
          if (childNode === this) {
            node.rootNode = this.rootNode;
            node.parentNode = this.parentNode;
            node._nodeId = this._nodeId;
            this.rootNode = this;
            this.parentNode = void 0;
            node.parentNode.childNodes[i] = node;
          }
        });
        return node;
      }
      remove() {
        if (!this.parentNode) {
          return this;
        }
        for (let i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
          if (this.parentNode.childNodes[i] === this) {
            this.parentNode.childNodes.splice(i, 1);
            this.parentNode = void 0;
            this.rootNode = this;
            return this;
          }
        }
      }
      setHeader(key2, value) {
        let added = false, headerValue;
        if (!value && key2 && typeof key2 === "object") {
          if (key2.key && "value" in key2) {
            this.setHeader(key2.key, key2.value);
          } else if (Array.isArray(key2)) {
            key2.forEach((i) => {
              this.setHeader(i.key, i.value);
            });
          } else {
            Object.keys(key2).forEach((i) => {
              this.setHeader(i, key2[i]);
            });
          }
          return this;
        }
        key2 = this._normalizeHeaderKey(key2);
        headerValue = {
          key: key2,
          value
        };
        for (let i = 0, len = this._headers.length; i < len; i++) {
          if (this._headers[i].key === key2) {
            if (!added) {
              this._headers[i] = headerValue;
              added = true;
            } else {
              this._headers.splice(i, 1);
              i--;
              len--;
            }
          }
        }
        if (!added) {
          this._headers.push(headerValue);
        }
        return this;
      }
      addHeader(key2, value) {
        if (!value && key2 && typeof key2 === "object") {
          if (key2.key && key2.value) {
            this.addHeader(key2.key, key2.value);
          } else if (Array.isArray(key2)) {
            key2.forEach((i) => {
              this.addHeader(i.key, i.value);
            });
          } else {
            Object.keys(key2).forEach((i) => {
              this.addHeader(i, key2[i]);
            });
          }
          return this;
        } else if (Array.isArray(value)) {
          value.forEach((val2) => {
            this.addHeader(key2, val2);
          });
          return this;
        }
        this._headers.push({
          key: this._normalizeHeaderKey(key2),
          value
        });
        return this;
      }
      getHeader(key2) {
        key2 = this._normalizeHeaderKey(key2);
        for (let i = 0, len = this._headers.length; i < len; i++) {
          if (this._headers[i].key === key2) {
            return this._headers[i].value;
          }
        }
      }
      setContent(content) {
        this.content = content;
        if (typeof this.content.pipe === "function") {
          this._contentErrorHandler = (err2) => {
            this.content.removeListener("error", this._contentErrorHandler);
            this.content = err2;
          };
          this.content.once("error", this._contentErrorHandler);
        } else if (typeof this.content === "string") {
          this._isPlainText = mimeFuncs.isPlainText(this.content);
          if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
            this._hasLongLines = true;
          }
        }
        return this;
      }
      build(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        let stream = this.createReadStream();
        let buf = [];
        let buflen = 0;
        let returned = false;
        stream.on("readable", () => {
          let chunk;
          while ((chunk = stream.read()) !== null) {
            buf.push(chunk);
            buflen += chunk.length;
          }
        });
        stream.once("error", (err2) => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(err2);
        });
        stream.once("end", (chunk) => {
          if (returned) {
            return;
          }
          returned = true;
          if (chunk && chunk.length) {
            buf.push(chunk);
            buflen += chunk.length;
          }
          return callback(null, Buffer.concat(buf, buflen));
        });
        return promise;
      }
      getTransferEncoding() {
        let transferEncoding = false;
        let contentType = (this.getHeader("Content-Type") || "").toString().toLowerCase().trim();
        if (this.content) {
          transferEncoding = (this.getHeader("Content-Transfer-Encoding") || "").toString().toLowerCase().trim();
          if (!transferEncoding || !["base64", "quoted-printable"].includes(transferEncoding)) {
            if (/^text\//i.test(contentType)) {
              if (this._isPlainText && !this._hasLongLines) {
                transferEncoding = "7bit";
              } else if (typeof this.content === "string" || this.content instanceof Buffer) {
                transferEncoding = this._getTextEncoding(this.content) === "Q" ? "quoted-printable" : "base64";
              } else {
                transferEncoding = this.textEncoding === "B" ? "base64" : "quoted-printable";
              }
            } else if (!/^(multipart|message)\//i.test(contentType)) {
              transferEncoding = transferEncoding || "base64";
            }
          }
        }
        return transferEncoding;
      }
      buildHeaders() {
        let transferEncoding = this.getTransferEncoding();
        let headers = [];
        if (transferEncoding) {
          this.setHeader("Content-Transfer-Encoding", transferEncoding);
        }
        if (this.filename && !this.getHeader("Content-Disposition")) {
          this.setHeader("Content-Disposition", "attachment");
        }
        if (this.rootNode === this) {
          if (!this.getHeader("Date")) {
            this.setHeader("Date", this.date.toUTCString().replace(/GMT/, "+0000"));
          }
          this.messageId();
          if (!this.getHeader("MIME-Version")) {
            this.setHeader("MIME-Version", "1.0");
          }
        }
        this._headers.forEach((header) => {
          let key2 = header.key;
          let value = header.value;
          let structured;
          let param;
          let options2 = {};
          let formattedHeaders = ["From", "Sender", "To", "Cc", "Bcc", "Reply-To", "Date", "References"];
          if (value && typeof value === "object" && !formattedHeaders.includes(key2)) {
            Object.keys(value).forEach((key3) => {
              if (key3 !== "value") {
                options2[key3] = value[key3];
              }
            });
            value = (value.value || "").toString();
            if (!value.trim()) {
              return;
            }
          }
          if (options2.prepared) {
            if (options2.foldLines) {
              headers.push(mimeFuncs.foldLines(key2 + ": " + value));
            } else {
              headers.push(key2 + ": " + value);
            }
            return;
          }
          switch (header.key) {
            case "Content-Disposition":
              structured = mimeFuncs.parseHeaderValue(value);
              if (this.filename) {
                structured.params.filename = this.filename;
              }
              value = mimeFuncs.buildHeaderValue(structured);
              break;
            case "Content-Type":
              structured = mimeFuncs.parseHeaderValue(value);
              this._handleContentType(structured);
              if (structured.value.match(/^text\/plain\b/) && typeof this.content === "string" && /[\u0080-\uFFFF]/.test(this.content)) {
                structured.params.charset = "utf-8";
              }
              value = mimeFuncs.buildHeaderValue(structured);
              if (this.filename) {
                param = this._encodeWords(this.filename);
                if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
                  param = '"' + param + '"';
                }
                value += "; name=" + param;
              }
              break;
            case "Bcc":
              if (!this.keepBcc) {
                return;
              }
              break;
          }
          value = this._encodeHeaderValue(key2, value);
          if (!(value || "").toString().trim()) {
            return;
          }
          if (typeof this.normalizeHeaderKey === "function") {
            let normalized = this.normalizeHeaderKey(key2, value);
            if (normalized && typeof normalized === "string" && normalized.length) {
              key2 = normalized;
            }
          }
          headers.push(mimeFuncs.foldLines(key2 + ": " + value, 76));
        });
        return headers.join("\r\n");
      }
      createReadStream(options2) {
        options2 = options2 || {};
        let stream = new PassThrough(options2);
        let outputStream = stream;
        let transform;
        this.stream(stream, options2, (err2) => {
          if (err2) {
            outputStream.emit("error", err2);
            return;
          }
          stream.end();
        });
        for (let i = 0, len = this._transforms.length; i < len; i++) {
          transform = typeof this._transforms[i] === "function" ? this._transforms[i]() : this._transforms[i];
          outputStream.once("error", (err2) => {
            transform.emit("error", err2);
          });
          outputStream = outputStream.pipe(transform);
        }
        transform = new LastNewline();
        outputStream.once("error", (err2) => {
          transform.emit("error", err2);
        });
        outputStream = outputStream.pipe(transform);
        for (let i = 0, len = this._processFuncs.length; i < len; i++) {
          transform = this._processFuncs[i];
          outputStream = transform(outputStream);
        }
        if (this.newline) {
          const winbreak = ["win", "windows", "dos", "\r\n"].includes(this.newline.toString().toLowerCase());
          const newlineTransform = winbreak ? new LeWindows() : new LeUnix();
          const stream2 = outputStream.pipe(newlineTransform);
          outputStream.on("error", (err2) => stream2.emit("error", err2));
          return stream2;
        }
        return outputStream;
      }
      transform(transform) {
        this._transforms.push(transform);
      }
      processFunc(processFunc) {
        this._processFuncs.push(processFunc);
      }
      stream(outputStream, options2, done) {
        let transferEncoding = this.getTransferEncoding();
        let contentStream;
        let localStream;
        let returned = false;
        let callback = (err2) => {
          if (returned) {
            return;
          }
          returned = true;
          done(err2);
        };
        let finalize = () => {
          let childId = 0;
          let processChildNode = () => {
            if (childId >= this.childNodes.length) {
              outputStream.write("\r\n--" + this.boundary + "--\r\n");
              return callback();
            }
            let child = this.childNodes[childId++];
            outputStream.write((childId > 1 ? "\r\n" : "") + "--" + this.boundary + "\r\n");
            child.stream(outputStream, options2, (err2) => {
              if (err2) {
                return callback(err2);
              }
              setImmediate(processChildNode);
            });
          };
          if (this.multipart) {
            setImmediate(processChildNode);
          } else {
            return callback();
          }
        };
        let sendContent = () => {
          if (this.content) {
            if (Object.prototype.toString.call(this.content) === "[object Error]") {
              return callback(this.content);
            }
            if (typeof this.content.pipe === "function") {
              this.content.removeListener("error", this._contentErrorHandler);
              this._contentErrorHandler = (err2) => callback(err2);
              this.content.once("error", this._contentErrorHandler);
            }
            let createStream = () => {
              if (["quoted-printable", "base64"].includes(transferEncoding)) {
                contentStream = new (transferEncoding === "base64" ? base64 : qp).Encoder(options2);
                contentStream.pipe(outputStream, {
                  end: false
                });
                contentStream.once("end", finalize);
                contentStream.once("error", (err2) => callback(err2));
                localStream = this._getStream(this.content);
                localStream.pipe(contentStream);
              } else {
                localStream = this._getStream(this.content);
                localStream.pipe(outputStream, {
                  end: false
                });
                localStream.once("end", finalize);
              }
              localStream.once("error", (err2) => callback(err2));
            };
            if (this.content._resolve) {
              let chunks = [];
              let chunklen = 0;
              let returned2 = false;
              let sourceStream = this._getStream(this.content);
              sourceStream.on("error", (err2) => {
                if (returned2) {
                  return;
                }
                returned2 = true;
                callback(err2);
              });
              sourceStream.on("readable", () => {
                let chunk;
                while ((chunk = sourceStream.read()) !== null) {
                  chunks.push(chunk);
                  chunklen += chunk.length;
                }
              });
              sourceStream.on("end", () => {
                if (returned2) {
                  return;
                }
                returned2 = true;
                this.content._resolve = false;
                this.content._resolvedValue = Buffer.concat(chunks, chunklen);
                setImmediate(createStream);
              });
            } else {
              setImmediate(createStream);
            }
            return;
          } else {
            return setImmediate(finalize);
          }
        };
        if (this._raw) {
          setImmediate(() => {
            if (Object.prototype.toString.call(this._raw) === "[object Error]") {
              return callback(this._raw);
            }
            if (typeof this._raw.pipe === "function") {
              this._raw.removeListener("error", this._contentErrorHandler);
            }
            let raw = this._getStream(this._raw);
            raw.pipe(outputStream, {
              end: false
            });
            raw.on("error", (err2) => outputStream.emit("error", err2));
            raw.on("end", finalize);
          });
        } else {
          outputStream.write(this.buildHeaders() + "\r\n\r\n");
          setImmediate(sendContent);
        }
      }
      setEnvelope(envelope) {
        let list;
        this._envelope = {
          from: false,
          to: []
        };
        if (envelope.from) {
          list = [];
          this._convertAddresses(this._parseAddresses(envelope.from), list);
          list = list.filter((address) => address && address.address);
          if (list.length && list[0]) {
            this._envelope.from = list[0].address;
          }
        }
        ["to", "cc", "bcc"].forEach((key2) => {
          if (envelope[key2]) {
            this._convertAddresses(this._parseAddresses(envelope[key2]), this._envelope.to);
          }
        });
        this._envelope.to = this._envelope.to.map((to) => to.address).filter((address) => address);
        let standardFields = ["to", "cc", "bcc", "from"];
        Object.keys(envelope).forEach((key2) => {
          if (!standardFields.includes(key2)) {
            this._envelope[key2] = envelope[key2];
          }
        });
        return this;
      }
      getAddresses() {
        let addresses = {};
        this._headers.forEach((header) => {
          let key2 = header.key.toLowerCase();
          if (["from", "sender", "reply-to", "to", "cc", "bcc"].includes(key2)) {
            if (!Array.isArray(addresses[key2])) {
              addresses[key2] = [];
            }
            this._convertAddresses(this._parseAddresses(header.value), addresses[key2]);
          }
        });
        return addresses;
      }
      getEnvelope() {
        if (this._envelope) {
          return this._envelope;
        }
        let envelope = {
          from: false,
          to: []
        };
        this._headers.forEach((header) => {
          let list = [];
          if (header.key === "From" || !envelope.from && ["Reply-To", "Sender"].includes(header.key)) {
            this._convertAddresses(this._parseAddresses(header.value), list);
            if (list.length && list[0]) {
              envelope.from = list[0].address;
            }
          } else if (["To", "Cc", "Bcc"].includes(header.key)) {
            this._convertAddresses(this._parseAddresses(header.value), envelope.to);
          }
        });
        envelope.to = envelope.to.map((to) => to.address);
        return envelope;
      }
      messageId() {
        let messageId = this.getHeader("Message-ID");
        if (!messageId) {
          messageId = this._generateMessageId();
          this.setHeader("Message-ID", messageId);
        }
        return messageId;
      }
      setRaw(raw) {
        this._raw = raw;
        if (this._raw && typeof this._raw.pipe === "function") {
          this._contentErrorHandler = (err2) => {
            this._raw.removeListener("error", this._contentErrorHandler);
            this._raw = err2;
          };
          this._raw.once("error", this._contentErrorHandler);
        }
        return this;
      }
      _getStream(content) {
        let contentStream;
        if (content._resolvedValue) {
          contentStream = new PassThrough();
          setImmediate(() => contentStream.end(content._resolvedValue));
          return contentStream;
        } else if (typeof content.pipe === "function") {
          return content;
        } else if (content && typeof content.path === "string" && !content.href) {
          if (this.disableFileAccess) {
            contentStream = new PassThrough();
            setImmediate(() => contentStream.emit("error", new Error("File access rejected for " + content.path)));
            return contentStream;
          }
          return fs2.createReadStream(content.path);
        } else if (content && typeof content.href === "string") {
          if (this.disableUrlAccess) {
            contentStream = new PassThrough();
            setImmediate(() => contentStream.emit("error", new Error("Url access rejected for " + content.href)));
            return contentStream;
          }
          return nmfetch(content.href, { headers: content.httpHeaders });
        } else {
          contentStream = new PassThrough();
          setImmediate(() => contentStream.end(content || ""));
          return contentStream;
        }
      }
      _parseAddresses(addresses) {
        return [].concat.apply(
          [],
          [].concat(addresses).map((address) => {
            if (address && address.address) {
              address.address = this._normalizeAddress(address.address);
              address.name = address.name || "";
              return [address];
            }
            return addressparser(address);
          })
        );
      }
      _normalizeHeaderKey(key2) {
        key2 = (key2 || "").toString().replace(/\r?\n|\r/g, " ").trim().toLowerCase().replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, (c) => c.toUpperCase()).replace(/^Content-Features$/i, "Content-features");
        return key2;
      }
      _handleContentType(structured) {
        this.contentType = structured.value.trim().toLowerCase();
        this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf("/") + 1) : false;
        if (this.multipart) {
          this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
        } else {
          this.boundary = false;
        }
      }
      _generateBoundary() {
        return this.rootNode.boundaryPrefix + "-" + this.rootNode.baseBoundary + "-Part_" + this._nodeId;
      }
      _encodeHeaderValue(key2, value) {
        key2 = this._normalizeHeaderKey(key2);
        switch (key2) {
          case "From":
          case "Sender":
          case "To":
          case "Cc":
          case "Bcc":
          case "Reply-To":
            return this._convertAddresses(this._parseAddresses(value));
          case "Message-ID":
          case "In-Reply-To":
          case "Content-Id":
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            if (value.charAt(0) !== "<") {
              value = "<" + value;
            }
            if (value.charAt(value.length - 1) !== ">") {
              value = value + ">";
            }
            return value;
          case "References":
            value = [].concat.apply(
              [],
              [].concat(value || "").map((elm) => {
                elm = (elm || "").toString().replace(/\r?\n|\r/g, " ").trim();
                return elm.replace(/<[^>]*>/g, (str) => str.replace(/\s/g, "")).split(/\s+/);
              })
            ).map((elm) => {
              if (elm.charAt(0) !== "<") {
                elm = "<" + elm;
              }
              if (elm.charAt(elm.length - 1) !== ">") {
                elm = elm + ">";
              }
              return elm;
            });
            return value.join(" ").trim();
          case "Date":
            if (Object.prototype.toString.call(value) === "[object Date]") {
              return value.toUTCString().replace(/GMT/, "+0000");
            }
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            return this._encodeWords(value);
          case "Content-Type":
          case "Content-Disposition":
            return (value || "").toString().replace(/\r?\n|\r/g, " ");
          default:
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            return this._encodeWords(value);
        }
      }
      _convertAddresses(addresses, uniqueList) {
        let values2 = [];
        uniqueList = uniqueList || [];
        [].concat(addresses || []).forEach((address) => {
          if (address.address) {
            address.address = this._normalizeAddress(address.address);
            if (!address.name) {
              values2.push(address.address.indexOf(" ") >= 0 ? `<${address.address}>` : `${address.address}`);
            } else if (address.name) {
              values2.push(`${this._encodeAddressName(address.name)} <${address.address}>`);
            }
            if (address.address) {
              if (!uniqueList.filter((a) => a.address === address.address).length) {
                uniqueList.push(address);
              }
            }
          } else if (address.group) {
            let groupListAddresses = (address.group.length ? this._convertAddresses(address.group, uniqueList) : "").trim();
            values2.push(`${this._encodeAddressName(address.name)}:${groupListAddresses};`);
          }
        });
        return values2.join(", ");
      }
      _normalizeAddress(address) {
        address = (address || "").toString().replace(/[\x00-\x1F<>]+/g, " ").trim();
        let lastAt = address.lastIndexOf("@");
        if (lastAt < 0) {
          return address;
        }
        let user = address.substr(0, lastAt);
        let domain2 = address.substr(lastAt + 1);
        let encodedDomain;
        try {
          encodedDomain = punycode.toASCII(domain2.toLowerCase());
        } catch (err2) {
        }
        if (user.indexOf(" ") >= 0) {
          if (user.charAt(0) !== '"') {
            user = '"' + user;
          }
          if (user.substr(-1) !== '"') {
            user = user + '"';
          }
        }
        return `${user}@${encodedDomain}`;
      }
      _encodeAddressName(name2) {
        if (!/^[\w ']*$/.test(name2)) {
          if (/^[\x20-\x7e]*$/.test(name2)) {
            return '"' + name2.replace(/([\\"])/g, "\\$1") + '"';
          } else {
            return mimeFuncs.encodeWord(name2, this._getTextEncoding(name2), 52);
          }
        }
        return name2;
      }
      _encodeWords(value) {
        return mimeFuncs.encodeWords(value, this._getTextEncoding(value), 52, true);
      }
      _getTextEncoding(value) {
        value = (value || "").toString();
        let encoding = this.textEncoding;
        let latinLen;
        let nonLatinLen;
        if (!encoding) {
          nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length;
          latinLen = (value.match(/[a-z]/gi) || []).length;
          encoding = nonLatinLen < latinLen ? "Q" : "B";
        }
        return encoding;
      }
      _generateMessageId() {
        return "<" + [2, 2, 2, 6].reduce(
          (prev, len) => prev + "-" + crypto2.randomBytes(len).toString("hex"),
          crypto2.randomBytes(4).toString("hex")
        ) + "@" + (this.getEnvelope().from || this.hostname || "localhost").split("@").pop() + ">";
      }
    };
    module.exports = MimeNode;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mail-composer/index.js
var require_mail_composer = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mail-composer/index.js"(exports, module) {
    "use strict";
    var MimeNode = require_mime_node();
    var mimeFuncs = require_mime_funcs();
    var MailComposer = class {
      constructor(mail2) {
        this.mail = mail2 || {};
        this.message = false;
      }
      compile() {
        this._alternatives = this.getAlternatives();
        this._htmlNode = this._alternatives.filter((alternative) => /^text\/html\b/i.test(alternative.contentType)).pop();
        this._attachments = this.getAttachments(!!this._htmlNode);
        this._useRelated = !!(this._htmlNode && this._attachments.related.length);
        this._useAlternative = this._alternatives.length > 1;
        this._useMixed = this._attachments.attached.length > 1 || this._alternatives.length && this._attachments.attached.length === 1;
        if (this.mail.raw) {
          this.message = new MimeNode("message/rfc822", { newline: this.mail.newline }).setRaw(this.mail.raw);
        } else if (this._useMixed) {
          this.message = this._createMixed();
        } else if (this._useAlternative) {
          this.message = this._createAlternative();
        } else if (this._useRelated) {
          this.message = this._createRelated();
        } else {
          this.message = this._createContentNode(
            false,
            [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
              contentType: "text/plain",
              content: ""
            }
          );
        }
        if (this.mail.headers) {
          this.message.addHeader(this.mail.headers);
        }
        ["from", "sender", "to", "cc", "bcc", "reply-to", "in-reply-to", "references", "subject", "message-id", "date"].forEach((header) => {
          let key2 = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
          if (this.mail[key2]) {
            this.message.setHeader(header, this.mail[key2]);
          }
        });
        if (this.mail.envelope) {
          this.message.setEnvelope(this.mail.envelope);
        }
        this.message.messageId();
        return this.message;
      }
      getAttachments(findRelated) {
        let icalEvent, eventObject;
        let attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
          let data;
          let isMessageNode = /^message\//i.test(attachment.contentType);
          if (/^data:/i.test(attachment.path || attachment.href)) {
            attachment = this._processDataUrl(attachment);
          }
          data = {
            contentType: attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin"),
            contentDisposition: attachment.contentDisposition || (isMessageNode ? "inline" : "attachment"),
            contentTransferEncoding: "contentTransferEncoding" in attachment ? attachment.contentTransferEncoding : "base64"
          };
          if (attachment.filename) {
            data.filename = attachment.filename;
          } else if (!isMessageNode && attachment.filename !== false) {
            data.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
            if (data.filename.indexOf(".") < 0) {
              data.filename += "." + mimeFuncs.detectExtension(data.contentType);
            }
          }
          if (/^https?:\/\//i.test(attachment.path)) {
            attachment.href = attachment.path;
            attachment.path = void 0;
          }
          if (attachment.cid) {
            data.cid = attachment.cid;
          }
          if (attachment.raw) {
            data.raw = attachment.raw;
          } else if (attachment.path) {
            data.content = {
              path: attachment.path
            };
          } else if (attachment.href) {
            data.content = {
              href: attachment.href,
              httpHeaders: attachment.httpHeaders
            };
          } else {
            data.content = attachment.content || "";
          }
          if (attachment.encoding) {
            data.encoding = attachment.encoding;
          }
          if (attachment.headers) {
            data.headers = attachment.headers;
          }
          return data;
        });
        if (this.mail.icalEvent) {
          if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
            icalEvent = this.mail.icalEvent;
          } else {
            icalEvent = {
              content: this.mail.icalEvent
            };
          }
          eventObject = {};
          Object.keys(icalEvent).forEach((key2) => {
            eventObject[key2] = icalEvent[key2];
          });
          eventObject.contentType = "application/ics";
          if (!eventObject.headers) {
            eventObject.headers = {};
          }
          eventObject.filename = eventObject.filename || "invite.ics";
          eventObject.headers["Content-Disposition"] = "attachment";
          eventObject.headers["Content-Transfer-Encoding"] = "base64";
        }
        if (!findRelated) {
          return {
            attached: attachments.concat(eventObject || []),
            related: []
          };
        } else {
          return {
            attached: attachments.filter((attachment) => !attachment.cid).concat(eventObject || []),
            related: attachments.filter((attachment) => !!attachment.cid)
          };
        }
      }
      getAlternatives() {
        let alternatives = [], text, html, watchHtml, amp, icalEvent, eventObject;
        if (this.mail.text) {
          if (typeof this.mail.text === "object" && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)) {
            text = this.mail.text;
          } else {
            text = {
              content: this.mail.text
            };
          }
          text.contentType = "text/plain; charset=utf-8";
        }
        if (this.mail.watchHtml) {
          if (typeof this.mail.watchHtml === "object" && (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)) {
            watchHtml = this.mail.watchHtml;
          } else {
            watchHtml = {
              content: this.mail.watchHtml
            };
          }
          watchHtml.contentType = "text/watch-html; charset=utf-8";
        }
        if (this.mail.amp) {
          if (typeof this.mail.amp === "object" && (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw)) {
            amp = this.mail.amp;
          } else {
            amp = {
              content: this.mail.amp
            };
          }
          amp.contentType = "text/x-amp-html; charset=utf-8";
        }
        if (this.mail.icalEvent) {
          if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
            icalEvent = this.mail.icalEvent;
          } else {
            icalEvent = {
              content: this.mail.icalEvent
            };
          }
          eventObject = {};
          Object.keys(icalEvent).forEach((key2) => {
            eventObject[key2] = icalEvent[key2];
          });
          if (eventObject.content && typeof eventObject.content === "object") {
            eventObject.content._resolve = true;
          }
          eventObject.filename = false;
          eventObject.contentType = "text/calendar; charset=utf-8; method=" + (eventObject.method || "PUBLISH").toString().trim().toUpperCase();
          if (!eventObject.headers) {
            eventObject.headers = {};
          }
        }
        if (this.mail.html) {
          if (typeof this.mail.html === "object" && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)) {
            html = this.mail.html;
          } else {
            html = {
              content: this.mail.html
            };
          }
          html.contentType = "text/html; charset=utf-8";
        }
        [].concat(text || []).concat(watchHtml || []).concat(amp || []).concat(html || []).concat(eventObject || []).concat(this.mail.alternatives || []).forEach((alternative) => {
          let data;
          if (/^data:/i.test(alternative.path || alternative.href)) {
            alternative = this._processDataUrl(alternative);
          }
          data = {
            contentType: alternative.contentType || mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || "txt"),
            contentTransferEncoding: alternative.contentTransferEncoding
          };
          if (alternative.filename) {
            data.filename = alternative.filename;
          }
          if (/^https?:\/\//i.test(alternative.path)) {
            alternative.href = alternative.path;
            alternative.path = void 0;
          }
          if (alternative.raw) {
            data.raw = alternative.raw;
          } else if (alternative.path) {
            data.content = {
              path: alternative.path
            };
          } else if (alternative.href) {
            data.content = {
              href: alternative.href
            };
          } else {
            data.content = alternative.content || "";
          }
          if (alternative.encoding) {
            data.encoding = alternative.encoding;
          }
          if (alternative.headers) {
            data.headers = alternative.headers;
          }
          alternatives.push(data);
        });
        return alternatives;
      }
      _createMixed(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode("multipart/mixed", {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild("multipart/mixed", {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        if (this._useAlternative) {
          this._createAlternative(node);
        } else if (this._useRelated) {
          this._createRelated(node);
        }
        [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach((element) => {
          if (!this._useRelated || element !== this._htmlNode) {
            this._createContentNode(node, element);
          }
        });
        return node;
      }
      _createAlternative(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode("multipart/alternative", {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild("multipart/alternative", {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        this._alternatives.forEach((alternative) => {
          if (this._useRelated && this._htmlNode === alternative) {
            this._createRelated(node);
          } else {
            this._createContentNode(node, alternative);
          }
        });
        return node;
      }
      _createRelated(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode('multipart/related; type="text/html"', {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild('multipart/related; type="text/html"', {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        this._createContentNode(node, this._htmlNode);
        this._attachments.related.forEach((alternative) => this._createContentNode(node, alternative));
        return node;
      }
      _createContentNode(parentNode, element) {
        element = element || {};
        element.content = element.content || "";
        let node;
        let encoding = (element.encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
        if (!parentNode) {
          node = new MimeNode(element.contentType, {
            filename: element.filename,
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild(element.contentType, {
            filename: element.filename,
            textEncoding: this.mail.textEncoding,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        if (element.headers) {
          node.addHeader(element.headers);
        }
        if (element.cid) {
          node.setHeader("Content-Id", "<" + element.cid.replace(/[<>]/g, "") + ">");
        }
        if (element.contentTransferEncoding) {
          node.setHeader("Content-Transfer-Encoding", element.contentTransferEncoding);
        } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
          node.setHeader("Content-Transfer-Encoding", this.mail.encoding);
        }
        if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
          node.setHeader("Content-Disposition", element.contentDisposition || (element.cid ? "inline" : "attachment"));
        }
        if (typeof element.content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
          element.content = Buffer.from(element.content, encoding);
        }
        if (element.raw) {
          node.setRaw(element.raw);
        } else {
          node.setContent(element.content);
        }
        return node;
      }
      _processDataUrl(element) {
        let parts = (element.path || element.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
        if (!parts) {
          return element;
        }
        element.content = /\bbase64$/i.test(parts[1]) ? Buffer.from(parts[2], "base64") : Buffer.from(decodeURIComponent(parts[2]));
        if ("path" in element) {
          element.path = false;
        }
        if ("href" in element) {
          element.href = false;
        }
        parts[1].split(";").forEach((item) => {
          if (/^\w+\/[^/]+$/i.test(item)) {
            element.contentType = element.contentType || item.toLowerCase();
          }
        });
        return element;
      }
    };
    module.exports = MailComposer;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/dkim/message-parser.js
var require_message_parser = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/dkim/message-parser.js"(exports, module) {
    "use strict";
    var Transform = __require("stream").Transform;
    var MessageParser = class extends Transform {
      constructor(options2) {
        super(options2);
        this.lastBytes = Buffer.alloc(4);
        this.headersParsed = false;
        this.headerBytes = 0;
        this.headerChunks = [];
        this.rawHeaders = false;
        this.bodySize = 0;
      }
      updateLastBytes(data) {
        let lblen = this.lastBytes.length;
        let nblen = Math.min(data.length, lblen);
        for (let i = 0, len = lblen - nblen; i < len; i++) {
          this.lastBytes[i] = this.lastBytes[i + nblen];
        }
        for (let i = 1; i <= nblen; i++) {
          this.lastBytes[lblen - i] = data[data.length - i];
        }
      }
      checkHeaders(data) {
        if (this.headersParsed) {
          return true;
        }
        let lblen = this.lastBytes.length;
        let headerPos = 0;
        this.curLinePos = 0;
        for (let i = 0, len = this.lastBytes.length + data.length; i < len; i++) {
          let chr;
          if (i < lblen) {
            chr = this.lastBytes[i];
          } else {
            chr = data[i - lblen];
          }
          if (chr === 10 && i) {
            let pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
            let pr2 = i > 1 ? i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen] : false;
            if (pr1 === 10) {
              this.headersParsed = true;
              headerPos = i - lblen + 1;
              this.headerBytes += headerPos;
              break;
            } else if (pr1 === 13 && pr2 === 10) {
              this.headersParsed = true;
              headerPos = i - lblen + 1;
              this.headerBytes += headerPos;
              break;
            }
          }
        }
        if (this.headersParsed) {
          this.headerChunks.push(data.slice(0, headerPos));
          this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
          this.headerChunks = null;
          this.emit("headers", this.parseHeaders());
          if (data.length - 1 > headerPos) {
            let chunk = data.slice(headerPos);
            this.bodySize += chunk.length;
            setImmediate(() => this.push(chunk));
          }
          return false;
        } else {
          this.headerBytes += data.length;
          this.headerChunks.push(data);
        }
        this.updateLastBytes(data);
        return false;
      }
      _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
          return callback();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk, encoding);
        }
        let headersFound;
        try {
          headersFound = this.checkHeaders(chunk);
        } catch (E) {
          return callback(E);
        }
        if (headersFound) {
          this.bodySize += chunk.length;
          this.push(chunk);
        }
        setImmediate(callback);
      }
      _flush(callback) {
        if (this.headerChunks) {
          let chunk = Buffer.concat(this.headerChunks, this.headerBytes);
          this.bodySize += chunk.length;
          this.push(chunk);
          this.headerChunks = null;
        }
        callback();
      }
      parseHeaders() {
        let lines = (this.rawHeaders || "").toString().split(/\r?\n/);
        for (let i = lines.length - 1; i > 0; i--) {
          if (/^\s/.test(lines[i])) {
            lines[i - 1] += "\n" + lines[i];
            lines.splice(i, 1);
          }
        }
        return lines.filter((line) => line.trim()).map((line) => ({
          key: line.substr(0, line.indexOf(":")).trim().toLowerCase(),
          line
        }));
      }
    };
    module.exports = MessageParser;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/dkim/relaxed-body.js
var require_relaxed_body = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/dkim/relaxed-body.js"(exports, module) {
    "use strict";
    var Transform = __require("stream").Transform;
    var crypto2 = __require("crypto");
    var RelaxedBody = class extends Transform {
      constructor(options2) {
        super();
        options2 = options2 || {};
        this.chunkBuffer = [];
        this.chunkBufferLen = 0;
        this.bodyHash = crypto2.createHash(options2.hashAlgo || "sha1");
        this.remainder = "";
        this.byteLength = 0;
        this.debug = options2.debug;
        this._debugBody = options2.debug ? [] : false;
      }
      updateHash(chunk) {
        let bodyStr;
        let nextRemainder = "";
        let state = "file";
        for (let i = chunk.length - 1; i >= 0; i--) {
          let c = chunk[i];
          if (state === "file" && (c === 10 || c === 13)) {
          } else if (state === "file" && (c === 9 || c === 32)) {
            state = "line";
          } else if (state === "line" && (c === 9 || c === 32)) {
          } else if (state === "file" || state === "line") {
            state = "body";
            if (i === chunk.length - 1) {
              break;
            }
          }
          if (i === 0) {
            if (state === "file" && (!this.remainder || /[\r\n]$/.test(this.remainder)) || state === "line" && (!this.remainder || /[ \t]$/.test(this.remainder))) {
              this.remainder += chunk.toString("binary");
              return;
            } else if (state === "line" || state === "file") {
              nextRemainder = chunk.toString("binary");
              chunk = false;
              break;
            }
          }
          if (state !== "body") {
            continue;
          }
          nextRemainder = chunk.slice(i + 1).toString("binary");
          chunk = chunk.slice(0, i + 1);
          break;
        }
        let needsFixing = !!this.remainder;
        if (chunk && !needsFixing) {
          for (let i = 0, len = chunk.length; i < len; i++) {
            if (i && chunk[i] === 10 && chunk[i - 1] !== 13) {
              needsFixing = true;
              break;
            } else if (i && chunk[i] === 13 && chunk[i - 1] === 32) {
              needsFixing = true;
              break;
            } else if (i && chunk[i] === 32 && chunk[i - 1] === 32) {
              needsFixing = true;
              break;
            } else if (chunk[i] === 9) {
              needsFixing = true;
              break;
            }
          }
        }
        if (needsFixing) {
          bodyStr = this.remainder + (chunk ? chunk.toString("binary") : "");
          this.remainder = nextRemainder;
          bodyStr = bodyStr.replace(/\r?\n/g, "\n").replace(/[ \t]*$/gm, "").replace(/[ \t]+/gm, " ").replace(/\n/g, "\r\n");
          chunk = Buffer.from(bodyStr, "binary");
        } else if (nextRemainder) {
          this.remainder = nextRemainder;
        }
        if (this.debug) {
          this._debugBody.push(chunk);
        }
        this.bodyHash.update(chunk);
      }
      _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
          return callback();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk, encoding);
        }
        this.updateHash(chunk);
        this.byteLength += chunk.length;
        this.push(chunk);
        callback();
      }
      _flush(callback) {
        if (/[\r\n]$/.test(this.remainder) && this.byteLength > 2) {
          this.bodyHash.update(Buffer.from("\r\n"));
        }
        if (!this.byteLength) {
          this.push(Buffer.from("\r\n"));
        }
        this.emit("hash", this.bodyHash.digest("base64"), this.debug ? Buffer.concat(this._debugBody) : false);
        callback();
      }
    };
    module.exports = RelaxedBody;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/dkim/sign.js
var require_sign = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/dkim/sign.js"(exports, module) {
    "use strict";
    var punycode = __require("punycode");
    var mimeFuncs = require_mime_funcs();
    var crypto2 = __require("crypto");
    module.exports = (headers, hashAlgo, bodyHash, options2) => {
      options2 = options2 || {};
      let defaultFieldNames = "From:Sender:Reply-To:Subject:Date:Message-ID:To:Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:Content-Description:Resent-Date:Resent-From:Resent-Sender:Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:List-Owner:List-Archive";
      let fieldNames = options2.headerFieldNames || defaultFieldNames;
      let canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options2.skipFields);
      let dkimHeader = generateDKIMHeader(options2.domainName, options2.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);
      let signer, signature;
      canonicalizedHeaderData.headers += "dkim-signature:" + relaxedHeaderLine(dkimHeader);
      signer = crypto2.createSign(("rsa-" + hashAlgo).toUpperCase());
      signer.update(canonicalizedHeaderData.headers);
      try {
        signature = signer.sign(options2.privateKey, "base64");
      } catch (E) {
        return false;
      }
      return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, "$&\r\n ").trim();
    };
    module.exports.relaxedHeaders = relaxedHeaders;
    function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
      let dkim = [
        "v=1",
        "a=rsa-" + hashAlgo,
        "c=relaxed/relaxed",
        "d=" + punycode.toASCII(domainName),
        "q=dns/txt",
        "s=" + keySelector,
        "bh=" + bodyHash,
        "h=" + fieldNames
      ].join("; ");
      return mimeFuncs.foldLines("DKIM-Signature: " + dkim, 76) + ";\r\n b=";
    }
    function relaxedHeaders(headers, fieldNames, skipFields) {
      let includedFields = /* @__PURE__ */ new Set();
      let skip = /* @__PURE__ */ new Set();
      let headerFields = /* @__PURE__ */ new Map();
      (skipFields || "").toLowerCase().split(":").forEach((field) => {
        skip.add(field.trim());
      });
      (fieldNames || "").toLowerCase().split(":").filter((field) => !skip.has(field.trim())).forEach((field) => {
        includedFields.add(field.trim());
      });
      for (let i = headers.length - 1; i >= 0; i--) {
        let line = headers[i];
        if (includedFields.has(line.key) && !headerFields.has(line.key)) {
          headerFields.set(line.key, relaxedHeaderLine(line.line));
        }
      }
      let headersList = [];
      let fields = [];
      includedFields.forEach((field) => {
        if (headerFields.has(field)) {
          fields.push(field);
          headersList.push(field + ":" + headerFields.get(field));
        }
      });
      return {
        headers: headersList.join("\r\n") + "\r\n",
        fieldNames: fields.join(":")
      };
    }
    function relaxedHeaderLine(line) {
      return line.substr(line.indexOf(":") + 1).replace(/\r?\n/g, "").replace(/\s+/g, " ").trim();
    }
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/dkim/index.js
var require_dkim = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/dkim/index.js"(exports, module) {
    "use strict";
    var MessageParser = require_message_parser();
    var RelaxedBody = require_relaxed_body();
    var sign = require_sign();
    var PassThrough = __require("stream").PassThrough;
    var fs2 = __require("fs");
    var path = __require("path");
    var crypto2 = __require("crypto");
    var DKIM_ALGO = "sha256";
    var MAX_MESSAGE_SIZE = 128 * 1024;
    var DKIMSigner = class {
      constructor(options2, keys, input, output) {
        this.options = options2 || {};
        this.keys = keys;
        this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
        this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;
        this.cacheDir = this.options.cacheDir || false;
        this.chunks = [];
        this.chunklen = 0;
        this.readPos = 0;
        this.cachePath = this.cacheDir ? path.join(this.cacheDir, "message." + Date.now() + "-" + crypto2.randomBytes(14).toString("hex")) : false;
        this.cache = false;
        this.headers = false;
        this.bodyHash = false;
        this.parser = false;
        this.relaxedBody = false;
        this.input = input;
        this.output = output;
        this.output.usingCache = false;
        this.hasErrored = false;
        this.input.on("error", (err2) => {
          this.hasErrored = true;
          this.cleanup();
          output.emit("error", err2);
        });
      }
      cleanup() {
        if (!this.cache || !this.cachePath) {
          return;
        }
        fs2.unlink(this.cachePath, () => false);
      }
      createReadCache() {
        this.cache = fs2.createReadStream(this.cachePath);
        this.cache.once("error", (err2) => {
          this.cleanup();
          this.output.emit("error", err2);
        });
        this.cache.once("close", () => {
          this.cleanup();
        });
        this.cache.pipe(this.output);
      }
      sendNextChunk() {
        if (this.hasErrored) {
          return;
        }
        if (this.readPos >= this.chunks.length) {
          if (!this.cache) {
            return this.output.end();
          }
          return this.createReadCache();
        }
        let chunk = this.chunks[this.readPos++];
        if (this.output.write(chunk) === false) {
          return this.output.once("drain", () => {
            this.sendNextChunk();
          });
        }
        setImmediate(() => this.sendNextChunk());
      }
      sendSignedOutput() {
        let keyPos = 0;
        let signNextKey = () => {
          if (keyPos >= this.keys.length) {
            this.output.write(this.parser.rawHeaders);
            return setImmediate(() => this.sendNextChunk());
          }
          let key2 = this.keys[keyPos++];
          let dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
            domainName: key2.domainName,
            keySelector: key2.keySelector,
            privateKey: key2.privateKey,
            headerFieldNames: this.options.headerFieldNames,
            skipFields: this.options.skipFields
          });
          if (dkimField) {
            this.output.write(Buffer.from(dkimField + "\r\n"));
          }
          return setImmediate(signNextKey);
        };
        if (this.bodyHash && this.headers) {
          return signNextKey();
        }
        this.output.write(this.parser.rawHeaders);
        this.sendNextChunk();
      }
      createWriteCache() {
        this.output.usingCache = true;
        this.cache = fs2.createWriteStream(this.cachePath);
        this.cache.once("error", (err2) => {
          this.cleanup();
          this.relaxedBody.unpipe(this.cache);
          this.relaxedBody.on("readable", () => {
            while (this.relaxedBody.read() !== null) {
            }
          });
          this.hasErrored = true;
          this.output.emit("error", err2);
        });
        this.cache.once("close", () => {
          this.sendSignedOutput();
        });
        this.relaxedBody.removeAllListeners("readable");
        this.relaxedBody.pipe(this.cache);
      }
      signStream() {
        this.parser = new MessageParser();
        this.relaxedBody = new RelaxedBody({
          hashAlgo: this.hashAlgo
        });
        this.parser.on("headers", (value) => {
          this.headers = value;
        });
        this.relaxedBody.on("hash", (value) => {
          this.bodyHash = value;
        });
        this.relaxedBody.on("readable", () => {
          let chunk;
          if (this.cache) {
            return;
          }
          while ((chunk = this.relaxedBody.read()) !== null) {
            this.chunks.push(chunk);
            this.chunklen += chunk.length;
            if (this.chunklen >= this.cacheTreshold && this.cachePath) {
              return this.createWriteCache();
            }
          }
        });
        this.relaxedBody.on("end", () => {
          if (this.cache) {
            return;
          }
          this.sendSignedOutput();
        });
        this.parser.pipe(this.relaxedBody);
        setImmediate(() => this.input.pipe(this.parser));
      }
    };
    var DKIM = class {
      constructor(options2) {
        this.options = options2 || {};
        this.keys = [].concat(
          this.options.keys || {
            domainName: options2.domainName,
            keySelector: options2.keySelector,
            privateKey: options2.privateKey
          }
        );
      }
      sign(input, extraOptions) {
        let output = new PassThrough();
        let inputStream = input;
        let writeValue = false;
        if (Buffer.isBuffer(input)) {
          writeValue = input;
          inputStream = new PassThrough();
        } else if (typeof input === "string") {
          writeValue = Buffer.from(input);
          inputStream = new PassThrough();
        }
        let options2 = this.options;
        if (extraOptions && Object.keys(extraOptions).length) {
          options2 = {};
          Object.keys(this.options || {}).forEach((key2) => {
            options2[key2] = this.options[key2];
          });
          Object.keys(extraOptions || {}).forEach((key2) => {
            if (!(key2 in options2)) {
              options2[key2] = extraOptions[key2];
            }
          });
        }
        let signer = new DKIMSigner(options2, this.keys, inputStream, output);
        setImmediate(() => {
          signer.signStream();
          if (writeValue) {
            setImmediate(() => {
              inputStream.end(writeValue);
            });
          }
        });
        return output;
      }
    };
    module.exports = DKIM;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js
var require_http_proxy_client = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js"(exports, module) {
    "use strict";
    var net2 = __require("net");
    var tls2 = __require("tls");
    var urllib = __require("url");
    function httpProxyClient(proxyUrl, destinationPort, destinationHost, callback) {
      let proxy = urllib.parse(proxyUrl);
      let options2;
      let connect;
      let socket;
      options2 = {
        host: proxy.hostname,
        port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === "https:" ? 443 : 80
      };
      if (proxy.protocol === "https:") {
        options2.rejectUnauthorized = false;
        connect = tls2.connect.bind(tls2);
      } else {
        connect = net2.connect.bind(net2);
      }
      let finished = false;
      let tempSocketErr = (err2) => {
        if (finished) {
          return;
        }
        finished = true;
        try {
          socket.destroy();
        } catch (E) {
        }
        callback(err2);
      };
      let timeoutErr = () => {
        let err2 = new Error("Proxy socket timed out");
        err2.code = "ETIMEDOUT";
        tempSocketErr(err2);
      };
      socket = connect(options2, () => {
        if (finished) {
          return;
        }
        let reqHeaders = {
          Host: destinationHost + ":" + destinationPort,
          Connection: "close"
        };
        if (proxy.auth) {
          reqHeaders["Proxy-Authorization"] = "Basic " + Buffer.from(proxy.auth).toString("base64");
        }
        socket.write(
          "CONNECT " + destinationHost + ":" + destinationPort + " HTTP/1.1\r\n" + Object.keys(reqHeaders).map((key2) => key2 + ": " + reqHeaders[key2]).join("\r\n") + "\r\n\r\n"
        );
        let headers = "";
        let onSocketData = (chunk) => {
          let match;
          let remainder;
          if (finished) {
            return;
          }
          headers += chunk.toString("binary");
          if (match = headers.match(/\r\n\r\n/)) {
            socket.removeListener("data", onSocketData);
            remainder = headers.substr(match.index + match[0].length);
            headers = headers.substr(0, match.index);
            if (remainder) {
              socket.unshift(Buffer.from(remainder, "binary"));
            }
            finished = true;
            match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
            if (!match || (match[1] || "").charAt(0) !== "2") {
              try {
                socket.destroy();
              } catch (E) {
              }
              return callback(new Error("Invalid response from proxy" + (match && ": " + match[1] || "")));
            }
            socket.removeListener("error", tempSocketErr);
            socket.removeListener("timeout", timeoutErr);
            socket.setTimeout(0);
            return callback(null, socket);
          }
        };
        socket.on("data", onSocketData);
      });
      socket.setTimeout(httpProxyClient.timeout || 30 * 1e3);
      socket.on("timeout", timeoutErr);
      socket.once("error", tempSocketErr);
    }
    module.exports = httpProxyClient;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mailer/mail-message.js
var require_mail_message = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mailer/mail-message.js"(exports, module) {
    "use strict";
    var shared = require_shared();
    var MimeNode = require_mime_node();
    var mimeFuncs = require_mime_funcs();
    var MailMessage = class {
      constructor(mailer, data) {
        this.mailer = mailer;
        this.data = {};
        this.message = null;
        data = data || {};
        let options2 = mailer.options || {};
        let defaults2 = mailer._defaults || {};
        Object.keys(data).forEach((key2) => {
          this.data[key2] = data[key2];
        });
        this.data.headers = this.data.headers || {};
        Object.keys(defaults2).forEach((key2) => {
          if (!(key2 in this.data)) {
            this.data[key2] = defaults2[key2];
          } else if (key2 === "headers") {
            Object.keys(defaults2.headers).forEach((key3) => {
              if (!(key3 in this.data.headers)) {
                this.data.headers[key3] = defaults2.headers[key3];
              }
            });
          }
        });
        ["disableFileAccess", "disableUrlAccess", "normalizeHeaderKey"].forEach((key2) => {
          if (key2 in options2) {
            this.data[key2] = options2[key2];
          }
        });
      }
      resolveContent(...args) {
        return shared.resolveContent(...args);
      }
      resolveAll(callback) {
        let keys = [
          [this.data, "html"],
          [this.data, "text"],
          [this.data, "watchHtml"],
          [this.data, "amp"],
          [this.data, "icalEvent"]
        ];
        if (this.data.alternatives && this.data.alternatives.length) {
          this.data.alternatives.forEach((alternative, i) => {
            keys.push([this.data.alternatives, i]);
          });
        }
        if (this.data.attachments && this.data.attachments.length) {
          this.data.attachments.forEach((attachment, i) => {
            if (!attachment.filename) {
              attachment.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
              if (attachment.filename.indexOf(".") < 0) {
                attachment.filename += "." + mimeFuncs.detectExtension(attachment.contentType);
              }
            }
            if (!attachment.contentType) {
              attachment.contentType = mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin");
            }
            keys.push([this.data.attachments, i]);
          });
        }
        let mimeNode = new MimeNode();
        let addressKeys = ["from", "to", "cc", "bcc", "sender", "replyTo"];
        addressKeys.forEach((address) => {
          let value;
          if (this.message) {
            value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === "replyTo" ? "reply-to" : address)) || []);
          } else if (this.data[address]) {
            value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
          }
          if (value && value.length) {
            this.data[address] = value;
          } else if (address in this.data) {
            this.data[address] = null;
          }
        });
        let singleKeys = ["from", "sender"];
        singleKeys.forEach((address) => {
          if (this.data[address]) {
            this.data[address] = this.data[address].shift();
          }
        });
        let pos = 0;
        let resolveNext = () => {
          if (pos >= keys.length) {
            return callback(null, this.data);
          }
          let args = keys[pos++];
          if (!args[0] || !args[0][args[1]]) {
            return resolveNext();
          }
          shared.resolveContent(...args, (err2, value) => {
            if (err2) {
              return callback(err2);
            }
            let node = {
              content: value
            };
            if (args[0][args[1]] && typeof args[0][args[1]] === "object" && !Buffer.isBuffer(args[0][args[1]])) {
              Object.keys(args[0][args[1]]).forEach((key2) => {
                if (!(key2 in node) && !["content", "path", "href", "raw"].includes(key2)) {
                  node[key2] = args[0][args[1]][key2];
                }
              });
            }
            args[0][args[1]] = node;
            resolveNext();
          });
        };
        setImmediate(() => resolveNext());
      }
      normalize(callback) {
        let envelope = this.data.envelope || this.message.getEnvelope();
        let messageId = this.message.messageId();
        this.resolveAll((err2, data) => {
          if (err2) {
            return callback(err2);
          }
          data.envelope = envelope;
          data.messageId = messageId;
          ["html", "text", "watchHtml", "amp"].forEach((key2) => {
            if (data[key2] && data[key2].content) {
              if (typeof data[key2].content === "string") {
                data[key2] = data[key2].content;
              } else if (Buffer.isBuffer(data[key2].content)) {
                data[key2] = data[key2].content.toString();
              }
            }
          });
          if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
            data.icalEvent.content = data.icalEvent.content.toString("base64");
            data.icalEvent.encoding = "base64";
          }
          if (data.alternatives && data.alternatives.length) {
            data.alternatives.forEach((alternative) => {
              if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
                alternative.content = alternative.content.toString("base64");
                alternative.encoding = "base64";
              }
            });
          }
          if (data.attachments && data.attachments.length) {
            data.attachments.forEach((attachment) => {
              if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
                attachment.content = attachment.content.toString("base64");
                attachment.encoding = "base64";
              }
            });
          }
          data.normalizedHeaders = {};
          Object.keys(data.headers || {}).forEach((key2) => {
            let value = [].concat(data.headers[key2] || []).shift();
            value = value && value.value || value;
            if (value) {
              if (["references", "in-reply-to", "message-id", "content-id"].includes(key2)) {
                value = this.message._encodeHeaderValue(key2, value);
              }
              data.normalizedHeaders[key2] = value;
            }
          });
          if (data.list && typeof data.list === "object") {
            let listHeaders = this._getListHeaders(data.list);
            listHeaders.forEach((entry) => {
              data.normalizedHeaders[entry.key] = entry.value.map((val2) => val2 && val2.value || val2).join(", ");
            });
          }
          if (data.references) {
            data.normalizedHeaders.references = this.message._encodeHeaderValue("references", data.references);
          }
          if (data.inReplyTo) {
            data.normalizedHeaders["in-reply-to"] = this.message._encodeHeaderValue("in-reply-to", data.inReplyTo);
          }
          return callback(null, data);
        });
      }
      setMailerHeader() {
        if (!this.message || !this.data.xMailer) {
          return;
        }
        this.message.setHeader("X-Mailer", this.data.xMailer);
      }
      setPriorityHeaders() {
        if (!this.message || !this.data.priority) {
          return;
        }
        switch ((this.data.priority || "").toString().toLowerCase()) {
          case "high":
            this.message.setHeader("X-Priority", "1 (Highest)");
            this.message.setHeader("X-MSMail-Priority", "High");
            this.message.setHeader("Importance", "High");
            break;
          case "low":
            this.message.setHeader("X-Priority", "5 (Lowest)");
            this.message.setHeader("X-MSMail-Priority", "Low");
            this.message.setHeader("Importance", "Low");
            break;
          default:
        }
      }
      setListHeaders() {
        if (!this.message || !this.data.list || typeof this.data.list !== "object") {
          return;
        }
        if (this.data.list && typeof this.data.list === "object") {
          this._getListHeaders(this.data.list).forEach((listHeader) => {
            listHeader.value.forEach((value) => {
              this.message.addHeader(listHeader.key, value);
            });
          });
        }
      }
      _getListHeaders(listData) {
        return Object.keys(listData).map((key2) => ({
          key: "list-" + key2.toLowerCase().trim(),
          value: [].concat(listData[key2] || []).map((value) => ({
            prepared: true,
            foldLines: true,
            value: [].concat(value || []).map((value2) => {
              if (typeof value2 === "string") {
                value2 = {
                  url: value2
                };
              }
              if (value2 && value2.url) {
                if (key2.toLowerCase().trim() === "id") {
                  let comment2 = value2.comment || "";
                  if (mimeFuncs.isPlainText(comment2)) {
                    comment2 = '"' + comment2 + '"';
                  } else {
                    comment2 = mimeFuncs.encodeWord(comment2);
                  }
                  return (value2.comment ? comment2 + " " : "") + this._formatListUrl(value2.url).replace(/^<[^:]+\/{,2}/, "");
                }
                let comment = value2.comment || "";
                if (!mimeFuncs.isPlainText(comment)) {
                  comment = mimeFuncs.encodeWord(comment);
                }
                return this._formatListUrl(value2.url) + (value2.comment ? " (" + comment + ")" : "");
              }
              return "";
            }).filter((value2) => value2).join(", ")
          }))
        }));
      }
      _formatListUrl(url) {
        url = url.replace(/[\s<]+|[\s>]+/g, "");
        if (/^(https?|mailto|ftp):/.test(url)) {
          return "<" + url + ">";
        }
        if (/^[^@]+@[^@]+$/.test(url)) {
          return "<mailto:" + url + ">";
        }
        return "<http://" + url + ">";
      }
    };
    module.exports = MailMessage;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mailer/index.js
var require_mailer = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/mailer/index.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var shared = require_shared();
    var mimeTypes = require_mime_types();
    var MailComposer = require_mail_composer();
    var DKIM = require_dkim();
    var httpProxyClient = require_http_proxy_client();
    var util2 = __require("util");
    var urllib = __require("url");
    var packageData = require_package();
    var MailMessage = require_mail_message();
    var net2 = __require("net");
    var dns = __require("dns");
    var crypto2 = __require("crypto");
    var Mail = class extends EventEmitter {
      constructor(transporter, options2, defaults2) {
        super();
        this.options = options2 || {};
        this._defaults = defaults2 || {};
        this._defaultPlugins = {
          compile: [(...args) => this._convertDataImages(...args)],
          stream: []
        };
        this._userPlugins = {
          compile: [],
          stream: []
        };
        this.meta = /* @__PURE__ */ new Map();
        this.dkim = this.options.dkim ? new DKIM(this.options.dkim) : false;
        this.transporter = transporter;
        this.transporter.mailer = this;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "mail"
        });
        this.logger.debug(
          {
            tnx: "create"
          },
          "Creating transport: %s",
          this.getVersionString()
        );
        if (typeof this.transporter.on === "function") {
          this.transporter.on("log", (log) => {
            this.logger.debug(
              {
                tnx: "transport"
              },
              "%s: %s",
              log.type,
              log.message
            );
          });
          this.transporter.on("error", (err2) => {
            this.logger.error(
              {
                err: err2,
                tnx: "transport"
              },
              "Transport Error: %s",
              err2.message
            );
            this.emit("error", err2);
          });
          this.transporter.on("idle", (...args) => {
            this.emit("idle", ...args);
          });
        }
        ["close", "isIdle", "verify"].forEach((method) => {
          this[method] = (...args) => {
            if (typeof this.transporter[method] === "function") {
              if (method === "verify" && typeof this.getSocket === "function") {
                this.transporter.getSocket = this.getSocket;
                this.getSocket = false;
              }
              return this.transporter[method](...args);
            } else {
              this.logger.warn(
                {
                  tnx: "transport",
                  methodName: method
                },
                "Non existing method %s called for transport",
                method
              );
              return false;
            }
          };
        });
        if (this.options.proxy && typeof this.options.proxy === "string") {
          this.setupProxy(this.options.proxy);
        }
      }
      use(step, plugin) {
        step = (step || "").toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
          this._userPlugins[step] = [plugin];
        } else {
          this._userPlugins[step].push(plugin);
        }
        return this;
      }
      sendMail(data, callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        if (typeof this.getSocket === "function") {
          this.transporter.getSocket = this.getSocket;
          this.getSocket = false;
        }
        let mail2 = new MailMessage(this, data);
        this.logger.debug(
          {
            tnx: "transport",
            name: this.transporter.name,
            version: this.transporter.version,
            action: "send"
          },
          "Sending mail using %s/%s",
          this.transporter.name,
          this.transporter.version
        );
        this._processPlugins("compile", mail2, (err2) => {
          if (err2) {
            this.logger.error(
              {
                err: err2,
                tnx: "plugin",
                action: "compile"
              },
              "PluginCompile Error: %s",
              err2.message
            );
            return callback(err2);
          }
          mail2.message = new MailComposer(mail2.data).compile();
          mail2.setMailerHeader();
          mail2.setPriorityHeaders();
          mail2.setListHeaders();
          this._processPlugins("stream", mail2, (err3) => {
            if (err3) {
              this.logger.error(
                {
                  err: err3,
                  tnx: "plugin",
                  action: "stream"
                },
                "PluginStream Error: %s",
                err3.message
              );
              return callback(err3);
            }
            if (mail2.data.dkim || this.dkim) {
              mail2.message.processFunc((input) => {
                let dkim = mail2.data.dkim ? new DKIM(mail2.data.dkim) : this.dkim;
                this.logger.debug(
                  {
                    tnx: "DKIM",
                    messageId: mail2.message.messageId(),
                    dkimDomains: dkim.keys.map((key2) => key2.keySelector + "." + key2.domainName).join(", ")
                  },
                  "Signing outgoing message with %s keys",
                  dkim.keys.length
                );
                return dkim.sign(input, mail2.data._dkim);
              });
            }
            this.transporter.send(mail2, (...args) => {
              if (args[0]) {
                this.logger.error(
                  {
                    err: args[0],
                    tnx: "transport",
                    action: "send"
                  },
                  "Send Error: %s",
                  args[0].message
                );
              }
              callback(...args);
            });
          });
        });
        return promise;
      }
      getVersionString() {
        return util2.format("%s (%s; +%s; %s/%s)", packageData.name, packageData.version, packageData.homepage, this.transporter.name, this.transporter.version);
      }
      _processPlugins(step, mail2, callback) {
        step = (step || "").toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
          return callback();
        }
        let userPlugins = this._userPlugins[step] || [];
        let defaultPlugins = this._defaultPlugins[step] || [];
        if (userPlugins.length) {
          this.logger.debug(
            {
              tnx: "transaction",
              pluginCount: userPlugins.length,
              step
            },
            "Using %s plugins for %s",
            userPlugins.length,
            step
          );
        }
        if (userPlugins.length + defaultPlugins.length === 0) {
          return callback();
        }
        let pos = 0;
        let block2 = "default";
        let processPlugins = () => {
          let curplugins = block2 === "default" ? defaultPlugins : userPlugins;
          if (pos >= curplugins.length) {
            if (block2 === "default" && userPlugins.length) {
              block2 = "user";
              pos = 0;
              curplugins = userPlugins;
            } else {
              return callback();
            }
          }
          let plugin = curplugins[pos++];
          plugin(mail2, (err2) => {
            if (err2) {
              return callback(err2);
            }
            processPlugins();
          });
        };
        processPlugins();
      }
      setupProxy(proxyUrl) {
        let proxy = urllib.parse(proxyUrl);
        this.getSocket = (options2, callback) => {
          let protocol2 = proxy.protocol.replace(/:$/, "").toLowerCase();
          if (this.meta.has("proxy_handler_" + protocol2)) {
            return this.meta.get("proxy_handler_" + protocol2)(proxy, options2, callback);
          }
          switch (protocol2) {
            case "http":
            case "https":
              httpProxyClient(proxy.href, options2.port, options2.host, (err2, socket) => {
                if (err2) {
                  return callback(err2);
                }
                return callback(null, {
                  connection: socket
                });
              });
              return;
            case "socks":
            case "socks5":
            case "socks4":
            case "socks4a": {
              if (!this.meta.has("proxy_socks_module")) {
                return callback(new Error("Socks module not loaded"));
              }
              let connect = (ipaddress) => {
                let proxyV2 = !!this.meta.get("proxy_socks_module").SocksClient;
                let socksClient = proxyV2 ? this.meta.get("proxy_socks_module").SocksClient : this.meta.get("proxy_socks_module");
                let proxyType = Number(proxy.protocol.replace(/\D/g, "")) || 5;
                let connectionOpts = {
                  proxy: {
                    ipaddress,
                    port: Number(proxy.port),
                    type: proxyType
                  },
                  [proxyV2 ? "destination" : "target"]: {
                    host: options2.host,
                    port: options2.port
                  },
                  command: "connect"
                };
                if (proxy.auth) {
                  let username = decodeURIComponent(proxy.auth.split(":").shift());
                  let password = decodeURIComponent(proxy.auth.split(":").pop());
                  if (proxyV2) {
                    connectionOpts.proxy.userId = username;
                    connectionOpts.proxy.password = password;
                  } else if (proxyType === 4) {
                    connectionOpts.userid = username;
                  } else {
                    connectionOpts.authentication = {
                      username,
                      password
                    };
                  }
                }
                socksClient.createConnection(connectionOpts, (err2, info) => {
                  if (err2) {
                    return callback(err2);
                  }
                  return callback(null, {
                    connection: info.socket || info
                  });
                });
              };
              if (net2.isIP(proxy.hostname)) {
                return connect(proxy.hostname);
              }
              return dns.resolve(proxy.hostname, (err2, address) => {
                if (err2) {
                  return callback(err2);
                }
                connect(Array.isArray(address) ? address[0] : address);
              });
            }
          }
          callback(new Error("Unknown proxy configuration"));
        };
      }
      _convertDataImages(mail2, callback) {
        if (!this.options.attachDataUrls && !mail2.data.attachDataUrls || !mail2.data.html) {
          return callback();
        }
        mail2.resolveContent(mail2.data, "html", (err2, html) => {
          if (err2) {
            return callback(err2);
          }
          let cidCounter = 0;
          html = (html || "").toString().replace(/(<img\b[^>]* src\s*=[\s"']*)(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
            let cid = crypto2.randomBytes(10).toString("hex") + "@localhost";
            if (!mail2.data.attachments) {
              mail2.data.attachments = [];
            }
            if (!Array.isArray(mail2.data.attachments)) {
              mail2.data.attachments = [].concat(mail2.data.attachments || []);
            }
            mail2.data.attachments.push({
              path: dataUri,
              cid,
              filename: "image-" + ++cidCounter + "." + mimeTypes.detectExtension(mimeType)
            });
            return prefix + "cid:" + cid;
          });
          mail2.data.html = html;
          callback();
        });
      }
      set(key2, value) {
        return this.meta.set(key2, value);
      }
      get(key2) {
        return this.meta.get(key2);
      }
    };
    module.exports = Mail;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-connection/data-stream.js
var require_data_stream = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-connection/data-stream.js"(exports, module) {
    "use strict";
    var stream = __require("stream");
    var Transform = stream.Transform;
    var DataStream = class extends Transform {
      constructor(options2) {
        super(options2);
        this.options = options2 || {};
        this._curLine = "";
        this.inByteCount = 0;
        this.outByteCount = 0;
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        let chunks = [];
        let chunklen = 0;
        let i, len, lastPos = 0;
        let buf;
        if (!chunk || !chunk.length) {
          return done();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk);
        }
        this.inByteCount += chunk.length;
        for (i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 46) {
            if (i && chunk[i - 1] === 10 || !i && (!this.lastByte || this.lastByte === 10)) {
              buf = chunk.slice(lastPos, i + 1);
              chunks.push(buf);
              chunks.push(Buffer.from("."));
              chunklen += buf.length + 1;
              lastPos = i + 1;
            }
          } else if (chunk[i] === 10) {
            if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
              if (i > lastPos) {
                buf = chunk.slice(lastPos, i);
                chunks.push(buf);
                chunklen += buf.length + 2;
              } else {
                chunklen += 2;
              }
              chunks.push(Buffer.from("\r\n"));
              lastPos = i + 1;
            }
          }
        }
        if (chunklen) {
          if (lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            chunks.push(buf);
            chunklen += buf.length;
          }
          this.outByteCount += chunklen;
          this.push(Buffer.concat(chunks, chunklen));
        } else {
          this.outByteCount += chunk.length;
          this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
      }
      _flush(done) {
        let buf;
        if (this.lastByte === 10) {
          buf = Buffer.from(".\r\n");
        } else if (this.lastByte === 13) {
          buf = Buffer.from("\n.\r\n");
        } else {
          buf = Buffer.from("\r\n.\r\n");
        }
        this.outByteCount += buf.length;
        this.push(buf);
        done();
      }
    };
    module.exports = DataStream;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-connection/index.js
var require_smtp_connection = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-connection/index.js"(exports, module) {
    "use strict";
    var packageInfo = require_package();
    var EventEmitter = __require("events").EventEmitter;
    var net2 = __require("net");
    var tls2 = __require("tls");
    var os3 = __require("os");
    var crypto2 = __require("crypto");
    var DataStream = require_data_stream();
    var PassThrough = __require("stream").PassThrough;
    var shared = require_shared();
    var CONNECTION_TIMEOUT = 2 * 60 * 1e3;
    var SOCKET_TIMEOUT = 10 * 60 * 1e3;
    var GREETING_TIMEOUT = 30 * 1e3;
    var DNS_TIMEOUT = 30 * 1e3;
    var SMTPConnection = class extends EventEmitter {
      constructor(options2) {
        super(options2);
        this.id = crypto2.randomBytes(8).toString("base64").replace(/\W/g, "");
        this.stage = "init";
        this.options = options2 || {};
        this.secureConnection = !!this.options.secure;
        this.alreadySecured = !!this.options.secured;
        this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
        this.host = this.options.host || "localhost";
        this.allowInternalNetworkInterfaces = this.options.allowInternalNetworkInterfaces || false;
        if (typeof this.options.secure === "undefined" && this.port === 465) {
          this.secureConnection = true;
        }
        this.name = this.options.name || this._getHostname();
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-connection",
          sid: this.id
        });
        this.customAuth = /* @__PURE__ */ new Map();
        Object.keys(this.options.customAuth || {}).forEach((key2) => {
          let mapKey = (key2 || "").toString().trim().toUpperCase();
          if (!mapKey) {
            return;
          }
          this.customAuth.set(mapKey, this.options.customAuth[key2]);
        });
        this.version = packageInfo.version;
        this.authenticated = false;
        this.destroyed = false;
        this.secure = !!this.secureConnection;
        this._remainder = "";
        this._responseQueue = [];
        this.lastServerResponse = false;
        this._socket = false;
        this._supportedAuth = [];
        this.allowsAuth = false;
        this._envelope = false;
        this._supportedExtensions = [];
        this._maxAllowedSize = 0;
        this._responseActions = [];
        this._recipientQueue = [];
        this._greetingTimeout = false;
        this._connectionTimeout = false;
        this._destroyed = false;
        this._closing = false;
        this._onSocketData = (chunk) => this._onData(chunk);
        this._onSocketError = (error) => this._onError(error, "ESOCKET", false, "CONN");
        this._onSocketClose = () => this._onClose();
        this._onSocketEnd = () => this._onEnd();
        this._onSocketTimeout = () => this._onTimeout();
      }
      connect(connectCallback) {
        if (typeof connectCallback === "function") {
          this.once("connect", () => {
            this.logger.debug(
              {
                tnx: "smtp"
              },
              "SMTP handshake finished"
            );
            connectCallback();
          });
          const isDestroyedMessage = this._isDestroyedMessage("connect");
          if (isDestroyedMessage) {
            return connectCallback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "CONN"));
          }
        }
        let opts = {
          port: this.port,
          host: this.host,
          allowInternalNetworkInterfaces: this.allowInternalNetworkInterfaces,
          timeout: this.options.dnsTimeout || DNS_TIMEOUT
        };
        if (this.options.localAddress) {
          opts.localAddress = this.options.localAddress;
        }
        let setupConnectionHandlers = () => {
          this._connectionTimeout = setTimeout(() => {
            this._onError("Connection timeout", "ETIMEDOUT", false, "CONN");
          }, this.options.connectionTimeout || CONNECTION_TIMEOUT);
          this._socket.on("error", this._onSocketError);
        };
        if (this.options.connection) {
          this._socket = this.options.connection;
          if (this.secureConnection && !this.alreadySecured) {
            setImmediate(
              () => this._upgradeConnection((err2) => {
                if (err2) {
                  this._onError(new Error("Error initiating TLS - " + (err2.message || err2)), "ETLS", false, "CONN");
                  return;
                }
                this._onConnect();
              })
            );
          } else {
            setImmediate(() => this._onConnect());
          }
          return;
        } else if (this.options.socket) {
          this._socket = this.options.socket;
          return shared.resolveHostname(opts, (err2, resolved) => {
            if (err2) {
              return setImmediate(() => this._onError(err2, "EDNS", false, "CONN"));
            }
            this.logger.debug(
              {
                tnx: "dns",
                source: opts.host,
                resolved: resolved.host,
                cached: !!resolved.cached
              },
              "Resolved %s as %s [cache %s]",
              opts.host,
              resolved.host,
              resolved.cached ? "hit" : "miss"
            );
            Object.keys(resolved).forEach((key2) => {
              if (key2.charAt(0) !== "_" && resolved[key2]) {
                opts[key2] = resolved[key2];
              }
            });
            try {
              this._socket.connect(this.port, this.host, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        } else if (this.secureConnection) {
          if (this.options.tls) {
            Object.keys(this.options.tls).forEach((key2) => {
              opts[key2] = this.options.tls[key2];
            });
          }
          return shared.resolveHostname(opts, (err2, resolved) => {
            if (err2) {
              return setImmediate(() => this._onError(err2, "EDNS", false, "CONN"));
            }
            this.logger.debug(
              {
                tnx: "dns",
                source: opts.host,
                resolved: resolved.host,
                cached: !!resolved.cached
              },
              "Resolved %s as %s [cache %s]",
              opts.host,
              resolved.host,
              resolved.cached ? "hit" : "miss"
            );
            Object.keys(resolved).forEach((key2) => {
              if (key2.charAt(0) !== "_" && resolved[key2]) {
                opts[key2] = resolved[key2];
              }
            });
            try {
              this._socket = tls2.connect(opts, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        } else {
          return shared.resolveHostname(opts, (err2, resolved) => {
            if (err2) {
              return setImmediate(() => this._onError(err2, "EDNS", false, "CONN"));
            }
            this.logger.debug(
              {
                tnx: "dns",
                source: opts.host,
                resolved: resolved.host,
                cached: !!resolved.cached
              },
              "Resolved %s as %s [cache %s]",
              opts.host,
              resolved.host,
              resolved.cached ? "hit" : "miss"
            );
            Object.keys(resolved).forEach((key2) => {
              if (key2.charAt(0) !== "_" && resolved[key2]) {
                opts[key2] = resolved[key2];
              }
            });
            try {
              this._socket = net2.connect(opts, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        }
      }
      quit() {
        this._sendCommand("QUIT");
        this._responseActions.push(this.close);
      }
      close() {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        this._responseActions = [];
        if (this._closing) {
          return;
        }
        this._closing = true;
        let closeMethod = "end";
        if (this.stage === "init") {
          closeMethod = "destroy";
        }
        this.logger.debug(
          {
            tnx: "smtp"
          },
          'Closing connection to the server using "%s"',
          closeMethod
        );
        let socket = this._socket && this._socket.socket || this._socket;
        if (socket && !socket.destroyed) {
          try {
            this._socket[closeMethod]();
          } catch (E) {
          }
        }
        this._destroy();
      }
      login(authData, callback) {
        const isDestroyedMessage = this._isDestroyedMessage("login");
        if (isDestroyedMessage) {
          return callback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
        }
        this._auth = authData || {};
        this._authMethod = (this._auth.method || "").toString().trim().toUpperCase() || false;
        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
          this._authMethod = "XOAUTH2";
        } else if (!this._authMethod || this._authMethod === "XOAUTH2" && !this._auth.oauth2) {
          this._authMethod = (this._supportedAuth[0] || "PLAIN").toUpperCase().trim();
        }
        if (this._authMethod !== "XOAUTH2" && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
          if (this._auth.user && this._auth.pass) {
            this._auth.credentials = {
              user: this._auth.user,
              pass: this._auth.pass,
              options: this._auth.options
            };
          } else {
            return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', "EAUTH", false, "API"));
          }
        }
        if (this.customAuth.has(this._authMethod)) {
          let handler = this.customAuth.get(this._authMethod);
          let lastResponse;
          let returned = false;
          let resolve = () => {
            if (returned) {
              return;
            }
            returned = true;
            this.logger.info(
              {
                tnx: "smtp",
                username: this._auth.user,
                action: "authenticated",
                method: this._authMethod
              },
              "User %s authenticated",
              JSON.stringify(this._auth.user)
            );
            this.authenticated = true;
            callback(null, true);
          };
          let reject = (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            callback(this._formatError(err2, "EAUTH", lastResponse, "AUTH " + this._authMethod));
          };
          let handlerResponse = handler({
            auth: this._auth,
            method: this._authMethod,
            extensions: [].concat(this._supportedExtensions),
            authMethods: [].concat(this._supportedAuth),
            maxAllowedSize: this._maxAllowedSize || false,
            sendCommand: (cmd, done) => {
              let promise;
              if (!done) {
                promise = new Promise((resolve2, reject2) => {
                  done = shared.callbackPromise(resolve2, reject2);
                });
              }
              this._responseActions.push((str) => {
                lastResponse = str;
                let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
                let data = {
                  command: cmd,
                  response: str
                };
                if (codes) {
                  data.status = Number(codes[1]) || 0;
                  if (codes[2]) {
                    data.code = codes[2];
                  }
                  data.text = str.substr(codes[0].length);
                } else {
                  data.text = str;
                  data.status = 0;
                }
                done(null, data);
              });
              setImmediate(() => this._sendCommand(cmd));
              return promise;
            },
            resolve,
            reject
          });
          if (handlerResponse && typeof handlerResponse.catch === "function") {
            handlerResponse.then(resolve).catch(reject);
          }
          return;
        }
        switch (this._authMethod) {
          case "XOAUTH2":
            this._handleXOauth2Token(false, callback);
            return;
          case "LOGIN":
            this._responseActions.push((str) => {
              this._actionAUTH_LOGIN_USER(str, callback);
            });
            this._sendCommand("AUTH LOGIN");
            return;
          case "PLAIN":
            this._responseActions.push((str) => {
              this._actionAUTHComplete(str, callback);
            });
            this._sendCommand(
              "AUTH PLAIN " + Buffer.from(
                "\0" + this._auth.credentials.user + "\0" + this._auth.credentials.pass,
                "utf-8"
              ).toString("base64"),
              "AUTH PLAIN " + Buffer.from(
                "\0" + this._auth.credentials.user + "\0/* secret */",
                "utf-8"
              ).toString("base64")
            );
            return;
          case "CRAM-MD5":
            this._responseActions.push((str) => {
              this._actionAUTH_CRAM_MD5(str, callback);
            });
            this._sendCommand("AUTH CRAM-MD5");
            return;
        }
        return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', "EAUTH", false, "API"));
      }
      send(envelope, message, done) {
        if (!message) {
          return done(this._formatError("Empty message", "EMESSAGE", false, "API"));
        }
        const isDestroyedMessage = this._isDestroyedMessage("send message");
        if (isDestroyedMessage) {
          return done(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
        }
        if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
          return setImmediate(() => {
            done(this._formatError("Message size larger than allowed " + this._maxAllowedSize, "EMESSAGE", false, "MAIL FROM"));
          });
        }
        let returned = false;
        let callback = function() {
          if (returned) {
            return;
          }
          returned = true;
          done(...arguments);
        };
        if (typeof message.on === "function") {
          message.on("error", (err2) => callback(this._formatError(err2, "ESTREAM", false, "API")));
        }
        let startTime = Date.now();
        this._setEnvelope(envelope, (err2, info) => {
          if (err2) {
            return callback(err2);
          }
          let envelopeTime = Date.now();
          let stream = this._createSendStream((err3, str) => {
            if (err3) {
              return callback(err3);
            }
            info.envelopeTime = envelopeTime - startTime;
            info.messageTime = Date.now() - envelopeTime;
            info.messageSize = stream.outByteCount;
            info.response = str;
            return callback(null, info);
          });
          if (typeof message.pipe === "function") {
            message.pipe(stream);
          } else {
            stream.write(message);
            stream.end();
          }
        });
      }
      reset(callback) {
        this._sendCommand("RSET");
        this._responseActions.push((str) => {
          if (str.charAt(0) !== "2") {
            return callback(this._formatError("Could not reset session state. response=" + str, "EPROTOCOL", str, "RSET"));
          }
          this._envelope = false;
          return callback(null, true);
        });
      }
      _onConnect() {
        clearTimeout(this._connectionTimeout);
        this.logger.info(
          {
            tnx: "network",
            localAddress: this._socket.localAddress,
            localPort: this._socket.localPort,
            remoteAddress: this._socket.remoteAddress,
            remotePort: this._socket.remotePort
          },
          "%s established to %s:%s",
          this.secure ? "Secure connection" : "Connection",
          this._socket.remoteAddress,
          this._socket.remotePort
        );
        if (this._destroyed) {
          this.close();
          return;
        }
        this.stage = "connected";
        this._socket.removeListener("data", this._onSocketData);
        this._socket.removeListener("timeout", this._onSocketTimeout);
        this._socket.removeListener("close", this._onSocketClose);
        this._socket.removeListener("end", this._onSocketEnd);
        this._socket.on("data", this._onSocketData);
        this._socket.once("close", this._onSocketClose);
        this._socket.once("end", this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on("timeout", this._onSocketTimeout);
        this._greetingTimeout = setTimeout(() => {
          if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
            this._onError("Greeting never received", "ETIMEDOUT", false, "CONN");
          }
        }, this.options.greetingTimeout || GREETING_TIMEOUT);
        this._responseActions.push(this._actionGreeting);
        this._socket.resume();
      }
      _onData(chunk) {
        if (this._destroyed || !chunk || !chunk.length) {
          return;
        }
        let data = (chunk || "").toString("binary");
        let lines = (this._remainder + data).split(/\r?\n/);
        let lastline;
        this._remainder = lines.pop();
        for (let i = 0, len = lines.length; i < len; i++) {
          if (this._responseQueue.length) {
            lastline = this._responseQueue[this._responseQueue.length - 1];
            if (/^\d+-/.test(lastline.split("\n").pop())) {
              this._responseQueue[this._responseQueue.length - 1] += "\n" + lines[i];
              continue;
            }
          }
          this._responseQueue.push(lines[i]);
        }
        if (this._responseQueue.length) {
          lastline = this._responseQueue[this._responseQueue.length - 1];
          if (/^\d+-/.test(lastline.split("\n").pop())) {
            return;
          }
        }
        this._processResponse();
      }
      _onError(err2, type, data, command) {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        if (this._destroyed) {
          return;
        }
        err2 = this._formatError(err2, type, data, command);
        this.logger.error(data, err2.message);
        this.emit("error", err2);
        this.close();
      }
      _formatError(message, type, response, command) {
        let err2;
        if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
          err2 = message;
        } else {
          err2 = new Error(message);
        }
        if (type && type !== "Error") {
          err2.code = type;
        }
        if (response) {
          err2.response = response;
          err2.message += ": " + response;
        }
        let responseCode = typeof response === "string" && Number((response.match(/^\d+/) || [])[0]) || false;
        if (responseCode) {
          err2.responseCode = responseCode;
        }
        if (command) {
          err2.command = command;
        }
        return err2;
      }
      _onClose() {
        this.logger.info(
          {
            tnx: "network"
          },
          "Connection closed"
        );
        if (this.upgrading && !this._destroyed) {
          return this._onError(new Error("Connection closed unexpectedly"), "ETLS", false, "CONN");
        } else if (![this._actionGreeting, this.close].includes(this._responseActions[0]) && !this._destroyed) {
          return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", false, "CONN");
        }
        this._destroy();
      }
      _onEnd() {
        if (this._socket && !this._socket.destroyed) {
          this._socket.destroy();
        }
      }
      _onTimeout() {
        return this._onError(new Error("Timeout"), "ETIMEDOUT", false, "CONN");
      }
      _destroy() {
        if (this._destroyed) {
          return;
        }
        this._destroyed = true;
        this.emit("end");
      }
      _upgradeConnection(callback) {
        this._socket.removeListener("data", this._onSocketData);
        this._socket.removeListener("timeout", this._onSocketTimeout);
        let socketPlain = this._socket;
        let opts = {
          socket: this._socket,
          host: this.host
        };
        Object.keys(this.options.tls || {}).forEach((key2) => {
          opts[key2] = this.options.tls[key2];
        });
        this.upgrading = true;
        try {
          this._socket = tls2.connect(opts, () => {
            this.secure = true;
            this.upgrading = false;
            this._socket.on("data", this._onSocketData);
            socketPlain.removeListener("close", this._onSocketClose);
            socketPlain.removeListener("end", this._onSocketEnd);
            return callback(null, true);
          });
        } catch (err2) {
          return callback(err2);
        }
        this._socket.on("error", this._onSocketError);
        this._socket.once("close", this._onSocketClose);
        this._socket.once("end", this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on("timeout", this._onSocketTimeout);
        socketPlain.resume();
      }
      _processResponse() {
        if (!this._responseQueue.length) {
          return false;
        }
        let str = this.lastServerResponse = (this._responseQueue.shift() || "").toString();
        if (/^\d+-/.test(str.split("\n").pop())) {
          return;
        }
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug(
            {
              tnx: "server"
            },
            str.replace(/\r?\n$/, "")
          );
        }
        if (!str.trim()) {
          setImmediate(() => this._processResponse(true));
        }
        let action = this._responseActions.shift();
        if (typeof action === "function") {
          action.call(this, str);
          setImmediate(() => this._processResponse(true));
        } else {
          return this._onError(new Error("Unexpected Response"), "EPROTOCOL", str, "CONN");
        }
      }
      _sendCommand(str, logStr) {
        if (this._destroyed) {
          return;
        }
        if (this._socket.destroyed) {
          return this.close();
        }
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug(
            {
              tnx: "client"
            },
            (logStr || str || "").toString().replace(/\r?\n$/, "")
          );
        }
        this._socket.write(Buffer.from(str + "\r\n", "utf-8"));
      }
      _setEnvelope(envelope, callback) {
        let args = [];
        let useSmtpUtf8 = false;
        this._envelope = envelope || {};
        this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || "").toString().trim();
        this._envelope.to = [].concat(this._envelope.to || []).map((to) => (to && to.address || to || "").toString().trim());
        if (!this._envelope.to.length) {
          return callback(this._formatError("No recipients defined", "EENVELOPE", false, "API"));
        }
        if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
          return callback(this._formatError("Invalid sender " + JSON.stringify(this._envelope.from), "EENVELOPE", false, "API"));
        }
        if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
          useSmtpUtf8 = true;
        }
        for (let i = 0, len = this._envelope.to.length; i < len; i++) {
          if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
            return callback(this._formatError("Invalid recipient " + JSON.stringify(this._envelope.to[i]), "EENVELOPE", false, "API"));
          }
          if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
            useSmtpUtf8 = true;
          }
        }
        this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
        this._envelope.rejected = [];
        this._envelope.rejectedErrors = [];
        this._envelope.accepted = [];
        if (this._envelope.dsn) {
          try {
            this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
          } catch (err2) {
            return callback(this._formatError("Invalid DSN " + err2.message, "EENVELOPE", false, "API"));
          }
        }
        this._responseActions.push((str) => {
          this._actionMAIL(str, callback);
        });
        if (useSmtpUtf8 && this._supportedExtensions.includes("SMTPUTF8")) {
          args.push("SMTPUTF8");
          this._usingSmtpUtf8 = true;
        }
        if (this._envelope.use8BitMime && this._supportedExtensions.includes("8BITMIME")) {
          args.push("BODY=8BITMIME");
          this._using8BitMime = true;
        }
        if (this._envelope.size && this._supportedExtensions.includes("SIZE")) {
          args.push("SIZE=" + this._envelope.size);
        }
        if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
          if (this._envelope.dsn.ret) {
            args.push("RET=" + shared.encodeXText(this._envelope.dsn.ret));
          }
          if (this._envelope.dsn.envid) {
            args.push("ENVID=" + shared.encodeXText(this._envelope.dsn.envid));
          }
        }
        this._sendCommand("MAIL FROM:<" + this._envelope.from + ">" + (args.length ? " " + args.join(" ") : ""));
      }
      _setDsnEnvelope(params) {
        let ret = (params.ret || params.return || "").toString().toUpperCase() || null;
        if (ret) {
          switch (ret) {
            case "HDRS":
            case "HEADERS":
              ret = "HDRS";
              break;
            case "FULL":
            case "BODY":
              ret = "FULL";
              break;
          }
        }
        if (ret && !["FULL", "HDRS"].includes(ret)) {
          throw new Error("ret: " + JSON.stringify(ret));
        }
        let envid = (params.envid || params.id || "").toString() || null;
        let notify = params.notify || null;
        if (notify) {
          if (typeof notify === "string") {
            notify = notify.split(",");
          }
          notify = notify.map((n) => n.trim().toUpperCase());
          let validNotify = ["NEVER", "SUCCESS", "FAILURE", "DELAY"];
          let invaliNotify = notify.filter((n) => !validNotify.includes(n));
          if (invaliNotify.length || notify.length > 1 && notify.includes("NEVER")) {
            throw new Error("notify: " + JSON.stringify(notify.join(",")));
          }
          notify = notify.join(",");
        }
        let orcpt = (params.recipient || params.orcpt || "").toString() || null;
        if (orcpt && orcpt.indexOf(";") < 0) {
          orcpt = "rfc822;" + orcpt;
        }
        return {
          ret,
          envid,
          notify,
          orcpt
        };
      }
      _getDsnRcptToArgs() {
        let args = [];
        if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
          if (this._envelope.dsn.notify) {
            args.push("NOTIFY=" + shared.encodeXText(this._envelope.dsn.notify));
          }
          if (this._envelope.dsn.orcpt) {
            args.push("ORCPT=" + shared.encodeXText(this._envelope.dsn.orcpt));
          }
        }
        return args.length ? " " + args.join(" ") : "";
      }
      _createSendStream(callback) {
        let dataStream = new DataStream();
        let logStream;
        if (this.options.lmtp) {
          this._envelope.accepted.forEach((recipient, i) => {
            let final = i === this._envelope.accepted.length - 1;
            this._responseActions.push((str) => {
              this._actionLMTPStream(recipient, final, str, callback);
            });
          });
        } else {
          this._responseActions.push((str) => {
            this._actionSMTPStream(str, callback);
          });
        }
        dataStream.pipe(this._socket, {
          end: false
        });
        if (this.options.debug) {
          logStream = new PassThrough();
          logStream.on("readable", () => {
            let chunk;
            while (chunk = logStream.read()) {
              this.logger.debug(
                {
                  tnx: "message"
                },
                chunk.toString("binary").replace(/\r?\n$/, "")
              );
            }
          });
          dataStream.pipe(logStream);
        }
        dataStream.once("end", () => {
          this.logger.info(
            {
              tnx: "message",
              inByteCount: dataStream.inByteCount,
              outByteCount: dataStream.outByteCount
            },
            "<%s bytes encoded mime message (source size %s bytes)>",
            dataStream.outByteCount,
            dataStream.inByteCount
          );
        });
        return dataStream;
      }
      _actionGreeting(str) {
        clearTimeout(this._greetingTimeout);
        if (str.substr(0, 3) !== "220") {
          this._onError(new Error("Invalid greeting. response=" + str), "EPROTOCOL", str, "CONN");
          return;
        }
        if (this.options.lmtp) {
          this._responseActions.push(this._actionLHLO);
          this._sendCommand("LHLO " + this.name);
        } else {
          this._responseActions.push(this._actionEHLO);
          this._sendCommand("EHLO " + this.name);
        }
      }
      _actionLHLO(str) {
        if (str.charAt(0) !== "2") {
          this._onError(new Error("Invalid LHLO. response=" + str), "EPROTOCOL", str, "LHLO");
          return;
        }
        this._actionEHLO(str);
      }
      _actionEHLO(str) {
        let match;
        if (str.substr(0, 3) === "421") {
          this._onError(new Error("Server terminates connection. response=" + str), "ECONNECTION", str, "EHLO");
          return;
        }
        if (str.charAt(0) !== "2") {
          if (this.options.requireTLS) {
            this._onError(new Error("EHLO failed but HELO does not support required STARTTLS. response=" + str), "ECONNECTION", str, "EHLO");
            return;
          }
          this._responseActions.push(this._actionHELO);
          this._sendCommand("HELO " + this.name);
          return;
        }
        if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
          this._sendCommand("STARTTLS");
          this._responseActions.push(this._actionSTARTTLS);
          return;
        }
        if (/[ -]SMTPUTF8\b/im.test(str)) {
          this._supportedExtensions.push("SMTPUTF8");
        }
        if (/[ -]DSN\b/im.test(str)) {
          this._supportedExtensions.push("DSN");
        }
        if (/[ -]8BITMIME\b/im.test(str)) {
          this._supportedExtensions.push("8BITMIME");
        }
        if (/[ -]PIPELINING\b/im.test(str)) {
          this._supportedExtensions.push("PIPELINING");
        }
        if (/[ -]AUTH\b/i.test(str)) {
          this.allowsAuth = true;
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
          this._supportedAuth.push("PLAIN");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
          this._supportedAuth.push("LOGIN");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
          this._supportedAuth.push("CRAM-MD5");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
          this._supportedAuth.push("XOAUTH2");
        }
        if (match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) {
          this._supportedExtensions.push("SIZE");
          this._maxAllowedSize = Number(match[1]) || 0;
        }
        this.emit("connect");
      }
      _actionHELO(str) {
        if (str.charAt(0) !== "2") {
          this._onError(new Error("Invalid HELO. response=" + str), "EPROTOCOL", str, "HELO");
          return;
        }
        this.allowsAuth = true;
        this.emit("connect");
      }
      _actionSTARTTLS(str) {
        if (str.charAt(0) !== "2") {
          if (this.options.opportunisticTLS) {
            this.logger.info(
              {
                tnx: "smtp"
              },
              "Failed STARTTLS upgrade, continuing unencrypted"
            );
            return this.emit("connect");
          }
          this._onError(new Error("Error upgrading connection with STARTTLS"), "ETLS", str, "STARTTLS");
          return;
        }
        this._upgradeConnection((err2, secured) => {
          if (err2) {
            this._onError(new Error("Error initiating TLS - " + (err2.message || err2)), "ETLS", false, "STARTTLS");
            return;
          }
          this.logger.info(
            {
              tnx: "smtp"
            },
            "Connection upgraded with STARTTLS"
          );
          if (secured) {
            if (this.options.lmtp) {
              this._responseActions.push(this._actionLHLO);
              this._sendCommand("LHLO " + this.name);
            } else {
              this._responseActions.push(this._actionEHLO);
              this._sendCommand("EHLO " + this.name);
            }
          } else {
            this.emit("connect");
          }
        });
      }
      _actionAUTH_LOGIN_USER(str, callback) {
        if (!/^334[ -]/.test(str)) {
          callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', "EAUTH", str, "AUTH LOGIN"));
          return;
        }
        this._responseActions.push((str2) => {
          this._actionAUTH_LOGIN_PASS(str2, callback);
        });
        this._sendCommand(Buffer.from(this._auth.credentials.user + "", "utf-8").toString("base64"));
      }
      _actionAUTH_CRAM_MD5(str, callback) {
        let challengeMatch = str.match(/^334\s+(.+)$/);
        let challengeString = "";
        if (!challengeMatch) {
          return callback(this._formatError("Invalid login sequence while waiting for server challenge string", "EAUTH", str, "AUTH CRAM-MD5"));
        } else {
          challengeString = challengeMatch[1];
        }
        let base64decoded = Buffer.from(challengeString, "base64").toString("ascii"), hmacMD5 = crypto2.createHmac("md5", this._auth.credentials.pass);
        hmacMD5.update(base64decoded);
        let prepended = this._auth.credentials.user + " " + hmacMD5.digest("hex");
        this._responseActions.push((str2) => {
          this._actionAUTH_CRAM_MD5_PASS(str2, callback);
        });
        this._sendCommand(
          Buffer.from(prepended).toString("base64"),
          Buffer.from(this._auth.credentials.user + " /* secret */").toString("base64")
        );
      }
      _actionAUTH_CRAM_MD5_PASS(str, callback) {
        if (!str.match(/^235\s+/)) {
          return callback(this._formatError('Invalid login sequence while waiting for "235"', "EAUTH", str, "AUTH CRAM-MD5"));
        }
        this.logger.info(
          {
            tnx: "smtp",
            username: this._auth.user,
            action: "authenticated",
            method: this._authMethod
          },
          "User %s authenticated",
          JSON.stringify(this._auth.user)
        );
        this.authenticated = true;
        callback(null, true);
      }
      _actionAUTH_LOGIN_PASS(str, callback) {
        if (!/^334[ -]/.test(str)) {
          return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', "EAUTH", str, "AUTH LOGIN"));
        }
        this._responseActions.push((str2) => {
          this._actionAUTHComplete(str2, callback);
        });
        this._sendCommand(
          Buffer.from((this._auth.credentials.pass || "").toString(), "utf-8").toString("base64"),
          Buffer.from("/* secret */", "utf-8").toString("base64")
        );
      }
      _actionAUTHComplete(str, isRetry, callback) {
        if (!callback && typeof isRetry === "function") {
          callback = isRetry;
          isRetry = false;
        }
        if (str.substr(0, 3) === "334") {
          this._responseActions.push((str2) => {
            if (isRetry || this._authMethod !== "XOAUTH2") {
              this._actionAUTHComplete(str2, true, callback);
            } else {
              setImmediate(() => this._handleXOauth2Token(true, callback));
            }
          });
          this._sendCommand("");
          return;
        }
        if (str.charAt(0) !== "2") {
          this.logger.info(
            {
              tnx: "smtp",
              username: this._auth.user,
              action: "authfail",
              method: this._authMethod
            },
            "User %s failed to authenticate",
            JSON.stringify(this._auth.user)
          );
          return callback(this._formatError("Invalid login", "EAUTH", str, "AUTH " + this._authMethod));
        }
        this.logger.info(
          {
            tnx: "smtp",
            username: this._auth.user,
            action: "authenticated",
            method: this._authMethod
          },
          "User %s authenticated",
          JSON.stringify(this._auth.user)
        );
        this.authenticated = true;
        callback(null, true);
      }
      _actionMAIL(str, callback) {
        let message, curRecipient;
        if (Number(str.charAt(0)) !== 2) {
          if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
            message = "Internationalized mailbox name not allowed";
          } else {
            message = "Mail command failed";
          }
          return callback(this._formatError(message, "EENVELOPE", str, "MAIL FROM"));
        }
        if (!this._envelope.rcptQueue.length) {
          return callback(this._formatError("Can't send mail - no recipients defined", "EENVELOPE", false, "API"));
        } else {
          this._recipientQueue = [];
          if (this._supportedExtensions.includes("PIPELINING")) {
            while (this._envelope.rcptQueue.length) {
              curRecipient = this._envelope.rcptQueue.shift();
              this._recipientQueue.push(curRecipient);
              this._responseActions.push((str2) => {
                this._actionRCPT(str2, callback);
              });
              this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
            }
          } else {
            curRecipient = this._envelope.rcptQueue.shift();
            this._recipientQueue.push(curRecipient);
            this._responseActions.push((str2) => {
              this._actionRCPT(str2, callback);
            });
            this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
          }
        }
      }
      _actionRCPT(str, callback) {
        let message, err2, curRecipient = this._recipientQueue.shift();
        if (Number(str.charAt(0)) !== 2) {
          if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
            message = "Internationalized mailbox name not allowed";
          } else {
            message = "Recipient command failed";
          }
          this._envelope.rejected.push(curRecipient);
          err2 = this._formatError(message, "EENVELOPE", str, "RCPT TO");
          err2.recipient = curRecipient;
          this._envelope.rejectedErrors.push(err2);
        } else {
          this._envelope.accepted.push(curRecipient);
        }
        if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
          if (this._envelope.rejected.length < this._envelope.to.length) {
            this._responseActions.push((str2) => {
              this._actionDATA(str2, callback);
            });
            this._sendCommand("DATA");
          } else {
            err2 = this._formatError("Can't send mail - all recipients were rejected", "EENVELOPE", str, "RCPT TO");
            err2.rejected = this._envelope.rejected;
            err2.rejectedErrors = this._envelope.rejectedErrors;
            return callback(err2);
          }
        } else if (this._envelope.rcptQueue.length) {
          curRecipient = this._envelope.rcptQueue.shift();
          this._recipientQueue.push(curRecipient);
          this._responseActions.push((str2) => {
            this._actionRCPT(str2, callback);
          });
          this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
        }
      }
      _actionDATA(str, callback) {
        if (!/^[23]/.test(str)) {
          return callback(this._formatError("Data command failed", "EENVELOPE", str, "DATA"));
        }
        let response = {
          accepted: this._envelope.accepted,
          rejected: this._envelope.rejected
        };
        if (this._envelope.rejectedErrors.length) {
          response.rejectedErrors = this._envelope.rejectedErrors;
        }
        callback(null, response);
      }
      _actionSMTPStream(str, callback) {
        if (Number(str.charAt(0)) !== 2) {
          return callback(this._formatError("Message failed", "EMESSAGE", str, "DATA"));
        } else {
          return callback(null, str);
        }
      }
      _actionLMTPStream(recipient, final, str, callback) {
        let err2;
        if (Number(str.charAt(0)) !== 2) {
          err2 = this._formatError("Message failed for recipient " + recipient, "EMESSAGE", str, "DATA");
          err2.recipient = recipient;
          this._envelope.rejected.push(recipient);
          this._envelope.rejectedErrors.push(err2);
          for (let i = 0, len = this._envelope.accepted.length; i < len; i++) {
            if (this._envelope.accepted[i] === recipient) {
              this._envelope.accepted.splice(i, 1);
            }
          }
        }
        if (final) {
          return callback(null, str);
        }
      }
      _handleXOauth2Token(isRetry, callback) {
        this._auth.oauth2.getToken(isRetry, (err2, accessToken) => {
          if (err2) {
            this.logger.info(
              {
                tnx: "smtp",
                username: this._auth.user,
                action: "authfail",
                method: this._authMethod
              },
              "User %s failed to authenticate",
              JSON.stringify(this._auth.user)
            );
            return callback(this._formatError(err2, "EAUTH", false, "AUTH XOAUTH2"));
          }
          this._responseActions.push((str) => {
            this._actionAUTHComplete(str, isRetry, callback);
          });
          this._sendCommand(
            "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token(accessToken),
            "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token("/* secret */")
          );
        });
      }
      _isDestroyedMessage(command) {
        if (this._destroyed) {
          return "Cannot " + command + " - smtp connection is already destroyed.";
        }
        if (this._socket) {
          if (this._socket.destroyed) {
            return "Cannot " + command + " - smtp connection socket is already destroyed.";
          }
          if (!this._socket.writable) {
            return "Cannot " + command + " - smtp connection socket is already half-closed.";
          }
        }
      }
      _getHostname() {
        let defaultHostname;
        try {
          defaultHostname = os3.hostname() || "";
        } catch (err2) {
          defaultHostname = "localhost";
        }
        if (!defaultHostname || defaultHostname.indexOf(".") < 0) {
          defaultHostname = "[127.0.0.1]";
        }
        if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
          defaultHostname = "[" + defaultHostname + "]";
        }
        return defaultHostname;
      }
    };
    module.exports = SMTPConnection;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/xoauth2/index.js
var require_xoauth2 = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/xoauth2/index.js"(exports, module) {
    "use strict";
    var Stream3 = __require("stream").Stream;
    var nmfetch = require_fetch();
    var crypto2 = __require("crypto");
    var shared = require_shared();
    var XOAuth2 = class extends Stream3 {
      constructor(options2, logger) {
        super();
        this.options = options2 || {};
        if (options2 && options2.serviceClient) {
          if (!options2.privateKey || !options2.user) {
            setImmediate(() => this.emit("error", new Error('Options "privateKey" and "user" are required for service account!')));
            return;
          }
          let serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
          this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
        }
        this.logger = shared.getLogger(
          {
            logger
          },
          {
            component: this.options.component || "OAuth2"
          }
        );
        this.provisionCallback = typeof this.options.provisionCallback === "function" ? this.options.provisionCallback : false;
        this.options.accessUrl = this.options.accessUrl || "https://accounts.google.com/o/oauth2/token";
        this.options.customHeaders = this.options.customHeaders || {};
        this.options.customParams = this.options.customParams || {};
        this.accessToken = this.options.accessToken || false;
        if (this.options.expires && Number(this.options.expires)) {
          this.expires = this.options.expires;
        } else {
          let timeout = Math.max(Number(this.options.timeout) || 0, 0);
          this.expires = timeout && Date.now() + timeout * 1e3 || 0;
        }
      }
      getToken(renew, callback) {
        if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
          return callback(null, this.accessToken);
        }
        let generateCallback = (...args) => {
          if (args[0]) {
            this.logger.error(
              {
                err: args[0],
                tnx: "OAUTH2",
                user: this.options.user,
                action: "renew"
              },
              "Failed generating new Access Token for %s",
              this.options.user
            );
          } else {
            this.logger.info(
              {
                tnx: "OAUTH2",
                user: this.options.user,
                action: "renew"
              },
              "Generated new Access Token for %s",
              this.options.user
            );
          }
          callback(...args);
        };
        if (this.provisionCallback) {
          this.provisionCallback(this.options.user, !!renew, (err2, accessToken, expires) => {
            if (!err2 && accessToken) {
              this.accessToken = accessToken;
              this.expires = expires || 0;
            }
            generateCallback(err2, accessToken);
          });
        } else {
          this.generateToken(generateCallback);
        }
      }
      updateToken(accessToken, timeout) {
        this.accessToken = accessToken;
        timeout = Math.max(Number(timeout) || 0, 0);
        this.expires = timeout && Date.now() + timeout * 1e3 || 0;
        this.emit("token", {
          user: this.options.user,
          accessToken: accessToken || "",
          expires: this.expires
        });
      }
      generateToken(callback) {
        let urlOptions;
        let loggedUrlOptions;
        if (this.options.serviceClient) {
          let iat = Math.floor(Date.now() / 1e3);
          let tokenData = {
            iss: this.options.serviceClient,
            scope: this.options.scope || "https://mail.google.com/",
            sub: this.options.user,
            aud: this.options.accessUrl,
            iat,
            exp: iat + this.options.serviceRequestTimeout
          };
          let token;
          try {
            token = this.jwtSignRS256(tokenData);
          } catch (err2) {
            return callback(new Error("Can't generate token. Check your auth options"));
          }
          urlOptions = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: token
          };
          loggedUrlOptions = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: tokenData
          };
        } else {
          if (!this.options.refreshToken) {
            return callback(new Error("Can't create new access token for user"));
          }
          urlOptions = {
            client_id: this.options.clientId || "",
            client_secret: this.options.clientSecret || "",
            refresh_token: this.options.refreshToken,
            grant_type: "refresh_token"
          };
          loggedUrlOptions = {
            client_id: this.options.clientId || "",
            client_secret: (this.options.clientSecret || "").substr(0, 6) + "...",
            refresh_token: (this.options.refreshToken || "").substr(0, 6) + "...",
            grant_type: "refresh_token"
          };
        }
        Object.keys(this.options.customParams).forEach((key2) => {
          urlOptions[key2] = this.options.customParams[key2];
          loggedUrlOptions[key2] = this.options.customParams[key2];
        });
        this.logger.debug(
          {
            tnx: "OAUTH2",
            user: this.options.user,
            action: "generate"
          },
          "Requesting token using: %s",
          JSON.stringify(loggedUrlOptions)
        );
        this.postRequest(this.options.accessUrl, urlOptions, this.options, (error, body) => {
          let data;
          if (error) {
            return callback(error);
          }
          try {
            data = JSON.parse(body.toString());
          } catch (E) {
            return callback(E);
          }
          if (!data || typeof data !== "object") {
            this.logger.debug(
              {
                tnx: "OAUTH2",
                user: this.options.user,
                action: "post"
              },
              "Response: %s",
              (body || "").toString()
            );
            return callback(new Error("Invalid authentication response"));
          }
          let logData = {};
          Object.keys(data).forEach((key2) => {
            if (key2 !== "access_token") {
              logData[key2] = data[key2];
            } else {
              logData[key2] = (data[key2] || "").toString().substr(0, 6) + "...";
            }
          });
          this.logger.debug(
            {
              tnx: "OAUTH2",
              user: this.options.user,
              action: "post"
            },
            "Response: %s",
            JSON.stringify(logData)
          );
          if (data.error) {
            let errorMessage = data.error;
            if (data.error_description) {
              errorMessage += ": " + data.error_description;
            }
            if (data.error_uri) {
              errorMessage += " (" + data.error_uri + ")";
            }
            return callback(new Error(errorMessage));
          }
          if (data.access_token) {
            this.updateToken(data.access_token, data.expires_in);
            return callback(null, this.accessToken);
          }
          return callback(new Error("No access token"));
        });
      }
      buildXOAuth2Token(accessToken) {
        let authData = ["user=" + (this.options.user || ""), "auth=Bearer " + (accessToken || this.accessToken), "", ""];
        return Buffer.from(authData.join(""), "utf-8").toString("base64");
      }
      postRequest(url, payload, params, callback) {
        let returned = false;
        let chunks = [];
        let chunklen = 0;
        let req = nmfetch(url, {
          method: "post",
          headers: params.customHeaders,
          body: payload,
          allowErrorResponse: true
        });
        req.on("readable", () => {
          let chunk;
          while ((chunk = req.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
          }
        });
        req.once("error", (err2) => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(err2);
        });
        req.once("end", () => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(null, Buffer.concat(chunks, chunklen));
        });
      }
      toBase64URL(data) {
        if (typeof data === "string") {
          data = Buffer.from(data);
        }
        return data.toString("base64").replace(/[=]+/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      jwtSignRS256(payload) {
        payload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map((val2) => this.toBase64URL(val2)).join(".");
        let signature = crypto2.createSign("RSA-SHA256").update(payload).sign(this.options.privateKey);
        return payload + "." + this.toBase64URL(signature);
      }
    };
    module.exports = XOAuth2;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-pool/pool-resource.js
var require_pool_resource = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-pool/pool-resource.js"(exports, module) {
    "use strict";
    var SMTPConnection = require_smtp_connection();
    var assign = require_shared().assign;
    var XOAuth2 = require_xoauth2();
    var EventEmitter = __require("events");
    var PoolResource = class extends EventEmitter {
      constructor(pool) {
        super();
        this.pool = pool;
        this.options = pool.options;
        this.logger = this.pool.logger;
        if (this.options.auth) {
          switch ((this.options.auth.type || "").toString().toUpperCase()) {
            case "OAUTH2": {
              let oauth2 = new XOAuth2(this.options.auth, this.logger);
              oauth2.provisionCallback = this.pool.mailer && this.pool.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
              this.auth = {
                type: "OAUTH2",
                user: this.options.auth.user,
                oauth2,
                method: "XOAUTH2"
              };
              oauth2.on("token", (token) => this.pool.mailer.emit("token", token));
              oauth2.on("error", (err2) => this.emit("error", err2));
              break;
            }
            default:
              if (!this.options.auth.user && !this.options.auth.pass) {
                break;
              }
              this.auth = {
                type: (this.options.auth.type || "").toString().toUpperCase() || "LOGIN",
                user: this.options.auth.user,
                credentials: {
                  user: this.options.auth.user || "",
                  pass: this.options.auth.pass,
                  options: this.options.auth.options
                },
                method: (this.options.auth.method || "").trim().toUpperCase() || this.options.authMethod || false
              };
          }
        }
        this._connection = false;
        this._connected = false;
        this.messages = 0;
        this.available = true;
      }
      connect(callback) {
        this.pool.getSocket(this.options, (err2, socketOptions) => {
          if (err2) {
            return callback(err2);
          }
          let returned = false;
          let options2 = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info(
              {
                tnx: "proxy",
                remoteAddress: socketOptions.connection.remoteAddress,
                remotePort: socketOptions.connection.remotePort,
                destHost: options2.host || "",
                destPort: options2.port || "",
                action: "connected"
              },
              "Using proxied socket from %s:%s to %s:%s",
              socketOptions.connection.remoteAddress,
              socketOptions.connection.remotePort,
              options2.host || "",
              options2.port || ""
            );
            options2 = assign(false, options2);
            Object.keys(socketOptions).forEach((key2) => {
              options2[key2] = socketOptions[key2];
            });
          }
          this.connection = new SMTPConnection(options2);
          this.connection.once("error", (err3) => {
            this.emit("error", err3);
            if (returned) {
              return;
            }
            returned = true;
            return callback(err3);
          });
          this.connection.once("end", () => {
            this.close();
            if (returned) {
              return;
            }
            returned = true;
            let timer2 = setTimeout(() => {
              if (returned) {
                return;
              }
              let err3 = new Error("Unexpected socket close");
              if (this.connection && this.connection._socket && this.connection._socket.upgrading) {
                err3.code = "ETLS";
              }
              callback(err3);
            }, 1e3);
            try {
              timer2.unref();
            } catch (E) {
            }
          });
          this.connection.connect(() => {
            if (returned) {
              return;
            }
            if (this.auth && (this.connection.allowsAuth || options2.forceAuth)) {
              this.connection.login(this.auth, (err3) => {
                if (returned) {
                  return;
                }
                returned = true;
                if (err3) {
                  this.connection.close();
                  this.emit("error", err3);
                  return callback(err3);
                }
                this._connected = true;
                callback(null, true);
              });
            } else {
              returned = true;
              this._connected = true;
              return callback(null, true);
            }
          });
        });
      }
      send(mail2, callback) {
        if (!this._connected) {
          return this.connect((err2) => {
            if (err2) {
              return callback(err2);
            }
            return this.send(mail2, callback);
          });
        }
        let envelope = mail2.message.getEnvelope();
        let messageId = mail2.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info(
          {
            tnx: "send",
            messageId,
            cid: this.id
          },
          "Sending message %s using #%s to <%s>",
          messageId,
          this.id,
          recipients.join(", ")
        );
        if (mail2.data.dsn) {
          envelope.dsn = mail2.data.dsn;
        }
        this.connection.send(envelope, mail2.message.createReadStream(), (err2, info) => {
          this.messages++;
          if (err2) {
            this.connection.close();
            this.emit("error", err2);
            return callback(err2);
          }
          info.envelope = {
            from: envelope.from,
            to: envelope.to
          };
          info.messageId = messageId;
          setImmediate(() => {
            let err3;
            if (this.messages >= this.options.maxMessages) {
              err3 = new Error("Resource exhausted");
              err3.code = "EMAXLIMIT";
              this.connection.close();
              this.emit("error", err3);
            } else {
              this.pool._checkRateLimit(() => {
                this.available = true;
                this.emit("available");
              });
            }
          });
          callback(null, info);
        });
      }
      close() {
        this._connected = false;
        if (this.auth && this.auth.oauth2) {
          this.auth.oauth2.removeAllListeners();
        }
        if (this.connection) {
          this.connection.close();
        }
        this.emit("close");
      }
    };
    module.exports = PoolResource;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/well-known/services.json
var require_services = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/well-known/services.json"(exports, module) {
    module.exports = {
      "1und1": {
        host: "smtp.1und1.de",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      AOL: {
        domains: ["aol.com"],
        host: "smtp.aol.com",
        port: 587
      },
      Bluewin: {
        host: "smtpauths.bluewin.ch",
        domains: ["bluewin.ch"],
        port: 465
      },
      DebugMail: {
        host: "debugmail.io",
        port: 25
      },
      DynectEmail: {
        aliases: ["Dynect"],
        host: "smtp.dynect.net",
        port: 25
      },
      Ethereal: {
        aliases: ["ethereal.email"],
        host: "smtp.ethereal.email",
        port: 587
      },
      FastMail: {
        domains: ["fastmail.fm"],
        host: "smtp.fastmail.com",
        port: 465,
        secure: true
      },
      GandiMail: {
        aliases: ["Gandi", "Gandi Mail"],
        host: "mail.gandi.net",
        port: 587
      },
      Gmail: {
        aliases: ["Google Mail"],
        domains: ["gmail.com", "googlemail.com"],
        host: "smtp.gmail.com",
        port: 465,
        secure: true
      },
      Godaddy: {
        host: "smtpout.secureserver.net",
        port: 25
      },
      GodaddyAsia: {
        host: "smtp.asia.secureserver.net",
        port: 25
      },
      GodaddyEurope: {
        host: "smtp.europe.secureserver.net",
        port: 25
      },
      "hot.ee": {
        host: "mail.hot.ee"
      },
      Hotmail: {
        aliases: ["Outlook", "Outlook.com", "Hotmail.com"],
        domains: ["hotmail.com", "outlook.com"],
        host: "smtp-mail.outlook.com",
        port: 587
      },
      iCloud: {
        aliases: ["Me", "Mac"],
        domains: ["me.com", "mac.com"],
        host: "smtp.mail.me.com",
        port: 587
      },
      Infomaniak: {
        host: "mail.infomaniak.com",
        domains: ["ik.me", "ikmail.com", "etik.com"],
        port: 587
      },
      "mail.ee": {
        host: "smtp.mail.ee"
      },
      "Mail.ru": {
        host: "smtp.mail.ru",
        port: 465,
        secure: true
      },
      Maildev: {
        port: 1025,
        ignoreTLS: true
      },
      Mailgun: {
        host: "smtp.mailgun.org",
        port: 465,
        secure: true
      },
      Mailjet: {
        host: "in.mailjet.com",
        port: 587
      },
      Mailosaur: {
        host: "mailosaur.io",
        port: 25
      },
      Mailtrap: {
        host: "smtp.mailtrap.io",
        port: 2525
      },
      Mandrill: {
        host: "smtp.mandrillapp.com",
        port: 587
      },
      Naver: {
        host: "smtp.naver.com",
        port: 587
      },
      One: {
        host: "send.one.com",
        port: 465,
        secure: true
      },
      OpenMailBox: {
        aliases: ["OMB", "openmailbox.org"],
        host: "smtp.openmailbox.org",
        port: 465,
        secure: true
      },
      Outlook365: {
        host: "smtp.office365.com",
        port: 587,
        secure: false
      },
      OhMySMTP: {
        host: "smtp.ohmysmtp.com",
        port: 587,
        secure: false
      },
      Postmark: {
        aliases: ["PostmarkApp"],
        host: "smtp.postmarkapp.com",
        port: 2525
      },
      "qiye.aliyun": {
        host: "smtp.mxhichina.com",
        port: "465",
        secure: true
      },
      QQ: {
        domains: ["qq.com"],
        host: "smtp.qq.com",
        port: 465,
        secure: true
      },
      QQex: {
        aliases: ["QQ Enterprise"],
        domains: ["exmail.qq.com"],
        host: "smtp.exmail.qq.com",
        port: 465,
        secure: true
      },
      SendCloud: {
        host: "smtp.sendcloud.net",
        port: 2525
      },
      SendGrid: {
        host: "smtp.sendgrid.net",
        port: 587
      },
      SendinBlue: {
        host: "smtp-relay.sendinblue.com",
        port: 587
      },
      SendPulse: {
        host: "smtp-pulse.com",
        port: 465,
        secure: true
      },
      SES: {
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-EAST-1": {
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-WEST-2": {
        host: "email-smtp.us-west-2.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-EU-WEST-1": {
        host: "email-smtp.eu-west-1.amazonaws.com",
        port: 465,
        secure: true
      },
      Sparkpost: {
        aliases: ["SparkPost", "SparkPost Mail"],
        domains: ["sparkpost.com"],
        host: "smtp.sparkpostmail.com",
        port: 587,
        secure: false
      },
      Tipimail: {
        host: "smtp.tipimail.com",
        port: 587
      },
      Yahoo: {
        domains: ["yahoo.com"],
        host: "smtp.mail.yahoo.com",
        port: 465,
        secure: true
      },
      Yandex: {
        domains: ["yandex.ru"],
        host: "smtp.yandex.ru",
        port: 465,
        secure: true
      },
      Zoho: {
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      "126": {
        host: "smtp.126.com",
        port: 465,
        secure: true
      },
      "163": {
        host: "smtp.163.com",
        port: 465,
        secure: true
      }
    };
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/well-known/index.js
var require_well_known = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/well-known/index.js"(exports, module) {
    "use strict";
    var services = require_services();
    var normalized = {};
    Object.keys(services).forEach((key2) => {
      let service = services[key2];
      normalized[normalizeKey(key2)] = normalizeService(service);
      [].concat(service.aliases || []).forEach((alias) => {
        normalized[normalizeKey(alias)] = normalizeService(service);
      });
      [].concat(service.domains || []).forEach((domain2) => {
        normalized[normalizeKey(domain2)] = normalizeService(service);
      });
    });
    function normalizeKey(key2) {
      return key2.replace(/[^a-zA-Z0-9.-]/g, "").toLowerCase();
    }
    function normalizeService(service) {
      let filter = ["domains", "aliases"];
      let response = {};
      Object.keys(service).forEach((key2) => {
        if (filter.indexOf(key2) < 0) {
          response[key2] = service[key2];
        }
      });
      return response;
    }
    module.exports = function(key2) {
      key2 = normalizeKey(key2.split("@").pop());
      return normalized[key2] || false;
    };
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-pool/index.js
var require_smtp_pool = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-pool/index.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var PoolResource = require_pool_resource();
    var SMTPConnection = require_smtp_connection();
    var wellKnown = require_well_known();
    var shared = require_shared();
    var packageData = require_package();
    var SMTPPool = class extends EventEmitter {
      constructor(options2) {
        super();
        options2 = options2 || {};
        if (typeof options2 === "string") {
          options2 = {
            url: options2
          };
        }
        let urlData;
        let service = options2.service;
        if (typeof options2.getSocket === "function") {
          this.getSocket = options2.getSocket;
        }
        if (options2.url) {
          urlData = shared.parseConnectionUrl(options2.url);
          service = service || urlData.service;
        }
        this.options = shared.assign(
          false,
          options2,
          urlData,
          service && wellKnown(service)
        );
        this.options.maxConnections = this.options.maxConnections || 5;
        this.options.maxMessages = this.options.maxMessages || 100;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-pool"
        });
        let connection2 = new SMTPConnection(this.options);
        this.name = "SMTP (pool)";
        this.version = packageData.version + "[client:" + connection2.version + "]";
        this._rateLimit = {
          counter: 0,
          timeout: null,
          waiting: [],
          checkpoint: false,
          delta: Number(this.options.rateDelta) || 1e3,
          limit: Number(this.options.rateLimit) || 0
        };
        this._closed = false;
        this._queue = [];
        this._connections = [];
        this._connectionCounter = 0;
        this.idling = true;
        setImmediate(() => {
          if (this.idling) {
            this.emit("idle");
          }
        });
      }
      getSocket(options2, callback) {
        return setImmediate(() => callback(null, false));
      }
      send(mail2, callback) {
        if (this._closed) {
          return false;
        }
        this._queue.push({
          mail: mail2,
          requeueAttempts: 0,
          callback
        });
        if (this.idling && this._queue.length >= this.options.maxConnections) {
          this.idling = false;
        }
        setImmediate(() => this._processMessages());
        return true;
      }
      close() {
        let connection2;
        let len = this._connections.length;
        this._closed = true;
        clearTimeout(this._rateLimit.timeout);
        if (!len && !this._queue.length) {
          return;
        }
        for (let i = len - 1; i >= 0; i--) {
          if (this._connections[i] && this._connections[i].available) {
            connection2 = this._connections[i];
            connection2.close();
            this.logger.info(
              {
                tnx: "connection",
                cid: connection2.id,
                action: "removed"
              },
              "Connection #%s removed",
              connection2.id
            );
          }
        }
        if (len && !this._connections.length) {
          this.logger.debug(
            {
              tnx: "connection"
            },
            "All connections removed"
          );
        }
        if (!this._queue.length) {
          return;
        }
        let invokeCallbacks = () => {
          if (!this._queue.length) {
            this.logger.debug(
              {
                tnx: "connection"
              },
              "Pending queue entries cleared"
            );
            return;
          }
          let entry = this._queue.shift();
          if (entry && typeof entry.callback === "function") {
            try {
              entry.callback(new Error("Connection pool was closed"));
            } catch (E) {
              this.logger.error(
                {
                  err: E,
                  tnx: "callback",
                  cid: connection2.id
                },
                "Callback error for #%s: %s",
                connection2.id,
                E.message
              );
            }
          }
          setImmediate(invokeCallbacks);
        };
        setImmediate(invokeCallbacks);
      }
      _processMessages() {
        let connection2;
        let i, len;
        if (this._closed) {
          return;
        }
        if (!this._queue.length) {
          if (!this.idling) {
            this.idling = true;
            this.emit("idle");
          }
          return;
        }
        for (i = 0, len = this._connections.length; i < len; i++) {
          if (this._connections[i].available) {
            connection2 = this._connections[i];
            break;
          }
        }
        if (!connection2 && this._connections.length < this.options.maxConnections) {
          connection2 = this._createConnection();
        }
        if (!connection2) {
          this.idling = false;
          return;
        }
        if (!this.idling && this._queue.length < this.options.maxConnections) {
          this.idling = true;
          this.emit("idle");
        }
        let entry = connection2.queueEntry = this._queue.shift();
        entry.messageId = (connection2.queueEntry.mail.message.getHeader("message-id") || "").replace(/[<>\s]/g, "");
        connection2.available = false;
        this.logger.debug(
          {
            tnx: "pool",
            cid: connection2.id,
            messageId: entry.messageId,
            action: "assign"
          },
          "Assigned message <%s> to #%s (%s)",
          entry.messageId,
          connection2.id,
          connection2.messages + 1
        );
        if (this._rateLimit.limit) {
          this._rateLimit.counter++;
          if (!this._rateLimit.checkpoint) {
            this._rateLimit.checkpoint = Date.now();
          }
        }
        connection2.send(entry.mail, (err2, info) => {
          if (entry === connection2.queueEntry) {
            try {
              entry.callback(err2, info);
            } catch (E) {
              this.logger.error(
                {
                  err: E,
                  tnx: "callback",
                  cid: connection2.id
                },
                "Callback error for #%s: %s",
                connection2.id,
                E.message
              );
            }
            connection2.queueEntry = false;
          }
        });
      }
      _createConnection() {
        let connection2 = new PoolResource(this);
        connection2.id = ++this._connectionCounter;
        this.logger.info(
          {
            tnx: "pool",
            cid: connection2.id,
            action: "conection"
          },
          "Created new pool resource #%s",
          connection2.id
        );
        connection2.on("available", () => {
          this.logger.debug(
            {
              tnx: "connection",
              cid: connection2.id,
              action: "available"
            },
            "Connection #%s became available",
            connection2.id
          );
          if (this._closed) {
            this.close();
          } else {
            this._processMessages();
          }
        });
        connection2.once("error", (err2) => {
          if (err2.code !== "EMAXLIMIT") {
            this.logger.error(
              {
                err: err2,
                tnx: "pool",
                cid: connection2.id
              },
              "Pool Error for #%s: %s",
              connection2.id,
              err2.message
            );
          } else {
            this.logger.debug(
              {
                tnx: "pool",
                cid: connection2.id,
                action: "maxlimit"
              },
              "Max messages limit exchausted for #%s",
              connection2.id
            );
          }
          if (connection2.queueEntry) {
            try {
              connection2.queueEntry.callback(err2);
            } catch (E) {
              this.logger.error(
                {
                  err: E,
                  tnx: "callback",
                  cid: connection2.id
                },
                "Callback error for #%s: %s",
                connection2.id,
                E.message
              );
            }
            connection2.queueEntry = false;
          }
          this._removeConnection(connection2);
          this._continueProcessing();
        });
        connection2.once("close", () => {
          this.logger.info(
            {
              tnx: "connection",
              cid: connection2.id,
              action: "closed"
            },
            "Connection #%s was closed",
            connection2.id
          );
          this._removeConnection(connection2);
          if (connection2.queueEntry) {
            setTimeout(() => {
              if (connection2.queueEntry) {
                if (this._shouldRequeuOnConnectionClose(connection2.queueEntry)) {
                  this._requeueEntryOnConnectionClose(connection2);
                } else {
                  this._failDeliveryOnConnectionClose(connection2);
                }
              }
              this._continueProcessing();
            }, 50);
          } else {
            this._continueProcessing();
          }
        });
        this._connections.push(connection2);
        return connection2;
      }
      _shouldRequeuOnConnectionClose(queueEntry) {
        if (this.options.maxRequeues === void 0 || this.options.maxRequeues < 0) {
          return true;
        }
        return queueEntry.requeueAttempts < this.options.maxRequeues;
      }
      _failDeliveryOnConnectionClose(connection2) {
        if (connection2.queueEntry && connection2.queueEntry.callback) {
          try {
            connection2.queueEntry.callback(new Error("Reached maximum number of retries after connection was closed"));
          } catch (E) {
            this.logger.error(
              {
                err: E,
                tnx: "callback",
                messageId: connection2.queueEntry.messageId,
                cid: connection2.id
              },
              "Callback error for #%s: %s",
              connection2.id,
              E.message
            );
          }
          connection2.queueEntry = false;
        }
      }
      _requeueEntryOnConnectionClose(connection2) {
        connection2.queueEntry.requeueAttempts = connection2.queueEntry.requeueAttempts + 1;
        this.logger.debug(
          {
            tnx: "pool",
            cid: connection2.id,
            messageId: connection2.queueEntry.messageId,
            action: "requeue"
          },
          "Re-queued message <%s> for #%s. Attempt: #%s",
          connection2.queueEntry.messageId,
          connection2.id,
          connection2.queueEntry.requeueAttempts
        );
        this._queue.unshift(connection2.queueEntry);
        connection2.queueEntry = false;
      }
      _continueProcessing() {
        if (this._closed) {
          this.close();
        } else {
          setTimeout(() => this._processMessages(), 100);
        }
      }
      _removeConnection(connection2) {
        let index = this._connections.indexOf(connection2);
        if (index !== -1) {
          this._connections.splice(index, 1);
        }
      }
      _checkRateLimit(callback) {
        if (!this._rateLimit.limit) {
          return callback();
        }
        let now = Date.now();
        if (this._rateLimit.counter < this._rateLimit.limit) {
          return callback();
        }
        this._rateLimit.waiting.push(callback);
        if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
          return this._clearRateLimit();
        } else if (!this._rateLimit.timeout) {
          this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
          this._rateLimit.checkpoint = now;
        }
      }
      _clearRateLimit() {
        clearTimeout(this._rateLimit.timeout);
        this._rateLimit.timeout = null;
        this._rateLimit.counter = 0;
        this._rateLimit.checkpoint = false;
        while (this._rateLimit.waiting.length) {
          let cb = this._rateLimit.waiting.shift();
          setImmediate(cb);
        }
      }
      isIdle() {
        return this.idling;
      }
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        let auth = new PoolResource(this).auth;
        this.getSocket(this.options, (err2, socketOptions) => {
          if (err2) {
            return callback(err2);
          }
          let options2 = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info(
              {
                tnx: "proxy",
                remoteAddress: socketOptions.connection.remoteAddress,
                remotePort: socketOptions.connection.remotePort,
                destHost: options2.host || "",
                destPort: options2.port || "",
                action: "connected"
              },
              "Using proxied socket from %s:%s to %s:%s",
              socketOptions.connection.remoteAddress,
              socketOptions.connection.remotePort,
              options2.host || "",
              options2.port || ""
            );
            options2 = shared.assign(false, options2);
            Object.keys(socketOptions).forEach((key2) => {
              options2[key2] = socketOptions[key2];
            });
          }
          let connection2 = new SMTPConnection(options2);
          let returned = false;
          connection2.once("error", (err3) => {
            if (returned) {
              return;
            }
            returned = true;
            connection2.close();
            return callback(err3);
          });
          connection2.once("end", () => {
            if (returned) {
              return;
            }
            returned = true;
            return callback(new Error("Connection closed"));
          });
          let finalize = () => {
            if (returned) {
              return;
            }
            returned = true;
            connection2.quit();
            return callback(null, true);
          };
          connection2.connect(() => {
            if (returned) {
              return;
            }
            if (auth && (connection2.allowsAuth || options2.forceAuth)) {
              connection2.login(auth, (err3) => {
                if (returned) {
                  return;
                }
                if (err3) {
                  returned = true;
                  connection2.close();
                  return callback(err3);
                }
                finalize();
              });
            } else if (!auth && connection2.allowsAuth && options2.forceAuth) {
              let err3 = new Error("Authentication info was not provided");
              err3.code = "NoAuth";
              returned = true;
              connection2.close();
              return callback(err3);
            } else {
              finalize();
            }
          });
        });
        return promise;
      }
    };
    module.exports = SMTPPool;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-transport/index.js
var require_smtp_transport = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/smtp-transport/index.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var SMTPConnection = require_smtp_connection();
    var wellKnown = require_well_known();
    var shared = require_shared();
    var XOAuth2 = require_xoauth2();
    var packageData = require_package();
    var SMTPTransport = class extends EventEmitter {
      constructor(options2) {
        super();
        options2 = options2 || {};
        if (typeof options2 === "string") {
          options2 = {
            url: options2
          };
        }
        let urlData;
        let service = options2.service;
        if (typeof options2.getSocket === "function") {
          this.getSocket = options2.getSocket;
        }
        if (options2.url) {
          urlData = shared.parseConnectionUrl(options2.url);
          service = service || urlData.service;
        }
        this.options = shared.assign(
          false,
          options2,
          urlData,
          service && wellKnown(service)
        );
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-transport"
        });
        let connection2 = new SMTPConnection(this.options);
        this.name = "SMTP";
        this.version = packageData.version + "[client:" + connection2.version + "]";
        if (this.options.auth) {
          this.auth = this.getAuth({});
        }
      }
      getSocket(options2, callback) {
        return setImmediate(() => callback(null, false));
      }
      getAuth(authOpts) {
        if (!authOpts) {
          return this.auth;
        }
        let hasAuth = false;
        let authData = {};
        if (this.options.auth && typeof this.options.auth === "object") {
          Object.keys(this.options.auth).forEach((key2) => {
            hasAuth = true;
            authData[key2] = this.options.auth[key2];
          });
        }
        if (authOpts && typeof authOpts === "object") {
          Object.keys(authOpts).forEach((key2) => {
            hasAuth = true;
            authData[key2] = authOpts[key2];
          });
        }
        if (!hasAuth) {
          return false;
        }
        switch ((authData.type || "").toString().toUpperCase()) {
          case "OAUTH2": {
            if (!authData.service && !authData.user) {
              return false;
            }
            let oauth2 = new XOAuth2(authData, this.logger);
            oauth2.provisionCallback = this.mailer && this.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
            oauth2.on("token", (token) => this.mailer.emit("token", token));
            oauth2.on("error", (err2) => this.emit("error", err2));
            return {
              type: "OAUTH2",
              user: authData.user,
              oauth2,
              method: "XOAUTH2"
            };
          }
          default:
            return {
              type: (authData.type || "").toString().toUpperCase() || "LOGIN",
              user: authData.user,
              credentials: {
                user: authData.user || "",
                pass: authData.pass,
                options: authData.options
              },
              method: (authData.method || "").trim().toUpperCase() || this.options.authMethod || false
            };
        }
      }
      send(mail2, callback) {
        this.getSocket(this.options, (err2, socketOptions) => {
          if (err2) {
            return callback(err2);
          }
          let returned = false;
          let options2 = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info(
              {
                tnx: "proxy",
                remoteAddress: socketOptions.connection.remoteAddress,
                remotePort: socketOptions.connection.remotePort,
                destHost: options2.host || "",
                destPort: options2.port || "",
                action: "connected"
              },
              "Using proxied socket from %s:%s to %s:%s",
              socketOptions.connection.remoteAddress,
              socketOptions.connection.remotePort,
              options2.host || "",
              options2.port || ""
            );
            options2 = shared.assign(false, options2);
            Object.keys(socketOptions).forEach((key2) => {
              options2[key2] = socketOptions[key2];
            });
          }
          let connection2 = new SMTPConnection(options2);
          connection2.once("error", (err3) => {
            if (returned) {
              return;
            }
            returned = true;
            connection2.close();
            return callback(err3);
          });
          connection2.once("end", () => {
            if (returned) {
              return;
            }
            let timer2 = setTimeout(() => {
              if (returned) {
                return;
              }
              returned = true;
              let err3 = new Error("Unexpected socket close");
              if (connection2 && connection2._socket && connection2._socket.upgrading) {
                err3.code = "ETLS";
              }
              callback(err3);
            }, 1e3);
            try {
              timer2.unref();
            } catch (E) {
            }
          });
          let sendMessage = () => {
            let envelope = mail2.message.getEnvelope();
            let messageId = mail2.message.messageId();
            let recipients = [].concat(envelope.to || []);
            if (recipients.length > 3) {
              recipients.push("...and " + recipients.splice(2).length + " more");
            }
            if (mail2.data.dsn) {
              envelope.dsn = mail2.data.dsn;
            }
            this.logger.info(
              {
                tnx: "send",
                messageId
              },
              "Sending message %s to <%s>",
              messageId,
              recipients.join(", ")
            );
            connection2.send(envelope, mail2.message.createReadStream(), (err3, info) => {
              returned = true;
              connection2.close();
              if (err3) {
                this.logger.error(
                  {
                    err: err3,
                    tnx: "send"
                  },
                  "Send error for %s: %s",
                  messageId,
                  err3.message
                );
                return callback(err3);
              }
              info.envelope = {
                from: envelope.from,
                to: envelope.to
              };
              info.messageId = messageId;
              try {
                return callback(null, info);
              } catch (E) {
                this.logger.error(
                  {
                    err: E,
                    tnx: "callback"
                  },
                  "Callback error for %s: %s",
                  messageId,
                  E.message
                );
              }
            });
          };
          connection2.connect(() => {
            if (returned) {
              return;
            }
            let auth = this.getAuth(mail2.data.auth);
            if (auth && (connection2.allowsAuth || options2.forceAuth)) {
              connection2.login(auth, (err3) => {
                if (auth && auth !== this.auth && auth.oauth2) {
                  auth.oauth2.removeAllListeners();
                }
                if (returned) {
                  return;
                }
                if (err3) {
                  returned = true;
                  connection2.close();
                  return callback(err3);
                }
                sendMessage();
              });
            } else {
              sendMessage();
            }
          });
        });
      }
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        this.getSocket(this.options, (err2, socketOptions) => {
          if (err2) {
            return callback(err2);
          }
          let options2 = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info(
              {
                tnx: "proxy",
                remoteAddress: socketOptions.connection.remoteAddress,
                remotePort: socketOptions.connection.remotePort,
                destHost: options2.host || "",
                destPort: options2.port || "",
                action: "connected"
              },
              "Using proxied socket from %s:%s to %s:%s",
              socketOptions.connection.remoteAddress,
              socketOptions.connection.remotePort,
              options2.host || "",
              options2.port || ""
            );
            options2 = shared.assign(false, options2);
            Object.keys(socketOptions).forEach((key2) => {
              options2[key2] = socketOptions[key2];
            });
          }
          let connection2 = new SMTPConnection(options2);
          let returned = false;
          connection2.once("error", (err3) => {
            if (returned) {
              return;
            }
            returned = true;
            connection2.close();
            return callback(err3);
          });
          connection2.once("end", () => {
            if (returned) {
              return;
            }
            returned = true;
            return callback(new Error("Connection closed"));
          });
          let finalize = () => {
            if (returned) {
              return;
            }
            returned = true;
            connection2.quit();
            return callback(null, true);
          };
          connection2.connect(() => {
            if (returned) {
              return;
            }
            let authData = this.getAuth({});
            if (authData && (connection2.allowsAuth || options2.forceAuth)) {
              connection2.login(authData, (err3) => {
                if (returned) {
                  return;
                }
                if (err3) {
                  returned = true;
                  connection2.close();
                  return callback(err3);
                }
                finalize();
              });
            } else if (!authData && connection2.allowsAuth && options2.forceAuth) {
              let err3 = new Error("Authentication info was not provided");
              err3.code = "NoAuth";
              returned = true;
              connection2.close();
              return callback(err3);
            } else {
              finalize();
            }
          });
        });
        return promise;
      }
      close() {
        if (this.auth && this.auth.oauth2) {
          this.auth.oauth2.removeAllListeners();
        }
        this.emit("close");
      }
    };
    module.exports = SMTPTransport;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/sendmail-transport/index.js
var require_sendmail_transport = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/sendmail-transport/index.js"(exports, module) {
    "use strict";
    var spawn = __require("child_process").spawn;
    var packageData = require_package();
    var shared = require_shared();
    var SendmailTransport = class {
      constructor(options2) {
        options2 = options2 || {};
        this._spawn = spawn;
        this.options = options2 || {};
        this.name = "Sendmail";
        this.version = packageData.version;
        this.path = "sendmail";
        this.args = false;
        this.winbreak = false;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "sendmail"
        });
        if (options2) {
          if (typeof options2 === "string") {
            this.path = options2;
          } else if (typeof options2 === "object") {
            if (options2.path) {
              this.path = options2.path;
            }
            if (Array.isArray(options2.args)) {
              this.args = options2.args;
            }
            this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options2.newline || "").toString().toLowerCase());
          }
        }
      }
      send(mail2, done) {
        mail2.message.keepBcc = true;
        let envelope = mail2.data.envelope || mail2.message.getEnvelope();
        let messageId = mail2.message.messageId();
        let args;
        let sendmail;
        let returned;
        const hasInvalidAddresses = [].concat(envelope.from || []).concat(envelope.to || []).some((addr) => /^-/.test(addr));
        if (hasInvalidAddresses) {
          return done(new Error("Can not send mail. Invalid envelope addresses."));
        }
        if (this.args) {
          args = ["-i"].concat(this.args).concat(envelope.to);
        } else {
          args = ["-i"].concat(envelope.from ? ["-f", envelope.from] : []).concat(envelope.to);
        }
        let callback = (err2) => {
          if (returned) {
            return;
          }
          returned = true;
          if (typeof done === "function") {
            if (err2) {
              return done(err2);
            } else {
              return done(null, {
                envelope: mail2.data.envelope || mail2.message.getEnvelope(),
                messageId,
                response: "Messages queued for delivery"
              });
            }
          }
        };
        try {
          sendmail = this._spawn(this.path, args);
        } catch (E) {
          this.logger.error(
            {
              err: E,
              tnx: "spawn",
              messageId
            },
            "Error occurred while spawning sendmail. %s",
            E.message
          );
          return callback(E);
        }
        if (sendmail) {
          sendmail.on("error", (err2) => {
            this.logger.error(
              {
                err: err2,
                tnx: "spawn",
                messageId
              },
              "Error occurred when sending message %s. %s",
              messageId,
              err2.message
            );
            callback(err2);
          });
          sendmail.once("exit", (code) => {
            if (!code) {
              return callback();
            }
            let err2;
            if (code === 127) {
              err2 = new Error("Sendmail command not found, process exited with code " + code);
            } else {
              err2 = new Error("Sendmail exited with code " + code);
            }
            this.logger.error(
              {
                err: err2,
                tnx: "stdin",
                messageId
              },
              "Error sending message %s to sendmail. %s",
              messageId,
              err2.message
            );
            callback(err2);
          });
          sendmail.once("close", callback);
          sendmail.stdin.on("error", (err2) => {
            this.logger.error(
              {
                err: err2,
                tnx: "stdin",
                messageId
              },
              "Error occurred when piping message %s to sendmail. %s",
              messageId,
              err2.message
            );
            callback(err2);
          });
          let recipients = [].concat(envelope.to || []);
          if (recipients.length > 3) {
            recipients.push("...and " + recipients.splice(2).length + " more");
          }
          this.logger.info(
            {
              tnx: "send",
              messageId
            },
            "Sending message %s to <%s>",
            messageId,
            recipients.join(", ")
          );
          let sourceStream = mail2.message.createReadStream();
          sourceStream.once("error", (err2) => {
            this.logger.error(
              {
                err: err2,
                tnx: "stdin",
                messageId
              },
              "Error occurred when generating message %s. %s",
              messageId,
              err2.message
            );
            sendmail.kill("SIGINT");
            callback(err2);
          });
          sourceStream.pipe(sendmail.stdin);
        } else {
          return callback(new Error("sendmail was not found"));
        }
      }
    };
    module.exports = SendmailTransport;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/stream-transport/index.js
var require_stream_transport = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/stream-transport/index.js"(exports, module) {
    "use strict";
    var packageData = require_package();
    var shared = require_shared();
    var StreamTransport = class {
      constructor(options2) {
        options2 = options2 || {};
        this.options = options2 || {};
        this.name = "StreamTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "stream-transport"
        });
        this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options2.newline || "").toString().toLowerCase());
      }
      send(mail2, done) {
        mail2.message.keepBcc = true;
        let envelope = mail2.data.envelope || mail2.message.getEnvelope();
        let messageId = mail2.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info(
          {
            tnx: "send",
            messageId
          },
          "Sending message %s to <%s> using %s line breaks",
          messageId,
          recipients.join(", "),
          this.winbreak ? "<CR><LF>" : "<LF>"
        );
        setImmediate(() => {
          let stream;
          try {
            stream = mail2.message.createReadStream();
          } catch (E) {
            this.logger.error(
              {
                err: E,
                tnx: "send",
                messageId
              },
              "Creating send stream failed for %s. %s",
              messageId,
              E.message
            );
            return done(E);
          }
          if (!this.options.buffer) {
            stream.once("error", (err2) => {
              this.logger.error(
                {
                  err: err2,
                  tnx: "send",
                  messageId
                },
                "Failed creating message for %s. %s",
                messageId,
                err2.message
              );
            });
            return done(null, {
              envelope: mail2.data.envelope || mail2.message.getEnvelope(),
              messageId,
              message: stream
            });
          }
          let chunks = [];
          let chunklen = 0;
          stream.on("readable", () => {
            let chunk;
            while ((chunk = stream.read()) !== null) {
              chunks.push(chunk);
              chunklen += chunk.length;
            }
          });
          stream.once("error", (err2) => {
            this.logger.error(
              {
                err: err2,
                tnx: "send",
                messageId
              },
              "Failed creating message for %s. %s",
              messageId,
              err2.message
            );
            return done(err2);
          });
          stream.on(
            "end",
            () => done(null, {
              envelope: mail2.data.envelope || mail2.message.getEnvelope(),
              messageId,
              message: Buffer.concat(chunks, chunklen)
            })
          );
        });
      }
    };
    module.exports = StreamTransport;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/json-transport/index.js
var require_json_transport = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/json-transport/index.js"(exports, module) {
    "use strict";
    var packageData = require_package();
    var shared = require_shared();
    var JSONTransport = class {
      constructor(options2) {
        options2 = options2 || {};
        this.options = options2 || {};
        this.name = "JSONTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "json-transport"
        });
      }
      send(mail2, done) {
        mail2.message.keepBcc = true;
        let envelope = mail2.data.envelope || mail2.message.getEnvelope();
        let messageId = mail2.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info(
          {
            tnx: "send",
            messageId
          },
          "Composing JSON structure of %s to <%s>",
          messageId,
          recipients.join(", ")
        );
        setImmediate(() => {
          mail2.normalize((err2, data) => {
            if (err2) {
              this.logger.error(
                {
                  err: err2,
                  tnx: "send",
                  messageId
                },
                "Failed building JSON structure for %s. %s",
                messageId,
                err2.message
              );
              return done(err2);
            }
            delete data.envelope;
            delete data.normalizedHeaders;
            return done(null, {
              envelope,
              messageId,
              message: this.options.skipEncoding ? data : JSON.stringify(data)
            });
          });
        });
      }
    };
    module.exports = JSONTransport;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/ses-transport/index.js
var require_ses_transport = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/ses-transport/index.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var packageData = require_package();
    var shared = require_shared();
    var LeWindows = require_le_windows();
    var SESTransport = class extends EventEmitter {
      constructor(options2) {
        super();
        options2 = options2 || {};
        this.options = options2 || {};
        this.ses = this.options.SES;
        this.name = "SESTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "ses-transport"
        });
        this.maxConnections = Number(this.options.maxConnections) || Infinity;
        this.connections = 0;
        this.sendingRate = Number(this.options.sendingRate) || Infinity;
        this.sendingRateTTL = null;
        this.rateInterval = 1e3;
        this.rateMessages = [];
        this.pending = [];
        this.idling = true;
        setImmediate(() => {
          if (this.idling) {
            this.emit("idle");
          }
        });
      }
      send(mail2, callback) {
        if (this.connections >= this.maxConnections) {
          this.idling = false;
          return this.pending.push({
            mail: mail2,
            callback
          });
        }
        if (!this._checkSendingRate()) {
          this.idling = false;
          return this.pending.push({
            mail: mail2,
            callback
          });
        }
        this._send(mail2, (...args) => {
          setImmediate(() => callback(...args));
          this._sent();
        });
      }
      _checkRatedQueue() {
        if (this.connections >= this.maxConnections || !this._checkSendingRate()) {
          return;
        }
        if (!this.pending.length) {
          if (!this.idling) {
            this.idling = true;
            this.emit("idle");
          }
          return;
        }
        let next2 = this.pending.shift();
        this._send(next2.mail, (...args) => {
          setImmediate(() => next2.callback(...args));
          this._sent();
        });
      }
      _checkSendingRate() {
        clearTimeout(this.sendingRateTTL);
        let now = Date.now();
        let oldest = false;
        for (let i = this.rateMessages.length - 1; i >= 0; i--) {
          if (this.rateMessages[i].ts >= now - this.rateInterval && (!oldest || this.rateMessages[i].ts < oldest)) {
            oldest = this.rateMessages[i].ts;
          }
          if (this.rateMessages[i].ts < now - this.rateInterval && !this.rateMessages[i].pending) {
            this.rateMessages.splice(i, 1);
          }
        }
        if (this.rateMessages.length < this.sendingRate) {
          return true;
        }
        let delay = Math.max(oldest + 1001, now + 20);
        this.sendingRateTTL = setTimeout(() => this._checkRatedQueue(), now - delay);
        try {
          this.sendingRateTTL.unref();
        } catch (E) {
        }
        return false;
      }
      _sent() {
        this.connections--;
        this._checkRatedQueue();
      }
      isIdle() {
        return this.idling;
      }
      _send(mail2, callback) {
        let statObject = {
          ts: Date.now(),
          pending: true
        };
        this.connections++;
        this.rateMessages.push(statObject);
        let envelope = mail2.data.envelope || mail2.message.getEnvelope();
        let messageId = mail2.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info(
          {
            tnx: "send",
            messageId
          },
          "Sending message %s to <%s>",
          messageId,
          recipients.join(", ")
        );
        let getRawMessage = (next2) => {
          if (!mail2.data._dkim) {
            mail2.data._dkim = {};
          }
          if (mail2.data._dkim.skipFields && typeof mail2.data._dkim.skipFields === "string") {
            mail2.data._dkim.skipFields += ":date:message-id";
          } else {
            mail2.data._dkim.skipFields = "date:message-id";
          }
          let sourceStream = mail2.message.createReadStream();
          let stream = sourceStream.pipe(new LeWindows());
          let chunks = [];
          let chunklen = 0;
          stream.on("readable", () => {
            let chunk;
            while ((chunk = stream.read()) !== null) {
              chunks.push(chunk);
              chunklen += chunk.length;
            }
          });
          sourceStream.once("error", (err2) => stream.emit("error", err2));
          stream.once("error", (err2) => {
            next2(err2);
          });
          stream.once("end", () => next2(null, Buffer.concat(chunks, chunklen)));
        };
        setImmediate(
          () => getRawMessage((err2, raw) => {
            if (err2) {
              this.logger.error(
                {
                  err: err2,
                  tnx: "send",
                  messageId
                },
                "Failed creating message for %s. %s",
                messageId,
                err2.message
              );
              statObject.pending = false;
              return callback(err2);
            }
            let sesMessage = {
              RawMessage: {
                Data: raw
              },
              Source: envelope.from,
              Destinations: envelope.to
            };
            Object.keys(mail2.data.ses || {}).forEach((key2) => {
              sesMessage[key2] = mail2.data.ses[key2];
            });
            let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
            let aws = this.ses.aws || {};
            let getRegion = (cb) => {
              if (ses.config && typeof ses.config.region === "function") {
                return ses.config.region().then((region) => cb(null, region)).catch((err3) => cb(err3));
              }
              return cb(null, ses.config && ses.config.region || "us-east-1");
            };
            getRegion((err3, region) => {
              if (err3 || !region) {
                region = "us-east-1";
              }
              let sendPromise;
              if (typeof ses.send === "function" && aws.SendRawEmailCommand) {
                sendPromise = ses.send(new aws.SendRawEmailCommand(sesMessage));
              } else {
                sendPromise = ses.sendRawEmail(sesMessage).promise();
              }
              sendPromise.then((data) => {
                if (region === "us-east-1") {
                  region = "email";
                }
                statObject.pending = false;
                callback(null, {
                  envelope: {
                    from: envelope.from,
                    to: envelope.to
                  },
                  messageId: "<" + data.MessageId + (!/@/.test(data.MessageId) ? "@" + region + ".amazonses.com" : "") + ">",
                  response: data.MessageId,
                  raw
                });
              }).catch((err4) => {
                this.logger.error(
                  {
                    err: err4,
                    tnx: "send"
                  },
                  "Send error for %s: %s",
                  messageId,
                  err4.message
                );
                statObject.pending = false;
                callback(err4);
              });
            });
          })
        );
      }
      verify(callback) {
        let promise;
        let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
        let aws = this.ses.aws || {};
        const sesMessage = {
          RawMessage: {
            Data: "From: invalid@invalid\r\nTo: invalid@invalid\r\n Subject: Invalid\r\n\r\nInvalid"
          },
          Source: "invalid@invalid",
          Destinations: ["invalid@invalid"]
        };
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        const cb = (err2) => {
          if (err2 && (err2.code || err2.Code) !== "InvalidParameterValue") {
            return callback(err2);
          }
          return callback(null, true);
        };
        if (typeof ses.send === "function" && aws.SendRawEmailCommand) {
          sesMessage.RawMessage.Data = Buffer.from(sesMessage.RawMessage.Data);
          ses.send(new aws.SendRawEmailCommand(sesMessage), cb);
        } else {
          ses.sendRawEmail(sesMessage, cb);
        }
        return promise;
      }
    };
    module.exports = SESTransport;
  }
});

// ../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/nodemailer.js
var require_nodemailer = __commonJS({
  "../../node_modules/.pnpm/nodemailer@6.8.0/node_modules/nodemailer/lib/nodemailer.js"(exports, module) {
    "use strict";
    var Mailer = require_mailer();
    var shared = require_shared();
    var SMTPPool = require_smtp_pool();
    var SMTPTransport = require_smtp_transport();
    var SendmailTransport = require_sendmail_transport();
    var StreamTransport = require_stream_transport();
    var JSONTransport = require_json_transport();
    var SESTransport = require_ses_transport();
    var nmfetch = require_fetch();
    var packageData = require_package();
    var ETHEREAL_API = (process.env.ETHEREAL_API || "https://api.nodemailer.com").replace(/\/+$/, "");
    var ETHEREAL_WEB = (process.env.ETHEREAL_WEB || "https://ethereal.email").replace(/\/+$/, "");
    var ETHEREAL_CACHE = ["true", "yes", "y", "1"].includes((process.env.ETHEREAL_CACHE || "yes").toString().trim().toLowerCase());
    var testAccount = false;
    module.exports.createTransport = function(transporter, defaults2) {
      let urlConfig;
      let options2;
      let mailer;
      if (typeof transporter === "object" && typeof transporter.send !== "function" || typeof transporter === "string" && /^(smtps?|direct):/i.test(transporter)) {
        if (urlConfig = typeof transporter === "string" ? transporter : transporter.url) {
          options2 = shared.parseConnectionUrl(urlConfig);
        } else {
          options2 = transporter;
        }
        if (options2.pool) {
          transporter = new SMTPPool(options2);
        } else if (options2.sendmail) {
          transporter = new SendmailTransport(options2);
        } else if (options2.streamTransport) {
          transporter = new StreamTransport(options2);
        } else if (options2.jsonTransport) {
          transporter = new JSONTransport(options2);
        } else if (options2.SES) {
          transporter = new SESTransport(options2);
        } else {
          transporter = new SMTPTransport(options2);
        }
      }
      mailer = new Mailer(transporter, options2, defaults2);
      return mailer;
    };
    module.exports.createTestAccount = function(apiUrl, callback) {
      let promise;
      if (!callback && typeof apiUrl === "function") {
        callback = apiUrl;
        apiUrl = false;
      }
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = shared.callbackPromise(resolve, reject);
        });
      }
      if (ETHEREAL_CACHE && testAccount) {
        setImmediate(() => callback(null, testAccount));
        return promise;
      }
      apiUrl = apiUrl || ETHEREAL_API;
      let chunks = [];
      let chunklen = 0;
      let req = nmfetch(apiUrl + "/user", {
        contentType: "application/json",
        method: "POST",
        body: Buffer.from(
          JSON.stringify({
            requestor: packageData.name,
            version: packageData.version
          })
        )
      });
      req.on("readable", () => {
        let chunk;
        while ((chunk = req.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      req.once("error", (err2) => callback(err2));
      req.once("end", () => {
        let res = Buffer.concat(chunks, chunklen);
        let data;
        let err2;
        try {
          data = JSON.parse(res.toString());
        } catch (E) {
          err2 = E;
        }
        if (err2) {
          return callback(err2);
        }
        if (data.status !== "success" || data.error) {
          return callback(new Error(data.error || "Request failed"));
        }
        delete data.status;
        testAccount = data;
        callback(null, testAccount);
      });
      return promise;
    };
    module.exports.getTestMessageUrl = function(info) {
      if (!info || !info.response) {
        return false;
      }
      let infoProps = /* @__PURE__ */ new Map();
      info.response.replace(/\[([^\]]+)\]$/, (m, props) => {
        props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m2, key2, value) => {
          infoProps.set(key2, value);
        });
      });
      if (infoProps.has("STATUS") && infoProps.has("MSGID")) {
        return (testAccount.web || ETHEREAL_WEB) + "/message/" + infoProps.get("MSGID");
      }
      return false;
    };
  }
});

// ../../node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "../../node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js"(exports, module) {
    "use strict";
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// ../../node_modules/.pnpm/color-name@1.1.3/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "../../node_modules/.pnpm/color-name@1.1.3/node_modules/color-name/index.js"(exports, module) {
    "use strict";
    module.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// ../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/conversions.js"(exports, module) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (key2 in cssKeywords) {
      if (cssKeywords.hasOwnProperty(key2)) {
        reverseKeywords[cssKeywords[key2]] = key2;
      }
    }
    var key2;
    var convert = module.exports = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    for (model in convert) {
      if (convert.hasOwnProperty(model)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        channels = convert[model].channels;
        labels = convert[model].labels;
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
    }
    var channels;
    var labels;
    var model;
    convert.rgb.hsl = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b2 = rgb[2] / 255;
      var min = Math.min(r, g, b2);
      var max = Math.max(r, g, b2);
      var delta = max - min;
      var h;
      var s;
      var l;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b2) / delta;
      } else if (g === max) {
        h = 2 + (b2 - r) / delta;
      } else if (b2 === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h;
      var s;
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b2 = rgb[2] / 255;
      var v = Math.max(r, g, b2);
      var diff = v - Math.min(r, g, b2);
      var diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b2);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b2 === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      var r = rgb[0];
      var g = rgb[1];
      var b2 = rgb[2];
      var h = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b2));
      b2 = 1 - 1 / 255 * Math.max(r, Math.max(g, b2));
      return [h, w * 100, b2 * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b2 = rgb[2] / 255;
      var c;
      var m;
      var y2;
      var k;
      k = Math.min(1 - r, 1 - g, 1 - b2);
      c = (1 - r - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y2 = (1 - b2 - k) / (1 - k) || 0;
      return [c * 100, m * 100, y2 * 100, k * 100];
    };
    function comparativeDistance(x, y2) {
      return Math.pow(x[0] - y2[0], 2) + Math.pow(x[1] - y2[1], 2) + Math.pow(x[2] - y2[2], 2);
    }
    convert.rgb.keyword = function(rgb) {
      var reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      var currentClosestDistance = Infinity;
      var currentClosestKeyword;
      for (var keyword in cssKeywords) {
        if (cssKeywords.hasOwnProperty(keyword)) {
          var value = cssKeywords[keyword];
          var distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b2 = rgb[2] / 255;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b2 = b2 > 0.04045 ? Math.pow((b2 + 0.055) / 1.055, 2.4) : b2 / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b2 * 0.1805;
      var y2 = r * 0.2126 + g * 0.7152 + b2 * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b2 * 0.9505;
      return [x * 100, y2 * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x = xyz[0];
      var y2 = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b2;
      x /= 95.047;
      y2 /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y2 = y2 > 8856e-6 ? Math.pow(y2, 1 / 3) : 7.787 * y2 + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y2 - 16;
      a = 500 * (x - y2);
      b2 = 200 * (y2 - z);
      return [l, a, b2];
    };
    convert.hsl.rgb = function(hsl) {
      var h = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb;
      var val2;
      if (s === 0) {
        val2 = l * 255;
        return [val2, val2, val2];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      t1 = 2 * l - t2;
      rgb = [0, 0, 0];
      for (var i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val2 = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val2 = t2;
        } else if (3 * t3 < 2) {
          val2 = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val2 = t1;
        }
        rgb[i] = val2 * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      var h = hsl[0];
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var smin = s;
      var lmin = Math.max(l, 0.01);
      var sv;
      var v;
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      v = (l + s) / 2;
      sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      var h = hsv[0] / 60;
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h) % 6;
      var f = h - Math.floor(h);
      var p = 255 * v * (1 - s);
      var q = 255 * v * (1 - s * f);
      var t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      var h = hsv[0];
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var lmin;
      var sl;
      var l;
      l = (2 - s) * v;
      lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      var h = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var i;
      var v;
      var f;
      var n;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      i = Math.floor(6 * h);
      v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      n = wh + f * (v - wh);
      var r;
      var g;
      var b2;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b2 = wh;
          break;
        case 1:
          r = n;
          g = v;
          b2 = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b2 = n;
          break;
        case 3:
          r = wh;
          g = n;
          b2 = v;
          break;
        case 4:
          r = n;
          g = wh;
          b2 = v;
          break;
        case 5:
          r = v;
          g = wh;
          b2 = n;
          break;
      }
      return [r * 255, g * 255, b2 * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y2 = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r;
      var g;
      var b2;
      r = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m * (1 - k) + k);
      b2 = 1 - Math.min(1, y2 * (1 - k) + k);
      return [r * 255, g * 255, b2 * 255];
    };
    convert.xyz.rgb = function(xyz) {
      var x = xyz[0] / 100;
      var y2 = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r;
      var g;
      var b2;
      r = x * 3.2406 + y2 * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y2 * 1.8758 + z * 0.0415;
      b2 = x * 0.0557 + y2 * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
      b2 = b2 > 31308e-7 ? 1.055 * Math.pow(b2, 1 / 2.4) - 0.055 : b2 * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b2 = Math.min(Math.max(0, b2), 1);
      return [r * 255, g * 255, b2 * 255];
    };
    convert.xyz.lab = function(xyz) {
      var x = xyz[0];
      var y2 = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b2;
      x /= 95.047;
      y2 /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y2 = y2 > 8856e-6 ? Math.pow(y2, 1 / 3) : 7.787 * y2 + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y2 - 16;
      a = 500 * (x - y2);
      b2 = 200 * (y2 - z);
      return [l, a, b2];
    };
    convert.lab.xyz = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b2 = lab[2];
      var x;
      var y2;
      var z;
      y2 = (l + 16) / 116;
      x = a / 500 + y2;
      z = y2 - b2 / 200;
      var y22 = Math.pow(y2, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y2 = y22 > 8856e-6 ? y22 : (y2 - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y2 *= 100;
      z *= 108.883;
      return [x, y2, z];
    };
    convert.lab.lch = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b2 = lab[2];
      var hr;
      var h;
      var c;
      hr = Math.atan2(b2, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      c = Math.sqrt(a * a + b2 * b2);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      var l = lch[0];
      var c = lch[1];
      var h = lch[2];
      var a;
      var b2;
      var hr;
      hr = h / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b2 = c * Math.sin(hr);
      return [l, a, b2];
    };
    convert.rgb.ansi16 = function(args) {
      var r = args[0];
      var g = args[1];
      var b2 = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      var ansi = 30 + (Math.round(b2 / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      var r = args[0];
      var g = args[1];
      var b2 = args[2];
      if (r === g && g === b2) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b2 / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      var color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      var mult = (~~(args > 50) + 1) * 0.5;
      var r = (color & 1) * mult * 255;
      var g = (color >> 1 & 1) * mult * 255;
      var b2 = (color >> 2 & 1) * mult * 255;
      return [r, g, b2];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      var rem;
      var r = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b2 = rem % 6 / 5 * 255;
      return [r, g, b2];
    };
    convert.rgb.hex = function(args) {
      var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      var colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map(function(char) {
          return char + char;
        }).join("");
      }
      var integer = parseInt(colorString, 16);
      var r = integer >> 16 & 255;
      var g = integer >> 8 & 255;
      var b2 = integer & 255;
      return [r, g, b2];
    };
    convert.rgb.hcg = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b2 = rgb[2] / 255;
      var max = Math.max(Math.max(r, g), b2);
      var min = Math.min(Math.min(r, g), b2);
      var chroma = max - min;
      var grayscale;
      var hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b2) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b2 - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma + 4;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var c = 1;
      var f = 0;
      if (l < 0.5) {
        c = 2 * s * l;
      } else {
        c = 2 * s * (1 - l);
      }
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s * v;
      var f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      var h = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      var pure = [0, 0, 0];
      var hi = h % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      var f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1 - c) + 0.5 * c;
      var s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      var w = hwb[1] / 100;
      var b2 = hwb[2] / 100;
      var v = 1 - b2;
      var c = v - w;
      var g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = convert.gray.hsv = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hwb = function(gray2) {
      return [0, 100, gray2[0]];
    };
    convert.gray.cmyk = function(gray2) {
      return [0, 0, 0, gray2[0]];
    };
    convert.gray.lab = function(gray2) {
      return [gray2[0], 0, 0];
    };
    convert.gray.hex = function(gray2) {
      var val2 = Math.round(gray2[0] / 100 * 255) & 255;
      var integer = (val2 << 16) + (val2 << 8) + val2;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      var val2 = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val2 / 255 * 100];
    };
  }
});

// ../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/route.js
var require_route = __commonJS({
  "../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/route.js"(exports, module) {
    var conversions = require_conversions();
    function buildGraph() {
      var graph = {};
      var models = Object.keys(conversions);
      for (var len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      var graph = buildGraph();
      var queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        var current = queue.pop();
        var adjacents = Object.keys(conversions[current]);
        for (var len = adjacents.length, i = 0; i < len; i++) {
          var adjacent = adjacents[i];
          var node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      var path = [graph[toModel].parent, toModel];
      var fn = conversions[graph[toModel].parent][toModel];
      var cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path;
      return fn;
    }
    module.exports = function(fromModel) {
      var graph = deriveBFS(fromModel);
      var conversion = {};
      var models = Object.keys(graph);
      for (var len = models.length, i = 0; i < len; i++) {
        var toModel = models[i];
        var node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// ../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "../../node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/index.js"(exports, module) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        var result = fn(args);
        if (typeof result === "object") {
          for (var len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach(function(fromModel) {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      var routes = route(fromModel);
      var routeModels = Object.keys(routes);
      routeModels.forEach(function(toModel) {
        var fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module.exports = convert;
  }
});

// ../../node_modules/.pnpm/ansi-styles@3.2.1/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "../../node_modules/.pnpm/ansi-styles@3.2.1/node_modules/ansi-styles/index.js"(exports, module) {
    "use strict";
    var colorConvert = require_color_convert();
    var wrapAnsi162 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi2562 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m2 = (fn, offset) => function() {
      const rgb = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    function assembleStyles2() {
      const codes = /* @__PURE__ */ new Map();
      const styles3 = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          gray: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles3.color.grey = styles3.color.gray;
      for (const groupName of Object.keys(styles3)) {
        const group = styles3[groupName];
        for (const styleName of Object.keys(group)) {
          const style = group[styleName];
          styles3[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles3[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles3, groupName, {
          value: group,
          enumerable: false
        });
        Object.defineProperty(styles3, "codes", {
          value: codes,
          enumerable: false
        });
      }
      const ansi2ansi = (n) => n;
      const rgb2rgb = (r, g, b2) => [r, g, b2];
      styles3.color.close = "\x1B[39m";
      styles3.bgColor.close = "\x1B[49m";
      styles3.color.ansi = {
        ansi: wrapAnsi162(ansi2ansi, 0)
      };
      styles3.color.ansi256 = {
        ansi256: wrapAnsi2562(ansi2ansi, 0)
      };
      styles3.color.ansi16m = {
        rgb: wrapAnsi16m2(rgb2rgb, 0)
      };
      styles3.bgColor.ansi = {
        ansi: wrapAnsi162(ansi2ansi, 10)
      };
      styles3.bgColor.ansi256 = {
        ansi256: wrapAnsi2562(ansi2ansi, 10)
      };
      styles3.bgColor.ansi16m = {
        rgb: wrapAnsi16m2(rgb2rgb, 10)
      };
      for (let key2 of Object.keys(colorConvert)) {
        if (typeof colorConvert[key2] !== "object") {
          continue;
        }
        const suite = colorConvert[key2];
        if (key2 === "ansi16") {
          key2 = "ansi";
        }
        if ("ansi16" in suite) {
          styles3.color.ansi[key2] = wrapAnsi162(suite.ansi16, 0);
          styles3.bgColor.ansi[key2] = wrapAnsi162(suite.ansi16, 10);
        }
        if ("ansi256" in suite) {
          styles3.color.ansi256[key2] = wrapAnsi2562(suite.ansi256, 0);
          styles3.bgColor.ansi256[key2] = wrapAnsi2562(suite.ansi256, 10);
        }
        if ("rgb" in suite) {
          styles3.color.ansi16m[key2] = wrapAnsi16m2(suite.rgb, 0);
          styles3.bgColor.ansi16m[key2] = wrapAnsi16m2(suite.rgb, 10);
        }
      }
      return styles3;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles2
    });
  }
});

// ../../node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// ../../node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os3 = __require("os");
    var hasFlag2 = require_has_flag();
    var env3 = process.env;
    var forceColor;
    if (hasFlag2("no-color") || hasFlag2("no-colors") || hasFlag2("color=false")) {
      forceColor = false;
    } else if (hasFlag2("color") || hasFlag2("colors") || hasFlag2("color=true") || hasFlag2("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env3) {
      forceColor = env3.FORCE_COLOR.length === 0 || parseInt(env3.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel2(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor2(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag2("color=16m") || hasFlag2("color=full") || hasFlag2("color=truecolor")) {
        return 3;
      }
      if (hasFlag2("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os3.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env3) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env3) || env3.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env3) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env3.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env3.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env3) {
        const version = parseInt((env3.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env3.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env3.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env3.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env3) {
        return 1;
      }
      if (env3.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor2(stream);
      return translateLevel2(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// ../../node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/templates.js
var require_templates = __commonJS({
  "../../node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/templates.js"(exports, module) {
    "use strict";
    var TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape2(c) {
      if (c[0] === "u" && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name2, args) {
      const results = [];
      const chunks = args.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        if (!isNaN(chunk)) {
          results.push(Number(chunk));
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape3, chr) => escape3 ? unescape2(escape3) : chr));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name2}')`);
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name2 = matches[1];
        if (matches[2]) {
          const args = parseArguments(name2, matches[2]);
          results.push([name2].concat(args));
        } else {
          results.push([name2]);
        }
      }
      return results;
    }
    function buildStyle(chalk2, styles3) {
      const enabled = {};
      for (const layer of styles3) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk2;
      for (const styleName of Object.keys(enabled)) {
        if (Array.isArray(enabled[styleName])) {
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          if (enabled[styleName].length > 0) {
            current = current[styleName].apply(current, enabled[styleName]);
          } else {
            current = current[styleName];
          }
        }
      }
      return current;
    }
    module.exports = (chalk2, tmp) => {
      const styles3 = [];
      const chunks = [];
      let chunk = [];
      tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
        if (escapeChar) {
          chunk.push(unescape2(escapeChar));
        } else if (style) {
          const str = chunk.join("");
          chunk = [];
          chunks.push(styles3.length === 0 ? str : buildStyle(chalk2, styles3)(str));
          styles3.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles3.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk2, styles3)(chunk.join("")));
          chunk = [];
          styles3.pop();
        } else {
          chunk.push(chr);
        }
      });
      chunks.push(chunk.join(""));
      if (styles3.length > 0) {
        const errMsg = `Chalk template literal is missing ${styles3.length} closing bracket${styles3.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMsg);
      }
      return chunks.join("");
    };
  }
});

// ../../node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js
var require_chalk = __commonJS({
  "../../node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js"(exports, module) {
    "use strict";
    var escapeStringRegexp = require_escape_string_regexp();
    var ansiStyles2 = require_ansi_styles();
    var stdoutColor2 = require_supports_color().stdout;
    var template = require_templates();
    var isSimpleWindowsTerm = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
    var levelMapping2 = ["ansi", "ansi", "ansi256", "ansi16m"];
    var skipModels = /* @__PURE__ */ new Set(["gray"]);
    var styles3 = /* @__PURE__ */ Object.create(null);
    function applyOptions2(obj, options2) {
      options2 = options2 || {};
      const scLevel = stdoutColor2 ? stdoutColor2.level : 0;
      obj.level = options2.level === void 0 ? scLevel : options2.level;
      obj.enabled = "enabled" in options2 ? options2.enabled : obj.level > 0;
    }
    function Chalk(options2) {
      if (!this || !(this instanceof Chalk) || this.template) {
        const chalk2 = {};
        applyOptions2(chalk2, options2);
        chalk2.template = function() {
          const args = [].slice.call(arguments);
          return chalkTag.apply(null, [chalk2.template].concat(args));
        };
        Object.setPrototypeOf(chalk2, Chalk.prototype);
        Object.setPrototypeOf(chalk2.template, chalk2);
        chalk2.template.constructor = Chalk;
        return chalk2.template;
      }
      applyOptions2(this, options2);
    }
    if (isSimpleWindowsTerm) {
      ansiStyles2.blue.open = "\x1B[94m";
    }
    for (const key2 of Object.keys(ansiStyles2)) {
      ansiStyles2[key2].closeRe = new RegExp(escapeStringRegexp(ansiStyles2[key2].close), "g");
      styles3[key2] = {
        get() {
          const codes = ansiStyles2[key2];
          return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key2);
        }
      };
    }
    styles3.visible = {
      get() {
        return build.call(this, this._styles || [], true, "visible");
      }
    };
    ansiStyles2.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles2.color.close), "g");
    for (const model of Object.keys(ansiStyles2.color.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      styles3[model] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles2.color[levelMapping2[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles2.color.close,
              closeRe: ansiStyles2.color.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    ansiStyles2.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles2.bgColor.close), "g");
    for (const model of Object.keys(ansiStyles2.bgColor.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles3[bgModel] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles2.bgColor[levelMapping2[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles2.bgColor.close,
              closeRe: ansiStyles2.bgColor.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    var proto2 = Object.defineProperties(() => {
    }, styles3);
    function build(_styles, _empty, key2) {
      const builder = function() {
        return applyStyle2.apply(builder, arguments);
      };
      builder._styles = _styles;
      builder._empty = _empty;
      const self2 = this;
      Object.defineProperty(builder, "level", {
        enumerable: true,
        get() {
          return self2.level;
        },
        set(level) {
          self2.level = level;
        }
      });
      Object.defineProperty(builder, "enabled", {
        enumerable: true,
        get() {
          return self2.enabled;
        },
        set(enabled) {
          self2.enabled = enabled;
        }
      });
      builder.hasGrey = this.hasGrey || key2 === "gray" || key2 === "grey";
      builder.__proto__ = proto2;
      return builder;
    }
    function applyStyle2() {
      const args = arguments;
      const argsLen = args.length;
      let str = String(arguments[0]);
      if (argsLen === 0) {
        return "";
      }
      if (argsLen > 1) {
        for (let a = 1; a < argsLen; a++) {
          str += " " + args[a];
        }
      }
      if (!this.enabled || this.level <= 0 || !str) {
        return this._empty ? "" : str;
      }
      const originalDim = ansiStyles2.dim.open;
      if (isSimpleWindowsTerm && this.hasGrey) {
        ansiStyles2.dim.open = "";
      }
      for (const code of this._styles.slice().reverse()) {
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
      }
      ansiStyles2.dim.open = originalDim;
      return str;
    }
    function chalkTag(chalk2, strings2) {
      if (!Array.isArray(strings2)) {
        return [].slice.call(arguments, 1).join(" ");
      }
      const args = [].slice.call(arguments, 2);
      const parts = [strings2.raw[0]];
      for (let i = 1; i < strings2.length; i++) {
        parts.push(String(args[i - 1]).replace(/[{}\\]/g, "\\$&"));
        parts.push(String(strings2.raw[i]));
      }
      return template(chalk2, parts.join(""));
    }
    Object.defineProperties(Chalk.prototype, styles3);
    module.exports = Chalk();
    module.exports.supportsColor = stdoutColor2;
    module.exports.default = module.exports;
  }
});

// ../../node_modules/.pnpm/dayjs@1.11.5/node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "../../node_modules/.pnpm/dayjs@1.11.5/node_modules/dayjs/dayjs.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
    }(exports, function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", $3 = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, g = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, v = "en", D = {};
      D[v] = M;
      var p = function(t2) {
        return t2 instanceof _;
      }, S = function t2(e2, n2, r2) {
        var i2;
        if (!e2)
          return v;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (v = i2), i2 || !r2 && v;
      }, w = function(t2, e2) {
        if (p(t2))
          return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, O = g;
      O.l = S, O.i = p, O.w = function(t2, e2) {
        return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = S(t2.locale, null, true), this.parse(t2);
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2)
              return new Date(NaN);
            if (O.u(e2))
              return new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match(l);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.$x = t2.x || {}, this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return O;
        }, m2.isValid = function() {
          return !(this.$d.toString() === $3);
        }, m2.isSame = function(t2, e2) {
          var n2 = w(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return w(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < w(t2);
        }, m2.$g = function(t2, e2, n2) {
          return O.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), $4 = function(t3, e3) {
            var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, l2 = function(t3, e3) {
            return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y3 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
          switch (h2) {
            case c:
              return r2 ? $4(1, 0) : $4(31, 11);
            case f:
              return r2 ? $4(1, M3) : $4(0, M3 + 1);
            case o:
              var v2 = this.$locale().weekStart || 0, D2 = (y3 < v2 ? y3 + 7 : y3) - v2;
              return $4(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return l2(g2 + "Hours", 0);
            case u:
              return l2(g2 + "Minutes", 1);
            case s:
              return l2(g2 + "Seconds", 2);
            case i:
              return l2(g2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), $4 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], l2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === f || o2 === c) {
            var y3 = this.clone().set(d, 1);
            y3.$d[$4](l2), y3.init(), this.$d = y3.set(d, Math.min(this.$D, y3.daysInMonth())).$d;
          } else
            $4 && this.$d[$4](l2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[O.p(t2)]();
        }, m2.add = function(r2, h2) {
          var d2, $4 = this;
          r2 = Number(r2);
          var l2 = O.p(h2), y3 = function(t2) {
            var e2 = w($4);
            return O.w(e2.date(e2.date() + Math.round(t2 * r2)), $4);
          };
          if (l2 === f)
            return this.set(f, this.$M + r2);
          if (l2 === c)
            return this.set(c, this.$y + r2);
          if (l2 === a)
            return y3(1);
          if (l2 === o)
            return y3(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return O.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || $3;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, c2 = function(t3) {
            return O.s(s2 % 12 || 12, t3, "0");
          }, d2 = n2.meridiem || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
          return r2.replace(y2, function(t3, e3) {
            return e3 || l2[t3] || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, $4) {
          var l2, y3 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, v2 = O.m(this, M3);
          return v2 = (l2 = {}, l2[c] = v2 / 12, l2[f] = v2, l2[h] = v2 / 3, l2[o] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y3] || g2, $4 ? v2 : O.a(v2);
        }, m2.daysInMonth = function() {
          return this.endOf(f).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = S(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return O.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), T = _.prototype;
      return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
        T[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), w.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, w), t2.$i = true), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
        return w(1e3 * t2);
      }, w.en = D[v], w.Ls = D, w.p = {}, w;
    });
  }
});

// ../../node_modules/.pnpm/figures@2.0.0/node_modules/figures/index.js
var require_figures = __commonJS({
  "../../node_modules/.pnpm/figures@2.0.0/node_modules/figures/index.js"(exports, module) {
    "use strict";
    var escapeStringRegexp = require_escape_string_regexp();
    var platform = process.platform;
    var main = {
      tick: "\u2714",
      cross: "\u2716",
      star: "\u2605",
      square: "\u2587",
      squareSmall: "\u25FB",
      squareSmallFilled: "\u25FC",
      play: "\u25B6",
      circle: "\u25EF",
      circleFilled: "\u25C9",
      circleDotted: "\u25CC",
      circleDouble: "\u25CE",
      circleCircle: "\u24DE",
      circleCross: "\u24E7",
      circlePipe: "\u24BE",
      circleQuestionMark: "?\u20DD",
      bullet: "\u25CF",
      dot: "\u2024",
      line: "\u2500",
      ellipsis: "\u2026",
      pointer: "\u276F",
      pointerSmall: "\u203A",
      info: "\u2139",
      warning: "\u26A0",
      hamburger: "\u2630",
      smiley: "\u32E1",
      mustache: "\u0DF4",
      heart: "\u2665",
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      checkboxOn: "\u2612",
      checkboxOff: "\u2610",
      checkboxCircleOn: "\u24E7",
      checkboxCircleOff: "\u24BE",
      questionMarkPrefix: "?\u20DD",
      oneHalf: "\xBD",
      oneThird: "\u2153",
      oneQuarter: "\xBC",
      oneFifth: "\u2155",
      oneSixth: "\u2159",
      oneSeventh: "\u2150",
      oneEighth: "\u215B",
      oneNinth: "\u2151",
      oneTenth: "\u2152",
      twoThirds: "\u2154",
      twoFifths: "\u2156",
      threeQuarters: "\xBE",
      threeFifths: "\u2157",
      threeEighths: "\u215C",
      fourFifths: "\u2158",
      fiveSixths: "\u215A",
      fiveEighths: "\u215D",
      sevenEighths: "\u215E"
    };
    var win = {
      tick: "\u221A",
      cross: "\xD7",
      star: "*",
      square: "\u2588",
      squareSmall: "[ ]",
      squareSmallFilled: "[\u2588]",
      play: "\u25BA",
      circle: "( )",
      circleFilled: "(*)",
      circleDotted: "( )",
      circleDouble: "( )",
      circleCircle: "(\u25CB)",
      circleCross: "(\xD7)",
      circlePipe: "(\u2502)",
      circleQuestionMark: "(?)",
      bullet: "*",
      dot: ".",
      line: "\u2500",
      ellipsis: "...",
      pointer: ">",
      pointerSmall: "\xBB",
      info: "i",
      warning: "\u203C",
      hamburger: "\u2261",
      smiley: "\u263A",
      mustache: "\u250C\u2500\u2510",
      heart: main.heart,
      arrowUp: main.arrowUp,
      arrowDown: main.arrowDown,
      arrowLeft: main.arrowLeft,
      arrowRight: main.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      checkboxOn: "[\xD7]",
      checkboxOff: "[ ]",
      checkboxCircleOn: "(\xD7)",
      checkboxCircleOff: "( )",
      questionMarkPrefix: "\uFF1F",
      oneHalf: "1/2",
      oneThird: "1/3",
      oneQuarter: "1/4",
      oneFifth: "1/5",
      oneSixth: "1/6",
      oneSeventh: "1/7",
      oneEighth: "1/8",
      oneNinth: "1/9",
      oneTenth: "1/10",
      twoThirds: "2/3",
      twoFifths: "2/5",
      threeQuarters: "3/4",
      threeFifths: "3/5",
      threeEighths: "3/8",
      fourFifths: "4/5",
      fiveSixths: "5/6",
      fiveEighths: "5/8",
      sevenEighths: "7/8"
    };
    if (platform === "linux") {
      main.questionMarkPrefix = "?";
    }
    var figures = platform === "win32" ? win : main;
    var fn = (str) => {
      if (figures === main) {
        return str;
      }
      Object.keys(main).forEach((key2) => {
        if (main[key2] === figures[key2]) {
          return;
        }
        str = str.replace(new RegExp(escapeStringRegexp(main[key2]), "g"), figures[key2]);
      });
      return str;
    };
    module.exports = Object.assign(fn, figures);
  }
});

// ../../node_modules/.pnpm/path-exists@3.0.0/node_modules/path-exists/index.js
var require_path_exists = __commonJS({
  "../../node_modules/.pnpm/path-exists@3.0.0/node_modules/path-exists/index.js"(exports, module) {
    "use strict";
    var fs2 = __require("fs");
    module.exports = (fp) => new Promise((resolve) => {
      fs2.access(fp, (err2) => {
        resolve(!err2);
      });
    });
    module.exports.sync = (fp) => {
      try {
        fs2.accessSync(fp);
        return true;
      } catch (err2) {
        return false;
      }
    };
  }
});

// ../../node_modules/.pnpm/p-try@1.0.0/node_modules/p-try/index.js
var require_p_try = __commonJS({
  "../../node_modules/.pnpm/p-try@1.0.0/node_modules/p-try/index.js"(exports, module) {
    "use strict";
    module.exports = (cb) => new Promise((resolve) => {
      resolve(cb());
    });
  }
});

// ../../node_modules/.pnpm/p-limit@1.3.0/node_modules/p-limit/index.js
var require_p_limit = __commonJS({
  "../../node_modules/.pnpm/p-limit@1.3.0/node_modules/p-limit/index.js"(exports, module) {
    "use strict";
    var pTry = require_p_try();
    module.exports = (concurrency) => {
      if (concurrency < 1) {
        throw new TypeError("Expected `concurrency` to be a number from 1 and up");
      }
      const queue = [];
      let activeCount = 0;
      const next2 = () => {
        activeCount--;
        if (queue.length > 0) {
          queue.shift()();
        }
      };
      return (fn) => new Promise((resolve, reject) => {
        const run = () => {
          activeCount++;
          pTry(fn).then(
            (val2) => {
              resolve(val2);
              next2();
            },
            (err2) => {
              reject(err2);
              next2();
            }
          );
        };
        if (activeCount < concurrency) {
          run();
        } else {
          queue.push(run);
        }
      });
    };
  }
});

// ../../node_modules/.pnpm/p-locate@2.0.0/node_modules/p-locate/index.js
var require_p_locate = __commonJS({
  "../../node_modules/.pnpm/p-locate@2.0.0/node_modules/p-locate/index.js"(exports, module) {
    "use strict";
    var pLimit = require_p_limit();
    var EndError = class extends Error {
      constructor(value) {
        super();
        this.value = value;
      }
    };
    var finder = (el) => Promise.all(el).then((val2) => val2[1] === true && Promise.reject(new EndError(val2[0])));
    module.exports = (iterable, tester, opts) => {
      opts = Object.assign({
        concurrency: Infinity,
        preserveOrder: true
      }, opts);
      const limit = pLimit(opts.concurrency);
      const items = Array.from(iterable).map((el) => [el, limit(() => Promise.resolve(el).then(tester))]);
      const checkLimit = pLimit(opts.preserveOrder ? 1 : Infinity);
      return Promise.all(items.map((el) => checkLimit(() => finder(el)))).then(() => {
      }).catch((err2) => err2 instanceof EndError ? err2.value : Promise.reject(err2));
    };
  }
});

// ../../node_modules/.pnpm/locate-path@2.0.0/node_modules/locate-path/index.js
var require_locate_path = __commonJS({
  "../../node_modules/.pnpm/locate-path@2.0.0/node_modules/locate-path/index.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var pathExists = require_path_exists();
    var pLocate = require_p_locate();
    module.exports = (iterable, opts) => {
      opts = Object.assign({
        cwd: process.cwd()
      }, opts);
      return pLocate(iterable, (el) => pathExists(path.resolve(opts.cwd, el)), opts);
    };
    module.exports.sync = (iterable, opts) => {
      opts = Object.assign({
        cwd: process.cwd()
      }, opts);
      for (const el of iterable) {
        if (pathExists.sync(path.resolve(opts.cwd, el))) {
          return el;
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/find-up@2.1.0/node_modules/find-up/index.js
var require_find_up = __commonJS({
  "../../node_modules/.pnpm/find-up@2.1.0/node_modules/find-up/index.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var locatePath = require_locate_path();
    module.exports = (filename, opts) => {
      opts = opts || {};
      const startDir = path.resolve(opts.cwd || "");
      const root = path.parse(startDir).root;
      const filenames = [].concat(filename);
      return new Promise((resolve) => {
        (function find(dir) {
          locatePath(filenames, { cwd: dir }).then((file) => {
            if (file) {
              resolve(path.join(dir, file));
            } else if (dir === root) {
              resolve(null);
            } else {
              find(path.dirname(dir));
            }
          });
        })(startDir);
      });
    };
    module.exports.sync = (filename, opts) => {
      opts = opts || {};
      let dir = path.resolve(opts.cwd || "");
      const root = path.parse(dir).root;
      const filenames = [].concat(filename);
      while (true) {
        const file = locatePath.sync(filenames, { cwd: dir });
        if (file) {
          return path.join(dir, file);
        } else if (dir === root) {
          return null;
        }
        dir = path.dirname(dir);
      }
    };
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/polyfills.js"(exports, module) {
    var constants = __require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module.exports = patch;
    function patch(fs2) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs2);
      }
      if (!fs2.lutimes) {
        patchLutimes(fs2);
      }
      fs2.chown = chownFix(fs2.chown);
      fs2.fchown = chownFix(fs2.fchown);
      fs2.lchown = chownFix(fs2.lchown);
      fs2.chmod = chmodFix(fs2.chmod);
      fs2.fchmod = chmodFix(fs2.fchmod);
      fs2.lchmod = chmodFix(fs2.lchmod);
      fs2.chownSync = chownFixSync(fs2.chownSync);
      fs2.fchownSync = chownFixSync(fs2.fchownSync);
      fs2.lchownSync = chownFixSync(fs2.lchownSync);
      fs2.chmodSync = chmodFixSync(fs2.chmodSync);
      fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
      fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
      fs2.stat = statFix(fs2.stat);
      fs2.fstat = statFix(fs2.fstat);
      fs2.lstat = statFix(fs2.lstat);
      fs2.statSync = statFixSync(fs2.statSync);
      fs2.fstatSync = statFixSync(fs2.fstatSync);
      fs2.lstatSync = statFixSync(fs2.lstatSync);
      if (fs2.chmod && !fs2.lchmod) {
        fs2.lchmod = function(path, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs2.lchmodSync = function() {
        };
      }
      if (fs2.chown && !fs2.lchown) {
        fs2.lchown = function(path, uid2, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs2.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs2.rename = typeof fs2.rename !== "function" ? fs2.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff2 = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs2.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff2);
                if (backoff2 < 100)
                  backoff2 += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs2.rename);
      }
      fs2.read = typeof fs2.read !== "function" ? fs2.read : function(fs$read) {
        function read2(fd, buffer2, offset, length, position3, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs2, fd, buffer2, offset, length, position3, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs2, fd, buffer2, offset, length, position3, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read2, fs$read);
        return read2;
      }(fs2.read);
      fs2.readSync = typeof fs2.readSync !== "function" ? fs2.readSync : function(fs$readSync) {
        return function(fd, buffer2, offset, length, position3) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs2, fd, buffer2, offset, length, position3);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs2.readSync);
      function patchLchmod(fs3) {
        fs3.lchmod = function(path, mode, callback) {
          fs3.open(
            path,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err2, fd) {
              if (err2) {
                if (callback)
                  callback(err2);
                return;
              }
              fs3.fchmod(fd, mode, function(err3) {
                fs3.close(fd, function(err22) {
                  if (callback)
                    callback(err3 || err22);
                });
              });
            }
          );
        };
        fs3.lchmodSync = function(path, mode) {
          var fd = fs3.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs3.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs3.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs3.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs3) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs3.futimes) {
          fs3.lutimes = function(path, at, mt, cb) {
            fs3.open(path, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs3.futimes(fd, at, mt, function(er2) {
                fs3.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs3.lutimesSync = function(path, at, mt) {
            var fd = fs3.openSync(path, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs3.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs3.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs3.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs3.futimes) {
          fs3.lutimes = function(_a, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs3.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target2, mode, cb) {
          return orig.call(fs2, target2, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target2, mode) {
          try {
            return orig.call(fs2, target2, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target2, uid2, gid, cb) {
          return orig.call(fs2, target2, uid2, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target2, uid2, gid) {
          try {
            return orig.call(fs2, target2, uid2, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target2, options2, cb) {
          if (typeof options2 === "function") {
            cb = options2;
            options2 = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options2 ? orig.call(fs2, target2, options2, callback) : orig.call(fs2, target2, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target2, options2) {
          var stats = options2 ? orig.call(fs2, target2, options2) : orig.call(fs2, target2);
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/legacy-streams.js"(exports, module) {
    var Stream3 = __require("stream").Stream;
    module.exports = legacy;
    function legacy(fs2) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path, options2) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path, options2);
        Stream3.call(this);
        var self2 = this;
        this.path = path;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options2 = options2 || {};
        var keys = Object.keys(options2);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key2 = keys[index];
          this[key2] = options2[key2];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self2._read();
          });
          return;
        }
        fs2.open(this.path, this.flags, this.mode, function(err2, fd) {
          if (err2) {
            self2.emit("error", err2);
            self2.readable = false;
            return;
          }
          self2.fd = fd;
          self2.emit("open", fd);
          self2._read();
        });
      }
      function WriteStream(path, options2) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path, options2);
        Stream3.call(this);
        this.path = path;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options2 = options2 || {};
        var keys = Object.keys(options2);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key2 = keys[index];
          this[key2] = options2[key2];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs2.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/clone.js"(exports, module) {
    "use strict";
    module.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key2) {
        Object.defineProperty(copy, key2, Object.getOwnPropertyDescriptor(obj, key2));
      });
      return copy;
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/graceful-fs.js"(exports, module) {
    var fs2 = __require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util2 = __require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop3() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop3;
    if (util2.debuglog)
      debug = util2.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util2.format.apply(util2, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs2[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs2, queue);
      fs2.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs2, fd, function(err2) {
            if (!err2) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs2.close);
      fs2.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs2, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs2.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs2[gracefulQueue]);
          __require("assert").equal(fs2[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs2[gracefulQueue]);
    }
    module.exports = patch(clone(fs2));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs2.__patched) {
      module.exports = patch(fs2);
      fs2.__patched = true;
    }
    function patch(fs3) {
      polyfills(fs3);
      fs3.gracefulify = patch;
      fs3.createReadStream = createReadStream;
      fs3.createWriteStream = createWriteStream2;
      var fs$readFile = fs3.readFile;
      fs3.readFile = readFile;
      function readFile(path, options2, cb) {
        if (typeof options2 === "function")
          cb = options2, options2 = null;
        return go$readFile(path, options2, cb);
        function go$readFile(path2, options3, cb2, startTime) {
          return fs$readFile(path2, options3, function(err2) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([go$readFile, [path2, options3, cb2], err2, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs3.writeFile;
      fs3.writeFile = writeFile;
      function writeFile(path, data, options2, cb) {
        if (typeof options2 === "function")
          cb = options2, options2 = null;
        return go$writeFile(path, data, options2, cb);
        function go$writeFile(path2, data2, options3, cb2, startTime) {
          return fs$writeFile(path2, data2, options3, function(err2) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([go$writeFile, [path2, data2, options3, cb2], err2, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs3.appendFile;
      if (fs$appendFile)
        fs3.appendFile = appendFile;
      function appendFile(path, data, options2, cb) {
        if (typeof options2 === "function")
          cb = options2, options2 = null;
        return go$appendFile(path, data, options2, cb);
        function go$appendFile(path2, data2, options3, cb2, startTime) {
          return fs$appendFile(path2, data2, options3, function(err2) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([go$appendFile, [path2, data2, options3, cb2], err2, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs3.copyFile;
      if (fs$copyFile)
        fs3.copyFile = copyFile;
      function copyFile(src2, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src2, dest, flags, cb);
        function go$copyFile(src3, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src3, dest2, flags2, function(err2) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([go$copyFile, [src3, dest2, flags2, cb2], err2, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs3.readdir;
      fs3.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path, options2, cb) {
        if (typeof options2 === "function")
          cb = options2, options2 = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path2, options3, cb2, startTime) {
          return fs$readdir(path2, fs$readdirCallback(
            path2,
            options3,
            cb2,
            startTime
          ));
        } : function go$readdir2(path2, options3, cb2, startTime) {
          return fs$readdir(path2, options3, fs$readdirCallback(
            path2,
            options3,
            cb2,
            startTime
          ));
        };
        return go$readdir(path, options2, cb);
        function fs$readdirCallback(path2, options3, cb2, startTime) {
          return function(err2, files) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path2, options3, cb2],
                err2,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err2, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs3);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs3.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs3.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs3, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val2) {
          ReadStream = val2;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs3, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val2) {
          WriteStream = val2;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs3, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val2) {
          FileReadStream = val2;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs3, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val2) {
          FileWriteStream = val2;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path, options2) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err2, fd) {
          if (err2) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err2);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path, options2) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err2, fd) {
          if (err2) {
            that.destroy();
            that.emit("error", err2);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path, options2) {
        return new fs3.ReadStream(path, options2);
      }
      function createWriteStream2(path, options2) {
        return new fs3.WriteStream(path, options2);
      }
      var fs$open = fs3.open;
      fs3.open = open;
      function open(path, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path, flags, mode, cb);
        function go$open(path2, flags2, mode2, cb2, startTime) {
          return fs$open(path2, flags2, mode2, function(err2, fd) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([go$open, [path2, flags2, mode2, cb2], err2, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs3;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs2[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs2[gracefulQueue].length; ++i) {
        if (fs2[gracefulQueue][i].length > 2) {
          fs2[gracefulQueue][i][3] = now;
          fs2[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs2[gracefulQueue].length === 0)
        return;
      var elem = fs2[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err2 = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err2);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs2[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// ../../node_modules/.pnpm/strip-bom@3.0.0/node_modules/strip-bom/index.js
var require_strip_bom = __commonJS({
  "../../node_modules/.pnpm/strip-bom@3.0.0/node_modules/strip-bom/index.js"(exports, module) {
    "use strict";
    module.exports = (x) => {
      if (typeof x !== "string") {
        throw new TypeError("Expected a string, got " + typeof x);
      }
      if (x.charCodeAt(0) === 65279) {
        return x.slice(1);
      }
      return x;
    };
  }
});

// ../../node_modules/.pnpm/is-arrayish@0.2.1/node_modules/is-arrayish/index.js
var require_is_arrayish = __commonJS({
  "../../node_modules/.pnpm/is-arrayish@0.2.1/node_modules/is-arrayish/index.js"(exports, module) {
    "use strict";
    module.exports = function isArrayish(obj) {
      if (!obj) {
        return false;
      }
      return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && obj.splice instanceof Function;
    };
  }
});

// ../../node_modules/.pnpm/error-ex@1.3.2/node_modules/error-ex/index.js
var require_error_ex = __commonJS({
  "../../node_modules/.pnpm/error-ex@1.3.2/node_modules/error-ex/index.js"(exports, module) {
    "use strict";
    var util2 = __require("util");
    var isArrayish = require_is_arrayish();
    var errorEx = function errorEx2(name2, properties) {
      if (!name2 || name2.constructor !== String) {
        properties = name2 || {};
        name2 = Error.name;
      }
      var errorExError = function ErrorEXError(message) {
        if (!this) {
          return new ErrorEXError(message);
        }
        message = message instanceof Error ? message.message : message || this.message;
        Error.call(this, message);
        Error.captureStackTrace(this, errorExError);
        this.name = name2;
        Object.defineProperty(this, "message", {
          configurable: true,
          enumerable: false,
          get: function() {
            var newMessage = message.split(/\r?\n/g);
            for (var key2 in properties) {
              if (!properties.hasOwnProperty(key2)) {
                continue;
              }
              var modifier = properties[key2];
              if ("message" in modifier) {
                newMessage = modifier.message(this[key2], newMessage) || newMessage;
                if (!isArrayish(newMessage)) {
                  newMessage = [newMessage];
                }
              }
            }
            return newMessage.join("\n");
          },
          set: function(v) {
            message = v;
          }
        });
        var overwrittenStack = null;
        var stackDescriptor = Object.getOwnPropertyDescriptor(this, "stack");
        var stackGetter = stackDescriptor.get;
        var stackValue = stackDescriptor.value;
        delete stackDescriptor.value;
        delete stackDescriptor.writable;
        stackDescriptor.set = function(newstack) {
          overwrittenStack = newstack;
        };
        stackDescriptor.get = function() {
          var stack = (overwrittenStack || (stackGetter ? stackGetter.call(this) : stackValue)).split(/\r?\n+/g);
          if (!overwrittenStack) {
            stack[0] = this.name + ": " + this.message;
          }
          var lineCount = 1;
          for (var key2 in properties) {
            if (!properties.hasOwnProperty(key2)) {
              continue;
            }
            var modifier = properties[key2];
            if ("line" in modifier) {
              var line = modifier.line(this[key2]);
              if (line) {
                stack.splice(lineCount++, 0, "    " + line);
              }
            }
            if ("stack" in modifier) {
              modifier.stack(this[key2], stack);
            }
          }
          return stack.join("\n");
        };
        Object.defineProperty(this, "stack", stackDescriptor);
      };
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(errorExError.prototype, Error.prototype);
        Object.setPrototypeOf(errorExError, Error);
      } else {
        util2.inherits(errorExError, Error);
      }
      return errorExError;
    };
    errorEx.append = function(str, def) {
      return {
        message: function(v, message) {
          v = v || def;
          if (v) {
            message[0] += " " + str.replace("%s", v.toString());
          }
          return message;
        }
      };
    };
    errorEx.line = function(str, def) {
      return {
        line: function(v) {
          v = v || def;
          if (v) {
            return str.replace("%s", v.toString());
          }
          return null;
        }
      };
    };
    module.exports = errorEx;
  }
});

// ../../node_modules/.pnpm/json-parse-better-errors@1.0.2/node_modules/json-parse-better-errors/index.js
var require_json_parse_better_errors = __commonJS({
  "../../node_modules/.pnpm/json-parse-better-errors@1.0.2/node_modules/json-parse-better-errors/index.js"(exports, module) {
    "use strict";
    module.exports = parseJson;
    function parseJson(txt, reviver, context) {
      context = context || 20;
      try {
        return JSON.parse(txt, reviver);
      } catch (e) {
        if (typeof txt !== "string") {
          const isEmptyArray = Array.isArray(txt) && txt.length === 0;
          const errorMessage = "Cannot parse " + (isEmptyArray ? "an empty array" : String(txt));
          throw new TypeError(errorMessage);
        }
        const syntaxErr = e.message.match(/^Unexpected token.*position\s+(\d+)/i);
        const errIdx = syntaxErr ? +syntaxErr[1] : e.message.match(/^Unexpected end of JSON.*/i) ? txt.length - 1 : null;
        if (errIdx != null) {
          const start = errIdx <= context ? 0 : errIdx - context;
          const end = errIdx + context >= txt.length ? txt.length : errIdx + context;
          e.message += ` while parsing near '${start === 0 ? "" : "..."}${txt.slice(start, end)}${end === txt.length ? "" : "..."}'`;
        } else {
          e.message += ` while parsing '${txt.slice(0, context * 2)}'`;
        }
        throw e;
      }
    }
  }
});

// ../../node_modules/.pnpm/parse-json@4.0.0/node_modules/parse-json/index.js
var require_parse_json = __commonJS({
  "../../node_modules/.pnpm/parse-json@4.0.0/node_modules/parse-json/index.js"(exports, module) {
    "use strict";
    var errorEx = require_error_ex();
    var fallback = require_json_parse_better_errors();
    var JSONError = errorEx("JSONError", {
      fileName: errorEx.append("in %s")
    });
    module.exports = (input, reviver, filename) => {
      if (typeof reviver === "string") {
        filename = reviver;
        reviver = null;
      }
      try {
        try {
          return JSON.parse(input, reviver);
        } catch (err2) {
          fallback(input, reviver);
          throw err2;
        }
      } catch (err2) {
        err2.message = err2.message.replace(/\n/g, "");
        const jsonErr = new JSONError(err2);
        if (filename) {
          jsonErr.fileName = filename;
        }
        throw jsonErr;
      }
    };
  }
});

// ../../node_modules/.pnpm/pify@3.0.0/node_modules/pify/index.js
var require_pify = __commonJS({
  "../../node_modules/.pnpm/pify@3.0.0/node_modules/pify/index.js"(exports, module) {
    "use strict";
    var processFn = (fn, opts) => function() {
      const P = opts.promiseModule;
      const args = new Array(arguments.length);
      for (let i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      return new P((resolve, reject) => {
        if (opts.errorFirst) {
          args.push(function(err2, result) {
            if (opts.multiArgs) {
              const results = new Array(arguments.length - 1);
              for (let i = 1; i < arguments.length; i++) {
                results[i - 1] = arguments[i];
              }
              if (err2) {
                results.unshift(err2);
                reject(results);
              } else {
                resolve(results);
              }
            } else if (err2) {
              reject(err2);
            } else {
              resolve(result);
            }
          });
        } else {
          args.push(function(result) {
            if (opts.multiArgs) {
              const results = new Array(arguments.length - 1);
              for (let i = 0; i < arguments.length; i++) {
                results[i] = arguments[i];
              }
              resolve(results);
            } else {
              resolve(result);
            }
          });
        }
        fn.apply(this, args);
      });
    };
    module.exports = (obj, opts) => {
      opts = Object.assign({
        exclude: [/.+(Sync|Stream)$/],
        errorFirst: true,
        promiseModule: Promise
      }, opts);
      const filter = (key2) => {
        const match = (pattern) => typeof pattern === "string" ? key2 === pattern : pattern.test(key2);
        return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
      };
      let ret;
      if (typeof obj === "function") {
        ret = function() {
          if (opts.excludeMain) {
            return obj.apply(this, arguments);
          }
          return processFn(obj, opts).apply(this, arguments);
        };
      } else {
        ret = Object.create(Object.getPrototypeOf(obj));
      }
      for (const key2 in obj) {
        const x = obj[key2];
        ret[key2] = typeof x === "function" && filter(key2) ? processFn(x, opts) : x;
      }
      return ret;
    };
  }
});

// ../../node_modules/.pnpm/load-json-file@4.0.0/node_modules/load-json-file/index.js
var require_load_json_file = __commonJS({
  "../../node_modules/.pnpm/load-json-file@4.0.0/node_modules/load-json-file/index.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var fs2 = require_graceful_fs();
    var stripBom = require_strip_bom();
    var parseJson = require_parse_json();
    var pify = require_pify();
    var parse2 = (data, fp) => parseJson(stripBom(data), path.relative(".", fp));
    module.exports = (fp) => pify(fs2.readFile)(fp, "utf8").then((data) => parse2(data, fp));
    module.exports.sync = (fp) => parse2(fs2.readFileSync(fp, "utf8"), fp);
  }
});

// ../../node_modules/.pnpm/pkg-conf@2.1.0/node_modules/pkg-conf/index.js
var require_pkg_conf = __commonJS({
  "../../node_modules/.pnpm/pkg-conf@2.1.0/node_modules/pkg-conf/index.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var findUp = require_find_up();
    var loadJsonFile = require_load_json_file();
    var filepaths = /* @__PURE__ */ new WeakMap();
    var filepath = (conf) => filepaths.get(conf);
    var findNextCwd = (pkgPath) => path.resolve(path.dirname(pkgPath), "..");
    var addFp = (obj, fp) => {
      filepaths.set(obj, fp);
      return obj;
    };
    var pkgConf = (namespace, opts) => {
      if (!namespace) {
        return Promise.reject(new TypeError("Expected a namespace"));
      }
      opts = opts || {};
      return findUp("package.json", opts.cwd ? { cwd: opts.cwd } : {}).then((fp) => {
        if (!fp) {
          return addFp(Object.assign({}, opts.defaults), fp);
        }
        return loadJsonFile(fp).then((pkg) => {
          if (opts.skipOnFalse && pkg[namespace] === false) {
            const newOpts = Object.assign({}, opts, { cwd: findNextCwd(fp) });
            return pkgConf(namespace, newOpts);
          }
          return addFp(Object.assign({}, opts.defaults, pkg[namespace]), fp);
        });
      });
    };
    var sync = (namespace, opts) => {
      if (!namespace) {
        throw new TypeError("Expected a namespace");
      }
      opts = opts || {};
      const fp = findUp.sync("package.json", opts.cwd ? { cwd: opts.cwd } : {});
      if (!fp) {
        return addFp(Object.assign({}, opts.defaults), fp);
      }
      const pkg = loadJsonFile.sync(fp);
      if (opts.skipOnFalse && pkg[namespace] === false) {
        const newOpts = Object.assign({}, opts, { cwd: findNextCwd(fp) });
        return sync(namespace, newOpts);
      }
      return addFp(Object.assign({}, opts.defaults, pkg[namespace]), fp);
    };
    module.exports = pkgConf;
    module.exports.filepath = filepath;
    module.exports.sync = sync;
  }
});

// ../../node_modules/.pnpm/@rmw+signale@1.4.6/node_modules/@rmw/signale/package.json
var require_package2 = __commonJS({
  "../../node_modules/.pnpm/@rmw+signale@1.4.6/node_modules/@rmw/signale/package.json"(exports, module) {
    module.exports = {
      name: "@rmw/signale",
      version: "1.4.6",
      description: "Highly configurable logging utility",
      license: "MIT",
      repository: "rmw-lib/signale",
      author: {
        name: "Klaus Sinani",
        email: "klaussinani@gmail.com",
        url: "https://klaussinani.github.io"
      },
      maintainers: [
        {
          name: "Mario Sinani",
          email: "mariosinani@protonmail.ch",
          url: "https://mariocfhq.github.io"
        }
      ],
      engines: {
        node: ">=6"
      },
      files: [
        "src",
        "types",
        "index.js"
      ],
      types: "./types/signale.d.ts",
      keywords: [
        "log",
        "cli",
        "logger",
        "logging",
        "hackable",
        "colorful",
        "console"
      ],
      scripts: {
        lint: "xo",
        "test:ts": "tsc --noEmit -p test",
        test: "npm run lint && npm run test:ts"
      },
      dependencies: {
        chalk: "^2.3.2",
        dayjs: "^1.8.35",
        figures: "^2.0.0",
        "moment-timezone": "^0.5.31",
        "pkg-conf": "^2.1.0"
      },
      devDependencies: {
        "@types/node": "^11.11.3",
        typescript: "^3.3.3333",
        xo: "^0.24.0"
      },
      options: {
        default: {
          displayScope: true,
          displayBadge: true,
          displayDate: false,
          displayFilename: false,
          displayLine: true,
          displayLabel: true,
          displayTimestamp: false,
          underlineLabel: true,
          underlineMessage: false,
          underlinePrefix: false,
          underlineSuffix: false,
          uppercaseLabel: false,
          timeZone: "",
          formatDate: "YYYY-MM-DD",
          formatTime: "HH:mm:ss a"
        }
      },
      xo: {
        space: 2
      }
    };
  }
});

// ../../node_modules/.pnpm/@rmw+signale@1.4.6/node_modules/@rmw/signale/src/types.js
var require_types = __commonJS({
  "../../node_modules/.pnpm/@rmw+signale@1.4.6/node_modules/@rmw/signale/src/types.js"(exports, module) {
    "use strict";
    var figures = require_figures();
    module.exports = {
      error: {
        badge: figures.cross,
        color: "red",
        label: "",
        logLevel: "error"
      },
      fatal: {
        badge: "\u274C",
        color: "red",
        label: "fatal",
        logLevel: "error"
      },
      fav: {
        badge: figures("\u2764"),
        color: "magenta",
        label: "favorite",
        logLevel: "info"
      },
      info: {
        badge: figures.info,
        color: "blue",
        label: "info",
        logLevel: "info"
      },
      star: {
        badge: figures.star,
        color: "yellow",
        label: "star",
        logLevel: "info"
      },
      success: {
        badge: figures.tick,
        color: "green",
        label: "success",
        logLevel: "info"
      },
      wait: {
        badge: figures.ellipsis,
        color: "blue",
        label: "waiting",
        logLevel: "info"
      },
      warn: {
        badge: figures.warning,
        color: "yellow",
        label: "warning",
        logLevel: "warn"
      },
      complete: {
        badge: figures.checkboxOn,
        color: "cyan",
        label: "complete",
        logLevel: "info"
      },
      pending: {
        badge: figures.checkboxOff,
        color: "magenta",
        label: "pending",
        logLevel: "info"
      },
      note: {
        badge: figures.bullet,
        color: "blue",
        label: "note",
        logLevel: "info"
      },
      start: {
        badge: figures.play,
        color: "green",
        label: "start",
        logLevel: "info"
      },
      pause: {
        badge: figures.squareSmallFilled,
        color: "yellow",
        label: "pause",
        logLevel: "info"
      },
      debug: {
        badge: figures("\u2B24"),
        color: "red",
        label: "debug",
        logLevel: "debug"
      },
      await: {
        badge: figures.ellipsis,
        color: "blue",
        label: "awaiting",
        logLevel: "info"
      },
      watch: {
        badge: figures.ellipsis,
        color: "yellow",
        label: "watching",
        logLevel: "info"
      },
      log: {
        badge: "",
        color: "",
        label: "",
        logLevel: "info"
      }
    };
  }
});

// ../../node_modules/.pnpm/@rmw+signale@1.4.6/node_modules/@rmw/signale/src/signale.js
var require_signale = __commonJS({
  "../../node_modules/.pnpm/@rmw+signale@1.4.6/node_modules/@rmw/signale/src/signale.js"(exports, module) {
    "use strict";
    var util2 = __require("util");
    var path = __require("path");
    var readline = __require("readline");
    var chalk2 = require_chalk();
    var moment = require_dayjs_min();
    var figures = require_figures();
    var pkgConf = require_pkg_conf();
    var pkg = require_package2();
    var defaultTypes = require_types();
    var { green, grey, red: red2, underline, yellow } = chalk2;
    var isPreviousLogInteractive = false;
    var defaults2 = pkg.options.default;
    var namespace = pkg.name;
    var Signale2 = class {
      constructor(options2 = {}) {
        this._interactive = options2.interactive || false;
        this._config = Object.assign(this.packageConfiguration, options2.config);
        this._customTypes = Object.assign({}, options2.types);
        this._disabled = options2.disabled || false;
        this._scopeName = options2.scope || "";
        this._timers = options2.timers || /* @__PURE__ */ new Map();
        this._types = this._mergeTypes(defaultTypes, this._customTypes);
        this._stream = options2.stream || process.stdout;
        this._longestLabel = this._getLongestLabel();
        this._secrets = options2.secrets || [];
        this._generalLogLevel = this._validateLogLevel(options2.logLevel);
        Object.keys(this._types).forEach((type) => {
          this[type] = this._logger.bind(this, type);
        });
      }
      get _now() {
        return Date.now();
      }
      get scopeName() {
        return this._scopeName;
      }
      get currentOptions() {
        return Object.assign(
          {},
          {
            config: this._config,
            disabled: this._disabled,
            types: this._customTypes,
            interactive: this._interactive,
            timers: this._timers,
            stream: this._stream,
            secrets: this._secrets,
            logLevel: this._generalLogLevel
          }
        );
      }
      get date() {
        return moment().format(this._config.formatDate);
      }
      get filename() {
        const _ = Error.prepareStackTrace;
        Error.prepareStackTrace = (error, stack2) => stack2;
        const { stack } = new Error();
        Error.prepareStackTrace = _;
        const callers = stack.map((x) => x.getFileName());
        var firstExternalFilePath = callers.find((x) => {
          return x !== callers[0];
        });
        if (firstExternalFilePath) {
          firstExternalFilePath = firstExternalFilePath.split("/");
          firstExternalFilePath = firstExternalFilePath.slice(-3).join("/");
        }
        return firstExternalFilePath ? decodeURI(firstExternalFilePath) : "anonymous";
      }
      get fileLine() {
        const _ = Error.prepareStackTrace;
        Error.prepareStackTrace = (error, stack2) => stack2;
        const { stack } = new Error();
        Error.prepareStackTrace = _;
        const callers = stack.map((x) => x.getFileName());
        const callersAndLines = stack.map((x) => {
          return {
            name: x.getFileName(),
            line: x.getLineNumber()
          };
        });
        const firstExternalFileLine = callersAndLines.find((x) => {
          return x.name !== callers[0];
        });
        return firstExternalFileLine ? firstExternalFileLine.line : "";
      }
      get packageConfiguration() {
        return pkgConf.sync(namespace, { defaults: defaults2 });
      }
      get _longestUnderlinedLabel() {
        return underline(this._longestLabel);
      }
      get _logLevels() {
        return {
          info: 0,
          timer: 1,
          debug: 2,
          warn: 3,
          error: 4
        };
      }
      set configuration(configObj) {
        this._config = Object.assign(this.packageConfiguration, configObj);
      }
      _arrayify(x) {
        return Array.isArray(x) ? x : [x];
      }
      _timeSpan(then) {
        return this._now - then;
      }
      _getLongestLabel() {
        const { _types } = this;
        const labels = Object.keys(_types).map((x) => _types[x].label);
        return labels.reduce((x, y2) => x.length > y2.length ? x : y2);
      }
      _validateLogLevel(level) {
        return Object.keys(this._logLevels).includes(level) ? level : "info";
      }
      _mergeTypes(standard, custom) {
        const types3 = Object.assign({}, standard);
        Object.keys(custom).forEach((type) => {
          types3[type] = Object.assign({}, types3[type], custom[type]);
        });
        return types3;
      }
      _filterSecrets(message) {
        const { _secrets } = this;
        if (_secrets.length === 0) {
          return message;
        }
        let safeMessage = message;
        _secrets.forEach((secret) => {
          safeMessage = safeMessage.replace(new RegExp(secret, "g"), "[secure]");
        });
        return safeMessage;
      }
      _formatStream(stream) {
        return this._arrayify(stream);
      }
      _formatDate() {
        return `${this.date}`;
      }
      _formatFilename(displayLine) {
        return `${this.filename}${displayLine ? `:${this.fileLine}` : ""}`;
      }
      _formatScopeName() {
        if (Array.isArray(this._scopeName)) {
          const scopes = this._scopeName.filter((x) => x.length !== 0);
          return `${scopes.map((x) => `[${x.trim()}]`).join(" ")}`;
        }
        return `[${this._scopeName}]`;
      }
      _formatTimestamp() {
        return `[${this.timestamp}]`;
      }
      _formatMessage(str) {
        return util2.format(...this._arrayify(str));
      }
      _meta() {
        const meta = [];
        if (this._config.displayDate) {
          meta.push(this._formatDate());
        }
        if (this._config.displayTimestamp) {
          meta.push(this._formatTimestamp());
        }
        if (this._config.displayFilename) {
          meta.push(this._formatFilename(this._config.displayLine));
        }
        if (this._scopeName.length !== 0 && this._config.displayScope) {
          meta.push(this._formatScopeName());
        }
        if (meta.length !== 0) {
          meta.push(`${figures.pointerSmall}`);
          return meta.map((item) => grey(item));
        }
        return meta;
      }
      _hasAdditional({ suffix, prefix }, args) {
        return suffix || prefix ? "" : this._formatMessage(args);
      }
      _buildSignale(type, ...args) {
        let [msg, additional] = [{}, {}];
        if (args.length === 1 && typeof args[0] === "object" && args[0] !== null) {
          if (args[0] instanceof Error) {
            [msg] = args;
          } else {
            const [{ prefix, message, suffix }] = args;
            additional = Object.assign({}, { suffix, prefix });
            msg = message ? this._formatMessage(message) : this._hasAdditional(additional, args);
          }
        } else {
          msg = this._formatMessage(args);
        }
        const signale2 = this._meta();
        if (additional.prefix) {
          if (this._config.underlinePrefix) {
            signale2.push(underline(additional.prefix));
          } else {
            signale2.push(additional.prefix);
          }
        }
        if (this._config.displayBadge && type.badge) {
          signale2.push(
            chalk2[type.color](this._padEnd(type.badge, type.badge.length + 1))
          );
        }
        if (this._config.displayLabel && type.label) {
          const label = this._config.uppercaseLabel ? type.label.toUpperCase() : type.label;
          if (this._config.underlineLabel) {
            signale2.push(
              chalk2[type.color](
                this._padEnd(
                  underline(label),
                  this._longestUnderlinedLabel.length + 1
                )
              )
            );
          } else {
            signale2.push(
              chalk2[type.color](this._padEnd(label, this._longestLabel.length + 1))
            );
          }
        }
        if (msg instanceof Error && msg.stack) {
          const [name2, ...rest] = msg.stack.split("\n");
          if (this._config.underlineMessage) {
            signale2.push(underline(name2));
          } else {
            signale2.push(name2);
          }
          signale2.push(grey(rest.map((l) => l.replace(/^/, "\n")).join("")));
          return signale2.join(" ");
        }
        if (this._config.underlineMessage) {
          signale2.push(underline(msg));
        } else {
          signale2.push(msg);
        }
        if (additional.suffix) {
          if (this._config.underlineSuffix) {
            signale2.push(underline(additional.suffix));
          } else {
            signale2.push(additional.suffix);
          }
        }
        return signale2.join(" ");
      }
      _write(stream, message) {
        if (this._interactive && stream.isTTY && isPreviousLogInteractive) {
          readline.moveCursor(stream, 0, -1);
          readline.clearLine(stream);
          readline.cursorTo(stream, 0);
        }
        stream.write(message + "\n");
        isPreviousLogInteractive = this._interactive;
      }
      _log(message, streams = this._stream, logLevel) {
        if (this.isEnabled() && this._logLevels[logLevel] >= this._logLevels[this._generalLogLevel]) {
          this._formatStream(streams).forEach((stream) => {
            this._write(stream, message);
          });
        }
      }
      _logger(type, ...messageObj) {
        const { stream, logLevel } = this._types[type];
        const message = this._buildSignale(this._types[type], ...messageObj);
        this._log(
          this._filterSecrets(message),
          stream,
          this._validateLogLevel(logLevel)
        );
      }
      _padEnd(str, targetLength) {
        str = String(str);
        targetLength = parseInt(targetLength, 10) || 0;
        if (str.length >= targetLength) {
          return str;
        }
        if (String.prototype.padEnd) {
          return str.padEnd(targetLength);
        }
        targetLength -= str.length;
        return str + " ".repeat(targetLength);
      }
      addSecrets(secrets) {
        if (!Array.isArray(secrets)) {
          throw new TypeError("Argument must be an array.");
        }
        this._secrets.push(...secrets);
      }
      clearSecrets() {
        this._secrets = [];
      }
      config(configObj) {
        this.configuration = configObj;
      }
      disable() {
        this._disabled = true;
      }
      enable() {
        this._disabled = false;
      }
      isEnabled() {
        return !this._disabled;
      }
      scope(...name2) {
        if (name2.length === 0) {
          throw new Error("No scope name was defined.");
        }
        return new Signale2(Object.assign(this.currentOptions, { scope: name2 }));
      }
      unscope() {
        this._scopeName = "";
      }
      time(label) {
        if (!label) {
          label = `timer_${this._timers.size}`;
        }
        this._timers.set(label, this._now);
        const message = this._meta();
        message.push(green(this._padEnd(this._types.start.badge, 2)));
        if (this._config.underlineLabel) {
          message.push(
            green(
              this._padEnd(
                underline(label),
                this._longestUnderlinedLabel.length + 1
              )
            )
          );
        } else {
          message.push(green(this._padEnd(label, this._longestLabel.length + 1)));
        }
        message.push("Initialized timer...");
        this._log(message.join(" "), this._stream, "timer");
        return label;
      }
      timeEnd(label) {
        if (!label && this._timers.size) {
          const is = (x) => x.includes("timer_");
          label = [...this._timers.keys()].reduceRight((x, y2) => {
            return is(x) ? x : is(y2) ? y2 : null;
          });
        }
        if (this._timers.has(label)) {
          const span = this._timeSpan(this._timers.get(label));
          this._timers.delete(label);
          const message = this._meta();
          message.push(red2(this._padEnd(this._types.pause.badge, 2)));
          if (this._config.underlineLabel) {
            message.push(
              red2(
                this._padEnd(
                  underline(label),
                  this._longestUnderlinedLabel.length + 1
                )
              )
            );
          } else {
            message.push(red2(this._padEnd(label, this._longestLabel.length + 1)));
          }
          message.push("Timer run for:");
          message.push(
            yellow(span < 1e3 ? span + "ms" : (span / 1e3).toFixed(2) + "s")
          );
          this._log(message.join(" "), this._stream, "timer");
          return { label, span };
        }
      }
    };
    module.exports = Signale2;
  }
});

// ../../node_modules/.pnpm/@rmw+signale@1.4.6/node_modules/@rmw/signale/index.js
var require_signale2 = __commonJS({
  "../../node_modules/.pnpm/@rmw+signale@1.4.6/node_modules/@rmw/signale/index.js"(exports, module) {
    "use strict";
    var Signale2 = require_signale();
    module.exports = Object.assign(new Signale2(), { Signale: Signale2 });
  }
});

// ../../node_modules/.pnpm/msgpackr@1.7.2/node_modules/msgpackr/unpack.js
var decoder;
try {
  decoder = new TextDecoder();
} catch (error) {
}
var src;
var srcEnd;
var position = 0;
var EMPTY_ARRAY = [];
var strings = EMPTY_ARRAY;
var stringPosition = 0;
var currentUnpackr = {};
var currentStructures;
var srcString;
var srcStringStart = 0;
var srcStringEnd = 0;
var bundledStrings;
var referenceMap;
var currentExtensions = [];
var dataView;
var defaultOptions = {
  useRecords: false,
  mapsAsObjects: true
};
var C1Type = class {
};
var C1 = new C1Type();
C1.name = "MessagePack 0xC1";
var sequentialMode = false;
var inlineObjectReadThreshold = 2;
var readStruct;
var onLoadedStructures;
var onSaveState;
try {
  new Function("");
} catch (error) {
  inlineObjectReadThreshold = Infinity;
}
var Unpackr = class {
  constructor(options2) {
    if (options2) {
      if (options2.useRecords === false && options2.mapsAsObjects === void 0)
        options2.mapsAsObjects = true;
      if (options2.sequential && options2.trusted !== false) {
        options2.trusted = true;
        if (!options2.structures && options2.useRecords != false) {
          options2.structures = [];
          if (!options2.maxSharedStructures)
            options2.maxSharedStructures = 0;
        }
      }
      if (options2.structures)
        options2.structures.sharedLength = options2.structures.length;
      else if (options2.getStructures) {
        (options2.structures = []).uninitialized = true;
        options2.structures.sharedLength = 0;
      }
    }
    Object.assign(this, options2);
  }
  unpack(source, options2) {
    if (src) {
      return saveState(() => {
        clearSource();
        return this ? this.unpack(source, options2) : Unpackr.prototype.unpack.call(defaultOptions, source, options2);
      });
    }
    if (typeof options2 === "object") {
      srcEnd = options2.end || source.length;
      position = options2.start || 0;
    } else {
      position = 0;
      srcEnd = options2 > -1 ? options2 : source.length;
    }
    stringPosition = 0;
    srcStringEnd = 0;
    srcString = null;
    strings = EMPTY_ARRAY;
    bundledStrings = null;
    src = source;
    try {
      dataView = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength));
    } catch (error) {
      src = null;
      if (source instanceof Uint8Array)
        throw error;
      throw new Error("Source must be a Uint8Array or Buffer but was a " + (source && typeof source == "object" ? source.constructor.name : typeof source));
    }
    if (this instanceof Unpackr) {
      currentUnpackr = this;
      if (this.structures) {
        currentStructures = this.structures;
        return checkedRead(options2);
      } else if (!currentStructures || currentStructures.length > 0) {
        currentStructures = [];
      }
    } else {
      currentUnpackr = defaultOptions;
      if (!currentStructures || currentStructures.length > 0)
        currentStructures = [];
    }
    return checkedRead(options2);
  }
  unpackMultiple(source, forEach) {
    let values2, lastPosition = 0;
    try {
      sequentialMode = true;
      let size2 = source.length;
      let value = this ? this.unpack(source, size2) : defaultUnpackr.unpack(source, size2);
      if (forEach) {
        forEach(value);
        while (position < size2) {
          lastPosition = position;
          if (forEach(checkedRead()) === false) {
            return;
          }
        }
      } else {
        values2 = [value];
        while (position < size2) {
          lastPosition = position;
          values2.push(checkedRead());
        }
        return values2;
      }
    } catch (error) {
      error.lastPosition = lastPosition;
      error.values = values2;
      throw error;
    } finally {
      sequentialMode = false;
      clearSource();
    }
  }
  _mergeStructures(loadedStructures, existingStructures) {
    if (onLoadedStructures)
      loadedStructures = onLoadedStructures.call(this, loadedStructures);
    loadedStructures = loadedStructures || [];
    if (Object.isFrozen(loadedStructures))
      loadedStructures = loadedStructures.map((structure) => structure.slice(0));
    for (let i = 0, l = loadedStructures.length; i < l; i++) {
      let structure = loadedStructures[i];
      if (structure) {
        structure.isShared = true;
        if (i >= 32)
          structure.highByte = i - 32 >> 5;
      }
    }
    loadedStructures.sharedLength = loadedStructures.length;
    for (let id in existingStructures || []) {
      if (id >= 0) {
        let structure = loadedStructures[id];
        let existing = existingStructures[id];
        if (existing) {
          if (structure)
            (loadedStructures.restoreStructures || (loadedStructures.restoreStructures = []))[id] = structure;
          loadedStructures[id] = existing;
        }
      }
    }
    return this.structures = loadedStructures;
  }
  decode(source, end) {
    return this.unpack(source, end);
  }
};
function checkedRead(options2) {
  try {
    if (!currentUnpackr.trusted && !sequentialMode) {
      let sharedLength = currentStructures.sharedLength || 0;
      if (sharedLength < currentStructures.length)
        currentStructures.length = sharedLength;
    }
    let result;
    if (currentUnpackr.randomAccessStructure && src[position] < 64 && src[position] >= 32 && readStruct) {
      result = readStruct(src, position, srcEnd, currentUnpackr);
      src = null;
      if (!(options2 && options2.lazy) && result)
        result = result.toJSON();
      position = srcEnd;
    } else
      result = read();
    if (bundledStrings)
      position = bundledStrings.postBundlePosition;
    if (position == srcEnd) {
      if (currentStructures && currentStructures.restoreStructures)
        restoreStructures();
      currentStructures = null;
      src = null;
      if (referenceMap)
        referenceMap = null;
    } else if (position > srcEnd) {
      throw new Error("Unexpected end of MessagePack data");
    } else if (!sequentialMode) {
      throw new Error("Data read, but end of buffer not reached " + JSON.stringify(result).slice(0, 100));
    }
    return result;
  } catch (error) {
    if (currentStructures && currentStructures.restoreStructures)
      restoreStructures();
    clearSource();
    if (error instanceof RangeError || error.message.startsWith("Unexpected end of buffer") || position > srcEnd) {
      error.incomplete = true;
    }
    throw error;
  }
}
function restoreStructures() {
  for (let id in currentStructures.restoreStructures) {
    currentStructures[id] = currentStructures.restoreStructures[id];
  }
  currentStructures.restoreStructures = null;
}
function read() {
  let token = src[position++];
  if (token < 160) {
    if (token < 128) {
      if (token < 64)
        return token;
      else {
        let structure = currentStructures[token & 63] || currentUnpackr.getStructures && loadStructures()[token & 63];
        if (structure) {
          if (!structure.read) {
            structure.read = createStructureReader(structure, token & 63);
          }
          return structure.read();
        } else
          return token;
      }
    } else if (token < 144) {
      token -= 128;
      if (currentUnpackr.mapsAsObjects) {
        let object = {};
        for (let i = 0; i < token; i++) {
          let key2 = readKey();
          if (key2 === "__proto__")
            key2 = "__proto_";
          object[key2] = read();
        }
        return object;
      } else {
        let map = /* @__PURE__ */ new Map();
        for (let i = 0; i < token; i++) {
          map.set(read(), read());
        }
        return map;
      }
    } else {
      token -= 144;
      let array = new Array(token);
      for (let i = 0; i < token; i++) {
        array[i] = read();
      }
      if (currentUnpackr.freezeData)
        return Object.freeze(array);
      return array;
    }
  } else if (token < 192) {
    let length = token - 160;
    if (srcStringEnd >= position) {
      return srcString.slice(position - srcStringStart, (position += length) - srcStringStart);
    }
    if (srcStringEnd == 0 && srcEnd < 140) {
      let string = length < 16 ? shortStringInJS(length) : longStringInJS(length);
      if (string != null)
        return string;
    }
    return readFixedString(length);
  } else {
    let value;
    switch (token) {
      case 192:
        return null;
      case 193:
        if (bundledStrings) {
          value = read();
          if (value > 0)
            return bundledStrings[1].slice(bundledStrings.position1, bundledStrings.position1 += value);
          else
            return bundledStrings[0].slice(bundledStrings.position0, bundledStrings.position0 -= value);
        }
        return C1;
      case 194:
        return false;
      case 195:
        return true;
      case 196:
        value = src[position++];
        if (value === void 0)
          throw new Error("Unexpected end of buffer");
        return readBin(value);
      case 197:
        value = dataView.getUint16(position);
        position += 2;
        return readBin(value);
      case 198:
        value = dataView.getUint32(position);
        position += 4;
        return readBin(value);
      case 199:
        return readExt(src[position++]);
      case 200:
        value = dataView.getUint16(position);
        position += 2;
        return readExt(value);
      case 201:
        value = dataView.getUint32(position);
        position += 4;
        return readExt(value);
      case 202:
        value = dataView.getFloat32(position);
        if (currentUnpackr.useFloat32 > 2) {
          let multiplier = mult10[(src[position] & 127) << 1 | src[position + 1] >> 7];
          position += 4;
          return (multiplier * value + (value > 0 ? 0.5 : -0.5) >> 0) / multiplier;
        }
        position += 4;
        return value;
      case 203:
        value = dataView.getFloat64(position);
        position += 8;
        return value;
      case 204:
        return src[position++];
      case 205:
        value = dataView.getUint16(position);
        position += 2;
        return value;
      case 206:
        value = dataView.getUint32(position);
        position += 4;
        return value;
      case 207:
        if (currentUnpackr.int64AsNumber) {
          value = dataView.getUint32(position) * 4294967296;
          value += dataView.getUint32(position + 4);
        } else
          value = dataView.getBigUint64(position);
        position += 8;
        return value;
      case 208:
        return dataView.getInt8(position++);
      case 209:
        value = dataView.getInt16(position);
        position += 2;
        return value;
      case 210:
        value = dataView.getInt32(position);
        position += 4;
        return value;
      case 211:
        if (currentUnpackr.int64AsNumber) {
          value = dataView.getInt32(position) * 4294967296;
          value += dataView.getUint32(position + 4);
        } else
          value = dataView.getBigInt64(position);
        position += 8;
        return value;
      case 212:
        value = src[position++];
        if (value == 114) {
          return recordDefinition(src[position++] & 63);
        } else {
          let extension = currentExtensions[value];
          if (extension) {
            if (extension.read) {
              position++;
              return extension.read(read());
            } else if (extension.noBuffer) {
              position++;
              return extension();
            } else
              return extension(src.subarray(position, ++position));
          } else
            throw new Error("Unknown extension " + value);
        }
      case 213:
        value = src[position];
        if (value == 114) {
          position++;
          return recordDefinition(src[position++] & 63, src[position++]);
        } else
          return readExt(2);
      case 214:
        return readExt(4);
      case 215:
        return readExt(8);
      case 216:
        return readExt(16);
      case 217:
        value = src[position++];
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString8(value);
      case 218:
        value = dataView.getUint16(position);
        position += 2;
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString16(value);
      case 219:
        value = dataView.getUint32(position);
        position += 4;
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString32(value);
      case 220:
        value = dataView.getUint16(position);
        position += 2;
        return readArray(value);
      case 221:
        value = dataView.getUint32(position);
        position += 4;
        return readArray(value);
      case 222:
        value = dataView.getUint16(position);
        position += 2;
        return readMap(value);
      case 223:
        value = dataView.getUint32(position);
        position += 4;
        return readMap(value);
      default:
        if (token >= 224)
          return token - 256;
        if (token === void 0) {
          let error = new Error("Unexpected end of MessagePack data");
          error.incomplete = true;
          throw error;
        }
        throw new Error("Unknown MessagePack token " + token);
    }
  }
}
var validName = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function createStructureReader(structure, firstId) {
  function readObject() {
    if (readObject.count++ > inlineObjectReadThreshold) {
      let readObject2 = structure.read = new Function("r", "return function(){return " + (currentUnpackr.freezeData ? "Object.freeze" : "") + "({" + structure.map((key2) => key2 === "__proto__" ? "__proto_:r()" : validName.test(key2) ? key2 + ":r()" : "[" + JSON.stringify(key2) + "]:r()").join(",") + "})}")(read);
      if (structure.highByte === 0)
        structure.read = createSecondByteReader(firstId, structure.read);
      return readObject2();
    }
    let object = {};
    for (let i = 0, l = structure.length; i < l; i++) {
      let key2 = structure[i];
      if (key2 === "__proto__")
        key2 = "__proto_";
      object[key2] = read();
    }
    if (currentUnpackr.freezeData)
      return Object.freeze(object);
    return object;
  }
  readObject.count = 0;
  if (structure.highByte === 0) {
    return createSecondByteReader(firstId, readObject);
  }
  return readObject;
}
var createSecondByteReader = (firstId, read0) => {
  return function() {
    let highByte = src[position++];
    if (highByte === 0)
      return read0();
    let id = firstId < 32 ? -(firstId + (highByte << 5)) : firstId + (highByte << 5);
    let structure = currentStructures[id] || loadStructures()[id];
    if (!structure) {
      throw new Error("Record id is not defined for " + id);
    }
    if (!structure.read)
      structure.read = createStructureReader(structure, firstId);
    return structure.read();
  };
};
function loadStructures() {
  let loadedStructures = saveState(() => {
    src = null;
    return currentUnpackr.getStructures();
  });
  return currentStructures = currentUnpackr._mergeStructures(loadedStructures, currentStructures);
}
var readFixedString = readStringJS;
var readString8 = readStringJS;
var readString16 = readStringJS;
var readString32 = readStringJS;
var isNativeAccelerationEnabled = false;
function setExtractor(extractStrings) {
  isNativeAccelerationEnabled = true;
  readFixedString = readString2(1);
  readString8 = readString2(2);
  readString16 = readString2(3);
  readString32 = readString2(5);
  function readString2(headerLength) {
    return function readString3(length) {
      let string = strings[stringPosition++];
      if (string == null) {
        if (bundledStrings)
          return readStringJS(length);
        let extraction = extractStrings(position - headerLength, srcEnd, src);
        if (typeof extraction == "string") {
          string = extraction;
          strings = EMPTY_ARRAY;
        } else {
          strings = extraction;
          stringPosition = 1;
          srcStringEnd = 1;
          string = strings[0];
          if (string === void 0)
            throw new Error("Unexpected end of buffer");
        }
      }
      let srcStringLength = string.length;
      if (srcStringLength <= length) {
        position += length;
        return string;
      }
      srcString = string;
      srcStringStart = position;
      srcStringEnd = position + srcStringLength;
      position += length;
      return string.slice(0, length);
    };
  }
}
function readStringJS(length) {
  let result;
  if (length < 16) {
    if (result = shortStringInJS(length))
      return result;
  }
  if (length > 64 && decoder)
    return decoder.decode(src.subarray(position, position += length));
  const end = position + length;
  const units = [];
  result = "";
  while (position < end) {
    const byte1 = src[position++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = src[position++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      const byte4 = src[position++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= 4096) {
      result += fromCharCode.apply(String, units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += fromCharCode.apply(String, units);
  }
  return result;
}
function readString(source, start, length) {
  let existingSrc = src;
  src = source;
  position = start;
  try {
    return readStringJS(length);
  } finally {
    src = existingSrc;
  }
}
function readArray(length) {
  let array = new Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = read();
  }
  if (currentUnpackr.freezeData)
    return Object.freeze(array);
  return array;
}
function readMap(length) {
  if (currentUnpackr.mapsAsObjects) {
    let object = {};
    for (let i = 0; i < length; i++) {
      let key2 = readKey();
      if (key2 === "__proto__")
        key2 = "__proto_";
      object[key2] = read();
    }
    return object;
  } else {
    let map = /* @__PURE__ */ new Map();
    for (let i = 0; i < length; i++) {
      map.set(read(), read());
    }
    return map;
  }
}
var fromCharCode = String.fromCharCode;
function longStringInJS(length) {
  let start = position;
  let bytes = new Array(length);
  for (let i = 0; i < length; i++) {
    const byte = src[position++];
    if ((byte & 128) > 0) {
      position = start;
      return;
    }
    bytes[i] = byte;
  }
  return fromCharCode.apply(String, bytes);
}
function shortStringInJS(length) {
  if (length < 4) {
    if (length < 2) {
      if (length === 0)
        return "";
      else {
        let a = src[position++];
        if ((a & 128) > 1) {
          position -= 1;
          return;
        }
        return fromCharCode(a);
      }
    } else {
      let a = src[position++];
      let b2 = src[position++];
      if ((a & 128) > 0 || (b2 & 128) > 0) {
        position -= 2;
        return;
      }
      if (length < 3)
        return fromCharCode(a, b2);
      let c = src[position++];
      if ((c & 128) > 0) {
        position -= 3;
        return;
      }
      return fromCharCode(a, b2, c);
    }
  } else {
    let a = src[position++];
    let b2 = src[position++];
    let c = src[position++];
    let d = src[position++];
    if ((a & 128) > 0 || (b2 & 128) > 0 || (c & 128) > 0 || (d & 128) > 0) {
      position -= 4;
      return;
    }
    if (length < 6) {
      if (length === 4)
        return fromCharCode(a, b2, c, d);
      else {
        let e = src[position++];
        if ((e & 128) > 0) {
          position -= 5;
          return;
        }
        return fromCharCode(a, b2, c, d, e);
      }
    } else if (length < 8) {
      let e = src[position++];
      let f = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0) {
        position -= 6;
        return;
      }
      if (length < 7)
        return fromCharCode(a, b2, c, d, e, f);
      let g = src[position++];
      if ((g & 128) > 0) {
        position -= 7;
        return;
      }
      return fromCharCode(a, b2, c, d, e, f, g);
    } else {
      let e = src[position++];
      let f = src[position++];
      let g = src[position++];
      let h = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0 || (g & 128) > 0 || (h & 128) > 0) {
        position -= 8;
        return;
      }
      if (length < 10) {
        if (length === 8)
          return fromCharCode(a, b2, c, d, e, f, g, h);
        else {
          let i = src[position++];
          if ((i & 128) > 0) {
            position -= 9;
            return;
          }
          return fromCharCode(a, b2, c, d, e, f, g, h, i);
        }
      } else if (length < 12) {
        let i = src[position++];
        let j = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0) {
          position -= 10;
          return;
        }
        if (length < 11)
          return fromCharCode(a, b2, c, d, e, f, g, h, i, j);
        let k = src[position++];
        if ((k & 128) > 0) {
          position -= 11;
          return;
        }
        return fromCharCode(a, b2, c, d, e, f, g, h, i, j, k);
      } else {
        let i = src[position++];
        let j = src[position++];
        let k = src[position++];
        let l = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0 || (k & 128) > 0 || (l & 128) > 0) {
          position -= 12;
          return;
        }
        if (length < 14) {
          if (length === 12)
            return fromCharCode(a, b2, c, d, e, f, g, h, i, j, k, l);
          else {
            let m = src[position++];
            if ((m & 128) > 0) {
              position -= 13;
              return;
            }
            return fromCharCode(a, b2, c, d, e, f, g, h, i, j, k, l, m);
          }
        } else {
          let m = src[position++];
          let n = src[position++];
          if ((m & 128) > 0 || (n & 128) > 0) {
            position -= 14;
            return;
          }
          if (length < 15)
            return fromCharCode(a, b2, c, d, e, f, g, h, i, j, k, l, m, n);
          let o = src[position++];
          if ((o & 128) > 0) {
            position -= 15;
            return;
          }
          return fromCharCode(a, b2, c, d, e, f, g, h, i, j, k, l, m, n, o);
        }
      }
    }
  }
}
function readOnlyJSString() {
  let token = src[position++];
  let length;
  if (token < 192) {
    length = token - 160;
  } else {
    switch (token) {
      case 217:
        length = src[position++];
        break;
      case 218:
        length = dataView.getUint16(position);
        position += 2;
        break;
      case 219:
        length = dataView.getUint32(position);
        position += 4;
        break;
      default:
        throw new Error("Expected string");
    }
  }
  return readStringJS(length);
}
function readBin(length) {
  return currentUnpackr.copyBuffers ? Uint8Array.prototype.slice.call(src, position, position += length) : src.subarray(position, position += length);
}
function readExt(length) {
  let type = src[position++];
  if (currentExtensions[type]) {
    let end;
    return currentExtensions[type](src.subarray(position, end = position += length), (readPosition) => {
      position = readPosition;
      try {
        return read();
      } finally {
        position = end;
      }
    });
  } else
    throw new Error("Unknown extension type " + type)``;
}
var keyCache = new Array(4096);
function readKey() {
  let length = src[position++];
  if (length >= 160 && length < 192) {
    length = length - 160;
    if (srcStringEnd >= position)
      return srcString.slice(position - srcStringStart, (position += length) - srcStringStart);
    else if (!(srcStringEnd == 0 && srcEnd < 180))
      return readFixedString(length);
  } else {
    position--;
    return read().toString();
  }
  let key2 = (length << 5 ^ (length > 1 ? dataView.getUint16(position) : length > 0 ? src[position] : 0)) & 4095;
  let entry = keyCache[key2];
  let checkPosition = position;
  let end = position + length - 3;
  let chunk;
  let i = 0;
  if (entry && entry.bytes == length) {
    while (checkPosition < end) {
      chunk = dataView.getUint32(checkPosition);
      if (chunk != entry[i++]) {
        checkPosition = 1879048192;
        break;
      }
      checkPosition += 4;
    }
    end += 3;
    while (checkPosition < end) {
      chunk = src[checkPosition++];
      if (chunk != entry[i++]) {
        checkPosition = 1879048192;
        break;
      }
    }
    if (checkPosition === end) {
      position = checkPosition;
      return entry.string;
    }
    end -= 3;
    checkPosition = position;
  }
  entry = [];
  keyCache[key2] = entry;
  entry.bytes = length;
  while (checkPosition < end) {
    chunk = dataView.getUint32(checkPosition);
    entry.push(chunk);
    checkPosition += 4;
  }
  end += 3;
  while (checkPosition < end) {
    chunk = src[checkPosition++];
    entry.push(chunk);
  }
  let string = length < 16 ? shortStringInJS(length) : longStringInJS(length);
  if (string != null)
    return entry.string = string;
  return entry.string = readFixedString(length);
}
var recordDefinition = (id, highByte) => {
  let structure = read().map((property) => property.toString());
  let firstByte = id;
  if (highByte !== void 0) {
    id = id < 32 ? -((highByte << 5) + id) : (highByte << 5) + id;
    structure.highByte = highByte;
  }
  let existingStructure = currentStructures[id];
  if (existingStructure && existingStructure.isShared) {
    (currentStructures.restoreStructures || (currentStructures.restoreStructures = []))[id] = existingStructure;
  }
  currentStructures[id] = structure;
  structure.read = createStructureReader(structure, firstByte);
  return structure.read();
};
currentExtensions[0] = () => {
};
currentExtensions[0].noBuffer = true;
currentExtensions[101] = () => {
  let data = read();
  return (globalThis[data[0]] || Error)(data[1]);
};
currentExtensions[105] = (data) => {
  let id = dataView.getUint32(position - 4);
  if (!referenceMap)
    referenceMap = /* @__PURE__ */ new Map();
  let token = src[position];
  let target2;
  if (token >= 144 && token < 160 || token == 220 || token == 221)
    target2 = [];
  else
    target2 = {};
  let refEntry = { target: target2 };
  referenceMap.set(id, refEntry);
  let targetProperties = read();
  if (refEntry.used)
    return Object.assign(target2, targetProperties);
  refEntry.target = targetProperties;
  return targetProperties;
};
currentExtensions[112] = (data) => {
  let id = dataView.getUint32(position - 4);
  let refEntry = referenceMap.get(id);
  refEntry.used = true;
  return refEntry.target;
};
currentExtensions[115] = () => new Set(read());
var typedArrays = ["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "BigInt64", "BigUint64"].map((type) => type + "Array");
currentExtensions[116] = (data) => {
  let typeCode = data[0];
  let typedArrayName = typedArrays[typeCode];
  if (!typedArrayName)
    throw new Error("Could not find typed array for code " + typeCode);
  return new globalThis[typedArrayName](Uint8Array.prototype.slice.call(data, 1).buffer);
};
currentExtensions[120] = () => {
  let data = read();
  return new RegExp(data[0], data[1]);
};
var TEMP_BUNDLE = [];
currentExtensions[98] = (data) => {
  let dataSize = (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
  let dataPosition = position;
  position += dataSize - data.length;
  bundledStrings = TEMP_BUNDLE;
  bundledStrings = [readOnlyJSString(), readOnlyJSString()];
  bundledStrings.position0 = 0;
  bundledStrings.position1 = 0;
  bundledStrings.postBundlePosition = position;
  position = dataPosition;
  return read();
};
currentExtensions[255] = (data) => {
  if (data.length == 4)
    return new Date((data[0] * 16777216 + (data[1] << 16) + (data[2] << 8) + data[3]) * 1e3);
  else if (data.length == 8)
    return new Date(
      ((data[0] << 22) + (data[1] << 14) + (data[2] << 6) + (data[3] >> 2)) / 1e6 + ((data[3] & 3) * 4294967296 + data[4] * 16777216 + (data[5] << 16) + (data[6] << 8) + data[7]) * 1e3
    );
  else if (data.length == 12)
    return new Date(
      ((data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3]) / 1e6 + ((data[4] & 128 ? -281474976710656 : 0) + data[6] * 1099511627776 + data[7] * 4294967296 + data[8] * 16777216 + (data[9] << 16) + (data[10] << 8) + data[11]) * 1e3
    );
  else
    return new Date("invalid");
};
function saveState(callback) {
  if (onSaveState)
    onSaveState();
  let savedSrcEnd = srcEnd;
  let savedPosition = position;
  let savedStringPosition = stringPosition;
  let savedSrcStringStart = srcStringStart;
  let savedSrcStringEnd = srcStringEnd;
  let savedSrcString = srcString;
  let savedStrings = strings;
  let savedReferenceMap = referenceMap;
  let savedBundledStrings = bundledStrings;
  let savedSrc = new Uint8Array(src.slice(0, srcEnd));
  let savedStructures = currentStructures;
  let savedStructuresContents = currentStructures.slice(0, currentStructures.length);
  let savedPackr = currentUnpackr;
  let savedSequentialMode = sequentialMode;
  let value = callback();
  srcEnd = savedSrcEnd;
  position = savedPosition;
  stringPosition = savedStringPosition;
  srcStringStart = savedSrcStringStart;
  srcStringEnd = savedSrcStringEnd;
  srcString = savedSrcString;
  strings = savedStrings;
  referenceMap = savedReferenceMap;
  bundledStrings = savedBundledStrings;
  src = savedSrc;
  sequentialMode = savedSequentialMode;
  currentStructures = savedStructures;
  currentStructures.splice(0, currentStructures.length, ...savedStructuresContents);
  currentUnpackr = savedPackr;
  dataView = new DataView(src.buffer, src.byteOffset, src.byteLength);
  return value;
}
function clearSource() {
  src = null;
  referenceMap = null;
  currentStructures = null;
}
var mult10 = new Array(147);
for (let i = 0; i < 256; i++) {
  mult10[i] = +("1e" + Math.floor(45.15 - i * 0.30103));
}
var defaultUnpackr = new Unpackr({ useRecords: false });
var unpack = defaultUnpackr.unpack;
var unpackMultiple = defaultUnpackr.unpackMultiple;
var decode = defaultUnpackr.unpack;
var FLOAT32_OPTIONS = {
  NEVER: 0,
  ALWAYS: 1,
  DECIMAL_ROUND: 3,
  DECIMAL_FIT: 4
};
var f32Array = new Float32Array(1);
var u8Array = new Uint8Array(f32Array.buffer, 0, 4);
function setReadStruct(updatedReadStruct, loadedStructs, saveState3) {
  readStruct = updatedReadStruct;
  onLoadedStructures = loadedStructs;
  onSaveState = saveState3;
}

// ../../node_modules/.pnpm/msgpackr@1.7.2/node_modules/msgpackr/pack.js
var textEncoder;
try {
  textEncoder = new TextEncoder();
} catch (error) {
}
var extensions;
var extensionClasses;
var hasNodeBuffer = typeof Buffer !== "undefined";
var ByteArrayAllocate = hasNodeBuffer ? function(length) {
  return Buffer.allocUnsafeSlow(length);
} : Uint8Array;
var ByteArray = hasNodeBuffer ? Buffer : Uint8Array;
var MAX_BUFFER_SIZE = hasNodeBuffer ? 4294967296 : 2144337920;
var target;
var keysTarget;
var targetView;
var position2 = 0;
var safeEnd;
var bundledStrings2 = null;
var writeStructSlots;
var MAX_BUNDLE_SIZE = 61440;
var hasNonLatin = /[\u0080-\uFFFF]/;
var RECORD_SYMBOL = Symbol("record-id");
var Packr = class extends Unpackr {
  constructor(options2) {
    super(options2);
    this.offset = 0;
    let typeBuffer;
    let start;
    let hasSharedUpdate;
    let structures;
    let referenceMap2;
    let encodeUtf82 = ByteArray.prototype.utf8Write ? function(string, position3) {
      return target.utf8Write(string, position3, 4294967295);
    } : textEncoder && textEncoder.encodeInto ? function(string, position3) {
      return textEncoder.encodeInto(string, target.subarray(position3)).written;
    } : false;
    let packr = this;
    if (!options2)
      options2 = {};
    let isSequential = options2 && options2.sequential;
    let hasSharedStructures = options2.structures || options2.saveStructures;
    let maxSharedStructures = options2.maxSharedStructures;
    if (maxSharedStructures == null)
      maxSharedStructures = hasSharedStructures ? 32 : 0;
    if (maxSharedStructures > 8160)
      throw new Error("Maximum maxSharedStructure is 8160");
    if (options2.structuredClone && options2.moreTypes == void 0) {
      options2.moreTypes = true;
    }
    let maxOwnStructures = options2.maxOwnStructures;
    if (maxOwnStructures == null)
      maxOwnStructures = hasSharedStructures ? 32 : 64;
    if (!this.structures && options2.useRecords != false)
      this.structures = [];
    let useTwoByteRecords = maxSharedStructures > 32 || maxOwnStructures + maxSharedStructures > 64;
    let sharedLimitId = maxSharedStructures + 64;
    let maxStructureId = maxSharedStructures + maxOwnStructures + 64;
    if (maxStructureId > 8256) {
      throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
    }
    let recordIdsToRemove = [];
    let transitionsCount = 0;
    let serializationsSinceTransitionRebuild = 0;
    this.pack = this.encode = function(value, encodeOptions) {
      if (!target) {
        target = new ByteArrayAllocate(8192);
        targetView = target.dataView = new DataView(target.buffer, 0, 8192);
        position2 = 0;
      }
      safeEnd = target.length - 10;
      if (safeEnd - position2 < 2048) {
        target = new ByteArrayAllocate(target.length);
        targetView = target.dataView = new DataView(target.buffer, 0, target.length);
        safeEnd = target.length - 10;
        position2 = 0;
      } else
        position2 = position2 + 7 & 2147483640;
      start = position2;
      referenceMap2 = packr.structuredClone ? /* @__PURE__ */ new Map() : null;
      if (packr.bundleStrings && typeof value !== "string") {
        bundledStrings2 = [];
        bundledStrings2.size = Infinity;
      } else
        bundledStrings2 = null;
      structures = packr.structures;
      if (structures) {
        if (structures.uninitialized)
          structures = packr._mergeStructures(packr.getStructures());
        let sharedLength = structures.sharedLength || 0;
        if (sharedLength > maxSharedStructures) {
          throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + structures.sharedLength);
        }
        if (!structures.transitions) {
          structures.transitions = /* @__PURE__ */ Object.create(null);
          for (let i = 0; i < sharedLength; i++) {
            let keys = structures[i];
            if (!keys)
              continue;
            let nextTransition, transition = structures.transitions;
            for (let j = 0, l = keys.length; j < l; j++) {
              let key2 = keys[j];
              nextTransition = transition[key2];
              if (!nextTransition) {
                nextTransition = transition[key2] = /* @__PURE__ */ Object.create(null);
              }
              transition = nextTransition;
            }
            transition[RECORD_SYMBOL] = i + 64;
          }
          this.lastNamedStructuresLength = sharedLength;
        }
        if (!isSequential) {
          structures.nextId = sharedLength + 64;
        }
      }
      if (hasSharedUpdate)
        hasSharedUpdate = false;
      try {
        if (packr.randomAccessStructure && value.constructor && value.constructor === Object)
          writeStruct2(value);
        else
          pack3(value);
        let lastBundle = bundledStrings2;
        if (bundledStrings2)
          writeBundles(start, pack3, 0);
        if (referenceMap2 && referenceMap2.idsToInsert) {
          let idsToInsert = referenceMap2.idsToInsert.sort((a, b2) => a.offset > b2.offset ? 1 : -1);
          let i = idsToInsert.length;
          let incrementPosition = -1;
          while (lastBundle && i > 0) {
            let insertionPoint = idsToInsert[--i].offset + start;
            if (insertionPoint < lastBundle.stringsPosition + start && incrementPosition === -1)
              incrementPosition = 0;
            if (insertionPoint > lastBundle.position + start) {
              if (incrementPosition >= 0)
                incrementPosition += 6;
            } else {
              if (incrementPosition >= 0) {
                targetView.setUint32(
                  lastBundle.position + start,
                  targetView.getUint32(lastBundle.position + start) + incrementPosition
                );
                incrementPosition = -1;
              }
              lastBundle = lastBundle.previous;
              i++;
            }
          }
          if (incrementPosition >= 0 && lastBundle) {
            targetView.setUint32(
              lastBundle.position + start,
              targetView.getUint32(lastBundle.position + start) + incrementPosition
            );
          }
          position2 += idsToInsert.length * 6;
          if (position2 > safeEnd)
            makeRoom(position2);
          packr.offset = position2;
          let serialized = insertIds(target.subarray(start, position2), idsToInsert);
          referenceMap2 = null;
          return serialized;
        }
        packr.offset = position2;
        if (encodeOptions & REUSE_BUFFER_MODE) {
          target.start = start;
          target.end = position2;
          return target;
        }
        return target.subarray(start, position2);
      } finally {
        if (structures) {
          if (serializationsSinceTransitionRebuild < 10)
            serializationsSinceTransitionRebuild++;
          let sharedLength = structures.sharedLength || 0;
          if (structures.length > sharedLength)
            structures.length = sharedLength;
          if (transitionsCount > 1e4) {
            structures.transitions = null;
            serializationsSinceTransitionRebuild = 0;
            transitionsCount = 0;
            if (recordIdsToRemove.length > 0)
              recordIdsToRemove = [];
          } else if (recordIdsToRemove.length > 0 && !isSequential) {
            for (let i = 0, l = recordIdsToRemove.length; i < l; i++) {
              recordIdsToRemove[i][RECORD_SYMBOL] = 0;
            }
            recordIdsToRemove = [];
          }
          if (hasSharedUpdate && packr.saveStructures) {
            let returnBuffer = target.subarray(start, position2);
            let newSharedData = prepareStructures(structures, packr);
            if (packr.saveStructures(newSharedData, newSharedData.isCompatible) === false) {
              return packr.pack(value);
            }
            packr.lastNamedStructuresLength = sharedLength;
            return returnBuffer;
          }
        }
        if (encodeOptions & RESET_BUFFER_MODE)
          position2 = start;
      }
    };
    const pack3 = (value) => {
      if (position2 > safeEnd)
        target = makeRoom(position2);
      var type = typeof value;
      var length;
      if (type === "string") {
        let strLength = value.length;
        if (bundledStrings2 && strLength >= 4 && strLength < 4096) {
          if ((bundledStrings2.size += strLength) > MAX_BUNDLE_SIZE) {
            let extStart;
            let maxBytes2 = (bundledStrings2[0] ? bundledStrings2[0].length * 3 + bundledStrings2[1].length : 0) + 10;
            if (position2 + maxBytes2 > safeEnd)
              target = makeRoom(position2 + maxBytes2);
            let lastBundle;
            if (bundledStrings2.position) {
              lastBundle = bundledStrings2;
              target[position2] = 200;
              position2 += 3;
              target[position2++] = 98;
              extStart = position2 - start;
              position2 += 4;
              writeBundles(start, pack3, 0);
              targetView.setUint16(extStart + start - 3, position2 - start - extStart);
            } else {
              target[position2++] = 214;
              target[position2++] = 98;
              extStart = position2 - start;
              position2 += 4;
            }
            bundledStrings2 = ["", ""];
            bundledStrings2.previous = lastBundle;
            bundledStrings2.size = 0;
            bundledStrings2.position = extStart;
          }
          let twoByte = hasNonLatin.test(value);
          bundledStrings2[twoByte ? 0 : 1] += value;
          target[position2++] = 193;
          pack3(twoByte ? -strLength : strLength);
          return;
        }
        let headerSize;
        if (strLength < 32) {
          headerSize = 1;
        } else if (strLength < 256) {
          headerSize = 2;
        } else if (strLength < 65536) {
          headerSize = 3;
        } else {
          headerSize = 5;
        }
        let maxBytes = strLength * 3;
        if (position2 + maxBytes > safeEnd)
          target = makeRoom(position2 + maxBytes);
        if (strLength < 64 || !encodeUtf82) {
          let i, c1, c2, strPosition = position2 + headerSize;
          for (i = 0; i < strLength; i++) {
            c1 = value.charCodeAt(i);
            if (c1 < 128) {
              target[strPosition++] = c1;
            } else if (c1 < 2048) {
              target[strPosition++] = c1 >> 6 | 192;
              target[strPosition++] = c1 & 63 | 128;
            } else if ((c1 & 64512) === 55296 && ((c2 = value.charCodeAt(i + 1)) & 64512) === 56320) {
              c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
              i++;
              target[strPosition++] = c1 >> 18 | 240;
              target[strPosition++] = c1 >> 12 & 63 | 128;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            } else {
              target[strPosition++] = c1 >> 12 | 224;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            }
          }
          length = strPosition - position2 - headerSize;
        } else {
          length = encodeUtf82(value, position2 + headerSize);
        }
        if (length < 32) {
          target[position2++] = 160 | length;
        } else if (length < 256) {
          if (headerSize < 2) {
            target.copyWithin(position2 + 2, position2 + 1, position2 + 1 + length);
          }
          target[position2++] = 217;
          target[position2++] = length;
        } else if (length < 65536) {
          if (headerSize < 3) {
            target.copyWithin(position2 + 3, position2 + 2, position2 + 2 + length);
          }
          target[position2++] = 218;
          target[position2++] = length >> 8;
          target[position2++] = length & 255;
        } else {
          if (headerSize < 5) {
            target.copyWithin(position2 + 5, position2 + 3, position2 + 3 + length);
          }
          target[position2++] = 219;
          targetView.setUint32(position2, length);
          position2 += 4;
        }
        position2 += length;
      } else if (type === "number") {
        if (value >>> 0 === value) {
          if (value < 32 || value < 128 && this.useRecords === false || value < 64 && !this.randomAccessStructure) {
            target[position2++] = value;
          } else if (value < 256) {
            target[position2++] = 204;
            target[position2++] = value;
          } else if (value < 65536) {
            target[position2++] = 205;
            target[position2++] = value >> 8;
            target[position2++] = value & 255;
          } else {
            target[position2++] = 206;
            targetView.setUint32(position2, value);
            position2 += 4;
          }
        } else if (value >> 0 === value) {
          if (value >= -32) {
            target[position2++] = 256 + value;
          } else if (value >= -128) {
            target[position2++] = 208;
            target[position2++] = value + 256;
          } else if (value >= -32768) {
            target[position2++] = 209;
            targetView.setInt16(position2, value);
            position2 += 2;
          } else {
            target[position2++] = 210;
            targetView.setInt32(position2, value);
            position2 += 4;
          }
        } else {
          let useFloat32;
          if ((useFloat32 = this.useFloat32) > 0 && value < 4294967296 && value >= -2147483648) {
            target[position2++] = 202;
            targetView.setFloat32(position2, value);
            let xShifted;
            if (useFloat32 < 4 || (xShifted = value * mult10[(target[position2] & 127) << 1 | target[position2 + 1] >> 7]) >> 0 === xShifted) {
              position2 += 4;
              return;
            } else
              position2--;
          }
          target[position2++] = 203;
          targetView.setFloat64(position2, value);
          position2 += 8;
        }
      } else if (type === "object") {
        if (!value)
          target[position2++] = 192;
        else {
          if (referenceMap2) {
            let referee = referenceMap2.get(value);
            if (referee) {
              if (!referee.id) {
                let idsToInsert = referenceMap2.idsToInsert || (referenceMap2.idsToInsert = []);
                referee.id = idsToInsert.push(referee);
              }
              target[position2++] = 214;
              target[position2++] = 112;
              targetView.setUint32(position2, referee.id);
              position2 += 4;
              return;
            } else
              referenceMap2.set(value, { offset: position2 - start });
          }
          let constructor = value.constructor;
          if (constructor === Object) {
            writeObject(value, true);
          } else if (constructor === Array) {
            length = value.length;
            if (length < 16) {
              target[position2++] = 144 | length;
            } else if (length < 65536) {
              target[position2++] = 220;
              target[position2++] = length >> 8;
              target[position2++] = length & 255;
            } else {
              target[position2++] = 221;
              targetView.setUint32(position2, length);
              position2 += 4;
            }
            for (let i = 0; i < length; i++) {
              pack3(value[i]);
            }
          } else if (constructor === Map) {
            length = value.size;
            if (length < 16) {
              target[position2++] = 128 | length;
            } else if (length < 65536) {
              target[position2++] = 222;
              target[position2++] = length >> 8;
              target[position2++] = length & 255;
            } else {
              target[position2++] = 223;
              targetView.setUint32(position2, length);
              position2 += 4;
            }
            for (let [key2, entryValue] of value) {
              pack3(key2);
              pack3(entryValue);
            }
          } else {
            for (let i = 0, l = extensions.length; i < l; i++) {
              let extensionClass = extensionClasses[i];
              if (value instanceof extensionClass) {
                let extension = extensions[i];
                if (extension.write) {
                  if (extension.type) {
                    target[position2++] = 212;
                    target[position2++] = extension.type;
                    target[position2++] = 0;
                  }
                  pack3(extension.write.call(this, value));
                  return;
                }
                let currentTarget = target;
                let currentTargetView = targetView;
                let currentPosition = position2;
                target = null;
                let result;
                try {
                  result = extension.pack.call(this, value, (size2) => {
                    target = currentTarget;
                    currentTarget = null;
                    position2 += size2;
                    if (position2 > safeEnd)
                      makeRoom(position2);
                    return {
                      target,
                      targetView,
                      position: position2 - size2
                    };
                  }, pack3);
                } finally {
                  if (currentTarget) {
                    target = currentTarget;
                    targetView = currentTargetView;
                    position2 = currentPosition;
                    safeEnd = target.length - 10;
                  }
                }
                if (result) {
                  if (result.length + position2 > safeEnd)
                    makeRoom(result.length + position2);
                  position2 = writeExtensionData(result, target, position2, extension.type);
                }
                return;
              }
            }
            writeObject(value, !value.hasOwnProperty);
          }
        }
      } else if (type === "boolean") {
        target[position2++] = value ? 195 : 194;
      } else if (type === "bigint") {
        if (value < BigInt(1) << BigInt(63) && value >= -(BigInt(1) << BigInt(63))) {
          target[position2++] = 211;
          targetView.setBigInt64(position2, value);
        } else if (value < BigInt(1) << BigInt(64) && value > 0) {
          target[position2++] = 207;
          targetView.setBigUint64(position2, value);
        } else {
          if (this.largeBigIntToFloat) {
            target[position2++] = 203;
            targetView.setFloat64(position2, Number(value));
          } else {
            throw new RangeError(value + " was too large to fit in MessagePack 64-bit integer format, set largeBigIntToFloat to convert to float-64");
          }
        }
        position2 += 8;
      } else if (type === "undefined") {
        if (this.encodeUndefinedAsNil)
          target[position2++] = 192;
        else {
          target[position2++] = 212;
          target[position2++] = 0;
          target[position2++] = 0;
        }
      } else if (type === "function") {
        pack3(this.writeFunction && this.writeFunction());
      } else {
        throw new Error("Unknown type: " + type);
      }
    };
    const writeObject = this.useRecords === false ? this.variableMapSize ? (object) => {
      let keys = Object.keys(object);
      let length = keys.length;
      if (length < 16) {
        target[position2++] = 128 | length;
      } else if (length < 65536) {
        target[position2++] = 222;
        target[position2++] = length >> 8;
        target[position2++] = length & 255;
      } else {
        target[position2++] = 223;
        targetView.setUint32(position2, length);
        position2 += 4;
      }
      let key2;
      for (let i = 0; i < length; i++) {
        pack3(key2 = keys[i]);
        pack3(object[key2]);
      }
    } : (object, safePrototype) => {
      target[position2++] = 222;
      let objectOffset = position2 - start;
      position2 += 2;
      let size2 = 0;
      for (let key2 in object) {
        if (safePrototype || object.hasOwnProperty(key2)) {
          pack3(key2);
          pack3(object[key2]);
          size2++;
        }
      }
      target[objectOffset++ + start] = size2 >> 8;
      target[objectOffset + start] = size2 & 255;
    } : options2.progressiveRecords && !useTwoByteRecords ? (object, safePrototype) => {
      let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
      let objectOffset = position2++ - start;
      let wroteKeys;
      for (let key2 in object) {
        if (safePrototype || object.hasOwnProperty(key2)) {
          nextTransition = transition[key2];
          if (nextTransition)
            transition = nextTransition;
          else {
            let keys = Object.keys(object);
            let lastTransition = transition;
            transition = structures.transitions;
            let newTransitions = 0;
            for (let i = 0, l = keys.length; i < l; i++) {
              let key3 = keys[i];
              nextTransition = transition[key3];
              if (!nextTransition) {
                nextTransition = transition[key3] = /* @__PURE__ */ Object.create(null);
                newTransitions++;
              }
              transition = nextTransition;
            }
            if (objectOffset + start + 1 == position2) {
              position2--;
              newRecord(transition, keys, newTransitions);
            } else
              insertNewRecord(transition, keys, objectOffset, newTransitions);
            wroteKeys = true;
            transition = lastTransition[key2];
          }
          pack3(object[key2]);
        }
      }
      if (!wroteKeys) {
        let recordId = transition[RECORD_SYMBOL];
        if (recordId)
          target[objectOffset + start] = recordId;
        else
          insertNewRecord(transition, Object.keys(object), objectOffset, 0);
      }
    } : (object, safePrototype) => {
      let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
      let newTransitions = 0;
      for (let key2 in object)
        if (safePrototype || object.hasOwnProperty(key2)) {
          nextTransition = transition[key2];
          if (!nextTransition) {
            nextTransition = transition[key2] = /* @__PURE__ */ Object.create(null);
            newTransitions++;
          }
          transition = nextTransition;
        }
      let recordId = transition[RECORD_SYMBOL];
      if (recordId) {
        if (recordId >= 96 && useTwoByteRecords) {
          target[position2++] = ((recordId -= 96) & 31) + 96;
          target[position2++] = recordId >> 5;
        } else
          target[position2++] = recordId;
      } else {
        newRecord(transition, transition.__keys__ || Object.keys(object), newTransitions);
      }
      for (let key2 in object)
        if (safePrototype || object.hasOwnProperty(key2))
          pack3(object[key2]);
    };
    const makeRoom = (end) => {
      let newSize;
      if (end > 16777216) {
        if (end - start > MAX_BUFFER_SIZE)
          throw new Error("Packed buffer would be larger than maximum buffer size");
        newSize = Math.min(
          MAX_BUFFER_SIZE,
          Math.round(Math.max((end - start) * (end > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096
        );
      } else
        newSize = (Math.max(end - start << 2, target.length - 1) >> 12) + 1 << 12;
      let newBuffer = new ByteArrayAllocate(newSize);
      targetView = newBuffer.dataView = new DataView(newBuffer.buffer, 0, newSize);
      end = Math.min(end, target.length);
      if (target.copy)
        target.copy(newBuffer, 0, start, end);
      else
        newBuffer.set(target.slice(start, end));
      position2 -= start;
      start = 0;
      safeEnd = newBuffer.length - 10;
      return target = newBuffer;
    };
    const newRecord = (transition, keys, newTransitions) => {
      let recordId = structures.nextId;
      if (!recordId)
        recordId = 64;
      if (recordId < sharedLimitId && this.shouldShareStructure && !this.shouldShareStructure(keys)) {
        recordId = structures.nextOwnId;
        if (!(recordId < maxStructureId))
          recordId = sharedLimitId;
        structures.nextOwnId = recordId + 1;
      } else {
        if (recordId >= maxStructureId)
          recordId = sharedLimitId;
        structures.nextId = recordId + 1;
      }
      let highByte = keys.highByte = recordId >= 96 && useTwoByteRecords ? recordId - 96 >> 5 : -1;
      transition[RECORD_SYMBOL] = recordId;
      transition.__keys__ = keys;
      structures[recordId - 64] = keys;
      if (recordId < sharedLimitId) {
        keys.isShared = true;
        structures.sharedLength = recordId - 63;
        hasSharedUpdate = true;
        if (highByte >= 0) {
          target[position2++] = (recordId & 31) + 96;
          target[position2++] = highByte;
        } else {
          target[position2++] = recordId;
        }
      } else {
        if (highByte >= 0) {
          target[position2++] = 213;
          target[position2++] = 114;
          target[position2++] = (recordId & 31) + 96;
          target[position2++] = highByte;
        } else {
          target[position2++] = 212;
          target[position2++] = 114;
          target[position2++] = recordId;
        }
        if (newTransitions)
          transitionsCount += serializationsSinceTransitionRebuild * newTransitions;
        if (recordIdsToRemove.length >= maxOwnStructures)
          recordIdsToRemove.shift()[RECORD_SYMBOL] = 0;
        recordIdsToRemove.push(transition);
        pack3(keys);
      }
    };
    const insertNewRecord = (transition, keys, insertionOffset, newTransitions) => {
      let mainTarget = target;
      let mainPosition = position2;
      let mainSafeEnd = safeEnd;
      let mainStart = start;
      target = keysTarget;
      position2 = 0;
      start = 0;
      if (!target)
        keysTarget = target = new ByteArrayAllocate(8192);
      safeEnd = target.length - 10;
      newRecord(transition, keys, newTransitions);
      keysTarget = target;
      let keysPosition = position2;
      target = mainTarget;
      position2 = mainPosition;
      safeEnd = mainSafeEnd;
      start = mainStart;
      if (keysPosition > 1) {
        let newEnd = position2 + keysPosition - 1;
        if (newEnd > safeEnd)
          makeRoom(newEnd);
        let insertionPosition = insertionOffset + start;
        target.copyWithin(insertionPosition + keysPosition, insertionPosition + 1, position2);
        target.set(keysTarget.slice(0, keysPosition), insertionPosition);
        position2 = newEnd;
      } else {
        target[insertionOffset + start] = keysTarget[0];
      }
    };
    const writeStruct2 = (object, safePrototype) => {
      let newPosition = writeStructSlots(object, target, position2, structures, makeRoom, (value, newPosition2, notifySharedUpdate) => {
        if (notifySharedUpdate)
          return hasSharedUpdate = true;
        position2 = newPosition2;
        if (start > 0) {
          pack3(value);
          if (start == 0)
            return { position: position2, targetView, target };
        } else
          pack3(value);
        return position2;
      }, this);
      if (newPosition === 0)
        return writeObject(object, true);
      position2 = newPosition;
    };
  }
  useBuffer(buffer2) {
    target = buffer2;
    targetView = new DataView(target.buffer, target.byteOffset, target.byteLength);
    position2 = 0;
  }
  clearSharedData() {
    if (this.structures)
      this.structures = [];
    if (this.typedStructs)
      this.typedStructs = [];
  }
};
extensionClasses = [Date, Set, Error, RegExp, ArrayBuffer, Object.getPrototypeOf(Uint8Array.prototype).constructor, C1Type];
extensions = [{
  pack(date, allocateForWrite, pack3) {
    let seconds = date.getTime() / 1e3;
    if ((this.useTimestamp32 || date.getMilliseconds() === 0) && seconds >= 0 && seconds < 4294967296) {
      let { target: target2, targetView: targetView2, position: position3 } = allocateForWrite(6);
      target2[position3++] = 214;
      target2[position3++] = 255;
      targetView2.setUint32(position3, seconds);
    } else if (seconds > 0 && seconds < 4294967296) {
      let { target: target2, targetView: targetView2, position: position3 } = allocateForWrite(10);
      target2[position3++] = 215;
      target2[position3++] = 255;
      targetView2.setUint32(position3, date.getMilliseconds() * 4e6 + (seconds / 1e3 / 4294967296 >> 0));
      targetView2.setUint32(position3 + 4, seconds);
    } else if (isNaN(seconds)) {
      if (this.onInvalidDate) {
        allocateForWrite(0);
        return pack3(this.onInvalidDate());
      }
      let { target: target2, targetView: targetView2, position: position3 } = allocateForWrite(3);
      target2[position3++] = 212;
      target2[position3++] = 255;
      target2[position3++] = 255;
    } else {
      let { target: target2, targetView: targetView2, position: position3 } = allocateForWrite(15);
      target2[position3++] = 199;
      target2[position3++] = 12;
      target2[position3++] = 255;
      targetView2.setUint32(position3, date.getMilliseconds() * 1e6);
      targetView2.setBigInt64(position3 + 4, BigInt(Math.floor(seconds)));
    }
  }
}, {
  pack(set, allocateForWrite, pack3) {
    let array = Array.from(set);
    let { target: target2, position: position3 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target2[position3++] = 212;
      target2[position3++] = 115;
      target2[position3++] = 0;
    }
    pack3(array);
  }
}, {
  pack(error, allocateForWrite, pack3) {
    let { target: target2, position: position3 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target2[position3++] = 212;
      target2[position3++] = 101;
      target2[position3++] = 0;
    }
    pack3([error.name, error.message]);
  }
}, {
  pack(regex, allocateForWrite, pack3) {
    let { target: target2, position: position3 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target2[position3++] = 212;
      target2[position3++] = 120;
      target2[position3++] = 0;
    }
    pack3([regex.source, regex.flags]);
  }
}, {
  pack(arrayBuffer, allocateForWrite) {
    if (this.moreTypes)
      writeExtBuffer(arrayBuffer, 16, allocateForWrite);
    else
      writeBuffer(hasNodeBuffer ? Buffer.from(arrayBuffer) : new Uint8Array(arrayBuffer), allocateForWrite);
  }
}, {
  pack(typedArray, allocateForWrite) {
    let constructor = typedArray.constructor;
    if (constructor !== ByteArray && this.moreTypes)
      writeExtBuffer(typedArray, typedArrays.indexOf(constructor.name), allocateForWrite);
    else
      writeBuffer(typedArray, allocateForWrite);
  }
}, {
  pack(c1, allocateForWrite) {
    let { target: target2, position: position3 } = allocateForWrite(1);
    target2[position3] = 193;
  }
}];
function writeExtBuffer(typedArray, type, allocateForWrite, encode2) {
  let length = typedArray.byteLength;
  if (length + 1 < 256) {
    var { target: target2, position: position3 } = allocateForWrite(4 + length);
    target2[position3++] = 199;
    target2[position3++] = length + 1;
  } else if (length + 1 < 65536) {
    var { target: target2, position: position3 } = allocateForWrite(5 + length);
    target2[position3++] = 200;
    target2[position3++] = length + 1 >> 8;
    target2[position3++] = length + 1 & 255;
  } else {
    var { target: target2, position: position3, targetView: targetView2 } = allocateForWrite(7 + length);
    target2[position3++] = 201;
    targetView2.setUint32(position3, length + 1);
    position3 += 4;
  }
  target2[position3++] = 116;
  target2[position3++] = type;
  target2.set(new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength), position3);
}
function writeBuffer(buffer2, allocateForWrite) {
  let length = buffer2.byteLength;
  var target2, position3;
  if (length < 256) {
    var { target: target2, position: position3 } = allocateForWrite(length + 2);
    target2[position3++] = 196;
    target2[position3++] = length;
  } else if (length < 65536) {
    var { target: target2, position: position3 } = allocateForWrite(length + 3);
    target2[position3++] = 197;
    target2[position3++] = length >> 8;
    target2[position3++] = length & 255;
  } else {
    var { target: target2, position: position3, targetView: targetView2 } = allocateForWrite(length + 5);
    target2[position3++] = 198;
    targetView2.setUint32(position3, length);
    position3 += 4;
  }
  target2.set(buffer2, position3);
}
function writeExtensionData(result, target2, position3, type) {
  let length = result.length;
  switch (length) {
    case 1:
      target2[position3++] = 212;
      break;
    case 2:
      target2[position3++] = 213;
      break;
    case 4:
      target2[position3++] = 214;
      break;
    case 8:
      target2[position3++] = 215;
      break;
    case 16:
      target2[position3++] = 216;
      break;
    default:
      if (length < 256) {
        target2[position3++] = 199;
        target2[position3++] = length;
      } else if (length < 65536) {
        target2[position3++] = 200;
        target2[position3++] = length >> 8;
        target2[position3++] = length & 255;
      } else {
        target2[position3++] = 201;
        target2[position3++] = length >> 24;
        target2[position3++] = length >> 16 & 255;
        target2[position3++] = length >> 8 & 255;
        target2[position3++] = length & 255;
      }
  }
  target2[position3++] = type;
  target2.set(result, position3);
  position3 += length;
  return position3;
}
function insertIds(serialized, idsToInsert) {
  let nextId;
  let distanceToMove = idsToInsert.length * 6;
  let lastEnd = serialized.length - distanceToMove;
  while (nextId = idsToInsert.pop()) {
    let offset = nextId.offset;
    let id = nextId.id;
    serialized.copyWithin(offset + distanceToMove, offset, lastEnd);
    distanceToMove -= 6;
    let position3 = offset + distanceToMove;
    serialized[position3++] = 214;
    serialized[position3++] = 105;
    serialized[position3++] = id >> 24;
    serialized[position3++] = id >> 16 & 255;
    serialized[position3++] = id >> 8 & 255;
    serialized[position3++] = id & 255;
    lastEnd = offset;
  }
  return serialized;
}
function writeBundles(start, pack3, incrementPosition) {
  if (bundledStrings2.length > 0) {
    targetView.setUint32(bundledStrings2.position + start, position2 + incrementPosition - bundledStrings2.position - start);
    bundledStrings2.stringsPosition = position2 - start;
    let writeStrings = bundledStrings2;
    bundledStrings2 = null;
    pack3(writeStrings[0]);
    pack3(writeStrings[1]);
  }
}
function prepareStructures(structures, packr) {
  structures.isCompatible = (existingStructures) => {
    let compatible = !existingStructures || (packr.lastNamedStructuresLength || 0) === existingStructures.length;
    if (!compatible)
      packr._mergeStructures(existingStructures);
    return compatible;
  };
  return structures;
}
function setWriteStructSlots(writeSlots, makeStructures) {
  writeStructSlots = writeSlots;
  prepareStructures = makeStructures;
}
var defaultPackr = new Packr({ useRecords: false });
var pack = defaultPackr.pack;
var encode = defaultPackr.pack;
var { NEVER, ALWAYS, DECIMAL_ROUND, DECIMAL_FIT } = FLOAT32_OPTIONS;
var REUSE_BUFFER_MODE = 512;
var RESET_BUFFER_MODE = 1024;

// ../../node_modules/.pnpm/msgpackr@1.7.2/node_modules/msgpackr/struct.js
var ASCII = 3;
var NUMBER = 0;
var UTF8 = 2;
var OBJECT_DATA = 1;
var DATE = 16;
var TYPE_NAMES = ["num", "object", "string", "ascii"];
TYPE_NAMES[DATE] = "date";
var float32Headers = [false, true, true, false, false, true, true, false];
var evalSupported;
try {
  new Function("");
  evalSupported = true;
} catch (error) {
}
var updatedPosition;
var hasNodeBuffer2 = typeof Buffer !== "undefined";
var textEncoder2;
var currentSource;
try {
  textEncoder2 = new TextEncoder();
} catch (error) {
}
var encodeUtf8 = hasNodeBuffer2 ? function(target2, string, position3) {
  return target2.utf8Write(string, position3, 4294967295);
} : textEncoder2 && textEncoder2.encodeInto ? function(target2, string, position3) {
  return textEncoder2.encodeInto(string, target2.subarray(position3)).written;
} : false;
var TYPE = Symbol("type");
var PARENT = Symbol("parent");
setWriteStructSlots(writeStruct, prepareStructures2);
function writeStruct(object, target2, position3, structures, makeRoom, pack3, packr) {
  let typedStructs = packr.typedStructs || (packr.typedStructs = []);
  let targetView2 = target2.dataView;
  let refsStartPosition = (typedStructs.lastStringStart || 100) + position3;
  let safeEnd2 = target2.length - 10;
  let start = position3;
  if (position3 > safeEnd2) {
    let lastStart = start;
    target2 = makeRoom(position3);
    targetView2 = target2.dataView;
    position3 -= lastStart;
    refsStartPosition -= lastStart;
    start = 0;
    safeEnd2 = target2.length - 10;
  }
  let refOffset, refPosition = refsStartPosition;
  let transition = typedStructs.transitions || (typedStructs.transitions = /* @__PURE__ */ Object.create(null));
  let nextId = typedStructs.nextId || typedStructs.length;
  let headerSize = nextId < 15 ? 1 : nextId < 240 ? 2 : nextId < 61440 ? 3 : nextId < 15728640 ? 4 : 0;
  if (headerSize === 0)
    return 0;
  position3 += headerSize;
  let queuedReferences = [];
  let usedAscii0;
  let keyIndex = 0;
  for (let key2 in object) {
    let value = object[key2];
    let nextTransition = transition[key2];
    if (!nextTransition) {
      transition[key2] = nextTransition = {
        key: key2,
        parent: transition,
        enumerationOffset: 0,
        ascii0: null,
        ascii8: null,
        num8: null,
        string16: null,
        object16: null,
        num32: null,
        float64: null,
        date64: null
      };
    }
    if (position3 > safeEnd2) {
      let lastStart = start;
      target2 = makeRoom(position3);
      targetView2 = target2.dataView;
      position3 -= lastStart;
      refsStartPosition -= lastStart;
      refPosition -= lastStart;
      start = 0;
      safeEnd2 = target2.length - 10;
    }
    switch (typeof value) {
      case "number":
        let number = value;
        if (number >> 0 === number && number < 536870912 && number > -520093696) {
          if (number < 246 && number >= 0 && (nextTransition.num8 || number < 32 && !nextTransition.num32)) {
            transition = nextTransition.num8 || createTypeTransition(nextTransition, NUMBER, 1);
            target2[position3++] = number;
          } else {
            transition = nextTransition.num32 || createTypeTransition(nextTransition, NUMBER, 4);
            targetView2.setUint32(position3, number, true);
            position3 += 4;
          }
          break;
        } else if (number < 4294967296 && number >= -2147483648) {
          targetView2.setFloat32(position3, number, true);
          if (float32Headers[target2[position3 + 3] >>> 5]) {
            let xShifted;
            if ((xShifted = number * mult10[(target2[position3 + 3] & 127) << 1 | target2[position3 + 2] >> 7]) >> 0 === xShifted) {
              transition = nextTransition.num32 || createTypeTransition(nextTransition, NUMBER, 4);
              position3 += 4;
              break;
            }
          }
        }
        transition = nextTransition.num64 || createTypeTransition(nextTransition, NUMBER, 8);
        targetView2.setFloat64(position3, number, true);
        position3 += 8;
        break;
      case "string":
        let strLength = value.length;
        refOffset = refPosition - refsStartPosition;
        if ((strLength << 2) + position3 > safeEnd2) {
          let lastStart = start;
          target2 = makeRoom(refPosition);
          targetView2 = target2.dataView;
          position3 -= lastStart;
          refsStartPosition -= lastStart;
          refPosition -= lastStart;
          start = 0;
          safeEnd2 = target2.length - 10;
        }
        if (strLength > 65280 + refOffset >> 2) {
          queuedReferences.push(key2, value, position3 - start);
          break;
        }
        let isNotAscii;
        let strStart = refPosition;
        if (strLength < 64) {
          let i, c1, c2;
          for (i = 0; i < strLength; i++) {
            c1 = value.charCodeAt(i);
            if (c1 < 128) {
              target2[refPosition++] = c1;
            } else if (c1 < 2048) {
              isNotAscii = true;
              target2[refPosition++] = c1 >> 6 | 192;
              target2[refPosition++] = c1 & 63 | 128;
            } else if ((c1 & 64512) === 55296 && ((c2 = value.charCodeAt(i + 1)) & 64512) === 56320) {
              isNotAscii = true;
              c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
              i++;
              target2[refPosition++] = c1 >> 18 | 240;
              target2[refPosition++] = c1 >> 12 & 63 | 128;
              target2[refPosition++] = c1 >> 6 & 63 | 128;
              target2[refPosition++] = c1 & 63 | 128;
            } else {
              isNotAscii = true;
              target2[refPosition++] = c1 >> 12 | 224;
              target2[refPosition++] = c1 >> 6 & 63 | 128;
              target2[refPosition++] = c1 & 63 | 128;
            }
          }
        } else {
          refPosition += encodeUtf8(target2, value, refPosition);
          isNotAscii = refPosition - strStart > strLength;
        }
        if (refOffset < 160 || refOffset < 246 && (nextTransition.ascii8 || nextTransition.string8)) {
          if (isNotAscii) {
            if (!(transition = nextTransition.string8)) {
              if (typedStructs.length > 10 && (transition = nextTransition.ascii8)) {
                transition.__type = UTF8;
                nextTransition.ascii8 = null;
                nextTransition.string8 = transition;
                pack3(null, 0, true);
              } else {
                transition = createTypeTransition(nextTransition, UTF8, 1);
              }
            }
          } else if (refOffset === 0 && !usedAscii0) {
            usedAscii0 = true;
            transition = nextTransition.ascii0 || createTypeTransition(nextTransition, ASCII, 0);
            break;
          } else if (!(transition = nextTransition.ascii8) && !(typedStructs.length > 10 && (transition = nextTransition.string8)))
            transition = createTypeTransition(nextTransition, ASCII, 1);
          target2[position3++] = refOffset;
        } else {
          transition = nextTransition.string16 || createTypeTransition(nextTransition, UTF8, 2);
          targetView2.setUint16(position3, refOffset, true);
          position3 += 2;
        }
        break;
      case "object":
        if (value) {
          if (value.constructor === Date) {
            transition = nextTransition.date64 || createTypeTransition(nextTransition, DATE, 8);
            targetView2.setFloat64(position3, value.getTime(), true);
            position3 += 8;
          } else {
            queuedReferences.push(key2, value, keyIndex);
          }
          break;
        } else {
          nextTransition = anyType(nextTransition, position3, targetView2, -10);
          if (nextTransition) {
            transition = nextTransition;
            position3 = updatedPosition;
          } else
            queuedReferences.push(key2, value, keyIndex);
        }
        break;
      case "boolean":
        transition = nextTransition.num8 || nextTransition.ascii8 || createTypeTransition(nextTransition, NUMBER, 1);
        target2[position3++] = value ? 249 : 248;
        break;
      case "undefined":
        nextTransition = anyType(nextTransition, position3, targetView2, -9);
        if (nextTransition) {
          transition = nextTransition;
          position3 = updatedPosition;
        } else
          queuedReferences.push(key2, value, keyIndex);
        break;
    }
    keyIndex++;
  }
  for (let i = 0, l = queuedReferences.length; i < l; ) {
    let key2 = queuedReferences[i++];
    let value = queuedReferences[i++];
    let propertyIndex = queuedReferences[i++];
    let nextTransition = transition[key2];
    if (!nextTransition) {
      transition[key2] = nextTransition = {
        key: key2,
        parent: transition,
        enumerationOffset: propertyIndex - keyIndex,
        ascii0: null,
        ascii8: null,
        num8: null,
        string16: null,
        object16: null,
        num32: null,
        float64: null
      };
    }
    let newPosition;
    if (value) {
      let size2;
      refOffset = refPosition - refsStartPosition;
      if (refOffset < 65280) {
        transition = nextTransition.object16;
        if (transition)
          size2 = 2;
        else if (transition = nextTransition.object32)
          size2 = 4;
        else {
          transition = createTypeTransition(nextTransition, OBJECT_DATA, 2);
          size2 = 2;
        }
      } else {
        transition = nextTransition.object32 || createTypeTransition(nextTransition, OBJECT_DATA, 4);
        size2 = 4;
      }
      newPosition = pack3(value, refPosition);
      if (typeof newPosition === "object") {
        refPosition = newPosition.position;
        targetView2 = newPosition.targetView;
        target2 = newPosition.target;
        refsStartPosition -= start;
        position3 -= start;
        start = 0;
      } else
        refPosition = newPosition;
      if (size2 === 2) {
        targetView2.setUint16(position3, refOffset, true);
        position3 += 2;
      } else {
        targetView2.setUint32(position3, refOffset, true);
        position3 += 4;
      }
    } else {
      transition = nextTransition.object16 || createTypeTransition(nextTransition, OBJECT_DATA, 2);
      targetView2.setInt16(position3, value === null ? -10 : -9, true);
      position3 += 2;
    }
    keyIndex++;
  }
  let recordId = transition[RECORD_SYMBOL];
  if (recordId == null) {
    recordId = packr.typedStructs.length;
    let structure = [];
    let nextTransition = transition;
    let key2, type;
    while ((type = nextTransition.__type) !== void 0) {
      let size2 = nextTransition.__size;
      nextTransition = nextTransition.__parent;
      key2 = nextTransition.key;
      let property = [type, size2, key2];
      if (nextTransition.enumerationOffset)
        property.push(nextTransition.enumerationOffset);
      structure.push(property);
      nextTransition = nextTransition.parent;
    }
    structure.reverse();
    transition[RECORD_SYMBOL] = recordId;
    packr.typedStructs[recordId] = structure;
    pack3(null, 0, true);
  }
  switch (headerSize) {
    case 1:
      if (recordId >= 16)
        return 0;
      target2[start] = recordId + 32;
      break;
    case 2:
      if (recordId >= 256)
        return 0;
      target2[start] = 56;
      target2[start + 1] = recordId;
      break;
    case 3:
      if (recordId >= 65536)
        return 0;
      target2[start] = 57;
      target2.setUint16(start + 1, recordId, true);
      break;
    case 4:
      if (recordId >= 16777216)
        return 0;
      target2.setUint32(start, (recordId << 8) + 58, true);
      break;
  }
  if (position3 < refsStartPosition) {
    if (refsStartPosition === refPosition)
      return position3;
    target2.copyWithin(position3, refsStartPosition, refPosition);
    refPosition += position3 - refsStartPosition;
    typedStructs.lastStringStart = position3 - start;
  } else if (position3 > refsStartPosition) {
    if (refsStartPosition === refPosition)
      return position3;
    typedStructs.lastStringStart = position3 - start;
    return writeStruct(object, target2, start, structures, makeRoom, pack3, packr);
  }
  return refPosition;
}
function anyType(transition, position3, targetView2, value) {
  let nextTransition;
  if (nextTransition = transition.ascii8 || transition.num8) {
    targetView2.setInt8(position3, value, true);
    updatedPosition = position3 + 1;
    return nextTransition;
  }
  if (nextTransition = transition.string16 || transition.object16) {
    targetView2.setInt16(position3, value, true);
    updatedPosition = position3 + 2;
    return nextTransition;
  }
  if (nextTransition = transition.num32) {
    targetView2.setUint32(position3, 3758096640 + value, true);
    updatedPosition = position3 + 4;
    return nextTransition;
  }
  if (nextTransition = transition.num64) {
    targetView2.setFloat64(position3, NaN, true);
    targetView2.setInt8(position3, value);
    updatedPosition = position3 + 8;
    return nextTransition;
  }
  updatedPosition = position3;
  return;
}
function createTypeTransition(transition, type, size2) {
  let typeName = TYPE_NAMES[type] + (size2 << 3);
  let newTransition = transition[typeName] || (transition[typeName] = /* @__PURE__ */ Object.create(null));
  newTransition.__type = type;
  newTransition.__size = size2;
  newTransition.__parent = transition;
  return newTransition;
}
function onLoadedStructures2(sharedData) {
  if (!(sharedData instanceof Map))
    return sharedData;
  let typed = sharedData.get("typed") || [];
  if (Object.isFrozen(typed))
    typed = typed.map((structure) => structure.slice(0));
  let named = sharedData.get("named");
  let transitions = /* @__PURE__ */ Object.create(null);
  for (let i = 0, l = typed.length; i < l; i++) {
    let structure = typed[i];
    let transition = transitions;
    for (let [type, size2, key2] of structure) {
      let nextTransition = transition[key2];
      if (!nextTransition) {
        transition[key2] = nextTransition = {
          key: key2,
          parent: transition,
          enumerationOffset: 0,
          ascii0: null,
          ascii8: null,
          num8: null,
          string16: null,
          object16: null,
          num32: null,
          float64: null,
          date64: null
        };
      }
      transition = createTypeTransition(nextTransition, type, size2);
    }
    transition[RECORD_SYMBOL] = i;
  }
  typed.transitions = transitions;
  this.typedStructs = typed;
  this.lastTypedStructuresLength = typed.length;
  return named;
}
var sourceSymbol = Symbol.for("source");
function readStruct2(src2, position3, srcEnd2, unpackr) {
  let recordId = src2[position3++] - 32;
  if (recordId >= 24) {
    switch (recordId) {
      case 24:
        recordId = src2[position3++];
        break;
      case 25:
        recordId = src2[position3++] + (src2[position3++] << 8);
        break;
      case 26:
        recordId = src2[position3++] + (src2[position3++] << 8) + (src2[position3++] << 16);
        break;
      case 27:
        recordId = src2[position3++] + (src2[position3++] << 8) + (src2[position3++] << 16) + (src2[position3++] << 24);
        break;
    }
  }
  let structure = unpackr.typedStructs && unpackr.typedStructs[recordId];
  if (!structure) {
    src2 = Uint8Array.prototype.slice.call(src2, position3, srcEnd2);
    srcEnd2 -= position3;
    position3 = 0;
    unpackr._mergeStructures(unpackr.getStructures());
    if (!unpackr.typedStructs)
      throw new Error("Could not find any shared typed structures");
    unpackr.lastTypedStructuresLength = unpackr.typedStructs.length;
    structure = unpackr.typedStructs[recordId];
    if (!structure)
      throw new Error("Could not find typed structure " + recordId);
  }
  var construct = structure.construct;
  if (!construct) {
    construct = structure.construct = function LazyObject() {
    };
    var prototype = construct.prototype;
    let properties = [];
    let currentOffset = 0;
    let lastRefProperty;
    for (let i = 0, l = structure.length; i < l; i++) {
      let definition = structure[i];
      let [type, size2, key2, enumerationOffset] = definition;
      if (key2 === "__proto__")
        key2 = "__proto_";
      let property = {
        key: key2,
        offset: currentOffset
      };
      if (enumerationOffset)
        properties.splice(i + enumerationOffset, 0, property);
      else
        properties.push(property);
      let getRef;
      switch (size2) {
        case 0:
          getRef = () => 0;
          break;
        case 1:
          getRef = (source, position4) => {
            let ref = source.bytes[position4 + property.offset];
            return ref >= 246 ? toConstant(ref) : ref;
          };
          break;
        case 2:
          getRef = (source, position4) => {
            let src3 = source.bytes;
            let dataView2 = src3.dataView || (src3.dataView = new DataView(src3.buffer, src3.byteOffset, src3.byteLength));
            let ref = dataView2.getUint16(position4 + property.offset, true);
            return ref >= 65280 ? toConstant(ref & 255) : ref;
          };
          break;
        case 4:
          getRef = (source, position4) => {
            let src3 = source.bytes;
            let dataView2 = src3.dataView || (src3.dataView = new DataView(src3.buffer, src3.byteOffset, src3.byteLength));
            let ref = dataView2.getUint32(position4 + property.offset, true);
            return ref >= 4294967040 ? toConstant(ref & 255) : ref;
          };
          break;
      }
      property.getRef = getRef;
      currentOffset += size2;
      let get;
      switch (type) {
        case ASCII:
          if (lastRefProperty && !lastRefProperty.next)
            lastRefProperty.next = property;
          lastRefProperty = property;
          property.multiGetCount = 0;
          get = function(source) {
            let src3 = source.bytes;
            let position4 = source.position;
            let refStart = currentOffset + position4;
            let ref = getRef(source, position4);
            if (typeof ref !== "number")
              return ref;
            let end, next2 = property.next;
            while (next2) {
              end = next2.getRef(source, position4);
              if (typeof end === "number")
                break;
              else
                end = null;
              next2 = next2.next;
            }
            if (end == null)
              end = source.bytesEnd - refStart;
            if (source.srcString) {
              return source.srcString.slice(ref, end);
            }
            return readString(src3, ref + refStart, end - ref);
          };
          break;
        case UTF8:
        case OBJECT_DATA:
          if (lastRefProperty && !lastRefProperty.next)
            lastRefProperty.next = property;
          lastRefProperty = property;
          get = function(source) {
            let position4 = source.position;
            let refStart = currentOffset + position4;
            let ref = getRef(source, position4);
            if (typeof ref !== "number")
              return ref;
            let src3 = source.bytes;
            let end, next2 = property.next;
            while (next2) {
              end = next2.getRef(source, position4);
              if (typeof end === "number")
                break;
              else
                end = null;
              next2 = next2.next;
            }
            if (end == null)
              end = source.bytesEnd - refStart;
            if (type === UTF8) {
              return src3.toString("utf8", ref + refStart, end + refStart);
            } else {
              currentSource = source;
              try {
                return unpackr.unpack(src3, { start: ref + refStart, end: end + refStart });
              } finally {
                currentSource = null;
              }
            }
          };
          break;
        case NUMBER:
          switch (size2) {
            case 4:
              get = function(source) {
                let src3 = source.bytes;
                let dataView2 = src3.dataView || (src3.dataView = new DataView(src3.buffer, src3.byteOffset, src3.byteLength));
                let position4 = source.position + property.offset;
                let value = dataView2.getInt32(position4, true);
                if (value < 536870912) {
                  if (value > -520093696)
                    return value;
                  if (value > -536870912)
                    return toConstant(value & 255);
                }
                let fValue = dataView2.getFloat32(position4, true);
                let multiplier = mult10[(src3[position4 + 3] & 127) << 1 | src3[position4 + 2] >> 7];
                return (multiplier * fValue + (fValue > 0 ? 0.5 : -0.5) >> 0) / multiplier;
              };
              break;
            case 8:
              get = function(source) {
                let src3 = source.bytes;
                let dataView2 = src3.dataView || (src3.dataView = new DataView(src3.buffer, src3.byteOffset, src3.byteLength));
                let value = dataView2.getFloat64(source.position + property.offset, true);
                if (isNaN(value)) {
                  let byte = src3[source.position + property.offset];
                  if (byte >= 246)
                    return toConstant(byte);
                }
                return value;
              };
              break;
            case 1:
              get = function(source) {
                let src3 = source.bytes;
                let value = src3[source.position + property.offset];
                return value < 246 ? value : toConstant(value);
              };
              break;
          }
          break;
        case DATE:
          get = function(source) {
            let src3 = source.bytes;
            let dataView2 = src3.dataView || (src3.dataView = new DataView(src3.buffer, src3.byteOffset, src3.byteLength));
            return new Date(dataView2.getFloat64(source.position + property.offset, true));
          };
          break;
      }
      property.get = get;
    }
    if (evalSupported) {
      let objectLiteralProperties = [];
      let args = [];
      let i = 0;
      for (let property of properties) {
        Object.defineProperty(prototype, property.key, { get: withSource(property.get), enumerable: true });
        let valueFunction = "v" + i++;
        args.push(valueFunction);
        objectLiteralProperties.push("[" + JSON.stringify(property.key) + "]:" + valueFunction + "(s)");
      }
      let toObject = new Function(...args, "return function(s){return{" + objectLiteralProperties.join(",") + "}}").apply(null, properties.map((prop) => prop.get));
      Object.defineProperty(prototype, "toJSON", {
        value() {
          return toObject(this[sourceSymbol]);
        }
      });
    } else {
      Object.defineProperty(prototype, "toJSON", {
        value() {
          let resolved = {};
          for (let i = 0, l = properties.length; i < l; i++) {
            let key2 = properties[i].key;
            resolved[key2] = this[key2];
          }
          return resolved;
        }
      });
    }
  }
  var instance = new construct();
  instance[sourceSymbol] = {
    bytes: src2,
    position: position3,
    srcString: "",
    bytesEnd: srcEnd2
  };
  return instance;
}
function toConstant(code) {
  switch (code) {
    case 246:
      return null;
    case 247:
      return void 0;
    case 248:
      return false;
    case 249:
      return true;
  }
  throw new Error("Unknown constant");
}
function withSource(get) {
  return function() {
    return get(this[sourceSymbol]);
  };
}
function saveState2() {
  if (currentSource) {
    currentSource.bytes = Uint8Array.prototype.slice.call(currentSource.bytes, currentSource.position, currentSource.bytesEnd);
    currentSource.position = 0;
    currentSource.bytesEnd = currentSource.bytes.length;
  }
}
function prepareStructures2(structures, packr) {
  if (packr.typedStructs) {
    let structMap = /* @__PURE__ */ new Map();
    structMap.set("named", structures);
    structMap.set("typed", packr.typedStructs);
    structures = structMap;
  }
  let lastTypedStructuresLength = packr.lastTypedStructuresLength || 0;
  structures.isCompatible = (existing) => {
    let compatible = true;
    if (existing instanceof Map) {
      let named = existing.get("named") || [];
      if (named.length !== (packr.lastNamedStructuresLength || 0))
        compatible = false;
      let typed = existing.get("typed") || [];
      if (typed.length !== lastTypedStructuresLength)
        compatible = false;
    } else if (existing instanceof Array) {
      if (existing.length !== (packr.lastNamedStructuresLength || 0))
        compatible = false;
    }
    if (!compatible)
      packr._mergeStructures(existing);
    return compatible;
  };
  packr.lastTypedStructuresLength = packr.typedStructs && packr.typedStructs.length;
  return structures;
}
setReadStruct(readStruct2, onLoadedStructures2, saveState2);

// ../../node_modules/.pnpm/msgpackr@1.7.2/node_modules/msgpackr/node-index.js
import { createRequire } from "module";
var nativeAccelerationDisabled = process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED !== void 0 && process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED.toLowerCase() === "true";
if (!nativeAccelerationDisabled) {
  let extractor;
  try {
    if (typeof __require == "function")
      extractor = require_msgpackr_extract();
    else
      extractor = createRequire(import.meta.url)("msgpackr-extract");
    if (extractor)
      setExtractor(extractor.extractStrings);
  } catch (error) {
  }
}

// ../../node_modules/.pnpm/@iuser+msgpack@0.0.1/node_modules/@iuser/msgpack/lib/index.js
var packer = new Packr({
  moreTypes: true,
  int64AsNumber: true
});
var pack2 = packer.pack.bind(packer);

// POST.js
var POST_exports = {};
__export(POST_exports, {
  auth: () => auth_exports,
  captcha: () => captcha_exports,
  test: () => test_exports
});

// POST/captcha.js
var captcha_exports = {};
__export(captcha_exports, {
  default: () => captcha_default
});

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.18/node_modules/@user.tax/captcha-img/src/bezier-spline.js
function computeControlPoints(K) {
  let p1 = new Array();
  let p2 = new Array();
  let n = K.length - 1;
  let a = new Array();
  let b2 = new Array();
  let c = new Array();
  let r = new Array();
  a[0] = 0;
  b2[0] = 2;
  c[0] = 1;
  r[0] = K[0] + 2 * K[1];
  for (let i = 1; i < n - 1; i++) {
    a[i] = 1;
    b2[i] = 4;
    c[i] = 1;
    r[i] = 4 * K[i] + 2 * K[i + 1];
  }
  a[n - 1] = 2;
  b2[n - 1] = 7;
  c[n - 1] = 0;
  r[n - 1] = 8 * K[n - 1] + K[n];
  for (let i = 1; i < n; i++) {
    let m = a[i] / b2[i - 1];
    b2[i] = b2[i] - m * c[i - 1];
    r[i] = r[i] - m * r[i - 1];
  }
  p1[n - 1] = r[n - 1] / b2[n - 1];
  for (let i = n - 2; i >= 0; --i)
    p1[i] = (r[i] - c[i] * p1[i + 1]) / b2[i];
  for (let i = 0; i < n - 1; i++)
    p2[i] = 2 * K[i + 1] - p1[i + 1];
  p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);
  return { p1, p2 };
}

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.18/node_modules/@user.tax/captcha-img/src/wave.js
var svgns = "http://www.w3.org/2000/svg";
function generatePoints(width, height, segmentCount, layerCount, variance) {
  const cellWidth = width / segmentCount;
  const cellHeight = height / layerCount;
  const moveLimitX = cellWidth * variance * Math.random();
  const moveLimitY = cellHeight * variance;
  const points = [];
  for (let y2 = cellHeight; y2 < height; y2 += cellHeight) {
    let pointsPerLayer = [];
    pointsPerLayer.push({ x: 0, y: Math.floor(y2) });
    for (let x = cellWidth; x < width; x += cellWidth) {
      const varietalY = y2 - moveLimitY / 2 + Math.random() * moveLimitY;
      const varietalX = x - moveLimitX / 2 + Math.random() * moveLimitX;
      pointsPerLayer.push({
        x: Math.floor(varietalX),
        y: Math.floor(varietalY)
      });
    }
    pointsPerLayer.push({ x: width, y: Math.floor(y2) });
    points.push(pointsPerLayer);
  }
  return points;
}
function generateClosedPath(curvePoints, leftCornerPoint, rightCornerPoint, filleColor, strokeColor, strokeWidth, transform, isAnimated, aniPoints, aniPoints1, aniPoints2) {
  const xPoints = curvePoints.map((p) => p.x);
  const yPoints = curvePoints.map((p) => p.y);
  const xControlPoints = computeControlPoints(xPoints);
  const yControlPoints = computeControlPoints(yPoints);
  const animatedPathList = isAnimated ? [] : void 0;
  let path = `M ${leftCornerPoint.x},${leftCornerPoint.y} C ${leftCornerPoint.x},${leftCornerPoint.y} ${xPoints[0]},${yPoints[0]} ${xPoints[0]},${yPoints[0]} `;
  for (let i = 0; i < xPoints.length - 1; i++) {
    path += `C ${xControlPoints.p1[i]},${yControlPoints.p1[i]} ${xControlPoints.p2[i]},${yControlPoints.p2[i]} ${xPoints[i + 1]},${yPoints[i + 1]} `;
  }
  path += `C ${xPoints[xPoints.length - 1]},${yPoints[xPoints.length - 1]} ${rightCornerPoint.x},${rightCornerPoint.y} ${rightCornerPoint.x},${rightCornerPoint.y} Z`;
  const animationPoints = [aniPoints, aniPoints1, aniPoints2];
  if (isAnimated) {
    animationPoints.forEach((points) => {
      const aniYPoints = points.map((p) => p.y);
      const aniXPoints = points.map((p) => p.x);
      const [aniXControlPoints, aniYControlPoints] = [
        computeControlPoints(aniXPoints),
        computeControlPoints(aniYPoints)
      ];
      let animatedPath = `M ${leftCornerPoint.x},${leftCornerPoint.y} C ${leftCornerPoint.x},${leftCornerPoint.y} ${aniXPoints[0]},${aniYPoints[0]} ${aniXPoints[0]},${aniYPoints[0]} `;
      for (let i = 0; i < xPoints.length - 1; i++) {
        animatedPath += `C ${aniXControlPoints.p1[i]},${aniYControlPoints.p1[i]} ${aniXControlPoints.p2[i]},${aniYControlPoints.p2[i]} ${aniXPoints[i + 1]},${aniYPoints[i + 1]} `;
      }
      animatedPath += `C ${aniXPoints[xPoints.length - 1]},${aniYPoints[xPoints.length - 1]} ${rightCornerPoint.x},${rightCornerPoint.y} ${rightCornerPoint.x},${rightCornerPoint.y} Z`;
      animatedPathList.push(animatedPath);
    });
  }
  return {
    fill: filleColor,
    strokeColor,
    strokeWidth,
    d: path,
    transform,
    animatedPath: animatedPathList
  };
}
var Wavery = class {
  constructor(properties) {
    this.properties = properties;
    this.points = generatePoints(
      this.properties.width,
      this.properties.height,
      this.properties.segmentCount,
      this.properties.layerCount,
      this.properties.variance
    );
    this.aniPoints = [
      this.properties.animated && generatePoints(
        this.properties.width,
        this.properties.height,
        this.properties.segmentCount,
        this.properties.layerCount,
        this.properties.variance
      ),
      this.properties.animated && generatePoints(
        this.properties.width,
        this.properties.height,
        this.properties.segmentCount,
        this.properties.layerCount,
        this.properties.variance
      ),
      this.properties.animated && generatePoints(
        this.properties.width,
        this.properties.height,
        this.properties.segmentCount,
        this.properties.layerCount,
        this.properties.variance
      )
    ];
  }
  generateSvg() {
    const pathList = [];
    for (let i = 0; i < this.points.length; i++) {
      const pathData = generateClosedPath(
        this.points[i],
        { x: 0, y: this.properties.height },
        { x: this.properties.width, y: this.properties.height },
        this.properties.fillColor,
        this.properties.strokeColor,
        this.properties.strokeWidth,
        this.properties.transform,
        this.properties.animated,
        this.properties.animated ? this.aniPoints[0][i] : null,
        this.properties.animated ? this.aniPoints[1][i] : null,
        this.properties.animated ? this.aniPoints[2][i] : null
      );
      pathList.push(pathData);
    }
    const svgData = {
      svg: {
        width: this.properties.width,
        height: this.properties.height,
        xmlns: svgns,
        path: pathList
      }
    };
    return svgData;
  }
};

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.18/node_modules/@user.tax/captcha-img/src/D.js
var D_default = ["M-3.514 426.203a25.776 25.776 0 0 1-9.469-28.406l4.209-13.15a25.776 25.776 0 0 1 23.145-18.412l335.82-26.828L479.019 29.941a26.828 26.828 0 0 1 26.775-16.886h13.677a25.776 25.776 0 0 1 24.723 16.833l129.3 309.572 335.82 26.828a25.776 25.776 0 0 1 23.146 18.41l4.208 13.152a25.776 25.776 0 0 1-7.89 28.406L775.49 643.823l77.8 326.142a26.828 26.828 0 0 1-9.994 27.88l-15.255 8.416a26.302 26.302 0 0 1-29.406 0l-285.9-173.591-287.583 175.327a26.302 26.302 0 0 1-29.405 0l-11.573-7.89a26.828 26.828 0 0 1-9.994-27.88l75.696-328.456z", "M0 512 25.472 31.36 512 0l512 512-512 512L0 512zm293.376-128.96a85.952 85.952 0 1 0 0-171.904 85.952 85.952 0 0 0 0 171.904z", "M1019.323 20.153a42.75 42.75 0 0 1 5.301 28.514L879.7 931.47a42.75 42.75 0 0 1-57.97 32.747L554.152 857.64l-110.724 149.97a42.75 42.75 0 0 1-77.208-25.352V810.657a85.501 85.501 0 0 1 19.195-54.037l374.497-459.57a12.825 12.825 0 0 0-18.426-17.742l-462.05 405.79a85.501 85.501 0 0 1-88.836 14.877L25.54 632.301a42.75 42.75 0 0 1-5.387-76.439L960.84 4.848a42.75 42.75 0 0 1 58.483 15.305z", "M305.193 884.733c-4.542 0-8.817-2.405-11.222-6.413L86.897 518.413c-2.404-4.008-2.404-8.818 0-12.826L293.971 145.68a13.092 13.092 0 0 1 11.222-6.413h413.614a13.092 13.092 0 0 1 11.222 6.413l207.074 359.907a12.29 12.29 0 0 1 0 12.826L730.029 878.32a13.092 13.092 0 0 1-11.222 6.413H305.193M512 270.191c-133.329 0-241.809 108.48-241.809 241.809S378.671 753.809 512 753.809 753.809 645.329 753.809 512 645.329 270.191 512 270.191M305.193 966.227h413.614c33.666 0 64.927-18.17 81.76-47.293l207.074-359.908a93.891 93.891 0 0 0 0-94.052L800.568 105.066c-16.834-29.124-48.095-47.293-81.761-47.293H305.193c-33.666 0-64.927 18.17-81.76 47.293L16.358 464.974a93.895 93.895 0 0 0 0 94.052l207.073 359.908a94.72 94.72 0 0 0 81.761 47.293zM512 351.685c88.44 0 160.315 71.874 160.315 160.315S600.441 672.315 512 672.315 351.685 600.441 351.685 512 423.559 351.685 512 351.685z", "M42.67 213.336 512 0l469.33 213.336v597.328L512 1024 42.67 810.664V213.336zm426.67 240.656-341.333-154.99v456.654L469.34 910.994V454.012zm426.651 301.664V299.002L554.66 453.992v456.981zM826.67 236.662 512 93.674 197.331 236.662 512 379.651z", "M512 2.276c144.18 3.786 264.183 53.666 360.084 149.567 95.974 96.047 145.854 216.05 149.64 360.157-3.786 144.18-53.666 264.183-149.64 360.084-95.901 95.974-215.905 145.854-360.084 149.64-144.18-3.786-264.183-53.666-360.157-149.64C56.015 776.183 6.135 656.179 2.276 512c3.786-144.18 53.666-264.183 149.567-360.157C247.89 56.015 367.893 6.135 512 2.276zm-43.18 466.543H300.391a41.797 41.797 0 0 0-30.73 12.452 41.797 41.797 0 0 0-12.524 30.802c0 12.088 4.15 22.355 12.524 30.656a41.797 41.797 0 0 0 30.73 12.525h168.427V723.68c0 12.16 4.15 22.355 12.452 30.73a41.797 41.797 0 0 0 30.802 12.524 41.797 41.797 0 0 0 30.656-12.525 41.797 41.797 0 0 0 12.525-30.729V555.254H723.68a41.797 41.797 0 0 0 30.73-12.452 41.797 41.797 0 0 0 12.524-30.73 41.797 41.797 0 0 0-12.525-30.728 41.797 41.797 0 0 0-30.729-12.525H555.254V300.392a41.797 41.797 0 0 0-12.452-30.73A41.797 41.797 0 0 0 512 257.138a41.797 41.797 0 0 0-30.73 12.524 41.797 41.797 0 0 0-12.524 30.73v168.427z", "M512 3.848C231.61 3.848 3.848 231.61 3.848 512S231.61 1020.152 512 1020.152 1020.152 792.39 1020.152 512 792.39 3.848 512 3.848zm0 725.931c-120.686 0-217.78-97.093-217.78-217.779S391.315 294.22 512 294.22 729.78 391.315 729.78 512 632.685 729.78 512 729.78z", "M515.006 127.243c141.94 0 257.005 114.844 257.005 256.507h.5c141.662 0 256.506 114.838 256.506 256.5 0 141.663-114.844 256.507-256.507 256.507H257.501C115.84 896.757.995 781.913.995 640.25s114.844-256.5 256.506-256.5h.5c0-141.663 115.066-256.507 257.005-256.507z", "M541.458 502.308v392.645a147.29 147.29 0 0 1-147.29 147.29 29.458 29.458 0 0 1 0-58.916 88.374 88.374 0 0 0 88.374-88.374V502.308a132.56 132.56 0 0 0-223.586 27.985h-.088a12.844 12.844 0 0 1-24.067-.206h-.089a132.56 132.56 0 0 0-227.12-23.065 11.282 11.282 0 0 1-9.721 5.832c-6.334 0-11.46-5.538-11.46-12.372 0-1.178.148-2.298.442-3.358 34.584-248.39 241.26-441.722 495.69-455.656V11.215a29.458 29.458 0 0 1 58.915 0v30.253c254.782 13.963 461.665 207.767 495.836 456.657h-.118l.03.972a11.93 11.93 0 0 1-22.359 5.863 132.56 132.56 0 0 0-224.676 23.271v-.03a13.256 13.256 0 0 1-26.365-.794h-.117a132.56 132.56 0 0 0-222.231-25.099z", "M742.912 34.086c-97.532 0-182.066 51.37-230.832 127.834-48.9-76.465-133.426-127.834-230.83-127.834-152.024 0-275.303 123.153-275.303 275.176 0 39.271 6.113 76.465 20.933 110.276 102.087 231.877 275.83 428.372 485.2 566.745C721.325 847.91 895.069 651.415 997.247 419.538c14.83-33.811 20.808-71.005 20.808-110.276 0-152.023-123.12-275.176-275.143-275.176z", "M763.374 323.47h-188.53v345.639c0 86.724-70.385 157.109-157.11 157.109-86.724 0-157.108-70.385-157.108-157.109S331.01 512 417.735 512c35.82 0 67.87 11.94 94.265 31.422v-345.64h251.374M951.905-53.592H72.095C2.967-53.592-53.592 2.967-53.592 72.095v879.81c0 69.128 56.559 125.687 125.687 125.687h879.81c69.128 0 125.687-56.559 125.687-125.687V72.095c0-69.128-56.559-125.687-125.687-125.687Z", "M851.899 342.05a169.95 169.95 0 0 0-145.024 81.576L600.374 317.125a169.95 169.95 0 1 0-176.748 0L317.125 423.626a169.95 169.95 0 1 0 0 176.748l106.501 106.501a169.95 169.95 0 1 0 176.748 0l106.501-106.501A169.95 169.95 0 1 0 851.9 342.05zM455.35 172.102a56.65 56.65 0 1 1 56.65 56.65 56.65 56.65 0 0 1-56.65-56.65zM172.101 568.65a56.65 56.65 0 1 1 56.65-56.65 56.65 56.65 0 0 1-56.65 56.65zM568.65 851.899a56.65 56.65 0 1 1-56.65-56.65 56.65 56.65 0 0 1 56.65 56.65zM512 634.93 389.07 512 512 389.07 634.93 512zm339.899-66.28a56.65 56.65 0 1 1 56.65-56.65 56.65 56.65 0 0 1-56.65 56.65z", "M912.498 401.636H623.502V112.64c0-60.644-49.72-110.364-110.364-110.364S402.773 51.996 402.773 112.64v288.996H113.778C53.134 401.636 3.413 451.243 3.413 512c0 60.644 49.721 110.364 110.365 110.364h288.995V911.36c0 60.644 49.721 110.364 110.365 110.364s110.364-49.72 110.364-110.364V622.364h288.996c60.643 0 110.364-49.72 110.364-110.364 0-60.757-49.72-110.364-110.364-110.364z"];

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.18/node_modules/@user.tax/captcha-img/src/pattern.js
var pattern_default = [
  [
    50,
    "M31.875 0c0 .885-.165 1.797-.508 2.617-.347.83-.896 1.583-1.523 2.227-.527.54-1.144 1.026-1.836 1.328-1.095.478-2.358.405-3.516.703-.754.194-1.547.323-2.226.703-.693.388-1.328.912-1.797 1.563-.756 1.214-1.03 2.15-1.094 3.476-.031 1.227-.498 2.465-.977 3.399-.466.773-1.118 1.443-1.835 1.992a6.679 6.679 0 01-1.954 1.015c-.7.232-1.462.213-2.187.352-.76.146-1.56.189-2.266.508a5.787 5.787 0 00-1.875 1.367 6.02 6.02 0 00-1.172 2.07 5.528 5.528 0 00-.195 2.344c.104.781.352 1.497.742 2.148.39.678.894 1.222 1.485 1.68.473.368 1.033.63 1.601.82.564.19 1.173.204 1.758.313.874.162 1.794.172 2.617.508.81.33 1.555.842 2.188 1.445.526.501.95 1.107 1.289 1.758.338.651.573 1.341.703 2.07.13.86.104 1.732-.078 2.617a7.252 7.252 0 01-1.055 2.383 6.78 6.78 0 01-2.031 1.914c-1.234.697-2.193.956-3.516 1.016-1.234.046-2.539.483-3.398 1.094A5.179 5.179 0 007.46 47.5c-.365.677-.56 1.51-.586 2.5H0v-6.875a6.315 6.315 0 002.305-.508 5.458 5.458 0 001.914-1.406 5.645 5.645 0 001.133-1.992 5.764 5.764 0 00.234-2.305 6.076 6.076 0 00-.664-2.187 5.666 5.666 0 00-1.524-1.72 5.648 5.648 0 00-1.601-.859C1.222 31.95 0 31.836 0 31.836V18.125c.99-.026 1.862-.247 2.617-.664a5.471 5.471 0 002.188-2.031c.547-.886.82-1.836.82-2.852a6.27 6.27 0 01.508-2.656c.338-.86.82-1.615 1.445-2.266a7.086 7.086 0 012.266-1.523c.86-.365 1.77-.344 2.656-.508.65-.12 1.333-.121 1.953-.352a5.43 5.43 0 001.719-1.015c.596-.533 1.112-1.188 1.445-1.914A5.656 5.656 0 0018.125 0m0 50c0-1.146.286-2.253.86-3.32a6.173 6.173 0 012.304-2.461 6.164 6.164 0 012.383-.977 6.33 6.33 0 012.617 0c.86.156 1.667.469 2.422.938a6.861 6.861 0 011.875 1.797c.417.572.742 1.21.977 1.914.208.677.312 1.38.312 2.109m11.25 0c0-.625-.084-1.221-.273-1.797a5.078 5.078 0 00-.82-1.562c-.493-.623-1.068-1.172-1.798-1.563a5.758 5.758 0 00-2.265-.703l-.625-.04-.625-.038a6.61 6.61 0 01-2.227-.625 7.299 7.299 0 01-1.914-1.367 6.453 6.453 0 01-1.445-2.227 6.79 6.79 0 01-.508-2.578c0-.625-.104-1.237-.312-1.836a5.595 5.595 0 00-.899-1.64c-.495-.678-1.146-1.211-1.953-1.602A5.752 5.752 0 0025 31.875a6.618 6.618 0 01-3.125-.781c-1.016-.521-1.836-1.224-2.46-2.11a6.42 6.42 0 01-1.095-2.421 7.03 7.03 0 01-.117-2.657 8.07 8.07 0 01.664-2.031 7.113 7.113 0 011.29-1.758 6.875 6.875 0 012.187-1.484c.808-.338 1.702-.484 2.578-.508a6.68 6.68 0 012.226.312c.715.232 1.402.59 1.993 1.055a7.293 7.293 0 011.757 1.992c.451.763.769 1.615.899 2.5l.078.86.04.82c.13.964.468 1.836 1.015 2.617a5.85 5.85 0 001.68 1.524c.64.381 1.373.624 2.109.742a5.397 5.397 0 001.797-.04c.583-.105 1.17-.28 1.68-.585.758-.455 1.456-1.065 1.952-1.797 1.305-2.082.736-4.545 1.914-6.602a7.282 7.282 0 011.797-2.03c.579-.452 1.25-.782 1.953-1.016L50 18.125v13.71a6.166 6.166 0 00-2.344.548 5.254 5.254 0 00-1.914 1.445 5.192 5.192 0 00-1.133 2.031 5.578 5.578 0 00-.195 2.305c.088.736.338 1.464.703 2.11a5.862 5.862 0 001.406 1.64 5.461 5.461 0 001.641.899c.586.203 1.836.312 1.836.312V50m0-43.125a6.46 6.46 0 01-2.617-.547 6.193 6.193 0 01-2.227-1.484 6.648 6.648 0 01-1.523-2.227A7.086 7.086 0 0143.125 0H50M36.29 5.703a6.769 6.769 0 012.616.04c.86.185 1.692.562 2.422 1.054a7.035 7.035 0 011.875 1.836c.487.713.809 1.544 1.016 2.383.153.621.2 1.275.156 1.914a6.129 6.129 0 01-.43 1.914c-.372.897-.879 1.77-1.562 2.46-.688.697-1.554 1.236-2.461 1.602-.762.308-1.6.469-2.422.469a6.79 6.79 0 01-2.422-.469 7.08 7.08 0 01-2.187-1.328 7.137 7.137 0 01-1.563-2.07c-.33-.655-.526-1.383-.625-2.11-.098-.722-.106-1.472.04-2.187a7.196 7.196 0 01.976-2.422c.47-.737 1.079-1.414 1.797-1.914a7.024 7.024 0 012.773-1.172M0 0h6.875c0 .885-.17 1.758-.508 2.617a6.648 6.648 0 01-1.523 2.227 6.193 6.193 0 01-2.227 1.484A6.46 6.46 0 010 6.875z"
  ],
  [
    100,
    "M100 20.234v41.641q-6.719 7.656-10.234 17.812-3.36 9.766-3.125 20.313h-3.438v-4.531q0-2.657.39-4.532l.626-3.359.703-3.281 2.265-7.656q1.329-4.22 2.813-7.344.781-1.719 2.812-4.453l2.891-4.297.86-2.578.312-2.735q.156-5-.547-13.203l-2.344-20.937Q92.656 8.516 92.422 0h6.797q-.078 6.172.078 10.156.156 5.547.703 10.078m0 49.532v20.468q-.469 2.11-.703 4.844L99.063 100H92.5l-.078-8.594q0-5.156.547-8.515.469-3.047 2.89-6.797L100 69.766M79.219 100h-3.672l.39-8.36.938-8.359q1.016-6.953 1.875-10.781 1.328-5.86 3.36-10.313l2.5-6.015 1.562-6.328.547-5q.078-2.813-.703-4.844l-3.282-9.531-3.28-9.531q-1.876-6.094-2.735-10.313Q75.547 4.922 75.547 0h3.672q.078 8.516 2.422 17.031 2.343 8.282 6.718 15.782l-2.03-11.016-1.876-11.016-.86-5.312L83.126 0h3.516l.234 4.531.547 4.532 2.5 16.25 2.422 16.328q1.015 8.125.156 15.625l-.625 3.28q-.547 1.798-1.562 2.97l-1.875 1.953q-1.094 1.172-1.641 2.187-1.64 2.735-2.89 7.813l-2.423 8.047q-1.406 3.515-1.875 8.125-.39 3.125-.39 8.359m-6.406 0H64.53q-2.11-9.922-1.718-18.828.39-4.922 1.796-8.203l2.97-7.5q1.405-4.219 1.718-7.89.312-2.735-.39-5.313-.704-2.657-2.345-4.844-2.343-3.125-5.78-6.328l-.938 2.5-.86 2.656q-2.343 6.797-4.922 11.953-3.125 6.25-7.03 10.86-1.485 2.265-2.579 5.312-.781 2.344-1.484 5.781Q41.25 88.75 41.25 100h-6.484l.312-12.266q.39-6.718 1.64-12.265 1.72-7.344 4.844-11.407l2.344-2.5 2.344-2.5q2.5-2.968 3.906-6.875 1.328-3.671 1.485-7.734.156-5.156-.86-12.5L48.906 19.61Q47.578 8.516 47.97 0h10.078q-.625 12.188 1.875 22.11 2.422 9.218 8.515 16.25l5 5.234q3.047 3.203 4.375 5.781 2.657 4.922.938 12.266-1.016 4.609-3.906 10.859-1.172 2.578-1.797 5.86-.547 2.5-.781 6.093-.391 7.266.546 15.547m-14.765 0H47.969V89.453q.312-5.937 1.718-10.39 4.297-12.657 10.157-22.813l1.797-3.047 2.109-2.812q1.25 4.687-1.094 11.562-5.625 16.953-4.61 38.047m-29.296 0H17.969l.234-5.781.469-5.782L21.25 65.86l2.422-22.578q1.172-12.031-1.875-21.797-1.719 3.047-2.969 7.5l-2.031 7.813q-.469 1.719-.547 4.219l.078 4.218-.547 11.094-1.797 10.469Q12.5 74.062 12.11 77.266q-.39 2.734-.312 6.406l.234 6.406.39 5q.235 2.813.704 4.922H5.781V81.25l-.078-6.016Q1.563 81.797 0 89.844v-20.39q5.86-10.47 7.422-22.657 1.25-9.14.078-23.36L6.406 11.72Q5.86 4.844 5.781 0h7.344l1.406 11.328 1.094 11.328q1.25-2.422 1.797-6.015l.625-6.25.078-5.157L17.969 0h10.86q.077 2.969.702 6.953l1.172 6.797 1.64 11.094q.626 6.172.157 11.172-.547 4.297-2.031 9.687L27.5 55.078q-2.031 6.719-2.344 14.531-.078 3.75.625 8.36l1.563 8.203.703-2.422 4.531-18.672q2.344-10.312 3.594-18.828.625-3.984.625-9.062l-.313-9.141-1.093-13.984Q34.688 5.547 34.766 0h6.484q-.078 8.984 1.953 19.688l1.64 8.75q.938 5.078.938 8.75 0 3.828-1.015 7.5-.938 3.671-2.813 6.874-4.61 9.375-7.812 20.47-2.813 9.687-4.766 21.405-.703 3.75-.625 6.563M0 61.797V19.766l.781 4.375.703 4.453 2.344 13.984.235 1.563.234 2.343Q5.078 54.61 0 61.797M64.61 0h8.202q-.39 7.266.157 11.953l.86 4.531 1.25 4.532 3.593 13.672 3.36 13.671.546 2.657.156 2.656-2.343-6.406q-1.407-3.516-3.047-6.172l-4.14-6.64-4.298-6.563q-1.172-1.953-1.875-4.61-.547-1.875-.937-4.922Q64.844 9.453 64.609 0"
  ],
  [
    300,
    "M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
  ]
];

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.18/node_modules/@user.tax/captcha-img/src/index.js
var random = (base2, offset = 0) => Math.random() * base2 + offset;
var randomInt = (base2, offset = 0) => parseInt(random(base2, offset));
var src_default = (width, height) => {
  height = height || width;
  const layerCount = randomInt(6, 6), segmentCount = random(10, 5), wave = new Wavery({
    width,
    height,
    segmentCount,
    layerCount,
    variance: random(10, 0.1),
    strokeWidth: 0,
    strokeColor: "none"
  }), { svg } = wave.generateSvg(), path = [], randomColor = (base2) => {
    var i = 0, r = [], n2 = 0;
    while (++i < 4) {
      r.unshift(randomInt(255));
      n2 += r[0];
    }
    n2 = n2 / base2 / 3;
    r = r.map((i2) => {
      i2 = Math.round(i2 / n2);
      if (i2 > 255) {
        i2 = 255;
      }
      return i2;
    });
    return r.map((i2) => {
      i2 = i2.toString(16);
      if (i2.length < 2) {
        i2 = "0" + i2;
      }
      return i2;
    }).join("");
  }, opstep = 0.5 / layerCount, ico_n = randomInt(4, 4);
  svg.path.reverse();
  var n = 0, opacity = 0.5;
  for (const i of svg.path) {
    path.push(
      `<path d="${i.d}" stroke-dasharray="${randomInt(
        20
      )}" stroke="rgba(${randomInt(255)},${randomInt(255)},${randomInt(255)},${randomInt(30) / 100})" stroke-width="${randomInt(3)}px" fill="url(#bg${++n % 4})" fill-opacity="${opacity}" transform="rotate(${n % 2 ? 180 : 0} ${width / 2} ${height / 2})"></path>`
    );
    opacity -= opstep;
  }
  const size2 = randomInt(Math.round(height / 20), Math.round(height / 10)), box_h = randomInt(height - size2), box_w = randomInt(width - size2), block_y = box_h, block_x = box_w, d_n = randomInt(D_default.length);
  path.splice(
    parseInt(layerCount / 2),
    0,
    `<svg viewBox="0 0 1024 1024" x="${block_x}" y="${block_y}" width="${size2}" height="${size2}"><path d="${D_default[d_n]}" fill="url(#ico)" fill-opacity=".65" transform="skewX(${randomInt(
      20,
      -10
    )}) skewY(${randomInt(20, -10)})"></path></svg>`
  );
  path.push(
    `<rect fill-opacity="${randomInt(30) / 100}" height="100%" width="100%" fill="url(#bg2)"></rect>`
  );
  const [psize, pattern] = pattern_default[randomInt(pattern_default.length)], color = [randomColor(70), randomColor(225)];
  if (Math.random() < 0.5) {
    color.reverse();
  }
  return [
    `<svg
	viewBox="0 0 ${width} ${height}"
	xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="bg0" x1="50%" y1="0" x2="50%" y2="100%">
			<stop offset="0%" stop-color="#${color[0]}"></stop>
			<stop offset="100%" stop-color="#${color[1]}"></stop>
		</linearGradient>
		<linearGradient id="bg1" x1="0%" y1="50%" x2="100%" y2="50%">
			<stop offset="100%" stop-color="#${color[0]}"></stop>
			<stop offset="0%" stop-color="#${color[1]}"></stop>
		</linearGradient>
		<linearGradient id="bg2" x1="0%" y1="0" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#${color[0]}"></stop>
			<stop offset="100%" stop-color="#${color[1]}"></stop>
		</linearGradient>
    <pattern id="ico" patternTransform="scale(${randomInt(10, 5) / 100})" width="1024px" height="1024px" patternUnits="userSpaceOnUse">
    <path fill="${color[0]}" d="M322.56 400.32c25.6-70.4-18.88-190.4-37.44-234.56a17.28 17.28 0 0 0-24-8.64c-42.56 22.08-153.6 85.44-179.2 155.84a128 128 0 1 0 240.64 87.68z m196.16 32C448 469.44 265.6 573.44 224 689.28A210.56 210.56 0 1 0 619.52 832c42.24-115.84-32-313.28-61.44-385.92a28.48 28.48 0 0 0-39.36-12.8zM893.76 64a21.44 21.44 0 0 0-29.76-9.6c-52.8 27.52-192 105.92-224 192a160 160 0 1 0 298.88 108.8c32.96-86.08-22.4-235.2-45.12-291.2z"></path>
	  </pattern>
    <pattern id="p" patternTransform="scale(${randomInt(100) / 25 + 0.5}) rotate(${randomInt(360)})" width="${psize}px" height="${psize}px" patternUnits="userSpaceOnUse">
    <path fill="url(#bg2)" d="${pattern}"></path>
	  </pattern>
  </defs>
  <rect fill-opacity="${randomInt(30) / 100}" height="100%" width="100%" fill="url(#p)"></rect>
  ${path.join("\n")}
</svg>`,
    d_n,
    block_x,
    block_y,
    size2
  ];
};

// ../../node_modules/.pnpm/@iuser+u8@0.0.8/node_modules/@iuser/u8/lib/index.js
var u8eq = (first, second) => {
  return first.length === second.length && first.every((value, index) => {
    return value === second[index];
  });
};
var u8merge = (...args) => {
  var i, m, n;
  n = 0;
  for (i of args) {
    n += i.length;
  }
  m = new Uint8Array(n);
  n = 0;
  for (i of args) {
    m.set(i, n);
    n += i.length;
  }
  return m;
};
var U8 = (args) => {
  return new Uint8Array(args);
};

// db/redis/key.js
var key_exports = {};
__export(key_exports, {
  R_CAPTCHA: () => R_CAPTCHA,
  R_CAPTCHA_IP_LIMIT: () => R_CAPTCHA_IP_LIMIT,
  R_CLIENT_ORG: () => R_CLIENT_ORG,
  R_CONF: () => R_CONF,
  R_HOST_ORG: () => R_HOST_ORG,
  R_ID: () => R_ID,
  R_MAIL: () => R_MAIL,
  R_MAIL_BAN_HOST: () => R_MAIL_BAN_HOST,
  R_MAIL_HOST: () => R_MAIL_HOST,
  R_ORG: () => R_ORG,
  R_USER_NAME: () => R_USER_NAME
});

// ../../node_modules/.pnpm/@iuser+utf8@0.0.1/node_modules/@iuser/utf8/lib/index.js
var DECODER;
var ENCODER;
ENCODER = new TextEncoder();
var utf8e = ENCODER.encode.bind(ENCODER);
DECODER = new TextDecoder();
var utf8d = DECODER.decode.bind(DECODER);

// db/redis/key.js
var $;
var wrap;
wrap = (...args) => {
  var r;
  r = args[0];
  if (Array.isArray(r)) {
    r = U8(r);
  } else {
    r = utf8e(r);
  }
  if (args[1]) {
    r.bind = args[1];
  }
  return r;
};
$ = new Proxy(wrap, {
  get: (_, name2) => {
    return wrap(name2.slice(2).toLowerCase().replace(/_./g, (x) => {
      return x.slice(1).toUpperCase();
    }));
  }
});
var R_CAPTCHA = $([1], "setex getB del exist");
var R_CAPTCHA_IP_LIMIT = $([2], "ipLimit");
var R_CLIENT_ORG = $([3], "zadd exist");
var R_USER_NAME = $([4], "hget hset");
var R_MAIL = utf8e("{mail}");
var R_MAIL_HOST = utf8e("{mail}host");
var R_ORG = utf8e("{org}");
var R_HOST_ORG = utf8e("host{org}");
var {
  R_CONF,
  R_MAIL_BAN_HOST,
  R_ID
} = $;

// db/redis/lua.js
var lua_default = (R2, redis2) => {
  var args;
  R2.fboolR.hasHost;
  R2.fnum.zid;
  redis2.ipLimit = R2.fnum.ipLimit;
  args = [R_MAIL_HOST, R_MAIL];
  redis2.mailIdNew = R2.fnum.mailIdNew(...args);
  redis2.mailId = R2.fnum.mailId(...args);
  redis2.idMail = R2.fstrR.idMail(...args);
  redis2.hostOrg = R2.fnum.hostOrg(R_HOST_ORG, R_ORG);
};

// db/redis/init.js
var _prefix;
var key;
_prefix = (prefix, f) => {
  return (k, ...args) => {
    if (typeof k === "string" || k instanceof String) {
      k = utf8e(k);
    }
    return f(u8merge(prefix, k), ...args);
  };
};
key = (prefix) => {
  return u8merge(prefix, U8([0]));
};
var init_default = (redis2, lua) => {
  lua(new Proxy({}, {
    get: (self2, rtype) => {
      return new Proxy({}, {
        get: (self3, func) => {
          var f;
          f = redis2[rtype].bind(redis2, func);
          return redis2[func] = (...keys) => {
            return (...args) => {
              return f(keys, args);
            };
          };
        }
      });
    }
  }), redis2);
  return (prefix, bind) => {
    var i, ref, t;
    if (bind) {
      t = key(prefix);
      ref = bind.split(" ");
      for (i of ref) {
        prefix[i] = _prefix(t, redis2[i]);
      }
    }
    return prefix;
  };
};

// db/redis.js
var import_prexit = __toESM(require_prexit());
import {
  Redis,
  serverHostPort,
  serverCluster
} from "@u6x/ru";
var REDIS_CLUSTER;
var REDIS_DB;
var REDIS_HOST;
var REDIS_PASSWORD;
var REDIS_PORT;
var REDIS_USER;
var SERVER;
var env;
var redis;
({ env } = process);
({ REDIS_DB, REDIS_PASSWORD, REDIS_CLUSTER, REDIS_USER } = env);
if (REDIS_CLUSTER) {
  SERVER = serverCluster(REDIS_CLUSTER.split("|").map((i) => {
    var host, port;
    [host, port] = i.split(":");
    return [host, port ? parseInt(port) : 6379];
  }));
} else {
  ({ REDIS_HOST, REDIS_PORT } = env);
  SERVER = serverHostPort(REDIS_HOST, parseInt(REDIS_PORT));
}
redis = await Redis(SERVER, parseInt(REDIS_DB), REDIS_USER, REDIS_PASSWORD);
(0, import_prexit.default)(async () => {
  await redis.quit();
});
var redis_default = redis;

// R.js
var $2;
$2 = init_default(redis_default, lua_default);
var R = redis_default;
var R_default = R;
(() => {
  var bind, k, ref, v, x;
  ref = Object.entries(key_exports);
  for (x of ref) {
    [k, v] = x;
    ({ bind } = v);
    if (bind) {
      delete v.bind;
      $2(v, bind);
    }
  }
})();

// ../../node_modules/.pnpm/@iuser+zipint@0.0.1/node_modules/@iuser/zipint/lib/index.js
var import_fastintcompression = __toESM(require_FastIntegerCompression(), 1);
var compress;
var uncompress;
({ uncompress, compress } = import_fastintcompression.default);
var zipint = (li) => {
  return new Uint8Array(compress(li));
};
var unzipint = (bin) => {
  return uncompress(bin);
};

// POST/captcha.js
import {
  z85Dump,
  z85Load,
  randomBytes,
  svgWebp,
  ipBin
} from "@u6x/ru";
var CACHE;
var WIDTH;
var _cache;
var _new;
var captcha;
CACHE = [[], []];
WIDTH = 350;
_new = async (radio) => {
  var r;
  r = src_default(WIDTH * radio);
  r[0] = await svgWebp(r[0], 20);
  return r;
};
_cache = (radio) => {
  var add, length, li;
  li = CACHE[radio - 1];
  add = () => {
    _new(radio).then((r) => {
      return li.push(r);
    });
  };
  ({ length } = li);
  if (length < 3) {
    add();
  }
  if (length) {
    return li.pop();
  }
  add();
  return _new(radio);
};
var captcha_default = captcha = async function(radio) {
  var captcha_size, img, img_id, ip, key2, r, x, y2;
  ip = ipBin(this.ip);
  r = await R_CAPTCHA_IP_LIMIT.ipLimit(ip)();
  if (r) {
    return r;
  }
  radio = parseInt(radio) >= 2 ? 2 : 1;
  [img, img_id, x, y2, captcha_size] = await _cache(radio);
  if (radio === 1) {
    x *= 2;
    y2 *= 2;
    captcha_size *= 2;
  }
  while (true) {
    key2 = randomBytes(8);
    if (!await R_CAPTCHA.exist(key2)) {
      R_CAPTCHA.setex(key2, zipint([x, y2, captcha_size]), 600);
      break;
    }
  }
  return [img, D_default[img_id], z85Dump(key2)];
};

// POST/auth.js
var auth_exports = {};
__export(auth_exports, {
  sign: () => sign_exports
});

// POST/auth/sign.js
var sign_exports = {};
__export(sign_exports, {
  mail: () => mail,
  mailSignup: () => mailSignup,
  phone: () => phone
});

// ERR/AUTH.js
var ACCOUNT_INVALID = 17;
var ACCOUNT_TOO_LONG = 18;
var ACCOUNT_MAIL_HOST_BAN = 19;

// HttpErr.js
var err;
var HttpErr = class HttpErr2 {
  constructor(code1, body) {
    this.code = code1;
    this.body = body;
  }
};
err = (code, msg = "") => {
  return new HttpErr(code, msg);
};
var ERR_CAPTCHA = err(412);
var ERR_LOGIN = err(401);
var ERR_HOST_NOT_ORG = err(403, "host not bind org");

// mid/captcha.js
import {
  z85Load as z85Load2
} from "@u6x/ru";
var captcha_default2 = async ({
  type: captcha2
}) => {
  var id, r, w, x, x0, y2, y0;
  if (captcha2) {
    [id, x, y2] = JSON.parse(captcha2);
    id = z85Load2(id);
    r = await R_CAPTCHA.getB(id);
    if (r) {
      [x0, y0, w] = unzipint(r);
      if (x >= x0 && x <= x0 + w && y2 >= y0 && y2 <= y0 + w) {
        R_CAPTCHA.del(id);
        return;
      }
    }
  }
  throw ERR_CAPTCHA;
};

// ../../node_modules/utax/split.js
var split = (str, split2) => {
  var p, suffix;
  p = str.indexOf(split2);
  if (p >= 0) {
    suffix = str.slice(p + 1);
    str = str.slice(0, +(p - 1) + 1 || 9e9);
  } else {
    suffix = "";
  }
  return [str, suffix];
};
var split_default = split;

// ../../node_modules/.pnpm/@iuser+time@0.0.3/node_modules/@iuser/time/lib/index.js
var dateInt;
dateInt = (n) => {
  return () => {
    return parseInt(new Date() / n);
  };
};
var Second = dateInt(1e3);
var Minute = dateInt(6e4);
var Hour = dateInt(36e5);
var Day = dateInt(864e5);

// POST/auth/sign.js
import {
  passwordHash,
  zipU64,
  u64Bin
} from "@u6x/ru";

// lib/sk.js
import {
  xxh3B36
} from "@u6x/ru";
var _code;
var SK = await R.hgetB(R_CONF, "SK");
_code = (hour, args) => {
  var msg;
  msg = pack2(args.concat([hour]));
  return xxh3B36(msg, SK);
};
var skCode = (...args) => {
  return _code(Hour(), args);
};
var skVerify = (code, ...args) => {
  var hour;
  code = code.trim();
  hour = Hour();
  return code === _code(hour, args) || code === _code(hour - 1, args);
};

// lib/MailTmpl.js
var MailTmpl_default = new Proxy({}, {
  get: (_, name2) => {
    return async (self2) => {
      var lang, txt;
      lang = self2.lang;
      if (lang) {
        txt = await R_default.hget("i18n", lang + "/" + name2);
      }
      if (!txt) {
        txt = await R_default.hget("i18n", "en/" + name2);
      }
      return split_default(txt, "\n").concat([lang]);
    };
  }
});

// lib/smtp.js
var import_nodemailer = __toESM(require_nodemailer());

// ../../node_modules/.pnpm/@iuser+strbool@0.0.2/node_modules/@iuser/strbool/lib/index.js
var lib_default = (x) => {
  if (x) {
    return !["0", "false", "off", "no", "null"].includes(x.trim().toLowerCase());
  }
  return false;
};

// lib/smtp.js
var SMTP_HOST;
var SMTP_PASSWORD;
var SMTP_PORT;
var SMTP_TLS;
var SMTP_USER;
({ SMTP_HOST, SMTP_PORT, SMTP_TLS, SMTP_USER, SMTP_PASSWORD } = process.env);
var smtp_default = async (host, to, subject, text, html) => {
  var FROM, mail2, transporter;
  transporter = import_nodemailer.default.createTransport({
    secure: lib_default(SMTP_TLS),
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD
    }
  });
  FROM = {
    name: host,
    address: SMTP_USER
  };
  mail2 = {
    from: FROM,
    to,
    subject,
    text,
    html
  };
  try {
    await transporter.sendMail(mail2);
  } finally {
    transporter.close();
  }
};

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/index.js
import os from "os";
import fs from "fs";

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/query.js
var originCache = /* @__PURE__ */ new Map();
var originStackCache = /* @__PURE__ */ new Map();
var originError = Symbol("OriginError");
var CLOSE = {};
var Query = class extends Promise {
  constructor(strings2, args, handler, canceller, options2 = {}) {
    let resolve, reject;
    super((a, b2) => {
      resolve = a;
      reject = b2;
    });
    this.tagged = Array.isArray(strings2.raw);
    this.strings = strings2;
    this.args = args;
    this.handler = handler;
    this.canceller = canceller;
    this.options = options2;
    this.state = null;
    this.statement = null;
    this.resolve = (x) => (this.active = false, resolve(x));
    this.reject = (x) => (this.active = false, reject(x));
    this.active = false;
    this.cancelled = null;
    this.executed = false;
    this.signature = "";
    this[originError] = this.handler.debug ? new Error() : this.tagged && cachedError(this.strings);
  }
  get origin() {
    return this.handler.debug ? this[originError].stack : this.tagged ? originStackCache.has(this.strings) ? originStackCache.get(this.strings) : originStackCache.set(this.strings, this[originError].stack).get(this.strings) : "";
  }
  static get [Symbol.species]() {
    return Promise;
  }
  cancel() {
    return this.canceller && (this.canceller(this), this.canceller = null);
  }
  simple() {
    this.options.simple = true;
    this.options.prepare = false;
    return this;
  }
  async readable() {
    this.simple();
    this.streaming = true;
    return this;
  }
  async writable() {
    this.simple();
    this.streaming = true;
    return this;
  }
  cursor(rows = 1, fn) {
    this.options.simple = false;
    if (typeof rows === "function") {
      fn = rows;
      rows = 1;
    }
    this.cursorRows = rows;
    if (typeof fn === "function")
      return this.cursorFn = fn, this;
    let prev;
    return {
      [Symbol.asyncIterator]: () => ({
        next: () => {
          if (this.executed && !this.active)
            return { done: true };
          prev && prev();
          const promise = new Promise((resolve, reject) => {
            this.cursorFn = (value) => {
              resolve({ value, done: false });
              return new Promise((r) => prev = r);
            };
            this.resolve = () => (this.active = false, resolve({ done: true }));
            this.reject = (x) => (this.active = false, reject(x));
          });
          this.execute();
          return promise;
        },
        return() {
          prev && prev(CLOSE);
          return { done: true };
        }
      })
    };
  }
  describe() {
    this.options.simple = false;
    this.onlyDescribe = this.options.prepare = true;
    return this;
  }
  stream() {
    throw new Error(".stream has been renamed to .forEach");
  }
  forEach(fn) {
    this.forEachFn = fn;
    this.handle();
    return this;
  }
  raw() {
    this.isRaw = true;
    return this;
  }
  values() {
    this.isRaw = "values";
    return this;
  }
  async handle() {
    !this.executed && (this.executed = true) && await 1 && this.handler(this);
  }
  execute() {
    this.handle();
    return this;
  }
  then() {
    this.handle();
    return super.then.apply(this, arguments);
  }
  catch() {
    this.handle();
    return super.catch.apply(this, arguments);
  }
  finally() {
    this.handle();
    return super.finally.apply(this, arguments);
  }
};
function cachedError(xs) {
  if (originCache.has(xs))
    return originCache.get(xs);
  const x = Error.stackTraceLimit;
  Error.stackTraceLimit = 4;
  originCache.set(xs, new Error());
  Error.stackTraceLimit = x;
  return originCache.get(xs);
}

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/errors.js
var PostgresError = class extends Error {
  constructor(x) {
    super(x.message);
    this.name = this.constructor.name;
    Object.assign(this, x);
  }
};
var Errors = {
  connection,
  postgres,
  generic,
  notSupported
};
function connection(x, options2, socket) {
  const { host, port } = socket || options2;
  const error = Object.assign(
    new Error("write " + x + " " + (options2.path || host + ":" + port)),
    {
      code: x,
      errno: x,
      address: options2.path || host
    },
    options2.path ? {} : { port }
  );
  Error.captureStackTrace(error, connection);
  return error;
}
function postgres(x) {
  const error = new PostgresError(x);
  Error.captureStackTrace(error, postgres);
  return error;
}
function generic(code, message) {
  const error = Object.assign(new Error(code + ": " + message), { code });
  Error.captureStackTrace(error, generic);
  return error;
}
function notSupported(x) {
  const error = Object.assign(
    new Error(x + " (B) is not supported"),
    {
      code: "MESSAGE_NOT_SUPPORTED",
      name: x
    }
  );
  Error.captureStackTrace(error, notSupported);
  return error;
}

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/types.js
var types = {
  string: {
    to: 25,
    from: null,
    serialize: (x) => "" + x
  },
  number: {
    to: 0,
    from: [21, 23, 26, 700, 701],
    serialize: (x) => "" + x,
    parse: (x) => +x
  },
  json: {
    to: 114,
    from: [114, 3802],
    serialize: (x) => JSON.stringify(x),
    parse: (x) => JSON.parse(x)
  },
  boolean: {
    to: 16,
    from: 16,
    serialize: (x) => x === true ? "t" : "f",
    parse: (x) => x === "t"
  },
  date: {
    to: 1184,
    from: [1082, 1114, 1184],
    serialize: (x) => (x instanceof Date ? x : new Date(x)).toISOString(),
    parse: (x) => new Date(x)
  },
  bytea: {
    to: 17,
    from: 17,
    serialize: (x) => "\\x" + Buffer.from(x).toString("hex"),
    parse: (x) => Buffer.from(x.slice(2), "hex")
  }
};
var NotTagged = class {
  then() {
    notTagged();
  }
  catch() {
    notTagged();
  }
  finally() {
    notTagged();
  }
};
var Identifier = class extends NotTagged {
  constructor(value) {
    super();
    this.value = escapeIdentifier(value);
  }
};
var Parameter = class extends NotTagged {
  constructor(value, type, array) {
    super();
    this.value = value;
    this.type = type;
    this.array = array;
  }
};
var Builder = class extends NotTagged {
  constructor(first, rest) {
    super();
    this.first = first;
    this.rest = rest;
  }
  build(before, parameters, types3, options2) {
    const keyword = builders.map(([x, fn]) => ({ fn, i: before.search(x) })).sort((a, b2) => a.i - b2.i).pop();
    if (keyword.i === -1)
      throw new Error("Could not infer helper mode");
    return keyword.fn(this.first, this.rest, parameters, types3, options2);
  }
};
function handleValue(x, parameters, types3, options2) {
  let value = x instanceof Parameter ? x.value : x;
  if (value === void 0) {
    x instanceof Parameter ? x.value = options2.transform.undefined : value = x = options2.transform.undefined;
    if (value === void 0)
      throw Errors.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
  }
  return "$" + types3.push(
    x instanceof Parameter ? (parameters.push(x.value), x.array ? x.array[x.type || inferType(x.value)] || x.type || firstIsString(x.value) : x.type) : (parameters.push(x), inferType(x))
  );
}
var defaultHandlers = typeHandlers(types);
function stringify(q, string, value, parameters, types3, options2) {
  for (let i = 1; i < q.strings.length; i++) {
    string += stringifyValue(string, value, parameters, types3, options2) + q.strings[i];
    value = q.args[i];
  }
  return string;
}
function stringifyValue(string, value, parameters, types3, o) {
  return value instanceof Builder ? value.build(string, parameters, types3, o) : value instanceof Query ? fragment(value, parameters, types3, o) : value instanceof Identifier ? value.value : value && value[0] instanceof Query ? value.reduce((acc, x) => acc + " " + fragment(x, parameters, types3, o), "") : handleValue(value, parameters, types3, o);
}
function fragment(q, parameters, types3, options2) {
  q.fragment = true;
  return stringify(q, q.strings[0], q.args[0], parameters, types3, options2);
}
function valuesBuilder(first, parameters, types3, columns, options2) {
  return first.map(
    (row) => "(" + columns.map(
      (column) => stringifyValue("values", row[column], parameters, types3, options2)
    ).join(",") + ")"
  ).join(",");
}
function values(first, rest, parameters, types3, options2) {
  const multi = Array.isArray(first[0]);
  const columns = rest.length ? rest.flat() : Object.keys(multi ? first[0] : first);
  return valuesBuilder(multi ? first : [first], parameters, types3, columns, options2);
}
function select(first, rest, parameters, types3, options2) {
  typeof first === "string" && (first = [first].concat(rest));
  if (Array.isArray(first))
    return first.map((x) => escapeIdentifier(options2.transform.column.to ? options2.transform.column.to(x) : x)).join(",");
  let value;
  const columns = rest.length ? rest.flat() : Object.keys(first);
  return columns.map((x) => {
    value = first[x];
    return (value instanceof Query ? fragment(value, parameters, types3, options2) : value instanceof Identifier ? value.value : handleValue(value, parameters, types3, options2)) + " as " + escapeIdentifier(options2.transform.column.to ? options2.transform.column.to(x) : x);
  }).join(",");
}
var builders = Object.entries({
  values,
  in: (...xs) => {
    const x = values(...xs);
    return x === "()" ? "(null)" : x;
  },
  select,
  as: select,
  returning: select,
  update(first, rest, parameters, types3, options2) {
    return (rest.length ? rest.flat() : Object.keys(first)).map(
      (x) => escapeIdentifier(options2.transform.column.to ? options2.transform.column.to(x) : x) + "=" + handleValue(first[x], parameters, types3, options2)
    );
  },
  insert(first, rest, parameters, types3, options2) {
    const columns = rest.length ? rest.flat() : Object.keys(Array.isArray(first) ? first[0] : first);
    return "(" + columns.map(
      (x) => escapeIdentifier(options2.transform.column.to ? options2.transform.column.to(x) : x)
    ).join(",") + ")values" + valuesBuilder(Array.isArray(first) ? first : [first], parameters, types3, columns, options2);
  }
}).map(([x, fn]) => [new RegExp("((?:^|[\\s(])" + x + "(?:$|[\\s(]))(?![\\s\\S]*\\1)", "i"), fn]);
function notTagged() {
  throw Errors.generic("NOT_TAGGED_CALL", "Query not called as a tagged template literal");
}
var serializers = defaultHandlers.serializers;
var parsers = defaultHandlers.parsers;
function firstIsString(x) {
  if (Array.isArray(x))
    return firstIsString(x[0]);
  return typeof x === "string" ? 1009 : 0;
}
var mergeUserTypes = function(types3) {
  const user = typeHandlers(types3 || {});
  return {
    serializers: Object.assign({}, serializers, user.serializers),
    parsers: Object.assign({}, parsers, user.parsers)
  };
};
function typeHandlers(types3) {
  return Object.keys(types3).reduce((acc, k) => {
    types3[k].from && [].concat(types3[k].from).forEach((x) => acc.parsers[x] = types3[k].parse);
    acc.serializers[types3[k].to] = types3[k].serialize;
    types3[k].from && [].concat(types3[k].from).forEach((x) => acc.serializers[x] = types3[k].serialize);
    return acc;
  }, { parsers: {}, serializers: {} });
}
var escapeIdentifier = function escape(str) {
  return '"' + str.replace(/"/g, '""').replace(/\./g, '"."') + '"';
};
var inferType = function inferType2(x) {
  return x instanceof Parameter ? x.type : x instanceof Date ? 1184 : x instanceof Uint8Array ? 17 : x === true || x === false ? 16 : typeof x === "bigint" ? 20 : Array.isArray(x) ? inferType2(x[0]) : 0;
};
var escapeBackslash = /\\/g;
var escapeQuote = /"/g;
function arrayEscape(x) {
  return x.replace(escapeBackslash, "\\\\").replace(escapeQuote, '\\"');
}
var arraySerializer = function arraySerializer2(xs, serializer, options2) {
  if (Array.isArray(xs) === false)
    return xs;
  if (!xs.length)
    return "{}";
  const first = xs[0];
  if (Array.isArray(first) && !first.type)
    return "{" + xs.map((x) => arraySerializer2(x, serializer)).join(",") + "}";
  return "{" + xs.map((x) => {
    if (x === void 0) {
      x = options2.transform.undefined;
      if (x === void 0)
        throw Errors.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
    }
    return x === null ? "null" : '"' + arrayEscape(serializer ? serializer(x.type ? x.value : x) : "" + x) + '"';
  }).join(",") + "}";
};
var arrayParserState = {
  i: 0,
  char: null,
  str: "",
  quoted: false,
  last: 0
};
var arrayParser = function arrayParser2(x, parser2) {
  arrayParserState.i = arrayParserState.last = 0;
  return arrayParserLoop(arrayParserState, x, parser2);
};
function arrayParserLoop(s, x, parser2) {
  const xs = [];
  for (; s.i < x.length; s.i++) {
    s.char = x[s.i];
    if (s.quoted) {
      if (s.char === "\\") {
        s.str += x[++s.i];
      } else if (s.char === '"') {
        xs.push(parser2 ? parser2(s.str) : s.str);
        s.str = "";
        s.quoted = x[s.i + 1] === '"';
        s.last = s.i + 2;
      } else {
        s.str += s.char;
      }
    } else if (s.char === '"') {
      s.quoted = true;
    } else if (s.char === "{") {
      s.last = ++s.i;
      xs.push(arrayParserLoop(s, x, parser2));
    } else if (s.char === "}") {
      s.quoted = false;
      s.last < s.i && xs.push(parser2 ? parser2(x.slice(s.last, s.i)) : x.slice(s.last, s.i));
      s.last = s.i + 1;
      break;
    } else if (s.char === "," && s.p !== "}" && s.p !== '"') {
      xs.push(parser2 ? parser2(x.slice(s.last, s.i)) : x.slice(s.last, s.i));
      s.last = s.i + 1;
    }
    s.p = s.char;
  }
  s.last < s.i && xs.push(parser2 ? parser2(x.slice(s.last, s.i + 1)) : x.slice(s.last, s.i + 1));
  return xs;
}
var toCamel = (x) => {
  let str = x[0];
  for (let i = 1; i < x.length; i++)
    str += x[i] === "_" ? x[++i].toUpperCase() : x[i];
  return str;
};
var toPascal = (x) => {
  let str = x[0].toUpperCase();
  for (let i = 1; i < x.length; i++)
    str += x[i] === "_" ? x[++i].toUpperCase() : x[i];
  return str;
};
var toKebab = (x) => x.replace(/_/g, "-");
var fromCamel = (x) => x.replace(/([A-Z])/g, "_$1").toLowerCase();
var fromPascal = (x) => (x.slice(0, 1) + x.slice(1).replace(/([A-Z])/g, "_$1")).toLowerCase();
var fromKebab = (x) => x.replace(/-/g, "_");
function createJsonTransform(fn) {
  return function jsonTransform(x, column) {
    return column.type === 114 || column.type === 3802 ? Array.isArray(x) ? x.map(jsonTransform) : Object.entries(x).reduce((acc, [k, v]) => Object.assign(acc, { [fn(k)]: v }), {}) : x;
  };
}
toCamel.column = { from: toCamel };
toCamel.value = { from: createJsonTransform(toCamel) };
fromCamel.column = { to: fromCamel };
var camel = { ...toCamel };
camel.column.to = fromCamel;
toPascal.column = { from: toPascal };
toPascal.value = { from: createJsonTransform(toPascal) };
fromPascal.column = { to: fromPascal };
var pascal = { ...toPascal };
pascal.column.to = fromPascal;
toKebab.column = { from: toKebab };
toKebab.value = { from: createJsonTransform(toKebab) };
fromKebab.column = { to: fromKebab };
var kebab = { ...toKebab };
kebab.column.to = fromKebab;

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/connection.js
import net from "net";
import tls from "tls";
import crypto from "crypto";
import Stream from "stream";

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/result.js
var Result = class extends Array {
  constructor() {
    super();
    Object.defineProperties(this, {
      count: { value: null, writable: true },
      state: { value: null, writable: true },
      command: { value: null, writable: true },
      columns: { value: null, writable: true },
      statement: { value: null, writable: true }
    });
  }
  static get [Symbol.species]() {
    return Array;
  }
};

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/queue.js
var queue_default = Queue;
function Queue(initial = []) {
  let xs = initial.slice();
  let index = 0;
  return {
    get length() {
      return xs.length - index;
    },
    remove: (x) => {
      const index2 = xs.indexOf(x);
      return index2 === -1 ? null : (xs.splice(index2, 1), x);
    },
    push: (x) => (xs.push(x), x),
    shift: () => {
      const out = xs[index++];
      if (index === xs.length) {
        index = 0;
        xs = [];
      } else {
        xs[index - 1] = void 0;
      }
      return out;
    }
  };
}

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/bytes.js
var size = 256;
var buffer = Buffer.allocUnsafe(size);
var messages = "BCcDdEFfHPpQSX".split("").reduce((acc, x) => {
  const v = x.charCodeAt(0);
  acc[x] = () => {
    buffer[0] = v;
    b.i = 5;
    return b;
  };
  return acc;
}, {});
var b = Object.assign(reset, messages, {
  N: String.fromCharCode(0),
  i: 0,
  inc(x) {
    b.i += x;
    return b;
  },
  str(x) {
    const length = Buffer.byteLength(x);
    fit(length);
    b.i += buffer.write(x, b.i, length, "utf8");
    return b;
  },
  i16(x) {
    fit(2);
    buffer.writeUInt16BE(x, b.i);
    b.i += 2;
    return b;
  },
  i32(x, i) {
    if (i || i === 0) {
      buffer.writeUInt32BE(x, i);
      return b;
    }
    fit(4);
    buffer.writeUInt32BE(x, b.i);
    b.i += 4;
    return b;
  },
  z(x) {
    fit(x);
    buffer.fill(0, b.i, b.i + x);
    b.i += x;
    return b;
  },
  raw(x) {
    buffer = Buffer.concat([buffer.subarray(0, b.i), x]);
    b.i = buffer.length;
    return b;
  },
  end(at = 1) {
    buffer.writeUInt32BE(b.i - at, at);
    const out = buffer.subarray(0, b.i);
    b.i = 0;
    buffer = Buffer.allocUnsafe(size);
    return out;
  }
});
var bytes_default = b;
function fit(x) {
  if (buffer.length - b.i < x) {
    const prev = buffer, length = prev.length;
    buffer = Buffer.allocUnsafe(length + (length >> 1) + x);
    prev.copy(buffer);
  }
}
function reset() {
  b.i = 0;
  return b;
}

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/connection.js
var connection_default = Connection;
var uid = 1;
var Sync = bytes_default().S().end();
var Flush = bytes_default().H().end();
var SSLRequest = bytes_default().i32(8).i32(80877103).end(8);
var ExecuteUnnamed = Buffer.concat([bytes_default().E().str(bytes_default.N).i32(0).end(), Sync]);
var DescribeUnnamed = bytes_default().D().str("S").str(bytes_default.N).end();
var noop = () => {
};
var retryRoutines = /* @__PURE__ */ new Set([
  "FetchPreparedStatement",
  "RevalidateCachedQuery",
  "transformAssignedExpr"
]);
var errorFields = {
  83: "severity_local",
  86: "severity",
  67: "code",
  77: "message",
  68: "detail",
  72: "hint",
  80: "position",
  112: "internal_position",
  113: "internal_query",
  87: "where",
  115: "schema_name",
  116: "table_name",
  99: "column_name",
  100: "data type_name",
  110: "constraint_name",
  70: "file",
  76: "line",
  82: "routine"
};
function Connection(options2, queues = {}, { onopen = noop, onend = noop, onclose = noop } = {}) {
  const {
    ssl,
    max,
    user,
    host,
    port,
    database,
    parsers: parsers2,
    transform,
    onnotice,
    onnotify,
    onparameter,
    max_pipeline,
    keep_alive,
    backoff: backoff2,
    target_session_attrs
  } = options2;
  const sent = queue_default(), id = uid++, backend = { pid: null, secret: null }, idleTimer = timer(end, options2.idle_timeout), lifeTimer = timer(end, options2.max_lifetime), connectTimer = timer(connectTimedOut, options2.connect_timeout);
  let socket = null, cancelMessage, result = new Result(), incoming = Buffer.alloc(0), needsTypes = options2.fetch_types, backendParameters = {}, statements = {}, statementId = Math.random().toString(36).slice(2), statementCount = 1, closedDate = 0, remaining = 0, hostIndex = 0, retries = 0, length = 0, delay = 0, rows = 0, serverSignature = null, nextWriteTimer = null, terminated = false, incomings = null, results = null, initial = null, ending = null, stream = null, chunk = null, ended = null, nonce = null, query = null, final = null;
  const connection2 = {
    queue: queues.closed,
    idleTimer,
    connect(query2) {
      initial = query2;
      reconnect();
    },
    terminate,
    execute,
    cancel,
    end,
    count: 0,
    id
  };
  queues.closed && queues.closed.push(connection2);
  return connection2;
  async function createSocket() {
    let x;
    try {
      x = options2.socket ? await Promise.resolve(options2.socket(options2)) : net.Socket();
    } catch (e) {
      error(e);
      return;
    }
    x.on("error", error);
    x.on("close", closed);
    x.on("drain", drain);
    return x;
  }
  async function cancel({ pid, secret }, resolve, reject) {
    try {
      cancelMessage = bytes_default().i32(16).i32(80877102).i32(pid).i32(secret).end(16);
      await connect();
      socket.once("error", reject);
      socket.once("close", resolve);
    } catch (error2) {
      reject(error2);
    }
  }
  function execute(q) {
    if (terminated)
      return queryError(q, Errors.connection("CONNECTION_DESTROYED", options2));
    if (q.cancelled)
      return;
    try {
      q.state = backend;
      query ? sent.push(q) : (query = q, query.active = true);
      build(q);
      return write(toBuffer(q)) && !q.describeFirst && sent.length < max_pipeline && (!q.options.onexecute || q.options.onexecute(connection2));
    } catch (error2) {
      sent.length === 0 && write(Sync);
      errored(error2);
      return true;
    }
  }
  function toBuffer(q) {
    if (q.parameters.length >= 65534)
      throw Errors.generic("MAX_PARAMETERS_EXCEEDED", "Max number of parameters (65534) exceeded");
    return q.options.simple ? bytes_default().Q().str(q.strings[0] + bytes_default.N).end() : q.describeFirst ? Buffer.concat([describe(q), Flush]) : q.prepare ? q.prepared ? prepared(q) : Buffer.concat([describe(q), prepared(q)]) : unnamed(q);
  }
  function describe(q) {
    return Buffer.concat([
      Parse(q.statement.string, q.parameters, q.statement.types, q.statement.name),
      Describe("S", q.statement.name)
    ]);
  }
  function prepared(q) {
    return Buffer.concat([
      Bind(q.parameters, q.statement.types, q.statement.name, q.cursorName),
      q.cursorFn ? Execute("", q.cursorRows) : ExecuteUnnamed
    ]);
  }
  function unnamed(q) {
    return Buffer.concat([
      Parse(q.statement.string, q.parameters, q.statement.types),
      DescribeUnnamed,
      prepared(q)
    ]);
  }
  function build(q) {
    const parameters = [], types3 = [];
    const string = stringify(q, q.strings[0], q.args[0], parameters, types3, options2);
    !q.tagged && q.args.forEach((x) => handleValue(x, parameters, types3, options2));
    q.prepare = options2.prepare && ("prepare" in q.options ? q.options.prepare : true);
    q.string = string;
    q.signature = q.prepare && types3 + string;
    q.onlyDescribe && delete statements[q.signature];
    q.parameters = q.parameters || parameters;
    q.prepared = q.prepare && q.signature in statements;
    q.describeFirst = q.onlyDescribe || parameters.length && !q.prepared;
    q.statement = q.prepared ? statements[q.signature] : { string, types: types3, name: q.prepare ? statementId + statementCount++ : "" };
    typeof options2.debug === "function" && options2.debug(id, string, parameters, types3);
  }
  function write(x, fn) {
    chunk = chunk ? Buffer.concat([chunk, x]) : Buffer.from(x);
    if (fn || chunk.length >= 1024)
      return nextWrite(fn);
    nextWriteTimer === null && (nextWriteTimer = setImmediate(nextWrite));
    return true;
  }
  function nextWrite(fn) {
    const x = socket.write(chunk, fn);
    nextWriteTimer !== null && clearImmediate(nextWriteTimer);
    chunk = nextWriteTimer = null;
    return x;
  }
  function connectTimedOut() {
    errored(Errors.connection("CONNECT_TIMEOUT", options2, socket));
    socket.destroy();
  }
  async function secure() {
    write(SSLRequest);
    const canSSL = await new Promise((r) => socket.once("data", (x) => r(x[0] === 83)));
    if (!canSSL && ssl === "prefer")
      return connected();
    socket.removeAllListeners();
    socket = tls.connect({
      socket,
      ...ssl === "require" || ssl === "allow" || ssl === "prefer" ? { rejectUnauthorized: false } : ssl === "verify-full" ? {} : typeof ssl === "object" ? ssl : {}
    });
    socket.on("secureConnect", connected);
    socket.on("error", error);
    socket.on("close", closed);
    socket.on("drain", drain);
  }
  function drain() {
    !query && onopen(connection2);
  }
  function data(x) {
    if (incomings) {
      incomings.push(x);
      remaining -= x.length;
      if (remaining >= 0)
        return;
    }
    incoming = incomings ? Buffer.concat(incomings, length - remaining) : incoming.length === 0 ? x : Buffer.concat([incoming, x], incoming.length + x.length);
    while (incoming.length > 4) {
      length = incoming.readUInt32BE(1);
      if (length >= incoming.length) {
        remaining = length - incoming.length;
        incomings = [incoming];
        break;
      }
      try {
        handle(incoming.subarray(0, length + 1));
      } catch (e) {
        query && (query.cursorFn || query.describeFirst) && write(Sync);
        errored(e);
      }
      incoming = incoming.subarray(length + 1);
      remaining = 0;
      incomings = null;
    }
  }
  async function connect() {
    terminated = false;
    backendParameters = {};
    socket || (socket = await createSocket());
    if (!socket)
      return;
    connectTimer.start();
    if (options2.socket)
      return ssl ? secure() : connected();
    socket.on("connect", ssl ? secure : connected);
    if (options2.path)
      return socket.connect(options2.path);
    socket.connect(port[hostIndex], host[hostIndex]);
    hostIndex = (hostIndex + 1) % port.length;
  }
  function reconnect() {
    setTimeout(connect, closedDate ? closedDate + delay - Number(process.hrtime.bigint() / 1000000n) : 0);
  }
  function connected() {
    try {
      statements = {};
      needsTypes = options2.fetch_types;
      statementId = Math.random().toString(36).slice(2);
      statementCount = 1;
      lifeTimer.start();
      socket.on("data", data);
      keep_alive && socket.setKeepAlive && socket.setKeepAlive(true, 1e3 * keep_alive);
      const s = StartupMessage();
      write(s);
    } catch (err2) {
      error(err2);
    }
  }
  function error(err2) {
    if (connection2.queue === queues.connecting && options2.host[retries + 1])
      return;
    errored(err2);
    while (sent.length)
      queryError(sent.shift(), err2);
  }
  function errored(err2) {
    stream && (stream.destroy(err2), stream = null);
    query && queryError(query, err2);
    initial && (queryError(initial, err2), initial = null);
  }
  function queryError(query2, err2) {
    query2.reject(Object.create(err2, {
      stack: { value: err2.stack + query2.origin.replace(/.*\n/, "\n"), enumerable: options2.debug },
      query: { value: query2.string, enumerable: options2.debug },
      parameters: { value: query2.parameters, enumerable: options2.debug },
      args: { value: query2.args, enumerable: options2.debug },
      types: { value: query2.statement && query2.statement.types, enumerable: options2.debug }
    }));
  }
  function end() {
    return ending || (!connection2.reserved && onend(connection2), !connection2.reserved && !initial && !query && sent.length === 0 ? (terminate(), new Promise((r) => socket && socket.readyState !== "closed" ? socket.once("close", r) : r())) : ending = new Promise((r) => ended = r));
  }
  function terminate() {
    terminated = true;
    if (stream || query || initial || sent.length)
      error(Errors.connection("CONNECTION_DESTROYED", options2));
    clearImmediate(nextWriteTimer);
    if (socket) {
      socket.removeListener("data", data);
      socket.removeListener("connect", connected);
      socket.readyState === "open" && socket.end(bytes_default().X().end());
    }
    ended && (ended(), ending = ended = null);
  }
  async function closed(hadError) {
    incoming = Buffer.alloc(0);
    remaining = 0;
    incomings = null;
    clearImmediate(nextWriteTimer);
    socket.removeListener("data", data);
    socket.removeListener("connect", connected);
    idleTimer.cancel();
    lifeTimer.cancel();
    connectTimer.cancel();
    if (socket.encrypted) {
      socket.removeAllListeners();
      socket = null;
    }
    if (initial)
      return reconnect();
    !hadError && (query || sent.length) && error(Errors.connection("CONNECTION_CLOSED", options2, socket));
    closedDate = Number(process.hrtime.bigint() / 1000000n);
    hadError && options2.shared.retries++;
    delay = (typeof backoff2 === "function" ? backoff2(options2.shared.retries) : backoff2) * 1e3;
    onclose(connection2);
  }
  function handle(xs, x = xs[0]) {
    (x === 68 ? DataRow : x === 100 ? CopyData : x === 65 ? NotificationResponse : x === 83 ? ParameterStatus : x === 90 ? ReadyForQuery : x === 67 ? CommandComplete : x === 50 ? BindComplete : x === 49 ? ParseComplete : x === 116 ? ParameterDescription : x === 84 ? RowDescription : x === 82 ? Authentication : x === 110 ? NoData : x === 75 ? BackendKeyData : x === 69 ? ErrorResponse : x === 115 ? PortalSuspended : x === 51 ? CloseComplete : x === 71 ? CopyInResponse : x === 78 ? NoticeResponse : x === 72 ? CopyOutResponse : x === 99 ? CopyDone : x === 73 ? EmptyQueryResponse : x === 86 ? FunctionCallResponse : x === 118 ? NegotiateProtocolVersion : x === 87 ? CopyBothResponse : UnknownMessage)(xs);
  }
  function DataRow(x) {
    let index = 7;
    let length2;
    let column;
    let value;
    const row = query.isRaw ? new Array(query.statement.columns.length) : {};
    for (let i = 0; i < query.statement.columns.length; i++) {
      column = query.statement.columns[i];
      length2 = x.readInt32BE(index);
      index += 4;
      value = length2 === -1 ? null : query.isRaw === true ? x.subarray(index, index += length2) : column.parser === void 0 ? x.toString("utf8", index, index += length2) : column.parser.array === true ? column.parser(x.toString("utf8", index + 1, index += length2)) : column.parser(x.toString("utf8", index, index += length2));
      query.isRaw ? row[i] = query.isRaw === true ? value : transform.value.from ? transform.value.from(value, column) : value : row[column.name] = transform.value.from ? transform.value.from(value, column) : value;
    }
    query.forEachFn ? query.forEachFn(transform.row.from ? transform.row.from(row) : row, result) : result[rows++] = transform.row.from ? transform.row.from(row) : row;
  }
  function ParameterStatus(x) {
    const [k, v] = x.toString("utf8", 5, x.length - 1).split(bytes_default.N);
    backendParameters[k] = v;
    if (options2.parameters[k] !== v) {
      options2.parameters[k] = v;
      onparameter && onparameter(k, v);
    }
  }
  function ReadyForQuery(x) {
    query && query.options.simple && query.resolve(results || result);
    query = results = null;
    result = new Result();
    connectTimer.cancel();
    if (initial) {
      if (target_session_attrs) {
        if (!backendParameters.in_hot_standby || !backendParameters.default_transaction_read_only)
          return fetchState();
        else if (tryNext(target_session_attrs, backendParameters))
          return terminate();
      }
      if (needsTypes)
        return fetchArrayTypes();
      execute(initial);
      options2.shared.retries = retries = initial = 0;
      return;
    }
    while (sent.length && (query = sent.shift()) && (query.active = true, query.cancelled))
      Connection(options2).cancel(query.state, query.cancelled.resolve, query.cancelled.reject);
    if (query)
      return;
    connection2.reserved ? x[5] === 73 ? ending ? terminate() : (connection2.reserved = null, onopen(connection2)) : connection2.reserved() : ending ? terminate() : onopen(connection2);
  }
  function CommandComplete(x) {
    rows = 0;
    for (let i = x.length - 1; i > 0; i--) {
      if (x[i] === 32 && x[i + 1] < 58 && result.count === null)
        result.count = +x.toString("utf8", i + 1, x.length - 1);
      if (x[i - 1] >= 65) {
        result.command = x.toString("utf8", 5, i);
        result.state = backend;
        break;
      }
    }
    final && (final(), final = null);
    if (result.command === "BEGIN" && max !== 1 && !connection2.reserved)
      return errored(Errors.generic("UNSAFE_TRANSACTION", "Only use sql.begin or max: 1"));
    if (query.options.simple)
      return BindComplete();
    if (query.cursorFn) {
      result.count && query.cursorFn(result);
      write(Sync);
    }
    query.resolve(result);
  }
  function ParseComplete() {
    query.parsing = false;
  }
  function BindComplete() {
    !result.statement && (result.statement = query.statement);
    result.columns = query.statement.columns;
  }
  function ParameterDescription(x) {
    const length2 = x.readUInt16BE(5);
    for (let i = 0; i < length2; ++i)
      !query.statement.types[i] && (query.statement.types[i] = x.readUInt32BE(7 + i * 4));
    query.prepare && (statements[query.signature] = query.statement);
    query.describeFirst && !query.onlyDescribe && (write(prepared(query)), query.describeFirst = false);
  }
  function RowDescription(x) {
    if (result.command) {
      results = results || [result];
      results.push(result = new Result());
      result.count = null;
      query.statement.columns = null;
    }
    const length2 = x.readUInt16BE(5);
    let index = 7;
    let start;
    query.statement.columns = Array(length2);
    for (let i = 0; i < length2; ++i) {
      start = index;
      while (x[index++] !== 0)
        ;
      const table = x.readUInt32BE(index);
      const number = x.readUInt16BE(index + 4);
      const type = x.readUInt32BE(index + 6);
      query.statement.columns[i] = {
        name: transform.column.from ? transform.column.from(x.toString("utf8", start, index - 1)) : x.toString("utf8", start, index - 1),
        parser: parsers2[type],
        table,
        number,
        type
      };
      index += 18;
    }
    result.statement = query.statement;
    if (query.onlyDescribe)
      return query.resolve(query.statement), write(Sync);
  }
  async function Authentication(x, type = x.readUInt32BE(5)) {
    (type === 3 ? AuthenticationCleartextPassword : type === 5 ? AuthenticationMD5Password : type === 10 ? SASL : type === 11 ? SASLContinue : type === 12 ? SASLFinal : type !== 0 ? UnknownAuth : noop)(x, type);
  }
  async function AuthenticationCleartextPassword() {
    write(
      bytes_default().p().str(await Pass()).z(1).end()
    );
  }
  async function AuthenticationMD5Password(x) {
    write(
      bytes_default().p().str("md5" + md5(Buffer.concat([Buffer.from(md5(await Pass() + user)), x.subarray(9)]))).z(1).end()
    );
  }
  function SASL() {
    bytes_default().p().str("SCRAM-SHA-256" + bytes_default.N);
    const i = bytes_default.i;
    nonce = crypto.randomBytes(18).toString("base64");
    write(bytes_default.inc(4).str("n,,n=*,r=" + nonce).i32(bytes_default.i - i - 4, i).end());
  }
  async function SASLContinue(x) {
    const res = x.toString("utf8", 9).split(",").reduce((acc, x2) => (acc[x2[0]] = x2.slice(2), acc), {});
    const saltedPassword = crypto.pbkdf2Sync(
      await Pass(),
      Buffer.from(res.s, "base64"),
      parseInt(res.i),
      32,
      "sha256"
    );
    const clientKey = hmac(saltedPassword, "Client Key");
    const auth = "n=*,r=" + nonce + ",r=" + res.r + ",s=" + res.s + ",i=" + res.i + ",c=biws,r=" + res.r;
    serverSignature = hmac(hmac(saltedPassword, "Server Key"), auth).toString("base64");
    write(
      bytes_default().p().str("c=biws,r=" + res.r + ",p=" + xor(clientKey, hmac(sha256(clientKey), auth)).toString("base64")).end()
    );
  }
  function SASLFinal(x) {
    if (x.toString("utf8", 9).split(bytes_default.N, 1)[0].slice(2) === serverSignature)
      return;
    errored(Errors.generic("SASL_SIGNATURE_MISMATCH", "The server did not return the correct signature"));
    socket.destroy();
  }
  function Pass() {
    return Promise.resolve(
      typeof options2.pass === "function" ? options2.pass() : options2.pass
    );
  }
  function NoData() {
    result.statement = query.statement;
    result.statement.columns = [];
    if (query.onlyDescribe)
      return query.resolve(query.statement), write(Sync);
  }
  function BackendKeyData(x) {
    backend.pid = x.readUInt32BE(5);
    backend.secret = x.readUInt32BE(9);
  }
  async function fetchArrayTypes() {
    needsTypes = false;
    const types3 = await new Query([`
      select b.oid, b.typarray
      from pg_catalog.pg_type a
      left join pg_catalog.pg_type b on b.oid = a.typelem
      where a.typcategory = 'A'
      group by b.oid, b.typarray
      order by b.oid
    `], [], execute);
    types3.forEach(({ oid, typarray }) => addArrayType(oid, typarray));
  }
  function addArrayType(oid, typarray) {
    const parser2 = options2.parsers[oid];
    options2.shared.typeArrayMap[oid] = typarray;
    options2.parsers[typarray] = (xs) => arrayParser(xs, parser2);
    options2.parsers[typarray].array = true;
    options2.serializers[typarray] = (xs) => arraySerializer(xs, options2.serializers[oid], options2);
  }
  function tryNext(x, xs) {
    return x === "read-write" && xs.default_transaction_read_only === "on" || x === "read-only" && xs.default_transaction_read_only === "off" || x === "primary" && xs.in_hot_standby === "off" || x === "standby" && xs.in_hot_standby === "on" || x === "prefer-standby" && xs.in_hot_standby === "off" && options2.host[retries];
  }
  function fetchState() {
    const query2 = new Query([`
      show transaction_read_only;
      select pg_catalog.pg_is_in_recovery()
    `], [], execute, null, { simple: true });
    query2.resolve = ([[a], [b2]]) => {
      backendParameters.default_transaction_read_only = a.transaction_read_only;
      backendParameters.in_hot_standby = b2.pg_is_in_recovery ? "on" : "off";
    };
    query2.execute();
  }
  function ErrorResponse(x) {
    query && (query.cursorFn || query.describeFirst) && write(Sync);
    const error2 = Errors.postgres(parseError(x));
    query && query.retried ? errored(query.retried) : query && retryRoutines.has(error2.routine) ? retry(query, error2) : errored(error2);
  }
  function retry(q, error2) {
    delete statements[q.signature];
    q.retried = error2;
    execute(q);
  }
  function NotificationResponse(x) {
    if (!onnotify)
      return;
    let index = 9;
    while (x[index++] !== 0)
      ;
    onnotify(
      x.toString("utf8", 9, index - 1),
      x.toString("utf8", index, x.length - 1)
    );
  }
  async function PortalSuspended() {
    try {
      const x = await Promise.resolve(query.cursorFn(result));
      rows = 0;
      x === CLOSE ? write(Close(query.portal)) : (result = new Result(), write(Execute("", query.cursorRows)));
    } catch (err2) {
      write(Sync);
      query.reject(err2);
    }
  }
  function CloseComplete() {
    result.count && query.cursorFn(result);
    query.resolve(result);
  }
  function CopyInResponse() {
    stream = new Stream.Writable({
      autoDestroy: true,
      write(chunk2, encoding, callback) {
        socket.write(bytes_default().d().raw(chunk2).end(), callback);
      },
      destroy(error2, callback) {
        callback(error2);
        socket.write(bytes_default().f().str(error2 + bytes_default.N).end());
        stream = null;
      },
      final(callback) {
        socket.write(bytes_default().c().end());
        final = callback;
      }
    });
    query.resolve(stream);
  }
  function CopyOutResponse() {
    stream = new Stream.Readable({
      read() {
        socket.resume();
      }
    });
    query.resolve(stream);
  }
  function CopyBothResponse() {
    stream = new Stream.Duplex({
      autoDestroy: true,
      read() {
        socket.resume();
      },
      write(chunk2, encoding, callback) {
        socket.write(bytes_default().d().raw(chunk2).end(), callback);
      },
      destroy(error2, callback) {
        callback(error2);
        socket.write(bytes_default().f().str(error2 + bytes_default.N).end());
        stream = null;
      },
      final(callback) {
        socket.write(bytes_default().c().end());
        final = callback;
      }
    });
    query.resolve(stream);
  }
  function CopyData(x) {
    stream && (stream.push(x.subarray(5)) || socket.pause());
  }
  function CopyDone() {
    stream && stream.push(null);
    stream = null;
  }
  function NoticeResponse(x) {
    onnotice ? onnotice(parseError(x)) : console.log(parseError(x));
  }
  function EmptyQueryResponse() {
  }
  function FunctionCallResponse() {
    errored(Errors.notSupported("FunctionCallResponse"));
  }
  function NegotiateProtocolVersion() {
    errored(Errors.notSupported("NegotiateProtocolVersion"));
  }
  function UnknownMessage(x) {
    console.error("Postgres.js : Unknown Message:", x[0]);
  }
  function UnknownAuth(x, type) {
    console.error("Postgres.js : Unknown Auth:", type);
  }
  function Bind(parameters, types3, statement = "", portal = "") {
    let prev, type;
    bytes_default().B().str(portal + bytes_default.N).str(statement + bytes_default.N).i16(0).i16(parameters.length);
    parameters.forEach((x, i) => {
      if (x === null)
        return bytes_default.i32(4294967295);
      type = types3[i];
      parameters[i] = x = type in options2.serializers ? options2.serializers[type](x) : "" + x;
      prev = bytes_default.i;
      bytes_default.inc(4).str(x).i32(bytes_default.i - prev - 4, prev);
    });
    bytes_default.i16(0);
    return bytes_default.end();
  }
  function Parse(str, parameters, types3, name2 = "") {
    bytes_default().P().str(name2 + bytes_default.N).str(str + bytes_default.N).i16(parameters.length);
    parameters.forEach((x, i) => bytes_default.i32(types3[i] || 0));
    return bytes_default.end();
  }
  function Describe(x, name2 = "") {
    return bytes_default().D().str(x).str(name2 + bytes_default.N).end();
  }
  function Execute(portal = "", rows2 = 0) {
    return Buffer.concat([
      bytes_default().E().str(portal + bytes_default.N).i32(rows2).end(),
      Flush
    ]);
  }
  function Close(portal = "") {
    return Buffer.concat([
      bytes_default().C().str("P").str(portal + bytes_default.N).end(),
      bytes_default().S().end()
    ]);
  }
  function StartupMessage() {
    return cancelMessage || bytes_default().inc(4).i16(3).z(2).str(
      Object.entries(Object.assign(
        {
          user,
          database,
          client_encoding: "UTF8"
        },
        options2.connection
      )).filter(([, v]) => v).map(([k, v]) => k + bytes_default.N + v).join(bytes_default.N)
    ).z(2).end(0);
  }
}
function parseError(x) {
  const error = {};
  let start = 5;
  for (let i = 5; i < x.length - 1; i++) {
    if (x[i] === 0) {
      error[errorFields[x[start]]] = x.toString("utf8", start + 1, i);
      start = i + 1;
    }
  }
  return error;
}
function md5(x) {
  return crypto.createHash("md5").update(x).digest("hex");
}
function hmac(key2, x) {
  return crypto.createHmac("sha256", key2).update(x).digest();
}
function sha256(x) {
  return crypto.createHash("sha256").update(x).digest();
}
function xor(a, b2) {
  const length = Math.max(a.length, b2.length);
  const buffer2 = Buffer.allocUnsafe(length);
  for (let i = 0; i < length; i++)
    buffer2[i] = a[i] ^ b2[i];
  return buffer2;
}
function timer(fn, seconds) {
  seconds = typeof seconds === "function" ? seconds() : seconds;
  if (!seconds)
    return { cancel: noop, start: noop };
  let timer2;
  return {
    cancel() {
      timer2 && (clearTimeout(timer2), timer2 = null);
    },
    start() {
      timer2 && clearTimeout(timer2);
      timer2 = setTimeout(done, seconds * 1e3, arguments);
    }
  };
  function done(args) {
    fn.apply(null, args);
    timer2 = null;
  }
}

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/subscribe.js
var noop2 = () => {
};
function Subscribe(postgres2, options2) {
  const subscribers = /* @__PURE__ */ new Map(), slot = "postgresjs_" + Math.random().toString(36).slice(2), state = {};
  let connection2, stream, ended = false;
  const sql = subscribe.sql = postgres2({
    ...options2,
    transform: { column: {}, value: {}, row: {} },
    max: 1,
    fetch_types: false,
    idle_timeout: null,
    max_lifetime: null,
    connection: {
      ...options2.connection,
      replication: "database"
    },
    onclose: async function() {
      if (ended)
        return;
      stream = null;
      state.pid = state.secret = void 0;
      connected(await init(sql, slot, options2.publications));
      subscribers.forEach((event) => event.forEach(({ onsubscribe }) => onsubscribe()));
    },
    no_subscribe: true
  });
  const end = sql.end, close = sql.close;
  sql.end = async () => {
    ended = true;
    stream && await new Promise((r) => (stream.once("close", r), stream.end()));
    return end();
  };
  sql.close = async () => {
    stream && await new Promise((r) => (stream.once("close", r), stream.end()));
    return close();
  };
  return subscribe;
  async function subscribe(event, fn, onsubscribe = noop2) {
    event = parseEvent(event);
    if (!connection2)
      connection2 = init(sql, slot, options2.publications);
    const subscriber = { fn, onsubscribe };
    const fns = subscribers.has(event) ? subscribers.get(event).add(subscriber) : subscribers.set(event, /* @__PURE__ */ new Set([subscriber])).get(event);
    const unsubscribe = () => {
      fns.delete(subscriber);
      fns.size === 0 && subscribers.delete(event);
    };
    return connection2.then((x) => {
      connected(x);
      onsubscribe();
      return { unsubscribe, state, sql };
    });
  }
  function connected(x) {
    stream = x.stream;
    state.pid = x.state.pid;
    state.secret = x.state.secret;
  }
  async function init(sql2, slot2, publications) {
    if (!publications)
      throw new Error("Missing publication names");
    const xs = await sql2.unsafe(
      `CREATE_REPLICATION_SLOT ${slot2} TEMPORARY LOGICAL pgoutput NOEXPORT_SNAPSHOT`
    );
    const [x] = xs;
    const stream2 = await sql2.unsafe(
      `START_REPLICATION SLOT ${slot2} LOGICAL ${x.consistent_point} (proto_version '1', publication_names '${publications}')`
    ).writable();
    const state2 = {
      lsn: Buffer.concat(x.consistent_point.split("/").map((x2) => Buffer.from(("00000000" + x2).slice(-8), "hex")))
    };
    stream2.on("data", data);
    stream2.on("error", sql2.close);
    stream2.on("close", sql2.close);
    return { stream: stream2, state: xs.state };
    function data(x2) {
      if (x2[0] === 119)
        parse(x2.subarray(25), state2, sql2.options.parsers, handle, options2.transform);
      else if (x2[0] === 107 && x2[17])
        pong();
    }
    function handle(a, b2) {
      const path = b2.relation.schema + "." + b2.relation.table;
      call("*", a, b2);
      call("*:" + path, a, b2);
      b2.relation.keys.length && call("*:" + path + "=" + b2.relation.keys.map((x2) => a[x2.name]), a, b2);
      call(b2.command, a, b2);
      call(b2.command + ":" + path, a, b2);
      b2.relation.keys.length && call(b2.command + ":" + path + "=" + b2.relation.keys.map((x2) => a[x2.name]), a, b2);
    }
    function pong() {
      const x2 = Buffer.alloc(34);
      x2[0] = "r".charCodeAt(0);
      x2.fill(state2.lsn, 1);
      x2.writeBigInt64BE(BigInt(Date.now() - Date.UTC(2e3, 0, 1)) * BigInt(1e3), 25);
      stream2.write(x2);
    }
  }
  function call(x, a, b2) {
    subscribers.has(x) && subscribers.get(x).forEach(({ fn }) => fn(a, b2, x));
  }
}
function Time(x) {
  return new Date(Date.UTC(2e3, 0, 1) + Number(x / BigInt(1e3)));
}
function parse(x, state, parsers2, handle, transform) {
  const char = (acc, [k, v]) => (acc[k.charCodeAt(0)] = v, acc);
  Object.entries({
    R: (x2) => {
      let i = 1;
      const r = state[x2.readUInt32BE(i)] = {
        schema: x2.toString("utf8", i += 4, i = x2.indexOf(0, i)) || "pg_catalog",
        table: x2.toString("utf8", i + 1, i = x2.indexOf(0, i + 1)),
        columns: Array(x2.readUInt16BE(i += 2)),
        keys: []
      };
      i += 2;
      let columnIndex = 0, column;
      while (i < x2.length) {
        column = r.columns[columnIndex++] = {
          key: x2[i++],
          name: transform.column.from ? transform.column.from(x2.toString("utf8", i, i = x2.indexOf(0, i))) : x2.toString("utf8", i, i = x2.indexOf(0, i)),
          type: x2.readUInt32BE(i += 1),
          parser: parsers2[x2.readUInt32BE(i)],
          atttypmod: x2.readUInt32BE(i += 4)
        };
        column.key && r.keys.push(column);
        i += 4;
      }
    },
    Y: () => {
    },
    O: () => {
    },
    B: (x2) => {
      state.date = Time(x2.readBigInt64BE(9));
      state.lsn = x2.subarray(1, 9);
    },
    I: (x2) => {
      let i = 1;
      const relation = state[x2.readUInt32BE(i)];
      const { row } = tuples(x2, relation.columns, i += 7, transform);
      handle(row, {
        command: "insert",
        relation
      });
    },
    D: (x2) => {
      let i = 1;
      const relation = state[x2.readUInt32BE(i)];
      i += 4;
      const key2 = x2[i] === 75;
      handle(
        key2 || x2[i] === 79 ? tuples(x2, key2 ? relation.keys : relation.columns, i += 3, transform).row : null,
        {
          command: "delete",
          relation,
          key: key2
        }
      );
    },
    U: (x2) => {
      let i = 1;
      const relation = state[x2.readUInt32BE(i)];
      i += 4;
      const key2 = x2[i] === 75;
      const xs = key2 || x2[i] === 79 ? tuples(x2, key2 ? relation.keys : relation.columns, i += 3, transform) : null;
      xs && (i = xs.i);
      const { row } = tuples(x2, relation.columns, i + 3, transform);
      handle(row, {
        command: "update",
        relation,
        key: key2,
        old: xs && xs.row
      });
    },
    T: () => {
    },
    C: () => {
    }
  }).reduce(char, {})[x[0]](x);
}
function tuples(x, columns, xi, transform) {
  let type, column, value;
  const row = transform.raw ? new Array(columns.length) : {};
  for (let i = 0; i < columns.length; i++) {
    type = x[xi++];
    column = columns[i];
    value = type === 110 ? null : type === 117 ? void 0 : column.parser === void 0 ? x.toString("utf8", xi + 4, xi += 4 + x.readUInt32BE(xi)) : column.parser.array === true ? column.parser(x.toString("utf8", xi + 5, xi += 4 + x.readUInt32BE(xi))) : column.parser(x.toString("utf8", xi + 4, xi += 4 + x.readUInt32BE(xi)));
    transform.raw ? row[i] = transform.raw === true ? value : transform.value.from ? transform.value.from(value, column) : value : row[column.name] = transform.value.from ? transform.value.from(value, column) : value;
  }
  return { i: xi, row: transform.row.from ? transform.row.from(row) : row };
}
function parseEvent(x) {
  const xs = x.match(/^(\*|insert|update|delete)?:?([^.]+?\.?[^=]+)?=?(.+)?/i) || [];
  if (!xs)
    throw new Error("Malformed subscribe pattern: " + x);
  const [, command, path, key2] = xs;
  return (command || "*") + (path ? ":" + (path.indexOf(".") === -1 ? "public." + path : path) : "") + (key2 ? "=" + key2 : "");
}

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/large.js
import Stream2 from "stream";
function largeObject(sql, oid, mode = 131072 | 262144) {
  return new Promise(async (resolve, reject) => {
    await sql.begin(async (sql2) => {
      let finish;
      !oid && ([{ oid }] = await sql2`select lo_creat(-1) as oid`);
      const [{ fd }] = await sql2`select lo_open(${oid}, ${mode}) as fd`;
      const lo = {
        writable,
        readable,
        close: () => sql2`select lo_close(${fd})`.then(finish),
        tell: () => sql2`select lo_tell64(${fd})`,
        read: (x) => sql2`select loread(${fd}, ${x}) as data`,
        write: (x) => sql2`select lowrite(${fd}, ${x})`,
        truncate: (x) => sql2`select lo_truncate64(${fd}, ${x})`,
        seek: (x, whence = 0) => sql2`select lo_lseek64(${fd}, ${x}, ${whence})`,
        size: () => sql2`
          select
            lo_lseek64(${fd}, location, 0) as position,
            seek.size
          from (
            select
              lo_lseek64($1, 0, 2) as size,
              tell.location
            from (select lo_tell64($1) as location) tell
          ) seek
        `
      };
      resolve(lo);
      return new Promise(async (r) => finish = r);
      async function readable({
        highWaterMark = 2048 * 8,
        start = 0,
        end = Infinity
      } = {}) {
        let max = end - start;
        start && await lo.seek(start);
        return new Stream2.Readable({
          highWaterMark,
          async read(size2) {
            const l = size2 > max ? size2 - max : size2;
            max -= size2;
            const [{ data }] = await lo.read(l);
            this.push(data);
            if (data.length < size2)
              this.push(null);
          }
        });
      }
      async function writable({
        highWaterMark = 2048 * 8,
        start = 0
      } = {}) {
        start && await lo.seek(start);
        return new Stream2.Writable({
          highWaterMark,
          write(chunk, encoding, callback) {
            lo.write(chunk).then(() => callback(), callback);
          }
        });
      }
    }).catch(reject);
  });
}

// ../../node_modules/.pnpm/postgres@3.3.1/node_modules/postgres/src/index.js
Object.assign(Postgres, {
  PostgresError,
  toPascal,
  pascal,
  toCamel,
  camel,
  toKebab,
  kebab,
  fromPascal,
  fromCamel,
  fromKebab,
  BigInt: {
    to: 20,
    from: [20],
    parse: (x) => BigInt(x),
    serialize: (x) => x.toString()
  }
});
var src_default2 = Postgres;
function Postgres(a, b2) {
  const options2 = parseOptions(a, b2), subscribe = options2.no_subscribe || Subscribe(Postgres, { ...options2 });
  let ending = false;
  const queries = queue_default(), connecting = queue_default(), reserved = queue_default(), closed = queue_default(), ended = queue_default(), open = queue_default(), busy = queue_default(), full = queue_default(), queues = { connecting, reserved, closed, ended, open, busy, full };
  const connections = [...Array(options2.max)].map(() => connection_default(options2, queues, { onopen, onend, onclose }));
  const sql = Sql(handler);
  Object.assign(sql, {
    get parameters() {
      return options2.parameters;
    },
    largeObject: largeObject.bind(null, sql),
    subscribe,
    CLOSE,
    END: CLOSE,
    PostgresError,
    options: options2,
    listen,
    notify,
    begin,
    close,
    end
  });
  return sql;
  function Sql(handler2, instant) {
    handler2.debug = options2.debug;
    Object.entries(options2.types).reduce((acc, [name2, type]) => {
      acc[name2] = (x) => new Parameter(x, type.to);
      return acc;
    }, typed);
    Object.assign(sql2, {
      types: typed,
      typed,
      unsafe,
      array,
      json,
      file
    });
    return sql2;
    function typed(value, type) {
      return new Parameter(value, type);
    }
    function sql2(strings2, ...args) {
      const query = strings2 && Array.isArray(strings2.raw) ? new Query(strings2, args, handler2, cancel) : typeof strings2 === "string" && !args.length ? new Identifier(options2.transform.column.to ? options2.transform.column.to(strings2) : strings2) : new Builder(strings2, args);
      instant && query instanceof Query && query.execute();
      return query;
    }
    function unsafe(string, args = [], options3 = {}) {
      arguments.length === 2 && !Array.isArray(args) && (options3 = args, args = []);
      const query = new Query([string], args, handler2, cancel, {
        prepare: false,
        ...options3,
        simple: "simple" in options3 ? options3.simple : args.length === 0
      });
      instant && query.execute();
      return query;
    }
    function file(path, args = [], options3 = {}) {
      arguments.length === 2 && !Array.isArray(args) && (options3 = args, args = []);
      const query = new Query([], args, (query2) => {
        fs.readFile(path, "utf8", (err2, string) => {
          if (err2)
            return query2.reject(err2);
          query2.strings = [string];
          handler2(query2);
        });
      }, cancel, {
        ...options3,
        simple: "simple" in options3 ? options3.simple : args.length === 0
      });
      instant && query.execute();
      return query;
    }
  }
  async function listen(name2, fn, onlisten) {
    const listener = { fn, onlisten };
    const sql2 = listen.sql || (listen.sql = Postgres({
      ...options2,
      max: 1,
      idle_timeout: null,
      max_lifetime: null,
      fetch_types: false,
      onclose() {
        Object.entries(listen.channels).forEach(([name3, { listeners }]) => {
          delete listen.channels[name3];
          Promise.all(listeners.map((l) => listen(name3, l.fn, l.onlisten).catch(() => {
          })));
        });
      },
      onnotify(c, x) {
        c in listen.channels && listen.channels[c].listeners.forEach((l) => l.fn(x));
      }
    }));
    const channels = listen.channels || (listen.channels = {}), exists = name2 in channels;
    if (exists) {
      channels[name2].listeners.push(listener);
      const result2 = await channels[name2].result;
      listener.onlisten && listener.onlisten();
      return { state: result2.state, unlisten };
    }
    channels[name2] = { result: sql2`listen ${sql2(name2)}`, listeners: [listener] };
    const result = await channels[name2].result;
    listener.onlisten && listener.onlisten();
    return { state: result.state, unlisten };
    async function unlisten() {
      if (name2 in channels === false)
        return;
      channels[name2].listeners = channels[name2].listeners.filter((x) => x !== listener);
      if (channels[name2].listeners.length)
        return;
      delete channels[name2];
      return sql2`unlisten ${sql2(name2)}`;
    }
  }
  async function notify(channel, payload) {
    return await sql`select pg_notify(${channel}, ${"" + payload})`;
  }
  async function begin(options3, fn) {
    !fn && (fn = options3, options3 = "");
    const queries2 = queue_default();
    let savepoints = 0, connection2;
    try {
      await sql.unsafe("begin " + options3.replace(/[^a-z ]/ig, ""), [], { onexecute }).execute();
      return await scope(connection2, fn);
    } catch (error) {
      throw error;
    }
    async function scope(c, fn2, name2) {
      const sql2 = Sql(handler2);
      sql2.savepoint = savepoint;
      let uncaughtError, result;
      name2 && await sql2`savepoint ${sql2(name2)}`;
      try {
        result = await new Promise((resolve, reject) => {
          const x = fn2(sql2);
          Promise.resolve(Array.isArray(x) ? Promise.all(x) : x).then(resolve, reject);
        });
        if (uncaughtError)
          throw uncaughtError;
      } catch (e) {
        await (name2 ? sql2`rollback to ${sql2(name2)}` : sql2`rollback`);
        throw e instanceof PostgresError && e.code === "25P02" && uncaughtError || e;
      }
      !name2 && await sql2`commit`;
      return result;
      function savepoint(name3, fn3) {
        if (name3 && Array.isArray(name3.raw))
          return savepoint((sql3) => sql3.apply(sql3, arguments));
        arguments.length === 1 && (fn3 = name3, name3 = null);
        return scope(c, fn3, "s" + savepoints++ + (name3 ? "_" + name3 : ""));
      }
      function handler2(q) {
        q.catch((e) => uncaughtError || (uncaughtError = e));
        c.queue === full ? queries2.push(q) : c.execute(q) || move(c, full);
      }
    }
    function onexecute(c) {
      connection2 = c;
      move(c, reserved);
      c.reserved = () => queries2.length ? c.execute(queries2.shift()) : move(c, reserved);
    }
  }
  function move(c, queue) {
    c.queue.remove(c);
    queue.push(c);
    c.queue = queue;
    queue === open ? c.idleTimer.start() : c.idleTimer.cancel();
  }
  function json(x) {
    return new Parameter(x, 3802);
  }
  function array(x, type) {
    if (!Array.isArray(x))
      return array(Array.from(arguments));
    return new Parameter(x, type || (x.length ? inferType(x) || 25 : 0), options2.shared.typeArrayMap);
  }
  function handler(query) {
    if (ending)
      return query.reject(Errors.connection("CONNECTION_ENDED", options2, options2));
    if (open.length)
      return go(open.shift(), query);
    if (closed.length)
      return connect(closed.shift(), query);
    busy.length ? go(busy.shift(), query) : queries.push(query);
  }
  function go(c, query) {
    return c.execute(query) ? move(c, busy) : move(c, full);
  }
  function cancel(query) {
    return new Promise((resolve, reject) => {
      query.state ? query.active ? connection_default(options2).cancel(query.state, resolve, reject) : query.cancelled = { resolve, reject } : (queries.remove(query), query.cancelled = true, query.reject(Errors.generic("57014", "canceling statement due to user request")), resolve());
    });
  }
  async function end({ timeout = null } = {}) {
    if (ending)
      return ending;
    await 1;
    let timer2;
    return ending = Promise.race([
      new Promise((r) => timeout !== null && (timer2 = setTimeout(destroy, timeout * 1e3, r))),
      Promise.all(connections.map((c) => c.end()).concat(
        listen.sql ? listen.sql.end({ timeout: 0 }) : [],
        subscribe.sql ? subscribe.sql.end({ timeout: 0 }) : []
      ))
    ]).then(() => clearTimeout(timer2));
  }
  async function close() {
    await Promise.all(connections.map((c) => c.end()));
  }
  async function destroy(resolve) {
    await Promise.all(connections.map((c) => c.terminate()));
    while (queries.length)
      queries.shift().reject(Errors.connection("CONNECTION_DESTROYED", options2));
    resolve();
  }
  function connect(c, query) {
    move(c, connecting);
    c.connect(query);
  }
  function onend(c) {
    move(c, ended);
  }
  function onopen(c) {
    if (queries.length === 0)
      return move(c, open);
    let max = Math.ceil(queries.length / (connecting.length + 1)), ready = true;
    while (ready && queries.length && max-- > 0)
      ready = c.execute(queries.shift());
    ready ? move(c, busy) : move(c, full);
  }
  function onclose(c) {
    move(c, closed);
    c.reserved = null;
    options2.onclose && options2.onclose(c.id);
    queries.length && connect(c, queries.shift());
  }
}
function parseOptions(a, b2) {
  if (a && a.shared)
    return a;
  const env3 = process.env, o = (typeof a === "string" ? b2 : a) || {}, { url, multihost } = parseUrl(a), query = [...url.searchParams].reduce((a2, [b3, c]) => (a2[b3] = c, a2), {}), host = o.hostname || o.host || multihost || url.hostname || env3.PGHOST || "localhost", port = o.port || url.port || env3.PGPORT || 5432, user = o.user || o.username || url.username || env3.PGUSERNAME || env3.PGUSER || osUsername();
  o.no_prepare && (o.prepare = false);
  query.sslmode && (query.ssl = query.sslmode, delete query.sslmode);
  "timeout" in o && (console.log("The timeout option is deprecated, use idle_timeout instead"), o.idle_timeout = o.timeout);
  const defaults2 = {
    max: 10,
    ssl: false,
    idle_timeout: null,
    connect_timeout: 30,
    max_lifetime,
    max_pipeline: 100,
    backoff,
    keep_alive: 60,
    prepare: true,
    debug: false,
    fetch_types: true,
    publications: "alltables",
    target_session_attrs: null
  };
  return {
    host: Array.isArray(host) ? host : host.split(",").map((x) => x.split(":")[0]),
    port: Array.isArray(port) ? port : host.split(",").map((x) => parseInt(x.split(":")[1] || port)),
    path: o.path || host.indexOf("/") > -1 && host + "/.s.PGSQL." + port,
    database: o.database || o.db || (url.pathname || "").slice(1) || env3.PGDATABASE || user,
    user,
    pass: o.pass || o.password || url.password || env3.PGPASSWORD || "",
    ...Object.entries(defaults2).reduce(
      (acc, [k, d]) => (acc[k] = k in o ? o[k] : k in query ? query[k] === "disable" || query[k] === "false" ? false : query[k] : env3["PG" + k.toUpperCase()] || d, acc),
      {}
    ),
    connection: {
      application_name: "postgres.js",
      ...o.connection,
      ...Object.entries(query).reduce((acc, [k, v]) => (k in defaults2 || (acc[k] = v), acc), {})
    },
    types: o.types || {},
    target_session_attrs: tsa(o, url, env3),
    onnotice: o.onnotice,
    onnotify: o.onnotify,
    onclose: o.onclose,
    onparameter: o.onparameter,
    socket: o.socket,
    transform: parseTransform(o.transform || { undefined: void 0 }),
    parameters: {},
    shared: { retries: 0, typeArrayMap: {} },
    ...mergeUserTypes(o.types)
  };
}
function tsa(o, url, env3) {
  const x = o.target_session_attrs || url.searchParams.get("target_session_attrs") || env3.PGTARGETSESSIONATTRS;
  if (!x || ["read-write", "read-only", "primary", "standby", "prefer-standby"].includes(x))
    return x;
  throw new Error("target_session_attrs " + x + " is not supported");
}
function backoff(retries) {
  return (0.5 + Math.random() / 2) * Math.min(3 ** retries / 100, 20);
}
function max_lifetime() {
  return 60 * (30 + Math.random() * 30);
}
function parseTransform(x) {
  return {
    undefined: x.undefined,
    column: {
      from: typeof x.column === "function" ? x.column : x.column && x.column.from,
      to: x.column && x.column.to
    },
    value: {
      from: typeof x.value === "function" ? x.value : x.value && x.value.from,
      to: x.value && x.value.to
    },
    row: {
      from: typeof x.row === "function" ? x.row : x.row && x.row.from,
      to: x.row && x.row.to
    }
  };
}
function parseUrl(url) {
  if (typeof url !== "string")
    return { url: { searchParams: /* @__PURE__ */ new Map() } };
  let host = url;
  host = host.slice(host.indexOf("://") + 3).split(/[?/]/)[0];
  host = decodeURIComponent(host.slice(host.indexOf("@") + 1));
  return {
    url: new URL(url.replace(host, host.split(",")[0])),
    multihost: host.indexOf(",") > -1 && host
  };
}
function osUsername() {
  try {
    return os.userInfo().username;
  } catch (_) {
    return process.env.USERNAME || process.env.USER || process.env.LOGNAME;
  }
}

// CONST/PG_URI.js
var PG_DB;
var PG_HOST;
var PG_PASSWORD;
var PG_PORT;
var PG_USER;
({
  env: { PG_HOST, PG_DB, PG_USER, PG_PORT, PG_PASSWORD }
} = process);
var PG_URI_default = `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`;

// db/PgConn.js
var import_prexit2 = __toESM(require_prexit());
var PG_POOL_CONN;
var PG_SSL;
({
  env: { PG_SSL, PG_POOL_CONN }
} = process);
var PgConn_default = (types3) => {
  var pg;
  pg = src_default2(PG_URI_default, {
    prepare: true,
    max: parseInt(PG_POOL_CONN) || 32,
    ssl: PG_SSL || false,
    types: types3
  });
  (0, import_prexit2.default)(async () => {
    await pg.end({
      timeout: 5
    });
  });
  return pg;
};

// ../../node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red2, green, blue) => `\x1B[${38 + offset};2;${red2};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    blackBright: [90, 39],
    gray: [90, 39],
    grey: [90, 39],
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red2, green, blue) {
        if (red2 === green && green === blue) {
          if (red2 < 8) {
            return 16;
          }
          if (red2 > 248) {
            return 231;
          }
          return Math.round((red2 - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red2 / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red2;
        let green;
        let blue;
        if (code >= 232) {
          red2 = ((code - 232) * 10 + 8) / 255;
          green = red2;
          blue = red2;
        } else {
          code -= 16;
          const remainder = code % 36;
          red2 = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red2, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red2));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red2, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red2, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// ../../node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/vendor/supports-color/index.js
import process2 from "node:process";
import os2 from "node:os";
import tty from "node:tty";
function hasFlag(flag, argv = process2.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position3 = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position3 !== -1 && (terminatorPosition === -1 || position3 < terminatorPosition);
}
var { env: env2 } = process2;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env2) {
    if (env2.FORCE_COLOR === "true") {
      return 1;
    }
    if (env2.FORCE_COLOR === "false") {
      return 0;
    }
    return env2.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env2.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env2.TERM === "dumb") {
    return min;
  }
  if (process2.platform === "win32") {
    const osRelease = os2.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env2) {
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((sign) => sign in env2) || env2.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env2) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
  }
  if ("TF_BUILD" in env2 && "AGENT_NAME" in env2) {
    return 1;
  }
  if (env2.COLORTERM === "truecolor") {
    return 3;
  }
  if ("TERM_PROGRAM" in env2) {
    const version = Number.parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env2.TERM_PROGRAM) {
      case "iTerm.app":
        return version >= 3 ? 3 : 2;
      case "Apple_Terminal":
        return 2;
    }
  }
  if (/-256(color)?$/i.test(env2.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env2.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env2) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options2 = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options2
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;

// ../../node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// ../../node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options2 = {}) => {
  if (options2.level && !(Number.isInteger(options2.level) && options2.level >= 0 && options2.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options2.level === void 0 ? colorLevel : options2.level;
};
var chalkFactory = (options2) => {
  const chalk2 = (...strings2) => strings2.join(" ");
  applyOptions(chalk2, options2);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options2) {
  return chalkFactory(options2);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self2, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self2;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self2, string) => {
  if (self2.level <= 0 || !string) {
    return self2[IS_EMPTY] ? "" : string;
  }
  let styler = self2[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// db/pg.js
import PG_UINT from "~/CONST/PG_UINT.js";
var Q;
var _sql;
var _try;
var bgRedBright;
var gray;
var greenBright;
var name;
var red;
var sql_escape;
var types2;
var val;
var y;
({ red, bgRedBright, greenBright, gray } = source_default);
types2 = {};
for (y of PG_UINT) {
  [val, name] = y;
  types2[name] = {
    to: val,
    from: [val],
    serialize: (x) => {
      return x.toString();
    },
    parse: (x) => {
      return parseInt(x);
    }
  };
}
var PG = PgConn_default(types2);
sql_escape = (i) => {
  if (i instanceof Uint8Array) {
    return i = "'\\x" + Buffer.from(i).toString("hex") + "'::bytea";
  } else {
    switch (typeof i) {
      case "string":
        return "'" + i.replaceAll("'", "\\'") + "'";
    }
    return i + "";
  }
};
_sql = async (args) => {
  var base2, first, i, li, r, ref, string;
  li = [];
  ref = args.slice(1);
  for (i of ref) {
    ({ first } = i);
    if (first) {
      li = li.concat(first.map(sql_escape));
    } else {
      li.push(sql_escape(i));
    }
  }
  r = await (typeof (base2 = PG(args[0], ...args.slice(1))).describe === "function" ? base2.describe() : void 0);
  if (r) {
    ({ string } = r);
  } else {
    string = args[0];
  }
  return string.replace(/(\$\d+)/g, (x) => {
    return li[x.slice(1) - 1];
  });
};
if (false) {
  _try = (func) => {
    return async (...args) => {
      var begin, err2, r;
      begin = new Date();
      try {
        r = await func.apply(func, args);
      } catch (error) {
        err2 = error;
        console.trace();
        console.error(bgRedBright(err2.message));
        console.error(red(await _sql(args)));
        return [];
      }
      console.log(gray(Math.round(new Date() - begin) / 1e3 + "s"), greenBright(await _sql(args)));
      return r;
    };
  };
} else {
  _try = (func) => {
    return async (...args) => {
      var err2;
      try {
        return await func.apply(func, args);
      } catch (error) {
        err2 = error;
        console.trace();
        console.error(bgRedBright(err2.message));
        console.error(red(await _sql(args)));
      }
      return [];
    };
  };
}
Q = _try(async (sql, args) => {
  return await PG(sql, ...args).values();
});
var UNSAFE = _try(async (query, ...args) => {
  return await PG.unsafe(query, args).values();
});
var RAW = _try((sql, ...args) => {
  return PG(sql, ...args).raw();
});
var INSERT = new Proxy({}, {
  get: (_, table) => {
    return (...li) => {
      return RAW`INSERT INTO ${PG(table)} VALUES ${PG(li)}`;
    };
  }
});

// db/pg/signupMail.js
var signupMail_default = async (client_id, oid, mail_id, ctime, password_hash) => {
  return (await UNSAFE(
    "SELECT signup_mail($1,$2,$3,$4,$5)",
    client_id,
    oid,
    mail_id,
    ctime,
    password_hash
  ))[0][0];
};

// I18N.js
var I18N_default = { "hy": { "signUp": "\u0563\u0580\u0561\u0576\u0581\u057E\u0565\u056C", "resetPassword": "\u054E\u0565\u0580\u0561\u056F\u0561\u0576\u0563\u0576\u0565\u056C \u0563\u0561\u0572\u057F\u0576\u0561\u0562\u0561\u057C\u0568" }, "tg": { "signUp": "\u049B\u0430\u0439\u0434 \u043A\u0430\u0440\u0434\u0430\u043D", "resetPassword": "\u0420\u0430\u043C\u0437 \u0431\u0430\u0440\u049B\u0430\u0440\u043E\u0440 \u043A\u0443\u043D\u0435\u0434" }, "zh": { "signUp": "\u6CE8\u518C", "resetPassword": "\u91CD\u8BBE\u5BC6\u7801" }, "ps": { "signUp": "\u06AB\u0689\u0648\u0646 \u06A9\u0648\u0644", "resetPassword": "\u0634\u0641\u0631 \u0628\u06CC\u0627 \u062C\u0648\u0693 \u06A9\u0693\u0626" }, "tr": { "signUp": "\xFCye olmak", "resetPassword": "\u015Fifreyi yenile" }, "or": { "signUp": "\u0B38\u0B3E\u0B07\u0B28\u0B4D \u0B05\u0B2A\u0B4D \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41", "resetPassword": "\u0B2A\u0B3E\u0B38\u0B71\u0B3E\u0B30\u0B4D\u0B21 \u0B2A\u0B41\u0B28 Res \u0B38\u0B47\u0B1F\u0B4D \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41" }, "mk": { "signUp": "\u041F\u0440\u0438\u0458\u0430\u0432\u0443\u0432\u0430\u045A\u0435", "resetPassword": "\u0420\u0435\u0441\u0435\u0442\u0438\u0440\u0430\u045A\u0435 \u043D\u0430 \u041B\u043E\u0437\u0438\u043D\u043A\u0430" }, "qu": { "signUp": "Qillqakuy", "resetPassword": "Yaykuna rimata kutichiy" }, "sl": { "signUp": "prijava", "resetPassword": "ponastavitev gesla" }, "tk": { "signUp": "hasaba aly\u015F", "resetPassword": "paroly t\xE4zeden d\xFCzmek" }, "hu": { "signUp": "regisztr\xE1lj", "resetPassword": "Jelsz\xF3 vissza\xE1ll\xEDt\xE1sa" }, "su": { "signUp": "daptar", "resetPassword": "Reset kecap konci" }, "mr": { "signUp": "\u0938\u093E\u0907\u0928\u0905\u092A", "resetPassword": "\u0938\u0902\u0915\u0947\u0924\u0936\u092C\u094D\u0926 \u0930\u0940\u0938\u0947\u091F \u0915\u0930\u093E" }, "lt": { "signUp": "Registruotis", "resetPassword": "Atstatyti slapta\u017Eod\u012F" }, "ee": { "signUp": "De asi agbal\u1EBD te", "resetPassword": "Gbugb\u0254 \u0256o nyagbe \u0263a\u0263la la \u0256e \u0256o\u0256o nu" }, "is": { "signUp": "skr\xE1\xF0u \xFEig", "resetPassword": "endur stilla lykilor\xF0" }, "la": { "signUp": "signup", "resetPassword": "reset password" }, "bn": { "signUp": "\u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u09A8 \u0995\u09B0\u09C1\u09A8", "resetPassword": "\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u09B0\u09BF\u09B8\u09C7\u099F \u0995\u09B0\u09C1\u09A8" }, "xh": { "signUp": "bhalisa", "resetPassword": "Hlela iphasiwedi" }, "mg": { "signUp": "Hiditra Mpikambana", "resetPassword": "Avereno ny tenimiafina" }, "sa": { "signUp": "\u092A\u091E\u094D\u091C\u0940\u0915\u0930\u0923\u092E\u094D \u0968", "resetPassword": "\u0917\u0941\u092A\u094D\u0924\u0936\u092C\u094D\u0926\u0902 \u092A\u0941\u0928\u0903 \u0938\u0947\u091F\u094D \u0915\u0941\u0930\u094D\u0935\u0928\u094D\u0924\u0941" }, "ha": { "signUp": "yi hannu", "resetPassword": "Sake saita kalmar sirri" }, "ig": { "signUp": "debanye aha", "resetPassword": "t\u1ECDghar\u1ECBa pasw\u1ECD\u1ECDd\u1EE5" }, "yo": { "signUp": "foruk\u1ECDsil\u1EB9", "resetPassword": "Tun \u1ECDr\u1ECD igbaniw\u1ECDle Tun" }, "ny": { "signUp": "Lowani", "resetPassword": "bweretsani achinsinsi" }, "kk": { "signUp": "\u0442\u0456\u0440\u043A\u0435\u043B\u0443", "resetPassword": "\u049A\u04B1\u043F\u0438\u044F \u0441\u04E9\u0437\u0434\u0456 \u049B\u0430\u043B\u043F\u044B\u043D\u0430 \u043A\u0435\u043B\u0442\u0456\u0440\u0456\u04A3\u0456\u0437" }, "nl": { "signUp": "aanmelden", "resetPassword": "Reset wachtwoord" }, "ms": { "signUp": "pendaftaran", "resetPassword": "menetapkan semula kata laluan" }, "st": { "signUp": "ngolisa", "resetPassword": "Seta password" }, "ht": { "signUp": "enskri", "resetPassword": "Reyajiste modpas" }, "sm": { "signUp": "saini loa", "resetPassword": "Toe setiina upu faataga" }, "ts": { "signUp": "Ku tsarisa", "resetPassword": "Reset password" }, "gd": { "signUp": "Cuir d\u2019ainm ris", "resetPassword": "Ath-shuidheachadh facal-faire" }, "ja": { "signUp": "\u30B5\u30A4\u30F3\u30A2\u30C3\u30D7", "resetPassword": "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u518D\u8A2D\u5B9A\u3059\u308B" }, "de": { "signUp": "Anmelden", "resetPassword": "Passwort zur\xFCcksetzen" }, "om": { "signUp": "Mallattoo", "resetPassword": "Jecha icciitii irra deebi'ii kaa'i" }, "mt": { "signUp": "Irregistra", "resetPassword": "Irrisettja l-password" }, "ru": { "signUp": "\u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F", "resetPassword": "\u0421\u0431\u0440\u043E\u0441 \u043F\u0430\u0440\u043E\u043B\u044F" }, "pl": { "signUp": "Zapisz si\u0119", "resetPassword": "Zresetuj has\u0142o" }, "uk": { "signUp": "\u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F", "resetPassword": "\u0441\u043A\u0438\u043D\u0443\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C" }, "zh-TW": { "signUp": "\u8A3B\u518A", "resetPassword": "\u91CD\u8A2D\u5BC6\u78BC" }, "lg": { "signUp": "Okwewandiisa", "resetPassword": "Reset ekigambo ky'okuyingira" }, "ky": { "signUp": "\u043A\u0438\u0440\u04AF\u04AF", "resetPassword": "\u0421\u044B\u0440\u0441\u04E9\u0437\u0434\u04AF \u043A\u0430\u043B\u044B\u0431\u044B\u043D\u0430 \u043A\u0435\u043B\u0442\u0438\u0440\u04AF\u04AF" }, "fi": { "signUp": "Kirjaudu", "resetPassword": "Nollaa salasana" }, "ta": { "signUp": "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0BAA\u0BC6\u0BB1\u0BC1\u0BA4\u0BB2\u0BCD", "resetPassword": "\u0B95\u0B9F\u0BB5\u0BC1\u0B9A\u0BCD\u0B9A\u0BC6\u0BBE\u0BB2\u0BCD\u0BB2\u0BC8 \u0BAE\u0BC0\u0B9F\u0BCD\u0B9F\u0BAE\u0BC8\u0B95\u0BCD\u0B95" }, "fil": { "signUp": "pag -signup", "resetPassword": "I -reset ang password" }, "eo": { "signUp": "Subskribado", "resetPassword": "Restarigi pasvorton" }, "ug": { "signUp": "adisp", "resetPassword": "\u067E\u0627\u0631\u0648\u0644\u0646\u0649 \u0626\u06D5\u0633\u0644\u0649\u06AF\u06D5 \u0643\u06D5\u0644\u062A\u06C8\u0631\u06C8\u06AD" }, "ku": { "signUp": "tomar kirin", "resetPassword": "Password\xEEfreya Reset" }, "ur": { "signUp": "\u0633\u0627\u0626\u0646 \u0627\u067E", "resetPassword": "\u067E\u0627\u0633 \u0648\u0631\u0688 \u0631\u06CC \u0633\u06CC\u0679" }, "tt": { "signUp": "\u0422\u0435\u0440\u043A\u04D9\u043B\u0435\u0440\u0433\u04D9", "resetPassword": "\u0421\u0435\u0440\u0441\u04AF\u0437\u043D\u0435 \u044F\u04A3\u0430\u0434\u0430\u043D \u0442\u043E\u0440\u0433\u044B\u0437\u0443" }, "sk": { "signUp": "Prihl\xE1si\u0165 Se", "resetPassword": "obnovi\u0165 heslo" }, "ml": { "signUp": "\u0D38\u0D48\u0D7B \u0D05\u0D2A\u0D4D\u0D2A\u0D4D \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D41\u0D15", "resetPassword": "\u0D2A\u0D3E\u0D38\u0D4D\u0D35\u0D47\u0D21\u0D4D \u0D2A\u0D41\u0D28 reset \u0D38\u0D1C\u0D4D\u0D1C\u0D2E\u0D3E\u0D15\u0D4D\u0D15\u0D41\u0D15" }, "ckb": { "signUp": "\u062E\u06C6\u062A \u062A\u06C6\u0645\u0627\u0631 \u0628\u06A9\u06D5", "resetPassword": "\u0648\u0634\u06D5\u06CC \u0646\u0647\u06CE\u0646\u06CC \u0695\u06CE\u06A9\u0628\u062E\u06D5\u0631\u06D5\u0648\u06D5" }, "az": { "signUp": "qeydiyyatdan ke\xE7m\u0259k", "resetPassword": "Parolu s\u0131f\u0131rlamak" }, "pt": { "signUp": "inscrever-se", "resetPassword": "redefinir senha" }, "be": { "signUp": "\u0437\u0430\u0440\u044D\u0433\u0456\u0441\u0442\u0440\u0430\u0432\u0430\u0446\u0446\u0430", "resetPassword": "\u0421\u043A\u0456\u043D\u0443\u0446\u044C \u043F\u0430\u0440\u043E\u043B\u044C" }, "en": { "signUp": "signup", "resetPassword": "reset password" }, "ka": { "signUp": "\u10D3\u10D0\u10E0\u10D4\u10D2\u10D8\u10E1\u10E2\u10E0\u10D8\u10E0\u10D4\u10D1\u10D0", "resetPassword": "\u10DE\u10D0\u10E0\u10DD\u10DA\u10D8\u10E1 \u10D2\u10D0\u10D3\u10D0\u10E2\u10D5\u10D8\u10E0\u10D7\u10D5\u10D0" }, "pa": { "signUp": "\u0A38\u0A3E\u0A07\u0A28 \u0A05\u0A2A", "resetPassword": "\u0A2A\u0A3E\u0A38\u0A35\u0A30\u0A21 \u0A30\u0A40\u0A38\u0A48\u0A1F \u0A15\u0A30\u0A4B" }, "kri": { "signUp": "Sayn ap", "resetPassword": "Riset pasw\u0254d" }, "my": { "signUp": "\u1006\u102D\u102F\u1004\u103A\u1038\u1021\u1015\u103A", "resetPassword": "\u101C\u103B\u103E\u102D\u102F\u1037\u101D\u103E\u1010\u103A\u1014\u1036\u1015\u102B\u1010\u103A\u1021\u102C\u1038\u1019\u1030\u101C\u1021\u1010\u102D\u102F\u1004\u103A\u1038\u1015\u103C\u1014\u103A\u101C\u102F\u1015\u103A\u101E\u100A\u103A" }, "co": { "signUp": "firma", "resetPassword": "Resettate a password" }, "haw": { "signUp": "kau inoa", "resetPassword": "h\u014D\u02BBano hou i ka'\u014Dlelo huna" }, "gn": { "signUp": "Inscripci\xF3n rehegua", "resetPassword": "O\xF1emo\u0129 jey \xF1e\u2019\u1EBD\xF1emi" }, "yi": { "signUp": "\u05E1\u05D9\u05D2\u05E0\u05D5\u05E4\u05BC", "resetPassword": "\u05D1\u05D0\u05B7\u05E9\u05D8\u05E2\u05D8\u05D9\u05E7 \u05E4\u05BC\u05D0\u05B7\u05E8\u05D0\u05B8\u05DC" }, "km": { "signUp": "\u1785\u17BB\u17C7\u200B\u1788\u17D2\u1798\u17C4\u17C7", "resetPassword": "\u1780\u17C6\u178E\u178F\u17CB\u1796\u17B6\u1780\u17D2\u1799\u179F\u1798\u17D2\u1784\u17B6\u178F\u17CB\u17A1\u17BE\u1784\u179C\u17B7\u1789" }, "it": { "signUp": "iscrizione", "resetPassword": "Resetta la password" }, "sr": { "signUp": "\u043F\u0440\u0438\u0458\u0430\u0432\u0438 \u0441\u0435", "resetPassword": "\u0420\u0435\u0441\u0435\u0442\u0443\u0458 \u0448\u0438\u0444\u0440\u0443" }, "hr": { "signUp": "prijava", "resetPassword": "resetiranje lozinke" }, "ceb": { "signUp": "pag-signup", "resetPassword": "I-reset ang password" }, "sd": { "signUp": "\u0633\u0627\u0626\u0646 \u0627\u067E \u06AA\u0631\u064A\u0648", "resetPassword": "\u067E\u0627\u0633\u0648\u0631\u068A \u0631\u064A \u0633\u064A\u067D \u06AA\u0631\u064A\u0648" }, "zu": { "signUp": "bhalisela", "resetPassword": "Setha kabusha iphasiwedi" }, "et": { "signUp": "Registreeri", "resetPassword": "L\xE4htestage parool" }, "iw": { "signUp": "\u05D4\u05D9\u05E8\u05E9\u05DD", "resetPassword": "\u05DC\u05D0\u05E4\u05E1 \u05D0\u05EA \u05D4\u05E1\u05D9\u05E1\u05DE\u05D4" }, "kn": { "signUp": "\u0CB8\u0CC8\u0CA8\u0CCD \u0C85\u0CAA\u0CCD", "resetPassword": "\u0CAA\u0CBE\u0CB8\u0CCD\u0CB5\u0CB0\u0CCD\u0CA1\u0CCD \u0CAE\u0CB0\u0CC1\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CBF" }, "rw": { "signUp": "Kwiyandikisha", "resetPassword": "gusubiramo ijambo ryibanga" }, "cy": { "signUp": "cofrestru", "resetPassword": "ailosod cyfrinair" }, "sq": { "signUp": "regjistrim", "resetPassword": "rivendosni fjal\xEBkalimin" }, "ay": { "signUp": "Qillqt\u2019a\xF1a", "resetPassword": "Reset contrase\xF1a" }, "ga": { "signUp": "Clar\xFA", "resetPassword": "pasfhocal athshocraithe" }, "nso": { "signUp": "Signup", "resetPassword": "Seta gape phasewete" }, "ne": { "signUp": "\u0938\u093E\u0907\u0928 \u0905\u092A", "resetPassword": "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0930\u093F\u0938\u0947\u091F" }, "bs": { "signUp": "prijaviti se", "resetPassword": "reset lozinke" }, "bho": { "signUp": "\u0938\u093E\u0907\u0928\u0905\u092A \u0915\u0930\u0947 \u0915\u0947 \u092C\u093E", "resetPassword": "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u0947 \u0930\u0940\u0938\u0947\u091F \u0915\u0930\u0940\u0902" }, "fr": { "signUp": "S'inscrire", "resetPassword": "r\xE9initialiser le mot de passe" }, "am": { "signUp": "\u12AD\u1348\u1275", "resetPassword": "\u12E8\u12ED\u1208\u134D \u1243\u120D \u12F3\u130D\u121D \u12A0\u1235\u1300\u121D\u122D" }, "gu": { "signUp": "\u0AB8\u0ABE\u0A87\u0AA8\u0A85\u0AAA", "resetPassword": "\u0AAA\u0ABE\u0AB8\u0AB5\u0AB0\u0ACD\u0AA1 \u0AAB\u0AB0\u0AC0\u0AA5\u0AC0 \u0AB8\u0AC7\u0A9F \u0A95\u0AB0\u0ACB" }, "el": { "signUp": "\u0395\u03B3\u03B3\u03C1\u03B1\u03C6\u03B5\u03AF\u03C4\u03B5", "resetPassword": "\u03B5\u03C0\u03B1\u03BD\u03B1\u03C6\u03AD\u03C1\u03B5\u03C4\u03B5 \u03C4\u03BF\u03BD \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7\u03C2" }, "bg": { "signUp": "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0430\u0439 \u0441\u0435", "resetPassword": "\u041D\u0443\u043B\u0438\u0440\u0430\u043D\u0435 \u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u0430\u0442\u0430" }, "ro": { "signUp": "Inscrie-te", "resetPassword": "reseteaza parola" }, "hi": { "signUp": "\u0938\u093E\u0907\u0928 \u0905\u092A \u0915\u0930\u0947\u0902", "resetPassword": "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0930\u0940\u0938\u0947\u091F" }, "ca": { "signUp": "Registra't", "resetPassword": "restablir la contrasenya" }, "mn": { "signUp": "\u0411\u04AF\u0440\u0442\u0433\u04AF\u04AF\u043B\u044D\u0445", "resetPassword": "\u043D\u0443\u0443\u0446 \u04AF\u0433\u044D\u044D \u0430\u043D\u0445\u043D\u044B \u0431\u0430\u0439\u0434\u0430\u043B\u0434 \u043D\u044C \u043E\u0440\u0443\u0443\u043B\u0436" }, "si": { "signUp": "\u0DBD\u0DD2\u0DBA\u0DCF\u0DB4\u0DAF\u0DD2\u0D82\u0DA0\u0DD2 \u0DC0\u0DB1\u0DCA\u0DB1", "resetPassword": "\u0DB8\u0DD4\u0DBB\u0DB4\u0DAF\u0DBA \u0DB1\u0DD0\u0DC0\u0DAD \u0DC3\u0D9A\u0DC3\u0DB1\u0DCA\u0DB1" }, "ko": { "signUp": "\uAC00\uC785\uD558\uAE30", "resetPassword": "\uC554\uD638\uB97C \uC7AC\uC124\uC815" }, "eu": { "signUp": "Izena eman", "resetPassword": "Pasahitza berrezarri" }, "gl": { "signUp": "Rexistrarse", "resetPassword": "Restablecer o contrasinal" }, "sn": { "signUp": "nyorera", "resetPassword": "Dzosera password" }, "mi": { "signUp": "tohu", "resetPassword": "Tautuhi Kupuhipa" }, "vi": { "signUp": "\u0111\u0103ng k\xFD", "resetPassword": "\u0111\u1EB7t l\u1EA1i m\u1EADt kh\u1EA9u" }, "fa": { "signUp": "\u062B\u0628\u062A \u0646\u0627\u0645", "resetPassword": "\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631" }, "lo": { "signUp": "\u0EA5\u0EBB\u0E87\u200B\u0E97\u0EB0\u200B\u0E9A\u0EBD\u0E99", "resetPassword": "\u0E95\u0EB1\u0EC9\u0E87\u0EA5\u0EB0\u0EAB\u0EB1\u0E94\u0E9C\u0EC8\u0EB2\u0E99\u0E84\u0EB7\u0E99\u0EC3\u0EAB\u0EA1\u0EC8" }, "cs": { "signUp": "P\u0159ihl\xE1sit se", "resetPassword": "obnovit heslo" }, "te": { "signUp": "\u0C1A\u0C47\u0C30\u0C21\u0C02", "resetPassword": "\u0C30\u0C39\u0C38\u0C4D\u0C2F\u0C2A\u0C26\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F" }, "as": { "signUp": "Signup", "resetPassword": "\u0997\u09C1\u09AA\u09CD\u09A4\u09B6\u09AC\u09CD\u09A6 \u09AA\u09C1\u09A8\u09F0\u09BE\u09AF\u09BC \u09B8\u09C7\u099F \u0995\u09F0\u0995" }, "id": { "signUp": "Daftar", "resetPassword": "setel ulang kata sandi" }, "uz": { "signUp": "Ro'yxatdan o'tish", "resetPassword": "Parolni tiklash" }, "lv": { "signUp": "Pierakst\u012Bties", "resetPassword": "atiestat\u012Bt paroli" }, "af": { "signUp": "teken aan", "resetPassword": "herstel wagwoord" }, "sw": { "signUp": "Jisajili", "resetPassword": "Rudisha nywila" }, "da": { "signUp": "Tilmelde", "resetPassword": "nulstille kodeord" }, "ti": { "signUp": "\u121D\u12DD\u1308\u1263", "resetPassword": "\u12F3\u130D\u121B\u12ED \u121D\u1275\u12AB\u120D \u121D\u120D\u12AD\u1275 \u1243\u120D" }, "th": { "signUp": "\u0E25\u0E07\u0E0A\u0E37\u0E48\u0E2D", "resetPassword": "\u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19" }, "fy": { "signUp": "ynskriuwe", "resetPassword": "Wachtwurd feroarje" }, "sv": { "signUp": "Bli Medlem", "resetPassword": "\xC5terst\xE4ll l\xF6senord" }, "es": { "signUp": "inscribirse", "resetPassword": "restablecer la contrase\xF1a" }, "ar": { "signUp": "\u0627\u0634\u062A\u0631\u0627\u0643", "resetPassword": "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" }, "ak": { "signUp": "Signup", "resetPassword": "Reset password" }, "ln": { "signUp": "Kokoma na kombo ya", "resetPassword": "Bozongisa mot ya nzela" }, "so": { "signUp": "saxiix", "resetPassword": "dib u dejinta erayga sirta ah" } };

// ../../node_modules/.pnpm/marked@4.1.1/node_modules/marked/lib/marked.esm.js
function getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
var defaults = getDefaults();
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = /[&<>"']/g;
var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape2(html, encode2) {
  if (encode2) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html) {
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name2, val2) => {
      val2 = val2.source || val2;
      val2 = val2.replace(caret, "$1");
      regex = regex.replace(name2, val2);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
var nonWordAndColonTest = /[^\w:]/g;
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base2, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base2 && !originIndependentUrl.test(href)) {
    href = resolveUrl(base2, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
var baseUrls = {};
var justDomain = /^[^:]+:\/*[^/]*$/;
var protocol = /^([^:]+:)[\s\S]*$/;
var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base2, href) {
  if (!baseUrls[" " + base2]) {
    if (justDomain.test(base2)) {
      baseUrls[" " + base2] = base2 + "/";
    } else {
      baseUrls[" " + base2] = rtrim(base2, "/", true);
    }
  }
  base2 = baseUrls[" " + base2];
  const relativeBase = base2.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base2.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base2.replace(domain, "$1") + href;
  } else {
    return base2 + href;
  }
}
var noopTest = { exec: function noopTest2() {
} };
function merge(obj) {
  let i = 1, target2, key2;
  for (; i < arguments.length; i++) {
    target2 = arguments[i];
    for (key2 in target2) {
      if (Object.prototype.hasOwnProperty.call(target2, key2)) {
        obj[key2] = target2[key2];
      }
    }
  }
  return obj;
}
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b2) {
  if (str.indexOf(b2[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i = 0;
  for (; i < l; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b2[0]) {
      level++;
    } else if (str[i] === b2[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
function outputLink(cap, link, raw, lexer2) {
  const href = link.href;
  const title = link.title ? escape2(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape2(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var Tokenizer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  space(src2) {
    const cap = this.rules.block.newline.exec(src2);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src2) {
    const cap = this.rules.block.code.exec(src2);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src2) {
    const cap = this.rules.block.fences.exec(src2);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim() : cap[2],
        text
      };
    }
  }
  heading(src2) {
    const cap = this.rules.block.heading.exec(src2);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src2) {
    const cap = this.rules.block.hr.exec(src2);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src2) {
    const cap = this.rules.block.blockquote.exec(src2);
    if (cap) {
      const text = cap[0].replace(/^ *>[ \t]?/gm, "");
      return {
        type: "blockquote",
        raw: cap[0],
        tokens: this.lexer.blockTokens(text, []),
        text
      };
    }
  }
  list(src2) {
    let cap = this.rules.block.list.exec(src2);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      while (src2) {
        endEarly = false;
        if (!(cap = itemRegex.exec(src2))) {
          break;
        }
        if (this.rules.block.hr.test(src2)) {
          break;
        }
        raw = cap[0];
        src2 = src2.substring(raw.length);
        line = cap[2].split("\n", 1)[0];
        nextLine = src2.split("\n", 1)[0];
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src2 = src2.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src2) {
            rawLine = src2.split("\n", 1)[0];
            line = rawLine;
            if (this.options.pedantic) {
              line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(line)) {
              break;
            }
            if (headingBeginRegex.test(line)) {
              break;
            }
            if (nextBulletRegex.test(line)) {
              break;
            }
            if (hrRegex.test(src2)) {
              break;
            }
            if (line.search(/[^ ]/) >= indent || !line.trim()) {
              itemContents += "\n" + line.slice(indent);
            } else if (!blankLine) {
              itemContents += "\n" + line;
            } else {
              break;
            }
            if (!blankLine && !line.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src2 = src2.substring(rawLine.length + 1);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l = list.items.length;
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        const spacers = list.items[i].tokens.filter((t) => t.type === "space");
        const hasMultipleLineBreaks = spacers.every((t) => {
          const chars = t.raw.split("");
          let lineBreaks = 0;
          for (const char of chars) {
            if (char === "\n") {
              lineBreaks += 1;
            }
            if (lineBreaks > 1) {
              return true;
            }
          }
          return false;
        });
        if (!list.loose && spacers.length && hasMultipleLineBreaks) {
          list.loose = true;
          list.items[i].loose = true;
        }
      }
      return list;
    }
  }
  html(src2) {
    const cap = this.rules.block.html.exec(src2);
    if (cap) {
      const token = {
        type: "html",
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        const text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]);
        token.type = "paragraph";
        token.text = text;
        token.tokens = this.lexer.inline(text);
      }
      return token;
    }
  }
  def(src2) {
    const cap = this.rules.block.def.exec(src2);
    if (cap) {
      if (cap[3])
        cap[3] = cap[3].substring(1, cap[3].length - 1);
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      return {
        type: "def",
        tag,
        raw: cap[0],
        href: cap[2],
        title: cap[3]
      };
    }
  }
  table(src2) {
    const cap = this.rules.block.table.exec(src2);
    if (cap) {
      const item = {
        type: "table",
        header: splitCells(cap[1]).map((c) => {
          return { text: c };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap[0];
        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
            return { text: c };
          });
        }
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = this.lexer.inline(item.header[j].text);
        }
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = this.lexer.inline(row[k].text);
          }
        }
        return item;
      }
    }
  }
  lheading(src2) {
    const cap = this.rules.block.lheading.exec(src2);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src2) {
    const cap = this.rules.block.paragraph.exec(src2);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src2) {
    const cap = this.rules.block.text.exec(src2);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src2) {
    const cap = this.rules.inline.escape.exec(src2);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape2(cap[1])
      };
    }
  }
  tag(src2) {
    const cap = this.rules.inline.tag.exec(src2);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]) : cap[0]
      };
    }
  }
  link(src2) {
    const cap = this.rules.inline.link.exec(src2);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src2, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src2)) || (cap = this.rules.inline.nolink.exec(src2))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src2, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src2);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src2.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = src2.slice(1, lLength + match.index + rLength);
          return {
            type: "em",
            raw: src2.slice(0, lLength + match.index + rLength + 1),
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = src2.slice(2, lLength + match.index + rLength - 1);
        return {
          type: "strong",
          raw: src2.slice(0, lLength + match.index + rLength + 1),
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src2) {
    const cap = this.rules.inline.code.exec(src2);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape2(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src2) {
    const cap = this.rules.inline.br.exec(src2);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src2) {
    const cap = this.rules.inline.del.exec(src2);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src2, mangle2) {
    const cap = this.rules.inline.autolink.exec(src2);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape2(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape2(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src2, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src2)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape2(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape2(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + text;
        } else {
          href = text;
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src2, smartypants2) {
    const cap = this.rules.inline.text.exec(src2);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]) : cap[0];
      } else {
        text = escape2(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
var block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = merge({}, block);
block.gfm = merge({}, block.normal, {
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
});
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = merge({}, block.normal, {
  html: edit(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
});
var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline.escapedEmSt = /\\\*|\\_/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = merge({}, inline);
inline.pedantic = merge({}, inline.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
});
inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
function smartypants(text) {
  return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text) {
  let out = "", i, ch;
  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
var Lexer = class {
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  static get rules() {
    return {
      block,
      inline
    };
  }
  static lex(src2, options2) {
    const lexer2 = new Lexer(options2);
    return lexer2.lex(src2);
  }
  static lexInline(src2, options2) {
    const lexer2 = new Lexer(options2);
    return lexer2.inlineTokens(src2);
  }
  lex(src2) {
    src2 = src2.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src2, this.tokens);
    let next2;
    while (next2 = this.inlineQueue.shift()) {
      this.inlineTokens(next2.src, next2.tokens);
    }
    return this.tokens;
  }
  blockTokens(src2, tokens = []) {
    if (this.options.pedantic) {
      src2 = src2.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src2 = src2.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src2) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src2, tokens)) {
          src2 = src2.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src2)) {
        src2 = src2.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src2)) {
        src2 = src2.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src2)) {
        src2 = src2.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src2;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src2.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src2.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src2.length;
        src2 = src2.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src2)) {
        src2 = src2.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src2) {
        const errMsg = "Infinite loop on byte: " + src2.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src2, tokens = []) {
    this.inlineQueue.push({ src: src2, tokens });
    return tokens;
  }
  inlineTokens(src2, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src2;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    }
    while (src2) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src2, tokens)) {
          src2 = src2.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src2)) {
        src2 = src2.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src2, this.tokens.links)) {
        src2 = src2.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src2, maskedSrc, prevChar)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src2)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src2, mangle)) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src2, mangle))) {
        src2 = src2.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src2;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src2.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src2.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src2 = src2.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src2) {
        const errMsg = "Infinite loop on byte: " + src2.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var Renderer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape2(lang, true) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html) {
    return html;
  }
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text}</h${level}>
`;
    }
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag + content + `</${type}>
`;
  }
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  em(text) {
    return `<em>${text}</em>`;
  }
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(text) {
    return `<del>${text}</del>`;
  }
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape2(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return text;
  }
};
var TextRenderer = class {
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var Slugger = class {
  constructor() {
    this.seen = {};
  }
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  slug(value, options2 = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options2.dryrun);
  }
};
var Parser = class {
  constructor(options2) {
    this.options = options2 || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }
  static parse(tokens, options2) {
    const parser2 = new Parser(options2);
    return parser2.parse(tokens);
  }
  static parseInline(tokens, options2) {
    const parser2 = new Parser(options2);
    return parser2.parseInline(tokens);
  }
  parse(tokens, top = true) {
    let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape(this.parseInline(token.tokens, this.textRenderer)),
            this.slugger
          );
          continue;
        }
        case "code": {
          out += this.renderer.code(
            token.text,
            token.lang,
            token.escaped
          );
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(
              this.parseInline(token.header[j].tokens),
              { header: true, align: token.align[j] }
            );
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];
            cell = "";
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(
                this.parseInline(row[k].tokens),
                { header: false, align: token.align[k] }
              );
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;
          body = "";
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === "text") {
            token = tokens[++i];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "", i, token, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer.text(token.text);
          break;
        }
        case "html": {
          out += renderer.html(token.text);
          break;
        }
        case "link": {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case "image": {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case "em": {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case "codespan": {
          out += renderer.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case "text": {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
function marked(src2, opt, callback) {
  if (typeof src2 === "undefined" || src2 === null) {
    throw new Error("marked(): input parameter is undefined or null");
  }
  if (typeof src2 !== "string") {
    throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src2) + ", string expected");
  }
  if (typeof opt === "function") {
    callback = opt;
    opt = null;
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  if (callback) {
    const highlight = opt.highlight;
    let tokens;
    try {
      tokens = Lexer.lex(src2, opt);
    } catch (e) {
      return callback(e);
    }
    const done = function(err2) {
      let out;
      if (!err2) {
        try {
          if (opt.walkTokens) {
            marked.walkTokens(tokens, opt.walkTokens);
          }
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err2 = e;
        }
      }
      opt.highlight = highlight;
      return err2 ? callback(err2) : callback(null, out);
    };
    if (!highlight || highlight.length < 3) {
      return done();
    }
    delete opt.highlight;
    if (!tokens.length)
      return done();
    let pending = 0;
    marked.walkTokens(tokens, function(token) {
      if (token.type === "code") {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function(err2, code) {
            if (err2) {
              return done(err2);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }
            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });
    if (pending === 0) {
      done();
    }
    return;
  }
  function onError(e) {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape2(e.message + "", true) + "</pre>";
    }
    throw e;
  }
  try {
    const tokens = Lexer.lex(src2, opt);
    if (opt.walkTokens) {
      if (opt.async) {
        return Promise.all(marked.walkTokens(tokens, opt.walkTokens)).then(() => {
          return Parser.parse(tokens, opt);
        }).catch(onError);
      }
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parse(tokens, opt);
  } catch (e) {
    onError(e);
  }
}
marked.options = marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = getDefaults;
marked.defaults = defaults;
marked.use = function(...args) {
  const opts = merge({}, ...args);
  const extensions2 = marked.defaults.extensions || { renderers: {}, childTokens: {} };
  let hasExtensions;
  args.forEach((pack3) => {
    if (pack3.extensions) {
      hasExtensions = true;
      pack3.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions2.renderers ? extensions2.renderers[ext.name] : null;
          if (prevRenderer) {
            extensions2.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions2.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions2[ext.level]) {
            extensions2[ext.level].unshift(ext.tokenizer);
          } else {
            extensions2[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions2.startBlock) {
                extensions2.startBlock.push(ext.start);
              } else {
                extensions2.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions2.startInline) {
                extensions2.startInline.push(ext.start);
              } else {
                extensions2.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions2.childTokens[ext.name] = ext.childTokens;
        }
      });
    }
    if (pack3.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack3.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args2) => {
          let ret = pack3.renderer[prop].apply(renderer, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack3.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack3.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args2) => {
          let ret = pack3.tokenizer[prop].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack3.walkTokens) {
      const walkTokens2 = marked.defaults.walkTokens;
      opts.walkTokens = function(token) {
        let values2 = [];
        values2.push(pack3.walkTokens.call(this, token));
        if (walkTokens2) {
          values2 = values2.concat(walkTokens2.call(this, token));
        }
        return values2;
      };
    }
    if (hasExtensions) {
      opts.extensions = extensions2;
    }
    marked.setOptions(opts);
  });
};
marked.walkTokens = function(tokens, callback) {
  let values2 = [];
  for (const token of tokens) {
    values2 = values2.concat(callback.call(marked, token));
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          values2 = values2.concat(marked.walkTokens(cell.tokens, callback));
        }
        for (const row of token.rows) {
          for (const cell of row) {
            values2 = values2.concat(marked.walkTokens(cell.tokens, callback));
          }
        }
        break;
      }
      case "list": {
        values2 = values2.concat(marked.walkTokens(token.items, callback));
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            values2 = values2.concat(marked.walkTokens(token[childTokens], callback));
          });
        } else if (token.tokens) {
          values2 = values2.concat(marked.walkTokens(token.tokens, callback));
        }
      }
    }
  }
  return values2;
};
marked.parseInline = function(src2, opt) {
  if (typeof src2 === "undefined" || src2 === null) {
    throw new Error("marked.parseInline(): input parameter is undefined or null");
  }
  if (typeof src2 !== "string") {
    throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src2) + ", string expected");
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  try {
    const tokens = Lexer.lexInline(src2, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parseInline(tokens, opt);
  } catch (e) {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape2(e.message + "", true) + "</pre>";
    }
    throw e;
  }
};
marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = Parser.parse;
var lexer = Lexer.lex;

// POST/auth/sign.js
var _account_password;
var _captcha;
_captcha = async (self2, signUp) => {
  if (signUp) {
    await captcha_default2(self2);
  } else {
    null;
  }
};
_account_password = (account, password) => {
  account = account.trim().toLocaleLowerCase();
  password = password.slice(0, 64);
  return [account, password];
};
var mailSignup = async function(account, password, code, name2) {
  var O, ctime, hash, mail_id, salt, user_id;
  if (skVerify(code, this.url.slice(0, -6), this.origin, account, password)) {
    [account, password] = _account_password(account, password);
    ctime = Second();
    mail_id = await R.mailIdNew(account);
    salt = zipU64(this.O, ctime, mail_id);
    hash = await passwordHash(password, salt);
    ({ O } = this);
    user_id = await signupMail_default(this.I, O, mail_id, ctime, hash);
    await R_USER_NAME.hset(u64Bin(O), u64Bin(user_id), name2.trim().slice(0, 28));
    return "";
  }
  return 1;
};
var mail = async function(signUp, account, password) {
  var code, dict, host, html, lang, origin, subject, text;
  await _captcha(this, signUp);
  [account, password] = _account_password(account, password);
  ({ origin } = this);
  if (signUp) {
    if (!/^\S+@\S+$/.test(account)) {
      return ACCOUNT_INVALID;
    }
    [mail, host] = split_default(account, "@");
    if (mail.length > 64 || account.length > 254) {
      return ACCOUNT_TOO_LONG;
    }
    if (await R.hasHost(R_MAIL_BAN_HOST)(host)) {
      return ACCOUNT_MAIL_HOST_BAN;
    }
    code = skCode(this.url, origin, account, password);
    [subject, mail, lang] = await MailTmpl_default.code(this);
    dict = {
      host: origin,
      code,
      action: I18N_default[lang].signUp
    };
    subject = subject.render(dict);
    text = mail.render(dict);
    dict.code = '<b style="background:#ff0;border:1px dashed #f90;font-weight:bold;padding:8px;font-family:Consolas,Monaco,monospace">' + code + "</b>";
    html = marked.parse(mail).replaceAll("<p>", '<p style="font-size:16px">').render(dict);
    smtp_default(origin, account, subject, text, html);
  }
  return 0;
};
var phone = async (signUp, area, phone2, password) => {
  await _captcha(void 0, signUp);
  return 0;
};

// POST/test.js
var test_exports = {};
__export(test_exports, {
  default: () => test_default
});
function test_default() {
  var host, val2;
  ({ host } = this);
  val2 = parseInt(new Date() / 1e3);
  this["Set-Cookie"] = `test=${val2};max-age=9999;domain=${host};path=/;HttpOnly;SameSite=None;Secure`;
  console.log(this.I);
  console.log(this);
  return "";
}

// MAP.js
var MAP;
var obj2map;
obj2map = (obj, chain) => {
  var k, map, ref, v, x;
  map = /* @__PURE__ */ new Map();
  ref = Object.entries(obj);
  for (x of ref) {
    [k, v] = x;
    map.set(k, v instanceof Function ? [v, chain] : obj2map(v, chain));
  }
  return map;
};
MAP = obj2map(POST_exports, [
  (o) => {
    if (o !== void 0) {
      return pack2(o);
    } else {
      return "";
    }
  }
]);
var MAP_default = MAP;

// worker.js
import {
  createBrotliCompress
} from "zlib";

// ../../node_modules/utax/render.js
var render;
var render_default = render = (str, ...args) => {
  return new Function(...args, `return \`${str}\``);
};
String.prototype.render = function(dict) {
  return render(this, ...Object.keys(dict))(...Object.values(dict));
};

// CONST/HEADER.js
var HEADER;
var HEADER_default = HEADER = {
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Credentials": "true"
};
if (false) {
  HEADER["Access-Control-Allow-Private-Network"] = true;
}

// ../../node_modules/utax/streamBuffer.js
var streamBuffer_default = (stream) => {
  var li;
  li = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      li.push(chunk);
    }).on("end", () => {
      return resolve(Buffer.concat(li));
    }).on("error", reject);
  });
};

// mid/org.js
async function org_default() {
  var O;
  O = await R.zscore(R_HOST_ORG, this.origin);
  if (O) {
    this.O = O;
  } else {
    throw ERR_HOST_NOT_ORG;
  }
}

// mid/cookie.js
import {
  b64,
  unb64,
  randomBytes as randomBytes2,
  cookieDecode,
  cookieEncode,
  xxh32,
  ipBin as ipBin2
} from "@u6x/ru";

// db/pg/clientNew.js
var clientNew_default = (client_id, ip, browser_name, browser_ver, os_name, os_ver, device_vendor, device_model) => {
  return UNSAFE(
    "SELECT client_new($1,$2,$3,$4,$5,$6,$7,$8)",
    client_id,
    ip,
    browser_name,
    browser_ver,
    os_name,
    os_ver,
    device_vendor,
    device_model
  );
};

// mid/cookie.js
var COOKIE_LEN;
var DAY;
var ID_LEN;
var _day;
var _set;
_day = () => {
  return U8([parseInt(new Date() / 864e6) % 256]);
};
DAY = _day();
setInterval(() => {
  DAY = _day;
}, 864e5);
ID_LEN = 8;
COOKIE_LEN = 1 + ID_LEN + 4;
_set = function(client_id) {
  var args, cookie;
  args = [DAY, client_id];
  args.push(xxh32(SK, ...args));
  cookie = cookieEncode(...args);
  this["Set-Cookie"] = `I=${cookie};max-age=99999999;domain=${this.host};path=/;HttpOnly;SameSite=None;Secure`;
};
async function cookie_default(I, agent) {
  var O, client_id;
  ({ O } = this);
  if (I) {
    try {
      I = cookieDecode(I);
    } catch (error) {
      I = void 0;
    }
    if (I.length !== COOKIE_LEN) {
      I = void 0;
    } else {
      if (!u8eq(xxh32(SK, I.slice(0, +ID_LEN + 1 || 9e9)), I.slice(ID_LEN + 1))) {
        I = void 0;
      }
    }
  }
  if (I) {
    client_id = I.slice(1, +ID_LEN + 1 || 9e9);
    if (Math.abs(DAY - I[0]) >= 8) {
      _set.call(this, client_id);
    }
  } else {
    while (true) {
      client_id = randomBytes2(ID_LEN);
      if (!await R_CLIENT_ORG.exist(client_id)) {
        break;
      }
    }
    clientNew_default(client_id, ipBin2(this.ip), ...this.agent);
    _set.call(this, client_id);
  }
  return client_id;
}

// mid/ignore.js
var IGNORE;
IGNORE = /* @__PURE__ */ new Set(["captcha"]);
var ignore_default = (url) => {
  return IGNORE.has(url);
};

// worker.js
import {
  tld
} from "@u6x/ru";

// ../../node_modules/.pnpm/@iuser+console@0.0.3/node_modules/@iuser/console/lib/index.js
var import_signale = __toESM(require_signale2(), 1);
import {
  createWriteStream,
  readFileSync
} from "fs";
import util from "util";
var STREAM;
var Signale;
var base;
var colors;
var fs_stream;
({ Signale } = import_signale.default);
STREAM = {};
fs_stream = (path) => {
  var log;
  log = STREAM[path];
  if (!log) {
    STREAM[path] = log = createWriteStream(path, {
      flags: "a"
    });
  }
  return log;
};
colors = typeof (base = process.stdout).hasColors === "function" ? base.hasColors() : void 0;
var Console = class Console2 extends Signale {
  assert(assertion, ...args) {
    if (!assertion) {
      this.log(...args);
    }
  }
  dir(obj, options2 = {}) {
    options2 = { ...options2 };
    if (colors) {
      options2.colors = colors;
    }
    this.log(util.inspect(obj, options2));
  }
  trace(...args) {
    args.push("\n" + new Error().stack);
    this.error.apply(this, args);
  }
};
var lib_default2 = () => {
  var c, error_stream, opt, stream;
  stream = [];
  error_stream = [];
  stream.push(process.stdout);
  error_stream.push(process.stderr);
  c = new Console({
    stream,
    types: {
      error: {
        stream: error_stream
      }
    }
  });
  opt = {};
  opt.displayFilename = true;
  c.config(opt);
  return c;
};
process.on("exit", () => {
  var ref, results, s;
  ref = Object.values(STREAM);
  results = [];
  for (s of ref) {
    results.push(s.close());
  }
  return results;
});

// ../../node_modules/.pnpm/@iuser+console@0.0.3/node_modules/@iuser/console/lib/global.js
var console2;
global.console = console2 = lib_default2();

// worker.js
var compress2;
var funcByUrl;
compress2 = async (code, support_br, body, res_headers) => {
  var length, result, s;
  if (body) {
    ({ length } = body);
    if (length > 512) {
      if (support_br) {
        s = createBrotliCompress();
        result = streamBuffer_default(s);
        s.end(body);
        body = await result;
        length = body.length;
        res_headers["Content-Encoding"] = "br";
      }
    }
  } else {
    length = 0;
  }
  return [code, res_headers, body];
};
funcByUrl = (url) => {
  var f, i, len, li, n;
  li = url.split(".");
  n = 0;
  len = li.length;
  f = MAP_default;
  while (n < len) {
    i = li[n++];
    f = f.get(i);
    if (n < len) {
      if (!(f instanceof Map)) {
        return;
      }
    }
  }
  if (f instanceof Map) {
    f = f.get("default");
  }
  return f;
};
var worker_default = async ([url, body, ip, origin, host, lang, I, agent, type, support_br]) => {
  var code, err2, f, func, r, ref, req, res_headers, self2;
  res_headers = { ...HEADER_default };
  f = funcByUrl(url);
  if (f) {
    func = f[0];
    code = 200;
    while (true) {
      try {
        if (body.length) {
          r = JSON.parse(body);
        }
      } catch (error) {
        code = 500;
        body = `NOT JSON : ${body}`;
        break;
      }
      origin = tld(origin);
      self2 = { ip, host, origin, lang, url, agent };
      if (type) {
        self2.type = type;
      }
      req = new Proxy(self2, {
        set: (_, k, v) => {
          res_headers[k] = v;
          return true;
        }
      });
      try {
        if (!ignore_default(url)) {
          await org_default.call(self2);
          self2.I = await cookie_default.call(req, I, agent);
        }
        if (r) {
          if (Array.isArray(r)) {
            body = func.apply(req, r);
          } else {
            body = func.call(req, r);
          }
        } else {
          body = func.call(req);
        }
        body = await body;
        ref = f[1];
        for (f of ref) {
          body = f(body);
        }
      } catch (error) {
        err2 = error;
        if (err2 instanceof HttpErr) {
          ({ code, body } = err2);
        } else {
          [url, r, err2].map((e, pos) => {
            var args;
            if (pos === 1) {
              args = [" ", e];
            } else {
              args = [e];
            }
            console.error(...args);
          });
          code = 500;
          body = err2.toString();
        }
      }
      break;
    }
  } else {
    code = 404;
    body = "404 : " + url;
  }
  return compress2(code, support_br, body, res_headers);
};

// fork.js
var ING;
var INTERVAL;
var MAX_MEM_LEAK;
var N;
var exit;
var gcpoint;
var memoryUsage;
var next;
var rss;
exit = () => {
  process.kill(process.pid, "SIGINT");
};
MAX_MEM_LEAK = 256;
({ memoryUsage } = process);
({ rss } = memoryUsage());
gcpoint = 32;
N = 0;
ING = 0;
INTERVAL = setInterval(() => {
  var diff, next2, used;
  if (N === 0) {
    exit();
  } else {
    N = 0;
    used = memoryUsage().rss;
    diff = (used - rss) / 1048576;
    if (gcpoint > MAX_MEM_LEAK && diff > MAX_MEM_LEAK) {
      clearInterval(INTERVAL);
      next2 = () => {
        if (ING === 0) {
          exit();
        } else {
          console.log("memoryUsage", used, "leak", diff, "ING", ING, "wait auto exit");
        }
      };
      setInterval(next2, 1e3);
      return;
    } else if (diff > gcpoint) {
      gc();
      gcpoint += 32;
    }
  }
}, 4e4);
next = async (msg) => {
  var rid;
  if (Array.isArray(msg)) {
    ++N;
    ++ING;
    rid = msg.pop();
    try {
      process.send([rid, await worker_default(msg)]);
    } finally {
      --ING;
    }
  } else {
    switch (msg) {
      case 0:
        exit();
        break;
      default:
        console.log(msg);
    }
  }
};
process.on("message", (msg) => {
  next(msg);
});
//!/usr/bin/env coffee

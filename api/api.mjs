#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
import {dirname as _dirname_} from 'path';import { createRequire as _createRequire_ } from 'module';const require = _createRequire_(import.meta.url); const __dirname=_dirname_(decodeURI((new URL(import.meta.url)).pathname));
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
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
    var fs = __require("fs");
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
        var tuples = readdirSync(path.join(dir2, "prebuilds")).map(parseTuple);
        var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0];
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
        return fs.readdirSync(dir);
      } catch (err2) {
        return [];
      }
    }
    function getFirst(dir, filter) {
      var files = readdirSync(dir).filter(filter);
      return files[0] && path.join(dir, files[0]);
    }
    function matchBuild(name) {
      return /\.node$/.test(name);
    }
    function parseTuple(name) {
      var arr = name.split("-");
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
      return { name, platform: platform2, architectures };
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
    function compareTuples(a, b) {
      return a.architectures.length - b.architectures.length;
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
      return function(a, b) {
        if (a.runtime !== b.runtime) {
          return a.runtime === runtime2 ? -1 : 1;
        } else if (a.abi !== b.abi) {
          return a.abi ? -1 : 1;
        } else if (a.specificity !== b.specificity) {
          return a.specificity > b.specificity ? -1 : 1;
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
      return platform2 === "linux" && fs.existsSync("/etc/alpine-release");
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

// ../../node_modules/.pnpm/@user.tax+webp@0.0.7/node_modules/@user.tax/webp/index.js
var require_webp = __commonJS({
  "../../node_modules/.pnpm/@user.tax+webp@0.0.7/node_modules/@user.tax/webp/index.js"(exports, module) {
    var { existsSync, readFileSync } = __require("fs");
    var { join } = __require("path");
    var { platform, arch } = process;
    var nativeBinding = null;
    var localFileExisted = false;
    var loadError = null;
    function isMusl() {
      if (!process.report || typeof process.report.getReport !== "function") {
        try {
          return readFileSync("/usr/bin/ldd", "utf8").includes("musl");
        } catch (e) {
          return true;
        }
      } else {
        const { glibcVersionRuntime } = process.report.getReport().header;
        return !glibcVersionRuntime;
      }
    }
    switch (platform) {
      case "android":
        switch (arch) {
          case "arm64":
            localFileExisted = existsSync(join(__dirname, "webp.android-arm64.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("./webp.android-arm64.node");
              } else {
                nativeBinding = __require("@user.tax/webp-android-arm64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm":
            localFileExisted = existsSync(join(__dirname, "webp.android-arm-eabi.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("./webp.android-arm-eabi.node");
              } else {
                nativeBinding = __require("@user.tax/webp-android-arm-eabi");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Android ${arch}`);
        }
        break;
      case "win32":
        switch (arch) {
          case "x64":
            localFileExisted = existsSync(
              join(__dirname, "webp.win32-x64-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./webp.win32-x64-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/webp-win32-x64-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "ia32":
            localFileExisted = existsSync(
              join(__dirname, "webp.win32-ia32-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./webp.win32-ia32-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/webp-win32-ia32-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm64":
            localFileExisted = existsSync(
              join(__dirname, "webp.win32-arm64-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./webp.win32-arm64-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/webp-win32-arm64-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Windows: ${arch}`);
        }
        break;
      case "darwin":
        switch (arch) {
          case "x64":
            localFileExisted = existsSync(join(__dirname, "webp.darwin-x64.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("./webp.darwin-x64.node");
              } else {
                nativeBinding = __require("@user.tax/webp-darwin-x64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm64":
            localFileExisted = existsSync(
              join(__dirname, "webp.darwin-arm64.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./webp.darwin-arm64.node");
              } else {
                nativeBinding = __require("@user.tax/webp-darwin-arm64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on macOS: ${arch}`);
        }
        break;
      case "freebsd":
        if (arch !== "x64") {
          throw new Error(`Unsupported architecture on FreeBSD: ${arch}`);
        }
        localFileExisted = existsSync(join(__dirname, "webp.freebsd-x64.node"));
        try {
          if (localFileExisted) {
            nativeBinding = __require("./webp.freebsd-x64.node");
          } else {
            nativeBinding = __require("@user.tax/webp-freebsd-x64");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      case "linux":
        switch (arch) {
          case "x64":
            if (isMusl()) {
              localFileExisted = existsSync(
                join(__dirname, "webp.linux-x64-musl.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("./webp.linux-x64-musl.node");
                } else {
                  nativeBinding = __require("@user.tax/webp-linux-x64-musl");
                }
              } catch (e) {
                loadError = e;
              }
            } else {
              localFileExisted = existsSync(
                join(__dirname, "webp.linux-x64-gnu.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("./webp.linux-x64-gnu.node");
                } else {
                  nativeBinding = __require("@user.tax/webp-linux-x64-gnu");
                }
              } catch (e) {
                loadError = e;
              }
            }
            break;
          case "arm64":
            if (isMusl()) {
              localFileExisted = existsSync(
                join(__dirname, "webp.linux-arm64-musl.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("./webp.linux-arm64-musl.node");
                } else {
                  nativeBinding = __require("@user.tax/webp-linux-arm64-musl");
                }
              } catch (e) {
                loadError = e;
              }
            } else {
              localFileExisted = existsSync(
                join(__dirname, "webp.linux-arm64-gnu.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("./webp.linux-arm64-gnu.node");
                } else {
                  nativeBinding = __require("@user.tax/webp-linux-arm64-gnu");
                }
              } catch (e) {
                loadError = e;
              }
            }
            break;
          case "arm":
            localFileExisted = existsSync(
              join(__dirname, "webp.linux-arm-gnueabihf.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./webp.linux-arm-gnueabihf.node");
              } else {
                nativeBinding = __require("@user.tax/webp-linux-arm-gnueabihf");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Linux: ${arch}`);
        }
        break;
      default:
        throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
    }
    if (!nativeBinding) {
      if (loadError) {
        throw loadError;
      }
      throw new Error(`Failed to load native binding`);
    }
    var { svgWebp: svgWebp2 } = nativeBinding;
    module.exports.svgWebp = svgWebp2;
  }
});

// ../../../redis/index.js
var require_redis = __commonJS({
  "../../../redis/index.js"(exports, module) {
    var { existsSync, readFileSync } = __require("fs");
    var { join } = __require("path");
    var { platform, arch } = process;
    var nativeBinding = null;
    var localFileExisted = false;
    var loadError = null;
    function isMusl() {
      if (!process.report || typeof process.report.getReport !== "function") {
        try {
          return readFileSync("/usr/bin/ldd", "utf8").includes("musl");
        } catch (e) {
          return true;
        }
      } else {
        const { glibcVersionRuntime } = process.report.getReport().header;
        return !glibcVersionRuntime;
      }
    }
    switch (platform) {
      case "android":
        switch (arch) {
          case "arm64":
            localFileExisted = existsSync(join(__dirname, "redis.android-arm64.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../redis/redis.android-arm64.node");
              } else {
                nativeBinding = __require("@user.tax/redis-android-arm64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm":
            localFileExisted = existsSync(join(__dirname, "redis.android-arm-eabi.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("./redis.android-arm-eabi.node");
              } else {
                nativeBinding = __require("@user.tax/redis-android-arm-eabi");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Android ${arch}`);
        }
        break;
      case "win32":
        switch (arch) {
          case "x64":
            localFileExisted = existsSync(
              join(__dirname, "redis.win32-x64-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../redis/redis.win32-x64-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/redis-win32-x64-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "ia32":
            localFileExisted = existsSync(
              join(__dirname, "redis.win32-ia32-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./redis.win32-ia32-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/redis-win32-ia32-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm64":
            localFileExisted = existsSync(
              join(__dirname, "redis.win32-arm64-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../redis/redis.win32-arm64-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/redis-win32-arm64-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Windows: ${arch}`);
        }
        break;
      case "darwin":
        switch (arch) {
          case "x64":
            localFileExisted = existsSync(join(__dirname, "redis.darwin-x64.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../redis/redis.darwin-x64.node");
              } else {
                nativeBinding = __require("@user.tax/redis-darwin-x64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm64":
            localFileExisted = existsSync(
              join(__dirname, "redis.darwin-arm64.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../redis/redis.darwin-arm64.node");
              } else {
                nativeBinding = __require("@user.tax/redis-darwin-arm64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on macOS: ${arch}`);
        }
        break;
      case "freebsd":
        if (arch !== "x64") {
          throw new Error(`Unsupported architecture on FreeBSD: ${arch}`);
        }
        localFileExisted = existsSync(join(__dirname, "redis.freebsd-x64.node"));
        try {
          if (localFileExisted) {
            nativeBinding = __require("./redis.freebsd-x64.node");
          } else {
            nativeBinding = __require("@user.tax/redis-freebsd-x64");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      case "linux":
        switch (arch) {
          case "x64":
            if (isMusl()) {
              localFileExisted = existsSync(
                join(__dirname, "redis.linux-x64-musl.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("../../redis/redis.linux-x64-musl.node");
                } else {
                  nativeBinding = __require("@user.tax/redis-linux-x64-musl");
                }
              } catch (e) {
                loadError = e;
              }
            } else {
              localFileExisted = existsSync(
                join(__dirname, "redis.linux-x64-gnu.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("../../redis/redis.linux-x64-gnu.node");
                } else {
                  nativeBinding = __require("@user.tax/redis-linux-x64-gnu");
                }
              } catch (e) {
                loadError = e;
              }
            }
            break;
          case "arm64":
            if (isMusl()) {
              localFileExisted = existsSync(
                join(__dirname, "redis.linux-arm64-musl.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("../../redis/redis.linux-arm64-musl.node");
                } else {
                  nativeBinding = __require("@user.tax/redis-linux-arm64-musl");
                }
              } catch (e) {
                loadError = e;
              }
            } else {
              localFileExisted = existsSync(
                join(__dirname, "redis.linux-arm64-gnu.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("../../redis/redis.linux-arm64-gnu.node");
                } else {
                  nativeBinding = __require("@user.tax/redis-linux-arm64-gnu");
                }
              } catch (e) {
                loadError = e;
              }
            }
            break;
          case "arm":
            localFileExisted = existsSync(
              join(__dirname, "redis.linux-arm-gnueabihf.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./redis.linux-arm-gnueabihf.node");
              } else {
                nativeBinding = __require("@user.tax/redis-linux-arm-gnueabihf");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Linux: ${arch}`);
        }
        break;
      default:
        throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
    }
    if (!nativeBinding) {
      if (loadError) {
        throw loadError;
      }
      throw new Error(`Failed to load native binding`);
    }
    var { ServerConfig, serverCluster: serverCluster2, serverHostPort: serverHostPort2, redisConn: redisConn2, Redis: Redis3 } = nativeBinding;
    module.exports.ServerConfig = ServerConfig;
    module.exports.serverCluster = serverCluster2;
    module.exports.serverHostPort = serverHostPort2;
    module.exports.redisConn = redisConn2;
    module.exports.Redis = Redis3;
  }
});

// ../../node_modules/.pnpm/fastintcompression@0.0.4/node_modules/fastintcompression/FastIntegerCompression.js
var require_FastIntegerCompression = __commonJS({
  "../../node_modules/.pnpm/fastintcompression@0.0.4/node_modules/fastintcompression/FastIntegerCompression.js"(exports, module) {
    "use strict";
    function FastIntegerCompression() {
    }
    function bytelog(val) {
      if (val < 1 << 7) {
        return 1;
      } else if (val < 1 << 14) {
        return 2;
      } else if (val < 1 << 21) {
        return 3;
      } else if (val < 1 << 28) {
        return 4;
      }
      return 5;
    }
    function zigzag_encode(val) {
      return val + val ^ val >> 31;
      ;
    }
    function zigzag_decode(val) {
      return val >> 1 ^ -(val & 1);
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
        var val = input[i];
        if (val < 1 << 7) {
          view[pos++] = val;
        } else if (val < 1 << 14) {
          view[pos++] = val & 127 | 128;
          view[pos++] = val >>> 7;
        } else if (val < 1 << 21) {
          view[pos++] = val & 127 | 128;
          view[pos++] = val >>> 7 & 127 | 128;
          view[pos++] = val >>> 14;
        } else if (val < 1 << 28) {
          view[pos++] = val & 127 | 128;
          view[pos++] = val >>> 7 & 127 | 128;
          view[pos++] = val >>> 14 & 127 | 128;
          view[pos++] = val >>> 21;
        } else {
          view[pos++] = val & 127 | 128;
          view[pos++] = val >>> 7 & 127 | 128;
          view[pos++] = val >>> 14 & 127 | 128;
          view[pos++] = val >>> 21 & 127 | 128;
          view[pos++] = val >>> 28;
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
        var val = zigzag_encode(input[i]);
        if (val < 1 << 7) {
          view[pos++] = val;
        } else if (val < 1 << 14) {
          view[pos++] = val & 127 | 128;
          view[pos++] = val >>> 7;
        } else if (val < 1 << 21) {
          view[pos++] = val & 127 | 128;
          view[pos++] = val >>> 7 & 127 | 128;
          view[pos++] = val >>> 14;
        } else if (val < 1 << 28) {
          view[pos++] = val & 127 | 128;
          view[pos++] = val >>> 7 & 127 | 128;
          view[pos++] = val >>> 14 & 127 | 128;
          view[pos++] = val >>> 21;
        } else {
          view[pos++] = val & 127 | 128;
          view[pos++] = val >>> 7 & 127 | 128;
          view[pos++] = val >>> 14 & 127 | 128;
          view[pos++] = val >>> 21 & 127 | 128;
          view[pos++] = val >>> 28;
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

// ../../../rust/index.js
var require_rust = __commonJS({
  "../../../rust/index.js"(exports, module) {
    var { existsSync, readFileSync } = __require("fs");
    var { join } = __require("path");
    var { platform, arch } = process;
    var nativeBinding = null;
    var localFileExisted = false;
    var loadError = null;
    function isMusl() {
      if (!process.report || typeof process.report.getReport !== "function") {
        try {
          return readFileSync("/usr/bin/ldd", "utf8").includes("musl");
        } catch (e) {
          return true;
        }
      } else {
        const { glibcVersionRuntime } = process.report.getReport().header;
        return !glibcVersionRuntime;
      }
    }
    switch (platform) {
      case "android":
        switch (arch) {
          case "arm64":
            localFileExisted = existsSync(join(__dirname, "rust.android-arm64.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../rust/rust.android-arm64.node");
              } else {
                nativeBinding = __require("@user.tax/rust-android-arm64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm":
            localFileExisted = existsSync(join(__dirname, "rust.android-arm-eabi.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("./rust.android-arm-eabi.node");
              } else {
                nativeBinding = __require("@user.tax/rust-android-arm-eabi");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Android ${arch}`);
        }
        break;
      case "win32":
        switch (arch) {
          case "x64":
            localFileExisted = existsSync(
              join(__dirname, "rust.win32-x64-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../rust/rust.win32-x64-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/rust-win32-x64-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "ia32":
            localFileExisted = existsSync(
              join(__dirname, "rust.win32-ia32-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./rust.win32-ia32-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/rust-win32-ia32-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm64":
            localFileExisted = existsSync(
              join(__dirname, "rust.win32-arm64-msvc.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../rust/rust.win32-arm64-msvc.node");
              } else {
                nativeBinding = __require("@user.tax/rust-win32-arm64-msvc");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Windows: ${arch}`);
        }
        break;
      case "darwin":
        switch (arch) {
          case "x64":
            localFileExisted = existsSync(join(__dirname, "rust.darwin-x64.node"));
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../rust/rust.darwin-x64.node");
              } else {
                nativeBinding = __require("@user.tax/rust-darwin-x64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          case "arm64":
            localFileExisted = existsSync(
              join(__dirname, "rust.darwin-arm64.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("../../rust/rust.darwin-arm64.node");
              } else {
                nativeBinding = __require("@user.tax/rust-darwin-arm64");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on macOS: ${arch}`);
        }
        break;
      case "freebsd":
        if (arch !== "x64") {
          throw new Error(`Unsupported architecture on FreeBSD: ${arch}`);
        }
        localFileExisted = existsSync(join(__dirname, "rust.freebsd-x64.node"));
        try {
          if (localFileExisted) {
            nativeBinding = __require("./rust.freebsd-x64.node");
          } else {
            nativeBinding = __require("@user.tax/rust-freebsd-x64");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      case "linux":
        switch (arch) {
          case "x64":
            if (isMusl()) {
              localFileExisted = existsSync(
                join(__dirname, "rust.linux-x64-musl.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("../../rust/rust.linux-x64-musl.node");
                } else {
                  nativeBinding = __require("@user.tax/rust-linux-x64-musl");
                }
              } catch (e) {
                loadError = e;
              }
            } else {
              localFileExisted = existsSync(
                join(__dirname, "rust.linux-x64-gnu.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("../../rust/rust.linux-x64-gnu.node");
                } else {
                  nativeBinding = __require("@user.tax/rust-linux-x64-gnu");
                }
              } catch (e) {
                loadError = e;
              }
            }
            break;
          case "arm64":
            if (isMusl()) {
              localFileExisted = existsSync(
                join(__dirname, "rust.linux-arm64-musl.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("../../rust/rust.linux-arm64-musl.node");
                } else {
                  nativeBinding = __require("@user.tax/rust-linux-arm64-musl");
                }
              } catch (e) {
                loadError = e;
              }
            } else {
              localFileExisted = existsSync(
                join(__dirname, "rust.linux-arm64-gnu.node")
              );
              try {
                if (localFileExisted) {
                  nativeBinding = __require("../../rust/rust.linux-arm64-gnu.node");
                } else {
                  nativeBinding = __require("@user.tax/rust-linux-arm64-gnu");
                }
              } catch (e) {
                loadError = e;
              }
            }
            break;
          case "arm":
            localFileExisted = existsSync(
              join(__dirname, "rust.linux-arm-gnueabihf.node")
            );
            try {
              if (localFileExisted) {
                nativeBinding = __require("./rust.linux-arm-gnueabihf.node");
              } else {
                nativeBinding = __require("@user.tax/rust-linux-arm-gnueabihf");
              }
            } catch (e) {
              loadError = e;
            }
            break;
          default:
            throw new Error(`Unsupported architecture on Linux: ${arch}`);
        }
        break;
      default:
        throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
    }
    if (!nativeBinding) {
      if (loadError) {
        throw loadError;
      }
      throw new Error(`Failed to load native binding`);
    }
    var { z85Dump: z85Dump2, z85Load: z85Load3, ipBin, binU64, u64Bin, zipU64, unzipU64, b64: b642, unb64: unb642, blake3Round: blake3Round2, blake3, encrypt: encrypt2, decrypt: decrypt2, randomBytes: randomBytes3 } = nativeBinding;
    module.exports.z85Dump = z85Dump2;
    module.exports.z85Load = z85Load3;
    module.exports.ipBin = ipBin;
    module.exports.binU64 = binU64;
    module.exports.u64Bin = u64Bin;
    module.exports.zipU64 = zipU64;
    module.exports.unzipU64 = unzipU64;
    module.exports.b64 = b642;
    module.exports.unb64 = unb642;
    module.exports.blake3Round = blake3Round2;
    module.exports.blake3 = blake3;
    module.exports.encrypt = encrypt2;
    module.exports.decrypt = decrypt2;
    module.exports.randomBytes = randomBytes3;
  }
});

// index.js
import http from "http";

// ../../node_modules/.pnpm/msgpackr@1.7.0/node_modules/msgpackr/unpack.js
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
  constructor(options) {
    if (options) {
      if (options.useRecords === false && options.mapsAsObjects === void 0)
        options.mapsAsObjects = true;
      if (options.sequential && options.trusted !== false) {
        options.trusted = true;
        if (!options.structures && options.useRecords != false) {
          options.structures = [];
          if (!options.maxSharedStructures)
            options.maxSharedStructures = 0;
        }
      }
      if (options.structures)
        options.structures.sharedLength = options.structures.length;
      else if (options.getStructures) {
        (options.structures = []).uninitialized = true;
        options.structures.sharedLength = 0;
      }
    }
    Object.assign(this, options);
  }
  unpack(source, options) {
    if (src) {
      return saveState(() => {
        clearSource();
        return this ? this.unpack(source, options) : Unpackr.prototype.unpack.call(defaultOptions, source, options);
      });
    }
    if (typeof options === "object") {
      srcEnd = options.end || source.length;
      position = options.start || 0;
    } else {
      position = 0;
      srcEnd = options > -1 ? options : source.length;
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
        return checkedRead(options);
      } else if (!currentStructures || currentStructures.length > 0) {
        currentStructures = [];
      }
    } else {
      currentUnpackr = defaultOptions;
      if (!currentStructures || currentStructures.length > 0)
        currentStructures = [];
    }
    return checkedRead(options);
  }
  unpackMultiple(source, forEach) {
    let values, lastPosition = 0;
    try {
      sequentialMode = true;
      let size = source.length;
      let value = this ? this.unpack(source, size) : defaultUnpackr.unpack(source, size);
      if (forEach) {
        forEach(value);
        while (position < size) {
          lastPosition = position;
          if (forEach(checkedRead()) === false) {
            return;
          }
        }
      } else {
        values = [value];
        while (position < size) {
          lastPosition = position;
          values.push(checkedRead());
        }
        return values;
      }
    } catch (error) {
      error.lastPosition = lastPosition;
      error.values = values;
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
function checkedRead(options) {
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
      if (!(options && options.lazy) && result)
        result = result.toJSON();
      position = srcEnd;
    } else
      result = read();
    if (bundledStrings)
      position = bundledStrings.postBundlePosition;
    if (position == srcEnd) {
      if (currentStructures?.restoreStructures)
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
    if (currentStructures?.restoreStructures)
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
      let b = src[position++];
      if ((a & 128) > 0 || (b & 128) > 0) {
        position -= 2;
        return;
      }
      if (length < 3)
        return fromCharCode(a, b);
      let c = src[position++];
      if ((c & 128) > 0) {
        position -= 3;
        return;
      }
      return fromCharCode(a, b, c);
    }
  } else {
    let a = src[position++];
    let b = src[position++];
    let c = src[position++];
    let d = src[position++];
    if ((a & 128) > 0 || (b & 128) > 0 || (c & 128) > 0 || (d & 128) > 0) {
      position -= 4;
      return;
    }
    if (length < 6) {
      if (length === 4)
        return fromCharCode(a, b, c, d);
      else {
        let e = src[position++];
        if ((e & 128) > 0) {
          position -= 5;
          return;
        }
        return fromCharCode(a, b, c, d, e);
      }
    } else if (length < 8) {
      let e = src[position++];
      let f = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0) {
        position -= 6;
        return;
      }
      if (length < 7)
        return fromCharCode(a, b, c, d, e, f);
      let g = src[position++];
      if ((g & 128) > 0) {
        position -= 7;
        return;
      }
      return fromCharCode(a, b, c, d, e, f, g);
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
          return fromCharCode(a, b, c, d, e, f, g, h);
        else {
          let i = src[position++];
          if ((i & 128) > 0) {
            position -= 9;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i);
        }
      } else if (length < 12) {
        let i = src[position++];
        let j = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0) {
          position -= 10;
          return;
        }
        if (length < 11)
          return fromCharCode(a, b, c, d, e, f, g, h, i, j);
        let k = src[position++];
        if ((k & 128) > 0) {
          position -= 11;
          return;
        }
        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k);
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
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l);
          else {
            let m = src[position++];
            if ((m & 128) > 0) {
              position -= 13;
              return;
            }
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m);
          }
        } else {
          let m = src[position++];
          let n = src[position++];
          if ((m & 128) > 0 || (n & 128) > 0) {
            position -= 14;
            return;
          }
          if (length < 15)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
          let o = src[position++];
          if ((o & 128) > 0) {
            position -= 15;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
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
    throw new Error("Unknown extension type " + type);
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
    return read();
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
  let structure;
  if (currentUnpackr.freezeData) {
    currentUnpackr.freezeData = false;
    try {
      structure = read();
    } finally {
      currentUnpackr.freezeData = true;
    }
  } else
    structure = read();
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

// ../../node_modules/.pnpm/msgpackr@1.7.0/node_modules/msgpackr/pack.js
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
  constructor(options) {
    super(options);
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
    if (!options)
      options = {};
    let isSequential = options && options.sequential;
    let hasSharedStructures = options.structures || options.saveStructures;
    let maxSharedStructures = options.maxSharedStructures;
    if (maxSharedStructures == null)
      maxSharedStructures = hasSharedStructures ? 32 : 0;
    if (maxSharedStructures > 8160)
      throw new Error("Maximum maxSharedStructure is 8160");
    if (options.structuredClone && options.moreTypes == void 0) {
      options.moreTypes = true;
    }
    let maxOwnStructures = options.maxOwnStructures;
    if (maxOwnStructures == null)
      maxOwnStructures = hasSharedStructures ? 32 : 64;
    if (!this.structures && options.useRecords != false)
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
        if (bundledStrings2) {
          writeBundles(start, pack3);
        }
        packr.offset = position2;
        if (referenceMap2 && referenceMap2.idsToInsert) {
          position2 += referenceMap2.idsToInsert.length * 6;
          if (position2 > safeEnd)
            makeRoom(position2);
          packr.offset = position2;
          let serialized = insertIds(target.subarray(start, position2), referenceMap2.idsToInsert);
          referenceMap2 = null;
          return serialized;
        }
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
            if (bundledStrings2.position) {
              target[position2] = 200;
              position2 += 3;
              target[position2++] = 98;
              extStart = position2 - start;
              position2 += 4;
              writeBundles(start, pack3);
              targetView.setUint16(extStart + start - 3, position2 - start - extStart);
            } else {
              target[position2++] = 214;
              target[position2++] = 98;
              extStart = position2 - start;
              position2 += 4;
            }
            bundledStrings2 = ["", ""];
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
                  result = extension.pack.call(this, value, (size) => {
                    target = currentTarget;
                    currentTarget = null;
                    position2 += size;
                    if (position2 > safeEnd)
                      makeRoom(position2);
                    return {
                      target,
                      targetView,
                      position: position2 - size
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
      let size = 0;
      for (let key2 in object) {
        if (safePrototype || object.hasOwnProperty(key2)) {
          pack3(key2);
          pack3(object[key2]);
          size++;
        }
      }
      target[objectOffset++ + start] = size >> 8;
      target[objectOffset + start] = size & 255;
    } : options.progressiveRecords && !useTwoByteRecords ? (object, safePrototype) => {
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
  useBuffer(buffer) {
    target = buffer;
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
function writeExtBuffer(typedArray, type, allocateForWrite, encode4) {
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
function writeBuffer(buffer, allocateForWrite) {
  let length = buffer.byteLength;
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
  target2.set(buffer, position3);
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
  idsToInsert.sort((a, b) => a.offset > b.offset ? 1 : -1);
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
function writeBundles(start, pack3) {
  if (bundledStrings2.length > 0) {
    targetView.setUint32(bundledStrings2.position + start, position2 - bundledStrings2.position - start);
    let writeStrings = bundledStrings2;
    bundledStrings2 = null;
    let startPosition = position2;
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

// ../../node_modules/.pnpm/msgpackr@1.7.0/node_modules/msgpackr/struct.js
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
      let size;
      refOffset = refPosition - refsStartPosition;
      if (refOffset < 65280) {
        transition = nextTransition.object16;
        if (transition)
          size = 2;
        else if (transition = nextTransition.object32)
          size = 4;
        else {
          transition = createTypeTransition(nextTransition, OBJECT_DATA, 2);
          size = 2;
        }
      } else {
        transition = nextTransition.object32 || createTypeTransition(nextTransition, OBJECT_DATA, 4);
        size = 4;
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
      if (size === 2) {
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
      let size = nextTransition.__size;
      nextTransition = nextTransition.__parent;
      key2 = nextTransition.key;
      let property = [type, size, key2];
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
function createTypeTransition(transition, type, size) {
  let typeName = TYPE_NAMES[type] + (size << 3);
  let newTransition = transition[typeName] || (transition[typeName] = /* @__PURE__ */ Object.create(null));
  newTransition.__type = type;
  newTransition.__size = size;
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
    for (let [type, size, key2] of structure) {
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
      transition = createTypeTransition(nextTransition, type, size);
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
  let structure = unpackr.typedStructs?.[recordId];
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
      let [type, size, key2, enumerationOffset] = definition;
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
      switch (size) {
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
      currentOffset += size;
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
            let end, next = property.next;
            while (next) {
              end = next.getRef(source, position4);
              if (typeof end === "number")
                break;
              else
                end = null;
              next = next.next;
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
            let end, next = property.next;
            while (next) {
              end = next.getRef(source, position4);
              if (typeof end === "number")
                break;
              else
                end = null;
              next = next.next;
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
          switch (size) {
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
  packr.lastTypedStructuresLength = packr.typedStructs?.length;
  return structures;
}
setReadStruct(readStruct2, onLoadedStructures2, saveState2);

// ../../node_modules/.pnpm/msgpackr@1.7.0/node_modules/msgpackr/node-index.js
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
  captcha: () => captcha_exports
});

// POST/captcha.js
var captcha_exports = {};
__export(captcha_exports, {
  default: () => captcha_default
});

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.12/node_modules/@user.tax/captcha-img/src/bezier-spline.js
function computeControlPoints(K) {
  let p1 = new Array();
  let p2 = new Array();
  let n = K.length - 1;
  let a = new Array();
  let b = new Array();
  let c = new Array();
  let r = new Array();
  a[0] = 0;
  b[0] = 2;
  c[0] = 1;
  r[0] = K[0] + 2 * K[1];
  for (let i = 1; i < n - 1; i++) {
    a[i] = 1;
    b[i] = 4;
    c[i] = 1;
    r[i] = 4 * K[i] + 2 * K[i + 1];
  }
  a[n - 1] = 2;
  b[n - 1] = 7;
  c[n - 1] = 0;
  r[n - 1] = 8 * K[n - 1] + K[n];
  for (let i = 1; i < n; i++) {
    let m = a[i] / b[i - 1];
    b[i] = b[i] - m * c[i - 1];
    r[i] = r[i] - m * r[i - 1];
  }
  p1[n - 1] = r[n - 1] / b[n - 1];
  for (let i = n - 2; i >= 0; --i)
    p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];
  for (let i = 0; i < n - 1; i++)
    p2[i] = 2 * K[i + 1] - p1[i + 1];
  p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);
  return { p1, p2 };
}

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.12/node_modules/@user.tax/captcha-img/src/wave.js
var svgns = "http://www.w3.org/2000/svg";
function generatePoints(width, height, segmentCount, layerCount, variance) {
  const cellWidth = width / segmentCount;
  const cellHeight = height / layerCount;
  const moveLimitX = cellWidth * variance * Math.random();
  const moveLimitY = cellHeight * variance;
  const points = [];
  for (let y = cellHeight; y < height; y += cellHeight) {
    let pointsPerLayer = [];
    pointsPerLayer.push({ x: 0, y: Math.floor(y) });
    for (let x = cellWidth; x < width; x += cellWidth) {
      const varietalY = y - moveLimitY / 2 + Math.random() * moveLimitY;
      const varietalX = x - moveLimitX / 2 + Math.random() * moveLimitX;
      pointsPerLayer.push({
        x: Math.floor(varietalX),
        y: Math.floor(varietalY)
      });
    }
    pointsPerLayer.push({ x: width, y: Math.floor(y) });
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

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.12/node_modules/@user.tax/captcha-img/src/D.js
var D_default = ["M-3.514 426.203a25.776 25.776 0 0 1-9.469-28.406l4.209-13.15a25.776 25.776 0 0 1 23.145-18.412l335.82-26.828L479.019 29.941a26.828 26.828 0 0 1 26.775-16.886h13.677a25.776 25.776 0 0 1 24.723 16.833l129.3 309.572 335.82 26.828a25.776 25.776 0 0 1 23.146 18.41l4.208 13.152a25.776 25.776 0 0 1-7.89 28.406L775.49 643.823l77.8 326.142a26.828 26.828 0 0 1-9.994 27.88l-15.255 8.416a26.302 26.302 0 0 1-29.406 0l-285.9-173.591-287.583 175.327a26.302 26.302 0 0 1-29.405 0l-11.573-7.89a26.828 26.828 0 0 1-9.994-27.88l75.696-328.456z", "M0 512 25.472 31.36 512 0l512 512-512 512L0 512zm293.376-128.96a85.952 85.952 0 1 0 0-171.904 85.952 85.952 0 0 0 0 171.904z", "M1019.323 20.153a42.75 42.75 0 0 1 5.301 28.514L879.7 931.47a42.75 42.75 0 0 1-57.97 32.747L554.152 857.64l-110.724 149.97a42.75 42.75 0 0 1-77.208-25.352V810.657a85.501 85.501 0 0 1 19.195-54.037l374.497-459.57a12.825 12.825 0 0 0-18.426-17.742l-462.05 405.79a85.501 85.501 0 0 1-88.836 14.877L25.54 632.301a42.75 42.75 0 0 1-5.387-76.439L960.84 4.848a42.75 42.75 0 0 1 58.483 15.305z", "M305.193 884.733c-4.542 0-8.817-2.405-11.222-6.413L86.897 518.413c-2.404-4.008-2.404-8.818 0-12.826L293.971 145.68a13.092 13.092 0 0 1 11.222-6.413h413.614a13.092 13.092 0 0 1 11.222 6.413l207.074 359.907a12.29 12.29 0 0 1 0 12.826L730.029 878.32a13.092 13.092 0 0 1-11.222 6.413H305.193M512 270.191c-133.329 0-241.809 108.48-241.809 241.809S378.671 753.809 512 753.809 753.809 645.329 753.809 512 645.329 270.191 512 270.191M305.193 966.227h413.614c33.666 0 64.927-18.17 81.76-47.293l207.074-359.908a93.891 93.891 0 0 0 0-94.052L800.568 105.066c-16.834-29.124-48.095-47.293-81.761-47.293H305.193c-33.666 0-64.927 18.17-81.76 47.293L16.358 464.974a93.895 93.895 0 0 0 0 94.052l207.073 359.908a94.72 94.72 0 0 0 81.761 47.293zM512 351.685c88.44 0 160.315 71.874 160.315 160.315S600.441 672.315 512 672.315 351.685 600.441 351.685 512 423.559 351.685 512 351.685z", "M42.67 213.336 512 0l469.33 213.336v597.328L512 1024 42.67 810.664V213.336zm426.67 240.656-341.333-154.99v456.654L469.34 910.994V454.012zm426.651 301.664V299.002L554.66 453.992v456.981zM826.67 236.662 512 93.674 197.331 236.662 512 379.651z", "M512 2.276c144.18 3.786 264.183 53.666 360.084 149.567 95.974 96.047 145.854 216.05 149.64 360.157-3.786 144.18-53.666 264.183-149.64 360.084-95.901 95.974-215.905 145.854-360.084 149.64-144.18-3.786-264.183-53.666-360.157-149.64C56.015 776.183 6.135 656.179 2.276 512c3.786-144.18 53.666-264.183 149.567-360.157C247.89 56.015 367.893 6.135 512 2.276zm-43.18 466.543H300.391a41.797 41.797 0 0 0-30.73 12.452 41.797 41.797 0 0 0-12.524 30.802c0 12.088 4.15 22.355 12.524 30.656a41.797 41.797 0 0 0 30.73 12.525h168.427V723.68c0 12.16 4.15 22.355 12.452 30.73a41.797 41.797 0 0 0 30.802 12.524 41.797 41.797 0 0 0 30.656-12.525 41.797 41.797 0 0 0 12.525-30.729V555.254H723.68a41.797 41.797 0 0 0 30.73-12.452 41.797 41.797 0 0 0 12.524-30.73 41.797 41.797 0 0 0-12.525-30.728 41.797 41.797 0 0 0-30.729-12.525H555.254V300.392a41.797 41.797 0 0 0-12.452-30.73A41.797 41.797 0 0 0 512 257.138a41.797 41.797 0 0 0-30.73 12.524 41.797 41.797 0 0 0-12.524 30.73v168.427z", "M512 3.848C231.61 3.848 3.848 231.61 3.848 512S231.61 1020.152 512 1020.152 1020.152 792.39 1020.152 512 792.39 3.848 512 3.848zm0 725.931c-120.686 0-217.78-97.093-217.78-217.779S391.315 294.22 512 294.22 729.78 391.315 729.78 512 632.685 729.78 512 729.78z", "M515.006 127.243c141.94 0 257.005 114.844 257.005 256.507h.5c141.662 0 256.506 114.838 256.506 256.5 0 141.663-114.844 256.507-256.507 256.507H257.501C115.84 896.757.995 781.913.995 640.25s114.844-256.5 256.506-256.5h.5c0-141.663 115.066-256.507 257.005-256.507z", "M541.458 502.308v392.645a147.29 147.29 0 0 1-147.29 147.29 29.458 29.458 0 0 1 0-58.916 88.374 88.374 0 0 0 88.374-88.374V502.308a132.56 132.56 0 0 0-223.586 27.985h-.088a12.844 12.844 0 0 1-24.067-.206h-.089a132.56 132.56 0 0 0-227.12-23.065 11.282 11.282 0 0 1-9.721 5.832c-6.334 0-11.46-5.538-11.46-12.372 0-1.178.148-2.298.442-3.358 34.584-248.39 241.26-441.722 495.69-455.656V11.215a29.458 29.458 0 0 1 58.915 0v30.253c254.782 13.963 461.665 207.767 495.836 456.657h-.118l.03.972a11.93 11.93 0 0 1-22.359 5.863 132.56 132.56 0 0 0-224.676 23.271v-.03a13.256 13.256 0 0 1-26.365-.794h-.117a132.56 132.56 0 0 0-222.231-25.099z", "M742.912 34.086c-97.532 0-182.066 51.37-230.832 127.834-48.9-76.465-133.426-127.834-230.83-127.834-152.024 0-275.303 123.153-275.303 275.176 0 39.271 6.113 76.465 20.933 110.276 102.087 231.877 275.83 428.372 485.2 566.745C721.325 847.91 895.069 651.415 997.247 419.538c14.83-33.811 20.808-71.005 20.808-110.276 0-152.023-123.12-275.176-275.143-275.176z", "M763.374 323.47h-188.53v345.639c0 86.724-70.385 157.109-157.11 157.109-86.724 0-157.108-70.385-157.108-157.109S331.01 512 417.735 512c35.82 0 67.87 11.94 94.265 31.422v-345.64h251.374M951.905-53.592H72.095C2.967-53.592-53.592 2.967-53.592 72.095v879.81c0 69.128 56.559 125.687 125.687 125.687h879.81c69.128 0 125.687-56.559 125.687-125.687V72.095c0-69.128-56.559-125.687-125.687-125.687Z", "M851.899 342.05a169.95 169.95 0 0 0-145.024 81.576L600.374 317.125a169.95 169.95 0 1 0-176.748 0L317.125 423.626a169.95 169.95 0 1 0 0 176.748l106.501 106.501a169.95 169.95 0 1 0 176.748 0l106.501-106.501A169.95 169.95 0 1 0 851.9 342.05zM455.35 172.102a56.65 56.65 0 1 1 56.65 56.65 56.65 56.65 0 0 1-56.65-56.65zM172.101 568.65a56.65 56.65 0 1 1 56.65-56.65 56.65 56.65 0 0 1-56.65 56.65zM568.65 851.899a56.65 56.65 0 1 1-56.65-56.65 56.65 56.65 0 0 1 56.65 56.65zM512 634.93 389.07 512 512 389.07 634.93 512zm339.899-66.28a56.65 56.65 0 1 1 56.65-56.65 56.65 56.65 0 0 1-56.65 56.65z", "M912.498 401.636H623.502V112.64c0-60.644-49.72-110.364-110.364-110.364S402.773 51.996 402.773 112.64v288.996H113.778C53.134 401.636 3.413 451.243 3.413 512c0 60.644 49.721 110.364 110.365 110.364h288.995V911.36c0 60.644 49.721 110.364 110.365 110.364s110.364-49.72 110.364-110.364V622.364h288.996c60.643 0 110.364-49.72 110.364-110.364 0-60.757-49.72-110.364-110.364-110.364z"];

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.12/node_modules/@user.tax/captcha-img/src/pattern.js
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

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.12/node_modules/@user.tax/captcha-img/src/captcha-svg.js
var random = (base, offset = 0) => Math.random() * base + offset;
var randomInt = (base, offset = 0) => parseInt(random(base, offset));
var captcha_svg_default = (width, height) => {
  height = height || width;
  const layerCount = randomInt(6, 6), segmentCount = random(10, 5), wave = new Wavery({
    width,
    height,
    segmentCount,
    layerCount,
    variance: random(10, 0.1),
    strokeWidth: 0,
    strokeColor: "none"
  }), { svg } = wave.generateSvg(), path = [], randomColor = (base) => {
    var i = 0, r = [], n2 = 0;
    while (++i < 4) {
      r.unshift(randomInt(255));
      n2 += r[0];
    }
    n2 = n2 / base / 3;
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
  const size = randomInt(Math.round(height / 20), Math.round(height / 10)), box_h = randomInt(height - size), box_w = randomInt(width - size), block_y = box_h, block_x = box_w, d_n = randomInt(D_default.length);
  path.splice(
    parseInt(layerCount / 2),
    0,
    `<svg viewBox="0 0 1024 1024" x="${block_x}" y="${block_y}" width="${size}" height="${size}"><path d="${D_default[d_n]}" fill="url(#ico)" fill-opacity=".65" transform="skewX(${randomInt(
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
    size
  ];
};

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.12/node_modules/@user.tax/captcha-img/src/index.js
var import_webp = __toESM(require_webp(), 1);
var ENCODER = new TextEncoder();
var encode2 = ENCODER.encode.bind(ENCODER);
var src_default = async (width, quality) => {
  const li = captcha_svg_default(width);
  li[0] = await (0, import_webp.svgWebp)(encode2(li[0]), quality);
  return li;
};

// ../../node_modules/.pnpm/@iuser+u8@0.0.8/node_modules/@iuser/u8/lib/index.js
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

// db/redis/lua.js
var lua_default = (R2, redis) => {
  R2.fboolRo.hasHost;
  R2.fi64.zid;
};

// db/redis/init.js
var import_redis = __toESM(require_redis(), 1);
var _prefix;
var encode3;
var encoder;
var key;
encoder = new TextEncoder();
encode3 = encoder.encode.bind(encoder);
_prefix = (prefix, f) => {
  return (k, ...args) => {
    if (typeof k === "string" || k instanceof String) {
      k = encode3(k);
    }
    return f(u8merge(prefix, k), ...args);
  };
};
key = (prefix) => {
  return u8merge(prefix, U8([0]));
};
var init_default = (redis, lua) => {
  var _R, i;
  _R = {};
  for (i in import_redis.Redis.prototype) {
    _R[i] = redis[i].bind(redis);
  }
  lua(new Proxy({}, {
    get: (self, rtype) => {
      return new Proxy({}, {
        get: (self2, func) => {
          var f;
          f = redis[rtype].bind(redis, func);
          return redis[func] = (...keys) => {
            return (...args) => {
              return f(keys, args);
            };
          };
        }
      });
    }
  }), redis);
  return (prefix, action) => {
    var ref, t;
    prefix = U8(prefix);
    if (action) {
      t = key(prefix);
      ref = action.split(" ");
      for (i of ref) {
        prefix[i] = _prefix(t, _R[i] || redis[i]);
      }
    }
    return prefix;
  };
};

// db/redis.js
var import_redis2 = __toESM(require_redis(), 1);
var REDIS_CLUSTER;
var REDIS_DB;
var REDIS_HOST;
var REDIS_PASSWORD;
var REDIS_PORT;
var REDIS_USER;
var SERVER;
var env;
({ env } = process);
({ REDIS_DB, REDIS_PASSWORD, REDIS_CLUSTER, REDIS_USER } = env);
if (REDIS_CLUSTER) {
  SERVER = (0, import_redis2.serverCluster)(REDIS_CLUSTER.split("|").map((i) => {
    var host, port;
    [host, port] = i.split(":");
    return [host, port ? parseInt(port) : 6379];
  }));
} else {
  ({ REDIS_HOST, REDIS_PORT } = env);
  SERVER = (0, import_redis2.serverHostPort)(REDIS_HOST, parseInt(REDIS_PORT));
}
var redis_default = await (0, import_redis2.redisConn)(3, SERVER, REDIS_USER, REDIS_PASSWORD, parseInt(REDIS_DB));

// R.js
var $;
$ = init_default(redis_default, lua_default);
var R = redis_default;
var R_CONF = $([0]);
var R_HOST = $([2]);
var R_NAME = $([3]);
var R_MAIL = $([4], "hgetI zid");
var R_MAIL_BAN_HOST = $([5]);
var R_CAPTCHA = $([255], "setex getB del exist");

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
var import_rust = __toESM(require_rust(), 1);
var CACHE;
var WIDTH;
var _cache;
var _new;
var captcha;
CACHE = [[], []];
WIDTH = 350;
_new = (radio) => {
  return src_default(WIDTH * radio, 20);
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
var captcha_default = captcha = async (radio) => {
  var captcha_size, id, img, key2, x, y;
  radio = parseInt(radio) >= 2 ? 2 : 1;
  [img, id, x, y, captcha_size] = await _cache(radio);
  if (radio === 1) {
    x *= 2;
    y *= 2;
    captcha_size *= 2;
  }
  while (true) {
    key2 = (0, import_rust.randomBytes)(8);
    if (!await R_CAPTCHA.exist(key2)) {
      R_CAPTCHA.setex(key2, zipint([x, y, captcha_size]), 600);
      break;
    }
  }
  return [img, D_default[id], (0, import_rust.z85Dump)(key2)];
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
err = (code) => {
  return new HttpErr(code, "");
};
var ERR_CAPTCHA = err(412);
var ERR_LOGIN = err(401);

// mid/captcha.js
var import_rust2 = __toESM(require_rust());
var captcha_default2 = async (self) => {
  var captcha2, id, r, w, x, x0, y, y0;
  ({ captcha: captcha2 } = self.headers);
  if (captcha2) {
    [id, x, y] = JSON.parse(captcha2);
    id = (0, import_rust2.z85Load)(id);
    r = await R_CAPTCHA.getB(id);
    if (r) {
      [x0, y0, w] = unzipint(r);
      if (x >= x0 && x <= x0 + w && y >= y0 && y <= y0 + w) {
        R_CAPTCHA.del(id);
        return;
      }
    }
  }
  throw ERR_CAPTCHA;
};

// ../../node_modules/.pnpm/@iuser+split@0.0.2/node_modules/@iuser/split/lib/index.js
var rsplit = (str, split) => {
  var p, suffix;
  p = str.lastIndexOf("@");
  if (p >= 0) {
    suffix = str.slice(p + 1);
    str = str.slice(0, +(p - 1) + 1 || 9e9);
  } else {
    suffix = "";
  }
  return [str, suffix];
};

// POST/auth/sign.js
var import_rust4 = __toESM(require_rust(), 1);

// R/hostId.js
var hostId = async (host) => {
  return await R.zscore(R_HOST, host) || 0;
};

// lib/sk.js
var import_rust3 = __toESM(require_rust());

// ../../node_modules/.pnpm/@iuser+time@0.0.2/node_modules/@iuser/time/lib/index.js
var dateInt;
dateInt = (n) => {
  return () => {
    return parseInt(new Date() / n);
  };
};
var Minute = dateInt(6e4);
var Hour = dateInt(36e5);
var Day = dateInt(864e5);

// lib/sk.js
var SK = await R.hgetB(R_CONF, "SK");
var skDump = (...args) => {
  var iv, msg;
  args.push(Hour());
  msg = pack2(args);
  iv = (0, import_rust3.randomBytes)(8);
  return (0, import_rust3.b64)([iv, (0, import_rust3.encrypt)(SK, iv, msg)]);
};
var skLoad = (str) => {
  var bin, r;
  bin = (0, import_rust3.unb64)(str);
  r = (0, import_rust3.decrypt)(SK, bin.slice(0, 8), bin.slice(8));
  if (r) {
    return unpack(r);
  }
};

// POST/auth/sign.js
var _captcha;
_captcha = async (self, signUp) => {
  if (signUp) {
    await captcha_default2(self);
  } else {
    null;
  }
};
var mail = async function(signUp, account, password, lang) {
  var host, token;
  await _captcha(this, signUp);
  password = password.slice(0, 64);
  account = account.trim().toLowerCase();
  if (!/^\S+@\S+$/.test(account)) {
    return ACCOUNT_INVALID;
  }
  [mail, host] = rsplit(account, "@");
  if (mail.length > 64 || account.length > 254) {
    return ACCOUNT_TOO_LONG;
  }
  if (await R.hasHost(R_MAIL_BAN_HOST)(host)) {
    return ACCOUNT_MAIL_HOST_BAN;
  }
  token = skDump(mail, await hostId(host) || host, password);
  console.log(lang);
  console.log(token);
  console.log(token.length);
  console.log(skLoad(token));
  return "";
};
var phone = async (signUp, area, phone2, password, lang) => {
  await _captcha(void 0, signUp);
  console.log(lang);
  return "";
};

// MAP.js
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
var MAP_default = obj2map(POST_exports, [
  (o) => {
    if (o !== void 0) {
      return pack2(o);
    } else {
      return "";
    }
  }
]);

// index.js
import {
  createBrotliCompress
} from "zlib";
var API_PORT;
var HEADERS;
var PORT;
var compress2;
var server;
var streamBuffer;
HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*"
};
if (process.env.DEBUG) {
  HEADERS["Access-Control-Allow-Private-Network"] = true;
}
streamBuffer = (stream) => {
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
compress2 = (req, res, code, body) => {
  var br, encoding, end, headers, length, s;
  headers = HEADERS;
  end = res;
  if (body) {
    ({ length } = body);
    if (length > 512) {
      encoding = req.headers["accept-encoding"].replaceAll(" ", "").split(",");
      br = "br";
      if (encoding.includes(br)) {
        s = createBrotliCompress();
        s.pipe(res);
        end = s;
        headers = {
          ...headers,
          "Content-Encoding": br
        };
      }
    }
  }
  res.writeHead(code, headers);
  end.end(body || "");
};
server = http.createServer(async (req, res) => {
  var bin, body, code, err2, f, func, i, method, r, ref, ref1, url;
  ({ url, method } = req);
  url = url.slice(1);
  f = MAP_default;
  ref = url.split(".");
  for (i of ref) {
    f = f.get(i);
    if (!f) {
      break;
    }
  }
  if (f instanceof Map) {
    f = f.get("default");
  }
  if (f) {
    code = 200;
    if (method !== "OPTIONS") {
      console.log(method, url);
      func = f[0];
      while (true) {
        if (method === "POST") {
          try {
            bin = (await streamBuffer(req)).toString();
            if (bin.length) {
              r = JSON.parse(bin);
            }
          } catch (error) {
            code = 500;
            body = `NOT JSON : ${bin}`;
            break;
          }
        }
        try {
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
          ref1 = f[1];
          for (f of ref1) {
            body = f(body);
          }
        } catch (error) {
          err2 = error;
          if (err2 instanceof HttpErr) {
            ({ code, body } = err2);
          } else {
            [url, r, err2].map((e) => {
              console.error(e);
            });
            code = 500;
            body = err2.toString();
          }
        }
        break;
      }
    }
  } else {
    code = 404;
    body = "404 : " + url;
  }
  compress2(req, res, code, body);
});
({ API_PORT } = process.env);
PORT = API_PORT || 80;
console.log("listen on " + PORT);
server.listen(PORT);
//!/usr/bin/env coffee

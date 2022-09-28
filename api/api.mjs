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
      var prebuild = resolve2(dir);
      if (prebuild)
        return prebuild;
      var nearby = resolve2(path.dirname(process.execPath));
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
      function resolve2(dir2) {
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

// ../../node_modules/.pnpm/@user.tax+webp@0.0.18/node_modules/@user.tax/webp/index.js
var require_webp = __commonJS({
  "../../node_modules/.pnpm/@user.tax+webp@0.0.18/node_modules/@user.tax/webp/index.js"(exports, module) {
    var { existsSync, readFileSync: readFileSync2 } = __require("fs");
    var { join } = __require("path");
    var { platform, arch } = process;
    var nativeBinding = null;
    var localFileExisted = false;
    var loadError = null;
    function isMusl() {
      if (!process.report || typeof process.report.getReport !== "function") {
        try {
          return readFileSync2("/usr/bin/ldd", "utf8").includes("musl");
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
    var { existsSync, readFileSync: readFileSync2 } = __require("fs");
    var { join } = __require("path");
    var { platform, arch } = process;
    var nativeBinding = null;
    var localFileExisted = false;
    var loadError = null;
    function isMusl() {
      if (!process.report || typeof process.report.getReport !== "function") {
        try {
          return readFileSync2("/usr/bin/ldd", "utf8").includes("musl");
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
    var { existsSync, readFileSync: readFileSync2 } = __require("fs");
    var { join } = __require("path");
    var { platform, arch } = process;
    var nativeBinding = null;
    var localFileExisted = false;
    var loadError = null;
    function isMusl() {
      if (!process.report || typeof process.report.getReport !== "function") {
        try {
          return readFileSync2("/usr/bin/ldd", "utf8").includes("musl");
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
    var { z85Dump: z85Dump2, z85Load: z85Load3, ipBin, binU64, u64Bin, zipU64, unzipU64, b64, unb64, blake3Round: blake3Round2, blake3, xxh3: xxh32, encrypt, decrypt, randomBytes: randomBytes3 } = nativeBinding;
    module.exports.z85Dump = z85Dump2;
    module.exports.z85Load = z85Load3;
    module.exports.ipBin = ipBin;
    module.exports.binU64 = binU64;
    module.exports.u64Bin = u64Bin;
    module.exports.zipU64 = zipU64;
    module.exports.unzipU64 = unzipU64;
    module.exports.b64 = b64;
    module.exports.unb64 = unb64;
    module.exports.blake3Round = blake3Round2;
    module.exports.blake3 = blake3;
    module.exports.xxh3 = xxh32;
    module.exports.encrypt = encrypt;
    module.exports.decrypt = decrypt;
    module.exports.randomBytes = randomBytes3;
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
      var b = rgb[2] / 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var delta = max - min;
      var h;
      var s;
      var l;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
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
      var b = rgb[2] / 255;
      var v = Math.max(r, g, b);
      var diff = v - Math.min(r, g, b);
      var diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
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
      var b = rgb[2];
      var h = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var c;
      var m;
      var y;
      var k;
      k = Math.min(1 - r, 1 - g, 1 - b);
      c = (1 - r - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
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
      var b = rgb[2] / 255;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      var h = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb;
      var val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
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
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
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
      var b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r;
      var g;
      var b;
      r = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m * (1 - k) + k);
      b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      var x = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r;
      var g;
      var b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x;
      var y;
      var z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var hr;
      var h;
      var c;
      hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      var l = lch[0];
      var c = lch[1];
      var h = lch[2];
      var a;
      var b;
      var hr;
      hr = h / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
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
      var b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
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
      var b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
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
      var b = rem % 6 / 5 * 255;
      return [r, g, b];
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
      var b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var max = Math.max(Math.max(r, g), b);
      var min = Math.min(Math.min(r, g), b);
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
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
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
      var b = hwb[2] / 100;
      var v = 1 - b;
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
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      var val = Math.round(gray[0] / 100 * 255) & 255;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
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
    var wrapAnsi16 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m = (fn, offset) => function() {
      const rgb = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
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
      styles.color.grey = styles.color.gray;
      for (const groupName of Object.keys(styles)) {
        const group = styles[groupName];
        for (const styleName of Object.keys(group)) {
          const style = group[styleName];
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
        Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: false
        });
      }
      const ansi2ansi = (n) => n;
      const rgb2rgb = (r, g, b) => [r, g, b];
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 0)
      };
      styles.color.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 0)
      };
      styles.color.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 0)
      };
      styles.bgColor.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 10)
      };
      styles.bgColor.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 10)
      };
      styles.bgColor.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 10)
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
          styles.color.ansi[key2] = wrapAnsi16(suite.ansi16, 0);
          styles.bgColor.ansi[key2] = wrapAnsi16(suite.ansi16, 10);
        }
        if ("ansi256" in suite) {
          styles.color.ansi256[key2] = wrapAnsi256(suite.ansi256, 0);
          styles.bgColor.ansi256[key2] = wrapAnsi256(suite.ansi256, 10);
        }
        if ("rgb" in suite) {
          styles.color.ansi16m[key2] = wrapAnsi16m(suite.rgb, 0);
          styles.bgColor.ansi16m[key2] = wrapAnsi16m(suite.rgb, 10);
        }
      }
      return styles;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles
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
    var os = __require("os");
    var hasFlag = require_has_flag();
    var env2 = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env2) {
      forceColor = env2.FORCE_COLOR.length === 0 || parseInt(env2.FORCE_COLOR, 10) !== 0;
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
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env2) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env2) || env2.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env2) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env2.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env2) {
        const version = parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
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
      if (env2.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
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
    function unescape(c) {
      if (c[0] === "u" && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, args) {
      const results = [];
      const chunks = args.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        if (!isNaN(chunk)) {
          results.push(Number(chunk));
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk;
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
    module.exports = (chalk, tmp) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
        if (escapeChar) {
          chunk.push(unescape(escapeChar));
        } else if (style) {
          const str = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
          styles.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(chr);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
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
    var ansiStyles = require_ansi_styles();
    var stdoutColor = require_supports_color().stdout;
    var template = require_templates();
    var isSimpleWindowsTerm = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
    var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
    var skipModels = /* @__PURE__ */ new Set(["gray"]);
    var styles = /* @__PURE__ */ Object.create(null);
    function applyOptions(obj, options) {
      options = options || {};
      const scLevel = stdoutColor ? stdoutColor.level : 0;
      obj.level = options.level === void 0 ? scLevel : options.level;
      obj.enabled = "enabled" in options ? options.enabled : obj.level > 0;
    }
    function Chalk(options) {
      if (!this || !(this instanceof Chalk) || this.template) {
        const chalk = {};
        applyOptions(chalk, options);
        chalk.template = function() {
          const args = [].slice.call(arguments);
          return chalkTag.apply(null, [chalk.template].concat(args));
        };
        Object.setPrototypeOf(chalk, Chalk.prototype);
        Object.setPrototypeOf(chalk.template, chalk);
        chalk.template.constructor = Chalk;
        return chalk.template;
      }
      applyOptions(this, options);
    }
    if (isSimpleWindowsTerm) {
      ansiStyles.blue.open = "\x1B[94m";
    }
    for (const key2 of Object.keys(ansiStyles)) {
      ansiStyles[key2].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key2].close), "g");
      styles[key2] = {
        get() {
          const codes = ansiStyles[key2];
          return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key2);
        }
      };
    }
    styles.visible = {
      get() {
        return build.call(this, this._styles || [], true, "visible");
      }
    };
    ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), "g");
    for (const model of Object.keys(ansiStyles.color.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      styles[model] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles.color.close,
              closeRe: ansiStyles.color.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), "g");
    for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles.bgColor.close,
              closeRe: ansiStyles.bgColor.closeRe
            };
            return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, styles);
    function build(_styles, _empty, key2) {
      const builder = function() {
        return applyStyle.apply(builder, arguments);
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
      builder.__proto__ = proto;
      return builder;
    }
    function applyStyle() {
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
      const originalDim = ansiStyles.dim.open;
      if (isSimpleWindowsTerm && this.hasGrey) {
        ansiStyles.dim.open = "";
      }
      for (const code of this._styles.slice().reverse()) {
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
      }
      ansiStyles.dim.open = originalDim;
      return str;
    }
    function chalkTag(chalk, strings2) {
      if (!Array.isArray(strings2)) {
        return [].slice.call(arguments, 1).join(" ");
      }
      const args = [].slice.call(arguments, 2);
      const parts = [strings2.raw[0]];
      for (let i = 1; i < strings2.length; i++) {
        parts.push(String(args[i - 1]).replace(/[{}\\]/g, "\\$&"));
        parts.push(String(strings2.raw[i]));
      }
      return template(chalk, parts.join(""));
    }
    Object.defineProperties(Chalk.prototype, styles);
    module.exports = Chalk();
    module.exports.supportsColor = stdoutColor;
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
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", $3 = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
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
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
          switch (h2) {
            case c:
              return r2 ? $4(1, 0) : $4(31, 11);
            case f:
              return r2 ? $4(1, M3) : $4(0, M3 + 1);
            case o:
              var v2 = this.$locale().weekStart || 0, D2 = (y2 < v2 ? y2 + 7 : y2) - v2;
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
            var y2 = this.clone().set(d, 1);
            y2.$d[$4](l2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
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
          var l2 = O.p(h2), y2 = function(t2) {
            var e2 = w($4);
            return O.w(e2.date(e2.date() + Math.round(t2 * r2)), $4);
          };
          if (l2 === f)
            return this.set(f, this.$M + r2);
          if (l2 === c)
            return this.set(c, this.$y + r2);
          if (l2 === a)
            return y2(1);
          if (l2 === o)
            return y2(7);
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
          return r2.replace(y, function(t3, e3) {
            return e3 || l2[t3] || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, $4) {
          var l2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, v2 = O.m(this, M3);
          return v2 = (l2 = {}, l2[c] = v2 / 12, l2[f] = v2, l2[h] = v2 / 3, l2[o] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y2] || g2, $4 ? v2 : O.a(v2);
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
    var fs = __require("fs");
    module.exports = (fp) => new Promise((resolve2) => {
      fs.access(fp, (err2) => {
        resolve2(!err2);
      });
    });
    module.exports.sync = (fp) => {
      try {
        fs.accessSync(fp);
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
    module.exports = (cb) => new Promise((resolve2) => {
      resolve2(cb());
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
      const next = () => {
        activeCount--;
        if (queue.length > 0) {
          queue.shift()();
        }
      };
      return (fn) => new Promise((resolve2, reject) => {
        const run = () => {
          activeCount++;
          pTry(fn).then(
            (val) => {
              resolve2(val);
              next();
            },
            (err2) => {
              reject(err2);
              next();
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
    var finder = (el) => Promise.all(el).then((val) => val[1] === true && Promise.reject(new EndError(val[0])));
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
      return new Promise((resolve2) => {
        (function find(dir) {
          locatePath(filenames, { cwd: dir }).then((file) => {
            if (file) {
              resolve2(path.join(dir, file));
            } else if (dir === root) {
              resolve2(null);
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
    function patch(fs) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs);
      }
      if (!fs.lutimes) {
        patchLutimes(fs);
      }
      fs.chown = chownFix(fs.chown);
      fs.fchown = chownFix(fs.fchown);
      fs.lchown = chownFix(fs.lchown);
      fs.chmod = chmodFix(fs.chmod);
      fs.fchmod = chmodFix(fs.fchmod);
      fs.lchmod = chmodFix(fs.lchmod);
      fs.chownSync = chownFixSync(fs.chownSync);
      fs.fchownSync = chownFixSync(fs.fchownSync);
      fs.lchownSync = chownFixSync(fs.lchownSync);
      fs.chmodSync = chmodFixSync(fs.chmodSync);
      fs.fchmodSync = chmodFixSync(fs.fchmodSync);
      fs.lchmodSync = chmodFixSync(fs.lchmodSync);
      fs.stat = statFix(fs.stat);
      fs.fstat = statFix(fs.fstat);
      fs.lstat = statFix(fs.lstat);
      fs.statSync = statFixSync(fs.statSync);
      fs.fstatSync = statFixSync(fs.fstatSync);
      fs.lstatSync = statFixSync(fs.lstatSync);
      if (fs.chmod && !fs.lchmod) {
        fs.lchmod = function(path, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs.lchmodSync = function() {
        };
      }
      if (fs.chown && !fs.lchown) {
        fs.lchown = function(path, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs.rename = typeof fs.rename !== "function" ? fs.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs.rename);
      }
      fs.read = typeof fs.read !== "function" ? fs.read : function(fs$read) {
        function read2(fd, buffer, offset, length, position3, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs, fd, buffer, offset, length, position3, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset, length, position3, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read2, fs$read);
        return read2;
      }(fs.read);
      fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : function(fs$readSync) {
        return function(fd, buffer, offset, length, position3) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs, fd, buffer, offset, length, position3);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs.readSync);
      function patchLchmod(fs2) {
        fs2.lchmod = function(path, mode, callback) {
          fs2.open(
            path,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err2, fd) {
              if (err2) {
                if (callback)
                  callback(err2);
                return;
              }
              fs2.fchmod(fd, mode, function(err3) {
                fs2.close(fd, function(err22) {
                  if (callback)
                    callback(err3 || err22);
                });
              });
            }
          );
        };
        fs2.lchmodSync = function(path, mode) {
          var fd = fs2.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs2.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs2.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs2.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs2) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs2.futimes) {
          fs2.lutimes = function(path, at, mt, cb) {
            fs2.open(path, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs2.futimes(fd, at, mt, function(er2) {
                fs2.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs2.lutimesSync = function(path, at, mt) {
            var fd = fs2.openSync(path, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs2.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs2.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs2.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs2.futimes) {
          fs2.lutimes = function(_a, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs2.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target2, mode, cb) {
          return orig.call(fs, target2, mode, function(er) {
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
            return orig.call(fs, target2, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target2, uid, gid, cb) {
          return orig.call(fs, target2, uid, gid, function(er) {
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
        return function(target2, uid, gid) {
          try {
            return orig.call(fs, target2, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target2, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
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
          return options ? orig.call(fs, target2, options, callback) : orig.call(fs, target2, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target2, options) {
          var stats = options ? orig.call(fs, target2, options) : orig.call(fs, target2);
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
    var Stream = __require("stream").Stream;
    module.exports = legacy;
    function legacy(fs) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path, options);
        Stream.call(this);
        var self2 = this;
        this.path = path;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key2 = keys[index];
          this[key2] = options[key2];
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
        fs.open(this.path, this.flags, this.mode, function(err2, fd) {
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
      function WriteStream(path, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path, options);
        Stream.call(this);
        this.path = path;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key2 = keys[index];
          this[key2] = options[key2];
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
          this._open = fs.open;
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
    var fs = __require("fs");
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
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util2.debuglog)
      debug = util2.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util2.format.apply(util2, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs, queue);
      fs.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs, fd, function(err2) {
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
      }(fs.close);
      fs.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs[gracefulQueue]);
          __require("assert").equal(fs[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs[gracefulQueue]);
    }
    module.exports = patch(clone(fs));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
      module.exports = patch(fs);
      fs.__patched = true;
    }
    function patch(fs2) {
      polyfills(fs2);
      fs2.gracefulify = patch;
      fs2.createReadStream = createReadStream;
      fs2.createWriteStream = createWriteStream2;
      var fs$readFile = fs2.readFile;
      fs2.readFile = readFile;
      function readFile(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path, options, cb);
        function go$readFile(path2, options2, cb2, startTime) {
          return fs$readFile(path2, options2, function(err2) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([go$readFile, [path2, options2, cb2], err2, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs2.writeFile;
      fs2.writeFile = writeFile;
      function writeFile(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path, data, options, cb);
        function go$writeFile(path2, data2, options2, cb2, startTime) {
          return fs$writeFile(path2, data2, options2, function(err2) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([go$writeFile, [path2, data2, options2, cb2], err2, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs2.appendFile;
      if (fs$appendFile)
        fs2.appendFile = appendFile;
      function appendFile(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path, data, options, cb);
        function go$appendFile(path2, data2, options2, cb2, startTime) {
          return fs$appendFile(path2, data2, options2, function(err2) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([go$appendFile, [path2, data2, options2, cb2], err2, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs2.copyFile;
      if (fs$copyFile)
        fs2.copyFile = copyFile;
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
      var fs$readdir = fs2.readdir;
      fs2.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, options2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path, options, cb);
        function fs$readdirCallback(path2, options2, cb2, startTime) {
          return function(err2, files) {
            if (err2 && (err2.code === "EMFILE" || err2.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path2, options2, cb2],
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
        var legStreams = legacy(fs2);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs2.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs2.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs2, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs2, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs2, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs2, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path, options) {
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
      function WriteStream(path, options) {
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
      function createReadStream(path, options) {
        return new fs2.ReadStream(path, options);
      }
      function createWriteStream2(path, options) {
        return new fs2.WriteStream(path, options);
      }
      var fs$open = fs2.open;
      fs2.open = open;
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
      return fs2;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs[gracefulQueue].length; ++i) {
        if (fs[gracefulQueue][i].length > 2) {
          fs[gracefulQueue][i][3] = now;
          fs[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs[gracefulQueue].length === 0)
        return;
      var elem = fs[gracefulQueue].shift();
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
          fs[gracefulQueue].push(elem);
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
    var errorEx = function errorEx2(name, properties) {
      if (!name || name.constructor !== String) {
        properties = name || {};
        name = Error.name;
      }
      var errorExError = function ErrorEXError(message) {
        if (!this) {
          return new ErrorEXError(message);
        }
        message = message instanceof Error ? message.message : message || this.message;
        Error.call(this, message);
        Error.captureStackTrace(this, errorExError);
        this.name = name;
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
      return new P((resolve2, reject) => {
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
                resolve2(results);
              }
            } else if (err2) {
              reject(err2);
            } else {
              resolve2(result);
            }
          });
        } else {
          args.push(function(result) {
            if (opts.multiArgs) {
              const results = new Array(arguments.length - 1);
              for (let i = 0; i < arguments.length; i++) {
                results[i] = arguments[i];
              }
              resolve2(results);
            } else {
              resolve2(result);
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
    var fs = require_graceful_fs();
    var stripBom = require_strip_bom();
    var parseJson = require_parse_json();
    var pify = require_pify();
    var parse = (data, fp) => parseJson(stripBom(data), path.relative(".", fp));
    module.exports = (fp) => pify(fs.readFile)(fp, "utf8").then((data) => parse(data, fp));
    module.exports.sync = (fp) => parse(fs.readFileSync(fp, "utf8"), fp);
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
var require_package = __commonJS({
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
    var chalk = require_chalk();
    var moment = require_dayjs_min();
    var figures = require_figures();
    var pkgConf = require_pkg_conf();
    var pkg = require_package();
    var defaultTypes = require_types();
    var { green, grey, red, underline, yellow } = chalk;
    var isPreviousLogInteractive = false;
    var defaults = pkg.options.default;
    var namespace = pkg.name;
    var Signale2 = class {
      constructor(options = {}) {
        this._interactive = options.interactive || false;
        this._config = Object.assign(this.packageConfiguration, options.config);
        this._customTypes = Object.assign({}, options.types);
        this._disabled = options.disabled || false;
        this._scopeName = options.scope || "";
        this._timers = options.timers || /* @__PURE__ */ new Map();
        this._types = this._mergeTypes(defaultTypes, this._customTypes);
        this._stream = options.stream || process.stdout;
        this._longestLabel = this._getLongestLabel();
        this._secrets = options.secrets || [];
        this._generalLogLevel = this._validateLogLevel(options.logLevel);
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
        return pkgConf.sync(namespace, { defaults });
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
        return labels.reduce((x, y) => x.length > y.length ? x : y);
      }
      _validateLogLevel(level) {
        return Object.keys(this._logLevels).includes(level) ? level : "info";
      }
      _mergeTypes(standard, custom) {
        const types = Object.assign({}, standard);
        Object.keys(custom).forEach((type) => {
          types[type] = Object.assign({}, types[type], custom[type]);
        });
        return types;
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
            chalk[type.color](this._padEnd(type.badge, type.badge.length + 1))
          );
        }
        if (this._config.displayLabel && type.label) {
          const label = this._config.uppercaseLabel ? type.label.toUpperCase() : type.label;
          if (this._config.underlineLabel) {
            signale2.push(
              chalk[type.color](
                this._padEnd(
                  underline(label),
                  this._longestUnderlinedLabel.length + 1
                )
              )
            );
          } else {
            signale2.push(
              chalk[type.color](this._padEnd(label, this._longestLabel.length + 1))
            );
          }
        }
        if (msg instanceof Error && msg.stack) {
          const [name, ...rest] = msg.stack.split("\n");
          if (this._config.underlineMessage) {
            signale2.push(underline(name));
          } else {
            signale2.push(name);
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
      scope(...name) {
        if (name.length === 0) {
          throw new Error("No scope name was defined.");
        }
        return new Signale2(Object.assign(this.currentOptions, { scope: name }));
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
          label = [...this._timers.keys()].reduceRight((x, y) => {
            return is(x) ? x : is(y) ? y : null;
          });
        }
        if (this._timers.has(label)) {
          const span = this._timeSpan(this._timers.get(label));
          this._timers.delete(label);
          const message = this._meta();
          message.push(red(this._padEnd(this._types.pause.badge, 2)));
          if (this._config.underlineLabel) {
            message.push(
              red(
                this._padEnd(
                  underline(label),
                  this._longestUnderlinedLabel.length + 1
                )
              )
            );
          } else {
            message.push(red(this._padEnd(label, this._longestLabel.length + 1)));
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
function writeExtBuffer(typedArray, type, allocateForWrite, encode3) {
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
  captcha: () => captcha_exports,
  test: () => test_exports
});

// POST/captcha.js
var captcha_exports = {};
__export(captcha_exports, {
  default: () => captcha_default
});

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.17/node_modules/@user.tax/captcha-img/src/bezier-spline.js
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

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.17/node_modules/@user.tax/captcha-img/src/wave.js
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

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.17/node_modules/@user.tax/captcha-img/src/D.js
var D_default = ["M-3.514 426.203a25.776 25.776 0 0 1-9.469-28.406l4.209-13.15a25.776 25.776 0 0 1 23.145-18.412l335.82-26.828L479.019 29.941a26.828 26.828 0 0 1 26.775-16.886h13.677a25.776 25.776 0 0 1 24.723 16.833l129.3 309.572 335.82 26.828a25.776 25.776 0 0 1 23.146 18.41l4.208 13.152a25.776 25.776 0 0 1-7.89 28.406L775.49 643.823l77.8 326.142a26.828 26.828 0 0 1-9.994 27.88l-15.255 8.416a26.302 26.302 0 0 1-29.406 0l-285.9-173.591-287.583 175.327a26.302 26.302 0 0 1-29.405 0l-11.573-7.89a26.828 26.828 0 0 1-9.994-27.88l75.696-328.456z", "M0 512 25.472 31.36 512 0l512 512-512 512L0 512zm293.376-128.96a85.952 85.952 0 1 0 0-171.904 85.952 85.952 0 0 0 0 171.904z", "M1019.323 20.153a42.75 42.75 0 0 1 5.301 28.514L879.7 931.47a42.75 42.75 0 0 1-57.97 32.747L554.152 857.64l-110.724 149.97a42.75 42.75 0 0 1-77.208-25.352V810.657a85.501 85.501 0 0 1 19.195-54.037l374.497-459.57a12.825 12.825 0 0 0-18.426-17.742l-462.05 405.79a85.501 85.501 0 0 1-88.836 14.877L25.54 632.301a42.75 42.75 0 0 1-5.387-76.439L960.84 4.848a42.75 42.75 0 0 1 58.483 15.305z", "M305.193 884.733c-4.542 0-8.817-2.405-11.222-6.413L86.897 518.413c-2.404-4.008-2.404-8.818 0-12.826L293.971 145.68a13.092 13.092 0 0 1 11.222-6.413h413.614a13.092 13.092 0 0 1 11.222 6.413l207.074 359.907a12.29 12.29 0 0 1 0 12.826L730.029 878.32a13.092 13.092 0 0 1-11.222 6.413H305.193M512 270.191c-133.329 0-241.809 108.48-241.809 241.809S378.671 753.809 512 753.809 753.809 645.329 753.809 512 645.329 270.191 512 270.191M305.193 966.227h413.614c33.666 0 64.927-18.17 81.76-47.293l207.074-359.908a93.891 93.891 0 0 0 0-94.052L800.568 105.066c-16.834-29.124-48.095-47.293-81.761-47.293H305.193c-33.666 0-64.927 18.17-81.76 47.293L16.358 464.974a93.895 93.895 0 0 0 0 94.052l207.073 359.908a94.72 94.72 0 0 0 81.761 47.293zM512 351.685c88.44 0 160.315 71.874 160.315 160.315S600.441 672.315 512 672.315 351.685 600.441 351.685 512 423.559 351.685 512 351.685z", "M42.67 213.336 512 0l469.33 213.336v597.328L512 1024 42.67 810.664V213.336zm426.67 240.656-341.333-154.99v456.654L469.34 910.994V454.012zm426.651 301.664V299.002L554.66 453.992v456.981zM826.67 236.662 512 93.674 197.331 236.662 512 379.651z", "M512 2.276c144.18 3.786 264.183 53.666 360.084 149.567 95.974 96.047 145.854 216.05 149.64 360.157-3.786 144.18-53.666 264.183-149.64 360.084-95.901 95.974-215.905 145.854-360.084 149.64-144.18-3.786-264.183-53.666-360.157-149.64C56.015 776.183 6.135 656.179 2.276 512c3.786-144.18 53.666-264.183 149.567-360.157C247.89 56.015 367.893 6.135 512 2.276zm-43.18 466.543H300.391a41.797 41.797 0 0 0-30.73 12.452 41.797 41.797 0 0 0-12.524 30.802c0 12.088 4.15 22.355 12.524 30.656a41.797 41.797 0 0 0 30.73 12.525h168.427V723.68c0 12.16 4.15 22.355 12.452 30.73a41.797 41.797 0 0 0 30.802 12.524 41.797 41.797 0 0 0 30.656-12.525 41.797 41.797 0 0 0 12.525-30.729V555.254H723.68a41.797 41.797 0 0 0 30.73-12.452 41.797 41.797 0 0 0 12.524-30.73 41.797 41.797 0 0 0-12.525-30.728 41.797 41.797 0 0 0-30.729-12.525H555.254V300.392a41.797 41.797 0 0 0-12.452-30.73A41.797 41.797 0 0 0 512 257.138a41.797 41.797 0 0 0-30.73 12.524 41.797 41.797 0 0 0-12.524 30.73v168.427z", "M512 3.848C231.61 3.848 3.848 231.61 3.848 512S231.61 1020.152 512 1020.152 1020.152 792.39 1020.152 512 792.39 3.848 512 3.848zm0 725.931c-120.686 0-217.78-97.093-217.78-217.779S391.315 294.22 512 294.22 729.78 391.315 729.78 512 632.685 729.78 512 729.78z", "M515.006 127.243c141.94 0 257.005 114.844 257.005 256.507h.5c141.662 0 256.506 114.838 256.506 256.5 0 141.663-114.844 256.507-256.507 256.507H257.501C115.84 896.757.995 781.913.995 640.25s114.844-256.5 256.506-256.5h.5c0-141.663 115.066-256.507 257.005-256.507z", "M541.458 502.308v392.645a147.29 147.29 0 0 1-147.29 147.29 29.458 29.458 0 0 1 0-58.916 88.374 88.374 0 0 0 88.374-88.374V502.308a132.56 132.56 0 0 0-223.586 27.985h-.088a12.844 12.844 0 0 1-24.067-.206h-.089a132.56 132.56 0 0 0-227.12-23.065 11.282 11.282 0 0 1-9.721 5.832c-6.334 0-11.46-5.538-11.46-12.372 0-1.178.148-2.298.442-3.358 34.584-248.39 241.26-441.722 495.69-455.656V11.215a29.458 29.458 0 0 1 58.915 0v30.253c254.782 13.963 461.665 207.767 495.836 456.657h-.118l.03.972a11.93 11.93 0 0 1-22.359 5.863 132.56 132.56 0 0 0-224.676 23.271v-.03a13.256 13.256 0 0 1-26.365-.794h-.117a132.56 132.56 0 0 0-222.231-25.099z", "M742.912 34.086c-97.532 0-182.066 51.37-230.832 127.834-48.9-76.465-133.426-127.834-230.83-127.834-152.024 0-275.303 123.153-275.303 275.176 0 39.271 6.113 76.465 20.933 110.276 102.087 231.877 275.83 428.372 485.2 566.745C721.325 847.91 895.069 651.415 997.247 419.538c14.83-33.811 20.808-71.005 20.808-110.276 0-152.023-123.12-275.176-275.143-275.176z", "M763.374 323.47h-188.53v345.639c0 86.724-70.385 157.109-157.11 157.109-86.724 0-157.108-70.385-157.108-157.109S331.01 512 417.735 512c35.82 0 67.87 11.94 94.265 31.422v-345.64h251.374M951.905-53.592H72.095C2.967-53.592-53.592 2.967-53.592 72.095v879.81c0 69.128 56.559 125.687 125.687 125.687h879.81c69.128 0 125.687-56.559 125.687-125.687V72.095c0-69.128-56.559-125.687-125.687-125.687Z", "M851.899 342.05a169.95 169.95 0 0 0-145.024 81.576L600.374 317.125a169.95 169.95 0 1 0-176.748 0L317.125 423.626a169.95 169.95 0 1 0 0 176.748l106.501 106.501a169.95 169.95 0 1 0 176.748 0l106.501-106.501A169.95 169.95 0 1 0 851.9 342.05zM455.35 172.102a56.65 56.65 0 1 1 56.65 56.65 56.65 56.65 0 0 1-56.65-56.65zM172.101 568.65a56.65 56.65 0 1 1 56.65-56.65 56.65 56.65 0 0 1-56.65 56.65zM568.65 851.899a56.65 56.65 0 1 1-56.65-56.65 56.65 56.65 0 0 1 56.65 56.65zM512 634.93 389.07 512 512 389.07 634.93 512zm339.899-66.28a56.65 56.65 0 1 1 56.65-56.65 56.65 56.65 0 0 1-56.65 56.65z", "M912.498 401.636H623.502V112.64c0-60.644-49.72-110.364-110.364-110.364S402.773 51.996 402.773 112.64v288.996H113.778C53.134 401.636 3.413 451.243 3.413 512c0 60.644 49.721 110.364 110.365 110.364h288.995V911.36c0 60.644 49.721 110.364 110.365 110.364s110.364-49.72 110.364-110.364V622.364h288.996c60.643 0 110.364-49.72 110.364-110.364 0-60.757-49.72-110.364-110.364-110.364z"];

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.17/node_modules/@user.tax/captcha-img/src/pattern.js
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

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.17/node_modules/@user.tax/captcha-img/src/captcha-svg.js
var random = (base2, offset = 0) => Math.random() * base2 + offset;
var randomInt = (base2, offset = 0) => parseInt(random(base2, offset));
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

// ../../node_modules/.pnpm/@user.tax+captcha-img@0.0.17/node_modules/@user.tax/captcha-img/src/index.js
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

// db/redis/key.js
var key_exports = {};
__export(key_exports, {
  R_CAPTCHA: () => R_CAPTCHA,
  R_CONF: () => R_CONF,
  R_MAIL: () => R_MAIL,
  R_MAIL_BAN_HOST: () => R_MAIL_BAN_HOST,
  R_MAIL_HOST: () => R_MAIL_HOST
});

// ../../node_modules/.pnpm/@iuser+utf8@0.0.1/node_modules/@iuser/utf8/lib/index.js
var DECODER;
var ENCODER2;
ENCODER2 = new TextEncoder();
var utf8e = ENCODER2.encode.bind(ENCODER2);
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
  get: (_, name) => {
    return wrap(name.slice(2).toLowerCase().replace(/_./g, (x) => {
      return x.slice(1).toUpperCase();
    }));
  }
});
var R_CAPTCHA = $([1], "setex getB del exist");
var {
  R_CONF,
  R_MAIL_HOST,
  R_MAIL,
  R_MAIL_BAN_HOST
} = $;

// db/redis/lua.js
var lua_default = (R2, redis) => {
  var args;
  R2.fboolR.hasHost;
  R2.fi64.zid;
  args = [R_MAIL_HOST, R_MAIL];
  redis.mailIdNew = R2.fi64.mailIdNew(...args);
  redis.mailId = R2.fi64.mailId(...args);
  redis.idMail = R2.fstrR.idMail(...args);
};

// db/redis/init.js
var import_redis = __toESM(require_redis(), 1);
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
var init_default = (redis, lua) => {
  var _R, i;
  _R = {};
  for (i in import_redis.Redis.prototype) {
    _R[i] = redis[i].bind(redis);
  }
  lua(new Proxy({}, {
    get: (self2, rtype) => {
      return new Proxy({}, {
        get: (self3, func) => {
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
  return (prefix, bind) => {
    var ref, t;
    if (bind) {
      t = key(prefix);
      ref = bind.split(" ");
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
var $2;
$2 = init_default(redis_default, lua_default);
var R = redis_default;
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
  var captcha_size, img, img_id, key2, x, y;
  radio = parseInt(radio) >= 2 ? 2 : 1;
  [img, img_id, x, y, captcha_size] = await _cache(radio);
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
  return [img, D_default[img_id], (0, import_rust.z85Dump)(key2)];
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
var captcha_default2 = async (self2) => {
  var captcha2, id, r, w, x, x0, y, y0;
  ({ captcha: captcha2 } = self2.headers);
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
  var hour, msg;
  hour = Hour();
  args.push(hour);
  msg = pack2(args);
  return [hour, (0, import_rust3.xxh3)([SK, msg])];
};

// POST/auth/sign.js
var _captcha;
_captcha = async (self2, signUp) => {
  if (signUp) {
    await captcha_default2(self2);
  } else {
    null;
  }
};
var mail = async function(signUp, account, password, lang) {
  var host, hostname, hour, port, token;
  await _captcha(this, signUp);
  ({ hostname, port } = new URL(this.headers.origin));
  if (signUp) {
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
    [hour, token] = skDump(account, password, hostname, port);
    console.log("\u90AE\u7BB1\u6CE8\u518C\u9A8C\u8BC1\u7801 :", token.toString(36).toUpperCase());
    return "";
  } else {
    return "";
  }
};
var phone = async (signUp, area, phone2, password, lang) => {
  await _captcha(void 0, signUp);
  console.log(lang);
  return "";
};

// POST/test.js
var test_exports = {};
__export(test_exports, {
  default: () => test_default
});
var import_rust5 = __toESM(require_rust(), 1);
var test_default = async () => {
  var a;
  a = (0, import_rust5.randomBytes)(8);
  console.log(a);
  while (true) {
    if (!await R.exist(a)) {
      return [];
    }
  }
  return [];
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

// worker.js
import {
  createBrotliCompress
} from "zlib";

// ../../node_modules/.pnpm/@iuser+strbool@0.0.2/node_modules/@iuser/strbool/lib/index.js
var lib_default = (x) => {
  if (x) {
    return !["0", "false", "off", "no", "null"].includes(x.trim().toLowerCase());
  }
  return false;
};

// ../../node_modules/.pnpm/@iuser+console@0.0.2/node_modules/@iuser/console/lib/index.js
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
  dir(obj, options = {}) {
    options = { ...options };
    if (colors) {
      options.colors = colors;
    }
    this.log(util.inspect(obj, options));
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

// ../../node_modules/.pnpm/@iuser+console@0.0.2/node_modules/@iuser/console/lib/global.js
var console2;
global.console = console2 = lib_default2();

// CONST/DEBUG.js
var DEBUG_default = lib_default(process.env.DEBUG);

// CONST/HEADER.js
var HEADERS;
var HEADER_default = HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*"
};
if (DEBUG_default) {
  HEADERS["Access-Control-Allow-Private-Network"] = true;
}

// lib/streamBuffer.js
var streamBuffer_default = (stream) => {
  var li;
  li = [];
  return new Promise((resolve2, reject) => {
    stream.on("data", (chunk) => {
      li.push(chunk);
    }).on("end", () => {
      return resolve2(Buffer.concat(li));
    }).on("error", reject);
  });
};

// worker.js
var compress2;
compress2 = async (code, headers, body) => {
  var br, encoding, h, length, result, s;
  h = HEADER_default;
  if (body) {
    ({ length } = body);
    if (length > 512) {
      encoding = headers["accept-encoding"].replaceAll(" ", "").split(",");
      br = "br";
      if (encoding.includes(br)) {
        s = createBrotliCompress();
        result = streamBuffer_default(s);
        s.end(body);
        body = await result;
        h = {
          ...h,
          "Content-Encoding": br
        };
      }
    }
  }
  return [code, h, body];
};
var worker_default = async ([url, headers, body]) => {
  var code, err2, f, func, i, r, ref, ref1, req;
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
      req = { headers };
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
  } else {
    code = 404;
    body = "404 : " + url;
  }
  return compress2(code, headers, body);
};

// boot.js
import {
  fork
} from "child_process";
import http from "http";
var API_PORT;
var CPU_NUM;
var RES;
var WORKER;
var workerNew;
({ CPU_NUM, API_PORT } = process.env);
if (CPU_NUM) {
  CPU_NUM = parseInt(CPU_NUM);
}
CPU_NUM = Math.max(CPU_NUM || 1, 1);
CPU_NUM = 1;
WORKER = [];
RES = [];
workerNew = (fp, id) => {
  var i, li, m, n, ref, ref1, w, x;
  m = RES[id];
  if (!m) {
    m = /* @__PURE__ */ new Map();
    RES[id] = m;
  }
  w = fork(fp, ["child"], {
    serialization: "advanced"
  });
  WORKER[id] = w;
  w.on("message", ([rid, r]) => {
    m.get(rid)[1](r);
    m.delete(rid);
  });
  ref = ["error", "exit"];
  for (i of ref) {
    w.on(i, (code, signal) => {
      console.log("workder exit", { id, code, signal });
      workerNew(fp, id);
    });
  }
  ref1 = m.entries();
  for (x of ref1) {
    [n, [li]] = x;
    w.send(li.concat([n]));
  }
  return w;
};
process.on("exit", () => {
  var i, j, len;
  for (j = 0, len = WORKER.length; j < len; j++) {
    i = WORKER[j];
    if (i) {
      i.send(0);
    }
  }
});
var boot_default = (fp) => {
  var N, n, port, server;
  n = 0;
  while (true) {
    workerNew(fp, n);
    if (++n >= CPU_NUM) {
      break;
    }
  }
  console.log(WORKER.length, "worker length");
  N = 0;
  server = http.createServer(async (req, res) => {
    var bin, body, code, header, headers, method, p, resovle, t, url, worker_id;
    ({ url, method } = req);
    url = url.slice(1);
    console.log(method, url);
    switch (method) {
      case "OPTIONS":
        headers = HEADER_default;
        code = 200;
        break;
      case "POST":
        if (N === Number.MAX_SAFE_INTEGER) {
          N = 0;
        } else {
          ++N;
        }
        bin = (await streamBuffer_default(req)).toString();
        worker_id = N % CPU_NUM;
        t = [url, req.headers, bin];
        p = new Promise((r) => {
          var resolve2;
          resolve2 = r;
        });
        RES[worker_id].set(N, [t, resolve]);
        WORKER[worker_id].send(t.concat([N]), socket);
        [code, header, body] = await p;
    }
    res.writeHead(code || 404, headers);
    res.end(body || "");
  });
  port = API_PORT || 80;
  console.log("LISTEN ON " + port);
  return server.listen(port);
};

// index.js
if (process.argv[2] === "child") {
  process.on("message", async (msg) => {
    var rid;
    if (Array.isArray(msg)) {
      rid = msg.pop();
      process.send([rid].concat(await worker_default(msg)));
    } else {
      switch (msg) {
        case 0:
          process.exit();
          break;
        default:
          console.log(msg);
      }
    }
  });
} else {
  boot_default(decodeURI(new URL(import.meta.url).pathname));
}
//!/usr/bin/env coffee

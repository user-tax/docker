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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../redis/index.js
var require_redis = __commonJS({
  "../../../redis/index.js"(exports, module) {
    var { existsSync, readFileSync: readFileSync2 } = __require("fs");
    var { join: join3 } = __require("path");
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
            localFileExisted = existsSync(join3(__dirname, "redis.android-arm64.node"));
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
            localFileExisted = existsSync(join3(__dirname, "redis.android-arm-eabi.node"));
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
              join3(__dirname, "redis.win32-x64-msvc.node")
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
              join3(__dirname, "redis.win32-ia32-msvc.node")
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
              join3(__dirname, "redis.win32-arm64-msvc.node")
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
            localFileExisted = existsSync(join3(__dirname, "redis.darwin-x64.node"));
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
              join3(__dirname, "redis.darwin-arm64.node")
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
        localFileExisted = existsSync(join3(__dirname, "redis.freebsd-x64.node"));
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
                join3(__dirname, "redis.linux-x64-musl.node")
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
                join3(__dirname, "redis.linux-x64-gnu.node")
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
                join3(__dirname, "redis.linux-arm64-musl.node")
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
                join3(__dirname, "redis.linux-arm64-gnu.node")
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
              join3(__dirname, "redis.linux-arm-gnueabihf.node")
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

// ../../../rust/index.js
var require_rust = __commonJS({
  "../../../rust/index.js"(exports, module) {
    var { existsSync, readFileSync: readFileSync2 } = __require("fs");
    var { join: join3 } = __require("path");
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
            localFileExisted = existsSync(join3(__dirname, "rust.android-arm64.node"));
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
            localFileExisted = existsSync(join3(__dirname, "rust.android-arm-eabi.node"));
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
              join3(__dirname, "rust.win32-x64-msvc.node")
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
              join3(__dirname, "rust.win32-ia32-msvc.node")
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
              join3(__dirname, "rust.win32-arm64-msvc.node")
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
            localFileExisted = existsSync(join3(__dirname, "rust.darwin-x64.node"));
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
              join3(__dirname, "rust.darwin-arm64.node")
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
        localFileExisted = existsSync(join3(__dirname, "rust.freebsd-x64.node"));
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
                join3(__dirname, "rust.linux-x64-musl.node")
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
                join3(__dirname, "rust.linux-x64-gnu.node")
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
                join3(__dirname, "rust.linux-arm64-musl.node")
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
                join3(__dirname, "rust.linux-arm64-gnu.node")
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
              join3(__dirname, "rust.linux-arm-gnueabihf.node")
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
    var { z85Dump: z85Dump2, z85Load, ipBin, binU64, u64Bin, zipU64, unzipU64, b64, unb64, blake3Round, blake3, encrypt, decrypt, randomBytes: randomBytes2 } = nativeBinding;
    module.exports.z85Dump = z85Dump2;
    module.exports.z85Load = z85Load;
    module.exports.ipBin = ipBin;
    module.exports.binU64 = binU64;
    module.exports.u64Bin = u64Bin;
    module.exports.zipU64 = zipU64;
    module.exports.unzipU64 = unzipU64;
    module.exports.b64 = b64;
    module.exports.unb64 = unb64;
    module.exports.blake3Round = blake3Round;
    module.exports.blake3 = blake3;
    module.exports.encrypt = encrypt;
    module.exports.decrypt = decrypt;
    module.exports.randomBytes = randomBytes2;
  }
});

// ../../node_modules/.pnpm/registry.npmmirror.com+@rmw+thisdir@0.0.2/node_modules/@rmw/thisdir/lib/index.js
import {
  dirname,
  sep
} from "path";
var PREFIX_LEN;
if (sep === "\\") {
  PREFIX_LEN = 8;
} else {
  PREFIX_LEN = 7;
}
var thisfile = ({ url }) => {
  return decodeURI(url.slice(PREFIX_LEN));
};
var thisdir = (meta) => {
  return dirname(thisfile(meta));
};
var lib_default = thisdir;

// ../../node_modules/.pnpm/registry.npmmirror.com+@iuser+read@0.0.5/node_modules/@iuser/read/lib/index.js
import {
  readFileSync
} from "fs";
var UTF8 = "utf8";
var lib_default2 = (fp) => {
  return readFileSync(fp, UTF8);
};

// ../api/db/redis.js
var import_redis = __toESM(require_redis());
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
  SERVER = (0, import_redis.serverCluster)(REDIS_CLUSTER.split("|").map((i) => {
    var host, port;
    [host, port] = i.split(":");
    return [host, port ? parseInt(port) : 6379];
  }));
} else {
  ({ REDIS_HOST, REDIS_PORT } = env);
  SERVER = (0, import_redis.serverHostPort)(REDIS_HOST, parseInt(REDIS_PORT));
}
var redis_default = await (0, import_redis.redisConn)(3, SERVER, REDIS_USER, REDIS_PASSWORD, parseInt(REDIS_DB));

// redis_lua.js
import {
  join
} from "path";
import {
  webcrypto as crypto
} from "crypto";

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

// redis_lua.js
var import_rust = __toESM(require_rust(), 1);
var NO_WRITES;
var ROOT;
var bin2luaStr;
var hash;
var isFlags;
ROOT = lib_default(import.meta);
bin2luaStr = (bin) => {
  var i, li;
  li = [];
  for (i of bin) {
    li.push("\\" + i);
  }
  return li.join("");
};
hash = async (bin) => {
  return U8(await crypto.subtle.digest({
    name: "SHA-256"
  }, bin));
};
isFlags = (i) => {
  return i.startsWith("-- flags ");
};
NO_WRITES = "'no-writes'";
var redis_lua_default = async () => {
  var ap, body, flags, fp, func, function_name, i, j, len, li, lua, pos, ref, ref1, t, trim, ver, version;
  fp = join(ROOT, "init.redis.lua");
  lua = lib_default2(fp);
  version = await hash(lua);
  li = ["#!lua name=UserTax\n\n"];
  func = () => {
    if (body[0] === "()") {
      flags = flags || [];
      if (!flags.includes(NO_WRITES)) {
        flags.push(NO_WRITES);
      }
    }
    if (flags) {
      li.push(`redis.register_function{
function_name='${function_name}',
callback=function${body.join("\n")},
flags={${flags}}
}
`);
    } else {
      li.push(`redis.register_function('${function_name}',function${body.join("\n")})
`);
    }
    flags = body = void 0;
  };
  ref = lua.split("\n");
  for (pos = j = 0, len = ref.length; j < len; pos = ++j) {
    i = ref[pos];
    if (i.startsWith("function ")) {
      i = i.slice(8).trim();
      pos = i.indexOf("(");
      function_name = i.slice(0, pos);
      ap = i.indexOf(")", pos);
      body = [i.slice(pos, +ap + 1 || 9e9), "  redis.setresp(3)" + i.slice(ap + 1)];
    } else if (body) {
      trim = i.trim();
      if (trim.startsWith("-- flags")) {
        t = [];
        ref1 = trim.slice(8).split(" ");
        for (i of ref1) {
          if (i) {
            t.push("'" + i + "'");
          }
        }
        flags = t.join(",");
      } else {
        body.push(i);
        if (i === "end") {
          func();
        }
      }
    } else {
      li.push(i + "\n");
    }
  }
  lua = li.join("").trim();
  lua = lua.replace("VERSION", bin2luaStr(version));
  try {
    ver = await redis_default.fbin("ver");
  } catch (error) {
    null;
  }
  console.log(lua);
  if (ver && u8eq(version, ver)) {
    console.log(`
-- redis lua UserTax version ${(0, import_rust.z85Dump)(version)} existed`);
    return;
  }
  await redis_default.fnload(lua);
};

// ../api/db/redis/lua.js
var lua_default = (R2, redis) => {
  R2.fboolRo.hasHost;
  R2.fi64.zid;
};

// ../api/db/redis/init.js
var import_redis3 = __toESM(require_redis(), 1);
var _prefix;
var encode;
var encoder;
var key;
encoder = new TextEncoder();
encode = encoder.encode.bind(encoder);
_prefix = (prefix, f) => {
  return (k, ...args) => {
    if (typeof k === "string" || k instanceof String) {
      k = encode(k);
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
  for (i in import_redis3.Redis.prototype) {
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

// ../api/R.js
var $;
$ = init_default(redis_default, lua_default);
var R = redis_default;
var R_CONF = $([0]);
var R_HOST = $([2]);
var R_NAME = $([3]);
var R_MAIL = $([4], "hgetI zid");
var R_MAIL_BAN_HOST = $([5]);
var R_CAPTCHA = $([255], "setex getB del exist");

// mail_ban_host.js
import {
  join as join2
} from "path";
var ROOT2;
ROOT2 = lib_default(import.meta);
var mail_ban_host_default = async () => {
  var domains, host, lastseen, li, o, ref, t, x;
  ({ t, domains } = JSON.parse(lib_default2(join2(ROOT2, "init.mail_ban_host.json"))));
  li = [];
  ref = Object.entries(domains);
  for (x of ref) {
    [host, o] = x;
    ({ lastseen } = o);
    if ((t - lastseen) / 86400 < 365) {
      li.push(host);
    }
  }
  console.log("mail ban host", li.length);
  await R.sadd(R_MAIL_BAN_HOST, li);
};

// sercet_key.js
var import_rust2 = __toESM(require_rust(), 1);
var main;
var sercet_key_default = main = async () => {
  var SK;
  if (!await R.hexist(R_CONF, "SK")) {
    SK = (0, import_rust2.randomBytes)(32);
    await R.hset(R_CONF, { SK });
  }
};
if (process.argv[1] === decodeURI(new URL(import.meta.url).pathname)) {
  await main();
}

// index.js
await redis_lua_default();
await mail_ban_host_default();
await sercet_key_default();
//!/usr/bin/env coffee

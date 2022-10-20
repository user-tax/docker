local log = function(...)
  redis.log(redis.LOG_NOTICE, ...)
end

local _byZid = function(key,score)
  score = tonumber(score)
  local r = redis.call('ZRANGEBYSCORE',key,score,score,'LIMIT',0,1)
  if r then
    return r[1]
  end
end

local intBin = function(n)
  local t = {}
  while n > 0 do
    local r = math.fmod(n, 256)
    table.insert(t, string.char(r))
    n = (n-r) / 256
  end
  return table.concat(t)
end

local binInt = function(str)
  local n = 0
  local base = 1
  for i = 1, #str do
    local c = str:sub(i,i)
    n = n + base * c:byte()
    base = base * 256
  end
  return n
end

local HSET = function(key,field,val)
  return redis.call('HSET',key,field,val)
end

local HGET = function(key,field)
  return redis.call('HGET',key,field)
end

local HINCRBY = function(key,field,increment)
  return redis.call('HINCRBY',key,field,increment)
end

local INCR = function(key)
  return redis.call('INCR',key)
end

local ZSCORE = function(key,member)
  local r = redis.call('ZSCORE',key,member)
  if r then
    return r.double
  end
end

local ZADD = function(key,member,score)
  return redis.call('ZADD',key,score,member)
end

local ZINCRBY = function(key,member,increment)
  return redis.call('ZINCRBY',key,increment,member).double
end

local SISMEMBER = function(key,member)
  return redis.call('SISMEMBER',key,member)
end

local EXPIRE = function(key,seconds)
  return redis.call('EXPIRE',key,seconds)
end

local TTL = function(key)
  return redis.call('TTL',key)
end

function ver()
  return 'VERSION'
end

function hasHost(keys, args)
  -- flags no-writes
  local set = keys[1]
  local host = args[1]
  local pre = host
  local p = 0
  repeat
    p = string.find(host,'.',p+1,true)
    if p then
      p = p + 1
      if SISMEMBER(set, pre) == 1 then
        return true
      end
      pre = string.sub(host,p)
    else
      return false
    end
  until false
end

local _zid = function(kv,k)
  local id = ZSCORE(kv,k)
  if nil == id then
    id = ZINCRBY(kv,'',1)-1
    ZADD(kv,k,id)
  end
  return id
end

function zid(keys,args)
  return _zid(keys[1],args[1])
end

function mailIdNew(keys, args)
  local host_key,mail_key = unpack(keys)
  local s = args[1]
  local p = s:find('@')
  local host_id = _zid(host_key, s:sub(p+1))
  local mail = s:sub(1,p) .. intBin(host_id)
  return _zid(mail_key, mail)
end

function mailId(keys, args)
  local host_key,mail_key = unpack(keys)
  local s = args[1]
  local p = s:find('@')
  local host_id = ZSCORE(host_key, s:sub(p+1))
  if host_id ~= nil then
    local mail = s:sub(1,p) .. intBin(host_id)
    local id = ZSCORE(mail_key,mail)
    if id then
      return id
    end
  end
  return 0
end

function idMail(keys,args)
  -- flags no-writes
  local host_key,mail_key = unpack(keys)
  local id = args[1]
  local mail = _byZid(mail_key,id)
  if mail ~= nil then
    local p = mail:find('@')
    if p ~= nil then
      local host = _byZid(host_key, binInt(mail:sub(p+1)))
      if host ~= nil then
        return mail:sub(1,p) .. host
      end
    end
  end
end

function ipLimit(keys,args)
  local ipLimit30s = keys[1]
  if INCR(ipLimit30s) > 3 then
    return TTL(ipLimit30s) + 1
  else
    EXPIRE(ipLimit30s,30)
  end
end

function hostOrg(keys, args)
  local host_org,org_key = unpack(keys)
  local host,org = unpack(args)
  local org_id = _zid(org_key, org)
  ZADD(host_org,host,org_id)
  return org_id
end

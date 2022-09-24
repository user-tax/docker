function ver()
  return 'VERSION'
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
  return redis.call('ZSCORE',key,member)
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

function zid(keys,args)
  local kv = keys[1]
  local k = args[1]
  local id = ZSCORE(kv,k)
  if not id then
    id = ZINCRBY(kv,'',1)
    ZADD(kv,k,id)
  end
  return id
end


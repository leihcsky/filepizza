import Redis from 'ioredis'

export { Redis }

let redisClient: Redis | null = null

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = process.env.REDIS_URL
      ? new Redis({
        host: process.env.REDIS_URL,
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD
      })
      : new Redis()
  }
  return redisClient
}

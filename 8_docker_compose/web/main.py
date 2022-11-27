#!/usr/bin/env python3

from fastapi import FastAPI
import redis



app = FastAPI()
redis = redis.Redis(host='redis', port=6379, db=0)

@app.get("/")
async def root():
    redis.incr("counter",1)
    value = redis.get("counter")
    return {"counter": value }

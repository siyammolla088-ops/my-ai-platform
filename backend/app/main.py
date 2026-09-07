import json
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from app.config import GEMINI_API_KEY
from app.services.supabase import check_and_increment_search_usage
from app.services.gemini import call_gemini_api

app = FastAPI(title="Close AI Engine", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/gemini")
async def gemini_router(request: Request, mode: str = "stream"):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY Configuration Missing")

    json_body = await request.json()

    # Smart Search Limiter Logic
    can_search = await check_and_increment_search_usage()
    if can_search:
        json_body["tools"] = [{"googleSearch": {}}]
    else:
        json_body.pop("tools", None)

    if mode == "stream":
        response_stream, client = await call_gemini_api(json_body, mode="stream")

        async def stream_generator():
            try:
                async for chunk in response_stream.aiter_text():
                    yield chunk
            finally:
                await response_stream.aclose()
                await client.aclose()

        return StreamingResponse(stream_generator(), media_type="text/event-stream")
    else:
        result = await call_gemini_api(json_body, mode="sync")
        return result

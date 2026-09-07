import httpx
from app.config import GEMINI_API_KEY

async def call_gemini_api(payload: dict, mode: str = "stream"):
    model = "gemini-2.5-flash"
    endpoint = "streamGenerateContent" if mode == "stream" else "generateContent"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:{endpoint}?key={GEMINI_API_KEY}"
    
    if mode == "stream":
        url += "&alt=sse"

    client = httpx.AsyncClient(timeout=120.0)
    if mode == "stream":
        req = client.build_request("POST", url, json=payload)
        res = await client.send(req, stream=True)
        return res, client
    else:
        res = await client.post(url, json=payload)
        await client.aclose()
        return res.json()

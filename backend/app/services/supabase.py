import httpx
from datetime import datetime
from app.config import SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DAILY_SEARCH_LIMIT

async def check_and_increment_search_usage() -> bool:
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        return True
    
    today = datetime.utcnow().strftime('%Y-%m-%d')
    headers = {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': f'Bearer {SUPABASE_SERVICE_ROLE_KEY}',
        'Content-Type': 'application/json'
    }
    
    async with httpx.AsyncClient() as client:
        try:
            check_url = f"{SUPABASE_URL}/rest/v1/search_usage?usage_date=eq.{today}"
            res = await client.get(check_url, headers=headers)
            rows = res.json()
            current_count = rows[0].get('count', 0) if isinstance(rows, list) and len(rows) > 0 else 0
            
            if current_count >= DAILY_SEARCH_LIMIT:
                return False

            upsert_url = f"{SUPABASE_URL}/rest/v1/search_usage"
            headers['Prefer'] = 'resolution=merge-duplicates, return=minimal'
            await client.post(
                upsert_url, 
                headers=headers, 
                json={"usage_date": today, "count": current_count + 1}
            )
            return True
        except Exception as e:
            print(f"Supabase Search Limiter Error: {e}")
            return True

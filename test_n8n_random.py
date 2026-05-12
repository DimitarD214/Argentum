import urllib.request
import json
import uuid
import random

url = 'https://n8n-self-host-0hua.onrender.com/webhook-test/onboarding'
rand_id = str(uuid.uuid4())
rand_email = f"user_{random.randint(1000, 9999)}@asteratest.com"

data = json.dumps({'user_id': rand_id, 'email': rand_email}).encode('utf8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

print(f"Testing with: {rand_id} / {rand_email}")

try:
    with urllib.request.urlopen(req) as response:
        print(f'Status Code: {response.getcode()}')
        print(f'Response: {response.read().decode("utf-8")}')
except Exception as e:
    print(f'Error: {e}')

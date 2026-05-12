import urllib.request
import json
import uuid

# Trying the production endpoint (removing -test)
url = 'https://n8n-self-host-0hua.onrender.com/webhook/onboarding'
data = json.dumps({'user_id': str(uuid.uuid4()), 'email': 'prod_test@astera.com'}).encode('utf8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print(f'Status Code: {response.getcode()}')
        print(f'Response: {response.read().decode("utf-8")}')
except Exception as e:
    print(f'Error: {e}')

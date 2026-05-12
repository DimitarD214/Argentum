import urllib.request
import json

url = 'https://n8n-self-host-0hua.onrender.com/webhook-test/onboarding'
data = json.dumps({'user_id': 'test_user_67890', 'email': 'astera_test@example.com'}).encode('utf8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print(f'Status Code: {response.getcode()}')
        print(f'Response: {response.read().decode("utf-8")}')
except Exception as e:
    print(f'Error: {e}')

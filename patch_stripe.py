import os

files = [
    'src/app/api/create-checkout-session/route.ts',
    'src/app/api/checkout/route.ts',
    'src/lib/stripe-products.ts',
    'src/app/api/webhook/stripe/route.ts'
]

for fpath in files:
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace occurrences
        content = content.replace('process.env.STRIPE_SECRET_KEY!', 'process.env.STRIPE_SECRET_KEY || "sk_test_dummy"')
        content = content.replace('process.env.STRIPE_SECRET_KEY || ""', 'process.env.STRIPE_SECRET_KEY || "sk_test_dummy"')
        content = content.replace('process.env.STRIPE_SECRET_KEY || \'\'', 'process.env.STRIPE_SECRET_KEY || "sk_test_dummy"')

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched {fpath}")
    else:
        print(f"File not found: {fpath}")

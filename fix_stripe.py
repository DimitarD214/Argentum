import os

path = r"src\app\api\checkout\route.ts"
if not os.path.exists(path):
    print("File not found")
else:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We will instantiate Stripe with a fallback key directly in module scope
    # to avoid changing too much logic, or we can move it inside POST.
    # Providing a dummy string avoids the SDK error during build.
    
    new_content = content.replace(
        """const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {""",
        """const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {""")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Patched route.ts successfully")

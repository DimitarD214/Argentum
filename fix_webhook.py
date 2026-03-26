import os

path = r"src\app\api\webhook\stripe\route.ts"
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace(
        """const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {""", 
        """const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {""")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Patched webhook.")
else:
    print("Not found.")

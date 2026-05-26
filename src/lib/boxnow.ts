export async function processBoxNowDelivery(orderId: string, lockerId: string, userDetails: any) {
  try {
    const clientId = process.env.BOXNOW_CLIENT_ID || "dummy_client";
    const clientSecret = process.env.BOXNOW_CLIENT_SECRET || "dummy_secret";
    const apiUrl = process.env.BOXNOW_API_URL || "https://api-sandbox.boxnow.hr";

    // 1. Get Auth Token
    const authRes = await fetch(`${apiUrl}/api/v1/auth-sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      })
    });

    if (!authRes.ok) throw new Error("Failed to authenticate with Box Now");
    const authData = await authRes.json();
    const token = authData.access_token;

    // 2. Request Delivery Label
    const deliveryRes = await fetch(`${apiUrl}/api/v1/delivery-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        orderNumber: orderId,
        destination: {
          lockerId: lockerId
        },
        recipient: {
          name: userDetails.name,
          phone: userDetails.phone,
          email: userDetails.email
        }
      })
    });

    if (!deliveryRes.ok) throw new Error("Failed to create Box Now delivery request");
    const deliveryData = await deliveryRes.json();
    
    console.log("Box Now label generated:", deliveryData);
    return deliveryData;
  } catch (error) {
    console.error("Error processing Box Now Delivery:", error);
    throw error;
  }
}

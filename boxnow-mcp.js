import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "boxnow-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "test_boxnow_auth",
        description: "Test authentication to generate a Box Now Auth Token via /api/v1/auth-sessions",
        inputSchema: {
          type: "object",
          properties: {
            clientId: { type: "string" },
            clientSecret: { type: "string" }
          },
          required: ["clientId", "clientSecret"]
        }
      },
      {
        name: "create_delivery_request",
        description: "Create a delivery request via /api/v1/delivery-requests",
        inputSchema: {
          type: "object",
          properties: {
            token: { type: "string" },
            lockerId: { type: "string" },
            customerName: { type: "string" },
            customerPhone: { type: "string" },
            customerEmail: { type: "string" }
          },
          required: ["token", "lockerId", "customerName", "customerPhone"]
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "test_boxnow_auth") {
    const { clientId, clientSecret } = request.params.arguments;
    try {
      const response = await fetch("https://api.boxnow.hr/api/v1/auth-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials"
        })
      });
      const data = await response.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (error) {
       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
  
  if (request.params.name === "create_delivery_request") {
    const { token, lockerId, customerName, customerPhone, customerEmail } = request.params.arguments;
    try {
      const response = await fetch("https://api.boxnow.hr/api/v1/delivery-requests", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          delivery: {
            locker_id: lockerId,
            customer: {
              name: customerName,
              phone: customerPhone,
              email: customerEmail || "no-reply@astera.hr"
            }
          }
        })
      });
      const data = await response.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
  throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Box Now MCP Server running on stdio");

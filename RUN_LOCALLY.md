# ?? How to Run Astera Locally

Follow these step-by-step instructions to get the **Astera Jewelry Store** running on your local device.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or later)
- **npm** (comes with Node.js)

---

## Step-by-Step Instructions

### 1. Open your Terminal
Open **PowerShell** or **Command Prompt** on your computer.

### 2. Navigate to the Project Directory
Copy and paste the following command to move into the project folder:

`powershell
cd "c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446"
`

### 3. Install Dependencies
If this is your first time running the project, or if you've recently updated it, install the necessary packages:

`ash
npm install
`

### 4. Configure Environment Variables
Ensure the .env.local file is present in the root directory. This file contains important configuration for authentication and payments.

### 5. Start the Development Server
Run the following command to start the application:

`ash
npm run dev
`

### 6. View the Application
Once the terminal shows that the server is ready, open your web browser and go to:

?? **[http://localhost:3000](http://localhost:3000)**

---

## ?? Troubleshooting

- **Port already in use:** If port 3000 is occupied, Next.js will automatically try 3001. Check the terminal output for the correct URL.
- **Node Modules issues:** If you encounter errors, try deleting the 
ode_modules folder and running 
pm install again.

---

## ?? Quick Commands

| Action | Command |
| :--- | :--- |
| **Run Dev Server** | 
pm run dev |
| **Build for Production** | 
pm run build |
| **Start Production Server** | 
pm run start |
| **Lint Code** | 
pm run lint |

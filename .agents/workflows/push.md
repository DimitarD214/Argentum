---
description: Push local changes to the GitHub repository (main branch)
---

This workflow will stage, commit, pull (to sync), and push your changes.

// turbo
1. Stage all changes
```powershell
git add .
```

2. Commit the changes
```powershell
git commit -m "Update from Antigravity"
```

3. Sync with origin (pull latest)
```powershell
git pull origin main
```

4. Push to GitHub
```powershell
git push origin main
```


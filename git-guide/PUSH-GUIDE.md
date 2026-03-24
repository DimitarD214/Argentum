# GitHub Push & Update Guide

This guide explains how to sync your local changes with the GitHub repository: **DimitarD214/Argentum**.

## 1. Check your status
Before making changes, it's good to see what has changed.
```powershell
git status
```

## 2. Stage your changes
Add the files you want to include in your next update.
- To add all changes:
  ```powershell
  git add .
  ```
- To add specific files:
  ```powershell
  git add folder/filename.ext
  ```

## 3. Commit your changes
Create a "save point" with a descriptive message.
```powershell
git commit -m "Describe what you changed here"
```

## 4. Pull latest changes (Important!)
Before pushing, always make sure your local version is up to date with the server.
```powershell
git pull origin main
```
*Note: If there are conflicts, you will need to resolve them before proceeding.*

## 5. Push your changes
Finally, send your local commits to GitHub.
```powershell
git push origin main
```

---

### Common Commands Summary
| Command | Action |
| :--- | :--- |
| `git status` | Show changed files |
| `git add .` | Stage all changes |
| `git commit -m "..."` | Save changes with a message |
| `git pull origin main` | Get latest changes from GitHub |
| `git push origin main` | Send your changes to GitHub |


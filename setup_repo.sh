#!/bin/bash

echo "🏭 Initializing Excel Cookbook Factory..."

# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Create first commit
git commit -m "Initial commit: Excel Cookbook Setup"

# 4. Rename branch to main
git branch -M main

echo "✅ Initialization complete!"
echo "============================================="
echo "👇 Now, copy and paste these two commands:"
echo "1. git remote add origin https://github.com/YOUR_ID/excel-cookbook.git"
echo "2. git push -u origin main"
echo "============================================="

#!/bin/bash

# Define packages
packages=(
"feed-page/"
"feed-page/post/"
"profile/"
"user-relations/"
"**/"
"**/**/"
"**/**/**/"
)

# Check root
npx embedme --verify "./*.md"

# Update READMEs with embedme
for pkg in ${packages[@]}; do
  npx embedme --verify "./standards/${pkg}*.md"
done


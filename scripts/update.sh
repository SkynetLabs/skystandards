#!/bin/bash

# Define packages
packages=(
""
"feed-page/"
"feed-page/post/"
"profile/"
"user-relations/"
)

# Check root and standards
npx embedme --verify "./*.md"

# Update READMEs with embedme
for pkg in ${packages[@]}; do
  npx embedme "./standards/${pkg}*.md"
done


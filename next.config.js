const isGithubActions = process.env.GITHUB_ACTIONS || false;

let output = undefined;
let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

  output = "export";
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output,
  assetPrefix,
  basePath,
};

module.exports = nextConfig;

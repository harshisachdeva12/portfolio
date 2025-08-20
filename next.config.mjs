/** @type {import('next').NextConfig} */
const repoName = "rajnisachdeva";                // your repo name
const isProjectSite = true;                       // project site: username.github.io/<repo>

export default {
  output: "export",                               // enables `next export`
  images: { unoptimized: true },                  // needed for static export
  trailingSlash: true,                            // avoids 404 on refresh
  basePath: isProjectSite ? `/${repoName}` : undefined,
  assetPrefix: isProjectSite ? `/${repoName}/` : undefined,
};

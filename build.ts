await Bun.build({
  entrypoints: ["./src/bin.ts"],
  minify: true,
  outdir: "dist"
});
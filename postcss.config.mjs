const config = {
  plugins: {
    // Tailwind generates the CSS first...
    tailwindcss: {},
    // ...then every px value is converted to rem at build time so the
    // whole UI can be scaled proportionally from a single root font-size.
    // See the `html { font-size: ... }` rule in app/globals.css.
    "postcss-pxtorem": {
      rootValue: 16, // matches the design's base font-size (1rem = 16px)
      unitPrecision: 5,
      // Convert everything EXCEPT borders/outlines/shadows, so hairlines
      // stay crisp and don't blur/disappear when the UI scales down.
      propList: ["*", "!border", "!border-width", "!outline", "!box-shadow", "!text-shadow"],
      // Never touch the root font-size rule itself (it must stay in px/vw).
      selectorBlackList: [/^html$/],
      // Keep 1px hairlines (and sub-2px values) in px.
      minPixelValue: 2,
      // Leave @media breakpoint values (900px, 768px, etc.) untouched.
      mediaQuery: false,
      exclude: /node_modules/i,
    },
    autoprefixer: {},
  },
};

export default config;

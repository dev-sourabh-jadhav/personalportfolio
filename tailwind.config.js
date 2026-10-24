module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      // every colour comes from a CSS variable, so themes can swap them at runtime
      colors: {
        vs: {
          bg: "var(--vs-bg)", side: "var(--vs-side)", activity: "var(--vs-activity)",
          card: "var(--vs-card)", border: "var(--vs-border)", text: "var(--vs-text)",
          muted: "var(--vs-muted)", hover: "var(--vs-hover)", accent: "var(--vs-accent)",
          onaccent: "var(--vs-on-accent)",
        },
      },
    },
  },
  plugins: [],
};
// ============================================================
// Time to Build Funnel Kit - site config
// Students edit these values (or run /brand-setup).
// ============================================================

export const site = {
  name: "Time to Build",
  description: "Build a personal brand & online education business",

  // Your Kit (ConvertKit) form ID. The lead form subscribes people to this form,
  // which triggers whatever sequence/automation you connect to it in Kit.
  // Find it in your form's embed URL: app.kit.com/forms/XXXXXXX/...  -> XXXXXXX is the ID.
  kitFormId: "YOUR_KIT_FORM_ID",

  // Where your offer-page CTAs send people (your Stripe / checkout link).
  // For this demo it points at the kit's GitHub template page.
  checkoutUrl: "https://github.com/tomnoske567/ttb-funnel-kit",

  // Default colour theme for your site: "light" or "dark".
  // (Drop in <ThemeToggle /> if you want visitors to switch.)
  theme: "light" as "light" | "dark",

  // Quick accent preset (just the brand hue). Preview on /showcase.
  preset: "teal" as "teal" | "blue" | "violet" | "orange" | "sage",

  // Full theme - a complete palette (surfaces + text + accent), light & dark.
  // "default" is the baseline; others are defined in global.css and previewed
  // in the Customise Theme panel.
  themePreset: "default" as
    | "default"
    | "sage"
    | "nature"
    | "brutalist"
    | "linen"
    | "amber"
    | "retro"
    | "ocean",
};

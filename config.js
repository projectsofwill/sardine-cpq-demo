/* ============================================================================
   Sardine CPQ — CONFIG (the editable rulebook)
   ----------------------------------------------------------------------------
   The entire pricing model and approval policy live here as data, separate from
   the engine logic. Edit numbers here, reload the page. No build, no code change.
   This is "config not code": RevOps owns this file; engineering never has to.

   Pricing is straight from the take-home's tab 1.
   - Usage products are priced on GRADUATED tiers ("fill a tier"), i.e. each
     bracket's volume is charged at that bracket's rate, like tax brackets.
     Tier volumes are MONTHLY.
   - Implementation is a one-time service fee, set by the annual usage deal size.
   ========================================================================== */
window.SARDINE_CPQ_CONFIG = {

  // --- Usage products: graduated monthly tiers ($ per unit within each band) -
  USAGE_PRODUCTS: [
    {
      key: "email_enrichment",
      name: "Email Enrichment",
      driver: "Enrichments",
      unit: "enrichments",
      tiers: [
        { upTo: 5000,        rate: 0.25 },
        { upTo: 10000,       rate: 0.20 },
        { upTo: 20000,       rate: 0.175 },
        { upTo: 50000,       rate: 0.15 },
        { upTo: 100000,      rate: 0.125 },
        { upTo: 200000,      rate: 0.1125 },
        { upTo: Infinity,    rate: 0.0875 },
      ],
    },
    {
      key: "phone_enrichment",
      name: "Phone Enrichment",
      driver: "Enrichments",
      unit: "enrichments",
      tiers: [
        { upTo: 5000,        rate: 0.28 },
        { upTo: 10000,       rate: 0.25 },
        { upTo: 20000,       rate: 0.23 },
        { upTo: 50000,       rate: 0.21 },
        { upTo: 100000,      rate: 0.20 },
        { upTo: 200000,      rate: 0.181 },
        { upTo: Infinity,    rate: 0.17 },
      ],
    },
    {
      key: "device_intel",
      name: "Device Intelligence",
      driver: "API calls",
      unit: "API calls",
      tiers: [
        { upTo: 5000,        rate: 0.12 },
        { upTo: 9000,        rate: 0.105 },
        { upTo: 21000,       rate: 0.075 },
        { upTo: 42000,       rate: 0.063 },
        { upTo: 84000,       rate: 0.0525 },
        { upTo: 417000,      rate: 0.042 },
        { upTo: 1000000,     rate: 0.0285 },
        { upTo: 2100000,     rate: 0.0195 },
        { upTo: 4200000,     rate: 0.0135 },
        { upTo: 8300000,     rate: 0.0075 },
        { upTo: Infinity,    rate: 0.006 },
      ],
    },
  ],

  // --- Implementation: one-time fee by ANNUAL usage deal size (pre-discount) --
  IMPLEMENTATION_TIERS: [
    { upTo: 50000,    fee: 5000,  label: "$0-50k" },
    { upTo: 150000,   fee: 12500, label: "$50k-150k" },
    { upTo: Infinity, fee: 20000, label: "$150k+" },
  ],

  // --- Approval routing by manual discount % ---------------------------------
  // < managerAbove: no approval | managerAbove..financeAbove: manager | >= financeAbove: finance
  APPROVAL_BANDS: {
    managerAbove: 0.10,  // 10%+ blended discount needs manager sign-off
    financeAbove: 0.20,  // 20%+ blended discount needs finance sign-off
  },

  // --- Default product set: the "+ Default set" shortcut adds these ----------
  // With a 50-product catalog you'd flag the handful AEs reach for most.
  DEFAULT_PRODUCTS: ["email_enrichment", "phone_enrichment", "device_intel"],

  // --- Optional AI gateway (build-once backend; see the ai-gateway project) --
  // When url is set, the AI edges call your gateway (the Anthropic key stays
  // server-side) and visitors need NO key of their own. Leave url empty to use
  // the in-page key instead. Fill these in after deploying the ai-gateway.
  GATEWAY: { url: "https://ai-gateway.willl-i-am213.workers.dev", token: "d5bae557f7350bbc927791605badb23953c76ef74b7f6445", project: "sardine-cpq" },

};

/**
 * Port and shipping route data for the interactive globe in the Destinations section.
 *
 * Exports:
 * - {@link PORTS}         — all ports Kumar has visited, with coordinates for globe markers
 * - {@link ROUTES}        — shipping routes drawn as arcs between ports
 * - {@link SHIP_ROUTE_IDS} — IDs of long-haul routes that show a ship emoji at their midpoint
 * - {@link PORT_MAP}      — `Map<id, Port>` for O(1) port lookups by ID
 */

/** A port visited by Kumar, used as a globe marker. */
export type Port = {
  /** Unique identifier used to reference this port in {@link Route} entries. */
  id: string;
  /** 3–4 letter shortcode shown on the globe label (e.g. `"SGP"`). */
  code: string;
  /** Full port name shown when a label is expanded (e.g. `"Singapore"`). */
  name: string;
  /** WGS 84 latitude in decimal degrees. */
  latitude: number;
  /** WGS 84 longitude in decimal degrees. */
  longitude: number;
};

/** A shipping route drawn as an arc between two ports on the globe. */
export type Route = {
  /** ID of the departure port — must exist in {@link PORTS}. */
  from: string;
  /** ID of the destination port — must exist in {@link PORTS}. */
  to: string;
  /**
   * When set, a ship emoji (⛴️) is rendered at the arc midpoint using CSS
   * Anchor Positioning. Only set this on long-haul cross-ocean routes to
   * avoid visual clutter on short regional arcs.
   */
  shipIconId?: string;
};

/** All ports visited by Kumar Srivathsan, ordered roughly by shipping region. */
export const PORTS: Port[] = [
  { id: "singapore",      code: "SGP", name: "Singapore",           latitude: 1.25937,   longitude: 103.7544  },
  { id: "jebel-ali",      code: "JEA", name: "Jebel Ali",           latitude: 25.01126,  longitude: 55.06116  },
  { id: "abu-dhabi",      code: "AUH", name: "Abu Dhabi",           latitude: 24.81673,  longitude: 54.65828  },
  { id: "qatar-doha",     code: "DOH", name: "Qatar (Doha)",        latitude: 25.295,    longitude: 51.5439   },
  { id: "bahrain",        code: "BAH", name: "Bahrain",             latitude: 26.19,     longitude: 50.714    },
  { id: "hamad",          code: "HAM", name: "Hamad",               latitude: 25.0295,   longitude: 51.6245   },
  { id: "pipavav",        code: "PIP", name: "Pipavav",             latitude: 20.9175,   longitude: 71.50515  },
  { id: "mundra",         code: "MUN", name: "Mundra",              latitude: 22.82187,  longitude: 69.69102  },
  { id: "mumbai-jnpt",    code: "BOM", name: "Mumbai (JNPT)",       latitude: 18.94528,  longitude: 72.94     },
  { id: "laem-chabang",   code: "LCB", name: "Laem Chabang",        latitude: 13.0587,   longitude: 100.8948  },
  { id: "perth-fremantle",code: "FRE", name: "Perth (Fremantle)",   latitude: -32.05695, longitude: 115.74389 },
  { id: "melbourne",      code: "MEL", name: "Melbourne",           latitude: -37.81326, longitude: 144.92415 },
  { id: "adelaide",       code: "ADL", name: "Adelaide",            latitude: -34.82566, longitude: 138.50451 },
  { id: "port-kembla",    code: "PKL", name: "Port Kembla",         latitude: -34.46346, longitude: 150.90148 },
  { id: "brisbane",       code: "BNE", name: "Brisbane",            latitude: -27.38574, longitude: 153.17374 },
  { id: "auckland",       code: "AKL", name: "Auckland",            latitude: -36.84377, longitude: 174.77686 },
  { id: "kobe",           code: "UKB", name: "Kobe",                latitude: 34.6867,   longitude: 135.2671  },
  { id: "nagoya-meiko",   code: "NGM", name: "Nagoya Meiko",        latitude: 35.05184,  longitude: 136.83455 },
  { id: "nagoya-kinjo",   code: "NGK", name: "Nagoya Kinjo",        latitude: 35.05,     longitude: 136.85278 },
  { id: "oppama",         code: "OPP", name: "Oppama",              latitude: 35.31581,  longitude: 139.62485 },
  { id: "yokohama",       code: "YOK", name: "Yokohama",            latitude: 35.41215,  longitude: 139.6639  },
  { id: "toyohashi",      code: "TOY", name: "Toyohashi",           latitude: 34.7172,   longitude: 137.3192  },
  { id: "ho-chi-minh",    code: "SGN", name: "Ho Chi Minh (Cat Lai)",latitude: 10.75757, longitude: 106.7207  },
  { id: "ningbo",         code: "NGB", name: "Ningbo",              latitude: 29.92654,  longitude: 121.8525  },
  { id: "yantian",        code: "YTN", name: "Yantian",             latitude: 22.5619,   longitude: 114.2803  },
  { id: "nansha",         code: "NSH", name: "Nansha",              latitude: 22.65,     longitude: 113.667   },
  { id: "shanghai",       code: "SHA", name: "Shanghai",            latitude: 31.21983,  longitude: 121.487   },
  { id: "ulsan",          code: "USN", name: "Ulsan",               latitude: 35.51106,  longitude: 129.3828  },
  { id: "pyeongtaek",     code: "PTK", name: "Pyeongtaek",          latitude: 36.967,    longitude: 126.8     },
  { id: "batangas",       code: "BAT", name: "Batangas",            latitude: 13.75432,  longitude: 121.04339 },
  { id: "dar-es-salaam",  code: "DAR", name: "Dar es Salaam",       latitude: -6.83511,  longitude: 39.29379  },
  { id: "durban",         code: "DUR", name: "Durban",              latitude: -29.8732,  longitude: 31.0245   },
  { id: "san-diego",      code: "SAN", name: "San Diego",           latitude: 32.65366,  longitude: -117.1141 },
  { id: "port-hueneme",   code: "PHM", name: "Port Hueneme",        latitude: 34.14722,  longitude: -119.20833},
  { id: "tangier-med",    code: "TNG", name: "Tangier Med",         latitude: 35.895,    longitude: -5.4945   },
  { id: "sagunto",        code: "SAG", name: "Sagunto",             latitude: 39.65007,  longitude: -0.21416  },
  { id: "le-havre",       code: "LEH", name: "Le Havre",            latitude: 49.47265,  longitude: 0.1462    },
  { id: "bristol",        code: "BRS", name: "Bristol (Harbour)",   latitude: 51.45,     longitude: -2.6      },
  { id: "rotterdam",      code: "RTM", name: "Rotterdam",           latitude: 51.885,    longitude: 4.2867    },
  { id: "southampton",    code: "SOU", name: "Southampton",         latitude: 50.8965,   longitude: -1.3968   },
  { id: "bremerhaven",    code: "BRE", name: "Bremerhaven",         latitude: 53.55,     longitude: 8.53333   },
  { id: "zeebrugge",      code: "ZBR", name: "Zeebrugge",           latitude: 51.33007,  longitude: 3.20137   },
];

/**
 * Shipping routes between ports.
 * Long-haul cross-ocean routes get a shipIconId so a ⛴️ emoji
 * is rendered at the arc midpoint.
 * Short/regional arcs are left without one to reduce visual clutter.
 */
export const ROUTES: Route[] = [
  // ── Cross-ocean (long-haul with ship icon) ──────────────────────────────
  { from: "yokohama", to: "singapore", shipIconId: "jp-sea" },
  { from: "singapore", to: "perth-fremantle", shipIconId: "sea-au" },
  { from: "singapore", to: "jebel-ali", shipIconId: "sea-me" },
  { from: "singapore", to: "dar-es-salaam", shipIconId: "sea-af" },
  { from: "jebel-ali", to: "tangier-med", shipIconId: "me-eu" },
  { from: "ulsan", to: "san-diego", shipIconId: "kr-us" },

  // ── SE Asia feeders into Singapore ──────────────────────────────────────
  { from: "shanghai", to: "yantian" },
  { from: "yantian", to: "singapore" },
  { from: "ho-chi-minh", to: "singapore" },
  { from: "laem-chabang", to: "singapore" },
  { from: "batangas", to: "singapore" },

  // ── Korea / Japan ────────────────────────────────────────────────────────
  { from: "ulsan", to: "yokohama" },

  // ── Australia circuit ───────────────────────────────────────────────────
  { from: "perth-fremantle", to: "adelaide" },
  { from: "adelaide", to: "melbourne" },
  { from: "melbourne", to: "brisbane" },
  { from: "brisbane", to: "auckland" },

  // ── Middle East / India ──────────────────────────────────────────────────
  { from: "pipavav", to: "mumbai-jnpt" },
  { from: "mumbai-jnpt", to: "jebel-ali" },
  { from: "jebel-ali", to: "abu-dhabi" },

  // ── East Africa ─────────────────────────────────────────────────────────
  { from: "dar-es-salaam", to: "durban" },

  // ── Europe ──────────────────────────────────────────────────────────────
  { from: "tangier-med", to: "rotterdam" },
  { from: "rotterdam", to: "bremerhaven" },

  // ── US West Coast ────────────────────────────────────────────────────────
  { from: "san-diego", to: "port-hueneme" },
];

/** Arc IDs that show a ⛴️ ship emoji at their midpoint */
export const SHIP_ROUTE_IDS = ROUTES.filter((r) => r.shipIconId).map(
  (r) => r.shipIconId!
);

/** Lookup map from port id → Port for O(1) access */
export const PORT_MAP = new Map<string, Port>(PORTS.map((p) => [p.id, p]));

export const part = {
  number: "HA-2028",
  summary: "EE + CS engineer · University of Minnesota · Class of 2028",
};

export type Characteristic = {
  parameter: string;
  conditions: string;
  value: string;
  unit?: string;
};

// Every figure here already appears in a case study; this table only adds the test conditions
export const characteristics: { source: string; rows: Characteristic[] }[] = [
  {
    source: "neural-frequency",
    rows: [
      { parameter: "Parallel FIR filters", conditions: "8 channels, Q1.15 fixed point, one FPGA", value: "32", unit: "filters" },
      { parameter: "BLE power draw reduction", conditions: "30-byte, 50 Hz packet protocol", value: "~88.4", unit: "%" },
      { parameter: "Battery life extension", conditions: "Estimated, same protocol", value: "~12", unit: "%" },
      { parameter: "Scheduling guardband", conditions: "135-byte frames every 8 ms over BLE's 7.5 ms floor", value: "0.5", unit: "ms" },
      { parameter: "Telemetry link rate", conditions: "UART with hardware flow control, AES-128-CCM", value: "230,400", unit: "baud" },
    ],
  },
  {
    source: "roominate",
    rows: [
      { parameter: "Rooms covered", conditions: "73 UMN buildings", value: "574", unit: "rooms" },
      { parameter: "Time to ship", conditions: "iOS, Android and web, 11 languages", value: "72", unit: "h" },
      { parameter: "Automated tests", conditions: "Availability engine, scraper and schema", value: "140+", unit: "tests" },
    ],
  },
  {
    source: "wafer-cleaner",
    rows: [
      { parameter: "Drive frequency", conditions: "Custom half-bridge, N-channel MOSFETs", value: "80", unit: "kHz" },
      { parameter: "Transducer power", conditions: "3 × 60 W bolt-clamped piezo at 100–130 V", value: "180", unit: "W" },
      { parameter: "Transducer spacing", conditions: "19λ/4, to disrupt standing waves", value: "90", unit: "mm" },
    ],
  },
  {
    source: "planumn",
    rows: [{ parameter: "Users before release", conditions: "UMN students", value: "80+", unit: "users" }],
  },
  {
    source: "analog-audio",
    rows: [{ parameter: "Gain-bandwidth limit", conditions: "LM741, located by frequency sweep", value: "1", unit: "MHz" }],
  },
  {
    source: "kintsugi",
    rows: [{ parameter: "Time to ship", conditions: "Scraping, classification, geolocation and map", value: "22", unit: "h" }],
  },
];

// Signals from the contact list that belong on a one-page summary
export const orderingSignals = ["Email", "UMN", "LinkedIn", "GitHub"];

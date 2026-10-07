export type Domain = "hw" | "sw";
export type Lens = "all" | Domain;

export type Metric = { value: string; label: string };

export type DiagramNode = {
  id: string;
  col: number;
  row: number;
  label: string;
  sub?: string;
  // io: something outside the system; wip: designed but not built yet
  kind?: "block" | "io" | "wip";
};

export type DiagramEdge = {
  from: string;
  to: string;
  dashed?: boolean;       // Leads to something not built yet
};

export type Diagram = {
  caption: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export type Project = {
  slug: string;
  ref: string;              // Reference designator; stays with the project in every lens
  title: string;
  tagline: string;
  context: string;          // Personal project, hackathon, club, course
  period: string;
  inProgress?: boolean;
  primary: Domain;          // Sets the accent colour
  domains: Domain[];        // Lenses the project belongs to
  link?: { href: string; label: string };
  stack: string[];
  metrics: Metric[];        // First one is the headline shown on small tiles
  chain: string[];          // Signal path in a few words, for the tile
  diagram: Diagram;
  problem: string[];
  constraint: string[];
  decision: string[];
  result: string[];
  video?: { src: string; poster: string };
};

export const projects: Project[] = [
  {
    slug: "neural-frequency",
    ref: "U1",
    title: "Neural Frequency System",
    tagline: "Real-time EEG neurofeedback interface",
    context: "Personal project",
    period: "June 2026 – Present",
    inProgress: true,
    primary: "hw",
    domains: ["hw", "sw"],
    stack: ["Verilog", "Vivado", "Python", "KiCad", "SKiDL"],
    metrics: [
      { value: "32", label: "parallel FIR filters across 8 channels, on one FPGA" },
      { value: "~88.4%", label: "less BLE power draw with a 30-byte, 50 Hz packet protocol" },
      { value: "0.5 ms", label: "scheduling guardband held over BLE's 7.5 ms floor" },
    ],
    chain: ["8-ch EEG", "FIR ×32", "LMS", "AES-CCM", "BLE"],
    diagram: {
      caption: "Signal path and command path",
      nodes: [
        { id: "afe", col: 0, row: 0, label: "8-channel input", sub: "AFE board in progress", kind: "wip" },
        { id: "fir", col: 1, row: 0, label: "FIR filter bank", sub: "32 filters · Q1.15" },
        { id: "lms", col: 2, row: 0, label: "LMS filter", sub: "artifact cancellation" },
        { id: "frame", col: 3, row: 0, label: "Framer", sub: "135 B every 8 ms" },
        { id: "aes", col: 4, row: 0, label: "AES-128-CCM", sub: "authenticated link" },
        { id: "uart", col: 5, row: 0, label: "UART → BLE", sub: "230,400 baud · RTS/CTS" },
        { id: "host", col: 5, row: 1, label: "Host", kind: "io" },
        { id: "cmd", col: 3, row: 1, label: "Command interface", sub: "9 registers" },
        { id: "stim", col: 1, row: 1, label: "Stimulation output", sub: "board in progress", kind: "wip" },
      ],
      edges: [
        { from: "afe", to: "fir" },
        { from: "fir", to: "lms" },
        { from: "lms", to: "frame" },
        { from: "frame", to: "aes" },
        { from: "aes", to: "uart" },
        { from: "uart", to: "host" },
        { from: "host", to: "cmd" },
        { from: "cmd", to: "stim", dashed: true },
      ],
    },
    problem: [
      "Neurofeedback only works if the loop is fast: several EEG channels have to be filtered in parallel, cleaned of artifacts, and delivered to a host quickly enough to respond to.",
    ],
    constraint: [
      "The whole filter bank has to fit inside the FPGA's logic cell budget.",
      "BLE will not schedule a connection event more often than every 7.5 ms, and the radio side adds lag of its own.",
      "The link carries commands that control neurofeedback protocols, so it has to be authenticated, and the device runs on a battery.",
    ],
    decision: [
      "Q1.15 fixed-point math throughout, which keeps 32 parallel FIR filters and an LMS adaptive artifact filter within the logic cell budget.",
      "Samples are bundled into 135-byte frames every 8 ms, leaving a 0.5 ms guardband over BLE's 7.5 ms floor to absorb radio-side lag.",
      "The UART/BLE link runs AES-128-CCM at 230,400 baud with hardware flow control, and the 9-register command interface was migrated to meet NIST SP 800-38C.",
      "A 30-byte, 50 Hz packet protocol to cut BLE power draw.",
    ],
    result: [
      "32 FIR filters across 8 channels run in real time on one FPGA.",
      "BLE power draw is down ~88.4%, extending total battery life by an estimated ~12%.",
      "In progress: the schematic and PCB for the analog front-end and the stimulation output stage, in KiCad and SKiDL.",
    ],
  },
  {
    slug: "roominate",
    ref: "U2",
    title: "Roominate",
    tagline: "Campus study-room finder",
    context: "0-1 Startup Hackathon",
    period: "September 2026 · 72 hours",
    primary: "sw",
    domains: ["sw"],
    link: { href: "https://roominate.me", label: "roominate.me" },
    stack: ["React Native", "TypeScript", "Python", "PostgreSQL", "Supabase", "GitHub Actions"],
    metrics: [
      { value: "574", label: "rooms across 73 UMN buildings" },
      { value: "72 h", label: "from nothing to iOS, Android and web" },
      { value: "140+", label: "automated tests across engine, scraper and schema" },
    ],
    chain: ["25Live", "Python ETL", "Postgres", "On-device engine", "App"],
    diagram: {
      caption: "Data path from the campus calendar to the phone",
      nodes: [
        { id: "live", col: 0, row: 0, label: "25Live", sub: "1,100+ campus spaces", kind: "io" },
        { id: "etl", col: 1, row: 0, label: "Python ETL", sub: "4 access categories" },
        { id: "db", col: 2, row: 0, label: "PostgreSQL", sub: "~8,500 reservations" },
        { id: "snap", col: 3, row: 0, label: "Shared snapshot", sub: "one download" },
        { id: "engine", col: 4, row: 0, label: "On-device engine", sub: "availability + ranking" },
        { id: "app", col: 5, row: 0, label: "iOS · Android · Web", sub: "React Native", kind: "io" },
        { id: "cron", col: 1, row: 1, label: "GitHub Actions", sub: "every 30 minutes" },
      ],
      edges: [
        { from: "live", to: "etl" },
        { from: "etl", to: "db" },
        { from: "db", to: "snap" },
        { from: "snap", to: "engine" },
        { from: "engine", to: "app" },
        { from: "cron", to: "etl" },
      ],
    },
    problem: [
      "Finding a free study room at the University of Minnesota means checking calendars one room at a time. 25Live lists 1,100+ campus spaces, and roughly half of them are not rooms a student can walk into.",
    ],
    constraint: [
      "72 hours, start to finish.",
      "The availability feed returns 8 MB of XML and takes about 10 seconds per 200-room query, which is unusable from a phone.",
      "Some rooms have calendars nobody maintains, so an empty calendar does not mean an empty room.",
    ],
    decision: [
      "A Python ETL pipeline filters 25Live down to student-accessible rooms across 4 access categories and publishes ~8,500 reservations to Supabase/PostgreSQL every 30 minutes through GitHub Actions.",
      "Every client downloads one shared snapshot and computes availability on-device, so no phone ever calls the slow feed.",
      "A data-trust heuristic flags rooms whose booking activity is under 10% of the campus median instead of showing them as free.",
    ],
    result: [
      "574 rooms in 73 buildings, ranked by walking time and by how long each room stays free.",
      "One React Native and TypeScript codebase ships to iOS, Android and the web, localized into 11 languages.",
      "140+ automated tests (Jest, unittest, SQL) cover the availability engine, the scraper and the schema.",
    ],
  },
  {
    slug: "wafer-cleaner",
    ref: "U3",
    title: "Ultrasonic Wafer Cleaner",
    tagline: "80 kHz ultrasonic cleaning system for wafer processing",
    context: "Minnesota Nanofabrication Club",
    period: "September 2026 – Present",
    inProgress: true,
    primary: "hw",
    domains: ["hw"],
    stack: ["KiCad", "SPICE", "Half-bridge driver", "Piezo transducers"],
    metrics: [
      { value: "80 kHz", label: "ultrasonic drive, designed and built from scratch" },
      { value: "180 W", label: "three 60 W bolt-clamped piezo transducers" },
      { value: "19λ/4", label: "transducer spacing (90 mm) to break up standing waves" },
    ],
    chain: ["80 kHz drive", "Half-bridge", "3 × piezo", "316L tank"],
    diagram: {
      caption: "Drive chain and process stages",
      nodes: [
        { id: "sig", col: 0, row: 0, label: "80 kHz signal", kind: "io" },
        { id: "bridge", col: 1, row: 0, label: "Half-bridge driver", sub: "HS + LS N-ch MOSFETs" },
        { id: "piezo", col: 2, row: 0, label: "Piezo transducers", sub: "3 × 60 W · 100–130 V" },
        { id: "tank", col: 3, row: 0, label: "316L steel tank", sub: "20 × 30 × 20 cm" },
        { id: "dry", col: 4, row: 0, label: "IPA vapor dry", sub: "in design", kind: "wip" },
      ],
      edges: [
        { from: "sig", to: "bridge" },
        { from: "bridge", to: "piezo" },
        { from: "piezo", to: "tank" },
        { from: "tank", to: "dry", dashed: true },
      ],
    },
    problem: [
      "The Minnesota Nanofabrication Club needs to clean wafers as part of its process flow. I lead the club's build of an 80 kHz ultrasonic cleaner, designed from scratch.",
    ],
    constraint: [
      "The transducers need 100–130 V drive, 180 W in total.",
      "Standing waves in a tank concentrate cavitation in some places and leave others untouched.",
      "Water that stays on a wafer as it leaves the bath dries into spots and residue.",
    ],
    decision: [
      "A custom half-bridge driver built from high- and low-side N-channel MOSFETs, simulated in SPICE and laid out in KiCad.",
      "Three 60 W bolt-clamped transducers bonded at 90 mm (19λ/4) spacing, which disrupts standing-wave patterns and evens out cavitation across the working volume.",
      "An IPA vapor-drying stage that displaces water at the meniscus while the wafer cassette is withdrawn.",
    ],
    result: [
      "In progress: the driver and a welded 316L stainless steel tank (20 × 30 × 20 cm).",
      "In design: the IPA vapor-drying stage.",
    ],
  },
  {
    slug: "planumn",
    ref: "U4",
    title: "PlanUMN",
    tagline: "Graduation planner for University of Minnesota students",
    context: "Partner project",
    period: "May 2025 – August 2025",
    primary: "sw",
    domains: ["sw"],
    link: { href: "https://planu.mn", label: "planu.mn" },
    stack: ["React", "TypeScript", "Next.js", "Supabase", "REST APIs"],
    metrics: [
      { value: "80+", label: "UMN students using it before release" },
      { value: "1 PDF", label: "transcript import fills in every completed course" },
      { value: "RLS", label: "row-level security plus server-side permission checks" },
    ],
    chain: ["Transcript PDF", "Planner UI", "Next.js API", "Supabase"],
    diagram: {
      caption: "From a transcript to a saved plan",
      nodes: [
        { id: "pdf", col: 0, row: 0, label: "Transcript PDF", sub: "unofficial transcript", kind: "io" },
        { id: "parse", col: 1, row: 0, label: "Transcript import", sub: "fills past semesters" },
        { id: "ui", col: 2, row: 0, label: "Planner UI", sub: "React · drag-and-drop" },
        { id: "api", col: 3, row: 0, label: "Next.js API", sub: "REST · serverless" },
        { id: "supa", col: 4, row: 0, label: "Supabase", sub: "Postgres · Auth · RLS" },
        { id: "sqlite", col: 3, row: 1, label: "SQLite", sub: "course data · search" },
      ],
      edges: [
        { from: "pdf", to: "parse" },
        { from: "parse", to: "ui" },
        { from: "ui", to: "api" },
        { from: "api", to: "supa" },
        { from: "sqlite", to: "api" },
      ],
    },
    problem: [
      "I kept losing track of which classes I still needed to graduate. Planning a degree at UMN means keeping course scheduling and degree tracking straight at the same time.",
    ],
    constraint: [
      "Nobody will retype several semesters of past courses before they see any value.",
      "Course search has to feel instant.",
      "A plan is personal data, and it still has to be shareable.",
    ],
    decision: [
      "A transcript import parses an unofficial UMN transcript PDF and fills in every completed course.",
      "A drag-and-drop schedule builder with autocomplete search, backed by REST APIs for fuzzy search and quick course info.",
      "Plans live in Supabase behind user authentication, row-level security and server-side permission checks; course data is served from SQLite on the server.",
    ],
    result: [
      "Used by more than 80 students before release.",
      "Plans are stored in the cloud and can be shared by link.",
    ],
    video: { src: "/media/planumn.mp4", poster: "/media/planumn.jpg" },
  },
  {
    slug: "jiko",
    ref: "U5",
    title: "Jiko",
    tagline: "AI reminder system with behaviour modeling",
    context: "Personal project",
    period: "January 2026 – May 2026",
    primary: "sw",
    domains: ["sw"],
    link: { href: "https://jiko.life", label: "jiko.life" },
    stack: ["Swift", "Node.js", "AWS", "SQL", "LangChain", "Twilio API"],
    metrics: [
      { value: "iOS + macOS", label: "activity trackers feeding one trigger engine" },
      { value: "SMS", label: "nudges that arrive like a text from a friend" },
      { value: "Canvas", label: "knows what is due before it interrupts" },
    ],
    chain: ["iOS + macOS", "Node.js API", "Trigger engine", "SMS"],
    diagram: {
      caption: "From an opened app to a text message",
      nodes: [
        { id: "clients", col: 0, row: 0, label: "iOS + macOS", sub: "Swift · app events", kind: "io" },
        { id: "api", col: 1, row: 0, label: "Node.js API", sub: "Express · REST" },
        { id: "trigger", col: 2, row: 0, label: "Trigger engine", sub: "cron · thresholds" },
        { id: "voice", col: 3, row: 0, label: "Message writer", sub: "LLM · your own voice" },
        { id: "sms", col: 4, row: 0, label: "SMS", kind: "io" },
        { id: "db", col: 1, row: 1, label: "PostgreSQL", sub: "usage history" },
        { id: "canvas", col: 2, row: 1, label: "Canvas", sub: "homework · exams", kind: "io" },
      ],
      edges: [
        { from: "clients", to: "api" },
        { from: "api", to: "trigger" },
        { from: "trigger", to: "voice" },
        { from: "voice", to: "sms" },
        { from: "api", to: "db" },
        { from: "canvas", to: "trigger" },
      ],
    },
    problem: [
      "Engagement metrics are built to keep you scrolling. Jiko points the same signals the other way: it notices when you start doomscrolling and messages you, like a friend asking whether you have studied for your midterm yet.",
    ],
    constraint: [
      "It has to know what you are doing right now, and what is actually due.",
      "A reminder that interrupts too often gets blocked, so it has to learn when to stay quiet.",
    ],
    decision: [
      "A Swift and SwiftUI iOS app and a macOS menu-bar utility detect the active app and post key events to the backend.",
      "A Node.js backend on AWS EC2 with Express REST APIs, scheduled cron jobs and trigger evaluation pipelines weighs usage against homework, exams and papers due on Canvas.",
      "Reminders go out as SMS through Twilio, and a personalized chatbot trained on my own text history is built in.",
      "S3, PostgreSQL and DynamoDB handle persistent storage and TTL data pruning, with an adjustable sensitivity setting for how readily it intervenes.",
    ],
    result: [
      "A trigger-to-action engine that sends personalized reminders based on usage and workload.",
      "A working macOS menu-bar tracker and iOS app that detect active apps in real time, and automatic SMS dispatch when a distraction threshold is crossed.",
      "Weekly reports on screen time and app usage trends, with Jest unit and integration tests across the trigger pipelines.",
    ],
  },
  {
    slug: "analog-audio",
    ref: "U6",
    title: "Analog Audio System",
    tagline: "Variable gain, bass and treble audio amplifier",
    context: "Course project",
    period: "March 2026 – May 2026",
    primary: "hw",
    domains: ["hw"],
    stack: ["LM741 op-amps", "Active filter design", "FFT analysis", "Breadboard prototyping"],
    metrics: [
      { value: "3-stage", label: "LM741 amplifier with gain, bass and treble control" },
      { value: "1 MHz", label: "gain-bandwidth limit located by frequency sweep" },
      { value: "3.5 mm", label: "works with any audio source" },
    ],
    chain: ["3.5 mm in", "Gain", "Bass", "Treble", "Out"],
    diagram: {
      caption: "Three op-amp stages",
      nodes: [
        { id: "in", col: 0, row: 0, label: "3.5 mm input", kind: "io" },
        { id: "gain", col: 1, row: 0, label: "Variable gain", sub: "LM741 · pot feedback" },
        { id: "bass", col: 2, row: 0, label: "Bass shelving", sub: "LM741 · cap-tuned" },
        { id: "treble", col: 3, row: 0, label: "Treble shaping", sub: "LM741" },
        { id: "out", col: 4, row: 0, label: "Audio out", kind: "io" },
      ],
      edges: [
        { from: "in", to: "gain" },
        { from: "gain", to: "bass" },
        { from: "bass", to: "treble" },
        { from: "treble", to: "out" },
      ],
    },
    problem: [
      "Build an audio amplifier with continuously variable gain and adjustable bass and treble, out of LM741 op-amps, that works with any 3.5 mm source.",
    ],
    constraint: [
      "The LM741 has a 1 MHz gain-bandwidth product, so every bit of gain costs bandwidth.",
    ],
    decision: [
      "Three LM741 stages: a continuously variable gain stage set by a potentiometer-controlled feedback network, then bass and treble tone shaping.",
      "The bass shelving filter was modeled from feedback theory and tuned with a capacitor.",
    ],
    result: [
      "Swept the feedback network to map the amplifier's full gain range.",
      "Used frequency response analysis to find where the 1 MHz gain-bandwidth product started limiting performance.",
      "Validated the shelving model by swapping timing capacitors and watching the corner frequency shift.",
    ],
  },
  {
    slug: "kintsugi",
    ref: "U7",
    title: "Kintsugi",
    tagline: "Global conflict awareness heat map",
    context: "MinneHack '26 · team placomi",
    period: "February 2026 · 22 hours",
    primary: "sw",
    domains: ["sw"],
    link: { href: "https://mnhack26.vercel.app", label: "mnhack26.vercel.app" },
    stack: ["Python", "SentenceTransformers", "Pandas", "Google Maps API", "Next.js"],
    metrics: [
      { value: "22 h", label: "to build scraping, classification, geolocation and the map" },
      { value: "2 sources", label: "scraped tweets and user-submitted reports" },
      { value: "LLM", label: "severity classification by prompting" },
    ],
    chain: ["Tweets + reports", "NLP", "Severity", "Geolocate", "Heat map"],
    diagram: {
      caption: "NLP pipeline",
      nodes: [
        { id: "src", col: 0, row: 0, label: "Tweets + reports", sub: "scraped · submitted", kind: "io" },
        { id: "nlp", col: 1, row: 0, label: "Text processing", sub: "SentenceTransformers" },
        { id: "sev", col: 2, row: 0, label: "Severity", sub: "LLM classification" },
        { id: "geo", col: 3, row: 0, label: "Geolocation", sub: "from free text" },
        { id: "map", col: 4, row: 0, label: "Heat map", sub: "Google Maps · Next.js", kind: "io" },
      ],
      edges: [
        { from: "src", to: "nlp" },
        { from: "nlp", to: "sev" },
        { from: "sev", to: "geo" },
        { from: "geo", to: "map" },
      ],
    },
    problem: [
      "Underreported crises stay invisible when the only way to hear about them runs through algorithmic or commercial gatekeeping.",
    ],
    constraint: [
      "22 hours at MinneHack 2026.",
      "A tweet is unstructured text: it carries no severity and no coordinates.",
    ],
    decision: [
      "A Python NLP pipeline processes scraped Twitter data with SentenceTransformers and Pandas.",
      "An LLM classifies the severity of each event by prompting, and locations are extracted from the text itself.",
      "A Next.js front end plots the result on a Google Maps heat map, alongside reports submitted by users.",
    ],
    result: [
      "A full pipeline, from scraping to classification to geolocation, built in 22 hours.",
      "Pitched at MinneHack 2026 as a way to surface underreported crises without relying on centralized media.",
    ],
    video: { src: "/media/kintsugi.mp4", poster: "/media/kintsugi.jpg" },
  },
  {
    slug: "gene-expression",
    ref: "U8",
    title: "Gene Expression Analysis",
    tagline: "Tensor decomposition of colon cancer spatial transcriptomics",
    context: "Course project",
    period: "April 2025 – May 2025",
    primary: "sw",
    domains: ["sw"],
    stack: ["MATLAB", "GraphTucker", "PPI networks", "BIOGRID"],
    metrics: [
      { value: "3D", label: "gene-spot tensors decomposed with GraphTucker" },
      { value: "3 themes", label: "immune response, chemoresistance and tumor growth" },
      { value: "PPI", label: "clusters interpreted against BIOGRID networks" },
    ],
    chain: ["Spatial data", "3D tensor", "GraphTucker", "Clusters"],
    diagram: {
      caption: "Analysis pipeline",
      nodes: [
        { id: "data", col: 0, row: 0, label: "Spatial data", sub: "colon cancer tissue", kind: "io" },
        { id: "tensor", col: 1, row: 0, label: "3D tensor", sub: "gene-spot" },
        { id: "tucker", col: 2, row: 0, label: "GraphTucker", sub: "low-rank features" },
        { id: "cluster", col: 3, row: 0, label: "Clustering", sub: "unsupervised" },
        { id: "interp", col: 4, row: 0, label: "Interpretation", sub: "biological meaning", kind: "io" },
        { id: "ppi", col: 4, row: 1, label: "PPI network", sub: "BIOGRID" },
      ],
      edges: [
        { from: "data", to: "tensor" },
        { from: "tensor", to: "tucker" },
        { from: "tucker", to: "cluster" },
        { from: "cluster", to: "interp" },
        { from: "ppi", to: "interp" },
      ],
    },
    problem: [
      "Spatial transcriptomics records which genes are active and where in a tissue sample. The question was what that says about colon cancer.",
    ],
    constraint: [
      "The data is a 3D gene-spot tensor with no labels, so any structure has to be found unsupervised.",
    ],
    decision: [
      "Applied GraphTucker in MATLAB to pull low-rank spatial features out of the tensor, then clustered them.",
      "Interpreted each cluster against protein-protein interaction networks and BIOGRID data.",
    ],
    result: [
      "Found clusters tied to immune response, chemoresistance and tumor growth.",
      "Presented the biological interpretation of the results.",
    ],
  },
  {
    slug: "aidah-dev",
    ref: "U9",
    title: "aidah.dev",
    tagline: "This website",
    context: "Personal project",
    period: "September 2025 – Present",
    primary: "sw",
    domains: ["sw"],
    link: { href: "https://aidah.dev", label: "aidah.dev" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
    metrics: [
      { value: "3 lenses", label: "one set of content, sorted for hardware or software" },
      { value: "Static", label: "Next.js export served from Cloudflare Workers" },
      { value: "SVG", label: "block diagrams drawn from the project data" },
    ],
    chain: ["Typed content", "Lens routes", "Static export", "Cloudflare"],
    diagram: {
      caption: "Build and delivery",
      nodes: [
        { id: "data", col: 0, row: 0, label: "Typed content", sub: "one TypeScript file" },
        { id: "lens", col: 1, row: 0, label: "Lens routes", sub: "all · hardware · software" },
        { id: "build", col: 2, row: 0, label: "Next.js build", sub: "static export" },
        { id: "cf", col: 3, row: 0, label: "Cloudflare Workers", sub: "static assets" },
        { id: "browser", col: 4, row: 0, label: "Browser", kind: "io" },
      ],
      edges: [
        { from: "data", to: "lens" },
        { from: "lens", to: "build" },
        { from: "build", to: "cf" },
        { from: "cf", to: "browser" },
      ],
    },
    problem: [
      "A portfolio gets a few seconds of attention. The earlier version of this site spent them on a greeting, and kept the projects two screens down behind a row of tabs.",
    ],
    constraint: [
      "I work across electrical engineering and computer science, and the two audiences look for different things.",
      "It should stay a static site with nothing to run.",
    ],
    decision: [
      "Every project is one typed record: metrics, a signal path, a block diagram and a short case study.",
      "The same records render under three lenses, each at its own URL, so a hardware-focused résumé can link straight to the hardware view.",
      "Block diagrams are drawn as SVG from the data, in a horizontal layout on wide screens and a vertical one on phones.",
    ],
    result: [
      "All nine projects sit in one grid, each with its headline number.",
      "Built as a static export and served from Cloudflare Workers.",
    ],
  },
];

// Tile order per lens; the first two positions get the large tiles
const ORDER: Record<Lens, string[]> = {
  all: ["neural-frequency", "roominate", "wafer-cleaner", "planumn", "jiko", "analog-audio", "kintsugi", "gene-expression", "aidah-dev"],
  hw: ["neural-frequency", "wafer-cleaner", "analog-audio", "roominate", "planumn", "jiko", "kintsugi", "gene-expression", "aidah-dev"],
  sw: ["roominate", "planumn", "jiko", "kintsugi", "neural-frequency", "gene-expression", "aidah-dev", "wafer-cleaner", "analog-audio"],
};

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectsFor(lens: Lens): Project[] {
  return ORDER[lens].map((slug) => getProject(slug)!);
}

export function inLens(project: Project, lens: Lens): boolean {
  return lens === "all" || project.domains.includes(lens);
}

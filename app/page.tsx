"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Cpu,
  GitBranch,
  Lightbulb,
  RotateCcw,
  ShieldAlert,
  Zap,
} from "lucide-react";

type SwitchKey = "lbsA" | "earthA" | "tie" | "lbsB" | "earthB";
type SwitchState = Record<SwitchKey, boolean>;

const initialState: SwitchState = {
  lbsA: false,
  earthA: false,
  tie: false,
  lbsB: false,
  earthB: false,
};

const devices: Array<{
  key: SwitchKey;
  name: string;
  shortName: string;
  address: string;
  location: string;
  description: string;
}> = [
  {
    key: "lbsA",
    name: "Load Break Switch A",
    shortName: "LBS-A",
    address: "I0.0",
    location: "Gardu A",
    description: "Menghubungkan sumber A ke busbar Gardu A.",
  },
  {
    key: "earthA",
    name: "Earthing Switch A",
    shortName: "ES-A",
    address: "I0.1",
    location: "Gardu A",
    description: "Menampilkan status pembumian sisi Gardu A.",
  },
  {
    key: "tie",
    name: "Switch Daya Antargardu",
    shortName: "TIE",
    address: "I0.2",
    location: "A — B",
    description: "Menghubungkan busbar Gardu A dan Gardu B.",
  },
  {
    key: "lbsB",
    name: "Load Break Switch B",
    shortName: "LBS-B",
    address: "I0.3",
    location: "Gardu B",
    description: "Menghubungkan sumber B ke busbar Gardu B.",
  },
  {
    key: "earthB",
    name: "Earthing Switch B",
    shortName: "ES-B",
    address: "I0.4",
    location: "Gardu B",
    description: "Menampilkan status pembumian sisi Gardu B.",
  },
];

function StatePill({ active }: { active: boolean }) {
  return (
    <span className={active ? "state-pill state-on" : "state-pill state-off"}>
      <span className="status-dot" />
      {active ? "ON · TERTUTUP" : "OFF · TERBUKA"}
    </span>
  );
}

function SingleLineDiagram({ state }: { state: SwitchState }) {
  const color = (active: boolean) => (active ? "#22c55e" : "#526071");

  return (
    <div className="sld-shell" aria-label="Single-line diagram dua gardu">
      <svg viewBox="0 0 1100 420" role="img" className="sld-diagram">
        <title>Single-line diagram dua gardu dengan lima switch</title>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="sld-label">
          <text x="160" y="42" textAnchor="middle">GARDU A</text>
          <text x="940" y="42" textAnchor="middle">GARDU B</text>
        </g>

        <g className="source-block">
          <rect x="58" y="86" width="142" height="64" rx="12" />
          <text x="129" y="112" textAnchor="middle">SUMBER A</text>
          <text x="129" y="135" textAnchor="middle" className="sub-label">AC INCOMING</text>
          <rect x="900" y="86" width="142" height="64" rx="12" />
          <text x="971" y="112" textAnchor="middle">SUMBER B</text>
          <text x="971" y="135" textAnchor="middle" className="sub-label">AC INCOMING</text>
        </g>

        <path d="M200 118 H278" className="wire" />
        <path d="M346 118 H438 V205" className="wire" />
        <path d="M900 118 H822" className="wire" />
        <path d="M754 118 H662 V205" className="wire" />

        <g className="device-symbol">
          <rect x="278" y="91" width="68" height="54" rx="9" stroke={color(state.lbsA)} />
          <circle cx="292" cy="118" r="5" fill={color(state.lbsA)} />
          <circle cx="332" cy="118" r="5" fill={color(state.lbsA)} />
          <path
            d={state.lbsA ? "M297 118 H327" : "M297 118 L325 101"}
            stroke={color(state.lbsA)}
            filter={state.lbsA ? "url(#glow)" : undefined}
          />
          <text x="312" y="171" textAnchor="middle">LBS-A</text>

          <rect x="754" y="91" width="68" height="54" rx="9" stroke={color(state.lbsB)} />
          <circle cx="768" cy="118" r="5" fill={color(state.lbsB)} />
          <circle cx="808" cy="118" r="5" fill={color(state.lbsB)} />
          <path
            d={state.lbsB ? "M773 118 H803" : "M773 118 L801 101"}
            stroke={color(state.lbsB)}
            filter={state.lbsB ? "url(#glow)" : undefined}
          />
          <text x="788" y="171" textAnchor="middle">LBS-B</text>
        </g>

        <path d="M398 205 H500" className="busbar" />
        <path d="M600 205 H702" className="busbar" />
        <text x="449" y="190" textAnchor="middle" className="bus-label">BUSBAR A</text>
        <text x="651" y="190" textAnchor="middle" className="bus-label">BUSBAR B</text>

        <g className="device-symbol">
          <rect x="500" y="178" width="100" height="54" rx="9" stroke={color(state.tie)} />
          <circle cx="518" cy="205" r="5" fill={color(state.tie)} />
          <circle cx="582" cy="205" r="5" fill={color(state.tie)} />
          <path
            d={state.tie ? "M523 205 H577" : "M523 205 L574 184"}
            stroke={color(state.tie)}
            filter={state.tie ? "url(#glow)" : undefined}
          />
          <text x="550" y="260" textAnchor="middle">TIE SWITCH</text>
        </g>

        <path d="M438 205 V290 H414" className="wire" />
        <path d="M662 205 V290 H686" className="wire" />

        <g className="device-symbol earth-symbol">
          <rect x="348" y="264" width="66" height="54" rx="9" stroke={color(state.earthA)} />
          <circle cx="362" cy="291" r="5" fill={color(state.earthA)} />
          <circle cx="400" cy="291" r="5" fill={color(state.earthA)} />
          <path
            d={state.earthA ? "M367 291 H395" : "M367 291 L393 275"}
            stroke={color(state.earthA)}
            filter={state.earthA ? "url(#glow)" : undefined}
          />
          <text x="381" y="344" textAnchor="middle">ES-A</text>

          <rect x="686" y="264" width="66" height="54" rx="9" stroke={color(state.earthB)} />
          <circle cx="700" cy="291" r="5" fill={color(state.earthB)} />
          <circle cx="738" cy="291" r="5" fill={color(state.earthB)} />
          <path
            d={state.earthB ? "M705 291 H733" : "M705 291 L731 275"}
            stroke={color(state.earthB)}
            filter={state.earthB ? "url(#glow)" : undefined}
          />
          <text x="719" y="344" textAnchor="middle">ES-B</text>
        </g>

        <g className="earth-mark">
          <path d="M348 291 H324 V356 M686 291 H776 V356" />
          <path d="M307 356 H341 M759 356 H793" />
          <path d="M313 365 H335 M765 365 H787" />
          <path d="M319 374 H329 M771 374 H781" />
        </g>
      </svg>
      <div className="diagram-legend">
        <span><i className="legend-on" /> ON / tertutup</span>
        <span><i className="legend-off" /> OFF / terbuka</span>
      </div>
    </div>
  );
}

function LadderDiagram({ state }: { state: SwitchState }) {
  return (
    <div className="ladder-shell">
      <div className="ladder-heading">
        <div>
          <p className="eyebrow">PLC · LADDER LOGIC</p>
          <h2>Monitoring status digital</h2>
        </div>
        <Badge variant="outline" className="border-sky-400/30 bg-sky-400/10 text-sky-200">
          IEC 61131-3 · Konsep generik
        </Badge>
      </div>

      <div className="ladder-grid" role="img" aria-label="Lima rung ladder untuk lampu status switch">
        <div className="power-rail rail-left" />
        <div className="power-rail rail-right" />
        {devices.map((device, index) => {
          const active = state[device.key];
          return (
            <div className={`ladder-rung ${active ? "rung-active" : ""}`} key={device.key}>
              <span className="rung-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="rung-wire before-contact" />
              <div className="ladder-contact">
                <span className="contact-bar left-bar" />
                <span className="contact-bar right-bar" />
                <span className="contact-address">{device.address}</span>
                <span className="contact-name">{device.shortName}</span>
              </div>
              <div className="rung-wire after-contact" />
              <div className="ladder-coil">
                <span>(</span>
                <b>Q0.{index}</b>
                <span>)</span>
                <small>LAMPU {device.shortName}</small>
              </div>
              <div className="rung-wire after-coil" />
              <span className={active ? "coil-state coil-on" : "coil-state"}>{active ? "1" : "0"}</span>
            </div>
          );
        })}
      </div>

      <div className="io-map">
        <h3>Pemetaan I/O generik</h3>
        <div className="io-table-wrap">
          <table>
            <thead>
              <tr><th>Input</th><th>Perangkat</th><th>Output indikator</th><th>Nilai</th></tr>
            </thead>
            <tbody>
              {devices.map((device, index) => (
                <tr key={device.key}>
                  <td><code>{device.address}</code></td>
                  <td>{device.shortName}</td>
                  <td><code>Q0.{index}</code></td>
                  <td><StatePill active={state[device.key]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [switches, setSwitches] = useState<SwitchState>(initialState);
  const activeCount = useMemo(() => Object.values(switches).filter(Boolean).length, [switches]);

  function setDevice(key: SwitchKey, value: boolean) {
    setSwitches((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="min-h-screen">
      <header className="topbar">
        <div className="brand-mark"><Zap size={18} aria-hidden="true" /></div>
        <div>
          <p className="brand-title">AC SWITCHING LAB</p>
          <p className="brand-subtitle">Simulator Panel Gardu</p>
        </div>
        <Badge variant="outline" className="ml-auto border-amber-400/30 bg-amber-400/10 text-amber-200">
          Model edukasi
        </Badge>
      </header>

      <div className="page-wrap">
        <section className="intro-panel">
          <div>
            <p className="eyebrow">PROYEK PEMBELAJARAN · VERSI 1.0</p>
            <h1>Switching panel AC antargardu</h1>
            <p className="intro-copy">
              Ubah posisi setiap switch dan amati statusnya pada single-line diagram serta ladder PLC.
              Seluruh perangkat pada versi ini bekerja independen tanpa interlock.
            </p>
          </div>
          <div className="system-summary">
            <span className="summary-value">{activeCount}<small>/5</small></span>
            <span className="summary-label">SWITCH ON</span>
          </div>
        </section>

        <div className="safety-note">
          <ShieldAlert size={18} aria-hidden="true" />
          <p><strong>Penting:</strong> rancangan ini hanya untuk pembelajaran logika dan GitHub, bukan SOP pengoperasian gardu nyata.</p>
        </div>

        <Tabs defaultValue="simulator" className="workspace-tabs">
          <TabsList className="tab-list">
            <TabsTrigger value="simulator"><Zap size={16} /> Simulator SLD</TabsTrigger>
            <TabsTrigger value="ladder"><Cpu size={16} /> Ladder PLC</TabsTrigger>
            <TabsTrigger value="learn"><GitBranch size={16} /> Belajar GitHub</TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="tab-content">
            <section className="panel diagram-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">SINGLE-LINE DIAGRAM</p>
                  <h2>Topologi dua gardu</h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSwitches(initialState)}
                  disabled={activeCount === 0}
                  className="reset-button"
                >
                  <RotateCcw size={15} /> Reset OFF
                </Button>
              </div>
              <SingleLineDiagram state={switches} />
            </section>

            <section className="controls-grid" aria-label="Kontrol switch panel">
              {devices.map((device) => (
                <article className={`device-card ${switches[device.key] ? "device-active" : ""}`} key={device.key}>
                  <div className="device-card-top">
                    <span className="device-address">{device.address}</span>
                    <StatePill active={switches[device.key]} />
                  </div>
                  <div>
                    <p className="device-location">{device.location}</p>
                    <h3>{device.name}</h3>
                    <p className="device-description">{device.description}</p>
                  </div>
                  <div className="device-control">
                    <span>{switches[device.key] ? "Tutup / ON" : "Buka / OFF"}</span>
                    <Switch
                      checked={switches[device.key]}
                      onCheckedChange={(value) => setDevice(device.key, value)}
                      aria-label={`Ubah status ${device.name}`}
                    />
                  </div>
                </article>
              ))}
            </section>
          </TabsContent>

          <TabsContent value="ladder" className="tab-content">
            <LadderDiagram state={switches} />
          </TabsContent>

          <TabsContent value="learn" className="tab-content">
            <section className="learning-grid">
              <article className="panel learning-card learning-main">
                <div className="learning-icon"><GitBranch size={22} /></div>
                <p className="eyebrow">ALUR GIT PERTAMA</p>
                <h2>Simpan setiap kemajuan sebagai checkpoint</h2>
                <div className="command-stack">
                  <code><span>1</span>git status</code>
                  <code><span>2</span>git add .</code>
                  <code><span>3</span>git commit -m &quot;Membuat indikator status switch&quot;</code>
                  <code><span>4</span>git push</code>
                </div>
                <p className="learning-note">Ulangi empat langkah ini setiap kali satu fitur selesai dibuat.</p>
              </article>

              <article className="panel learning-card">
                <div className="learning-icon"><BookOpen size={22} /></div>
                <p className="eyebrow">FILE UTAMA</p>
                <h3>Pahami struktur proyek</h3>
                <ul className="file-list">
                  <li><code>app/page.tsx</code><span>Logika switch dan tampilan</span></li>
                  <li><code>app/globals.css</code><span>Warna, layout, dan diagram</span></li>
                  <li><code>docs/plc-ladder.md</code><span>Penjelasan ladder dan I/O</span></li>
                  <li><code>README.md</code><span>Panduan menjalankan proyek</span></li>
                </ul>
              </article>

              <article className="panel learning-card">
                <div className="learning-icon"><Lightbulb size={22} /></div>
                <p className="eyebrow">LATIHAN BERIKUTNYA</p>
                <h3>Buat branch fitur</h3>
                <p className="device-description">Pisahkan eksperimen interlock dari versi stabil.</p>
                <div className="mini-code">
                  <code>git switch -c fitur/interlock</code>
                  <code>git push -u origin fitur/interlock</code>
                </div>
              </article>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      <footer>
        <span>SIM-AC-01</span>
        <span>Rancangan generik · Status monitoring only</span>
      </footer>
    </main>
  );
}

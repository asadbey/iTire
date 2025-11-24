import {
  Cpu,
  Smartphone,
  Cloud,
  Lock,
  RefreshCw,
} from "lucide-react";

export function ITireArchitecture() {
  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl mb-2">
          {" "}
          iTire — End-to-End System Architecture
        </h1>
        <p className="text-slate-600">
          Device → BLE → Mobile App → (Optional) Cloud Backend
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <svg
          viewBox="0 0 1600 900"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Grid */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            </pattern>

            {/* Arrow marker */}
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
            </marker>

            {/* BLE Arrow marker */}
            <marker
              id="arrowhead-blue"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
            </marker>

            {/* Cloud Arrow marker */}
            <marker
              id="arrowhead-green"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
            </marker>
          </defs>

          <rect width="1600" height="900" fill="url(#grid)" />

          {/* Section 1: Per-Tire Embedded System (Left) */}
          <g id="tire-systems">
            {/* Main Container */}
            <rect
              x="50"
              y="50"
              width="380"
              height="800"
              rx="12"
              fill="#fef2f2"
              stroke="#ef4444"
              strokeWidth="3"
            />
            <text
              x="240"
              y="85"
              textAnchor="middle"
              fill="#dc2626"
              fontSize="20"
              fontWeight="bold"
            >
              🟥 1. Per-Tire Embedded System (x4)
            </text>

            {/* Tire Details Box */}
            <rect
              x="70"
              y="110"
              width="340"
              height="140"
              rx="8"
              fill="white"
              stroke="#fca5a5"
              strokeWidth="2"
            />
            <text x="90" y="135" fontSize="14" fill="#475569">
              <tspan fontWeight="bold">Location:</tspan> Inside
              wheel well / inner fender
            </text>
            <text x="90" y="160" fontSize="14" fill="#475569">
              <tspan fontWeight="bold">Power:</tspan> Li-ion
              battery (~1 month) + TP4056
            </text>
            <text x="90" y="185" fontSize="14" fill="#475569">
              <tspan fontWeight="bold">Wireless:</tspan> BLE 5.0
            </text>
            <text x="90" y="210" fontSize="14" fill="#475569">
              <tspan fontWeight="bold">Processing:</tspan>{" "}
              ESP32-S3 (main MCU)
            </text>
            <text x="90" y="235" fontSize="14" fill="#475569">
              <tspan fontWeight="bold">Unique Device ID</tspan>{" "}
              (tire position)
            </text>

            {/* Components Box */}
            <rect
              x="70"
              y="265"
              width="340"
              height="160"
              rx="8"
              fill="white"
              stroke="#fca5a5"
              strokeWidth="2"
            />
            <text
              x="240"
              y="290"
              textAnchor="middle"
              fontSize="15"
              fontWeight="bold"
              fill="#dc2626"
            >
              Components
            </text>
            <text x="90" y="315" fontSize="13" fill="#475569">
              • TMP117 — temperature sensor
            </text>
            <text x="90" y="340" fontSize="13" fill="#475569">
              • BMP390 — pressure sensor (MVP)
            </text>
            <text x="90" y="365" fontSize="13" fill="#475569">
              • VL53L0X — tread depth ToF
            </text>
            <text x="90" y="390" fontSize="13" fill="#475569">
              • MPU6050 — IMU vibration + rotation
            </text>
            <text x="90" y="415" fontSize="13" fill="#475569">
              • Wear loop — brake pad wear status
            </text>

            {/* ESP32-S3 Firmware Box */}
            <rect
              x="70"
              y="440"
              width="340"
              height="215"
              rx="8"
              fill="white"
              stroke="#fca5a5"
              strokeWidth="2"
            />
            <text
              x="240"
              y="465"
              textAnchor="middle"
              fontSize="15"
              fontWeight="bold"
              fill="#dc2626"
            >
              ESP32-S3 Firmware
            </text>
            <text x="90" y="490" fontSize="13" fill="#475569">
              • I²C sampling
            </text>
            <text x="90" y="515" fontSize="13" fill="#475569">
              • Filtering (Median/Kalman)
            </text>
            <text x="90" y="540" fontSize="13" fill="#475569">
              • Compensation (temp/pressure)
            </text>
            <text x="90" y="565" fontSize="13" fill="#475569">
              • Feature extraction
            </text>
            <text x="90" y="590" fontSize="13" fill="#475569">
              • Local rule engine (normal/warning/critical)
            </text>
            <text x="90" y="615" fontSize="13" fill="#475569">
              • BLE advertisement + notify packets
            </text>
            <text x="90" y="640" fontSize="13" fill="#475569">
              • Sleep/wake cycles
            </text>

            {/* Tire Icons */}
            <circle
              cx="100"
              cy="750"
              r="35"
              fill="#dc2626"
              opacity="0.2"
            />
            <circle
              cx="180"
              cy="750"
              r="35"
              fill="#dc2626"
              opacity="0.2"
            />
            <circle
              cx="260"
              cy="750"
              r="35"
              fill="#dc2626"
              opacity="0.2"
            />
            <circle
              cx="340"
              cy="750"
              r="35"
              fill="#dc2626"
              opacity="0.2"
            />
            <text
              x="100"
              y="760"
              textAnchor="middle"
              fontSize="12"
              fill="#dc2626"
            >
              FL
            </text>
            <text
              x="180"
              y="760"
              textAnchor="middle"
              fontSize="12"
              fill="#dc2626"
            >
              FR
            </text>
            <text
              x="260"
              y="760"
              textAnchor="middle"
              fontSize="12"
              fill="#dc2626"
            >
              RL
            </text>
            <text
              x="340"
              y="760"
              textAnchor="middle"
              fontSize="12"
              fill="#dc2626"
            >
              RR
            </text>
          </g>

          {/* BLE Connection Lines */}
          <g id="ble-connections">
            <line
              x1="430"
              y1="400"
              x2="560"
              y2="400"
              stroke="#3b82f6"
              strokeWidth="3"
              markerEnd="url(#arrowhead-blue)"
              strokeDasharray="8,4"
            />
            <text
              x="495"
              y="390"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#3b82f6"
            >
              BLE 5.0
            </text>
          </g>

          {/* Section 2: Vehicle Hub - Mobile App (Center) */}
          <g id="mobile-app">
            <rect
              x="560"
              y="50"
              width="420"
              height="800"
              rx="12"
              fill="#eff6ff"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            <text
              x="770"
              y="85"
              textAnchor="middle"
              fill="#2563eb"
              fontSize="20"
              fontWeight="bold"
            >
              🟦 2. Vehicle Hub — Mobile App
            </text>

            {/* Role Box */}
            <rect
              x="580"
              y="110"
              width="380"
              height="60"
              rx="8"
              fill="white"
              stroke="#93c5fd"
              strokeWidth="2"
            />
            <text
              x="770"
              y="135"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#2563eb"
            >
              Central controller + display + temporary gateway
            </text>
            <text
              x="770"
              y="160"
              textAnchor="middle"
              fontSize="13"
              fill="#475569"
            >
              (Android Tablet or Phone)
            </text>

            {/* Communication Box */}
            <rect
              x="580"
              y="185"
              width="380"
              height="80"
              rx="8"
              fill="white"
              stroke="#93c5fd"
              strokeWidth="2"
            />
            <text
              x="770"
              y="210"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#2563eb"
            >
              Communication
            </text>
            <text x="600" y="235" fontSize="13" fill="#475569">
              • Connects to each tire via BLE 5.0
            </text>
            <text x="600" y="255" fontSize="13" fill="#475569">
              • Connects to internet when available
            </text>

            {/* Functions Box */}
            <rect
              x="580"
              y="280"
              width="380"
              height="265"
              rx="8"
              fill="white"
              stroke="#93c5fd"
              strokeWidth="2"
            />
            <text
              x="770"
              y="305"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#2563eb"
            >
              App Functions
            </text>
            <text x="600" y="330" fontSize="13" fill="#475569">
              • Device discovery (BLE scan)
            </text>
            <text x="600" y="352" fontSize="13" fill="#475569">
              • PIN-secured pairing
            </text>
            <text x="600" y="374" fontSize="13" fill="#475569">
              • Tire position assignment (auto + user confirm)
            </text>
            <text x="600" y="396" fontSize="13" fill="#475569">
              • Real-time dashboard (car view + tire status)
            </text>
            <text x="600" y="418" fontSize="13" fill="#475569">
              • Local storage (SQLite)
            </text>
            <text x="600" y="440" fontSize="13" fill="#475569">
              • Summary history (offline mode)
            </text>
            <text x="600" y="462" fontSize="13" fill="#475569">
              • On-device lightweight ML:
            </text>
            <text x="620" y="482" fontSize="12" fill="#64748b">
              - wear prediction
            </text>
            <text x="620" y="500" fontSize="12" fill="#64748b">
              - risk score
            </text>
            <text x="620" y="518" fontSize="12" fill="#64748b">
              - abnormal vibration detection
            </text>
            <text x="600" y="535" fontSize="13" fill="#475569">
              • Optional cloud sync toggle
            </text>

            {/* OTA Box */}
            <rect
              x="580"
              y="560"
              width="380"
              height="80"
              rx="8"
              fill="#faf5ff"
              stroke="#a78bfa"
              strokeWidth="2"
            />
            <text
              x="770"
              y="585"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#7c3aed"
            >
              🟪 5. OTA Firmware Update
            </text>
            <text x="600" y="610" fontSize="13" fill="#475569">
              New firmware → App → BLE → Tire Node
            </text>
            <text x="600" y="630" fontSize="13" fill="#475569">
              Verification → Install → Reboot
            </text>

            {/* Security Box */}
            <rect
              x="580"
              y="655"
              width="380"
              height="105"
              rx="8"
              fill="#fefce8"
              stroke="#facc15"
              strokeWidth="2"
            />
            <text
              x="770"
              y="680"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#ca8a04"
            >
              🟨 6. Security
            </text>
            <text x="600" y="705" fontSize="13" fill="#475569">
              • BLE pairing with PIN
            </text>
            <text x="600" y="725" fontSize="13" fill="#475569">
              • HTTPS connection
            </text>
            <text x="600" y="745" fontSize="13" fill="#475569">
              • Device ID binding (never confuses tires)
            </text>

            {/* Phone Icon */}
            <rect
              x="720"
              y="775"
              width="100"
              height="60"
              rx="8"
              fill="#3b82f6"
              opacity="0.2"
            />
            <text
              x="770"
              y="813"
              textAnchor="middle"
              fontSize="28"
            >
              📱
            </text>
          </g>

          {/* Cloud Connection Lines */}
          <g id="cloud-connections">
            <line
              x1="980"
              y1="400"
              x2="1120"
              y2="400"
              stroke="#22c55e"
              strokeWidth="3"
              markerEnd="url(#arrowhead-green)"
              strokeDasharray="8,4"
            />
            <text
              x="1050"
              y="390"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#22c55e"
            >
              HTTPS (TLS)
            </text>
            <text
              x="1050"
              y="420"
              textAnchor="middle"
              fontSize="12"
              fill="#64748b"
            >
              (Optional)
            </text>

            {/* Return Arrow for insights */}
            <line
              x1="1120"
              y1="450"
              x2="980"
              y2="450"
              stroke="#fb923c"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="4,2"
            />
            <text
              x="1050"
              y="475"
              textAnchor="middle"
              fontSize="11"
              fill="#f97316"
            >
              Insights & Recommendations
            </text>
          </g>

          {/* Section 3: Optional Cloud Backend (Right) */}
          <g id="cloud-backend">
            <rect
              x="1120"
              y="50"
              width="430"
              height="500"
              rx="12"
              fill="#f0fdf4"
              stroke="#22c55e"
              strokeWidth="3"
            />
            <text
              x="1335"
              y="85"
              textAnchor="middle"
              fill="#16a34a"
              fontSize="20"
              fontWeight="bold"
            >
              🟩 3. Optional Cloud Backend
            </text>
            <text
              x="1335"
              y="110"
              textAnchor="middle"
              fontSize="13"
              fill="#64748b"
            >
              (Only when user enables it)
            </text>

            {/* REST API Box */}
            <rect
              x="1140"
              y="130"
              width="390"
              height="80"
              rx="8"
              fill="white"
              stroke="#86efac"
              strokeWidth="2"
            />
            <text
              x="1335"
              y="155"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#16a34a"
            >
              REST API
            </text>
            <text x="1160" y="180" fontSize="13" fill="#475569">
              /upload, /device, /vehicle, /analytics, /auth
            </text>
            <text
              x="1335"
              y="200"
              textAnchor="middle"
              fontSize="12"
              fill="#64748b"
            >
              (TLS encrypted)
            </text>

            {/* Database Box */}
            <rect
              x="1140"
              y="225"
              width="390"
              height="120"
              rx="8"
              fill="white"
              stroke="#86efac"
              strokeWidth="2"
            />
            <text
              x="1335"
              y="250"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#16a34a"
            >
              Database
            </text>
            <text x="1160" y="275" fontSize="13" fill="#475569">
              • Sensor readings
            </text>
            <text x="1160" y="295" fontSize="13" fill="#475569">
              • Device ID + tire position
            </text>
            <text x="1160" y="315" fontSize="13" fill="#475569">
              • Aggregated features & alerts
            </text>
            <text x="1160" y="335" fontSize="13" fill="#475569">
              • Prediction history & maintenance records
            </text>

            {/* Cloud Analytics Box */}
            <rect
              x="1140"
              y="360"
              width="390"
              height="180"
              rx="8"
              fill="white"
              stroke="#86efac"
              strokeWidth="2"
            />
            <text
              x="1335"
              y="385"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#16a34a"
            >
              Cloud Analytics
            </text>
            <text x="1160" y="410" fontSize="13" fill="#475569">
              • Long-term trend modeling
            </text>
            <text x="1160" y="430" fontSize="13" fill="#475569">
              • Deep wear prediction
            </text>
            <text x="1160" y="450" fontSize="13" fill="#475569">
              • Service recommendations
            </text>
            <text x="1160" y="470" fontSize="13" fill="#475569">
              • Anomaly detection
            </text>
            <text x="1160" y="490" fontSize="13" fill="#475569">
              • Map of nearest tire shops
            </text>
            <text x="1160" y="510" fontSize="13" fill="#475569">
              • Dashboard (future web version)
            </text>

            {/* Cloud Icon */}
            <text
              x="1335"
              y="530"
              textAnchor="middle"
              fontSize="48"
            >
              ☁️
            </text>
          </g>

          {/* Section 4: Cloud to App Features */}
          <g id="cloud-to-app">
            <rect
              x="1120"
              y="570"
              width="430"
              height="145"
              rx="12"
              fill="#fff7ed"
              stroke="#fb923c"
              strokeWidth="3"
            />
            <text
              x="1335"
              y="600"
              textAnchor="middle"
              fill="#ea580c"
              fontSize="18"
              fontWeight="bold"
            >
              🟧 4. Optional Cloud → App
            </text>

            {/* Features */}
            <text x="1160" y="635" fontSize="13" fill="#475569">
              • Download long-term history
            </text>
            <text x="1160" y="660" fontSize="13" fill="#475569">
              • Insights from cloud algorithms
            </text>
            <text x="1160" y="685" fontSize="13" fill="#475569">
              • Push recommendations:
            </text>
            <text
              x="1180"
              y="705"
              fontSize="12"
              fill="#64748b"
              fontStyle="italic"
            >
              "Replace front-left in ~18 days"
            </text>
          </g>

          {/* Summary Box at bottom */}
          <g id="summary">
            <rect
              x="50"
              y="870"
              width="1500"
              height="20"
              rx="4"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <text
              x="800"
              y="885"
              textAnchor="middle"
              fontSize="13"
              fill="#475569"
              fontWeight="bold"
            >
              🎯 Each tire node collects data → BLE to mobile
              app → app aggregates + analyzes → optional cloud
              sync for long-term AI
            </text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-100 border-2 border-red-500 rounded"></div>
          <span className="text-sm">Tire System</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-100 border-2 border-blue-500 rounded"></div>
          <span className="text-sm">Mobile App</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-100 border-2 border-green-500 rounded"></div>
          <span className="text-sm">Cloud Backend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-100 border-2 border-orange-500 rounded"></div>
          <span className="text-sm">Cloud Features</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 border-2 border-purple-500 rounded"></div>
          <span className="text-sm">OTA Updates</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-100 border-2 border-yellow-500 rounded"></div>
          <span className="text-sm">Security</span>
        </div>
      </div>
    </div>
  );
}
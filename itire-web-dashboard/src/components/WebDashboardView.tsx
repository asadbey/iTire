import { useState } from "react";
import {
  Gauge,
  Thermometer,
  Wind,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Bell,
  Settings,
  TrendingUp,
  MapPin,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type TireStatus = "normal" | "warning" | "critical";

interface TireData {
  id: string;
  position: string;
  positionFull: string;
  temperature: number;
  pressure: number;
  treadDepth: number;
  vibration: number;
  wearLevel: number;
  status: TireStatus;
}

interface Notification {
  id: string;
  type: "warning" | "critical" | "info";
  message: string;
  tire: string;
  time: string;
}

export function WebDashboardView() {
  const [selectedTire, setSelectedTire] = useState<string | null>("FL");

  // Mock tire data
  const tires: TireData[] = [
    {
      id: "FL",
      position: "FL",
      positionFull: "Front Left",
      temperature: 42,
      pressure: 32.5,
      treadDepth: 7.2,
      vibration: 12,
      wearLevel: 25,
      status: "normal",
    },
    {
      id: "FR",
      position: "FR",
      positionFull: "Front Right",
      temperature: 68,
      pressure: 28.1,
      treadDepth: 3.1,
      vibration: 45,
      wearLevel: 78,
      status: "critical",
    },
    {
      id: "RL",
      position: "RL",
      positionFull: "Rear Left",
      temperature: 48,
      pressure: 30.2,
      treadDepth: 5.5,
      vibration: 18,
      wearLevel: 42,
      status: "warning",
    },
    {
      id: "RR",
      position: "RR",
      positionFull: "Rear Right",
      temperature: 45,
      pressure: 31.8,
      treadDepth: 6.8,
      vibration: 15,
      wearLevel: 30,
      status: "normal",
    },
  ];

  const notifications: Notification[] = [
    {
      id: "1",
      type: "critical",
      message: "Critical: Low tire pressure detected. Inflate immediately!",
      tire: "FR",
      time: "2 min ago",
    },
    {
      id: "2",
      type: "critical",
      message: "Critical: Tread depth below safe level. Replace tire soon.",
      tire: "FR",
      time: "2 min ago",
    },
    {
      id: "3",
      type: "warning",
      message: "Warning: Tire wear at 42%. Consider replacement in 18 days.",
      tire: "RL",
      time: "15 min ago",
    },
    {
      id: "4",
      type: "info",
      message: "All tire sensors connected successfully via BLE 5.0",
      tire: "All",
      time: "1 hour ago",
    },
  ];

  // Mock historical data for charts
  const pressureHistory = [
    { time: "00:00", FL: 32.8, FR: 30.2, RL: 31.5, RR: 32.0 },
    { time: "04:00", FL: 32.6, FR: 29.8, RL: 31.2, RR: 31.9 },
    { time: "08:00", FL: 32.5, FR: 29.0, RL: 30.8, RR: 31.8 },
    { time: "12:00", FL: 32.4, FR: 28.5, RL: 30.5, RR: 31.7 },
    { time: "16:00", FL: 32.5, FR: 28.2, RL: 30.3, RR: 31.8 },
    { time: "20:00", FL: 32.5, FR: 28.1, RL: 30.2, RR: 31.8 },
  ];

  const temperatureHistory = [
    { time: "00:00", FL: 38, FR: 52, RL: 40, RR: 39 },
    { time: "04:00", FL: 39, FR: 55, RL: 42, RR: 40 },
    { time: "08:00", FL: 40, FR: 60, RL: 44, RR: 42 },
    { time: "12:00", FL: 41, FR: 64, RL: 46, RR: 43 },
    { time: "16:00", FL: 42, FR: 66, RL: 47, RR: 44 },
    { time: "20:00", FL: 42, FR: 68, RL: 48, RR: 45 },
  ];

  const getStatusColor = (status: TireStatus) => {
    switch (status) {
      case "normal":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
    }
  };

  const getStatusIcon = (status: TireStatus) => {
    switch (status) {
      case "normal":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "critical":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const activeTire = selectedTire
    ? tires.find((t) => t.id === selectedTire)
    : null;
  const criticalCount = notifications.filter((n) => n.type === "critical").length;
  const warningCount = notifications.filter((n) => n.type === "warning").length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl">iTire Monitor</h1>
                <p className="text-sm text-slate-500">Web Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">4 Tires Connected</span>
              </div>

              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>

              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {criticalCount + warningCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {criticalCount + warningCount}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Vehicle View & Stats */}
          <div className="col-span-4 space-y-6">
            {/* Vehicle Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Overview</CardTitle>
                <CardDescription>Click on a tire to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative flex items-center justify-center py-8">
                  {/* Car Body with Image */}
                  <div className="relative w-64 h-80">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1602713356904-ef2b5d4bbe72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0b3AlMjB2aWV3fGVufDF8fHx8MTc2MzgwNjM1NXww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Car top view"
                      className="w-full h-full object-contain opacity-30 rounded-lg"
                    />
                  </div>

                  {/* Front Left Tire */}
                  <button
                    onClick={() => setSelectedTire("FL")}
                    className={`absolute top-8 left-6 w-24 h-32 rounded-xl flex flex-col items-center justify-center transition-all overflow-hidden ${
                      selectedTire === "FL"
                        ? "scale-110 ring-4 ring-blue-500 z-10"
                        : "hover:scale-105"
                    }`}
                    style={{
                      backgroundColor:
                        tires[0].status === "critical"
                          ? "#ef4444"
                          : tires[0].status === "warning"
                          ? "#eab308"
                          : "#22c55e",
                    }}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzYzNzQ3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Tire"
                      className="w-full h-full object-cover opacity-50 absolute inset-0"
                    />
                    <div className="text-center relative z-10 text-white">
                      <div className="text-sm mb-2 drop-shadow-lg">FL</div>
                      <div className="bg-white/90 rounded-full p-1.5">
                        {getStatusIcon(tires[0].status)}
                      </div>
                    </div>
                  </button>

                  {/* Front Right Tire */}
                  <button
                    onClick={() => setSelectedTire("FR")}
                    className={`absolute top-8 right-6 w-24 h-32 rounded-xl flex flex-col items-center justify-center transition-all overflow-hidden ${
                      selectedTire === "FR"
                        ? "scale-110 ring-4 ring-blue-500 z-10"
                        : "hover:scale-105"
                    }`}
                    style={{
                      backgroundColor:
                        tires[1].status === "critical"
                          ? "#ef4444"
                          : tires[1].status === "warning"
                          ? "#eab308"
                          : "#22c55e",
                    }}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzYzNzQ3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Tire"
                      className="w-full h-full object-cover opacity-50 absolute inset-0"
                    />
                    <div className="text-center relative z-10 text-white">
                      <div className="text-sm mb-2 drop-shadow-lg">FR</div>
                      <div className="bg-white/90 rounded-full p-1.5">
                        {getStatusIcon(tires[1].status)}
                      </div>
                    </div>
                  </button>

                  {/* Rear Left Tire */}
                  <button
                    onClick={() => setSelectedTire("RL")}
                    className={`absolute bottom-8 left-6 w-24 h-32 rounded-xl flex flex-col items-center justify-center transition-all overflow-hidden ${
                      selectedTire === "RL"
                        ? "scale-110 ring-4 ring-blue-500 z-10"
                        : "hover:scale-105"
                    }`}
                    style={{
                      backgroundColor:
                        tires[2].status === "critical"
                          ? "#ef4444"
                          : tires[2].status === "warning"
                          ? "#eab308"
                          : "#22c55e",
                    }}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzYzNzQ3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Tire"
                      className="w-full h-full object-cover opacity-50 absolute inset-0"
                    />
                    <div className="text-center relative z-10 text-white">
                      <div className="text-sm mb-2 drop-shadow-lg">RL</div>
                      <div className="bg-white/90 rounded-full p-1.5">
                        {getStatusIcon(tires[2].status)}
                      </div>
                    </div>
                  </button>

                  {/* Rear Right Tire */}
                  <button
                    onClick={() => setSelectedTire("RR")}
                    className={`absolute bottom-8 right-6 w-24 h-32 rounded-xl flex flex-col items-center justify-center transition-all overflow-hidden ${
                      selectedTire === "RR"
                        ? "scale-110 ring-4 ring-blue-500 z-10"
                        : "hover:scale-105"
                    }`}
                    style={{
                      backgroundColor:
                        tires[3].status === "critical"
                          ? "#ef4444"
                          : tires[3].status === "warning"
                          ? "#eab308"
                          : "#22c55e",
                    }}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzYzNzQ3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Tire"
                      className="w-full h-full object-cover opacity-50 absolute inset-0"
                    />
                    <div className="text-center relative z-10 text-white">
                      <div className="text-sm mb-2 drop-shadow-lg">RR</div>
                      <div className="bg-white/90 rounded-full p-1.5">
                        {getStatusIcon(tires[3].status)}
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Status Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl text-green-900">2</div>
                    <div className="text-xs text-green-700">Normal</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl text-yellow-900">1</div>
                    <div className="text-xs text-yellow-700">Warning</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl text-red-900">1</div>
                    <div className="text-xs text-red-700">Critical</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest notifications from your tires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-l-4 p-3 rounded ${
                        notification.type === "critical"
                          ? "bg-red-50 border-red-500"
                          : notification.type === "warning"
                          ? "bg-yellow-50 border-yellow-500"
                          : "bg-blue-50 border-blue-500"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {notification.type === "critical" ? (
                            <XCircle className="w-5 h-5 text-red-500" />
                          ) : notification.type === "warning" ? (
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm mb-1">{notification.message}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Badge variant="outline" className="text-xs">
                              {notification.tire}
                            </Badge>
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle & Right Columns - Details & Analytics */}
          <div className="col-span-8 space-y-6">
            {/* Selected Tire Details */}
            {activeTire && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{activeTire.positionFull} Tire</CardTitle>
                      <CardDescription>Real-time sensor data</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(activeTire.status)}
                      <span className="text-sm capitalize">
                        {activeTire.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {/* Temperature */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Thermometer className="w-5 h-5 text-orange-600" />
                        <span className="text-sm text-orange-900">Temperature</span>
                      </div>
                      <div className="text-3xl text-orange-900 mb-1">
                        {activeTire.temperature}°C
                      </div>
                      <div className="text-xs text-orange-700">
                        {activeTire.temperature > 60 ? "⚠️ High" : "✓ Normal"}
                      </div>
                    </div>

                    {/* Pressure */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Gauge className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-blue-900">Pressure</span>
                      </div>
                      <div className="text-3xl text-blue-900 mb-1">
                        {activeTire.pressure}
                      </div>
                      <div className="text-xs text-blue-700">
                        {activeTire.pressure < 30 ? "⚠️ Low" : "✓ PSI"}
                      </div>
                    </div>

                    {/* Tread Depth */}
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Wind className="w-5 h-5 text-cyan-600" />
                        <span className="text-sm text-cyan-900">Tread Depth</span>
                      </div>
                      <div className="text-3xl text-cyan-900 mb-1">
                        {activeTire.treadDepth}
                      </div>
                      <div className="text-xs text-cyan-700">
                        {activeTire.treadDepth < 4 ? "⚠️ Replace" : "✓ mm"}
                      </div>
                    </div>

                    {/* Vibration */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-purple-900">Vibration</span>
                      </div>
                      <div className="text-3xl text-purple-900 mb-1">
                        {activeTire.vibration}
                      </div>
                      <div className="text-xs text-purple-700">
                        {activeTire.vibration > 30 ? "⚠️ High" : "✓ Hz"}
                      </div>
                    </div>
                  </div>

                  {/* Wear Progress */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-slate-600" />
                        <span className="text-sm">Wear Level</span>
                      </div>
                      <span className="text-sm">{activeTire.wearLevel}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          activeTire.wearLevel > 70
                            ? "bg-red-500"
                            : activeTire.wearLevel > 40
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${activeTire.wearLevel}%` }}
                      ></div>
                    </div>
                    {activeTire.wearLevel > 70 && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Estimated replacement needed in ~18 days</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pressure History Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tire Pressure History</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pressureHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[25, 35]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="FL"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Front Left"
                    />
                    <Line
                      type="monotone"
                      dataKey="FR"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Front Right"
                    />
                    <Line
                      type="monotone"
                      dataKey="RL"
                      stroke="#eab308"
                      strokeWidth={2}
                      name="Rear Left"
                    />
                    <Line
                      type="monotone"
                      dataKey="RR"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Rear Right"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Temperature History Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Temperature Trends</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={temperatureHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[30, 75]} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="FL"
                      stackId="1"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.6}
                      name="Front Left"
                    />
                    <Area
                      type="monotone"
                      dataKey="FR"
                      stackId="2"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                      name="Front Right"
                    />
                    <Area
                      type="monotone"
                      dataKey="RL"
                      stackId="3"
                      stroke="#eab308"
                      fill="#eab308"
                      fillOpacity={0.6}
                      name="Rear Left"
                    />
                    <Area
                      type="monotone"
                      dataKey="RR"
                      stackId="4"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      name="Rear Right"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Recommendations & Nearby Shops */}
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Recommendations</CardTitle>
                  <CardDescription>AI-powered insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm mb-1">
                          Front Right tire requires immediate attention
                        </p>
                        <p className="text-xs text-slate-600">
                          Low pressure and worn tread detected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm mb-1">
                          Rear Left tire showing increased wear
                        </p>
                        <p className="text-xs text-slate-600">
                          Schedule replacement in 2-3 weeks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm mb-1">Other tires in good condition</p>
                        <p className="text-xs text-slate-600">
                          Continue regular monitoring
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nearby Tire Shops</CardTitle>
                  <CardDescription>Recommended service centers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">Quick Tire Service Center</p>
                        <p className="text-xs text-slate-600">2.3 miles • Open now</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500">★★★★★</span>
                          <span className="text-xs text-slate-600">4.8 (234)</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Call
                      </Button>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">Premium Auto Care</p>
                        <p className="text-xs text-slate-600">3.1 miles • Open now</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500">★★★★☆</span>
                          <span className="text-xs text-slate-600">4.5 (189)</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Call
                      </Button>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">City Tire Experts</p>
                        <p className="text-xs text-slate-600">4.7 miles • Closes 6 PM</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500">★★★★☆</span>
                          <span className="text-xs text-slate-600">4.3 (156)</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  Wifi,
  Battery,
  Clock
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

export function MobileAppView() {
  const [selectedTire, setSelectedTire] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "notifications">("dashboard");

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
      status: "normal"
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
      status: "critical"
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
      status: "warning"
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
      status: "normal"
    }
  ];

  const notifications: Notification[] = [
    {
      id: "1",
      type: "critical",
      message: "Critical: Low tire pressure detected. Inflate immediately!",
      tire: "FR",
      time: "2 min ago"
    },
    {
      id: "2",
      type: "critical",
      message: "Critical: Tread depth below safe level. Replace tire soon.",
      tire: "FR",
      time: "2 min ago"
    },
    {
      id: "3",
      type: "warning",
      message: "Warning: Tire wear at 42%. Consider replacement in 18 days.",
      tire: "RL",
      time: "15 min ago"
    },
    {
      id: "4",
      type: "info",
      message: "All tire sensors connected successfully via BLE 5.0",
      tire: "All",
      time: "1 hour ago"
    }
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

  const activeTire = selectedTire ? tires.find(t => t.id === selectedTire) : null;
  const criticalCount = notifications.filter(n => n.type === "critical").length;
  const warningCount = notifications.filter(n => n.type === "warning").length;

  return (
    <div className="max-w-md mx-auto bg-slate-900 min-h-screen">
      {/* Status Bar */}
      <div className="bg-black text-white px-4 py-2 flex items-center justify-between">
        <span className="text-xs">9:41</span>
        <div className="flex items-center gap-1">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">iTire Monitor</h1>
            <p className="text-blue-200 text-sm">Real-time tire monitoring</p>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-white relative">
              <Bell className="w-6 h-6" />
              {(criticalCount + warningCount) > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {criticalCount + warningCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">4 tires connected via BLE</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 flex">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex-1 py-3 text-sm ${
            activeTab === "dashboard"
              ? "text-white border-b-2 border-blue-500"
              : "text-slate-400"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex-1 py-3 text-sm relative ${
            activeTab === "notifications"
              ? "text-white border-b-2 border-blue-500"
              : "text-slate-400"
          }`}
        >
          Notifications
          {(criticalCount + warningCount) > 0 && (
            <span className="absolute top-2 right-16 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {criticalCount + warningCount}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "dashboard" ? (
          <>
            {/* Car View with Tires */}
            <Card className="bg-slate-800 border-slate-700 p-6 mb-4">
              <div className="relative flex items-center justify-center">
                {/* Car Body with Image */}
                <div className="relative w-48 h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1602713356904-ef2b5d4bbe72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0b3AlMjB2aWV3fGVufDF8fHx8MTc2MzgwNjM1NXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Car top view"
                    className="w-full h-full object-contain opacity-40 rounded-lg"
                  />
                </div>

                {/* Front Left Tire */}
                <button
                  onClick={() => setSelectedTire("FL")}
                  className={`absolute top-4 left-2 w-20 h-24 rounded-xl flex flex-col items-center justify-center transition-transform overflow-hidden ${
                    selectedTire === "FL" ? "scale-110 ring-4 ring-blue-500 z-10" : ""
                  }`}
                  style={{ 
                    backgroundColor: tires[0].status === "critical" ? "#ef4444" : tires[0].status === "warning" ? "#eab308" : "#22c55e"
                  }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzYzNzQ3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Tire"
                    className="w-full h-full object-cover opacity-60 absolute inset-0"
                  />
                  <div className="text-center relative z-10 text-white">
                    <div className="text-xs mb-1 drop-shadow-lg">FL</div>
                    <div className="bg-white/90 rounded-full p-1">
                      {getStatusIcon(tires[0].status)}
                    </div>
                  </div>
                </button>

                {/* Front Right Tire */}
                <button
                  onClick={() => setSelectedTire("FR")}
                  className={`absolute top-4 right-2 w-20 h-24 rounded-xl flex flex-col items-center justify-center transition-transform overflow-hidden ${
                    selectedTire === "FR" ? "scale-110 ring-4 ring-blue-500 z-10" : ""
                  }`}
                  style={{ 
                    backgroundColor: tires[1].status === "critical" ? "#ef4444" : tires[1].status === "warning" ? "#eab308" : "#22c55e"
                  }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzYzNzQ3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Tire"
                    className="w-full h-full object-cover opacity-60 absolute inset-0"
                  />
                  <div className="text-center relative z-10 text-white">
                    <div className="text-xs mb-1 drop-shadow-lg">FR</div>
                    <div className="bg-white/90 rounded-full p-1">
                      {getStatusIcon(tires[1].status)}
                    </div>
                  </div>
                </button>

                {/* Rear Left Tire */}
                <button
                  onClick={() => setSelectedTire("RL")}
                  className={`absolute bottom-4 left-2 w-20 h-24 rounded-xl flex flex-col items-center justify-center transition-transform overflow-hidden ${
                    selectedTire === "RL" ? "scale-110 ring-4 ring-blue-500 z-10" : ""
                  }`}
                  style={{ 
                    backgroundColor: tires[2].status === "critical" ? "#ef4444" : tires[2].status === "warning" ? "#eab308" : "#22c55e"
                  }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzYzNzQ3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Tire"
                    className="w-full h-full object-cover opacity-60 absolute inset-0"
                  />
                  <div className="text-center relative z-10 text-white">
                    <div className="text-xs mb-1 drop-shadow-lg">RL</div>
                    <div className="bg-white/90 rounded-full p-1">
                      {getStatusIcon(tires[2].status)}
                    </div>
                  </div>
                </button>

                {/* Rear Right Tire */}
                <button
                  onClick={() => setSelectedTire("RR")}
                  className={`absolute bottom-4 right-2 w-20 h-24 rounded-xl flex flex-col items-center justify-center transition-transform overflow-hidden ${
                    selectedTire === "RR" ? "scale-110 ring-4 ring-blue-500 z-10" : ""
                  }`}
                  style={{ 
                    backgroundColor: tires[3].status === "critical" ? "#ef4444" : tires[3].status === "warning" ? "#eab308" : "#22c55e"
                  }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzYzNzQ3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Tire"
                    className="w-full h-full object-cover opacity-60 absolute inset-0"
                  />
                  <div className="text-center relative z-10 text-white">
                    <div className="text-xs mb-1 drop-shadow-lg">RR</div>
                    <div className="bg-white/90 rounded-full p-1">
                      {getStatusIcon(tires[3].status)}
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-center text-slate-400 text-xs mt-6">
                Tap a tire to view details
              </p>
            </Card>

            {/* Tire Details */}
            {activeTire ? (
              <Card className="bg-slate-800 border-slate-700 p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white">{activeTire.positionFull} Tire</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(activeTire.status)}
                      <span className="text-sm text-slate-400 capitalize">
                        {activeTire.status}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTire(null)}
                    className="text-slate-400"
                  >
                    ✕
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Temperature */}
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-4 h-4 text-orange-400" />
                      <span className="text-xs text-slate-400">Temperature</span>
                    </div>
                    <div className="text-xl text-white">{activeTire.temperature}°C</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {activeTire.temperature > 60 ? "High" : "Normal"}
                    </div>
                  </div>

                  {/* Pressure */}
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-slate-400">Pressure</span>
                    </div>
                    <div className="text-xl text-white">{activeTire.pressure} PSI</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {activeTire.pressure < 30 ? "Low" : "Normal"}
                    </div>
                  </div>

                  {/* Tread Depth */}
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-slate-400">Tread Depth</span>
                    </div>
                    <div className="text-xl text-white">{activeTire.treadDepth} mm</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {activeTire.treadDepth < 4 ? "Replace soon" : "Good"}
                    </div>
                  </div>

                  {/* Vibration */}
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-slate-400">Vibration</span>
                    </div>
                    <div className="text-xl text-white">{activeTire.vibration} Hz</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {activeTire.vibration > 30 ? "High" : "Normal"}
                    </div>
                  </div>
                </div>

                {/* Wear Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Wear Level</span>
                    <span className="text-xs text-slate-400">{activeTire.wearLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
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
                    <p className="text-xs text-red-400 mt-2">
                      ⚠️ Estimated replacement needed in ~18 days
                    </p>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="bg-slate-800 border-slate-700 p-6 text-center">
                <div className="text-slate-400 text-sm">
                  Select a tire to view detailed sensor data
                </div>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Card className="bg-green-900/20 border-green-700 p-3 text-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <div className="text-xs text-green-400">Normal</div>
                <div className="text-white">2</div>
              </Card>
              <Card className="bg-yellow-900/20 border-yellow-700 p-3 text-center">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                <div className="text-xs text-yellow-400">Warning</div>
                <div className="text-white">1</div>
              </Card>
              <Card className="bg-red-900/20 border-red-700 p-3 text-center">
                <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
                <div className="text-xs text-red-400">Critical</div>
                <div className="text-white">1</div>
              </Card>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Activity className="w-4 h-4 mr-2" />
                Run Diagnostics
              </Button>
              <Button variant="outline" className="border-slate-600 text-white">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </>
        ) : (
          // Notifications Tab
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-l-4 p-4 ${
                  notification.type === "critical"
                    ? "bg-red-900/20 border-red-500"
                    : notification.type === "warning"
                    ? "bg-yellow-900/20 border-yellow-500"
                    : "bg-blue-900/20 border-blue-500"
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
                    <p className="text-white text-sm mb-1">{notification.message}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Badge variant="outline" className="text-xs">
                        {notification.tire}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Safe Area */}
      <div className="h-6 bg-slate-900"></div>
    </div>
  );
}
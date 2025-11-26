import { ITireArchitecture } from "./components/ITireArchitecture";
import { MobileAppView } from "./components/MobileAppView";
import { WebDashboardView } from "./components/WebDashboardView";
import { RealtimeDashboard } from "./components/RealtimeDashboard";
import { SensorProvider } from "./contexts/SensorContext";
import { useState } from "react";
import { Button } from "./components/ui/button";

export default function App() {
  const [view, setView] = useState<"architecture" | "mobile" | "web" | "realtime">("realtime");

  return (
    <SensorProvider>
      <div className="min-h-screen bg-slate-50">
        {/* View Switcher - Higher z-index to stay above everything */}
        <div className="fixed top-4 right-4 z-[100] flex gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-slate-200">
          <Button
            onClick={() => setView("realtime")}
            variant={view === "realtime" ? "default" : "outline"}
            size="sm"
          >
            📊 Real-time
          </Button>
          <Button
            onClick={() => setView("web")}
            variant={view === "web" ? "default" : "outline"}
            size="sm"
          >
            🖥️ Web Dashboard
          </Button>
          <Button
            onClick={() => setView("mobile")}
            variant={view === "mobile" ? "default" : "outline"}
            size="sm"
          >
            📱 Mobile App
          </Button>
          <Button
            onClick={() => setView("architecture")}
            variant={view === "architecture" ? "default" : "outline"}
            size="sm"
          >
            🏗️ Architecture
          </Button>
        </div>

        {/* Content */}
        {view === "architecture" ? (
          <div className="p-8 pt-20">
            <ITireArchitecture />
          </div>
        ) : view === "mobile" ? (
          <div className="pt-16">
            <MobileAppView />
          </div>
        ) : view === "realtime" ? (
          <div className="pt-16">
            <RealtimeDashboard />
          </div>
        ) : (
          <WebDashboardView />
        )}
      </div>
    </SensorProvider>
  );
}
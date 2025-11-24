import { ITireArchitecture } from "./components/ITireArchitecture";
import { MobileAppView } from "./components/MobileAppView";
import { useState } from "react";
import { Button } from "./components/ui/button";

export default function App() {
  const [view, setView] = useState<"architecture" | "mobile">("mobile");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* View Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
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
        <div className="p-8">
          <ITireArchitecture />
        </div>
      ) : (
        <MobileAppView />
      )}
    </div>
  );
}
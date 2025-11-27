import { useSensors } from '../contexts/SensorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, Wifi, WifiOff, Activity } from 'lucide-react';
import { Button } from './ui/button';

export function MobileRealtimeDashboard() {
  const { sensors, isConnected, error, reconnect } = useSensors();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-500 text-xs">Normal</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500 text-xs">Warning</Badge>;
      case 'critical':
        return <Badge className="bg-red-500 text-xs">Critical</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
    }
  };

  const criticalSensors = sensors.filter(s => s.status === 'critical');
  const warningSensors = sensors.filter(s => s.status === 'warning');

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Connection Status Bar */}
      <div className="flex items-center justify-between bg-card p-3 rounded-lg border">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-500">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-500" />
              <span className="text-xs text-red-500">Disconnected</span>
              <Button size="sm" onClick={reconnect} variant="outline" className="h-7 text-xs">
                Reconnect
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 animate-pulse text-blue-500" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}

      {/* Critical Alerts */}
      {criticalSensors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            {criticalSensors.length} sensor(s) critical
          </AlertDescription>
        </Alert>
      )}

      {/* Warning Alerts */}
      {warningSensors.length > 0 && (
        <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-xs text-yellow-600">
            {warningSensors.length} sensor(s) need attention
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2">
        <Card>
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-2xl font-bold">{sensors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground">Normal</div>
            <div className="text-2xl font-bold text-green-500">
              {sensors.filter(s => s.status === 'normal').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground">Issues</div>
            <div className="text-2xl font-bold text-red-500">
              {criticalSensors.length + warningSensors.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Overview with Tire Positions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Vehicle Overview</CardTitle>
          <CardDescription className="text-xs">Tap a tire for details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex items-center justify-center min-h-[320px]">
            {/* Car silhouette placeholder */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-32 h-48 border-4 border-slate-400 rounded-3xl"></div>
            </div>

            {/* Position sensors around the car */}
            <div className="relative w-full max-w-xs h-80">
              {sensors.map((sensor) => {
                // Calculate position based on sensor name
                const isFront = sensor.position.toLowerCase().includes('front');
                const isRear = sensor.position.toLowerCase().includes('rear');
                const isLeft = sensor.position.toLowerCase().includes('left');
                const isMiddle = sensor.position.toLowerCase().includes('middle');
                
                let positionClass = '';
                if (isFront && isLeft) positionClass = 'top-2 left-2';
                else if (isFront && !isLeft && !isMiddle) positionClass = 'top-2 right-2';
                else if (isRear && isLeft) positionClass = 'bottom-2 left-2';
                else if (isRear && !isLeft && !isMiddle) positionClass = 'bottom-2 right-2';
                else if (isMiddle && isLeft) positionClass = 'top-1/2 -translate-y-1/2 left-2';
                else if (isMiddle && !isLeft) positionClass = 'top-1/2 -translate-y-1/2 right-2';

                return (
                  <div
                    key={sensor.id}
                    className={`absolute ${positionClass} transition-all duration-300`}
                  >
                    <Card className={`w-24 border-2 ${
                      sensor.status === 'critical' ? 'border-red-500 bg-red-50' :
                      sensor.status === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      'border-green-500 bg-green-50'
                    }`}>
                      <CardContent className="p-2 text-center">
                        <div className="text-xs font-semibold mb-1">{sensor.position}</div>
                        {getStatusBadge(sensor.status)}
                        <div className="text-xs mt-1 space-y-0.5">
                          <div className="font-mono">{sensor.pressure}</div>
                          <div className="text-xs text-muted-foreground">PSI</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sensor List */}
      <div className="space-y-2">
        {sensors.map(sensor => (
          <Card key={sensor.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${getStatusColor(sensor.status)}`} />
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{sensor.position}</CardTitle>
                {getStatusBadge(sensor.status)}
              </div>
              <CardDescription className="text-xs">
                {new Date(sensor.lastUpdate).toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Pressure</div>
                  <div className="font-mono font-semibold text-sm">{sensor.pressure}</div>
                  <div className="text-xs text-muted-foreground">PSI</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Temp</div>
                  <div className="font-mono font-semibold text-sm">{sensor.temperature}</div>
                  <div className="text-xs text-muted-foreground">°C</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Tread</div>
                  <div className="font-mono font-semibold text-sm">{sensor.treadDepth}</div>
                  <div className="text-xs text-muted-foreground">mm</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

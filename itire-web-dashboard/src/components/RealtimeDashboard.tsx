import { useSensors } from '../contexts/SensorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Wifi, WifiOff, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

interface SensorHistory {
  timestamp: string;
  [key: string]: number | string;
}

export function RealtimeDashboard() {
  const { sensors, isConnected, error, reconnect } = useSensors();
  const [history, setHistory] = useState<SensorHistory[]>([]);
  const MAX_HISTORY = 20;

  useEffect(() => {
    if (sensors.length > 0) {
      const newDataPoint: SensorHistory = {
        timestamp: new Date().toLocaleTimeString(),
      };

      sensors.forEach(sensor => {
        newDataPoint[`${sensor.position}-pressure`] = sensor.pressure;
        newDataPoint[`${sensor.position}-temp`] = sensor.temperature;
      });

      setHistory(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-MAX_HISTORY);
      });
    }
  }, [sensors]);

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
        return <Badge className="bg-green-500">Normal</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const criticalSensors = sensors.filter(s => s.status === 'critical');
  const warningSensors = sensors.filter(s => s.status === 'warning');

  return (
    <div className="p-6 space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-500">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-500">Disconnected</span>
              <Button size="sm" onClick={reconnect} variant="outline">
                Reconnect
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 animate-pulse text-blue-500" />
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Critical Alerts */}
      {criticalSensors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {criticalSensors.length} sensor(s) in critical condition: {criticalSensors.map(s => s.position).join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Warning Alerts */}
      {warningSensors.length > 0 && (
        <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-600">
            {warningSensors.length} sensor(s) need attention: {warningSensors.map(s => s.position).join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Vehicle Overview with Tire Positions */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Overview</CardTitle>
          <CardDescription>Real-time tire sensor positions - Click to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex items-center justify-center py-8">
            {/* Car silhouette with gradient */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-[480px]">
                {/* Car body */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-300 rounded-3xl opacity-20 border-4 border-slate-400"></div>
                {/* Car windshield */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-24 bg-slate-400 opacity-10 rounded-t-3xl"></div>
                {/* Car label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-slate-300 opacity-30">
                  🚗
                </div>
              </div>
            </div>

            {/* Position sensors around the car */}
            <div className="relative w-full" style={{ height: '600px', maxWidth: '1200px' }}>
              {sensors.map((sensor) => {
                // Calculate position based on sensor name
                const isFront = sensor.position.toLowerCase().includes('front');
                const isRear = sensor.position.toLowerCase().includes('rear');
                const isLeft = sensor.position.toLowerCase().includes('left');
                const isRight = sensor.position.toLowerCase().includes('right');
                const isMiddle = sensor.position.toLowerCase().includes('middle');
                const isInner = sensor.position.toLowerCase().includes('inner');
                const isOuter = sensor.position.toLowerCase().includes('outer');
                
                let positionStyle: React.CSSProperties = { position: 'absolute' };
                
                // Front tires
                if (isFront && isLeft) {
                  positionStyle = { ...positionStyle, top: '40px', left: '10%' };
                } else if (isFront && isRight) {
                  positionStyle = { ...positionStyle, top: '40px', right: '10%' };
                }
                // Rear tires
                else if (isRear && isLeft) {
                  positionStyle = { ...positionStyle, bottom: '40px', left: '10%' };
                } else if (isRear && isRight) {
                  positionStyle = { ...positionStyle, bottom: '40px', right: '10%' };
                }
                // Middle tires - Outer (further from center)
                else if (isMiddle && isLeft && isOuter) {
                  positionStyle = { ...positionStyle, top: '50%', transform: 'translateY(-50%)', left: '10%' };
                } else if (isMiddle && isRight && isOuter) {
                  positionStyle = { ...positionStyle, top: '50%', transform: 'translateY(-50%)', right: '10%' };
                }
                // Middle tires - Inner (closer to center)
                else if (isMiddle && isLeft && isInner) {
                  positionStyle = { ...positionStyle, top: '50%', transform: 'translateY(-50%)', left: '30%' };
                } else if (isMiddle && isRight && isInner) {
                  positionStyle = { ...positionStyle, top: '50%', transform: 'translateY(-50%)', right: '30%' };
                }

                return (
                  <div
                    key={sensor.id}
                    style={positionStyle}
                    className="transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <Card className={`w-40 border-3 shadow-xl hover:shadow-2xl transition-shadow ${
                      sensor.status === 'critical' ? 'border-red-500 bg-red-50 hover:bg-red-100' :
                      sensor.status === 'warning' ? 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100' :
                      'border-green-500 bg-green-50 hover:bg-green-100'
                    }`}>
                      <CardHeader className="pb-2 pt-2.5 px-2.5">
                        <div className="flex flex-col gap-1">
                          <CardTitle className="text-xs font-bold leading-tight">
                            {sensor.position}
                          </CardTitle>
                          <div className="self-start">
                            {getStatusBadge(sensor.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-2.5 pb-2.5 space-y-1">
                        <div className="text-xs flex justify-between items-center">
                          <span className="text-muted-foreground font-medium">P:</span>
                          <span className="font-mono font-bold">{sensor.pressure} PSI</span>
                        </div>
                        <div className="text-xs flex justify-between items-center">
                          <span className="text-muted-foreground font-medium">T:</span>
                          <span className="font-mono font-bold">{sensor.temperature}°C</span>
                        </div>
                        <div className="text-xs flex justify-between items-center">
                          <span className="text-muted-foreground font-medium">D:</span>
                          <span className="font-mono font-bold">{sensor.treadDepth} mm</span>
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

      {/* Real-time Charts */}
      {history.length > 0 && (
        <>
          {/* Pressure Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tire Pressure (Real-time)</CardTitle>
              <CardDescription>Pressure trends over time (PSI)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[20, 40]} />
                  <Tooltip />
                  <Legend />
                  {sensors.map((sensor, idx) => (
                    <Line
                      key={sensor.id}
                      type="monotone"
                      dataKey={`${sensor.position}-pressure`}
                      stroke={`hsl(${idx * 360 / sensors.length}, 70%, 50%)`}
                      name={sensor.position}
                      dot={false}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Temperature Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tire Temperature (Real-time)</CardTitle>
              <CardDescription>Temperature trends over time (°C)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[15, 45]} />
                  <Tooltip />
                  <Legend />
                  {sensors.map((sensor, idx) => (
                    <Line
                      key={sensor.id}
                      type="monotone"
                      dataKey={`${sensor.position}-temp`}
                      stroke={`hsl(${idx * 360 / sensors.length}, 70%, 50%)`}
                      name={sensor.position}
                      dot={false}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Sensors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sensors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Normal Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {sensors.filter(s => s.status === 'normal').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {criticalSensors.length + warningSensors.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

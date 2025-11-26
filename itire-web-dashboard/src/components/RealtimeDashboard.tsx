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

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensors.map(sensor => (
          <Card key={sensor.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${getStatusColor(sensor.status)}`} />
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {sensor.position}
                {getStatusBadge(sensor.status)}
              </CardTitle>
              <CardDescription className="text-xs">
                Last update: {new Date(sensor.lastUpdate).toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pressure:</span>
                <span className="font-mono font-semibold">{sensor.pressure} PSI</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Temperature:</span>
                <span className="font-mono font-semibold">{sensor.temperature}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tread Depth:</span>
                <span className="font-mono font-semibold">{sensor.treadDepth} mm</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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

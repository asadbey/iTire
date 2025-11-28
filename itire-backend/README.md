# iTire Backend - Real-time Sensor Simulation Service

This backend service simulates real-time tire sensor data and streams it to connected clients via WebSocket.

## Features

- **Real-time Data Simulation**: Simulates 4-8 tire sensors with realistic data
- **WebSocket Server**: Broadcasts sensor updates every 2 seconds
- **REST API**: Provides HTTP endpoints for sensor data
- **Docker Ready**: Containerized for easy deployment

## Sensor Data

Each tire sensor provides:
- **Pressure** (PSI): 20-40 range
- **Temperature** (°C): 15-45 range
- **Tread Depth** (mm): 1-10 range
- **Status**: normal, warning, critical
- **Position**: Front Left/Right, Rear Left/Right, etc.

## API Endpoints

### REST API
- `GET /api/health` - Health check
- `GET /api/sensors` - Get all sensor data
- `GET /api/sensors/:id` - Get specific sensor data

### WebSocket
- Connect to `ws://localhost:3001`
- Receives real-time updates every 2 seconds

## WebSocket Message Format

```json
{
  "type": "initial" | "update",
  "data": [
    {
      "id": "uuid",
      "position": "Front Left",
      "pressure": 32.5,
      "temperature": 25.3,
      "treadDepth": 7.8,
      "status": "normal",
      "lastUpdate": "2025-11-26T..."
    }
  ],
  "timestamp": "2025-11-26T..."
}
```

## Status Thresholds

- **Critical**: Pressure < 25 or > 40 PSI, Tread < 1.6mm
- **Warning**: Pressure < 28 or > 38 PSI, Temp > 40°C, Tread < 3mm
- **Normal**: All parameters within safe ranges

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (production/development)

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm start
```

## Docker

```bash
docker build -t itire-backend .
docker run -p 3001:3001 itire-backend
```

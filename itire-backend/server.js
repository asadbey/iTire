const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// Configuration
const PORT = process.env.PORT || 3001;
const UPDATE_INTERVAL = 2000; // 2 seconds
const NUM_SENSORS = 4; // 4 tire sensors for regular car

// Sensor data structure
class TireSensor {
  constructor(id, position) {
    this.id = id;
    this.position = position; // e.g., "Front Left", "Front Right", etc.
    this.pressure = this.getRandomInRange(30, 35); // PSI
    this.temperature = this.getRandomInRange(20, 30); // Celsius
    this.treadDepth = this.getRandomInRange(6, 10); // mm
    this.status = 'normal';
    this.lastUpdate = new Date().toISOString();
  }

  getRandomInRange(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

  updateData() {
    // Simulate realistic sensor changes
    this.pressure += this.getRandomInRange(-0.5, 0.5);
    this.temperature += this.getRandomInRange(-1, 1);
    this.treadDepth -= this.getRandomInRange(0, 0.01); // Gradual wear

    // Keep values in realistic ranges
    this.pressure = Math.max(20, Math.min(40, this.pressure));
    this.temperature = Math.max(15, Math.min(45, this.temperature));
    this.treadDepth = Math.max(1, Math.min(10, this.treadDepth));

    // Determine status based on thresholds
    if (this.pressure < 28 || this.pressure > 38) {
      this.status = 'warning';
    } else if (this.pressure < 25 || this.pressure > 40) {
      this.status = 'critical';
    } else if (this.temperature > 40) {
      this.status = 'warning';
    } else if (this.treadDepth < 3) {
      this.status = 'warning';
    } else if (this.treadDepth < 1.6) {
      this.status = 'critical';
    } else {
      this.status = 'normal';
    }

    this.pressure = parseFloat(this.pressure.toFixed(2));
    this.temperature = parseFloat(this.temperature.toFixed(2));
    this.treadDepth = parseFloat(this.treadDepth.toFixed(2));
    this.lastUpdate = new Date().toISOString();

    return this.getData();
  }

  getData() {
    return {
      id: this.id,
      position: this.position,
      pressure: this.pressure,
      temperature: this.temperature,
      treadDepth: this.treadDepth,
      status: this.status,
      lastUpdate: this.lastUpdate
    };
  }
}

// Initialize sensors
const sensors = [
  new TireSensor(uuidv4(), 'Front Left'),
  new TireSensor(uuidv4(), 'Front Right'),
  new TireSensor(uuidv4(), 'Rear Left'),
  new TireSensor(uuidv4(), 'Rear Right'),
];

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/sensors', (req, res) => {
  const sensorData = sensors.map(sensor => sensor.getData());
  res.json({
    sensors: sensorData,
    count: sensorData.length,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/sensors/:id', (req, res) => {
  const sensor = sensors.find(s => s.id === req.params.id);
  if (sensor) {
    res.json(sensor.getData());
  } else {
    res.status(404).json({ error: 'Sensor not found' });
  }
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  
  // Send initial sensor data
  ws.send(JSON.stringify({
    type: 'initial',
    data: sensors.map(sensor => sensor.getData()),
    timestamp: new Date().toISOString()
  }));

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Broadcast sensor updates to all connected clients
function broadcastSensorData() {
  const updatedSensors = sensors.map(sensor => sensor.updateData());
  
  const message = JSON.stringify({
    type: 'update',
    data: updatedSensors,
    timestamp: new Date().toISOString()
  });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Start broadcasting sensor data
setInterval(broadcastSensorData, UPDATE_INTERVAL);

// Start server
server.listen(PORT, () => {
  console.log(`iTire Backend Server running on port ${PORT}`);
  console.log(`HTTP API: http://localhost:${PORT}/api`);
  console.log(`WebSocket: ws://localhost:${PORT}`);
  console.log(`Simulating ${sensors.length} tire sensors`);
  console.log(`Broadcasting updates every ${UPDATE_INTERVAL}ms`);
});

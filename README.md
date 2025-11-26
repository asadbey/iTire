# iTire - Intelligent Tire Monitoring System

A comprehensive tire monitoring system with real-time sensor data visualization, mobile and web dashboards.

## 🚀 Features

### Real-time Monitoring
- Live sensor data streaming via WebSocket
- 4-8 tire sensors simulation
- Real-time charts and visualizations
- Auto-reconnection on disconnection

### Data Monitoring
- **Tire Pressure** (PSI)
- **Temperature** (°C)
- **Tread Depth** (mm)
- **Status Indicators** (Normal/Warning/Critical)

### Dashboards
- **Web Dashboard**: Desktop-optimized with advanced charts
- **Mobile Dashboard**: Mobile-optimized responsive UI
- **Landing Page**: Marketing/information page

## 🏗️ Architecture

```
┌─────────────────┐
│  Frontend Apps  │
│  - Landing      │
│  - Web Dash     │
│  - Mobile Dash  │
└────────┬────────┘
         │ WebSocket
         │
┌────────▼────────┐
│  Backend API    │
│  Node.js +      │
│  WebSocket      │
└────────┬────────┘
         │
┌────────▼────────┐
│ Sensor Simulator│
│ (4-8 sensors)   │
└─────────────────┘
```

## 📦 Services

- **Backend** (`itire-backend`) - Node.js + Express + WebSocket
  - Port: 3001
  - WebSocket: `ws://localhost:3001`
  - REST API: `http://localhost:3001/api`

- **Landing Page** (`itire-landing-page`) - React + Vite
  - Port: 25000
  - URL: http://localhost:25000

- **Mobile Dashboard** (`itire-mobile-dashboard`) - React + Vite
  - Port: 25001
  - URL: http://localhost:25001

- **Web Dashboard** (`itire-web-dashboard`) - React + Vite
  - Port: 25002
  - URL: http://localhost:25002

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)

### Using Docker (Recommended)

1. **Build and start all services**:
```bash
docker-compose build
docker-compose up
```

2. **Access the applications**:
- Landing Page: http://localhost:25000
- Mobile Dashboard: http://localhost:25001
- Web Dashboard: http://localhost:25002
- Backend API: http://localhost:3001/api/sensors

### Local Development

1. **Start Backend**:
```bash
cd itire-backend
npm install
npm run dev
```

2. **Start Web Dashboard**:
```bash
cd itire-web-dashboard
npm install
npm run dev
```

3. **Start Mobile Dashboard**:
```bash
cd itire-mobile-dashboard
npm install
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create `.env` files based on `.env.example`:

**Frontend Apps** (web-dashboard, mobile-dashboard):
```env
REACT_APP_WS_URL=ws://localhost:3001
```

**Backend**:
```env
PORT=3001
NODE_ENV=production
```

## 📊 Real-time Data

The backend simulates realistic tire sensor data:

- **Update Frequency**: Every 2 seconds
- **Number of Sensors**: 4-8 (configurable)
- **Data Points**: Pressure, Temperature, Tread Depth
- **Status Logic**: Automatic warning/critical detection

### Status Thresholds

| Status | Pressure (PSI) | Temperature (°C) | Tread Depth (mm) |
|--------|---------------|------------------|------------------|
| Normal | 28-38 | < 40 | > 3 |
| Warning | 25-28 or 38-40 | > 40 | 1.6-3 |
| Critical | < 25 or > 40 | - | < 1.6 |

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components
- Recharts (data visualization)
- WebSocket client

### Backend
- Node.js
- Express.js
- WebSocket (ws library)
- Docker

## 📱 Features by Dashboard

### Web Dashboard
- ✅ Real-time line charts
- ✅ Multiple sensor monitoring
- ✅ Historical data tracking
- ✅ Status alerts and notifications
- ✅ Connection status indicator
- ✅ Summary statistics

### Mobile Dashboard
- ✅ Mobile-optimized layout
- ✅ Touch-friendly interface
- ✅ Live sensor cards
- ✅ Quick status overview
- ✅ Minimal data usage
- ✅ Connection management

## 🔍 API Reference

### REST Endpoints

```bash
# Health check
GET /api/health

# Get all sensors
GET /api/sensors

# Get specific sensor
GET /api/sensors/:id
```

### WebSocket Events

**Client → Server**: Connection only (no messages required)

**Server → Client**:
```json
{
  "type": "initial" | "update",
  "data": [...sensors],
  "timestamp": "ISO-8601"
}
```

## 🐛 Troubleshooting

### WebSocket Connection Issues

1. Ensure backend is running on port 3001
2. Check CORS settings if accessing from different origin
3. Verify `REACT_APP_WS_URL` environment variable

### Docker Issues

```bash
# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up

# View logs
docker-compose logs -f backend
docker-compose logs -f web-dashboard
```

### Port Conflicts

If ports are already in use, update `docker-compose.yml`:
```yaml
ports:
  - "YOUR_PORT:80"  # Change YOUR_PORT
```

## 📝 Development

### Adding New Sensor Types

1. Update `TireSensor` class in `itire-backend/server.js`
2. Add new data fields
3. Update TypeScript interfaces in dashboard contexts
4. Add UI components for new data

### Customizing Update Frequency

In `itire-backend/server.js`:
```javascript
const UPDATE_INTERVAL = 2000; // Change to your desired interval (ms)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with React, Node.js, and WebSocket
- UI components from shadcn/ui
- Charts powered by Recharts

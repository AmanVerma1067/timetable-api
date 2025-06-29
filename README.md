# 🕒 Timetable API & Admin Panel

A full-stack REST API + Admin Panel solution for managing academic timetables using **MongoDB**, **Express**, and a clean frontend for visualizing and editing schedules.

## ✨ Features

- 📊 **Public Viewer Panel**: Anyone can view batch-wise timetable data
- 🔐 **Admin Login Panel**: Only authenticated users can edit timetable entries
- 🔄 **Live API Sync**: Flutter app instantly reflects MongoDB changes
- 💾 **MongoDB Backend**: Persistent, batch-wise timetable storage
- ⚙️ **Secure API**: API key + JWT-based authentication
- 🌐 **CORS & Helmet**: Enhanced API security
- ❤️ **Health Check**: `/health` endpoint to monitor server

---

## 🔓 Public Endpoints (No Auth)
| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/health`            | Server health check            |
| GET    | `/api/timetable`     | Fetch all timetable data       |

---

## 🔐 Admin Endpoints (Auth Required)
| Method | Endpoint               | Description                            |
|--------|------------------------|----------------------------------------|
| POST   | `/admin/login`         | Login with username/password           |
| GET    | `/admin/raw-timetable` | View raw data in JSON                  |
| POST   | `/admin/update`        | Update timetable (requires JWT token)  |

---

## 🧠 Admin Panel UI

- **Frontend** built using HTML/CSS/JS or React (customizable)
- Accessible at `/admin`
- Authenticated admin users can:
  - 🔎 View timetable in tabular form
  - ✏️ Add/Edit/Delete slots for any batch/day
  - 💾 Save changes (writes to MongoDB + syncs with Flutter app)

---

## 🌍 Environment Setup

Create a `.env` file with:

```env
MONGO_URI=your_mongodb_connection_string
API_KEY=public_api_key_for_flutter
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=secret_for_jwt_tokens
PORT=3000 # optional
````

---

## 🚀 Installation

```bash
git clone https://github.com/yourusername/timetable-api.git
cd timetable-api
npm install
npm start
```

---

## 📬 Sample API Usage

### Get Timetable (Flutter App):

```bash
curl -X GET http://localhost:3000/api/timetable \
  -H 'x-api-key: your_api_key'
```

### Admin Login:

```bash
curl -X POST http://localhost:3000/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin_username","password":"admin_password"}'
```

### Update Timetable:

```bash
curl -X POST http://localhost:3000/admin/update \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "jwt_token_here",
    "data": [
      {
        "batch": "CS-2023",
        "Monday": ["Maths", "Physics"],
        "Tuesday": ["Chemistry", "Lab"]
      }
    ]
  }'
```

---

## 🧱 MongoDB Data Structure

```js
{
  batch: String,           // e.g., "CS-2023"
  Monday: Array[String],
  Tuesday: Array[String],
  Wednesday: Array[String],
  Thursday: Array[String],
  Friday: Array[String],
  Saturday: Array[String]
}
```

---

## 📦 Dependencies

* express
* mongoose
* cors
* dotenv
* jsonwebtoken
* bcrypt (for password hashing)
* helmet

---

## 🙌 Future Enhancements

* 📊 Timetable analytics panel
* 📅 Calendar integration
* ✨ Role-based access (multi-admin)

---

## 🔗 License

MIT © \[Aman Verma]

```

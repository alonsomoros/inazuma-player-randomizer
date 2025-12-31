# Inazuma Player Randomizer

A full-stack application to randomize and view characters from the Inazuma Eleven series. This project consists of a Spring Boot backend for data management and a React/Vite frontend for the user interface.

## 🛠️ Technology Stack

### Backend

* **Language**: Java 17
* **Framework**: Spring Boot 3
* **Database**: MySQL
* **ORM**: Hibernate / JPA
* **Build Tool**: Maven

### Frontend

* **Framework**: React
* **Build Tool**: Vite
* **Language**: TypeScript
* **Styling**: TailwindCSS

---

## 🚀 Getting Started

### Prerequisites

* Java 17 JDK
* Node.js & npm
* MySQL Database (running on default port 3306)

### 1. Database Setup

Ensure you have a MySQL database named `inazuma_db` created. The application is configured to create/update tables automatically.

### 2. Backend Setup

The backend runs on port `8080`.

```bash
cd backend
mvn spring-boot:run
```

The application will automatically seed the database with character data from the CSV file upon first start.

### 3. Frontend Setup

The frontend runs on port `5173`.

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

* `GET /api/characters`: Retrieve a list of all characters.

---

## 📝 TODO

- [ ] **Hissatsu Implementation**: Add support for special moves (Hissatsu techniques) and link them to characters.
- [ ] **Team Builder**: Implement functionality for users to select and build custom teams.
- [ ] **Advanced Filtering**: Add filters for elements (Fire, Wind, etc.), positions, and stats.
- [ ] **Scout System**: Create a "gacha" or random scout mechanic to obtain players.
- [ ] **UI Polish**: Improve the frontend design with responsive layouts and better assets.

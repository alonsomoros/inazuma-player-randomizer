# Multi-stage build
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY backend/src ./src

# Copy frontend build
COPY frontend/dist ./src/main/resources/static

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage - Using Debian-based image for ARM compatibility
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

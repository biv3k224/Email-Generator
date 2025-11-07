# ================================
# 1️⃣ Build Stage: Compile JAR with Maven
# ================================
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app
COPY . .

# Build the JAR file (skip tests for faster build)
RUN mvn clean package -DskipTests

# ================================
# 2️⃣ Runtime Stage: Run the JAR with Temurin JDK 17
# ================================
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy the built JAR from the first stage
COPY --from=build /app/target/email.generator-0.0.1-SNAPSHOT.jar /app/email.jar

# Expose port 8080 (for Render)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "/app/email.jar"]

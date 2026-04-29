# Mail Service - Installation

This service handles outgoing email notifications using Express, RabbitMQ, and Nodemailer.

## Installations

Run the following commands in the `backend/mail` directory:

```bash
# Install all dependencies
npm install
```

### Manual Installation (if starting from scratch)
```bash
# Core
npm i express dotenv nodemailer amqplib

# Dev Dependencies
npm i -D typescript nodemon concurrently @types/express @types/dotenv @types/node @types/nodemailer @types/amqplib
```

## Environment Variables

Create a `.env` file in the `backend/mail` directory:

```env
PORT=5001
RABBITMQ_HOST=localhost
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=admin123
RABBITMQ_PORT=5672

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## Running the Service

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

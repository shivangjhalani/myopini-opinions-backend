# MyOpini Predictions API
Users can create predictions with expiry dates and submit opinions (Yes/No) with stakes(amount).

## Tech Stack

- **Backend Framework:** Node.js/Express
- **Database:** MongoDB with Mongoose ODM
- **Validation:** Express Validator
- **Testing:** Postman


## Testing

I have hosted the backend APIs at 152.67.8.190:3000 with local mongodb server.
The test collection is present in `myopini-test-collection.postman_collection.json` and the results are present in `myopini-test-collection.postman_test_run.json`

![alt text](<Screenshot From 2025-04-11 11-20-53.png>) ![alt text](<Screenshot From 2025-04-11 11-20-46.png>) ![alt text](<Screenshot From 2025-04-11 11-20-41.png>) ![alt text](<Screenshot From 2025-04-11 11-20-20.png>)


Or to run postman on your own: 
Use the provided Postman collection for testing all endpoints:
Import the collection from `myopini-test-collection.postman_collection.json` located in project root



## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher) and npm installed
- MongoDB Atlas account (or MongoDB installed locally)
- Postman for API testing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/myopini-opinions-backend.git
cd myopini-opinions-backend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a `.env` file in the project root, or copy `.env.example` (Have included mongodb atlas password for convinience purposes)
```env
MONGODB_URI=mongodb+srv://shivang:Cm3GOSOnxQFY9Q8o@myopini.dnktash.mongodb.net/?retryWrites=true&w=majority&appName=myopini
PORT=3000
```

2. Update MongoDB connection string in `.env` with your credentials

## Running the Project

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Create Prediction
```http
POST /api/prediction
```

Create a new prediction with an expiry date.

**Request Body:**
```json
{
  "question": "Will ChatGPT 5 be released in 2025?",
  "category": "Technology",
  "expiryTime": "2025-12-31T23:59:59Z"
}
```

**Success Response: (201 Created)**
```json
{
  "success": true,
  "message": "Prediction created successfully",
  "data": {
    "predictionId": "uuid-here"
  }
}
```

### Get Active Predictions
```http
GET /api/predictions/active
```

Retrieve all predictions that haven't expired.

**Success Response: (200 OK)**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "uuid-here",
      "question": "Will ChatGPT 5 be released in 2025?",
      "category": "Technology",
      "expiryTime": "2025-12-31T23:59:59Z",
      "createdAt": "2025-04-11T10:00:00Z"
    }
  ]
}
```

### Get Expired Predictions
```http
GET /api/predictions/expired
```

Retrieve all predictions that have expired.

**Success Response: (200 OK)**
```json
{
  "success": true,
  "count": 1,
  "data": [/* Similar structure to active predictions */]
}
```

### Submit Opinion
```http
POST /api/opinion
```

Submit an opinion on an active prediction.

**Request Body:**
```json
{
  "predictionId": "uuid-here",
  "userId": "user123",
  "opinion": "Yes",
  "amount": 100
}
```

**Success Response: (201 Created)**
```json
{
  "success": true,
  "message": "Opinion submitted successfully"
}
```

### Get Opinions
```http
GET /api/opinions
```

Get all opinions across all predictions.

### Get Opinions for Prediction
```http
GET /api/opinions/:predictionId
```

Get all opinions for a specific prediction.

## Error Responses

The API uses consistent error response formats:

**Validation Error (400 Bad Request)**
```json
{
  "status": "fail",
  "errors": [
    {
      "msg": "Question is required",
      "param": "question",
      "location": "body"
    }
  ]
}
```

**Not Found Error (404)**
```json
{
  "status": "fail",
  "error": "Prediction not found"
}
```

**Server Error (500)**
```json
{
  "status": "error",
  "error": "Internal Server Error"
}
```

## Development

The project follows a layered architecture:
- Routes: API endpoint definitions
- Controllers: Request handling and response formatting
- Services: Business logic
- Models: Database schemas and data access
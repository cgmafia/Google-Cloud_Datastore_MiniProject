# Cloud Datastore API

This project provides a REST API to manage customers in Google Cloud Datastore. It supports listing, filtering, adding, and deleting customers and includes OAuth2 authentication.

---

## **Features**
1. List all customers
2. Filter customers by ID
3. Add new customers
4. Delete customers
5. OAuth2 for user authentication

---

## **Infrastructure**
- **Backend**: Node.js with Express
- **Database**: Google Cloud Datastore
- **Deployment**: Google App Engine with Docker

---

## **Installation**

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd cloud-datastore-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Add Google Cloud credentials:
    - Place your GCP key file (JSON format) in `src/config/` and name it `key.json`.
    - Update `config.js` with your project ID and Datastore configurations.

---

## **Local Development**

1. Start the application:
    ```bash
    npm start
    ```

2. API Endpoints:
    - List all customers: `http://localhost:8080/oauth2callback/`
    - Get customer by ID: `http://localhost:8080/oauth2callback/id####`
    - Add a customer: POST to `http://localhost:8080/oauth2callback/`
    - Delete a customer: DELETE to `http://localhost:8080/oauth2callback/id####`

---

## **Dockerizing the Application**

1. Build the Docker image:
    ```bash
    docker build -t cloud-datastore-api .
    ```

2. Run the container locally:
    ```bash
    docker run -p 8080:8080 cloud-datastore-api
    ```

---

## **Deploying to Google Cloud App Engine**

1. Authenticate with GCP:
    ```bash
    gcloud auth login
    gcloud config set project [YOUR_PROJECT_ID]
    ```

2. Deploy the application:
    ```bash
    gcloud app deploy
    ```

3. Access the application:
    ```bash
    gcloud app browse
    ```

---

## **Scaling and Monitoring**
- Google App Engine automatically scales based on traffic.
- Use the GCP Console for monitoring logs and performance metrics.

---

## **Environment Variables**
Set the following environment variables in `app.yaml` or `.env`:
- `NODE_ENV`: `production`
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to your GCP key file.

---

## **License**
@Anand Venkataraman

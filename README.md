SIT737 : Task 6.2C - Deploy and Update a Node.js Application on Kubernetes
=========================================================================

1\. Overview
------------

In this task, we interact with a Kubernetes cluster to deploy a Node.js application, verify its deployment, and update the application with new changes. The task is divided into two parts:

-   **Part I**: Interact with the deployed application using `kubectl` commands to port-forward traffic and access it through a web browser.

-   **Part II**: Update the Node.js application code, rebuild the Docker image with a new version, and update the Kubernetes deployment.

2\. Tools Required
------------------

Before starting, ensure the following tools are installed:

-   **Git** (Version Control)

-   **Visual Studio Code** (Code Editor)

-   **Node.js** (Runtime for Building the Application)

-   **Docker** (Containerization Platform)

-   **Kubernetes** (Container Orchestration Platform)

-   **kubectl** (Command-Line Tool for Kubernetes)

3\. Part I: Interact with the Deployed Application
--------------------------------------------------

### Step 1: Verify Application Status

Use the following commands to check the status of pods and services:

-   **Verify Pods**:

    `kubectl get pods`


`NAME                                   READY   STATUS    RESTARTS   AGE
node-app-deployment-7cb7fc5d54-fsvwp   1/1     Running   0          3h51m
node-app-deployment-7cb7fc5d54-n589g   1/1     Running   0          4h2m`

-   **Verify Services**:

    `kubectl get services`

This lists all services in the cluster, including the `node-app-service`.

### Step 2: Port-Forward to Access the Application

Forward a local port to the service port:


`kubectl port-forward service/node-app-service 8080:3001`

This maps `localhost:8080` to the Kubernetes service running on port 3001.

### Step 3: Access the Application in the Browser

Open a web browser and visit:


`http://localhost:8080`

The application should display, confirming it is running correctly.

4\. Part II: Update the Application
-----------------------------------

### Step 1: Modify the Application Code

Update the application functionality by modifying:

-   `server.js`

-   `index.html`

### Step 2: Build a New Docker Image

Build the updated application Docker image:

`docker build -t anandishika07/my-app:v2 .`

The `-t` flag tags the image with version `v2`.

### Step 3: Push the Docker Image to a Registry

Push the newly built image to Docker Hub:

`docker push anandishika07/my-app:v2`

### Step 4: Update Kubernetes Deployment

Update the `deployment.yaml` to use the new image:

`apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
      - name: node-app
        image: anandishika07/my-app:v2
        ports:
        - containerPort: 3001
      imagePullSecrets:
      - name: regcred`

Apply the updated deployment configuration:

`kubectl apply -f deployment.yaml`

### Step 5: Verify the Update

Check that new pods are created using the updated image:


`kubectl get pods`

### Step 6: Access the Updated Application

Forward local traffic to the updated application:


`kubectl port-forward service/node-app-service 3001:80`

Then, visit:

`http://localhost:3001`

to view the updated application.

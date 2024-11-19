# Universities Management API

An API-only Ruby on Rails application for managing universities, including CRUD operations and comprehensive validations.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
    - [List Universities](#list-universities)
    - [Get University by ID](#get-university-by-id)
    - [Create University](#create-university)
    - [Update University](#update-university)
    - [Delete University](#delete-university)
- [Validation and Error Handling](#validation-and-error-handling)
- [Testing](#testing)
- [Code Style and Linting](#code-style-and-linting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Introduction

The **Universities Management API** is a backend service designed to manage a repository of universities and their information. It provides RESTful endpoints for creating, reading, updating, and deleting university records. The API includes comprehensive validations to ensure data integrity and follows best practices for code structure, testing, and style.

---

## Features

- **CRUD Operations**: Create, read, update, and delete universities.
- **Data Validation**: Ensures all fields are present and correctly formatted.
- **Error Handling**: Provides meaningful error messages for invalid requests.
- **Testing**: Includes unit tests for models and controllers using RSpec.
- **Code Quality**: Enforces style guidelines using RuboCop.
- **API-Only Application**: Optimized for serving JSON responses.

---

## Technology Stack

- **Ruby**: 3.0.x or higher
- **Ruby on Rails**: 7.0.x (API-only)
- **PostgreSQL**: Relational database
- **RSpec**: Testing framework
- **RuboCop**: Code style enforcement
- **Active Model Serializers**: JSON serialization

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Ruby**: Version 3.0.x or higher
- **Ruby on Rails**: Version 7.0.x
- **PostgreSQL**: Latest version
- **Bundler**: For managing Ruby gems

---

## Getting Started

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/axlcr/universities-management.git
   cd universities-management
   ```

2. **Install Dependencies**

   ```bash
   bundle install
   ```

### Database Setup

1. **Configure Database Credentials**

   Update the `config/database.yml` file with your PostgreSQL username and password.

   ```yaml
   default: &default
     adapter: postgresql
     encoding: unicode
     username: your_username    # Replace with your PostgreSQL username (i use by default "postgres")
     password: your_password    # Replace with your PostgreSQL password (i use by default an empty passoword)
     host: localhost
     pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
   ```

2. **Create and Migrate the Database**

   ```bash
   rails db:create
   rails db:migrate
   ```

### Running the Server

Start the Rails server:

```bash
rails server
```

By default, the server runs on `http://localhost:3000`.

---

## API Documentation

### Authentication

This API does not require authentication. All endpoints are publicly accessible.

### Endpoints

#### Base URL

```
http://localhost:3000/api/v1
```

#### List Universities

- **Endpoint:** `GET /universities`
- **Description:** Retrieves a list of all universities.

**Request:**

```bash
GET /api/v1/universities
```

**Response:**

- **Status Code:** `200 OK`
- **Body:**

  ```json
  [
    {
      "id": 1,
      "name": "Sample University",
      "location": "Sample City",
      "website": "https://www.sampleuniversity.edu",
      "contact_emails": ["info@sampleuniversity.edu", "admissions@sampleuniversity.edu"],
      "created_at": "2024-11-17T12:34:56Z",
      "updated_at": "2024-11-17T12:34:56Z"
    },
    {
      "id": 2,
      "name": "Another University",
      "location": "Another City",
      "website": "https://www.anotheruniversity.edu",
      "contact_emails": ["contact@anotheruniversity.edu"],
      "created_at": "2024-11-17T13:45:67Z",
      "updated_at": "2024-11-17T13:45:67Z"
    }
  ]
  ```

---

## Validation and Error Handling

The API includes comprehensive validations for all fields:

- **Name**: Must be present.
- **Location**: Must be present.
- **Website**: Must be a valid URL starting with `http` or `https`.
- **Contact Emails**:
  - Must be present and contain at least one email.
  - Each email must be in a valid email format.

---

## Testing

Run all tests using RSpec:

```bash
bundle exec rspec
```

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Contact
Axl Blandon

- **Email**: axlblandonm@gmail.com
- **GitHub**: axlcr
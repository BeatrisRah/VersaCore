# VersaCore
Express server for running multiple projects.

| Contents
|---
| [Usage](#usage)
| [Authorization](#authorization)
| [Collections](#collections)
| - [Users](#users)
| - [Chatrooms](#chatrooms)
| - [Messages](#messages)


## 📁 Collections

>### Users

### Login User

  `POST /api/users/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "user1",
  "password": "securePassword"
}

```

**Response:**

```json
{
  "email": "user@example.com",
  "username": "user1",
  "id":"1",
  "token":"JWT token"
}

```
----

### Register User

  `POST /api/users/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "user1",
  "password": "securePassword",
  "rePass": "password repeate"
}

```

**Response:**

```json
{
  "email": "user@example.com",
  "username": "user1",
  "id":"1",
  "token":"JWT token"
}

```

>### Chatrooms



## Authorization

### Sending an Auth Request

To send an authorized request, the user's token must be put in the **header** of the request.

**Request Options:**  

```json
{
    "method":"...",
    "header": {"authorization": "USER TOKEN"},
    "body":{"..."}
}

```

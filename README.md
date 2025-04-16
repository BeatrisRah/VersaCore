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

### Get All Chats
`GET /api/chatrooms`

**Response:**  
Array containing objects of chatrooms

```json
[
    {...chatroom details}
]

```
----

### Get Users Chatrooms
`GET /api/users/:userId/chatrooms`  
_TODO: Only set user can get their chatrooms._

**Response:**

```json
{
  "joinedRooms": [{Objects of User's joined rooms}],
  "ownedRooms": [{Objects of User's owned rooms}]

}

```

----
### Create a Chatroom
[This is an auth request!!](#authorization)

`POST /api/chatrooms`
**Request Body:**

```json
{
  "title": "Chatroom1",
  "description": "Some desc",
  "imageURL": "Image URL"
}

```

**Response:**

```json
{
  "id": "DB generated ID",
  "title": "Chatroom1",
  "description": "Some desc",
  "imageURL": "Image URL",
  "visibility": "Image URL",
  "owner": "User's Id",
  "members": "Empty array",
  "messages": "Empty array",
  "createdAt":"Time stamp"

}

```
---
### Getting One Chatroom

`GET /api/chatrooms/:chatroomId`

**Response:**

```json
{
  "id": "DB generated ID",
  "title": "Chatroom1",
  "description": "Some desc",
  "imageURL": "Image URL",
  "visibility": "Image URL",
  "owner": "User's Id",
  "members": "Array of Users",
  "messages": "Array of Messages",
  "createdAt":"Time stamp"

}
```


---

### Joining a Chatroom
[This is an auth request!!](#authorization)

`GET /api/chatrooms/:chatroomId/join`

**Response:** None

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

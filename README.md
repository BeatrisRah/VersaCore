# VersaCore
Express server for running multiple projects.

| Contents
|---
| [Usage](#usage)
| [Authorization](#authorization)
| [Chat Socket](#chat-socket)
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

[This is an auth request!!](#authorization)

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
  "chatroom":{
    "_id": "...",
      "title": "...",
      "description": "...",
      "imageURL": "...",
      "owner": "...",
      "members": [
          {
              "_id": "...",
              "username": "...",
              "__v": 0
          }
      ],
      "messages":[
        "..."
      ]
  },
  "messages":[
    {
      "_id": "...",
      "chatroom": "...",
      "sender": {
          "_id": "...",
          "username": "...",
          "__v": 0
          }
    }
  ]

}
```


---

### Joining a Chatroom
[This is an auth request!!](#authorization)

`GET /api/chatrooms/:chatroomId/join`

**Response:** None

## Chat Socket
### Real time chatting with socket.io

__URL__: `/chatrooms`



| **Event** | Name              | Params (?)                | Desc                                    |
|-----------|-------------------|---------------------------|-----------------------------------------|
| **On**    | `join_room`       | `roomId`                  | Client joins room                 |
|           | `send_message`    | `chatroom, sender, content` | Client sends a message to server      |
| **Emit**  | `receive_message` | `chat`                    | Broadcast to everyone in the room |
|           |                   |                           |                                         |


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

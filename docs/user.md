### POST /api/users/registration

This endpoint is used to register a new user with the provided information.

#### Request Body

```json
{
  "name": "User test 7",
  "identityNumber": "070707",
  "accountNumber": "0007",
  "emailAddress": "user7@gmail.com",
  "username": "user7",
  "password": "user7"
}
```

#### Success Response

```json
{
  "code": 201,
  "message": "User created successfully",
  "data": {
    "_id": "6726eee0969efe66d5d92013",
    "name": "User test 1",
    "identityNumber": "010101",
    "accountNumber": "0001",
    "emailAddress": "user1@gmail.com",
    "username": "user1"
  }
}
```

#### Error Response

```json
{
  "code": 0,
  "errors": "Error message"
}
```

### POST /api/users/login

This endpoint allows users to log in by providing their username and password.

#### Request Body

- `username` (string) - The username of the user.
- `password` (string) - The password of the user.

```json
{
  "username": "user5",
  "password": "user5"
}
```

#### Response

- Status: 200 OK
- Content-Type: application/json
- `code` (integer) - The status code of the response.
- `message` (string) - A message related to the response.
- `data` (object)
  - `token` (string) - The authentication token for the logged in user.

```json
{
  "code": 200,
  "message": "Successfully logged in",
  "data": {
    "token": "string"
  }
}
```

### Get /api/users

This endpoint retrieves a list of users.

#### Request Body

This request does not require a request body.

#### Request Header

```
Authorization: Bearer {token}
```

#### Response

- Status: 200
- Content-Type: application/json

Example response body:

```json
{
  "code": 0,
  "message": "",
  "data": [
    {
      "_id": "",
      "name": "",
      "identityNumber": "",
      "accountNumber": ""
    }
  ]
}
```

#### Error Response

```json
{
  "code": 0,
  "errors": "Error message"
}
```

### GET /api/users/by-identity/{identityNumber}

This endpoint retrieves user information based on the provided identity number.

#### Request

No request body parameters required.

- `identityNumber` (path parameter) - The unique identity number of the user.

#### Request Header

```
Authorization: Bearer {token}
```

#### Response

The response will be a JSON object with the following schema:

```json
{
  "code": 200,
  "message": "Successfully retrieved user",
  "data": {
    "_id": "6726f3e7676b5b82123fa2d5",
    "name": "User test 7",
    "identityNumber": "070707",
    "accountNumber": "0007",
    "emailAddress": "user7@gmail.com",
    "username": "user7"
  }
}
```

#### Error Response

```json
{
  "code": 0,
  "errors": "Error message"
}
```

### GET /api/users/by-account/{accountNumber}

This endpoint retrieves user information based on the provided identity number.

#### Request

No request body parameters required.

- `accountNumber` (path parameter) - The unique account number of the user.

#### Request Header

```
Authorization: Bearer {token}
```

#### Response

The response will be a JSON object with the following schema:

```json
{
  "code": 200,
  "message": "Successfully retrieved user",
  "data": {
    "_id": "6726f3e7676b5b82123fa2d5",
    "name": "User test 7",
    "identityNumber": "070707",
    "accountNumber": "0007",
    "emailAddress": "user7@gmail.com",
    "username": "user7"
  }
}
```

#### Error Response

```json
{
  "code": 0,
  "errors": "Error message"
}
```

### PATCH /api/users/update

This endpoint allows updating logged in user information via an HTTP PATCH request

### Request Body

- emailAddress (string) : The updated email address of the current user. (optional)
- name (string) : The updated name of the current user. (optional)
- password (string) : The updated password of the current user (optional)

```json
{
  "emailAddress": "user7-revision1@gmail.com",
  "name": "user7-revision1",
  "password": "user7new"
}
```

#### Request Header

```
Authorization: Bearer {token}
```

### Response

The response is in JSON format and has the following schema:

```json
{
  "code": 200,
  "message": "Successfully updated current user",
  "data": {
    "identityNumber": "070707"
  }
}
```

#### Error Response

```json
{
  "code": 0,
  "errors": "Error message"
}
```

### DELETE /api/users/delete

This API endpoint is used to delete a logged in user.

#### Request Header

```
Authorization: Bearer {token}
```

#### Response

The response for this request is a JSON object with the following schema:

```json
{
  "code": 200,
  "message": "Successfully deleted user",
  "data": null
}
```

#### Error Response

```json
{
  "code": 0,
  "errors": "Error message"
}
```

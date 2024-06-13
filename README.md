# Project Management API

---

## API Documentation

This is a REST Api created for the project management API lesson for the Ironhack bootcamp.
Below you will find the available endpoints

### Projects

| HTTP Verb | URL                    | Request Body | Action                        |
| --------- | ---------------------- | ------------ | ----------------------------- |
| POST      | `/projects`            | JSON         | Creates a new project         |
| GET       | `/projects`            | (empty)      | Returns all the projects      |
| GET       | `/projects/:projectId` | (empty)      | Returns the specified project |
| PUT       | `/projects/:projectId` | JSON         | Edits the specified project   |
| DELETE    | `/projects/:projectId` | (empty)      | Deletes the specified project |

### Tasks

| HTTP Verb | URL      | Request Body | Action             |
| --------- | -------- | ------------ | ------------------ |
| POST      | `/tasks` | JSON         | Creates a new task |

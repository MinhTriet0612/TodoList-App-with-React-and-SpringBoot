# Simple ToDoList App:
Using for: 
Person need to manage task must to do in the future.

## Step set up and run: 
Have two branch: FrontEnd and BackEnd
### 1.DataBase: run this below schema:
```ruby
create table task
(
    id       int auto_increment
        primary key,
    status   varchar(45)  null,
    priority varchar(45)  null,
    title    varchar(45)  null,
    note     varchar(100) null
)
    charset = latin1;
```
### 2.BackEnd: Clone BackEnd branch, config database, maven file and then run code in Intellij, Intellij will config automatically.
### 3.FrontEnd: Clone Fronend branch, run "npm install" and then run "npm start". 
### 4.Open http://localhost:3000/ and test.

## Author
Minh Triet




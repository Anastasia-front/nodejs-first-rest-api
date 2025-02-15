# Table of content

- [Postman](#Postman)
  - [Routes "user"](#routes-"user")  
  - [Routes "contact"](#routes-"contact")
- [Swagger documentation](#swagger-documentation)

## English Version

For the document in English, visit: [README.md](README.md)

# Postman

Щоб перевірити роботу REST API пиши так:

## Routes "user"

### POST http://localhost:3000/api/user/register

Отримує body в форматі {email, password, subscription} (перші два поля обов'язкові, всі поля мають бути стрінгами, валідація присутня) <br>
`Відповідь` &mdash; при помилці валідації повертається "Помилка від Joi або іншої бібліотеки валідації" зі статусом 400; якщо пошта вже використовується кимось іншим повертається ResponseBody: {"message": "Email in use"} зі статусом 409; якщо з body все добре повертається об'єкт наступного виду {
"user": {
"email": "example@example.com",
"subscription": "starter"
}
} і статусом 201 (поле subscription додається по замовчуванню, якщо його не вказати при реєстрації через налаштування моделі "user" - subscription: {
type: String,
enum: ["starter", "pro", "business"],
default: "starter"
})

### POST http://localhost:3000/api/user/login

Отримує body в форматі {email, password} (всі поля обов'язкові та мають бути стрінгами, валідація присутня) <br>
`Відповідь` &mdash; при помилці валідації повертається "Помилка від Joi або іншої бібліотеки валідації" зі статусом 400; якщо пароль або email невірний повертається ResponseBody: {"message": "Email or password is wrong"} зі статусом 401; якщо з body все добре шукається пароль для користувача в БД, якщо пароль знаходиться створюється токен, зберігається в поточному полі юзера і повертається об'єкт наступного виду ResponseBody: {
"token": "exampletoken",
"user": {
"email": "example@example.com",
"subscription": "starter"
}
} і статусом 200

### POST http://localhost:3000/api/user/logout

Отримує пусте body з обовʼязковим заголовком Authorization: "Bearer {{token}}" <br>
`Відповідь` &mdash; якщо користувача у моделі "user" за \_id не існує повертається ResponseBody: {"message": "Not authorized"} і статус 401; в іншому випадку, видаляється токен у поточного юзера і повертається статус 204

### GET http://localhost:3000/api/user/current

Запит відправляється з обовʼязковим заголовком Authorization: "Bearer {{token}}" <br>
`Відповідь` &mdash; якщо користувача не існує повертається ResponseBody: {"message": "Not authorized"} і статус 401; в іншому випадку повертається ResponseBody: {
"email": "example@example.com",
"subscription": "starter"
} і статус 200

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm run lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок


## Routes "contact"

### GET http://localhost:3000/api/contact

`Відповідь` &mdash; повертається масив всіх контактів в json-форматі зі статусом 200

### GET http://localhost:3000/api/contact/:id

`Відповідь` &mdash; якщо такий id є, повертається об'єкт контакту в json-форматі зі статусом 200;
якщо такого id немає, повертається json з ключем "message": "not found" і статусом 404

### POST http://localhost:3000/api/contact

Отримує body в форматі {name, email, phone} (усі поля обов'язкові та мають бути стрінгами) <br>
`Відповідь` &mdash; якщо в body немає якихось обов'язкових полів або вони не строки, повертається json з ключем {"message": "missing required field(s) / non-string field(s)"} і статусом 400; якщо з body все добре, додає унікальний ідентифікатор в об'єкт контакту i повертається об'єкт з доданим id {id, name, email, phone} і статусом 201

### DELETE http://localhost:3000/api/contact/:id

`Відповідь` &mdash; якщо такий id є, повертається json формату {"message": "contact deleted"} і статусом 200;
якщо такого id немає, повертається json з ключем "message": "not found" і статусом 404

### PUT http://localhost:3000/api/contact/:id

Отримує body в json-форматі c оновленням будь-яких полів name, email и phone (валідадія присутня як у додавані контакту)<br>
`Відповідь` &mdash; якщо з body всe добре - повертається оновлений об'єкт контакту зі статусом 200, інакше повертається json з ключем "message": "not found" і статусом 404

### PATCH http://localhost:3000/api/contact/:id/favorite

Отримує body в json-форматі з оновленням поля favorite (має бути значення boolean)<br>
`Відповідь` &mdash; якщо в body немає якихось обов'язкових полів або вони не строки, повертається json з ключем {"message":"missing field favorite"} і статусом 400; якщо з body всe добре - повертається оновлений об'єкт контакту зі статусом 200, інакше повертається json з ключем "message": "not found" і статусом 404


# Swagger documentation 
Link to documentation:</br>
https://contacts-backend-eikd.onrender.com/api-docs/
![screenshot](./public/screenshots/1.png)
![screenshot](./public/screenshots/2.png)
![screenshot](./public/screenshots/3.png)
![screenshot](./public/screenshots/4.png)
# Postman

Щоб перевірити роботу REST API пиши так:

### GET http://localhost:3000/api/contacts

`Відповідь` &mdash; повертається масив всіх контактів в json-форматі зі статусом 200

### GET http://localhost:3000/api/contacts/:id

`Відповідь` &mdash; якщо такий id є, повертається об'єкт контакту в json-форматі зі статусом 200;
якщо такого id немає, повертається json з ключем "message": "not found" і статусом 404

### POST http://localhost:3000/api/contacts

Отримує body в форматі {name, email, phone} (усі поля обов'язкові та мають бути стрінгами) <br>
`Відповідь` &mdash; якщо в body немає якихось обов'язкових полів або вони не строки, повертається json з ключем {"message": "missing required field(s) / non-string field(s)"} і статусом 400; якщо з body все добре, додає унікальний ідентифікатор в об'єкт контакту i повертається об'єкт з доданим id {id, name, email, phone} і статусом 201

### DELETE http://localhost:3000/api/contacts/:id

`Відповідь` &mdash; якщо такий id є, повертається json формату {"message": "contact deleted"} і статусом 200;
якщо такого id немає, повертається json з ключем "message": "not found" і статусом 404

### PUT http://localhost:3000/api/contacts/:id

Отримує body в json-форматі p оновленням будь-яких полів name, email и phone (валідадія присутня як у додавані контакту)<br>
`Відповідь` &mdash; якщо з body всe добре - повертається оновлений об'єкт контакту зі статусом 200, інакше повертається json з ключем "message": "not found" і статусом 404

### PATCH http://localhost:3000/api/contacts/:id/favorite

Отримує body в json-форматі з оновленням поля favorite (має бути значення boolean)<br>
`Відповідь` &mdash; якщо в body немає якихось обов'язкових полів або вони не строки, повертається json з ключем {"message":"missing field favorite"} і статусом 400; якщо з body всe добре - повертається оновлений об'єкт контакту зі статусом 200, інакше повертається json з ключем "message": "not found" і статусом 404

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm run lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

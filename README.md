Вот обновленный `README.md` без упоминаний Heroku и Vercel, с добавлением Render:  

---

# 📖 Contact Book  

### 📌 О проекте  
Contact Book — это веб-приложение для управления контактами. Пользователи могут регистрироваться, входить в систему и управлять своими контактами.  

### 🚀 Деплой  
Приложение развернуто на **Render**:  
🔗 **Frontend**: [https://contact-book-nk37.onrender.com](https://contact-book-nk37.onrender.com)  
🔗 **Backend API**: [https://contact-book-nk37.onrender.com/api](https://contact-book-nk37.onrender.com/api)  

### 📌 Функционал  
- Регистрация и авторизация пользователей  
- Хранение контактов (имя, email, телефон)  
- CRUD-операции с контактами  
- JWT-аутентификация  
- Подключение к MongoDB  

### 🛠️ Технологии  
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)  
- **Backend**: Node.js, Express.js  
- **База данных**: MongoDB (через Mongoose)  
- **Деплой**: [Render](https://render.com)  

### 📌 Установка локально  
1. **Клонировать репозиторий**  
   ```sh
   git clone https://github.com/kaireshov/contact-book.git
   cd contact-book
   ```

2. **Установить зависимости**  
   ```sh
   npm install
   ```

3. **Запустить сервер**  
   ```sh
   npm start
   ```
   API будет доступен на `http://localhost:10000`  

### 📌 Переменные окружения (`.env`)  
Создайте `.env` файл в корне проекта и добавьте:  
   ```env
   JWT_SECRET=+FIJZ3LJWk3Kqu8GsZCNkvBn+Zs+D/eWW+hVNEnMofE=
   MONGO_URI=mongodb+srv://admin:pass123@cluster0.1pagp.mongodb.net/contact_book?retryWrites=true&w=majority&appName=Cluster0
   PORT=10000
   ```

### 📌 API Эндпоинты  
| Метод | Эндпоинт | Описание |
|--------|-----------|-------------|
| `POST` | `/auth/register` | Регистрация нового пользователя |
| `POST` | `/auth/login` | Авторизация пользователя |
| `GET` | `/contacts` | Получение всех контактов пользователя |
| `POST` | `/contacts` | Добавление нового контакта |
| `PUT` | `/contacts/:id` | Обновление контакта |
| `DELETE` | `/contacts/:id` | Удаление контакта |


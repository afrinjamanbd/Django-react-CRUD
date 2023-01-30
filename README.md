# Django React CRUD App

### RUN THE DJANGO BACKEND

1. Install python 3.10.6 (with pip)

2. Go to the backend/assignment/settings.py and update the database name, user, password info in django database according to your postgres database info, to connect the app with your database table.

	```DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '',
        'USER' : '',
        'PASSWORD' : '',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}	```

3. Open command prompt, go to the backend directory and type `pip install -r requirements.txt` 

4. After successful installation type `python manage.py makemigrations` and then press enter 

5. Type `python manage.py migrate` and then press enter 

6. Type `python manage.py runserver` and then press enter . This will run the app on 127.0.0.1:8000 host.

7. Open this link on web browser `http://127.0.0.1:8000/api/events/`

8. Feel free to explore other api endpoints mentioned in the task!

9. Open another command prompt go to the frontend directory and type `npm i`

10. After the installation type `npm start` to start the react server on `http://localhost:3000/` 

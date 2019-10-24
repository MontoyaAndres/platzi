# No lo termine porque puedo hacer la misma cosa con Node.js.

https://platzi.com/clases/1318-django/12405-creacion-de-la-primera-app/

# Platzigram

Create a minimal project (inspired by instagram) in Django.

![](https://i.imgur.com/4VotR0d.png)

## Dependencies
Python 3
Django

## Usage
```shell
python3 -m venv .env
source .env/bin/activate
pip install -r requirements.txt
```

```python
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Tips

Check dependencies

```python
pip freeze
```

Create project in the current folder

```python
django-admin startproject platzigram .
```

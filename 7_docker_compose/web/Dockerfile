FROM python:3.8-slim-buster
CMD mkdir /app
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install uvicorn

COPY . /app

EXPOSE 8080

CMD [ "uvicorn", "--port=8080", "main:app", "--host=0.0.0.0"]

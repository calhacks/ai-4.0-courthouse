FROM python:3.9.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements-local.txt requirements.txt

RUN python -m pip install "pip<24.1" setuptools wheel
RUN pip install -r requirements.txt

COPY . .

CMD python initialize.py && gunicorn -b 0.0.0.0:$PORT courthouse:app
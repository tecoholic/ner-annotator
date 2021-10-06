FROM python:3 as builder
RUN apt-get update \
	&& apt-get install build-essential -y \
	&& apt-get clean
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --user --no-cache-dir -r requirements.txt
COPY ./server.py ./server.py

FROM python:3-slim as app
COPY --from=builder /root/.local /root/.local
COPY --from=builder /usr/src/app/server.py /app/server.py
WORKDIR /app
COPY ./server.py ./server.py
EXPOSE 5555
CMD ["python", "./server.py"]

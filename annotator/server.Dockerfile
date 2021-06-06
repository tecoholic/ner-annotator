FROM python:3-slim
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./server.py ./server.py
EXPOSE 5555
CMD ["python", "./server.py"]
FROM nikolaik/python-nodejs:python3.9-nodejs12
RUN apt-get update && apt-get install build-essential -y
WORKDIR /usr/src/app
COPY ./ ui/
WORKDIR /usr/src/app/ui
RUN yarn install
CMD ["yarn", "serve"]
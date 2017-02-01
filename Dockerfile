FROM node:6.9.4-wheezy

MAINTAINER Vatseek "vadim.gumennyj@gmail.com"

RUN apt-get update

RUN apt-get install -y git

EXPOSE 5000
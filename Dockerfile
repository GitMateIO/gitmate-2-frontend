FROM node:7-slim
MAINTAINER Muhammad Kaisar Arkhan <yukinagato@protonmail.com>

ENV ROOT=/usr/src/app/frontend

EXPOSE 4200

ADD . $ROOT
WORKDIR $ROOT

RUN npm install -g @angular/cli && \
    npm install

VOLUME $ROOT/dist

RUN ng build -prod

CMD ng serve --host 0.0.0.0

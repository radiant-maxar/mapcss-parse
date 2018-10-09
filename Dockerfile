FROM node:10.7.0-slim
RUN mkdir /home/mapcss-parse
COPY ./ /home/mapcss-parse
WORKDIR /home/mapcss-parse
RUN echo "DOWNLOAD DEPENDENCIES" \
    && npm install
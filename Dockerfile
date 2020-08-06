FROM node

COPY . /home/derucci-consumer

RUN cd /home/derucci-consumer; npm install

EXPOSE 3001

CMD ["node","/home/derucci-consumer/bin/www"]
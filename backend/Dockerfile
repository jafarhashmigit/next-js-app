FROM node:15

ENV PORT=8080
ENV MONGO_URL=mongodb://
ENV MONGO_PASSWORD=jcnCTD9eYm9mwbSW
ENV MONGO_USER=logicon
ENV MONGO_HOST=54.161.128.71
ENV MONGO_PORT=27017
ENV MONGO_NAME=axehedgedev
ENV BASE_URL=
ENV SENDGRID_APIKEY=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
ENV EMAIL_FROM=hamza.shakir@logicon.com.pk
ENV SENDERGRID_URL=https://api.sendgrid.com/v3/mail/send
ENV SENDERGRID_NEW_USER_CODE=d-54da075167134152a04d2da43e2cc6d2
ENV JWTSECRET=sdwwwdwdfwryqcbr23v326vbuwvn42nv7v2b4v43v4n74nb423abn4bn34b67587nq34bv43qbv
ENV FACEBOOK_CLIENT_ID=wdwdfwqcny3qurby13bvrt3
ENV FACEBOOK_CLIENT_SECRET=wdwdfwqcny3qurby13bvrt3
ENV OWNER_FACEBOOK_CALLBACK=wdwdfwqcny3qurby13bvrt3
ENV GOOGLE_CLIENT_ID=dwnwdudnbcr37vb387b5v28
ENV GOOGLE_CLIENT_SECRET=dwnwdudnbcr37vb387b5v28
ENV OWNER_GOOGLE_CALLBACK=dwnwdudnbcr37vb387b5v28
ENV TWITTER_CLIENT_ID=dwidjwimcqwnrvq3nvr3
ENV TWITTER_CLIENT_SECRET=dwidjwimcqwnrvq3nvr3
ENV OWNER_TWITTER_CALLBACK=dwidjwimcqwnrvq3nvr3
ENV TOKEN_EXPIRY=30d
ENV HASH_ALGO=sha256
ENV SALT=14d96b8243ff4c41c67f7de901ad51f3

COPY . /app

WORKDIR /app

#RUN npm install

#RUN npm install nodemon --save-dev
#RUN npm install nodemon -g
EXPOSE 8080

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]

#CMD ["npm","run", "start:dev"]

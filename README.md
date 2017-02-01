# Comedian

## Install & Run
- Install requirements
```
npm instal
```

- Install mongo docker container
```bash
docker run -p 27017:27017 --name comedy-mongo -d mongo --storageEngine wiredTiger
```

- Run back server
```bash
npm run server
```


# Copyright
VatSeek, 2016.



docker build -t vatseek/node_app .
docker run -p 5000:5000 --name web-ppp -d vatseek/node_app
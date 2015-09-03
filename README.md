# Fusion Day '15

## Building Microservices, Together!

### Installing

```
$ git clone https://github.com/hunterloftis/fusionday-15.git
$ cd fusionday-15
$ npm install
```

### Running

*OSX/Linux:*

```
$ export CLOUDAMQP_URL='amqp://ptdbuyfw:BYgPxMlPvrvoEh6dP3oZQYaHlabgOC9B@owl.rmq.cloudamqp.com/ptdbuyfw'
```

*Windows:*

```
set CLOUDAMQP_URL=amqp://ptdbuyfw:BYgPxMlPvrvoEh6dP3oZQYaHlabgOC9B@owl.rmq.cloudamqp.com/ptdbuyfw
```

*Both:*

```
$ npm run {service_name}
```

For example:

```
$ npm run web
$ npm run location
$ npm run animal
$ npm run message
```

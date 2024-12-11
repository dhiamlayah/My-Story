import { Eureka } from 'eureka-js-client';



export const client = new Eureka({
    instance: {
      app: 'nestjs-app', // Name of your application
      instanceId: `nestjs-app:${process.env.HOST ?? 'localhost'}:${process.env.PORT ?? 3001}`,
      hostName: process.env.HOST ?? 'localhost',
      ipAddr: '127.0.0.1', // Replace with your app's IP address
      statusPageUrl: `http://${process.env.HOST ?? 'localhost'}:${process.env.PORT ?? 3001}/actuator/info`, // Replace with your app's info URL
      port: {
        $: process.env.PORT ?? 3001,
        '@enabled': true,
      },
      vipAddress: 'nestjs-app',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: 'localhost', // Eureka server host
      port: 8761, // Eureka server port
      servicePath: '/eureka/apps/',
    },
  });
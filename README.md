# AirTrik React 
This is a react package of Airtrik. It is also compatible with React Native.

# Installation
To install use the following command:  
```npm i airtrik-react```

# Usage  
## Import the package
 ``` import * as airtrik from 'airtrik-react'```
 
 ## Initialization  
 To initialize, use the init() function.
 
 
 init() function has 1 required parameter/arguement and two other optional arguements.
 
 1. The first arguement is the `__APP_KEY__` which is required. Without the key, no other functions are possible.
 
  ``` 
      import * as airtrik from 'airtrik-react'  
      ...
      ...
      airtrik.init(__APP_KEY__)
  ```
  To get the `__APP_KEY__` signup on [https://airtrik.com](https://airtrik.com/) and create app and device on platform.
  
 2. The second optional arguement is a callback function which will be executed when the connection is established between the server and the client. This is mainly written so that if 
 user wants to do some work when connection is established like showing up a message.
``` 
      import * as airtrik from 'airtrik-react'  
      ...
      ...
      function onConnect(){
        console.log("Connected")
      }
      airtrik.init(__APP_KEY__,onConnect)
  ```
  3. The third optional arguement is a callback function which will be executed when we receive a message from the server.
  ``` 
      import * as airtrik from 'airtrik-react'  
      ...
      ...
      function onConnect(){
        console.log("Connected")
      }
      function onReceive(message,deviceId){
        console.log("Message Received")
        console.log("message   : ",message)
        console.log("Device Id : ",deviceId)
      }
      airtrik.init(__APP_KEY__,onConnect,onReceive)
  ```
All the callbacks are ES6 Compatible.

## Message Sending and Receiving

The package supports sending and subscribing of messages which is done by following functions:
1. send()
2. subscribe()

To send a message to the server use send(). send() function has two parameters, 1. deviceId 2. message. send() can only be called when there is a connection already established
or else it will throw errors.

``` airtrik.send("__DEVICE_ID__","__MESSAGE__")```

To subscribe to a topic use subscribe(). subscribe() has one parameter which is deviceID. Subscribe can only be called when there is a connection established or else it will throw error.  
```airtrik.subscribe(__DEVICE_ID__)```


  
 

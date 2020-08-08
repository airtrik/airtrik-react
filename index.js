import  axios  from 'axios'
import Paho from 'paho-mqtt'
var username = "";
var password = "";
var AIRTRIK_KEY = ""
var AIRTRIK_apiEndPoint = "https://www.airtrik.com/iot/";
var lastMsgEndPoint = "https://airtrik.com/api/lastmsg/"
var AIRTRIK_mqttEndPoint = "airtrik.com";
var AIRTRIK_clientId = Math.random().toString(36).substring(2);
var AIRTRIK_portNumber = 8083
var AIRTRIK_client = new Paho.Client(AIRTRIK_mqttEndPoint, AIRTRIK_portNumber, AIRTRIK_clientId)

function onReceivePredefinedUniqueFunction(msg, deviceId){
    console.log("Message Received")
    console.log("Message    : " , msg)
    console.log("Deevice ID : ",deviceId)
}
function onConnectPredefinedUniqueFunction(){
	console.log("Connected")
}
function onConnectionLost(responseObject){
	if (responseObject.errorCode !== 0) {
	    console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}
export function subscribe(deviceId){
	AIRTRIK_client.subscribe(AIRTRIK_KEY+"/"+deviceId)
}
export function send(deviceId, msg){
	var message = new Paho.Message(msg);
	message.destinationName = AIRTRIK_KEY+"/"+deviceId;
	AIRTRIK_client.send(message);
}
export function lastmsg(key = 0){
  var key_data;
  if(key == 0 && AIRTRIK_KEY === ""){
    console.log("Airtrik Error: No key present, Cannot Continue")
    return -1;
  }
  else if(AIRTRIK_KEY.length != 0 ){
    key_data = `key=${AIRTRIK_KEY}`
  }
  else if( key  !=0){
    key_data = `key=${key}`
  }
  axios.post(lastMsgEndPoint,key_data).then(res =>{
    // console.log("res " , res)
    return res.data  
  }).then(res =>{
    if(res.hasOwnProperty("error")){
      console.log("Airtrik Error : ",res.error)
      return res.error;
    }
    console.log(res)
    return res;
    
  })

}

export function init(key = 0 ,onConnect=null,onReceive=null){
  if(key == 0){
    console.log("Airtrik Error : Key not specified Cannot Continue")
    return;
  }

  if(onConnect==null){
    onConnect = onConnectPredefinedUniqueFunction;
  }
  if(onReceive==null){
    onReceive = onReceivePredefinedUniqueFunction;
  }
  AIRTRIK_KEY = key;
  var key_data = `key=${key}`
  axios.post(AIRTRIK_apiEndPoint,key_data)
  .then(res => {
    // console.log("res ============ ",res)
    if(res.data.hasOwnProperty("error")){
      console.log("Airtrik Error : ",res.data.error)
    }
    return res.data  
  }).then(res =>{
      if(!res.hasOwnProperty("error")){
        username = res.username
        password = res.password
        AIRTRIK_client.connect({onSuccess:onConnect, userName: username, password: password, useSSL: true});
        AIRTRIK_client.onConnectionLost = onConnectionLost;
        AIRTRIK_client.onMessageArrived = function onMessageArrived(message){
          let msg = message.payloadString
          let deviceId = message.destinationName.split("/")[1]
          onReceive(msg, deviceId)
        }
      }
    }
  )
  .catch(error =>{
    console.log(error)
  })
}


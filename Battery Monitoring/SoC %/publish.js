var mqtt = require('mqtt');
console.log('Connecting to Battery Monitoring - SoC : %s using access token: %s', process.env.THINGSBOARD_HOST, process.env.ACCESS_TOKEN);

var soc = [60,60, 60,45,60,
    60,60, 61, 69,71,72 ,75,
    82,89,87,80,90,100,60,
    20,60,60,60,60,60]

var data2 = {soc:0};
var i = 0;

// Initialization of mqtt client using Thingsboard host and device access token
var client = mqtt.connect('mqtt://'+process.env.THINGSBOARD_HOST, {username:process.env.ACCESS_TOKEN });

// Triggers when client is successfully connected to the Thingsboard server
client.on('connect', function(){
    console.log("Client Connected!");
    // Uploads firmware version as device attribute using 'v1/devices/me/attributes' MQTT topic
    client.publish('v1/devices/me/attributes', JSON.stringify({"firmware_version":"1.0.1"}));
    // Schedules telemetry data upload once per second
    console.log('Uploading Battery SoC  data every minute');
    setInterval(publishTelemetry, 30000);
});

// Uploads telemetry data using 'v1/devices/me/telemetry' MQTT topic
function publishTelemetry(){
    data2.soc = soc[i];
    i++;
    client.publish('v1/devices/me/telemetry', JSON.stringify(data2));
    if(i == soc.length){
        i =0 ;
    }
    
}

//Catches uncaught exceptions
process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});
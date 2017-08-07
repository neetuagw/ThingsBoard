var mqtt = require('mqtt');
console.log('Connecting to Battery Monitoring - SoC and Demand : %s using access token: %s', process.env.THINGSBOARD_HOST, process.env.ACCESS_TOKEN);

//Array of SoC in integer format for whole day
var soc_int = [300,300,300,225,300,300,300,305,
    345,355,360,375,410,445,435,400,
    450,500,300,100,300,300,300,300,300] ;

//Array of Demand of  whole day
var demand = [8,8,-142,8,8,8,8,107,5,
    -47,1,0,0,0,0,-120,125,
    -400,-397,-395,407,10,12,10,8] ;

//Data to be published into ThingsBoard 
var data = {soc_int:0,demand:0};
var i = 0;

// Initialization of mqtt client using Thingsboard host and device access token
var client = mqtt.connect('mqtt://'+process.env.THINGSBOARD_HOST, {username:process.env.ACCESS_TOKEN });

// Triggers when client is successfully connected to the Thingsboard server
client.on('connect', function(){
    console.log("Client Connected!");
    // Uploads firmware version as device attribute using 'v1/devices/me/attributes' MQTT topic
    client.publish('v1/devices/me/attributes', JSON.stringify({"firmware_version":"1.0.1"}));
    // Schedules telemetry data upload once per second
    console.log('Uploading Battery SoC and Demand data every half minute');
    setInterval(publishTelemetry, 30000);
});

// Uploads telemetry data using 'v1/devices/me/telemetry' MQTT topic
function publishTelemetry(){
    data.soc_int = soc_int[i];
    data.demand = demand[i];
    i++;
    client.publish('v1/devices/me/telemetry', JSON.stringify(data));
    if(i == soc_int.length){
        i =0 ;
    }
    
}

//Catches uncaught exceptions
process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});
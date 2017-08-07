var mqtt = require('mqtt');
console.log('Connecting to Solar PV Output: %s using access token: %s', process.env.THINGSBOARD_HOST, process.env.ACCESS_TOKEN);

const minTemperature = 17.5, maxTemperature = 30, minHumidity = 12, maxHumidity = 90;

var pv = [0,0,0,0,0,3.100908498,30.17516897,87.79698672,181.3580004,
    310.9373173,416.0124072,493.008671,519.6886693,495.9394854,
    465.4692144,388.0881496,294.9571294,211.1334849,130.5881132,
    58.29295292,14.33925411,0.342888294,0,0,0];

// Initialization of temperature and humidity data with random values
var data = {
    temperature: minTemperature + (maxTemperature - minTemperature) * Math.random() ,
    humidity: minHumidity + (maxHumidity - minHumidity) * Math.random()
};

var data2 = {pv:0};
var i = 0;

// Initialization of mqtt client using Thingsboard host and device access token
var client = mqtt.connect('mqtt://'+process.env.THINGSBOARD_HOST, {username:process.env.ACCESS_TOKEN });

// Triggers when client is successfully connected to the Thingsboard server
client.on('connect', function(){
    console.log("Client Connected!");
    // Uploads firmware version as device attribute using 'v1/devices/me/attributes' MQTT topic
    client.publish('v1/devices/me/attributes', JSON.stringify({"firmware_version":"1.0.1"}));
    // Schedules telemetry data upload once per second
    console.log('Uploading Solar Output generation data every half minute');
    setInterval(publishTelemetry, 30000);
});

// Uploads telemetry data using 'v1/devices/me/telemetry' MQTT topic
function publishTelemetry(){
    data.temperature = genNextValue(data.temperature, minTemperature, maxTemperature);
    data.humidity = genNextValue(data.humidity, minHumidity, maxHumidity);
    data2.pv = pv[i];
    i++;
    client.publish('v1/devices/me/telemetry', JSON.stringify(data2));
    if(i == pv.length){
        i =0 ;
    }

    // for(i=0; i<pv.length; i++){
    //     console.log("Value of i = ", + i);
    //     data2.pv = getNextArray(i);
    //     console.log
    //     if(i == pv.length){
    //         i = 0;
    //     }
    // }
    
}

// Generates new random value that is within 3% range from previous value
function genNextValue(prevValue, min, max){
    var value = prevValue + ((max - min) * (Math.random() - 0.5)) * 0.03;
    value = Math.max(min, Math.min(max, value));
    return Math.round(value * 10) / 10;
}

//Get next value from array
function getNextArray(x){
    var value = pv[x];
    console.log ('Value is = ' + value);
    return value;
}

//Catches uncaught exceptions
process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});
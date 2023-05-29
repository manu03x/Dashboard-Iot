const clientId = 'manu' + Math.random().toString(16).substr(2, 8)

const protocol = 'ws'
const host = '64.227.111.58'
const port = 9001
const userPassword = 'DrFKe33cscalibur'

const connectUrl = `${protocol}://${host}:${port}/mqtt`

const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false,
  username: 'dan',
  password: userPassword,
}

console.log('connecting mqtt client')
const topic = '/nodejs/mqtt'
const payload = {
    temperatura: {
      data: 50,
      bulb: 1
    },
    movimiento: {
      data: 0,
      bulb: 1
    },
    sonico: {
      data: 10,
      bulb: 0
    },
    uv: {
      data: 10,
      bulb:1
    },
}
const client = mqtt.connect(connectUrl, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('connect', () => {
  console.log('Client connected:' + clientId)
  client.subscribe(topic, { qos: 0 })
  client.publish(topic, JSON.stringify(payload), { qos: 0, retain: false })
})

client.on('message', (topic, message, packet) => {
    // const jsonMessage = JSON.stringify(message)
    // const jsonData = JSON.parse(String.fromCharCode(...JSON.parse(jsonMessage).data))

    // sensorData = new SensorData(jsonData);
})

client.on('close', () => {
  console.log(clientId + ' disconnected')
  client.end()
})
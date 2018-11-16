module.exports = {
  URL: {
    // SERVER: JSON.stringify("http://192.168.3.69:9000")
    // SERVER: JSON.stringify("http://192.168.21.168:9000")
    SERVER: JSON.stringify("http://192.168.21.182:9000")
    // SERVER: JSON.stringify("http://192.168.21.37:9000")
  },
  RABBITMQ: {
    SOCKET: JSON.stringify("ws://192.168.3.2:15674/ws"),
    VHOST: JSON.stringify("server"),
    USERNAME: JSON.stringify("server"),
    PASSWORD: JSON.stringify("server"),
    EXCHANGE: JSON.stringify("/exchange/oss")
  }
}

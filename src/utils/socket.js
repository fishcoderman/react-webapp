import io from 'socket.io-client'

if(!io.socket) {
  // 连接服务器, 得到与服务器的连接对象 http://192.168.0.106:8080
  io.socket = io('ws://www.chinamasters.top:8080')  
  // // 绑定监听, 接收服务器发送的消息
  // io.socket.on('receiveMsg', function (chatMsg) {
  //   console.log('客户端接收消息', chatMsg)
  // })
}
export default io.socket

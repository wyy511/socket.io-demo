// 创建应用
// 引入express
var app = require('express')();
// 引入服务器,并将express注入到http中
var http = require('http').Server(app);
var io = require('socket.io')(http);

// 定义了路由/来处理首页访问
// 目前在 index.js 中我们是通过 res.send 返回一个 HTML 字符串。 
// app.get('/', (req, res) => {
//   // 发送字符串模板
//   res.send('<h1>Hello world</h1>')
// })


// 目前在 index.js 中我们是通过 res.send 返回一个 HTML 字符串。
// 如果我们将整个应用的 HTML 代码都放到应用代码里，代码结构将变得很混乱。
// 替代的方法是新建一个 index.html 文件作为服务器响应。
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
  console.log('连接成功', 'user' + ++number +' connected')
})
var number = 0;
// 监听客户端连接，回调函数会传递socket信息
io.on('connection', (socket) => {
  // 当客户端与服务端断开连接后，触发disconnect事件
  socket.on('disconnect', () => {
    // 广播该用户断开的消息
    io.emit('disconnect');
    io.emit('reconnecting');
    io.emit('reconnect');
  });
  // 重新与服务端重连
  // socket.on('')
  // 接收chat message客户端发送过来的事件
  socket.on('chat message', (msg) => {
    // 此时服务端已经接收到msg消息
    // console.log('msg:' + msg)
    // 现在需要广播给所有的客户端
    io.emit('chat message', msg)
  })
});

// 服务器监听
http.listen(2000, () => {
  console.log('server is listening on 2000')
});
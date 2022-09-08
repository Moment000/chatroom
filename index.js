const express = require('express');//引入express框架
const { Server } = require("socket.io");//引入socket.io模块
const http = require('http');//引入http模块

const app = express();//Express将app初始化为一个可以提供给HTTP服务器的函数处理程序
const server = http.createServer(app);
const io = new Server(server);

const port = 3000//服务端口

//义了一个路由处理程序/，当我们访问网站主页时被调用。
app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    //当用户建立连接时触发的事件
    console.log('a user connected');

    socket.on('chat message', (message) => {
        // console.log('message>>' + message);
        // socket.broadcast.emit('hi');
        io.emit('chat message', message);
    })

    //当用户断开连接时触发的事件
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
//监听3000端口，并且异步地控制台输出信息
server.listen(port, () => console.log(`chat-room app listening on port ${port}!`));
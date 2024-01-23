require('express-async-errors')
const groupModel = require('./models/group-model')
var siofu = require("socketio-file-upload");
const express = require('express')
const path = require('path');
const app = express()
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
require('dotenv').config()
const helmet = require('helmet')
const xss = require('xss-clean')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
//const rateLimiter = require('express-rate-limit')
const cors = require('cors')
const connectToDb = require('./db/connection')
const notfound = require('./middleware/notfound')
const errorHandler = require('./middleware/error-handler')
const authRouter = require('./routes/auth-route')
const adminRouter = require('./routes/admin-route')
const userRouter = require('./routes/user-route')
const businessUserRouter = require('./routes/business-route')
const postRouter = require('./routes/post-route')
const chatRouter = require('./routes/chat-route')
const groupRouter = require('./routes/group-route')
const categoryRouter = require('./routes/categories-route')
const citiesRouter = require('./routes/cities-route')
const authorizationMiddleware = require('./middleware/authorization')
const chatSchema = require('./models/chat-model')
app.use('/uploads',express.static('uploads'))

app.use(express.json())
app.use(siofu.router)
app.use(express.urlencoded({ extended: true }));
//app.use(Helmet())
app.use(xss())
app.use(cors())
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/user',authorizationMiddleware,userRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/group',groupRouter)
app.use('/api/v1/cities',citiesRouter)
app.use('/api/v1/businessUser',authorizationMiddleware,businessUserRouter)
app.use('/api/v1/posts',authorizationMiddleware,postRouter)
app.use('/api/v1/chats',authorizationMiddleware,chatRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle requests to the root URL
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


io.of('/api/v1/chat/sendmessage').on('connection', (socket) => {
   socket.on('typing',async(data)=>{
    socket.emit('typing',{ data: true})
   })
   socket.on('sendMessage',async(data)=>{
    let userChats = await chatSchema.findOne({_id:data.chatId})
    console.log(userChats)
    var message = {
    userType:data.userType,
    message:data.message,
    images:"",    
    }
    userChats.messages.push(message)
    await userChats.save()
    socket.emit("responseNewMap", { data: userChats.messages});
   })
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });


  io.of('/api/v1/group/sendmessage').on('connection', (socket) => {
     socket.on('typing',async(data)=>{
      socket.emit('typing',{ data: true})
     })
     
     socket.on('sendMessage',async(data)=>{
      let userChats =  await groupModel.findOne({ _id: data.groupId},)
      var message = {
      title:data.title,
      description:data.description,
      userType:data.userType,
      message:data.message,
      images:"",
      intrested:[data.PhoneNumber,...userChats.groupMembers]    
      }
      userChats.messages.push(message)
      await userChats.save()
      socket.emit("responseNewMap", { data: userChats.messages});
     })
     socket.on('interestedInMessage', async (data) => {
      const group = await groupModel.findById(data.groupId);
      if (group) {
        const targetMessage = group.messages.find(message => message._id.toString() === data.messageId);
      
        if (targetMessage) {
          targetMessage.intrested.push(data.phoneNumber);
      
  
          await group.save();
      
          console.log("Phone number added to the 'intrested' list of the message.");
        } else {
          console.log("Message not found in the group.");
        }
      } else {
        console.log("Group not found.");
      }
    })
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });



app.use(notfound)
app.use(errorHandler)
const start = async()=>{
    try{
        await connectToDb(process.env.MONGO_URI)
        server.listen(process.env.PORT||2000,    console.log(`server started at ${process.env.PORT}`))
    }catch(e){
        console.log(e)

    }
}

start()










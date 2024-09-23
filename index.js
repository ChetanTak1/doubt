const express=require("express");
const jwt=require("jsonwebtoken");
JWT_SECRET="chetan123"
const app=express();
app.use(express.json())
users=[]
app.get("/",function (req,res){
    res.sendFile(__dirname+"/public/index.html");
})
app.post("/sign-up",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"you are signed up,chal abhi hawa aane de"
    })
})
app.post("/sign-in",function(req,res){
    flag=false;
    const username=req.body.username;
    const password=req.body.password;
    const token=jwt.sign({
        username:username
    },JWT_SECRET);
    users.forEach(element => {
        if(element.username==username && element.password==password){
            element.token=token;
            flag=true;
        }
    });
    if(flag){res.json({
     
        token:token
    })}
    else{
        res.json({
            message:"ops somethings wrong"
            
        })
    }
})

app.get("/me", function(req, res) {
    // req = {status, headers...., username, password, userFirstName, random; ":123123"}
    // const currentUser = req.username;
    // const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    const currentUser = decodedData.username

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            foundUser = users[i]
        }
    }

    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})
  





app.listen(3000)
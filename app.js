const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(helmet()); 

app.set('view engine', 'ejs');
app.set('views','./views');

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/views/index.html');
})
.post('/',(req,res) => {
    let text = req.body.text;
    text = text.split(' ');
    var tmpText;
    var result = [];
    for(var i = 0;i < text.length;i++){
        if(text[i].length == 4){
            tmp = text[i][1];
            tmp2 = text[i][2];
            tmpText = text[i][0] + tmp2 + tmp + text[i][3];
            result.push(tmpText)
        }
        else{
            result.push(text[i]);
        }
    }
    res.render('result.ejs',{
        text : result
    })
})

app.listen(4000, () => {
  console.log("connect");
});


const express = require('express');
const app = express();

const cookieSession = require('cookie-session');

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const murl = "mongodb://127.0.0.1:27017/";
var ObjectId = require('mongodb').ObjectId;

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testdbewr@gmail.com',
    pass: 'testhaiye'
  }
});
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

function mail(email, msg) {

      var info = transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: email, // list of receivers
          subject: 'EWR', // Subject line
          text: msg, // plain text body
      });
}

app.get('/', (req, res) => {
	res.render('B-front-page', {err : null});
});

app.get('/signup', (req, res) => {
	res.render('signup', {err : null});
});

app.get('/signin', (req, res) => {
	res.render('signin', {err : null});
});

app.post('/wps', (req, res) => {
  console.log(req.body.inputType);
  MongoClient.connect(murl, function(err, db) {
    db.db("ewr").collection("login").findOne({inputType: req.body.inputType, email: req.body.email}, function (err, result) {
      if (result==null) {
        db.db("ewr").collection("login").insertOne({type: req.body.inputType, email: req.body.email, pass: req.body.pass, fullName: req.body.fullName, address1: req.body.address1, address2: req.body.address2, inputCity: req.body.inputCity, inputState: req.body.inputState, inputZip: req.body.inputZip}, function(err, result) {
          if (result.result.ok==1) {
            req.session.email = req.body.email;
            mail(req.body.email, "Thank you for registering with EWR");
            res.redirect('/wp');
          }
          else {
            res.render('B-front-page', {err : "There was some problem creating a new profile, try signing in again in a few minutes."});
          }
        });
      }
      else {
        res.render('B-front-page', {err : "The email already exists, try logging in!"});
      }
    });
  });
});

app.post('/wcs', (req, res) => {
  console.log(req.body.inputType);
  MongoClient.connect(murl, function(err, db) {
    db.db("ewr").collection("login").findOne({wptype: req.body, email: req.body.email}, function (err, result) {
      if (result==null) {
        db.db("ewr").collection("login").insertOne({type: req.body.inputType, email: req.body.email, pass: req.body.pass, fullName: req.body.fullName, address1: req.body.address1, address2: req.body.address2, inputCity: req.body.inputCity, inputState: req.body.inputState, inputZip: req.body.inputZip}, function(err, result) {
          if (result.result.ok==1) {
            req.session.email = req.body.email;
            mail(req.body.email, "Thank you for registering with EWR");
            res.redirect('/wc');
          }
          else {
            res.render('B-front-page', {err : "There was some problem creating a new profile, try signing in again in a few minutes."});
          }
        });
      }
      else {
        res.render('B-front-page', {err : "The email already exists, try logging in!"});
      }
    });
  });
});

app.post('/wrs', (req, res) => {
  console.log(req.body.inputType);
  MongoClient.connect(murl, function(err, db) {
    db.db("ewr").collection("login").findOne({wptype: req.body, email: req.body.email}, function (err, result) {
      if (result==null) {
        db.db("ewr").collection("login").insertOne({otype: "r", type: req.body.inputType, email: req.body.email, pass: req.body.pass, fullName: req.body.fullName, address1: req.body.address1, address2: req.body.address2, inputCity: req.body.inputCity, inputState: req.body.inputState, inputZip: req.body.inputZip}, function(err, result) {
          if (result.result.ok==1) {
            req.session.email = req.body.email;
            mail(req.body.email, "Thank you for registering with EWR");
            res.redirect('/wc');
          }
          else {
            res.render('B-front-page', {err : "There was some problem creating a new profile, try signing in again in a few minutes."});
          }
        });
      }
      else {
        res.render('B-front-page', {err : "The email already exists, try logging in!"});
      }
    });
  });
});

app.post('/wpl', (req, res) => {
  MongoClient.connect(murl, function(err, db) {
    db.db("ewr").collection("login").findOne({email: req.body.email}, function (err, result) {
      if (result==null) {
        console.log("email not registered");
        res.render('B-front-page', {err : "The email isn't registered with us. Try signing up."});
      }
      else {
        if (req.body.pass==result.pass) {
          console.log("Logged in successfully");
          req.session.email = req.body.email;
          res.redirect('/wp');
        } else {
          console.log("password incorrect");
          res.render('B-front-page', {err : "The password is incorrect!"});
        }
      }
    });
  });
});

app.post('/wcl', (req, res) => {
  MongoClient.connect(murl, function(err, db) {
    db.db("ewr").collection("login").findOne({email: req.body.email}, function (err, result) {
      if (result==null) {
        console.log("email not registered");
        res.render('B-front-page', {err : "The email isn't registered with us. Try signing up."});
      }
      else {
        if (req.body.pass==result.pass) {
          console.log("Logged in successfully");
          req.session.email = req.body.email;
          res.redirect('/wc');
        } else {
          console.log("password incorrect");
          res.render('B-front-page', {err : "The password is incorrect!"});
        }
      }
    });
  });
});

app.post('/wrl', (req, res) => {
  MongoClient.connect(murl, function(err, db) {
    db.db("ewr").collection("login").findOne({email: req.body.email}, function (err, result) {
      if (result==null) {
        console.log("email not registered");
        res.render('front-page', {err : "The email isn't registered with us. Try signing up."});
      }
      else {
        if (req.body.pass==result.pass) {
          console.log("Logged in successfully");
          req.session.email = req.body.email;
          res.redirect('/');
        } else {
          console.log("password incorrect");
          res.render('front-page', {err : "The password is incorrect!"});
        }
      }
    });
  });
});

app.get('/wp', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  console.log("wp form will be loaded");
  res.render('event-reg-form', {err : null, email: req.session.email});
});

app.post('/wpf', (req, res) => {
  MongoClient.connect(murl, function(err, db) {
  db.db("ewr").collection("event").insertOne({email: req.session.email, wasteType: req.body.inputType, address1: req.body.address1, address2: req.body.address2, inputCity: req.body.inputCity, inputState: req.body.inputState, inputZip: req.body.inputZip, inputDate: req.body.inputDate, schedule: req.body.schedule}, function(err, result) {
    if (result.result.ok==1) {
      console.log("Created product");
      console.log(result.ops[0]);
      mail(req.session.email, "Your waste information has been sent to the collectors! They will contact you as soon as they accept it.")
      res.render('event-reg-form', {info: "Your data is saved"});
    }
    else {
      res.render('event-reg-form', {err : "There was some problem saving into a database, try again in a few minutes.", email: req.session.email});
    }
    });
  });
});

app.get('/wpp', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    console.log("wpp will be loaded");
    MongoClient.connect(murl, function(err, db) {
      db.db("ewr").collection("event").find({email: req.session.email}).toArray(function (err, result) {
        if (result==null) {
          console.log("no schedule till date");
          res.render('profile-order', {err : "You have never scheduled any waste to be picked up.", result : null});
        }
        else {
          console.log("schedulee");
          console.log(result);
          let y = result;
          db.db("ewr").collection("login").findOne({email: result.wca}, function (err, result) {
          res.render('profile-order', {err : null, result : JSON.stringify(y), ca : JSON.stringify(result)});
          });
        }
      });
    });
  }
});

app.get('/wpdel/:id', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    MongoClient.connect(murl, function(err, db) {
      db.db("ewr").collection("event").find({_id: new ObjectId(req.params.id), email: req.session.email}).toArray(function (err, result) {
        if (result==null) {
          console.log("trying from diff email");
          res.render('wpp', {err : "You have not scheduled any waste to be picked up with that id.", result : null});
        }
        else {
          try {
            db.db("ewr").collection("event").deleteOne( { _id : new ObjectId(req.params.id) } );
            console.log("deletedddddd");
            res.redirect('/wpp');
          } catch (e) {
            console.log(e);
            res.render('wpp', {err : "There was some error in deleting the entry."})
          }
        }
      });
    });
  }
});

app.get('/wpps', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    console.log("wpps will be redirected");
    res.render('wpps', {err : null})
    //banan hai
  }
})

app.post('/wppsp', (req, res) => {
  MongoClient.connect(murl, function(err, db) {
    try {
      db.db('ewr').collection("login").updateOne({ email : req.session.email },{ $set: { pass : req.body.pass } }, function (err, result) {
        if (result.modifiedCount) {
          console.log("updated pass");
          res.render('wpps', {err : null})
        }
        else {
          console.log("doudlnt update email");
          res.render('wpps', {err : "Couldn't update email"})
        }
      }
   );
  } catch (e) {
    console.log(e);
   res.render('wpps', {err : "There was some error in changing the password."})
  }
  });
});

app.post('/wppsa', (req, res) => {
  MongoClient.connect(murl, function(err, db) {
    try {
      db.db('ewr').collection("login").updateOne({ email : req.session.email },{ $set: { address1 : req.body.address1, address2 : req.body.address2, inputCity : req.body.inputCity, inputZip : req.body.inputZip, inputState : req.body.inputState } }, function (err, result) {
        if (result.modifiedCount) {
          console.log("updated Address");
          res.render('wpps', {err : null})
        }
        else {
          console.log("doudlnt update address");
          res.render('wpps', {err : "Couldn't update email"})
        }
      }
   );
  } catch (e) {
    console.log(e);
   res.render('wpps', {err : "There was some error in changing the password."})
  }
  });
});

app.get('/wc', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
      res.render('collector-options', {err : null})
  }
})

app.get('/wcp', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    var p = "";
    MongoClient.connect(murl, function(err, db) {
      var k = req.body.para;
      var k2 = req.body.val;
      db.db("ewr").collection("event").find({k : k2}).toArray(function(err, result) {
        console.log(result);
        res.render('waste-prod-data', {err : null, result : JSON.stringify(result)})
      })
    });
  }
})

app.get('/wcps', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    var p = "";
    MongoClient.connect(murl, function(err, db) {
      db.db("ewr").collection("login").findOne({email : req.session.email}, function(err, result) {
        db.db("ewr").collection("event").find({inputState : result.inputState}).toArray(function(err, result) {
          console.log(result);
          res.render('waste-prod-data', {err : null, result : JSON.stringify(result)})
        })
        p = result.inputState;
        console.log(p);
      })

    });
  }
})

app.get('/wcrs', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    var p = "";
    MongoClient.connect(murl, function(err, db) {
      db.db("ewr").collection("login").findOne({email : req.session.email}, function(err, result) {
        db.db("ewr").collection("event").find({inputState : result.inputState, otype: "r"}).toArray(function(err, result) {
          console.log(result);
          res.render('waste-prod-data', {err : null, result : JSON.stringify(result)})
        })
        p = result.inputState;
        console.log(p);
      })

    });
  }
})

app.get('/logout', (req, res) => {
  req.session.email = null;
  res.redirect('/');
})

app.get('/wcr', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    var p = "";
    MongoClient.connect(murl, function(err, db) {
      var k = req.body.para;
      var k2 = req.body.val;
      db.db("ewr").collection("login").find({k : k2}).toArray(function(err, result) {
        console.log(result);
        res.render('waste-prod-rec', {err : null, result : JSON.stringify(result)})
      })
    });
  }
})

app.get('/collector-profile', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    var p = "";
    MongoClient.connect(murl, function(err, db) {
      db.db("ewr").collection("event").find({wca : req.session.email}).toArray(function(err, result) {
        console.log(result);
        res.render('col-pro', {err : null, result : JSON.stringify(result)})
      })
    });
  }
})

app.get('/wcpt/:id', (req,res) => {
  MongoClient.connect(murl, function(err, db) {
    db.db("ewr").collection("event").findOne({_id: new ObjectId(req.params.id)}, function (err, result) {
      if (result==null) {
        console.log("nhin mila")
      }
      else {
        var p = "";
        db.db('ewr').collection("event").updateOne({_id: new ObjectId(req.params.id)},{ $set: { wca : req.session.email } }, function (err, result) {
          if (result.modifiedCount) {
            console.log("updated pass");
            res.redirect('/collector-profile')
          }
          else {
            console.log("doudlnt update email");
            res.render('/collector-profile', {err : "Couldn't update email"})
          }
      });
      }
    });
  });
})
//

app.get('/wr', (req, res) => {
  if (!req.session.email) {
    res.redirect('/');
  }
  else {
    MongoClient.connect(murl, function(err, db) {
      db.db("ewr").collection("login").findOne({email: req.session.email}, function (err, result) {
        if (result==null) {
          console.log("email not registered");
          res.render('front-page', {err : "The email isn't registered with us. Try signing up."});
        }
        else {
          console.log("Logged in successfully");
          req.session.email = req.body.email;
          res.render('wr', {err : null, result : result});
        }
      });
    });
  }
});

var server = app.listen(PORT);

module.exports = {
    configure: function (app, database) {

        //CHECK PASSWORD
        app.get("/checkpassword", function (req, res) {
            var pwd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (req.query.password.match(pwd)) {
                res.send("strong password");
            }
            else {
                res.send("weak password");
            }
        });

        //WHICH NUMBER IS THE LARGEST ONE USING GET METHOD
        app.get("/numchk", function (req, res) {
            if (parseInt(req.query.num1) >= parseInt(req.query.num2) && parseInt(req.query.num1) >= parseInt(req.query.num3)) {
                res.send("num1 is the largest number");
            } else if (parseInt(req.query.num2) >= parseInt(req.query.num1) && parseInt(req.query.num2) >= parseInt(req.query.num3)) {
                res.send("num2 is the largest value");
            } else {
                res.send("num3 is the largest value");
            }
        });

        //WHICH NUMBER IS THE LARGEST ONE USING POST METHOD
        app.post("/num", function (req, res) {
            if (parseInt(req.body.num1) >= parseInt(req.body.num2) && parseInt(req.body.num1) >= parseInt(req.body.num3)) {
                res.json({ status: true, message: "num1 is the largest number" });
            } else if (parseInt(req.body.num2) >= parseInt(req.body.num1) && parseInt(req.body.num2) >= parseInt(req.body.num3)) {
                res.json({ status: true, message: "num2 is the largest number" });
            } else {
                res.json({ status: true, message: "num3 is the largest number" });
            }
        });
        
        // ADDITION OF TWO NUMBER USING POST METHOD
        app.post("/add", function (req, res) {
            req.body.num3 = parseInt(req.body.num2) + parseInt(req.body.num1);
            res.json({ status: true, message: "Addition value is " + req.body.num3 });
        });

        // SUBSTRACTION OF TWO NUMBER USING POST METHOD
        app.post("/sub", function (req, res) {
            req.body.num3 = parseInt(req.body.num2) - parseInt(req.body.num1);
            res.json({ status: true, message: "Addition value is " + req.body.num3 });
        });

        // ADDITION OF TWO NUMBER USING GET METHOD
        app.get("/addition", function (req, res) {
            req.query.num3 = parseInt(req.query.num2) + parseInt(req.query.num1);
            res.json({ status: true, message: "Addition value is " + req.query.num3 });
        });

        // SUBSTRACTION OF TWO NUMBER USING GET METHOD
        app.get("/substraction", function (req, res) {
            req.query.num3 = parseInt(req.query.num2) - parseInt(req.query.num1);
            res.json({ status: true, message: "Addition value is " + req.query.num3 });
        });



            // //API TO UPDATE PASSWORD
    // app.post("/update_password", function (req, res) {
    //   user_module.update_password(req.body.password, req.body.email, function (error, result) {
    //     if (error == true) {
    //       res.json({ status: false, message: "error occured" });
    //     } else {
    //       res.json({ status: true, message: "Password updated" });
    //     }
    //   });
    // });


    // //API TO UPDATE EMAIL
    // app.post("/update_email", function (req, res) {
    //   user_module.update_email(req.body.email, req.body.em, function (error, result) {
    //     if (error == true) {
    //       res.json({ status: false, message: "error occured" });
    //     } else {
    //       res.json({ status: true, message: "Email updated" });
    //     }
    //   });
    // });


    // //API TO UPDATE NAME
    // app.post("/update_name", function (req, res) {
    //   user_module.update_name(req.body.name, req.body.email, function (error, result) {
    //     if (error == true) {
    //       res.json({ status: false, message: "error occured" });
    //     } else {
    //       if (req.body.name === "") {
    //         res.json({ status: false, message: "Name can't be blank" });
    //       } else
    //         res.json({ status: true, message: "Name updated" });
    //     }
    //   });
    // });


    // //API TO UPDATE PHONE NUMBER
    // app.post("/update_number", function (req, res) {
    //   user_module.update_number(req.body.phone_number, req.body.email, function (error, result) {
    //     if (error == true) {
    //       res.json({ status: false, message: "error occured" });
    //     } else {
    //       res.json({ status: true, message: "Phone number updated" });
    //     }
    //   });
    // });

// //API TO UPDATE PASSWORD
//     update_password: function (password, email, callBack) {
//       database.db().collection("notebook_users").updateOne({email:email},
//         {
//           $set: {
//             password
//           }
//         }, { upsert: false }, function (err, result) {
//           if (err) {
//             callBack(true, null);
//           } else {
//             callBack(false, result)
//           }
//         })
//     },

    
// //API TO UPDATE EMAIL
// update_email: function ( email,em, callBack) {
//   database.db().collection("notebook_users").updateOne({email:em},
//     {
//       $set: {
//         email
//       }
//     }, { upsert: false }, function (err, result) {
//       if (err) {
//         callBack(true, null);
//       } else {
//         callBack(false, result)
//       }
//     })
// },


// //API TO UPDATE NAME
// update_name: function (name, email, callBack) {
//   database.db().collection("notebook_users").updateOne({email:email},
//     {
//       $set: {
//         name
//       }
//     }, { upsert: false }, function (err, result) {
//       if (err) {
//         callBack(true, null);
//       } else {
//         callBack(false, result)
//       }
//     })
// },
   

// //API TO UPDATE PHONE NUMBER
// update_number: function (phone_number, email, callBack) {
//   database.db().collection("notebook_users").updateOne({email:email},
//     {
//       $set: {
//         phone_number
//       }
//     }, { upsert: false }, function (err, result) {
//       if (err) {
//         callBack(true, null);
//       } else {
//         callBack(false, result)
//       }
//     })
// },

//PUSH ARRAY WITHIN THE ARRAY
app.post("/push2", function (req, res) {
    user = []
    var note = database.db().collection("notebook_users").find({ unique_id: new ObjectID(req.body.id) });
    if (note) {
      database.db().collection("notebook_users").updateOne({ unique_id: new ObjectID(req.body.id) },
        {
          $push: {
            "notebook.$.copy": {
              heading: req.body.heading,
              paragraph: req.body.paragraph,
            }
          }

        }, { upsert: false }, function (err, doc) {
          if (err) {
            res.json({ status: false, message: "error occured" });
          } else {
            res.json({ status: true, message: "updated" });
          }
        })
    }


  })

    
    }
}
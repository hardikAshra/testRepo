const express = require('express')
const app = express();
var user = [{
    name: 'John',
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json());


app.get('/', function (req, res) {
    const JohnKindneys = user[0].kidneys;
    let numberOfKindneys = JohnKindneys.length;
    let numberOfHealthyKindneys = 0;
    for (let i = 0; i < JohnKindneys.length; i++) {
        if (JohnKindneys[i].healthy == true) {
            numberOfHealthyKindneys = numberOfHealthyKindneys + 1;
        }
    }

    let numberOfUnHealthyKindneys = JohnKindneys.length - numberOfHealthyKindneys;
    res.json({ numberOfKindneys, numberOfHealthyKindneys, numberOfUnHealthyKindneys })
})


app.put('/', function (req, res) {
    let chk = atLeastOne();
    if (chk == 0) {
        res.json({ msg: "kidneys are already healthy!" });
    }
    else {
    for (let i = 0; i < user[0].kidneys.length; i++) {
        user[0].kidneys[i].healthy = true
    }
    res.json({ msg: "PUT" })}
})
app.post('/', function (req, res) {
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({ msg: "done!" });
})
app.delete('/', function (req, res) {
    let chk = atLeastOne();
    if (chk == 0) {
        res.json({ msg: "No unhealthy kidneys to delete!" });
    }
    else {
        let newKidney = [];
        for (let i = 0; i < user[0].kidneys.length; i++) {
            if (user[0].kidneys[i].healthy) {
                newKidney.push({
                    healthy: true
                });
            }

        }
        user[0].kidneys = newKidney;
        res.json({ msg: "deleted!" });
    }
})

function atLeastOne() {
    let atleastOne = 0;
    for (let i = 0; i < user[0].kidneys.length; i++) {
        if (!user[0].kidneys[i].healthy) {
            atleastOne = atleastOne + 1
        }
    }
    return atleastOne;
}
app.listen(3000)
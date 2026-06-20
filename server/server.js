const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = "./database.json";

function loadDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ orders: [], users: [] }, null, 2));
    }

    try {
        return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    } catch (e) {
        return { orders: [], users: [] };
    }
}

function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

/* ===== ORDERS ===== */
app.get("/orders", (req, res) => {
    const db = loadDB();
    res.json(db.orders);
});

app.post("/buy", (req, res) => {
    const db = loadDB();

    const order = {
        id: Date.now(),
        nickname: req.body.nickname,
        item: req.body.item,
        price: req.body.price,
        payment: req.body.payment,
        created: new Date().toLocaleString()
    };

    db.orders.unshift(order);
    saveDB(db);

    res.json({ success: true, order });
});

app.delete("/orders/:id", (req, res) => {
    const db = loadDB();
    db.orders = db.orders.filter(o => o.id != req.params.id);
    saveDB(db);
    res.json({ success: true });
});

/* ===== USERS (login system) ===== */
app.post("/register", (req, res) => {
    const db = loadDB();

    const exists = db.users.find(u => u.login === req.body.login);
    if (exists) return res.json({ error: "USER_EXISTS" });

    db.users.push({
        login: req.body.login,
        password: req.body.password,
        created: Date.now()
    });

    saveDB(db);
    res.json({ success: true });
});

app.post("/login", (req, res) => {
    const db = loadDB();

    const user = db.users.find(
        u => u.login === req.body.login && u.password === req.body.password
    );

    if (!user) return res.json({ error: "INVALID" });

    res.json({ success: true, user: user.login });
});

app.listen(PORT, () => {
    console.log("🚀 Server started: http://localhost:" + PORT);
});
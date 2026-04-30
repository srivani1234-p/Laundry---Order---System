const express = require('express');
const app = express();
app.use(express.json());

let orders = [];

const priceList = {
  shirt: 50,
  pants: 70,
  saree: 100
};

const validStatuses = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

app.get('/', (req, res) => {
  res.send("Laundry System Running...");
});

app.post('/orders', (req, res) => {
  const { customerName, phone, items } = req.body;

  if (!customerName || !phone || !items) {
    return res.status(400).json({ error: "Missing fields" });
  }

  let total = 0;

  for (let item of items) {
    if (!priceList[item.type]) {
      return res.status(400).json({ error: "Invalid item type" });
    }
    total += priceList[item.type] * item.quantity;
  }

  const order = {
    id: Date.now(),
    customerName,
    phone,
    items,
    totalAmount: total,
    status: "RECEIVED",
    createdAt: new Date()
  };

  orders.push(order);
  res.json(order);
});

app.put('/orders/:id/status', (req, res) => {
  const { status } = req.body;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const order = orders.find(o => o.id == req.params.id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  order.status = status;
  res.json(order);
});

app.get('/orders', (req, res) => {
  const { status, search } = req.query;

  let result = orders;

  if (status) {
    result = result.filter(o => o.status === status);
  }

  if (search) {
    result = result.filter(o =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search)
    );
  }

  res.json(result);
});

app.get('/dashboard', (req, res) => {
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const statusCount = {
    RECEIVED: 0,
    PROCESSING: 0,
    READY: 0,
    DELIVERED: 0
  };

  orders.forEach(o => {
    statusCount[o.status]++;
  });

  res.json({
    totalOrders,
    totalRevenue,
    statusCount
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

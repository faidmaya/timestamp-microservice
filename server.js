const express = require("express");
const app = express();

// Allow FreeCodeCamp test to access
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

// Root endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // Jika tidak ada parameter → tanggal sekarang
    date = new Date();
  } else {
    // Jika param berisi hanya angka → anggap sebagai timestamp
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Jika invalid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Jika valid
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});


// Jalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});


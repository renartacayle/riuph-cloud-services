import app from "./app.js";

const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
  console.log(`[Veritas Academic Integrity Engine] Server berjalan di http://localhost:${PORT}`);
});

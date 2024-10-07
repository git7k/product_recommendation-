import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb://localhost:27017/ecommerce_recommendation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

app.use('/api', productRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
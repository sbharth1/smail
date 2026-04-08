import express from 'express'
import type { Express } from 'express';
import cors from 'cors'

const app:Express = express();

app.use(cors())

export default app
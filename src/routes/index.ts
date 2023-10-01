import { Router } from 'express';

const routes = Router();

routes.get('/', () => console.log('Funcionou!'))

export default routes;
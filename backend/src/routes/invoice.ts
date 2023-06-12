import { Router } from 'express';
import InvoiceController from '../controllers/invoice';

const invoiceRouter = Router();
export const invoiceRouteGeneric = '/user/:userId/invoice';

// POST /user/{userId}/invoice
invoiceRouter.post(invoiceRouteGeneric, InvoiceController.create);

// GET /user/{userId}/invoice
invoiceRouter.get(invoiceRouteGeneric, InvoiceController.allInvoices);

// GET /invoice/{invoiceId}
invoiceRouter.get('/invoice/:invoiceId', InvoiceController.specificInvoice);

export default invoiceRouter;

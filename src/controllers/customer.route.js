import { Router } from "express";

import {
  getAll,
  viewDeleteById,
  viewUpdateById,
  create,
  update,
  remove,
  createView,
} from "./customer.controller.js";

const router = Router();

// ============================================== VIEW ============================================== //
router.get("/", getAll);
router.get("/add", createView);
router.get("/edit/:id", viewUpdateById);
router.get("/delete/:id", viewDeleteById);

// ============================================== FORM ============================================== //
router.post("/add", create);
router.post("/edit/:id", update);
router.post("/delete/:id", remove);

export default router;

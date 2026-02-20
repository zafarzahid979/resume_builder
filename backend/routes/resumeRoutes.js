import express from 'express';
import { createResume, getResumes, getResumeById, updateResume, deleteResume } from '../controllers/resumeController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createResume);
router.get('/', verifyToken, getResumes);
router.get('/:id', verifyToken, getResumeById);
router.put('/:id', verifyToken, updateResume);
router.delete('/:id', verifyToken, deleteResume);

export default router;

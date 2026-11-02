import express from 'express';
import { getAssignments, createAssignment, submitAssignment } from '../controllers/assignmentController.js';

const router = express.Router();

router.get('/assignments', getAssignments);
router.post('/assignments', createAssignment);
router.put('/assignments/:id/submit', submitAssignment);

export default router;
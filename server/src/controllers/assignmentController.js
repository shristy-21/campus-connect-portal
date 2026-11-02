import { ApiError, asyncHandler } from '../middleware/errorMiddleware.js';

// Mock Database State
let assignments = [
  { id: 1, subject: 'CS3301 - Full Stack', title: 'Lab 2: React Routing', status: 'Pending' },
  { id: 2, subject: 'CS3302 - DBMS', title: 'ER Diagram Report', status: 'Submitted' }
];

// 1. GET /api/assignments (READ)
export const getAssignments = asyncHandler(async (req, res) => {
  res.status(200).json(assignments);
});

// 2. POST /api/assignments (CREATE - Faculty View)
export const createAssignment = asyncHandler(async (req, res) => {
  const { subject, title } = req.body;

  // Input Validation
  if (!subject || !title) {
    throw new ApiError(400, 'Subject and Title are required');
  }

  const newAssignment = {
    id: assignments.length + 1,
    subject,
    title,
    status: 'Pending'
  };

  assignments.push(newAssignment);
  res.status(201).json(newAssignment);
});

// 3. PUT /api/assignments/:id/submit (UPDATE - Student View)
export const submitAssignment = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignment = assignments.find(a => a.id === id);

  if (!assignment) {
    throw new ApiError(404, `Assignment with ID ${id} not found`);
  }

  assignment.status = 'Submitted';
  res.status(200).json(assignment);
});
//curl http://localhost:5000/api/assignments
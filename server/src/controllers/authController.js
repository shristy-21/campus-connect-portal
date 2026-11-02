import { ApiError, asyncHandler } from '../middleware/errorMiddleware.js';

// In-Memory User Store
let users = [];

// POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, 'Please provide email, password, and user role');
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw new ApiError(400, 'User already exists with this email');
  }

  const newUser = { id: users.length + 1, name, email, role };
  users.push({ ...newUser, password }); // In production, hash this using bcrypt

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: newUser
  });
});

// POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Simulated JWT/Session Response
  res.status(200).json({
    success: true,
    message: 'Login successful',
    token: `fake-jwt-token-for-${user.role}`,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});
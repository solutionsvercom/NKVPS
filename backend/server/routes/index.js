import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validate.js';
import * as auth from '../controllers/auth.controller.js';
import * as students from '../controllers/student.controller.js';
import * as teachers from '../controllers/teacher.controller.js';
import * as events from '../controllers/event.controller.js';
import * as announcements from '../controllers/announcement.controller.js';
import * as fees from '../controllers/fee.controller.js';
import * as attendance from '../controllers/attendance.controller.js';
import * as homework from '../controllers/homework.controller.js';
import * as activities from '../controllers/activity.controller.js';
import * as messages from '../controllers/message.controller.js';
import * as gallery from '../controllers/gallery.controller.js';
import * as admissions from '../controllers/admission.controller.js';
import * as contact from '../controllers/contact.controller.js';
import * as ai from '../controllers/ai.controller.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true }));

router.post('/auth/register', auth.validateRegister, auth.register);
router.post('/auth/login', auth.validateLogin, auth.login);
router.get('/auth/me', requireAuth, auth.me);

router.get('/students', requireAuth, students.listStudents);
router.post('/students', requireAuth, requireRoles('admin', 'teacher'), students.createStudent);
router.patch('/students/:id', requireAuth, requireRoles('admin', 'teacher'), students.updateStudent);
router.delete('/students/:id', requireAuth, requireRoles('admin'), students.deleteStudent);

router.get('/teachers', requireAuth, teachers.listTeachers);
router.post('/teachers', requireAuth, requireRoles('admin'), teachers.createTeacher);
router.patch('/teachers/:id', requireAuth, requireRoles('admin'), teachers.updateTeacher);
router.delete('/teachers/:id', requireAuth, requireRoles('admin'), teachers.deleteTeacher);

router.get('/events', requireAuth, events.listEvents);
router.post('/events', requireAuth, requireRoles('admin', 'teacher'), events.createEvent);
router.patch('/events/:id', requireAuth, requireRoles('admin', 'teacher'), events.updateEvent);
router.delete('/events/:id', requireAuth, requireRoles('admin', 'teacher'), events.deleteEvent);

router.get('/announcements', requireAuth, announcements.listAnnouncements);
router.post('/announcements', requireAuth, requireRoles('admin', 'teacher'), announcements.createAnnouncement);
router.patch('/announcements/:id', requireAuth, requireRoles('admin', 'teacher'), announcements.updateAnnouncement);
router.delete('/announcements/:id', requireAuth, requireRoles('admin', 'teacher'), announcements.deleteAnnouncement);

router.get('/fees', requireAuth, fees.listFees);
router.post('/fees', requireAuth, requireRoles('admin', 'teacher'), fees.createFee);
router.patch('/fees/:id', requireAuth, requireRoles('admin', 'teacher'), fees.updateFee);

router.get('/attendance', requireAuth, attendance.listAttendance);
router.post('/attendance', requireAuth, requireRoles('admin', 'teacher'), attendance.upsertAttendance);
router.patch('/attendance/:id', requireAuth, requireRoles('admin', 'teacher'), attendance.updateAttendance);

router.get('/homework', requireAuth, homework.listHomework);
router.post('/homework', requireAuth, requireRoles('admin', 'teacher'), homework.createHomework);
router.patch('/homework/:id', requireAuth, requireRoles('admin', 'teacher'), homework.updateHomework);
router.delete('/homework/:id', requireAuth, requireRoles('admin', 'teacher'), homework.deleteHomework);

router.get('/activities', requireAuth, activities.listActivities);
router.post('/activities', requireAuth, requireRoles('admin', 'teacher'), activities.createActivity);
router.patch('/activities/:id', requireAuth, requireRoles('admin', 'teacher'), activities.updateActivity);
router.delete('/activities/:id', requireAuth, requireRoles('admin', 'teacher'), activities.deleteActivity);

router.get('/messages', requireAuth, messages.listMessages);
router.post('/messages', requireAuth, messages.createMessage);

router.get('/gallery', gallery.listGallery);
router.post('/gallery', requireAuth, requireRoles('admin'), gallery.createGalleryItem);
router.delete('/gallery/:id', requireAuth, requireRoles('admin'), gallery.deleteGalleryItem);

router.post(
  '/admissions/inquiries',
  [
    body('child_name').trim().notEmpty().withMessage("Child's name is required"),
    body('parent_name').trim().notEmpty().withMessage("Parent's name is required"),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email address'),
  ],
  handleValidationErrors,
  admissions.createInquiry
);
router.get('/admissions/inquiries', requireAuth, requireRoles('admin', 'teacher'), admissions.listInquiries);
router.patch('/admissions/inquiries/:id', requireAuth, requireRoles('admin', 'teacher'), admissions.updateInquiry);

router.post(
  '/contact',
  [body('name').trim().notEmpty(), body('email').isEmail(), body('message').trim().notEmpty()],
  handleValidationErrors,
  contact.createContact
);

router.post('/ai/invoke', ai.invokeLLM);

export default router;

// routes/careerRoutes.js
import express from 'express';
import {
    getAllCareers,
    getAllCareersAdmin,
    getCareerBySlug,
    getCareerById,
    createCareer,
    updateCareer,
    deleteCareer,
    toggleCareerStatus,
    getCareerStats,
    getCareerFilters,
} from '../controllers/careerController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

/* ─────────────────────────────────────────────
   Public router  (/api/careers/...)
───────────────────────────────────────────── */
const router = express.Router();

router.get('/',              getAllCareers);       // active jobs, with filters
router.get('/filters',       getCareerFilters);   // distinct filter options
router.get('/slug/:slug',    getCareerBySlug);     // single job by slug (public)

/* ─────────────────────────────────────────────
   Admin sub-router  (/api/careers/admin/...)
   All routes protected by authenticateUser.
───────────────────────────────────────────── */
const adminRouter = express.Router();
adminRouter.use(authenticateUser);

adminRouter.get('/',                   getAllCareersAdmin);   // all jobs (active + inactive)
adminRouter.get('/stats',              getCareerStats);       // aggregated stats
adminRouter.get('/:id',                getCareerById);        // single job by _id
adminRouter.post('/',                  createCareer);         // create new job
adminRouter.put('/:id',                updateCareer);         // full update
adminRouter.patch('/:id/toggle-status', toggleCareerStatus); // activate / deactivate
adminRouter.delete('/:id',             deleteCareer);         // permanent delete

router.use('/admin', adminRouter);

export default router;
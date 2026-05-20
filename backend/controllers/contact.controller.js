import { createContactService, getContactService, getSingleContactService, deleteContactService, toggleReadStatusService } from "../services/contact.service.js";
import { successResponse } from "../utils/apiResponse.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

export const createContact = asyncHandler(async (req, res) => {
    const contact = await createContactService(req.body);
    return successResponse(res, contact, "your query has been submitted successfully",201);
});

export const getContacts = asyncHandler(async (req, res) => {
    const contacts = await getContactService(req.query);
    return successResponse(res, contacts, "contacts retrieved successfully",200);
});

export const getSingleContact = asyncHandler(async (req, res) => {
    const contact = await getSingleContactService(req.params.id);
    return successResponse(res, contact, "contact retrieved successfully",200);
});

export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await deleteContactService(req.params.id);
    return successResponse(res, contact, "contact deleted successfully",200);
});

export const toggleReadStatus = asyncHandler(async (req, res) => {
    const contact = await toggleReadStatusService(req.params.id);
    return successResponse(res, contact, "contact read status toggled successfully",200);
});
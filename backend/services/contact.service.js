import Contact from "../models/contact.model.js";

export const createContactService = async (contactData) => {
    const contact = await Contact.create(contactData);
    return contact;
};

export const getContactService = async ({
  page = 1,
  limit = 10,
  isRead,
}) => {
  const query = {};

  if (isRead !== undefined) {
    query.isRead = isRead === "true";
  }

  const skip = (page - 1) * limit;

  const [contacts, total] = await Promise.all([
    Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Contact.countDocuments(query),
  ]);

  return {
    contacts,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};
export const getSingleContactService = async (id) => {
  return await Contact.findById(id);
};

export const deleteContactService = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

export const toggleReadStatusService = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) return null;

  contact.isRead = !contact.isRead;

  await contact.save();

  return contact;
};
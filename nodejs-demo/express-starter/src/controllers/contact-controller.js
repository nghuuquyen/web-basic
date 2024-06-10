import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getContactForm = (req, res) => {
    return res.render('pages/contact');
};

const createContact = async (req, res) => {
    const { name, email, message } = req.body;

    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            message,
        },
    });

    if (req.isAjax()) {
        return res.json(contact);
    }

    return res.render('pages/contact-success', { contact });
};

const contactSuccess = (req, res) => {
    return res.render('pages/contact-success');
};

export { getContactForm, createContact, contactSuccess };

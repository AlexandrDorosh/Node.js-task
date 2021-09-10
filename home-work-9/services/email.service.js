const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');
const allTemplates = require('../email-templates');

const { variables: { FRONTEND_URL, NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD }, messages, statusCodes } = require('../config');
const { ErrorHandler } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(statusCodes.INTERNAL_SERVER_ERROR, messages.WRONG_TEMP_NAME_MESS);
    }

    const { templateName, subject } = templateInfo;

    context.frontendURL = FRONTEND_URL;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};

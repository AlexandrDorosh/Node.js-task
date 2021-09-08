const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { variables } = require('../config');
const allTemplates = require('../email-templates');
const { ErrorHandler } = require('../errors');
const { messages } = require('../config');
const { statusCodes } = require('../config');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: variables.NO_REPLY_EMAIL,
        pass: variables.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(statusCodes.INTERNAL_SERVER_ERROR, messages.WRONG_TEMP_NAME_MESS);
    }

    const { templateName, subject } = templateInfo;

    context.frontendURL = 'https://developer.mozilla.org/ru/docs/Web/HTTP/Status';

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

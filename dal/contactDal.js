const contactModel = require('../models/contactModel');
const contactDal = new Object();

// ---------------------------create contact details
contactDal.create = async (data) => {
    try {
        let payload = new contactModel(data);
        let contact = await payload.save();
        if (contact) {
            return { status: true, message: "Contact details created", data: contact }
        }
        return { status: false, message: "Failed to create contact details", data: {} }
    } catch (error) {
        return {
            status: false, message: error.message, data: {}
        }
    }
};

contactDal.get = async (data) => {
    try {
        let result = await contactModel.find({deleted: false});
        if (result) {
            return { status: true, message: "Contact messages retrieved", data: result }
        }
        return { status: false, message: "No contact messages found", data: {} }
    } catch (error) {
        return { status: false, message: error.message, data: {} }
    }
}

module.exports = contactDal;
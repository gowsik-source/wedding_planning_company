const footerEmailModel = require('../models/footerEmailModel');
const footerEmailDal = new Object();

// ---------------------------create

footerEmailDal.create = async (data) => {
    try {
        let payload = new footerEmailModel(data);
        let footerEmail = await payload.save();
        if (footerEmail) {
            return { status: true, message: "subscribed", data: footerEmail };
        }
        return { status: false, message: "Failed to subscribe", data: {} };
    } catch (error) {
        return { status: false, message: error.message, data: {} }
    }
}

footerEmailDal.emailExists = async (email) => {
    try {
        let query = ({deleted:false},{ email: email });
        let result = await footerEmailModel.findOne(query)
        if (result) {
            return { status: false, message: "Email already exists", data: null };
        }
        return { status: true, message: "Email success", data: result};
    } catch (error) {
        return { status: false, message: error.message, data: {} };
    }
}

module.exports = footerEmailDal;
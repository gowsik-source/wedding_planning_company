const footerEmailDal = require('../dal/footerEmailDal');
const footerController = new Object();

// ---------------------------create footer email subscription
footerController.create = async (req, res) => {
    try {
        let body = req.body;
        let emailCheck = await footerEmailDal.emailExists(body.email);
        if (emailCheck) {
            let result = await footerEmailDal.create(body);
            if (result) {
                return {code:200,status: true, message: result.message, data: result.data };
            }
            return {code:400, status: false, message: result.message, data: {} };
        }
    } catch (error) {
        return {code:500, status: false, message: error.message, data: {} };
    }
};

module.exports = footerController;
const contactDal = require('../dal/contactDal');
const contactController = new Object()

// ---------------------------------create contact message

contactController.create = async (req, res) => {
    try {
        let body = req?.body

        //create contact
        let create = await contactDal.create(body)
        console.log(create, "contact message created")
        if (create) {
            return { code: 200, status: create.status, data: create.data, message: "Contact message created" }
        }
        return { code: 400, status: false, data: null, message: "Contact message not created" }
    } catch (error) {
        return { code: 500, status: false, data: error ? error.message : "server error" }
    }
}

// ---------------------------------get contact messages

contactController.get = async (req, res) => {
    try {
        let result = await contactDal.get(req.body)
        if (result) {
            return { code: 200, status: result.status, data: result.data, message: result.message }
        }
        return { code: 400, status: result.status, data: null, message: result.message }
    } catch (error) {
        return { code: 500, status: false, data: error ? error.message : "server error" }
    }
}

module.exports = contactController;
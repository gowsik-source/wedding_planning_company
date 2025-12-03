const courseModel = require("../models/courseModel")
const courseDal = new Object()

// ----------------------------create

courseDal.create = async (data) => {
    try {
        let payload = new courseModel(data)
        let course = await payload.save()
        if (course) {
            return { status: true, message: "course created", data: course }
        }
        return { status: false, message: "Failed....", data: {} }
    }
    catch (err) {
        return { status: false, message: err.message, data: {} }
    }
}

// ------------------------------get

courseDal.getCourse = async (req) => {
    try {
        let query = [{ deleted: false }]
        if (req.courseName) {
            query.push({ courseName: req.courseName })
        }
        let result = await courseModel.aggregate()
            .match({ $and: query })
            .sort({ createdAt: -1 })
            .exec()
        if (result) {
            return { status: true, message: "course fetched", data: result }
        }
        return { status: false, message: "course not fetched", data: null }
    } catch (error) {
        return { status: false, message: error.message, data: {} }
    }
}

courseDal.findById = async (courseId) => {
    try {
        if (courseId) {
            let coursefound = await courseModel.findById(_id=courseId)
            console.log(coursefound,"course found")
            if (coursefound) {
                return { status: true, message: "course found", data: coursefound }
            }
        return { status: false, message: "failed", data: {} }
        }
    } catch (error) {
        return { status: false, message: error.message, data: {} }
    }
}

module.exports = courseDal
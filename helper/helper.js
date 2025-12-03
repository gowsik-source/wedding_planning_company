const helper = new Object()

helper.generate = async (length = 4) => {
    return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
}

module.exports = helper
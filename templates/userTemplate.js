const template = new Object()

template.registration = async (templateData) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
  <div style="display:flex;","gap:2rem;">
    <div>
    <h1>Welcome ${templateData.firstName}</h1>
    </div>
    <div>
    <h1>${templateData.secondName}</h1>
    </div>
  </div>
    <p>Password: ${templateData.password}</p>
</body>
</html> 
    `
}

module.exports = template
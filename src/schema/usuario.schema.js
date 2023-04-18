module.exports = {
    type: "object",
    properties: {
        email: {type: "string", format: "email"},
        senha: {type: "string"}
    },
    required: ["email", "senha"],
    additionalProperties: false
}
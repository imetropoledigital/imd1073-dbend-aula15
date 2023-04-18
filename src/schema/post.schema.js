module.exports = {
    type: "object",
    properties: {
        titulo: {type: "string", maxLength: 100, minLength: 5},
        texto: {type: "string"},
        userId: {type: "integer"}
    },
    required: ["titulo", "texto", "userId"],
    additionalProperties: false
}
const { Project, Page } = require("../../../db");
const jwt = require("jsonwebtoken");
const { secret, email_page, linkedin, github } = process.env;
const id = "principal" 

module.exports = {
    getPrincipal: async () => {
        const page = await Page.findOrCreate({
            where: { id },
            defaults: {
                name: "Benjamin",
                surname: "Miño",
                description: `Desarrollador Web. 
                    Provengo de la ciudad de Resistencia Chaco, 
                    pero actualmente vivo en la provincia de Buenos Aires donde obtuve la oportunidad laboral para adentrarme en el mundo IT.
                    En estos momentos me encuentro trabajando como Soporte IT en FRECOM SRL (con potencial para ser lider en su rubro), 
                    Tambien desarrollo en tecnologías como JavaScript, NodeJs, ReactJs, Reduxjs, PostgresSQL, ExpressJs. 
                    Incursionar en este ámbito me permitió aprender y desarrollarme en nuevos ambientes de trabajo. 
                    Mi objetivo es ganar mas experiencia, y ampliar mis conocimientos tecnológicos.`,
                github,
                linkedin,
                email: email_page
            },
            include: [
                Project
            ]
        });
        return page;
    },
    updatedPage: async (name, surname, description, email, github, linkedin) => {

    },
};
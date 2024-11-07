const { Project, Page } = require("../../../db");
const jwt = require("jsonwebtoken");
const { secret, email_page, linkedin, github } = process.env;

module.exports = {
    getPrincipal: async () => {
        const [ page ] = await Page.findOrCreate({
            where: { id: "principal" },
            default: {
                name: "Benjamin",
                surname: "Miño",
                description: `Desarrollador Web. <br/>
                    Provengo de la ciudad de Resistencia Chaco, 
                    pero actualmente vivo en la provincia de Buenos Aires con el objetivo de encontrar la oportunidad laboral en el mundo IT.
                    Para esto me estuve preparando en un proceso lindo de aprendizaje, 
                    que aun continua, desarrollo con tecnologías como JavaScript, NodeJs, ReactJs, Reduxjs, PostgresSQL, ExpressJs. 
                    Incursionar en este mundo me permitió aprender y desarrollarme en nuevos ambientes de trabajo. 
                    Mi objetivo es trabajar de esto mismo, y ampliar mis conocimientos tecnológicos.`,
                github,
                linkedin,
                email: email_page
            }
        });
        return page;
    }
};
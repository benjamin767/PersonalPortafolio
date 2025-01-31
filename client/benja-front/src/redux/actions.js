import axios from "axios";

export const GET_PROFILE = "GET_PROFILE";
export const LOGIN = "LOGIN";
export const COOKIE_SAVED = "COOKIE_SAVED";
export const LOGOUT = "LOGOUT";
export const SET_SPINNER = "SET_SPINNER";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_TECH = "CREATE_TECH";
export const GET_PRINPAL_PAGE = "GET_PRINPAL_PAGE";

axios.defaults.withCredentials = true;

export const getProfile = () => async (dispatch) => {
    dispatch(setSpinner(true));
    try {
        const profile = await axios.get(`http://localhost:3001/users/data`);
        dispatch({
            payload: profile.data,
            type: GET_PROFILE
        });
    } catch(error) {
        console.log(error.request.response);
    }
    dispatch(setSpinner(false));
};

export const createUser = ({ email, name, password }) => async (dispatch) => {
    dispatch(setSpinner(true));
    try {
        const profile = await axios.post(`http://localhost:3001/users`,{ email, name, password });
        dispatch({
            payload: {
                name: profile.data.name,
                id: profile.data.id
            },
            type: GET_PROFILE
        });
    } catch(error) {
        console.log(error.request.response);
        return { 
            error: true,
            data: error.request.response,
        };
    }
};

export const putUser = (email, name, id) => async (dispatch) => {
    dispatch(setSpinner(true));
    try {
        await axios.put(`http://localhost:3001/users/${id}`, { email, name })
        .then(res => {
            console.log(res.data);
        });
    } catch(error) {
        console.log(error.message);
    }   
    dispatch(setSpinner(false));
};

export const login = ({ email, password }) => async (dispatch) => {
    dispatch(setSpinner(true));
    try {
        await axios.post(`http://localhost:3001/users/login`, { 
            email, 
            password,
        }, {
            responseType: "json",
        }).then((res) => {
            dispatch({ 
                type: LOGIN,
                payload: res.data
            });
        });
    } catch(error) {
        console.log(error.message);
        return { 
            error: true,
            data: error.request.response,
        };
    }
};

export const logout = () => async (dispatch) => {
    dispatch(setSpinner(true));
    try {
        await axios.post("http://localhost:3001/users/logout")
        .then(() => {
            dispatch({
                type: LOGOUT,
                payload: {}
            })
        });
    } catch(error) {
        console.log(error.message)
    }
    dispatch(setSpinner(false));
};

export const sendEmail = async ({ email, name, text }) => {
    try {
        await axios.post(`http://localhost:3001/mail`, { email, name, text });
    } catch(error) {
        console.log(error.message);
    }
};

export const createProject = ({ title, image, description }) => {
    return async (dispatch) =>  {
      try { 
        await axios.post("http://localhost:3001/project", { title, image, description })
        .then((res) => dispatch({
            type: CREATE_PROJECT,
            payload: res.data
        }));
      } catch (error) {
        console.log(error.message)
      }
    };
};

export const uploadImage = async (file) => {

    try {
        const response = await axios.post("http://localhost:3001/aws", file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.data) {
            return response.data;
        } else {
            console.error("Error al subir el archivo:", response.message);
        }
    } catch (error) {
        console.error("Error al subir el archivo:", error);
    }
}

export const createTech = ({ name, image }) => {
    return async (dispatch) =>  {
      try { 
        await axios.post("http://localhost:3001/technologies", { name, image })
        .then((res) => dispatch({
            type: CREATE_TECH,
            payload: res.data
        }));
      } catch (error) {
        console.log(error.message);
      }
    };
};

export const getPrincipalPage = () => async (dispatch) => {
    try {
        await axios.get("http://localhost:3001/pages/principal")
        .then((res) => dispatch({
            type: GET_PRINPAL_PAGE,
            payload: res.data
        }));
    } catch(error) {

    }
};

export const setSpinner = (data) => {
    return {
        type: SET_SPINNER,
        payload: data
    }
}
import { message } from 'antd';
import axios from 'axios';

export const getAllCars = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/cars/getallcars')
        dispatch({ type: 'GET_ALL_CARS', payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }

}

// Redux action to fetch mycars
export const getMyCars = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const token = localStorage.getItem('user');
        const response = await axios.get('/api/cars/mycars', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'GET_MY_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.error('Error fetching my cars:', error);
        dispatch({ type: 'LOADING', payload: false });
    }
};


export const addCar = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
         const token = localStorage.getItem('user');
        await axios.post('/api/cars/addcar', reqObj,{headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({ type: 'LOADING', payload: false })
        message.success('New car added successfully')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}

export const editCar = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/cars/editcar', reqObj)

        dispatch({ type: 'LOADING', payload: false })
        message.success('Car details updated successfully')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}

export const deleteCar = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/cars/deletecar', reqObj)

        dispatch({ type: 'LOADING', payload: false })
        message.success('Car deleted successfully')
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}
export const setLocation = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        dispatch({ type: 'setLocation', payload: reqObj })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}
export const setType = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        dispatch({ type: 'setType', payload: reqObj })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}
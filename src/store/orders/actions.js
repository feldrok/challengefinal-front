import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = process.env.REACT_APP_API_URL

const handleToken = () => {
    const BEARER_TOKEN = localStorage.getItem('token')

    let config = {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    }
    return config
}

const getUserOrders = createAsyncThunk('orders/getUserOrders', async () => {
    try {
        const response = await axios.get(`${API_URL}/checkout`, handleToken())
        return {
            orders: response.data,
            message: response.data.message,
        }
    } catch (error) {
        return {
            orders: null,
            message: error.response.data.message,
        }
    }
})

const orderActions = {
    getUserOrders,
}

export default orderActions

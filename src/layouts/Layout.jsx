import { Outlet, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Footer from './Footer'
import Nav from './Nav'
import { Toaster } from 'react-hot-toast'
import cryptoRandomString from 'crypto-random-string'
import userActions from '../store/users/actions'

const { signInToken } = userActions

function Layout() {
    const [isLogged, setIsLogged] = useState(false)
    const storeUser = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        let token = localStorage.getItem('token')
        dispatch(signInToken({ token: token }))
        if (storeUser.user?.success === true) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
            let guestToken = localStorage.getItem('guestToken')
            if (!guestToken) {
                let generateToken = cryptoRandomString({ length: 24 })
                localStorage.setItem('guestToken', generateToken)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, storeUser.user?.success])

    return (
        <>
            <Nav session={isLogged} />
            <Toaster />
            <div className="pt-20">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout

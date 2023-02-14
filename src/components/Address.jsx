import React, { useState } from 'react'

import { CheckIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { RadioGroup } from '@headlessui/react'
import { useSelector } from 'react-redux'

function Address({ cart }) {
    const storeAddress = useSelector((state) => state.address)
    const addressess = storeAddress.addresses?.response
    const [activeAddress, setActiveAddress] = useState(addressess[0]?._id)

    return (
        <div className="flex w-full flex-col items-center justify-center p-4">
            <RadioGroup
                className="flex flex-col flex-wrap items-center justify-center gap-2 md:flex-row"
                value={activeAddress}
                onChange={setActiveAddress}
            >
                {storeAddress.addresses?.response?.map((address) => (
                    <RadioGroup.Option
                        className={({ checked }) => `
                            ${
                                checked
                                    ? 'bg-tertiary-500 text-white shadow-none'
                                    : 'bg-white text-black shadow-md'
                            }
                            relative my-2 flex h-40 w-60 max-w-xs cursor-pointer select-none items-center rounded-md border px-16 py-4`}
                        key={address._id}
                        value={address._id}
                        checked={address._id === activeAddress}
                    >
                        <div>
                            <div>{address.street}</div>
                            <div>
                                {address.city}, {address.state}
                            </div>
                            <div>{address.zipcode}</div>
                            <div>{address.country}</div>
                        </div>
                        <CheckIcon className="absolute right-0 top-0 m-4  h-6 w-6 ui-checked:block ui-not-checked:hidden" />
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
            <Link
                className="mt-10 self-center rounded-md bg-tertiary-500 p-4 font-medium text-white duration-300 hover:bg-tertiary-400"
                to={`/billing-detail/${activeAddress}`}
            >
                Continuar
            </Link>
        </div>
    )
}

export default Address

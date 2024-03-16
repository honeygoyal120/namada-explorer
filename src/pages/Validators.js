import { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';

function Home () {
    const[validatorData, setValidatorData] = useState({})

    useEffect(() => {
        (async () => {
            const _response = await axios.get(process.env.REACT_APP_RPC_ENDPOINT + "/validators")
            console.log(_response)
            setValidatorData(_response["data"]["result"])
        })();
    },[])

    function ValidatorPane ({ _validatorData }) {
        return (
            <div className='flex items-center justify-between w-full border-t border-gray-500 py-4'>
                <div className='text-[14px] w-content truncate'>{_validatorData["address"]}</div>
                <div className='text-[14px]'>{parseFloat(_validatorData["voting_power"]/1000000)} NAAN</div>
                <div>{_validatorData["proposer_priority"]}</div>
            </div>
        )
    }

    return (
        <div className='bg-[#1A1A1A] h-screen w-full overflow-auto'>
            <div className='w-full h-20'></div>
            <div className='w-full flex items-center justify-between p-4 space-x-6'>
                <div className='w-full bg-black text-white p-6 rounded-md overflow-x-scroll'>
                    <div>
                        <div className='text-xl'>Validators</div>
                        <div className='text-gray-500'>Top Validators</div>
                    </div>
                    <div className='mt-6 px-4'>
                        <div className='flex justify-between py-4 font-bold text-md'>
                            <div className='w-80'>Address</div>
                            <div>Voting Power</div>
                            <div>Proposer Priority</div>
                        </div>
                        <div>
                            {
                                JSON.stringify(validatorData) !== '{}' && validatorData !== undefined ? validatorData["validators"].map(element => {
                                    return (
                                        <ValidatorPane _validatorData={element}/>
                                    )
                                }) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
import { useEffect, useRef, useState } from 'react';
import { NavLink as Link, useParams, useNavigate } from 'react-router-dom';

function Search () {
    const navigate = useNavigate();
    let { id } = useParams();
    const searchInput = useRef()

    function Proposal({proposal}) {
        const [voteData, setVoteData] = useState({})
        useEffect(() => {
            (async () => {
                let response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/tx/vote_proposal/" + proposal.slice(1,proposal.length));
                const _voteData = await response.json();
                if(_voteData !== null) {
                    setVoteData({
                        'vote_id': _voteData['id'],
                        'vote': _voteData['vote'],
                        'voter': _voteData['voter'],
                        'txn_id': _voteData['tx_id'],
                        'delegations': _voteData['delegations']
                    })
                }
                
            })();
        },[])
        return (
            <div className='p-2 flex items-center justify-center h-[30rem] sm:h-[35rem] md:h-[38rem] xl:h-[45rem]'>
                <div className='p-3 md:p-4 lg:p-6 text-[14px] sm:text-md md:text-lg space-y-2 lg:space-y-3 2xl:space-y-4 rounded-[15px] bg-[#1A1A1A] w-full sm:w-4/5 h-content max-h-full overflow-x-auto overflow-y-hidden'>
                    <div class='flex space-x-2'><div>Vote Id:</div> <div className='text-[#FFFF00]'>{voteData['vote_id']}</div></div>
                    <div class='flex space-x-2'><div>Vote:</div> <div className={`${voteData['vote'] === 'yay'? 'text-green-500' : 'text-red-500'}`}>{voteData['vote']}</div></div>
                    <div class='flex space-x-2'><div>Voter:</div> <div className='text-[#FFFF00]'>{voteData['voter']}</div></div>
                    <div class='flex space-x-2'><div>Txn Hash:</div> <button onClick={() => {navigate('/search/' + voteData['txn_id'])}} className='text-[#FFFF00] underline'>{voteData['txn_id']}</button></div>
                    <div class=''>
                        <div>Delegations:</div> 
                        <div className='space-y-2 max-h-[370px] overflow-y-scroll bg-black'>
                        {
                            voteData['delegations']?.map(addr => {
                                return (<div className='truncate text-[#FFFF00] py-2 px-4'>{addr}</div>)
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function Hash({hash}) {
        const[txnData, setTxnData] = useState({})
        useEffect(() => {
            (async () => {
                let response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/tx/" + hash);
                const _txnData = await response.json();
                if(_txnData !== null) {
                    response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/hash/" + _txnData['block_id']);
                    const _blockData = await response.json();
                    if(_blockData !== null) {
                        setTxnData({
                            'chain_id': _blockData['header']['chain_id'],
                            'block_time': _blockData['header']['time'],
                            'block_height': _blockData['header']['height'],
                            'block_hash': _txnData['block_id'],
                            'txn_hash': _txnData['hash'],
                            "txn_type": _txnData["tx_type"],
                            "fee_amount_per_gas_unit": _txnData["fee_amount_per_gas_unit"],
                            "fee_token": _txnData["fee_token"],
                            "gas_limit_multiplier": _txnData["gas_limit_multiplier"],
                            "code": _txnData["code"],
                            "data": _txnData["data"],
                            'status': _txnData['return_code'] !== null ? 'Success' : 'Failed',
                            "tx": _txnData['tx']
                        })
                    }
                }
                
            })();
        },[])
        return (
            <div className='p-2 flex items-center justify-center h-[30rem] sm:h-[35rem] md:h-[38rem]'>
                <div className='p-3 md:p-4 lg:p-6 text-[14px] sm:text-md md:text-lg space-y-2 lg:space-y-3 2xl:space-y-4 rounded-[15px] bg-[#1A1A1A] w-full sm:w-4/5 h-content max-h-full overflow-x-auto'>
                    <div class='flex space-x-1 md:space-x-2'><div>Chain Id:</div> <div className='text-[#FFFF00]'>{txnData['chain_id']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Block Height:</div> <button onClick={() => {navigate('/search/' + txnData['block_height'])}} className='text-[#FFFF00] underline'>{txnData['block_height']}</button></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Status :</div> <div className={`${txnData['status'] === 'Success' ? 'text-green-500' : 'text-red-500'}`}>{txnData['status']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Block Time:</div> <div className='text-[#FFFF00]'>{txnData['block_time']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Block Hash:</div> <div className='text-[#FFFF00]'>{txnData['block_hash']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Txn Hash:</div> <div className='text-[#FFFF00]'>{txnData['txn_hash']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Txn Type:</div> <div className='text-[#FFFF00]'>{txnData['txn_type']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Fee amount per gas unit:</div> <div className='text-[#FFFF00]'>{txnData['fee_amount_per_gas_unit']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Fee Token:</div> <div className='text-[#FFFF00]'>{txnData['fee_token']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Gas Limit Multiplier:</div> <div className='text-[#FFFF00]'>{txnData['gas_limit_multiplier']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Code:</div> <div className='text-[#FFFF00]'>{txnData['code']}</div></div>
                    <div class='flex space-x-1 md:space-x-2'><div>Data:</div> <div className='truncate text-[#FFFF00]'>{txnData['data']}</div></div>
                </div>
            </div>
        )
    }

    function Height({height}) {
        const[blockData, setBlockData] = useState({})
        useEffect(() => {
            (async () => {
                const response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/height/" + height);
                const _blockData = await response.json();
                if(_blockData !== null) {
                    setBlockData({
                        'block_height': _blockData['header']['height'],
                        'block_time': _blockData['header']['time'],
                        'chain_id': _blockData['header']['chain_id'],
                        'proposer': _blockData['header']['proposer_address'],
                        "txn_hash": _blockData["tx_hashes"],
                        "txn_size": _blockData["tx_hashes"].length,
                    })
                }
                
            })();
        },[])
        return (
            <div className='h-content space-y-6 flex flex-col space-x-6'>
                <div className='p-4'>
                    <div className='rounded-md border bg-black text-white'>
                        <div>Block Overview</div>
                    </div>
                </div>
                {/* <div className='p-3 md:p-6 space-y-2 text-[10px] sm:text-xs md:text-md md:space-y-4 lg:space-y-6 rounded-[15px] bg-[#1A1A1A] w-[370px] sm:w-[550px] xl:w-[600px] h-content xl:text-lg xl:space-y-8 2xl:text-lg 2xl:w-[700px]'>
                    <div class='flex space-x-2'><div>Chain Id:</div> <div className='text-[#FFFF00]'>{blockData['chain_id']}</div></div>
                    <div class='flex space-x-2'><div>Block Height:</div> <div className='text-[#FFFF00] underline'>{blockData['block_height']}</div></div>
                    <div class='flex space-x-2'><div>Block Time:</div> <div className='text-[#FFFF00]'>{blockData['block_time']}</div></div>
                    <div class='flex space-x-2'><div>Proposer:</div> <div className='text-[#FFFF00]'>{blockData['proposer']}</div></div>
                    <div class='flex space-x-2'><div>Txns Count:</div> <div className='text-[#FFFF00]'>{blockData['txn_size']}</div></div>
                </div>
                <div className='p-2 md:p-3 xl:p-4 space-y-2 md:space-y-4 lg:space-y-6 flex flex-col items-center rounded-[15px] bg-[#1A1A1A] h-[300px] sm:h-[350px] min-w-[370px] sm:min-w-[400px] max-w-[370px] sm:max-w-[1200px] lg:min-w-[500px] xl:min-w-[700px] sm:w-content xl:h-[700px]'>
                    <div className='border-b-2 w-full text-center py-1 md:py-2 text-md sm:text-lg md:text-xl xl:text-2xl'>Transactions</div>
                    <div className='space-y-2 md:space-y-3 lg:space-y-4 overflow-y-scroll'>
                        {
                            blockData['txn_hash']?.map(txn => {
                                return (
                                    <div className='w-full text-[#FFFF00] bg-black p-2 sm:p-4 md:px-4 xl:px-6'>
                                        <button className='text-[8px] sm:text-xs lg:text-md xl:text-lg truncate underline' onClick={() => {navigate('/search/' + txn['hash_id'])}}>{txn['hash_id']}</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> */}
            </div>
        )
    }

    return (
        <div className="bg-[#1A1A1A] h-screen w-full overflow-auto">
            <div className='w-full py-4 border'>
                <form class="flex items-center max-w-lg mx-auto">   
                    <label for="voice-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input ref={searchInput} onChange={e => {searchInput.current = e.target.value}} type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By Block Height / Txn Hash" required />
                    </div>
                    <button onClick={() => {if(typeof(searchInput.current) !== 'object'){navigate('/search/' + searchInput.current)} }} type="submit" class="text-black inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#FFAE1F] rounded-md bg-[#FFAE1F] focus:ring-4 focus:outline-none focus:ring-[#FFAE1F] dark:bg-[#FFAE1F] dark:hover:bg-[#FFAE1F] dark:focus:ring-[#FFAE1F]">
                        <div className='text-white font-bold'>Search</div>
                    </button>
                </form>
            </div>
            <div className='grow w-full'>
                {
                    id !== undefined ? 
                        isNaN(id) ?
                            (id.slice(0,1) === 'p' && !isNaN(id.slice(1,id.length))) ?
                                <Proposal proposal={id}/> : <Hash hash={id}/> : <div><Height height={id}/></div> : ''
                }
            </div>
        </div>
    )
}

export default Search;
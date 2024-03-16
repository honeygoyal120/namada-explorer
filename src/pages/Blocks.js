import { useEffect, useState, useMemo, useRef } from 'react';
import { NavLink as Link, useParams, useNavigate } from 'react-router-dom';

const useMap = () => {
    const [map, setMap] = useState(new Map());
    const actions = useMemo(
      () => ({
        set: (key, value) =>
          setMap(prevMap => {
            const nextMap = new Map(prevMap);
            nextMap.set(key, value);
            return nextMap;
          }),
        remove: (key) =>
          setMap(prevMap => {
            const nextMap = new Map(prevMap);
            nextMap.delete(key);
            return nextMap;
          }),
        clear: () => setMap(new Map()),
      }),
      [setMap]
    );
  
    return [map, actions];
  };

function Blocks () {
    const navigate = useNavigate();

    let { page } = useParams();
    const [blockData, { set, remove, clear }] = useMap();
    const[latestBlock, setLatestBlock] = useState(0)
    const [pageId, setPageId] = useState()
    const blockIs = useRef(0);
    const pageSize = 10;
    if(page === undefined) {
        page = 1
    }

    const getBlockData = async () => {
        if(parseInt(blockIs.current) > 0) {
            const response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/last");
            const _blockData = await response.json();
            const _latestBlock = _blockData["header"]["height"]
            if(_latestBlock !== blockIs.current) {
                let index = 0
                const currBlock = parseInt(blockIs.current)
                for(let i = currBlock + 1; i <= _latestBlock; i++) {
                    remove((currBlock - pageSize + 1 + index).toString())
                    const int_response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/height/" + i);
                    const int_blockData = await int_response.json();
                    if(int_blockData !== null) {
                        set(int_blockData["header"]["height"], {
                            "block_time": int_blockData["header"]["time"],
                            "block_height": int_blockData["header"]["height"],
                            "block_hash": int_blockData["header"]["last_block_id"]["hash"],
                            "txn_hash": int_blockData["tx_hashes"],
                            "txn_size": int_blockData["tx_hashes"].length,
                            "proposer": int_blockData["header"]["proposer_address"]
                        })
                        index++;
                        setLatestBlock(_latestBlock) 
                        blockIs.current = _latestBlock
                    }
                }
            }
        }
    }

    useEffect(() => {
        if(page === undefined) {
            page = 1
        }
        if(!isNaN(page)) {
            (async () => {
                clear()
                const response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/last");
                const _blockData = await response.json();
                const _latestBlock = _blockData["header"]["height"]
                if(_blockData !== null && _blockData["header"] != null && _blockData["header"]["height"] !== null && _blockData["header"]["height"] >= 5) {
                    for(let i = _latestBlock - (pageSize * (page - 1)); i > _latestBlock - (pageSize * (page - 1)) - pageSize; i--) {
                        const int_response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/height/" + i);
                        const int_blockData = await int_response.json();
                        set(int_blockData["header"]["height"], {
                            "block_time": int_blockData["header"]["time"],
                            "block_height": int_blockData["header"]["height"],
                            "block_hash": int_blockData["header"]["last_block_id"]["hash"],
                            "txn_hash": int_blockData["tx_hashes"],
                            "txn_size": int_blockData["tx_hashes"].length,
                            "proposer": int_blockData["header"]["proposer_address"]
                        })
                    }
                    setLatestBlock(_latestBlock) 
                    blockIs.current = _latestBlock
                }
                
            })();
            if (parseInt(page) === 1) {
                const interval = setInterval(() => {
                    getBlockData();
                }, 5000);
            
                return () => clearInterval(interval);
            }
        }

    },[pageId])
    
    function BlockPane ({ blockId }) {
        const _blockData = blockData.get(blockId)
        const timeDiff = new Date() - new Date(_blockData["block_time"]);
        let timeAgo = ""
        if(timeDiff < 1000) {
            timeAgo = timeDiff + " millisecs ago"
        } else if((timeDiff/1000) < 60) {
            timeAgo = parseInt((timeDiff/1000)) + " secs ago"
        } else if((timeDiff/60000) < 60) {
            timeAgo = parseInt((timeDiff/60000)) + " mins ago"
        } else {
            timeAgo = parseInt((timeDiff/360000)) + " hours ago"
        }
        return (
            <div className='flex items-center justify-between w-full border-t border-gray-500 py-4'>
                <div className='flex space-x-2'>
                    <div className='text-[#00FFFF]'>
                        <div class="bg-opacity-5 rounded-lg justify-center items-center gap-2.5 flex">
                            <div class="relative">
                                {/* <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                    <svg className='w-[45px] h-[45px] sm:w-[60px] sm:h-[60px]' xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 444 511.89"><path d="m141.96 202.46 74.34-41.56v-50.41c-12.75-7.47-25.72-14.71-38.4-22.26-.17.13-.34.26-.53.37L99.7 133.52v43.32l.08.05 42.18 25.57zm36.25 220.13 38.09-21.3v-49.97l-76.57-44.46-40.07 23.13c.03.74.04 1.58.04 2.56v44.62l78.51 45.42zm48.63-21.85 37.29 21.59.95.52 79.22-45.81.02-45.91-41.28-23.83-76.2 44.31v49.13zm44.61 30.24.03 2.21v48.4c0 1.42-.66 2.69-1.94 3.35l-43.69 25.42c-3.2 1.86-3.58 2.12-6.77.23-14.38-8.47-29.07-16.62-43.36-25.2-3.33-1.92-4.01-2.08-3.93-5.95l.01-48.75-76.91-44.49-.19-.12-40.63 23.63c-3.2 1.86-3.58 2.12-6.77.24-14.38-8.48-29.07-16.62-43.36-25.2-3.33-1.93-4.01-2.09-3.93-5.96l.01-51.35c0-1.84 1.33-2.64 2.66-3.41l.17-.09 1.32-.74 41.55-23.22v-89.47c-13.88-8.14-28.02-16-41.78-24.26-3.33-1.93-4.01-2.09-3.93-5.96l.01-51.35c0-1.84 1.33-2.64 2.66-3.41l.17-.09 1.32-.74 44.01-24.6c1.92-1.06 2.51-1.01 4.39.05l39.78 23.03 2.45 1.36 76.99-44.52.01-50.41c0-1.84 1.33-2.64 2.66-3.41l.17-.09 1.32-.74L219.96.77c1.92-1.06 2.51-1.01 4.39.06l39.78 23.03 2.52 1.39c4.23 2.26 4.83 2.58 4.83 9.47v45.17l76.58 44.28.16.1 43.24-24.17c1.91-1.06 2.51-1.01 4.39.05l39.78 23.03 2.52 1.4c4.22 2.26 4.83 2.58 4.83 9.47v48.39c0 1.42-.66 2.69-1.95 3.35l-43.01 25.03-.03 88.49 38.66 22.38 2.52 1.39c4.22 2.26 4.83 2.59 4.83 9.47v48.39c0 1.43-.66 2.69-1.95 3.36l-43.69 25.41c-3.2 1.86-3.57 2.12-6.76.24-13.88-8.18-28.03-16.05-41.85-24.3l-.46.32-77.84 45.01zm-86.81-2.56 37.65 22.68 36.17-21.96.07-.42-35.52-22.12c-.46.13-.94.2-1.44.2-.23 0-.47-.01-.69-.05l-36.24 21.67zm34.01 73.78v-44.84l-38.01-22.62c-.53.08-1.07.06-1.61-.06v44.24l39.62 23.28zm44.26-67-37.02 22.18v44.87l38.35-22.65v-44.58c-.44.13-.88.19-1.33.18zm-36.07-323.9v49.67l74.1 42.94 42.1-24.33.24-.14.02-46.21-76.18-44.06c-.35-.2-.68-.45-.96-.74l-39.32 22.87zm-42.2-81.36 37.65 22.68 36.55-22.19-36.75-22.88-37.45 22.39zm34.01 73.79V58.88l-39.62-23.57v45.13l39.62 23.29zm45.59-67.8L225.89 58.9v44.87l38.35-22.65V35.93zm124.53 264.74c-.03-.25-.04-.49-.04-.74l.05-89.54c-13.02-7.64-26.27-15.03-39.22-22.74-.35.39-.78.74-1.26 1.02l-41.95 24.24v84.19l43.69 25.22 38.73-21.65zm-35.06 33.76c-.68.24-1.43.34-2.16.28v43.56l39.62 23.29v-44.85l-37.46-22.28zm3.45-6.66 37.64 22.68 36.56-22.19-36.76-22.88-37.44 22.39zm79.6 5.99-38.36 22.97v44.87l38.36-22.65v-45.19zM92.7 321.88l42.38-24.47v-86.86l-39.11-23.72-40.99 23.85v89.37l37.37 21.64.35.19zm-42.12-16.33-.23.01-.32-.01-37.17 22.22 37.65 22.68 36.55-22.19-36.48-22.71zm-3.71 96.01v-44.85L7.25 333.14v45.13l39.62 23.29zm45.59-67.8-38.35 22.97v44.87l38.35-22.65v-45.19zm-.61-152.95c.07-.67.28-1.32.61-1.94v-43.61l-38.35 22.97v44.87l37.74-22.29zm-78.99-51.54 37.65 22.68 36.55-22.19-36.75-22.88-37.45 22.39zm34.01 73.79v-44.85L7.25 134.64v45.13l39.62 23.29zm309.27-73.79 37.64 22.68 36.56-22.19-36.76-22.88-37.44 22.39zm34.01 73.79v-44.85l-39.62-23.57v45.13l39.62 23.29zm45.59-67.8-38.36 22.97v44.87l38.36-22.65v-45.19zM217.32 341.93v-82.99l-73.25-43.58v83.52l73.25 43.05zm80.02-125.5-71.02 42.56v83.02l71.02-41.95v-83.63zm-75.81-48.7-69.33 41.45 69.65 41.97 67.68-41.09-68-42.33z"/></svg>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='py-1 flex flex-col justify-between'>
                        <Link to={`/search/${_blockData["block_height"]}`}><button className='text-sm text-[#FFFF00] underline'>#{_blockData["block_height"]}</button></Link>
                        <div className='text-[10px] sm:text-xs'>{timeAgo}</div>
                    </div>
                </div>
                <div className='text-[14px] w-[100px] truncate'>{_blockData["block_hash"]}</div>
                <div className='text-[14px] w-[120px] truncate'>{_blockData["proposer"]}</div>
                <div>{_blockData["txn_size"]}</div>
            </div>
        )
    }

    return (
        <div className="bg-[#1A1A1A] h-screen w-full overflow-auto">
            <div className='w-full h-20'></div>
            <div className='w-full flex items-center justify-between p-4 space-x-6'>
                <div className='w-full bg-black text-white p-6 rounded-md overflow-x-auto'>
                    <div>
                        <div className='text-xl'>Blocks</div>
                        <div className='text-gray-500'>Latest Blocks</div>
                    </div>
                    <div className='mt-6 px-4'>
                        <div className='flex justify-between py-4 font-bold'>
                            <div className='w-24'>Block</div>
                            <div className='w-24'>Hash</div>
                            <div>Proposer</div>
                            <div>Txns</div>
                        </div>
                        <div>
                            {
                                [...blockData.keys()].sort((a, b) => (b - a)).map((element) => {
                                    return (
                                        <BlockPane blockId={element}/>
                                    )
                                })    
                            }
                        </div>
                        <div className='rounded-md w-full py-2 sm:py-3 lg:py-4 bg-[#FFAE1F] font-semibold text-md text-[#1A1A1A]'>
                        <div className='flex justify-center space-x-4 text-lg font-bold'>
                            <button onClick={() => {navigate('/blocks/' + (parseInt(page) - 1)); setPageId(parseInt(page) + 1)}} className={`${parseInt(page) === 1 ? 'hidden ' : ' '} hover:text-[#FFFF00]`}>{'<'}</button>
                            <div >{page}</div>
                            <button onClick={() => {navigate('/blocks/' + (parseInt(page) + 1)); setPageId(parseInt(page) + 1)}} className='hover:text-[#FFFF00]'>{'>'}</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blocks;
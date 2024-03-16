import React, { useState, useEffect } from "react";
import { NavLink as Link } from 'react-router-dom';
import user from '../user.png'

function Navbar () {
    const [pageURL, setPageURL] = useState(0);
    const [showTab, setShowTab] = useState(false);

    useEffect(() => {
        const arrayA = window.location.href.split("/")
        if(arrayA[arrayA.length - 1] === 'blocks' || arrayA[arrayA.length - 2] === 'blocks') {
            setPageURL("BLOCKS");
        } else if (arrayA[arrayA.length - 1] === 'search' || arrayA[arrayA.length - 2] === 'search') {
            setPageURL("SEARCH");
        } else if (arrayA[arrayA.length - 1] === 'validators' || arrayA[arrayA.length - 2] === 'validators') {
            setPageURL("VALIDATORS");
        } else {
            setPageURL("HOME");
        }
    })

    return (
        <div>
            {
                showTab ?
                    <div className='px-4 h-screen bg-black space-y-10 w-80 border fixed'>
                        <div className="flex-none flex items-center justify-center text-center py-6 space-x-6">
                            <button onClick={() => setShowTab(false)} className="rounded p-1.5 bg-white">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M5 17H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M5 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                            <Link to='/' className='flex items-center space-x-1'>
                                <svg width="200" height="19" viewBox="0 0 198 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.0555 18.9998H13.8612V6.35257H6.18265V18.9998H0.98584V1.15576H19.0555V18.9998Z" fill="#FFFF00"></path><path d="M77.5562 1.16602H72.3594V18.9998H77.5562V1.16602Z" fill="#FFFF00"></path><path d="M89.683 1.16602H84.4862V18.9998H89.683V1.16602Z" fill="#FFFF00"></path><path d="M83.6197 1.16602H78.4229V18.9998H83.6197V1.16602Z" fill="#FFFF00"></path><path d="M161.849 10.952H156.652C156.652 8.42155 154.593 6.36282 152.063 6.36282V1.16602C157.46 1.16602 161.849 5.55523 161.849 10.952Z" fill="#FFFF00"></path><path d="M161.995 18.5178H144.674V1.16602H149.871V13.3235H161.995V18.5178Z" fill="#FFFF00"></path><path d="M184.994 7.46045H179.797V12.706H184.994V7.46045Z" fill="#FFFF00"></path><path d="M197.121 7.46045H191.924V12.706H197.121V7.46045Z" fill="#FFFF00"></path><path d="M191.058 7.46045H185.861V12.706H191.058V7.46045Z" fill="#FFFF00"></path><path d="M191.058 1.16602H185.861V6.41153H191.058V1.16602Z" fill="#FFFF00"></path><path d="M184.994 13.7544H179.797V18.9999H184.994V13.7544Z" fill="#FFFF00"></path><path d="M197.121 13.7544H191.924V18.9999H197.121V13.7544Z" fill="#FFFF00"></path><path d="M184.994 1.16602H179.797V6.41153H184.994V1.16602Z" fill="#FFFF00"></path><path d="M197.121 1.16602H191.924V6.41153H197.121V1.16602Z" fill="#FFFF00"></path><path d="M126.289 18.7639H121.092V6.11673H113.416V18.7639H108.219V0.919922H126.289V18.7639Z" fill="#FFFF00"></path><path d="M119.854 9.84957C119.854 11.2853 118.69 12.4467 117.257 12.4467C115.821 12.4467 114.66 11.2827 114.66 9.84957C114.66 8.41384 115.824 7.25245 117.257 7.25245C118.69 7.24988 119.854 8.41384 119.854 9.84957Z" fill="#FFFF00"></path><path d="M45.9706 1.1792L40.8276 10.0858H51.111L45.9706 1.1792Z" fill="#FFFF00"></path><path d="M40.8277 10.083L35.6847 18.9871H45.9706L40.8277 10.083Z" fill="#FFFF00"></path><path d="M51.1111 10.083L45.9707 18.9871H56.2541L51.1111 10.083Z" fill="#FFFF00"></path></svg>
                            </Link>
                        </div>
                        <div className='flex-1 flex flex-col items-center justify-center space-y-2 font-semibold text-white'>
                            <Link onClick={() => {setPageURL("HOME"); setShowTab(false);}} to='/'className={`${pageURL === 'HOME' ? "bg-[#FFAE1F] rounded-lg": " "} flex items-center space-x-4 justify-start hover:text-[#FFFF00] w-full`}>
                                <div class={`${pageURL === 'HOME' ? "bg-opacity-5": " "} p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                        <svg width="25px" height="25px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 4.69632H9" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M19 4.69632H21C21.28 4.69632 21.5 5.00995 21.5 5.40913V21.0909C21.5 21.49 21.28 21.8037 21 21.8037H19.37H14.62H9.37H4.62H3C2.72 21.8037 2.5 21.49 2.5 21.0909V5.40913C2.5 5.00995 2.72 4.69632 3 4.69632H5" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4.5 8.69632H19.5" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M17 3.19632V6.19632" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M7 3.19632V6.19632" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                <div>Dashboard</div>
                            </Link>
                            <Link onClick={() => {setPageURL("BLOCKS"); setShowTab(false);}} to='/blocks' className={`${pageURL === 'BLOCKS' ? "bg-[#FFAE1F] rounded-lg": " "} flex items-center space-x-4 justify-start hover:text-[#FFFF00] w-full`}>
                                <div class={`${pageURL === 'BLOCKS' ? "bg-opacity-5": " "} p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                        <svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21,11H17.5V3a1,1,0,0,0-1-1h-9a1,1,0,0,0-1,1v8H3a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V12A1,1,0,0,0,21,11ZM11,20H4V13h7ZM8.5,11V4h7v7ZM20,20H13V13h7Z"/></svg>
                                    </div>
                                </div>
                                <div>Blocks</div>
                            </Link>
                            <Link onClick={() => {setPageURL("VALIDATORS"); setShowTab(false)}} to='/validators' className={`${pageURL === 'VALIDATORS' ? "bg-[#FFAE1F] rounded-lg": " "} flex items-center space-x-4 justify-start hover:text-[#FFFF00] w-full`}>
                                <div class={`${pageURL === 'VALIDATORS' ? "bg-opacity-5": " "} p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex `}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                        <img src={user} className="h-6 w-6"/>
                                    </div>
                                </div>
                                <div>Validators</div>
                            </Link>
                            <Link onClick={() => {setPageURL("SEARCH"); setShowTab(false)}} to='/search' className={`${pageURL === 'SEARCH' ? "bg-[#FFAE1F] rounded-lg": " "} flex items-center space-x-4 justify-start hover:text-[#FFFF00] w-full`}>
                                <div class={`${pageURL === 'SEARCH' ? "bg-opacity-5": " "} p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75] text-black">
                                        <svg width="25" height="25" viewBox="0 0 50 50" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg>
                                    </div>
                                </div>
                                <div>Search</div>
                            </Link>
                        </div> 
                    </div>
                 : <div className="px-8 flex-none flex items-center justify-center text-center py-6 space-x-6 fixed">
                        <button onClick={() => setShowTab(true)} className="rounded p-1.5 bg-white">
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                <path d="M5 17H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                <path d="M5 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <Link to='/' className='flex items-center space-x-1'>
                            <svg width="200" height="19" viewBox="0 0 198 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.0555 18.9998H13.8612V6.35257H6.18265V18.9998H0.98584V1.15576H19.0555V18.9998Z" fill="#FFFF00"></path><path d="M77.5562 1.16602H72.3594V18.9998H77.5562V1.16602Z" fill="#FFFF00"></path><path d="M89.683 1.16602H84.4862V18.9998H89.683V1.16602Z" fill="#FFFF00"></path><path d="M83.6197 1.16602H78.4229V18.9998H83.6197V1.16602Z" fill="#FFFF00"></path><path d="M161.849 10.952H156.652C156.652 8.42155 154.593 6.36282 152.063 6.36282V1.16602C157.46 1.16602 161.849 5.55523 161.849 10.952Z" fill="#FFFF00"></path><path d="M161.995 18.5178H144.674V1.16602H149.871V13.3235H161.995V18.5178Z" fill="#FFFF00"></path><path d="M184.994 7.46045H179.797V12.706H184.994V7.46045Z" fill="#FFFF00"></path><path d="M197.121 7.46045H191.924V12.706H197.121V7.46045Z" fill="#FFFF00"></path><path d="M191.058 7.46045H185.861V12.706H191.058V7.46045Z" fill="#FFFF00"></path><path d="M191.058 1.16602H185.861V6.41153H191.058V1.16602Z" fill="#FFFF00"></path><path d="M184.994 13.7544H179.797V18.9999H184.994V13.7544Z" fill="#FFFF00"></path><path d="M197.121 13.7544H191.924V18.9999H197.121V13.7544Z" fill="#FFFF00"></path><path d="M184.994 1.16602H179.797V6.41153H184.994V1.16602Z" fill="#FFFF00"></path><path d="M197.121 1.16602H191.924V6.41153H197.121V1.16602Z" fill="#FFFF00"></path><path d="M126.289 18.7639H121.092V6.11673H113.416V18.7639H108.219V0.919922H126.289V18.7639Z" fill="#FFFF00"></path><path d="M119.854 9.84957C119.854 11.2853 118.69 12.4467 117.257 12.4467C115.821 12.4467 114.66 11.2827 114.66 9.84957C114.66 8.41384 115.824 7.25245 117.257 7.25245C118.69 7.24988 119.854 8.41384 119.854 9.84957Z" fill="#FFFF00"></path><path d="M45.9706 1.1792L40.8276 10.0858H51.111L45.9706 1.1792Z" fill="#FFFF00"></path><path d="M40.8277 10.083L35.6847 18.9871H45.9706L40.8277 10.083Z" fill="#FFFF00"></path><path d="M51.1111 10.083L45.9707 18.9871H56.2541L51.1111 10.083Z" fill="#FFFF00"></path></svg>
                        </Link>
                    </div>
            }
        </div>
    )
}

export default Navbar;
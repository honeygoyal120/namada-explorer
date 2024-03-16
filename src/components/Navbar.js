import React, { useState, useEffect } from "react";
import { NavLink as Link } from 'react-router-dom';
import user from '../user.png'

function Navbar () {
    const [pageURL, setPageURL] = useState(0);

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
        <div className='px-4 h-screen bg-black space-y-10 w-80'>
            <div className="flex-none flex items-center justify-center text-center py-6">
                <Link to='/' className='flex items-center space-x-1'>
                    <svg width="200" height="19" viewBox="0 0 198 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.0555 18.9998H13.8612V6.35257H6.18265V18.9998H0.98584V1.15576H19.0555V18.9998Z" fill="#FFFF00"></path><path d="M77.5562 1.16602H72.3594V18.9998H77.5562V1.16602Z" fill="#FFFF00"></path><path d="M89.683 1.16602H84.4862V18.9998H89.683V1.16602Z" fill="#FFFF00"></path><path d="M83.6197 1.16602H78.4229V18.9998H83.6197V1.16602Z" fill="#FFFF00"></path><path d="M161.849 10.952H156.652C156.652 8.42155 154.593 6.36282 152.063 6.36282V1.16602C157.46 1.16602 161.849 5.55523 161.849 10.952Z" fill="#FFFF00"></path><path d="M161.995 18.5178H144.674V1.16602H149.871V13.3235H161.995V18.5178Z" fill="#FFFF00"></path><path d="M184.994 7.46045H179.797V12.706H184.994V7.46045Z" fill="#FFFF00"></path><path d="M197.121 7.46045H191.924V12.706H197.121V7.46045Z" fill="#FFFF00"></path><path d="M191.058 7.46045H185.861V12.706H191.058V7.46045Z" fill="#FFFF00"></path><path d="M191.058 1.16602H185.861V6.41153H191.058V1.16602Z" fill="#FFFF00"></path><path d="M184.994 13.7544H179.797V18.9999H184.994V13.7544Z" fill="#FFFF00"></path><path d="M197.121 13.7544H191.924V18.9999H197.121V13.7544Z" fill="#FFFF00"></path><path d="M184.994 1.16602H179.797V6.41153H184.994V1.16602Z" fill="#FFFF00"></path><path d="M197.121 1.16602H191.924V6.41153H197.121V1.16602Z" fill="#FFFF00"></path><path d="M126.289 18.7639H121.092V6.11673H113.416V18.7639H108.219V0.919922H126.289V18.7639Z" fill="#FFFF00"></path><path d="M119.854 9.84957C119.854 11.2853 118.69 12.4467 117.257 12.4467C115.821 12.4467 114.66 11.2827 114.66 9.84957C114.66 8.41384 115.824 7.25245 117.257 7.25245C118.69 7.24988 119.854 8.41384 119.854 9.84957Z" fill="#FFFF00"></path><path d="M45.9706 1.1792L40.8276 10.0858H51.111L45.9706 1.1792Z" fill="#FFFF00"></path><path d="M40.8277 10.083L35.6847 18.9871H45.9706L40.8277 10.083Z" fill="#FFFF00"></path><path d="M51.1111 10.083L45.9707 18.9871H56.2541L51.1111 10.083Z" fill="#FFFF00"></path></svg>
                </Link>
            </div>
            <div className='flex-1 flex flex-col items-center justify-center space-y-2 font-semibold text-white'>
                <Link onClick={() => setPageURL("HOME")} to='/'className={`${pageURL === 'HOME' ? "bg-[#FFAE1F] rounded-lg": " "} flex items-center space-x-2 justify-start hover:text-[#FFFF00] w-full`}>
                    <div class="p-3 bg-cyan-50 bg-opacity-5 rounded-lg justify-center items-center gap-2.5 flex">
                        <div class="group-hover:text-v2-primary fill-current">
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="25" height="25"><path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"/></svg>
                        </div>
                    </div>
                    <div>Dashboard</div>
                </Link>
                <Link onClick={() => setPageURL("BLOCKS")} to='/blocks' className={`${pageURL === 'BLOCKS' ? "bg-[#FFAE1F] rounded-lg": " "} flex items-center space-x-2 justify-start hover:text-[#FFFF00] w-full`}>
                    <div class="p-3 bg-cyan-50 bg-opacity-5 rounded-lg justify-center items-center gap-2.5 flex">
                        <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                            <svg width="25" height="25" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_16765_48070)"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.96514 2.57687C1.91375 2.59548 1.86937 2.62952 1.83807 2.67432C1.80677 2.71913 1.79008 2.77251 1.79029 2.82716V5.28087C1.79029 5.42716 1.90914 5.54602 2.05543 5.54602C3.08057 5.54602 3.91257 6.37802 3.91257 7.40316V9.17116C4.1652 8.99817 4.45227 8.88188 4.75408 8.83029C5.05588 8.77871 5.36528 8.79303 5.66103 8.87229C5.95677 8.95154 6.23187 9.09386 6.46743 9.28945C6.703 9.48505 6.89345 9.7293 7.02571 10.0054C7.07097 9.95625 7.09589 9.89172 7.09543 9.82487V7.4043C7.09543 6.91176 7.29109 6.43939 7.63937 6.0911C7.98765 5.74282 8.46003 5.54716 8.95257 5.54716C9.44512 5.54716 9.91749 5.74282 10.2658 6.0911C10.614 6.43939 10.8097 6.91176 10.8097 7.4043V9.82487C10.8094 9.8917 10.8343 9.95619 10.8794 10.0054C11.0116 9.72921 11.202 9.48485 11.4375 9.28913C11.673 9.09341 11.9481 8.95098 12.2438 8.87162C12.5396 8.79225 12.849 8.77782 13.1509 8.82933C13.4527 8.88084 13.7399 8.99706 13.9926 9.17002V7.4043C13.9926 6.37916 14.8246 5.54716 15.8497 5.54716C15.92 5.54716 15.9875 5.51923 16.0372 5.4695C16.0869 5.41978 16.1149 5.35234 16.1149 5.28202V2.82716C16.1148 2.7727 16.098 2.71957 16.0667 2.675C16.0355 2.63042 15.9912 2.59656 15.94 2.57802H15.9366L15.9297 2.57459L15.9046 2.56659C15.751 2.51551 15.5963 2.46787 15.4406 2.42373C14.9797 2.2933 14.5138 2.18121 14.044 2.08773C12.3674 1.75794 10.6624 1.59448 8.95371 1.59973C6.81086 1.59973 5.06914 1.84316 3.86 2.08545C3.25657 2.20773 2.78457 2.33002 2.46343 2.42145C2.3081 2.46561 2.15377 2.51324 2.00057 2.5643L1.97543 2.5723L1.96857 2.57459L1.96514 2.57573V2.57687ZM5.908 10.922C5.908 10.7109 5.82413 10.5084 5.67486 10.3592C5.52558 10.2099 5.32311 10.126 5.112 10.126C4.90089 10.126 4.69842 10.2099 4.54914 10.3592C4.39986 10.5084 4.316 10.7109 4.316 10.922C4.316 11.2203 4.19752 11.5063 3.98662 11.7172C3.77572 11.9281 3.48968 12.0466 3.19143 12.0466H2.71143C2.50032 12.0466 2.29785 12.1305 2.14857 12.2797C1.99929 12.429 1.91543 12.6315 1.91543 12.8426C1.91543 13.0537 1.99929 13.2562 2.14857 13.4054C2.29785 13.5547 2.50032 13.6386 2.71143 13.6386H3.19143C3.91257 13.6386 4.60286 13.3517 5.11257 12.8432C5.622 13.3524 6.31283 13.6385 7.03314 13.6385C7.75346 13.6385 8.44428 13.3524 8.95371 12.8432C9.46314 13.3524 10.154 13.6385 10.8743 13.6385C11.5946 13.6385 12.2854 13.3524 12.7949 12.8432C13.3046 13.3529 13.9949 13.6386 14.716 13.6386H15.1971C15.4083 13.6386 15.6107 13.5547 15.76 13.4054C15.9093 13.2562 15.9931 13.0537 15.9931 12.8426C15.9931 12.6315 15.9093 12.429 15.76 12.2797C15.6107 12.1305 15.4083 12.0466 15.1971 12.0466H14.716C14.4177 12.0466 14.1317 11.9281 13.9208 11.7172C13.7099 11.5063 13.5914 11.2203 13.5914 10.922C13.5914 10.7109 13.5076 10.5084 13.3583 10.3592C13.209 10.2099 13.0065 10.126 12.7954 10.126C12.5843 10.126 12.3818 10.2099 12.2326 10.3592C12.0833 10.5084 11.9994 10.7109 11.9994 10.922C11.9994 11.2204 11.8809 11.5066 11.6699 11.7176C11.4589 11.9286 11.1727 12.0472 10.8743 12.0472C10.5759 12.0472 10.2897 11.9286 10.0787 11.7176C9.86768 11.5066 9.74914 11.2204 9.74914 10.922C9.74914 10.7109 9.66528 10.5084 9.516 10.3592C9.36672 10.2099 9.16425 10.126 8.95314 10.126C8.74203 10.126 8.53956 10.2099 8.39028 10.3592C8.24101 10.5084 8.15714 10.7109 8.15714 10.922C8.15714 11.0698 8.12804 11.2161 8.0715 11.3526C8.01495 11.4891 7.93207 11.6131 7.82759 11.7176C7.72312 11.8221 7.59908 11.905 7.46257 11.9615C7.32606 12.0181 7.17975 12.0472 7.032 12.0472C6.88424 12.0472 6.73793 12.0181 6.60143 11.9615C6.46492 11.905 6.34088 11.8221 6.2364 11.7176C6.13192 11.6131 6.04905 11.4891 5.9925 11.3526C5.93596 11.2161 5.908 11.0698 5.908 10.922Z" fill="currentColor"></path></g><defs><clipPath id="clip0_16765_48070"><rect width="16" height="16" fill="white" transform="translate(0.951172)"></rect></clipPath></defs></svg>
                        </div>
                    </div>
                    <div>Blocks</div>
                </Link>
                <Link onClick={() => setPageURL("VALIDATORS")} to='/validators' className={`${pageURL === 'VALIDATORS' ? "bg-[#FFAE1F] rounded-lg": " "} flex items-center space-x-2 justify-start hover:text-[#FFFF00] w-full`}>
                    <div class="p-3 bg-cyan-50 bg-opacity-5 rounded-lg justify-center items-center gap-2.5 flex">
                        <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                            <img src={user} className="h-6 w-6"/>
                        </div>
                    </div>
                    <div>Validators</div>
                </Link>
                <Link onClick={() => setPageURL("SEARCH")} to='/search' className={`${pageURL === 'SEARCH' ? "bg-[#FFAE1F] rounded-lg": " "} flex items-center space-x-2 justify-start hover:text-[#FFFF00] w-full`}>
                    <div class="p-3 bg-cyan-50 bg-opacity-5 rounded-lg justify-center items-center gap-2.5 flex">
                        <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                            <svg width="25" height="25" viewBox="0 0 50 50" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg>
                        </div>
                    </div>
                    <div>Search</div>
                </Link>
            </div> 
        </div>
    )
}

export default Navbar;
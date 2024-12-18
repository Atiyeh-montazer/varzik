/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PUBLIC_URL } from '../../utils/utils';
import { Paper, Stack } from '@mui/material';
import { GiExitDoor } from "react-icons/gi";
import { BsInstagram } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import Image from 'next/image';

export default function AuthWrapper({ children, onClick }) {
    return (
        <div css={css`
        width:100%;
        display: flex;
        height: 100%;
        flex-direction: column;
        `}>

            <div css={css`display:flex;flex:1;justify-content:center;align-items:center;`}>
            <Image 
                    src="/images/mainwithtext.svg"  // Path to your logo
                    alt="VaRziK Logo"
                    width={300}  // Adjust the width as needed
                    height={100}  // Adjust the height as needed
                />
            </div>

            <div css={css`flex:1;`}>{children}</div>

            <div css={css`display:flex;flex-direction:row;justify-content:space-evenly;flex:1;`}>
                <div className='text-4xl text-gray-800'>
                    <BsInstagram />
                </div>

                <div className='text-gray-800 text-4xl bg-none  '>
                    <SiTelegram />
                </div>
            </div>

        </div>
    )
}

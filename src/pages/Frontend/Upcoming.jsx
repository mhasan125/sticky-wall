import React from 'react'

import List from '../../components/List'
import { where } from 'firebase/firestore'
import dayjs from 'dayjs';
import 'dayjs/locale/en';

export default function Upcoming() {
    // const currentDate = new Date();
    // const options = {
    //   day: 'long',
    //   month: 'numeric',
    //     year: 'numeric',
    // };
    // const formattedDate = currentDate.toLocaleDateString(undefined, options);
    const formattedDate = dayjs().format('MMMM DD, YYYY')
  return (
    <>
        <List query={where("date", ">", formattedDate)} />
    </>
  )
}

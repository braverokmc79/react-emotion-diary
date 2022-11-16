import React, { useContext, useEffect, useState } from 'react';
import MyButton from '../components/MyButton';
import MyHeader from './../components/MyHeader';
import { DiaryStateContext } from './../App';
import DiaryList from './../components/DiaryList';

const Home = () => {

    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;


    useEffect(() => {
        if (diaryList.length >= 1) {

            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();


            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                29
            ).getTime();

            // console.log(" firstDay : lastDay ", firstDay, lastDay);

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));

        }
    }, [diaryList, curDate]);


    useEffect(() => {
        //console.log("data : ", data);

    }, [data]);


    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        )
    }

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        )
    }


    return (
        <div>

            <MyHeader headText={<div onClick={() => setCurDate(new Date())} style={{ cursor: "pointer" }} >{headText}</div>}
                leftChild={<MyButton text={"<"} onClick={() => { decreaseMonth() }} />}
                rightChild={<MyButton text={">"} onClick={() => { increaseMonth() }} />}
            />

            <DiaryList diaryList={data} />

        </div>
    );
};

export default React.memo(Home);
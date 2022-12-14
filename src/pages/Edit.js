import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DiaryEditor from '../components/DiaryEditor';
import { DiaryStateContext } from './../App';



const Edit = () => {
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);



    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id} 번 일기  수정`;
    }, [id]);


    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))

            console.log(targetDiary);
            if (targetDiary) {
                setOriginData(targetDiary);

            } else {
                alert("없는 일기 입니다.");
                navigate('/', { replace: true });
            }
        }

    }, [id, diaryList, navigate]);


    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit;
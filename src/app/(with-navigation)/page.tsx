import axiosInstance from '@/lib/api/axios'; 
import { API_ENDPOINTS } from '@/lib/api/endpoints';
interface StudyRoom {
  studyRoomId: number;
  title: string;
  thumbnail: string;
  locality: string;
  likeCount: number;
  reviewCount: number;
  entireMinPricePerHour: number;
  entireMaxHeadcount: number;
  starAvg: number;
  studyBookmarkId: number;
  tags: {
    studyRoomTagId: number;
    tag: string;
  }[];
}

interface StudyRoomResponse {
  data: StudyRoom[];
}

const getStudyRooms = async (): Promise<StudyRoom[]> => {
  try {
    const response = await axiosInstance.get<StudyRoomResponse>(API_ENDPOINTS.STUDY_ROOM.LIST);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}


export default async function Home() { 
  const studyRooms = await getStudyRooms();
  console.log(studyRooms);

  return (
    <div className='pt-[100px] pb-[200px] max-w-screen-xl px-5 xl:px-0 mx-auto'> 
      <section className='flex flex-col gap-[100px]'>
        <article>
          <h3 className='text-left text-2xl font-semibold text-black mb-[40px]'>요즘 뜨는 스터디룸</h3>
          <div className='flex items-center gap-[20px]'>
            <div className=' '></div>
          </div>
        </article>
        <article>
          <h3 className='text-left text-2xl font-semibold text-black mb-[40px]'>곧 마감되는 스터디</h3>
          <div className='flex items-center gap-[20px]'>
            <div className=' '></div>
          </div>
        </article>
      </section>
    </div>
  );
}

interface StudyRoom {
  id: number;
  name: string;
  address: string;
  number: string;
  url: string;
  naver_map_url: string;
  thumbnail: string;
  description: string;
  korea_region: string;
}

const studyRooms: StudyRoom[] = [
  {
    id: 1447295314,
    name: "포엠 종로파티룸",
    address: "서울 종로구 수표로 132-1 3층",
    number: "0507-1352-5163",
    url: "https://blog.naver.com/todaywe_jongro",
    naver_map_url: "https://map.naver.com/p/search/%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%8A%A4%ED%84%B0%EB%94%94%EB%A3%B8/place/1447295314?c=13.00,0,0,0,dh&placePath=%3Fentry%253Dbmp%2526from%253DPLACE_AD%2526n_ad_group_type%253D10%2526n_query%253D%2525EC%2525A2%252585%2525EB%2525A1%25259C%2525EA%2525B5%2525AC%2525EC%25258A%2525A4%2525ED%252584%2525B0%2525EB%252594%252594%2525EB%2525A3%2525B8",
    korea_region: "JONGNO_GU",
    thumbnail: "https://minio.breakti.me/study-with-me-public-dev/oyZ9LT2gMlqBLeJ1e6RWUA",
    description: "종로3가 5번출구로 나오셔서 낙원동 98-1로 찾아오시면됩니다. 약 70m"
  },
  {
    id: 1106883483,
    name: "P.E.S.",
    address: "서울 종로구 세종대로23길 47 1층 30호",
    number: "0507-1417-2707",
    url: "https://blog.naver.com/privateenglishstudio",
    naver_map_url: "https://map.naver.com/p/search/%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%8A%A4%ED%84%B0%EB%94%94%EB%A3%B8/place/1106883483?c=13.00,0,0,0,dh&placePath=%3Fentry%253Dbmp%2526from%253DPLACE_AD%2526n_ad_group_type%253D10%2526n_query%253D%2525EC%2525A2%252585%2525EB%2525A1%25259C%2525EA%2525B5%2525AC%2525EC%25258A%2525A4%2525ED%252584%2525B0%2525EB%252594%252594%2525EB%2525A3%2525B8",
    korea_region: "JONGNO_GU",
    thumbnail: "https://minio.breakti.me/study-with-me-public-dev/FPshHBuvXL1JWcF_qYN7ng",
    description: "cafe N.TABLE 옆 동문으로 들어오면 바로입니다!"
  },
  {
    id: 21290050,
    name: "nuguna",
    address: "서울 종로구 우정국로2길 21 대왕빌딩 11층, 12층",
    number: "070-4607-7297",
    url: "http://www.nugunas.com",
    naver_map_url: "https://map.naver.com/p/search/%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%8A%A4%ED%84%B0%EB%94%94%EB%A3%B8/place/21290050?c=13.00,0,0,0,dh&placePath=%3Fentry%253Dbmp",
    korea_region: "JONGNO_GU",
    thumbnail: "https://minio.breakti.me/study-with-me-public-dev/xjFs_x3uXm73t6WaJqPwtA",
    description: "종각역 4번 출구에서 나와 골목으로 들어오세요."
  },
  {
    id: 37046613,
    name: "스터디룸인",
    address: "서울 종로구 청계천로 61 관철동 빌딩",
    number: "02-732-1127",
    url: "https://blog.naver.com/studyroom-in",
    naver_map_url: "https://map.naver.com/p/search/%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%8A%A4%ED%84%B0%EB%94%94%EB%A3%B8/place/37046613?c=13.00,0,0,0,dh&placePath=%3Fentry%253Dbmp",
    korea_region: "JONGNO_GU",
    thumbnail: "https://minio.breakti.me/study-with-me-public-dev/FmDUIEgjaLzJ80RD68lPww",
    description: "지하철 종각역 4번출구 > 스타벅스 골목 우회전 > 100m 직진"
  },
  {
    id: 100997256,
    name: "종로스터디룸 피앤티스퀘어",
    address: "서울 종로구 수표로 105 육의전빌딩 지하2층",
    number: "0507-1410-3264",
    url: "",
    naver_map_url: "https://map.naver.com/p/search/%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%8A%A4%ED%84%B0%EB%94%94%EB%A3%B8/place/100997256?c=13.00,0,0,0,dh&placePath=%3Fentry%253Dbmp",
    korea_region: "JONGNO_GU",
    thumbnail: "https://minio.breakti.me/study-with-me-public-dev/UDWFwgtP4sd-p1A3ESu-7g",
    description: "종로 3가역 1번출구-출구에서직진-맥도날드,스타벅스등 지나 정면에 육의전귀금속도매 건물"
  }
];

const ExternalStudyRoom = () => {
  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-semibold text-apple-gray-500 mb-4">외부 스터디룸</h1>
        <p className="text-apple-gray-400 text-lg">
          종로구의 스터디룸을 찾아보세요
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyRooms.map((room) => (
          <StudyRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

interface StudyRoomCardProps {
  room: StudyRoom;
}

const StudyRoomCard = ({ room }: StudyRoomCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-apple hover:shadow-apple-hover transition-shadow duration-300 overflow-hidden group cursor-pointer">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 flex-shrink-0 bg-apple-gray-100 rounded-lg overflow-hidden">
            <img
              src={room.thumbnail}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-apple-gray-500 group-hover:text-apple-blue transition-colors mb-1">
              {room.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-apple-gray-300 text-sm">{room.number}</span>
              <div className="flex gap-2">
                <a
                  href={room.naver_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apple-gray-300 hover:text-apple-blue transition-colors"
                >
                  🗺️
                </a>
                {room.url && (
                  <a
                    href={room.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-apple-gray-300 hover:text-apple-blue transition-colors"
                  >
                    🔗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="text-apple-gray-400 text-sm mb-3 line-clamp-2">
          {room.description}
        </p>
        <div className="text-apple-gray-300 text-sm">
          {room.address}
        </div>
      </div>
    </div>
  );
};

export default ExternalStudyRoom;

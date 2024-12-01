const StudyRoom = () => {
  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-semibold text-apple-gray-500 mb-4">스터디룸</h1>
        <p className="text-apple-gray-400 text-lg">
          스터디에 최적화된 공간을 찾아보세요
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example cards - will be replaced with real data */}
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
};

const RoomCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-apple hover:shadow-apple-hover transition-shadow duration-300 overflow-hidden group cursor-pointer">
      <div className="relative h-48 bg-apple-gray-100">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c"
          alt="스터디룸"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 right-4 px-3 py-1 bg-white bg-opacity-90 text-apple-gray-500 text-sm font-medium rounded-full">
          시간당 10,000원
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-apple-gray-500 mb-2 group-hover:text-apple-blue transition-colors">
          강남역 스터디룸 A
        </h3>
        <p className="text-apple-gray-400 mb-4">
          조용하고 쾌적한 환경의 4인실 스터디룸입니다.
        </p>
        <div className="flex items-center text-apple-gray-300 text-sm">
          <span>최대 4인</span>
          <span className="mx-2">•</span>
          <span>강남역 3번 출구</span>
        </div>
      </div>
    </div>
  );
};

export default StudyRoom;

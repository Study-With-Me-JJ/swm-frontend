const StudyRecruit = () => {
  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-semibold text-apple-gray-500 mb-4">스터디 모집</h1>
        <p className="text-apple-gray-400 text-lg">
          함께 성장할 스터디원을 찾아보세요
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example cards - will be replaced with real data */}
        <StudyCard />
        <StudyCard />
        <StudyCard />
      </div>
    </div>
  );
};

const StudyCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-apple hover:shadow-apple-hover transition-shadow duration-300 overflow-hidden group cursor-pointer">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-apple-blue bg-opacity-10 text-apple-blue text-sm font-medium rounded-full">
            모집중
          </span>
          <span className="text-apple-gray-300">3/6명</span>
        </div>
        <h3 className="text-xl font-semibold text-apple-gray-500 mb-2 group-hover:text-apple-blue transition-colors">
          알고리즘 스터디
        </h3>
        <p className="text-apple-gray-400 mb-4">
          매주 백준 골드 문제를 풀고 코드 리뷰를 진행합니다.
        </p>
        <div className="flex items-center text-apple-gray-300 text-sm">
          <span>주 2회</span>
          <span className="mx-2">•</span>
          <span>온라인</span>
        </div>
      </div>
    </div>
  );
};

export default StudyRecruit;

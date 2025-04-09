import { useEffect, useState } from "react";
import Header from "../../common/components/Header";
import MeetCard from "../components/MeetCard.tsx";
import MeetTap from "../components/MeetTab.tsx";
import MeetChip from "../components/MeetChip.tsx";
import CreateButton from "../components/CreateButton.tsx";
import { useMeetData } from "../hooks/useMeetData.tsx";
import { useNavigate } from "react-router-dom";
import { useCreateMeetStore } from "../../meetCreate(update)/store/useCreateMeetStore.ts";

export default function Main() {
  const [activeTab, setActiveTab] = useState("참여중");
  const [selectedChip, setSelectedChip] = useState("전체");

  const [isTokenChecked, setIsTokenChecked] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setIsTokenChecked(true);
    }
  }, [navigate, token]);

  const { meets, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMeetData(activeTab, selectedChip);

  /*
   * 모임 생성 상태 초기화를 위한 코드
   */
  useEffect(() => {
    const { resetMeetInfo } = useCreateMeetStore.getState();
    resetMeetInfo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // 스크롤이 바닥에 가까워지면 다음 페이지 요청
      if (
        scrollTop + windowHeight >= fullHeight - 50 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, isFetchingNextPage, hasNextPage]);

  if (!isTokenChecked) return null;

  return (
    <main className="flex flex-col min-h-screen">
      {/* 헤더 영역 */}
      <header className="sticky top-0 z-10 bg-white">
        <Header isMainPage />

        {/* 탭 네비게이션 */}
        <nav
          className="flex w-full h-fit justify-between"
          aria-label="모임 상태 탭"
        >
          {["참여중", "종료"].map((tab) => (
            <MeetTap
              key={tab}
              title={tab}
              isSelected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </nav>

        {/* 카테고리 필터 칩 */}
        <section
          className="flex flex-nowrap overflow-x-auto px-[2rem] py-[1.2rem] gap-4 w-full h-fit"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          aria-label="카테고리 필터"
        >
          {["전체", "음식", "운동", "이동", "기타"].map((category) => (
            <MeetChip
              key={category}
              title={category}
              isSelected={selectedChip === category}
              onClick={() => setSelectedChip(category)}
            />
          ))}
        </section>
      </header>

      {/* 모임 리스트 */}
      <section className="flex flex-col px-[2rem] py-[1rem] gap-[2rem]">
        {meets.length === 0 && !isLoading ? (
          <article className="flex flex-col items-center justify-center mt-20 text-center animate-fade-in">
            <p className="text-Title2 font-semibold text-grayA0">
              참여 중인 모임이 없어요
            </p>
            <p className="text-Caption2 text-grayC8 mt-1">
              새로운 모임을 만들어보세요!
            </p>
          </article>
        ) : (
          meets.map((meet) => (
            <article key={meet.meetId}>
              <MeetCard
                meetId={meet.meetId}
                meetIntro={meet.meetIntro}
                meetType={meet.meetType}
                meetAt={meet.meetAt}
                address={meet.address}
                addressDescription={meet.addressDescription}
                cost={meet.cost}
                memberCount={meet.memberCount}
                memberLimit={meet.memberLimit}
                ownerName={meet.ownerName}
              />
            </article>
          ))
        )}
      </section>

      {/* 모임 생성 버튼 */}
      <footer className="mt-auto">
        <CreateButton />
      </footer>
    </main>
  );
}

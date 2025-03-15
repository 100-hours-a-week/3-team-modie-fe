// import TestUserComponent from "../components/TestUserComponent";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* tanstack-query 테스트용도
      <TestUserComponent /> */}
      <Header isMainPage />
      <Footer />
    </div>
  );
}

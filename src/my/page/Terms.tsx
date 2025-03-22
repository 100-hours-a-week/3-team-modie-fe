import Header from "../../common/components/Header.tsx";

export default function Terms() {
  return (
    <>
      <Header />
      <div className="px-8 py-4">
        <h1 className="text-2xl font-bold mb-4">모디 이용약관</h1>

        <h2 className="text-xl font-semibold mt-4">제1조 (목적)</h2>
        <p>
          본 약관은 "모디"(이하 "서비스")를 제공하는 운영자(이하 "회사")와
          이용자 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을
          목적으로 합니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">제2조 (정의)</h2>
        <p>
          1. "서비스"란 회사가 운영하는 웹사이트 및 관련 서비스를 의미합니다.
        </p>
        <p>2. "이용자"란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.</p>
        <p>
          3. "계정"이란 이용자가 서비스에 로그인하여 이용할 수 있도록 설정된
          계정을 의미합니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">
          제3조 (약관의 효력 및 변경)
        </h2>
        <p>1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.</p>
        <p>
          2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을
          개정할 수 있으며, 변경된 약관은 적용일자 전까지 공지합니다.
        </p>
        <p>
          3. 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수
          있습니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">
          제4조 (개인정보의 수집 및 이용)
        </h2>
        <p>
          1. 회사는 서비스 제공을 위해 다음과 같은 정보를 수집 및 이용합니다.
        </p>
        <ul className="list-disc pl-6">
          <li>카카오 프로필 정보 (이름, 프로필사진)</li>
          <li>계좌번호</li>
        </ul>
        <p>
          2. 수집된 개인정보는 서비스 제공, 이용자 식별, 결제 및 정산 등의
          목적으로 이용됩니다.
        </p>
        <p>
          3. 회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
        </p>
        <p>
          4. 개인정보 보호와 관련된 사항은 "개인정보처리방침"에서 자세히
          규정합니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">제5조 (서비스 이용)</h2>
        <p>1. 이용자는 본 약관에 따라 서비스를 이용할 수 있습니다.</p>
        <p>
          2. 회사는 서비스의 원활한 제공을 위해 일부 서비스 이용을 제한하거나
          중단할 수 있습니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">제6조 (이용자의 의무)</h2>
        <p>
          1. 이용자는 서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.
        </p>
        <p>2. 이용자는 타인의 계정을 무단으로 사용해서는 안 됩니다.</p>
        <p>
          3. 이용자는 허위 정보 제공, 불법 행위, 서비스 운영 방해 행위를 해서는
          안 됩니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">
          제7조 (이용 제한 및 해지)
        </h2>
        <p>
          1. 이용자가 본 약관을 위반하는 경우 회사는 사전 통보 없이 서비스
          이용을 제한하거나 계정을 해지할 수 있습니다.
        </p>
        <p>
          2. 이용자가 서비스 탈퇴를 원하는 경우 언제든지 계정 삭제를 요청할 수
          있습니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">제8조 (책임의 제한)</h2>
        <p>
          1. 회사는 천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스
          제공의 중단에 대해 책임을 지지 않습니다.
        </p>
        <p>
          2. 회사는 이용자가 서비스 내 제공된 정보를 신뢰하여 발생한 손해에 대해
          책임을 지지 않습니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">제9조 (준거법 및 관할)</h2>
        <p>
          본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련된 분쟁이
          발생할 경우 관할 법원은 대한민국 법원으로 합니다.
        </p>

        <h2 className="text-xl font-semibold mt-4">부칙</h2>
        <p>본 약관은 2025년 3월 20일부터 시행됩니다.</p>
      </div>
    </>
  );
}

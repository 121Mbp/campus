# 쿼리 캠퍼스

로컬에서 실행하고 수정할 수 있는 브라우저 게임 개발 프로젝트입니다. Node.js 18 이상이 필요하며 외부 패키지 설치는 필요하지 않습니다.

## 실행

```powershell
cd C:\Users\권성수\Documents\code\query-campus
npm.cmd run dev
```

브라우저에서 http://localhost:5173 을 엽니다. 소스를 수정한 뒤 브라우저를 새로고침하면 반영됩니다. 서버는 Ctrl+C로 종료합니다.

## 소스 구조

- `index.html`: 게임 화면과 패널
- `src/style.css`: 반응형 레이아웃과 스타일
- `src/app.js`: 픽셀 캠퍼스 렌더링, 이동, 대화, 에피소드, SQL 시뮬레이션, 로컬 저장
- `src/mobile.css`: 전체 화면 게임 HUD, 세로·가로 모바일 레이아웃, 안전 영역
- `src/mobile.js`: 캐릭터 추적 카메라, 터치 방향키, 상호작용 버튼, 전체 화면 전환
- `src/casual.css`: 파스텔 색상, 둥근 게임 HUD, 오른쪽 방향키와 왼쪽 액션 버튼
- `src/assets/`: 직접 제작한 22종 SVG 이미지 아이콘과 하나의 초상화
- `src/databases.js`: DB 경로 선택 화면 및 경로별 저장·복원·초기화
- `scripts/dev.cjs`: 외부 의존성 없는 로컬 개발 서버
- `verify.cjs`: 에피소드 진행과 데이터 변경, 권한 제한 검증

## 검사

```powershell
npm.cmd run check
npm.cmd test
```

## 구현 범위

PostgreSQL, MySQL, MariaDB, TimescaleDB 네 경로의 10개 에피소드, 캐릭터 이동과 대화, SQL 입력 및 결과 표시, 학습 수첩, 화분 꾸미기, 브라우저 자동 저장을 포함합니다. WASD/방향키로 이동하고 E로 상호작용하거나 건물을 클릭할 수 있습니다.

게임은 브라우저 화면 전체를 사용합니다. 모바일에서는 **오른쪽** 터치 방향키를 누르고 있으면 이동하며, **왼쪽** 이야기/컴퓨터 버튼으로 상호작용합니다. 상단 미션의 화살표로 상세 목표를 펼칩니다. 상단 전체 화면 이미지 버튼은 지원되는 브라우저에서 전체 화면으로 전환합니다.

상단 프로필에는 조교 레벨과 경험치가 표시됩니다. 모바일의 미션 카드는 기본적으로 요약만 보여주며, 펼치면 상세 목표와 전산실 바로가기 버튼이 나타납니다. 대화창 오른쪽 위 버튼으로 창을 접어 캠퍼스를 넓게 볼 수 있고, 하나에게 다시 이야기하면 복원됩니다. 대화 안내 말풍선은 하나의 실제 맵 위치에 맞춰 표시됩니다.

## DB 선택

캠퍼스의 DB 이름 배지를 누르면 네 경로를 선택할 수 있습니다. 경로를 바꾸면 해당 DB의 저장 지점으로 이동합니다. 설정에서 현재 DB 학기만 초기화할 수 있으며 다른 DB의 기록은 유지됩니다.

| 경로 | 관리자 | 포트 | 학습 차이 |
| --- | --- | --- | --- |
| PostgreSQL | postgres | 5432 | PostgreSQL 사용자·권한 문법 |
| MySQL | root | 3306 | USE로 DB 선택, 사용자@호스트 및 IDENTIFIED BY 문법 |
| MariaDB | root | 3306 | MySQL 계열 사용자·권한 실습 |
| TimescaleDB | postgres | 5432 | PostgreSQL 기반 공통 미션과 timescaledb 확장 활성화 체험 |

`time`은 TimescaleDB로 해석해 추가했습니다. TimescaleDB 경로에는 실제 시계열 엔진이나 고급 hypertable 실습이 포함되지 않습니다.

SQL 참고: [MySQL GRANT 공식 문서](https://dev.mysql.com/doc/refman/8.4/en/grant.html), [Timescale 공식 문서](https://github.com/timescale/docs/blob/latest/api/hypertable/create_hypertable.md).

DB는 제한된 학습 명령을 처리하는 JavaScript 시뮬레이터입니다. 실제 PostgreSQL 엔진, 실제 설치 및 계정 생성 기능은 없습니다. 일반적인 모든 SQL을 실행하는 DB 클라이언트는 아닙니다. 진행 데이터는 브라우저의 localStorage에 저장되며 게임 설정에서 초기화할 수 있습니다.

배포 설정과 배포 산출물은 포함하지 않습니다. `npm.cmd run dev`는 로컬 서버만 실행하며 업로드나 배포를 수행하지 않습니다.
# campus
# campus
# campus

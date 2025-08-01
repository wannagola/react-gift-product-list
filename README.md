# 2단계 피드백 반영 완료

# 목표

- post 방식의 API를 사용해봐요.
- 각 요청의 응답에 대한 상태를 핸들링해요.
- 로그인 기능과 로그인 시 가능한 주문하기 기능을 완성해요.
- axios외에 별도의 fetch 관련 라이브러리를 사용하지 않고 구현해요.
- Suspense, ErrorBoundary도 사용하지 않아야 해요.

# 과제 진행 요구사항

- 본인만의 기준으로 일관된 코드를 작성해주세요.
- 기능 단위로 나누어 커밋을 해주세요.

# 로그인 기능

- /login api 를 사용하여 로그인 기능을 완성해주세요.
- 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용해주세요.
- 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주세요. (react-toastify 라이브러리 사용)

# 주문하기 기능

- /products/:productId/summary api를 사용하여 제품 정보를 가져와주세요.
- 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결시켜요.
- 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채워놔요.
- /order api를 사용하여 주문하기 기능을 완성해주세요.
- 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작해요.
- 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시켜요.

# 콘서트 예약 서비스

---

## 프로젝트 마일스톤

- https://github.com/users/kimkyeseung/projects/4

## **사전 준비**

- **Docker**와 **Docker Compose**가 설치되어 있어야 합니다.

1. 프로젝트 루트에 있는 `docker-compose.yml` 파일을 사용하여 MySQL8.0과 nestjs 어플리케이션을 실행합니다:
   ```bash
   docker compose up -d
   ```
2. 실행된 컨테이너 확인:

   ```bash
   docker ps
   ```

### **env 파일 생성**

다음과 같이 .env 파일을 만들어 주세요.

```
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=pw
DB_DATABASE=dbname
```

## ERD

```mermaid
---
title: 콘서트 예약 서비스 ERD
---
erDiagram
    User {
        int id PK
        string name "이름"
        string nickname "닉네임"
        string email "이메일"
        string mobile "연락처"
        string point "포인트"
    }
    Artist {
        int id PK
        string name "아티스트 이름"
    }
    Concert {
        int id PK
        string title
        string location "공연 장소"
        int artist_id FK "아티스트 ID"
    }
    Schedule {
        int id PK
        int stage_id FK "공연 ID"
        int artist_id FK "공연 ID"
        date datetime "공연 날짜/시각"
    }
    Queue {
        int id PK
        int user_id FK "사용자 ID"
        string status "상태('wait' | 'active')"
    }
    Ticket {
        int id PK
        int price "가격"
        int seat_number "좌석번호"
        int schedule_id FK "공연 날짜/시각 ID"
        int artist_id FK "아티스트 ID"
        int stage_id FK "무대"
        int user_id FK "사용자 ID"
        string reservation_status "예약 상태"
    }
    Point {
        int id PK
        int user_id FK "사용자 ID"
        int balance "포인트 잔액"
    }
    PointHistory {
        int id PK
        int point_id FK "포인트 ID"
        int user_id FK "사용자 ID"
        string type "사용 유형('payment' | 'charge')"
        int balance "포인트 잔액"
    }
    Order {
        int id PK
        int user_id FK "사용자 ID"
        int ticket_id FK "티켓 ID"
        string status "주문 상태"
    }
    Payment {
        int id PK
        int user_id FK "사용자 ID"
        int order_id FK "주문 ID"
        int ticket_id FK "티켓 ID"
        string status "결제 상태"
        string method "결제 방법"
    }
    Ticket ||--o{ User: ""
    Concert ||--o{ Ticket: ""
    User ||--o{ Order: ""
    User ||--o{ Payment: ""
    User ||--o{ Queue: ""
    Order ||--|| Ticket: ""
    Artist ||--|| Ticket: ""
    Artist ||--o{ Concert : ""
    Artist ||--o{ Schedule : ""
    Concert ||--o{ Schedule : ""
    Ticket ||--|| Schedule : ""
    Payment ||--|| Order: ""
    Payment ||--|| Ticket: ""
    Point ||--|| User: ""
    Point ||--o{ PointHistory : ""
    User ||--o{ PointHistory : ""

```

## Mock API

### 유저 토큰 발급 API

- [POST] /api/users/token

request body

```json
{
  "userId": 1
}
```

response

```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MzEyMzYwMH0.xY8nXUK9ZP5mE7IhdG5wVUpTw"
```

### 예약 가능 날짜 / 좌석 API

- [GET] /api/stages/{stageId}/availability

request params

```json
{
  "stageId": 1
}
```

response

```json
{
  "stageId": "{stageId}",
  "title": "싸이의 50명 흠뻑쇼",
  "startDate": "2025-01-20T19:00:00Z",
  "location": "서울대공원",
  "seatCount": 50,
  "availableSeats": ["A1", "A2", "A3", "B1", "B2"]
}
```

### 좌석 예약 요청 API

- [POST] /api/tickets/reserve

request body

```json
{
  "userId": 1,
  "stageId": 1,
  "seatNumber": "A1"
}
```

response

```json
{
  "success": true,
  "ticketId": 101,
  "reservationStatus": "reserved",
  "userId": 2
}
```

### 잔액 충전 / 조회 API

- [GET] /api/users/{userId}/balance

request params

```json
{
  "userId": 1
}
```

response

```json
{
  "userId": 1,
  "point": 5000
}
```

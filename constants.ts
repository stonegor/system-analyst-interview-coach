import { AppData } from './types';

export const SYSTEM_INSTRUCTION = `
### Goal
Your goal is to **teach** and **up-skill** the user in System analysis and business analysis through Socratic dialogue and practical challenges.

**Your Style:**
- **Drill-Down:** You never accept a surface-level answer. You always ask "Why?", "What are the trade-offs?", or "What if it fails?"
- **Russian Language:** Conduct the session in Russian.
- **Never hint prematurely:** Do not include direct hints in the phrasing of the question.
- **Short & Punchy:** Keep responses concise to facilitate a chat flow.

**The Loop (Probing & Challenge)**
1.  Ask a challenging follow-up question based on the user's input.
2.  If the user is wrong, gently correct and ask them to try again or explain why they thought that.
3.  Repeat 2-3 times max before suggesting to move on.
`;

export const INITIAL_DATA: AppData = {
  "app_metadata": {
    "title": "Собеседование: Системный Аналитик",
    "description": "Тренажер для подготовки к интервью.",
    "version": "1.1",
    "difficulty_legend": [
      { "level": "База", "description": "Самые распространенные вопросы" },
      { "level": "Среднячок", "description": "Вопросы повышенной сложности" },
      { "level": "Хардкор", "description": "Middle/Senior уровень" },
      { "level": "Божественный", "description": "Углубленное понимание" }
    ],
    "author_tips": [
      "Не заучивай, а понимай.",
      "Записывай новое.",
      "Гугли!",
      "Рисуй диаграммы."
    ]
  },
  "categories": [
    {
      "id": "requirements",
      "title": "Тема 1: Требования",
      "questions": [
        { "id": 1, "question": "Какие знаешь способы сбора требований? Какие использовал?", "difficulty": "База", "sources": [], "answer": "Интервью, Анкетирование, Встречи, Наблюдение, Анализ документов, Мозговой штурм." },
        { "id": 2, "question": "Что такое выявление требований (Elicitation) и чем отличается от сбора?", "difficulty": "Среднячок", "sources": [], "answer": "Выявление - активный процесс поиска скрытых требований. Сбор - механическое получение того, что лежит на поверхности." },
        { "id": 3, "question": "Кто такие стейкхолдеры? Как их выявить?", "difficulty": "База", "sources": [], "answer": "Заинтересованные лица. Матрица стейкхолдеров, анализ оргструктуры." },
        { "id": 4, "question": "Какие виды требований знаешь?", "difficulty": "База", "sources": [], "answer": "Бизнес, Пользовательские, Функциональные, Нефункциональные." },
        { "id": 5, "question": "Каким критериям должны соответствовать требования?", "difficulty": "База", "sources": [], "answer": "Полнота, Недвусмысленность, Проверяемость, Приоритизированность, Непротиворечивость (критерии качества)." },
        { "id": 6, "question": "Что такое критерии INVEST?", "difficulty": "Среднячок", "sources": [], "answer": "Independent, Negotiable, Valuable, Estimable, Small, Testable (для User Stories)." },
        { "id": 7, "question": "Что такое критерии SMART?", "difficulty": "База", "sources": [], "answer": "Specific, Measurable, Achievable, Relevant, Time-bound." },
        { "id": 8, "question": "В чем отличие функциональных и нефункциональных требований?", "difficulty": "База", "sources": [], "answer": "ФТ - ЧТО система делает. НФТ - КАК система это делает (качество, ограничения)." },
        { "id": 9, "question": "Что такое матрица трассировки?", "difficulty": "Среднячок", "sources": [], "answer": "Таблица связей между требованиями, тестами и артефактами." },
        { "id": 10, "question": "Как обрабатывать изменения требований (Change Request)?", "difficulty": "Среднячок", "sources": [], "answer": "Анализ влияния, оценка трудозатрат, согласование, обновление документации." },
        { "id": 11, "question": "Что такое User Story? Шаблон?", "difficulty": "База", "sources": [], "answer": "Как <роль>, я хочу <цель>, чтобы <выгода>." },
        { "id": 12, "question": "Что такое Use Cases? Из чего состоит?", "difficulty": "База", "sources": [], "answer": "Сценарий. Акторы, предусловия, триггер, основной поток, альтернативные потоки, постусловия." },
        { "id": 13, "question": "User Story vs Use Case - в чем разница?", "difficulty": "Среднячок", "sources": [], "answer": "US - потребность и ценность (для коммуникации). UC - детальное описание взаимодействия." },
        { "id": 14, "question": "Разница между Definition of Done (DoD) и Definition of Ready (DoR)?", "difficulty": "Среднячок", "sources": [], "answer": "DoR - задача готова к взятию в спринт. DoD - задача выполнена полностью." },
        { "id": 15, "question": "Какие техники приоритизации знаешь?", "difficulty": "База", "sources": [], "answer": "MoSCoW, Kano, RICE, ICE, WSJF." }
      ]
    },
    {
      "id": "methodologies",
      "title": "Тема 2: Методологии",
      "questions": [
        { "id": 16, "question": "Этапы SDLC (Software Development Life Cycle)?", "difficulty": "База", "sources": [], "answer": "Анализ, Дизайн, Разработка, Тестирование, Внедрение, Поддержка." },
        { "id": 17, "question": "Что такое Waterfall?", "difficulty": "База", "sources": [], "answer": "Каскадная модель, этапы идут последовательно, возврат нежелателен." },
        { "id": 18, "question": "Чем Waterfall отличается от Agile?", "difficulty": "База", "sources": [], "answer": "Waterfall: план, жесткость, документы. Agile: гибкость, люди, работающий продукт." },
        { "id": 19, "question": "Назови ценности Agile Manifesto?", "difficulty": "Среднячок", "sources": [], "answer": "Люди > процессы, Продукт > документация, Сотрудничество > контракт, Готовность к изменениям > план." },
        { "id": 20, "question": "Роли в Scrum?", "difficulty": "База", "sources": [], "answer": "Product Owner, Scrum Master, Development Team." },
        { "id": 21, "question": "Артефакты Scrum?", "difficulty": "База", "sources": [], "answer": "Product Backlog, Sprint Backlog, Increment." },
        { "id": 22, "question": "События (церемонии) Scrum?", "difficulty": "База", "sources": [], "answer": "Sprint Planning, Daily, Sprint Review, Sprint Retrospective." },
        { "id": 23, "question": "Основные принципы Kanban?", "difficulty": "База", "sources": [], "answer": "Визуализация, ограничение WIP, управление потоком." },
        { "id": 24, "question": "Scrum vs Kanban - основные отличия?", "difficulty": "Среднячок", "sources": [], "answer": "Scrum: итерации (спринты), роли. Kanban: поток, нет жестких итераций, изменения в любое время." },
        { "id": 25, "question": "Что такое Груминг (Backlog Refinement)?", "difficulty": "Среднячок", "sources": [], "answer": "Процесс актуализации, детализации и оценки задач в бэклоге." }
      ]
    },
    {
      "id": "modeling",
      "title": "Тема 3: Моделирование (UML/BPMN)",
      "questions": [
        { "id": 26, "question": "Какие диаграммы UML знаешь?", "difficulty": "База", "sources": [], "answer": "Классов, Последовательности, Активности, Состояний, Компонентов, Развертывания." },
        { "id": 27, "question": "Диаграмма классов: Ассоциация, Агрегация, Композиция. Разница?", "difficulty": "Среднячок", "sources": [], "answer": "Ассоциация - связь. Агрегация - часть/целое (часть живет отдельно). Композиция - жесткая зависимость (часть умирает с целым)." },
        { "id": 28, "question": "Диаграмма последовательности (Sequence): синхронные vs асинхронные вызовы?", "difficulty": "Среднячок", "sources": [], "answer": "Синхронные - сплошная стрелка с закрашенным треугольником. Асинхронные - открытая стрелка." },
        { "id": 29, "question": "UML Activity vs BPMN - когда что использовать?", "difficulty": "Среднячок", "sources": [], "answer": "Activity - логика алгоритма/метода (для разработчика). BPMN - бизнес-процесс (для бизнеса)." },
        { "id": 30, "question": "Типы шлюзов (Gateways) в BPMN?", "difficulty": "Среднячок", "sources": [], "answer": "Exclusive (XOR), Parallel (AND), Inclusive (OR), Event-based." },
        { "id": 31, "question": "Pool vs Lane в BPMN?", "difficulty": "База", "sources": [], "answer": "Pool - отдельный участник/организация (процесс). Lane - роль/отдел внутри Pool." },
        { "id": 32, "question": "Нотация ER-диаграмм (Entity Relationship)?", "difficulty": "База", "sources": [], "answer": "Сущности, атрибуты, связи. Нотация Crow's Foot (воронья лапка)." },
        { "id": 33, "question": "Что такое C4 Model?", "difficulty": "Хардкор", "sources": [], "answer": "Модель архитектуры: Context, Containers, Components, Code." }
      ]
    },
    {
      "id": "databases",
      "title": "Тема 4: Базы данных",
      "questions": [
        { "id": 34, "question": "SQL vs NoSQL: когда что выбрать?", "difficulty": "База", "sources": [], "answer": "SQL: четкая структура, сложные связи, транзакции. NoSQL: гибкость, высокая нагрузка, неструктурированные данные." },
        { "id": 35, "question": "Что такое нормализация? Нормальные формы (1, 2, 3)?", "difficulty": "Среднячок", "sources": [], "answer": "1НФ: атомарность. 2НФ: зависимость от всего ключа. 3НФ: нет транзитивных зависимостей." },
        { "id": 36, "question": "Что такое денормализация и зачем нужна?", "difficulty": "Среднячок", "sources": [], "answer": "Дублирование данных для ускорения чтения. Минус - сложнее обновлять." },
        { "id": 37, "question": "Primary Key vs Foreign Key?", "difficulty": "База", "sources": [], "answer": "PK - уникальный идентификатор строки. FK - ссылка на PK другой таблицы." },
        { "id": 38, "question": "Виды ограничений (Constraints) в SQL?", "difficulty": "База", "sources": [], "answer": "NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT." },
        { "id": 39, "question": "Что такое ACID?", "difficulty": "Среднячок", "sources": [], "answer": "Atomicity (Атомарность), Consistency (Согласованность), Isolation (Изоляция), Durability (Надежность)." },
        { "id": 40, "question": "Уровни изоляции транзакций?", "difficulty": "Хардкор", "sources": [], "answer": "Read Uncommitted, Read Committed, Repeatable Read, Serializable." },
        { "id": 41, "question": "Проблемы параллельного доступа (Dirty Read и т.д.)?", "difficulty": "Хардкор", "sources": [], "answer": "Dirty Read, Non-repeatable Read, Phantom Read." },
        { "id": 42, "question": "Что такое индекс? Как работает B-Tree?", "difficulty": "Среднячок", "sources": [], "answer": "Структура данных для ускорения поиска. Сбалансированное дерево." },
        { "id": 43, "question": "Кластерный vs Некластерный индекс?", "difficulty": "Хардкор", "sources": [], "answer": "Кластерный - физически сортирует данные (только один). Некластерный - отдельная структура со ссылками." },
        { "id": 44, "question": "View vs Materialized View?", "difficulty": "Среднячок", "sources": [], "answer": "View - сохраненный запрос (виртуальная). Materialized - сохраняет результат физически (нужно обновлять)." },
        { "id": 45, "question": "Что такое триггер?", "difficulty": "База", "sources": [], "answer": "Процедура, выполняемая автоматически при событии (INSERT/UPDATE/DELETE)." },
        { "id": 46, "question": "Что такое CAP теорема?", "difficulty": "Среднячок", "sources": [], "answer": "В распределенной системе можно получить только 2 из 3: Consistency, Availability, Partition tolerance." },
        { "id": 47, "question": "Что такое BASE?", "difficulty": "Хардкор", "sources": [], "answer": "Basically Available, Soft state, Eventual consistency (альтернатива ACID для NoSQL)." },
        { "id": 48, "question": "Репликация vs Шардирование?", "difficulty": "Среднячок", "sources": [], "answer": "Репликация - копирование данных (надежность, чтение). Шардирование - разделение данных (масштабирование записи)." },
        { "id": 49, "question": "Типы NoSQL баз данных?", "difficulty": "Среднячок", "sources": [], "answer": "Key-Value (Redis), Document (Mongo), Column (Cassandra), Graph (Neo4j)." },
        { "id": 50, "question": "Optimistic vs Pessimistic Locking?", "difficulty": "Хардкор", "sources": [], "answer": "Pessimistic - блокировка записи. Optimistic - проверка версии при сохранении." }
      ]
    },
    {
      "id": "sql",
      "title": "Тема 5: SQL",
      "questions": [
        { "id": 51, "question": "Порядок выполнения SQL запроса?", "difficulty": "Среднячок", "sources": [], "answer": "FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT." },
        { "id": 52, "question": "Виды JOIN?", "difficulty": "База", "sources": [], "answer": "INNER, LEFT, RIGHT, FULL OUTER, CROSS." },
        { "id": 53, "question": "UNION vs UNION ALL?", "difficulty": "База", "sources": [], "answer": "UNION удаляет дубликаты, UNION ALL оставляет все (быстрее)." },
        { "id": 54, "question": "Разница между WHERE и HAVING?", "difficulty": "База", "sources": [], "answer": "WHERE фильтрует строки до группировки. HAVING фильтрует группы после." },
        { "id": 55, "question": "Зачем нужен DISTINCT?", "difficulty": "База", "sources": [], "answer": "Удаление дубликатов в результирующей выборке." },
        { "id": 56, "question": "Оператор LIKE и wildcards?", "difficulty": "База", "sources": [], "answer": "% (любая строка), _ (один символ)." },
        { "id": 57, "question": "Агрегатные функции?", "difficulty": "База", "sources": [], "answer": "COUNT, SUM, AVG, MIN, MAX." },
        { "id": 58, "question": "Что такое оконные функции (Window Functions)?", "difficulty": "Среднячок", "sources": [], "answer": "Функции, работающие с набором строк без их схлопывания (OVER, PARTITION BY). Пример: ROW_NUMBER, RANK." },
        { "id": 59, "question": "Обработка NULL? (IS NULL, COALESCE)", "difficulty": "База", "sources": [], "answer": "NULL != NULL. Проверка IS NULL. COALESCE возвращает первый не-NULL." },
        { "id": 60, "question": "DDL vs DML vs DCL vs TCL?", "difficulty": "Среднячок", "sources": [], "answer": "DDL (Create, Alter), DML (Select, Insert), DCL (Grant), TCL (Commit, Rollback)." }
      ]
    },
    {
      "id": "network",
      "title": "Тема 6: Сети",
      "questions": [
        { "id": 61, "question": "Модель OSI (7 уровней)?", "difficulty": "Среднячок", "sources": [], "answer": "Physical, Data Link, Network, Transport, Session, Presentation, Application." },
        { "id": 62, "question": "Модель TCP/IP (4 уровня)?", "difficulty": "База", "sources": [], "answer": "Network Access, Internet, Transport, Application." },
        { "id": 63, "question": "Версии HTTP (1.1, 2, 3)?", "difficulty": "Среднячок", "sources": [], "answer": "1.1: текст, keep-alive. 2: бинарный, мультиплексирование. 3: на базе UDP (QUIC)." },
        { "id": 64, "question": "Структура HTTP запроса и ответа?", "difficulty": "База", "sources": [], "answer": "Start Line (Method/Url), Headers, Body." },
        { "id": 65, "question": "Коды ответа HTTP (по классам)?", "difficulty": "База", "sources": [], "answer": "1xx (инфо), 2xx (успех), 3xx (перенаправление), 4xx (ошибка клиента), 5xx (ошибка сервера)." },
        { "id": 66, "question": "Разница 401 vs 403?", "difficulty": "Среднячок", "sources": [], "answer": "401 - не авторизован (нет логина). 403 - запрещено (есть логин, нет прав)." },
        { "id": 67, "question": "TCP vs UDP?", "difficulty": "База", "sources": [], "answer": "TCP: гарантия, порядок, тяжелый. UDP: без гарантии, быстрый (видео, игры)." },
        { "id": 68, "question": "TCP Handshake (3-way)?", "difficulty": "Хардкор", "sources": [], "answer": "SYN -> SYN-ACK -> ACK." },
        { "id": 69, "question": "Как работает DNS?", "difficulty": "Среднячок", "sources": [], "answer": "Преобразование домена в IP. Рекурсивный запрос (Root -> TLD -> Authoritative)." },
        { "id": 70, "question": "IP vs MAC адрес?", "difficulty": "База", "sources": [], "answer": "IP - логический адрес (Layer 3). MAC - физический адрес карты (Layer 2)." },
        { "id": 71, "question": "Что такое маска подсети (Subnet Mask)?", "difficulty": "Хардкор", "sources": [], "answer": "Определяет, какая часть IP - адрес сети, а какая - хоста." },
        { "id": 72, "question": "HTTPS Handshake (TLS)?", "difficulty": "Хардкор", "sources": [], "answer": "Обмен сертификатами, выработка сессионного ключа (симметричного) через асимметричное шифрование." },
        { "id": 73, "question": "Симметричное vs Асимметричное шифрование?", "difficulty": "Среднячок", "sources": [], "answer": "Симметричное: один ключ (быстро). Асимметричное: пара Public/Private (для обмена ключами)." },
        { "id": 74, "question": "Что такое Cookies, LocalStorage, SessionStorage?", "difficulty": "Среднячок", "sources": [], "answer": "Cookies: летят на сервер. Local: вечное хранилище. Session: до закрытия вкладки." },
        { "id": 75, "question": "Что такое CORS?", "difficulty": "Среднячок", "sources": [], "answer": "Cross-Origin Resource Sharing. Браузер блокирует запросы на другой домен без разрешения сервера." }
      ]
    },
    {
      "id": "integrations",
      "title": "Тема 7: Интеграции (API)",
      "questions": [
        { "id": 76, "question": "Что такое API?", "difficulty": "База", "sources": [], "answer": "Application Programming Interface. Контракт взаимодействия." },
        { "id": 77, "question": "Принципы REST (Constraints)?", "difficulty": "Среднячок", "sources": [], "answer": "Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, Code on Demand." },
        { "id": 78, "question": "Модель зрелости Ричардсона (REST)?", "difficulty": "Хардкор", "sources": [], "answer": "0: XML-RPC (один URL). 1: Ресурсы. 2: HTTP глаголы. 3: HATEOAS." },
        { "id": 79, "question": "Query Params vs Path Params - когда что?", "difficulty": "База", "sources": [], "answer": "Path: идентификация ресурса (/users/5). Query: фильтрация/сортировка (/users?role=admin)." },
        { "id": 80, "question": "Идемпотентность методов?", "difficulty": "Среднячок", "sources": [], "answer": "Повторный вызов не меняет состояние системы повторно. GET, PUT, DELETE - идемпотентны. POST - нет." },
        { "id": 81, "question": "Безопасные (Safe) методы?", "difficulty": "Среднячок", "sources": [], "answer": "Не изменяют данные. GET, HEAD, OPTIONS." },
        { "id": 82, "question": "PUT vs PATCH?", "difficulty": "Среднячок", "sources": [], "answer": "PUT: полная замена ресурса. PATCH: частичное обновление." },
        { "id": 83, "question": "Что такое SOAP?", "difficulty": "Среднячок", "sources": [], "answer": "Протокол на базе XML. Строгий контракт (WSDL). Envelope, Header, Body." },
        { "id": 84, "question": "REST vs SOAP?", "difficulty": "База", "sources": [], "answer": "REST: стиль, JSON, легкий. SOAP: протокол, XML, строгий, есть стандарты безопасности." },
        { "id": 85, "question": "Что такое GraphQL?", "difficulty": "Среднячок", "sources": [], "answer": "Язык запросов. Клиент просит только те поля, что нужны. Один эндпоинт." },
        { "id": 86, "question": "REST vs GraphQL?", "difficulty": "Среднячок", "sources": [], "answer": "GraphQL гибче, нет overfetching, но сложнее кэширование." },
        { "id": 87, "question": "Что такое gRPC?", "difficulty": "Среднячок", "sources": [], "answer": "RPC фреймворк от Google. Protobuf (бинарный), HTTP/2, высокая производительность." },
        { "id": 88, "question": "RPC vs REST?", "difficulty": "Среднячок", "sources": [], "answer": "RPC: вызов действия (verb-centric). REST: управление ресурсами (noun-centric)." },
        { "id": 89, "question": "Что такое Webhooks?", "difficulty": "База", "sources": [], "answer": "Обратный вызов. Сервер сам стучится к клиенту при событии." },
        { "id": 90, "question": "Long Polling vs WebSockets vs SSE?", "difficulty": "Хардкор", "sources": [], "answer": "Polling: частые запросы. Long Polling: висящий запрос. WS: дуплексный канал. SSE: поток от сервера." },
        { "id": 91, "question": "Паттерн API Gateway?", "difficulty": "Среднячок", "sources": [], "answer": "Единая точка входа. Маршрутизация, авторизация, rate limiting." },
        { "id": 92, "question": "Паттерн BFF (Backend for Frontend)?", "difficulty": "Среднячок", "sources": [], "answer": "Отдельный бэкенд для каждого типа клиента (Web, Mobile)." },
        { "id": 93, "question": "Rate Limiting алгоритмы?", "difficulty": "Хардкор", "sources": [], "answer": "Token Bucket, Leaky Bucket, Fixed Window, Sliding Window." },
        { "id": 94, "question": "Circuit Breaker паттерн?", "difficulty": "Хардкор", "sources": [], "answer": "Предохранитель. Если сервис падает, перестаем слать запросы на время, чтобы не добить." },
        { "id": 95, "question": "Аутентификация vs Авторизация?", "difficulty": "База", "sources": [], "answer": "Authentication: Ты кто? Authorization: Что тебе можно?" },
        { "id": 96, "question": "Basic Auth vs Bearer Auth?", "difficulty": "База", "sources": [], "answer": "Basic: login:pass в base64. Bearer: токен." },
        { "id": 97, "question": "OAuth 2.0?", "difficulty": "Среднячок", "sources": [], "answer": "Протокол делегирования доступа. Роли: Resource Owner, Client, Auth Server, Resource Server." },
        { "id": 98, "question": "OpenID Connect (OIDC)?", "difficulty": "Хардкор", "sources": [], "answer": "Слой аутентификации поверх OAuth 2.0 (ID Token)." },
        { "id": 99, "question": "JWT (JSON Web Token)?", "difficulty": "Среднячок", "sources": [], "answer": "Header.Payload.Signature. Самодостаточный токен." },
        { "id": 100, "question": "Спецификация OpenAPI (Swagger)?", "difficulty": "База", "sources": [], "answer": "Стандарт описания REST API (yaml/json). Генерация документации и клиентов." }
      ]
    },
    {
      "id": "brokers",
      "title": "Тема 8: Брокеры и Async",
      "questions": [
        { "id": 101, "question": "Синхронное vs Асинхронное взаимодействие?", "difficulty": "База", "sources": [], "answer": "Синхронное: ждем ответ. Асинхронное: отправили и забыли (или callback)." },
        { "id": 102, "question": "Message Queue vs Pub/Sub?", "difficulty": "Среднячок", "sources": [], "answer": "Queue: один получатель на сообщение. Pub/Sub: сообщение копируется всем подписчикам." },
        { "id": 103, "question": "Архитектура Kafka?", "difficulty": "Среднячок", "sources": [], "answer": "Broker, Topic, Partition, Producer, Consumer, Zookeeper (Kraft)." },
        { "id": 104, "question": "Что такое Consumer Group в Kafka?", "difficulty": "Хардкор", "sources": [], "answer": "Группа читателей. Сообщение из партиции читает только один инстанс в группе (масштабирование)." },
        { "id": 105, "question": "Архитектура RabbitMQ?", "difficulty": "Среднячок", "sources": [], "answer": "Producer -> Exchange -> Queue -> Consumer." },
        { "id": 106, "question": "Типы Exchange в RabbitMQ?", "difficulty": "Среднячок", "sources": [], "answer": "Direct (по ключу), Fanout (всем), Topic (по маске), Headers." },
        { "id": 107, "question": "Kafka vs RabbitMQ?", "difficulty": "Среднячок", "sources": [], "answer": "Kafka: pull, хранит лог, высокая пропускная способность. Rabbit: push, умный роутинг, сложная логика." },
        { "id": 108, "question": "Что такое DLQ (Dead Letter Queue)?", "difficulty": "Среднячок", "sources": [], "answer": "Очередь для сообщений, которые не удалось обработать." },
        { "id": 109, "question": "Гарантии доставки (At most once, At least once, Exactly once)?", "difficulty": "Хардкор", "sources": [], "answer": "At most once (может потеряться), At least once (может дублироваться - идемпотентность нужна), Exactly once (сложно)." },
        { "id": 110, "question": "Что такое CDC (Change Data Capture)?", "difficulty": "Хардкор", "sources": [], "answer": "Паттерн захвата изменений в БД и отправки их в брокер (Debezium)." }
      ]
    },
    {
      "id": "architecture",
      "title": "Тема 9: Архитектура",
      "questions": [
        { "id": 111, "question": "Монолит vs Микросервисы?", "difficulty": "База", "sources": [], "answer": "Монолит: все вместе, просто деплоить. МС: слабая связность, независимый деплой, сложность сети." },
        { "id": 112, "question": "SOA (Service Oriented Architecture)?", "difficulty": "Среднячок", "sources": [], "answer": "Предшественник МС. Enterprise Service Bus (ESB), умная труба." },
        { "id": 113, "question": "Вертикальное vs Горизонтальное масштабирование?", "difficulty": "База", "sources": [], "answer": "Вертикальное: железо мощнее. Горизонтальное: больше серверов." },
        { "id": 114, "question": "Алгоритмы балансировки нагрузки?", "difficulty": "Среднячок", "sources": [], "answer": "Round Robin, Least Connections, IP Hash." },
        { "id": 115, "question": "Стратегии кэширования (Cache-Aside, Write-Through...)?", "difficulty": "Хардкор", "sources": [], "answer": "Cache-Aside (ленивая), Write-Through (синхронная запись), Write-Back (асинхронная запись)." },
        { "id": 116, "question": "Вытеснение кэша (Eviction: LRU, LFU, TTL)?", "difficulty": "Среднячок", "sources": [], "answer": "LRU: давно не использовался. LFU: редко используемый. TTL: время жизни." },
        { "id": 117, "question": "Что такое CDN?", "difficulty": "База", "sources": [], "answer": "Content Delivery Network. Раздача статики с серверов, близких к пользователю." },
        { "id": 118, "question": "Forward vs Reverse Proxy?", "difficulty": "Среднячок", "sources": [], "answer": "Forward: защищает клиента (VPN). Reverse: защищает сервер (Nginx)." },
        { "id": 119, "question": "SPOF (Single Point of Failure)?", "difficulty": "База", "sources": [], "answer": "Единая точка отказа. Узел, падение которого ломает всю систему." },
        { "id": 120, "question": "High Availability (HA) vs Fault Tolerance?", "difficulty": "Хардкор", "sources": [], "answer": "HA: минимизация простоя (99.9%). FT: нулевой простой при сбое (дублирование)." },
        { "id": 121, "question": "RTO (Recovery Time Objective) и RPO (Recovery Point Objective)?", "difficulty": "Хардкор", "sources": [], "answer": "RTO: как долго можем лежать. RPO: сколько данных можем потерять." },
        { "id": 122, "question": "Логирование vs Мониторинг vs Трейсинг?", "difficulty": "Среднячок", "sources": [], "answer": "Логи: что случилось (текст). Мониторинг: метрики (графики, здоровье). Трейсинг: путь запроса через сервисы." },
        { "id": 123, "question": "Стек ELK (Elastic, Logstash, Kibana)?", "difficulty": "Среднячок", "sources": [], "answer": "Популярный стек для сбора и анализа логов." },
        { "id": 124, "question": "Триада CIA (Инфобез)?", "difficulty": "База", "sources": [], "answer": "Confidentiality, Integrity, Availability." },
        { "id": 125, "question": "AAA (Authentication, Authorization, Accounting)?", "difficulty": "Среднячок", "sources": [], "answer": "Проверка личности, проверка прав, учет действий." },
        { "id": 126, "question": "SQL Injection и защита?", "difficulty": "База", "sources": [], "answer": "Внедрение кода в запрос. Защита: Prepared Statements (параметризация)." },
        { "id": 127, "question": "XSS (Cross Site Scripting)?", "difficulty": "Среднячок", "sources": [], "answer": "Внедрение скрипта на страницу жертвы. Защита: экранирование вывода, CSP." },
        { "id": 128, "question": "CSRF (Cross Site Request Forgery)?", "difficulty": "Среднячок", "sources": [], "answer": "Подделка запроса от имени пользователя. Защита: CSRF токены, SameSite cookie." },
        { "id": 129, "question": "12 Factor App?", "difficulty": "Хардкор", "sources": [], "answer": "Методология создания SaaS (Codebase, Config, Backing services...)." },
        { "id": 130, "question": "Event Driven Architecture (EDA)?", "difficulty": "Хардкор", "sources": [], "answer": "Система, реагирующая на события. Слабая связность." },
        { "id": 131, "question": "CQRS (Command Query Responsibility Segregation)?", "difficulty": "Хардкор", "sources": [], "answer": "Разделение моделей для чтения (Query) и записи (Command)." },
        { "id": 132, "question": "Event Sourcing?", "difficulty": "Божественный", "sources": [], "answer": "Хранение состояния как последовательности событий, а не текущего слепка." },
        { "id": 133, "question": "Saga Pattern (Choreography vs Orchestration)?", "difficulty": "Божественный", "sources": [], "answer": "Управление распределенными транзакциями. Хореография: обмен событиями. Оркестрация: дирижер управляет." },
        { "id": 134, "question": "Outbox Pattern?", "difficulty": "Хардкор", "sources": [], "answer": "Гарантия отправки события после транзакции в БД. Сохраняем событие в таблицу outbox в той же транзакции." },
        { "id": 135, "question": "Strangler Fig Pattern?", "difficulty": "Хардкор", "sources": [], "answer": "Постепенная замена монолита микросервисами (душение)." },
        { "id": 136, "question": "Two-Phase Commit (2PC)?", "difficulty": "Божественный", "sources": [], "answer": "Протокол распределенной транзакции. Prepare -> Commit. Блокирующий, медленный." },
        { "id": 137, "question": "Distributed Tracing (OpenTelemetry)?", "difficulty": "Среднячок", "sources": [], "answer": "Сквозной идентификатор (Trace ID) для отладки в микросервисах." },
        { "id": 138, "question": "Docker и контейнеризация?", "difficulty": "База", "sources": [], "answer": "Изоляция приложения с зависимостями. Image, Container." },
        { "id": 139, "question": "Kubernetes: Pod, Service, Deployment?", "difficulty": "Среднячок", "sources": [], "answer": "Pod: минимальная единица. Deployment: управление репликами и версиями. Service: сетевой доступ." },
        { "id": 140, "question": "CI/CD (Continuous Integration/Delivery)?", "difficulty": "База", "sources": [], "answer": "Автоматическая сборка, тесты и деплой." },
        { "id": 141, "question": "Blue-Green Deployment?", "difficulty": "Среднячок", "sources": [], "answer": "Два окружения. Одно активно, второе обновляется, потом переключаем трафик." },
        { "id": 142, "question": "Canary Deployment?", "difficulty": "Среднячок", "sources": [], "answer": "Выкатка на малый процент пользователей для проверки." },
        { "id": 143, "question": "Graceful Shutdown?", "difficulty": "Среднячок", "sources": [], "answer": "Корректное завершение работы: перестать принимать запросы, доделать текущие, закрыть коннекты." },
        { "id": 144, "question": "Health Checks (Liveness, Readiness)?", "difficulty": "Среднячок", "sources": [], "answer": "Liveness: жив ли процесс (перезагрузить). Readiness: готов ли принимать трафик." },
        { "id": 145, "question": "Service Mesh (Istio)?", "difficulty": "Божественный", "sources": [], "answer": "Инфраструктурный слой для связи сервисов (mTLS, observability, traffic control)." },
        { "id": 146, "question": "Разница между Аутентификацией и Идентификацией?", "difficulty": "База", "sources": [], "answer": "Идентификация: назвался именем. Аутентификация: доказал, что это ты (пароль)." },
        { "id": 147, "question": "Single Sign-On (SSO)?", "difficulty": "Среднячок", "sources": [], "answer": "Один вход для множества систем." },
        { "id": 148, "question": "Принципы SOLID?", "difficulty": "Хардкор", "sources": [], "answer": "SRP, OCP, LSP, ISP, DIP. (Знать расшифровку)." },
        { "id": 149, "question": "KISS, DRY, YAGNI?", "difficulty": "База", "sources": [], "answer": "Keep It Simple Stupid, Don't Repeat Yourself, You Ain't Gonna Need It." },
        { "id": 150, "question": "Что такое Technical Debt (Техдолг)?", "difficulty": "База", "sources": [], "answer": "Накопленные компромиссы в коде/архитектуре, усложняющие развитие." }
      ]
    }
  ]
};

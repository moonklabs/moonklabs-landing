# moonklabs-contact

moonklabs.com의 도입 문의를 받아 Google Chat과 이메일로 전달하는 Cloudflare Worker입니다.
홈페이지는 정적 사이트라 서버가 없어서, 문의 폼(`src/components/ContactForm.tsx`)이 이 Worker로 보냅니다.

```bash
pnpm install --ignore-workspace
pnpm verify        # 타입 검사 + 단위 테스트
pnpm dev           # http://localhost:8791 (.dev.vars 필요, .dev.vars.example 참고)
pnpm run deploy    # 검증 후 배포 (contact.moonklabs.com)
```

## 처음 한 번 설정

1. 메일 발신 도메인 등록: `npx wrangler email sending enable moonklabs.com`
2. Google Chat 웹훅 등록(비밀값, 커밋 금지): `npx wrangler secret put GOOGLE_CHAT_WEBHOOK_URL`
3. 배포: `pnpm run deploy`

## 동작

- `POST /contact`만 받습니다. `ALLOWED_ORIGINS`에 없는 출처는 403으로 거절합니다.
- 입력은 `src/contact.ts`의 스키마로 검증합니다. 관심 제품 목록을 바꾸면 홈페이지 `site-config.ts`의 `contactInterests`도 함께 바꿉니다.
- Google Chat과 이메일을 동시에 보내고, 둘 중 하나라도 전달되면 접수 성공으로 응답합니다. 실패한 채널은 로그에 남습니다.
- 같은 주소에서 10분에 5번까지 받습니다(Worker 인스턴스별 메모리 기준이라 폭주를 늦추는 용도입니다).
- 수신·발신 주소는 `wrangler.jsonc`의 `MAIL_TO`, `MAIL_FROM`에서 바꿉니다.

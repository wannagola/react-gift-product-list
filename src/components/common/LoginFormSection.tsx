/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from '@/constants/theme';
import { useLoginForm } from '@/hooks/useLoginForm';

type Props = { onLoginSuccess: () => void };

const LoginFormSection = ({ onLoginSuccess }: Props) => {
  const {
    id,
    pw,
    setId,
    setPw,
    idError,
    pwError,
    validateId,
    validatePw,
    handleLogin,
  } = useLoginForm({ onLoginSuccess });

  const isDisabled = !id || !pw || !!idError || !!pwError;

  return (
    <div css={wrapper}>
      <div css={form}>
        <div css={inputGroup}>
          <input
            type="text"
            placeholder="이메일 (@kakao.com)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onBlur={validateId}
            css={input}
          />
          {idError && <p css={errorText}>{idError}</p>}
        </div>

        <div css={inputGroup}>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onBlur={validatePw}
            css={input}
          />
          {pwError && <p css={errorText}>{pwError}</p>}
        </div>

        <button
          onClick={handleLogin}
          disabled={isDisabled}
          css={button(isDisabled)}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginFormSection;

const wrapper = css`
  width: 100%;
  padding: 0 16px;
  margin-top: 56px; /* 헤더 높이 + 여백 */
`;

const form = css`
  display: flex;
  flex-direction: column;
`;

const inputGroup = css`
  margin-bottom: 32px;
`;

const input = css`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${theme.borderColors.default};
  padding: 8px 0;
  font-size: 16px;
  ::placeholder {
    color: ${theme.borderColors.default};
  }
  &:focus {
    outline: none;
    border-bottom-color: ${theme.sementicColors.kakaoYellow};
  }
`;

const errorText = css`
  margin-top: 4px;
  color: ${theme.stateColors.critical};
  font-size: 12px;
`;

const button = (disabled: boolean) => css`
  width: 100%;
  height: 48px;
  background-color: ${disabled
    ? theme.backgroundColors.disabled
    : theme.sementicColors.kakaoYellow};
  color: #000;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${disabled ? 'default' : 'pointer'};
`;

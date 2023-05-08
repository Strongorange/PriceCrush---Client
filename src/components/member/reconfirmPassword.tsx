import React, { useEffect } from 'react';
import * as S from '@/components/stylecomponents/modals/productDetails/bidConfirm.style';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import axios from 'axios';
import Router from 'next/router';
import styled from 'styled-components';

interface ReconfirmPasswordPorps {
  newPassword: string;
}

const ReconfirmPassword = (props: ReconfirmPasswordPorps) => {
  const { newPassword } = props;
  const { closeModal } = useModal();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    type ButtonName = 'confirm' | 'cancel';
    const name = e.currentTarget.name as ButtonName;
    const MAIN_URL = '/';
    if (name === 'confirm') {
      axios
        .post('/api/member/resetPasswordApi', { newPassword })
        .then(function (response) {
          console.log(response);
          Router.push(`${MAIN_URL}`);
        })
        .catch(function (error) {
          console.log(error);
        });
      closeModal();
    } else if (name === 'cancel') {
      closeModal();
    } else {
      throw new Error('버튼 이름이 잘못되었습니다.');
    }
  };

  return (
    <S.BidConfirmLayout>
      <TextBox>
        <S.Title>
          새로 바꾸신 비밀번호는 <Highligt>{newPassword}</Highligt>입니다.
        </S.Title>
        <S.Title>정말로 비밀번호를 바꾸시겠습니까?</S.Title>
      </TextBox>
      <S.ButtonBox>
        <ButtonBase
          name="confirm"
          variant="positive"
          onClick={handleButtonClick}
        >
          확인
        </ButtonBase>
        <ButtonBase
          name="cancel"
          variant="negative"
          onClick={handleButtonClick}
        >
          취소
        </ButtonBase>
      </S.ButtonBox>
    </S.BidConfirmLayout>
  );
};

const Highligt = styled.span`
  color: ${({ theme }) => theme.color.DEEP_ORANGE};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
`;

const TextBox = styled(S.TextBox)`
  > p {
    text-align: center;
  }
`;

export default ReconfirmPassword;

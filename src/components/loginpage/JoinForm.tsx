import axios from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ButtonBase from '@/components/buttons/ButtonBase';
import * as S from '@/components/stylecomponents/memberControl.styles';
import useValidation from '@/hooks/useValidation';
import Link from 'next/link';
import MemberInputForm from '../inputs/memberInputForm';

//LoinForm type
interface LoginResponse {
  token: string;
}

const JoinForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    phone: '',
    nickname: '',
    address: '',
    agreement_use: '',
    agreement_mkt: '',
    favorites: [],
  });
  const [passedInfo, setPassedInfo] = useState({
    email: false,
    password: false,
    phone: false,
    nickname: false,
    address: false,
    agreement_use: false,
    agreement_mkt: false,
  });

  const [statusMessage, setStatusMessage] = useState({
    email: '',
    password: '',
    phone: '',
    nickname: '',
    address: '',
  });

  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState('');

  //error 판별

  //error메세지
  // 에러가 나면 나오도록 => 에러 true : orgnage
  // 단어가 없을 땐 안되도록 장치가 필요함
  const [isPassWord, setIsPassWord] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const passwordStatus = useValidation(passWord);

  const BASE_URL = 'http://localhost:8080/';
  const LOGIN_URL = '/'; //성공할때의 주소

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    //rewrite에 적던가 env에 넣던가 그때가서 해결

    // try {
    //   const response = await axios.post<LoginResponse>(`${BASE_URL}/auth`, {
    //     id,
    //     passWord,
    //   });
    //   const { token } = response.data;
    //   // JWT토큰 저장
    //   localStorage.setItem('token', token);
    //   // 로그인 성공 후 메인 페이지로 이동 -> 그냥 메인페이지로 가기로 했던가 아니면 과거에 봤던 페이지로 가기로했던가?
    //   Router.push(`${LOGIN_URL}`);
    // } catch (error) {
    //   console.log(error);
    //   alert('로그인 실패');
    // }
  };

  // 비밀번호 유효성 검사
  // 따로 분리하는게 좋은지 아닌지 몰겟음
  const showErrorMessage = useCallback(() => {
    const { textlength, specialCharacters, includingCharacters, continuity } =
      passwordStatus;
    if (
      !textlength ||
      !specialCharacters ||
      !includingCharacters ||
      continuity
    ) {
      setPasswordMessage(
        '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)'
      );
      setIsPassWord(true);
    } else {
      setPasswordMessage('');
      setIsPassWord(false);
    }
  }, [passwordStatus]);
  useEffect(() => {
    showErrorMessage();
  }, [showErrorMessage, passwordMessage]);

  const inputData = (e) => {
    setUserInfo(e);
  };

  const ts = (e) =>
    setUserInfo((prev) => ({ ...prev, password: e.target.value }));

  return (
    <S.LoginFormLayOut method="post" onSubmit={handleSubmit}>
      <MemberInputForm
        type="email"
        name="email"
        value={userInfo.email}
        errorCheck={passedInfo.email}
        textLenth={userInfo.email.length}
        inputData={inputData}
        errorMessage={'something Wrong'}
      >
        이메일
      </MemberInputForm>
      <S.FormItemBox errorCheck={isPassWord}>
        <S.FormItemTitle errorCheck={isPassWord} textLength={passWord.length}>
          비밀번호
        </S.FormItemTitle>
        <S.FormItem
          type="password"
          name="password"
          value={userInfo.password}
          onChange={ts}
          required
          errorCheck={passedInfo.password}
          textLength={userInfo.password.length}
        ></S.FormItem>
        {passWord.length > 0 && <span>{passwordMessage}</span>}
      </S.FormItemBox>

      <S.LoginButton type="submit">동의하고 가입하기</S.LoginButton>
      {/* <S.LoginButton type="submit" disabled={!id || isPassWord}>
        동의하고 가입하기
      </S.LoginButton> */}
    </S.LoginFormLayOut>
  );
};

export default JoinForm;

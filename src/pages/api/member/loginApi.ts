// 만들 예정
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const setExpireTime = (hour: number) => {
  return new Date(Date.now() + hour * 60 * 60 * 1000).toUTCString();
};

const LoginApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const LOGIN_API_URL = `http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/auth`;
  const loginData = req.body;

  axios
    .post(LOGIN_API_URL, loginData)
    .then(function (response) {
      const { user, accessToken } = response.data;
      res.status(200).json({ accessToken, user });
    })
    .catch(function (error) {
      console.log(error);
      res.status(error.response.status).send(error.response.data);
    });
};

export default LoginApi;